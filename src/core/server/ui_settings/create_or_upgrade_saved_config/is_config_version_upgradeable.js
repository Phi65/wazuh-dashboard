"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isConfigVersionUpgradeable = isConfigVersionUpgradeable;

var _semver = _interopRequireDefault(require("semver"));

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

/**
 * List of OpenSearch Dashboards major versions that can pull the
 * config from a legacy version that is higher in semvar.
 *
 * WARNING: OpenSearchDashboards 7.x could cause conflicts.
 */
const osdValidMajorVersions = [1, 2];
const rcVersionRegex = /^(\d+\.\d+\.\d+)\-rc(\d+)$/i;

function extractRcNumber(version) {
  const match = version.match(rcVersionRegex);
  return match ? [match[1], parseInt(match[2], 10)] : [version, Infinity];
}

function isConfigVersionUpgradeable(savedVersion, opensearchDashboardsVersion) {
  if (typeof savedVersion !== 'string' || typeof opensearchDashboardsVersion !== 'string' || savedVersion === opensearchDashboardsVersion || /alpha|beta|snapshot/i.test(savedVersion)) {
    return false;
  }

  const [savedReleaseVersion, savedRcNumber] = extractRcNumber(savedVersion);
  const [opensearchDashboardsReleaseVersion, opensearchDashboardsRcNumber] = extractRcNumber(opensearchDashboardsVersion); // ensure that both release versions are valid, if not then abort

  if (!_semver.default.valid(savedReleaseVersion) || !_semver.default.valid(opensearchDashboardsReleaseVersion)) {
    return false;
  } // ultimately if the saved config is from a previous OpenSearch Dashboards version
  // or from an earlier rc of the same version, then we can upgrade


  const savedIsLessThanOpenSearchDashboards = _semver.default.lt(savedReleaseVersion, opensearchDashboardsReleaseVersion);

  const savedIsSameAsOpenSearchDashboards = _semver.default.eq(savedReleaseVersion, opensearchDashboardsReleaseVersion);

  const savedRcIsLessThanOpenSearchDashboards = savedRcNumber < opensearchDashboardsRcNumber; // If the saved config is from the fork and from 6.8.0 to 7.10.2 then we should be able to upgrade.

  const savedIsFromPrefork = _semver.default.gte(savedReleaseVersion, '6.8.0') && _semver.default.lte(savedReleaseVersion, '7.10.2');

  const currentVersionIsValidOSDVersion = osdValidMajorVersions.includes(_semver.default.major(opensearchDashboardsReleaseVersion));
  return savedIsLessThanOpenSearchDashboards || savedIsSameAsOpenSearchDashboards && savedRcIsLessThanOpenSearchDashboards || savedIsFromPrefork && currentVersionIsValidOSDVersion;
}