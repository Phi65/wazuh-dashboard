"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhReportingCtrl = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _wazuhModules = require("../../common/wazuh-modules");

var TimSort = _interopRequireWildcard(require("timsort"));

var _errorResponse = require("../lib/error-response");

var _processStateEquivalence = _interopRequireDefault(require("../lib/process-state-equivalence"));

var _csvKeyEquivalence = require("../../common/csv-key-equivalence");

var _agentConfiguration = require("../lib/reporting/agent-configuration");

var _extendedInformation = require("../lib/reporting/extended-information");

var _printer = require("../lib/reporting/printer");

var _logger = require("../lib/logger");

var _constants = require("../../common/constants");

var _filesystem = require("../lib/filesystem");

var _wz_agent_status = require("../../common/services/wz_agent_status");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WazuhReportingCtrl {
  constructor() {
    _defineProperty(this, "createReportsModules", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:createReportsModules', `Report started`, 'info');
        const {
          array,
          agents,
          browserTimezone,
          searchBar,
          filters,
          serverSideQuery,
          time,
          tables,
          section,
          indexPatternTitle,
          apiId
        } = request.body;
        const {
          moduleID
        } = request.params;
        const {
          from,
          to
        } = time || {};
        let additionalTables = []; // Init

        const printer = new _printer.ReportPrinter();
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        await this.renderHeader(context, printer, section, moduleID, agents, apiId);
        const [sanitizedFilters, agentsFilter] = filters ? this.sanitizeKibanaFilters(filters, searchBar) : [false, null];

        if (time && sanitizedFilters) {
          printer.addTimeRangeAndFilters(from, to, sanitizedFilters, browserTimezone);
        }

        if (time) {
          additionalTables = await (0, _extendedInformation.extendedInformation)(context, printer, section, moduleID, apiId, new Date(from).getTime(), new Date(to).getTime(), serverSideQuery, agentsFilter, indexPatternTitle, agents);
        }

        printer.addVisualizations(array, agents, moduleID);

        if (tables) {
          printer.addTables([...tables, ...(additionalTables || [])]);
        } //add authorized agents


        if (agentsFilter !== null && agentsFilter !== void 0 && agentsFilter.agentsText) {
          printer.addAgentsFilters(agentsFilter.agentsText);
        }

        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`
          }
        });
      } catch (error) {
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      body: {
        agents
      },
      params: {
        moduleID
      }
    }) => `wazuh-module-${agents ? `agents-${agents}` : 'overview'}-${moduleID}-${this.generateReportTimestamp()}.pdf`));

    _defineProperty(this, "createReportsGroups", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:createReportsGroups', `Report started`, 'info');
        const {
          components,
          apiId
        } = request.body;
        const {
          groupID
        } = request.params; // Init

        const printer = new _printer.ReportPrinter();
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        let tables = [];
        const equivalences = {
          localfile: 'Local files',
          osquery: 'Osquery',
          command: 'Command',
          syscheck: 'Syscheck',
          'open-scap': 'OpenSCAP',
          'cis-cat': 'CIS-CAT',
          syscollector: 'Syscollector',
          rootcheck: 'Rootcheck',
          labels: 'Labels',
          sca: 'Security configuration assessment'
        };
        printer.addContent({
          text: `Group ${groupID} configuration`,
          style: 'h1'
        }); // Group configuration

        if (components['0']) {
          const {
            data: {
              data: configuration
            }
          } = await context.wazuh.api.client.asCurrentUser.request('GET', `/groups/${groupID}/configuration`, {}, {
            apiHostID: apiId
          });

          if (configuration.affected_items.length > 0 && Object.keys(configuration.affected_items[0].config).length) {
            printer.addContent({
              text: 'Configurations',
              style: {
                fontSize: 14,
                color: '#000'
              },
              margin: [0, 10, 0, 15]
            });
            const section = {
              labels: [],
              isGroupConfig: true
            };

            for (let config of configuration.affected_items) {
              let filterTitle = '';
              let index = 0;

              for (let filter of Object.keys(config.filters)) {
                filterTitle = filterTitle.concat(`${filter}: ${config.filters[filter]}`);

                if (index < Object.keys(config.filters).length - 1) {
                  filterTitle = filterTitle.concat(' | ');
                }

                index++;
              }

              printer.addContent({
                text: filterTitle,
                style: 'h4',
                margin: [0, 0, 0, 10]
              });
              let idx = 0;
              section.tabs = [];

              for (let _d of Object.keys(config.config)) {
                for (let c of _agentConfiguration.AgentConfiguration.configurations) {
                  for (let s of c.sections) {
                    section.opts = s.opts || {};

                    for (let cn of s.config || []) {
                      if (cn.configuration === _d) {
                        section.labels = s.labels || [[]];
                      }
                    }

                    for (let wo of s.wodle || []) {
                      if (wo.name === _d) {
                        section.labels = s.labels || [[]];
                      }
                    }
                  }
                }

                section.labels[0]['pack'] = 'Packs';
                section.labels[0]['content'] = 'Evaluations';
                section.labels[0]['7'] = 'Scan listening netwotk ports';
                section.tabs.push(equivalences[_d]);

                if (Array.isArray(config.config[_d])) {
                  /* LOG COLLECTOR */
                  if (_d === 'localfile') {
                    let groups = [];

                    config.config[_d].forEach(obj => {
                      if (!groups[obj.logformat]) {
                        groups[obj.logformat] = [];
                      }

                      groups[obj.logformat].push(obj);
                    });

                    Object.keys(groups).forEach(group => {
                      let saveidx = 0;
                      groups[group].forEach((x, i) => {
                        if (Object.keys(x).length > Object.keys(groups[group][saveidx]).length) {
                          saveidx = i;
                        }
                      });
                      const columns = Object.keys(groups[group][saveidx]);
                      const rows = groups[group].map(x => {
                        let row = [];
                        columns.forEach(key => {
                          row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
                            return x + '\n';
                          }) : JSON.stringify(x[key]));
                        });
                        return row;
                      });
                      columns.forEach((col, i) => {
                        columns[i] = col[0].toUpperCase() + col.slice(1);
                      });
                      tables.push({
                        title: 'Local files',
                        type: 'table',
                        columns,
                        rows
                      });
                    });
                  } else if (_d === 'labels') {
                    const obj = config.config[_d][0].label;
                    const columns = Object.keys(obj[0]);

                    if (!columns.includes('hidden')) {
                      columns.push('hidden');
                    }

                    const rows = obj.map(x => {
                      let row = [];
                      columns.forEach(key => {
                        row.push(x[key]);
                      });
                      return row;
                    });
                    columns.forEach((col, i) => {
                      columns[i] = col[0].toUpperCase() + col.slice(1);
                    });
                    tables.push({
                      title: 'Labels',
                      type: 'table',
                      columns,
                      rows
                    });
                  } else {
                    for (let _d2 of config.config[_d]) {
                      tables.push(...this.getConfigTables(_d2, section, idx));
                    }
                  }
                } else {
                  /*INTEGRITY MONITORING MONITORED DIRECTORIES */
                  if (config.config[_d].directories) {
                    const directories = config.config[_d].directories;
                    delete config.config[_d].directories;
                    tables.push(...this.getConfigTables(config.config[_d], section, idx));
                    let diffOpts = [];
                    Object.keys(section.opts).forEach(x => {
                      diffOpts.push(x);
                    });
                    const columns = ['', ...diffOpts.filter(x => x !== 'check_all' && x !== 'check_sum')];
                    let rows = [];
                    directories.forEach(x => {
                      let row = [];
                      row.push(x.path);
                      columns.forEach(y => {
                        if (y !== '') {
                          y = y !== 'check_whodata' ? y : 'whodata';
                          row.push(x[y] ? x[y] : 'no');
                        }
                      });
                      row.push(x.recursion_level);
                      rows.push(row);
                    });
                    columns.forEach((x, idx) => {
                      columns[idx] = section.opts[x];
                    });
                    columns.push('RL');
                    tables.push({
                      title: 'Monitored directories',
                      type: 'table',
                      columns,
                      rows
                    });
                  } else {
                    tables.push(...this.getConfigTables(config.config[_d], section, idx));
                  }
                }

                for (const table of tables) {
                  printer.addConfigTables([table]);
                }

                idx++;
                tables = [];
              }

              tables = [];
            }
          } else {
            printer.addContent({
              text: 'A configuration for this group has not yet been set up.',
              style: {
                fontSize: 12,
                color: '#000'
              },
              margin: [0, 10, 0, 15]
            });
          }
        } // Agents in group


        if (components['1']) {
          await this.renderHeader(context, printer, 'groupConfig', groupID, [], apiId);
        }

        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`
          }
        });
      } catch (error) {
        (0, _logger.log)('reporting:createReportsGroups', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        groupID
      }
    }) => `wazuh-group-configuration-${groupID}-${this.generateReportTimestamp()}.pdf`));

    _defineProperty(this, "createReportsAgentsConfiguration", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:createReportsAgentsConfiguration', `Report started`, 'info');
        const {
          components,
          apiId
        } = request.body;
        const {
          agentID
        } = request.params;
        const printer = new _printer.ReportPrinter();
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        let wmodulesResponse = {};
        let tables = [];

        try {
          wmodulesResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents/${agentID}/config/wmodules/wmodules`, {}, {
            apiHostID: apiId
          });
        } catch (error) {
          (0, _logger.log)('reporting:report', error.message || error, 'debug');
        }

        await this.renderHeader(context, printer, 'agentConfig', 'agentConfig', agentID, apiId);
        let idxComponent = 0;

        for (let config of _agentConfiguration.AgentConfiguration.configurations) {
          let titleOfSection = false;
          (0, _logger.log)('reporting:createReportsAgentsConfiguration', `Iterate over ${config.sections.length} configuration sections`, 'debug');

          for (let section of config.sections) {
            let titleOfSubsection = false;

            if (components[idxComponent] && (section.config || section.wodle)) {
              let idx = 0;
              const configs = (section.config || []).concat(section.wodle || []);
              (0, _logger.log)('reporting:createReportsAgentsConfiguration', `Iterate over ${configs.length} configuration blocks`, 'debug');

              for (let conf of configs) {
                let agentConfigResponse = {};

                try {
                  if (!conf['name']) {
                    agentConfigResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents/${agentID}/config/${conf.component}/${conf.configuration}`, {}, {
                      apiHostID: apiId
                    });
                  } else {
                    for (let wodle of wmodulesResponse.data.data['wmodules']) {
                      if (Object.keys(wodle)[0] === conf['name']) {
                        agentConfigResponse.data = {
                          data: wodle
                        };
                      }
                    }
                  }

                  const agentConfig = agentConfigResponse && agentConfigResponse.data && agentConfigResponse.data.data;

                  if (!titleOfSection) {
                    printer.addContent({
                      text: config.title,
                      style: 'h1',
                      margin: [0, 0, 0, 15]
                    });
                    titleOfSection = true;
                  }

                  if (!titleOfSubsection) {
                    printer.addContent({
                      text: section.subtitle,
                      style: 'h4'
                    });
                    printer.addContent({
                      text: section.desc,
                      style: {
                        fontSize: 12,
                        color: '#000'
                      },
                      margin: [0, 0, 0, 10]
                    });
                    titleOfSubsection = true;
                  }

                  if (agentConfig) {
                    for (let agentConfigKey of Object.keys(agentConfig)) {
                      if (Array.isArray(agentConfig[agentConfigKey])) {
                        /* LOG COLLECTOR */
                        if (conf.filterBy) {
                          let groups = [];
                          agentConfig[agentConfigKey].forEach(obj => {
                            if (!groups[obj.logformat]) {
                              groups[obj.logformat] = [];
                            }

                            groups[obj.logformat].push(obj);
                          });
                          Object.keys(groups).forEach(group => {
                            let saveidx = 0;
                            groups[group].forEach((x, i) => {
                              if (Object.keys(x).length > Object.keys(groups[group][saveidx]).length) {
                                saveidx = i;
                              }
                            });
                            const columns = Object.keys(groups[group][saveidx]);
                            const rows = groups[group].map(x => {
                              let row = [];
                              columns.forEach(key => {
                                row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
                                  return x + '\n';
                                }) : JSON.stringify(x[key]));
                              });
                              return row;
                            });
                            columns.forEach((col, i) => {
                              columns[i] = col[0].toUpperCase() + col.slice(1);
                            });
                            tables.push({
                              title: section.labels[0][group],
                              type: 'table',
                              columns,
                              rows
                            });
                          });
                        } else if (agentConfigKey.configuration !== 'socket') {
                          tables.push(...this.getConfigTables(agentConfig[agentConfigKey], section, idx));
                        } else {
                          for (let _d2 of agentConfig[agentConfigKey]) {
                            tables.push(...this.getConfigTables(_d2, section, idx));
                          }
                        }
                      } else {
                        /* INTEGRITY MONITORING MONITORED DIRECTORIES */
                        if (conf.matrix) {
                          const {
                            directories,
                            diff,
                            synchronization,
                            file_limit,
                            ...rest
                          } = agentConfig[agentConfigKey];
                          tables.push(...this.getConfigTables(rest, section, idx), ...(diff && diff.disk_quota ? this.getConfigTables(diff.disk_quota, {
                            tabs: ['Disk quota']
                          }, 0) : []), ...(diff && diff.file_size ? this.getConfigTables(diff.file_size, {
                            tabs: ['File size']
                          }, 0) : []), ...(synchronization ? this.getConfigTables(synchronization, {
                            tabs: ['Synchronization']
                          }, 0) : []), ...(file_limit ? this.getConfigTables(file_limit, {
                            tabs: ['File limit']
                          }, 0) : []));
                          let diffOpts = [];
                          Object.keys(section.opts).forEach(x => {
                            diffOpts.push(x);
                          });
                          const columns = ['', ...diffOpts.filter(x => x !== 'check_all' && x !== 'check_sum')];
                          let rows = [];
                          directories.forEach(x => {
                            let row = [];
                            row.push(x.dir);
                            columns.forEach(y => {
                              if (y !== '') {
                                row.push(x.opts.indexOf(y) > -1 ? 'yes' : 'no');
                              }
                            });
                            row.push(x.recursion_level);
                            rows.push(row);
                          });
                          columns.forEach((x, idx) => {
                            columns[idx] = section.opts[x];
                          });
                          columns.push('RL');
                          tables.push({
                            title: 'Monitored directories',
                            type: 'table',
                            columns,
                            rows
                          });
                        } else {
                          tables.push(...this.getConfigTables(agentConfig[agentConfigKey], section, idx));
                        }
                      }
                    }
                  } else {
                    // Print no configured module and link to the documentation
                    printer.addContent({
                      text: ['This module is not configured. Please take a look on how to configure it in ', {
                        text: `${section.subtitle.toLowerCase()} configuration.`,
                        link: section.docuLink,
                        style: {
                          fontSize: 12,
                          color: '#1a0dab'
                        }
                      }],
                      margin: [0, 0, 0, 20]
                    });
                  }
                } catch (error) {
                  (0, _logger.log)('reporting:report', error.message || error, 'debug');
                }

                idx++;
              }

              for (const table of tables) {
                printer.addConfigTables([table]);
              }
            }

            idxComponent++;
            tables = [];
          }
        }

        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`
          }
        });
      } catch (error) {
        (0, _logger.log)('reporting:createReportsAgentsConfiguration', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        agentID
      }
    }) => `wazuh-agent-configuration-${agentID}-${this.generateReportTimestamp()}.pdf`));

    _defineProperty(this, "createReportsAgentsInventory", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:createReportsAgentsInventory', `Report started`, 'info');
        const {
          searchBar,
          filters,
          time,
          indexPatternTitle,
          apiId,
          serverSideQuery
        } = request.body;
        const {
          agentID
        } = request.params;
        const {
          from,
          to
        } = time || {}; // Init

        const printer = new _printer.ReportPrinter();
        const {
          hashUsername
        } = await context.wazuh.security.getCurrentUser(request, context);
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername));
        (0, _logger.log)('reporting:createReportsAgentsInventory', `Syscollector report`, 'debug');
        const [sanitizedFilters, agentsFilter] = filters ? this.sanitizeKibanaFilters(filters, searchBar) : [false, null]; // Get the agent OS

        let agentOs = '';
        let isAgentWindows = false;
        let isAgentLinux = false;

        try {
          var _agentResponse$data, _agentResponse$data$d, _agentResponse$data$d2, _agentResponse$data$d3, _agentResponse$data2, _agentResponse$data2$, _agentResponse$data2$2, _agentResponse$data2$3, _agentResponse$data2$4;

          const agentResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents?agents_list=${agentID}`, {}, {
            apiHostID: apiId
          });
          isAgentWindows = (agentResponse === null || agentResponse === void 0 ? void 0 : (_agentResponse$data = agentResponse.data) === null || _agentResponse$data === void 0 ? void 0 : (_agentResponse$data$d = _agentResponse$data.data) === null || _agentResponse$data$d === void 0 ? void 0 : (_agentResponse$data$d2 = _agentResponse$data$d.affected_items) === null || _agentResponse$data$d2 === void 0 ? void 0 : (_agentResponse$data$d3 = _agentResponse$data$d2[0].os) === null || _agentResponse$data$d3 === void 0 ? void 0 : _agentResponse$data$d3.platform) === 'windows';
          isAgentLinux = agentResponse === null || agentResponse === void 0 ? void 0 : (_agentResponse$data2 = agentResponse.data) === null || _agentResponse$data2 === void 0 ? void 0 : (_agentResponse$data2$ = _agentResponse$data2.data) === null || _agentResponse$data2$ === void 0 ? void 0 : (_agentResponse$data2$2 = _agentResponse$data2$.affected_items) === null || _agentResponse$data2$2 === void 0 ? void 0 : (_agentResponse$data2$3 = _agentResponse$data2$2[0].os) === null || _agentResponse$data2$3 === void 0 ? void 0 : (_agentResponse$data2$4 = _agentResponse$data2$3.uname) === null || _agentResponse$data2$4 === void 0 ? void 0 : _agentResponse$data2$4.includes('Linux');
          agentOs = isAgentWindows && 'windows' || isAgentLinux && 'linux' || '';
        } catch (error) {
          (0, _logger.log)('reporting:createReportsAgentsInventory', error.message || error, 'debug');
        } // Add title


        printer.addContentWithNewLine({
          text: 'Inventory data report',
          style: 'h1'
        }); // Add table with the agent info

        await (0, _extendedInformation.buildAgentsTable)(context, printer, [agentID], apiId); // Get syscollector packages and processes

        const agentRequestsInventory = [{
          endpoint: `/syscollector/${agentID}/packages`,
          loggerMessage: `Fetching packages for agent ${agentID}`,
          table: {
            title: 'Packages',
            columns: agentOs === 'windows' ? [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'architecture',
              label: 'Architecture'
            }, {
              id: 'version',
              label: 'Version'
            }, {
              id: 'vendor',
              label: 'Vendor'
            }] : [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'architecture',
              label: 'Architecture'
            }, {
              id: 'version',
              label: 'Version'
            }, {
              id: 'vendor',
              label: 'Vendor'
            }, {
              id: 'description',
              label: 'Description'
            }]
          }
        }, {
          endpoint: `/syscollector/${agentID}/processes`,
          loggerMessage: `Fetching processes for agent ${agentID}`,
          table: {
            title: 'Processes',
            columns: agentOs === 'windows' ? [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'cmd',
              label: 'CMD'
            }, {
              id: 'priority',
              label: 'Priority'
            }, {
              id: 'nlwp',
              label: 'NLWP'
            }] : [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'euser',
              label: 'Effective user'
            }, {
              id: 'nice',
              label: 'Priority'
            }, {
              id: 'state',
              label: 'State'
            }]
          },
          mapResponseItems: item => agentOs === 'windows' ? item : { ...item,
            state: _processStateEquivalence.default[item.state]
          }
        }, {
          endpoint: `/syscollector/${agentID}/ports`,
          loggerMessage: `Fetching ports for agent ${agentID}`,
          table: {
            title: 'Network ports',
            columns: agentOs === 'windows' ? [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'process',
              label: 'Process'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }] : agentOs === 'linux' ? [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'process',
              label: 'Process'
            }, {
              id: 'pid',
              label: 'PID'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }] : [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }]
          },
          mapResponseItems: item => ({ ...item,
            local_ip: item.local.ip,
            local_port: item.local.port
          })
        }, {
          endpoint: `/syscollector/${agentID}/netiface`,
          loggerMessage: `Fetching netiface for agent ${agentID}`,
          table: {
            title: 'Network interfaces',
            columns: [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'mac',
              label: 'Mac'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'mtu',
              label: 'MTU'
            }, {
              id: 'type',
              label: 'Type'
            }]
          }
        }, {
          endpoint: `/syscollector/${agentID}/netaddr`,
          loggerMessage: `Fetching netaddr for agent ${agentID}`,
          table: {
            title: 'Network settings',
            columns: [{
              id: 'iface',
              label: 'Interface'
            }, {
              id: 'address',
              label: 'Address'
            }, {
              id: 'netmask',
              label: 'Netmask'
            }, {
              id: 'proto',
              label: 'Protocol'
            }, {
              id: 'broadcast',
              label: 'Broadcast'
            }]
          }
        }];
        agentOs === 'windows' && agentRequestsInventory.push({
          endpoint: `/syscollector/${agentID}/hotfixes`,
          loggerMessage: `Fetching hotfixes for agent ${agentID}`,
          table: {
            title: 'Windows updates',
            columns: [{
              id: 'hotfix',
              label: 'Update code'
            }]
          }
        });

        const requestInventory = async agentRequestInventory => {
          try {
            (0, _logger.log)('reporting:createReportsAgentsInventory', agentRequestInventory.loggerMessage, 'debug');
            const inventoryResponse = await context.wazuh.api.client.asCurrentUser.request('GET', agentRequestInventory.endpoint, {}, {
              apiHostID: apiId
            });
            const inventory = inventoryResponse && inventoryResponse.data && inventoryResponse.data.data && inventoryResponse.data.data.affected_items;

            if (inventory) {
              return { ...agentRequestInventory.table,
                items: agentRequestInventory.mapResponseItems ? inventory.map(agentRequestInventory.mapResponseItems) : inventory
              };
            }
          } catch (error) {
            (0, _logger.log)('reporting:createReportsAgentsInventory', error.message || error, 'debug');
          }
        };

        if (time) {
          var _serverSideQuery$bool, _serverSideQuery$bool2, _serverSideQuery$bool3;

          // Add Vulnerability Detector filter to the Server Side Query
          serverSideQuery === null || serverSideQuery === void 0 ? void 0 : (_serverSideQuery$bool = serverSideQuery.bool) === null || _serverSideQuery$bool === void 0 ? void 0 : (_serverSideQuery$bool2 = _serverSideQuery$bool.must) === null || _serverSideQuery$bool2 === void 0 ? void 0 : (_serverSideQuery$bool3 = _serverSideQuery$bool2.push) === null || _serverSideQuery$bool3 === void 0 ? void 0 : _serverSideQuery$bool3.call(_serverSideQuery$bool2, {
            match_phrase: {
              'rule.groups': {
                query: 'vulnerability-detector'
              }
            }
          });
          await (0, _extendedInformation.extendedInformation)(context, printer, 'agents', 'syscollector', apiId, from, to, serverSideQuery, agentsFilter, indexPatternTitle, agentID);
        } // Add inventory tables


        (await Promise.all(agentRequestsInventory.map(requestInventory))).filter(table => table).forEach(table => printer.addSimpleTable(table)); // Print the document

        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`
          }
        });
      } catch (error) {
        (0, _logger.log)('reporting:createReportsAgents', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        agentID
      }
    }) => `wazuh-agent-inventory-${agentID}-${this.generateReportTimestamp()}.pdf`));

    _defineProperty(this, "getReportByName", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:getReportByName', `Getting ${context.wazuhEndpointParams.pathFilename} report`, 'debug');

        const reportFileBuffer = _fs.default.readFileSync(context.wazuhEndpointParams.pathFilename);

        return response.ok({
          headers: {
            'Content-Type': 'application/pdf'
          },
          body: reportFileBuffer
        });
      } catch (error) {
        (0, _logger.log)('reporting:getReportByName', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5030, 500, response);
      }
    }, request => request.params.name));

    _defineProperty(this, "deleteReportByName", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        (0, _logger.log)('reporting:deleteReportByName', `Deleting ${context.wazuhEndpointParams.pathFilename} report`, 'debug');

        _fs.default.unlinkSync(context.wazuhEndpointParams.pathFilename);

        (0, _logger.log)('reporting:deleteReportByName', `${context.wazuhEndpointParams.pathFilename} report was deleted`, 'info');
        return response.ok({
          body: {
            error: 0
          }
        });
      } catch (error) {
        (0, _logger.log)('reporting:deleteReportByName', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5032, 500, response);
      }
    }, request => request.params.name));
  }
  /**
   * This do format to filters
   * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
   * @param {String} searchBar search term
   */


  sanitizeKibanaFilters(filters, searchBar) {
    (0, _logger.log)('reporting:sanitizeKibanaFilters', `Started to sanitize filters`, 'info');
    (0, _logger.log)('reporting:sanitizeKibanaFilters', `filters: ${filters.length}, searchBar: ${searchBar}`, 'debug');
    let str = '';
    const agentsFilter = {
      query: {},
      agentsText: ''
    };
    const agentsList = []; //separate agents filter

    filters = filters.filter(filter => {
      if (filter.meta.controlledBy === _constants.AUTHORIZED_AGENTS) {
        agentsFilter.query = filter.query;
        agentsList.push(filter);
        return false;
      }

      return filter;
    });
    const len = filters.length;

    for (let i = 0; i < len; i++) {
      const {
        negate,
        key,
        value,
        params,
        type
      } = filters[i].meta;
      str += `${negate ? 'NOT ' : ''}`;
      str += `${key}: `;
      str += `${type === 'range' ? `${params.gte}-${params.lt}` : type === 'phrases' ? '(' + params.join(' OR ') + ')' : type === 'exists' ? '*' : !!value ? value : (params || {}).query}`;
      str += `${i === len - 1 ? '' : ' AND '}`;
    }

    if (searchBar) {
      str += ` AND (${searchBar})`;
    }

    agentsFilter.agentsText = agentsList.map(filter => filter.meta.value).join(',');
    (0, _logger.log)('reporting:sanitizeKibanaFilters', `str: ${str}, agentsFilterStr: ${agentsFilter.agentsText}`, 'debug');
    return [str, agentsFilter];
  }
  /**
   * This performs the rendering of given header
   * @param {String} printer section target
   * @param {String} section section target
   * @param {Object} tab tab target
   * @param {Boolean} isAgents is agents section
   * @param {String} apiId ID of API
   */


  async renderHeader(context, printer, section, tab, isAgents, apiId) {
    try {
      (0, _logger.log)('reporting:renderHeader', `section: ${section}, tab: ${tab}, isAgents: ${isAgents}, apiId: ${apiId}`, 'debug');

      if (section && typeof section === 'string') {
        if (!['agentConfig', 'groupConfig'].includes(section)) {
          printer.addContent({
            text: _wazuhModules.WAZUH_MODULES[tab].title + ' report',
            style: 'h1'
          });
        } else if (section === 'agentConfig') {
          printer.addContent({
            text: `Agent ${isAgents} configuration`,
            style: 'h1'
          });
        } else if (section === 'groupConfig') {
          printer.addContent({
            text: 'Agents in group',
            style: 'h1'
          });
        }

        printer.addNewLine();
      }

      if (isAgents && typeof isAgents === 'object') {
        await (0, _extendedInformation.buildAgentsTable)(context, printer, isAgents, apiId, section === 'groupConfig' ? tab : '');
      }

      if (isAgents && typeof isAgents === 'string') {
        const agentResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents`, {
          params: {
            agents_list: isAgents
          }
        }, {
          apiHostID: apiId
        });
        const agentData = agentResponse.data.data.affected_items[0];

        if (agentData && agentData.status !== _constants.API_NAME_AGENT_STATUS.ACTIVE) {
          printer.addContentWithNewLine({
            text: `Warning. Agent is ${(0, _wz_agent_status.agentStatusLabelByAgentStatus)(agentData.status).toLowerCase()}`,
            style: 'standard'
          });
        }

        await (0, _extendedInformation.buildAgentsTable)(context, printer, [isAgents], apiId);

        if (agentData && agentData.group) {
          const agentGroups = agentData.group.join(', ');
          printer.addContentWithNewLine({
            text: `Group${agentData.group.length > 1 ? 's' : ''}: ${agentGroups}`,
            style: 'standard'
          });
        }
      }

      if (_wazuhModules.WAZUH_MODULES[tab] && _wazuhModules.WAZUH_MODULES[tab].description) {
        printer.addContentWithNewLine({
          text: _wazuhModules.WAZUH_MODULES[tab].description,
          style: 'standard'
        });
      }
    } catch (error) {
      (0, _logger.log)('reporting:renderHeader', error.message || error);
      return Promise.reject(error);
    }
  }

  getConfigRows(data, labels) {
    (0, _logger.log)('reporting:getConfigRows', `Building configuration rows`, 'info');
    const result = [];

    for (let prop in data || []) {
      if (Array.isArray(data[prop])) {
        data[prop].forEach((x, idx) => {
          if (typeof x === 'object') data[prop][idx] = JSON.stringify(x);
        });
      }

      result.push([(labels || {})[prop] || _csvKeyEquivalence.KeyEquivalence[prop] || prop, data[prop] || '-']);
    }

    return result;
  }

  getConfigTables(data, section, tab, array = []) {
    (0, _logger.log)('reporting:getConfigTables', `Building configuration tables`, 'info');
    let plainData = {};
    const nestedData = [];
    const tableData = [];

    if (data.length === 1 && Array.isArray(data)) {
      tableData[section.config[tab].configuration] = data;
    } else {
      for (let key in data) {
        if (typeof data[key] !== 'object' && !Array.isArray(data[key]) || Array.isArray(data[key]) && typeof data[key][0] !== 'object') {
          plainData[key] = Array.isArray(data[key]) && typeof data[key][0] !== 'object' ? data[key].map(x => {
            return typeof x === 'object' ? JSON.stringify(x) : x + '\n';
          }) : data[key];
        } else if (Array.isArray(data[key]) && typeof data[key][0] === 'object') {
          tableData[key] = data[key];
        } else {
          if (section.isGroupConfig && ['pack', 'content'].includes(key)) {
            tableData[key] = [data[key]];
          } else {
            nestedData.push(data[key]);
          }
        }
      }
    }

    array.push({
      title: (section.options || {}).hideHeader ? '' : (section.tabs || [])[tab] || (section.isGroupConfig ? ((section.labels || [])[0] || [])[tab] : ''),
      columns: ['', ''],
      type: 'config',
      rows: this.getConfigRows(plainData, (section.labels || [])[0])
    });

    for (let key in tableData) {
      const columns = Object.keys(tableData[key][0]);
      columns.forEach((col, i) => {
        columns[i] = col[0].toUpperCase() + col.slice(1);
      });
      const rows = tableData[key].map(x => {
        let row = [];

        for (let key in x) {
          row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
            return x + '\n';
          }) : JSON.stringify(x[key]));
        }

        while (row.length < columns.length) {
          row.push('-');
        }

        return row;
      });
      array.push({
        title: ((section.labels || [])[0] || [])[key] || '',
        type: 'table',
        columns,
        rows
      });
    }

    nestedData.forEach(nest => {
      this.getConfigTables(nest, section, tab + 1, array);
    });
    return array;
  }
  /**
   * Create a report for the modules
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {*} reports list or ErrorResponse
   */


  /**
   * Fetch the reports list
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Array<Object>} reports list or ErrorResponse
   */
  async getReports(context, request, response) {
    try {
      (0, _logger.log)('reporting:getReports', `Fetching created reports`, 'info');
      const {
        hashUsername
      } = await context.wazuh.security.getCurrentUser(request, context);
      (0, _filesystem.createDataDirectoryIfNotExists)();
      (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
      (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);

      const userReportsDirectoryPath = _path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername);

      (0, _filesystem.createDirectoryIfNotExists)(userReportsDirectoryPath);
      (0, _logger.log)('reporting:getReports', `Directory: ${userReportsDirectoryPath}`, 'debug');

      const sortReportsByDate = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

      const reports = _fs.default.readdirSync(userReportsDirectoryPath).map(file => {
        const stats = _fs.default.statSync(userReportsDirectoryPath + '/' + file); // Get the file creation time (bithtime). It returns the first value that is a truthy value of next file stats: birthtime, mtime, ctime and atime.
        // This solves some OSs can have the bithtimeMs equal to 0 and returns the date like 1970-01-01


        const birthTimeField = ['birthtime', 'mtime', 'ctime', 'atime'].find(time => stats[`${time}Ms`]);
        return {
          name: file,
          size: stats.size,
          date: stats[birthTimeField]
        };
      });

      (0, _logger.log)('reporting:getReports', `Using TimSort for sorting ${reports.length} items`, 'debug');
      TimSort.sort(reports, sortReportsByDate);
      (0, _logger.log)('reporting:getReports', `Total reports: ${reports.length}`, 'debug');
      return response.ok({
        body: {
          reports
        }
      });
    } catch (error) {
      (0, _logger.log)('reporting:getReports', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 5031, 500, response);
    }
  }
  /**
   * Fetch specific report
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} report or ErrorResponse
   */


  checkReportsUserDirectoryIsValidRouteDecorator(routeHandler, reportFileNameAccessor) {
    return async (context, request, response) => {
      try {
        const {
          username,
          hashUsername
        } = await context.wazuh.security.getCurrentUser(request, context);

        const userReportsDirectoryPath = _path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername);

        const filename = reportFileNameAccessor(request);

        const pathFilename = _path.default.join(userReportsDirectoryPath, filename);

        (0, _logger.log)('reporting:checkReportsUserDirectoryIsValidRouteDecorator', `Checking the user ${username}(${hashUsername}) can do actions in the reports file: ${pathFilename}`, 'debug');

        if (!pathFilename.startsWith(userReportsDirectoryPath) || pathFilename.includes('../')) {
          (0, _logger.log)('security:reporting:checkReportsUserDirectoryIsValidRouteDecorator', `User ${username}(${hashUsername}) tried to access to a non user report file: ${pathFilename}`, 'warn');
          return response.badRequest({
            body: {
              message: '5040 - You shall not pass!'
            }
          });
        }

        (0, _logger.log)('reporting:checkReportsUserDirectoryIsValidRouteDecorator', 'Checking the user can do actions in the reports file', 'debug');
        return await routeHandler.bind(this)({ ...context,
          wazuhEndpointParams: {
            hashUsername,
            filename,
            pathFilename
          }
        }, request, response);
      } catch (error) {
        (0, _logger.log)('reporting:checkReportsUserDirectoryIsValidRouteDecorator', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5040, 500, response);
      }
    };
  }

  generateReportTimestamp() {
    return `${Date.now() / 1000 | 0}`;
  }

}

exports.WazuhReportingCtrl = WazuhReportingCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhenVoLXJlcG9ydGluZy50cyJdLCJuYW1lcyI6WyJXYXp1aFJlcG9ydGluZ0N0cmwiLCJjb25zdHJ1Y3RvciIsImNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXJyYXkiLCJhZ2VudHMiLCJicm93c2VyVGltZXpvbmUiLCJzZWFyY2hCYXIiLCJmaWx0ZXJzIiwic2VydmVyU2lkZVF1ZXJ5IiwidGltZSIsInRhYmxlcyIsInNlY3Rpb24iLCJpbmRleFBhdHRlcm5UaXRsZSIsImFwaUlkIiwiYm9keSIsIm1vZHVsZUlEIiwicGFyYW1zIiwiZnJvbSIsInRvIiwiYWRkaXRpb25hbFRhYmxlcyIsInByaW50ZXIiLCJSZXBvcnRQcmludGVyIiwiV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgiLCJXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRIIiwicGF0aCIsImpvaW4iLCJ3YXp1aEVuZHBvaW50UGFyYW1zIiwiaGFzaFVzZXJuYW1lIiwicmVuZGVySGVhZGVyIiwic2FuaXRpemVkRmlsdGVycyIsImFnZW50c0ZpbHRlciIsInNhbml0aXplS2liYW5hRmlsdGVycyIsImFkZFRpbWVSYW5nZUFuZEZpbHRlcnMiLCJEYXRlIiwiZ2V0VGltZSIsImFkZFZpc3VhbGl6YXRpb25zIiwiYWRkVGFibGVzIiwiYWdlbnRzVGV4dCIsImFkZEFnZW50c0ZpbHRlcnMiLCJwcmludCIsInBhdGhGaWxlbmFtZSIsIm9rIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJmaWxlbmFtZSIsImVycm9yIiwiZ2VuZXJhdGVSZXBvcnRUaW1lc3RhbXAiLCJjb21wb25lbnRzIiwiZ3JvdXBJRCIsImVxdWl2YWxlbmNlcyIsImxvY2FsZmlsZSIsIm9zcXVlcnkiLCJjb21tYW5kIiwic3lzY2hlY2siLCJzeXNjb2xsZWN0b3IiLCJyb290Y2hlY2siLCJsYWJlbHMiLCJzY2EiLCJhZGRDb250ZW50IiwidGV4dCIsInN0eWxlIiwiZGF0YSIsImNvbmZpZ3VyYXRpb24iLCJ3YXp1aCIsImFwaSIsImNsaWVudCIsImFzQ3VycmVudFVzZXIiLCJhcGlIb3N0SUQiLCJhZmZlY3RlZF9pdGVtcyIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJjb25maWciLCJmb250U2l6ZSIsImNvbG9yIiwibWFyZ2luIiwiaXNHcm91cENvbmZpZyIsImZpbHRlclRpdGxlIiwiaW5kZXgiLCJmaWx0ZXIiLCJjb25jYXQiLCJpZHgiLCJ0YWJzIiwiX2QiLCJjIiwiQWdlbnRDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJzIiwic2VjdGlvbnMiLCJvcHRzIiwiY24iLCJ3byIsIndvZGxlIiwibmFtZSIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJncm91cHMiLCJmb3JFYWNoIiwib2JqIiwibG9nZm9ybWF0IiwiZ3JvdXAiLCJzYXZlaWR4IiwieCIsImkiLCJjb2x1bW5zIiwicm93cyIsIm1hcCIsInJvdyIsImtleSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb2wiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidGl0bGUiLCJ0eXBlIiwibGFiZWwiLCJpbmNsdWRlcyIsIl9kMiIsImdldENvbmZpZ1RhYmxlcyIsImRpcmVjdG9yaWVzIiwiZGlmZk9wdHMiLCJ5IiwicmVjdXJzaW9uX2xldmVsIiwidGFibGUiLCJhZGRDb25maWdUYWJsZXMiLCJhZ2VudElEIiwid21vZHVsZXNSZXNwb25zZSIsImlkeENvbXBvbmVudCIsInRpdGxlT2ZTZWN0aW9uIiwidGl0bGVPZlN1YnNlY3Rpb24iLCJjb25maWdzIiwiY29uZiIsImFnZW50Q29uZmlnUmVzcG9uc2UiLCJjb21wb25lbnQiLCJhZ2VudENvbmZpZyIsInN1YnRpdGxlIiwiZGVzYyIsImFnZW50Q29uZmlnS2V5IiwiZmlsdGVyQnkiLCJtYXRyaXgiLCJkaWZmIiwic3luY2hyb25pemF0aW9uIiwiZmlsZV9saW1pdCIsInJlc3QiLCJkaXNrX3F1b3RhIiwiZmlsZV9zaXplIiwiZGlyIiwiaW5kZXhPZiIsInRvTG93ZXJDYXNlIiwibGluayIsImRvY3VMaW5rIiwic2VjdXJpdHkiLCJnZXRDdXJyZW50VXNlciIsImFnZW50T3MiLCJpc0FnZW50V2luZG93cyIsImlzQWdlbnRMaW51eCIsImFnZW50UmVzcG9uc2UiLCJvcyIsInBsYXRmb3JtIiwidW5hbWUiLCJhZGRDb250ZW50V2l0aE5ld0xpbmUiLCJhZ2VudFJlcXVlc3RzSW52ZW50b3J5IiwiZW5kcG9pbnQiLCJsb2dnZXJNZXNzYWdlIiwiaWQiLCJtYXBSZXNwb25zZUl0ZW1zIiwiaXRlbSIsInN0YXRlIiwiUHJvY2Vzc0VxdWl2YWxlbmNlIiwibG9jYWxfaXAiLCJsb2NhbCIsImlwIiwibG9jYWxfcG9ydCIsInBvcnQiLCJyZXF1ZXN0SW52ZW50b3J5IiwiYWdlbnRSZXF1ZXN0SW52ZW50b3J5IiwiaW52ZW50b3J5UmVzcG9uc2UiLCJpbnZlbnRvcnkiLCJpdGVtcyIsImJvb2wiLCJtdXN0IiwibWF0Y2hfcGhyYXNlIiwicXVlcnkiLCJQcm9taXNlIiwiYWxsIiwiYWRkU2ltcGxlVGFibGUiLCJyZXBvcnRGaWxlQnVmZmVyIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJoZWFkZXJzIiwidW5saW5rU3luYyIsInN0ciIsImFnZW50c0xpc3QiLCJtZXRhIiwiY29udHJvbGxlZEJ5IiwiQVVUSE9SSVpFRF9BR0VOVFMiLCJsZW4iLCJuZWdhdGUiLCJ2YWx1ZSIsImd0ZSIsImx0IiwidGFiIiwiaXNBZ2VudHMiLCJXQVpVSF9NT0RVTEVTIiwiYWRkTmV3TGluZSIsImFnZW50c19saXN0IiwiYWdlbnREYXRhIiwic3RhdHVzIiwiQVBJX05BTUVfQUdFTlRfU1RBVFVTIiwiQUNUSVZFIiwiYWdlbnRHcm91cHMiLCJkZXNjcmlwdGlvbiIsInJlamVjdCIsImdldENvbmZpZ1Jvd3MiLCJyZXN1bHQiLCJwcm9wIiwiS2V5RXF1aXZhbGVuY2UiLCJwbGFpbkRhdGEiLCJuZXN0ZWREYXRhIiwidGFibGVEYXRhIiwib3B0aW9ucyIsImhpZGVIZWFkZXIiLCJuZXN0IiwiZ2V0UmVwb3J0cyIsInVzZXJSZXBvcnRzRGlyZWN0b3J5UGF0aCIsInNvcnRSZXBvcnRzQnlEYXRlIiwiYSIsImIiLCJkYXRlIiwicmVwb3J0cyIsInJlYWRkaXJTeW5jIiwiZmlsZSIsInN0YXRzIiwic3RhdFN5bmMiLCJiaXJ0aFRpbWVGaWVsZCIsImZpbmQiLCJzaXplIiwiVGltU29ydCIsInNvcnQiLCJyb3V0ZUhhbmRsZXIiLCJyZXBvcnRGaWxlTmFtZUFjY2Vzc29yIiwidXNlcm5hbWUiLCJzdGFydHNXaXRoIiwiYmFkUmVxdWVzdCIsImJpbmQiLCJub3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFNQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFNQTs7QUFJQTs7Ozs7Ozs7OztBQU9PLE1BQU1BLGtCQUFOLENBQXlCO0FBQzlCQyxFQUFBQSxXQUFXLEdBQUc7QUFBQSxrREFzUVMsS0FBS0MsOENBQUwsQ0FDckIsT0FDRUMsT0FERixFQUVFQyxPQUZGLEVBR0VDLFFBSEYsS0FJSztBQUNILFVBQUk7QUFDRix5QkFBSSxnQ0FBSixFQUF1QyxnQkFBdkMsRUFBd0QsTUFBeEQ7QUFDQSxjQUFNO0FBQ0pDLFVBQUFBLEtBREk7QUFFSkMsVUFBQUEsTUFGSTtBQUdKQyxVQUFBQSxlQUhJO0FBSUpDLFVBQUFBLFNBSkk7QUFLSkMsVUFBQUEsT0FMSTtBQU1KQyxVQUFBQSxlQU5JO0FBT0pDLFVBQUFBLElBUEk7QUFRSkMsVUFBQUEsTUFSSTtBQVNKQyxVQUFBQSxPQVRJO0FBVUpDLFVBQUFBLGlCQVZJO0FBV0pDLFVBQUFBO0FBWEksWUFZRlosT0FBTyxDQUFDYSxJQVpaO0FBYUEsY0FBTTtBQUFFQyxVQUFBQTtBQUFGLFlBQWVkLE9BQU8sQ0FBQ2UsTUFBN0I7QUFDQSxjQUFNO0FBQUVDLFVBQUFBLElBQUY7QUFBUUMsVUFBQUE7QUFBUixZ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O0FBS0Q7O0FBQ0QseUJBQ0UsMERBREYsRUFFRSxzREFGRixFQUdFLE9BSEY7QUFLQSxlQUFPLE1BQU1zTSxZQUFZLENBQUNLLElBQWIsQ0FBa0IsSUFBbEIsRUFDWCxFQUNFLEdBQUd0UCxPQURMO0FBRUUwQixVQUFBQSxtQkFBbUIsRUFBRTtBQUFFQyxZQUFBQSxZQUFGO0FBQWdCaUIsWUFBQUEsUUFBaEI7QUFBMEJKLFlBQUFBO0FBQTFCO0FBRnZCLFNBRFcsRUFLWHZDLE9BTFcsRUFNWEMsUUFOVyxDQUFiO0FBUUQsT0ExQ0QsQ0EwQ0UsT0FBTzJDLEtBQVAsRUFBYztBQUNkLHlCQUNFLDBEQURGLEVBRUVBLEtBQUssQ0FBQ0YsT0FBTixJQUFpQkUsS0FGbkI7QUFJQSxlQUFPLGtDQUFjQSxLQUFLLENBQUNGLE9BQU4sSUFBaUJFLEtBQS9CLEVBQXNDLElBQXRDLEVBQTRDLEdBQTVDLEVBQWlEM0MsUUFBakQsQ0FBUDtBQUNEO0FBQ0YsS0F0REQ7QUF1REQ7O0FBRU80QyxFQUFBQSx1QkFBdUIsR0FBRztBQUNoQyxXQUFRLEdBQUdiLElBQUksQ0FBQ3NOLEdBQUwsS0FBYSxJQUFkLEdBQXNCLENBQUUsRUFBbEM7QUFDRDs7QUF4OEM2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBDbGFzcyBmb3IgV2F6dWggcmVwb3J0aW5nIGNvbnRyb2xsZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBXQVpVSF9NT0RVTEVTIH0gZnJvbSAnLi4vLi4vY29tbW9uL3dhenVoLW1vZHVsZXMnO1xuaW1wb3J0ICogYXMgVGltU29ydCBmcm9tICd0aW1zb3J0JztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi9saWIvZXJyb3ItcmVzcG9uc2UnO1xuaW1wb3J0IFByb2Nlc3NFcXVpdmFsZW5jZSBmcm9tICcuLi9saWIvcHJvY2Vzcy1zdGF0ZS1lcXVpdmFsZW5jZSc7XG5pbXBvcnQgeyBLZXlFcXVpdmFsZW5jZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jc3Yta2V5LWVxdWl2YWxlbmNlJztcbmltcG9ydCB7IEFnZW50Q29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2xpYi9yZXBvcnRpbmcvYWdlbnQtY29uZmlndXJhdGlvbic7XG5pbXBvcnQge1xuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG59IGZyb20gJ3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQge1xuICBleHRlbmRlZEluZm9ybWF0aW9uLFxuICBidWlsZEFnZW50c1RhYmxlLFxufSBmcm9tICcuLi9saWIvcmVwb3J0aW5nL2V4dGVuZGVkLWluZm9ybWF0aW9uJztcbmltcG9ydCB7IFJlcG9ydFByaW50ZXIgfSBmcm9tICcuLi9saWIvcmVwb3J0aW5nL3ByaW50ZXInO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vbGliL2xvZ2dlcic7XG5pbXBvcnQge1xuICBXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCxcbiAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgQVVUSE9SSVpFRF9BR0VOVFMsXG4gIEFQSV9OQU1FX0FHRU5UX1NUQVRVUyxcbn0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyxcbiAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzLFxufSBmcm9tICcuLi9saWIvZmlsZXN5c3RlbSc7XG5pbXBvcnQgeyBhZ2VudFN0YXR1c0xhYmVsQnlBZ2VudFN0YXR1cyB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy93el9hZ2VudF9zdGF0dXMnO1xuXG5pbnRlcmZhY2UgQWdlbnRzRmlsdGVyIHtcbiAgcXVlcnk6IGFueTtcbiAgYWdlbnRzVGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgV2F6dWhSZXBvcnRpbmdDdHJsIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgLyoqXG4gICAqIFRoaXMgZG8gZm9ybWF0IHRvIGZpbHRlcnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoQmFyIHNlYXJjaCB0ZXJtXG4gICAqL1xuICBwcml2YXRlIHNhbml0aXplS2liYW5hRmlsdGVycyhcbiAgICBmaWx0ZXJzOiBhbnksXG4gICAgc2VhcmNoQmFyPzogc3RyaW5nLFxuICApOiBbc3RyaW5nLCBBZ2VudHNGaWx0ZXJdIHtcbiAgICBsb2coXG4gICAgICAncmVwb3J0aW5nOnNhbml0aXplS2liYW5hRmlsdGVycycsXG4gICAgICBgU3RhcnRlZCB0byBzYW5pdGl6ZSBmaWx0ZXJzYCxcbiAgICAgICdpbmZvJyxcbiAgICApO1xuICAgIGxvZyhcbiAgICAgICdyZXBvcnRpbmc6c2FuaXRpemVLaWJhbmFGaWx0ZXJzJyxcbiAgICAgIGBmaWx0ZXJzOiAke2ZpbHRlcnMubGVuZ3RofSwgc2VhcmNoQmFyOiAke3NlYXJjaEJhcn1gLFxuICAgICAgJ2RlYnVnJyxcbiAgICApO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGNvbnN0IGFnZW50c0ZpbHRlcjogQWdlbnRzRmlsdGVyID0geyBxdWVyeToge30sIGFnZW50c1RleHQ6ICcnIH07XG4gICAgY29uc3QgYWdlbnRzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vc2VwYXJhdGUgYWdlbnRzIGZpbHRlclxuICAgIGZpbHRlcnMgPSBmaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4ge1xuICAgICAgaWYgKGZpbHRlci5tZXRhLmNvbnRyb2xsZWRCeSA9PT0gQVVUSE9SSVpFRF9BR0VOVFMpIHtcbiAgICAgICAgYWdlbnRzRmlsdGVyLnF1ZXJ5ID0gZmlsdGVyLnF1ZXJ5O1xuICAgICAgICBhZ2VudHNMaXN0LnB1c2goZmlsdGVyKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlbiA9IGZpbHRlcnMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgeyBuZWdhdGUsIGtleSwgdmFsdWUsIHBhcmFtcywgdHlwZSB9ID0gZmlsdGVyc1tpXS5tZXRhO1xuICAgICAgc3RyICs9IGAke25lZ2F0ZSA/ICdOT1QgJyA6ICcnfWA7XG4gICAgICBzdHIgKz0gYCR7a2V5fTogYDtcbiAgICAgIHN0ciArPSBgJHtcbiAgICAgICAgdHlwZSA9PT0gJ3JhbmdlJ1xuICAgICAgICAgID8gYCR7cGFyYW1zLmd0ZX0tJHtwYXJhbXMubHR9YFxuICAgICAgICAgIDogdHlwZSA9PT0gJ3BocmFzZXMnXG4gICAgICAgICAgPyAnKCcgKyBwYXJhbXMuam9pbignIE9SICcpICsgJyknXG4gICAgICAgICAgOiB0eXBlID09PSAnZXhpc3RzJ1xuICAgICAgICAgID8gJyonXG4gICAgICAgICAgOiAhIXZhbHVlXG4gICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgIDogKHBhcmFtcyB8fCB7fSkucXVlcnlcbiAgICAgIH1gO1xuICAgICAgc3RyICs9IGAke2kgPT09IGxlbiAtIDEgPyAnJyA6ICcgQU5EICd9YDtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoQmFyKSB7XG4gICAgICBzdHIgKz0gYCBBTkQgKCR7c2VhcmNoQmFyfSlgO1xuICAgIH1cblxuICAgIGFnZW50c0ZpbHRlci5hZ2VudHNUZXh0ID0gYWdlbnRzTGlzdFxuICAgICAgLm1hcChmaWx0ZXIgPT4gZmlsdGVyLm1ldGEudmFsdWUpXG4gICAgICAuam9pbignLCcpO1xuXG4gICAgbG9nKFxuICAgICAgJ3JlcG9ydGluZzpzYW5pdGl6ZUtpYmFuYUZpbHRlcnMnLFxuICAgICAgYHN0cjogJHtzdHJ9LCBhZ2VudHNGaWx0ZXJTdHI6ICR7YWdlbnRzRmlsdGVyLmFnZW50c1RleHR9YCxcbiAgICAgICdkZWJ1ZycsXG4gICAgKTtcblxuICAgIHJldHVybiBbc3RyLCBhZ2VudHNGaWx0ZXJdO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgcGVyZm9ybXMgdGhlIHJlbmRlcmluZyBvZiBnaXZlbiBoZWFkZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByaW50ZXIgc2VjdGlvbiB0YXJnZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlY3Rpb24gc2VjdGlvbiB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhYiB0YWIgdGFyZ2V0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBZ2VudHMgaXMgYWdlbnRzIHNlY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGFwaUlkIElEIG9mIEFQSVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyByZW5kZXJIZWFkZXIoY29udGV4dCwgcHJpbnRlciwgc2VjdGlvbiwgdGFiLCBpc0FnZW50cywgYXBpSWQpIHtcbiAgICB0cnkge1xuICAgICAgbG9nKFxuICAgICAgICAncmVwb3J0aW5nOnJlbmRlckhlYWRlcicsXG4gICAgICAgIGBzZWN0aW9uOiAke3NlY3Rpb259LCB0YWI6ICR7dGFifSwgaXNBZ2VudHM6ICR7aXNBZ2VudHN9LCBhcGlJZDogJHthcGlJZH1gLFxuICAgICAgICAnZGVidWcnLFxuICAgICAgKTtcbiAgICAgIGlmIChzZWN0aW9uICYmIHR5cGVvZiBzZWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIVsnYWdlbnRDb25maWcnLCAnZ3JvdXBDb25maWcnXS5pbmNsdWRlcyhzZWN0aW9uKSkge1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICB0ZXh0OiBXQVpVSF9NT0RVTEVTW3RhYl0udGl0bGUgKyAnIHJlcG9ydCcsXG4gICAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSAnYWdlbnRDb25maWcnKSB7XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgIHRleHQ6IGBBZ2VudCAke2lzQWdlbnRzfSBjb25maWd1cmF0aW9uYCxcbiAgICAgICAgICAgIHN0eWxlOiAnaDEnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09ICdncm91cENvbmZpZycpIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgdGV4dDogJ0FnZW50cyBpbiBncm91cCcsXG4gICAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBwcmludGVyLmFkZE5ld0xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQWdlbnRzICYmIHR5cGVvZiBpc0FnZW50cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIHByaW50ZXIsXG4gICAgICAgICAgaXNBZ2VudHMsXG4gICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgc2VjdGlvbiA9PT0gJ2dyb3VwQ29uZmlnJyA/IHRhYiA6ICcnLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBZ2VudHMgJiYgdHlwZW9mIGlzQWdlbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBhZ2VudFJlc3BvbnNlID1cbiAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICBgL2FnZW50c2AsXG4gICAgICAgICAgICB7IHBhcmFtczogeyBhZ2VudHNfbGlzdDogaXNBZ2VudHMgfSB9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUlkIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYWdlbnREYXRhID0gYWdlbnRSZXNwb25zZS5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF07XG4gICAgICAgIGlmIChhZ2VudERhdGEgJiYgYWdlbnREYXRhLnN0YXR1cyAhPT0gQVBJX05BTUVfQUdFTlRfU1RBVFVTLkFDVElWRSkge1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICAgIHRleHQ6IGBXYXJuaW5nLiBBZ2VudCBpcyAke2FnZW50U3RhdHVzTGFiZWxCeUFnZW50U3RhdHVzKFxuICAgICAgICAgICAgICBhZ2VudERhdGEuc3RhdHVzLFxuICAgICAgICAgICAgKS50b0xvd2VyQ2FzZSgpfWAsXG4gICAgICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIFtpc0FnZW50c10sIGFwaUlkKTtcblxuICAgICAgICBpZiAoYWdlbnREYXRhICYmIGFnZW50RGF0YS5ncm91cCkge1xuICAgICAgICAgIGNvbnN0IGFnZW50R3JvdXBzID0gYWdlbnREYXRhLmdyb3VwLmpvaW4oJywgJyk7XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgICAgdGV4dDogYEdyb3VwJHtcbiAgICAgICAgICAgICAgYWdlbnREYXRhLmdyb3VwLmxlbmd0aCA+IDEgPyAncycgOiAnJ1xuICAgICAgICAgICAgfTogJHthZ2VudEdyb3Vwc31gLFxuICAgICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChXQVpVSF9NT0RVTEVTW3RhYl0gJiYgV0FaVUhfTU9EVUxFU1t0YWJdLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiBXQVpVSF9NT0RVTEVTW3RhYl0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3JlcG9ydGluZzpyZW5kZXJIZWFkZXInLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb25maWdSb3dzKGRhdGEsIGxhYmVscykge1xuICAgIGxvZygncmVwb3J0aW5nOmdldENvbmZpZ1Jvd3MnLCBgQnVpbGRpbmcgY29uZmlndXJhdGlvbiByb3dzYCwgJ2luZm8nKTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBwcm9wIGluIGRhdGEgfHwgW10pIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFbcHJvcF0pKSB7XG4gICAgICAgIGRhdGFbcHJvcF0uZm9yRWFjaCgoeCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JykgZGF0YVtwcm9wXVtpZHhdID0gSlNPTi5zdHJpbmdpZnkoeCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goW1xuICAgICAgICAobGFiZWxzIHx8IHt9KVtwcm9wXSB8fCBLZXlFcXVpdmFsZW5jZVtwcm9wXSB8fCBwcm9wLFxuICAgICAgICBkYXRhW3Byb3BdIHx8ICctJyxcbiAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb25maWdUYWJsZXMoZGF0YSwgc2VjdGlvbiwgdGFiLCBhcnJheSA9IFtdKSB7XG4gICAgbG9nKCdyZXBvcnRpbmc6Z2V0Q29uZmlnVGFibGVzJywgYEJ1aWxkaW5nIGNvbmZpZ3VyYXRpb24gdGFibGVzYCwgJ2luZm8nKTtcbiAgICBsZXQgcGxhaW5EYXRhID0ge307XG4gICAgY29uc3QgbmVzdGVkRGF0YSA9IFtdO1xuICAgIGNvbnN0IHRhYmxlRGF0YSA9IFtdO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRhYmxlRGF0YVtzZWN0aW9uLmNvbmZpZ1t0YWJdLmNvbmZpZ3VyYXRpb25dID0gZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICh0eXBlb2YgZGF0YVtrZXldICE9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB8fFxuICAgICAgICAgIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkgJiYgdHlwZW9mIGRhdGFba2V5XVswXSAhPT0gJ29iamVjdCcpXG4gICAgICAgICkge1xuICAgICAgICAgIHBsYWluRGF0YVtrZXldID1cbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSAmJiB0eXBlb2YgZGF0YVtrZXldWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGRhdGFba2V5XS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoeCkgOiB4ICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBkYXRhW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShkYXRhW2tleV0pICYmXG4gICAgICAgICAgdHlwZW9mIGRhdGFba2V5XVswXSA9PT0gJ29iamVjdCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGFibGVEYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlY3Rpb24uaXNHcm91cENvbmZpZyAmJiBbJ3BhY2snLCAnY29udGVudCddLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIHRhYmxlRGF0YVtrZXldID0gW2RhdGFba2V5XV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5lc3RlZERhdGEucHVzaChkYXRhW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBhcnJheS5wdXNoKHtcbiAgICAgIHRpdGxlOiAoc2VjdGlvbi5vcHRpb25zIHx8IHt9KS5oaWRlSGVhZGVyXG4gICAgICAgID8gJydcbiAgICAgICAgOiAoc2VjdGlvbi50YWJzIHx8IFtdKVt0YWJdIHx8XG4gICAgICAgIChzZWN0aW9uLmlzR3JvdXBDb25maWcgPyAoKHNlY3Rpb24ubGFiZWxzIHx8IFtdKVswXSB8fCBbXSlbdGFiXSA6ICcnKSxcbiAgICAgIGNvbHVtbnM6IFsnJywgJyddLFxuICAgICAgdHlwZTogJ2NvbmZpZycsXG4gICAgICByb3dzOiB0aGlzLmdldENvbmZpZ1Jvd3MocGxhaW5EYXRhLCAoc2VjdGlvbi5sYWJlbHMgfHwgW10pWzBdKSxcbiAgICB9KTtcbiAgICBmb3IgKGxldCBrZXkgaW4gdGFibGVEYXRhKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXModGFibGVEYXRhW2tleV1bMF0pO1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICAgICAgY29sdW1uc1tpXSA9IGNvbFswXS50b1VwcGVyQ2FzZSgpICsgY29sLnNsaWNlKDEpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJvd3MgPSB0YWJsZURhdGFba2V5XS5tYXAoeCA9PiB7XG4gICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHgpIHtcbiAgICAgICAgICByb3cucHVzaChcbiAgICAgICAgICAgIHR5cGVvZiB4W2tleV0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8geFtrZXldXG4gICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheSh4W2tleV0pXG4gICAgICAgICAgICAgID8geFtrZXldLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB4ICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBKU09OLnN0cmluZ2lmeSh4W2tleV0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHJvdy5sZW5ndGggPCBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgIHJvdy5wdXNoKCctJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH0pO1xuICAgICAgYXJyYXkucHVzaCh7XG4gICAgICAgIHRpdGxlOiAoKHNlY3Rpb24ubGFiZWxzIHx8IFtdKVswXSB8fCBbXSlba2V5XSB8fCAnJyxcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgY29sdW1ucyxcbiAgICAgICAgcm93cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBuZXN0ZWREYXRhLmZvckVhY2gobmVzdCA9PiB7XG4gICAgICB0aGlzLmdldENvbmZpZ1RhYmxlcyhuZXN0LCBzZWN0aW9uLCB0YWIgKyAxLCBhcnJheSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlcG9ydCBmb3IgdGhlIG1vZHVsZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHsqfSByZXBvcnRzIGxpc3Qgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgY3JlYXRlUmVwb3J0c01vZHVsZXMgPSB0aGlzLmNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IoXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgICkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9nKCdyZXBvcnRpbmc6Y3JlYXRlUmVwb3J0c01vZHVsZXMnLCBgUmVwb3J0IHN0YXJ0ZWRgLCAnaW5mbycpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgYXJyYXksXG4gICAgICAgICAgYWdlbnRzLFxuICAgICAgICAgIGJyb3dzZXJUaW1lem9uZSxcbiAgICAgICAgICBzZWFyY2hCYXIsXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnksXG4gICAgICAgICAgdGltZSxcbiAgICAgICAgICB0YWJsZXMsXG4gICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICBpbmRleFBhdHRlcm5UaXRsZSxcbiAgICAgICAgICBhcGlJZCxcbiAgICAgICAgfSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgY29uc3QgeyBtb2R1bGVJRCB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRpbWUgfHwge307XG4gICAgICAgIGxldCBhZGRpdGlvbmFsVGFibGVzID0gW107XG4gICAgICAgIC8vIEluaXRcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IG5ldyBSZXBvcnRQcmludGVyKCk7XG5cbiAgICAgICAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzKCk7XG4gICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCk7XG4gICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgICBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuaGFzaFVzZXJuYW1lLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJIZWFkZXIoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBwcmludGVyLFxuICAgICAgICAgIHNlY3Rpb24sXG4gICAgICAgICAgbW9kdWxlSUQsXG4gICAgICAgICAgYWdlbnRzLFxuICAgICAgICAgIGFwaUlkLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IFtzYW5pdGl6ZWRGaWx0ZXJzLCBhZ2VudHNGaWx0ZXJdID0gZmlsdGVyc1xuICAgICAgICAgID8gdGhpcy5zYW5pdGl6ZUtpYmFuYUZpbHRlcnMoZmlsdGVycywgc2VhcmNoQmFyKVxuICAgICAgICAgIDogW2ZhbHNlLCBudWxsXTtcblxuICAgICAgICBpZiAodGltZSAmJiBzYW5pdGl6ZWRGaWx0ZXJzKSB7XG4gICAgICAgICAgcHJpbnRlci5hZGRUaW1lUmFuZ2VBbmRGaWx0ZXJzKFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgc2FuaXRpemVkRmlsdGVycyxcbiAgICAgICAgICAgIGJyb3dzZXJUaW1lem9uZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICBhZGRpdGlvbmFsVGFibGVzID0gYXdhaXQgZXh0ZW5kZWRJbmZvcm1hdGlvbihcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBwcmludGVyLFxuICAgICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICAgIG1vZHVsZUlELFxuICAgICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgICBuZXcgRGF0ZShmcm9tKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBuZXcgRGF0ZSh0bykuZ2V0VGltZSgpLFxuICAgICAgICAgICAgc2VydmVyU2lkZVF1ZXJ5LFxuICAgICAgICAgICAgYWdlbnRzRmlsdGVyLFxuICAgICAgICAgICAgaW5kZXhQYXR0ZXJuVGl0bGUsXG4gICAgICAgICAgICBhZ2VudHMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaW50ZXIuYWRkVmlzdWFsaXphdGlvbnMoYXJyYXksIGFnZW50cywgbW9kdWxlSUQpO1xuXG4gICAgICAgIGlmICh0YWJsZXMpIHtcbiAgICAgICAgICBwcmludGVyLmFkZFRhYmxlcyhbLi4udGFibGVzLCAuLi4oYWRkaXRpb25hbFRhYmxlcyB8fCBbXSldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vYWRkIGF1dGhvcml6ZWQgYWdlbnRzXG4gICAgICAgIGlmIChhZ2VudHNGaWx0ZXI/LmFnZW50c1RleHQpIHtcbiAgICAgICAgICBwcmludGVyLmFkZEFnZW50c0ZpbHRlcnMoYWdlbnRzRmlsdGVyLmFnZW50c1RleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpbnRlci5wcmludChjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBgUmVwb3J0ICR7Y29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLmZpbGVuYW1lfSB3YXMgY3JlYXRlZGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDI5LCA1MDAsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICh7IGJvZHk6IHsgYWdlbnRzIH0sIHBhcmFtczogeyBtb2R1bGVJRCB9IH0pID0+XG4gICAgICBgd2F6dWgtbW9kdWxlLSR7XG4gICAgICAgIGFnZW50cyA/IGBhZ2VudHMtJHthZ2VudHN9YCA6ICdvdmVydmlldydcbiAgICAgIH0tJHttb2R1bGVJRH0tJHt0aGlzLmdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCl9LnBkZmAsXG4gICk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlcG9ydCBmb3IgdGhlIGdyb3Vwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMgeyp9IHJlcG9ydHMgbGlzdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBjcmVhdGVSZXBvcnRzR3JvdXBzID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvZygncmVwb3J0aW5nOmNyZWF0ZVJlcG9ydHNHcm91cHMnLCBgUmVwb3J0IHN0YXJ0ZWRgLCAnaW5mbycpO1xuICAgICAgICBjb25zdCB7IGNvbXBvbmVudHMsIGFwaUlkIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICAgIGNvbnN0IHsgZ3JvdXBJRCB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgICAgIC8vIEluaXRcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IG5ldyBSZXBvcnRQcmludGVyKCk7XG5cbiAgICAgICAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzKCk7XG4gICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCk7XG4gICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgICBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuaGFzaFVzZXJuYW1lLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHRhYmxlcyA9IFtdO1xuICAgICAgICBjb25zdCBlcXVpdmFsZW5jZXMgPSB7XG4gICAgICAgICAgbG9jYWxmaWxlOiAnTG9jYWwgZmlsZXMnLFxuICAgICAgICAgIG9zcXVlcnk6ICdPc3F1ZXJ5JyxcbiAgICAgICAgICBjb21tYW5kOiAnQ29tbWFuZCcsXG4gICAgICAgICAgc3lzY2hlY2s6ICdTeXNjaGVjaycsXG4gICAgICAgICAgJ29wZW4tc2NhcCc6ICdPcGVuU0NBUCcsXG4gICAgICAgICAgJ2Npcy1jYXQnOiAnQ0lTLUNBVCcsXG4gICAgICAgICAgc3lzY29sbGVjdG9yOiAnU3lzY29sbGVjdG9yJyxcbiAgICAgICAgICByb290Y2hlY2s6ICdSb290Y2hlY2snLFxuICAgICAgICAgIGxhYmVsczogJ0xhYmVscycsXG4gICAgICAgICAgc2NhOiAnU2VjdXJpdHkgY29uZmlndXJhdGlvbiBhc3Nlc3NtZW50JyxcbiAgICAgICAgfTtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICB0ZXh0OiBgR3JvdXAgJHtncm91cElEfSBjb25maWd1cmF0aW9uYCxcbiAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gR3JvdXAgY29uZmlndXJhdGlvblxuICAgICAgICBpZiAoY29tcG9uZW50c1snMCddKSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZGF0YTogeyBkYXRhOiBjb25maWd1cmF0aW9uIH0sXG4gICAgICAgICAgfSA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgIGAvZ3JvdXBzLyR7Z3JvdXBJRH0vY29uZmlndXJhdGlvbmAsXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLmFmZmVjdGVkX2l0ZW1zLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbmZpZ3VyYXRpb24uYWZmZWN0ZWRfaXRlbXNbMF0uY29uZmlnKS5sZW5ndGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICAgIHRleHQ6ICdDb25maWd1cmF0aW9ucycsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiAxNCwgY29sb3I6ICcjMDAwJyB9LFxuICAgICAgICAgICAgICBtYXJnaW46IFswLCAxMCwgMCwgMTVdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0ge1xuICAgICAgICAgICAgICBsYWJlbHM6IFtdLFxuICAgICAgICAgICAgICBpc0dyb3VwQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbmZpZyBvZiBjb25maWd1cmF0aW9uLmFmZmVjdGVkX2l0ZW1zKSB7XG4gICAgICAgICAgICAgIGxldCBmaWx0ZXJUaXRsZSA9ICcnO1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICBmb3IgKGxldCBmaWx0ZXIgb2YgT2JqZWN0LmtleXMoY29uZmlnLmZpbHRlcnMpKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyVGl0bGUgPSBmaWx0ZXJUaXRsZS5jb25jYXQoXG4gICAgICAgICAgICAgICAgICBgJHtmaWx0ZXJ9OiAke2NvbmZpZy5maWx0ZXJzW2ZpbHRlcl19YCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IE9iamVjdC5rZXlzKGNvbmZpZy5maWx0ZXJzKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJUaXRsZSA9IGZpbHRlclRpdGxlLmNvbmNhdCgnIHwgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmaWx0ZXJUaXRsZSxcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2g0JyxcbiAgICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxMF0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICAgICAgc2VjdGlvbi50YWJzID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IF9kIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5jb25maWcpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYyBvZiBBZ2VudENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IHMgb2YgYy5zZWN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLm9wdHMgPSBzLm9wdHMgfHwge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNuIG9mIHMuY29uZmlnIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNuLmNvbmZpZ3VyYXRpb24gPT09IF9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLmxhYmVscyA9IHMubGFiZWxzIHx8IFtbXV07XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHdvIG9mIHMud29kbGUgfHwgW10pIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod28ubmFtZSA9PT0gX2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24ubGFiZWxzID0gcy5sYWJlbHMgfHwgW1tdXTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5sYWJlbHNbMF1bJ3BhY2snXSA9ICdQYWNrcyc7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5sYWJlbHNbMF1bJ2NvbnRlbnQnXSA9ICdFdmFsdWF0aW9ucyc7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5sYWJlbHNbMF1bJzcnXSA9ICdTY2FuIGxpc3RlbmluZyBuZXR3b3RrIHBvcnRzJztcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnRhYnMucHVzaChlcXVpdmFsZW5jZXNbX2RdKTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5jb25maWdbX2RdKSkge1xuICAgICAgICAgICAgICAgICAgLyogTE9HIENPTExFQ1RPUiAqL1xuICAgICAgICAgICAgICAgICAgaWYgKF9kID09PSAnbG9jYWxmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5jb25maWdbX2RdLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3Vwc1tvYmoubG9nZm9ybWF0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW29iai5sb2dmb3JtYXRdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tvYmoubG9nZm9ybWF0XS5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhncm91cHMpLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBzYXZlaWR4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdLmZvckVhY2goKHgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoeCkubGVuZ3RoID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXBzW2dyb3VwXVtzYXZlaWR4XSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZWlkeCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IE9iamVjdC5rZXlzKGdyb3Vwc1tncm91cF1bc2F2ZWlkeF0pO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBncm91cHNbZ3JvdXBdLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgeFtrZXldICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB4W2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheSh4W2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHhba2V5XS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggKyAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeFtrZXldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc1tpXSA9IGNvbFswXS50b1VwcGVyQ2FzZSgpICsgY29sLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTG9jYWwgZmlsZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2QgPT09ICdsYWJlbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IGNvbmZpZy5jb25maWdbX2RdWzBdLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMob2JqWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb2x1bW5zLmluY2x1ZGVzKCdoaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IG9iai5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goeFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2ldID0gY29sWzBdLnRvVXBwZXJDYXNlKCkgKyBjb2wuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdMYWJlbHMnLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICByb3dzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IF9kMiBvZiBjb25maWcuY29uZmlnW19kXSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKC4uLnRoaXMuZ2V0Q29uZmlnVGFibGVzKF9kMiwgc2VjdGlvbiwgaWR4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLypJTlRFR1JJVFkgTU9OSVRPUklORyBNT05JVE9SRUQgRElSRUNUT1JJRVMgKi9cbiAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuY29uZmlnW19kXS5kaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3RvcmllcyA9IGNvbmZpZy5jb25maWdbX2RdLmRpcmVjdG9yaWVzO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29uZmlnLmNvbmZpZ1tfZF0uZGlyZWN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0Q29uZmlnVGFibGVzKGNvbmZpZy5jb25maWdbX2RdLCBzZWN0aW9uLCBpZHgpLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZk9wdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc2VjdGlvbi5vcHRzKS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGRpZmZPcHRzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gW1xuICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLmRpZmZPcHRzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPT4geCAhPT0gJ2NoZWNrX2FsbCcgJiYgeCAhPT0gJ2NoZWNrX3N1bScsXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3JpZXMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goeC5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgIT09ICdjaGVja193aG9kYXRhJyA/IHkgOiAnd2hvZGF0YSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKHhbeV0gPyB4W3ldIDogJ25vJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goeC5yZWN1cnNpb25fbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKCh4LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2lkeF0gPSBzZWN0aW9uLm9wdHNbeF07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goJ1JMJyk7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ01vbml0b3JlZCBkaXJlY3RvcmllcycsXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgIHJvd3MsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5nZXRDb25maWdUYWJsZXMoY29uZmlnLmNvbmZpZ1tfZF0sIHNlY3Rpb24sIGlkeCksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFibGUgb2YgdGFibGVzKSB7XG4gICAgICAgICAgICAgICAgICBwcmludGVyLmFkZENvbmZpZ1RhYmxlcyhbdGFibGVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgdGFibGVzID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICAgIHRleHQ6ICdBIGNvbmZpZ3VyYXRpb24gZm9yIHRoaXMgZ3JvdXAgaGFzIG5vdCB5ZXQgYmVlbiBzZXQgdXAuJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDEyLCBjb2xvcjogJyMwMDAnIH0sXG4gICAgICAgICAgICAgIG1hcmdpbjogWzAsIDEwLCAwLCAxNV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZ2VudHMgaW4gZ3JvdXBcbiAgICAgICAgaWYgKGNvbXBvbmVudHNbJzEnXSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVySGVhZGVyKFxuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgIHByaW50ZXIsXG4gICAgICAgICAgICAnZ3JvdXBDb25maWcnLFxuICAgICAgICAgICAgZ3JvdXBJRCxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHByaW50ZXIucHJpbnQoY29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogYFJlcG9ydCAke2NvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5maWxlbmFtZX0gd2FzIGNyZWF0ZWRgLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdyZXBvcnRpbmc6Y3JlYXRlUmVwb3J0c0dyb3VwcycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDI5LCA1MDAsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICh7IHBhcmFtczogeyBncm91cElEIH0gfSkgPT5cbiAgICAgIGB3YXp1aC1ncm91cC1jb25maWd1cmF0aW9uLSR7Z3JvdXBJRH0tJHt0aGlzLmdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCl9LnBkZmAsXG4gICk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlcG9ydCBmb3IgdGhlIGFnZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMgeyp9IHJlcG9ydHMgbGlzdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBjcmVhdGVSZXBvcnRzQWdlbnRzQ29uZmlndXJhdGlvbiA9XG4gICAgdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgICAgYXN5bmMgKFxuICAgICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgICAgKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbG9nKFxuICAgICAgICAgICAgJ3JlcG9ydGluZzpjcmVhdGVSZXBvcnRzQWdlbnRzQ29uZmlndXJhdGlvbicsXG4gICAgICAgICAgICBgUmVwb3J0IHN0YXJ0ZWRgLFxuICAgICAgICAgICAgJ2luZm8nLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgeyBjb21wb25lbnRzLCBhcGlJZCB9ID0gcmVxdWVzdC5ib2R5O1xuICAgICAgICAgIGNvbnN0IHsgYWdlbnRJRCB9ID0gcmVxdWVzdC5wYXJhbXM7XG5cbiAgICAgICAgICBjb25zdCBwcmludGVyID0gbmV3IFJlcG9ydFByaW50ZXIoKTtcbiAgICAgICAgICBjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMoKTtcbiAgICAgICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCk7XG4gICAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoXG4gICAgICAgICAgICBXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRILFxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoXG4gICAgICAgICAgICBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgICAgIGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5oYXNoVXNlcm5hbWUsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgd21vZHVsZXNSZXNwb25zZSA9IHt9O1xuICAgICAgICAgIGxldCB0YWJsZXMgPSBbXTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgd21vZHVsZXNSZXNwb25zZSA9XG4gICAgICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICAgICAgYC9hZ2VudHMvJHthZ2VudElEfS9jb25maWcvd21vZHVsZXMvd21vZHVsZXNgLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2coJ3JlcG9ydGluZzpyZXBvcnQnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yLCAnZGVidWcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckhlYWRlcihcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBwcmludGVyLFxuICAgICAgICAgICAgJ2FnZW50Q29uZmlnJyxcbiAgICAgICAgICAgICdhZ2VudENvbmZpZycsXG4gICAgICAgICAgICBhZ2VudElELFxuICAgICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxldCBpZHhDb21wb25lbnQgPSAwO1xuICAgICAgICAgIGZvciAobGV0IGNvbmZpZyBvZiBBZ2VudENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCB0aXRsZU9mU2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgbG9nKFxuICAgICAgICAgICAgICAncmVwb3J0aW5nOmNyZWF0ZVJlcG9ydHNBZ2VudHNDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgICAgYEl0ZXJhdGUgb3ZlciAke2NvbmZpZy5zZWN0aW9ucy5sZW5ndGh9IGNvbmZpZ3VyYXRpb24gc2VjdGlvbnNgLFxuICAgICAgICAgICAgICAnZGVidWcnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNlY3Rpb24gb2YgY29uZmlnLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICAgIGxldCB0aXRsZU9mU3Vic2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29tcG9uZW50c1tpZHhDb21wb25lbnRdICYmXG4gICAgICAgICAgICAgICAgKHNlY3Rpb24uY29uZmlnIHx8IHNlY3Rpb24ud29kbGUpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3MgPSAoc2VjdGlvbi5jb25maWcgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb24ud29kbGUgfHwgW10sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsb2coXG4gICAgICAgICAgICAgICAgICAncmVwb3J0aW5nOmNyZWF0ZVJlcG9ydHNBZ2VudHNDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgIGBJdGVyYXRlIG92ZXIgJHtjb25maWdzLmxlbmd0aH0gY29uZmlndXJhdGlvbiBibG9ja3NgLFxuICAgICAgICAgICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbmYgb2YgY29uZmlncykge1xuICAgICAgICAgICAgICAgICAgbGV0IGFnZW50Q29uZmlnUmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29uZlsnbmFtZSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdSZXNwb25zZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYC9hZ2VudHMvJHthZ2VudElEfS9jb25maWcvJHtjb25mLmNvbXBvbmVudH0vJHtjb25mLmNvbmZpZ3VyYXRpb259YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB3b2RsZSBvZiB3bW9kdWxlc1Jlc3BvbnNlLmRhdGEuZGF0YVtcbiAgICAgICAgICAgICAgICAgICAgICAgICd3bW9kdWxlcydcbiAgICAgICAgICAgICAgICAgICAgICBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMod29kbGUpWzBdID09PSBjb25mWyduYW1lJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdSZXNwb25zZS5kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHdvZGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFnZW50Q29uZmlnID1cbiAgICAgICAgICAgICAgICAgICAgICBhZ2VudENvbmZpZ1Jlc3BvbnNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdSZXNwb25zZS5kYXRhICYmXG4gICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdSZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGl0bGVPZlNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogY29uZmlnLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdoMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxNV0sXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVPZlNlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGl0bGVPZlN1YnNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogc2VjdGlvbi5zdWJ0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnaDQnLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBzZWN0aW9uLmRlc2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogMTIsIGNvbG9yOiAnIzAwMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZU9mU3Vic2VjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFnZW50Q29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYWdlbnRDb25maWdLZXkgb2YgT2JqZWN0LmtleXMoYWdlbnRDb25maWcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhZ2VudENvbmZpZ1thZ2VudENvbmZpZ0tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qIExPRyBDT0xMRUNUT1IgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmYuZmlsdGVyQnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdbYWdlbnRDb25maWdLZXldLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBzW29iai5sb2dmb3JtYXRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tvYmoubG9nZm9ybWF0XSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW29iai5sb2dmb3JtYXRdLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhncm91cHMpLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhdmVpZHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW2dyb3VwXS5mb3JFYWNoKCh4LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh4KS5sZW5ndGggPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGdyb3Vwc1tncm91cF1bc2F2ZWlkeF0pLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlaWR4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tncm91cF1bc2F2ZWlkeF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IGdyb3Vwc1tncm91cF0ubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHhba2V5XSAhPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB4W2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBBcnJheS5pc0FycmF5KHhba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB4W2tleV0ubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggKyAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEpTT04uc3RyaW5naWZ5KHhba2V5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNbaV0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbFswXS50b1VwcGVyQ2FzZSgpICsgY29sLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzZWN0aW9uLmxhYmVsc1swXVtncm91cF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VudENvbmZpZ0tleS5jb25maWd1cmF0aW9uICE9PSAnc29ja2V0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0Q29uZmlnVGFibGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VudENvbmZpZ1thZ2VudENvbmZpZ0tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBfZDIgb2YgYWdlbnRDb25maWdbYWdlbnRDb25maWdLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5nZXRDb25maWdUYWJsZXMoX2QyLCBzZWN0aW9uLCBpZHgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElOVEVHUklUWSBNT05JVE9SSU5HIE1PTklUT1JFRCBESVJFQ1RPUklFUyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5tYXRyaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5jaHJvbml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX2xpbWl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPSBhZ2VudENvbmZpZ1thZ2VudENvbmZpZ0tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldENvbmZpZ1RhYmxlcyhyZXN0LCBzZWN0aW9uLCBpZHgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGRpZmYgJiYgZGlmZi5kaXNrX3F1b3RhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5nZXRDb25maWdUYWJsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmLmRpc2tfcXVvdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRhYnM6IFsnRGlzayBxdW90YSddIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4oZGlmZiAmJiBkaWZmLmZpbGVfc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZ2V0Q29uZmlnVGFibGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5maWxlX3NpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRhYnM6IFsnRmlsZSBzaXplJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihzeW5jaHJvbml6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bmNocm9uaXphdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGFiczogWydTeW5jaHJvbml6YXRpb24nXSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW10pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGZpbGVfbGltaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfbGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRhYnM6IFsnRmlsZSBsaW1pdCddIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZk9wdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzZWN0aW9uLm9wdHMpLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmT3B0cy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmRpZmZPcHRzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeCA9PiB4ICE9PSAnY2hlY2tfYWxsJyAmJiB4ICE9PSAnY2hlY2tfc3VtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yaWVzLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaCh4LmRpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5vcHRzLmluZGV4T2YoeSkgPiAtMSA/ICd5ZXMnIDogJ25vJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKHgucmVjdXJzaW9uX2xldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoeCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2lkeF0gPSBzZWN0aW9uLm9wdHNbeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKCdSTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9uaXRvcmVkIGRpcmVjdG9yaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0Q29uZmlnVGFibGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VudENvbmZpZ1thZ2VudENvbmZpZ0tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBQcmludCBubyBjb25maWd1cmVkIG1vZHVsZSBhbmQgbGluayB0byB0aGUgZG9jdW1lbnRhdGlvblxuICAgICAgICAgICAgICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdUaGlzIG1vZHVsZSBpcyBub3QgY29uZmlndXJlZC4gUGxlYXNlIHRha2UgYSBsb29rIG9uIGhvdyB0byBjb25maWd1cmUgaXQgaW4gJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGAke3NlY3Rpb24uc3VidGl0bGUudG9Mb3dlckNhc2UoKX0gY29uZmlndXJhdGlvbi5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IHNlY3Rpb24uZG9jdUxpbmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDEyLCBjb2xvcjogJyMxYTBkYWInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMCwgMCwgMjBdLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBsb2coJ3JlcG9ydGluZzpyZXBvcnQnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yLCAnZGVidWcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRhYmxlIG9mIHRhYmxlcykge1xuICAgICAgICAgICAgICAgICAgcHJpbnRlci5hZGRDb25maWdUYWJsZXMoW3RhYmxlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlkeENvbXBvbmVudCsrO1xuICAgICAgICAgICAgICB0YWJsZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhd2FpdCBwcmludGVyLnByaW50KGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5wYXRoRmlsZW5hbWUpO1xuXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogYFJlcG9ydCAke2NvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5maWxlbmFtZX0gd2FzIGNyZWF0ZWRgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2coXG4gICAgICAgICAgICAncmVwb3J0aW5nOmNyZWF0ZVJlcG9ydHNBZ2VudHNDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDI5LCA1MDAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICh7IHBhcmFtczogeyBhZ2VudElEIH0gfSkgPT5cbiAgICAgICAgYHdhenVoLWFnZW50LWNvbmZpZ3VyYXRpb24tJHthZ2VudElEfS0ke3RoaXMuZ2VuZXJhdGVSZXBvcnRUaW1lc3RhbXAoKX0ucGRmYCxcbiAgICApO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZXBvcnQgZm9yIHRoZSBhZ2VudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHsqfSByZXBvcnRzIGxpc3Qgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgY3JlYXRlUmVwb3J0c0FnZW50c0ludmVudG9yeSA9XG4gICAgdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgICAgYXN5bmMgKFxuICAgICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgICAgKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbG9nKFxuICAgICAgICAgICAgJ3JlcG9ydGluZzpjcmVhdGVSZXBvcnRzQWdlbnRzSW52ZW50b3J5JyxcbiAgICAgICAgICAgIGBSZXBvcnQgc3RhcnRlZGAsXG4gICAgICAgICAgICAnaW5mbycsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzZWFyY2hCYXIsXG4gICAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgICAgdGltZSxcbiAgICAgICAgICAgIGluZGV4UGF0dGVyblRpdGxlLFxuICAgICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnksXG4gICAgICAgICAgfSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgICBjb25zdCB7IGFnZW50SUQgfSA9IHJlcXVlc3QucGFyYW1zO1xuICAgICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRpbWUgfHwge307XG4gICAgICAgICAgLy8gSW5pdFxuICAgICAgICAgIGNvbnN0IHByaW50ZXIgPSBuZXcgUmVwb3J0UHJpbnRlcigpO1xuXG4gICAgICAgICAgY29uc3QgeyBoYXNoVXNlcm5hbWUgfSA9IGF3YWl0IGNvbnRleHQud2F6dWguc2VjdXJpdHkuZ2V0Q3VycmVudFVzZXIoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNyZWF0ZURhdGFEaXJlY3RvcnlJZk5vdEV4aXN0cygpO1xuICAgICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhcbiAgICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhcbiAgICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgICAgICAgaGFzaFVzZXJuYW1lLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbG9nKFxuICAgICAgICAgICAgJ3JlcG9ydGluZzpjcmVhdGVSZXBvcnRzQWdlbnRzSW52ZW50b3J5JyxcbiAgICAgICAgICAgIGBTeXNjb2xsZWN0b3IgcmVwb3J0YCxcbiAgICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBbc2FuaXRpemVkRmlsdGVycywgYWdlbnRzRmlsdGVyXSA9IGZpbHRlcnNcbiAgICAgICAgICAgID8gdGhpcy5zYW5pdGl6ZUtpYmFuYUZpbHRlcnMoZmlsdGVycywgc2VhcmNoQmFyKVxuICAgICAgICAgICAgOiBbZmFsc2UsIG51bGxdO1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSBhZ2VudCBPU1xuICAgICAgICAgIGxldCBhZ2VudE9zID0gJyc7XG4gICAgICAgICAgbGV0IGlzQWdlbnRXaW5kb3dzID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGlzQWdlbnRMaW51eCA9IGZhbHNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBhZ2VudFJlc3BvbnNlID1cbiAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgICBgL2FnZW50cz9hZ2VudHNfbGlzdD0ke2FnZW50SUR9YCxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlzQWdlbnRXaW5kb3dzID1cbiAgICAgICAgICAgICAgYWdlbnRSZXNwb25zZT8uZGF0YT8uZGF0YT8uYWZmZWN0ZWRfaXRlbXM/LlswXS5vcz8ucGxhdGZvcm0gPT09XG4gICAgICAgICAgICAgICd3aW5kb3dzJztcbiAgICAgICAgICAgIGlzQWdlbnRMaW51eCA9XG4gICAgICAgICAgICAgIGFnZW50UmVzcG9uc2U/LmRhdGE/LmRhdGE/LmFmZmVjdGVkX2l0ZW1zPy5bMF0ub3M/LnVuYW1lPy5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAnTGludXgnLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgYWdlbnRPcyA9XG4gICAgICAgICAgICAgIChpc0FnZW50V2luZG93cyAmJiAnd2luZG93cycpIHx8IChpc0FnZW50TGludXggJiYgJ2xpbnV4JykgfHwgJyc7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvZyhcbiAgICAgICAgICAgICAgJ3JlcG9ydGluZzpjcmVhdGVSZXBvcnRzQWdlbnRzSW52ZW50b3J5JyxcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQWRkIHRpdGxlXG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgICAgdGV4dDogJ0ludmVudG9yeSBkYXRhIHJlcG9ydCcsXG4gICAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEFkZCB0YWJsZSB3aXRoIHRoZSBhZ2VudCBpbmZvXG4gICAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBbYWdlbnRJRF0sIGFwaUlkKTtcblxuICAgICAgICAgIC8vIEdldCBzeXNjb2xsZWN0b3IgcGFja2FnZXMgYW5kIHByb2Nlc3Nlc1xuICAgICAgICAgIGNvbnN0IGFnZW50UmVxdWVzdHNJbnZlbnRvcnkgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiBgL3N5c2NvbGxlY3Rvci8ke2FnZW50SUR9L3BhY2thZ2VzYCxcbiAgICAgICAgICAgICAgbG9nZ2VyTWVzc2FnZTogYEZldGNoaW5nIHBhY2thZ2VzIGZvciBhZ2VudCAke2FnZW50SUR9YCxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1BhY2thZ2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOlxuICAgICAgICAgICAgICAgICAgYWdlbnRPcyA9PT0gJ3dpbmRvd3MnXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnYXJjaGl0ZWN0dXJlJywgbGFiZWw6ICdBcmNoaXRlY3R1cmUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAndmVyc2lvbicsIGxhYmVsOiAnVmVyc2lvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICd2ZW5kb3InLCBsYWJlbDogJ1ZlbmRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnYXJjaGl0ZWN0dXJlJywgbGFiZWw6ICdBcmNoaXRlY3R1cmUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAndmVyc2lvbicsIGxhYmVsOiAnVmVyc2lvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICd2ZW5kb3InLCBsYWJlbDogJ1ZlbmRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdkZXNjcmlwdGlvbicsIGxhYmVsOiAnRGVzY3JpcHRpb24nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiBgL3N5c2NvbGxlY3Rvci8ke2FnZW50SUR9L3Byb2Nlc3Nlc2AsXG4gICAgICAgICAgICAgIGxvZ2dlck1lc3NhZ2U6IGBGZXRjaGluZyBwcm9jZXNzZXMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnUHJvY2Vzc2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOlxuICAgICAgICAgICAgICAgICAgYWdlbnRPcyA9PT0gJ3dpbmRvd3MnXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnY21kJywgbGFiZWw6ICdDTUQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAncHJpb3JpdHknLCBsYWJlbDogJ1ByaW9yaXR5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25sd3AnLCBsYWJlbDogJ05MV1AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2V1c2VyJywgbGFiZWw6ICdFZmZlY3RpdmUgdXNlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICduaWNlJywgbGFiZWw6ICdQcmlvcml0eScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzdGF0ZScsIGxhYmVsOiAnU3RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWFwUmVzcG9uc2VJdGVtczogaXRlbSA9PlxuICAgICAgICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJ1xuICAgICAgICAgICAgICAgICAgPyBpdGVtXG4gICAgICAgICAgICAgICAgICA6IHsgLi4uaXRlbSwgc3RhdGU6IFByb2Nlc3NFcXVpdmFsZW5jZVtpdGVtLnN0YXRlXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vcG9ydHNgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgcG9ydHMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTmV0d29yayBwb3J0cycsXG4gICAgICAgICAgICAgICAgY29sdW1uczpcbiAgICAgICAgICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJ1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdsb2NhbF9wb3J0JywgbGFiZWw6ICdMb2NhbCBwb3J0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX2lwJywgbGFiZWw6ICdMb2NhbCBJUCBhZGRyZXNzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb2Nlc3MnLCBsYWJlbDogJ1Byb2Nlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogYWdlbnRPcyA9PT0gJ2xpbnV4J1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdsb2NhbF9wb3J0JywgbGFiZWw6ICdMb2NhbCBwb3J0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX2lwJywgbGFiZWw6ICdMb2NhbCBJUCBhZGRyZXNzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb2Nlc3MnLCBsYWJlbDogJ1Byb2Nlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAncGlkJywgbGFiZWw6ICdQSUQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX3BvcnQnLCBsYWJlbDogJ0xvY2FsIHBvcnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnbG9jYWxfaXAnLCBsYWJlbDogJ0xvY2FsIElQIGFkZHJlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtYXBSZXNwb25zZUl0ZW1zOiBpdGVtID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICBsb2NhbF9pcDogaXRlbS5sb2NhbC5pcCxcbiAgICAgICAgICAgICAgICBsb2NhbF9wb3J0OiBpdGVtLmxvY2FsLnBvcnQsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vbmV0aWZhY2VgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgbmV0aWZhY2UgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTmV0d29yayBpbnRlcmZhY2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbmFtZScsIGxhYmVsOiAnTmFtZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdtYWMnLCBsYWJlbDogJ01hYycgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzdGF0ZScsIGxhYmVsOiAnU3RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbXR1JywgbGFiZWw6ICdNVFUnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAndHlwZScsIGxhYmVsOiAnVHlwZScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vbmV0YWRkcmAsXG4gICAgICAgICAgICAgIGxvZ2dlck1lc3NhZ2U6IGBGZXRjaGluZyBuZXRhZGRyIGZvciBhZ2VudCAke2FnZW50SUR9YCxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ05ldHdvcmsgc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdpZmFjZScsIGxhYmVsOiAnSW50ZXJmYWNlJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ2FkZHJlc3MnLCBsYWJlbDogJ0FkZHJlc3MnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbmV0bWFzaycsIGxhYmVsOiAnTmV0bWFzaycgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdwcm90bycsIGxhYmVsOiAnUHJvdG9jb2wnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnYnJvYWRjYXN0JywgbGFiZWw6ICdCcm9hZGNhc3QnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJyAmJlxuICAgICAgICAgICAgYWdlbnRSZXF1ZXN0c0ludmVudG9yeS5wdXNoKHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vaG90Zml4ZXNgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgaG90Zml4ZXMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnV2luZG93cyB1cGRhdGVzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbeyBpZDogJ2hvdGZpeCcsIGxhYmVsOiAnVXBkYXRlIGNvZGUnIH1dLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCByZXF1ZXN0SW52ZW50b3J5ID0gYXN5bmMgYWdlbnRSZXF1ZXN0SW52ZW50b3J5ID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxvZyhcbiAgICAgICAgICAgICAgICAncmVwb3J0aW5nOmNyZWF0ZVJlcG9ydHNBZ2VudHNJbnZlbnRvcnknLFxuICAgICAgICAgICAgICAgIGFnZW50UmVxdWVzdEludmVudG9yeS5sb2dnZXJNZXNzYWdlLFxuICAgICAgICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgY29uc3QgaW52ZW50b3J5UmVzcG9uc2UgPVxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgICAgIGFnZW50UmVxdWVzdEludmVudG9yeS5lbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUlkIH0sXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBjb25zdCBpbnZlbnRvcnkgPVxuICAgICAgICAgICAgICAgIGludmVudG9yeVJlc3BvbnNlICYmXG4gICAgICAgICAgICAgICAgaW52ZW50b3J5UmVzcG9uc2UuZGF0YSAmJlxuICAgICAgICAgICAgICAgIGludmVudG9yeVJlc3BvbnNlLmRhdGEuZGF0YSAmJlxuICAgICAgICAgICAgICAgIGludmVudG9yeVJlc3BvbnNlLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtcztcbiAgICAgICAgICAgICAgaWYgKGludmVudG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAuLi5hZ2VudFJlcXVlc3RJbnZlbnRvcnkudGFibGUsXG4gICAgICAgICAgICAgICAgICBpdGVtczogYWdlbnRSZXF1ZXN0SW52ZW50b3J5Lm1hcFJlc3BvbnNlSXRlbXNcbiAgICAgICAgICAgICAgICAgICAgPyBpbnZlbnRvcnkubWFwKGFnZW50UmVxdWVzdEludmVudG9yeS5tYXBSZXNwb25zZUl0ZW1zKVxuICAgICAgICAgICAgICAgICAgICA6IGludmVudG9yeSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBsb2coXG4gICAgICAgICAgICAgICAgJ3JlcG9ydGluZzpjcmVhdGVSZXBvcnRzQWdlbnRzSW52ZW50b3J5JyxcbiAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICh0aW1lKSB7XG4gICAgICAgICAgICAvLyBBZGQgVnVsbmVyYWJpbGl0eSBEZXRlY3RvciBmaWx0ZXIgdG8gdGhlIFNlcnZlciBTaWRlIFF1ZXJ5XG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnk/LmJvb2w/Lm11c3Q/LnB1c2g/Lih7XG4gICAgICAgICAgICAgIG1hdGNoX3BocmFzZToge1xuICAgICAgICAgICAgICAgICdydWxlLmdyb3Vwcyc6IHtcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5OiAndnVsbmVyYWJpbGl0eS1kZXRlY3RvcicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCBleHRlbmRlZEluZm9ybWF0aW9uKFxuICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICBwcmludGVyLFxuICAgICAgICAgICAgICAnYWdlbnRzJyxcbiAgICAgICAgICAgICAgJ3N5c2NvbGxlY3RvcicsXG4gICAgICAgICAgICAgIGFwaUlkLFxuICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgc2VydmVyU2lkZVF1ZXJ5LFxuICAgICAgICAgICAgICBhZ2VudHNGaWx0ZXIsXG4gICAgICAgICAgICAgIGluZGV4UGF0dGVyblRpdGxlLFxuICAgICAgICAgICAgICBhZ2VudElELFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBZGQgaW52ZW50b3J5IHRhYmxlc1xuICAgICAgICAgIChhd2FpdCBQcm9taXNlLmFsbChhZ2VudFJlcXVlc3RzSW52ZW50b3J5Lm1hcChyZXF1ZXN0SW52ZW50b3J5KSkpXG4gICAgICAgICAgICAuZmlsdGVyKHRhYmxlID0+IHRhYmxlKVxuICAgICAgICAgICAgLmZvckVhY2godGFibGUgPT4gcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh0YWJsZSkpO1xuXG4gICAgICAgICAgLy8gUHJpbnQgdGhlIGRvY3VtZW50XG4gICAgICAgICAgYXdhaXQgcHJpbnRlci5wcmludChjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lKTtcblxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBSZXBvcnQgJHtjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuZmlsZW5hbWV9IHdhcyBjcmVhdGVkYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nKCdyZXBvcnRpbmc6Y3JlYXRlUmVwb3J0c0FnZW50cycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMjksIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKHsgcGFyYW1zOiB7IGFnZW50SUQgfSB9KSA9PlxuICAgICAgICBgd2F6dWgtYWdlbnQtaW52ZW50b3J5LSR7YWdlbnRJRH0tJHt0aGlzLmdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCl9LnBkZmAsXG4gICAgKTtcblxuICAvKipcbiAgICogRmV0Y2ggdGhlIHJlcG9ydHMgbGlzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge0FycmF5PE9iamVjdD59IHJlcG9ydHMgbGlzdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBnZXRSZXBvcnRzKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgbG9nKCdyZXBvcnRpbmc6Z2V0UmVwb3J0cycsIGBGZXRjaGluZyBjcmVhdGVkIHJlcG9ydHNgLCAnaW5mbycpO1xuICAgICAgY29uc3QgeyBoYXNoVXNlcm5hbWUgfSA9IGF3YWl0IGNvbnRleHQud2F6dWguc2VjdXJpdHkuZ2V0Q3VycmVudFVzZXIoXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICApO1xuICAgICAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzKCk7XG4gICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCk7XG4gICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgIGNvbnN0IHVzZXJSZXBvcnRzRGlyZWN0b3J5UGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgaGFzaFVzZXJuYW1lLFxuICAgICAgKTtcbiAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKHVzZXJSZXBvcnRzRGlyZWN0b3J5UGF0aCk7XG4gICAgICBsb2coXG4gICAgICAgICdyZXBvcnRpbmc6Z2V0UmVwb3J0cycsXG4gICAgICAgIGBEaXJlY3Rvcnk6ICR7dXNlclJlcG9ydHNEaXJlY3RvcnlQYXRofWAsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzb3J0UmVwb3J0c0J5RGF0ZSA9IChhLCBiKSA9PlxuICAgICAgICBhLmRhdGUgPCBiLmRhdGUgPyAxIDogYS5kYXRlID4gYi5kYXRlID8gLTEgOiAwO1xuXG4gICAgICBjb25zdCByZXBvcnRzID0gZnMucmVhZGRpclN5bmModXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoKS5tYXAoZmlsZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmModXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoICsgJy8nICsgZmlsZSk7XG4gICAgICAgIC8vIEdldCB0aGUgZmlsZSBjcmVhdGlvbiB0aW1lIChiaXRodGltZSkuIEl0IHJldHVybnMgdGhlIGZpcnN0IHZhbHVlIHRoYXQgaXMgYSB0cnV0aHkgdmFsdWUgb2YgbmV4dCBmaWxlIHN0YXRzOiBiaXJ0aHRpbWUsIG10aW1lLCBjdGltZSBhbmQgYXRpbWUuXG4gICAgICAgIC8vIFRoaXMgc29sdmVzIHNvbWUgT1NzIGNhbiBoYXZlIHRoZSBiaXRodGltZU1zIGVxdWFsIHRvIDAgYW5kIHJldHVybnMgdGhlIGRhdGUgbGlrZSAxOTcwLTAxLTAxXG4gICAgICAgIGNvbnN0IGJpcnRoVGltZUZpZWxkID0gWydiaXJ0aHRpbWUnLCAnbXRpbWUnLCAnY3RpbWUnLCAnYXRpbWUnXS5maW5kKFxuICAgICAgICAgIHRpbWUgPT4gc3RhdHNbYCR7dGltZX1Nc2BdLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGZpbGUsXG4gICAgICAgICAgc2l6ZTogc3RhdHMuc2l6ZSxcbiAgICAgICAgICBkYXRlOiBzdGF0c1tiaXJ0aFRpbWVGaWVsZF0sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3JlcG9ydGluZzpnZXRSZXBvcnRzJyxcbiAgICAgICAgYFVzaW5nIFRpbVNvcnQgZm9yIHNvcnRpbmcgJHtyZXBvcnRzLmxlbmd0aH0gaXRlbXNgLFxuICAgICAgICAnZGVidWcnLFxuICAgICAgKTtcbiAgICAgIFRpbVNvcnQuc29ydChyZXBvcnRzLCBzb3J0UmVwb3J0c0J5RGF0ZSk7XG4gICAgICBsb2coJ3JlcG9ydGluZzpnZXRSZXBvcnRzJywgYFRvdGFsIHJlcG9ydHM6ICR7cmVwb3J0cy5sZW5ndGh9YCwgJ2RlYnVnJyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IHJlcG9ydHMgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3JlcG9ydGluZzpnZXRSZXBvcnRzJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDMxLCA1MDAsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggc3BlY2lmaWMgcmVwb3J0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXBvcnQgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgZ2V0UmVwb3J0QnlOYW1lID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvZyhcbiAgICAgICAgICAncmVwb3J0aW5nOmdldFJlcG9ydEJ5TmFtZScsXG4gICAgICAgICAgYEdldHRpbmcgJHtjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lfSByZXBvcnRgLFxuICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcG9ydEZpbGVCdWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgY29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZSxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vcGRmJyB9LFxuICAgICAgICAgIGJvZHk6IHJlcG9ydEZpbGVCdWZmZXIsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdyZXBvcnRpbmc6Z2V0UmVwb3J0QnlOYW1lJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMzAsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVxdWVzdCA9PiByZXF1ZXN0LnBhcmFtcy5uYW1lLFxuICApO1xuXG4gIC8qKlxuICAgKiBEZWxldGUgc3BlY2lmaWMgcmVwb3J0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0dXMgb2JqIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGRlbGV0ZVJlcG9ydEJ5TmFtZSA9IHRoaXMuY2hlY2tSZXBvcnRzVXNlckRpcmVjdG9yeUlzVmFsaWRSb3V0ZURlY29yYXRvcihcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsb2coXG4gICAgICAgICAgJ3JlcG9ydGluZzpkZWxldGVSZXBvcnRCeU5hbWUnLFxuICAgICAgICAgIGBEZWxldGluZyAke2NvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5wYXRoRmlsZW5hbWV9IHJlcG9ydGAsXG4gICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lKTtcbiAgICAgICAgbG9nKFxuICAgICAgICAgICdyZXBvcnRpbmc6ZGVsZXRlUmVwb3J0QnlOYW1lJyxcbiAgICAgICAgICBgJHtjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lfSByZXBvcnQgd2FzIGRlbGV0ZWRgLFxuICAgICAgICAgICdpbmZvJyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7IGVycm9yOiAwIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdyZXBvcnRpbmc6ZGVsZXRlUmVwb3J0QnlOYW1lJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMzIsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVxdWVzdCA9PiByZXF1ZXN0LnBhcmFtcy5uYW1lLFxuICApO1xuXG4gIGNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IoXG4gICAgcm91dGVIYW5kbGVyLFxuICAgIHJlcG9ydEZpbGVOYW1lQWNjZXNzb3IsXG4gICkge1xuICAgIHJldHVybiBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBoYXNoVXNlcm5hbWUgfSA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5zZWN1cml0eS5nZXRDdXJyZW50VXNlcihyZXF1ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgdXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgaGFzaFVzZXJuYW1lLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHJlcG9ydEZpbGVOYW1lQWNjZXNzb3IocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IHBhdGhGaWxlbmFtZSA9IHBhdGguam9pbih1c2VyUmVwb3J0c0RpcmVjdG9yeVBhdGgsIGZpbGVuYW1lKTtcbiAgICAgICAgbG9nKFxuICAgICAgICAgICdyZXBvcnRpbmc6Y2hlY2tSZXBvcnRzVXNlckRpcmVjdG9yeUlzVmFsaWRSb3V0ZURlY29yYXRvcicsXG4gICAgICAgICAgYENoZWNraW5nIHRoZSB1c2VyICR7dXNlcm5hbWV9KCR7aGFzaFVzZXJuYW1lfSkgY2FuIGRvIGFjdGlvbnMgaW4gdGhlIHJlcG9ydHMgZmlsZTogJHtwYXRoRmlsZW5hbWV9YCxcbiAgICAgICAgICAnZGVidWcnLFxuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXBhdGhGaWxlbmFtZS5zdGFydHNXaXRoKHVzZXJSZXBvcnRzRGlyZWN0b3J5UGF0aCkgfHxcbiAgICAgICAgICBwYXRoRmlsZW5hbWUuaW5jbHVkZXMoJy4uLycpXG4gICAgICAgICkge1xuICAgICAgICAgIGxvZyhcbiAgICAgICAgICAgICdzZWN1cml0eTpyZXBvcnRpbmc6Y2hlY2tSZXBvcnRzVXNlckRpcmVjdG9yeUlzVmFsaWRSb3V0ZURlY29yYXRvcicsXG4gICAgICAgICAgICBgVXNlciAke3VzZXJuYW1lfSgke2hhc2hVc2VybmFtZX0pIHRyaWVkIHRvIGFjY2VzcyB0byBhIG5vbiB1c2VyIHJlcG9ydCBmaWxlOiAke3BhdGhGaWxlbmFtZX1gLFxuICAgICAgICAgICAgJ3dhcm4nLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJhZFJlcXVlc3Qoe1xuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnNTA0MCAtIFlvdSBzaGFsbCBub3QgcGFzcyEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsb2coXG4gICAgICAgICAgJ3JlcG9ydGluZzpjaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yJyxcbiAgICAgICAgICAnQ2hlY2tpbmcgdGhlIHVzZXIgY2FuIGRvIGFjdGlvbnMgaW4gdGhlIHJlcG9ydHMgZmlsZScsXG4gICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJvdXRlSGFuZGxlci5iaW5kKHRoaXMpKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLmNvbnRleHQsXG4gICAgICAgICAgICB3YXp1aEVuZHBvaW50UGFyYW1zOiB7IGhhc2hVc2VybmFtZSwgZmlsZW5hbWUsIHBhdGhGaWxlbmFtZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZyhcbiAgICAgICAgICAncmVwb3J0aW5nOmNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3InLFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwNDAsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCkge1xuICAgIHJldHVybiBgJHsoRGF0ZS5ub3coKSAvIDEwMDApIHwgMH1gO1xuICB9XG59XG4iXX0=