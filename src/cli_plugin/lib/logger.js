"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

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
 * Logs messages and errors
 */
class Logger {
  constructor(settings = {}) {
    this.previousLineEnded = true;
    this.silent = !!settings.silent;
    this.quiet = !!settings.quiet;
  }

  log(data, sameLine) {
    if (this.silent || this.quiet) return;

    if (!sameLine && !this.previousLineEnded) {
      process.stdout.write('\n');
    } //if data is a stream, pipe it.


    if (data.readable) {
      data.pipe(process.stdout);
      return;
    }

    process.stdout.write(data);
    if (!sameLine) process.stdout.write('\n');
    this.previousLineEnded = !sameLine;
  }

  error(data) {
    if (this.silent) return;

    if (!this.previousLineEnded) {
      process.stderr.write('\n');
    } //if data is a stream, pipe it.


    if (data.readable) {
      data.pipe(process.stderr);
      return;
    }

    process.stderr.write(`${data}\n`);
    this.previousLineEnded = true;
  }

}

exports.Logger = Logger;