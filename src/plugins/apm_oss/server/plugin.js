"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APMOSSPlugin = void 0;

var _operators = require("rxjs/operators");

var _tutorial = require("./tutorial");

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
class APMOSSPlugin {
  constructor(initContext) {
    this.initContext = initContext;
    this.initContext = initContext;
  }

  async setup(core, plugins) {
    const config$ = this.initContext.config.create();
    const config = await config$.pipe((0, _operators.take)(1)).toPromise();
    const apmTutorialProvider = (0, _tutorial.tutorialProvider)({
      indexPatternTitle: config.indexPattern,
      indices: {
        errorIndices: config.errorIndices,
        metricsIndices: config.metricsIndices,
        onboardingIndices: config.onboardingIndices,
        sourcemapIndices: config.sourcemapIndices,
        transactionIndices: config.transactionIndices
      }
    });
    plugins.home.tutorials.registerTutorial(apmTutorialProvider);
    return {
      config$,
      getRegisteredTutorialProvider: () => apmTutorialProvider
    };
  }

  start() {}

  stop() {}

}

exports.APMOSSPlugin = APMOSSPlugin;