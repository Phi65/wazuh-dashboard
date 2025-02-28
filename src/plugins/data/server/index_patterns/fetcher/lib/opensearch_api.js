"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callFieldCapsApi = callFieldCapsApi;
exports.callIndexAliasApi = callIndexAliasApi;

var _errors = require("./errors");

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
 *  Call the index.getAlias API for a list of indices.
 *
 *  If `indices` is an array or comma-separated list and some of the
 *  values don't match anything but others do this will return the
 *  matches and not throw an error.
 *
 *  If not a single index matches then a NoMatchingIndicesError will
 *  be thrown.
 *
 *  @param  {Function} callCluster bound function for accessing an opensearch client
 *  @param  {Array<String>|String} indices
 *  @return {Promise<IndexAliasResponse>}
 */
async function callIndexAliasApi(callCluster, indices) {
  try {
    return await callCluster('indices.getAlias', {
      index: indices,
      ignoreUnavailable: true,
      allowNoIndices: false
    });
  } catch (error) {
    throw (0, _errors.convertOpenSearchError)(indices, error);
  }
}
/**
 *  Call the fieldCaps API for a list of indices.
 *
 *  Just like callIndexAliasApi(), callFieldCapsApi() throws
 *  if no indexes are matched, but will return potentially
 *  "partial" results if even a single index is matched.
 *
 *  @param  {Function} callCluster bound function for accessing an opensearch client
 *  @param  {Array<String>|String} indices
 *  @param  {Object} fieldCapsOptions
 *  @return {Promise<FieldCapsResponse>}
 */


async function callFieldCapsApi(callCluster, indices, fieldCapsOptions = {
  allowNoIndices: false
}) {
  try {
    return await callCluster('fieldCaps', {
      index: indices,
      fields: '*',
      ignoreUnavailable: true,
      ...fieldCapsOptions
    });
  } catch (error) {
    throw (0, _errors.convertOpenSearchError)(indices, error);
  }
}