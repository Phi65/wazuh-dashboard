"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNonExistingReferenceAsKeys = getNonExistingReferenceAsKeys;
exports.validateReferences = validateReferences;

var _boom = _interopRequireDefault(require("@hapi/boom"));

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
const REF_TYPES_TO_VLIDATE = ['index-pattern', 'search'];

function filterReferencesToValidate({
  type
}) {
  return REF_TYPES_TO_VLIDATE.includes(type);
}

const getObjectsToSkip = (retries = []) => retries.reduce((acc, {
  type,
  id,
  ignoreMissingReferences
}) => ignoreMissingReferences ? acc.add(`${type}:${id}`) : acc, new Set());

async function getNonExistingReferenceAsKeys(savedObjects, savedObjectsClient, namespace, retries) {
  const objectsToSkip = getObjectsToSkip(retries);
  const collector = new Map(); // Collect all references within objects

  for (const savedObject of savedObjects) {
    if (objectsToSkip.has(`${savedObject.type}:${savedObject.id}`)) {
      // skip objects with retries that have specified `ignoreMissingReferences`
      continue;
    }

    const filteredReferences = (savedObject.references || []).filter(filterReferencesToValidate);

    for (const {
      type,
      id
    } of filteredReferences) {
      collector.set(`${type}:${id}`, {
        type,
        id
      });
    }
  } // Remove objects that could be references


  for (const savedObject of savedObjects) {
    collector.delete(`${savedObject.type}:${savedObject.id}`);
  }

  if (collector.size === 0) {
    return [];
  } // Fetch references to see if they exist


  const bulkGetOpts = Array.from(collector.values()).map(obj => ({ ...obj,
    fields: ['id']
  }));
  const bulkGetResponse = await savedObjectsClient.bulkGet(bulkGetOpts, {
    namespace
  }); // Error handling

  const erroredObjects = bulkGetResponse.saved_objects.filter(obj => obj.error && obj.error.statusCode !== 404);

  if (erroredObjects.length) {
    const err = _boom.default.badRequest();

    err.output.payload.attributes = {
      objects: erroredObjects
    };
    throw err;
  } // Cleanup collector


  for (const savedObject of bulkGetResponse.saved_objects) {
    if (savedObject.error) {
      continue;
    }

    collector.delete(`${savedObject.type}:${savedObject.id}`);
  }

  return [...collector.keys()];
}

async function validateReferences(savedObjects, savedObjectsClient, namespace, retries) {
  const objectsToSkip = getObjectsToSkip(retries);
  const errorMap = {};
  const nonExistingReferenceKeys = await getNonExistingReferenceAsKeys(savedObjects, savedObjectsClient, namespace, retries); // Filter out objects with missing references, add to error object

  savedObjects.forEach(({
    type,
    id,
    references,
    attributes
  }) => {
    if (objectsToSkip.has(`${type}:${id}`)) {
      // skip objects with retries that have specified `ignoreMissingReferences`
      return;
    }

    const missingReferences = [];
    const enforcedTypeReferences = (references || []).filter(filterReferencesToValidate);

    for (const {
      type: refType,
      id: refId
    } of enforcedTypeReferences) {
      if (nonExistingReferenceKeys.includes(`${refType}:${refId}`)) {
        missingReferences.push({
          type: refType,
          id: refId
        });
      }
    }

    if (missingReferences.length === 0) {
      return;
    }

    const {
      title
    } = attributes;
    errorMap[`${type}:${id}`] = {
      id,
      type,
      title,
      meta: {
        title
      },
      error: {
        type: 'missing_references',
        references: missingReferences
      }
    };
  });
  return Object.values(errorMap);
}