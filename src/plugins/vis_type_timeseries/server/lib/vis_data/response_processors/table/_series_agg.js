"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeriesAgg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function mean(values) {
  return _lodash.default.sum(values) / values.length;
}

const basic = fnName => targetSeries => {
  const data = [];

  _lodash.default.zip(...targetSeries).forEach(row => {
    const key = row[0][0];
    const values = row.map(r => r[1]);

    const fn = _lodash.default[fnName] || (() => null);

    data.push([key, fn(values)]);
  });

  return [data];
};

const overall = fnName => targetSeries => {
  const fn = _lodash.default[fnName];
  const keys = [];
  const values = [];

  _lodash.default.zip(...targetSeries).forEach(row => {
    keys.push(row[0][0]);
    values.push(fn(row.map(r => r[1])));
  });

  return [keys.map(k => [k, fn(values)])];
};

const SeriesAgg = {
  sum: basic('sum'),
  max: basic('max'),
  min: basic('min'),

  mean(targetSeries) {
    const data = [];

    _lodash.default.zip(...targetSeries).forEach(row => {
      const key = row[0][0];
      const values = row.map(r => r[1]);
      data.push([key, mean(values)]);
    });

    return [data];
  },

  overall_max: overall('max'),
  overall_min: overall('min'),
  overall_sum: overall('sum'),

  overall_avg(targetSeries) {
    const fn = mean;
    const keys = [];
    const values = [];

    _lodash.default.zip(...targetSeries).forEach(row => {
      keys.push(row[0][0]);
      values.push(_lodash.default.sum(row.map(r => r[1])));
    });

    return [keys.map(k => [k, fn(values)])];
  },

  cumulative_sum(targetSeries) {
    const data = [];
    let sum = 0;

    _lodash.default.zip(...targetSeries).forEach(row => {
      const key = row[0][0];
      sum += _lodash.default.sum(row.map(r => r[1]));
      data.push([key, sum]);
    });

    return [data];
  }

};
exports.SeriesAgg = SeriesAgg;