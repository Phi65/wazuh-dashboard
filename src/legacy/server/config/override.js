"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.override = void 0;

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
const isObject = v => typeof v === 'object' && v !== null && !Array.isArray(v);

const assignDeep = (target, source) => {
  for (let [key, value] of Object.entries(source)) {
    // unwrap dot-separated keys
    if (key.includes('.')) {
      const [first, ...others] = key.split('.');
      key = first;
      value = {
        [others.join('.')]: value
      };
    }

    if (isObject(value)) {
      if (!target.hasOwnProperty(key)) {
        target[key] = {};
      }

      assignDeep(target[key], value);
    } else {
      target[key] = value;
    }
  }
};

const override = (...sources) => {
  const result = {};

  for (const object of sources) {
    assignDeep(result, object);
  }

  return result;
};

exports.override = override;