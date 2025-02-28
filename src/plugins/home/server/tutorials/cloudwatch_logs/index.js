"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudwatchLogsSpecProvider = cloudwatchLogsSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _functionbeat_instructions = require("../instructions/functionbeat_instructions");

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
function cloudwatchLogsSpecProvider(context) {
  const moduleName = 'aws';
  return {
    id: 'cloudwatchLogs',
    name: _i18n.i18n.translate('home.tutorials.cloudwatchLogs.nameTitle', {
      defaultMessage: 'AWS Cloudwatch logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.LOGGING,
    shortDescription: _i18n.i18n.translate('home.tutorials.cloudwatchLogs.shortDescription', {
      defaultMessage: 'Collect Cloudwatch logs with Functionbeat.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.cloudwatchLogs.longDescription', {
      defaultMessage: 'Collect Cloudwatch logs by deploying Functionbeat to run as \
        an AWS Lambda function. \
        [Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.functionbeat}/functionbeat-installation-configuration.html'
      }
    }),
    euiIconType: 'logoAWS',
    artifacts: {
      dashboards: [// TODO
      ],
      exportedFields: {
        documentationUrl: '{config.docs.beats.functionbeat}/exported-fields.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _functionbeat_instructions.onPremInstructions)([], context)
  };
}