"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggConfigs = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _agg_config = require("./agg_config");

var _agg_groups = require("./agg_groups");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function removeParentAggs(obj) {
  for (const prop in obj) {
    if (prop === 'parentAggs') delete obj[prop];else if (typeof obj[prop] === 'object') removeParentAggs(obj[prop]);
  }
}

function parseParentAggs(dslLvlCursor, dsl) {
  if (dsl.parentAggs) {
    _lodash.default.each(dsl.parentAggs, (agg, key) => {
      dslLvlCursor[key] = agg;
      parseParentAggs(dslLvlCursor, agg);
    });
  }
}

class AggConfigs {
  constructor(indexPattern, configStates = [], opts) {
    _defineProperty(this, "indexPattern", void 0);

    _defineProperty(this, "timeRange", void 0);

    _defineProperty(this, "typesRegistry", void 0);

    _defineProperty(this, "aggs", void 0);

    _defineProperty(this, "createAggConfig", (params, {
      addToAggConfigs = true,
      mustBeFirst = false
    } = {}) => {
      const {
        type
      } = params;
      let aggConfig;

      if (params instanceof _agg_config.AggConfig) {
        aggConfig = params;
        params.parent = this;
      } else {
        aggConfig = new _agg_config.AggConfig(this, { ...params,
          type: typeof type === 'string' ? this.typesRegistry.get(type) : type
        });
      }

      const addAggConfig = () => {
        return mustBeFirst ? this.aggs.unshift(aggConfig) : this.aggs.push(aggConfig);
      };

      if (addToAggConfigs) {
        addAggConfig();
      }

      return aggConfig;
    });

    this.typesRegistry = opts.typesRegistry;
    configStates = _agg_config.AggConfig.ensureIds(configStates);
    this.aggs = [];
    this.indexPattern = indexPattern;
    configStates.forEach(params => this.createAggConfig(params));
  }

  setTimeRange(timeRange) {
    this.timeRange = timeRange;

    const updateAggTimeRange = agg => {
      _lodash.default.each(agg.params, param => {
        if (param instanceof _agg_config.AggConfig) {
          updateAggTimeRange(param);
        }
      });

      if (_lodash.default.get(agg, 'type.name') === 'date_histogram') {
        agg.params.timeRange = timeRange;
      }
    };

    this.aggs.forEach(updateAggTimeRange);
  } // clone method will reuse existing AggConfig in the list (will not create new instances)


  clone({
    enabledOnly = true
  } = {}) {
    const filterAggs = agg => {
      if (!enabledOnly) return true;
      return agg.enabled;
    };

    const aggConfigs = new AggConfigs(this.indexPattern, this.aggs.filter(filterAggs), {
      typesRegistry: this.typesRegistry
    });
    return aggConfigs;
  }

  /**
   * Data-by-data comparison of this Aggregation
   * Ignores the non-array indexes
   * @param aggConfigs an AggConfigs instance
   */
  jsonDataEquals(aggConfigs) {
    if (aggConfigs.length !== this.aggs.length) {
      return false;
    }

    for (let i = 0; i < this.aggs.length; i += 1) {
      if (!_lodash.default.isEqual(aggConfigs[i].toJSON(), this.aggs[i].toJSON())) {
        return false;
      }
    }

    return true;
  }

  toDsl(hierarchical = false) {
    const dslTopLvl = {};
    let dslLvlCursor;
    let nestedMetrics;

    if (hierarchical) {
      // collect all metrics, and filter out the ones that we won't be copying
      nestedMetrics = this.aggs.filter(function (agg) {
        return agg.type.type === 'metrics' && agg.type.name !== 'count';
      }).map(agg => {
        return {
          config: agg,
          dsl: agg.toDsl(this)
        };
      });
    }

    this.getRequestAggs().filter(config => !config.type.hasNoDsl).forEach((config, i, list) => {
      if (!dslLvlCursor) {
        // start at the top level
        dslLvlCursor = dslTopLvl;
      } else {
        const prevConfig = list[i - 1];
        const prevDsl = dslLvlCursor[prevConfig.id]; // advance the cursor and nest under the previous agg, or
        // put it on the same level if the previous agg doesn't accept
        // sub aggs

        dslLvlCursor = prevDsl.aggs || dslLvlCursor;
      }

      const dsl = dslLvlCursor[config.id] = config.toDsl(this);
      let subAggs;
      parseParentAggs(dslLvlCursor, dsl);

      if (config.type.type === _agg_groups.AggGroupNames.Buckets && i < list.length - 1) {
        // buckets that are not the last item in the list accept sub-aggs
        subAggs = dsl.aggs || (dsl.aggs = {});
      }

      if (subAggs && nestedMetrics) {
        nestedMetrics.forEach(agg => {
          subAggs[agg.config.id] = agg.dsl; // if a nested metric agg has parent aggs, we have to add them to every level of the tree
          // to make sure "bucket_path" references in the nested metric agg itself are still working

          if (agg.dsl.parentAggs) {
            Object.entries(agg.dsl.parentAggs).forEach(([parentAggId, parentAgg]) => {
              subAggs[parentAggId] = parentAgg;
            });
          }
        });
      }
    });
    removeParentAggs(dslTopLvl);
    return dslTopLvl;
  }

  getAll() {
    return [...this.aggs];
  }

  byIndex(index) {
    return this.aggs[index];
  }

  byId(id) {
    return this.aggs.find(agg => agg.id === id);
  }

  byName(name) {
    return this.aggs.filter(agg => {
      var _agg$type;

      return ((_agg$type = agg.type) === null || _agg$type === void 0 ? void 0 : _agg$type.name) === name;
    });
  }

  byType(type) {
    return this.aggs.filter(agg => {
      var _agg$type2;

      return ((_agg$type2 = agg.type) === null || _agg$type2 === void 0 ? void 0 : _agg$type2.type) === type;
    });
  }

  byTypeName(type) {
    return this.byName(type);
  }

  bySchemaName(schema) {
    return this.aggs.filter(agg => agg.schema === schema);
  }

  getRequestAggs() {
    // collect all the aggregations
    const aggregations = this.aggs.filter(agg => agg.enabled && agg.type).reduce((requestValuesAggs, agg) => {
      const aggs = agg.getRequestAggs();
      return aggs ? requestValuesAggs.concat(aggs) : requestValuesAggs;
    }, []); // move metrics to the end

    return _lodash.default.sortBy(aggregations, agg => agg.type.type === _agg_groups.AggGroupNames.Metrics ? 1 : 0);
  }

  getRequestAggById(id) {
    return this.aggs.find(agg => agg.id === id);
  }
  /**
   * Gets the AggConfigs (and possibly ResponseAggConfigs) that
   * represent the values that will be produced when all aggs
   * are run.
   *
   * With multi-value metric aggs it is possible for a single agg
   * request to result in multiple agg values, which is why the length
   * of a vis' responseValuesAggs may be different than the vis' aggs
   *
   * @return {array[AggConfig]}
   */


  getResponseAggs() {
    return this.getRequestAggs().reduce(function (responseValuesAggs, agg) {
      const aggs = agg.getResponseAggs();
      return aggs ? responseValuesAggs.concat(aggs) : responseValuesAggs;
    }, []);
  }
  /**
   * Find a response agg by it's id. This may be an agg in the aggConfigs, or one
   * created specifically for a response value
   *
   * @param  {string} id - the id of the agg to find
   * @return {AggConfig}
   */


  getResponseAggById(id) {
    id = String(id);

    const reqAgg = _lodash.default.find(this.getRequestAggs(), function (agg) {
      return id.substr(0, String(agg.id).length) === agg.id;
    });

    if (!reqAgg) return;
    return _lodash.default.find(reqAgg.getResponseAggs(), {
      id
    });
  }

  onSearchRequestStart(searchSource, options) {
    return Promise.all( // @ts-ignore
    this.getRequestAggs().map(agg => agg.onSearchRequestStart(searchSource, options)));
  }

}

exports.AggConfigs = AggConfigs;