"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemBuffer = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * A simple buffer that collects items. Can be cleared or flushed; and can
 * automatically flush when specified number of items is reached.
 */
class ItemBuffer {
  constructor(params) {
    this.params = params;

    _defineProperty(this, "list", []);
  }
  /**
   * Get current buffer size.
   */


  get length() {
    return this.list.length;
  }
  /**
   * Add item to the buffer.
   */


  write(item) {
    this.list.push(item);
    const {
      flushOnMaxItems
    } = this.params;

    if (flushOnMaxItems) {
      if (this.list.length >= flushOnMaxItems) {
        this.flush();
      }
    }
  }
  /**
   * Remove all items from the buffer.
   */


  clear() {
    this.list = [];
  }
  /**
   * Call `.onflush` method and clear buffer.
   */


  flush() {
    let list;
    [list, this.list] = [this.list, []];
    this.params.onFlush(list);
  }

}

exports.ItemBuffer = ItemBuffer;