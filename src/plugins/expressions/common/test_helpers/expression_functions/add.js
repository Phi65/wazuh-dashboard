"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

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
const add = {
  name: 'add',
  help: 'This function adds a number to input',
  inputTypes: ['num'],
  args: {
    val: {
      default: 0,
      aliases: ['_'],
      help: 'Number to add to input',
      types: ['null', 'number', 'string']
    }
  },
  fn: ({
    value: value1
  }, {
    val: input2
  }, context) => {
    const value2 = !input2 ? 0 : typeof input2 === 'object' ? input2.value : Number(input2);
    return {
      type: 'num',
      value: value1 + value2
    };
  }
};
exports.add = add;