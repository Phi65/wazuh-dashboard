"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggsService = void 0;

var _lodash = require("lodash");

var _common = require("../../../common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The aggs service provides a means of modeling and manipulating the various
 * OpenSearch aggregations supported by OpenSearch Dashboards, providing the ability to
 * output the correct DSL when you are ready to send your request to OpenSearch.
 */
class AggsService {
  constructor() {
    _defineProperty(this, "aggsCommonService", new _common.AggsCommonService());

    _defineProperty(this, "calculateBounds", timeRange => (0, _common.calculateBounds)(timeRange, {}));
  }

  setup({
    registerFunction
  }) {
    return this.aggsCommonService.setup({
      registerFunction
    });
  }

  start({
    fieldFormats,
    uiSettings
  }) {
    return {
      asScopedToClient: async savedObjectsClient => {
        const uiSettingsClient = uiSettings.asScopedToClient(savedObjectsClient);
        const formats = await fieldFormats.fieldFormatServiceFactory(uiSettingsClient); // cache ui settings, only including items which are explicitly needed by aggs

        const uiSettingsCache = (0, _lodash.pick)(await uiSettingsClient.getAll(), _common.aggsRequiredUiSettings);

        const getConfig = key => {
          return uiSettingsCache[key];
        };

        const {
          calculateAutoTimeExpression,
          types
        } = this.aggsCommonService.start({
          getConfig,
          uiSettings: uiSettingsClient
        });
        const aggTypesDependencies = {
          calculateBounds: this.calculateBounds,
          getConfig,
          getFieldFormatsStart: () => ({
            deserialize: formats.deserialize,
            getDefaultInstance: formats.getDefaultInstance
          }),

          /**
           * Date histogram and date range need to know whether we are using the
           * default timezone, but `isDefault` is not currently offered on the
           * server, so we need to manually check for the default value.
           */
          isDefaultTimezone: () => getConfig('dateFormat:tz') === 'Browser'
        };
        const typesRegistry = {
          get: name => {
            const type = types.get(name);

            if (!type) {
              return;
            }

            return type(aggTypesDependencies);
          },
          getAll: () => {
            return {
              // initialize each agg type on the fly
              buckets: types.getAll().buckets.map(type => type(aggTypesDependencies)),
              metrics: types.getAll().metrics.map(type => type(aggTypesDependencies))
            };
          }
        };
        return {
          calculateAutoTimeExpression,
          createAggConfigs: (indexPattern, configStates = [], schemas) => {
            return new _common.AggConfigs(indexPattern, configStates, {
              typesRegistry
            });
          },
          types: typesRegistry
        };
      }
    };
  }

  stop() {}

}

exports.AggsService = AggsService;