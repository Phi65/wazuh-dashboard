"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogstashInstructions = void 0;

var _i18n = require("@osd/i18n");

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
const createLogstashInstructions = () => ({
  INSTALL: {
    OSX: [{
      title: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.java.osxTitle', {
        defaultMessage: 'Download and install the Java Runtime Environment'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.java.osxTextPre', {
        defaultMessage: 'Follow the installation instructions [here]({link}).',
        values: {
          link: 'https://docs.oracle.com/javase/8/docs/technotes/guides/install/mac_jre.html'
        }
      })
    }, {
      title: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.logstash.osxTitle', {
        defaultMessage: 'Download and install Logstash'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.logstash.osxTextPre', {
        defaultMessage: 'First time using Logstash?  See the [Getting Started Guide]({link}).',
        values: {
          link: '{config.docs.base_url}guide/en/logstash/current/getting-started-with-logstash.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/logstash/logstash-{config.opensearchDashboards.version}.tar.gz', 'tar xzvf logstash-{config.opensearchDashboards.version}.tar.gz']
    }],
    WINDOWS: [{
      title: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.java.windowsTitle', {
        defaultMessage: 'Download and install the Java Runtime Environment'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.java.windowsTextPre', {
        defaultMessage: 'Follow the installation instructions [here]({link}).',
        values: {
          link: 'https://docs.oracle.com/javase/8/docs/technotes/guides/install/windows_jre_install.html'
        }
      })
    }, {
      title: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.logstash.windowsTitle', {
        defaultMessage: 'Download and install Logstash'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.logstashInstructions.install.logstash.windowsTextPre', {
        defaultMessage: 'First time using Logstash?  See the [Getting Started Guide]({logstashLink}).\n\
 1. [Download]({opensearchLink}) the Logstash Windows zip file.\n\
 2. Extract the contents of the zip file.',
        values: {
          logstashLink: '{config.docs.base_url}guide/en/logstash/current/getting-started-with-logstash.html',
          opensearchLink: 'https://artifacts.opensearch.org/downloads/logstash/logstash-{config.opensearchDashboards.version}.zip'
        }
      })
    }]
  }
});

exports.createLogstashInstructions = createLogstashInstructions;