"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googlecloudLogsSpecProvider = googlecloudLogsSpecProvider;

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
function googlecloudLogsSpecProvider(context) {
  const moduleName = 'googlecloud';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'googlecloudLogs',
    name: _i18n.i18n.translate('home.tutorials.googlecloudLogs.nameTitle', {
      defaultMessage: 'Google Cloud logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.googlecloudLogs.shortDescription', {
      defaultMessage: 'Collect Google Cloud audit, firewall, and VPC flow logs.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.googlecloudLogs.longDescription', {
      defaultMessage: 'This is a module for Google Cloud logs. It supports reading audit, VPC flow, \
        and firewall logs that have been exported from Stackdriver to a Google Pub/Sub \
        topic sink. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-googlecloud.html'
      }
    }),
    euiIconType: 'logoGoogleG',
    artifacts: {
      dashboards: [{
        id: '6576c480-73a2-11ea-a345-f985c61fe654',
        linkLabel: _i18n.i18n.translate('home.tutorials.googlecloudLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Audit Logs Dashbaord'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-googlecloud.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}