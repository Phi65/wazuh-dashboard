"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizationSavedObjectType = void 0;

var _visualization_migrations = require("./visualization_migrations");

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
const visualizationSavedObjectType = {
  name: 'visualization',
  hidden: false,
  namespaceType: 'single',
  management: {
    icon: 'visualizeApp',
    defaultSearchField: 'title',
    importableAndExportable: true,

    getTitle(obj) {
      return obj.attributes.title;
    },

    getEditUrl(obj) {
      return `/management/opensearch-dashboards/objects/savedVisualizations/${encodeURIComponent(obj.id)}`;
    },

    getInAppUrl(obj) {
      return {
        path: `/app/visualize#/edit/${encodeURIComponent(obj.id)}`,
        uiCapabilitiesPath: 'visualize.show'
      };
    }

  },
  mappings: {
    properties: {
      description: {
        type: 'text'
      },
      kibanaSavedObjectMeta: {
        properties: {
          searchSourceJSON: {
            type: 'text',
            index: false
          }
        }
      },
      savedSearchRefName: {
        type: 'keyword',
        index: false,
        doc_values: false
      },
      title: {
        type: 'text'
      },
      uiStateJSON: {
        type: 'text',
        index: false
      },
      version: {
        type: 'integer'
      },
      visState: {
        type: 'text',
        index: false
      }
    }
  },
  migrations: _visualization_migrations.visualizationSavedObjectTypeMigrations
};
exports.visualizationSavedObjectType = visualizationSavedObjectType;