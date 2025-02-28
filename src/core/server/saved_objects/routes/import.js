"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerImportRoute = void 0;

var _path = require("path");

var _configSchema = require("@osd/config-schema");

var _import = require("../import");

var _utils = require("./utils");

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
const registerImportRoute = (router, config) => {
  const {
    maxImportExportSize,
    maxImportPayloadBytes
  } = config;
  router.post({
    path: '/_import',
    options: {
      body: {
        maxBytes: maxImportPayloadBytes,
        output: 'stream',
        accepts: 'multipart/form-data'
      }
    },
    validate: {
      query: _configSchema.schema.object({
        overwrite: _configSchema.schema.boolean({
          defaultValue: false
        }),
        createNewCopies: _configSchema.schema.boolean({
          defaultValue: false
        })
      }, {
        validate: object => {
          if (object.overwrite && object.createNewCopies) {
            return 'cannot use [overwrite] with [createNewCopies]';
          }
        }
      }),
      body: _configSchema.schema.object({
        file: _configSchema.schema.stream()
      })
    }
  }, router.handleLegacyErrors(async (context, req, res) => {
    const {
      overwrite,
      createNewCopies
    } = req.query;
    const file = req.body.file;
    const fileExtension = (0, _path.extname)(file.hapi.filename).toLowerCase();

    if (fileExtension !== '.ndjson') {
      return res.badRequest({
        body: `Invalid file extension ${fileExtension}`
      });
    }

    let readStream;

    try {
      readStream = await (0, _utils.createSavedObjectsStreamFromNdJson)(file);
    } catch (e) {
      return res.badRequest({
        body: e
      });
    }

    const result = await (0, _import.importSavedObjectsFromStream)({
      savedObjectsClient: context.core.savedObjects.client,
      typeRegistry: context.core.savedObjects.typeRegistry,
      readStream,
      objectLimit: maxImportExportSize,
      overwrite,
      createNewCopies
    });
    return res.ok({
      body: result
    });
  }));
};

exports.registerImportRoute = registerImportRoute;