"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _ = require("./");

var _migrations = require("./migrations");

var _saved_objects_config = require("./saved_objects_config");

var _repository = require("./service/lib/repository");

var _saved_objects_type_registry = require("./saved_objects_type_registry");

var _serialization = require("./serialization");

var _routes = require("./routes");

var _status = require("./status");

var _core = require("./migrations/core/");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SavedObjectsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "setupDeps", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "clientFactoryProvider", void 0);

    _defineProperty(this, "clientFactoryWrappers", []);

    _defineProperty(this, "migrator$", new _rxjs.Subject());

    _defineProperty(this, "typeRegistry", new _saved_objects_type_registry.SavedObjectTypeRegistry());

    _defineProperty(this, "started", false);

    this.logger = coreContext.logger.get('savedobjects-service');
  }

  async setup(setupDeps) {
    this.logger.debug('Setting up SavedObjects service');
    this.setupDeps = setupDeps;
    const savedObjectsConfig = await this.coreContext.configService.atPath('savedObjects').pipe((0, _operators.first)()).toPromise();
    const savedObjectsMigrationConfig = await this.coreContext.configService.atPath('migrations').pipe((0, _operators.first)()).toPromise();
    this.config = new _saved_objects_config.SavedObjectConfig(savedObjectsConfig, savedObjectsMigrationConfig);
    (0, _routes.registerRoutes)({
      http: setupDeps.http,
      logger: this.logger,
      config: this.config,
      migratorPromise: this.migrator$.pipe((0, _operators.first)()).toPromise()
    });
    return {
      status$: (0, _status.calculateStatus$)(this.migrator$.pipe((0, _operators.switchMap)(migrator => migrator.getStatus$())), setupDeps.opensearch.status$),
      setClientFactoryProvider: provider => {
        if (this.started) {
          throw new Error('cannot call `setClientFactoryProvider` after service startup.');
        }

        if (this.clientFactoryProvider) {
          throw new Error('custom client factory is already set, and can only be set once');
        }

        this.clientFactoryProvider = provider;
      },
      addClientWrapper: (priority, id, factory) => {
        if (this.started) {
          throw new Error('cannot call `addClientWrapper` after service startup.');
        }

        this.clientFactoryWrappers.push({
          priority,
          id,
          factory
        });
      },
      registerType: type => {
        if (this.started) {
          throw new Error('cannot call `registerType` after service startup.');
        }

        this.typeRegistry.registerType(type);
      },
      getImportExportObjectLimit: () => this.config.maxImportExportSize
    };
  }

  async start({
    opensearch,
    pluginsInitialized = true
  }, migrationsRetryDelay) {
    if (!this.setupDeps || !this.config) {
      throw new Error('#setup() needs to be run first');
    }

    this.logger.debug('Starting SavedObjects service');
    const opensearchDashboardsConfig = await this.coreContext.configService.atPath('opensearchDashboards').pipe((0, _operators.first)()).toPromise();
    const client = opensearch.client;
    const migrator = this.createMigrator(opensearchDashboardsConfig, this.config.migration, opensearch.client, migrationsRetryDelay);
    this.migrator$.next(migrator);
    /**
     * Note: We want to ensure that migrations have completed before
     * continuing with further Core start steps that might use SavedObjects
     * such as running the legacy server, legacy plugins and allowing incoming
     * HTTP requests.
     *
     * However, our build system optimize step and some tests depend on the
     * HTTP server running without an OpenSearch server being available.
     * So, when the `migrations.skip` is true, we skip migrations altogether.
     *
     * We also cannot safely run migrations if plugins are not initialized since
     * not plugin migrations won't be registered.
     */

    const skipMigrations = this.config.migration.skip || !pluginsInitialized;

    if (skipMigrations) {
      this.logger.warn('Skipping Saved Object migrations on startup. Note: Individual documents will still be migrated when read or written.');
    } else {
      this.logger.info('Waiting until all OpenSearch nodes are compatible with OpenSearch Dashboards before starting saved objects migrations...'); // TODO: Move to Status Service https://github.com/elastic/kibana/issues/41983

      this.setupDeps.opensearch.opensearchNodesCompatibility$.subscribe(({
        isCompatible,
        message
      }) => {
        if (!isCompatible && message) {
          this.logger.error(message);
        }
      });
      await this.setupDeps.opensearch.opensearchNodesCompatibility$.pipe((0, _operators.filter)(nodes => nodes.isCompatible), (0, _operators.take)(1)).toPromise();
      this.logger.info('Starting saved objects migrations');
      await migrator.runMigrations();
    }

    const createRepository = (opensearchClient, includedHiddenTypes = []) => {
      return _repository.SavedObjectsRepository.createRepository(migrator, this.typeRegistry, opensearchDashboardsConfig.index, opensearchClient, includedHiddenTypes);
    };

    const repositoryFactory = {
      createInternalRepository: includedHiddenTypes => createRepository(client.asInternalUser, includedHiddenTypes),
      createScopedRepository: (req, includedHiddenTypes) => createRepository(client.asScoped(req).asCurrentUser, includedHiddenTypes)
    };
    const clientProvider = new _.SavedObjectsClientProvider({
      defaultClientFactory({
        request,
        includedHiddenTypes
      }) {
        const repository = repositoryFactory.createScopedRepository(request, includedHiddenTypes);
        return new _.SavedObjectsClient(repository);
      },

      typeRegistry: this.typeRegistry
    });

    if (this.clientFactoryProvider) {
      const clientFactory = this.clientFactoryProvider(repositoryFactory);
      clientProvider.setClientFactory(clientFactory);
    }

    this.clientFactoryWrappers.forEach(({
      id,
      factory,
      priority
    }) => {
      clientProvider.addClientWrapperFactory(priority, id, factory);
    });
    this.started = true;
    return {
      getScopedClient: clientProvider.getClient.bind(clientProvider),
      createScopedRepository: repositoryFactory.createScopedRepository,
      createInternalRepository: repositoryFactory.createInternalRepository,
      createSerializer: () => new _serialization.SavedObjectsSerializer(this.typeRegistry),
      getTypeRegistry: () => this.typeRegistry
    };
  }

  async stop() {}

  createMigrator(opensearchDashboardsConfig, savedObjectsConfig, client, migrationsRetryDelay) {
    return new _migrations.OpenSearchDashboardsMigrator({
      typeRegistry: this.typeRegistry,
      logger: this.logger,
      opensearchDashboardsVersion: this.coreContext.env.packageInfo.version,
      savedObjectsConfig,
      opensearchDashboardsConfig,
      client: (0, _core.createMigrationOpenSearchClient)(client.asInternalUser, this.logger, migrationsRetryDelay)
    });
  }

}

exports.SavedObjectsService = SavedObjectsService;