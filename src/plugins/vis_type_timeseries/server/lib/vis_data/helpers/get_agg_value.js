"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAggValue = void 0;

var _lodash = require("lodash");

var _to_percentile_number = require("../../../../common/to_percentile_number");

var _metric_types = require("../../../../common/metric_types");

/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const aggFns = {
  max: _lodash.max,
  min: _lodash.min,
  sum: _lodash.sum,
  noop: _lodash.noop,
  concat: values => values.join(', '),
  avg: values => (0, _lodash.sum)(values) / values.length
};

const getAggValue = (row, metric) => {
  // Extended Stats
  if ((0, _lodash.includes)(_metric_types.EXTENDED_STATS_TYPES, metric.type)) {
    const isStdDeviation = /^std_deviation/.test(metric.type);
    const modeIsBounds = ~['upper', 'lower'].indexOf(metric.mode);

    if (isStdDeviation && modeIsBounds) {
      return (0, _lodash.get)(row, `${metric.id}.std_deviation_bounds.${metric.mode}`);
    }

    return (0, _lodash.get)(row, `${metric.id}.${metric.type}`);
  }

  switch (metric.type) {
    case _metric_types.METRIC_TYPES.PERCENTILE:
      const percentileKey = (0, _to_percentile_number.toPercentileNumber)(`${metric.percent}`);
      return row[metric.id].values[percentileKey];

    case _metric_types.METRIC_TYPES.PERCENTILE_RANK:
      const percentileRankKey = (0, _to_percentile_number.toPercentileNumber)(`${metric.value}`);
      return row[metric.id] && row[metric.id].values && row[metric.id].values[percentileRankKey];

    case _metric_types.METRIC_TYPES.TOP_HIT:
      if (row[metric.id].doc_count === 0) {
        return null;
      }

      const hits = (0, _lodash.get)(row, [metric.id, 'docs', 'hits', 'hits'], []);
      const values = hits.map(doc => (0, _lodash.get)(doc, `_source.${metric.field}`));
      const aggWith = metric.agg_with && aggFns[metric.agg_with] || aggFns.noop;
      return aggWith(values);

    case _metric_types.METRIC_TYPES.COUNT:
      return (0, _lodash.get)(row, 'doc_count', null);

    default:
      // Derivatives
      const normalizedValue = (0, _lodash.get)(row, `${metric.id}.normalized_value`, null); // Everything else

      const value = (0, _lodash.get)(row, `${metric.id}.value`, null);
      return normalizedValue || value;
  }
};

exports.getAggValue = getAggValue;