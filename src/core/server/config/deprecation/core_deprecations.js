"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coreDeprecationProvider = void 0;

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
const configPathDeprecation = (settings, fromPath, log) => {
  if ((0, _lodash.has)(process.env, 'CONFIG_PATH')) {
    log(`Environment variable CONFIG_PATH is deprecated. It has been replaced with OSD_PATH_CONF pointing to a config folder`);
  }

  return settings;
};

const dataPathDeprecation = (settings, fromPath, log) => {
  if ((0, _lodash.has)(process.env, 'DATA_PATH')) {
    log(`Environment variable "DATA_PATH" will be removed.  It has been replaced with opensearch_dashboards.yml setting "path.data"`);
  }

  return settings;
};

const xsrfDeprecation = (settings, fromPath, log) => {
  var _settings$server$xsrf, _settings$server, _settings$server$xsrf2;

  if (((_settings$server$xsrf = (_settings$server = settings.server) === null || _settings$server === void 0 ? void 0 : (_settings$server$xsrf2 = _settings$server.xsrf) === null || _settings$server$xsrf2 === void 0 ? void 0 : _settings$server$xsrf2.whitelist) !== null && _settings$server$xsrf !== void 0 ? _settings$server$xsrf : []).length > 0) {
    log('It is not recommended to disable xsrf protections for API endpoints via [server.xsrf.whitelist]. ' + 'Instead, supply the "osd-xsrf" header.');
  }

  return settings;
};

const rewriteBasePathDeprecation = (settings, fromPath, log) => {
  if ((0, _lodash.has)(settings, 'server.basePath') && !(0, _lodash.has)(settings, 'server.rewriteBasePath')) {
    log('You should set server.basePath along with server.rewriteBasePath. OpenSearch Dashboards ' + 'will expect that all requests start with server.basePath rather than expecting you to rewrite ' + 'the requests in your reverse proxy. Set server.rewriteBasePath to false to preserve the ' + 'current behavior and silence this warning.');
  }

  return settings;
};

const cspRulesDeprecation = (settings, fromPath, log) => {
  const NONCE_STRING = `{nonce}`; // Policies that should include the 'self' source

  const SELF_POLICIES = Object.freeze(['script-src', 'style-src']);
  const SELF_STRING = `'self'`;
  const rules = (0, _lodash.get)(settings, 'csp.rules');

  if (rules) {
    const parsed = new Map(rules.map(ruleStr => {
      const parts = ruleStr.split(/\s+/);
      return [parts[0], parts.slice(1)];
    }));
    settings.csp.rules = [...parsed].map(([policy, sourceList]) => {
      if (sourceList.find(source => source.includes(NONCE_STRING))) {
        log(`csp.rules no longer supports the {nonce} syntax. Replacing with 'self' in ${policy}`);
        sourceList = sourceList.filter(source => !source.includes(NONCE_STRING)); // Add 'self' if not present

        if (!sourceList.find(source => source.includes(SELF_STRING))) {
          sourceList.push(SELF_STRING);
        }
      }

      if (SELF_POLICIES.includes(policy) && !sourceList.find(source => source.includes(SELF_STRING))) {
        log(`csp.rules must contain the 'self' source. Automatically adding to ${policy}.`);
        sourceList.push(SELF_STRING);
      }

      return `${policy} ${sourceList.join(' ')}`.trim();
    });
  }

  return settings;
};

const mapManifestServiceUrlDeprecation = (settings, fromPath, log) => {
  if ((0, _lodash.has)(settings, 'map.manifestServiceUrl')) {
    log('You should no longer use the map.manifestServiceUrl setting in opensearch_dashboards.yml to configure the location ' + 'of the Maps Service settings. These settings have moved to the "map.emsTileApiUrl" and ' + '"map.emsFileApiUrl" settings instead. These settings are for development use only and should not be ' + 'modified for use in production environments.');
  }

  return settings;
};

const coreDeprecationProvider = ({
  unusedFromRoot,
  renameFromRoot,
  renameFromRootWithoutMap
}) => [unusedFromRoot('savedObjects.indexCheckTimeout'), unusedFromRoot('server.xsrf.token'), unusedFromRoot('maps.manifestServiceUrl'), unusedFromRoot('optimize.lazy'), unusedFromRoot('optimize.lazyPort'), unusedFromRoot('optimize.lazyHost'), unusedFromRoot('optimize.lazyPrebuild'), unusedFromRoot('optimize.lazyProxyTimeout'), unusedFromRoot('optimize.enabled'), unusedFromRoot('optimize.bundleFilter'), unusedFromRoot('optimize.bundleDir'), unusedFromRoot('optimize.viewCaching'), unusedFromRoot('optimize.watch'), unusedFromRoot('optimize.watchPort'), unusedFromRoot('optimize.watchHost'), unusedFromRoot('optimize.watchPrebuild'), unusedFromRoot('optimize.watchProxyTimeout'), unusedFromRoot('optimize.useBundleCache'), unusedFromRoot('optimize.sourceMaps'), unusedFromRoot('optimize.workers'), unusedFromRoot('optimize.profile'), unusedFromRoot('optimize.validateSyntaxOfNodeModules'), renameFromRoot('cpu.cgroup.path.override', 'ops.cGroupOverrides.cpuPath'), renameFromRoot('cpuacct.cgroup.path.override', 'ops.cGroupOverrides.cpuAcctPath'), unusedFromRoot('opensearch.preserveHost'), unusedFromRoot('opensearch.startupTimeout'), renameFromRootWithoutMap('server.xsrf.whitelist', 'server.xsrf.allowlist'), renameFromRootWithoutMap('server.compression.referrerWhitelist', 'server.compression.referrerAllowlist'), configPathDeprecation, dataPathDeprecation, rewriteBasePathDeprecation, cspRulesDeprecation, mapManifestServiceUrlDeprecation, xsrfDeprecation];

exports.coreDeprecationProvider = coreDeprecationProvider;