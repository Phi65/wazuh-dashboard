"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offsetTime = offsetTime;
exports.preprocessOffset = preprocessOffset;

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
// usually reverse = false on the request, true on the response
function offsetTime(milliseconds, offset, reverse) {
  if (!offset.match(/[-+][0-9]+[mshdwMy]/g)) {
    throw new Error('Malformed `offset` at ' + offset);
  }

  const parts = offset.match(/[-+]|[0-9]+|[mshdwMy]/g);
  let add = parts[0] === '+';
  add = reverse ? !add : add;
  const mode = add ? 'add' : 'subtract';
  const momentObj = (0, _moment.default)(milliseconds)[mode](parts[1], parts[2]);
  return momentObj.valueOf();
}

function timeRangeErrorMsg(offset) {
  return `Malformed timerange offset, expecting "timerange:<number>", received: ${offset}`;
}
/*
 * Calculate offset when parameter is requesting a relative offset based on requested time range.
 *
 * @param {string} offset - offset parameter value
 * @param {number} from - opensearchDashboards global time 'from' in milliseconds
 * @param {number} to - opensearchDashboards global time 'to' in milliseconds
 */


function preprocessOffset(offset, from, to) {
  if (!offset.startsWith('timerange')) {
    return offset;
  }

  const parts = offset.split(':');

  if (parts.length === 1) {
    throw new Error(timeRangeErrorMsg(offset));
  }

  const factor = parseFloat(parts[1]);

  if (isNaN(factor)) {
    throw new Error(timeRangeErrorMsg(offset));
  }

  if (factor >= 0) {
    throw new Error('Malformed timerange offset, factor must be negative number.');
  }

  const deltaSeconds = (to - from) / 1000;
  const processedOffset = Math.round(deltaSeconds * factor);
  return `${processedOffset}s`;
}