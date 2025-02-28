"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mispLogsSpecProvider = mispLogsSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _filebeat_instructions = require("../instructions/filebeat_instructions");

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
function mispLogsSpecProvider(context) {
  const moduleName = 'misp';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'mispLogs',
    name: _i18n.i18n.translate('home.tutorials.mispLogs.nameTitle', {
      defaultMessage: 'MISP threat intel logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.mispLogs.shortDescription', {
      defaultMessage: 'Collect MISP threat intelligence data with Filebeat.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.mispLogs.longDescription', {
      defaultMessage: 'This is a filebeat module for reading threat intel information from the MISP platform ( https://www.circl.lu/doc/misp/). It uses the httpjson input to access the MISP REST API interface. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-misp.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/misp.svg',
    artifacts: {
      dashboards: [{
        id: 'c6cac9e0-f105-11e9-9a88-690b10c8ee99',
        linkLabel: _i18n.i18n.translate('home.tutorials.mispLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'MISP Overview'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-misp.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}