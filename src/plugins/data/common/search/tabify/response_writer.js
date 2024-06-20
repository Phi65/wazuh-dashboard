"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabbedAggResponseWriter = void 0;

var _lodash = require("lodash");

var _get_columns = require("./get_columns");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Writer class that collects information about an aggregation response and
 * produces a table, or a series of tables.
 */
class TabbedAggResponseWriter {
  /**
   * @param {AggConfigs} aggs - the agg configs object to which the aggregation response correlates
   * @param {boolean} metricsAtAllLevels - setting to true will produce metrics for every bucket
   * @param {boolean} partialRows - setting to true will not remove rows with missing values
   */
  constructor(aggs, {
    metricsAtAllLevels = false,
    partialRows = false
  }) {
    _defineProperty(this, "columns", void 0);

    _defineProperty(this, "rows", []);

    _defineProperty(this, "bucketBuffer", []);

    _defineProperty(this, "metricBuffer", []);

    _defineProperty(this, "partialRows", void 0);

    this.partialRows = partialRows;
    this.columns = (0, _get_columns.tabifyGetColumns)(aggs.getResponseAggs(), !metricsAtAllLevels);
    this.rows = [];
  }
  /**
   * Create a new row by reading the row buffer and bucketBuffer
   */


  row() {
    const rowBuffer = {};
    this.bucketBuffer.forEach(bucket => {
      rowBuffer[bucket.id] = bucket.value;
    });
    this.metricBuffer.forEach(metric => {
      rowBuffer[metric.id] = metric.value;
    });
    const isPartialRow = !this.columns.every(column => rowBuffer.hasOwnProperty(column.id));
    const removePartial = isPartialRow && !this.partialRows;

    if (!(0, _lodash.isEmpty)(rowBuffer) && !removePartial) {
      this.rows.push(rowBuffer);
    }
  }

  response() {
    return {
      columns: this.columns,
      rows: this.rows
    };
  }

}

exports.TabbedAggResponseWriter = TabbedAggResponseWriter;