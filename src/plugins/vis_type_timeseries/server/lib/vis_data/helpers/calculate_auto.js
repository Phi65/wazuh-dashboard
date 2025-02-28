"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateAuto = void 0;

var _moment = _interopRequireDefault(require("moment"));

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
const d = _moment.default.duration;
const roundingRules = [[d(500, 'ms'), d(100, 'ms')], [d(5, 'second'), d(1, 'second')], [d(7.5, 'second'), d(5, 'second')], [d(15, 'second'), d(10, 'second')], [d(45, 'second'), d(30, 'second')], [d(3, 'minute'), d(1, 'minute')], [d(9, 'minute'), d(5, 'minute')], [d(20, 'minute'), d(10, 'minute')], [d(45, 'minute'), d(30, 'minute')], [d(2, 'hour'), d(1, 'hour')], [d(6, 'hour'), d(3, 'hour')], [d(24, 'hour'), d(12, 'hour')], [d(1, 'week'), d(1, 'd')], [d(3, 'week'), d(1, 'week')], [d(1, 'year'), d(1, 'month')], [Infinity, d(1, 'year')]];
const revRoundingRules = roundingRules.slice(0).reverse();

function find(rules, check, last) {
  function pick(buckets, duration) {
    const target = duration / buckets;
    let lastResp = null;

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const resp = check(rule[0], rule[1], target);

      if (resp == null) {
        if (!last) continue;
        if (lastResp) return lastResp;
        break;
      }

      if (!last) return resp;
      lastResp = resp;
    } // fallback to just a number of milliseconds, ensure ms is >= 1


    const ms = Math.max(Math.floor(target), 1);
    return _moment.default.duration(ms, 'ms');
  }

  return (buckets, duration) => {
    const interval = pick(buckets, duration);
    if (interval) return _moment.default.duration(interval._data);
  };
}

const calculateAuto = {
  near: find(revRoundingRules, function near(bound, interval, target) {
    if (bound > target) return interval;
  }, true),
  lessThan: find(revRoundingRules, function lessThan(_bound, interval, target) {
    if (interval < target) return interval;
  }),
  atLeast: find(revRoundingRules, function atLeast(_bound, interval, target) {
    if (interval <= target) return interval;
  })
};
exports.calculateAuto = calculateAuto;