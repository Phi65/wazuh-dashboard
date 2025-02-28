"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createListRoute = void 0;

var _create_index_name = require("../lib/create_index_name");

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
const NOT_INSTALLED = 'not_installed';
const INSTALLED = 'installed';
const UNKNOWN = 'unknown';

const createListRoute = (router, sampleDatasets) => {
  router.get({
    path: '/api/sample_data',
    validate: false
  }, async (context, req, res) => {
    const registeredSampleDatasets = sampleDatasets.map(sampleDataset => {
      return {
        id: sampleDataset.id,
        name: sampleDataset.name,
        description: sampleDataset.description,
        previewImagePath: sampleDataset.previewImagePath,
        darkPreviewImagePath: sampleDataset.darkPreviewImagePath,
        overviewDashboard: sampleDataset.overviewDashboard,
        appLinks: sampleDataset.appLinks,
        defaultIndex: sampleDataset.defaultIndex,
        dataIndices: sampleDataset.dataIndices.map(({
          id
        }) => ({
          id
        })),
        status: sampleDataset.status,
        statusMsg: sampleDataset.statusMsg
      };
    });
    const isInstalledPromises = registeredSampleDatasets.map(async sampleDataset => {
      for (let i = 0; i < sampleDataset.dataIndices.length; i++) {
        const dataIndexConfig = sampleDataset.dataIndices[i];
        const index = (0, _create_index_name.createIndexName)(sampleDataset.id, dataIndexConfig.id);

        try {
          const indexExists = await context.core.opensearch.legacy.client.callAsCurrentUser('indices.exists', {
            index
          });

          if (!indexExists) {
            sampleDataset.status = NOT_INSTALLED;
            return;
          }

          const {
            count
          } = await context.core.opensearch.legacy.client.callAsCurrentUser('count', {
            index
          });

          if (count === 0) {
            sampleDataset.status = NOT_INSTALLED;
            return;
          }
        } catch (err) {
          sampleDataset.status = UNKNOWN;
          sampleDataset.statusMsg = err.message;
          return;
        }
      }

      try {
        await context.core.savedObjects.client.get('dashboard', sampleDataset.overviewDashboard);
      } catch (err) {
        if (context.core.savedObjects.client.errors.isNotFoundError(err)) {
          sampleDataset.status = NOT_INSTALLED;
          return;
        }

        sampleDataset.status = UNKNOWN;
        sampleDataset.statusMsg = err.message;
        return;
      }

      sampleDataset.status = INSTALLED;
    });
    await Promise.all(isInstalledPromises);
    return res.ok({
      body: registeredSampleDatasets
    });
  });
};

exports.createListRoute = createListRoute;