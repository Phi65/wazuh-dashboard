"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pivot = pivot;

var _lodash = require("lodash");

var _helpers = require("../../helpers");

var _basic_aggs = require("../../../../../common/basic_aggs");

var _get_buckets_path = require("../../helpers/get_buckets_path");

var _bucket_transform = require("../../helpers/bucket_transform");

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
function pivot(req, panel) {
  return next => doc => {
    const {
      sort
    } = req.payload.state;

    if (panel.pivot_id) {
      (0, _helpers.overwrite)(doc, 'aggs.pivot.terms.field', panel.pivot_id);
      (0, _helpers.overwrite)(doc, 'aggs.pivot.terms.size', panel.pivot_rows);

      if (sort) {
        const series = panel.series.find(item => item.id === sort.column);
        const metric = series && (0, _lodash.last)(series.metrics);

        if (metric && metric.type === 'count') {
          (0, _helpers.overwrite)(doc, 'aggs.pivot.terms.order', {
            _count: sort.order
          });
        } else if (metric && _basic_aggs.basicAggs.includes(metric.type)) {
          const sortAggKey = `${metric.id}-SORT`;
          const fn = _bucket_transform.bucketTransform[metric.type];
          const bucketPath = (0, _get_buckets_path.getBucketsPath)(metric.id, series.metrics).replace(metric.id, sortAggKey);
          (0, _helpers.overwrite)(doc, `aggs.pivot.terms.order`, {
            [bucketPath]: sort.order
          });
          (0, _helpers.overwrite)(doc, `aggs.pivot.aggs`, {
            [sortAggKey]: fn(metric)
          });
        } else {
          (0, _helpers.overwrite)(doc, 'aggs.pivot.terms.order', {
            _key: (0, _lodash.get)(sort, 'order', 'asc')
          });
        }
      }
    } else {
      (0, _helpers.overwrite)(doc, 'aggs.pivot.filter.match_all', {});
    }

    return next(doc);
  };
}