"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanArtifacts = cleanArtifacts;
exports.cleanPrevious = void 0;

var _promises = require("fs/promises");

var _fs = require("fs");

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
const exists = async loc => {
  try {
    await (0, _promises.access)(loc, _fs.constants.W_OK);
    return true;
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
};

const cleanPrevious = async (settings, logger) => {
  const workingPathExists = await exists(settings.workingPath);

  if (workingPathExists) {
    logger.log('Found previous install attempt. Deleting...');
    return await (0, _promises.rm)(settings.workingPath, {
      recursive: true
    });
  }
};

exports.cleanPrevious = cleanPrevious;

function cleanArtifacts(settings) {
  // Delete the working directory; at this point we're bailing, so swallow any errors on delete.
  try {
    (0, _fs.rmSync)(settings.workingPath, {
      recursive: true,
      force: true
    });
  } catch (e) {} // eslint-disable-line no-empty

}