"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toInt = void 0;

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
 * NOTE: The toInt() formatter does _not_ play well if we enter the "e" letter in a "number" input
 * as it does not trigger an "onChange" event.
 * I searched if it was a bug and found this thread (https://github.com/facebook/react/pull/7359#event-1017024857)
 * We will need to investigate this a little further.
 *
 * @param value The string value to convert to number
 */
const toInt = value => parseFloat(value);

exports.toInt = toInt;