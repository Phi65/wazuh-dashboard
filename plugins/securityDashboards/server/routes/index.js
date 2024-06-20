"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineRoutes = defineRoutes;

var _configSchema = require("@osd/config-schema");

var _common = require("../../common");

/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */
// TODO: consider to extract entity CRUD operations and put it into a client class
function defineRoutes(router) {
  const internalUserSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    password: _configSchema.schema.maybe(_configSchema.schema.string()),
    backend_roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    attributes: _configSchema.schema.any({
      defaultValue: {}
    })
  });

  const actionGroupSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    allowed_actions: _configSchema.schema.arrayOf(_configSchema.schema.string()) // type field is not supported in legacy implementation, comment it out for now.
    // type: schema.oneOf([
    //   schema.literal('cluster'),
    //   schema.literal('index'),
    //   schema.literal('opensearch_dashboards'),
    // ]),

  });

  const roleMappingSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    backend_roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    hosts: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    users: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  });

  const roleSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    cluster_permissions: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    tenant_permissions: _configSchema.schema.arrayOf(_configSchema.schema.any(), {
      defaultValue: []
    }),
    index_permissions: _configSchema.schema.arrayOf(_configSchema.schema.any(), {
      defaultValue: []
    })
  });

  const tenantSchema = _configSchema.schema.object({
    description: _configSchema.schema.string()
  });

  const accountSchema = _configSchema.schema.object({
    password: _configSchema.schema.string(),
    current_password: _configSchema.schema.string()
  });

  const schemaMap = {
    internalusers: internalUserSchema,
    actiongroups: actionGroupSchema,
    rolesmapping: roleMappingSchema,
    roles: roleSchema,
    tenants: tenantSchema,
    account: accountSchema
  };

  function validateRequestBody(resourceName, requestBody) {
    const inputSchema = schemaMap[resourceName];

    if (!inputSchema) {
      throw new Error(`Unknown resource ${resourceName}`);
    }

    inputSchema.validate(requestBody); // throws error if validation fail
  }

  function validateEntityId(resourceName) {
    if (!(0, _common.isValidResourceName)(resourceName)) {
      return 'Invalid entity name or id.';
    }
  }
  /**
   * Lists resources by resource name.
   *
   * The response format is:
   * {
   *   "total": <total_entity_count>,
   *   "data": {
   *     "entity_id_1": { <entity_structure> },
   *     "entity_id_2": { <entity_structure> },
   *     ...
   *   }
   * }
   *
   * e.g. when listing internal users, response may look like:
   * {
   *   "total": 2,
   *   "data": {
   *     "api_test_user2": {
   *       "hash": "",
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "attributes": {},
   *       "description": "",
   *       "static": false
   *     },
   *     "api_test_user1": {
   *       "hash": "",
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "attributes": {},
   *       "static": false
   *     }
   * }
   *
   * when listing action groups, response will look like:
   * {
   *   "total": 2,
   *   "data": {
   *     "read": {
   *       "reserved": true,
   *       "hidden": false,
   *       "allowed_actions": ["indices:data/read*", "indices:admin/mappings/fields/get*"],
   *       "type": "index",
   *       "description": "Allow all read operations",
   *       "static": false
   *     },
   *     "cluster_all": {
   *       "reserved": true,
   *       "hidden": false,
   *       "allowed_actions": ["cluster:*"],
   *       "type": "cluster",
   *       "description": "Allow everything on cluster level",
   *       "static": false
   *     }
   * }
   *
   * role:
   * {
   *   "total": 2,
   *   "data": {
   *     "opensearch_dashboards_user": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Provide the minimum permissions for a opensearch_dashboards user",
   *       "cluster_permissions": ["cluster_composite_ops"],
   *       "index_permissions": [{
   *         "index_patterns": [".opensearch_dashboards", ".opensearch_dashboards-6", ".opensearch_dashboards_*"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["read", "delete", "manage", "index"]
   *       }, {
   *         "index_patterns": [".tasks", ".management-beats"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["indices_all"]
   *       }],
   *       "tenant_permissions": [],
   *       "static": false
   *     },
   *     "all_access": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Allow full access to all indices and all cluster APIs",
   *       "cluster_permissions": ["*"],
   *       "index_permissions": [{
   *         "index_patterns": ["*"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["*"]
   *       }],
   *       "tenant_permissions": [{
   *         "tenant_patterns": ["*"],
   *         "allowed_actions": ["opensearch_dashboards_all_write"]
   *       }],
   *       "static": false
   *     }
   *   }
   * }
   *
   * rolesmapping:
   * {
   *   "total": 2,
   *   "data": {
   *     "security_manager": {
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "hosts": [],
   *       "users": ["zengyan", "admin"],
   *       "and_backend_roles": []
   *     },
   *     "all_access": {
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "hosts": [],
   *       "users": ["zengyan", "admin", "indextest"],
   *       "and_backend_roles": []
   *     }
   *   }
   * }
   *
   * tenants:
   * {
   *   "total": 2,
   *   "data": {
   *     "global_tenant": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Global tenant",
   *       "static": false
   *     },
   *     "test tenant": {
   *       "reserved": false,
   *       "hidden": false,
   *       "description": "tenant description",
   *       "static": false
   *     }
   *   }
   * }
   */


  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.listResource', {
        resourceName: request.params.resourceName
      });
      return response.ok({
        body: {
          total: Object.keys(esResp).length,
          data: esResp
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error));
      return errorResponse(response, error);
    }
  });
  /**
   * Gets entity by id.
   *
   * the response format differs from different resource types. e.g.
   *
   * for internal user, response will look like:
   * {
   *   "hash": "",
   *   "reserved": false,
   *   "hidden": false,
   *   "backend_roles": [],
   *   "attributes": {},
   *   "static": false
   * }
   *
   * for role, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Allow full access to all indices and all cluster APIs",
   *   "cluster_permissions": ["*"],
   *   "index_permissions": [{
   *     "index_patterns": ["*"],
   *     "fls": [],
   *     "masked_fields": [],
   *     "allowed_actions": ["*"]
   *   }],
   *   "tenant_permissions": [{
   *     "tenant_patterns": ["*"],
   *     "allowed_actions": ["opensearch_dashboards_all_write"]
   *   }],
   *   "static": false
   * }
   *
   * for roles mapping, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Allow full access to all indices and all cluster APIs",
   *   "cluster_permissions": ["*"],
   *   "index_permissions": [{
   *     "index_patterns": ["*"],
   *     "fls": [],
   *     "masked_fields": [],
   *     "allowed_actions": ["*"]
   *   }],
   *   "tenant_permissions": [{
   *     "tenant_patterns": ["*"],
   *     "allowed_actions": ["opensearch_dashboards_all_write"]
   *   }],
   *   "static": false
   * }
   *
   * for action groups, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "allowed_actions": ["indices:data/read*", "indices:admin/mappings/fields/get*"],
   *   "type": "index",
   *   "description": "Allow all read operations",
   *   "static": false
   * }
   *
   * for tenant, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Global tenant",
   *   "static": false
   * },
   */

  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.getResource', {
        resourceName: request.params.resourceName,
        id: request.params.id
      });
      return response.ok({
        body: esResp[request.params.id]
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Deletes an entity by id.
   */

  router.delete({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string({
          minLength: 1
        })
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.deleteResource', {
        resourceName: request.params.resourceName,
        id: request.params.id
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Update object with out Id. Resource identification is expected to computed from headers. Eg: auth headers
   *
   * Request sample:
   * /configuration/account
   * {
   *   "password": "new-password",
   *   "current_password": "old-password"
   * }
   */

  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string()
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    try {
      validateRequestBody(request.params.resourceName, request.body);
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }

    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveResourceWithoutId', {
        resourceName: request.params.resourceName,
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Update entity by Id.
   */

  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string({
          validate: validateEntityId
        })
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    try {
      validateRequestBody(request.params.resourceName, request.body);
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }

    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveResource', {
        resourceName: request.params.resourceName,
        id: request.params.id,
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Gets authentication info of the user.
   *
   * The response looks like:
   * {
   *   "user": "User [name=admin, roles=[], requestedTenant=__user__]",
   *   "user_name": "admin",
   *   "user_requested_tenant": "__user__",
   *   "remote_address": "127.0.0.1:35044",
   *   "backend_roles": [],
   *   "custom_attribute_names": [],
   *   "roles": ["all_access", "security_manager"],
   *   "tenants": {
   *     "another_tenant": true,
   *     "admin": true,
   *     "global_tenant": true,
   *     "aaaaa": true,
   *     "test tenant": true
   *   },
   *   "principal": null,
   *   "peer_certificates": "0",
   *   "sso_logout_url": null
   * }
   */

  router.get({
    path: `${_common.API_PREFIX}/auth/authinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.authinfo');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  router.get({
    path: `${_common.API_PREFIX}/auth/dashboardsinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.dashboardsinfo');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Gets audit log configuration。
   *
   * Sample payload:
   * {
   *   "enabled":true,
   *   "audit":{
   *     "enable_rest":false,
   *     "disabled_rest_categories":[
   *       "FAILED_LOGIN",
   *       "AUTHENTICATED"
   *     ],
   *     "enable_transport":true,
   *     "disabled_transport_categories":[
   *       "GRANTED_PRIVILEGES"
   *     ],
   *     "resolve_bulk_requests":true,
   *     "log_request_body":false,
   *     "resolve_indices":true,
   *     "exclude_sensitive_headers":true,
   *     "ignore_users":[
   *       "admin",
   *     ],
   *     "ignore_requests":[
   *       "SearchRequest",
   *       "indices:data/read/*"
   *     ]
   *   },
   *   "compliance":{
   *     "enabled":true,
   *     "internal_config":false,
   *     "external_config":false,
   *     "read_metadata_only":false,
   *     "read_watched_fields":{
   *       "indexName1":[
   *         "field1",
   *         "fields-*"
   *       ]
   *     },
   *     "read_ignore_users":[
   *       "opensearchdashboardsserver",
   *       "operator/*"
   *     ],
   *     "write_metadata_only":false,
   *     "write_log_diffs":false,
   *     "write_watched_indices":[
   *       "indexName2",
   *       "indexPatterns-*"
   *     ],
   *     "write_ignore_users":[
   *       "admin"
   *     ]
   *   }
   * }
   */

  router.get({
    path: `${_common.API_PREFIX}/configuration/audit`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.getAudit');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode,
        body: parseEsErrorResponse(error)
      });
    }
  });
  /**
   * Update audit log configuration。
   *
   * Sample payload:
   * {
   *   "enabled":true,
   *   "audit":{
   *     "enable_rest":false,
   *     "disabled_rest_categories":[
   *       "FAILED_LOGIN",
   *       "AUTHENTICATED"
   *     ],
   *     "enable_transport":true,
   *     "disabled_transport_categories":[
   *       "GRANTED_PRIVILEGES"
   *     ],
   *     "resolve_bulk_requests":true,
   *     "log_request_body":false,
   *     "resolve_indices":true,
   *     "exclude_sensitive_headers":true,
   *     "ignore_users":[
   *       "admin",
   *     ],
   *     "ignore_requests":[
   *       "SearchRequest",
   *       "indices:data/read/*"
   *     ]
   *   },
   *   "compliance":{
   *     "enabled":true,
   *     "internal_config":false,
   *     "external_config":false,
   *     "read_metadata_only":false,
   *     "read_watched_fields":{
   *       "indexName1":[
   *         "field1",
   *         "fields-*"
   *       ]
   *     },
   *     "read_ignore_users":[
   *       "kibanaserver",
   *       "operator/*"
   *     ],
   *     "write_metadata_only":false,
   *     "write_log_diffs":false,
   *     "write_watched_indices":[
   *       "indexName2",
   *       "indexPatterns-*"
   *     ],
   *     "write_ignore_users":[
   *       "admin"
   *     ]
   *   }
   * }
   */

  router.post({
    path: `${_common.API_PREFIX}/configuration/audit/config`,
    validate: {
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;

    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveAudit', {
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Deletes cache.
   *
   * Sample response: {"message":"Cache flushed successfully."}
   */

  router.delete({
    path: `${_common.API_PREFIX}/configuration/cache`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResponse;

    try {
      esResponse = await client.callAsCurrentUser('opensearch_security.clearCache');
      return response.ok({
        body: {
          message: esResponse.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Gets permission info of current user.
   *
   * Sample response:
   * {
   *   "user": "User [name=admin, roles=[], requestedTenant=__user__]",
   *   "user_name": "admin",
   *   "has_api_access": true,
   *   "disabled_endpoints": {}
   * }
   */

  router.get({
    path: `${_common.API_PREFIX}/restapiinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);

    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.restapiinfo');
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }
  });
  /**
   * Validates DLS (document level security) query.
   *
   * Request payload is an ES query.
   */

  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/validatedls/{indexName}`,
    validate: {
      params: _configSchema.schema.object({
        // in legacy plugin implmentation, indexName is not used when calling ES API.
        indexName: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);

    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.validateDls', {
        body: request.body
      });
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Gets index mapping.
   *
   * Calling ES _mapping API under the hood. see
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-get-mapping.html
   */

  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/index_mappings`,
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.arrayOf(_configSchema.schema.string())
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);

    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.getIndexMappings', {
        index: request.body.index.join(','),
        ignore_unavailable: true,
        allow_no_indices: true
      });
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  /**
   * Gets all indices, and field mappings.
   *
   * Calls ES API '/_all/_mapping/field/*' under the hood. see
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-get-mapping.html
   */

  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/indices`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);

    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.indices');
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
}

function parseEsErrorResponse(error) {
  if (error.response) {
    try {
      const esErrorResponse = JSON.parse(error.response);
      return esErrorResponse.reason || error.response;
    } catch (parsingError) {
      return error.response;
    }
  }

  return error.message;
}

function errorResponse(response, error) {
  return response.custom({
    statusCode: error.statusCode,
    body: parseEsErrorResponse(error)
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImRlZmluZVJvdXRlcyIsInJvdXRlciIsImludGVybmFsVXNlclNjaGVtYSIsInNjaGVtYSIsIm9iamVjdCIsImRlc2NyaXB0aW9uIiwibWF5YmUiLCJzdHJpbmciLCJwYXNzd29yZCIsImJhY2tlbmRfcm9sZXMiLCJhcnJheU9mIiwiZGVmYXVsdFZhbHVlIiwiYXR0cmlidXRlcyIsImFueSIsImFjdGlvbkdyb3VwU2NoZW1hIiwiYWxsb3dlZF9hY3Rpb25zIiwicm9sZU1hcHBpbmdTY2hlbWEiLCJob3N0cyIsInVzZXJzIiwicm9sZVNjaGVtYSIsImNsdXN0ZXJfcGVybWlzc2lvbnMiLCJ0ZW5hbnRfcGVybWlzc2lvbnMiLCJpbmRleF9wZXJtaXNzaW9ucyIsInRlbmFudFNjaGVtYSIsImFjY291bnRTY2hlbWEiLCJjdXJyZW50X3Bhc3N3b3JkIiwic2NoZW1hTWFwIiwiaW50ZXJuYWx1c2VycyIsImFjdGlvbmdyb3VwcyIsInJvbGVzbWFwcGluZyIsInJvbGVzIiwidGVuYW50cyIsImFjY291bnQiLCJ2YWxpZGF0ZVJlcXVlc3RCb2R5IiwicmVzb3VyY2VOYW1lIiwicmVxdWVzdEJvZHkiLCJpbnB1dFNjaGVtYSIsIkVycm9yIiwidmFsaWRhdGUiLCJ2YWxpZGF0ZUVudGl0eUlkIiwiZ2V0IiwicGF0aCIsIkFQSV9QUkVGSVgiLCJDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVgiLCJwYXJhbXMiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY2xpZW50Iiwic2VjdXJpdHlfcGx1Z2luIiwiZXNDbGllbnQiLCJhc1Njb3BlZCIsImVzUmVzcCIsImNhbGxBc0N1cnJlbnRVc2VyIiwib2siLCJib2R5IiwidG90YWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvclJlc3BvbnNlIiwiaWQiLCJkZWxldGUiLCJtaW5MZW5ndGgiLCJtZXNzYWdlIiwicG9zdCIsImJhZFJlcXVlc3QiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwicGFyc2VFc0Vycm9yUmVzcG9uc2UiLCJlc1Jlc3BvbnNlIiwiaW5kZXhOYW1lIiwiaW5kZXgiLCJqb2luIiwiaWdub3JlX3VuYXZhaWxhYmxlIiwiYWxsb3dfbm9faW5kaWNlcyIsImVzRXJyb3JSZXNwb25zZSIsInBhcnNlIiwicmVhc29uIiwicGFyc2luZ0Vycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBZUE7O0FBT0E7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFXQTtBQUNPLFNBQVNBLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQXVDO0FBQzVDLFFBQU1DLGtCQUFrQixHQUFHQyxxQkFBT0MsTUFBUCxDQUFjO0FBQ3ZDQyxJQUFBQSxXQUFXLEVBQUVGLHFCQUFPRyxLQUFQLENBQWFILHFCQUFPSSxNQUFQLEVBQWIsQ0FEMEI7QUFFdkNDLElBQUFBLFFBQVEsRUFBRUwscUJBQU9HLEtBQVAsQ0FBYUgscUJBQU9JLE1BQVAsRUFBYixDQUY2QjtBQUd2Q0UsSUFBQUEsYUFBYSxFQUFFTixxQkFBT08sT0FBUCxDQUFlUCxxQkFBT0ksTUFBUCxFQUFmLEVBQWdDO0FBQUVJLE1BQUFBLFlBQVksRUFBRTtBQUFoQixLQUFoQyxDQUh3QjtBQUl2Q0MsSUFBQUEsVUFBVSxFQUFFVCxxQkFBT1UsR0FBUCxDQUFXO0FBQUVGLE1BQUFBLFlBQVksRUFBRTtBQUFoQixLQUFYO0FBSjJCLEdBQWQsQ0FBM0I7O0FBT0EsUUFBTUcsaUJBQWlCLEdBQUdYLHFCQUFPQyxNQUFQLENBQWM7QUFDdENDLElBQUFBLFdBQVcsRUFBRUYscUJBQU9HLEtBQVAsQ0FBYUgscUJBQU9JLE1BQVAsRUFBYixDQUR5QjtBQUV0Q1EsSUFBQUEsZUFBZSxFQUFFWixxQkFBT08sT0FBUCxDQUFlUCxxQkFBT0ksTUFBUCxFQUFmLENBRnFCLENBR3RD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LFNBQVNjLG9CQUFULENBQThCZCxLQUE5QixFQUEwQztBQUN4QyxNQUFJQSxLQUFLLENBQUNkLFFBQVYsRUFBb0I7QUFDbEIsUUFBSTtBQUNGLFlBQU1tQyxlQUFlLEdBQUdsQixJQUFJLENBQUNtQixLQUFMLENBQVd0QixLQUFLLENBQUNkLFFBQWpCLENBQXhCO0FBQ0EsYUFBT21DLGVBQWUsQ0FBQ0UsTUFBaEIsSUFBMEJ2QixLQUFLLENBQUNkLFFBQXZDO0FBQ0QsS0FIRCxDQUdFLE9BQU9zQyxZQUFQLEVBQXFCO0FBQ3JCLGFBQU94QixLQUFLLENBQUNkLFFBQWI7QUFDRDtBQUNGOztBQUNELFNBQU9jLEtBQUssQ0FBQ1MsT0FBYjtBQUNEOztBQUVELFNBQVNKLGFBQVQsQ0FBdUJuQixRQUF2QixFQUFzRWMsS0FBdEUsRUFBa0Y7QUFDaEYsU0FBT2QsUUFBUSxDQUFDMEIsTUFBVCxDQUFnQjtBQUNyQkMsSUFBQUEsVUFBVSxFQUFFYixLQUFLLENBQUNhLFVBREc7QUFFckJuQixJQUFBQSxJQUFJLEVBQUVvQixvQkFBb0IsQ0FBQ2QsS0FBRDtBQUZMLEdBQWhCLENBQVA7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7XG4gIElSb3V0ZXIsXG4gIFJlc3BvbnNlRXJyb3IsXG4gIElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlLFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbn0gZnJvbSAnb3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlcic7XG5pbXBvcnQgeyBBUElfUFJFRklYLCBDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVgsIGlzVmFsaWRSZXNvdXJjZU5hbWUgfSBmcm9tICcuLi8uLi9jb21tb24nO1xuXG4vLyBUT0RPOiBjb25zaWRlciB0byBleHRyYWN0IGVudGl0eSBDUlVEIG9wZXJhdGlvbnMgYW5kIHB1dCBpdCBpbnRvIGEgY2xpZW50IGNsYXNzXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lUm91dGVzKHJvdXRlcjogSVJvdXRlcikge1xuICBjb25zdCBpbnRlcm5hbFVzZXJTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgICBkZXNjcmlwdGlvbjogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgcGFzc3dvcmQ6IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgIGJhY2tlbmRfcm9sZXM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIGF0dHJpYnV0ZXM6IHNjaGVtYS5hbnkoeyBkZWZhdWx0VmFsdWU6IHt9IH0pLFxuICB9KTtcblxuICBjb25zdCBhY3Rpb25Hcm91cFNjaGVtYSA9IHNjaGVtYS5vYmplY3Qoe1xuICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBhbGxvd2VkX2FjdGlvbnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgLy8gdHlwZSBmaWVsZCBpcyBub3Qgc3VwcG9ydGVkIGluIGxlZ2FjeSBpbXBsZW1lbnRhdGlvbiwgY29tbWVudCBpdCBvdXQgZm9yIG5vdy5cbiAgICAvLyB0eXBlOiBzY2hlbWEub25lT2YoW1xuICAgIC8vICAgc2NoZW1hLmxpdGVyYWwoJ2NsdXN0ZXInKSxcbiAgICAvLyAgIHNjaGVtYS5saXRlcmFsKCdpbmRleCcpLFxuICAgIC8vICAgc2NoZW1hLmxpdGVyYWwoJ29wZW5zZWFyY2hfZGFzaGJvYXJkcycpLFxuICAgIC8vIF0pLFxuICB9KTtcblxuICBjb25zdCByb2xlTWFwcGluZ1NjaGVtYSA9IHNjaGVtYS5vYmplY3Qoe1xuICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBiYWNrZW5kX3JvbGVzOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgICBob3N0czogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgdXNlcnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KTtcblxuICBjb25zdCByb2xlU2NoZW1hID0gc2NoZW1hLm9iamVjdCh7XG4gICAgZGVzY3JpcHRpb246IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgIGNsdXN0ZXJfcGVybWlzc2lvbnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIHRlbmFudF9wZXJtaXNzaW9uczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLmFueSgpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgaW5kZXhfcGVybWlzc2lvbnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5hbnkoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KTtcblxuICBjb25zdCB0ZW5hbnRTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgICBkZXNjcmlwdGlvbjogc2NoZW1hLnN0cmluZygpLFxuICB9KTtcblxuICBjb25zdCBhY2NvdW50U2NoZW1hID0gc2NoZW1hLm9iamVjdCh7XG4gICAgcGFzc3dvcmQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICBjdXJyZW50X3Bhc3N3b3JkOiBzY2hlbWEuc3RyaW5nKCksXG4gIH0pO1xuXG4gIGNvbnN0IHNjaGVtYU1hcDogYW55ID0ge1xuICAgIGludGVybmFsdXNlcnM6IGludGVybmFsVXNlclNjaGVtYSxcbiAgICBhY3Rpb25ncm91cHM6IGFjdGlvbkdyb3VwU2NoZW1hLFxuICAgIHJvbGVzbWFwcGluZzogcm9sZU1hcHBpbmdTY2hlbWEsXG4gICAgcm9sZXM6IHJvbGVTY2hlbWEsXG4gICAgdGVuYW50czogdGVuYW50U2NoZW1hLFxuICAgIGFjY291bnQ6IGFjY291bnRTY2hlbWEsXG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVSZXF1ZXN0Qm9keShyZXNvdXJjZU5hbWU6IHN0cmluZywgcmVxdWVzdEJvZHk6IGFueSk6IGFueSB7XG4gICAgY29uc3QgaW5wdXRTY2hlbWEgPSBzY2hlbWFNYXBbcmVzb3VyY2VOYW1lXTtcbiAgICBpZiAoIWlucHV0U2NoZW1hKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzb3VyY2UgJHtyZXNvdXJjZU5hbWV9YCk7XG4gICAgfVxuICAgIGlucHV0U2NoZW1hLnZhbGlkYXRlKHJlcXVlc3RCb2R5KTsgLy8gdGhyb3dzIGVycm9yIGlmIHZhbGlkYXRpb24gZmFpbFxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFbnRpdHlJZChyZXNvdXJjZU5hbWU6IHN0cmluZykge1xuICAgIGlmICghaXNWYWxpZFJlc291cmNlTmFtZShyZXNvdXJjZU5hbWUpKSB7XG4gICAgICByZXR1cm4gJ0ludmFsaWQgZW50aXR5IG5hbWUgb3IgaWQuJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgcmVzb3VyY2VzIGJ5IHJlc291cmNlIG5hbWUuXG4gICAqXG4gICAqIFRoZSByZXNwb25zZSBmb3JtYXQgaXM6XG4gICAqIHtcbiAgICogICBcInRvdGFsXCI6IDx0b3RhbF9lbnRpdHlfY291bnQ+LFxuICAgKiAgIFwiZGF0YVwiOiB7XG4gICAqICAgICBcImVudGl0eV9pZF8xXCI6IHsgPGVudGl0eV9zdHJ1Y3R1cmU+IH0sXG4gICAqICAgICBcImVudGl0eV9pZF8yXCI6IHsgPGVudGl0eV9zdHJ1Y3R1cmU+IH0sXG4gICAqICAgICAuLi5cbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogZS5nLiB3aGVuIGxpc3RpbmcgaW50ZXJuYWwgdXNlcnMsIHJlc3BvbnNlIG1heSBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcInRvdGFsXCI6IDIsXG4gICAqICAgXCJkYXRhXCI6IHtcbiAgICogICAgIFwiYXBpX3Rlc3RfdXNlcjJcIjoge1xuICAgKiAgICAgICBcImhhc2hcIjogXCJcIixcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiBmYWxzZSxcbiAgICogICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgICAgIFwiYmFja2VuZF9yb2xlc1wiOiBbXSxcbiAgICogICAgICAgXCJhdHRyaWJ1dGVzXCI6IHt9LFxuICAgKiAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiXCIsXG4gICAqICAgICAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqICAgICB9LFxuICAgKiAgICAgXCJhcGlfdGVzdF91c2VyMVwiOiB7XG4gICAqICAgICAgIFwiaGFzaFwiOiBcIlwiLFxuICAgKiAgICAgICBcInJlc2VydmVkXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJiYWNrZW5kX3JvbGVzXCI6IFtdLFxuICAgKiAgICAgICBcImF0dHJpYnV0ZXNcIjoge30sXG4gICAqICAgICAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqICAgICB9XG4gICAqIH1cbiAgICpcbiAgICogd2hlbiBsaXN0aW5nIGFjdGlvbiBncm91cHMsIHJlc3BvbnNlIHdpbGwgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJ0b3RhbFwiOiAyLFxuICAgKiAgIFwiZGF0YVwiOiB7XG4gICAqICAgICBcInJlYWRcIjoge1xuICAgKiAgICAgICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJpbmRpY2VzOmRhdGEvcmVhZCpcIiwgXCJpbmRpY2VzOmFkbWluL21hcHBpbmdzL2ZpZWxkcy9nZXQqXCJdLFxuICAgKiAgICAgICBcInR5cGVcIjogXCJpbmRleFwiLFxuICAgKiAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQWxsb3cgYWxsIHJlYWQgb3BlcmF0aW9uc1wiLFxuICAgKiAgICAgICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiAgICAgfSxcbiAgICogICAgIFwiY2x1c3Rlcl9hbGxcIjoge1xuICAgKiAgICAgICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJjbHVzdGVyOipcIl0sXG4gICAqICAgICAgIFwidHlwZVwiOiBcImNsdXN0ZXJcIixcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkFsbG93IGV2ZXJ5dGhpbmcgb24gY2x1c3RlciBsZXZlbFwiLFxuICAgKiAgICAgICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiAgICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHJvbGU6XG4gICAqIHtcbiAgICogICBcInRvdGFsXCI6IDIsXG4gICAqICAgXCJkYXRhXCI6IHtcbiAgICogICAgIFwib3BlbnNlYXJjaF9kYXNoYm9hcmRzX3VzZXJcIjoge1xuICAgKiAgICAgICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiUHJvdmlkZSB0aGUgbWluaW11bSBwZXJtaXNzaW9ucyBmb3IgYSBvcGVuc2VhcmNoX2Rhc2hib2FyZHMgdXNlclwiLFxuICAgKiAgICAgICBcImNsdXN0ZXJfcGVybWlzc2lvbnNcIjogW1wiY2x1c3Rlcl9jb21wb3NpdGVfb3BzXCJdLFxuICAgKiAgICAgICBcImluZGV4X3Blcm1pc3Npb25zXCI6IFt7XG4gICAqICAgICAgICAgXCJpbmRleF9wYXR0ZXJuc1wiOiBbXCIub3BlbnNlYXJjaF9kYXNoYm9hcmRzXCIsIFwiLm9wZW5zZWFyY2hfZGFzaGJvYXJkcy02XCIsIFwiLm9wZW5zZWFyY2hfZGFzaGJvYXJkc18qXCJdLFxuICAgKiAgICAgICAgIFwiZmxzXCI6IFtdLFxuICAgKiAgICAgICAgIFwibWFza2VkX2ZpZWxkc1wiOiBbXSxcbiAgICogICAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJyZWFkXCIsIFwiZGVsZXRlXCIsIFwibWFuYWdlXCIsIFwiaW5kZXhcIl1cbiAgICogICAgICAgfSwge1xuICAgKiAgICAgICAgIFwiaW5kZXhfcGF0dGVybnNcIjogW1wiLnRhc2tzXCIsIFwiLm1hbmFnZW1lbnQtYmVhdHNcIl0sXG4gICAqICAgICAgICAgXCJmbHNcIjogW10sXG4gICAqICAgICAgICAgXCJtYXNrZWRfZmllbGRzXCI6IFtdLFxuICAgKiAgICAgICAgIFwiYWxsb3dlZF9hY3Rpb25zXCI6IFtcImluZGljZXNfYWxsXCJdXG4gICAqICAgICAgIH1dLFxuICAgKiAgICAgICBcInRlbmFudF9wZXJtaXNzaW9uc1wiOiBbXSxcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH0sXG4gICAqICAgICBcImFsbF9hY2Nlc3NcIjoge1xuICAgKiAgICAgICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQWxsb3cgZnVsbCBhY2Nlc3MgdG8gYWxsIGluZGljZXMgYW5kIGFsbCBjbHVzdGVyIEFQSXNcIixcbiAgICogICAgICAgXCJjbHVzdGVyX3Blcm1pc3Npb25zXCI6IFtcIipcIl0sXG4gICAqICAgICAgIFwiaW5kZXhfcGVybWlzc2lvbnNcIjogW3tcbiAgICogICAgICAgICBcImluZGV4X3BhdHRlcm5zXCI6IFtcIipcIl0sXG4gICAqICAgICAgICAgXCJmbHNcIjogW10sXG4gICAqICAgICAgICAgXCJtYXNrZWRfZmllbGRzXCI6IFtdLFxuICAgKiAgICAgICAgIFwiYWxsb3dlZF9hY3Rpb25zXCI6IFtcIipcIl1cbiAgICogICAgICAgfV0sXG4gICAqICAgICAgIFwidGVuYW50X3Blcm1pc3Npb25zXCI6IFt7XG4gICAqICAgICAgICAgXCJ0ZW5hbnRfcGF0dGVybnNcIjogW1wiKlwiXSxcbiAgICogICAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJvcGVuc2VhcmNoX2Rhc2hib2FyZHNfYWxsX3dyaXRlXCJdXG4gICAqICAgICAgIH1dLFxuICAgKiAgICAgICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiAgICAgfVxuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiByb2xlc21hcHBpbmc6XG4gICAqIHtcbiAgICogICBcInRvdGFsXCI6IDIsXG4gICAqICAgXCJkYXRhXCI6IHtcbiAgICogICAgIFwic2VjdXJpdHlfbWFuYWdlclwiOiB7XG4gICAqICAgICAgIFwicmVzZXJ2ZWRcIjogZmFsc2UsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImJhY2tlbmRfcm9sZXNcIjogW10sXG4gICAqICAgICAgIFwiaG9zdHNcIjogW10sXG4gICAqICAgICAgIFwidXNlcnNcIjogW1wiemVuZ3lhblwiLCBcImFkbWluXCJdLFxuICAgKiAgICAgICBcImFuZF9iYWNrZW5kX3JvbGVzXCI6IFtdXG4gICAqICAgICB9LFxuICAgKiAgICAgXCJhbGxfYWNjZXNzXCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiBmYWxzZSxcbiAgICogICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgICAgIFwiYmFja2VuZF9yb2xlc1wiOiBbXSxcbiAgICogICAgICAgXCJob3N0c1wiOiBbXSxcbiAgICogICAgICAgXCJ1c2Vyc1wiOiBbXCJ6ZW5neWFuXCIsIFwiYWRtaW5cIiwgXCJpbmRleHRlc3RcIl0sXG4gICAqICAgICAgIFwiYW5kX2JhY2tlbmRfcm9sZXNcIjogW11cbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogdGVuYW50czpcbiAgICoge1xuICAgKiAgIFwidG90YWxcIjogMixcbiAgICogICBcImRhdGFcIjoge1xuICAgKiAgICAgXCJnbG9iYWxfdGVuYW50XCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkdsb2JhbCB0ZW5hbnRcIixcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH0sXG4gICAqICAgICBcInRlc3QgdGVuYW50XCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiBmYWxzZSxcbiAgICogICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ0ZW5hbnQgZGVzY3JpcHRpb25cIixcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIH1cbiAgICovXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vJHtDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVh9L3tyZXNvdXJjZU5hbWV9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkubGlzdFJlc291cmNlJywge1xuICAgICAgICAgIHJlc291cmNlTmFtZTogcmVxdWVzdC5wYXJhbXMucmVzb3VyY2VOYW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICB0b3RhbDogT2JqZWN0LmtleXMoZXNSZXNwKS5sZW5ndGgsXG4gICAgICAgICAgICBkYXRhOiBlc1Jlc3AsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogR2V0cyBlbnRpdHkgYnkgaWQuXG4gICAqXG4gICAqIHRoZSByZXNwb25zZSBmb3JtYXQgZGlmZmVycyBmcm9tIGRpZmZlcmVudCByZXNvdXJjZSB0eXBlcy4gZS5nLlxuICAgKlxuICAgKiBmb3IgaW50ZXJuYWwgdXNlciwgcmVzcG9uc2Ugd2lsbCBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcImhhc2hcIjogXCJcIixcbiAgICogICBcInJlc2VydmVkXCI6IGZhbHNlLFxuICAgKiAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgIFwiYmFja2VuZF9yb2xlc1wiOiBbXSxcbiAgICogICBcImF0dHJpYnV0ZXNcIjoge30sXG4gICAqICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogfVxuICAgKlxuICAgKiBmb3Igcm9sZSwgcmVzcG9uc2Ugd2lsbCBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgXCJkZXNjcmlwdGlvblwiOiBcIkFsbG93IGZ1bGwgYWNjZXNzIHRvIGFsbCBpbmRpY2VzIGFuZCBhbGwgY2x1c3RlciBBUElzXCIsXG4gICAqICAgXCJjbHVzdGVyX3Blcm1pc3Npb25zXCI6IFtcIipcIl0sXG4gICAqICAgXCJpbmRleF9wZXJtaXNzaW9uc1wiOiBbe1xuICAgKiAgICAgXCJpbmRleF9wYXR0ZXJuc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgXCJmbHNcIjogW10sXG4gICAqICAgICBcIm1hc2tlZF9maWVsZHNcIjogW10sXG4gICAqICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCIqXCJdXG4gICAqICAgfV0sXG4gICAqICAgXCJ0ZW5hbnRfcGVybWlzc2lvbnNcIjogW3tcbiAgICogICAgIFwidGVuYW50X3BhdHRlcm5zXCI6IFtcIipcIl0sXG4gICAqICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJvcGVuc2VhcmNoX2Rhc2hib2FyZHNfYWxsX3dyaXRlXCJdXG4gICAqICAgfV0sXG4gICAqICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogfVxuICAgKlxuICAgKiBmb3Igcm9sZXMgbWFwcGluZywgcmVzcG9uc2Ugd2lsbCBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgXCJkZXNjcmlwdGlvblwiOiBcIkFsbG93IGZ1bGwgYWNjZXNzIHRvIGFsbCBpbmRpY2VzIGFuZCBhbGwgY2x1c3RlciBBUElzXCIsXG4gICAqICAgXCJjbHVzdGVyX3Blcm1pc3Npb25zXCI6IFtcIipcIl0sXG4gICAqICAgXCJpbmRleF9wZXJtaXNzaW9uc1wiOiBbe1xuICAgKiAgICAgXCJpbmRleF9wYXR0ZXJuc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgXCJmbHNcIjogW10sXG4gICAqICAgICBcIm1hc2tlZF9maWVsZHNcIjogW10sXG4gICAqICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCIqXCJdXG4gICAqICAgfV0sXG4gICAqICAgXCJ0ZW5hbnRfcGVybWlzc2lvbnNcIjogW3tcbiAgICogICAgIFwidGVuYW50X3BhdHRlcm5zXCI6IFtcIipcIl0sXG4gICAqICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJvcGVuc2VhcmNoX2Rhc2hib2FyZHNfYWxsX3dyaXRlXCJdXG4gICAqICAgfV0sXG4gICAqICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogfVxuICAgKlxuICAgKiBmb3IgYWN0aW9uIGdyb3VwcywgcmVzcG9uc2Ugd2lsbCBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wiaW5kaWNlczpkYXRhL3JlYWQqXCIsIFwiaW5kaWNlczphZG1pbi9tYXBwaW5ncy9maWVsZHMvZ2V0KlwiXSxcbiAgICogICBcInR5cGVcIjogXCJpbmRleFwiLFxuICAgKiAgIFwiZGVzY3JpcHRpb25cIjogXCJBbGxvdyBhbGwgcmVhZCBvcGVyYXRpb25zXCIsXG4gICAqICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogfVxuICAgKlxuICAgKiBmb3IgdGVuYW50LCByZXNwb25zZSB3aWxsIGxvb2sgbGlrZTpcbiAgICoge1xuICAgKiAgIFwicmVzZXJ2ZWRcIjogdHJ1ZSxcbiAgICogICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICBcImRlc2NyaXB0aW9uXCI6IFwiR2xvYmFsIHRlbmFudFwiLFxuICAgKiAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqIH0sXG4gICAqL1xuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9LyR7Q09ORklHVVJBVElPTl9BUElfUFJFRklYfS97cmVzb3VyY2VOYW1lfS97aWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgaWQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8YW55IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5nZXRSZXNvdXJjZScsIHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSxcbiAgICAgICAgICBpZDogcmVxdWVzdC5wYXJhbXMuaWQsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soeyBib2R5OiBlc1Jlc3BbcmVxdWVzdC5wYXJhbXMuaWRdIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gZW50aXR5IGJ5IGlkLlxuICAgKi9cbiAgcm91dGVyLmRlbGV0ZShcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0ve3Jlc291cmNlTmFtZX0ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIHJlc291cmNlTmFtZTogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8YW55IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5kZWxldGVSZXNvdXJjZScsIHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSxcbiAgICAgICAgICBpZDogcmVxdWVzdC5wYXJhbXMuaWQsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVzUmVzcC5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBvYmplY3Qgd2l0aCBvdXQgSWQuIFJlc291cmNlIGlkZW50aWZpY2F0aW9uIGlzIGV4cGVjdGVkIHRvIGNvbXB1dGVkIGZyb20gaGVhZGVycy4gRWc6IGF1dGggaGVhZGVyc1xuICAgKlxuICAgKiBSZXF1ZXN0IHNhbXBsZTpcbiAgICogL2NvbmZpZ3VyYXRpb24vYWNjb3VudFxuICAgKiB7XG4gICAqICAgXCJwYXNzd29yZFwiOiBcIm5ldy1wYXNzd29yZFwiLFxuICAgKiAgIFwiY3VycmVudF9wYXNzd29yZFwiOiBcIm9sZC1wYXNzd29yZFwiXG4gICAqIH1cbiAgICovXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9LyR7Q09ORklHVVJBVElPTl9BUElfUFJFRklYfS97cmVzb3VyY2VOYW1lfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIHJlc291cmNlTmFtZTogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICB9KSxcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWxpZGF0ZVJlcXVlc3RCb2R5KHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSwgcmVxdWVzdC5ib2R5KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KHsgYm9keTogZXJyb3IgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuc2F2ZVJlc291cmNlV2l0aG91dElkJywge1xuICAgICAgICAgIHJlc291cmNlTmFtZTogcmVxdWVzdC5wYXJhbXMucmVzb3VyY2VOYW1lLFxuICAgICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgbWVzc2FnZTogZXNSZXNwLm1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogVXBkYXRlIGVudGl0eSBieSBJZC5cbiAgICovXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9LyR7Q09ORklHVVJBVElPTl9BUElfUFJFRklYfS97cmVzb3VyY2VOYW1lfS97aWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgaWQ6IHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgICAgdmFsaWRhdGU6IHZhbGlkYXRlRW50aXR5SWQsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgICBib2R5OiBzY2hlbWEuYW55KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8YW55IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbGlkYXRlUmVxdWVzdEJvZHkocmVxdWVzdC5wYXJhbXMucmVzb3VyY2VOYW1lLCByZXF1ZXN0LmJvZHkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJhZFJlcXVlc3QoeyBib2R5OiBlcnJvciB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5zYXZlUmVzb3VyY2UnLCB7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiByZXF1ZXN0LnBhcmFtcy5yZXNvdXJjZU5hbWUsXG4gICAgICAgICAgaWQ6IHJlcXVlc3QucGFyYW1zLmlkLFxuICAgICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgbWVzc2FnZTogZXNSZXNwLm1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogR2V0cyBhdXRoZW50aWNhdGlvbiBpbmZvIG9mIHRoZSB1c2VyLlxuICAgKlxuICAgKiBUaGUgcmVzcG9uc2UgbG9va3MgbGlrZTpcbiAgICoge1xuICAgKiAgIFwidXNlclwiOiBcIlVzZXIgW25hbWU9YWRtaW4sIHJvbGVzPVtdLCByZXF1ZXN0ZWRUZW5hbnQ9X191c2VyX19dXCIsXG4gICAqICAgXCJ1c2VyX25hbWVcIjogXCJhZG1pblwiLFxuICAgKiAgIFwidXNlcl9yZXF1ZXN0ZWRfdGVuYW50XCI6IFwiX191c2VyX19cIixcbiAgICogICBcInJlbW90ZV9hZGRyZXNzXCI6IFwiMTI3LjAuMC4xOjM1MDQ0XCIsXG4gICAqICAgXCJiYWNrZW5kX3JvbGVzXCI6IFtdLFxuICAgKiAgIFwiY3VzdG9tX2F0dHJpYnV0ZV9uYW1lc1wiOiBbXSxcbiAgICogICBcInJvbGVzXCI6IFtcImFsbF9hY2Nlc3NcIiwgXCJzZWN1cml0eV9tYW5hZ2VyXCJdLFxuICAgKiAgIFwidGVuYW50c1wiOiB7XG4gICAqICAgICBcImFub3RoZXJfdGVuYW50XCI6IHRydWUsXG4gICAqICAgICBcImFkbWluXCI6IHRydWUsXG4gICAqICAgICBcImdsb2JhbF90ZW5hbnRcIjogdHJ1ZSxcbiAgICogICAgIFwiYWFhYWFcIjogdHJ1ZSxcbiAgICogICAgIFwidGVzdCB0ZW5hbnRcIjogdHJ1ZVxuICAgKiAgIH0sXG4gICAqICAgXCJwcmluY2lwYWxcIjogbnVsbCxcbiAgICogICBcInBlZXJfY2VydGlmaWNhdGVzXCI6IFwiMFwiLFxuICAgKiAgIFwic3NvX2xvZ291dF91cmxcIjogbnVsbFxuICAgKiB9XG4gICAqL1xuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9L2F1dGgvYXV0aGluZm9gLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8YW55IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5hdXRoaW5mbycpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vYXV0aC9kYXNoYm9hcmRzaW5mb2AsXG4gICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0LFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxhbnkgfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgZXNSZXNwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXNSZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmRhc2hib2FyZHNpbmZvJyk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiBlc1Jlc3AsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgYXVkaXQgbG9nIGNvbmZpZ3VyYXRpb27jgIJcbiAgICpcbiAgICogU2FtcGxlIHBheWxvYWQ6XG4gICAqIHtcbiAgICogICBcImVuYWJsZWRcIjp0cnVlLFxuICAgKiAgIFwiYXVkaXRcIjp7XG4gICAqICAgICBcImVuYWJsZV9yZXN0XCI6ZmFsc2UsXG4gICAqICAgICBcImRpc2FibGVkX3Jlc3RfY2F0ZWdvcmllc1wiOltcbiAgICogICAgICAgXCJGQUlMRURfTE9HSU5cIixcbiAgICogICAgICAgXCJBVVRIRU5USUNBVEVEXCJcbiAgICogICAgIF0sXG4gICAqICAgICBcImVuYWJsZV90cmFuc3BvcnRcIjp0cnVlLFxuICAgKiAgICAgXCJkaXNhYmxlZF90cmFuc3BvcnRfY2F0ZWdvcmllc1wiOltcbiAgICogICAgICAgXCJHUkFOVEVEX1BSSVZJTEVHRVNcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwicmVzb2x2ZV9idWxrX3JlcXVlc3RzXCI6dHJ1ZSxcbiAgICogICAgIFwibG9nX3JlcXVlc3RfYm9keVwiOmZhbHNlLFxuICAgKiAgICAgXCJyZXNvbHZlX2luZGljZXNcIjp0cnVlLFxuICAgKiAgICAgXCJleGNsdWRlX3NlbnNpdGl2ZV9oZWFkZXJzXCI6dHJ1ZSxcbiAgICogICAgIFwiaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcImFkbWluXCIsXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJpZ25vcmVfcmVxdWVzdHNcIjpbXG4gICAqICAgICAgIFwiU2VhcmNoUmVxdWVzdFwiLFxuICAgKiAgICAgICBcImluZGljZXM6ZGF0YS9yZWFkLypcIlxuICAgKiAgICAgXVxuICAgKiAgIH0sXG4gICAqICAgXCJjb21wbGlhbmNlXCI6e1xuICAgKiAgICAgXCJlbmFibGVkXCI6dHJ1ZSxcbiAgICogICAgIFwiaW50ZXJuYWxfY29uZmlnXCI6ZmFsc2UsXG4gICAqICAgICBcImV4dGVybmFsX2NvbmZpZ1wiOmZhbHNlLFxuICAgKiAgICAgXCJyZWFkX21ldGFkYXRhX29ubHlcIjpmYWxzZSxcbiAgICogICAgIFwicmVhZF93YXRjaGVkX2ZpZWxkc1wiOntcbiAgICogICAgICAgXCJpbmRleE5hbWUxXCI6W1xuICAgKiAgICAgICAgIFwiZmllbGQxXCIsXG4gICAqICAgICAgICAgXCJmaWVsZHMtKlwiXG4gICAqICAgICAgIF1cbiAgICogICAgIH0sXG4gICAqICAgICBcInJlYWRfaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcIm9wZW5zZWFyY2hkYXNoYm9hcmRzc2VydmVyXCIsXG4gICAqICAgICAgIFwib3BlcmF0b3IvKlwiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJ3cml0ZV9tZXRhZGF0YV9vbmx5XCI6ZmFsc2UsXG4gICAqICAgICBcIndyaXRlX2xvZ19kaWZmc1wiOmZhbHNlLFxuICAgKiAgICAgXCJ3cml0ZV93YXRjaGVkX2luZGljZXNcIjpbXG4gICAqICAgICAgIFwiaW5kZXhOYW1lMlwiLFxuICAgKiAgICAgICBcImluZGV4UGF0dGVybnMtKlwiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJ3cml0ZV9pZ25vcmVfdXNlcnNcIjpbXG4gICAqICAgICAgIFwiYWRtaW5cIlxuICAgKiAgICAgXVxuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS9jb25maWd1cmF0aW9uL2F1ZGl0YCxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcblxuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5nZXRBdWRpdCcpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1c0NvZGUsXG4gICAgICAgICAgYm9keTogcGFyc2VFc0Vycm9yUmVzcG9uc2UoZXJyb3IpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdWRpdCBsb2cgY29uZmlndXJhdGlvbuOAglxuICAgKlxuICAgKiBTYW1wbGUgcGF5bG9hZDpcbiAgICoge1xuICAgKiAgIFwiZW5hYmxlZFwiOnRydWUsXG4gICAqICAgXCJhdWRpdFwiOntcbiAgICogICAgIFwiZW5hYmxlX3Jlc3RcIjpmYWxzZSxcbiAgICogICAgIFwiZGlzYWJsZWRfcmVzdF9jYXRlZ29yaWVzXCI6W1xuICAgKiAgICAgICBcIkZBSUxFRF9MT0dJTlwiLFxuICAgKiAgICAgICBcIkFVVEhFTlRJQ0FURURcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwiZW5hYmxlX3RyYW5zcG9ydFwiOnRydWUsXG4gICAqICAgICBcImRpc2FibGVkX3RyYW5zcG9ydF9jYXRlZ29yaWVzXCI6W1xuICAgKiAgICAgICBcIkdSQU5URURfUFJJVklMRUdFU1wiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJyZXNvbHZlX2J1bGtfcmVxdWVzdHNcIjp0cnVlLFxuICAgKiAgICAgXCJsb2dfcmVxdWVzdF9ib2R5XCI6ZmFsc2UsXG4gICAqICAgICBcInJlc29sdmVfaW5kaWNlc1wiOnRydWUsXG4gICAqICAgICBcImV4Y2x1ZGVfc2Vuc2l0aXZlX2hlYWRlcnNcIjp0cnVlLFxuICAgKiAgICAgXCJpZ25vcmVfdXNlcnNcIjpbXG4gICAqICAgICAgIFwiYWRtaW5cIixcbiAgICogICAgIF0sXG4gICAqICAgICBcImlnbm9yZV9yZXF1ZXN0c1wiOltcbiAgICogICAgICAgXCJTZWFyY2hSZXF1ZXN0XCIsXG4gICAqICAgICAgIFwiaW5kaWNlczpkYXRhL3JlYWQvKlwiXG4gICAqICAgICBdXG4gICAqICAgfSxcbiAgICogICBcImNvbXBsaWFuY2VcIjp7XG4gICAqICAgICBcImVuYWJsZWRcIjp0cnVlLFxuICAgKiAgICAgXCJpbnRlcm5hbF9jb25maWdcIjpmYWxzZSxcbiAgICogICAgIFwiZXh0ZXJuYWxfY29uZmlnXCI6ZmFsc2UsXG4gICAqICAgICBcInJlYWRfbWV0YWRhdGFfb25seVwiOmZhbHNlLFxuICAgKiAgICAgXCJyZWFkX3dhdGNoZWRfZmllbGRzXCI6e1xuICAgKiAgICAgICBcImluZGV4TmFtZTFcIjpbXG4gICAqICAgICAgICAgXCJmaWVsZDFcIixcbiAgICogICAgICAgICBcImZpZWxkcy0qXCJcbiAgICogICAgICAgXVxuICAgKiAgICAgfSxcbiAgICogICAgIFwicmVhZF9pZ25vcmVfdXNlcnNcIjpbXG4gICAqICAgICAgIFwia2liYW5hc2VydmVyXCIsXG4gICAqICAgICAgIFwib3BlcmF0b3IvKlwiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJ3cml0ZV9tZXRhZGF0YV9vbmx5XCI6ZmFsc2UsXG4gICAqICAgICBcIndyaXRlX2xvZ19kaWZmc1wiOmZhbHNlLFxuICAgKiAgICAgXCJ3cml0ZV93YXRjaGVkX2luZGljZXNcIjpbXG4gICAqICAgICAgIFwiaW5kZXhOYW1lMlwiLFxuICAgKiAgICAgICBcImluZGV4UGF0dGVybnMtKlwiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJ3cml0ZV9pZ25vcmVfdXNlcnNcIjpbXG4gICAqICAgICAgIFwiYWRtaW5cIlxuICAgKiAgICAgXVxuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgcm91dGVyLnBvc3QoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vY29uZmlndXJhdGlvbi9hdWRpdC9jb25maWdgLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgZXNSZXNwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXNSZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LnNhdmVBdWRpdCcsIHtcbiAgICAgICAgICBib2R5OiByZXF1ZXN0LmJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVzUmVzcC5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgY2FjaGUuXG4gICAqXG4gICAqIFNhbXBsZSByZXNwb25zZToge1wibWVzc2FnZVwiOlwiQ2FjaGUgZmx1c2hlZCBzdWNjZXNzZnVsbHkuXCJ9XG4gICAqL1xuICByb3V0ZXIuZGVsZXRlKFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9L2NvbmZpZ3VyYXRpb24vY2FjaGVgLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXNSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5jbGVhckNhY2hlJyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgbWVzc2FnZTogZXNSZXNwb25zZS5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgcGVybWlzc2lvbiBpbmZvIG9mIGN1cnJlbnQgdXNlci5cbiAgICpcbiAgICogU2FtcGxlIHJlc3BvbnNlOlxuICAgKiB7XG4gICAqICAgXCJ1c2VyXCI6IFwiVXNlciBbbmFtZT1hZG1pbiwgcm9sZXM9W10sIHJlcXVlc3RlZFRlbmFudD1fX3VzZXJfX11cIixcbiAgICogICBcInVzZXJfbmFtZVwiOiBcImFkbWluXCIsXG4gICAqICAgXCJoYXNfYXBpX2FjY2Vzc1wiOiB0cnVlLFxuICAgKiAgIFwiZGlzYWJsZWRfZW5kcG9pbnRzXCI6IHt9XG4gICAqIH1cbiAgICovXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vcmVzdGFwaWluZm9gLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkucmVzdGFwaWluZm8nKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiBlc1Jlc3BvbnNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KHtcbiAgICAgICAgICBib2R5OiBlcnJvcixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgRExTIChkb2N1bWVudCBsZXZlbCBzZWN1cml0eSkgcXVlcnkuXG4gICAqXG4gICAqIFJlcXVlc3QgcGF5bG9hZCBpcyBhbiBFUyBxdWVyeS5cbiAgICovXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9LyR7Q09ORklHVVJBVElPTl9BUElfUFJFRklYfS92YWxpZGF0ZWRscy97aW5kZXhOYW1lfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIC8vIGluIGxlZ2FjeSBwbHVnaW4gaW1wbG1lbnRhdGlvbiwgaW5kZXhOYW1lIGlzIG5vdCB1c2VkIHdoZW4gY2FsbGluZyBFUyBBUEkuXG4gICAgICAgICAgaW5kZXhOYW1lOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgICAgfSksXG4gICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXNSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS52YWxpZGF0ZURscycsIHtcbiAgICAgICAgICBib2R5OiByZXF1ZXN0LmJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IGVzUmVzcG9uc2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgaW5kZXggbWFwcGluZy5cbiAgICpcbiAgICogQ2FsbGluZyBFUyBfbWFwcGluZyBBUEkgdW5kZXIgdGhlIGhvb2QuIHNlZVxuICAgKiBodHRwczovL3d3dy5lbGFzdGljLmNvL2d1aWRlL2VuL2VsYXN0aWNzZWFyY2gvcmVmZXJlbmNlL2N1cnJlbnQvaW5kaWNlcy1nZXQtbWFwcGluZy5odG1sXG4gICAqL1xuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0vaW5kZXhfbWFwcGluZ3NgLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgaW5kZXg6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBlc1Jlc3BvbnNlID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmdldEluZGV4TWFwcGluZ3MnLCB7XG4gICAgICAgICAgaW5kZXg6IHJlcXVlc3QuYm9keS5pbmRleC5qb2luKCcsJyksXG4gICAgICAgICAgaWdub3JlX3VuYXZhaWxhYmxlOiB0cnVlLFxuICAgICAgICAgIGFsbG93X25vX2luZGljZXM6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwb25zZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogR2V0cyBhbGwgaW5kaWNlcywgYW5kIGZpZWxkIG1hcHBpbmdzLlxuICAgKlxuICAgKiBDYWxscyBFUyBBUEkgJy9fYWxsL19tYXBwaW5nL2ZpZWxkLyonIHVuZGVyIHRoZSBob29kLiBzZWVcbiAgICogaHR0cHM6Ly93d3cuZWxhc3RpYy5jby9ndWlkZS9lbi9lbGFzdGljc2VhcmNoL3JlZmVyZW5jZS9jdXJyZW50L2luZGljZXMtZ2V0LW1hcHBpbmcuaHRtbFxuICAgKi9cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0vaW5kaWNlc2AsXG4gICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXNSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5pbmRpY2VzJyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwb25zZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VFc0Vycm9yUmVzcG9uc2UoZXJyb3I6IGFueSkge1xuICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXNFcnJvclJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnJvci5yZXNwb25zZSk7XG4gICAgICByZXR1cm4gZXNFcnJvclJlc3BvbnNlLnJlYXNvbiB8fCBlcnJvci5yZXNwb25zZTtcbiAgICB9IGNhdGNoIChwYXJzaW5nRXJyb3IpIHtcbiAgICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIGVycm9yUmVzcG9uc2UocmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LCBlcnJvcjogYW55KSB7XG4gIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1c0NvZGUsXG4gICAgYm9keTogcGFyc2VFc0Vycm9yUmVzcG9uc2UoZXJyb3IpLFxuICB9KTtcbn1cbiJdfQ==