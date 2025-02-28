"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeVersion = decodeVersion;

var _errors = require("../service/lib/errors");

var _base = require("./base64");

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
 * Decode the "opaque" version string to the sequence params we
 * can use to activate optimistic concurrency in OpenSearch
 */
function decodeVersion(version) {
  try {
    if (typeof version !== 'string') {
      throw new TypeError();
    }

    const seqParams = JSON.parse((0, _base.decodeBase64)(version));

    if (!Array.isArray(seqParams) || seqParams.length !== 2 || !Number.isInteger(seqParams[0]) || !Number.isInteger(seqParams[1])) {
      throw new TypeError();
    }

    return {
      _seq_no: seqParams[0],
      _primary_term: seqParams[1]
    };
  } catch (_) {
    throw _errors.SavedObjectsErrorHelpers.createInvalidVersionError(version);
  }
}