"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripEmptyFields = exports.multiSelectComponent = void 0;

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
 * Output transforms are functions that will be called
 * with the form field value whenever we access the form data object. (with `form.getFormData()`)
 *
 * This allows us to have a different object/array as field `value`
 * from the desired outputed form data.
 *
 * Example:
 * ```ts
 * myField.value = [{ label: 'index_1', isSelected: true }, { label: 'index_2', isSelected: false }]
 * const serializer = (value) => (
 *   value.filter(v => v.selected).map(v => v.label)
 * );
 *
 * // When serializing the form data, the following array will be returned
 * form.getFormData() -> { myField: ['index_1'] }
 * ````
 */
const multiSelectComponent = {
  /**
   * Return an array of labels of all the options that are selected
   *
   * @param value The Eui Selectable options array
   */
  optionsToSelectedValue(options) {
    return options.filter(option => option.checked === 'on').map(option => option.label);
  }

};
exports.multiSelectComponent = multiSelectComponent;

/**
 * Strip empty fields from a data object.
 * Empty fields can either be an empty string (one or several blank spaces) or an empty object (no keys)
 *
 * @param object Object to remove the empty fields from.
 * @param types An array of types to strip. Types can be "string" or "object". Defaults to ["string", "object"]
 * @param options An optional configuration object. By default recursive it turned on.
 */
const stripEmptyFields = (object, options) => {
  if (object === undefined) {
    return {};
  }

  const {
    types = ['string', 'object'],
    recursive = false
  } = options || {};
  return Object.entries(object).reduce((acc, [key, value]) => {
    const type = typeof value;
    const shouldStrip = types.includes(type);

    if (shouldStrip && type === 'string' && value.trim() === '') {
      return acc;
    } else if (type === 'object' && !Array.isArray(value) && value !== null) {
      if (Object.keys(value).length === 0 && shouldStrip) {
        return acc;
      } else if (recursive) {
        value = stripEmptyFields({ ...value
        }, options);
      }
    }

    acc[key] = value;
    return acc;
  }, {});
};

exports.stripEmptyFields = stripEmptyFields;