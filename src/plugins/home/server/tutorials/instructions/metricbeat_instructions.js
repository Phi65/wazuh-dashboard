"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetricbeatInstructions = void 0;
exports.metricbeatEnableInstructions = metricbeatEnableInstructions;
exports.metricbeatStatusCheck = metricbeatStatusCheck;
exports.onPremInstructions = onPremInstructions;

var _i18n = require("@osd/i18n");

var _instruction_variant = require("../../../common/instruction_variant");

var _get_space_id_for_beats_tutorial = require("./get_space_id_for_beats_tutorial");

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
const createMetricbeatInstructions = context => ({
  INSTALL: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.osxTitle', {
        defaultMessage: 'Download and install Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.osxTextPre', {
        defaultMessage: 'First time using Metricbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.metricbeat}/metricbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/metricbeat/metricbeat-{config.opensearchDashboards.version}-darwin-x64.tar.gz', 'tar xzvf metricbeat-{config.opensearchDashboards.version}-darwin-x64.tar.gz', 'cd metricbeat-{config.opensearchDashboards.version}-darwin-x64/']
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.debTitle', {
        defaultMessage: 'Download and install Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.debTextPre', {
        defaultMessage: 'First time using Metricbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.metricbeat}/metricbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/metricbeat/metricbeat-{config.opensearchDashboards.version}-amd64.deb', 'sudo dpkg -i metricbeat-{config.opensearchDashboards.version}-amd64.deb'],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.debTextPost', {
        defaultMessage: 'Looking for the 32-bit packages? See the [Download page]({link}).',
        values: {
          link: 'https://opensearch.org/docs/latest/downloads/beats/metricbeat'
        }
      })
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.rpmTitle', {
        defaultMessage: 'Download and install Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.rpmTextPre', {
        defaultMessage: 'First time using Metricbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.metricbeat}/metricbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/metricbeat/metricbeat-{config.opensearchDashboards.version}-x64.rpm', 'sudo rpm -vi metricbeat-{config.opensearchDashboards.version}-x64.rpm'],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.debTextPost', {
        defaultMessage: 'Looking for the 32-bit packages? See the [Download page]({link}).',
        values: {
          link: 'https://opensearch.org/docs/latest/downloads/beats/metricbeat'
        }
      })
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.windowsTitle', {
        defaultMessage: 'Download and install Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.windowsTextPre', {
        defaultMessage: 'First time using Metricbeat? See the [Quick Start]({metricbeatLink}).\n\
 1. Download the Metricbeat Windows zip file from the [Download]({opensearchLink}) page.\n\
 2. Extract the contents of the zip file into {folderPath}.\n\
 3. Rename the {directoryName} directory to `Metricbeat`.\n\
 4. Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select \
**Run As Administrator**). If you are running Windows XP, you might need to download and install PowerShell.\n\
 5. From the PowerShell prompt, run the following commands to install Metricbeat as a Windows service.',
        values: {
          directoryName: '`metricbeat-{config.opensearchDashboards.version}-windows`',
          folderPath: '`C:\\Program Files`',
          metricbeatLink: '{config.docs.beats.metricbeat}/metricbeat-installation-configuration.html',
          opensearchLink: 'https://opensearch.org/docs/latest/downloads/beats/metricbeat'
        }
      }),
      commands: ['cd "C:\\Program Files\\Metricbeat"', '.\\install-service-metricbeat.ps1'],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.install.windowsTextPost', {
        defaultMessage: 'Modify the settings under `output.opensearch` in the {path} file to point to your opensearch installation.',
        values: {
          path: '`C:\\Program Files\\Metricbeat\\metricbeat.yml`'
        }
      })
    }
  },
  START: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.osxTitle', {
        defaultMessage: 'Start Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.osxTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards dashboards. If the dashboards are already set up, omit this command.'
      }),
      commands: ['./metricbeat setup', './metricbeat -e']
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.debTitle', {
        defaultMessage: 'Start Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.debTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards dashboards. If the dashboards are already set up, omit this command.'
      }),
      commands: ['sudo metricbeat setup', 'sudo service metricbeat start']
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.rpmTitle', {
        defaultMessage: 'Start Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.rpmTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards dashboards. If the dashboards are already set up, omit this command.'
      }),
      commands: ['sudo metricbeat setup', 'sudo service metricbeat start']
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.windowsTitle', {
        defaultMessage: 'Start Metricbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.start.windowsTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards dashboards. If the dashboards are already set up, omit this command.'
      }),
      commands: ['.\\metricbeat.exe setup', 'Start-Service metricbeat']
    }
  },
  CONFIG: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.osxTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.osxTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`metricbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.osxTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.debTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.debTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`/etc/metricbeat/metricbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.debTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.rpmTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.rpmTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`/etc/metricbeat/metricbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.rpmTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.windowsTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.windowsTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`C:\\Program Files\\Metricbeat\\metricbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatInstructions.config.windowsTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    }
  }
});

exports.createMetricbeatInstructions = createMetricbeatInstructions;

function metricbeatEnableInstructions(moduleName) {
  return {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.osxTitle', {
        defaultMessage: 'Enable and configure the {moduleName} module',
        values: {
          moduleName
        }
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.osxTextPre', {
        defaultMessage: 'From the installation directory, run:'
      }),
      commands: ['./metricbeat modules enable ' + moduleName],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.osxTextPost', {
        defaultMessage: 'Modify the settings in the `modules.d/{moduleName}.yml` file.',
        values: {
          moduleName
        }
      })
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.debTitle', {
        defaultMessage: 'Enable and configure the {moduleName} module',
        values: {
          moduleName
        }
      }),
      commands: ['sudo metricbeat modules enable ' + moduleName],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.debTextPost', {
        defaultMessage: 'Modify the settings in the `/etc/metricbeat/modules.d/{moduleName}.yml` file.',
        values: {
          moduleName
        }
      })
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.rpmTitle', {
        defaultMessage: 'Enable and configure the {moduleName} module',
        values: {
          moduleName
        }
      }),
      commands: ['sudo metricbeat modules enable ' + moduleName],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.rpmTextPost', {
        defaultMessage: 'Modify the settings in the `/etc/metricbeat/modules.d/{moduleName}.yml` file.',
        values: {
          moduleName
        }
      })
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.windowsTitle', {
        defaultMessage: 'Enable and configure the {moduleName} module',
        values: {
          moduleName
        }
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.windowsTextPre', {
        defaultMessage: 'From the {path} folder, run:',
        values: {
          path: `C:\\Program Files\\Metricbeat`
        }
      }),
      commands: ['.\\metricbeat.exe modules enable ' + moduleName],
      textPost: _i18n.i18n.translate('home.tutorials.common.metricbeatEnableInstructions.windowsTextPost', {
        defaultMessage: 'Modify the settings in the `modules.d/{moduleName}.yml` file.',
        values: {
          moduleName
        }
      })
    }
  };
}

function metricbeatStatusCheck(moduleName) {
  return {
    title: _i18n.i18n.translate('home.tutorials.common.metricbeatStatusCheck.title', {
      defaultMessage: 'Module status'
    }),
    text: _i18n.i18n.translate('home.tutorials.common.metricbeatStatusCheck.text', {
      defaultMessage: 'Check that data is received from the Metricbeat `{moduleName}` module',
      values: {
        moduleName
      }
    }),
    btnLabel: _i18n.i18n.translate('home.tutorials.common.metricbeatStatusCheck.buttonLabel', {
      defaultMessage: 'Check data'
    }),
    success: _i18n.i18n.translate('home.tutorials.common.metricbeatStatusCheck.successText', {
      defaultMessage: 'Data successfully received from this module'
    }),
    error: _i18n.i18n.translate('home.tutorials.common.metricbeatStatusCheck.errorText', {
      defaultMessage: 'No data has been received from this module yet'
    }),
    opensearchHitsCheck: {
      index: 'metricbeat-*',
      query: {
        bool: {
          filter: {
            term: {
              'event.module': moduleName
            }
          }
        }
      }
    }
  };
}

function onPremInstructions(moduleName, context) {
  const METRICBEAT_INSTRUCTIONS = createMetricbeatInstructions(context);
  return {
    instructionSets: [{
      title: _i18n.i18n.translate('home.tutorials.common.metricbeat.premInstructions.gettingStarted.title', {
        defaultMessage: 'Getting Started'
      }),
      instructionVariants: [{
        id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
        instructions: [METRICBEAT_INSTRUCTIONS.INSTALL.OSX, METRICBEAT_INSTRUCTIONS.CONFIG.OSX, metricbeatEnableInstructions(moduleName).OSX, METRICBEAT_INSTRUCTIONS.START.OSX]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
        instructions: [METRICBEAT_INSTRUCTIONS.INSTALL.DEB, METRICBEAT_INSTRUCTIONS.CONFIG.DEB, metricbeatEnableInstructions(moduleName).DEB, METRICBEAT_INSTRUCTIONS.START.DEB]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
        instructions: [METRICBEAT_INSTRUCTIONS.INSTALL.RPM, METRICBEAT_INSTRUCTIONS.CONFIG.RPM, metricbeatEnableInstructions(moduleName).RPM, METRICBEAT_INSTRUCTIONS.START.RPM]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
        instructions: [METRICBEAT_INSTRUCTIONS.INSTALL.WINDOWS, METRICBEAT_INSTRUCTIONS.CONFIG.WINDOWS, metricbeatEnableInstructions(moduleName).WINDOWS, METRICBEAT_INSTRUCTIONS.START.WINDOWS]
      }],
      statusCheck: metricbeatStatusCheck(moduleName)
    }]
  };
}