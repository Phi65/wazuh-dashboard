"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propFilter = propFilter;

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
 * Filters out a list by a given filter. This is currently used to implement:
 *   - fieldType filters a list of fields by their type property
 *   - aggFilter filters a list of aggs by their name property
 *
 * @returns the filter function which can be registered with angular
 */
function propFilter(prop) {
  /**
   * List filtering function which accepts an array or list of values that a property
   * must contain
   *
   * @param  {array} list - array of items to filter
   * @param  {function|array|string} filters - the values to match against the list
   *   - if a function, it is expected to take the field property as argument and returns true to keep it.
   *   - Can be also an array, a single value as a string, or a comma-separated list of items
   * @return {array} - the filtered list
   */
  return function filterByName(list, filters = []) {
    if ((0, _lodash.isFunction)(filters)) {
      return list.filter(item => filters(item[prop]));
    }

    if (!Array.isArray(filters)) {
      filters = filters.split(',');
    }

    if (filters.length === 0) {
      return list;
    }

    if (filters.includes('*')) {
      return list;
    }

    const options = filters.reduce((acc, filter) => {
      let type = 'include';
      let value = filter;

      if (filter.charAt(0) === '!') {
        type = 'exclude';
        value = filter.substr(1);
      }

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(value);
      return acc;
    }, {});
    return list.filter(item => {
      const value = item[prop];
      const excluded = options.exclude && options.exclude.includes(value);

      if (excluded) {
        return false;
      }

      const included = !options.include || options.include.includes(value);

      if (included) {
        return true;
      }

      return false;
    });
  };
}