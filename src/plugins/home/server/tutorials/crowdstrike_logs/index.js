"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crowdstrikeLogsSpecProvider = crowdstrikeLogsSpecProvider;

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
function crowdstrikeLogsSpecProvider(context) {
  const moduleName = 'crowdstrike';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'crowdstrikeLogs',
    name: _i18n.i18n.translate('home.tutorials.crowdstrikeLogs.nameTitle', {
      defaultMessage: 'CrowdStrike logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.crowdstrikeLogs.shortDescription', {
      defaultMessage: 'Collect CrowdStrike Falcon logs using the Falcon SIEM Connector.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.crowdstrikeLogs.longDescription', {
      defaultMessage: 'This is the Filebeat module for CrowdStrike Falcon using the Falcon \
        [SIEM Connector](https://www.crowdstrike.com/blog/tech-center/integrate-with-your-siem). \
        This module collects this data, converts it to OCS, and ingests it to view in the SIEM. \
        By default, the Falcon SIEM connector outputs JSON formatted Falcon Streaming API event data. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-crowdstrike.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/crowdstrike.svg',
    artifacts: {
      dashboards: [],
      application: {
        path: '/app/security',
        label: _i18n.i18n.translate('home.tutorials.crowdstrikeLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Security App'
        })
      },
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-crowdstrike.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}