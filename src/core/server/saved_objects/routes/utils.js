"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedObjectsStreamFromNdJson = createSavedObjectsStreamFromNdJson;
exports.validateObjects = validateObjects;
exports.validateTypes = validateTypes;

var _streams = require("../../utils/streams");

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
async function createSavedObjectsStreamFromNdJson(ndJsonStream) {
  const savedObjects = await (0, _streams.createPromiseFromStreams)([ndJsonStream, (0, _streams.createSplitStream)('\n'), (0, _streams.createMapStream)(str => {
    if (str && str.trim() !== '') {
      return JSON.parse(str);
    }
  }), (0, _streams.createFilterStream)(obj => !!obj && !obj.exportedCount), (0, _streams.createConcatStream)([])]);
  return (0, _streams.createListStream)(savedObjects);
}

function validateTypes(types, supportedTypes) {
  const invalidTypes = types.filter(t => !supportedTypes.includes(t));

  if (invalidTypes.length) {
    return `Trying to export non-exportable type(s): ${invalidTypes.join(', ')}`;
  }
}

function validateObjects(objects, supportedTypes) {
  const invalidObjects = objects.filter(obj => !supportedTypes.includes(obj.type));

  if (invalidObjects.length) {
    return `Trying to export object(s) with non-exportable types: ${invalidObjects.map(obj => `${obj.type}:${obj.id}`).join(', ')}`;
  }
}