"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleErrorResponse = void 0;

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
const handleErrorResponse = panel => error => {
  if (error.isBoom && error.status === 401) throw error;
  const result = {};
  let errorResponse;

  try {
    errorResponse = JSON.parse(error.response);
  } catch (e) {
    errorResponse = error.response;
  }

  if (!errorResponse && !(error.name === 'DQLSyntaxError')) {
    errorResponse = {
      message: error.message,
      stack: error.stack
    };
  }

  if (error.name === 'DQLSyntaxError') {
    errorResponse = {
      message: error.shortMessage,
      stack: error.stack
    };
  }

  result[panel.id] = {
    id: panel.id,
    statusCode: error.statusCode,
    error: errorResponse,
    series: []
  };
  return result;
};

exports.handleErrorResponse = handleErrorResponse;