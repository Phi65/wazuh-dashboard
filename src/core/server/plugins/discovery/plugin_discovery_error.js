"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginDiscoveryErrorType = exports.PluginDiscoveryError = void 0;

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

/** @internal */
let PluginDiscoveryErrorType;
/** @internal */

exports.PluginDiscoveryErrorType = PluginDiscoveryErrorType;

(function (PluginDiscoveryErrorType) {
  PluginDiscoveryErrorType["IncompatibleVersion"] = "incompatible-version";
  PluginDiscoveryErrorType["InvalidSearchPath"] = "invalid-search-path";
  PluginDiscoveryErrorType["InvalidPluginPath"] = "invalid-plugin-path";
  PluginDiscoveryErrorType["InvalidManifest"] = "invalid-manifest";
  PluginDiscoveryErrorType["MissingManifest"] = "missing-manifest";
})(PluginDiscoveryErrorType || (exports.PluginDiscoveryErrorType = PluginDiscoveryErrorType = {}));

class PluginDiscoveryError extends Error {
  static incompatibleVersion(path, cause) {
    return new PluginDiscoveryError(PluginDiscoveryErrorType.IncompatibleVersion, path, cause);
  }

  static invalidSearchPath(path, cause) {
    return new PluginDiscoveryError(PluginDiscoveryErrorType.InvalidSearchPath, path, cause);
  }

  static invalidPluginPath(path, cause) {
    return new PluginDiscoveryError(PluginDiscoveryErrorType.InvalidPluginPath, path, cause);
  }

  static invalidManifest(path, cause) {
    return new PluginDiscoveryError(PluginDiscoveryErrorType.InvalidManifest, path, cause);
  }

  static missingManifest(path, cause) {
    return new PluginDiscoveryError(PluginDiscoveryErrorType.MissingManifest, path, cause);
  }
  /**
   * @param type Type of the discovery error (invalid directory, invalid manifest etc.)
   * @param path Path at which discovery error occurred.
   * @param cause "Raw" error object that caused discovery error.
   */


  constructor(type, path, cause) {
    super(`${cause.message} (${type}, ${path})`); // Set the prototype explicitly, see:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work

    this.type = type;
    this.path = path;
    this.cause = cause;
    Object.setPrototypeOf(this, PluginDiscoveryError.prototype);
  }

}

exports.PluginDiscoveryError = PluginDiscoveryError;