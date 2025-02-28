"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSplitStream = createSplitStream;

var _stream = require("stream");

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
 *  Creates a Transform stream that consumes a stream of Buffers
 *  and produces a stream of strings (in object mode) by splitting
 *  the received bytes using the splitChunk.
 *
 *  Ways this is behaves like String#split:
 *    - instances of splitChunk are removed from the input
 *    - splitChunk can be on any size
 *    - if there are no bytes found after the last splitChunk
 *      a final empty chunk is emitted
 *
 *  Ways this deviates from String#split:
 *    - splitChunk cannot be a regexp
 *    - an empty string or Buffer will not produce a stream of individual
 *      bytes like `string.split('')` would
 *
 *  @param  {String} splitChunk
 *  @return {Transform}
 */
function createSplitStream(splitChunk) {
  let unsplitBuffer = Buffer.alloc(0);
  return new _stream.Transform({
    writableObjectMode: false,
    readableObjectMode: true,

    transform(chunk, enc, callback) {
      try {
        let i;
        let toSplit = Buffer.concat([unsplitBuffer, chunk]);

        while ((i = toSplit.indexOf(splitChunk)) !== -1) {
          const slice = toSplit.slice(0, i);
          toSplit = toSplit.slice(i + splitChunk.length);
          this.push(slice.toString('utf8'));
        }

        unsplitBuffer = toSplit;
        callback();
      } catch (err) {
        callback(err);
      }
    },

    flush(callback) {
      try {
        this.push(unsplitBuffer.toString('utf8'));
        callback();
      } catch (err) {
        callback(err);
      }
    }

  });
}