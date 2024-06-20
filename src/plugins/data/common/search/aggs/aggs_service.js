"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggsRequiredUiSettings = exports.AggsCommonService = void 0;

var _common = require("../../../common");

var _ = require("./");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
const aggsRequiredUiSettings = ['dateFormat', 'dateFormat:scaled', 'dateFormat:tz', _common.UI_SETTINGS.HISTOGRAM_BAR_TARGET, _common.UI_SETTINGS.HISTOGRAM_MAX_BARS, _common.UI_SETTINGS.SEARCH_QUERY_LANGUAGE, _common.UI_SETTINGS.QUERY_ALLOW_LEADING_WILDCARDS, _common.UI_SETTINGS.QUERY_STRING_OPTIONS, _common.UI_SETTINGS.COURIER_IGNORE_FILTER_IF_FIELD_NOT_IN_INDEX];
/** @internal */

exports.aggsRequiredUiSettings = aggsRequiredUiSettings;

/**
 * The aggs service provides a means of modeling and manipulating the various
 * OpenSearch aggregations supported by OpenSearch Dashboards, providing the ability to
 * output the correct DSL when you are ready to send your request to OpenSearch.
 */
class AggsCommonService {
  constructor() {
    _defineProperty(this, "aggTypesRegistry", new _.AggTypesRegistry());
  }

  setup({
    registerFunction
  }) {
    const aggTypesSetup = this.aggTypesRegistry.setup(); // register each agg type

    const aggTypes = (0, _.getAggTypes)();
    aggTypes.buckets.forEach(({
      name,
      fn
    }) => aggTypesSetup.registerBucket(name, fn));
    aggTypes.metrics.forEach(({
      name,
      fn
    }) => aggTypesSetup.registerMetric(name, fn)); // register expression functions for each agg type

    const aggFunctions = (0, _.getAggTypesFunctions)();
    aggFunctions.forEach(fn => registerFunction(fn));
    return {
      types: aggTypesSetup
    };
  }

  start({
    getConfig,
    uiSettings
  }) {
    const aggTypesStart = this.aggTypesRegistry.start({
      uiSettings
    });
    return {
      calculateAutoTimeExpression: (0, _.getCalculateAutoTimeExpression)(getConfig),
      createAggConfigs: (indexPattern, configStates = [], schemas) => {
        return new _.AggConfigs(indexPattern, configStates, {
          typesRegistry: aggTypesStart
        });
      },
      types: aggTypesStart
    };
  }

}

exports.AggsCommonService = AggsCommonService;