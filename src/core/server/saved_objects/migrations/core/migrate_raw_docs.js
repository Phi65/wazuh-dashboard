"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateRawDocs = migrateRawDocs;

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
 * This file provides logic for migrating raw documents.
 */

/**
 * Applies the specified migration function to every saved object document in the list
 * of raw docs. Any raw docs that are not valid saved objects will simply be passed through.
 *
 * @param {TransformFn} migrateDoc
 * @param {SavedObjectsRawDoc[]} rawDocs
 * @returns {SavedObjectsRawDoc[]}
 */
async function migrateRawDocs(serializer, migrateDoc, rawDocs, log) {
  const migrateDocWithoutBlocking = transformNonBlocking(migrateDoc);
  const processedDocs = [];

  for (const raw of rawDocs) {
    if (serializer.isRawSavedObject(raw)) {
      const savedObject = serializer.rawToSavedObject(raw);
      savedObject.migrationVersion = savedObject.migrationVersion || {};
      processedDocs.push(serializer.savedObjectToRaw({
        references: [],
        ...(await migrateDocWithoutBlocking(savedObject))
      }));
    } else {
      log.error(`Error: Unable to migrate the corrupt Saved Object document ${raw._id}. To prevent OpenSearch Dashboards from performing a migration on every restart, please delete or fix this document by ensuring that the namespace and type in the document's id matches the values in the namespace and type fields.`, {
        rawDocument: raw
      });
      processedDocs.push(raw);
    }
  }

  return processedDocs;
}
/**
 * Migration transform functions are potentially CPU heavy e.g. doing decryption/encryption
 * or (de)/serializing large JSON payloads.
 * Executing all transforms for a batch in a synchronous loop can block the event-loop for a long time.
 * To prevent this we use setImmediate to ensure that the event-loop can process other parallel
 * work in between each transform.
 */


function transformNonBlocking(transform) {
  // promises aren't enough to unblock the event loop
  return doc => new Promise((resolve, reject) => {
    // set immediate is though
    setImmediate(() => {
      try {
        resolve(transform(doc));
      } catch (e) {
        reject(e);
      }
    });
  });
}