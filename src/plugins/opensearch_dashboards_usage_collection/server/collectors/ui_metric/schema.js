"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiMetricSchema = void 0;

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
  type: 'array',
  items: {
    key: {
      type: 'keyword'
    },
    value: {
      type: 'long'
    }
  }
}; // TODO: Find a way to retrieve it automatically
// plugin `data` registers all UI Metric for each appId where searches are performed (keys below are copy-pasted from application_usage)

const uiMetricFromDataPluginSchema = {
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
}; // TODO: Find a way to retrieve it automatically
// Searching `reportUiStats` across OpenSearch Dashboards

const uiMetricSchema = {
  console: commonSchema,
  DashboardPanelVersionInUrl: commonSchema,
  OpenSearch_Dashboards_home: commonSchema,
  // eslint-disable-line @typescript-eslint/naming-convention
  visualize: commonSchema,
  canvas: commonSchema,
  cross_cluster_replication: commonSchema,
  index_lifecycle_management: commonSchema,
  index_management: commonSchema,
  ingest_pipelines: commonSchema,
  apm: commonSchema,
  infra_logs: commonSchema,
  infra_metrics: commonSchema,
  stack_monitoring: commonSchema,
  remote_clusters: commonSchema,
  rollup_jobs: commonSchema,
  securitySolution: commonSchema,
  snapshot_restore: commonSchema,
  ...uiMetricFromDataPluginSchema
};
exports.uiMetricSchema = uiMetricSchema;