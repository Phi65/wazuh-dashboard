"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ciscoLogsSpecProvider = ciscoLogsSpecProvider;

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
function ciscoLogsSpecProvider(context) {
  const moduleName = 'cisco';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'ciscoLogs',
    name: _i18n.i18n.translate('home.tutorials.ciscoLogs.nameTitle', {
      defaultMessage: 'Cisco logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.ciscoLogs.shortDescription', {
      defaultMessage: 'Collect Cisco network device logs over syslog or from a file.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.ciscoLogs.longDescription', {
      defaultMessage: 'This is a module for Cisco network devices logs (ASA, FTD, IOS, Nexus). It includes the following filesets for receiving logs over syslog or read from a file: \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-cisco.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/cisco.svg',
    artifacts: {
      dashboards: [{
        id: 'a555b160-4987-11e9-b8ce-ed898b5ef295',
        linkLabel: _i18n.i18n.translate('home.tutorials.ciscoLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'ASA Firewall Dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-cisco.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}