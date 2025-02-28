"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = des;

var _i18n = require("@osd/i18n");

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
function des(points, alpha, beta) {
  let level;
  let prevLevel;
  let trend;
  let prevTrend;
  let unknownCount = 0;

  if (points.length < 2) {
    throw new Error(_i18n.i18n.translate('timeline.serverSideErrors.holtFunction.notEnoughPointsErrorMessage', {
      defaultMessage: 'You need at least 2 points to use double exponential smoothing'
    }));
  }

  const smoothedPoints = _lodash.default.map(points, (point, i) => {
    if (i === 0) {
      return point;
    }

    if (i === 1) {
      // Establish initial values for level and trend;
      level = points[0];
      trend = points[1] - points[0]; // This is sort of a lame way to do this
    }

    if (point == null) {
      unknownCount++;
    } else {
      unknownCount = 0; // These 2 variables are not required, but are used for clarity.

      prevLevel = level;
      prevTrend = trend;
      level = alpha * point + (1 - alpha) * (prevLevel + prevTrend);
      trend = beta * (level - prevLevel) + (1 - beta) * prevTrend;
    }

    return level + unknownCount * trend;
  }, []);

  return smoothedPoints;
}

module.exports = exports.default;