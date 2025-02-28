"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultDecoration = void 0;

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
const getDefaultDecoration = series => {
  const pointSize = series.point_size != null ? Number(series.point_size) : Number(series.line_width);
  const showPoints = series.chart_type === 'line' && pointSize !== 0;
  return {
    seriesId: series.id,
    stack: series.stacked,
    lines: {
      show: series.chart_type === 'line' && series.line_width !== 0,
      fill: Number(series.fill),
      lineWidth: Number(series.line_width),
      steps: series.steps || false
    },
    points: {
      show: showPoints,
      radius: 1,
      lineWidth: showPoints ? pointSize : 5
    },
    bars: {
      show: series.chart_type === 'bar',
      fill: Number(series.fill),
      lineWidth: Number(series.line_width)
    }
  };
};

exports.getDefaultDecoration = getDefaultDecoration;