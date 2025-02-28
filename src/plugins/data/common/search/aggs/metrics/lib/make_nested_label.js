"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNestedLabel = void 0;

var _lodash = require("lodash");

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
const makeNestedLabel = (aggConfig, label) => {
  const uppercaseLabel = (0, _lodash.startCase)(label);
  const customMetric = aggConfig.getParam('customMetric');
  const metricAgg = aggConfig.getParam('metricAgg');

  if (customMetric) {
    let metricLabel = customMetric.makeLabel();

    if (metricLabel.includes(`${uppercaseLabel} of `)) {
      metricLabel = metricLabel.substring(`${uppercaseLabel} of `.length);
      metricLabel = `2. ${label} of ${metricLabel}`;
    } else if (metricLabel.includes(`${label} of `)) {
      metricLabel = parseInt(metricLabel.substring(0, 1), 10) + 1 + metricLabel.substring(1);
    } else {
      metricLabel = `${uppercaseLabel} of ${metricLabel}`;
    }

    return metricLabel;
  }

  const metric = aggConfig.aggConfigs.byId(metricAgg);

  if (!metric) {
    return '';
  }

  return `${uppercaseLabel} of ${metric.makeLabel()}`;
};

exports.makeNestedLabel = makeNestedLabel;