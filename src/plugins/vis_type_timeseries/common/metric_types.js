"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METRIC_TYPES = exports.EXTENDED_STATS_TYPES = void 0;

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
const METRIC_TYPES = {
  PERCENTILE: 'percentile',
  PERCENTILE_RANK: 'percentile_rank',
  TOP_HIT: 'top_hit',
  COUNT: 'count',
  DERIVATIVE: 'derivative',
  STD_DEVIATION: 'std_deviation',
  VARIANCE: 'variance',
  SUM_OF_SQUARES: 'sum_of_squares',
  CARDINALITY: 'cardinality',
  VALUE_COUNT: 'value_count',
  AVERAGE: 'avg',
  SUM: 'sum'
};
exports.METRIC_TYPES = METRIC_TYPES;
const EXTENDED_STATS_TYPES = [METRIC_TYPES.STD_DEVIATION, METRIC_TYPES.VARIANCE, METRIC_TYPES.SUM_OF_SQUARES];
exports.EXTENDED_STATS_TYPES = EXTENDED_STATS_TYPES;