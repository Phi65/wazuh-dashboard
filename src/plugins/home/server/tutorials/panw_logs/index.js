"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panwLogsSpecProvider = panwLogsSpecProvider;

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
function panwLogsSpecProvider(context) {
  const moduleName = 'panw';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'panwLogs',
    name: _i18n.i18n.translate('home.tutorials.panwLogs.nameTitle', {
      defaultMessage: 'Palo Alto Networks PAN-OS logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.panwLogs.shortDescription', {
      defaultMessage: 'Collect Palo Alto Networks PAN-OS threat and traffic logs over syslog or from a log file.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.panwLogs.longDescription', {
      defaultMessage: 'This is a module for Palo Alto Networks PAN-OS firewall monitoring \
        logs received over Syslog or read from a file. It currently supports \
        messages of Traffic and Threat types. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-panw.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/paloalto.svg',
    artifacts: {
      dashboards: [{
        id: 'e40ba240-7572-11e9-976e-65a8f47cc4c1',
        linkLabel: _i18n.i18n.translate('home.tutorials.panwLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'PANW Network Flows'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-panw.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}