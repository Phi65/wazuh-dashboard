"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationUsageSchema = void 0;

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
const commonSchema = {
  clicks_total: {
    type: 'long'
  },
  clicks_7_days: {
    type: 'long'
  },
  clicks_30_days: {
    type: 'long'
  },
  clicks_90_days: {
    type: 'long'
  },
  minutes_on_screen_total: {
    type: 'float'
  },
  minutes_on_screen_7_days: {
    type: 'float'
  },
  minutes_on_screen_30_days: {
    type: 'float'
  },
  minutes_on_screen_90_days: {
    type: 'float'
  }
}; // These keys obtained by searching for `/application\w*\.register\(/` and checking the value of the attr `id`.
// TODO: Find a way to update these keys automatically.

const applicationUsageSchema = {
  // OSS
  dashboards: commonSchema,
  dev_tools: commonSchema,
  discover: commonSchema,
  home: commonSchema,
  opensearch_dashboards: commonSchema,
  // It's a forward app so we'll likely never report it
  management: commonSchema,
  short_url_redirect: commonSchema,
  // It's a forward app so we'll likely never report it
  visualize: commonSchema
};
exports.applicationUsageSchema = applicationUsageSchema;