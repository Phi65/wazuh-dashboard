"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.createCli = createCli;

var _logger = require("../cli_plugin/lib/logger");

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
async function create(keystore, command, options) {
  const logger = new _logger.Logger(options);

  if (keystore.exists()) {
    const overwrite = await (0, _utils.confirm)('An OpenSearch Dashboards keystore already exists. Overwrite?');

    if (!overwrite) {
      return logger.log('Exiting without modifying keystore.');
    }
  }

  keystore.reset();
  keystore.save();
  logger.log(`Created OpenSearch Dashboards keystore in ${keystore.path}`);
}

function createCli(program, keystore) {
  program.command('create').description('Creates a new OpenSearch Dashboards keystore').option('-s, --silent', 'prevent all logging').action(create.bind(null, keystore));
}