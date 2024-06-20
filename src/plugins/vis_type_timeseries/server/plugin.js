"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisTypeTimeseriesPlugin = void 0;

var _get_vis_data = require("./lib/get_vis_data");

var _validation_telemetry = require("./validation_telemetry");

var _vis = require("./routes/vis");

var _fields = require("./routes/fields");

var _search_strategies = require("./lib/search_strategies");

var _ui_settings = require("./ui_settings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VisTypeTimeseriesPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "validationTelementryService", void 0);

    this.initializerContext = initializerContext;
    this.validationTelementryService = new _validation_telemetry.ValidationTelemetryService();
  }

  setup(core, plugins) {
    const logger = this.initializerContext.logger.get('visTypeTimeseries');
    core.uiSettings.register(_ui_settings.uiSettings);
    const config$ = this.initializerContext.config.create(); // Global config contains things like the OpenSearch shard timeout

    const globalConfig$ = this.initializerContext.config.legacy.globalConfig$;
    const router = core.http.createRouter();
    const searchStrategyRegistry = new _search_strategies.SearchStrategyRegistry();
    const framework = {
      core,
      plugins,
      config$,
      globalConfig$,
      logger,
      router,
      searchStrategyRegistry
    };

    (async () => {
      const validationTelemetry = await this.validationTelementryService.setup(core, { ...plugins,
        globalConfig$
      });
      (0, _vis.visDataRoutes)(router, framework, validationTelemetry);
      (0, _fields.fieldsRoutes)(framework);
    })();

    return {
      getVisData: async (requestContext, fakeRequest, options) => {
        return await (0, _get_vis_data.getVisData)(requestContext, { ...fakeRequest,
          body: options
        }, framework);
      },
      addSearchStrategy: searchStrategyRegistry.addStrategy.bind(searchStrategyRegistry)
    };
  }

  start(core) {}

}

exports.VisTypeTimeseriesPlugin = VisTypeTimeseriesPlugin;