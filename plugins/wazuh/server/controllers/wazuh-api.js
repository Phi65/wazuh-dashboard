"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhApiCtrl = void 0;

var _errorResponse = require("../lib/error-response");

var _json2csv = require("json2csv");

var _logger = require("../lib/logger");

var _csvKeyEquivalence = require("../../common/csv-key-equivalence");

var _apiErrorsEquivalence = require("../lib/api-errors-equivalence");

var _endpoints = _interopRequireDefault(require("../../common/api-info/endpoints"));

var _constants = require("../../common/constants");

var _settings = require("../../common/services/settings");

var _queue = require("../start/queue");

var _fs = _interopRequireDefault(require("fs"));

var _manageHosts = require("../lib/manage-hosts");

var _updateRegistry = require("../lib/update-registry");

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _cacheApiUserHasRunAs = require("../lib/cache-api-user-has-run-as");

var _cookie = require("../lib/cookie");

var _getConfiguration = require("../lib/get-configuration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WazuhApiCtrl {
  constructor() {
    _defineProperty(this, "manageHosts", void 0);

    _defineProperty(this, "updateRegistry", void 0);

    this.manageHosts = new _manageHosts.ManageHosts();
    this.updateRegistry = new _updateRegistry.UpdateRegistry();
  }

  async getToken(context, request, response) {
    try {
      const {
        force,
        idHost
      } = request.body;
      const {
        username
      } = await context.wazuh.security.getCurrentUser(request, context);

      if (!force && request.headers.cookie && username === decodeURIComponent((0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-user')) && idHost === (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api')) {
        const wzToken = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-token');

        if (wzToken) {
          try {
            // if the current token is not a valid jwt token we ask for a new one
            const decodedToken = (0, _jwtDecode.default)(wzToken);
            const expirationTime = decodedToken.exp - Date.now() / 1000;

            if (wzToken && expirationTime > 0) {
              return response.ok({
                body: {
                  token: wzToken
                }
              });
            }
          } catch (error) {
            (0, _logger.log)('wazuh-api:getToken', error.message || error);
          }
        }
      }

      let token;

      if ((await _cacheApiUserHasRunAs.APIUserAllowRunAs.canUse(idHost)) == _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.ENABLED) {
        token = await context.wazuh.api.client.asCurrentUser.authenticate(idHost);
      } else {
        token = await context.wazuh.api.client.asInternalUser.authenticate(idHost);
      }

      let textSecure = '';

      if (context.wazuh.server.info.protocol === 'https') {
        textSecure = ';Secure';
      }

      const encodedUser = encodeURIComponent(username);
      return response.ok({
        headers: {
          'set-cookie': [`wz-token=${token};Path=/;HttpOnly${textSecure}`, `wz-user=${encodedUser};Path=/;HttpOnly${textSecure}`, `wz-api=${idHost};Path=/;HttpOnly`]
        },
        body: {
          token
        }
      });
    } catch (error) {
      var _error$response;

      const errorMessage = ((error.response || {}).data || {}).detail || error.message || error;
      (0, _logger.log)('wazuh-api:getToken', errorMessage);
      return (0, _errorResponse.ErrorResponse)(`Error getting the authorization token: ${errorMessage}`, 3000, (error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * Returns if the wazuh-api configuration is working
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */


  async checkStoredAPI(context, request, response) {
    try {
      // Get config from wazuh.yml
      const id = request.body.id;
      const api = await this.manageHosts.getHostById(id); // Check Manage Hosts

      if (!Object.keys(api).length) {
        throw new Error('Could not find Wazuh API entry on wazuh.yml');
      }

      (0, _logger.log)('wazuh-api:checkStoredAPI', `${id} exists`, 'debug'); // Fetch needed information about the cluster and the manager itself

      const responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('get', `/manager/info`, {}, {
        apiHostID: id,
        forceRefresh: true
      }); // Look for socket-related errors

      if (this.checkResponseIsDown(responseManagerInfo)) {
        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${responseManagerInfo.data.detail || 'Wazuh not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      } // If we have a valid response from the Wazuh API


      if (responseManagerInfo.status === _constants.HTTP_STATUS_CODES.OK && responseManagerInfo.data) {
        // Clear and update cluster information before being sent back to frontend
        delete api.cluster_info;
        const responseAgents = await context.wazuh.api.client.asInternalUser.request('GET', `/agents`, {
          params: {
            agents_list: '000'
          }
        }, {
          apiHostID: id
        });

        if (responseAgents.status === _constants.HTTP_STATUS_CODES.OK) {
          const managerName = responseAgents.data.data.affected_items[0].manager;
          const responseClusterStatus = await context.wazuh.api.client.asInternalUser.request('GET', `/cluster/status`, {}, {
            apiHostID: id
          });

          if (responseClusterStatus.status === _constants.HTTP_STATUS_CODES.OK) {
            if (responseClusterStatus.data.data.enabled === 'yes') {
              const responseClusterLocalInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/cluster/local/info`, {}, {
                apiHostID: id
              });

              if (responseClusterLocalInfo.status === _constants.HTTP_STATUS_CODES.OK) {
                const clusterEnabled = responseClusterStatus.data.data.enabled === 'yes';
                api.cluster_info = {
                  status: clusterEnabled ? 'enabled' : 'disabled',
                  manager: managerName,
                  node: responseClusterLocalInfo.data.data.affected_items[0].node,
                  cluster: clusterEnabled ? responseClusterLocalInfo.data.data.affected_items[0].cluster : 'Disabled'
                };
              }
            } else {
              // Cluster mode is not active
              api.cluster_info = {
                status: 'disabled',
                manager: managerName,
                cluster: 'Disabled'
              };
            }
          } else {
            // Cluster mode is not active
            api.cluster_info = {
              status: 'disabled',
              manager: managerName,
              cluster: 'Disabled'
            };
          }

          if (api.cluster_info) {
            // Update cluster information in the wazuh-registry.json
            await this.updateRegistry.updateClusterInfo(id, api.cluster_info); // Hide Wazuh API secret, username, password

            const copied = { ...api
            };
            copied.secret = '****';
            copied.password = '****';
            return response.ok({
              body: {
                statusCode: _constants.HTTP_STATUS_CODES.OK,
                data: copied,
                idChanged: request.body.idChanged || null
              }
            });
          }
        }
      } // If we have an invalid response from the Wazuh API


      throw new Error(responseManagerInfo.data.detail || `${api.url}:${api.port} is unreachable`);
    } catch (error) {
      if (error.code === 'EPROTO') {
        return response.ok({
          body: {
            statusCode: _constants.HTTP_STATUS_CODES.OK,
            data: {
              apiIsDown: true
            }
          }
        });
      } else if (error.code === 'ECONNREFUSED') {
        return response.ok({
          body: {
            statusCode: _constants.HTTP_STATUS_CODES.OK,
            data: {
              apiIsDown: true
            }
          }
        });
      } else {
        var _error$response3;

        try {
          const apis = await this.manageHosts.getHosts();

          for (const api of apis) {
            try {
              const id = Object.keys(api)[0];
              const responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/manager/info`, {}, {
                apiHostID: id
              });

              if (this.checkResponseIsDown(responseManagerInfo)) {
                return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${response.data.detail || 'Wazuh not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
              }

              if (responseManagerInfo.status === _constants.HTTP_STATUS_CODES.OK) {
                request.body.id = id;
                request.body.idChanged = id;
                return await this.checkStoredAPI(context, request, response);
              }
            } catch (error) {} // eslint-disable-line

          }
        } catch (error) {
          var _error$response2;

          (0, _logger.log)('wazuh-api:checkStoredAPI', error.message || error);
          return (0, _errorResponse.ErrorResponse)(error.message || error, 3020, (error === null || error === void 0 ? void 0 : (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
        }

        (0, _logger.log)('wazuh-api:checkStoredAPI', error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 3002, (error === null || error === void 0 ? void 0 : (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
    }
  }
  /**
   * This perfoms a validation of API params
   * @param {Object} body API params
   */


  validateCheckApiParams(body) {
    if (!('username' in body)) {
      return 'Missing param: API USERNAME';
    }

    if (!('password' in body) && !('id' in body)) {
      return 'Missing param: API PASSWORD';
    }

    if (!('url' in body)) {
      return 'Missing param: API URL';
    }

    if (!('port' in body)) {
      return 'Missing param: API PORT';
    }

    if (!body.url.includes('https://') && !body.url.includes('http://')) {
      return 'protocol_error';
    }

    return false;
  }
  /**
   * This check the wazuh-api configuration received in the POST body will work
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */


  async checkAPI(context, request, response) {
    try {
      let apiAvailable = null; // const notValid = this.validateCheckApiParams(request.body);
      // if (notValid) return ErrorResponse(notValid, 3003, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);

      (0, _logger.log)('wazuh-api:checkAPI', `${request.body.id} is valid`, 'debug'); // Check if a Wazuh API id is given (already stored API)

      const data = await this.manageHosts.getHostById(request.body.id);

      if (data) {
        apiAvailable = data;
      } else {
        (0, _logger.log)('wazuh-api:checkAPI', `API ${request.body.id} not found`);
        return (0, _errorResponse.ErrorResponse)(`The API ${request.body.id} was not found`, 3029, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }

      const options = {
        apiHostID: request.body.id
      };

      if (request.body.forceRefresh) {
        options['forceRefresh'] = request.body.forceRefresh;
      }

      let responseManagerInfo;

      try {
        responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/manager/info`, {}, options);
      } catch (error) {
        var _error$response4, _error$response4$data, _error$response5;

        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${((_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : (_error$response4$data = _error$response4.data) === null || _error$response4$data === void 0 ? void 0 : _error$response4$data.detail) || 'Wazuh not ready yet'}`, 3099, (error === null || error === void 0 ? void 0 : (_error$response5 = error.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.status) || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      }

      (0, _logger.log)('wazuh-api:checkAPI', `${request.body.id} credentials are valid`, 'debug');

      if (responseManagerInfo.status === _constants.HTTP_STATUS_CODES.OK && responseManagerInfo.data) {
        let responseAgents = await context.wazuh.api.client.asInternalUser.request('GET', `/agents`, {
          params: {
            agents_list: '000'
          }
        }, {
          apiHostID: request.body.id
        });

        if (responseAgents.status === _constants.HTTP_STATUS_CODES.OK) {
          const managerName = responseAgents.data.data.affected_items[0].manager;
          let responseCluster = await context.wazuh.api.client.asInternalUser.request('GET', `/cluster/status`, {}, {
            apiHostID: request.body.id
          }); // Check the run_as for the API user and update it

          let apiUserAllowRunAs = _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.ALL_DISABLED;
          const responseApiUserAllowRunAs = await context.wazuh.api.client.asInternalUser.request('GET', `/security/users/me`, {}, {
            apiHostID: request.body.id
          });

          if (responseApiUserAllowRunAs.status === _constants.HTTP_STATUS_CODES.OK) {
            const allow_run_as = responseApiUserAllowRunAs.data.data.affected_items[0].allow_run_as;
            if (allow_run_as && apiAvailable && apiAvailable.run_as) // HOST AND USER ENABLED
              apiUserAllowRunAs = _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.ENABLED;else if (!allow_run_as && apiAvailable && apiAvailable.run_as) // HOST ENABLED AND USER DISABLED
              apiUserAllowRunAs = _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.USER_NOT_ALLOWED;else if (allow_run_as && (!apiAvailable || !apiAvailable.run_as)) // USER ENABLED AND HOST DISABLED
              apiUserAllowRunAs = _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.HOST_DISABLED;else if (!allow_run_as && (!apiAvailable || !apiAvailable.run_as)) // HOST AND USER DISABLED
              apiUserAllowRunAs = _cacheApiUserHasRunAs.API_USER_STATUS_RUN_AS.ALL_DISABLED;
          }

          _cacheApiUserHasRunAs.CacheInMemoryAPIUserAllowRunAs.set(request.body.id, apiAvailable.username, apiUserAllowRunAs);

          if (responseCluster.status === _constants.HTTP_STATUS_CODES.OK) {
            (0, _logger.log)('wazuh-api:checkStoredAPI', `Wazuh API response is valid`, 'debug');

            if (responseCluster.data.data.enabled === 'yes') {
              // If cluster mode is active
              let responseClusterLocal = await context.wazuh.api.client.asInternalUser.request('GET', `/cluster/local/info`, {}, {
                apiHostID: request.body.id
              });

              if (responseClusterLocal.status === _constants.HTTP_STATUS_CODES.OK) {
                return response.ok({
                  body: {
                    manager: managerName,
                    node: responseClusterLocal.data.data.affected_items[0].node,
                    cluster: responseClusterLocal.data.data.affected_items[0].cluster,
                    status: 'enabled',
                    allow_run_as: apiUserAllowRunAs
                  }
                });
              }
            } else {
              // Cluster mode is not active
              return response.ok({
                body: {
                  manager: managerName,
                  cluster: 'Disabled',
                  status: 'disabled',
                  allow_run_as: apiUserAllowRunAs
                }
              });
            }
          }
        }
      }
    } catch (error) {
      var _error$response6;

      (0, _logger.log)('wazuh-api:checkAPI', error.message || error);

      if (error && error.response && error.response.status === _constants.HTTP_STATUS_CODES.UNAUTHORIZED) {
        return (0, _errorResponse.ErrorResponse)(`Unathorized. Please check API credentials. ${error.response.data.message}`, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
      }

      if (error && error.response && error.response.data && error.response.data.detail) {
        return (0, _errorResponse.ErrorResponse)(error.response.data.detail, error.response.status || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, error.response.status || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      }

      if (error.code === 'EPROTO') {
        return (0, _errorResponse.ErrorResponse)('Wrong protocol being used to connect to the Wazuh API', 3005, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
      }

      return (0, _errorResponse.ErrorResponse)(error.message || error, 3005, (error === null || error === void 0 ? void 0 : (_error$response6 = error.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

  checkResponseIsDown(response) {
    if (response.status !== _constants.HTTP_STATUS_CODES.OK) {
      // Avoid "Error communicating with socket" like errors
      const socketErrorCodes = [1013, 1014, 1017, 1018, 1019];
      const status = (response.data || {}).status || 1;
      const isDown = socketErrorCodes.includes(status);
      isDown && (0, _logger.log)('wazuh-api:makeRequest', 'Wazuh API is online but Wazuh is not ready yet');
      return isDown;
    }

    return false;
  }
  /**
   * Check main Wazuh daemons status
   * @param {*} context Endpoint context
   * @param {*} api API entry stored in .wazuh
   * @param {*} path Optional. Wazuh API target path.
   */


  async checkDaemons(context, api, path) {
    try {
      const response = await context.wazuh.api.client.asInternalUser.request('GET', '/manager/status', {}, {
        apiHostID: api.id
      });
      const daemons = ((((response || {}).data || {}).data || {}).affected_items || [])[0] || {};
      const isCluster = ((api || {}).cluster_info || {}).status === 'enabled' && typeof daemons['wazuh-clusterd'] !== 'undefined';
      const wazuhdbExists = typeof daemons['wazuh-db'] !== 'undefined';
      const execd = daemons['wazuh-execd'] === 'running';
      const modulesd = daemons['wazuh-modulesd'] === 'running';
      const wazuhdb = wazuhdbExists ? daemons['wazuh-db'] === 'running' : true;
      const clusterd = isCluster ? daemons['wazuh-clusterd'] === 'running' : true;
      const isValid = execd && modulesd && wazuhdb && clusterd;
      isValid && (0, _logger.log)('wazuh-api:checkDaemons', `Wazuh is ready`, 'debug');

      if (path === '/ping') {
        return {
          isValid
        };
      }

      if (!isValid) {
        throw new Error('Wazuh not ready yet');
      }
    } catch (error) {
      (0, _logger.log)('wazuh-api:checkDaemons', error.message || error);
      return Promise.reject(error);
    }
  }

  sleep(timeMs) {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeMs);
    });
  }
  /**
   * Helper method for Dev Tools.
   * https://documentation.wazuh.com/current/user-manual/api/reference.html
   * Depending on the method and the path some parameters should be an array or not.
   * Since we allow the user to write the request using both comma-separated and array as well,
   * we need to check if it should be transformed or not.
   * @param {*} method The request method
   * @param {*} path The Wazuh API path
   */


  shouldKeepArrayAsIt(method, path) {
    // Methods that we must respect a do not transform them
    const isAgentsRestart = method === 'POST' && path === '/agents/restart';
    const isActiveResponse = method === 'PUT' && path.startsWith('/active-response');
    const isAddingAgentsToGroup = method === 'POST' && path.startsWith('/agents/group/'); // Returns true only if one of the above conditions is true

    return isAgentsRestart || isActiveResponse || isAddingAgentsToGroup;
  }
  /**
   * This performs a request over Wazuh API and returns its response
   * @param {String} method Method: GET, PUT, POST, DELETE
   * @param {String} path API route
   * @param {Object} data data and params to perform the request
   * @param {String} id API id
   * @param {Object} response
   * @returns {Object} API response or ErrorResponse
   */


  async makeRequest(context, method, path, data, id, response) {
    const devTools = !!(data || {}).devTools;

    try {
      const api = await this.manageHosts.getHostById(id);

      if (devTools) {
        delete data.devTools;
      }

      if (!Object.keys(api).length) {
        (0, _logger.log)('wazuh-api:makeRequest', 'Could not get host credentials'); //Can not get credentials from wazuh-hosts

        return (0, _errorResponse.ErrorResponse)('Could not get host credentials', 3011, _constants.HTTP_STATUS_CODES.NOT_FOUND, response);
      }

      if (!data) {
        data = {};
      }

      if (!data.headers) {
        data.headers = {};
      }

      const options = {
        apiHostID: id
      }; // Set content type application/xml if needed

      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'xmleditor') {
        data.headers['content-type'] = 'application/xml';
        delete data.origin;
      }

      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'json') {
        data.headers['content-type'] = 'application/json';
        delete data.origin;
      }

      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'raw') {
        data.headers['content-type'] = 'application/octet-stream';
        delete data.origin;
      }

      const delay = (data || {}).delay || 0;

      if (delay) {
        (0, _queue.addJobToQueue)({
          startAt: new Date(Date.now() + delay),
          run: async () => {
            try {
              await context.wazuh.api.client.asCurrentUser.request(method, path, data, options);
            } catch (error) {
              (0, _logger.log)('queue:delayApiRequest', `An error ocurred in the delayed request: "${method} ${path}": ${error.message || error}`);
            }
          }
        });
        return response.ok({
          body: {
            error: 0,
            message: 'Success'
          }
        });
      }

      if (path === '/ping') {
        try {
          const check = await this.checkDaemons(context, api, path);
          return check;
        } catch (error) {
          const isDown = (error || {}).code === 'ECONNREFUSED';

          if (!isDown) {
            (0, _logger.log)('wazuh-api:makeRequest', 'Wazuh API is online but Wazuh is not ready yet');
            return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${error.message || 'Wazuh not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
          }
        }
      }

      (0, _logger.log)('wazuh-api:makeRequest', `${method} ${path}`, 'debug'); // Extract keys from parameters

      const dataProperties = Object.keys(data); // Transform arrays into comma-separated string if applicable.
      // The reason is that we are accepting arrays for comma-separated
      // parameters in the Dev Tools

      if (!this.shouldKeepArrayAsIt(method, path)) {
        for (const key of dataProperties) {
          if (Array.isArray(data[key])) {
            data[key] = data[key].join();
          }
        }
      }

      const responseToken = await context.wazuh.api.client.asCurrentUser.request(method, path, data, options);
      const responseIsDown = this.checkResponseIsDown(responseToken);

      if (responseIsDown) {
        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${response.body.message || 'Wazuh not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }

      let responseBody = (responseToken || {}).data || {};

      if (!responseBody) {
        responseBody = typeof responseBody === 'string' && path.includes('/files') && method === 'GET' ? ' ' : false;
        response.data = responseBody;
      }

      const responseError = response.status !== _constants.HTTP_STATUS_CODES.OK ? response.status : false;

      if (!responseError && responseBody) {
        //cleanKeys(response);
        return response.ok({
          body: responseToken.data
        });
      }

      if (responseError && devTools) {
        return response.ok({
          body: response.data
        });
      }

      throw responseError && responseBody.detail ? {
        message: responseBody.detail,
        code: responseError
      } : new Error('Unexpected error fetching data from the Wazuh API');
    } catch (error) {
      if (error && error.response && error.response.status === _constants.HTTP_STATUS_CODES.UNAUTHORIZED) {
        return (0, _errorResponse.ErrorResponse)(error.message || error, error.code ? `Wazuh API error: ${error.code}` : 3013, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
      }

      const errorMsg = (error.response || {}).data || error.message;
      (0, _logger.log)('wazuh-api:makeRequest', errorMsg || error);

      if (devTools) {
        return response.ok({
          body: {
            error: '3013',
            message: errorMsg || error
          }
        });
      } else {
        if ((error || {}).code && _apiErrorsEquivalence.ApiErrorEquivalence[error.code]) {
          error.message = _apiErrorsEquivalence.ApiErrorEquivalence[error.code];
        }

        return (0, _errorResponse.ErrorResponse)(errorMsg.detail || error, error.code ? `Wazuh API error: ${error.code}` : 3013, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
    }
  }
  /**
   * This make a request to API
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} api response or ErrorResponse
   */


  requestApi(context, request, response) {
    const idApi = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');

    if (idApi !== request.body.id) {
      // if the current token belongs to a different API id, we relogin to obtain a new token
      return (0, _errorResponse.ErrorResponse)('status code 401', _constants.HTTP_STATUS_CODES.UNAUTHORIZED, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
    }

    if (!request.body.method) {
      return (0, _errorResponse.ErrorResponse)('Missing param: method', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.method.match(/^(?:GET|PUT|POST|DELETE)$/)) {
      (0, _logger.log)('wazuh-api:makeRequest', 'Request method is not valid.'); //Method is not a valid HTTP request method

      return (0, _errorResponse.ErrorResponse)('Request method is not valid.', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.path) {
      return (0, _errorResponse.ErrorResponse)('Missing param: path', 3016, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.path.startsWith('/')) {
      (0, _logger.log)('wazuh-api:makeRequest', 'Request path is not valid.'); //Path doesn't start with '/'

      return (0, _errorResponse.ErrorResponse)('Request path is not valid.', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else {
      return this.makeRequest(context, request.body.method, request.body.path, request.body.body, request.body.id, response);
    }
  }
  /**
   * Get full data on CSV format from a list Wazuh API endpoint
   * @param {Object} ctx
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} csv or ErrorResponse
   */


  async csv(context, request, response) {
    try {
      if (!request.body || !request.body.path) throw new Error('Field path is required');
      if (!request.body.id) throw new Error('Field id is required');
      const filters = Array.isArray(((request || {}).body || {}).filters) ? request.body.filters : [];
      let tmpPath = request.body.path;

      if (tmpPath && typeof tmpPath === 'string') {
        tmpPath = tmpPath[0] === '/' ? tmpPath.substr(1) : tmpPath;
      }

      if (!tmpPath) throw new Error('An error occurred parsing path field');
      (0, _logger.log)('wazuh-api:csv', `Report ${tmpPath}`, 'debug'); // Real limit, regardless the user query

      const params = {
        limit: 500
      };

      if (filters.length) {
        for (const filter of filters) {
          if (!filter.name || !filter.value) continue;
          params[filter.name] = filter.value;
        }
      }

      let itemsArray = [];
      const output = await context.wazuh.api.client.asCurrentUser.request('GET', `/${tmpPath}`, {
        params: params
      }, {
        apiHostID: request.body.id
      });
      const isList = request.body.path.includes('/lists') && request.body.filters && request.body.filters.length && request.body.filters.find(filter => filter._isCDBList);
      const totalItems = (((output || {}).data || {}).data || {}).total_affected_items;

      if (totalItems && !isList) {
        params.offset = 0;
        itemsArray.push(...output.data.data.affected_items);

        while (itemsArray.length < totalItems && params.offset < totalItems) {
          params.offset += params.limit;
          const tmpData = await context.wazuh.api.client.asCurrentUser.request('GET', `/${tmpPath}`, {
            params: params
          }, {
            apiHostID: request.body.id
          });
          itemsArray.push(...tmpData.data.data.affected_items);
        }
      }

      if (totalItems) {
        const {
          path,
          filters
        } = request.body;
        const isArrayOfLists = path.includes('/lists') && !isList;
        const isAgents = path.includes('/agents') && !path.includes('groups');
        const isAgentsOfGroup = path.startsWith('/agents/groups/');
        const isFiles = path.endsWith('/files');
        let fields = Object.keys(output.data.data.affected_items[0]);

        if (isAgents || isAgentsOfGroup) {
          if (isFiles) {
            fields = ['filename', 'hash'];
          } else {
            fields = ['id', 'status', 'name', 'ip', 'group', 'manager', 'node_name', 'dateAdd', 'version', 'lastKeepAlive', 'os.arch', 'os.build', 'os.codename', 'os.major', 'os.minor', 'os.name', 'os.platform', 'os.uname', 'os.version'];
          }
        }

        if (isArrayOfLists) {
          const flatLists = [];

          for (const list of itemsArray) {
            const {
              relative_dirname,
              items
            } = list;
            flatLists.push(...items.map(item => ({
              relative_dirname,
              key: item.key,
              value: item.value
            })));
          }

          fields = ['relative_dirname', 'key', 'value'];
          itemsArray = [...flatLists];
        }

        if (isList) {
          fields = ['key', 'value'];
          itemsArray = output.data.data.affected_items[0].items;
        }

        fields = fields.map(item => ({
          value: item,
          default: '-'
        }));
        const json2csvParser = new _json2csv.Parser({
          fields
        });
        let csv = json2csvParser.parse(itemsArray);

        for (const field of fields) {
          const {
            value
          } = field;

          if (csv.includes(value)) {
            csv = csv.replace(value, _csvKeyEquivalence.KeyEquivalence[value] || value);
          }
        }

        return response.ok({
          headers: {
            'Content-Type': 'text/csv'
          },
          body: csv
        });
      } else if (output && output.data && output.data.data && !output.data.data.total_affected_items) {
        throw new Error('No results');
      } else {
        throw new Error(`An error occurred fetching data from the Wazuh API${output && output.data && output.data.detail ? `: ${output.body.detail}` : ''}`);
      }
    } catch (error) {
      (0, _logger.log)('wazuh-api:csv', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3034, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  } // Get de list of available requests in the API


  getRequestList(context, request, response) {
    //Read a static JSON until the api call has implemented
    return response.ok({
      body: _endpoints.default
    });
  }
  /**
   * This get the timestamp field
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} timestamp field or ErrorResponse
   */


  getTimeStamp(context, request, response) {
    try {
      const source = JSON.parse(_fs.default.readFileSync(this.updateRegistry.file, 'utf8'));

      if (source.installationDate && source.lastRestart) {
        (0, _logger.log)('wazuh-api:getTimeStamp', `Installation date: ${source.installationDate}. Last restart: ${source.lastRestart}`, 'debug');
        return response.ok({
          body: {
            installationDate: source.installationDate,
            lastRestart: source.lastRestart
          }
        });
      } else {
        throw new Error('Could not fetch wazuh-version registry');
      }
    } catch (error) {
      (0, _logger.log)('wazuh-api:getTimeStamp', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || 'Could not fetch wazuh-version registry', 4001, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * This get the extensions
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} extensions object or ErrorResponse
   */


  async setExtensions(context, request, response) {
    try {
      const {
        id,
        extensions
      } = request.body; // Update cluster information in the wazuh-registry.json

      await this.updateRegistry.updateAPIExtensions(id, extensions);
      return response.ok({
        body: {
          statusCode: _constants.HTTP_STATUS_CODES.OK
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:setExtensions', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || 'Could not set extensions', 4001, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * This get the extensions
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} extensions object or ErrorResponse
   */


  getExtensions(context, request, response) {
    try {
      const source = JSON.parse(_fs.default.readFileSync(this.updateRegistry.file, 'utf8'));
      return response.ok({
        body: {
          extensions: (source.hosts[request.params.id] || {}).extensions || {}
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:getExtensions', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || 'Could not fetch wazuh-version registry', 4001, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * This get the wazuh setup settings
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} setup info or ErrorResponse
   */


  async getSetupInfo(context, request, response) {
    try {
      const source = JSON.parse(_fs.default.readFileSync(this.updateRegistry.file, 'utf8'));
      return response.ok({
        body: {
          statusCode: _constants.HTTP_STATUS_CODES.OK,
          data: !Object.values(source).length ? '' : source
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:getSetupInfo', error.message || error);
      return (0, _errorResponse.ErrorResponse)(`Could not get data from wazuh-version registry due to ${error.message || error}`, 4005, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * Get basic syscollector information for given agent.
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Basic syscollector information
   */


  async getSyscollector(context, request, response) {
    try {
      const apiHostID = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');

      if (!request.params || !apiHostID || !request.params.agent) {
        throw new Error('Agent ID and API ID are required');
      }

      const {
        agent
      } = request.params;
      const data = await Promise.all([context.wazuh.api.client.asInternalUser.request('GET', `/syscollector/${agent}/hardware`, {}, {
        apiHostID
      }), context.wazuh.api.client.asInternalUser.request('GET', `/syscollector/${agent}/os`, {}, {
        apiHostID
      })]);
      const result = data.map(item => (item.data || {}).data || []);
      const [hardwareResponse, osResponse] = result; // Fill syscollector object

      const syscollector = {
        hardware: typeof hardwareResponse === 'object' && Object.keys(hardwareResponse).length ? { ...hardwareResponse.affected_items[0]
        } : false,
        os: typeof osResponse === 'object' && Object.keys(osResponse).length ? { ...osResponse.affected_items[0]
        } : false
      };
      return response.ok({
        body: syscollector
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:getSyscollector', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3035, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * Check if user assigned roles disable Wazuh Plugin
   * @param context
   * @param request
   * @param response
   * @returns {object} Returns { isWazuhDisabled: boolean parsed integer }
   */


  async isWazuhDisabled(context, request, response) {
    try {
      const disabledRoles = (await (0, _getConfiguration.getConfiguration)())['disabled_roles'] || [];
      const logoSidebar = (await (0, _getConfiguration.getConfiguration)())['customization.logo.sidebar'];
      const data = (await context.wazuh.security.getCurrentUser(request, context)).authContext;
      const isWazuhDisabled = +(data.roles || []).some(role => disabledRoles.includes(role));
      return response.ok({
        body: {
          isWazuhDisabled,
          logoSidebar
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:isWazuhDisabled', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3035, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  /**
   * Gets custom logos configuration (path)
   * @param context
   * @param request
   * @param response
   */


  async getAppLogos(context, request, response) {
    try {
      const configuration = (0, _getConfiguration.getConfiguration)();
      const SIDEBAR_LOGO = 'customization.logo.sidebar';
      const APP_LOGO = 'customization.logo.app';
      const HEALTHCHECK_LOGO = 'customization.logo.healthcheck';
      const logos = {
        [SIDEBAR_LOGO]: (0, _settings.getCustomizationSetting)(configuration, SIDEBAR_LOGO),
        [APP_LOGO]: (0, _settings.getCustomizationSetting)(configuration, APP_LOGO),
        [HEALTHCHECK_LOGO]: (0, _settings.getCustomizationSetting)(configuration, HEALTHCHECK_LOGO)
      };
      return response.ok({
        body: {
          logos
        }
      });
    } catch (error) {
      (0, _logger.log)('wazuh-api:getAppLogos', error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3035, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

}

exports.WazuhApiCtrl = WazuhApiCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhenVoLWFwaS50cyJdLCJuYW1lcyI6WyJXYXp1aEFwaUN0cmwiLCJjb25zdHJ1Y3RvciIsIm1hbmFnZUhvc3RzIiwiTWFuYWdlSG9zdHMiLCJ1cGRhdGVSZWdpc3RyeSIsIlVwZGF0ZVJlZ2lzdHJ5IiwiZ2V0VG9rZW4iLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiZm9yY2UiLCJpZEhvc3QiLCJib2R5IiwidXNlcm5hbWUiLCJ3YXp1aCIsInNlY3VyaXR5IiwiZ2V0Q3VycmVudFVzZXIiLCJoZWFkZXJzIiwiY29va2llIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwid3pUb2tlbiIsImRlY29kZWRUb2tlbiIsImV4cGlyYXRpb25UaW1lIiwiZXhwIiwiRGF0ZSIsIm5vdyIsIm9rIiwidG9rZW4iLCJlcnJvciIsIm1lc3NhZ2UiLCJBUElVc2VyQWxsb3dSdW5BcyIsImNhblVzZSIsIkFQSV9VU0VSX1NUQVRVU19SVU5fQVMiLCJFTkFCTEVEIiwiYXBpIiwiY2xpZW50IiwiYXNDdXJyZW50VXNlciIsImF1dGhlbnRpY2F0ZSIsImFzSW50ZXJuYWxVc2VyIiwidGV4dFNlY3VyZSIsInNlcnZlciIsImluZm8iLCJwcm90b2NvbCIsImVuY29kZWRVc2VyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZXJyb3JNZXNzYWdlIiwiZGF0YSIsImRldGFpbCIsInN0YXR1cyIsIkhUVFBfU1RBVFVTX0NPREVTIiwiSU5URVJOQUxfU0VSVkVSX0VSUk9SIiwiY2hlY2tTdG9yZWRBUEkiLCJpZCIsImdldEhvc3RCeUlkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIkVycm9yIiwicmVzcG9uc2VNYW5hZ2VySW5mbyIsImFwaUhvc3RJRCIsImZvcmNlUmVmcmVzaCIsImNoZWNrUmVzcG9uc2VJc0Rvd24iLCJTRVJWSUNFX1VOQVZBSUxBQkxFIiwiT0siLCJjbHVzdGVyX2luZm8iLCJyZXNwb25zZUFnZW50cyIsInBhcmFtcyIsImFnZW50c19saXN0IiwibWFuYWdlck5hbWUiLCJhZmZlY3RlZF9pdGVtcyIsIm1hbmFnZXIiLCJyZXNwb25zZUNsdXN0ZXJTdGF0dXMiLCJlbmFibGVkIiwicmVzcG9uc2VDbHVzdGVyTG9jYWxJbmZvIiwiY2x1c3RlckVuYWJsZWQiLCJub2RlIiwiY2x1c3RlciIsInVwZGF0ZUNsdXN0ZXJJbmZvIiwiY29waWVkIiwic2VjcmV0IiwicGFzc3dvcmQiLCJzdGF0dXNDb2RlIiwiaWRDaGFuZ2VkIiwidXJsIiwicG9ydCIsImNvZGUiLCJhcGlJc0Rvd24iLCJhcGlzIiwiZ2V0SG9zdHMiLCJ2YWxpZGF0ZUNoZWNrQXBpUGFyYW1zIiwiaW5jbHVkZXMiLCJjaGVja0FQSSIsImFwaUF2YWlsYWJsZSIsIm9wdGlvbnMiLCJyZXNwb25zZUNsdXN0ZXIiLCJhcGlVc2VyQWxsb3dSdW5BcyIsIkFMTF9ESVNBQkxFRCIsInJlc3BvbnNlQXBpVXNlckFsbG93UnVuQXMiLCJhbGxvd19ydW5fYXMiLCJydW5fYXMiLCJVU0VSX05PVF9BTExPV0VEIiwiSE9TVF9ESVNBQkxFRCIsIkNhY2hlSW5NZW1vcnlBUElVc2VyQWxsb3dSdW5BcyIsInNldCIsInJlc3BvbnNlQ2x1c3RlckxvY2FsIiwiVU5BVVRIT1JJWkVEIiwiQkFEX1JFUVVFU1QiLCJzb2NrZXRFcnJvckNvZGVzIiwiaXNEb3duIiwiY2hlY2tEYWVtb25zIiwicGF0aCIsImRhZW1vbnMiLCJpc0NsdXN0ZXIiLCJ3YXp1aGRiRXhpc3RzIiwiZXhlY2QiLCJtb2R1bGVzZCIsIndhenVoZGIiLCJjbHVzdGVyZCIsImlzVmFsaWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2xlZXAiLCJ0aW1lTXMiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInNob3VsZEtlZXBBcnJheUFzSXQiLCJtZXRob2QiLCJpc0FnZW50c1Jlc3RhcnQiLCJpc0FjdGl2ZVJlc3BvbnNlIiwic3RhcnRzV2l0aCIsImlzQWRkaW5nQWdlbnRzVG9Hcm91cCIsIm1ha2VSZXF1ZXN0IiwiZGV2VG9vbHMiLCJOT1RfRk9VTkQiLCJvcmlnaW4iLCJkZWxheSIsInN0YXJ0QXQiLCJydW4iLCJjaGVjayIsImRhdGFQcm9wZXJ0aWVzIiwia2V5IiwiQXJyYXkiLCJpc0FycmF5Iiwiam9pbiIsInJlc3BvbnNlVG9rZW4iLCJyZXNwb25zZUlzRG93biIsInJlc3BvbnNlQm9keSIsInJlc3BvbnNlRXJyb3IiLCJlcnJvck1zZyIsIkFwaUVycm9yRXF1aXZhbGVuY2UiLCJyZXF1ZXN0QXBpIiwiaWRBcGkiLCJtYXRjaCIsImNzdiIsImZpbHRlcnMiLCJ0bXBQYXRoIiwic3Vic3RyIiwibGltaXQiLCJmaWx0ZXIiLCJuYW1lIiwidmFsdWUiLCJpdGVtc0FycmF5Iiwib3V0cHV0IiwiaXNMaXN0IiwiZmluZCIsIl9pc0NEQkxpc3QiLCJ0b3RhbEl0ZW1zIiwidG90YWxfYWZmZWN0ZWRfaXRlbXMiLCJvZmZzZXQiLCJwdXNoIiwidG1wRGF0YSIsImlzQXJyYXlPZkxpc3RzIiwiaXNBZ2VudHMiLCJpc0FnZW50c09mR3JvdXAiLCJpc0ZpbGVzIiwiZW5kc1dpdGgiLCJmaWVsZHMiLCJmbGF0TGlzdHMiLCJsaXN0IiwicmVsYXRpdmVfZGlybmFtZSIsIml0ZW1zIiwibWFwIiwiaXRlbSIsImRlZmF1bHQiLCJqc29uMmNzdlBhcnNlciIsIlBhcnNlciIsInBhcnNlIiwiZmllbGQiLCJyZXBsYWNlIiwiS2V5RXF1aXZhbGVuY2UiLCJnZXRSZXF1ZXN0TGlzdCIsImFwaVJlcXVlc3RMaXN0IiwiZ2V0VGltZVN0YW1wIiwic291cmNlIiwiSlNPTiIsImZzIiwicmVhZEZpbGVTeW5jIiwiZmlsZSIsImluc3RhbGxhdGlvbkRhdGUiLCJsYXN0UmVzdGFydCIsInNldEV4dGVuc2lvbnMiLCJleHRlbnNpb25zIiwidXBkYXRlQVBJRXh0ZW5zaW9ucyIsImdldEV4dGVuc2lvbnMiLCJob3N0cyIsImdldFNldHVwSW5mbyIsInZhbHVlcyIsImdldFN5c2NvbGxlY3RvciIsImFnZW50IiwiYWxsIiwicmVzdWx0IiwiaGFyZHdhcmVSZXNwb25zZSIsIm9zUmVzcG9uc2UiLCJzeXNjb2xsZWN0b3IiLCJoYXJkd2FyZSIsIm9zIiwiaXNXYXp1aERpc2FibGVkIiwiZGlzYWJsZWRSb2xlcyIsImxvZ29TaWRlYmFyIiwiYXV0aENvbnRleHQiLCJyb2xlcyIsInNvbWUiLCJyb2xlIiwiZ2V0QXBwTG9nb3MiLCJjb25maWd1cmF0aW9uIiwiU0lERUJBUl9MT0dPIiwiQVBQX0xPR08iLCJIRUFMVEhDSEVDS19MT0dPIiwibG9nb3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFhQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFNQTs7QUFLQTs7QUFFQTs7Ozs7O0FBRU8sTUFBTUEsWUFBTixDQUFtQjtBQUl4QkMsRUFBQUEsV0FBVyxHQUFHO0FBQUE7O0FBQUE7O0FBQ1osU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx3QkFBSixFQUFuQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBSUMsOEJBQUosRUFBdEI7QUFDRDs7QUFFYSxRQUFSQyxRQUFRLENBQ1pDLE9BRFksRUFFWkMsT0FGWSxFQUdaQyxRQUhZLEVBSVo7QUFDQSxRQUFJO0FBQ0YsWUFBTTtBQUFFQyxRQUFBQSxLQUFGO0FBQVNDLFFBQUFBO0FBQVQsVUFBb0JILE9BQU8sQ0FBQ0ksSUFBbEM7QUFDQSxZQUFNO0FBQUVDLFFBQUFBO0FBQUYsVUFBZSxNQUFNTixPQUFPLENBQUNPLEtBQVIsQ0FBY0MsUUFBZCxDQUF1QkMsY0FBdkIsQ0FDekJSLE9BRHlCLEVBRXpCRCxPQUZ5QixDQUEzQjs7QUFJQSxVQUNFLENBQUNHLEtBQUQsSUFDQUYsT0FBTyxDQUFDUyxPQUFSLENBQWdCQyxNQURoQixJQUVBTCxRQUFRLEtBQ05NLGtCQUFrQixDQUNoQixrQ0FBcUJYLE9BQU8sQ0FBQ1MsT0FBUixDQUFnQkMsTUFBckMsRUFBNkMsU0FBN0MsQ0FEZ0IsQ0FIcEIsSUFNQVAsTUFBTSxLQUFLLGtDQUFxQkgsT0FBTyxDQUFDUyxPQUFSLENBQWdCQyxN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LGtDQUNMQSxLQUFLLENBQUNDLE9BQU4sSUFBaUJELEtBRFosRUFFTCxJQUZLLEVBR0xxQiw2QkFBa0JDLHFCQUhiLEVBSUx6QyxRQUpLLENBQVA7QUFNRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDbUIsUUFBWHNOLFdBQVcsQ0FDZnhOLE9BRGUsRUFFZkMsT0FGZSxFQUdmQyxRQUhlLEVBSWY7QUFDQSxRQUFJO0FBQ0YsWUFBTXVOLGFBQWEsR0FBRyx5Q0FBdEI7QUFDQSxZQUFNQyxZQUFZLEdBQUcsNEJBQXJCO0FBQ0EsWUFBTUMsUUFBUSxHQUFHLHdCQUFqQjtBQUNBLFlBQU1DLGdCQUFnQixHQUFHLGdDQUF6QjtBQUVBLFlBQU1DLEtBQUssR0FBRztBQUNaLFNBQUNILFlBQUQsR0FBZ0IsdUNBQXdCRCxhQUF4QixFQUF1Q0MsWUFBdkMsQ0FESjtBQUVaLFNBQUNDLFFBQUQsR0FBWSx1Q0FBd0JGLGFBQXhCLEVBQXVDRSxRQUF2QyxDQUZBO0FBR1osU0FBQ0MsZ0JBQUQsR0FBb0IsdUNBQ2xCSCxhQURrQixFQUVsQkcsZ0JBRmtCO0FBSFIsT0FBZDtBQVNBLGFBQU8xTixRQUFRLENBQUNpQixFQUFULENBQVk7QUFDakJkLFFBQUFBLElBQUksRUFBRTtBQUFFd04sVUFBQUE7QUFBRjtBQURXLE9BQVosQ0FBUDtBQUdELEtBbEJELENBa0JFLE9BQU94TSxLQUFQLEVBQWM7QUFDZCx1QkFBSSx1QkFBSixFQUE2QkEsS0FBSyxDQUFDQyxPQUFOLElBQWlCRCxLQUE5QztBQUNBLGFBQU8sa0NBQ0xBLEtBQUssQ0FBQ0MsT0FBTixJQUFpQkQsS0FEWixFQUVMLElBRkssRUFHTHFCLDZCQUFrQkMscUJBSGIsRUFJTHpDLFFBSkssQ0FBUDtBQU1EO0FBQ0Y7O0FBMTBDdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gQ2xhc3MgZm9yIFdhenVoLUFQSSBmdW5jdGlvbnNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbi8vIFJlcXVpcmUgc29tZSBsaWJyYXJpZXNcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi9saWIvZXJyb3ItcmVzcG9uc2UnO1xuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnanNvbjJjc3YnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBLZXlFcXVpdmFsZW5jZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jc3Yta2V5LWVxdWl2YWxlbmNlJztcbmltcG9ydCB7IEFwaUVycm9yRXF1aXZhbGVuY2UgfSBmcm9tICcuLi9saWIvYXBpLWVycm9ycy1lcXVpdmFsZW5jZSc7XG5pbXBvcnQgYXBpUmVxdWVzdExpc3QgZnJvbSAnLi4vLi4vY29tbW9uL2FwaS1pbmZvL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBIVFRQX1NUQVRVU19DT0RFUyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0Q3VzdG9taXphdGlvblNldHRpbmcgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvc2V0dGluZ3MnO1xuaW1wb3J0IHsgYWRkSm9iVG9RdWV1ZSB9IGZyb20gJy4uL3N0YXJ0L3F1ZXVlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBNYW5hZ2VIb3N0cyB9IGZyb20gJy4uL2xpYi9tYW5hZ2UtaG9zdHMnO1xuaW1wb3J0IHsgVXBkYXRlUmVnaXN0cnkgfSBmcm9tICcuLi9saWIvdXBkYXRlLXJlZ2lzdHJ5JztcbmltcG9ydCBqd3REZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQge1xuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG59IGZyb20gJ3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQge1xuICBBUElVc2VyQWxsb3dSdW5BcyxcbiAgQ2FjaGVJbk1lbW9yeUFQSVVzZXJBbGxvd1J1bkFzLFxuICBBUElfVVNFUl9TVEFUVVNfUlVOX0FTLFxufSBmcm9tICcuLi9saWIvY2FjaGUtYXBpLXVzZXItaGFzLXJ1bi1hcyc7XG5pbXBvcnQgeyBnZXRDb29raWVWYWx1ZUJ5TmFtZSB9IGZyb20gJy4uL2xpYi9jb29raWUnO1xuaW1wb3J0IHsgU2VjdXJpdHlPYmogfSBmcm9tICcuLi9saWIvc2VjdXJpdHktZmFjdG9yeSc7XG5pbXBvcnQgeyBnZXRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vbGliL2dldC1jb25maWd1cmF0aW9uJztcblxuZXhwb3J0IGNsYXNzIFdhenVoQXBpQ3RybCB7XG4gIG1hbmFnZUhvc3RzOiBNYW5hZ2VIb3N0cztcbiAgdXBkYXRlUmVnaXN0cnk6IFVwZGF0ZVJlZ2lzdHJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWFuYWdlSG9zdHMgPSBuZXcgTWFuYWdlSG9zdHMoKTtcbiAgICB0aGlzLnVwZGF0ZVJlZ2lzdHJ5ID0gbmV3IFVwZGF0ZVJlZ2lzdHJ5KCk7XG4gIH1cblxuICBhc3luYyBnZXRUb2tlbihcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZm9yY2UsIGlkSG9zdCB9ID0gcmVxdWVzdC5ib2R5O1xuICAgICAgY29uc3QgeyB1c2VybmFtZSB9ID0gYXdhaXQgY29udGV4dC53YXp1aC5zZWN1cml0eS5nZXRDdXJyZW50VXNlcihcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgICFmb3JjZSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuY29va2llICYmXG4gICAgICAgIHVzZXJuYW1lID09PVxuICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgIGdldENvb2tpZVZhbHVlQnlOYW1lKHJlcXVlc3QuaGVhZGVycy5jb29raWUsICd3ei11c2VyJyksXG4gICAgICAgICAgKSAmJlxuICAgICAgICBpZEhvc3QgPT09IGdldENvb2tpZVZhbHVlQnlOYW1lKHJlcXVlc3QuaGVhZGVycy5jb29raWUsICd3ei1hcGknKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHd6VG9rZW4gPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuY29va2llLFxuICAgICAgICAgICd3ei10b2tlbicsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh3elRva2VuKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHRva2VuIGlzIG5vdCBhIHZhbGlkIGp3dCB0b2tlbiB3ZSBhc2sgZm9yIGEgbmV3IG9uZVxuICAgICAgICAgICAgY29uc3QgZGVjb2RlZFRva2VuID0gand0RGVjb2RlKHd6VG9rZW4pO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJhdGlvblRpbWUgPSBkZWNvZGVkVG9rZW4uZXhwIC0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgICAgICBpZiAod3pUb2tlbiAmJiBleHBpcmF0aW9uVGltZSA+IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgICAgICBib2R5OiB7IHRva2VuOiB3elRva2VuIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2coJ3dhenVoLWFwaTpnZXRUb2tlbicsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IHRva2VuO1xuICAgICAgaWYgKFxuICAgICAgICAoYXdhaXQgQVBJVXNlckFsbG93UnVuQXMuY2FuVXNlKGlkSG9zdCkpID09XG4gICAgICAgIEFQSV9VU0VSX1NUQVRVU19SVU5fQVMuRU5BQkxFRFxuICAgICAgKSB7XG4gICAgICAgIHRva2VuID0gYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIuYXV0aGVudGljYXRlKFxuICAgICAgICAgIGlkSG9zdCxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2VuID0gYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLmF1dGhlbnRpY2F0ZShcbiAgICAgICAgICBpZEhvc3QsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGxldCB0ZXh0U2VjdXJlID0gJyc7XG4gICAgICBpZiAoY29udGV4dC53YXp1aC5zZXJ2ZXIuaW5mby5wcm90b2NvbCA9PT0gJ2h0dHBzJykge1xuICAgICAgICB0ZXh0U2VjdXJlID0gJztTZWN1cmUnO1xuICAgICAgfVxuICAgICAgY29uc3QgZW5jb2RlZFVzZXIgPSBlbmNvZGVVUklDb21wb25lbnQodXNlcm5hbWUpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdzZXQtY29va2llJzogW1xuICAgICAgICAgICAgYHd6LXRva2VuPSR7dG9rZW59O1BhdGg9LztIdHRwT25seSR7dGV4dFNlY3VyZX1gLFxuICAgICAgICAgICAgYHd6LXVzZXI9JHtlbmNvZGVkVXNlcn07UGF0aD0vO0h0dHBPbmx5JHt0ZXh0U2VjdXJlfWAsXG4gICAgICAgICAgICBgd3otYXBpPSR7aWRIb3N0fTtQYXRoPS87SHR0cE9ubHlgLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IHsgdG9rZW4gfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAoKGVycm9yLnJlc3BvbnNlIHx8IHt9KS5kYXRhIHx8IHt9KS5kZXRhaWwgfHwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcjtcbiAgICAgIGxvZygnd2F6dWgtYXBpOmdldFRva2VuJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBgRXJyb3IgZ2V0dGluZyB0aGUgYXV0aG9yaXphdGlvbiB0b2tlbjogJHtlcnJvck1lc3NhZ2V9YCxcbiAgICAgICAgMzAwMCxcbiAgICAgICAgZXJyb3I/LnJlc3BvbnNlPy5zdGF0dXMgfHwgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIHdhenVoLWFwaSBjb25maWd1cmF0aW9uIGlzIHdvcmtpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHN0YXR1cyBvYmogb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgY2hlY2tTdG9yZWRBUEkoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgY29uZmlnIGZyb20gd2F6dWgueW1sXG4gICAgICBjb25zdCBpZCA9IHJlcXVlc3QuYm9keS5pZDtcbiAgICAgIGNvbnN0IGFwaSA9IGF3YWl0IHRoaXMubWFuYWdlSG9zdHMuZ2V0SG9zdEJ5SWQoaWQpO1xuICAgICAgLy8gQ2hlY2sgTWFuYWdlIEhvc3RzXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKGFwaSkubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgV2F6dWggQVBJIGVudHJ5IG9uIHdhenVoLnltbCcpO1xuICAgICAgfVxuXG4gICAgICBsb2coJ3dhenVoLWFwaTpjaGVja1N0b3JlZEFQSScsIGAke2lkfSBleGlzdHNgLCAnZGVidWcnKTtcblxuICAgICAgLy8gRmV0Y2ggbmVlZGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbHVzdGVyIGFuZCB0aGUgbWFuYWdlciBpdHNlbGZcbiAgICAgIGNvbnN0IHJlc3BvbnNlTWFuYWdlckluZm8gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgICAnZ2V0JyxcbiAgICAgICAgICBgL21hbmFnZXIvaW5mb2AsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBhcGlIb3N0SUQ6IGlkLCBmb3JjZVJlZnJlc2g6IHRydWUgfSxcbiAgICAgICAgKTtcblxuICAgICAgLy8gTG9vayBmb3Igc29ja2V0LXJlbGF0ZWQgZXJyb3JzXG4gICAgICBpZiAodGhpcy5jaGVja1Jlc3BvbnNlSXNEb3duKHJlc3BvbnNlTWFuYWdlckluZm8pKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGBFUlJPUjMwOTkgLSAke1xuICAgICAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5kYXRhLmRldGFpbCB8fCAnV2F6dWggbm90IHJlYWR5IHlldCdcbiAgICAgICAgICB9YCxcbiAgICAgICAgICAzMDk5LFxuICAgICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLlNFUlZJQ0VfVU5BVkFJTEFCTEUsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGhhdmUgYSB2YWxpZCByZXNwb25zZSBmcm9tIHRoZSBXYXp1aCBBUElcbiAgICAgIGlmIChcbiAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLk9LICYmXG4gICAgICAgIHJlc3BvbnNlTWFuYWdlckluZm8uZGF0YVxuICAgICAgKSB7XG4gICAgICAgIC8vIENsZWFyIGFuZCB1cGRhdGUgY2x1c3RlciBpbmZvcm1hdGlvbiBiZWZvcmUgYmVpbmcgc2VudCBiYWNrIHRvIGZyb250ZW5kXG4gICAgICAgIGRlbGV0ZSBhcGkuY2x1c3Rlcl9pbmZvO1xuICAgICAgICBjb25zdCByZXNwb25zZUFnZW50cyA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgIGAvYWdlbnRzYCxcbiAgICAgICAgICAgIHsgcGFyYW1zOiB7IGFnZW50c19saXN0OiAnMDAwJyB9IH0sXG4gICAgICAgICAgICB7IGFwaUhvc3RJRDogaWQgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgIGlmIChyZXNwb25zZUFnZW50cy5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLk9LKSB7XG4gICAgICAgICAgY29uc3QgbWFuYWdlck5hbWUgPVxuICAgICAgICAgICAgcmVzcG9uc2VBZ2VudHMuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zWzBdLm1hbmFnZXI7XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZUNsdXN0ZXJTdGF0dXMgPVxuICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICBgL2NsdXN0ZXIvc3RhdHVzYCxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBpZCB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2VDbHVzdGVyU3RhdHVzLnN0YXR1cyA9PT0gSFRUUF9TVEFUVVNfQ09ERVMuT0spIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZUNsdXN0ZXJTdGF0dXMuZGF0YS5kYXRhLmVuYWJsZWQgPT09ICd5ZXMnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQ2x1c3RlckxvY2FsSW5mbyA9XG4gICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgICAgIGAvY2x1c3Rlci9sb2NhbC9pbmZvYCxcbiAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGlkIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlQ2x1c3RlckxvY2FsSW5mby5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLk9LKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2x1c3RlckVuYWJsZWQgPVxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2VDbHVzdGVyU3RhdHVzLmRhdGEuZGF0YS5lbmFibGVkID09PSAneWVzJztcbiAgICAgICAgICAgICAgICBhcGkuY2x1c3Rlcl9pbmZvID0ge1xuICAgICAgICAgICAgICAgICAgc3RhdHVzOiBjbHVzdGVyRW5hYmxlZCA/ICdlbmFibGVkJyA6ICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICBtYW5hZ2VyOiBtYW5hZ2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgIG5vZGU6IHJlc3BvbnNlQ2x1c3RlckxvY2FsSW5mby5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF1cbiAgICAgICAgICAgICAgICAgICAgLm5vZGUsXG4gICAgICAgICAgICAgICAgICBjbHVzdGVyOiBjbHVzdGVyRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICA/IHJlc3BvbnNlQ2x1c3RlckxvY2FsSW5mby5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbHVzdGVyXG4gICAgICAgICAgICAgICAgICAgIDogJ0Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBDbHVzdGVyIG1vZGUgaXMgbm90IGFjdGl2ZVxuICAgICAgICAgICAgICBhcGkuY2x1c3Rlcl9pbmZvID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBtYW5hZ2VyOiBtYW5hZ2VyTmFtZSxcbiAgICAgICAgICAgICAgICBjbHVzdGVyOiAnRGlzYWJsZWQnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDbHVzdGVyIG1vZGUgaXMgbm90IGFjdGl2ZVxuICAgICAgICAgICAgYXBpLmNsdXN0ZXJfaW5mbyA9IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICBtYW5hZ2VyOiBtYW5hZ2VyTmFtZSxcbiAgICAgICAgICAgICAgY2x1c3RlcjogJ0Rpc2FibGVkJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFwaS5jbHVzdGVyX2luZm8pIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjbHVzdGVyIGluZm9ybWF0aW9uIGluIHRoZSB3YXp1aC1yZWdpc3RyeS5qc29uXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZVJlZ2lzdHJ5LnVwZGF0ZUNsdXN0ZXJJbmZvKGlkLCBhcGkuY2x1c3Rlcl9pbmZvKTtcblxuICAgICAgICAgICAgLy8gSGlkZSBXYXp1aCBBUEkgc2VjcmV0LCB1c2VybmFtZSwgcGFzc3dvcmRcbiAgICAgICAgICAgIGNvbnN0IGNvcGllZCA9IHsgLi4uYXBpIH07XG4gICAgICAgICAgICBjb3BpZWQuc2VjcmV0ID0gJyoqKionO1xuICAgICAgICAgICAgY29waWVkLnBhc3N3b3JkID0gJyoqKionO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogSFRUUF9TVEFUVVNfQ09ERVMuT0ssXG4gICAgICAgICAgICAgICAgZGF0YTogY29waWVkLFxuICAgICAgICAgICAgICAgIGlkQ2hhbmdlZDogcmVxdWVzdC5ib2R5LmlkQ2hhbmdlZCB8fCBudWxsLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGhhdmUgYW4gaW52YWxpZCByZXNwb25zZSBmcm9tIHRoZSBXYXp1aCBBUElcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5kYXRhLmRldGFpbCB8fFxuICAgICAgICAgIGAke2FwaS51cmx9OiR7YXBpLnBvcnR9IGlzIHVucmVhY2hhYmxlYCxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnRVBST1RPJykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IEhUVFBfU1RBVFVTX0NPREVTLk9LLFxuICAgICAgICAgICAgZGF0YTogeyBhcGlJc0Rvd246IHRydWUgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBIVFRQX1NUQVRVU19DT0RFUy5PSyxcbiAgICAgICAgICAgIGRhdGE6IHsgYXBpSXNEb3duOiB0cnVlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGFwaXMgPSBhd2FpdCB0aGlzLm1hbmFnZUhvc3RzLmdldEhvc3RzKCk7XG4gICAgICAgICAgZm9yIChjb25zdCBhcGkgb2YgYXBpcykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgaWQgPSBPYmplY3Qua2V5cyhhcGkpWzBdO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlTWFuYWdlckluZm8gPVxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICAgICAgICBgL21hbmFnZXIvaW5mb2AsXG4gICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBpZCB9LFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tSZXNwb25zZUlzRG93bihyZXNwb25zZU1hbmFnZXJJbmZvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgICAgICAgICAgYEVSUk9SMzA5OSAtICR7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuZGV0YWlsIHx8ICdXYXp1aCBub3QgcmVhZHkgeWV0J1xuICAgICAgICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICAgICAgICAzMDk5LFxuICAgICAgICAgICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuU0VSVklDRV9VTkFWQUlMQUJMRSxcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlTWFuYWdlckluZm8uc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5PSykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYm9keS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYm9keS5pZENoYW5nZWQgPSBpZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja1N0b3JlZEFQSShjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZygnd2F6dWgtYXBpOmNoZWNrU3RvcmVkQVBJJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAgICAgMzAyMCxcbiAgICAgICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nKCd3YXp1aC1hcGk6Y2hlY2tTdG9yZWRBUEknLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgICAzMDAyLFxuICAgICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBwZXJmb21zIGEgdmFsaWRhdGlvbiBvZiBBUEkgcGFyYW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5IEFQSSBwYXJhbXNcbiAgICovXG4gIHZhbGlkYXRlQ2hlY2tBcGlQYXJhbXMoYm9keSkge1xuICAgIGlmICghKCd1c2VybmFtZScgaW4gYm9keSkpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBwYXJhbTogQVBJIFVTRVJOQU1FJztcbiAgICB9XG5cbiAgICBpZiAoISgncGFzc3dvcmQnIGluIGJvZHkpICYmICEoJ2lkJyBpbiBib2R5KSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIHBhcmFtOiBBUEkgUEFTU1dPUkQnO1xuICAgIH1cblxuICAgIGlmICghKCd1cmwnIGluIGJvZHkpKSB7XG4gICAgICByZXR1cm4gJ01pc3NpbmcgcGFyYW06IEFQSSBVUkwnO1xuICAgIH1cblxuICAgIGlmICghKCdwb3J0JyBpbiBib2R5KSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIHBhcmFtOiBBUEkgUE9SVCc7XG4gICAgfVxuXG4gICAgaWYgKCFib2R5LnVybC5pbmNsdWRlcygnaHR0cHM6Ly8nKSAmJiAhYm9keS51cmwuaW5jbHVkZXMoJ2h0dHA6Ly8nKSkge1xuICAgICAgcmV0dXJuICdwcm90b2NvbF9lcnJvcic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2hlY2sgdGhlIHdhenVoLWFwaSBjb25maWd1cmF0aW9uIHJlY2VpdmVkIGluIHRoZSBQT1NUIGJvZHkgd2lsbCB3b3JrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0dXMgb2JqIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGNoZWNrQVBJKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGFwaUF2YWlsYWJsZSA9IG51bGw7XG4gICAgICAvLyBjb25zdCBub3RWYWxpZCA9IHRoaXMudmFsaWRhdGVDaGVja0FwaVBhcmFtcyhyZXF1ZXN0LmJvZHkpO1xuICAgICAgLy8gaWYgKG5vdFZhbGlkKSByZXR1cm4gRXJyb3JSZXNwb25zZShub3RWYWxpZCwgMzAwMywgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCByZXNwb25zZSk7XG4gICAgICBsb2coJ3dhenVoLWFwaTpjaGVja0FQSScsIGAke3JlcXVlc3QuYm9keS5pZH0gaXMgdmFsaWRgLCAnZGVidWcnKTtcbiAgICAgIC8vIENoZWNrIGlmIGEgV2F6dWggQVBJIGlkIGlzIGdpdmVuIChhbHJlYWR5IHN0b3JlZCBBUEkpXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5tYW5hZ2VIb3N0cy5nZXRIb3N0QnlJZChyZXF1ZXN0LmJvZHkuaWQpO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgYXBpQXZhaWxhYmxlID0gZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZygnd2F6dWgtYXBpOmNoZWNrQVBJJywgYEFQSSAke3JlcXVlc3QuYm9keS5pZH0gbm90IGZvdW5kYCk7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGBUaGUgQVBJICR7cmVxdWVzdC5ib2R5LmlkfSB3YXMgbm90IGZvdW5kYCxcbiAgICAgICAgICAzMDI5LFxuICAgICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGFwaUhvc3RJRDogcmVxdWVzdC5ib2R5LmlkIH07XG4gICAgICBpZiAocmVxdWVzdC5ib2R5LmZvcmNlUmVmcmVzaCkge1xuICAgICAgICBvcHRpb25zWydmb3JjZVJlZnJlc2gnXSA9IHJlcXVlc3QuYm9keS5mb3JjZVJlZnJlc2g7XG4gICAgICB9XG4gICAgICBsZXQgcmVzcG9uc2VNYW5hZ2VySW5mbztcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlTWFuYWdlckluZm8gPVxuICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICBgL21hbmFnZXIvaW5mb2AsXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGBFUlJPUjMwOTkgLSAke1xuICAgICAgICAgICAgZXJyb3IucmVzcG9uc2U/LmRhdGE/LmRldGFpbCB8fCAnV2F6dWggbm90IHJlYWR5IHlldCdcbiAgICAgICAgICB9YCxcbiAgICAgICAgICAzMDk5LFxuICAgICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLlNFUlZJQ0VfVU5BVkFJTEFCTEUsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGxvZyhcbiAgICAgICAgJ3dhenVoLWFwaTpjaGVja0FQSScsXG4gICAgICAgIGAke3JlcXVlc3QuYm9keS5pZH0gY3JlZGVudGlhbHMgYXJlIHZhbGlkYCxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIHJlc3BvbnNlTWFuYWdlckluZm8uc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5PSyAmJlxuICAgICAgICByZXNwb25zZU1hbmFnZXJJbmZvLmRhdGFcbiAgICAgICkge1xuICAgICAgICBsZXQgcmVzcG9uc2VBZ2VudHMgPVxuICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICBgL2FnZW50c2AsXG4gICAgICAgICAgICB7IHBhcmFtczogeyBhZ2VudHNfbGlzdDogJzAwMCcgfSB9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IHJlcXVlc3QuYm9keS5pZCB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlQWdlbnRzLnN0YXR1cyA9PT0gSFRUUF9TVEFUVVNfQ09ERVMuT0spIHtcbiAgICAgICAgICBjb25zdCBtYW5hZ2VyTmFtZSA9XG4gICAgICAgICAgICByZXNwb25zZUFnZW50cy5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF0ubWFuYWdlcjtcblxuICAgICAgICAgIGxldCByZXNwb25zZUNsdXN0ZXIgPVxuICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICBgL2NsdXN0ZXIvc3RhdHVzYCxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBDaGVjayB0aGUgcnVuX2FzIGZvciB0aGUgQVBJIHVzZXIgYW5kIHVwZGF0ZSBpdFxuICAgICAgICAgIGxldCBhcGlVc2VyQWxsb3dSdW5BcyA9IEFQSV9VU0VSX1NUQVRVU19SVU5fQVMuQUxMX0RJU0FCTEVEO1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQXBpVXNlckFsbG93UnVuQXMgPVxuICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICBgL3NlY3VyaXR5L3VzZXJzL21lYCxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlQXBpVXNlckFsbG93UnVuQXMuc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5PSykge1xuICAgICAgICAgICAgY29uc3QgYWxsb3dfcnVuX2FzID1cbiAgICAgICAgICAgICAgcmVzcG9uc2VBcGlVc2VyQWxsb3dSdW5Bcy5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF1cbiAgICAgICAgICAgICAgICAuYWxsb3dfcnVuX2FzO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dfcnVuX2FzICYmIGFwaUF2YWlsYWJsZSAmJiBhcGlBdmFpbGFibGUucnVuX2FzKVxuICAgICAgICAgICAgICAvLyBIT1NUIEFORCBVU0VSIEVOQUJMRURcbiAgICAgICAgICAgICAgYXBpVXNlckFsbG93UnVuQXMgPSBBUElfVVNFUl9TVEFUVVNfUlVOX0FTLkVOQUJMRUQ7XG4gICAgICAgICAgICBlbHNlIGlmICghYWxsb3dfcnVuX2FzICYmIGFwaUF2YWlsYWJsZSAmJiBhcGlBdmFpbGFibGUucnVuX2FzKVxuICAgICAgICAgICAgICAvLyBIT1NUIEVOQUJMRUQgQU5EIFVTRVIgRElTQUJMRURcbiAgICAgICAgICAgICAgYXBpVXNlckFsbG93UnVuQXMgPSBBUElfVVNFUl9TVEFUVVNfUlVOX0FTLlVTRVJfTk9UX0FMTE9XRUQ7XG4gICAgICAgICAgICBlbHNlIGlmIChhbGxvd19ydW5fYXMgJiYgKCFhcGlBdmFpbGFibGUgfHwgIWFwaUF2YWlsYWJsZS5ydW5fYXMpKVxuICAgICAgICAgICAgICAvLyBVU0VSIEVOQUJMRUQgQU5EIEhPU1QgRElTQUJMRURcbiAgICAgICAgICAgICAgYXBpVXNlckFsbG93UnVuQXMgPSBBUElfVVNFUl9TVEFUVVNfUlVOX0FTLkhPU1RfRElTQUJMRUQ7XG4gICAgICAgICAgICBlbHNlIGlmICghYWxsb3dfcnVuX2FzICYmICghYXBpQXZhaWxhYmxlIHx8ICFhcGlBdmFpbGFibGUucnVuX2FzKSlcbiAgICAgICAgICAgICAgLy8gSE9TVCBBTkQgVVNFUiBESVNBQkxFRFxuICAgICAgICAgICAgICBhcGlVc2VyQWxsb3dSdW5BcyA9IEFQSV9VU0VSX1NUQVRVU19SVU5fQVMuQUxMX0RJU0FCTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBDYWNoZUluTWVtb3J5QVBJVXNlckFsbG93UnVuQXMuc2V0KFxuICAgICAgICAgICAgcmVxdWVzdC5ib2R5LmlkLFxuICAgICAgICAgICAgYXBpQXZhaWxhYmxlLnVzZXJuYW1lLFxuICAgICAgICAgICAgYXBpVXNlckFsbG93UnVuQXMsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZXNwb25zZUNsdXN0ZXIuc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5PSykge1xuICAgICAgICAgICAgbG9nKFxuICAgICAgICAgICAgICAnd2F6dWgtYXBpOmNoZWNrU3RvcmVkQVBJJyxcbiAgICAgICAgICAgICAgYFdhenVoIEFQSSByZXNwb25zZSBpcyB2YWxpZGAsXG4gICAgICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlQ2x1c3Rlci5kYXRhLmRhdGEuZW5hYmxlZCA9PT0gJ3llcycpIHtcbiAgICAgICAgICAgICAgLy8gSWYgY2x1c3RlciBtb2RlIGlzIGFjdGl2ZVxuICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VDbHVzdGVyTG9jYWwgPVxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICAgICAgICBgL2NsdXN0ZXIvbG9jYWwvaW5mb2AsXG4gICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZUNsdXN0ZXJMb2NhbC5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLk9LKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcjogbWFuYWdlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHJlc3BvbnNlQ2x1c3RlckxvY2FsLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtc1swXS5ub2RlLFxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyOlxuICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ2x1c3RlckxvY2FsLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtc1swXS5jbHVzdGVyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dfcnVuX2FzOiBhcGlVc2VyQWxsb3dSdW5BcyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENsdXN0ZXIgbW9kZSBpcyBub3QgYWN0aXZlXG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgbWFuYWdlcjogbWFuYWdlck5hbWUsXG4gICAgICAgICAgICAgICAgICBjbHVzdGVyOiAnRGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgYWxsb3dfcnVuX2FzOiBhcGlVc2VyQWxsb3dSdW5BcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1hcGk6Y2hlY2tBUEknLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcblxuICAgICAgaWYgKFxuICAgICAgICBlcnJvciAmJlxuICAgICAgICBlcnJvci5yZXNwb25zZSAmJlxuICAgICAgICBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLlVOQVVUSE9SSVpFRFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGBVbmF0aG9yaXplZC4gUGxlYXNlIGNoZWNrIEFQSSBjcmVkZW50aWFscy4gJHtlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2V9YCxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5VTkFVVEhPUklaRUQsXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuVU5BVVRIT1JJWkVELFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBlcnJvciAmJlxuICAgICAgICBlcnJvci5yZXNwb25zZSAmJlxuICAgICAgICBlcnJvci5yZXNwb25zZS5kYXRhICYmXG4gICAgICAgIGVycm9yLnJlc3BvbnNlLmRhdGEuZGV0YWlsXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgZXJyb3IucmVzcG9uc2UuZGF0YS5kZXRhaWwsXG4gICAgICAgICAgZXJyb3IucmVzcG9uc2Uuc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLlNFUlZJQ0VfVU5BVkFJTEFCTEUsXG4gICAgICAgICAgZXJyb3IucmVzcG9uc2Uuc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLlNFUlZJQ0VfVU5BVkFJTEFCTEUsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VQUk9UTycpIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgJ1dyb25nIHByb3RvY29sIGJlaW5nIHVzZWQgdG8gY29ubmVjdCB0byB0aGUgV2F6dWggQVBJJyxcbiAgICAgICAgICAzMDA1LFxuICAgICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLkJBRF9SRVFVRVNULFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgIDMwMDUsXG4gICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrUmVzcG9uc2VJc0Rvd24ocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSBIVFRQX1NUQVRVU19DT0RFUy5PSykge1xuICAgICAgLy8gQXZvaWQgXCJFcnJvciBjb21tdW5pY2F0aW5nIHdpdGggc29ja2V0XCIgbGlrZSBlcnJvcnNcbiAgICAgIGNvbnN0IHNvY2tldEVycm9yQ29kZXMgPSBbMTAxMywgMTAxNCwgMTAxNywgMTAxOCwgMTAxOV07XG4gICAgICBjb25zdCBzdGF0dXMgPSAocmVzcG9uc2UuZGF0YSB8fCB7fSkuc3RhdHVzIHx8IDE7XG4gICAgICBjb25zdCBpc0Rvd24gPSBzb2NrZXRFcnJvckNvZGVzLmluY2x1ZGVzKHN0YXR1cyk7XG5cbiAgICAgIGlzRG93biAmJlxuICAgICAgICBsb2coXG4gICAgICAgICAgJ3dhenVoLWFwaTptYWtlUmVxdWVzdCcsXG4gICAgICAgICAgJ1dhenVoIEFQSSBpcyBvbmxpbmUgYnV0IFdhenVoIGlzIG5vdCByZWFkeSB5ZXQnLFxuICAgICAgICApO1xuXG4gICAgICByZXR1cm4gaXNEb3duO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgbWFpbiBXYXp1aCBkYWVtb25zIHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICAgKiBAcGFyYW0geyp9IGFwaSBBUEkgZW50cnkgc3RvcmVkIGluIC53YXp1aFxuICAgKiBAcGFyYW0geyp9IHBhdGggT3B0aW9uYWwuIFdhenVoIEFQSSB0YXJnZXQgcGF0aC5cbiAgICovXG4gIGFzeW5jIGNoZWNrRGFlbW9ucyhjb250ZXh0LCBhcGksIHBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgJ0dFVCcsXG4gICAgICAgICcvbWFuYWdlci9zdGF0dXMnLFxuICAgICAgICB7fSxcbiAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaS5pZCB9LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGFlbW9ucyA9XG4gICAgICAgICgoKChyZXNwb25zZSB8fCB7fSkuZGF0YSB8fCB7fSkuZGF0YSB8fCB7fSkuYWZmZWN0ZWRfaXRlbXMgfHwgW10pWzBdIHx8XG4gICAgICAgIHt9O1xuXG4gICAgICBjb25zdCBpc0NsdXN0ZXIgPVxuICAgICAgICAoKGFwaSB8fCB7fSkuY2x1c3Rlcl9pbmZvIHx8IHt9KS5zdGF0dXMgPT09ICdlbmFibGVkJyAmJlxuICAgICAgICB0eXBlb2YgZGFlbW9uc1snd2F6dWgtY2x1c3RlcmQnXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICBjb25zdCB3YXp1aGRiRXhpc3RzID0gdHlwZW9mIGRhZW1vbnNbJ3dhenVoLWRiJ10gIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICBjb25zdCBleGVjZCA9IGRhZW1vbnNbJ3dhenVoLWV4ZWNkJ10gPT09ICdydW5uaW5nJztcbiAgICAgIGNvbnN0IG1vZHVsZXNkID0gZGFlbW9uc1snd2F6dWgtbW9kdWxlc2QnXSA9PT0gJ3J1bm5pbmcnO1xuICAgICAgY29uc3Qgd2F6dWhkYiA9IHdhenVoZGJFeGlzdHMgPyBkYWVtb25zWyd3YXp1aC1kYiddID09PSAncnVubmluZycgOiB0cnVlO1xuICAgICAgY29uc3QgY2x1c3RlcmQgPSBpc0NsdXN0ZXJcbiAgICAgICAgPyBkYWVtb25zWyd3YXp1aC1jbHVzdGVyZCddID09PSAncnVubmluZydcbiAgICAgICAgOiB0cnVlO1xuXG4gICAgICBjb25zdCBpc1ZhbGlkID0gZXhlY2QgJiYgbW9kdWxlc2QgJiYgd2F6dWhkYiAmJiBjbHVzdGVyZDtcblxuICAgICAgaXNWYWxpZCAmJiBsb2coJ3dhenVoLWFwaTpjaGVja0RhZW1vbnMnLCBgV2F6dWggaXMgcmVhZHlgLCAnZGVidWcnKTtcblxuICAgICAgaWYgKHBhdGggPT09ICcvcGluZycpIHtcbiAgICAgICAgcmV0dXJuIHsgaXNWYWxpZCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXYXp1aCBub3QgcmVhZHkgeWV0Jyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnd2F6dWgtYXBpOmNoZWNrRGFlbW9ucycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBzbGVlcCh0aW1lTXMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lTXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIERldiBUb29scy5cbiAgICogaHR0cHM6Ly9kb2N1bWVudGF0aW9uLndhenVoLmNvbS9jdXJyZW50L3VzZXItbWFudWFsL2FwaS9yZWZlcmVuY2UuaHRtbFxuICAgKiBEZXBlbmRpbmcgb24gdGhlIG1ldGhvZCBhbmQgdGhlIHBhdGggc29tZSBwYXJhbWV0ZXJzIHNob3VsZCBiZSBhbiBhcnJheSBvciBub3QuXG4gICAqIFNpbmNlIHdlIGFsbG93IHRoZSB1c2VyIHRvIHdyaXRlIHRoZSByZXF1ZXN0IHVzaW5nIGJvdGggY29tbWEtc2VwYXJhdGVkIGFuZCBhcnJheSBhcyB3ZWxsLFxuICAgKiB3ZSBuZWVkIHRvIGNoZWNrIGlmIGl0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZCBvciBub3QuXG4gICAqIEBwYXJhbSB7Kn0gbWV0aG9kIFRoZSByZXF1ZXN0IG1ldGhvZFxuICAgKiBAcGFyYW0geyp9IHBhdGggVGhlIFdhenVoIEFQSSBwYXRoXG4gICAqL1xuICBzaG91bGRLZWVwQXJyYXlBc0l0KG1ldGhvZCwgcGF0aCkge1xuICAgIC8vIE1ldGhvZHMgdGhhdCB3ZSBtdXN0IHJlc3BlY3QgYSBkbyBub3QgdHJhbnNmb3JtIHRoZW1cbiAgICBjb25zdCBpc0FnZW50c1Jlc3RhcnQgPSBtZXRob2QgPT09ICdQT1NUJyAmJiBwYXRoID09PSAnL2FnZW50cy9yZXN0YXJ0JztcbiAgICBjb25zdCBpc0FjdGl2ZVJlc3BvbnNlID1cbiAgICAgIG1ldGhvZCA9PT0gJ1BVVCcgJiYgcGF0aC5zdGFydHNXaXRoKCcvYWN0aXZlLXJlc3BvbnNlJyk7XG4gICAgY29uc3QgaXNBZGRpbmdBZ2VudHNUb0dyb3VwID1cbiAgICAgIG1ldGhvZCA9PT0gJ1BPU1QnICYmIHBhdGguc3RhcnRzV2l0aCgnL2FnZW50cy9ncm91cC8nKTtcblxuICAgIC8vIFJldHVybnMgdHJ1ZSBvbmx5IGlmIG9uZSBvZiB0aGUgYWJvdmUgY29uZGl0aW9ucyBpcyB0cnVlXG4gICAgcmV0dXJuIGlzQWdlbnRzUmVzdGFydCB8fCBpc0FjdGl2ZVJlc3BvbnNlIHx8IGlzQWRkaW5nQWdlbnRzVG9Hcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHBlcmZvcm1zIGEgcmVxdWVzdCBvdmVyIFdhenVoIEFQSSBhbmQgcmV0dXJucyBpdHMgcmVzcG9uc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBNZXRob2Q6IEdFVCwgUFVULCBQT1NULCBERUxFVEVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggQVBJIHJvdXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIGRhdGEgYW5kIHBhcmFtcyB0byBwZXJmb3JtIHRoZSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBBUEkgaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFQSSByZXNwb25zZSBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBtYWtlUmVxdWVzdChjb250ZXh0LCBtZXRob2QsIHBhdGgsIGRhdGEsIGlkLCByZXNwb25zZSkge1xuICAgIGNvbnN0IGRldlRvb2xzID0gISEoZGF0YSB8fCB7fSkuZGV2VG9vbHM7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwaSA9IGF3YWl0IHRoaXMubWFuYWdlSG9zdHMuZ2V0SG9zdEJ5SWQoaWQpO1xuICAgICAgaWYgKGRldlRvb2xzKSB7XG4gICAgICAgIGRlbGV0ZSBkYXRhLmRldlRvb2xzO1xuICAgICAgfVxuXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKGFwaSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZygnd2F6dWgtYXBpOm1ha2VSZXF1ZXN0JywgJ0NvdWxkIG5vdCBnZXQgaG9zdCBjcmVkZW50aWFscycpO1xuICAgICAgICAvL0NhbiBub3QgZ2V0IGNyZWRlbnRpYWxzIGZyb20gd2F6dWgtaG9zdHNcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgJ0NvdWxkIG5vdCBnZXQgaG9zdCBjcmVkZW50aWFscycsXG4gICAgICAgICAgMzAxMSxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5OT1RfRk9VTkQsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YS5oZWFkZXJzKSB7XG4gICAgICAgIGRhdGEuaGVhZGVycyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBhcGlIb3N0SUQ6IGlkLFxuICAgICAgfTtcblxuICAgICAgLy8gU2V0IGNvbnRlbnQgdHlwZSBhcHBsaWNhdGlvbi94bWwgaWYgbmVlZGVkXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiAoZGF0YSB8fCB7fSkuYm9keSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgKGRhdGEgfHwge30pLm9yaWdpbiA9PT0gJ3htbGVkaXRvcidcbiAgICAgICkge1xuICAgICAgICBkYXRhLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gICAgICAgIGRlbGV0ZSBkYXRhLm9yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgKGRhdGEgfHwge30pLmJvZHkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChkYXRhIHx8IHt9KS5vcmlnaW4gPT09ICdqc29uJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGEuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIGRlbGV0ZSBkYXRhLm9yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgKGRhdGEgfHwge30pLmJvZHkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChkYXRhIHx8IHt9KS5vcmlnaW4gPT09ICdyYXcnXG4gICAgICApIHtcbiAgICAgICAgZGF0YS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICAgICAgICBkZWxldGUgZGF0YS5vcmlnaW47XG4gICAgICB9XG4gICAgICBjb25zdCBkZWxheSA9IChkYXRhIHx8IHt9KS5kZWxheSB8fCAwO1xuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIGFkZEpvYlRvUXVldWUoe1xuICAgICAgICAgIHN0YXJ0QXQ6IG5ldyBEYXRlKERhdGUubm93KCkgKyBkZWxheSksXG4gICAgICAgICAgcnVuOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGxvZyhcbiAgICAgICAgICAgICAgICAncXVldWU6ZGVsYXlBcGlSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICBgQW4gZXJyb3Igb2N1cnJlZCBpbiB0aGUgZGVsYXllZCByZXF1ZXN0OiBcIiR7bWV0aG9kfSAke3BhdGh9XCI6ICR7XG4gICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yXG4gICAgICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogeyBlcnJvcjogMCwgbWVzc2FnZTogJ1N1Y2Nlc3MnIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF0aCA9PT0gJy9waW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNoZWNrID0gYXdhaXQgdGhpcy5jaGVja0RhZW1vbnMoY29udGV4dCwgYXBpLCBwYXRoKTtcbiAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc3QgaXNEb3duID0gKGVycm9yIHx8IHt9KS5jb2RlID09PSAnRUNPTk5SRUZVU0VEJztcbiAgICAgICAgICBpZiAoIWlzRG93bikge1xuICAgICAgICAgICAgbG9nKFxuICAgICAgICAgICAgICAnd2F6dWgtYXBpOm1ha2VSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgJ1dhenVoIEFQSSBpcyBvbmxpbmUgYnV0IFdhenVoIGlzIG5vdCByZWFkeSB5ZXQnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgICAgICBgRVJST1IzMDk5IC0gJHtlcnJvci5tZXNzYWdlIHx8ICdXYXp1aCBub3QgcmVhZHkgeWV0J31gLFxuICAgICAgICAgICAgICAzMDk5LFxuICAgICAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbG9nKCd3YXp1aC1hcGk6bWFrZVJlcXVlc3QnLCBgJHttZXRob2R9ICR7cGF0aH1gLCAnZGVidWcnKTtcblxuICAgICAgLy8gRXh0cmFjdCBrZXlzIGZyb20gcGFyYW1ldGVyc1xuICAgICAgY29uc3QgZGF0YVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIGFycmF5cyBpbnRvIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcgaWYgYXBwbGljYWJsZS5cbiAgICAgIC8vIFRoZSByZWFzb24gaXMgdGhhdCB3ZSBhcmUgYWNjZXB0aW5nIGFycmF5cyBmb3IgY29tbWEtc2VwYXJhdGVkXG4gICAgICAvLyBwYXJhbWV0ZXJzIGluIHRoZSBEZXYgVG9vbHNcbiAgICAgIGlmICghdGhpcy5zaG91bGRLZWVwQXJyYXlBc0l0KG1ldGhvZCwgcGF0aCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZGF0YVByb3BlcnRpZXMpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSBkYXRhW2tleV0uam9pbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZVRva2VuID1cbiAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZUlzRG93biA9IHRoaXMuY2hlY2tSZXNwb25zZUlzRG93bihyZXNwb25zZVRva2VuKTtcbiAgICAgIGlmIChyZXNwb25zZUlzRG93bikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBgRVJST1IzMDk5IC0gJHtyZXNwb25zZS5ib2R5Lm1lc3NhZ2UgfHwgJ1dhenVoIG5vdCByZWFkeSB5ZXQnfWAsXG4gICAgICAgICAgMzA5OSxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsZXQgcmVzcG9uc2VCb2R5ID0gKHJlc3BvbnNlVG9rZW4gfHwge30pLmRhdGEgfHwge307XG4gICAgICBpZiAoIXJlc3BvbnNlQm9keSkge1xuICAgICAgICByZXNwb25zZUJvZHkgPVxuICAgICAgICAgIHR5cGVvZiByZXNwb25zZUJvZHkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgcGF0aC5pbmNsdWRlcygnL2ZpbGVzJykgJiZcbiAgICAgICAgICBtZXRob2QgPT09ICdHRVQnXG4gICAgICAgICAgICA/ICcgJ1xuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlQm9keTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3BvbnNlRXJyb3IgPVxuICAgICAgICByZXNwb25zZS5zdGF0dXMgIT09IEhUVFBfU1RBVFVTX0NPREVTLk9LID8gcmVzcG9uc2Uuc3RhdHVzIDogZmFsc2U7XG5cbiAgICAgIGlmICghcmVzcG9uc2VFcnJvciAmJiByZXNwb25zZUJvZHkpIHtcbiAgICAgICAgLy9jbGVhbktleXMocmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlVG9rZW4uZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNwb25zZUVycm9yICYmIGRldlRvb2xzKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aHJvdyByZXNwb25zZUVycm9yICYmIHJlc3BvbnNlQm9keS5kZXRhaWxcbiAgICAgICAgPyB7IG1lc3NhZ2U6IHJlc3BvbnNlQm9keS5kZXRhaWwsIGNvZGU6IHJlc3BvbnNlRXJyb3IgfVxuICAgICAgICA6IG5ldyBFcnJvcignVW5leHBlY3RlZCBlcnJvciBmZXRjaGluZyBkYXRhIGZyb20gdGhlIFdhenVoIEFQSScpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGVycm9yICYmXG4gICAgICAgIGVycm9yLnJlc3BvbnNlICYmXG4gICAgICAgIGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gSFRUUF9TVEFUVVNfQ09ERVMuVU5BVVRIT1JJWkVEXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgICBlcnJvci5jb2RlID8gYFdhenVoIEFQSSBlcnJvcjogJHtlcnJvci5jb2RlfWAgOiAzMDEzLFxuICAgICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLlVOQVVUSE9SSVpFRCxcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVycm9yTXNnID0gKGVycm9yLnJlc3BvbnNlIHx8IHt9KS5kYXRhIHx8IGVycm9yLm1lc3NhZ2U7XG4gICAgICBsb2coJ3dhenVoLWFwaTptYWtlUmVxdWVzdCcsIGVycm9yTXNnIHx8IGVycm9yKTtcbiAgICAgIGlmIChkZXZUb29scykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHsgZXJyb3I6ICczMDEzJywgbWVzc2FnZTogZXJyb3JNc2cgfHwgZXJyb3IgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGVycm9yIHx8IHt9KS5jb2RlICYmIEFwaUVycm9yRXF1aXZhbGVuY2VbZXJyb3IuY29kZV0pIHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlID0gQXBpRXJyb3JFcXVpdmFsZW5jZVtlcnJvci5jb2RlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBlcnJvck1zZy5kZXRhaWwgfHwgZXJyb3IsXG4gICAgICAgICAgZXJyb3IuY29kZSA/IGBXYXp1aCBBUEkgZXJyb3I6ICR7ZXJyb3IuY29kZX1gIDogMzAxMyxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWFrZSBhIHJlcXVlc3QgdG8gQVBJXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhcGkgcmVzcG9uc2Ugb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgcmVxdWVzdEFwaShcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgY29uc3QgaWRBcGkgPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShyZXF1ZXN0LmhlYWRlcnMuY29va2llLCAnd3otYXBpJyk7XG4gICAgaWYgKGlkQXBpICE9PSByZXF1ZXN0LmJvZHkuaWQpIHtcbiAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHRva2VuIGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgQVBJIGlkLCB3ZSByZWxvZ2luIHRvIG9idGFpbiBhIG5ldyB0b2tlblxuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICdzdGF0dXMgY29kZSA0MDEnLFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5VTkFVVEhPUklaRUQsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLlVOQVVUSE9SSVpFRCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QuYm9keS5tZXRob2QpIHtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAnTWlzc2luZyBwYXJhbTogbWV0aG9kJyxcbiAgICAgICAgMzAxNSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuQkFEX1JFUVVFU1QsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFyZXF1ZXN0LmJvZHkubWV0aG9kLm1hdGNoKC9eKD86R0VUfFBVVHxQT1NUfERFTEVURSkkLykpIHtcbiAgICAgIGxvZygnd2F6dWgtYXBpOm1ha2VSZXF1ZXN0JywgJ1JlcXVlc3QgbWV0aG9kIGlzIG5vdCB2YWxpZC4nKTtcbiAgICAgIC8vTWV0aG9kIGlzIG5vdCBhIHZhbGlkIEhUVFAgcmVxdWVzdCBtZXRob2RcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAnUmVxdWVzdCBtZXRob2QgaXMgbm90IHZhbGlkLicsXG4gICAgICAgIDMwMTUsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLkJBRF9SRVFVRVNULFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghcmVxdWVzdC5ib2R5LnBhdGgpIHtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAnTWlzc2luZyBwYXJhbTogcGF0aCcsXG4gICAgICAgIDMwMTYsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLkJBRF9SRVFVRVNULFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghcmVxdWVzdC5ib2R5LnBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICBsb2coJ3dhenVoLWFwaTptYWtlUmVxdWVzdCcsICdSZXF1ZXN0IHBhdGggaXMgbm90IHZhbGlkLicpO1xuICAgICAgLy9QYXRoIGRvZXNuJ3Qgc3RhcnQgd2l0aCAnLydcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAnUmVxdWVzdCBwYXRoIGlzIG5vdCB2YWxpZC4nLFxuICAgICAgICAzMDE1LFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5CQURfUkVRVUVTVCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5tYWtlUmVxdWVzdChcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgcmVxdWVzdC5ib2R5Lm1ldGhvZCxcbiAgICAgICAgcmVxdWVzdC5ib2R5LnBhdGgsXG4gICAgICAgIHJlcXVlc3QuYm9keS5ib2R5LFxuICAgICAgICByZXF1ZXN0LmJvZHkuaWQsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZ1bGwgZGF0YSBvbiBDU1YgZm9ybWF0IGZyb20gYSBsaXN0IFdhenVoIEFQSSBlbmRwb2ludFxuICAgKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjc3Ygb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgY3N2KFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFyZXF1ZXN0LmJvZHkgfHwgIXJlcXVlc3QuYm9keS5wYXRoKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIHBhdGggaXMgcmVxdWlyZWQnKTtcbiAgICAgIGlmICghcmVxdWVzdC5ib2R5LmlkKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlkIGlzIHJlcXVpcmVkJyk7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSBBcnJheS5pc0FycmF5KCgocmVxdWVzdCB8fCB7fSkuYm9keSB8fCB7fSkuZmlsdGVycylcbiAgICAgICAgPyByZXF1ZXN0LmJvZHkuZmlsdGVyc1xuICAgICAgICA6IFtdO1xuXG4gICAgICBsZXQgdG1wUGF0aCA9IHJlcXVlc3QuYm9keS5wYXRoO1xuXG4gICAgICBpZiAodG1wUGF0aCAmJiB0eXBlb2YgdG1wUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wUGF0aCA9IHRtcFBhdGhbMF0gPT09ICcvJyA/IHRtcFBhdGguc3Vic3RyKDEpIDogdG1wUGF0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0bXBQYXRoKSB0aHJvdyBuZXcgRXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHBhcnNpbmcgcGF0aCBmaWVsZCcpO1xuXG4gICAgICBsb2coJ3dhenVoLWFwaTpjc3YnLCBgUmVwb3J0ICR7dG1wUGF0aH1gLCAnZGVidWcnKTtcbiAgICAgIC8vIFJlYWwgbGltaXQsIHJlZ2FyZGxlc3MgdGhlIHVzZXIgcXVlcnlcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgbGltaXQ6IDUwMCB9O1xuXG4gICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgZmlsdGVycykge1xuICAgICAgICAgIGlmICghZmlsdGVyLm5hbWUgfHwgIWZpbHRlci52YWx1ZSkgY29udGludWU7XG4gICAgICAgICAgcGFyYW1zW2ZpbHRlci5uYW1lXSA9IGZpbHRlci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgaXRlbXNBcnJheSA9IFtdO1xuXG4gICAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAnR0VUJyxcbiAgICAgICAgYC8ke3RtcFBhdGh9YCxcbiAgICAgICAgeyBwYXJhbXM6IHBhcmFtcyB9LFxuICAgICAgICB7IGFwaUhvc3RJRDogcmVxdWVzdC5ib2R5LmlkIH0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpc0xpc3QgPVxuICAgICAgICByZXF1ZXN0LmJvZHkucGF0aC5pbmNsdWRlcygnL2xpc3RzJykgJiZcbiAgICAgICAgcmVxdWVzdC5ib2R5LmZpbHRlcnMgJiZcbiAgICAgICAgcmVxdWVzdC5ib2R5LmZpbHRlcnMubGVuZ3RoICYmXG4gICAgICAgIHJlcXVlc3QuYm9keS5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5faXNDREJMaXN0KTtcblxuICAgICAgY29uc3QgdG90YWxJdGVtcyA9ICgoKG91dHB1dCB8fCB7fSkuZGF0YSB8fCB7fSkuZGF0YSB8fCB7fSlcbiAgICAgICAgLnRvdGFsX2FmZmVjdGVkX2l0ZW1zO1xuXG4gICAgICBpZiAodG90YWxJdGVtcyAmJiAhaXNMaXN0KSB7XG4gICAgICAgIHBhcmFtcy5vZmZzZXQgPSAwO1xuICAgICAgICBpdGVtc0FycmF5LnB1c2goLi4ub3V0cHV0LmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtcyk7XG4gICAgICAgIHdoaWxlIChpdGVtc0FycmF5Lmxlbmd0aCA8IHRvdGFsSXRlbXMgJiYgcGFyYW1zLm9mZnNldCA8IHRvdGFsSXRlbXMpIHtcbiAgICAgICAgICBwYXJhbXMub2Zmc2V0ICs9IHBhcmFtcy5saW1pdDtcbiAgICAgICAgICBjb25zdCB0bXBEYXRhID0gYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgYC8ke3RtcFBhdGh9YCxcbiAgICAgICAgICAgIHsgcGFyYW1zOiBwYXJhbXMgfSxcbiAgICAgICAgICAgIHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGl0ZW1zQXJyYXkucHVzaCguLi50bXBEYXRhLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvdGFsSXRlbXMpIHtcbiAgICAgICAgY29uc3QgeyBwYXRoLCBmaWx0ZXJzIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICAgIGNvbnN0IGlzQXJyYXlPZkxpc3RzID0gcGF0aC5pbmNsdWRlcygnL2xpc3RzJykgJiYgIWlzTGlzdDtcbiAgICAgICAgY29uc3QgaXNBZ2VudHMgPSBwYXRoLmluY2x1ZGVzKCcvYWdlbnRzJykgJiYgIXBhdGguaW5jbHVkZXMoJ2dyb3VwcycpO1xuICAgICAgICBjb25zdCBpc0FnZW50c09mR3JvdXAgPSBwYXRoLnN0YXJ0c1dpdGgoJy9hZ2VudHMvZ3JvdXBzLycpO1xuICAgICAgICBjb25zdCBpc0ZpbGVzID0gcGF0aC5lbmRzV2l0aCgnL2ZpbGVzJyk7XG4gICAgICAgIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyhvdXRwdXQuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zWzBdKTtcblxuICAgICAgICBpZiAoaXNBZ2VudHMgfHwgaXNBZ2VudHNPZkdyb3VwKSB7XG4gICAgICAgICAgaWYgKGlzRmlsZXMpIHtcbiAgICAgICAgICAgIGZpZWxkcyA9IFsnZmlsZW5hbWUnLCAnaGFzaCddO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZHMgPSBbXG4gICAgICAgICAgICAgICdpZCcsXG4gICAgICAgICAgICAgICdzdGF0dXMnLFxuICAgICAgICAgICAgICAnbmFtZScsXG4gICAgICAgICAgICAgICdpcCcsXG4gICAgICAgICAgICAgICdncm91cCcsXG4gICAgICAgICAgICAgICdtYW5hZ2VyJyxcbiAgICAgICAgICAgICAgJ25vZGVfbmFtZScsXG4gICAgICAgICAgICAgICdkYXRlQWRkJyxcbiAgICAgICAgICAgICAgJ3ZlcnNpb24nLFxuICAgICAgICAgICAgICAnbGFzdEtlZXBBbGl2ZScsXG4gICAgICAgICAgICAgICdvcy5hcmNoJyxcbiAgICAgICAgICAgICAgJ29zLmJ1aWxkJyxcbiAgICAgICAgICAgICAgJ29zLmNvZGVuYW1lJyxcbiAgICAgICAgICAgICAgJ29zLm1ham9yJyxcbiAgICAgICAgICAgICAgJ29zLm1pbm9yJyxcbiAgICAgICAgICAgICAgJ29zLm5hbWUnLFxuICAgICAgICAgICAgICAnb3MucGxhdGZvcm0nLFxuICAgICAgICAgICAgICAnb3MudW5hbWUnLFxuICAgICAgICAgICAgICAnb3MudmVyc2lvbicsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5T2ZMaXN0cykge1xuICAgICAgICAgIGNvbnN0IGZsYXRMaXN0cyA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgbGlzdCBvZiBpdGVtc0FycmF5KSB7XG4gICAgICAgICAgICBjb25zdCB7IHJlbGF0aXZlX2Rpcm5hbWUsIGl0ZW1zIH0gPSBsaXN0O1xuICAgICAgICAgICAgZmxhdExpc3RzLnB1c2goXG4gICAgICAgICAgICAgIC4uLml0ZW1zLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVfZGlybmFtZSxcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW0ua2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlLFxuICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaWVsZHMgPSBbJ3JlbGF0aXZlX2Rpcm5hbWUnLCAna2V5JywgJ3ZhbHVlJ107XG4gICAgICAgICAgaXRlbXNBcnJheSA9IFsuLi5mbGF0TGlzdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTGlzdCkge1xuICAgICAgICAgIGZpZWxkcyA9IFsna2V5JywgJ3ZhbHVlJ107XG4gICAgICAgICAgaXRlbXNBcnJheSA9IG91dHB1dC5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF0uaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGRzID0gZmllbGRzLm1hcChpdGVtID0+ICh7IHZhbHVlOiBpdGVtLCBkZWZhdWx0OiAnLScgfSkpO1xuXG4gICAgICAgIGNvbnN0IGpzb24yY3N2UGFyc2VyID0gbmV3IFBhcnNlcih7IGZpZWxkcyB9KTtcblxuICAgICAgICBsZXQgY3N2ID0ganNvbjJjc3ZQYXJzZXIucGFyc2UoaXRlbXNBcnJheSk7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZmllbGQ7XG4gICAgICAgICAgaWYgKGNzdi5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNzdiA9IGNzdi5yZXBsYWNlKHZhbHVlLCBLZXlFcXVpdmFsZW5jZVt2YWx1ZV0gfHwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvY3N2JyB9LFxuICAgICAgICAgIGJvZHk6IGNzdixcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBvdXRwdXQgJiZcbiAgICAgICAgb3V0cHV0LmRhdGEgJiZcbiAgICAgICAgb3V0cHV0LmRhdGEuZGF0YSAmJlxuICAgICAgICAhb3V0cHV0LmRhdGEuZGF0YS50b3RhbF9hZmZlY3RlZF9pdGVtc1xuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVzdWx0cycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBBbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyBkYXRhIGZyb20gdGhlIFdhenVoIEFQSSR7XG4gICAgICAgICAgICBvdXRwdXQgJiYgb3V0cHV0LmRhdGEgJiYgb3V0cHV0LmRhdGEuZGV0YWlsXG4gICAgICAgICAgICAgID8gYDogJHtvdXRwdXQuYm9keS5kZXRhaWx9YFxuICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnd2F6dWgtYXBpOmNzdicsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgIDMwMzQsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBkZSBsaXN0IG9mIGF2YWlsYWJsZSByZXF1ZXN0cyBpbiB0aGUgQVBJXG4gIGdldFJlcXVlc3RMaXN0KFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICAvL1JlYWQgYSBzdGF0aWMgSlNPTiB1bnRpbCB0aGUgYXBpIGNhbGwgaGFzIGltcGxlbWVudGVkXG4gICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgIGJvZHk6IGFwaVJlcXVlc3RMaXN0LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZ2V0IHRoZSB0aW1lc3RhbXAgZmllbGRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRpbWVzdGFtcCBmaWVsZCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBnZXRUaW1lU3RhbXAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBKU09OLnBhcnNlKFxuICAgICAgICBmcy5yZWFkRmlsZVN5bmModGhpcy51cGRhdGVSZWdpc3RyeS5maWxlLCAndXRmOCcpLFxuICAgICAgKTtcbiAgICAgIGlmIChzb3VyY2UuaW5zdGFsbGF0aW9uRGF0ZSAmJiBzb3VyY2UubGFzdFJlc3RhcnQpIHtcbiAgICAgICAgbG9nKFxuICAgICAgICAgICd3YXp1aC1hcGk6Z2V0VGltZVN0YW1wJyxcbiAgICAgICAgICBgSW5zdGFsbGF0aW9uIGRhdGU6ICR7c291cmNlLmluc3RhbGxhdGlvbkRhdGV9LiBMYXN0IHJlc3RhcnQ6ICR7c291cmNlLmxhc3RSZXN0YXJ0fWAsXG4gICAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBpbnN0YWxsYXRpb25EYXRlOiBzb3VyY2UuaW5zdGFsbGF0aW9uRGF0ZSxcbiAgICAgICAgICAgIGxhc3RSZXN0YXJ0OiBzb3VyY2UubGFzdFJlc3RhcnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmZXRjaCB3YXp1aC12ZXJzaW9uIHJlZ2lzdHJ5Jyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnd2F6dWgtYXBpOmdldFRpbWVTdGFtcCcsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBmZXRjaCB3YXp1aC12ZXJzaW9uIHJlZ2lzdHJ5JyxcbiAgICAgICAgNDAwMSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZ2V0IHRoZSBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBleHRlbnNpb25zIG9iamVjdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBzZXRFeHRlbnNpb25zKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgZXh0ZW5zaW9ucyB9ID0gcmVxdWVzdC5ib2R5O1xuICAgICAgLy8gVXBkYXRlIGNsdXN0ZXIgaW5mb3JtYXRpb24gaW4gdGhlIHdhenVoLXJlZ2lzdHJ5Lmpzb25cbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlUmVnaXN0cnkudXBkYXRlQVBJRXh0ZW5zaW9ucyhpZCwgZXh0ZW5zaW9ucyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogSFRUUF9TVEFUVVNfQ09ERVMuT0ssXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1hcGk6c2V0RXh0ZW5zaW9ucycsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzZXQgZXh0ZW5zaW9ucycsXG4gICAgICAgIDQwMDEsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGdldCB0aGUgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gZXh0ZW5zaW9ucyBvYmplY3Qgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgZ2V0RXh0ZW5zaW9ucyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IEpTT04ucGFyc2UoXG4gICAgICAgIGZzLnJlYWRGaWxlU3luYyh0aGlzLnVwZGF0ZVJlZ2lzdHJ5LmZpbGUsICd1dGY4JyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGV4dGVuc2lvbnM6IChzb3VyY2UuaG9zdHNbcmVxdWVzdC5wYXJhbXMuaWRdIHx8IHt9KS5leHRlbnNpb25zIHx8IHt9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZygnd2F6dWgtYXBpOmdldEV4dGVuc2lvbnMnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3QgZmV0Y2ggd2F6dWgtdmVyc2lvbiByZWdpc3RyeScsXG4gICAgICAgIDQwMDEsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGdldCB0aGUgd2F6dWggc2V0dXAgc2V0dGluZ3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNldHVwIGluZm8gb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgZ2V0U2V0dXBJbmZvKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc291cmNlID0gSlNPTi5wYXJzZShcbiAgICAgICAgZnMucmVhZEZpbGVTeW5jKHRoaXMudXBkYXRlUmVnaXN0cnkuZmlsZSwgJ3V0ZjgnKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogSFRUUF9TVEFUVVNfQ09ERVMuT0ssXG4gICAgICAgICAgZGF0YTogIU9iamVjdC52YWx1ZXMoc291cmNlKS5sZW5ndGggPyAnJyA6IHNvdXJjZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ3dhenVoLWFwaTpnZXRTZXR1cEluZm8nLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBgQ291bGQgbm90IGdldCBkYXRhIGZyb20gd2F6dWgtdmVyc2lvbiByZWdpc3RyeSBkdWUgdG8gJHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yXG4gICAgICAgIH1gLFxuICAgICAgICA0MDA1LFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJhc2ljIHN5c2NvbGxlY3RvciBpbmZvcm1hdGlvbiBmb3IgZ2l2ZW4gYWdlbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBCYXNpYyBzeXNjb2xsZWN0b3IgaW5mb3JtYXRpb25cbiAgICovXG4gIGFzeW5jIGdldFN5c2NvbGxlY3RvcihcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwaUhvc3RJRCA9IGdldENvb2tpZVZhbHVlQnlOYW1lKHJlcXVlc3QuaGVhZGVycy5jb29raWUsICd3ei1hcGknKTtcbiAgICAgIGlmICghcmVxdWVzdC5wYXJhbXMgfHwgIWFwaUhvc3RJRCB8fCAhcmVxdWVzdC5wYXJhbXMuYWdlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZ2VudCBJRCBhbmQgQVBJIElEIGFyZSByZXF1aXJlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGFnZW50IH0gPSByZXF1ZXN0LnBhcmFtcztcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgYC9zeXNjb2xsZWN0b3IvJHthZ2VudH0vaGFyZHdhcmVgLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHsgYXBpSG9zdElEIH0sXG4gICAgICAgICksXG4gICAgICAgIGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICdHRVQnLFxuICAgICAgICAgIGAvc3lzY29sbGVjdG9yLyR7YWdlbnR9L29zYCxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICB7IGFwaUhvc3RJRCB9LFxuICAgICAgICApLFxuICAgICAgXSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGRhdGEubWFwKGl0ZW0gPT4gKGl0ZW0uZGF0YSB8fCB7fSkuZGF0YSB8fCBbXSk7XG4gICAgICBjb25zdCBbaGFyZHdhcmVSZXNwb25zZSwgb3NSZXNwb25zZV0gPSByZXN1bHQ7XG5cbiAgICAgIC8vIEZpbGwgc3lzY29sbGVjdG9yIG9iamVjdFxuICAgICAgY29uc3Qgc3lzY29sbGVjdG9yID0ge1xuICAgICAgICBoYXJkd2FyZTpcbiAgICAgICAgICB0eXBlb2YgaGFyZHdhcmVSZXNwb25zZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyhoYXJkd2FyZVJlc3BvbnNlKS5sZW5ndGhcbiAgICAgICAgICAgID8geyAuLi5oYXJkd2FyZVJlc3BvbnNlLmFmZmVjdGVkX2l0ZW1zWzBdIH1cbiAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG9zOlxuICAgICAgICAgIHR5cGVvZiBvc1Jlc3BvbnNlID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvc1Jlc3BvbnNlKS5sZW5ndGhcbiAgICAgICAgICAgID8geyAuLi5vc1Jlc3BvbnNlLmFmZmVjdGVkX2l0ZW1zWzBdIH1cbiAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiBzeXNjb2xsZWN0b3IsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1hcGk6Z2V0U3lzY29sbGVjdG9yJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgMzAzNSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiB1c2VyIGFzc2lnbmVkIHJvbGVzIGRpc2FibGUgV2F6dWggUGx1Z2luXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEBwYXJhbSByZXF1ZXN0XG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBSZXR1cm5zIHsgaXNXYXp1aERpc2FibGVkOiBib29sZWFuIHBhcnNlZCBpbnRlZ2VyIH1cbiAgICovXG4gIGFzeW5jIGlzV2F6dWhEaXNhYmxlZChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRpc2FibGVkUm9sZXMgPSAoYXdhaXQgZ2V0Q29uZmlndXJhdGlvbigpKVsnZGlzYWJsZWRfcm9sZXMnXSB8fCBbXTtcbiAgICAgIGNvbnN0IGxvZ29TaWRlYmFyID0gKGF3YWl0IGdldENvbmZpZ3VyYXRpb24oKSlbXG4gICAgICAgICdjdXN0b21pemF0aW9uLmxvZ28uc2lkZWJhcidcbiAgICAgIF07XG4gICAgICBjb25zdCBkYXRhID0gKFxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLnNlY3VyaXR5LmdldEN1cnJlbnRVc2VyKHJlcXVlc3QsIGNvbnRleHQpXG4gICAgICApLmF1dGhDb250ZXh0O1xuXG4gICAgICBjb25zdCBpc1dhenVoRGlzYWJsZWQgPSArKGRhdGEucm9sZXMgfHwgW10pLnNvbWUocm9sZSA9PlxuICAgICAgICBkaXNhYmxlZFJvbGVzLmluY2x1ZGVzKHJvbGUpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyBpc1dhenVoRGlzYWJsZWQsIGxvZ29TaWRlYmFyIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1hcGk6aXNXYXp1aERpc2FibGVkJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgMzAzNSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgY3VzdG9tIGxvZ29zIGNvbmZpZ3VyYXRpb24gKHBhdGgpXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEBwYXJhbSByZXF1ZXN0XG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgZ2V0QXBwTG9nb3MoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25maWd1cmF0aW9uID0gZ2V0Q29uZmlndXJhdGlvbigpO1xuICAgICAgY29uc3QgU0lERUJBUl9MT0dPID0gJ2N1c3RvbWl6YXRpb24ubG9nby5zaWRlYmFyJztcbiAgICAgIGNvbnN0IEFQUF9MT0dPID0gJ2N1c3RvbWl6YXRpb24ubG9nby5hcHAnO1xuICAgICAgY29uc3QgSEVBTFRIQ0hFQ0tfTE9HTyA9ICdjdXN0b21pemF0aW9uLmxvZ28uaGVhbHRoY2hlY2snO1xuXG4gICAgICBjb25zdCBsb2dvcyA9IHtcbiAgICAgICAgW1NJREVCQVJfTE9HT106IGdldEN1c3RvbWl6YXRpb25TZXR0aW5nKGNvbmZpZ3VyYXRpb24sIFNJREVCQVJfTE9HTyksXG4gICAgICAgIFtBUFBfTE9HT106IGdldEN1c3RvbWl6YXRpb25TZXR0aW5nKGNvbmZpZ3VyYXRpb24sIEFQUF9MT0dPKSxcbiAgICAgICAgW0hFQUxUSENIRUNLX0xPR09dOiBnZXRDdXN0b21pemF0aW9uU2V0dGluZyhcbiAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgIEhFQUxUSENIRUNLX0xPR08sXG4gICAgICAgICksXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IGxvZ29zIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nKCd3YXp1aC1hcGk6Z2V0QXBwTG9nb3MnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAzMDM1LFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==