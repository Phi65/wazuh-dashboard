"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountMetricAgg = void 0;

var _i18n = require("@osd/i18n");

var _metric_agg_type = require("./metric_agg_type");

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
const getCountMetricAgg = () => new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.COUNT,
  title: _i18n.i18n.translate('data.search.aggs.metrics.countTitle', {
    defaultMessage: 'Count'
  }),
  hasNoDsl: true,
  json: false,

  makeLabel() {
    return _i18n.i18n.translate('data.search.aggs.metrics.countLabel', {
      defaultMessage: 'Count'
    });
  },

  getSerializedFormat(agg) {
    return {
      id: 'number'
    };
  },

  getValue(agg, bucket) {
    return bucket.doc_count;
  },

  isScalable() {
    return true;
  }

});

exports.getCountMetricAgg = getCountMetricAgg;