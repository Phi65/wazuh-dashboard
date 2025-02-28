"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntervalAndTimefield = getIntervalAndTimefield;

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
const DEFAULT_TIME_FIELD = '@timestamp';

function getIntervalAndTimefield(panel, series = {}, indexPatternObject) {
  const getDefaultTimeField = () => {
    var _indexPatternObject$t;

    return (_indexPatternObject$t = indexPatternObject === null || indexPatternObject === void 0 ? void 0 : indexPatternObject.timeFieldName) !== null && _indexPatternObject$t !== void 0 ? _indexPatternObject$t : DEFAULT_TIME_FIELD;
  };

  const timeField = series.override_index_pattern && series.series_time_field || panel.time_field || getDefaultTimeField();
  const interval = series.override_index_pattern && series.series_interval || panel.interval;
  return {
    timeField,
    interval
  };
}