"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iptablesLogsSpecProvider = iptablesLogsSpecProvider;

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
function iptablesLogsSpecProvider(context) {
  const moduleName = 'iptables';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'iptablesLogs',
    name: _i18n.i18n.translate('home.tutorials.iptablesLogs.nameTitle', {
      defaultMessage: 'Iptables logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.iptablesLogs.shortDescription', {
      defaultMessage: 'Collect iptables and ip6tables logs.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.iptablesLogs.longDescription', {
      defaultMessage: 'This is a module for iptables and ip6tables logs. It parses logs received \
        over the network via syslog or from a file. Also, it understands the prefix \
        added by some Ubiquiti firewalls, which includes the rule set name, rule \
        number and the action performed on the traffic (allow/deny). \
        [Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-iptables.html'
      }
    }),
    euiIconType: '/plugins/home/assets/logos/linux.svg',
    artifacts: {
      dashboards: [{
        id: 'ceefb9e0-1f51-11e9-93ed-f7e068f4aebb-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.iptablesLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Iptables Overview'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-iptables.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}