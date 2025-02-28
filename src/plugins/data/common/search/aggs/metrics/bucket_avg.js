"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBucketAvgMetricAgg = void 0;

var _i18n = require("@osd/i18n");

var _lodash = require("lodash");

var _metric_agg_type = require("./metric_agg_type");

var _make_nested_label = require("./lib/make_nested_label");

var _sibling_pipeline_agg_helper = require("./lib/sibling_pipeline_agg_helper");

var _metric_agg_types = require("./metric_agg_types");

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
const overallAverageLabel = _i18n.i18n.translate('data.search.aggs.metrics.overallAverageLabel', {
  defaultMessage: 'overall average'
});

const averageBucketTitle = _i18n.i18n.translate('data.search.aggs.metrics.averageBucketTitle', {
  defaultMessage: 'Average Bucket'
});

const getBucketAvgMetricAgg = () => {
  const {
    subtype,
    params,
    getSerializedFormat
  } = _sibling_pipeline_agg_helper.siblingPipelineAggHelper;
  return new _metric_agg_type.MetricAggType({
    name: _metric_agg_types.METRIC_TYPES.AVG_BUCKET,
    title: averageBucketTitle,
    makeLabel: agg => (0, _make_nested_label.makeNestedLabel)(agg, overallAverageLabel),
    subtype,
    params: [...params()],
    getSerializedFormat,

    getValue(agg, bucket) {
      const customMetric = agg.getParam('customMetric');
      const customBucket = agg.getParam('customBucket');
      const scaleMetrics = customMetric.type && customMetric.type.isScalable();
      let value = bucket[agg.id] && bucket[agg.id].value;

      if (scaleMetrics && customBucket.type.name === 'date_histogram') {
        const aggInfo = customBucket.write();
        value *= (0, _lodash.get)(aggInfo, 'bucketInterval.scale', 1);
      }

      return value;
    }

  });
};

exports.getBucketAvgMetricAgg = getBucketAvgMetricAgg;