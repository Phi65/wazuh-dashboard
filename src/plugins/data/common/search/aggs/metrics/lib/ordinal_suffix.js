"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ordinalSuffix = ordinalSuffix;

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
// adopted from http://stackoverflow.com/questions/3109978/php-display-number-with-ordinal-suffix
function ordinalSuffix(num) {
  return num + '' + suffix(num);
}

function suffix(num) {
  const int = Math.floor(parseFloat(num));
  const hunth = int % 100;
  if (hunth >= 11 && hunth <= 13) return 'th';
  const tenth = int % 10;
  if (tenth === 1) return 'st';
  if (tenth === 2) return 'nd';
  if (tenth === 3) return 'rd';
  return 'th';
}