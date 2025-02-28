"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResponseAggConfigClass = exports.create = void 0;

var _lodash = require("lodash");

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
 * Get the ResponseAggConfig class for an aggConfig,
 * which might be cached on the aggConfig or created.
 *
 * @param  {AggConfig} agg - the AggConfig the VAC should inherit from
 * @param  {object} props - properties that the VAC should have
 * @return {Constructor} - a constructor for VAC objects that will inherit the aggConfig
 */
const getResponseAggConfigClass = (agg, props) => {
  if (agg.$$_ResponseAggConfigClass) {
    return agg.$$_ResponseAggConfigClass;
  } else {
    return agg.$$_ResponseAggConfigClass = create(agg, props);
  }
};

exports.getResponseAggConfigClass = getResponseAggConfigClass;

const create = (parentAgg, props) => {
  /**
   * AggConfig "wrapper" for multi-value metric aggs which
   * need to modify AggConfig behavior for each value produced.
   *
   * @param {string|number} key - the key or index that identifies
   *                            this part of the multi-value
   */
  function ResponseAggConfig(key) {
    const parentId = parentAgg.id;
    let id;
    const subId = String(key);

    if (subId.indexOf('.') > -1) {
      id = parentId + "['" + subId.replace(/'/g, "\\'") + "']";
    } else {
      id = parentId + '.' + subId;
    }

    this.id = id;
    this.key = key;
    this.parentId = parentId;
  }

  ResponseAggConfig.prototype = Object.create(parentAgg);
  ResponseAggConfig.prototype.constructor = ResponseAggConfig;
  (0, _lodash.assignIn)(ResponseAggConfig.prototype, props);
  return ResponseAggConfig;
};

exports.create = create;