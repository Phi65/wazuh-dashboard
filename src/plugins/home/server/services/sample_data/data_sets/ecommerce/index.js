"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ecommerceSpecProvider = void 0;

var _path = _interopRequireDefault(require("path"));

var _i18n = require("@osd/i18n");

var _saved_objects = require("./saved_objects");

var _field_mappings = require("./field_mappings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const ecommerceName = _i18n.i18n.translate('home.sampleData.ecommerceSpecTitle', {
  defaultMessage: 'Sample eCommerce orders'
});

const ecommerceDescription = _i18n.i18n.translate('home.sampleData.ecommerceSpecDescription', {
  defaultMessage: 'Sample data, visualizations, and dashboards for tracking eCommerce orders.'
});

const initialAppLinks = [];

const ecommerceSpecProvider = function () {
  return {
    id: 'ecommerce',
    name: ecommerceName,
    description: ecommerceDescription,
    previewImagePath: '/plugins/home/assets/sample_data_resources/ecommerce/dashboard.png',
    darkPreviewImagePath: '/plugins/home/assets/sample_data_resources/ecommerce/dashboard_dark.png',
    overviewDashboard: '722b74f0-b882-11e8-a6d9-e546fe2bba5f',
    appLinks: initialAppLinks,
    defaultIndex: 'ff959d40-b880-11e8-a6d9-e546fe2bba5f',
    savedObjects: (0, _saved_objects.getSavedObjects)(),
    dataIndices: [{
      id: 'ecommerce',
      dataPath: _path.default.join(__dirname, './ecommerce.json.gz'),
      fields: _field_mappings.fieldMappings,
      timeFields: ['order_date'],
      currentTimeMarker: '2016-12-11T00:00:00',
      preserveDayOfWeekTimeOfDay: true
    }],
    status: 'not_installed'
  };
};

exports.ecommerceSpecProvider = ecommerceSpecProvider;