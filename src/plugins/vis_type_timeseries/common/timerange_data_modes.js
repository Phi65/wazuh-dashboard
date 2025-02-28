"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_RANGE_MODE_KEY = exports.TIME_RANGE_DATA_MODES = void 0;

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

/**
 * Time Range data modes.
 * @constant
 * @public
 */
const TIME_RANGE_DATA_MODES = {
  /**
   * Entire timerange mode will match all the documents selected in the
   * timerange timepicker
   */
  ENTIRE_TIME_RANGE: 'entire_time_range',

  /**
   * Last value mode will match only the documents for the specified interval
   * from the end of the timerange.
   */
  LAST_VALUE: 'last_value'
};
/**
 * Key for getting the Time Range mode from the Panel configuration object.
 * @constant
 * @public
 */

exports.TIME_RANGE_DATA_MODES = TIME_RANGE_DATA_MODES;
const TIME_RANGE_MODE_KEY = 'time_range_mode';
exports.TIME_RANGE_MODE_KEY = TIME_RANGE_MODE_KEY;