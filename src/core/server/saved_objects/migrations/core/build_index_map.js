"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIndexMap = createIndexMap;

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

/*
 * This file contains logic to convert savedObjectSchemas into a dictionary of indexes and documents
 */
function createIndexMap({
  opensearchDashboardsIndexName,
  registry,
  indexMap
}) {
  const map = {};
  Object.keys(indexMap).forEach(type => {
    const typeDef = registry.getType(type);
    const script = typeDef === null || typeDef === void 0 ? void 0 : typeDef.convertToAliasScript; // Defaults to opensearchDashboardsIndexName if indexPattern isn't defined

    const indexPattern = (typeDef === null || typeDef === void 0 ? void 0 : typeDef.indexPattern) || opensearchDashboardsIndexName;

    if (!map.hasOwnProperty(indexPattern)) {
      map[indexPattern] = {
        typeMappings: {}
      };
    }

    map[indexPattern].typeMappings[type] = indexMap[type];

    if (script && map[indexPattern].script) {
      throw Error(`convertToAliasScript has been defined more than once for index pattern "${indexPattern}"`);
    } else if (script) {
      map[indexPattern].script = script;
    }
  });
  return map;
}