"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhElasticCtrl = void 0;

var _errorResponse = require("../lib/error-response");

var _logger = require("../lib/logger");

var _getConfiguration = require("../lib/get-configuration");

var _visualizations = require("../integration-files/visualizations");

var _generateAlertsScript = require("../lib/generate-alerts/generate-alerts-script");

var _constants = require("../../common/constants");

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _manageHosts = require("../lib/manage-hosts");

var _cookie = require("../lib/cookie");

var _settings = require("../../common/services/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WazuhElasticCtrl {
  constructor() {
    _defineProperty(this, "wzSampleAlertsIndexPrefix", void 0);

    _defineProperty(this, "manageHosts", void 0);

    this.wzSampleAlertsIndexPrefix = this.getSampleAlertPrefix();
    this.manageHosts = new _manageHosts.ManageHosts();
  }
  /**
   * This returns the index according the category
   * @param {string} category
   */


  buildSampleIndexByCategory(category) {
    return `${this.wzSampleAlertsIndexPrefix}sample-${category}`;
  }
  /**
   * This returns the defined config for sample alerts prefix or the default value.
   */


  getSampleAlertPrefix() {
    const config = (0, _getConfiguration.getConfiguration)();
    return config['alerts.sample.prefix'] || (0, _settings.getSettingDefaultValue)('alerts.sample.prefix');
  }
  /**
   * This retrieves a template from Elasticsearch
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} template or ErrorResponse
   */


  async getTemplate(context, request, response) {
    try {
      const data = await context.core.opensearch.client.asInternalUser.cat.templates();
      const templates = data.body;

      if (!templates || typeof templates !== 'string') {
        throw new Error(`An unknown error occurred when fetching templates from ${_constants.WAZUH_INDEXER_NAME}`);
      }

      const lastChar = request.params.pattern[request.params.pattern.length - 1]; // Split into separate patterns

      const tmpdata = templates.match(/\[.*\]/g);
      const tmparray = [];

      for (let item of tmpdata) {
        // A template might use more than one pattern
        if (item.includes(',')) {
          item = item.substr(1).slice(0, -1);
          const subItems = item.split(',');

          for (const subitem of subItems) {
            tmparray.push(`[${subitem.trim()}]`);
          }
        } else {
          tmparray.push(item);
        }
      } // Ensure we are handling just patterns


      const array = tmparray.filter(item => item.includes('[') && item.includes(']'));
      const pattern = lastChar === '*' ? request.params.pattern.slice(0, -1) : request.params.pattern;
      const isIncluded = array.filter(item => {
        item = item.slice(1, -1);
        const lastChar = item[item.length - 1];
        item = lastChar === '*' ? item.slice(0, -1) : item;
        return item.includes(pattern) || pattern.includes(item);
      });
      (0, _logger.log)('wazuh-elastic:getTemplate', `Template is valid: ${isIncluded && Array.isArray(isIncluded) && isIncluded.length ? 'yes' : 'no'}`, 'debug');
      return isIncluded && Array.isArray(isIncluded) && isIncluded.length ? response.ok({
        body: {
          statusCode: 200,
          status: true,
          data: `Template found for ${request.params.pattern}`
        }
      }) : response.ok({
        body: {
          statusCode: 200,
          status: false,
          data: `No template found for ${request.params.pattern}`
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:getTemplate', error.message || error);
      return (0, _errorResponse.ErrorResponse)(`Could not retrieve templates from ${_constants.WAZUH_INDEXER_NAME} due to ${error.message || error}`, 4002, 500, response);
    }
  }
  /**
   * This check index-pattern
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */

  /**
   * This get the fields keys
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Array<Object>} fields or ErrorResponse
   */


  async getFieldTop(context, request, response) {
    try {
      // Top field payload
      let payload = {
        size: 1,
        query: {
          bool: {
            must: [],
            must_not: {
              term: {
                'agent.id': '000'
              }
            },
            filter: [{
              range: {
                timestamp: {}
              }
            }]
          }
        },
        aggs: {
          '2': {
            terms: {
              field: '',
              size: 1,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      }; // Set up time interval, default to Last 24h

      const timeGTE = 'now-1d';
      const timeLT = 'now';
      payload.query.bool.filter[0].range['timestamp']['gte'] = timeGTE;
      payload.query.bool.filter[0].range['timestamp']['lt'] = timeLT; // Set up match for default cluster name

      payload.query.bool.must.push(request.params.mode === 'cluster' ? {
        match: {
          'cluster.name': request.params.cluster
        }
      } : {
        match: {
          'manager.name': request.params.cluster
        }
      });
      if (request.query.agentsList) payload.query.bool.filter.push({
        terms: {
          'agent.id': request.query.agentsList.split(',')
        }
      });
      payload.aggs['2'].terms.field = request.params.field;
      const data = await context.core.opensearch.client.asCurrentUser.search({
        size: 1,
        index: request.params.pattern,
        body: payload
      });
      return data.body.hits.total.value === 0 || typeof data.body.aggregations['2'].buckets[0] === 'undefined' ? response.ok({
        body: {
          statusCode: 200,
          data: ''
        }
      }) : response.ok({
        body: {
          statusCode: 200,
          data: data.body.aggregations['2'].buckets[0].key
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:getFieldTop', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4004, 500, response);
    }
  }
  /**
   * Checks one by one if the requesting user has enough privileges to use
   * an index pattern from the list.
   * @param {Array<Object>} list List of index patterns
   * @param {Object} req
   * @returns {Array<Object>} List of allowed index
   */


  async filterAllowedIndexPatternList(context, list, req) {
    //TODO: review if necesary to delete
    let finalList = [];

    for (let item of list) {
      let results = false,
          forbidden = false;

      try {
        results = await context.core.opensearch.client.asCurrentUser.search({
          index: item.title
        });
      } catch (error) {
        forbidden = true;
      }

      if ((((results || {}).body || {}).hits || {}).total.value >= 1 || !forbidden && (((results || {}).body || {}).hits || {}).total === 0) {
        finalList.push(item);
      }
    }

    return finalList;
  }
  /**
   * Checks for minimum index pattern fields in a list of index patterns.
   * @param {Array<Object>} indexPatternList List of index patterns
   */


  validateIndexPattern(indexPatternList) {
    const minimum = ['timestamp', 'rule.groups', 'manager.name', 'agent.id'];
    let list = [];

    for (const index of indexPatternList) {
      let valid, parsed;

      try {
        parsed = JSON.parse(index.attributes.fields);
      } catch (error) {
        continue;
      }

      valid = parsed.filter(item => minimum.includes(item.name));

      if (valid.length === 4) {
        list.push({
          id: index.id,
          title: index.attributes.title
        });
      }
    }

    return list;
  }
  /**
   * Returns current security platform
   * @param {Object} req
   * @param {Object} reply
   * @returns {String}
   */


  async getCurrentPlatform(context, request, response) {
    try {
      return response.ok({
        body: {
          platform: context.wazuh.security.platform
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:getCurrentPlatform', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4011, 500, response);
    }
  }
  /**
   * Replaces visualizations main fields to fit a certain pattern.
   * @param {Array<Object>} app_objects Object containing raw visualizations.
   * @param {String} id Index-pattern id to use in the visualizations. Eg: 'wazuh-alerts'
   */


  async buildVisualizationsRaw(app_objects, id, namespace = false) {
    try {
      const config = (0, _getConfiguration.getConfiguration)();
      let monitoringPattern = (config || {})['wazuh.monitoring.pattern'] || (0, _settings.getSettingDefaultValue)('wazuh.monitoring.pattern');
      (0, _logger.log)('wazuh-elastic:buildVisualizationsRaw', `Building ${app_objects.length} visualizations`, 'debug');
      (0, _logger.log)('wazuh-elastic:buildVisualizationsRaw', `Index pattern ID: ${id}`, 'debug');
      const visArray = [];
      let aux_source, bulk_content;

      for (let element of app_objects) {
        aux_source = JSON.parse(JSON.stringify(element._source)); // Replace index-pattern for visualizations

        if (aux_source && aux_source.kibanaSavedObjectMeta && aux_source.kibanaSavedObjectMeta.searchSourceJSON && typeof aux_source.kibanaSavedObjectMeta.searchSourceJSON === 'string') {
          const defaultStr = aux_source.kibanaSavedObjectMeta.searchSourceJSON;
          const isMonitoring = defaultStr.includes('wazuh-monitoring');

          if (isMonitoring) {
            if (namespace && namespace !== 'default') {
              if (monitoringPattern.includes(namespace) && monitoringPattern.includes('index-pattern:')) {
                monitoringPattern = monitoringPattern.split('index-pattern:')[1];
              }
            }

            aux_source.kibanaSavedObjectMeta.searchSourceJSON = defaultStr.replace(/wazuh-monitoring/g, monitoringPattern[monitoringPattern.length - 1] === '*' || namespace && namespace !== 'default' ? monitoringPattern : monitoringPattern + '*');
          } else {
            aux_source.kibanaSavedObjectMeta.searchSourceJSON = defaultStr.replace(/wazuh-alerts/g, id);
          }
        } // Replace index-pattern for selector visualizations


        if (typeof (aux_source || {}).visState === 'string') {
          aux_source.visState = aux_source.visState.replace(/wazuh-alerts/g, id);
        } // Bulk source


        bulk_content = {};
        bulk_content[element._type] = aux_source;
        visArray.push({
          attributes: bulk_content.visualization,
          type: element._type,
          id: element._id,
          _version: bulk_content.visualization.version
        });
      }

      return visArray;
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:buildVisualizationsRaw', error.message || error);
      return Promise.reject(error);
    }
  }
  /**
   * Replaces cluster visualizations main fields.
   * @param {Array<Object>} app_objects Object containing raw visualizations.
   * @param {String} id Index-pattern id to use in the visualizations. Eg: 'wazuh-alerts'
   * @param {Array<String>} nodes Array of node names. Eg: ['node01', 'node02']
   * @param {String} name Cluster name. Eg: 'wazuh'
   * @param {String} master_node Master node name. Eg: 'node01'
   */


  buildClusterVisualizationsRaw(app_objects, id, nodes = [], name, master_node, pattern_name = '*') {
    try {
      const visArray = [];
      let aux_source, bulk_content;

      for (const element of app_objects) {
        // Stringify and replace index-pattern for visualizations
        aux_source = JSON.stringify(element._source);
        aux_source = aux_source.replace(/wazuh-alerts/g, id);
        aux_source = JSON.parse(aux_source); // Bulk source

        bulk_content = {};
        bulk_content[element._type] = aux_source;
        const visState = JSON.parse(bulk_content.visualization.visState);
        const title = visState.title;

        if (title.startsWith('Wazuh App Statistics')) {
          const filter = bulk_content.visualization.kibanaSavedObjectMeta.searchSourceJSON.replace('"filter":[]', '"filter":[{"match_phrase":{"apiName":"' + master_node + '"}}]');
          bulk_content.visualization.kibanaSavedObjectMeta.searchSourceJSON = filter;
        }

        if (visState.type && visState.type === 'timelion') {
          let query = '';

          if (title === 'Wazuh App Cluster Overview') {
            for (const node of nodes) {
              query += `.es(index=${pattern_name},q="cluster.name: ${name} AND cluster.node: ${node.name}").label("${node.name}"),`;
            }

            query = query.substring(0, query.length - 1);
          } else if (title === 'Wazuh App Cluster Overview Manager') {
            query += `.es(index=${pattern_name},q="cluster.name: ${name}").label("${name} cluster")`;
          }

          visState.params.expression = query.replace(/'/g, '"');
          bulk_content.visualization.visState = JSON.stringify(visState);
        }

        visArray.push({
          attributes: bulk_content.visualization,
          type: element._type,
          id: element._id,
          _version: bulk_content.visualization.version
        });
      }

      return visArray;
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:buildClusterVisualizationsRaw', error.message || error);
      return Promise.reject(error);
    }
  }
  /**
   * This creates a visualization of data in req
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} vis obj or ErrorResponse
   */


  async createVis(context, request, response) {
    try {
      if (!request.params.tab.includes('overview-') && !request.params.tab.includes('agents-')) {
        throw new Error('Missing parameters creating visualizations');
      }

      const tabPrefix = request.params.tab.includes('overview') ? 'overview' : 'agents';
      const tabSplit = request.params.tab.split('-');
      const tabSufix = tabSplit[1];
      const file = tabPrefix === 'overview' ? _visualizations.OverviewVisualizations[tabSufix] : _visualizations.AgentsVisualizations[tabSufix];

      if (!file) {
        return response.notFound({
          body: {
            message: `Visualizations not found for ${request.params.tab}`
          }
        });
      }

      (0, _logger.log)('wazuh-elastic:createVis', `${tabPrefix}[${tabSufix}] with index pattern ${request.params.pattern}`, 'debug');
      const raw = await this.buildVisualizationsRaw(file, request.params.pattern);
      return response.ok({
        body: {
          acknowledge: true,
          raw: raw
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:createVis', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4007, 500, response);
    }
  }
  /**
   * This creates a visualization of cluster
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} vis obj or ErrorResponse
   */


  async createClusterVis(context, request, response) {
    try {
      if (!request.params.pattern || !request.params.tab || !request.body || !request.body.nodes || !request.body.nodes.affected_items || !request.body.nodes.name || request.params.tab && !request.params.tab.includes('cluster-')) {
        throw new Error('Missing parameters creating visualizations');
      }

      const type = request.params.tab.split('-')[1];
      const file = _visualizations.ClusterVisualizations[type];
      const nodes = request.body.nodes.affected_items;
      const name = request.body.nodes.name;
      const masterNode = request.body.nodes.master_node;
      const {
        id: patternID,
        title: patternName
      } = request.body.pattern;
      const raw = await this.buildClusterVisualizationsRaw(file, patternID, nodes, name, masterNode, patternName);
      return response.ok({
        body: {
          acknowledge: true,
          raw: raw
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:createClusterVis', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4009, 500, response);
    }
  }
  /**
   * This checks if there is sample alerts
   * GET /elastic/samplealerts
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {alerts: [...]} or ErrorResponse
   */


  async haveSampleAlerts(context, request, response) {
    try {
      // Check if wazuh sample alerts index exists
      const results = await Promise.all(Object.keys(_constants.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS).map(category => context.core.opensearch.client.asCurrentUser.indices.exists({
        index: this.buildSampleIndexByCategory(category)
      })));
      return response.ok({
        body: {
          sampleAlertsInstalled: results.some(result => result.body)
        }
      });
    } catch (error) {
      return (0, _errorResponse.ErrorResponse)('Sample Alerts category not valid', 1000, 500, response);
    }
  }
  /**
   * This creates sample alerts in wazuh-sample-alerts
   * GET /elastic/samplealerts/{category}
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {alerts: [...]} or ErrorResponse
   */


  async haveSampleAlertsOfCategory(context, request, response) {
    try {
      const sampleAlertsIndex = this.buildSampleIndexByCategory(request.params.category); // Check if wazuh sample alerts index exists

      const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: sampleAlertsIndex
      });
      return response.ok({
        body: {
          index: sampleAlertsIndex,
          exists: existsSampleIndex.body
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:haveSampleAlertsOfCategory', `Error checking if there are sample alerts indices: ${error.message || error}`);
      const [statusCode, errorMessage] = this.getErrorDetails(error);
      return (0, _errorResponse.ErrorResponse)(`Error checking if there are sample alerts indices: ${errorMessage || error}`, 1000, statusCode, response);
    }
  }
  /**
   * This creates sample alerts in wazuh-sample-alerts
   * POST /elastic/samplealerts/{category}
   * {
   *   "manager": {
   *      "name": "manager_name"
   *    },
   *    cluster: {
   *      name: "mycluster",
   *      node: "mynode"
   *    }
   * }
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {index: string, alerts: [...], count: number} or ErrorResponse
   */


  async createSampleAlerts(context, request, response) {
    const sampleAlertsIndex = this.buildSampleIndexByCategory(request.params.category);

    try {
      // Check if user has administrator role in token
      const token = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-token');

      if (!token) {
        return (0, _errorResponse.ErrorResponse)('No token provided', 401, 401, response);
      }

      const decodedToken = (0, _jwtDecode.default)(token);

      if (!decodedToken) {
        return (0, _errorResponse.ErrorResponse)('No permissions in token', 401, 401, response);
      }

      if (!decodedToken.rbac_roles || !decodedToken.rbac_roles.includes(_constants.WAZUH_ROLE_ADMINISTRATOR_ID)) {
        return (0, _errorResponse.ErrorResponse)('No administrator role', 401, 401, response);
      } // Check the provided token is valid


      const apiHostID = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');

      if (!apiHostID) {
        return (0, _errorResponse.ErrorResponse)('No API id provided', 401, 401, response);
      }

      const responseTokenIsWorking = await context.wazuh.api.client.asCurrentUser.request('GET', `//`, {}, {
        apiHostID
      });

      if (responseTokenIsWorking.status !== 200) {
        return (0, _errorResponse.ErrorResponse)('Token is not valid', 500, 500, response);
      }

      const bulkPrefix = JSON.stringify({
        index: {
          _index: sampleAlertsIndex
        }
      });
      const alertGenerateParams = request.body && request.body.params || {};

      const sampleAlerts = _constants.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS[request.params.category].map(typeAlert => (0, _generateAlertsScript.generateAlerts)({ ...typeAlert,
        ...alertGenerateParams
      }, request.body.alerts || typeAlert.alerts || _constants.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS)).flat();

      const bulk = sampleAlerts.map(sampleAlert => `${bulkPrefix}\n${JSON.stringify(sampleAlert)}\n`).join(''); // Index alerts
      // Check if wazuh sample alerts index exists

      const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: sampleAlertsIndex
      });

      if (!existsSampleIndex.body) {
        // Create wazuh sample alerts index
        const configuration = {
          settings: {
            index: {
              number_of_shards: _constants.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS,
              number_of_replicas: _constants.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS
            }
          }
        };
        await context.core.opensearch.client.asCurrentUser.indices.create({
          index: sampleAlertsIndex,
          body: configuration
        });
        (0, _logger.log)('wazuh-elastic:createSampleAlerts', `Created ${sampleAlertsIndex} index`, 'debug');
      }

      await context.core.opensearch.client.asCurrentUser.bulk({
        index: sampleAlertsIndex,
        body: bulk
      });
      (0, _logger.log)('wazuh-elastic:createSampleAlerts', `Added sample alerts to ${sampleAlertsIndex} index`, 'debug');
      return response.ok({
        body: {
          index: sampleAlertsIndex,
          alertCount: sampleAlerts.length
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:createSampleAlerts', `Error adding sample alerts to ${sampleAlertsIndex} index: ${error.message || error}`);
      const [statusCode, errorMessage] = this.getErrorDetails(error);
      return (0, _errorResponse.ErrorResponse)(errorMessage || error, 1000, statusCode, response);
    }
  }
  /**
   * This deletes sample alerts
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {result: "deleted", index: string} or ErrorResponse
   */


  async deleteSampleAlerts(context, request, response) {
    // Delete Wazuh sample alert index
    const sampleAlertsIndex = this.buildSampleIndexByCategory(request.params.category);

    try {
      // Check if user has administrator role in token
      const token = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-token');

      if (!token) {
        return (0, _errorResponse.ErrorResponse)('No token provided', 401, 401, response);
      }

      const decodedToken = (0, _jwtDecode.default)(token);

      if (!decodedToken) {
        return (0, _errorResponse.ErrorResponse)('No permissions in token', 401, 401, response);
      }

      if (!decodedToken.rbac_roles || !decodedToken.rbac_roles.includes(_constants.WAZUH_ROLE_ADMINISTRATOR_ID)) {
        return (0, _errorResponse.ErrorResponse)('No administrator role', 401, 401, response);
      } // Check the provided token is valid


      const apiHostID = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');

      if (!apiHostID) {
        return (0, _errorResponse.ErrorResponse)('No API id provided', 401, 401, response);
      }

      const responseTokenIsWorking = await context.wazuh.api.client.asCurrentUser.request('GET', `//`, {}, {
        apiHostID
      });

      if (responseTokenIsWorking.status !== 200) {
        return (0, _errorResponse.ErrorResponse)('Token is not valid', 500, 500, response);
      } // Check if Wazuh sample alerts index exists


      const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: sampleAlertsIndex
      });

      if (existsSampleIndex.body) {
        // Delete Wazuh sample alerts index
        await context.core.opensearch.client.asCurrentUser.indices.delete({
          index: sampleAlertsIndex
        });
        (0, _logger.log)('wazuh-elastic:deleteSampleAlerts', `Deleted ${sampleAlertsIndex} index`, 'debug');
        return response.ok({
          body: {
            result: 'deleted',
            index: sampleAlertsIndex
          }
        });
      } else {
        return (0, _errorResponse.ErrorResponse)(`${sampleAlertsIndex} index doesn't exist`, 1000, 500, response);
      }
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:deleteSampleAlerts', `Error deleting sample alerts of ${sampleAlertsIndex} index: ${error.message || error}`);
      const [statusCode, errorMessage] = this.getErrorDetails(error);
      return (0, _errorResponse.ErrorResponse)(errorMessage || error, 1000, statusCode, response);
    }
  }

  async alerts(context, request, response) {
    try {
      const data = await context.core.opensearch.client.asCurrentUser.search(request.body);
      return response.ok({
        body: data.body
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:alerts', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4010, 500, response);
    }
  } // Check if there are indices for Statistics


  async existStatisticsIndices(context, request, response) {
    try {
      const config = (0, _getConfiguration.getConfiguration)();
      const statisticsPattern = `${config['cron.prefix'] || 'wazuh'}-${config['cron.statistics.index.name'] || 'statistics'}*`; //TODO: replace by default as constants instead hardcoded ('wazuh' and 'statistics')

      const existIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: statisticsPattern,
        allow_no_indices: false
      });
      return response.ok({
        body: existIndex.body
      });
    } catch (error) {
      (0, _logger.log)('wazuh-elastic:existsStatisticsIndices', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 1000, 500, response);
    }
  }

  getErrorDetails(error) {
    var _error$meta;

    const statusCode = (error === null || error === void 0 ? void 0 : (_error$meta = error.meta) === null || _error$meta === void 0 ? void 0 : _error$meta.statusCode) || 500;
    let errorMessage = error.message;

    if (statusCode === 403) {
      var _error$meta2, _error$meta2$body, _error$meta2$body$err;

      errorMessage = (error === null || error === void 0 ? void 0 : (_error$meta2 = error.meta) === null || _error$meta2 === void 0 ? void 0 : (_error$meta2$body = _error$meta2.body) === null || _error$meta2$body === void 0 ? void 0 : (_error$meta2$body$err = _error$meta2$body.error) === null || _error$meta2$body$err === void 0 ? void 0 : _error$meta2$body$err.reason) || 'Permission denied';
    }

    return [statusCode, errorMessage];
  }

}

exports.WazuhElasticCtrl = WazuhElasticCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhenVoLWVsYXN0aWMudHMiXSwibmFtZXMiOlsiV2F6dWhFbGFzdGljQ3RybCIsImNvbnN0cnVjdG9yIiwid3pTYW1wbGVBbGVydHNJbmRleFByZWZpeCIsImdldFNhbXBsZUFsZXJ0UHJlZml4IiwibWFuYWdlSG9zdHMiLCJNYW5hZ2VIb3N0cyIsImJ1aWxkU2FtcGxlSW5kZXhCeUNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJjb25maWciLCJnZXRUZW1wbGF0ZSIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJkYXRhIiwiY29yZSIsIm9wZW5zZWFyY2giLCJjbGllbnQiLCJhc0ludGVybmFsVXNlciIsImNhdCIsInRlbXBsYXRlcyIsImJvZHkiLCJFcnJvciIsIldBWlVIX0lOREVYRVJfTkFNRSIsImxhc3RDaGFyIiwicGFyYW1zIiwicGF0dGVybiIsImxlbmd0aCIsInRtcGRhdGEiLCJtYXRjaCIsInRtcGFycmF5IiwiaXRlbSIsImluY2x1ZGVzIiwic3Vic3RyIiwic2xpY2UiLCJzdWJJdGVtcyIsInNwbGl0Iiwic3ViaXRlbSIsInB1c2giLCJ0cmltIiwiYXJyYXkiLCJmaWx0ZXIiLCJpc0luY2x1ZGVkIiwiQXJyYXkiLCJpc0FycmF5Iiwib2siLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwiZXJyb3IiLCJtZXNzYWdlIiwiZ2V0RmllbGRUb3AiLCJwYXlsb2FkIiwic2l6ZSIsInF1ZXJ5IiwiYm9vbCIsIm11c3QiLCJtdXN0X25vdCIsInRlcm0iLCJyYW5nZSIsInRpbWVzdGFtcCIsImFnZ3MiLCJ0ZXJtcyIsImZpZWxkIiwib3JkZXIiLCJfY291bnQiLCJ0aW1lR1RFIiwidGltZUxUIiwibW9kZSIsImNsdXN0ZXIiLCJhZ2VudHNMaXN0IiwiYXNDdXJyZW50VXNlciIsInNlYXJjaCIsImluZGV4IiwiaGl0cyIsInRvdGFsIiwidmFsdWUiLCJhZ2dyZWdhdGlvbnMiLCJidWNrZXRzIiwia2V5IiwiZmlsdGVyQWxsb3dlZEluZGV4UGF0dGVybkxpc3QiLCJsaXN0IiwicmVxIiwiZmluYWxMaXN0IiwicmVzdWx0cyIsImZvcmJpZGRlbiIsInRpdGxlIiwidmFsaWRhdGVJbmRleFBhdHRlcm4iLCJpbmRleFBhdHRlcm5MaXN0IiwibWluaW11bSIsInZhbGlkIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiYXR0cmlidXRlcyIsImZpZWxkcyIsIm5hbWUiLCJpZCIsImdldEN1cnJlbnRQbGF0Zm9ybSIsInBsYXRmb3JtIiwid2F6dWgiLCJzZWN1cml0eSIsImJ1aWxkVmlzdWFsaXphdGlvbnNSYXciLCJhcHBfb2JqZWN0cyIsIm5hbWVzcGFjZSIsIm1vbml0b3JpbmdQYXR0ZXJuIiwidmlzQXJyYXkiLCJhdXhfc291cmNlIiwiYnVsa19jb250ZW50IiwiZWxlbWVudCIsInN0cmluZ2lmeSIsIl9zb3VyY2UiLCJraWJhbmFTYXZlZE9iamVjdE1ldGEiLCJzZWFyY2hTb3VyY2VKU09OIiwiZGVmYXVsdFN0ciIsImlzTW9uaXRvcmluZyIsInJlcGxhY2UiLCJ2aXNTdGF0ZSIsIl90eXBlIiwidmlzdWFsaXphdGlvbiIsInR5cGUiLCJfaWQiLCJfdmVyc2lvbiIsInZlcnNpb24iLCJQcm9taXNlIiwicmVqZWN0IiwiYnVpbGRDbHVzdGVyVmlzdWFsaXphdGlvbnNSYXciLCJub2RlcyIsIm1hc3Rlcl9ub2RlIiwicGF0dGVybl9uYW1lIiwic3RhcnRzV2l0aCIsIm5vZGUiLCJzdWJzdHJpbmciLCJleHByZXNzaW9uIiwiY3JlYXRlVmlzIiwidGFiIiwidGFiUHJlZml4IiwidGFiU3BsaXQiLCJ0YWJTdWZpeCIsImZpbGUiLCJPdmVydmlld1Zpc3VhbGl6YXRpb25zIiwiQWdlbnRzVmlzdWFsaXphdGlvbnMiLCJub3RGb3VuZCIsInJhdyIsImFja25vd2xlZGdlIiwiY3JlYXRlQ2x1c3RlclZpcyIsImFmZmVjdGVkX2l0ZW1zIiwiQ2x1c3RlclZpc3VhbGl6YXRpb25zIiwibWFzdGVyTm9kZSIsInBhdHRlcm5JRCIsInBhdHRlcm5OYW1lIiwiaGF2ZVNhbXBsZUFsZXJ0cyIsImFsbCIsIk9iamVjdCIsImtleXMiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JJRVNfVFlQRV9BTEVSVFMiLCJtYXAiLCJpbmRpY2VzIiwiZXhpc3RzIiwic2FtcGxlQWxlcnRzSW5zdGFsbGVkIiwic29tZSIsInJlc3VsdCIsImhhdmVTYW1wbGVBbGVydHNPZkNhdGVnb3J5Iiwic2FtcGxlQWxlcnRzSW5kZXgiLCJleGlzdHNTYW1wbGVJbmRleCIsImVycm9yTWVzc2FnZSIsImdldEVycm9yRGV0YWlscyIsImNyZWF0ZVNhbXBsZUFsZXJ0cyIsInRva2VuIiwiaGVhZGVycyIsImNvb2tpZSIsImRlY29kZWRUb2tlbiIsInJiYWNfcm9sZXMiLCJXQVpVSF9ST0xFX0FETUlOSVNUUkFUT1JfSUQiLCJhcGlIb3N0SUQiLCJyZXNwb25zZVRva2VuSXNXb3JraW5nIiwiYXBpIiwiYnVsa1ByZWZpeCIsIl9pbmRleCIsImFsZXJ0R2VuZXJhdGVQYXJhbXMiLCJzYW1wbGVBbGVydHMiLCJ0eXBlQWxlcnQiLCJhbGVydHMiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0RFRkFVTFRfTlVNQkVSX0FMRVJUUyIsImZsYXQiLCJidWxrIiwic2FtcGxlQWxlcnQiLCJqb2luIiwiY29uZmlndXJhdGlvbiIsInNldHRpbmdzIiwibnVtYmVyX29mX3NoYXJkcyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfU0hBUkRTIiwibnVtYmVyX29mX3JlcGxpY2FzIiwiV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9SRVBMSUNBUyIsImNyZWF0ZSIsImFsZXJ0Q291bnQiLCJkZWxldGVTYW1wbGVBbGVydHMiLCJkZWxldGUiLCJleGlzdFN0YXRpc3RpY3NJbmRpY2VzIiwic3RhdGlzdGljc1BhdHRlcm4iLCJleGlzdEluZGV4IiwiYWxsb3dfbm9faW5kaWNlcyIsIm1ldGEiLCJyZWFzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFNQTs7QUFDQTs7QUFLQTs7QUFD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QTlEO0FBQ0EsYUFBTyxrQ0FBY0EsS0FBSyxDQUFDQyxPQUFOLElBQWlCRCxLQUEvQixFQUFzQyxJQUF0QyxFQUE0QyxHQUE1QyxFQUFpRG5DLFFBQWpELENBQVA7QUFDRDtBQUNGOztBQUVEd0osRUFBQUEsZUFBZSxDQUFDckgsS0FBRCxFQUFRO0FBQUE7O0FBQ3JCLFVBQU1GLFVBQVUsR0FBRyxDQUFBRSxLQUFLLFNBQUwsSUFBQUEsS0FBSyxXQUFMLDJCQUFBQSxLQUFLLENBQUV5SixJQUFQLDREQUFhM0osVUFBYixLQUEyQixHQUE5QztBQUNBLFFBQUlzSCxZQUFZLEdBQUdwSCxLQUFLLENBQUNDLE9BQXpCOztBQUVBLFFBQUlILFVBQVUsS0FBSyxHQUFuQixFQUF3QjtBQUFBOztBQUN0QnNILE1BQUFBLFlBQVksR0FBRyxDQUFBcEgsS0FBSyxTQUFMLElBQUFBLEtBQUssV0FBTCw0QkFBQUEsS0FBSyxDQUFFeUosSUFBUCxtRkFBYXBMLElBQWIsaUdBQW1CMkIsS0FBbkIsZ0ZBQTBCMEosTUFBMUIsS0FBb0MsbUJBQW5EO0FBQ0Q7O0FBRUQsV0FBTyxDQUFDNUosVUFBRCxFQUFhc0gsWUFBYixDQUFQO0FBQ0Q7O0FBLzVCMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gQ2xhc3MgZm9yIFdhenVoLUVsYXN0aWMgZnVuY3Rpb25zXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uL2xpYi9lcnJvci1yZXNwb25zZSc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9saWIvbG9nZ2VyJztcbmltcG9ydCB7IGdldENvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9saWIvZ2V0LWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtcbiAgQWdlbnRzVmlzdWFsaXphdGlvbnMsXG4gIE92ZXJ2aWV3VmlzdWFsaXphdGlvbnMsXG4gIENsdXN0ZXJWaXN1YWxpemF0aW9ucyxcbn0gZnJvbSAnLi4vaW50ZWdyYXRpb24tZmlsZXMvdmlzdWFsaXphdGlvbnMnO1xuXG5pbXBvcnQgeyBnZW5lcmF0ZUFsZXJ0cyB9IGZyb20gJy4uL2xpYi9nZW5lcmF0ZS1hbGVydHMvZ2VuZXJhdGUtYWxlcnRzLXNjcmlwdCc7XG5pbXBvcnQge1xuICBXQVpVSF9ST0xFX0FETUlOSVNUUkFUT1JfSUQsXG4gIFdBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfU0hBUkRTLFxuICBXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1JFUExJQ0FTLFxufSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCBqd3REZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBNYW5hZ2VIb3N0cyB9IGZyb20gJy4uL2xpYi9tYW5hZ2UtaG9zdHMnO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBTYXZlZE9iamVjdCxcbiAgU2F2ZWRPYmplY3RzRmluZFJlc3BvbnNlLFxufSBmcm9tICdzcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0Q29va2llVmFsdWVCeU5hbWUgfSBmcm9tICcuLi9saWIvY29va2llJztcbmltcG9ydCB7XG4gIFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUklFU19UWVBFX0FMRVJUUyxcbiAgV0FaVUhfU0FNUExFX0FMRVJUU19ERUZBVUxUX05VTUJFUl9BTEVSVFMsXG59IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ0RlZmF1bHRWYWx1ZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9zZXR0aW5ncyc7XG5pbXBvcnQgeyBXQVpVSF9JTkRFWEVSX05BTUUgfSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIFdhenVoRWxhc3RpY0N0cmwge1xuICB3elNhbXBsZUFsZXJ0c0luZGV4UHJlZml4OiBzdHJpbmc7XG4gIG1hbmFnZUhvc3RzOiBNYW5hZ2VIb3N0cztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53elNhbXBsZUFsZXJ0c0luZGV4UHJlZml4ID0gdGhpcy5nZXRTYW1wbGVBbGVydFByZWZpeCgpO1xuICAgIHRoaXMubWFuYWdlSG9zdHMgPSBuZXcgTWFuYWdlSG9zdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHJldHVybnMgdGhlIGluZGV4IGFjY29yZGluZyB0aGUgY2F0ZWdvcnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5XG4gICAqL1xuICBidWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShjYXRlZ29yeTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy53elNhbXBsZUFsZXJ0c0luZGV4UHJlZml4fXNhbXBsZS0ke2NhdGVnb3J5fWA7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyByZXR1cm5zIHRoZSBkZWZpbmVkIGNvbmZpZyBmb3Igc2FtcGxlIGFsZXJ0cyBwcmVmaXggb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAqL1xuICBnZXRTYW1wbGVBbGVydFByZWZpeCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZ3VyYXRpb24oKTtcbiAgICByZXR1cm4gKFxuICAgICAgY29uZmlnWydhbGVydHMuc2FtcGxlLnByZWZpeCddIHx8XG4gICAgICBnZXRTZXR0aW5nRGVmYXVsdFZhbHVlKCdhbGVydHMuc2FtcGxlLnByZWZpeCcpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHJldHJpZXZlcyBhIHRlbXBsYXRlIGZyb20gRWxhc3RpY3NlYXJjaFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gdGVtcGxhdGUgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgZ2V0VGVtcGxhdGUoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdDx7IHBhdHRlcm46IHN0cmluZyB9PixcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID1cbiAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzSW50ZXJuYWxVc2VyLmNhdC50ZW1wbGF0ZXMoKTtcblxuICAgICAgY29uc3QgdGVtcGxhdGVzID0gZGF0YS5ib2R5O1xuICAgICAgaWYgKCF0ZW1wbGF0ZXMgfHwgdHlwZW9mIHRlbXBsYXRlcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBBbiB1bmtub3duIGVycm9yIG9jY3VycmVkIHdoZW4gZmV0Y2hpbmcgdGVtcGxhdGVzIGZyb20gJHtXQVpVSF9JTkRFWEVSX05BTUV9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGFzdENoYXIgPVxuICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYXR0ZXJuW3JlcXVlc3QucGFyYW1zLnBhdHRlcm4ubGVuZ3RoIC0gMV07XG5cbiAgICAgIC8vIFNwbGl0IGludG8gc2VwYXJhdGUgcGF0dGVybnNcbiAgICAgIGNvbnN0IHRtcGRhdGEgPSB0ZW1wbGF0ZXMubWF0Y2goL1xcWy4qXFxdL2cpO1xuICAgICAgY29uc3QgdG1wYXJyYXkgPSBbXTtcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgdG1wZGF0YSkge1xuICAgICAgICAvLyBBIHRlbXBsYXRlIG1pZ2h0IHVzZSBtb3JlIHRoYW4gb25lIHBhdHRlcm5cbiAgICAgICAgaWYgKGl0ZW0uaW5jbHVkZXMoJywnKSkge1xuICAgICAgICAgIGl0ZW0gPSBpdGVtLnN1YnN0cigxKS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgY29uc3Qgc3ViSXRlbXMgPSBpdGVtLnNwbGl0KCcsJyk7XG4gICAgICAgICAgZm9yIChjb25zdCBzdWJpdGVtIG9mIHN1Ykl0ZW1zKSB7XG4gICAgICAgICAgICB0bXBhcnJheS5wdXNoKGBbJHtzdWJpdGVtLnRyaW0oKX1dYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRtcGFycmF5LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHdlIGFyZSBoYW5kbGluZyBqdXN0IHBhdHRlcm5zXG4gICAgICBjb25zdCBhcnJheSA9IHRtcGFycmF5LmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmluY2x1ZGVzKCdbJykgJiYgaXRlbS5pbmNsdWRlcygnXScpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgcGF0dGVybiA9XG4gICAgICAgIGxhc3RDaGFyID09PSAnKidcbiAgICAgICAgICA/IHJlcXVlc3QucGFyYW1zLnBhdHRlcm4uc2xpY2UoMCwgLTEpXG4gICAgICAgICAgOiByZXF1ZXN0LnBhcmFtcy5wYXR0ZXJuO1xuICAgICAgY29uc3QgaXNJbmNsdWRlZCA9IGFycmF5LmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IGl0ZW0uc2xpY2UoMSwgLTEpO1xuICAgICAgICBjb25zdCBsYXN0Q2hhciA9IGl0ZW1baXRlbS5sZW5ndGggLSAxXTtcbiAgICAgICAgaXRlbSA9IGxhc3RDaGFyID09PSAnKicgPyBpdGVtLnNsaWNlKDAsIC0xKSA6IGl0ZW07XG4gICAgICAgIHJldHVybiBpdGVtLmluY2x1ZGVzKHBhdHRlcm4pIHx8IHBhdHRlcm4uaW5jbHVkZXMoaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3dhenVoLWVsYXN0aWM6Z2V0VGVtcGxhdGUnLFxuICAgICAgICBgVGVtcGxhdGUgaXMgdmFsaWQ6ICR7XG4gICAgICAgICAgaXNJbmNsdWRlZCAmJiBBcnJheS5pc0FycmF5KGlzSW5jbHVkZWQpICYmIGlzSW5jbHVkZWQubGVuZ3RoXG4gICAgICAgICAgICA/ICd5ZXMnXG4gICAgICAgICAgICA6ICdubydcbiAgICAgICAgfWAsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGlzSW5jbHVkZWQgJiYgQXJyYXkuaXNBcnJheShpc0luY2x1ZGVkKSAmJiBpc0luY2x1ZGVkLmxlbmd0aFxuICAgICAgICA/IHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgIGRhdGE6IGBUZW1wbGF0ZSBmb3VuZCBmb3IgJHtyZXF1ZXN0LnBhcmFtcy5wYXR0ZXJufWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIDogcmVzcG9uc2Uub2soe1xuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgIGRhdGE6IGBObyB0ZW1wbGF0ZSBmb3VuZCBmb3IgJHtyZXF1ZXN0LnBhcmFtcy5wYXR0ZXJufWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3dhenVoLWVsYXN0aWM6Z2V0VGVtcGxhdGUnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBgQ291bGQgbm90IHJldHJpZXZlIHRlbXBsYXRlcyBmcm9tICR7V0FaVUhfSU5ERVhFUl9OQU1FfSBkdWUgdG8gJHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yXG4gICAgICAgIH1gLFxuICAgICAgICA0MDAyLFxuICAgICAgICA1MDAsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBjaGVjayBpbmRleC1wYXR0ZXJuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0dXMgb2JqIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG5cbiAgLyoqXG4gICAqIFRoaXMgZ2V0IHRoZSBmaWVsZHMga2V5c1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge0FycmF5PE9iamVjdD59IGZpZWxkcyBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBnZXRGaWVsZFRvcChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0PFxuICAgICAgeyBtb2RlOiBzdHJpbmc7IGNsdXN0ZXI6IHN0cmluZzsgZmllbGQ6IHN0cmluZzsgcGF0dGVybjogc3RyaW5nIH0sXG4gICAgICB7IGFnZW50c0xpc3Q6IHN0cmluZyB9XG4gICAgPixcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBUb3AgZmllbGQgcGF5bG9hZFxuICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgIHNpemU6IDEsXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgbXVzdDogW10sXG4gICAgICAgICAgICBtdXN0X25vdDoge1xuICAgICAgICAgICAgICB0ZXJtOiB7XG4gICAgICAgICAgICAgICAgJ2FnZW50LmlkJzogJzAwMCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByYW5nZTogeyB0aW1lc3RhbXA6IHt9IH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGFnZ3M6IHtcbiAgICAgICAgICAnMic6IHtcbiAgICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgb3JkZXI6IHsgX2NvdW50OiAnZGVzYycgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFNldCB1cCB0aW1lIGludGVydmFsLCBkZWZhdWx0IHRvIExhc3QgMjRoXG4gICAgICBjb25zdCB0aW1lR1RFID0gJ25vdy0xZCc7XG4gICAgICBjb25zdCB0aW1lTFQgPSAnbm93JztcbiAgICAgIHBheWxvYWQucXVlcnkuYm9vbC5maWx0ZXJbMF0ucmFuZ2VbJ3RpbWVzdGFtcCddWydndGUnXSA9IHRpbWVHVEU7XG4gICAgICBwYXlsb2FkLnF1ZXJ5LmJvb2wuZmlsdGVyWzBdLnJhbmdlWyd0aW1lc3RhbXAnXVsnbHQnXSA9IHRpbWVMVDtcblxuICAgICAgLy8gU2V0IHVwIG1hdGNoIGZvciBkZWZhdWx0IGNsdXN0ZXIgbmFtZVxuICAgICAgcGF5bG9hZC5xdWVyeS5ib29sLm11c3QucHVzaChcbiAgICAgICAgcmVxdWVzdC5wYXJhbXMubW9kZSA9PT0gJ2NsdXN0ZXInXG4gICAgICAgICAgPyB7IG1hdGNoOiB7ICdjbHVzdGVyLm5hbWUnOiByZXF1ZXN0LnBhcmFtcy5jbHVzdGVyIH0gfVxuICAgICAgICAgIDogeyBtYXRjaDogeyAnbWFuYWdlci5uYW1lJzogcmVxdWVzdC5wYXJhbXMuY2x1c3RlciB9IH0sXG4gICAgICApO1xuXG4gICAgICBpZiAocmVxdWVzdC5xdWVyeS5hZ2VudHNMaXN0KVxuICAgICAgICBwYXlsb2FkLnF1ZXJ5LmJvb2wuZmlsdGVyLnB1c2goe1xuICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAnYWdlbnQuaWQnOiByZXF1ZXN0LnF1ZXJ5LmFnZW50c0xpc3Quc3BsaXQoJywnKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIHBheWxvYWQuYWdnc1snMiddLnRlcm1zLmZpZWxkID0gcmVxdWVzdC5wYXJhbXMuZmllbGQ7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgICBzaXplOiAxLFxuICAgICAgICBpbmRleDogcmVxdWVzdC5wYXJhbXMucGF0dGVybixcbiAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGF0YS5ib2R5LmhpdHMudG90YWwudmFsdWUgPT09IDAgfHxcbiAgICAgICAgdHlwZW9mIGRhdGEuYm9keS5hZ2dyZWdhdGlvbnNbJzInXS5idWNrZXRzWzBdID09PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgIGJvZHk6IHsgc3RhdHVzQ29kZTogMjAwLCBkYXRhOiAnJyB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIDogcmVzcG9uc2Uub2soe1xuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEuYm9keS5hZ2dyZWdhdGlvbnNbJzInXS5idWNrZXRzWzBdLmtleSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnd2F6dWgtZWxhc3RpYzpnZXRGaWVsZFRvcCcsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAwNCwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBvbmUgYnkgb25lIGlmIHRoZSByZXF1ZXN0aW5nIHVzZXIgaGFzIGVub3VnaCBwcml2aWxlZ2VzIHRvIHVzZVxuICAgKiBhbiBpbmRleCBwYXR0ZXJuIGZyb20gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gbGlzdCBMaXN0IG9mIGluZGV4IHBhdHRlcm5zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXFcbiAgICogQHJldHVybnMge0FycmF5PE9iamVjdD59IExpc3Qgb2YgYWxsb3dlZCBpbmRleFxuICAgKi9cbiAgYXN5bmMgZmlsdGVyQWxsb3dlZEluZGV4UGF0dGVybkxpc3QoY29udGV4dCwgbGlzdCwgcmVxKSB7XG4gICAgLy9UT0RPOiByZXZpZXcgaWYgbmVjZXNhcnkgdG8gZGVsZXRlXG4gICAgbGV0IGZpbmFsTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xuICAgICAgbGV0IHJlc3VsdHMgPSBmYWxzZSxcbiAgICAgICAgZm9yYmlkZGVuID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHRzID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgICAgICBpbmRleDogaXRlbS50aXRsZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBmb3JiaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAoKChyZXN1bHRzIHx8IHt9KS5ib2R5IHx8IHt9KS5oaXRzIHx8IHt9KS50b3RhbC52YWx1ZSA+PSAxIHx8XG4gICAgICAgICghZm9yYmlkZGVuICYmICgoKHJlc3VsdHMgfHwge30pLmJvZHkgfHwge30pLmhpdHMgfHwge30pLnRvdGFsID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIGZpbmFsTGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmluYWxMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgbWluaW11bSBpbmRleCBwYXR0ZXJuIGZpZWxkcyBpbiBhIGxpc3Qgb2YgaW5kZXggcGF0dGVybnMuXG4gICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gaW5kZXhQYXR0ZXJuTGlzdCBMaXN0IG9mIGluZGV4IHBhdHRlcm5zXG4gICAqL1xuICB2YWxpZGF0ZUluZGV4UGF0dGVybihpbmRleFBhdHRlcm5MaXN0KSB7XG4gICAgY29uc3QgbWluaW11bSA9IFsndGltZXN0YW1wJywgJ3J1bGUuZ3JvdXBzJywgJ21hbmFnZXIubmFtZScsICdhZ2VudC5pZCddO1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRleFBhdHRlcm5MaXN0KSB7XG4gICAgICBsZXQgdmFsaWQsIHBhcnNlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoaW5kZXguYXR0cmlidXRlcy5maWVsZHMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhbGlkID0gcGFyc2VkLmZpbHRlcihpdGVtID0+IG1pbmltdW0uaW5jbHVkZXMoaXRlbS5uYW1lKSk7XG4gICAgICBpZiAodmFsaWQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgaWQ6IGluZGV4LmlkLFxuICAgICAgICAgIHRpdGxlOiBpbmRleC5hdHRyaWJ1dGVzLnRpdGxlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50IHNlY3VyaXR5IHBsYXRmb3JtXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXFcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcGx5XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBhc3luYyBnZXRDdXJyZW50UGxhdGZvcm0oXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdDx7IHVzZXI6IHN0cmluZyB9PixcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgcGxhdGZvcm06IGNvbnRleHQud2F6dWguc2VjdXJpdHkucGxhdGZvcm0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1lbGFzdGljOmdldEN1cnJlbnRQbGF0Zm9ybScsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAxMSwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHZpc3VhbGl6YXRpb25zIG1haW4gZmllbGRzIHRvIGZpdCBhIGNlcnRhaW4gcGF0dGVybi5cbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhcHBfb2JqZWN0cyBPYmplY3QgY29udGFpbmluZyByYXcgdmlzdWFsaXphdGlvbnMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBJbmRleC1wYXR0ZXJuIGlkIHRvIHVzZSBpbiB0aGUgdmlzdWFsaXphdGlvbnMuIEVnOiAnd2F6dWgtYWxlcnRzJ1xuICAgKi9cbiAgYXN5bmMgYnVpbGRWaXN1YWxpemF0aW9uc1JhdyhhcHBfb2JqZWN0cywgaWQsIG5hbWVzcGFjZSA9IGZhbHNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZ3VyYXRpb24oKTtcbiAgICAgIGxldCBtb25pdG9yaW5nUGF0dGVybiA9XG4gICAgICAgIChjb25maWcgfHwge30pWyd3YXp1aC5tb25pdG9yaW5nLnBhdHRlcm4nXSB8fFxuICAgICAgICBnZXRTZXR0aW5nRGVmYXVsdFZhbHVlKCd3YXp1aC5tb25pdG9yaW5nLnBhdHRlcm4nKTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3dhenVoLWVsYXN0aWM6YnVpbGRWaXN1YWxpemF0aW9uc1JhdycsXG4gICAgICAgIGBCdWlsZGluZyAke2FwcF9vYmplY3RzLmxlbmd0aH0gdmlzdWFsaXphdGlvbnNgLFxuICAgICAgICAnZGVidWcnLFxuICAgICAgKTtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3dhenVoLWVsYXN0aWM6YnVpbGRWaXN1YWxpemF0aW9uc1JhdycsXG4gICAgICAgIGBJbmRleCBwYXR0ZXJuIElEOiAke2lkfWAsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICApO1xuICAgICAgY29uc3QgdmlzQXJyYXkgPSBbXTtcbiAgICAgIGxldCBhdXhfc291cmNlLCBidWxrX2NvbnRlbnQ7XG4gICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGFwcF9vYmplY3RzKSB7XG4gICAgICAgIGF1eF9zb3VyY2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuX3NvdXJjZSkpO1xuXG4gICAgICAgIC8vIFJlcGxhY2UgaW5kZXgtcGF0dGVybiBmb3IgdmlzdWFsaXphdGlvbnNcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGF1eF9zb3VyY2UgJiZcbiAgICAgICAgICBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YSAmJlxuICAgICAgICAgIGF1eF9zb3VyY2Uua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT04gJiZcbiAgICAgICAgICB0eXBlb2YgYXV4X3NvdXJjZS5raWJhbmFTYXZlZE9iamVjdE1ldGEuc2VhcmNoU291cmNlSlNPTiA9PT0gJ3N0cmluZydcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdFN0ciA9IGF1eF9zb3VyY2Uua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT047XG5cbiAgICAgICAgICBjb25zdCBpc01vbml0b3JpbmcgPSBkZWZhdWx0U3RyLmluY2x1ZGVzKCd3YXp1aC1tb25pdG9yaW5nJyk7XG4gICAgICAgICAgaWYgKGlzTW9uaXRvcmluZykge1xuICAgICAgICAgICAgaWYgKG5hbWVzcGFjZSAmJiBuYW1lc3BhY2UgIT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbW9uaXRvcmluZ1BhdHRlcm4uaW5jbHVkZXMobmFtZXNwYWNlKSAmJlxuICAgICAgICAgICAgICAgIG1vbml0b3JpbmdQYXR0ZXJuLmluY2x1ZGVzKCdpbmRleC1wYXR0ZXJuOicpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG1vbml0b3JpbmdQYXR0ZXJuID1cbiAgICAgICAgICAgICAgICAgIG1vbml0b3JpbmdQYXR0ZXJuLnNwbGl0KCdpbmRleC1wYXR0ZXJuOicpWzFdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YS5zZWFyY2hTb3VyY2VKU09OID1cbiAgICAgICAgICAgICAgZGVmYXVsdFN0ci5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC93YXp1aC1tb25pdG9yaW5nL2csXG4gICAgICAgICAgICAgICAgbW9uaXRvcmluZ1BhdHRlcm5bbW9uaXRvcmluZ1BhdHRlcm4ubGVuZ3RoIC0gMV0gPT09ICcqJyB8fFxuICAgICAgICAgICAgICAgICAgKG5hbWVzcGFjZSAmJiBuYW1lc3BhY2UgIT09ICdkZWZhdWx0JylcbiAgICAgICAgICAgICAgICAgID8gbW9uaXRvcmluZ1BhdHRlcm5cbiAgICAgICAgICAgICAgICAgIDogbW9uaXRvcmluZ1BhdHRlcm4gKyAnKicsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF1eF9zb3VyY2Uua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT04gPVxuICAgICAgICAgICAgICBkZWZhdWx0U3RyLnJlcGxhY2UoL3dhenVoLWFsZXJ0cy9nLCBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVwbGFjZSBpbmRleC1wYXR0ZXJuIGZvciBzZWxlY3RvciB2aXN1YWxpemF0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIChhdXhfc291cmNlIHx8IHt9KS52aXNTdGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhdXhfc291cmNlLnZpc1N0YXRlID0gYXV4X3NvdXJjZS52aXNTdGF0ZS5yZXBsYWNlKFxuICAgICAgICAgICAgL3dhenVoLWFsZXJ0cy9nLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1bGsgc291cmNlXG4gICAgICAgIGJ1bGtfY29udGVudCA9IHt9O1xuICAgICAgICBidWxrX2NvbnRlbnRbZWxlbWVudC5fdHlwZV0gPSBhdXhfc291cmNlO1xuXG4gICAgICAgIHZpc0FycmF5LnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IGJ1bGtfY29udGVudC52aXN1YWxpemF0aW9uLFxuICAgICAgICAgIHR5cGU6IGVsZW1lbnQuX3R5cGUsXG4gICAgICAgICAgaWQ6IGVsZW1lbnQuX2lkLFxuICAgICAgICAgIF92ZXJzaW9uOiBidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbi52ZXJzaW9uLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2aXNBcnJheTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1lbGFzdGljOmJ1aWxkVmlzdWFsaXphdGlvbnNSYXcnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGNsdXN0ZXIgdmlzdWFsaXphdGlvbnMgbWFpbiBmaWVsZHMuXG4gICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gYXBwX29iamVjdHMgT2JqZWN0IGNvbnRhaW5pbmcgcmF3IHZpc3VhbGl6YXRpb25zLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgSW5kZXgtcGF0dGVybiBpZCB0byB1c2UgaW4gdGhlIHZpc3VhbGl6YXRpb25zLiBFZzogJ3dhenVoLWFsZXJ0cydcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSBub2RlcyBBcnJheSBvZiBub2RlIG5hbWVzLiBFZzogWydub2RlMDEnLCAnbm9kZTAyJ11cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgQ2x1c3RlciBuYW1lLiBFZzogJ3dhenVoJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWFzdGVyX25vZGUgTWFzdGVyIG5vZGUgbmFtZS4gRWc6ICdub2RlMDEnXG4gICAqL1xuICBidWlsZENsdXN0ZXJWaXN1YWxpemF0aW9uc1JhdyhcbiAgICBhcHBfb2JqZWN0cyxcbiAgICBpZCxcbiAgICBub2RlcyA9IFtdLFxuICAgIG5hbWUsXG4gICAgbWFzdGVyX25vZGUsXG4gICAgcGF0dGVybl9uYW1lID0gJyonLFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmlzQXJyYXkgPSBbXTtcbiAgICAgIGxldCBhdXhfc291cmNlLCBidWxrX2NvbnRlbnQ7XG5cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBhcHBfb2JqZWN0cykge1xuICAgICAgICAvLyBTdHJpbmdpZnkgYW5kIHJlcGxhY2UgaW5kZXgtcGF0dGVybiBmb3IgdmlzdWFsaXphdGlvbnNcbiAgICAgICAgYXV4X3NvdXJjZSA9IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuX3NvdXJjZSk7XG4gICAgICAgIGF1eF9zb3VyY2UgPSBhdXhfc291cmNlLnJlcGxhY2UoL3dhenVoLWFsZXJ0cy9nLCBpZCk7XG4gICAgICAgIGF1eF9zb3VyY2UgPSBKU09OLnBhcnNlKGF1eF9zb3VyY2UpO1xuXG4gICAgICAgIC8vIEJ1bGsgc291cmNlXG4gICAgICAgIGJ1bGtfY29udGVudCA9IHt9O1xuICAgICAgICBidWxrX2NvbnRlbnRbZWxlbWVudC5fdHlwZV0gPSBhdXhfc291cmNlO1xuXG4gICAgICAgIGNvbnN0IHZpc1N0YXRlID0gSlNPTi5wYXJzZShidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbi52aXNTdGF0ZSk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gdmlzU3RhdGUudGl0bGU7XG5cbiAgICAgICAgaWYgKHRpdGxlLnN0YXJ0c1dpdGgoJ1dhenVoIEFwcCBTdGF0aXN0aWNzJykpIHtcbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPVxuICAgICAgICAgICAgYnVsa19jb250ZW50LnZpc3VhbGl6YXRpb24ua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT04ucmVwbGFjZShcbiAgICAgICAgICAgICAgJ1wiZmlsdGVyXCI6W10nLFxuICAgICAgICAgICAgICAnXCJmaWx0ZXJcIjpbe1wibWF0Y2hfcGhyYXNlXCI6e1wiYXBpTmFtZVwiOlwiJyArIG1hc3Rlcl9ub2RlICsgJ1wifX1dJyxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICBidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbi5raWJhbmFTYXZlZE9iamVjdE1ldGEuc2VhcmNoU291cmNlSlNPTiA9XG4gICAgICAgICAgICBmaWx0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlzU3RhdGUudHlwZSAmJiB2aXNTdGF0ZS50eXBlID09PSAndGltZWxpb24nKSB7XG4gICAgICAgICAgbGV0IHF1ZXJ5ID0gJyc7XG4gICAgICAgICAgaWYgKHRpdGxlID09PSAnV2F6dWggQXBwIENsdXN0ZXIgT3ZlcnZpZXcnKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgcXVlcnkgKz0gYC5lcyhpbmRleD0ke3BhdHRlcm5fbmFtZX0scT1cImNsdXN0ZXIubmFtZTogJHtuYW1lfSBBTkQgY2x1c3Rlci5ub2RlOiAke25vZGUubmFtZX1cIikubGFiZWwoXCIke25vZGUubmFtZX1cIiksYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkuc3Vic3RyaW5nKDAsIHF1ZXJ5Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGl0bGUgPT09ICdXYXp1aCBBcHAgQ2x1c3RlciBPdmVydmlldyBNYW5hZ2VyJykge1xuICAgICAgICAgICAgcXVlcnkgKz0gYC5lcyhpbmRleD0ke3BhdHRlcm5fbmFtZX0scT1cImNsdXN0ZXIubmFtZTogJHtuYW1lfVwiKS5sYWJlbChcIiR7bmFtZX0gY2x1c3RlclwiKWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlzU3RhdGUucGFyYW1zLmV4cHJlc3Npb24gPSBxdWVyeS5yZXBsYWNlKC8nL2csICdcIicpO1xuICAgICAgICAgIGJ1bGtfY29udGVudC52aXN1YWxpemF0aW9uLnZpc1N0YXRlID0gSlNPTi5zdHJpbmdpZnkodmlzU3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlzQXJyYXkucHVzaCh7XG4gICAgICAgICAgYXR0cmlidXRlczogYnVsa19jb250ZW50LnZpc3VhbGl6YXRpb24sXG4gICAgICAgICAgdHlwZTogZWxlbWVudC5fdHlwZSxcbiAgICAgICAgICBpZDogZWxlbWVudC5faWQsXG4gICAgICAgICAgX3ZlcnNpb246IGJ1bGtfY29udGVudC52aXN1YWxpemF0aW9uLnZlcnNpb24sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmlzQXJyYXk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZyhcbiAgICAgICAgJ3dhenVoLWVsYXN0aWM6YnVpbGRDbHVzdGVyVmlzdWFsaXphdGlvbnNSYXcnLFxuICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY3JlYXRlcyBhIHZpc3VhbGl6YXRpb24gb2YgZGF0YSBpbiByZXFcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHZpcyBvYmogb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgY3JlYXRlVmlzKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBwYXR0ZXJuOiBzdHJpbmc7IHRhYjogc3RyaW5nIH0+LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgIXJlcXVlc3QucGFyYW1zLnRhYi5pbmNsdWRlcygnb3ZlcnZpZXctJykgJiZcbiAgICAgICAgIXJlcXVlc3QucGFyYW1zLnRhYi5pbmNsdWRlcygnYWdlbnRzLScpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcnMgY3JlYXRpbmcgdmlzdWFsaXphdGlvbnMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFiUHJlZml4ID0gcmVxdWVzdC5wYXJhbXMudGFiLmluY2x1ZGVzKCdvdmVydmlldycpXG4gICAgICAgID8gJ292ZXJ2aWV3J1xuICAgICAgICA6ICdhZ2VudHMnO1xuXG4gICAgICBjb25zdCB0YWJTcGxpdCA9IHJlcXVlc3QucGFyYW1zLnRhYi5zcGxpdCgnLScpO1xuICAgICAgY29uc3QgdGFiU3VmaXggPSB0YWJTcGxpdFsxXTtcblxuICAgICAgY29uc3QgZmlsZSA9XG4gICAgICAgIHRhYlByZWZpeCA9PT0gJ292ZXJ2aWV3J1xuICAgICAgICAgID8gT3ZlcnZpZXdWaXN1YWxpemF0aW9uc1t0YWJTdWZpeF1cbiAgICAgICAgICA6IEFnZW50c1Zpc3VhbGl6YXRpb25zW3RhYlN1Zml4XTtcbiAgICAgIGlmICghZmlsZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uubm90Rm91bmQoe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBWaXN1YWxpemF0aW9ucyBub3QgZm91bmQgZm9yICR7cmVxdWVzdC5wYXJhbXMudGFifWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2coXG4gICAgICAgICd3YXp1aC1lbGFzdGljOmNyZWF0ZVZpcycsXG4gICAgICAgIGAke3RhYlByZWZpeH1bJHt0YWJTdWZpeH1dIHdpdGggaW5kZXggcGF0dGVybiAke3JlcXVlc3QucGFyYW1zLnBhdHRlcm59YCxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICk7XG4gICAgICBjb25zdCByYXcgPSBhd2FpdCB0aGlzLmJ1aWxkVmlzdWFsaXphdGlvbnNSYXcoXG4gICAgICAgIGZpbGUsXG4gICAgICAgIHJlcXVlc3QucGFyYW1zLnBhdHRlcm4sXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyBhY2tub3dsZWRnZTogdHJ1ZSwgcmF3OiByYXcgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3dhenVoLWVsYXN0aWM6Y3JlYXRlVmlzJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA0MDA3LCA1MDAsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBjcmVhdGVzIGEgdmlzdWFsaXphdGlvbiBvZiBjbHVzdGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB2aXMgb2JqIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGNyZWF0ZUNsdXN0ZXJWaXMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdDxcbiAgICAgIHsgcGF0dGVybjogc3RyaW5nOyB0YWI6IHN0cmluZyB9LFxuICAgICAgdW5rbm93bixcbiAgICAgIGFueVxuICAgID4sXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICAhcmVxdWVzdC5wYXJhbXMucGF0dGVybiB8fFxuICAgICAgICAhcmVxdWVzdC5wYXJhbXMudGFiIHx8XG4gICAgICAgICFyZXF1ZXN0LmJvZHkgfHxcbiAgICAgICAgIXJlcXVlc3QuYm9keS5ub2RlcyB8fFxuICAgICAgICAhcmVxdWVzdC5ib2R5Lm5vZGVzLmFmZmVjdGVkX2l0ZW1zIHx8XG4gICAgICAgICFyZXF1ZXN0LmJvZHkubm9kZXMubmFtZSB8fFxuICAgICAgICAocmVxdWVzdC5wYXJhbXMudGFiICYmICFyZXF1ZXN0LnBhcmFtcy50YWIuaW5jbHVkZXMoJ2NsdXN0ZXItJykpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBhcmFtZXRlcnMgY3JlYXRpbmcgdmlzdWFsaXphdGlvbnMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHlwZSA9IHJlcXVlc3QucGFyYW1zLnRhYi5zcGxpdCgnLScpWzFdO1xuXG4gICAgICBjb25zdCBmaWxlID0gQ2x1c3RlclZpc3VhbGl6YXRpb25zW3R5cGVdO1xuICAgICAgY29uc3Qgbm9kZXMgPSByZXF1ZXN0LmJvZHkubm9kZXMuYWZmZWN0ZWRfaXRlbXM7XG4gICAgICBjb25zdCBuYW1lID0gcmVxdWVzdC5ib2R5Lm5vZGVzLm5hbWU7XG4gICAgICBjb25zdCBtYXN0ZXJOb2RlID0gcmVxdWVzdC5ib2R5Lm5vZGVzLm1hc3Rlcl9ub2RlO1xuXG4gICAgICBjb25zdCB7IGlkOiBwYXR0ZXJuSUQsIHRpdGxlOiBwYXR0ZXJuTmFtZSB9ID0gcmVxdWVzdC5ib2R5LnBhdHRlcm47XG5cbiAgICAgIGNvbnN0IHJhdyA9IGF3YWl0IHRoaXMuYnVpbGRDbHVzdGVyVmlzdWFsaXphdGlvbnNSYXcoXG4gICAgICAgIGZpbGUsXG4gICAgICAgIHBhdHRlcm5JRCxcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG1hc3Rlck5vZGUsXG4gICAgICAgIHBhdHRlcm5OYW1lLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyBhY2tub3dsZWRnZTogdHJ1ZSwgcmF3OiByYXcgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3dhenVoLWVsYXN0aWM6Y3JlYXRlQ2x1c3RlclZpcycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAwOSwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIHNhbXBsZSBhbGVydHNcbiAgICogR0VUIC9lbGFzdGljL3NhbXBsZWFsZXJ0c1xuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2FsZXJ0czogWy4uLl19IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGhhdmVTYW1wbGVBbGVydHMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBpZiB3YXp1aCBzYW1wbGUgYWxlcnRzIGluZGV4IGV4aXN0c1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3Qua2V5cyhXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JJRVNfVFlQRV9BTEVSVFMpLm1hcChjYXRlZ29yeSA9PlxuICAgICAgICAgIGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLmluZGljZXMuZXhpc3RzKHtcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmJ1aWxkU2FtcGxlSW5kZXhCeUNhdGVnb3J5KGNhdGVnb3J5KSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IHNhbXBsZUFsZXJ0c0luc3RhbGxlZDogcmVzdWx0cy5zb21lKHJlc3VsdCA9PiByZXN1bHQuYm9keSkgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgJ1NhbXBsZSBBbGVydHMgY2F0ZWdvcnkgbm90IHZhbGlkJyxcbiAgICAgICAgMTAwMCxcbiAgICAgICAgNTAwLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIGNyZWF0ZXMgc2FtcGxlIGFsZXJ0cyBpbiB3YXp1aC1zYW1wbGUtYWxlcnRzXG4gICAqIEdFVCAvZWxhc3RpYy9zYW1wbGVhbGVydHMve2NhdGVnb3J5fVxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2FsZXJ0czogWy4uLl19IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGhhdmVTYW1wbGVBbGVydHNPZkNhdGVnb3J5KFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBjYXRlZ29yeTogc3RyaW5nIH0+LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhbXBsZUFsZXJ0c0luZGV4ID0gdGhpcy5idWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShcbiAgICAgICAgcmVxdWVzdC5wYXJhbXMuY2F0ZWdvcnksXG4gICAgICApO1xuICAgICAgLy8gQ2hlY2sgaWYgd2F6dWggc2FtcGxlIGFsZXJ0cyBpbmRleCBleGlzdHNcbiAgICAgIGNvbnN0IGV4aXN0c1NhbXBsZUluZGV4ID1cbiAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgIGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCwgZXhpc3RzOiBleGlzdHNTYW1wbGVJbmRleC5ib2R5IH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKFxuICAgICAgICAnd2F6dWgtZWxhc3RpYzpoYXZlU2FtcGxlQWxlcnRzT2ZDYXRlZ29yeScsXG4gICAgICAgIGBFcnJvciBjaGVja2luZyBpZiB0aGVyZSBhcmUgc2FtcGxlIGFsZXJ0cyBpbmRpY2VzOiAke1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBbc3RhdHVzQ29kZSwgZXJyb3JNZXNzYWdlXSA9IHRoaXMuZ2V0RXJyb3JEZXRhaWxzKGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBgRXJyb3IgY2hlY2tpbmcgaWYgdGhlcmUgYXJlIHNhbXBsZSBhbGVydHMgaW5kaWNlczogJHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICAgIDEwMDAsXG4gICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgY3JlYXRlcyBzYW1wbGUgYWxlcnRzIGluIHdhenVoLXNhbXBsZS1hbGVydHNcbiAgICogUE9TVCAvZWxhc3RpYy9zYW1wbGVhbGVydHMve2NhdGVnb3J5fVxuICAgKiB7XG4gICAqICAgXCJtYW5hZ2VyXCI6IHtcbiAgICogICAgICBcIm5hbWVcIjogXCJtYW5hZ2VyX25hbWVcIlxuICAgKiAgICB9LFxuICAgKiAgICBjbHVzdGVyOiB7XG4gICAqICAgICAgbmFtZTogXCJteWNsdXN0ZXJcIixcbiAgICogICAgICBub2RlOiBcIm15bm9kZVwiXG4gICAqICAgIH1cbiAgICogfVxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2luZGV4OiBzdHJpbmcsIGFsZXJ0czogWy4uLl0sIGNvdW50OiBudW1iZXJ9IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGNyZWF0ZVNhbXBsZUFsZXJ0cyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0PHsgY2F0ZWdvcnk6IHN0cmluZyB9PixcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIGNvbnN0IHNhbXBsZUFsZXJ0c0luZGV4ID0gdGhpcy5idWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShcbiAgICAgIHJlcXVlc3QucGFyYW1zLmNhdGVnb3J5LFxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gQ2hlY2sgaWYgdXNlciBoYXMgYWRtaW5pc3RyYXRvciByb2xlIGluIHRva2VuXG4gICAgICBjb25zdCB0b2tlbiA9IGdldENvb2tpZVZhbHVlQnlOYW1lKHJlcXVlc3QuaGVhZGVycy5jb29raWUsICd3ei10b2tlbicpO1xuICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZSgnTm8gdG9rZW4gcHJvdmlkZWQnLCA0MDEsIDQwMSwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGVjb2RlZFRva2VuID0gand0RGVjb2RlKHRva2VuKTtcbiAgICAgIGlmICghZGVjb2RlZFRva2VuKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKCdObyBwZXJtaXNzaW9ucyBpbiB0b2tlbicsIDQwMSwgNDAxLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFkZWNvZGVkVG9rZW4ucmJhY19yb2xlcyB8fFxuICAgICAgICAhZGVjb2RlZFRva2VuLnJiYWNfcm9sZXMuaW5jbHVkZXMoV0FaVUhfUk9MRV9BRE1JTklTVFJBVE9SX0lEKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKCdObyBhZG1pbmlzdHJhdG9yIHJvbGUnLCA0MDEsIDQwMSwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgdGhlIHByb3ZpZGVkIHRva2VuIGlzIHZhbGlkXG4gICAgICBjb25zdCBhcGlIb3N0SUQgPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShyZXF1ZXN0LmhlYWRlcnMuY29va2llLCAnd3otYXBpJyk7XG4gICAgICBpZiAoIWFwaUhvc3RJRCkge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZSgnTm8gQVBJIGlkIHByb3ZpZGVkJywgNDAxLCA0MDEsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3BvbnNlVG9rZW5Jc1dvcmtpbmcgPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICdHRVQnLFxuICAgICAgICAgIGAvL2AsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBhcGlIb3N0SUQgfSxcbiAgICAgICAgKTtcbiAgICAgIGlmIChyZXNwb25zZVRva2VuSXNXb3JraW5nLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKCdUb2tlbiBpcyBub3QgdmFsaWQnLCA1MDAsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidWxrUHJlZml4ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpbmRleDoge1xuICAgICAgICAgIF9pbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGFsZXJ0R2VuZXJhdGVQYXJhbXMgPSAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keS5wYXJhbXMpIHx8IHt9O1xuXG4gICAgICBjb25zdCBzYW1wbGVBbGVydHMgPSBXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JJRVNfVFlQRV9BTEVSVFNbXG4gICAgICAgIHJlcXVlc3QucGFyYW1zLmNhdGVnb3J5XG4gICAgICBdXG4gICAgICAgIC5tYXAodHlwZUFsZXJ0ID0+XG4gICAgICAgICAgZ2VuZXJhdGVBbGVydHMoXG4gICAgICAgICAgICB7IC4uLnR5cGVBbGVydCwgLi4uYWxlcnRHZW5lcmF0ZVBhcmFtcyB9LFxuICAgICAgICAgICAgcmVxdWVzdC5ib2R5LmFsZXJ0cyB8fFxuICAgICAgICAgICAgICB0eXBlQWxlcnQuYWxlcnRzIHx8XG4gICAgICAgICAgICAgIFdBWlVIX1NBTVBMRV9BTEVSVFNfREVGQVVMVF9OVU1CRVJfQUxFUlRTLFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgICAgLmZsYXQoKTtcbiAgICAgIGNvbnN0IGJ1bGsgPSBzYW1wbGVBbGVydHNcbiAgICAgICAgLm1hcChzYW1wbGVBbGVydCA9PiBgJHtidWxrUHJlZml4fVxcbiR7SlNPTi5zdHJpbmdpZnkoc2FtcGxlQWxlcnQpfVxcbmApXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgLy8gSW5kZXggYWxlcnRzXG5cbiAgICAgIC8vIENoZWNrIGlmIHdhenVoIHNhbXBsZSBhbGVydHMgaW5kZXggZXhpc3RzXG4gICAgICBjb25zdCBleGlzdHNTYW1wbGVJbmRleCA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLmluZGljZXMuZXhpc3RzKHtcbiAgICAgICAgICBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgaWYgKCFleGlzdHNTYW1wbGVJbmRleC5ib2R5KSB7XG4gICAgICAgIC8vIENyZWF0ZSB3YXp1aCBzYW1wbGUgYWxlcnRzIGluZGV4XG5cbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICAgICAgbnVtYmVyX29mX3NoYXJkczogV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9TSEFSRFMsXG4gICAgICAgICAgICAgIG51bWJlcl9vZl9yZXBsaWNhczogV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9SRVBMSUNBUyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5pbmRpY2VzLmNyZWF0ZSh7XG4gICAgICAgICAgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4LFxuICAgICAgICAgIGJvZHk6IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgICBsb2coXG4gICAgICAgICAgJ3dhenVoLWVsYXN0aWM6Y3JlYXRlU2FtcGxlQWxlcnRzJyxcbiAgICAgICAgICBgQ3JlYXRlZCAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleGAsXG4gICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuYnVsayh7XG4gICAgICAgIGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCxcbiAgICAgICAgYm9keTogYnVsayxcbiAgICAgIH0pO1xuICAgICAgbG9nKFxuICAgICAgICAnd2F6dWgtZWxhc3RpYzpjcmVhdGVTYW1wbGVBbGVydHMnLFxuICAgICAgICBgQWRkZWQgc2FtcGxlIGFsZXJ0cyB0byAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleGAsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsIGFsZXJ0Q291bnQ6IHNhbXBsZUFsZXJ0cy5sZW5ndGggfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coXG4gICAgICAgICd3YXp1aC1lbGFzdGljOmNyZWF0ZVNhbXBsZUFsZXJ0cycsXG4gICAgICAgIGBFcnJvciBhZGRpbmcgc2FtcGxlIGFsZXJ0cyB0byAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleDogJHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yXG4gICAgICAgIH1gLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgW3N0YXR1c0NvZGUsIGVycm9yTWVzc2FnZV0gPSB0aGlzLmdldEVycm9yRGV0YWlscyhlcnJvcik7XG5cbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yTWVzc2FnZSB8fCBlcnJvciwgMTAwMCwgc3RhdHVzQ29kZSwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhpcyBkZWxldGVzIHNhbXBsZSBhbGVydHNcbiAgICogQHBhcmFtIHsqfSBjb250ZXh0XG4gICAqIEBwYXJhbSB7Kn0gcmVxdWVzdFxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXG4gICAqIHtyZXN1bHQ6IFwiZGVsZXRlZFwiLCBpbmRleDogc3RyaW5nfSBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBkZWxldGVTYW1wbGVBbGVydHMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdDx7IGNhdGVnb3J5OiBzdHJpbmcgfT4sXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICAvLyBEZWxldGUgV2F6dWggc2FtcGxlIGFsZXJ0IGluZGV4XG5cbiAgICBjb25zdCBzYW1wbGVBbGVydHNJbmRleCA9IHRoaXMuYnVpbGRTYW1wbGVJbmRleEJ5Q2F0ZWdvcnkoXG4gICAgICByZXF1ZXN0LnBhcmFtcy5jYXRlZ29yeSxcbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIGFkbWluaXN0cmF0b3Igcm9sZSBpbiB0b2tlblxuICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShyZXF1ZXN0LmhlYWRlcnMuY29va2llLCAnd3otdG9rZW4nKTtcbiAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoJ05vIHRva2VuIHByb3ZpZGVkJywgNDAxLCA0MDEsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRlY29kZWRUb2tlbiA9IGp3dERlY29kZSh0b2tlbik7XG4gICAgICBpZiAoIWRlY29kZWRUb2tlbikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZSgnTm8gcGVybWlzc2lvbnMgaW4gdG9rZW4nLCA0MDEsIDQwMSwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhZGVjb2RlZFRva2VuLnJiYWNfcm9sZXMgfHxcbiAgICAgICAgIWRlY29kZWRUb2tlbi5yYmFjX3JvbGVzLmluY2x1ZGVzKFdBWlVIX1JPTEVfQURNSU5JU1RSQVRPUl9JRClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZSgnTm8gYWRtaW5pc3RyYXRvciByb2xlJywgNDAxLCA0MDEsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIHRoZSBwcm92aWRlZCB0b2tlbiBpcyB2YWxpZFxuICAgICAgY29uc3QgYXBpSG9zdElEID0gZ2V0Q29va2llVmFsdWVCeU5hbWUocmVxdWVzdC5oZWFkZXJzLmNvb2tpZSwgJ3d6LWFwaScpO1xuICAgICAgaWYgKCFhcGlIb3N0SUQpIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoJ05vIEFQSSBpZCBwcm92aWRlZCcsIDQwMSwgNDAxLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXNwb25zZVRva2VuSXNXb3JraW5nID1cbiAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICBgLy9gLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHsgYXBpSG9zdElEIH0sXG4gICAgICAgICk7XG4gICAgICBpZiAocmVzcG9uc2VUb2tlbklzV29ya2luZy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZSgnVG9rZW4gaXMgbm90IHZhbGlkJywgNTAwLCA1MDAsIHJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgV2F6dWggc2FtcGxlIGFsZXJ0cyBpbmRleCBleGlzdHNcbiAgICAgIGNvbnN0IGV4aXN0c1NhbXBsZUluZGV4ID1cbiAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgIGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICBpZiAoZXhpc3RzU2FtcGxlSW5kZXguYm9keSkge1xuICAgICAgICAvLyBEZWxldGUgV2F6dWggc2FtcGxlIGFsZXJ0cyBpbmRleFxuICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5pbmRpY2VzLmRlbGV0ZSh7XG4gICAgICAgICAgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgbG9nKFxuICAgICAgICAgICd3YXp1aC1lbGFzdGljOmRlbGV0ZVNhbXBsZUFsZXJ0cycsXG4gICAgICAgICAgYERlbGV0ZWQgJHtzYW1wbGVBbGVydHNJbmRleH0gaW5kZXhgLFxuICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogeyByZXN1bHQ6ICdkZWxldGVkJywgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4IH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgYCR7c2FtcGxlQWxlcnRzSW5kZXh9IGluZGV4IGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgICAgIDEwMDAsXG4gICAgICAgICAgNTAwLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coXG4gICAgICAgICd3YXp1aC1lbGFzdGljOmRlbGV0ZVNhbXBsZUFsZXJ0cycsXG4gICAgICAgIGBFcnJvciBkZWxldGluZyBzYW1wbGUgYWxlcnRzIG9mICR7c2FtcGxlQWxlcnRzSW5kZXh9IGluZGV4OiAke1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICApO1xuICAgICAgY29uc3QgW3N0YXR1c0NvZGUsIGVycm9yTWVzc2FnZV0gPSB0aGlzLmdldEVycm9yRGV0YWlscyhlcnJvcik7XG5cbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yTWVzc2FnZSB8fCBlcnJvciwgMTAwMCwgc3RhdHVzQ29kZSwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFsZXJ0cyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goXG4gICAgICAgIHJlcXVlc3QuYm9keSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiBkYXRhLmJvZHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1lbGFzdGljOmFsZXJ0cycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAxMCwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIGluZGljZXMgZm9yIFN0YXRpc3RpY3NcbiAgYXN5bmMgZXhpc3RTdGF0aXN0aWNzSW5kaWNlcyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZ3VyYXRpb24oKTtcbiAgICAgIGNvbnN0IHN0YXRpc3RpY3NQYXR0ZXJuID0gYCR7Y29uZmlnWydjcm9uLnByZWZpeCddIHx8ICd3YXp1aCd9LSR7XG4gICAgICAgIGNvbmZpZ1snY3Jvbi5zdGF0aXN0aWNzLmluZGV4Lm5hbWUnXSB8fCAnc3RhdGlzdGljcydcbiAgICAgIH0qYDsgLy9UT0RPOiByZXBsYWNlIGJ5IGRlZmF1bHQgYXMgY29uc3RhbnRzIGluc3RlYWQgaGFyZGNvZGVkICgnd2F6dWgnIGFuZCAnc3RhdGlzdGljcycpXG4gICAgICBjb25zdCBleGlzdEluZGV4ID1cbiAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgIGluZGV4OiBzdGF0aXN0aWNzUGF0dGVybixcbiAgICAgICAgICBhbGxvd19ub19pbmRpY2VzOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiBleGlzdEluZGV4LmJvZHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1lbGFzdGljOmV4aXN0c1N0YXRpc3RpY3NJbmRpY2VzJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCAxMDAwLCA1MDAsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRFcnJvckRldGFpbHMoZXJyb3IpIHtcbiAgICBjb25zdCBzdGF0dXNDb2RlID0gZXJyb3I/Lm1ldGE/LnN0YXR1c0NvZGUgfHwgNTAwO1xuICAgIGxldCBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXG4gICAgaWYgKHN0YXR1c0NvZGUgPT09IDQwMykge1xuICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3I/Lm1ldGE/LmJvZHk/LmVycm9yPy5yZWFzb24gfHwgJ1Blcm1pc3Npb24gZGVuaWVkJztcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXR1c0NvZGUsIGVycm9yTWVzc2FnZV07XG4gIH1cbn1cbiJdfQ==