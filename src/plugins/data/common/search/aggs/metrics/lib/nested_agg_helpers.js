"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forwardModifyAggConfigOnSearchRequestStart = void 0;

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
 * Forwards modifyAggConfigOnSearchRequestStart calls to a nested AggConfig.
 * This must be used for each parameter, that accepts a nested aggregation, otherwise
 * some parameters of the nested aggregation might not work properly (like auto interval
 * on a nested date histogram).
 * You should assign the return value of this function to the modifyAggConfigOnSearchRequestStart
 * of the parameter that accepts a nested aggregation. Example:
 * {
 *   name: 'customBucket',
 *   modifyAggConfigOnSearchRequestStart: forwardModifyAggConfigOnSearchRequestStart('customBucket')
 * }
 *
 * @param {string} paramName - The name of the parameter, that this function should forward
 *      calls to. That should match the name of the parameter the function is called on.
 * @returns {function} A function, that forwards the calls.
 */
const forwardModifyAggConfigOnSearchRequestStart = paramName => {
  return (aggConfig, searchSource, request) => {
    if (!aggConfig || !aggConfig.params) {
      return;
    }

    const nestedAggConfig = aggConfig.getParam(paramName);

    if (nestedAggConfig && nestedAggConfig.type && nestedAggConfig.type.params) {
      nestedAggConfig.type.params.forEach(param => {
        // Check if this parameter of the nested aggConfig has a modifyAggConfigOnSearchRequestStart
        // function, that needs to be called.
        if (param.modifyAggConfigOnSearchRequestStart) {
          param.modifyAggConfigOnSearchRequestStart(nestedAggConfig, searchSource, request);
        }
      });
    }
  };
};

exports.forwardModifyAggConfigOnSearchRequestStart = forwardModifyAggConfigOnSearchRequestStart;