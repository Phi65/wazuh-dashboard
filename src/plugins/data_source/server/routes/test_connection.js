"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTestConnectionRoute = void 0;

var _configSchema = require("@osd/config-schema");

var _data_sources = require("../../common/data_sources");

var _data_source_connection_validator = require("./data_source_connection_validator");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const registerTestConnectionRoute = (router, dataSourceServiceSetup, cryptography) => {
  router.post({
    path: '/internal/data-source-management/validate',
    validate: {
      body: _configSchema.schema.object({
        id: _configSchema.schema.maybe(_configSchema.schema.string()),
        dataSourceAttr: _configSchema.schema.object({
          endpoint: _configSchema.schema.string(),
          auth: _configSchema.schema.maybe(_configSchema.schema.object({
            type: _configSchema.schema.oneOf([_configSchema.schema.literal(_data_sources.AuthType.UsernamePasswordType), _configSchema.schema.literal(_data_sources.AuthType.NoAuth), _configSchema.schema.literal(_data_sources.AuthType.SigV4)]),
            credentials: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.object({
              username: _configSchema.schema.string(),
              password: _configSchema.schema.string()
            }), _configSchema.schema.object({
              region: _configSchema.schema.string(),
              accessKey: _configSchema.schema.string(),
              secretKey: _configSchema.schema.string(),
              service: _configSchema.schema.oneOf([_configSchema.schema.literal(_data_sources.SigV4ServiceName.OpenSearch), _configSchema.schema.literal(_data_sources.SigV4ServiceName.OpenSearchServerless)])
            })]))
          }))
        })
      })
    }
  }, async (context, request, response) => {
    const {
      dataSourceAttr,
      id: dataSourceId
    } = request.body;

    try {
      const dataSourceClient = await dataSourceServiceSetup.getDataSourceClient({
        savedObjects: context.core.savedObjects.client,
        cryptography,
        dataSourceId,
        testClientDataSourceAttr: dataSourceAttr
      });
      const dataSourceValidator = new _data_source_connection_validator.DataSourceConnectionValidator(dataSourceClient, dataSourceAttr);
      await dataSourceValidator.validate();
      return response.ok({
        body: {
          success: true
        }
      });
    } catch (err) {
      var _err$body;

      return response.customError({
        statusCode: err.statusCode || 500,
        body: {
          message: err.message,
          attributes: {
            error: ((_err$body = err.body) === null || _err$body === void 0 ? void 0 : _err$body.error) || err.message
          }
        }
      });
    }
  });
};

exports.registerTestConnectionRoute = registerTestConnectionRoute;