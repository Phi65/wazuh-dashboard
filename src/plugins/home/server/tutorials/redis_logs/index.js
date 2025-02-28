"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisLogsSpecProvider = redisLogsSpecProvider;

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
function redisLogsSpecProvider(context) {
  const moduleName = 'redis';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'redisLogs',
    name: _i18n.i18n.translate('home.tutorials.redisLogs.nameTitle', {
      defaultMessage: 'Redis logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.LOGGING,
    shortDescription: _i18n.i18n.translate('home.tutorials.redisLogs.shortDescription', {
      defaultMessage: 'Collect and parse error and slow logs created by Redis.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.redisLogs.longDescription', {
      defaultMessage: 'The `redis` Filebeat module parses error and slow logs created by Redis. \
For Redis to write error logs, make sure the `logfile` option, from the \
Redis configuration file, is set to `redis-server.log`. \
The slow logs are read directly from Redis via the `SLOWLOG` command. \
For Redis to record slow logs, make sure the `slowlog-log-slower-than` \
option is set. \
Note that the `slowlog` fileset is experimental. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-redis.html'
      }
    }),
    euiIconType: 'logoRedis',
    artifacts: {
      dashboards: [{
        id: '7fea2930-478e-11e7-b1f0-cb29bac6bf8b-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.redisLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Redis logs dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-redis.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}