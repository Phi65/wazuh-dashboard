"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedConfigKeys = getUnusedConfigKeys;

var _lodash = require("lodash");

var _std = require("@osd/std");

var _config = require("../../config");

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
const getFlattenedKeys = object => Object.keys((0, _std.getFlattenedObject)(object));

async function getUnusedConfigKeys({
  coreHandledConfigPaths,
  settings,
  legacyConfig
}) {
  const inputKeys = getFlattenedKeys(settings);
  const appliedKeys = getFlattenedKeys(legacyConfig.get());

  if (inputKeys.includes('env')) {
    // env is a special case key, see https://github.com/opensearch-project/OpenSearch-Dashboards/blob/848bf17b/src/legacy/server/config/config.js#L74
    // where it is deleted from the settings before being injected into the schema via context and
    // then renamed to `env.name` https://github.com/opensearch-project/OpenSearch-Dashboards/blob/848bf17/src/legacy/server/config/schema.js#L17
    inputKeys[inputKeys.indexOf('env')] = 'env.name';
  } // Filter out keys that are marked as used in the core (e.g. by new core plugins).


  return (0, _lodash.difference)(inputKeys, appliedKeys).filter(unusedConfigKey => !coreHandledConfigPaths.some(usedInCoreConfigKey => (0, _config.hasConfigPathIntersection)(unusedConfigKey, usedInCoreConfigKey)));
}