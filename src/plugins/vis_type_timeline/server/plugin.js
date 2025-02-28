"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _i18n = require("@osd/i18n");

var _operators = require("rxjs/operators");

var _configSchema = require("@osd/config-schema");

var _load_functions = _interopRequireDefault(require("./lib/load_functions"));

var _functions = require("./routes/functions");

var _validate_es = require("./routes/validate_es");

var _run = require("./routes/run");

var _config_manager = require("./lib/config_manager");

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
const experimentalLabel = _i18n.i18n.translate('timeline.uiSettings.experimentalLabel', {
  defaultMessage: 'experimental'
});

/**
 * Represents Timeline Plugin instance that will be managed by the OpenSearch Dashboards plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;
  }

  async setup(core) {
    const config = await this.initializerContext.config.create().pipe((0, _operators.first)()).toPromise();
    const configManager = new _config_manager.ConfigManager(this.initializerContext.config);
    const functions = (0, _load_functions.default)('series_functions');

    const getFunction = name => {
      if (functions[name]) {
        return functions[name];
      }

      throw new Error(_i18n.i18n.translate('timeline.noFunctionErrorMessage', {
        defaultMessage: 'No such function: {name}',
        values: {
          name
        }
      }));
    };

    const logger = this.initializerContext.logger.get('timeline');
    const router = core.http.createRouter();
    const deps = {
      configManager,
      functions,
      getFunction,
      logger,
      core
    };
    (0, _functions.functionsRoute)(router, deps);
    (0, _run.runRoute)(router, deps);
    (0, _validate_es.validateOpenSearchRoute)(router, core);
    core.uiSettings.register({
      'timeline:es.timefield': {
        name: _i18n.i18n.translate('timeline.uiSettings.timeFieldLabel', {
          defaultMessage: 'Time field'
        }),
        value: '@timestamp',
        description: _i18n.i18n.translate('timeline.uiSettings.timeFieldDescription', {
          defaultMessage: 'Default field containing a timestamp when using {opensearchParam}',
          values: {
            opensearchParam: '.opensearch()'
          }
        }),
        category: ['timeline'],
        schema: _configSchema.schema.string()
      },
      'timeline:es.default_index': {
        name: _i18n.i18n.translate('timeline.uiSettings.defaultIndexLabel', {
          defaultMessage: 'Default index'
        }),
        value: '_all',
        description: _i18n.i18n.translate('timeline.uiSettings.defaultIndexDescription', {
          defaultMessage: 'Default opensearch index to search with {opensearchParam}',
          values: {
            opensearchParam: '.opensearch()'
          }
        }),
        category: ['timeline'],
        schema: _configSchema.schema.string()
      },
      'timeline:target_buckets': {
        name: _i18n.i18n.translate('timeline.uiSettings.targetBucketsLabel', {
          defaultMessage: 'Target buckets'
        }),
        value: 200,
        description: _i18n.i18n.translate('timeline.uiSettings.targetBucketsDescription', {
          defaultMessage: 'The number of buckets to shoot for when using auto intervals'
        }),
        category: ['timeline'],
        schema: _configSchema.schema.number()
      },
      'timeline:max_buckets': {
        name: _i18n.i18n.translate('timeline.uiSettings.maximumBucketsLabel', {
          defaultMessage: 'Maximum buckets'
        }),
        value: 2000,
        description: _i18n.i18n.translate('timeline.uiSettings.maximumBucketsDescription', {
          defaultMessage: 'The maximum number of buckets a single datasource can return'
        }),
        category: ['timeline'],
        schema: _configSchema.schema.number()
      },
      'timeline:min_interval': {
        name: _i18n.i18n.translate('timeline.uiSettings.minimumIntervalLabel', {
          defaultMessage: 'Minimum interval'
        }),
        value: '1ms',
        description: _i18n.i18n.translate('timeline.uiSettings.minimumIntervalDescription', {
          defaultMessage: 'The smallest interval that will be calculated when using "auto"',
          description: '"auto" is a technical value in that context, that should not be translated.'
        }),
        category: ['timeline'],
        schema: _configSchema.schema.string()
      },
      'timeline:graphite.url': {
        name: _i18n.i18n.translate('timeline.uiSettings.graphiteURLLabel', {
          defaultMessage: 'Graphite URL',
          description: 'The URL should be in the form of https://www.hostedgraphite.com/UID/ACCESS_KEY/graphite'
        }),
        value: config.graphiteAllowedUrls && config.graphiteAllowedUrls.length ? config.graphiteAllowedUrls[0] : null,
        description: _i18n.i18n.translate('timeline.uiSettings.graphiteURLDescription', {
          defaultMessage: '{experimentalLabel} The URL of your graphite host',
          values: {
            experimentalLabel: `<em>[${experimentalLabel}]</em>`
          }
        }),
        category: ['timeline'],
        schema: _configSchema.schema.nullable(_configSchema.schema.string())
      },
      'timeline:quandl.key': {
        name: _i18n.i18n.translate('timeline.uiSettings.quandlKeyLabel', {
          defaultMessage: 'Quandl key'
        }),
        value: 'someKeyHere',
        description: _i18n.i18n.translate('timeline.uiSettings.quandlKeyDescription', {
          defaultMessage: '{experimentalLabel} Your API key from www.quandl.com',
          values: {
            experimentalLabel: `<em>[${experimentalLabel}]</em>`
          }
        }),
        category: ['timeline'],
        schema: _configSchema.schema.string()
      }
    });
  }

  start() {
    this.initializerContext.logger.get().debug('Starting plugin');
  }

  stop() {
    this.initializerContext.logger.get().debug('Stopping plugin');
  }

}

exports.Plugin = Plugin;