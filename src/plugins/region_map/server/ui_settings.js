"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUiSettings = getUiSettings;

var _i18n = require("@osd/i18n");

var _configSchema = require("@osd/config-schema");

var _common = require("../common");

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
function getUiSettings() {
  return {
    'visualization:regionmap:showWarnings': {
      name: _i18n.i18n.translate('regionMap.advancedSettings.visualization.showRegionMapWarningsTitle', {
        defaultMessage: 'Show region map warning'
      }),
      value: true,
      description: _i18n.i18n.translate('regionMap.advancedSettings.visualization.showRegionMapWarningsText', {
        defaultMessage: 'Whether the region map shows a warning when terms cannot be joined to a shape on the map.'
      }),
      schema: _configSchema.schema.boolean(),
      category: ['visualization']
    },
    [_common.CUSTOM_VECTOR_MAP_MAX_SIZE_SETTING]: {
      name: _i18n.i18n.translate('regionMap.advancedSettings.visualization.customVectorMapDefaultSize', {
        defaultMessage: 'Custom vector map size'
      }),
      value: 1000,
      description: _i18n.i18n.translate('regionMap.advancedSettings.visualization.customVectorMapDefaultSizeText', {
        defaultMessage: 'The maximum number of features to load from custom vector map. A higher number might have negative impact on browser rendering performance.'
      }),
      schema: _configSchema.schema.number(),
      category: ['visualization']
    }
  };
}