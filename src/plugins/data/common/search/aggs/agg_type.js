"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggType = void 0;

var _lodash = require("lodash");

var _i18n = require("@osd/i18n");

var _agg_params = require("./agg_params");

var _base = require("./param_types/base");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AggType {
  /**
   * the unique, unchanging, name that we have assigned this aggType
   *
   * @property name
   * @type {string}
   */

  /**
   * the name of the opensearch aggregation that this aggType represents. Usually just this.name
   *
   * @property name
   * @type {string}
   */

  /**
   * the name of the expression function that this aggType represents.
   * TODO: this should probably be a required field.
   *
   * @property name
   * @type {string}
   */

  /**
   * the user friendly name that will be shown in the ui for this aggType
   *
   * @property title
   * @type {string}
   */

  /**
   * a function that will be called when this aggType is assigned to
   * an aggConfig, and that aggConfig is being rendered (in a form, chart, etc.).
   *
   * @method makeLabel
   * @param {AggConfig} aggConfig - an agg config of this type
   * @returns {string} - label that can be used in the ui to describe the aggConfig
   */

  /**
   * Describes if this aggType creates data that is ordered, and if that ordered data
   * is some sort of time series.
   *
   * If the aggType does not create ordered data, set this to something "falsy".
   *
   * If this does create orderedData, then the value should be an object.
   *
   * If the orderdata is some sort of time series, `this.ordered` should be an object
   * with the property `date: true`
   *
   * @property ordered
   * @type {object|undefined}
   */

  /**
   * Flag that prevents this aggregation from being included in the dsl. This is only
   * used by the count aggregation (currently) since it doesn't really exist and it's output
   * is available on every bucket.
   *
   * @type {Boolean}
   */

  /**
   * The method to create a filter representation of the bucket
   * @param {object} aggConfig The instance of the aggConfig
   * @param {mixed} key The key for the bucket
   * @returns {object} The filter
   */

  /**
   * An instance of {{#crossLink "AggParams"}}{{/crossLink}}.
   *
   * @property params
   * @type {AggParams}
   */

  /**
   * Designed for multi-value metric aggs, this method can return a
   * set of AggConfigs that should replace this aggConfig in requests
   *
   * @method getRequestAggs
   * @returns {array[AggConfig]} - an array of aggConfig objects
   *                                         that should replace this one,
   *                                         or undefined
   */

  /**
   * Designed for multi-value metric aggs, this method can return a
   * set of AggConfigs that should replace this aggConfig in result sets
   * that walk the AggConfig set.
   *
   * @method getResponseAggs
   * @returns {array[AggConfig]|undefined} - an array of aggConfig objects
   *                                         that should replace this one,
   *                                         or undefined
   */

  /**
   * A function that will be called each time an aggConfig of this type
   * is created, giving the agg type a chance to modify the agg config
   */

  /**
   * A function that needs to be called after the main request has been made
   * and should return an updated response
   * @param aggConfigs - agg config array used to produce main request
   * @param aggConfig - AggConfig that requested the post flight request
   * @param searchSourceAggs - SearchSource aggregation configuration
   * @param resp - Response to the main request
   * @param nestedSearchSource - the new SearchSource that will be used to make post flight request
   * @return {Promise}
   */

  /**
   * Get the serialized format for the values produced by this agg type,
   * overridden by several metrics that always output a simple number.
   * You can pass this output to fieldFormatters.deserialize to get
   * the formatter instance.
   *
   * @param  {agg} agg - the agg to pick a format for
   * @return {SerializedFieldFormat}
   */

  /**
   * Generic AggType Constructor
   *
   * Used to create the values exposed by the agg_types module.
   *
   * @class AggType
   * @private
   * @param {object} config - used to set the properties of the AggType
   */
  constructor(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "subtype", void 0);

    _defineProperty(this, "dslName", void 0);

    _defineProperty(this, "expressionName", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "makeLabel", void 0);

    _defineProperty(this, "ordered", void 0);

    _defineProperty(this, "hasNoDsl", void 0);

    _defineProperty(this, "createFilter", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "getRequestAggs", void 0);

    _defineProperty(this, "getResponseAggs", void 0);

    _defineProperty(this, "decorateAggConfig", void 0);

    _defineProperty(this, "postFlightRequest", void 0);

    _defineProperty(this, "getSerializedFormat", void 0);

    _defineProperty(this, "getValue", void 0);

    _defineProperty(this, "getKey", void 0);

    _defineProperty(this, "paramByName", name => {
      return this.params.find(p => p.name === name);
    });

    this.name = config.name;
    this.type = config.type || 'metrics';
    this.dslName = config.dslName || config.name;
    this.expressionName = config.expressionName;
    this.title = config.title;
    this.makeLabel = config.makeLabel || (0, _lodash.constant)(this.name);
    this.ordered = config.ordered;
    this.hasNoDsl = !!config.hasNoDsl;

    if (config.createFilter) {
      this.createFilter = config.createFilter;
    }

    if (config.params && config.params.length && config.params[0] instanceof _base.BaseParamType) {
      this.params = config.params;
    } else {
      // always append the raw JSON param unless it is configured to false
      const params = config.params ? [...config.params] : [];

      if (config.json !== false) {
        params.push({
          name: 'json',
          type: 'json',
          advanced: true
        });
      } // always append custom label


      if (config.customLabels !== false) {
        params.push({
          name: 'customLabel',
          displayName: _i18n.i18n.translate('data.search.aggs.string.customLabel', {
            defaultMessage: 'Custom label'
          }),
          type: 'string',
          write: _lodash.noop
        });
      }

      this.params = (0, _agg_params.initParams)(params);
    }

    this.getRequestAggs = config.getRequestAggs || _lodash.noop;

    this.getResponseAggs = config.getResponseAggs || (() => {});

    this.decorateAggConfig = config.decorateAggConfig || (() => ({}));

    this.postFlightRequest = config.postFlightRequest || _lodash.identity;

    this.getSerializedFormat = config.getSerializedFormat || (agg => {
      return agg.params.field ? agg.aggConfigs.indexPattern.getFormatterForField(agg.params.field).toJSON() : {};
    });

    this.getValue = config.getValue || ((agg, bucket) => {});
  }

}

exports.AggType = AggType;