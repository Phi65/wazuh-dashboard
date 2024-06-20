"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAgentsTable = buildAgentsTable;
exports.extendedInformation = extendedInformation;

var _logger = require("../logger");

var _summaryTable = _interopRequireDefault(require("./summary-table"));

var _summaryTablesDefinitions = _interopRequireDefault(require("./summary-tables-definitions"));

var VulnerabilityRequest = _interopRequireWildcard(require("./vulnerability-request"));

var OverviewRequest = _interopRequireWildcard(require("./overview-request"));

var RootcheckRequest = _interopRequireWildcard(require("./rootcheck-request"));

var PCIRequest = _interopRequireWildcard(require("./pci-request"));

var GDPRRequest = _interopRequireWildcard(require("./gdpr-request"));

var TSCRequest = _interopRequireWildcard(require("./tsc-request"));

var AuditRequest = _interopRequireWildcard(require("./audit-request"));

var SyscheckRequest = _interopRequireWildcard(require("./syscheck-request"));

var _pciRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/pci-requirements-pdfmake"));

var _gdprRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/gdpr-requirements-pdfmake"));

var _tscRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/tsc-requirements-pdfmake"));

var _moment = _interopRequireDefault(require("moment"));

var _settings = require("../../../common/services/settings");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * This build the agents table
   * @param {Array<Strings>} ids ids of agents
   * @param {String} apiId API id
   */
async function buildAgentsTable(context, printer, agentIDs, apiId, groupID = '') {
  const dateFormat = await context.core.uiSettings.client.get('dateFormat');
  if ((!agentIDs || !agentIDs.length) && !groupID) return;
  (0, _logger.log)('reporting:buildAgentsTable', `${agentIDs.length} agents for API ${apiId}`, 'info');

  try {
    let agentsData = [];

    if (groupID) {
      let totalAgentsInGroup = null;

      do {
        const {
          data: {
            data: {
              affected_items,
              total_affected_items
            }
          }
        } = await context.wazuh.api.client.asCurrentUser.request('GET', `/groups/${groupID}/agents`, {
          params: {
            offset: agentsData.length,
            select: 'dateAdd,id,ip,lastKeepAlive,manager,name,os.name,os.version,version'
          }
        }, {
          apiHostID: apiId
        });
        !totalAgentsInGroup && (totalAgentsInGroup = total_affected_items);
        agentsData = [...agentsData, ...affected_items];
      } while (agentsData.length < totalAgentsInGroup);
    } else {
      for (const agentID of agentIDs) {
        try {
          const {
            data: {
              data: {
                affected_items: [agent]
              }
            }
          } = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents`, {
            params: {
              q: `id=${agentID}`,
              select: 'dateAdd,id,ip,lastKeepAlive,manager,name,os.name,os.version,version'
            }
          }, {
            apiHostID: apiId
          });
          agentsData.push(agent);
        } catch (error) {
          (0, _logger.log)('reporting:buildAgentsTable', `Skip agent due to: ${error.message || error}`, 'debug');
        }
      }
    }

    if (agentsData.length) {
      // Print a table with agent/s information
      printer.addSimpleTable({
        columns: [{
          id: 'id',
          label: 'ID'
        }, {
          id: 'name',
          label: 'Name'
        }, {
          id: 'ip',
          label: 'IP address'
        }, {
          id: 'version',
          label: 'Version'
        }, {
          id: 'manager',
          label: 'Manager'
        }, {
          id: 'os',
          label: 'Operating system'
        }, {
          id: 'dateAdd',
          label: 'Registration date'
        }, {
          id: 'lastKeepAlive',
          label: 'Last keep alive'
        }],
        items: agentsData.filter(agent => agent) // Remove undefined agents when Wazuh API no longer finds and agentID
        .map(agent => {
          return { ...agent,
            os: agent.os && agent.os.name && agent.os.version ? `${agent.os.name} ${agent.os.version}` : '',
            lastKeepAlive: (0, _moment.default)(agent.lastKeepAlive).format(dateFormat),
            dateAdd: (0, _moment.default)(agent.dateAdd).format(dateFormat)
          };
        })
      });
    } else if (!agentsData.length && groupID) {
      // For group reports when there is no agents in the group
      printer.addContent({
        text: 'There are no agents in this group.',
        style: {
          fontSize: 12,
          color: '#000'
        }
      });
    }
  } catch (error) {
    (0, _logger.log)('reporting:buildAgentsTable', error.message || error);
    return Promise.reject(error);
  }
}
/**
 * This load more information
 * @param {*} context Endpoint context
 * @param {*} printer printer instance
 * @param {String} section section target
 * @param {Object} tab tab target
 * @param {String} apiId ID of API
 * @param {Number} from Timestamp (ms) from
 * @param {Number} to Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @param {String} pattern
 * @param {Object} agent agent target
 * @returns {Object} Extended information
 */


async function extendedInformation(context, printer, section, tab, apiId, from, to, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern'), agent = null) {
  try {
    (0, _logger.log)('reporting:extendedInformation', `Section ${section} and tab ${tab}, API is ${apiId}. From ${from} to ${to}. Filters ${JSON.stringify(filters)}. Index pattern ${pattern}`, 'info');

    if (section === 'agents' && !agent) {
      throw new Error('Reporting for specific agent needs an agent ID in order to work properly');
    }

    const agents = await context.wazuh.api.client.asCurrentUser.request('GET', '/agents', {
      params: {
        limit: 1
      }
    }, {
      apiHostID: apiId
    });
    const totalAgents = agents.data.data.total_affected_items; //--- OVERVIEW - VULS

    if (section === 'overview' && tab === 'vuls') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching overview vulnerability detector metrics', 'debug');
      const vulnerabilitiesLevels = ['Low', 'Medium', 'High', 'Critical'];
      const vulnerabilitiesResponsesCount = (await Promise.all(vulnerabilitiesLevels.map(async vulnerabilitiesLevel => {
        try {
          const count = await VulnerabilityRequest.uniqueSeverityCount(context, from, to, vulnerabilitiesLevel, filters, allowedAgentsFilter, pattern);
          return count ? `${count} of ${totalAgents} agents have ${vulnerabilitiesLevel.toLocaleLowerCase()} vulnerabilities.` : undefined;
        } catch (error) {}
      }))).filter(vulnerabilitiesResponse => vulnerabilitiesResponse);
      printer.addList({
        title: {
          text: 'Summary',
          style: 'h2'
        },
        list: vulnerabilitiesResponsesCount
      });
      (0, _logger.log)('reporting:extendedInformation', 'Fetching overview vulnerability detector top 3 agents by category', 'debug');
      const lowRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Low', filters, allowedAgentsFilter, pattern);
      const mediumRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Medium', filters, allowedAgentsFilter, pattern);
      const highRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'High', filters, allowedAgentsFilter, pattern);
      const criticalRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Critical', filters, allowedAgentsFilter, pattern);
      (0, _logger.log)('reporting:extendedInformation', 'Adding overview vulnerability detector top 3 agents by category', 'debug');

      if (criticalRank && criticalRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with critical severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, criticalRank, apiId);
        printer.addNewLine();
      }

      if (highRank && highRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with high severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, highRank, apiId);
        printer.addNewLine();
      }

      if (mediumRank && mediumRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with medium severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, mediumRank, apiId);
        printer.addNewLine();
      }

      if (lowRank && lowRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with low severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, lowRank, apiId);
        printer.addNewLine();
      }

      (0, _logger.log)('reporting:extendedInformation', 'Fetching overview vulnerability detector top 3 CVEs', 'debug');
      const cveRank = await VulnerabilityRequest.topCVECount(context, from, to, filters, allowedAgentsFilter, pattern);
      (0, _logger.log)('reporting:extendedInformation', 'Adding overview vulnerability detector top 3 CVEs', 'debug');

      if (cveRank && cveRank.length) {
        printer.addSimpleTable({
          title: {
            text: 'Top 3 CVE',
            style: 'h2'
          },
          columns: [{
            id: 'top',
            label: 'Top'
          }, {
            id: 'cve',
            label: 'CVE'
          }],
          items: cveRank.map(item => ({
            top: cveRank.indexOf(item) + 1,
            cve: item
          }))
        });
      }
    } //--- OVERVIEW - GENERAL


    if (section === 'overview' && tab === 'general') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching top 3 agents with level 15 alerts', 'debug');
      const level15Rank = await OverviewRequest.topLevel15(context, from, to, filters, allowedAgentsFilter, pattern);
      (0, _logger.log)('reporting:extendedInformation', 'Adding top 3 agents with level 15 alerts', 'debug');

      if (level15Rank.length) {
        printer.addContent({
          text: 'Top 3 agents with level 15 alerts',
          style: 'h2'
        });
        await buildAgentsTable(context, printer, level15Rank, apiId);
      }
    } //--- OVERVIEW - PM


    if (section === 'overview' && tab === 'pm') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching most common rootkits', 'debug');
      const top5RootkitsRank = await RootcheckRequest.top5RootkitsDetected(context, from, to, filters, allowedAgentsFilter, pattern);
      (0, _logger.log)('reporting:extendedInformation', 'Adding most common rootkits', 'debug');

      if (top5RootkitsRank && top5RootkitsRank.length) {
        printer.addContentWithNewLine({
          text: 'Most common rootkits found among your agents',
          style: 'h2'
        }).addContentWithNewLine({
          text: 'Rootkits are a set of software tools that enable an unauthorized user to gain control of a computer system without being detected.',
          style: 'standard'
        }).addSimpleTable({
          items: top5RootkitsRank.map(item => {
            return {
              top: top5RootkitsRank.indexOf(item) + 1,
              name: item
            };
          }),
          columns: [{
            id: 'top',
            label: 'Top'
          }, {
            id: 'name',
            label: 'Rootkit'
          }]
        });
      }

      (0, _logger.log)('reporting:extendedInformation', 'Fetching hidden pids', 'debug');
      const hiddenPids = await RootcheckRequest.agentsWithHiddenPids(context, from, to, filters, allowedAgentsFilter, pattern);
      hiddenPids && printer.addContent({
        text: `${hiddenPids} of ${totalAgents} agents have hidden processes`,
        style: 'h3'
      });
      !hiddenPids && printer.addContentWithNewLine({
        text: `No agents have hidden processes`,
        style: 'h3'
      });
      const hiddenPorts = await RootcheckRequest.agentsWithHiddenPorts(context, from, to, filters, allowedAgentsFilter, pattern);
      hiddenPorts && printer.addContent({
        text: `${hiddenPorts} of ${totalAgents} agents have hidden ports`,
        style: 'h3'
      });
      !hiddenPorts && printer.addContent({
        text: `No agents have hidden ports`,
        style: 'h3'
      });
      printer.addNewLine();
    } //--- OVERVIEW/AGENTS - PCI


    if (['overview', 'agents'].includes(section) && tab === 'pci') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching top PCI DSS requirements', 'debug');
      const topPciRequirements = await PCIRequest.topPCIRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common PCI DSS requirements alerts found',
        style: 'h2'
      });

      for (const item of topPciRequirements) {
        const rules = await PCIRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });

        if (_pciRequirementsPdfmake.default[item]) {
          const content = typeof _pciRequirementsPdfmake.default[item] === 'string' ? {
            text: _pciRequirementsPdfmake.default[item],
            style: 'standard'
          } : _pciRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }

        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }
    } //--- OVERVIEW/AGENTS - TSC


    if (['overview', 'agents'].includes(section) && tab === 'tsc') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching top TSC requirements', 'debug');
      const topTSCRequirements = await TSCRequest.topTSCRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common TSC requirements alerts found',
        style: 'h2'
      });

      for (const item of topTSCRequirements) {
        const rules = await TSCRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });

        if (_tscRequirementsPdfmake.default[item]) {
          const content = typeof _tscRequirementsPdfmake.default[item] === 'string' ? {
            text: _tscRequirementsPdfmake.default[item],
            style: 'standard'
          } : _tscRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }

        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }
    } //--- OVERVIEW/AGENTS - GDPR


    if (['overview', 'agents'].includes(section) && tab === 'gdpr') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching top GDPR requirements', 'debug');
      const topGdprRequirements = await GDPRRequest.topGDPRRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common GDPR requirements alerts found',
        style: 'h2'
      });

      for (const item of topGdprRequirements) {
        const rules = await GDPRRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });

        if (_gdprRequirementsPdfmake.default && _gdprRequirementsPdfmake.default[item]) {
          const content = typeof _gdprRequirementsPdfmake.default[item] === 'string' ? {
            text: _gdprRequirementsPdfmake.default[item],
            style: 'standard'
          } : _gdprRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }

        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }

      printer.addNewLine();
    } //--- OVERVIEW - AUDIT


    if (section === 'overview' && tab === 'audit') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching agents with high number of failed sudo commands', 'debug');
      const auditAgentsNonSuccess = await AuditRequest.getTop3AgentsSudoNonSuccessful(context, from, to, filters, allowedAgentsFilter, pattern);

      if (auditAgentsNonSuccess && auditAgentsNonSuccess.length) {
        printer.addContent({
          text: 'Agents with high number of failed sudo commands',
          style: 'h2'
        });
        await buildAgentsTable(context, printer, auditAgentsNonSuccess, apiId);
      }

      const auditAgentsFailedSyscall = await AuditRequest.getTop3AgentsFailedSyscalls(context, from, to, filters, allowedAgentsFilter, pattern);

      if (auditAgentsFailedSyscall && auditAgentsFailedSyscall.length) {
        printer.addSimpleTable({
          columns: [{
            id: 'agent',
            label: 'Agent ID'
          }, {
            id: 'syscall_id',
            label: 'Syscall ID'
          }, {
            id: 'syscall_syscall',
            label: 'Syscall'
          }],
          items: auditAgentsFailedSyscall.map(item => ({
            agent: item.agent,
            syscall_id: item.syscall.id,
            syscall_syscall: item.syscall.syscall
          })),
          title: {
            text: 'Most common failing syscalls',
            style: 'h2'
          }
        });
      }
    } //--- OVERVIEW - FIM


    if (section === 'overview' && tab === 'fim') {
      (0, _logger.log)('reporting:extendedInformation', 'Fetching top 3 rules for FIM', 'debug');
      const rules = await SyscheckRequest.top3Rules(context, from, to, filters, allowedAgentsFilter, pattern);

      if (rules && rules.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 FIM rules',
          style: 'h2'
        }).addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: {
            text: 'Top 3 rules that are generating most alerts.',
            style: 'standard'
          }
        });
      }

      (0, _logger.log)('reporting:extendedInformation', 'Fetching top 3 agents for FIM', 'debug');
      const agents = await SyscheckRequest.top3agents(context, from, to, filters, allowedAgentsFilter, pattern);

      if (agents && agents.length) {
        printer.addContentWithNewLine({
          text: 'Agents with suspicious FIM activity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'Top 3 agents that have most FIM alerts from level 7 to level 15. Take care about them.',
          style: 'standard'
        });
        await buildAgentsTable(context, printer, agents, apiId);
      }
    } //--- AGENTS - AUDIT


    if (section === 'agents' && tab === 'audit') {
      (0, _logger.log)('reporting:extendedInformation', `Fetching most common failed syscalls`, 'debug');
      const auditFailedSyscall = await AuditRequest.getTopFailedSyscalls(context, from, to, filters, allowedAgentsFilter, pattern);
      auditFailedSyscall && auditFailedSyscall.length && printer.addSimpleTable({
        columns: [{
          id: 'id',
          label: 'id'
        }, {
          id: 'syscall',
          label: 'Syscall'
        }],
        items: auditFailedSyscall,
        title: 'Most common failing syscalls'
      });
    } //--- AGENTS - FIM


    if (section === 'agents' && tab === 'fim') {
      (0, _logger.log)('reporting:extendedInformation', `Fetching syscheck database for agent ${agent}`, 'debug');
      const lastScanResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/syscheck/${agent}/last_scan`, {}, {
        apiHostID: apiId
      });

      if (lastScanResponse && lastScanResponse.data) {
        const lastScanData = lastScanResponse.data.data.affected_items[0];

        if (lastScanData.start && lastScanData.end) {
          printer.addContent({
            text: `Last file integrity monitoring scan was executed from ${lastScanData.start} to ${lastScanData.end}.`
          });
        } else if (lastScanData.start) {
          printer.addContent({
            text: `File integrity monitoring scan is currently in progress for this agent (started on ${lastScanData.start}).`
          });
        } else {
          printer.addContent({
            text: `File integrity monitoring scan is currently in progress for this agent.`
          });
        }

        printer.addNewLine();
      }

      (0, _logger.log)('reporting:extendedInformation', `Fetching last 10 deleted files for FIM`, 'debug');
      const lastTenDeleted = await SyscheckRequest.lastTenDeletedFiles(context, from, to, filters, allowedAgentsFilter, pattern);
      lastTenDeleted && lastTenDeleted.length && printer.addSimpleTable({
        columns: [{
          id: 'path',
          label: 'Path'
        }, {
          id: 'date',
          label: 'Date'
        }],
        items: lastTenDeleted,
        title: 'Last 10 deleted files'
      });
      (0, _logger.log)('reporting:extendedInformation', `Fetching last 10 modified files`, 'debug');
      const lastTenModified = await SyscheckRequest.lastTenModifiedFiles(context, from, to, filters, allowedAgentsFilter, pattern);
      lastTenModified && lastTenModified.length && printer.addSimpleTable({
        columns: [{
          id: 'path',
          label: 'Path'
        }, {
          id: 'date',
          label: 'Date'
        }],
        items: lastTenModified,
        title: 'Last 10 modified files'
      });
    } //--- AGENTS - SYSCOLLECTOR


    if (section === 'agents' && tab === 'syscollector') {
      (0, _logger.log)('reporting:extendedInformation', `Fetching hardware information for agent ${agent}`, 'debug');
      const requestsSyscollectorLists = [{
        endpoint: `/syscollector/${agent}/hardware`,
        loggerMessage: `Fetching Hardware information for agent ${agent}`,
        list: {
          title: {
            text: 'Hardware information',
            style: 'h2'
          }
        },
        mapResponse: hardware => [hardware.cpu && hardware.cpu.cores && `${hardware.cpu.cores} cores`, hardware.cpu && hardware.cpu.name, hardware.ram && hardware.ram.total && `${Number(hardware.ram.total / 1024 / 1024).toFixed(2)}GB RAM`]
      }, {
        endpoint: `/syscollector/${agent}/os`,
        loggerMessage: `Fetching operating system information for agent ${agent}`,
        list: {
          title: {
            text: 'Operating system information',
            style: 'h2'
          }
        },
        mapResponse: osData => [osData.sysname, osData.version, osData.architecture, osData.release, osData.os && osData.os.name && osData.os.version && `${osData.os.name} ${osData.os.version}`]
      }];
      const syscollectorLists = await Promise.all(requestsSyscollectorLists.map(async requestSyscollector => {
        try {
          (0, _logger.log)('reporting:extendedInformation', requestSyscollector.loggerMessage, 'debug');
          const responseSyscollector = await context.wazuh.api.client.asCurrentUser.request('GET', requestSyscollector.endpoint, {}, {
            apiHostID: apiId
          });
          const [data] = responseSyscollector && responseSyscollector.data && responseSyscollector.data.data && responseSyscollector.data.data.affected_items || [];

          if (data) {
            return { ...requestSyscollector.list,
              list: requestSyscollector.mapResponse(data)
            };
          }
        } catch (error) {
          (0, _logger.log)('reporting:extendedInformation', error.message || error);
        }
      }));

      if (syscollectorLists) {
        syscollectorLists.filter(syscollectorList => syscollectorList).forEach(syscollectorList => printer.addList(syscollectorList));
      }

      const vulnerabilitiesRequests = ['Critical', 'High'];
      const vulnerabilitiesResponsesItems = (await Promise.all(vulnerabilitiesRequests.map(async vulnerabilitiesLevel => {
        try {
          (0, _logger.log)('reporting:extendedInformation', `Fetching top ${vulnerabilitiesLevel} packages`, 'debug');
          return await VulnerabilityRequest.topPackages(context, from, to, vulnerabilitiesLevel, filters, allowedAgentsFilter, pattern);
        } catch (error) {
          (0, _logger.log)('reporting:extendedInformation', error.message || error);
        }
      }))).filter(vulnerabilitiesResponse => vulnerabilitiesResponse).flat();

      if (vulnerabilitiesResponsesItems && vulnerabilitiesResponsesItems.length) {
        printer.addSimpleTable({
          title: {
            text: 'Vulnerable packages found (last 24 hours)',
            style: 'h2'
          },
          columns: [{
            id: 'package',
            label: 'Package'
          }, {
            id: 'severity',
            label: 'Severity'
          }],
          items: vulnerabilitiesResponsesItems
        });
      }
    } //--- AGENTS - VULNERABILITIES


    if (section === 'agents' && tab === 'vuls') {
      const topCriticalPackages = await VulnerabilityRequest.topPackagesWithCVE(context, from, to, 'Critical', filters, allowedAgentsFilter, pattern);

      if (topCriticalPackages && topCriticalPackages.length) {
        printer.addContentWithNewLine({
          text: 'Critical severity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'These vulnerabilties are critical, please review your agent. Click on each link to read more about each found vulnerability.',
          style: 'standard'
        });
        const customul = [];

        for (const critical of topCriticalPackages) {
          customul.push({
            text: critical.package,
            style: 'standard'
          });
          customul.push({
            ul: critical.references.map(item => ({
              text: item.substring(0, 80) + '...',
              link: item,
              color: '#1EA5C8'
            }))
          });
        }

        printer.addContentWithNewLine({
          ul: customul
        });
      }

      const topHighPackages = await VulnerabilityRequest.topPackagesWithCVE(context, from, to, 'High', filters, allowedAgentsFilter, pattern);

      if (topHighPackages && topHighPackages.length) {
        printer.addContentWithNewLine({
          text: 'High severity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'Click on each link to read more about each found vulnerability.',
          style: 'standard'
        });
        const customul = [];

        for (const critical of topHighPackages) {
          customul.push({
            text: critical.package,
            style: 'standard'
          });
          customul.push({
            ul: critical.references.map(item => ({
              text: item,
              color: '#1EA5C8'
            }))
          });
        }

        customul && customul.length && printer.addContent({
          ul: customul
        });
        printer.addNewLine();
      }
    } //--- SUMMARY TABLES


    let extraSummaryTables = [];

    if (Array.isArray(_summaryTablesDefinitions.default[section][tab])) {
      const tablesPromises = _summaryTablesDefinitions.default[section][tab].map(summaryTable => {
        (0, _logger.log)('reporting:AlertsTable', `Fetching ${summaryTable.title} Table`, 'debug');
        const alertsSummaryTable = new _summaryTable.default(context, from, to, filters, allowedAgentsFilter, summaryTable, pattern);
        return alertsSummaryTable.fetch();
      });

      extraSummaryTables = await Promise.all(tablesPromises);
    }

    return extraSummaryTables;
  } catch (error) {
    (0, _logger.log)('reporting:extendedInformation', error.message || error);
    return Promise.reject(error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuZGVkLWluZm9ybWF0aW9uLnRzIl0sIm5hbWVzIjpbImJ1aWxkQWdlbnRzVGFibGUiLCJjb250ZXh0IiwicHJpbnRlciIsImFnZW50SURzIiwiYXBpSWQiLCJncm91cElEIiwiZGF0ZUZvcm1hdCIsImNvcmUiLCJ1aVNldHRpbmdzIiwiY2xpZW50IiwiZ2V0IiwibGVuZ3RoIiwiYWdlbnRzRGF0YSIsInRvdGFsQWdlbnRzSW5Hcm91cCIsImRhdGEiLCJhZmZlY3RlZF9pdGVtcyIsInRvdGFsX2FmZmVjdGVkX2l0ZW1zIiwid2F6dWgiLCJhcGkiLCJhc0N1cnJlbnRVc2VyIiwicmVxdWVzdCIsInBhcmFtcyIsIm9mZnNldCIsInNlbGVjdCIsImFwaUhvc3RJRCIsImFnZW50SUQiLCJhZ2VudCIsInEiLCJwdXNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiYWRkU2ltcGxlVGFibGUiLCJjb2x1bW5zIiwiaWQiLCJsYWJlbCIsIml0ZW1zIiwiZmlsdGVyIiwibWFwIiwib3MiLCJuYW1lIiwidmVyc2lvbiIsImxhc3RLZWVwQWxpdmUiLCJmb3JtYXQiLCJkYXRlQWRkIiwiYWRkQ29udGVudCIsInRleHQiLCJzdHlsZSIsImZvbnRTaXplIiwiY29sb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZXh0ZW5kZWRJbmZvcm1hdGlvbiIsInNlY3Rpb24iLCJ0YWIiLCJmcm9tIiwidG8iLCJmaWx0ZXJzIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsInBhdHRlcm4iLCJKU09OIiwic3RyaW5naWZ5IiwiRXJyb3IiLCJhZ2VudHMiLCJsaW1pdCIsInRvdGFsQWdlbnRzIiwidnVsbmVyYWJpbGl0aWVzTGV2ZWxzIiwidnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzQ291bnQiLCJhbGwiLCJ2dWxuZXJhYmlsaXRpZXNMZXZlbCIsImNvdW50IiwiVnVsbmVyYWJpbGl0eVJlcXVlc3QiLCJ1bmlxdWVTZXZlcml0eUNvdW50IiwidG9Mb2NhbGVMb3dlckNhc2UiLCJ1bmRlZmluZWQiLCJ2dWxuZXJhYmlsaXRpZXNSZXNwb25zZSIsImFkZExpc3QiLCJ0aXRsZSIsImxpc3QiLCJsb3dSYW5rIiwidG9wQWdlbnRDb3VudCIsIm1lZGl1bVJhbmsiLCJoaWdoUmFuayIsImNyaXRpY2FsUmFuayIsImFkZENvbnRlbnRXaXRoTmV3TGluZSIsImFkZE5ld0xpbmUiLCJjdmVSYW5rIiwidG9wQ1ZFQ291bnQiLCJpdGVtIiwidG9wIiwiaW5kZXhPZiIsImN2ZSIsImxldmVsMTVSYW5rIiwiT3ZlcnZpZXdSZXF1ZXN0IiwidG9wTGV2ZWwxNSIsInRvcDVSb290a2l0c1JhbmsiLCJSb290Y2hlY2tSZXF1ZXN0IiwidG9wNVJvb3RraXRzRGV0ZWN0ZWQiLCJoaWRkZW5QaWRzIiwiYWdlbnRzV2l0aEhpZGRlblBpZHMiLCJoaWRkZW5Qb3J0cyIsImFnZW50c1dpdGhIaWRkZW5Qb3J0cyIsImluY2x1ZGVzIiwidG9wUGNpUmVxdWlyZW1lbnRzIiwiUENJUmVxdWVzdCIsInRvcFBDSVJlcXVpcmVtZW50cyIsInJ1bGVzIiwiZ2V0UnVsZXNCeVJlcXVpcmVtZW50IiwiUENJIiwiY29udGVudCIsInRvcFRTQ1JlcXVpcmVtZW50cyIsIlRTQ1JlcXVlc3QiLCJUU0MiLCJ0b3BHZHByUmVxdWlyZW1lbnRzIiwiR0RQUlJlcXVlc3QiLCJ0b3BHRFBSUmVxdWlyZW1lbnRzIiwiR0RQUiIsImF1ZGl0QWdlbnRzTm9uU3VjY2VzcyIsIkF1ZGl0UmVxdWVzdCIsImdldFRvcDNBZ2VudHNTdWRvTm9uU3VjY2Vzc2Z1bCIsImF1ZGl0QWdlbnRzRmFpbGVkU3lzY2FsbCIsImdldFRvcDNBZ2VudHNGYWlsZWRTeXNjYWxscyIsInN5c2NhbGxfaWQiLCJzeXNjYWxsIiwic3lzY2FsbF9zeXNjYWxsIiwiU3lzY2hlY2tSZXF1ZXN0IiwidG9wM1J1bGVzIiwidG9wM2FnZW50cyIsImF1ZGl0RmFpbGVkU3lzY2FsbCIsImdldFRvcEZhaWxlZFN5c2NhbGxzIiwibGFzdFNjYW5SZXNwb25zZSIsImxhc3RTY2FuRGF0YSIsInN0YXJ0IiwiZW5kIiwibGFzdFRlbkRlbGV0ZWQiLCJsYXN0VGVuRGVsZXRlZEZpbGVzIiwibGFzdFRlbk1vZGlmaWVkIiwibGFzdFRlbk1vZGlmaWVkRmlsZXMiLCJyZXF1ZXN0c1N5c2NvbGxlY3Rvckxpc3RzIiwiZW5kcG9pbnQiLCJsb2dnZXJNZXNzYWdlIiwibWFwUmVzcG9uc2UiLCJoYXJkd2FyZSIsImNwdSIsImNvcmVzIiwicmFtIiwidG90YWwiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwib3NEYXRhIiwic3lzbmFtZSIsImFyY2hpdGVjdHVyZSIsInJlbGVhc2UiLCJzeXNjb2xsZWN0b3JMaXN0cyIsInJlcXVlc3RTeXNjb2xsZWN0b3IiLCJyZXNwb25zZVN5c2NvbGxlY3RvciIsInN5c2NvbGxlY3Rvckxpc3QiLCJmb3JFYWNoIiwidnVsbmVyYWJpbGl0aWVzUmVxdWVzdHMiLCJ2dWxuZXJhYmlsaXRpZXNSZXNwb25zZXNJdGVtcyIsInRvcFBhY2thZ2VzIiwiZmxhdCIsInRvcENyaXRpY2FsUGFja2FnZXMiLCJ0b3BQYWNrYWdlc1dpdGhDVkUiLCJjdXN0b211bCIsImNyaXRpY2FsIiwicGFja2FnZSIsInVsIiwicmVmZXJlbmNlcyIsInN1YnN0cmluZyIsImxpbmsiLCJ0b3BIaWdoUGFja2FnZXMiLCJleHRyYVN1bW1hcnlUYWJsZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzdW1tYXJ5VGFibGVzRGVmaW5pdGlvbnMiLCJ0YWJsZXNQcm9taXNlcyIsInN1bW1hcnlUYWJsZSIsImFsZXJ0c1N1bW1hcnlUYWJsZSIsIlN1bW1hcnlUYWJsZSIsImZldGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxlQUFlQSxnQkFBZixDQUFnQ0MsT0FBaEMsRUFBeUNDLE9BQXpDLEVBQWlF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R0FBRyxJQUFJQyxxQkFBSixDQUN6QmpMLE9BRHlCLEVBRXpCcUQsSUFGeUIsRUFHekJDLEVBSHlCLEVBSXpCQyxPQUp5QixFQUt6QkMsbUJBTHlCLEVBTXpCdUgsWUFOeUIsRUFPekJ0SCxPQVB5QixDQUEzQjtBQVNBLGVBQU91SCxrQkFBa0IsQ0FBQ0UsS0FBbkIsRUFBUDtBQUNELE9BWnNCLENBQXZCOztBQWFBUixNQUFBQSxrQkFBa0IsR0FBRyxNQUFNMUgsT0FBTyxDQUFDa0IsR0FBUixDQUFZNEcsY0FBWixDQUEzQjtBQUNEOztBQUVELFdBQU9KLGtCQUFQO0FBQ0QsR0Fwd0JELENBb3dCRSxPQUFPOUksS0FBUCxFQUFjO0FBQ2QscUJBQUksK0JBQUosRUFBcUNBLEtBQUssQ0FBQ0MsT0FBTixJQUFpQkQsS0FBdEQ7QUFDQSxXQUFPb0IsT0FBTyxDQUFDQyxNQUFSLENBQWVyQixLQUFmLENBQVA7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBTdW1tYXJ5VGFibGUgZnJvbSAnLi9zdW1tYXJ5LXRhYmxlJztcbmltcG9ydCBzdW1tYXJ5VGFibGVzRGVmaW5pdGlvbnMgZnJvbSAnLi9zdW1tYXJ5LXRhYmxlcy1kZWZpbml0aW9ucyc7XG5pbXBvcnQgKiBhcyBWdWxuZXJhYmlsaXR5UmVxdWVzdCBmcm9tICcuL3Z1bG5lcmFiaWxpdHktcmVxdWVzdCc7XG5pbXBvcnQgKiBhcyBPdmVydmlld1JlcXVlc3QgZnJvbSAnLi9vdmVydmlldy1yZXF1ZXN0JztcbmltcG9ydCAqIGFzIFJvb3RjaGVja1JlcXVlc3QgZnJvbSAnLi9yb290Y2hlY2stcmVxdWVzdCc7XG5pbXBvcnQgKiBhcyBQQ0lSZXF1ZXN0IGZyb20gJy4vcGNpLXJlcXVlc3QnO1xuaW1wb3J0ICogYXMgR0RQUlJlcXVlc3QgZnJvbSAnLi9nZHByLXJlcXVlc3QnO1xuaW1wb3J0ICogYXMgVFNDUmVxdWVzdCBmcm9tICcuL3RzYy1yZXF1ZXN0JztcbmltcG9ydCAqIGFzIEF1ZGl0UmVxdWVzdCBmcm9tICcuL2F1ZGl0LXJlcXVlc3QnO1xuaW1wb3J0ICogYXMgU3lzY2hlY2tSZXF1ZXN0IGZyb20gJy4vc3lzY2hlY2stcmVxdWVzdCc7XG5pbXBvcnQgUENJIGZyb20gJy4uLy4uL2ludGVncmF0aW9uLWZpbGVzL3BjaS1yZXF1aXJlbWVudHMtcGRmbWFrZSc7XG5pbXBvcnQgR0RQUiBmcm9tICcuLi8uLi9pbnRlZ3JhdGlvbi1maWxlcy9nZHByLXJlcXVpcmVtZW50cy1wZGZtYWtlJztcbmltcG9ydCBUU0MgZnJvbSAnLi4vLi4vaW50ZWdyYXRpb24tZmlsZXMvdHNjLXJlcXVpcmVtZW50cy1wZGZtYWtlJztcbmltcG9ydCB7IFJlcG9ydFByaW50ZXIgfSBmcm9tICcuL3ByaW50ZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ0RlZmF1bHRWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9zZXR0aW5ncyc7XG5cblxuXG5cbi8qKlxuICAgKiBUaGlzIGJ1aWxkIHRoZSBhZ2VudHMgdGFibGVcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmdzPn0gaWRzIGlkcyBvZiBhZ2VudHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFwaUlkIEFQSSBpZFxuICAgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXI6IFJlcG9ydFByaW50ZXIsIGFnZW50SURzOiBzdHJpbmdbXSwgYXBpSWQ6IHN0cmluZywgZ3JvdXBJRDogc3RyaW5nID0gJycpIHtcbiAgY29uc3QgZGF0ZUZvcm1hdCA9IGF3YWl0IGNvbnRleHQuY29yZS51aVNldHRpbmdzLmNsaWVudC5nZXQoJ2RhdGVGb3JtYXQnKTtcbiAgaWYgKCghYWdlbnRJRHMgfHwgIWFnZW50SURzLmxlbmd0aCkgJiYgIWdyb3VwSUQpIHJldHVybjtcbiAgbG9nKCdyZXBvcnRpbmc6YnVpbGRBZ2VudHNUYWJsZScsIGAke2FnZW50SURzLmxlbmd0aH0gYWdlbnRzIGZvciBBUEkgJHthcGlJZH1gLCAnaW5mbycpO1xuICB0cnkge1xuICAgIGxldCBhZ2VudHNEYXRhID0gW107XG4gICAgaWYgKGdyb3VwSUQpIHtcbiAgICAgIGxldCB0b3RhbEFnZW50c0luR3JvdXAgPSBudWxsO1xuICAgICAgZG8ge1xuICAgICAgICBjb25zdCB7IGRhdGE6IHsgZGF0YTogeyBhZmZlY3RlZF9pdGVtcywgdG90YWxfYWZmZWN0ZWRfaXRlbXMgfSB9IH0gPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICdHRVQnLFxuICAgICAgICAgIGAvZ3JvdXBzLyR7Z3JvdXBJRH0vYWdlbnRzYCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiBhZ2VudHNEYXRhLmxlbmd0aCxcbiAgICAgICAgICAgICAgc2VsZWN0OiAnZGF0ZUFkZCxpZCxpcCxsYXN0S2VlcEFsaXZlLG1hbmFnZXIsbmFtZSxvcy5uYW1lLG9zLnZlcnNpb24sdmVyc2lvbicsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfVxuICAgICAgICApO1xuICAgICAgICAhdG90YWxBZ2VudHNJbkdyb3VwICYmICh0b3RhbEFnZW50c0luR3JvdXAgPSB0b3RhbF9hZmZlY3RlZF9pdGVtcyk7XG4gICAgICAgIGFnZW50c0RhdGEgPSBbLi4uYWdlbnRzRGF0YSwgLi4uYWZmZWN0ZWRfaXRlbXNdO1xuICAgICAgfSB3aGlsZSAoYWdlbnRzRGF0YS5sZW5ndGggPCB0b3RhbEFnZW50c0luR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGFnZW50SUQgb2YgYWdlbnRJRHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgZGF0YTogeyBhZmZlY3RlZF9pdGVtczogW2FnZW50XSB9IH0gfSA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgIGAvYWdlbnRzYCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgcTogYGlkPSR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogJ2RhdGVBZGQsaWQsaXAsbGFzdEtlZXBBbGl2ZSxtYW5hZ2VyLG5hbWUsb3MubmFtZSxvcy52ZXJzaW9uLHZlcnNpb24nLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUlkIH1cbiAgICAgICAgICApO1xuICAgICAgICAgIGFnZW50c0RhdGEucHVzaChhZ2VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nKFxuICAgICAgICAgICAgJ3JlcG9ydGluZzpidWlsZEFnZW50c1RhYmxlJyxcbiAgICAgICAgICAgIGBTa2lwIGFnZW50IGR1ZSB0bzogJHtlcnJvci5tZXNzYWdlIHx8IGVycm9yfWAsXG4gICAgICAgICAgICAnZGVidWcnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZ2VudHNEYXRhLmxlbmd0aCkge1xuICAgICAgLy8gUHJpbnQgYSB0YWJsZSB3aXRoIGFnZW50L3MgaW5mb3JtYXRpb25cbiAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgeyBpZDogJ2lkJywgbGFiZWw6ICdJRCcgfSxcbiAgICAgICAgICB7IGlkOiAnbmFtZScsIGxhYmVsOiAnTmFtZScgfSxcbiAgICAgICAgICB7IGlkOiAnaXAnLCBsYWJlbDogJ0lQIGFkZHJlc3MnIH0sXG4gICAgICAgICAgeyBpZDogJ3ZlcnNpb24nLCBsYWJlbDogJ1ZlcnNpb24nIH0sXG4gICAgICAgICAgeyBpZDogJ21hbmFnZXInLCBsYWJlbDogJ01hbmFnZXInIH0sXG4gICAgICAgICAgeyBpZDogJ29zJywgbGFiZWw6ICdPcGVyYXRpbmcgc3lzdGVtJyB9LFxuICAgICAgICAgIHsgaWQ6ICdkYXRlQWRkJywgbGFiZWw6ICdSZWdpc3RyYXRpb24gZGF0ZScgfSxcbiAgICAgICAgICB7IGlkOiAnbGFzdEtlZXBBbGl2ZScsIGxhYmVsOiAnTGFzdCBrZWVwIGFsaXZlJyB9LFxuICAgICAgICBdLFxuICAgICAgICBpdGVtczogYWdlbnRzRGF0YVxuICAgICAgICAgIC5maWx0ZXIoYWdlbnQgPT4gYWdlbnQpIC8vIFJlbW92ZSB1bmRlZmluZWQgYWdlbnRzIHdoZW4gV2F6dWggQVBJIG5vIGxvbmdlciBmaW5kcyBhbmQgYWdlbnRJRFxuICAgICAgICAgIC5tYXAoKGFnZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5hZ2VudCxcbiAgICAgICAgICAgICAgb3M6IChhZ2VudC5vcyAmJiBhZ2VudC5vcy5uYW1lICYmIGFnZW50Lm9zLnZlcnNpb24pID8gYCR7YWdlbnQub3MubmFtZX0gJHthZ2VudC5vcy52ZXJzaW9ufWAgOiAnJyxcbiAgICAgICAgICAgICAgbGFzdEtlZXBBbGl2ZTogbW9tZW50KGFnZW50Lmxhc3RLZWVwQWxpdmUpLmZvcm1hdChkYXRlRm9ybWF0KSxcbiAgICAgICAgICAgICAgZGF0ZUFkZDogbW9tZW50KGFnZW50LmRhdGVBZGQpLmZvcm1hdChkYXRlRm9ybWF0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghYWdlbnRzRGF0YS5sZW5ndGggJiYgZ3JvdXBJRCkge1xuICAgICAgLy8gRm9yIGdyb3VwIHJlcG9ydHMgd2hlbiB0aGVyZSBpcyBubyBhZ2VudHMgaW4gdGhlIGdyb3VwXG4gICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICB0ZXh0OiAnVGhlcmUgYXJlIG5vIGFnZW50cyBpbiB0aGlzIGdyb3VwLicsXG4gICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiAxMiwgY29sb3I6ICcjMDAwJyB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdyZXBvcnRpbmc6YnVpbGRBZ2VudHNUYWJsZScsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGxvYWQgbW9yZSBpbmZvcm1hdGlvblxuICogQHBhcmFtIHsqfSBjb250ZXh0IEVuZHBvaW50IGNvbnRleHRcbiAqIEBwYXJhbSB7Kn0gcHJpbnRlciBwcmludGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VjdGlvbiBzZWN0aW9uIHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHRhYiB0YWIgdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gYXBpSWQgSUQgb2YgQVBJXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbSBUaW1lc3RhbXAgKG1zKSBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gdG8gVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYWdlbnQgYWdlbnQgdGFyZ2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBFeHRlbmRlZCBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXh0ZW5kZWRJbmZvcm1hdGlvbihcbiAgY29udGV4dCxcbiAgcHJpbnRlcixcbiAgc2VjdGlvbixcbiAgdGFiLFxuICBhcGlJZCxcbiAgZnJvbSxcbiAgdG8sXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4gPSBnZXRTZXR0aW5nRGVmYXVsdFZhbHVlKCdwYXR0ZXJuJyksXG4gIGFnZW50ID0gbnVsbCxcbikge1xuICB0cnkge1xuICAgIGxvZyhcbiAgICAgICdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsXG4gICAgICBgU2VjdGlvbiAke3NlY3Rpb259IGFuZCB0YWIgJHt0YWJ9LCBBUEkgaXMgJHthcGlJZH0uIEZyb20gJHtmcm9tfSB0byAke3RvfS4gRmlsdGVycyAke0pTT04uc3RyaW5naWZ5KGZpbHRlcnMpfS4gSW5kZXggcGF0dGVybiAke3BhdHRlcm59YCxcbiAgICAgICdpbmZvJ1xuICAgICk7XG4gICAgaWYgKHNlY3Rpb24gPT09ICdhZ2VudHMnICYmICFhZ2VudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXBvcnRpbmcgZm9yIHNwZWNpZmljIGFnZW50IG5lZWRzIGFuIGFnZW50IElEIGluIG9yZGVyIHRvIHdvcmsgcHJvcGVybHknKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudHMgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgJ0dFVCcsXG4gICAgICAnL2FnZW50cycsXG4gICAgICB7IHBhcmFtczogeyBsaW1pdDogMSB9IH0sXG4gICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfVxuICAgICk7XG5cbiAgICBjb25zdCB0b3RhbEFnZW50cyA9IGFnZW50cy5kYXRhLmRhdGEudG90YWxfYWZmZWN0ZWRfaXRlbXM7XG5cbiAgICAvLy0tLSBPVkVSVklFVyAtIFZVTFNcbiAgICBpZiAoc2VjdGlvbiA9PT0gJ292ZXJ2aWV3JyAmJiB0YWIgPT09ICd2dWxzJykge1xuICAgICAgbG9nKFxuICAgICAgICAncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLFxuICAgICAgICAnRmV0Y2hpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciBtZXRyaWNzJyxcbiAgICAgICAgJ2RlYnVnJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHZ1bG5lcmFiaWxpdGllc0xldmVscyA9IFsnTG93JywgJ01lZGl1bScsICdIaWdoJywgJ0NyaXRpY2FsJ107XG5cbiAgICAgIGNvbnN0IHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlc0NvdW50ID0gKFxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICB2dWxuZXJhYmlsaXRpZXNMZXZlbHMubWFwKGFzeW5jICh2dWxuZXJhYmlsaXRpZXNMZXZlbCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBWdWxuZXJhYmlsaXR5UmVxdWVzdC51bmlxdWVTZXZlcml0eUNvdW50KFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgICB2dWxuZXJhYmlsaXRpZXNMZXZlbCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgICAgICAgICAgcGF0dGVyblxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gY291bnRcbiAgICAgICAgICAgICAgICA/IGAke2NvdW50fSBvZiAke3RvdGFsQWdlbnRzfSBhZ2VudHMgaGF2ZSAke3Z1bG5lcmFiaWxpdGllc0xldmVsLnRvTG9jYWxlTG93ZXJDYXNlKCl9IHZ1bG5lcmFiaWxpdGllcy5gXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKS5maWx0ZXIoKHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlKSA9PiB2dWxuZXJhYmlsaXRpZXNSZXNwb25zZSk7XG5cbiAgICAgIHByaW50ZXIuYWRkTGlzdCh7XG4gICAgICAgIHRpdGxlOiB7IHRleHQ6ICdTdW1tYXJ5Jywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgbGlzdDogdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzQ291bnQsXG4gICAgICB9KTtcblxuICAgICAgbG9nKFxuICAgICAgICAncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLFxuICAgICAgICAnRmV0Y2hpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciB0b3AgMyBhZ2VudHMgYnkgY2F0ZWdvcnknLFxuICAgICAgICAnZGVidWcnXG4gICAgICApO1xuICAgICAgY29uc3QgbG93UmFuayA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcEFnZW50Q291bnQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICAnTG93JyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lZGl1bVJhbmsgPSBhd2FpdCBWdWxuZXJhYmlsaXR5UmVxdWVzdC50b3BBZ2VudENvdW50KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgJ01lZGl1bScsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm5cbiAgICAgICk7XG4gICAgICBjb25zdCBoaWdoUmFuayA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcEFnZW50Q291bnQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICAnSGlnaCcsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm5cbiAgICAgICk7XG4gICAgICBjb25zdCBjcml0aWNhbFJhbmsgPSBhd2FpdCBWdWxuZXJhYmlsaXR5UmVxdWVzdC50b3BBZ2VudENvdW50KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgJ0NyaXRpY2FsJyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJyxcbiAgICAgICAgJ0FkZGluZyBvdmVydmlldyB2dWxuZXJhYmlsaXR5IGRldGVjdG9yIHRvcCAzIGFnZW50cyBieSBjYXRlZ29yeScsXG4gICAgICAgICdkZWJ1ZydcbiAgICAgICk7XG4gICAgICBpZiAoY3JpdGljYWxSYW5rICYmIGNyaXRpY2FsUmFuay5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6ICdUb3AgMyBhZ2VudHMgd2l0aCBjcml0aWNhbCBzZXZlcml0eSB2dWxuZXJhYmlsaXRpZXMnLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBjcml0aWNhbFJhbmssIGFwaUlkKTtcbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoaWdoUmFuayAmJiBoaWdoUmFuay5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6ICdUb3AgMyBhZ2VudHMgd2l0aCBoaWdoIHNldmVyaXR5IHZ1bG5lcmFiaWxpdGllcycsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIGhpZ2hSYW5rLCBhcGlJZCk7XG4gICAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaXVtUmFuayAmJiBtZWRpdW1SYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB3aXRoIG1lZGl1bSBzZXZlcml0eSB2dWxuZXJhYmlsaXRpZXMnLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBtZWRpdW1SYW5rLCBhcGlJZCk7XG4gICAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAobG93UmFuayAmJiBsb3dSYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB3aXRoIGxvdyBzZXZlcml0eSB2dWxuZXJhYmlsaXRpZXMnLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBsb3dSYW5rLCBhcGlJZCk7XG4gICAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgICAgfVxuXG4gICAgICBsb2coXG4gICAgICAgICdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsXG4gICAgICAgICdGZXRjaGluZyBvdmVydmlldyB2dWxuZXJhYmlsaXR5IGRldGVjdG9yIHRvcCAzIENWRXMnLFxuICAgICAgICAnZGVidWcnXG4gICAgICApO1xuICAgICAgY29uc3QgY3ZlUmFuayA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcENWRUNvdW50KGNvbnRleHQsIGZyb20sIHRvLCBmaWx0ZXJzLCBhbGxvd2VkQWdlbnRzRmlsdGVyLCBwYXR0ZXJuKTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJyxcbiAgICAgICAgJ0FkZGluZyBvdmVydmlldyB2dWxuZXJhYmlsaXR5IGRldGVjdG9yIHRvcCAzIENWRXMnLFxuICAgICAgICAnZGVidWcnXG4gICAgICApO1xuICAgICAgaWYgKGN2ZVJhbmsgJiYgY3ZlUmFuay5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgdGl0bGU6IHsgdGV4dDogJ1RvcCAzIENWRScsIHN0eWxlOiAnaDInIH0sXG4gICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgeyBpZDogJ3RvcCcsIGxhYmVsOiAnVG9wJyB9LFxuICAgICAgICAgICAgeyBpZDogJ2N2ZScsIGxhYmVsOiAnQ1ZFJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IGN2ZVJhbmsubWFwKChpdGVtKSA9PiAoeyB0b3A6IGN2ZVJhbmsuaW5kZXhPZihpdGVtKSArIDEsIGN2ZTogaXRlbSB9KSksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIE9WRVJWSUVXIC0gR0VORVJBTFxuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICBsb2coJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJywgJ0ZldGNoaW5nIHRvcCAzIGFnZW50cyB3aXRoIGxldmVsIDE1IGFsZXJ0cycsICdkZWJ1ZycpO1xuXG4gICAgICBjb25zdCBsZXZlbDE1UmFuayA9IGF3YWl0IE92ZXJ2aWV3UmVxdWVzdC50b3BMZXZlbDE1KGNvbnRleHQsIGZyb20sIHRvLCBmaWx0ZXJzLCBhbGxvd2VkQWdlbnRzRmlsdGVyLCBwYXR0ZXJuKTtcblxuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdBZGRpbmcgdG9wIDMgYWdlbnRzIHdpdGggbGV2ZWwgMTUgYWxlcnRzJywgJ2RlYnVnJyk7XG4gICAgICBpZiAobGV2ZWwxNVJhbmsubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB3aXRoIGxldmVsIDE1IGFsZXJ0cycsXG4gICAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIGxldmVsMTVSYW5rLCBhcGlJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcgLSBQTVxuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ3BtJykge1xuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdGZXRjaGluZyBtb3N0IGNvbW1vbiByb290a2l0cycsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgdG9wNVJvb3RraXRzUmFuayA9IGF3YWl0IFJvb3RjaGVja1JlcXVlc3QudG9wNVJvb3RraXRzRGV0ZWN0ZWQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICApO1xuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdBZGRpbmcgbW9zdCBjb21tb24gcm9vdGtpdHMnLCAnZGVidWcnKTtcbiAgICAgIGlmICh0b3A1Um9vdGtpdHNSYW5rICYmIHRvcDVSb290a2l0c1JhbmsubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXJcbiAgICAgICAgICAuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICAgIHRleHQ6ICdNb3N0IGNvbW1vbiByb290a2l0cyBmb3VuZCBhbW9uZyB5b3VyIGFnZW50cycsXG4gICAgICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgJ1Jvb3RraXRzIGFyZSBhIHNldCBvZiBzb2Z0d2FyZSB0b29scyB0aGF0IGVuYWJsZSBhbiB1bmF1dGhvcml6ZWQgdXNlciB0byBnYWluIGNvbnRyb2wgb2YgYSBjb21wdXRlciBzeXN0ZW0gd2l0aG91dCBiZWluZyBkZXRlY3RlZC4nLFxuICAgICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgICAgaXRlbXM6IHRvcDVSb290a2l0c1JhbmsubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7IHRvcDogdG9wNVJvb3RraXRzUmFuay5pbmRleE9mKGl0ZW0pICsgMSwgbmFtZTogaXRlbSB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6ICd0b3AnLCBsYWJlbDogJ1RvcCcgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ1Jvb3RraXQnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdGZXRjaGluZyBoaWRkZW4gcGlkcycsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgaGlkZGVuUGlkcyA9IGF3YWl0IFJvb3RjaGVja1JlcXVlc3QuYWdlbnRzV2l0aEhpZGRlblBpZHMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICApO1xuICAgICAgaGlkZGVuUGlkcyAmJlxuICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgIHRleHQ6IGAke2hpZGRlblBpZHN9IG9mICR7dG90YWxBZ2VudHN9IGFnZW50cyBoYXZlIGhpZGRlbiBwcm9jZXNzZXNgLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcbiAgICAgICFoaWRkZW5QaWRzICYmXG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiBgTm8gYWdlbnRzIGhhdmUgaGlkZGVuIHByb2Nlc3Nlc2AsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuXG4gICAgICBjb25zdCBoaWRkZW5Qb3J0cyA9IGF3YWl0IFJvb3RjaGVja1JlcXVlc3QuYWdlbnRzV2l0aEhpZGRlblBvcnRzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIGhpZGRlblBvcnRzICYmXG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgdGV4dDogYCR7aGlkZGVuUG9ydHN9IG9mICR7dG90YWxBZ2VudHN9IGFnZW50cyBoYXZlIGhpZGRlbiBwb3J0c2AsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgIWhpZGRlblBvcnRzICYmXG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgdGV4dDogYE5vIGFnZW50cyBoYXZlIGhpZGRlbiBwb3J0c2AsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcvQUdFTlRTIC0gUENJXG4gICAgaWYgKFsnb3ZlcnZpZXcnLCAnYWdlbnRzJ10uaW5jbHVkZXMoc2VjdGlvbikgJiYgdGFiID09PSAncGNpJykge1xuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdGZXRjaGluZyB0b3AgUENJIERTUyByZXF1aXJlbWVudHMnLCAnZGVidWcnKTtcbiAgICAgIGNvbnN0IHRvcFBjaVJlcXVpcmVtZW50cyA9IGF3YWl0IFBDSVJlcXVlc3QudG9wUENJUmVxdWlyZW1lbnRzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgdGV4dDogJ01vc3QgY29tbW9uIFBDSSBEU1MgcmVxdWlyZW1lbnRzIGFsZXJ0cyBmb3VuZCcsXG4gICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgfSk7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdG9wUGNpUmVxdWlyZW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gYXdhaXQgUENJUmVxdWVzdC5nZXRSdWxlc0J5UmVxdWlyZW1lbnQoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHRvLFxuICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIHBhdHRlcm5cbiAgICAgICAgKTtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoeyB0ZXh0OiBgUmVxdWlyZW1lbnQgJHtpdGVtfWAsIHN0eWxlOiAnaDMnIH0pO1xuXG4gICAgICAgIGlmIChQQ0lbaXRlbV0pIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID1cbiAgICAgICAgICAgIHR5cGVvZiBQQ0lbaXRlbV0gPT09ICdzdHJpbmcnID8geyB0ZXh0OiBQQ0lbaXRlbV0sIHN0eWxlOiAnc3RhbmRhcmQnIH0gOiBQQ0lbaXRlbV07XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBydWxlcyAmJlxuICAgICAgICAgIHJ1bGVzLmxlbmd0aCAmJlxuICAgICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICB7IGlkOiAncnVsZUlEJywgbGFiZWw6ICdSdWxlIElEJyB9LFxuICAgICAgICAgICAgICB7IGlkOiAncnVsZURlc2NyaXB0aW9uJywgbGFiZWw6ICdEZXNjcmlwdGlvbicgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpdGVtczogcnVsZXMsXG4gICAgICAgICAgICB0aXRsZTogYFRvcCBydWxlcyBmb3IgJHtpdGVtfSByZXF1aXJlbWVudGAsXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcvQUdFTlRTIC0gVFNDXG4gICAgaWYgKFsnb3ZlcnZpZXcnLCAnYWdlbnRzJ10uaW5jbHVkZXMoc2VjdGlvbikgJiYgdGFiID09PSAndHNjJykge1xuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdGZXRjaGluZyB0b3AgVFNDIHJlcXVpcmVtZW50cycsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgdG9wVFNDUmVxdWlyZW1lbnRzID0gYXdhaXQgVFNDUmVxdWVzdC50b3BUU0NSZXF1aXJlbWVudHMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICApO1xuICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICB0ZXh0OiAnTW9zdCBjb21tb24gVFNDIHJlcXVpcmVtZW50cyBhbGVydHMgZm91bmQnLFxuICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgIH0pO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRvcFRTQ1JlcXVpcmVtZW50cykge1xuICAgICAgICBjb25zdCBydWxlcyA9IGF3YWl0IFRTQ1JlcXVlc3QuZ2V0UnVsZXNCeVJlcXVpcmVtZW50KFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgZnJvbSxcbiAgICAgICAgICB0byxcbiAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgICAgaXRlbSxcbiAgICAgICAgICBwYXR0ZXJuXG4gICAgICAgICk7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHsgdGV4dDogYFJlcXVpcmVtZW50ICR7aXRlbX1gLCBzdHlsZTogJ2gzJyB9KTtcblxuICAgICAgICBpZiAoVFNDW2l0ZW1dKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9XG4gICAgICAgICAgICB0eXBlb2YgVFNDW2l0ZW1dID09PSAnc3RyaW5nJyA/IHsgdGV4dDogVFNDW2l0ZW1dLCBzdHlsZTogJ3N0YW5kYXJkJyB9IDogVFNDW2l0ZW1dO1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcnVsZXMgJiZcbiAgICAgICAgICBydWxlcy5sZW5ndGggJiZcbiAgICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgeyBpZDogJ3J1bGVJRCcsIGxhYmVsOiAnUnVsZSBJRCcgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ3J1bGVEZXNjcmlwdGlvbicsIGxhYmVsOiAnRGVzY3JpcHRpb24nIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaXRlbXM6IHJ1bGVzLFxuICAgICAgICAgICAgdGl0bGU6IGBUb3AgcnVsZXMgZm9yICR7aXRlbX0gcmVxdWlyZW1lbnRgLFxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIE9WRVJWSUVXL0FHRU5UUyAtIEdEUFJcbiAgICBpZiAoWydvdmVydmlldycsICdhZ2VudHMnXS5pbmNsdWRlcyhzZWN0aW9uKSAmJiB0YWIgPT09ICdnZHByJykge1xuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsICdGZXRjaGluZyB0b3AgR0RQUiByZXF1aXJlbWVudHMnLCAnZGVidWcnKTtcbiAgICAgIGNvbnN0IHRvcEdkcHJSZXF1aXJlbWVudHMgPSBhd2FpdCBHRFBSUmVxdWVzdC50b3BHRFBSUmVxdWlyZW1lbnRzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgdGV4dDogJ01vc3QgY29tbW9uIEdEUFIgcmVxdWlyZW1lbnRzIGFsZXJ0cyBmb3VuZCcsXG4gICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgfSk7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdG9wR2RwclJlcXVpcmVtZW50cykge1xuICAgICAgICBjb25zdCBydWxlcyA9IGF3YWl0IEdEUFJSZXF1ZXN0LmdldFJ1bGVzQnlSZXF1aXJlbWVudChcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIGZyb20sXG4gICAgICAgICAgdG8sXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgcGF0dGVyblxuICAgICAgICApO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7IHRleHQ6IGBSZXF1aXJlbWVudCAke2l0ZW19YCwgc3R5bGU6ICdoMycgfSk7XG5cbiAgICAgICAgaWYgKEdEUFIgJiYgR0RQUltpdGVtXSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPVxuICAgICAgICAgICAgdHlwZW9mIEdEUFJbaXRlbV0gPT09ICdzdHJpbmcnID8geyB0ZXh0OiBHRFBSW2l0ZW1dLCBzdHlsZTogJ3N0YW5kYXJkJyB9IDogR0RQUltpdGVtXTtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGVzICYmXG4gICAgICAgICAgcnVsZXMubGVuZ3RoICYmXG4gICAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlSUQnLCBsYWJlbDogJ1J1bGUgSUQnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlRGVzY3JpcHRpb24nLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGl0ZW1zOiBydWxlcyxcbiAgICAgICAgICAgIHRpdGxlOiBgVG9wIHJ1bGVzIGZvciAke2l0ZW19IHJlcXVpcmVtZW50YCxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgIH1cblxuICAgIC8vLS0tIE9WRVJWSUVXIC0gQVVESVRcbiAgICBpZiAoc2VjdGlvbiA9PT0gJ292ZXJ2aWV3JyAmJiB0YWIgPT09ICdhdWRpdCcpIHtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJyxcbiAgICAgICAgJ0ZldGNoaW5nIGFnZW50cyB3aXRoIGhpZ2ggbnVtYmVyIG9mIGZhaWxlZCBzdWRvIGNvbW1hbmRzJyxcbiAgICAgICAgJ2RlYnVnJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGF1ZGl0QWdlbnRzTm9uU3VjY2VzcyA9IGF3YWl0IEF1ZGl0UmVxdWVzdC5nZXRUb3AzQWdlbnRzU3Vkb05vblN1Y2Nlc3NmdWwoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICApO1xuICAgICAgaWYgKGF1ZGl0QWdlbnRzTm9uU3VjY2VzcyAmJiBhdWRpdEFnZW50c05vblN1Y2Nlc3MubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgdGV4dDogJ0FnZW50cyB3aXRoIGhpZ2ggbnVtYmVyIG9mIGZhaWxlZCBzdWRvIGNvbW1hbmRzJyxcbiAgICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGJ1aWxkQWdlbnRzVGFibGUoY29udGV4dCwgcHJpbnRlciwgYXVkaXRBZ2VudHNOb25TdWNjZXNzLCBhcGlJZCk7XG4gICAgICB9XG4gICAgICBjb25zdCBhdWRpdEFnZW50c0ZhaWxlZFN5c2NhbGwgPSBhd2FpdCBBdWRpdFJlcXVlc3QuZ2V0VG9wM0FnZW50c0ZhaWxlZFN5c2NhbGxzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIGlmIChhdWRpdEFnZW50c0ZhaWxlZFN5c2NhbGwgJiYgYXVkaXRBZ2VudHNGYWlsZWRTeXNjYWxsLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAnYWdlbnQnLCBsYWJlbDogJ0FnZW50IElEJyB9LFxuICAgICAgICAgICAgeyBpZDogJ3N5c2NhbGxfaWQnLCBsYWJlbDogJ1N5c2NhbGwgSUQnIH0sXG4gICAgICAgICAgICB7IGlkOiAnc3lzY2FsbF9zeXNjYWxsJywgbGFiZWw6ICdTeXNjYWxsJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IGF1ZGl0QWdlbnRzRmFpbGVkU3lzY2FsbC5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgICAgICBhZ2VudDogaXRlbS5hZ2VudCxcbiAgICAgICAgICAgIHN5c2NhbGxfaWQ6IGl0ZW0uc3lzY2FsbC5pZCxcbiAgICAgICAgICAgIHN5c2NhbGxfc3lzY2FsbDogaXRlbS5zeXNjYWxsLnN5c2NhbGwsXG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0ZXh0OiAnTW9zdCBjb21tb24gZmFpbGluZyBzeXNjYWxscycsXG4gICAgICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tLSBPVkVSVklFVyAtIEZJTVxuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ2ZpbScpIHtcbiAgICAgIGxvZygncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLCAnRmV0Y2hpbmcgdG9wIDMgcnVsZXMgZm9yIEZJTScsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgcnVsZXMgPSBhd2FpdCBTeXNjaGVja1JlcXVlc3QudG9wM1J1bGVzKGNvbnRleHQsIGZyb20sIHRvLCBmaWx0ZXJzLCBhbGxvd2VkQWdlbnRzRmlsdGVyLCBwYXR0ZXJuKTtcblxuICAgICAgaWYgKHJ1bGVzICYmIHJ1bGVzLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7IHRleHQ6ICdUb3AgMyBGSU0gcnVsZXMnLCBzdHlsZTogJ2gyJyB9KS5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgeyBpZDogJ3J1bGVJRCcsIGxhYmVsOiAnUnVsZSBJRCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdydWxlRGVzY3JpcHRpb24nLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IHJ1bGVzLFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0ZXh0OiAnVG9wIDMgcnVsZXMgdGhhdCBhcmUgZ2VuZXJhdGluZyBtb3N0IGFsZXJ0cy4nLFxuICAgICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxvZygncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLCAnRmV0Y2hpbmcgdG9wIDMgYWdlbnRzIGZvciBGSU0nLCAnZGVidWcnKTtcbiAgICAgIGNvbnN0IGFnZW50cyA9IGF3YWl0IFN5c2NoZWNrUmVxdWVzdC50b3AzYWdlbnRzKGNvbnRleHQsIGZyb20sIHRvLCBmaWx0ZXJzLCBhbGxvd2VkQWdlbnRzRmlsdGVyLCBwYXR0ZXJuKTtcblxuICAgICAgaWYgKGFnZW50cyAmJiBhZ2VudHMubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiAnQWdlbnRzIHdpdGggc3VzcGljaW91cyBGSU0gYWN0aXZpdHknLFxuICAgICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgICB9KTtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAnVG9wIDMgYWdlbnRzIHRoYXQgaGF2ZSBtb3N0IEZJTSBhbGVydHMgZnJvbSBsZXZlbCA3IHRvIGxldmVsIDE1LiBUYWtlIGNhcmUgYWJvdXQgdGhlbS4nLFxuICAgICAgICAgIHN0eWxlOiAnc3RhbmRhcmQnLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBhZ2VudHMsIGFwaUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tLSBBR0VOVFMgLSBBVURJVFxuICAgIGlmIChzZWN0aW9uID09PSAnYWdlbnRzJyAmJiB0YWIgPT09ICdhdWRpdCcpIHtcbiAgICAgIGxvZygncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLCBgRmV0Y2hpbmcgbW9zdCBjb21tb24gZmFpbGVkIHN5c2NhbGxzYCwgJ2RlYnVnJyk7XG4gICAgICBjb25zdCBhdWRpdEZhaWxlZFN5c2NhbGwgPSBhd2FpdCBBdWRpdFJlcXVlc3QuZ2V0VG9wRmFpbGVkU3lzY2FsbHMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICApO1xuICAgICAgYXVkaXRGYWlsZWRTeXNjYWxsICYmXG4gICAgICAgIGF1ZGl0RmFpbGVkU3lzY2FsbC5sZW5ndGggJiZcbiAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgeyBpZDogJ2lkJywgbGFiZWw6ICdpZCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdzeXNjYWxsJywgbGFiZWw6ICdTeXNjYWxsJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IGF1ZGl0RmFpbGVkU3lzY2FsbCxcbiAgICAgICAgICB0aXRsZTogJ01vc3QgY29tbW9uIGZhaWxpbmcgc3lzY2FsbHMnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy0tLSBBR0VOVFMgLSBGSU1cbiAgICBpZiAoc2VjdGlvbiA9PT0gJ2FnZW50cycgJiYgdGFiID09PSAnZmltJykge1xuICAgICAgbG9nKFxuICAgICAgICAncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLFxuICAgICAgICBgRmV0Y2hpbmcgc3lzY2hlY2sgZGF0YWJhc2UgZm9yIGFnZW50ICR7YWdlbnR9YCxcbiAgICAgICAgJ2RlYnVnJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgbGFzdFNjYW5SZXNwb25zZSA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICdHRVQnLFxuICAgICAgICBgL3N5c2NoZWNrLyR7YWdlbnR9L2xhc3Rfc2NhbmAsXG4gICAgICAgIHt9LFxuICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfVxuICAgICAgKTtcblxuICAgICAgaWYgKGxhc3RTY2FuUmVzcG9uc2UgJiYgbGFzdFNjYW5SZXNwb25zZS5kYXRhKSB7XG4gICAgICAgIGNvbnN0IGxhc3RTY2FuRGF0YSA9IGxhc3RTY2FuUmVzcG9uc2UuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zWzBdO1xuICAgICAgICBpZiAobGFzdFNjYW5EYXRhLnN0YXJ0ICYmIGxhc3RTY2FuRGF0YS5lbmQpIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgdGV4dDogYExhc3QgZmlsZSBpbnRlZ3JpdHkgbW9uaXRvcmluZyBzY2FuIHdhcyBleGVjdXRlZCBmcm9tICR7bGFzdFNjYW5EYXRhLnN0YXJ0fSB0byAke2xhc3RTY2FuRGF0YS5lbmR9LmAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFNjYW5EYXRhLnN0YXJ0KSB7XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgIHRleHQ6IGBGaWxlIGludGVncml0eSBtb25pdG9yaW5nIHNjYW4gaXMgY3VycmVudGx5IGluIHByb2dyZXNzIGZvciB0aGlzIGFnZW50IChzdGFydGVkIG9uICR7bGFzdFNjYW5EYXRhLnN0YXJ0fSkuYCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgdGV4dDogYEZpbGUgaW50ZWdyaXR5IG1vbml0b3Jpbmcgc2NhbiBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MgZm9yIHRoaXMgYWdlbnQuYCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBwcmludGVyLmFkZE5ld0xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsIGBGZXRjaGluZyBsYXN0IDEwIGRlbGV0ZWQgZmlsZXMgZm9yIEZJTWAsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgbGFzdFRlbkRlbGV0ZWQgPSBhd2FpdCBTeXNjaGVja1JlcXVlc3QubGFzdFRlbkRlbGV0ZWRGaWxlcyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm5cbiAgICAgICk7XG5cbiAgICAgIGxhc3RUZW5EZWxldGVkICYmXG4gICAgICAgIGxhc3RUZW5EZWxldGVkLmxlbmd0aCAmJlxuICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAncGF0aCcsIGxhYmVsOiAnUGF0aCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdkYXRlJywgbGFiZWw6ICdEYXRlJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IGxhc3RUZW5EZWxldGVkLFxuICAgICAgICAgIHRpdGxlOiAnTGFzdCAxMCBkZWxldGVkIGZpbGVzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgIGxvZygncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLCBgRmV0Y2hpbmcgbGFzdCAxMCBtb2RpZmllZCBmaWxlc2AsICdkZWJ1ZycpO1xuICAgICAgY29uc3QgbGFzdFRlbk1vZGlmaWVkID0gYXdhaXQgU3lzY2hlY2tSZXF1ZXN0Lmxhc3RUZW5Nb2RpZmllZEZpbGVzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcblxuICAgICAgbGFzdFRlbk1vZGlmaWVkICYmXG4gICAgICAgIGxhc3RUZW5Nb2RpZmllZC5sZW5ndGggJiZcbiAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgeyBpZDogJ3BhdGgnLCBsYWJlbDogJ1BhdGgnIH0sXG4gICAgICAgICAgICB7IGlkOiAnZGF0ZScsIGxhYmVsOiAnRGF0ZScgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGl0ZW1zOiBsYXN0VGVuTW9kaWZpZWQsXG4gICAgICAgICAgdGl0bGU6ICdMYXN0IDEwIG1vZGlmaWVkIGZpbGVzJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8tLS0gQUdFTlRTIC0gU1lTQ09MTEVDVE9SXG4gICAgaWYgKHNlY3Rpb24gPT09ICdhZ2VudHMnICYmIHRhYiA9PT0gJ3N5c2NvbGxlY3RvcicpIHtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJyxcbiAgICAgICAgYEZldGNoaW5nIGhhcmR3YXJlIGluZm9ybWF0aW9uIGZvciBhZ2VudCAke2FnZW50fWAsXG4gICAgICAgICdkZWJ1ZydcbiAgICAgICk7XG4gICAgICBjb25zdCByZXF1ZXN0c1N5c2NvbGxlY3Rvckxpc3RzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnR9L2hhcmR3YXJlYCxcbiAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgSGFyZHdhcmUgaW5mb3JtYXRpb24gZm9yIGFnZW50ICR7YWdlbnR9YCxcbiAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICB0aXRsZTogeyB0ZXh0OiAnSGFyZHdhcmUgaW5mb3JtYXRpb24nLCBzdHlsZTogJ2gyJyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFwUmVzcG9uc2U6IChoYXJkd2FyZSkgPT4gW1xuICAgICAgICAgICAgaGFyZHdhcmUuY3B1ICYmIGhhcmR3YXJlLmNwdS5jb3JlcyAmJiBgJHtoYXJkd2FyZS5jcHUuY29yZXN9IGNvcmVzYCxcbiAgICAgICAgICAgIGhhcmR3YXJlLmNwdSAmJiBoYXJkd2FyZS5jcHUubmFtZSxcbiAgICAgICAgICAgIGhhcmR3YXJlLnJhbSAmJlxuICAgICAgICAgICAgaGFyZHdhcmUucmFtLnRvdGFsICYmXG4gICAgICAgICAgICBgJHtOdW1iZXIoaGFyZHdhcmUucmFtLnRvdGFsIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9R0IgUkFNYCxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnR9L29zYCxcbiAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgb3BlcmF0aW5nIHN5c3RlbSBpbmZvcm1hdGlvbiBmb3IgYWdlbnQgJHthZ2VudH1gLFxuICAgICAgICAgIGxpc3Q6IHtcbiAgICAgICAgICAgIHRpdGxlOiB7IHRleHQ6ICdPcGVyYXRpbmcgc3lzdGVtIGluZm9ybWF0aW9uJywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1hcFJlc3BvbnNlOiAob3NEYXRhKSA9PiBbXG4gICAgICAgICAgICBvc0RhdGEuc3lzbmFtZSxcbiAgICAgICAgICAgIG9zRGF0YS52ZXJzaW9uLFxuICAgICAgICAgICAgb3NEYXRhLmFyY2hpdGVjdHVyZSxcbiAgICAgICAgICAgIG9zRGF0YS5yZWxlYXNlLFxuICAgICAgICAgICAgb3NEYXRhLm9zICYmXG4gICAgICAgICAgICBvc0RhdGEub3MubmFtZSAmJlxuICAgICAgICAgICAgb3NEYXRhLm9zLnZlcnNpb24gJiZcbiAgICAgICAgICAgIGAke29zRGF0YS5vcy5uYW1lfSAke29zRGF0YS5vcy52ZXJzaW9ufWAsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IHN5c2NvbGxlY3Rvckxpc3RzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJlcXVlc3RzU3lzY29sbGVjdG9yTGlzdHMubWFwKGFzeW5jIChyZXF1ZXN0U3lzY29sbGVjdG9yKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvZygncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLCByZXF1ZXN0U3lzY29sbGVjdG9yLmxvZ2dlck1lc3NhZ2UsICdkZWJ1ZycpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VTeXNjb2xsZWN0b3IgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgcmVxdWVzdFN5c2NvbGxlY3Rvci5lbmRwb2ludCxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgW2RhdGFdID1cbiAgICAgICAgICAgICAgKHJlc3BvbnNlU3lzY29sbGVjdG9yICYmXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VTeXNjb2xsZWN0b3IuZGF0YSAmJlxuICAgICAgICAgICAgICAgIHJlc3BvbnNlU3lzY29sbGVjdG9yLmRhdGEuZGF0YSAmJlxuICAgICAgICAgICAgICAgIHJlc3BvbnNlU3lzY29sbGVjdG9yLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtcykgfHxcbiAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnJlcXVlc3RTeXNjb2xsZWN0b3IubGlzdCxcbiAgICAgICAgICAgICAgICBsaXN0OiByZXF1ZXN0U3lzY29sbGVjdG9yLm1hcFJlc3BvbnNlKGRhdGEpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2coJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgaWYgKHN5c2NvbGxlY3Rvckxpc3RzKSB7XG4gICAgICAgIHN5c2NvbGxlY3Rvckxpc3RzXG4gICAgICAgICAgLmZpbHRlcigoc3lzY29sbGVjdG9yTGlzdCkgPT4gc3lzY29sbGVjdG9yTGlzdClcbiAgICAgICAgICAuZm9yRWFjaCgoc3lzY29sbGVjdG9yTGlzdCkgPT4gcHJpbnRlci5hZGRMaXN0KHN5c2NvbGxlY3Rvckxpc3QpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdnVsbmVyYWJpbGl0aWVzUmVxdWVzdHMgPSBbJ0NyaXRpY2FsJywgJ0hpZ2gnXTtcblxuICAgICAgY29uc3QgdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzSXRlbXMgPSAoXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIHZ1bG5lcmFiaWxpdGllc1JlcXVlc3RzLm1hcChhc3luYyAodnVsbmVyYWJpbGl0aWVzTGV2ZWwpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxvZyhcbiAgICAgICAgICAgICAgICAncmVwb3J0aW5nOmV4dGVuZGVkSW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgICAgIGBGZXRjaGluZyB0b3AgJHt2dWxuZXJhYmlsaXRpZXNMZXZlbH0gcGFja2FnZXNgLFxuICAgICAgICAgICAgICAgICdkZWJ1ZydcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgVnVsbmVyYWJpbGl0eVJlcXVlc3QudG9wUGFja2FnZXMoXG4gICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgIHZ1bG5lcmFiaWxpdGllc0xldmVsLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBsb2coJ3JlcG9ydGluZzpleHRlbmRlZEluZm9ybWF0aW9uJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICAuZmlsdGVyKCh2dWxuZXJhYmlsaXRpZXNSZXNwb25zZSkgPT4gdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2UpXG4gICAgICAgIC5mbGF0KCk7XG5cbiAgICAgIGlmICh2dWxuZXJhYmlsaXRpZXNSZXNwb25zZXNJdGVtcyAmJiB2dWxuZXJhYmlsaXRpZXNSZXNwb25zZXNJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgdGl0bGU6IHsgdGV4dDogJ1Z1bG5lcmFibGUgcGFja2FnZXMgZm91bmQgKGxhc3QgMjQgaG91cnMpJywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAncGFja2FnZScsIGxhYmVsOiAnUGFja2FnZScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdzZXZlcml0eScsIGxhYmVsOiAnU2V2ZXJpdHknIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBpdGVtczogdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzSXRlbXMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIEFHRU5UUyAtIFZVTE5FUkFCSUxJVElFU1xuICAgIGlmIChzZWN0aW9uID09PSAnYWdlbnRzJyAmJiB0YWIgPT09ICd2dWxzJykge1xuICAgICAgY29uc3QgdG9wQ3JpdGljYWxQYWNrYWdlcyA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcFBhY2thZ2VzV2l0aENWRShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgICdDcml0aWNhbCcsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm5cbiAgICAgICk7XG4gICAgICBpZiAodG9wQ3JpdGljYWxQYWNrYWdlcyAmJiB0b3BDcml0aWNhbFBhY2thZ2VzLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7IHRleHQ6ICdDcml0aWNhbCBzZXZlcml0eScsIHN0eWxlOiAnaDInIH0pO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICdUaGVzZSB2dWxuZXJhYmlsdGllcyBhcmUgY3JpdGljYWwsIHBsZWFzZSByZXZpZXcgeW91ciBhZ2VudC4gQ2xpY2sgb24gZWFjaCBsaW5rIHRvIHJlYWQgbW9yZSBhYm91dCBlYWNoIGZvdW5kIHZ1bG5lcmFiaWxpdHkuJyxcbiAgICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGN1c3RvbXVsID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY3JpdGljYWwgb2YgdG9wQ3JpdGljYWxQYWNrYWdlcykge1xuICAgICAgICAgIGN1c3RvbXVsLnB1c2goeyB0ZXh0OiBjcml0aWNhbC5wYWNrYWdlLCBzdHlsZTogJ3N0YW5kYXJkJyB9KTtcbiAgICAgICAgICBjdXN0b211bC5wdXNoKHtcbiAgICAgICAgICAgIHVsOiBjcml0aWNhbC5yZWZlcmVuY2VzLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgICAgICAgICAgdGV4dDogaXRlbS5zdWJzdHJpbmcoMCwgODApICsgJy4uLicsXG4gICAgICAgICAgICAgIGxpbms6IGl0ZW0sXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzFFQTVDOCcsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoeyB1bDogY3VzdG9tdWwgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcEhpZ2hQYWNrYWdlcyA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcFBhY2thZ2VzV2l0aENWRShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgICdIaWdoJyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVyblxuICAgICAgKTtcbiAgICAgIGlmICh0b3BIaWdoUGFja2FnZXMgJiYgdG9wSGlnaFBhY2thZ2VzLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7IHRleHQ6ICdIaWdoIHNldmVyaXR5Jywgc3R5bGU6ICdoMicgfSk7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiAnQ2xpY2sgb24gZWFjaCBsaW5rIHRvIHJlYWQgbW9yZSBhYm91dCBlYWNoIGZvdW5kIHZ1bG5lcmFiaWxpdHkuJyxcbiAgICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGN1c3RvbXVsID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY3JpdGljYWwgb2YgdG9wSGlnaFBhY2thZ2VzKSB7XG4gICAgICAgICAgY3VzdG9tdWwucHVzaCh7IHRleHQ6IGNyaXRpY2FsLnBhY2thZ2UsIHN0eWxlOiAnc3RhbmRhcmQnIH0pO1xuICAgICAgICAgIGN1c3RvbXVsLnB1c2goe1xuICAgICAgICAgICAgdWw6IGNyaXRpY2FsLnJlZmVyZW5jZXMubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAgICAgICB0ZXh0OiBpdGVtLFxuICAgICAgICAgICAgICBjb2xvcjogJyMxRUE1QzgnLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1c3RvbXVsICYmIGN1c3RvbXVsLmxlbmd0aCAmJiBwcmludGVyLmFkZENvbnRlbnQoeyB1bDogY3VzdG9tdWwgfSk7XG4gICAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIFNVTU1BUlkgVEFCTEVTXG4gICAgbGV0IGV4dHJhU3VtbWFyeVRhYmxlcyA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1bW1hcnlUYWJsZXNEZWZpbml0aW9uc1tzZWN0aW9uXVt0YWJdKSkge1xuICAgICAgY29uc3QgdGFibGVzUHJvbWlzZXMgPSBzdW1tYXJ5VGFibGVzRGVmaW5pdGlvbnNbc2VjdGlvbl1bdGFiXS5tYXAoKHN1bW1hcnlUYWJsZSkgPT4ge1xuICAgICAgICBsb2coJ3JlcG9ydGluZzpBbGVydHNUYWJsZScsIGBGZXRjaGluZyAke3N1bW1hcnlUYWJsZS50aXRsZX0gVGFibGVgLCAnZGVidWcnKTtcbiAgICAgICAgY29uc3QgYWxlcnRzU3VtbWFyeVRhYmxlID0gbmV3IFN1bW1hcnlUYWJsZShcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIGZyb20sXG4gICAgICAgICAgdG8sXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICAgIHN1bW1hcnlUYWJsZSxcbiAgICAgICAgICBwYXR0ZXJuXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBhbGVydHNTdW1tYXJ5VGFibGUuZmV0Y2goKTtcbiAgICAgIH0pO1xuICAgICAgZXh0cmFTdW1tYXJ5VGFibGVzID0gYXdhaXQgUHJvbWlzZS5hbGwodGFibGVzUHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBleHRyYVN1bW1hcnlUYWJsZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nKCdyZXBvcnRpbmc6ZXh0ZW5kZWRJbmZvcm1hdGlvbicsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cbiJdfQ==