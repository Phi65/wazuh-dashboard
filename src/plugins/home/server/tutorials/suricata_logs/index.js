"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suricataLogsSpecProvider = suricataLogsSpecProvider;

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
function suricataLogsSpecProvider(context) {
  const moduleName = 'suricata';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'suricataLogs',
    name: _i18n.i18n.translate('home.tutorials.suricataLogs.nameTitle', {
      defaultMessage: 'Suricata logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.suricataLogs.shortDescription', {
      defaultMessage: 'Collect Suricata IDS/IPS/NSM logs.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.suricataLogs.longDescription', {
      defaultMessage: 'This is a module to the Suricata IDS/IPS/NSM log. It parses logs that are \
        in the [Suricata Eve JSON format](https://suricata.readthedocs.io/en/latest/output/eve/eve-json-format.html). \
        [Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-suricata.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/suricata.svg',
    artifacts: {
      dashboards: [{
        id: '78289c40-86da-11e8-b59d-21efb914e65c-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.suricataLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Suricata Events Overview'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-suricata.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}