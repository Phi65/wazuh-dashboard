"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityPlugin = void 0;

var _operators = require("rxjs/operators");

var _routes = require("./routes");

var _opensearch_security_configuration_plugin = _interopRequireDefault(require("./backend/opensearch_security_configuration_plugin"));

var _opensearch_security_plugin = _interopRequireDefault(require("./backend/opensearch_security_plugin"));

var _security_cookie = require("./session/security_cookie");

var _opensearch_security_client = require("./backend/opensearch_security_client");

var _tenant_index = require("./multitenancy/tenant_index");

var _auth_handler_factory = require("./auth/auth_handler_factory");

var _routes2 = require("./multitenancy/routes");

var _auth_type_routes = require("./routes/auth_type_routes");

var _core = require("../../../src/core/server/saved_objects/migrations/core");

var _saved_objects_wrapper = require("./saved_objects/saved_objects_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SecurityPlugin {
  // FIXME: keep an reference of admin client so that it can be used in start(), better to figureout a
  //        decent way to get adminClient in start. (maybe using getStartServices() from setup?)
  // @ts-ignore: property not initialzied in constructor
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "securityClient", void 0);

    _defineProperty(this, "savedObjectClientWrapper", void 0);

    this.logger = initializerContext.logger.get();
    this.savedObjectClientWrapper = new _saved_objects_wrapper.SecuritySavedObjectsClientWrapper();
  }

  async setup(core) {
    var _config$multitenancy;

    this.logger.debug('opendistro_security: Setup');
    const config$ = this.initializerContext.config.create();
    const config = await config$.pipe((0, _operators.first)()).toPromise();
    const router = core.http.createRouter();
    const esClient = core.opensearch.legacy.createClient('opendistro_security', {
      plugins: [_opensearch_security_configuration_plugin.default, _opensearch_security_plugin.default]
    });
    this.securityClient = new _opensearch_security_client.SecurityClient(esClient);
    const securitySessionStorageFactory = await core.http.createCookieSessionStorageFactory((0, _security_cookie.getSecurityCookieOptions)(config)); // put logger into route handler context, so that we don't need to pass througth parameters

    core.http.registerRouteHandlerContext('security_plugin', (context, request) => {
      return {
        logger: this.logger,
        esClient
      };
    }); // setup auth

    const auth = await (0, _auth_handler_factory.getAuthenticationHandler)(config.auth.type, router, config, core, esClient, securitySessionStorageFactory, this.logger);
    core.http.registerAuth(auth.authHandler); // Register server side APIs

    (0, _routes.defineRoutes)(router);
    (0, _auth_type_routes.defineAuthTypeRoutes)(router, config); // set up multi-tenent routes

    if ((_config$multitenancy = config.multitenancy) !== null && _config$multitenancy !== void 0 && _config$multitenancy.enabled) {
      (0, _routes2.setupMultitenantRoutes)(router, securitySessionStorageFactory, this.securityClient);
    }

    if (config.multitenancy.enabled && config.multitenancy.enable_aggregation_view) {
      core.savedObjects.addClientWrapper(2, 'security-saved-object-client-wrapper', this.savedObjectClientWrapper.wrapperFactory);
    }

    return {
      config$,
      securityConfigClient: esClient
    };
  } // TODO: add more logs


  async start(core) {
    var _config$multitenancy2;

    this.logger.debug('opendistro_security: Started');
    const config$ = this.initializerContext.config.create();
    const config = await config$.pipe((0, _operators.first)()).toPromise();
    this.savedObjectClientWrapper.httpStart = core.http;
    this.savedObjectClientWrapper.config = config;

    if ((_config$multitenancy2 = config.multitenancy) !== null && _config$multitenancy2 !== void 0 && _config$multitenancy2.enabled) {
      const globalConfig$ = this.initializerContext.config.legacy.globalConfig$;
      const globalConfig = await globalConfig$.pipe((0, _operators.first)()).toPromise();
      const opensearchDashboardsIndex = globalConfig.opensearchDashboards.index;
      const typeRegistry = core.savedObjects.getTypeRegistry();
      const esClient = core.opensearch.client.asInternalUser;
      const migrationClient = (0, _core.createMigrationOpenSearchClient)(esClient, this.logger);
      (0, _tenant_index.setupIndexTemplate)(esClient, opensearchDashboardsIndex, typeRegistry, this.logger);
      const serializer = core.savedObjects.createSerializer();
      const opensearchDashboardsVersion = this.initializerContext.env.packageInfo.version;
      (0, _tenant_index.migrateTenantIndices)(opensearchDashboardsVersion, migrationClient, this.securityClient, typeRegistry, serializer, this.logger);
    }

    return {
      http: core.http,
      es: core.opensearch.legacy
    };
  }

  stop() {}

}

exports.SecurityPlugin = SecurityPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi50cyJdLCJuYW1lcyI6WyJTZWN1cml0eVBsdWdpbiIsImNvbnN0cnVjdG9yIiwiaW5pdGlhbGl6ZXJDb250ZXh0IiwibG9nZ2VyIiwiZ2V0Iiwic2F2ZWRPYmplY3RDbGllbnRXcmFwcGVyIiwiU2VjdXJpdHlTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyIiwic2V0dXAiLCJjb3JlIiwiZGVidWciLCJjb25maWckIiwiY29uZmlnIiwiY3JlYXRlIiwicGlwZSIsInRvUHJvbWlzZSIsInJvdXRlciIsImh0dHAiLCJjcmVhdGVSb3V0ZXIiLCJlc0NsaWVudCIsIm9wZW5zZWFyY2giLCJsZWdhY3kiLCJjcmVhdGVDbGllbnQiLCJwbHVnaW5zIiwib3BlbnNlYXJjaFNlY3VyaXR5Q29uZmlndXJhdG9pblBsdWdpbiIsIm9wZW5zZWFyY2hTZWN1cml0eVBsdWdpbiIsInNlY3VyaXR5Q2xpZW50IiwiU2VjdXJpdHlDbGllbnQiLCJzZWN1cml0eVNlc3Npb25TdG9yYWdlRmFjdG9yeSIsImNyZWF0ZUNvb2tpZVNlc3Npb25TdG9yYWdlRmFjdG9yeSIsInJlZ2lzdGVyUm91dGVIYW5kbGVyQ29udGV4dCIsImNvbnRleHQiLCJyZXF1ZXN0IiwiYXV0aCIsInR5cGUiLCJyZWdpc3RlckF1dGgiLCJhdXRoSGFuZGxlciIsIm11bHRpdGVuYW5jeSIsImVuYWJsZWQiLCJlbmFibGVfYWdncmVnYXRpb25fdmlldyIsInNhdmVkT2JqZWN0cyIsImFkZENsaWVudFdyYXBwZXIiLCJ3cmFwcGVyRmFjdG9yeSIsInNlY3VyaXR5Q29uZmlnQ2xpZW50Iiwic3RhcnQiLCJodHRwU3RhcnQiLCJnbG9iYWxDb25maWckIiwiZ2xvYmFsQ29uZmlnIiwib3BlbnNlYXJjaERhc2hib2FyZHNJbmRleCIsIm9wZW5zZWFyY2hEYXNoYm9hcmRzIiwiaW5kZXgiLCJ0eXBlUmVnaXN0cnkiLCJnZXRUeXBlUmVnaXN0cnkiLCJjbGllbnQiLCJhc0ludGVybmFsVXNlciIsIm1pZ3JhdGlvbkNsaWVudCIsInNlcmlhbGl6ZXIiLCJjcmVhdGVTZXJpYWxpemVyIiwib3BlbnNlYXJjaERhc2hib2FyZHNWZXJzaW9uIiwiZW52IiwicGFja2FnZUluZm8iLCJ2ZXJzaW9uIiwiZXMiLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBZUE7O0FBY0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7O0FBS0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQXVCTyxNQUFNQSxjQUFOLENBQWlGO0FBRXRGO0FBQ0E7QUFFQTtBQUtBQyxFQUFBQSxXQUFXLENBQWtCQyxrQkFBbEIsRUFBZ0U7QUFBQSxTQUE5Q0Esa0JBQThDLEdBQTlDQSxrQkFBOEM7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQ3pFLFNBQUtDLE1BQUwsR0FBY0Qsa0JBQWtCLENBQUNDLE1BQW5CLENBQTBCQyxHQUExQixFQUFkO0FBQ0EsU0FBS0Msd0JBQUwsR0FBZ0MsSUFBSUMsd0RBQUosRUFBaEM7QUFDRDs7QUFFaUIsUUFBTEMsS0FBSyxDQUFDQyxJQUFELEVBQWtCO0FBQUE7O0FBQ2xDLFNBQUtMLE1BQUwsQ0FBWU0sS0FBWixDQUFrQiw0QkFBbEI7QUFFQSxVQUFNQyxPQUFPLEdBQUcsS0FBS1Isa0JBQUwsQ0FBd0JTLE1BQXhCLENBQStCQyxNQUEvQixFQUFoQjtBQUNBLFVBQU1ELE1BQWdDLEdBQUcsTUFBTUQsT0FBTyxDQUFDRyxJQUFSLENBQWEsdUJBQWIsRUFBc0JDLFNBQXRCLEVBQS9DO0FBRUEsVUFBTUMsTUFBTSxHQUFHUCxJQUFJLENBQUNRLElBQUwsQ0FBVUMsWUFBVixFQUFmO0FBRUEsVUFBTUMsUUFBOEIsR0FBR1YsSUFBSSxDQUFDVyxVQUFMLENBQWdCQyxNQUFoQixDQUF1QkMsWUFBdkIsQ0FDckMscUJBRHFDLEVBRXJDO0FBQ0VDLE1BQUFBLE9BQU8sRUFBRSxDQUFDQyxpREFBRCxFQUF3Q0MsbUNBQXhDO0FBRFgsS0FGcUMsQ0FBdkM7QUFPQSxTQUFLQyxjQUFMLEdBQXNCLElBQUlDLDBDQUFKLENBQW1CUixRQUFuQixDQUF0QjtBQUVBLFVBQU1TLDZCQUEyRSxHQUFHLE1BQU1uQixJQUFJLENBQUNRLElBQUwsQ0FBVVksaUNBQVYsQ0FFeEYsK0NBQXlCakIsTUFBekIsQ0FGd0YsQ0FBMUYsQ0FqQmtDLENBcUJsQzs7QUFDQUgsSUFBQUEsSUFBSSxDQUFDUSxJQUFMLENBQVVhLDJCQUFWLENBQXNDLGlCQUF0QyxFQUF5RCxDQUFDQyxPQUFELEVBQVVDLE9BQVYsS0FBc0I7QUFDN0UsYUFBTztBQUNMNUIsUUFBQUEsTUFBTSxFQUFFLEtBQUtBLE1BRFI7QUFFTGUsUUFBQUE7QUFGSyxPQUFQO0FBSUQsS0FMRCxFQXRCa0MsQ0E2QmxDOztBQUNBLFVBQU1jLElBQXlCLEdBQUcsTUFBTSxvREFDdENyQixNQUFNLENBQUNxQixJQUFQLENBQVlDLElBRDBCLEVBRXRDbEIsTUFGc0MsRUFHdENKLE1BSHNDLEVBSXRDSCxJQUpzQyxFQUt0Q1UsUUFMc0MsRUFNdENTLDZCQU5zQyxFQU90QyxLQUFLeEIsTUFQaUMsQ0FBeEM7QUFTQUssSUFBQUEsSUFBSSxDQUFDUSxJQUFMLENBQVVrQixZQUFWLENBQXVCRixJQUFJLENBQUNHLFdBQTVCLEVBdkNrQyxDQXlDbEM7O0FBQ0EsOEJBQWFwQixNQUFiO0FBQ0EsZ0RBQXFCQSxNQUFyQixFQUE2QkosTUFBN0IsRUEzQ2tDLENBNENsQzs7QUFDQSxnQ0FBSUEsTUFBTSxDQUFDeUIsWUFBWCxpREFBSSxxQkFBcUJDLE9BQXpCLEVBQWtDO0FBQ2hDLDJDQUF1QnRCLE1BQXZCLEVBQStCWSw2QkFBL0IsRUFBOEQsS0FBS0YsY0FBbkU7QUFDRDs7QUFFRCxRQUFJZCxNQUFNLENBQUN5QixZQUFQLENBQW9CQyxPQUFwQixJQUErQjFCLE1BQU0sQ0FBQ3lCLFlBQVAsQ0FBb0JFLHVCQUF2RCxFQUFnRjtBQUM5RTlCLE1BQUFBLElBQUksQ0FBQytCLFlBQUwsQ0FBa0JDLGdCQUFsQixDQUNFLENBREYsRUFFRSxzQ0FGRixFQUdFLEtBQUtuQyx3QkFBTCxDQUE4Qm9DLGNBSGhDO0FBS0Q7O0FBRUQsV0FBTztBQUNML0IsTUFBQUEsT0FESztBQUVMZ0MsTUFBQUEsb0JBQW9CLEVBQUV4QjtBQUZqQixLQUFQO0FBSUQsR0E1RXFGLENBOEV0Rjs7O0FBQ2tCLFFBQUx5QixLQUFLLENBQUNuQyxJQUFELEVBQWtCO0FBQUE7O0FBQ2xDLFNBQUtMLE1BQUwsQ0FBWU0sS0FBWixDQUFrQiw4QkFBbEI7QUFFQSxVQUFNQyxPQUFPLEdBQUcsS0FBS1Isa0JBQUwsQ0FBd0JTLE1BQXhCLENBQStCQyxNQUEvQixFQUFoQjtBQUNBLFVBQU1ELE1BQU0sR0FBRyxNQUFNRCxPQUFPLENBQUNHLElBQVIsQ0FBYSx1QkFBYixFQUFzQkMsU0FBdEIsRUFBckI7QUFFQSxTQUFLVCx3QkFBTCxDQUE4QnVDLFNBQTlCLEdBQTBDcEMsSUFBSSxDQUFDUSxJQUEvQztBQUNBLFNBQUtYLHdCQUFMLENBQThCTSxNQUE5QixHQUF1Q0EsTUFBdkM7O0FBRUEsaUNBQUlBLE1BQU0sQ0FBQ3lCLFlBQVgsa0RBQUksc0JBQXFCQyxPQUF6QixFQUFrQztBQUNoQyxZQUFNUSxhQUE2QyxHQUFHLEtBQUszQyxrQkFBTCxDQUF3QlMsTUFBeEIsQ0FBK0JTLE1BQS9CLENBQ25EeUIsYUFESDtBQUVBLFlBQU1DLFlBQWdDLEdBQUcsTUFBTUQsYUFBYSxDQUFDaEMsSUFBZCxDQUFtQix1QkFBbkIsRUFBNEJDLFNBQTVCLEVBQS9DO0FBQ0EsWUFBTWlDLHlCQUF5QixHQUFHRCxZQUFZLENBQUNFLG9CQUFiLENBQWtDQyxLQUFwRTtBQUNBLFlBQU1DLFlBQXNDLEdBQUcxQyxJQUFJLENBQUMrQixZQUFMLENBQWtCWSxlQUFsQixFQUEvQztBQUNBLFlBQU1qQyxRQUFRLEdBQUdWLElBQUksQ0FBQ1csVUFBTCxDQUFnQmlDLE1BQWhCLENBQXVCQyxjQUF4QztBQUNBLFlBQU1DLGVBQWUsR0FBRywyQ0FBZ0NwQyxRQUFoQyxFQUEwQyxLQUFLZixNQUEvQyxDQUF4QjtBQUVBLDRDQUFtQmUsUUFBbkIsRUFBNkI2Qix5QkFBN0IsRUFBd0RHLFlBQXhELEVBQXNFLEtBQUsvQyxNQUEzRTtBQUVBLFlBQU1vRCxVQUFrQyxHQUFHL0MsSUFBSSxDQUFDK0IsWUFBTCxDQUFrQmlCLGdCQUFsQixFQUEzQztBQUNBLFlBQU1DLDJCQUEyQixHQUFHLEtBQUt2RCxrQkFBTCxDQUF3QndELEdBQXhCLENBQTRCQyxXQUE1QixDQUF3Q0MsT0FBNUU7QUFDQSw4Q0FDRUgsMkJBREYsRUFFRUgsZUFGRixFQUdFLEtBQUs3QixjQUhQLEVBSUV5QixZQUpGLEVBS0VLLFVBTEYsRUFNRSxLQUFLcEQsTUFOUDtBQVFEOztBQUVELFdBQU87QUFDTGEsTUFBQUEsSUFBSSxFQUFFUixJQUFJLENBQUNRLElBRE47QUFFTDZDLE1BQUFBLEVBQUUsRUFBRXJELElBQUksQ0FBQ1csVUFBTCxDQUFnQkM7QUFGZixLQUFQO0FBSUQ7O0FBRU0wQyxFQUFBQSxJQUFJLEdBQUcsQ0FBRTs7QUFySHNFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCxcbiAgQ29yZVNldHVwLFxuICBDb3JlU3RhcnQsXG4gIFBsdWdpbixcbiAgTG9nZ2VyLFxuICBJTGVnYWN5Q2x1c3RlckNsaWVudCxcbiAgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5LFxuICBTaGFyZWRHbG9iYWxDb25maWcsXG59IGZyb20gJy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5cbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luU2V0dXAsIFNlY3VyaXR5UGx1Z2luU3RhcnQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGRlZmluZVJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4nO1xuaW1wb3J0IG9wZW5zZWFyY2hTZWN1cml0eUNvbmZpZ3VyYXRvaW5QbHVnaW4gZnJvbSAnLi9iYWNrZW5kL29wZW5zZWFyY2hfc2VjdXJpdHlfY29uZmlndXJhdGlvbl9wbHVnaW4nO1xuaW1wb3J0IG9wZW5zZWFyY2hTZWN1cml0eVBsdWdpbiBmcm9tICcuL2JhY2tlbmQvb3BlbnNlYXJjaF9zZWN1cml0eV9wbHVnaW4nO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXNzaW9uQ29va2llLCBnZXRTZWN1cml0eUNvb2tpZU9wdGlvbnMgfSBmcm9tICcuL3Nlc3Npb24vc2VjdXJpdHlfY29va2llJztcbmltcG9ydCB7IFNlY3VyaXR5Q2xpZW50IH0gZnJvbSAnLi9iYWNrZW5kL29wZW5zZWFyY2hfc2VjdXJpdHlfY2xpZW50JztcbmltcG9ydCB7XG4gIFNhdmVkT2JqZWN0c1NlcmlhbGl6ZXIsXG4gIElTYXZlZE9iamVjdFR5cGVSZWdpc3RyeSxcbn0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyL3NhdmVkX29iamVjdHMnO1xuaW1wb3J0IHsgc2V0dXBJbmRleFRlbXBsYXRlLCBtaWdyYXRlVGVuYW50SW5kaWNlcyB9IGZyb20gJy4vbXVsdGl0ZW5hbmN5L3RlbmFudF9pbmRleCc7XG5pbXBvcnQge1xuICBJQXV0aGVudGljYXRpb25UeXBlLFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc0F1dGhTdGF0ZSxcbn0gZnJvbSAnLi9hdXRoL3R5cGVzL2F1dGhlbnRpY2F0aW9uX3R5cGUnO1xuaW1wb3J0IHsgZ2V0QXV0aGVudGljYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9hdXRoL2F1dGhfaGFuZGxlcl9mYWN0b3J5JztcbmltcG9ydCB7IHNldHVwTXVsdGl0ZW5hbnRSb3V0ZXMgfSBmcm9tICcuL211bHRpdGVuYW5jeS9yb3V0ZXMnO1xuaW1wb3J0IHsgZGVmaW5lQXV0aFR5cGVSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcy9hdXRoX3R5cGVfcm91dGVzJztcbmltcG9ydCB7IGNyZWF0ZU1pZ3JhdGlvbk9wZW5TZWFyY2hDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXIvc2F2ZWRfb2JqZWN0cy9taWdyYXRpb25zL2NvcmUnO1xuaW1wb3J0IHsgU2VjdXJpdHlTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyIH0gZnJvbSAnLi9zYXZlZF9vYmplY3RzL3NhdmVkX29iamVjdHNfd3JhcHBlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdXJpdHlQbHVnaW5SZXF1ZXN0Q29udGV4dCB7XG4gIGxvZ2dlcjogTG9nZ2VyO1xuICBlc0NsaWVudDogSUxlZ2FjeUNsdXN0ZXJDbGllbnQ7XG59XG5cbmRlY2xhcmUgbW9kdWxlICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJyB7XG4gIGludGVyZmFjZSBSZXF1ZXN0SGFuZGxlckNvbnRleHQge1xuICAgIHNlY3VyaXR5X3BsdWdpbjogU2VjdXJpdHlQbHVnaW5SZXF1ZXN0Q29udGV4dDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3VyaXR5UGx1Z2luUmVxdWVzdENvbnRleHQge1xuICBsb2dnZXI6IExvZ2dlcjtcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInIHtcbiAgaW50ZXJmYWNlIFJlcXVlc3RIYW5kbGVyQ29udGV4dCB7XG4gICAgc2VjdXJpdHlfcGx1Z2luOiBTZWN1cml0eVBsdWdpblJlcXVlc3RDb250ZXh0O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN1cml0eVBsdWdpbiBpbXBsZW1lbnRzIFBsdWdpbjxTZWN1cml0eVBsdWdpblNldHVwLCBTZWN1cml0eVBsdWdpblN0YXJ0PiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG4gIC8vIEZJWE1FOiBrZWVwIGFuIHJlZmVyZW5jZSBvZiBhZG1pbiBjbGllbnQgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiBzdGFydCgpLCBiZXR0ZXIgdG8gZmlndXJlb3V0IGFcbiAgLy8gICAgICAgIGRlY2VudCB3YXkgdG8gZ2V0IGFkbWluQ2xpZW50IGluIHN0YXJ0LiAobWF5YmUgdXNpbmcgZ2V0U3RhcnRTZXJ2aWNlcygpIGZyb20gc2V0dXA/KVxuXG4gIC8vIEB0cy1pZ25vcmU6IHByb3BlcnR5IG5vdCBpbml0aWFsemllZCBpbiBjb25zdHJ1Y3RvclxuICBwcml2YXRlIHNlY3VyaXR5Q2xpZW50OiBTZWN1cml0eUNsaWVudDtcblxuICBwcml2YXRlIHNhdmVkT2JqZWN0Q2xpZW50V3JhcHBlcjogU2VjdXJpdHlTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbGl6ZXJDb250ZXh0OiBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQpIHtcbiAgICB0aGlzLmxvZ2dlciA9IGluaXRpYWxpemVyQ29udGV4dC5sb2dnZXIuZ2V0KCk7XG4gICAgdGhpcy5zYXZlZE9iamVjdENsaWVudFdyYXBwZXIgPSBuZXcgU2VjdXJpdHlTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0dXAoY29yZTogQ29yZVNldHVwKSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ29wZW5kaXN0cm9fc2VjdXJpdHk6IFNldHVwJyk7XG5cbiAgICBjb25zdCBjb25maWckID0gdGhpcy5pbml0aWFsaXplckNvbnRleHQuY29uZmlnLmNyZWF0ZTxTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGU+KCk7XG4gICAgY29uc3QgY29uZmlnOiBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGUgPSBhd2FpdCBjb25maWckLnBpcGUoZmlyc3QoKSkudG9Qcm9taXNlKCk7XG5cbiAgICBjb25zdCByb3V0ZXIgPSBjb3JlLmh0dHAuY3JlYXRlUm91dGVyKCk7XG5cbiAgICBjb25zdCBlc0NsaWVudDogSUxlZ2FjeUNsdXN0ZXJDbGllbnQgPSBjb3JlLm9wZW5zZWFyY2gubGVnYWN5LmNyZWF0ZUNsaWVudChcbiAgICAgICdvcGVuZGlzdHJvX3NlY3VyaXR5JyxcbiAgICAgIHtcbiAgICAgICAgcGx1Z2luczogW29wZW5zZWFyY2hTZWN1cml0eUNvbmZpZ3VyYXRvaW5QbHVnaW4sIG9wZW5zZWFyY2hTZWN1cml0eVBsdWdpbl0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuc2VjdXJpdHlDbGllbnQgPSBuZXcgU2VjdXJpdHlDbGllbnQoZXNDbGllbnQpO1xuXG4gICAgY29uc3Qgc2VjdXJpdHlTZXNzaW9uU3RvcmFnZUZhY3Rvcnk6IFNlc3Npb25TdG9yYWdlRmFjdG9yeTxTZWN1cml0eVNlc3Npb25Db29raWU+ID0gYXdhaXQgY29yZS5odHRwLmNyZWF0ZUNvb2tpZVNlc3Npb25TdG9yYWdlRmFjdG9yeTxcbiAgICAgIFNlY3VyaXR5U2Vzc2lvbkNvb2tpZVxuICAgID4oZ2V0U2VjdXJpdHlDb29raWVPcHRpb25zKGNvbmZpZykpO1xuXG4gICAgLy8gcHV0IGxvZ2dlciBpbnRvIHJvdXRlIGhhbmRsZXIgY29udGV4dCwgc28gdGhhdCB3ZSBkb24ndCBuZWVkIHRvIHBhc3MgdGhyb3VndGggcGFyYW1ldGVyc1xuICAgIGNvcmUuaHR0cC5yZWdpc3RlclJvdXRlSGFuZGxlckNvbnRleHQoJ3NlY3VyaXR5X3BsdWdpbicsIChjb250ZXh0LCByZXF1ZXN0KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICBlc0NsaWVudCxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBzZXR1cCBhdXRoXG4gICAgY29uc3QgYXV0aDogSUF1dGhlbnRpY2F0aW9uVHlwZSA9IGF3YWl0IGdldEF1dGhlbnRpY2F0aW9uSGFuZGxlcihcbiAgICAgIGNvbmZpZy5hdXRoLnR5cGUsXG4gICAgICByb3V0ZXIsXG4gICAgICBjb25maWcsXG4gICAgICBjb3JlLFxuICAgICAgZXNDbGllbnQsXG4gICAgICBzZWN1cml0eVNlc3Npb25TdG9yYWdlRmFjdG9yeSxcbiAgICAgIHRoaXMubG9nZ2VyXG4gICAgKTtcbiAgICBjb3JlLmh0dHAucmVnaXN0ZXJBdXRoKGF1dGguYXV0aEhhbmRsZXIpO1xuXG4gICAgLy8gUmVnaXN0ZXIgc2VydmVyIHNpZGUgQVBJc1xuICAgIGRlZmluZVJvdXRlcyhyb3V0ZXIpO1xuICAgIGRlZmluZUF1dGhUeXBlUm91dGVzKHJvdXRlciwgY29uZmlnKTtcbiAgICAvLyBzZXQgdXAgbXVsdGktdGVuZW50IHJvdXRlc1xuICAgIGlmIChjb25maWcubXVsdGl0ZW5hbmN5Py5lbmFibGVkKSB7XG4gICAgICBzZXR1cE11bHRpdGVuYW50Um91dGVzKHJvdXRlciwgc2VjdXJpdHlTZXNzaW9uU3RvcmFnZUZhY3RvcnksIHRoaXMuc2VjdXJpdHlDbGllbnQpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcubXVsdGl0ZW5hbmN5LmVuYWJsZWQgJiYgY29uZmlnLm11bHRpdGVuYW5jeS5lbmFibGVfYWdncmVnYXRpb25fdmlldykge1xuICAgICAgY29yZS5zYXZlZE9iamVjdHMuYWRkQ2xpZW50V3JhcHBlcihcbiAgICAgICAgMixcbiAgICAgICAgJ3NlY3VyaXR5LXNhdmVkLW9iamVjdC1jbGllbnQtd3JhcHBlcicsXG4gICAgICAgIHRoaXMuc2F2ZWRPYmplY3RDbGllbnRXcmFwcGVyLndyYXBwZXJGYWN0b3J5XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjb25maWckLFxuICAgICAgc2VjdXJpdHlDb25maWdDbGllbnQ6IGVzQ2xpZW50LFxuICAgIH07XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgbW9yZSBsb2dzXG4gIHB1YmxpYyBhc3luYyBzdGFydChjb3JlOiBDb3JlU3RhcnQpIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnb3BlbmRpc3Ryb19zZWN1cml0eTogU3RhcnRlZCcpO1xuXG4gICAgY29uc3QgY29uZmlnJCA9IHRoaXMuaW5pdGlhbGl6ZXJDb250ZXh0LmNvbmZpZy5jcmVhdGU8U2VjdXJpdHlQbHVnaW5Db25maWdUeXBlPigpO1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGNvbmZpZyQucGlwZShmaXJzdCgpKS50b1Byb21pc2UoKTtcblxuICAgIHRoaXMuc2F2ZWRPYmplY3RDbGllbnRXcmFwcGVyLmh0dHBTdGFydCA9IGNvcmUuaHR0cDtcbiAgICB0aGlzLnNhdmVkT2JqZWN0Q2xpZW50V3JhcHBlci5jb25maWcgPSBjb25maWc7XG5cbiAgICBpZiAoY29uZmlnLm11bHRpdGVuYW5jeT8uZW5hYmxlZCkge1xuICAgICAgY29uc3QgZ2xvYmFsQ29uZmlnJDogT2JzZXJ2YWJsZTxTaGFyZWRHbG9iYWxDb25maWc+ID0gdGhpcy5pbml0aWFsaXplckNvbnRleHQuY29uZmlnLmxlZ2FjeVxuICAgICAgICAuZ2xvYmFsQ29uZmlnJDtcbiAgICAgIGNvbnN0IGdsb2JhbENvbmZpZzogU2hhcmVkR2xvYmFsQ29uZmlnID0gYXdhaXQgZ2xvYmFsQ29uZmlnJC5waXBlKGZpcnN0KCkpLnRvUHJvbWlzZSgpO1xuICAgICAgY29uc3Qgb3BlbnNlYXJjaERhc2hib2FyZHNJbmRleCA9IGdsb2JhbENvbmZpZy5vcGVuc2VhcmNoRGFzaGJvYXJkcy5pbmRleDtcbiAgICAgIGNvbnN0IHR5cGVSZWdpc3RyeTogSVNhdmVkT2JqZWN0VHlwZVJlZ2lzdHJ5ID0gY29yZS5zYXZlZE9iamVjdHMuZ2V0VHlwZVJlZ2lzdHJ5KCk7XG4gICAgICBjb25zdCBlc0NsaWVudCA9IGNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNJbnRlcm5hbFVzZXI7XG4gICAgICBjb25zdCBtaWdyYXRpb25DbGllbnQgPSBjcmVhdGVNaWdyYXRpb25PcGVuU2VhcmNoQ2xpZW50KGVzQ2xpZW50LCB0aGlzLmxvZ2dlcik7XG5cbiAgICAgIHNldHVwSW5kZXhUZW1wbGF0ZShlc0NsaWVudCwgb3BlbnNlYXJjaERhc2hib2FyZHNJbmRleCwgdHlwZVJlZ2lzdHJ5LCB0aGlzLmxvZ2dlcik7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZXI6IFNhdmVkT2JqZWN0c1NlcmlhbGl6ZXIgPSBjb3JlLnNhdmVkT2JqZWN0cy5jcmVhdGVTZXJpYWxpemVyKCk7XG4gICAgICBjb25zdCBvcGVuc2VhcmNoRGFzaGJvYXJkc1ZlcnNpb24gPSB0aGlzLmluaXRpYWxpemVyQ29udGV4dC5lbnYucGFja2FnZUluZm8udmVyc2lvbjtcbiAgICAgIG1pZ3JhdGVUZW5hbnRJbmRpY2VzKFxuICAgICAgICBvcGVuc2VhcmNoRGFzaGJvYXJkc1ZlcnNpb24sXG4gICAgICAgIG1pZ3JhdGlvbkNsaWVudCxcbiAgICAgICAgdGhpcy5zZWN1cml0eUNsaWVudCxcbiAgICAgICAgdHlwZVJlZ2lzdHJ5LFxuICAgICAgICBzZXJpYWxpemVyLFxuICAgICAgICB0aGlzLmxvZ2dlclxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaHR0cDogY29yZS5odHRwLFxuICAgICAgZXM6IGNvcmUub3BlbnNlYXJjaC5sZWdhY3ksXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge31cbn1cbiJdfQ==