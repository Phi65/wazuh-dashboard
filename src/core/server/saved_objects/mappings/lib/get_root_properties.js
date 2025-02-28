"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootProperties = getRootProperties;

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
 *  Get the property mappings for the root type in the OpenSearchMappingsDsl
 *
 *  If the mappings don't have a root type, or the root type is not
 *  an object type (it's a keyword or something) this function will
 *  throw an error.
 *
 *  OpenSearchPropertyMappings objects have the root property names as their
 *  first level keys which map to the mappings object for each property.
 *  If the property is of type object it too could have a `properties`
 *  key whose value follows the same format.
 *
 *  This data can be found at `{indexName}.mappings.{typeName}.properties`
 *  in the opensearch indices.get() response.
 */
function getRootProperties(mapping) {
  if (!mapping.properties) {
    throw new TypeError('Unable to get property names non-object root mapping');
  }

  return mapping.properties;
}