"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggingMixin = loggingMixin;
exports.setupLogging = setupLogging;

var _good = require("@elastic/good");

var _configuration = _interopRequireDefault(require("./configuration"));

var _log_with_metadata = require("./log_with_metadata");

var _rotate = require("./rotate");

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
async function setupLogging(server, config) {
  return await server.register({
    plugin: _good.plugin,
    options: (0, _configuration.default)(config)
  });
}

async function loggingMixin(osdServer, server, config) {
  _log_with_metadata.logWithMetadata.decorateServer(server);

  await setupLogging(server, config);
  await (0, _rotate.setupLoggingRotate)(server, config);
}