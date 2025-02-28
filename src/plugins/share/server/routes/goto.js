"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGotoRoute = void 0;

var _configSchema = require("@osd/config-schema");

var _std = require("@osd/std");

var _short_url_assert_valid = require("./lib/short_url_assert_valid");

var _short_url_routes = require("../../common/short_url_routes");

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
const createGotoRoute = ({
  router,
  shortUrlLookup,
  http
}) => {
  http.resources.register({
    path: (0, _short_url_routes.getGotoPath)('{urlId}'),
    validate: {
      params: _configSchema.schema.object({
        urlId: _configSchema.schema.string()
      })
    }
  }, router.handleLegacyErrors(async function (context, request, response) {
    const url = await shortUrlLookup.getUrl(request.params.urlId, {
      savedObjects: context.core.savedObjects.client
    });
    (0, _short_url_assert_valid.shortUrlAssertValid)(url);
    const uiSettings = context.core.uiSettings.client;
    const stateStoreInSessionStorage = await uiSettings.get('state:storeInSessionStorage');

    if (!stateStoreInSessionStorage) {
      const basePath = http.basePath.get(request);
      const prependedUrl = (0, _std.modifyUrl)(url, parts => {
        if (!parts.hostname && parts.pathname && parts.pathname.startsWith('/')) {
          parts.pathname = `${basePath}${parts.pathname}`;
        }
      });
      return response.redirected({
        headers: {
          location: prependedUrl
        }
      });
    }

    return response.renderCoreApp();
  }));
};

exports.createGotoRoute = createGotoRoute;