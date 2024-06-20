"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SecurityPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.SecurityPluginSetup;
  }
});
Object.defineProperty(exports, "SecurityPluginStart", {
  enumerable: true,
  get: function () {
    return _types.SecurityPluginStart;
  }
});
exports.configSchema = exports.config = void 0;
exports.plugin = plugin;

var _configSchema = require("@osd/config-schema");

var _plugin = require("./plugin");

var _types = require("./types");

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
const validateAuthType = value => {
  const supportedAuthTypes = ['', 'basicauth', 'jwt', 'openid', 'saml', 'proxy', 'kerberos', 'proxycache'];
  value.forEach(authVal => {
    if (!supportedAuthTypes.includes(authVal.toLowerCase())) {
      throw new Error(`Unsupported authentication type: ${authVal}. Allowed auth.type are ${supportedAuthTypes}.`);
    }
  });
};

const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  allow_client_certificates: _configSchema.schema.boolean({
    defaultValue: false
  }),
  readonly_mode: _configSchema.schema.object({
    roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  clusterPermissions: _configSchema.schema.object({
    include: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  indexPermissions: _configSchema.schema.object({
    include: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  disabledTransportCategories: _configSchema.schema.object({
    exclude: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  disabledRestCategories: _configSchema.schema.object({
    exclude: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  cookie: _configSchema.schema.object({
    secure: _configSchema.schema.boolean({
      defaultValue: false
    }),
    name: _configSchema.schema.string({
      defaultValue: 'security_authentication'
    }),
    password: _configSchema.schema.string({
      defaultValue: 'security_cookie_default_password',
      minLength: 32
    }),
    ttl: _configSchema.schema.number({
      defaultValue: 60 * 60 * 1000
    }),
    domain: _configSchema.schema.nullable(_configSchema.schema.string()),
    isSameSite: _configSchema.schema.oneOf([_configSchema.schema.literal('Strict'), _configSchema.schema.literal('Lax'), _configSchema.schema.literal('None'), _configSchema.schema.literal(false)], {
      defaultValue: false
    })
  }),
  session: _configSchema.schema.object({
    ttl: _configSchema.schema.number({
      defaultValue: 60 * 60 * 1000
    }),
    keepalive: _configSchema.schema.boolean({
      defaultValue: true
    })
  }),
  auth: _configSchema.schema.object({
    type: _configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: [''],

      validate(value) {
        if (!value || value.length === 0) {
          return `Authentication type is not configured properly. At least one authentication type must be selected.`;
        }

        if (value.length > 1) {
          const includeBasicAuth = value.find(element => {
            return element.toLowerCase() === 'basicauth';
          });

          if (!includeBasicAuth) {
            return `Authentication type is not configured properly. basicauth is mandatory.`;
          }
        }

        validateAuthType(value);
      }

    }), _configSchema.schema.string({
      defaultValue: '',

      validate(value) {
        const valArray = [];
        valArray.push(value);
        validateAuthType(valArray);
      }

    })], {
      defaultValue: ''
    }),
    anonymous_auth_enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    unauthenticated_routes: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: ['/api/reporting/stats']
    }),
    forbidden_usernames: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    logout_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    multiple_auth_enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  }),
  basicauth: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    unauthenticated_routes: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    forbidden_usernames: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    header_trumps_session: _configSchema.schema.boolean({
      defaultValue: false
    }),
    alternative_login: _configSchema.schema.object({
      headers: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      }),
      show_for_parameter: _configSchema.schema.string({
        defaultValue: ''
      }),
      valid_redirects: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      }),
      button_text: _configSchema.schema.string({
        defaultValue: 'Log in with provider'
      }),
      buttonstyle: _configSchema.schema.string({
        defaultValue: ''
      })
    }),
    loadbalancer_url: _configSchema.schema.maybe(_configSchema.schema.string()),
    login: _configSchema.schema.object({
      title: _configSchema.schema.string({
        defaultValue: ''
      }),
      subtitle: _configSchema.schema.string({
        defaultValue: ''
      }),
      showbrandimage: _configSchema.schema.boolean({
        defaultValue: true
      }),
      brandimage: _configSchema.schema.string({
        defaultValue: ''
      }),
      // TODO: update brand image
      buttonstyle: _configSchema.schema.string({
        defaultValue: ''
      })
    })
  }),
  multitenancy: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    show_roles: _configSchema.schema.boolean({
      defaultValue: false
    }),
    enable_filter: _configSchema.schema.boolean({
      defaultValue: false
    }),
    debug: _configSchema.schema.boolean({
      defaultValue: false
    }),
    enable_aggregation_view: _configSchema.schema.boolean({
      defaultValue: false
    }),
    tenants: _configSchema.schema.object({
      enable_private: _configSchema.schema.boolean({
        defaultValue: true
      }),
      enable_global: _configSchema.schema.boolean({
        defaultValue: true
      }),
      preferred: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      })
    })
  }),
  configuration: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    })
  }),
  accountinfo: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  }),
  openid: _configSchema.schema.maybe(_configSchema.schema.object({
    connect_url: _configSchema.schema.maybe(_configSchema.schema.string()),
    header: _configSchema.schema.string({
      defaultValue: 'Authorization'
    }),
    // TODO: test if siblingRef() works here
    // client_id is required when auth.type is openid
    client_id: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'openid', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    client_secret: _configSchema.schema.string({
      defaultValue: ''
    }),
    scope: _configSchema.schema.string({
      defaultValue: 'openid profile email address phone'
    }),
    base_redirect_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    logout_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    root_ca: _configSchema.schema.string({
      defaultValue: ''
    }),
    verify_hostnames: _configSchema.schema.boolean({
      defaultValue: true
    }),
    refresh_tokens: _configSchema.schema.boolean({
      defaultValue: true
    }),
    trust_dynamic_headers: _configSchema.schema.boolean({
      defaultValue: false
    }),
    extra_storage: _configSchema.schema.object({
      cookie_prefix: _configSchema.schema.string({
        defaultValue: 'security_authentication_oidc',
        minLength: 2
      }),
      additional_cookies: _configSchema.schema.number({
        min: 1,
        defaultValue: 5
      })
    })
  })),
  saml: _configSchema.schema.object({
    extra_storage: _configSchema.schema.object({
      cookie_prefix: _configSchema.schema.string({
        defaultValue: 'security_authentication_saml',
        minLength: 2
      }),
      additional_cookies: _configSchema.schema.number({
        min: 0,
        defaultValue: 3
      })
    })
  }),
  proxycache: _configSchema.schema.maybe(_configSchema.schema.object({
    // when auth.type is proxycache, user_header, roles_header and proxy_header_ip are required
    user_header: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    roles_header: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    proxy_header: _configSchema.schema.maybe(_configSchema.schema.string({
      defaultValue: 'x-forwarded-for'
    })),
    proxy_header_ip: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    login_endpoint: _configSchema.schema.maybe(_configSchema.schema.string({
      defaultValue: ''
    }))
  })),
  jwt: _configSchema.schema.maybe(_configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    login_endpoint: _configSchema.schema.maybe(_configSchema.schema.string()),
    url_param: _configSchema.schema.string({
      defaultValue: 'authorization'
    }),
    header: _configSchema.schema.string({
      defaultValue: 'Authorization'
    })
  })),
  ui: _configSchema.schema.object({
    basicauth: _configSchema.schema.object({
      // the login config here is the same as old config `_security.basicauth.login`
      // Since we are now rendering login page to browser app, so move these config to browser side.
      login: _configSchema.schema.object({
        title: _configSchema.schema.string({
          defaultValue: ''
        }),
        subtitle: _configSchema.schema.string({
          defaultValue: ''
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: true
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    anonymous: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in as anonymous'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    openid: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in with single sign-on'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    saml: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in with single sign-on'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    autologout: _configSchema.schema.boolean({
      defaultValue: true
    }),
    backend_configurable: _configSchema.schema.boolean({
      defaultValue: true
    })
  })
});

exports.configSchema = configSchema;
const config = {
  exposeToBrowser: {
    enabled: true,
    auth: true,
    ui: true,
    multitenancy: true,
    readonly_mode: true,
    clusterPermissions: true,
    indexPermissions: true,
    disabledTransportCategories: true,
    disabledRestCategories: true
  },
  schema: configSchema,
  deprecations: ({
    rename,
    unused
  }) => [rename('basicauth.login.title', 'ui.basicauth.login.title'), rename('basicauth.login.subtitle', 'ui.basicauth.login.subtitle'), rename('basicauth.login.showbrandimage', 'ui.basicauth.login.showbrandimage'), rename('basicauth.login.brandimage', 'ui.basicauth.login.brandimage'), rename('basicauth.login.buttonstyle', 'ui.basicauth.login.buttonstyle')]
}; //  This exports static code and TypeScript types,
//  as well as, OpenSearchDashboards Platform `plugin()` initializer.

exports.config = config;

function plugin(initializerContext) {
  return new _plugin.SecurityPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInZhbGlkYXRlQXV0aFR5cGUiLCJ2YWx1ZSIsInN1cHBvcnRlZEF1dGhUeXBlcyIsImZvckVhY2giLCJhdXRoVmFsIiwiaW5jbHVkZXMiLCJ0b0xvd2VyQ2FzZSIsIkVycm9yIiwiY29uZmlnU2NoZW1hIiwic2NoZW1hIiwib2JqZWN0IiwiZW5hYmxlZCIsImJvb2xlYW4iLCJkZWZhdWx0VmFsdWUiLCJhbGxvd19jbGllbnRfY2VydGlmaWNhdGVzIiwicmVhZG9ubHlfbW9kZSIsInJvbGVzIiwiYXJyYXlPZiIsInN0cmluZyIsImNsdXN0ZXJQZXJtaXNzaW9ucyIsImluY2x1ZGUiLCJpbmRleFBlcm1pc3Npb25zIiwiZGlzYWJsZWRUcmFuc3BvcnRDYXRlZ29yaWVzIiwiZXhjbHVkZSIsImRpc2FibGVkUmVzdENhdGVnb3JpZXMiLCJjb29raWUiLCJzZWN1cmUiLCJuYW1lIiwicGFzc3dvcmQiLCJtaW5MZW5ndGgiLCJ0dGwiLCJudW1iZXIiLCJkb21haW4iLCJudWxsYWJsZSIsImlzU2FtZVNpdGUiLCJvbmVPZiIsImxpdGVyYWwiLCJzZXNzaW9uIiwia2VlcGFsaXZlIiwiYXV0aCIsInR5cGUiLCJ2YWxpZGF0ZSIsImxlbmd0aCIsImluY2x1ZGVCYXNpY0F1dGgiLCJmaW5kIiwiZWxlbWVudCIsInZhbEFycmF5IiwicHVzaCIsImFub255bW91c19hdXRoX2VuYWJsZWQiLCJ1bmF1dGhlbnRpY2F0ZWRfcm91dGVzIiwiZm9yYmlkZGVuX3VzZXJuYW1lcyIsImxvZ291dF91cmwiLCJtdWx0aXBsZV9hdXRoX2VuYWJsZWQiLCJiYXNpY2F1dGgiLCJoZWFkZXJfdHJ1bXBzX3Nlc3Npb24iLCJhbHRlcm5hdGl2ZV9sb2dpbiIsImhlYWRlcnMiLCJzaG93X2Zvcl9wYXJhbWV0ZXIiLCJ2YWxpZF9yZWRpcmVjdHMiLCJidXR0b25fdGV4dCIsImJ1dHRvbnN0eWxlIiwibG9hZGJhbGFuY2VyX3VybCIsIm1heWJlIiwibG9naW4iLCJ0aXRsZSIsInN1YnRpdGxlIiwic2hvd2JyYW5kaW1hZ2UiLCJicmFuZGltYWdlIiwibXVsdGl0ZW5hbmN5Iiwic2hvd19yb2xlcyIsImVuYWJsZV9maWx0ZXIiLCJkZWJ1ZyIsImVuYWJsZV9hZ2dyZWdhdGlvbl92aWV3IiwidGVuYW50cyIsImVuYWJsZV9wcml2YXRlIiwiZW5hYmxlX2dsb2JhbCIsInByZWZlcnJlZCIsImNvbmZpZ3VyYXRpb24iLCJhY2NvdW50aW5mbyIsIm9wZW5pZCIsImNvbm5lY3RfdXJsIiwiaGVhZGVyIiwiY2xpZW50X2lkIiwiY29uZGl0aW9uYWwiLCJzaWJsaW5nUmVmIiwiY2xpZW50X3NlY3JldCIsInNjb3BlIiwiYmFzZV9yZWRpcmVjdF91cmwiLCJyb290X2NhIiwidmVyaWZ5X2hvc3RuYW1lcyIsInJlZnJlc2hfdG9rZW5zIiwidHJ1c3RfZHluYW1pY19oZWFkZXJzIiwiZXh0cmFfc3RvcmFnZSIsImNvb2tpZV9wcmVmaXgiLCJhZGRpdGlvbmFsX2Nvb2tpZXMiLCJtaW4iLCJzYW1sIiwicHJveHljYWNoZSIsInVzZXJfaGVhZGVyIiwicm9sZXNfaGVhZGVyIiwicHJveHlfaGVhZGVyIiwicHJveHlfaGVhZGVyX2lwIiwibG9naW5fZW5kcG9pbnQiLCJqd3QiLCJ1cmxfcGFyYW0iLCJ1aSIsImFub255bW91cyIsImJ1dHRvbm5hbWUiLCJhdXRvbG9nb3V0IiwiYmFja2VuZF9jb25maWd1cmFibGUiLCJjb25maWciLCJleHBvc2VUb0Jyb3dzZXIiLCJkZXByZWNhdGlvbnMiLCJyZW5hbWUiLCJ1bnVzZWQiLCJwbHVnaW4iLCJpbml0aWFsaXplckNvbnRleHQiLCJTZWN1cml0eVBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFFQTs7QUFpU0E7O0FBbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxNQUFNQSxnQkFBZ0IsR0FBSUMsS0FBRCxJ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OEI7QUFiZ0MsQ0FBakUsQyxDQXNCUDtBQUNBOzs7O0FBRU8sU0FBU0UsTUFBVCxDQUFnQkMsa0JBQWhCLEVBQThEO0FBQ25FLFNBQU8sSUFBSUMsc0JBQUosQ0FBbUJELGtCQUFuQixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHNjaGVtYSwgVHlwZU9mIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCwgUGx1Z2luQ29uZmlnRGVzY3JpcHRvciB9IGZyb20gJy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBTZWN1cml0eVBsdWdpbiB9IGZyb20gJy4vcGx1Z2luJztcblxuY29uc3QgdmFsaWRhdGVBdXRoVHlwZSA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgY29uc3Qgc3VwcG9ydGVkQXV0aFR5cGVzID0gW1xuICAgICcnLFxuICAgICdiYXNpY2F1dGgnLFxuICAgICdqd3QnLFxuICAgICdvcGVuaWQnLFxuICAgICdzYW1sJyxcbiAgICAncHJveHknLFxuICAgICdrZXJiZXJvcycsXG4gICAgJ3Byb3h5Y2FjaGUnLFxuICBdO1xuXG4gIHZhbHVlLmZvckVhY2goKGF1dGhWYWwpID0+IHtcbiAgICBpZiAoIXN1cHBvcnRlZEF1dGhUeXBlcy5pbmNsdWRlcyhhdXRoVmFsLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbnN1cHBvcnRlZCBhdXRoZW50aWNhdGlvbiB0eXBlOiAke2F1dGhWYWx9LiBBbGxvd2VkIGF1dGgudHlwZSBhcmUgJHtzdXBwb3J0ZWRBdXRoVHlwZXN9LmBcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb25maWdTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gIGFsbG93X2NsaWVudF9jZXJ0aWZpY2F0ZXM6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgcmVhZG9ubHlfbW9kZTogc2NoZW1hLm9iamVjdCh7XG4gICAgcm9sZXM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KSxcbiAgY2x1c3RlclBlcm1pc3Npb25zOiBzY2hlbWEub2JqZWN0KHtcbiAgICBpbmNsdWRlOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgfSksXG4gIGluZGV4UGVybWlzc2lvbnM6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGluY2x1ZGU6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KSxcbiAgZGlzYWJsZWRUcmFuc3BvcnRDYXRlZ29yaWVzOiBzY2hlbWEub2JqZWN0KHtcbiAgICBleGNsdWRlOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgfSksXG4gIGRpc2FibGVkUmVzdENhdGVnb3JpZXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGV4Y2x1ZGU6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KSxcbiAgY29va2llOiBzY2hlbWEub2JqZWN0KHtcbiAgICBzZWN1cmU6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICBuYW1lOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnc2VjdXJpdHlfYXV0aGVudGljYXRpb24nIH0pLFxuICAgIHBhc3N3b3JkOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnc2VjdXJpdHlfY29va2llX2RlZmF1bHRfcGFzc3dvcmQnLCBtaW5MZW5ndGg6IDMyIH0pLFxuICAgIHR0bDogc2NoZW1hLm51bWJlcih7IGRlZmF1bHRWYWx1ZTogNjAgKiA2MCAqIDEwMDAgfSksXG4gICAgZG9tYWluOiBzY2hlbWEubnVsbGFibGUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBpc1NhbWVTaXRlOiBzY2hlbWEub25lT2YoXG4gICAgICBbXG4gICAgICAgIHNjaGVtYS5saXRlcmFsKCdTdHJpY3QnKSxcbiAgICAgICAgc2NoZW1hLmxpdGVyYWwoJ0xheCcpLFxuICAgICAgICBzY2hlbWEubGl0ZXJhbCgnTm9uZScpLFxuICAgICAgICBzY2hlbWEubGl0ZXJhbChmYWxzZSksXG4gICAgICBdLFxuICAgICAgeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH1cbiAgICApLFxuICB9KSxcbiAgc2Vzc2lvbjogc2NoZW1hLm9iamVjdCh7XG4gICAgdHRsOiBzY2hlbWEubnVtYmVyKHsgZGVmYXVsdFZhbHVlOiA2MCAqIDYwICogMTAwMCB9KSxcbiAgICBrZWVwYWxpdmU6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICB9KSxcbiAgYXV0aDogc2NoZW1hLm9iamVjdCh7XG4gICAgdHlwZTogc2NoZW1hLm9uZU9mKFxuICAgICAgW1xuICAgICAgICBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHtcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IFsnJ10sXG4gICAgICAgICAgdmFsaWRhdGUodmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gYEF1dGhlbnRpY2F0aW9uIHR5cGUgaXMgbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuIEF0IGxlYXN0IG9uZSBhdXRoZW50aWNhdGlvbiB0eXBlIG11c3QgYmUgc2VsZWN0ZWQuYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5jbHVkZUJhc2ljQXV0aCA9IHZhbHVlLmZpbmQoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC50b0xvd2VyQ2FzZSgpID09PSAnYmFzaWNhdXRoJztcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlQmFzaWNBdXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBBdXRoZW50aWNhdGlvbiB0eXBlIGlzIG5vdCBjb25maWd1cmVkIHByb3Blcmx5LiBiYXNpY2F1dGggaXMgbWFuZGF0b3J5LmA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsaWRhdGVBdXRoVHlwZSh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbEFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgdmFsQXJyYXkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB2YWxpZGF0ZUF1dGhUeXBlKHZhbEFycmF5KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICB7IGRlZmF1bHRWYWx1ZTogJycgfVxuICAgICksXG4gICAgYW5vbnltb3VzX2F1dGhfZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIHVuYXV0aGVudGljYXRlZF9yb3V0ZXM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwge1xuICAgICAgZGVmYXVsdFZhbHVlOiBbJy9hcGkvcmVwb3J0aW5nL3N0YXRzJ10sXG4gICAgfSksXG4gICAgZm9yYmlkZGVuX3VzZXJuYW1lczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgbG9nb3V0X3VybDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgbXVsdGlwbGVfYXV0aF9lbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gIH0pLFxuICBiYXNpY2F1dGg6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGVuYWJsZWQ6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgIHVuYXV0aGVudGljYXRlZF9yb3V0ZXM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIGZvcmJpZGRlbl91c2VybmFtZXM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIGhlYWRlcl90cnVtcHNfc2Vzc2lvbjogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIGFsdGVybmF0aXZlX2xvZ2luOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgIGhlYWRlcnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgICAgc2hvd19mb3JfcGFyYW1ldGVyOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHZhbGlkX3JlZGlyZWN0czogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgICBidXR0b25fdGV4dDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ0xvZyBpbiB3aXRoIHByb3ZpZGVyJyB9KSxcbiAgICAgIGJ1dHRvbnN0eWxlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICB9KSxcbiAgICBsb2FkYmFsYW5jZXJfdXJsOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBsb2dpbjogc2NoZW1hLm9iamVjdCh7XG4gICAgICB0aXRsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ0xvZyBpbiB0byBPcGVuU2VhcmNoIERhc2hib2FyZHMnIH0pLFxuICAgICAgc3VidGl0bGU6IHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICBkZWZhdWx0VmFsdWU6XG4gICAgICAgICAgJ0lmIHlvdSBoYXZlIGZvcmdvdHRlbiB5b3VyIHVzZXJuYW1lIG9yIHBhc3N3b3JkLCBjb250YWN0IHlvdXIgc3lzdGVtIGFkbWluaXN0cmF0b3IuJyxcbiAgICAgIH0pLFxuICAgICAgc2hvd2JyYW5kaW1hZ2U6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgICAgYnJhbmRpbWFnZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksIC8vIFRPRE86IHVwZGF0ZSBicmFuZCBpbWFnZVxuICAgICAgYnV0dG9uc3R5bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgIH0pLFxuICB9KSxcbiAgbXVsdGl0ZW5hbmN5OiBzY2hlbWEub2JqZWN0KHtcbiAgICBlbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgc2hvd19yb2xlczogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIGVuYWJsZV9maWx0ZXI6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICBkZWJ1Zzogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIGVuYWJsZV9hZ2dyZWdhdGlvbl92aWV3OiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgdGVuYW50czogc2NoZW1hLm9iamVjdCh7XG4gICAgICBlbmFibGVfcHJpdmF0ZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICBlbmFibGVfZ2xvYmFsOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICAgIHByZWZlcnJlZDogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgfSksXG4gIH0pLFxuICBjb25maWd1cmF0aW9uOiBzY2hlbWEub2JqZWN0KHtcbiAgICBlbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgfSksXG4gIGFjY291bnRpbmZvOiBzY2hlbWEub2JqZWN0KHtcbiAgICBlbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gIH0pLFxuICBvcGVuaWQ6IHNjaGVtYS5tYXliZShcbiAgICBzY2hlbWEub2JqZWN0KHtcbiAgICAgIGNvbm5lY3RfdXJsOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgIGhlYWRlcjogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ0F1dGhvcml6YXRpb24nIH0pLFxuICAgICAgLy8gVE9ETzogdGVzdCBpZiBzaWJsaW5nUmVmKCkgd29ya3MgaGVyZVxuICAgICAgLy8gY2xpZW50X2lkIGlzIHJlcXVpcmVkIHdoZW4gYXV0aC50eXBlIGlzIG9wZW5pZFxuICAgICAgY2xpZW50X2lkOiBzY2hlbWEuY29uZGl0aW9uYWwoXG4gICAgICAgIHNjaGVtYS5zaWJsaW5nUmVmKCdhdXRoLnR5cGUnKSxcbiAgICAgICAgJ29wZW5pZCcsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICBjbGllbnRfc2VjcmV0OiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHNjb3BlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnb3BlbmlkIHByb2ZpbGUgZW1haWwgYWRkcmVzcyBwaG9uZScgfSksXG4gICAgICBiYXNlX3JlZGlyZWN0X3VybDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICBsb2dvdXRfdXJsOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHJvb3RfY2E6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgdmVyaWZ5X2hvc3RuYW1lczogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICByZWZyZXNoX3Rva2Vuczogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICB0cnVzdF9keW5hbWljX2hlYWRlcnM6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICAgIGV4dHJhX3N0b3JhZ2U6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBjb29raWVfcHJlZml4OiBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdzZWN1cml0eV9hdXRoZW50aWNhdGlvbl9vaWRjJyxcbiAgICAgICAgICBtaW5MZW5ndGg6IDIsXG4gICAgICAgIH0pLFxuICAgICAgICBhZGRpdGlvbmFsX2Nvb2tpZXM6IHNjaGVtYS5udW1iZXIoeyBtaW46IDEsIGRlZmF1bHRWYWx1ZTogNSB9KSxcbiAgICAgIH0pLFxuICAgIH0pXG4gICksXG4gIHNhbWw6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGV4dHJhX3N0b3JhZ2U6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgY29va2llX3ByZWZpeDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ3NlY3VyaXR5X2F1dGhlbnRpY2F0aW9uX3NhbWwnLCBtaW5MZW5ndGg6IDIgfSksXG4gICAgICBhZGRpdGlvbmFsX2Nvb2tpZXM6IHNjaGVtYS5udW1iZXIoeyBtaW46IDAsIGRlZmF1bHRWYWx1ZTogMyB9KSxcbiAgICB9KSxcbiAgfSksXG5cbiAgcHJveHljYWNoZTogc2NoZW1hLm1heWJlKFxuICAgIHNjaGVtYS5vYmplY3Qoe1xuICAgICAgLy8gd2hlbiBhdXRoLnR5cGUgaXMgcHJveHljYWNoZSwgdXNlcl9oZWFkZXIsIHJvbGVzX2hlYWRlciBhbmQgcHJveHlfaGVhZGVyX2lwIGFyZSByZXF1aXJlZFxuICAgICAgdXNlcl9oZWFkZXI6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICByb2xlc19oZWFkZXI6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICBwcm94eV9oZWFkZXI6IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAneC1mb3J3YXJkZWQtZm9yJyB9KSksXG4gICAgICBwcm94eV9oZWFkZXJfaXA6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICBsb2dpbl9lbmRwb2ludDogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pKSxcbiAgICB9KVxuICApLFxuICBqd3Q6IHNjaGVtYS5tYXliZShcbiAgICBzY2hlbWEub2JqZWN0KHtcbiAgICAgIGVuYWJsZWQ6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICAgIGxvZ2luX2VuZHBvaW50OiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgIHVybF9wYXJhbTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ2F1dGhvcml6YXRpb24nIH0pLFxuICAgICAgaGVhZGVyOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnQXV0aG9yaXphdGlvbicgfSksXG4gICAgfSlcbiAgKSxcbiAgdWk6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGJhc2ljYXV0aDogc2NoZW1hLm9iamVjdCh7XG4gICAgICAvLyB0aGUgbG9naW4gY29uZmlnIGhlcmUgaXMgdGhlIHNhbWUgYXMgb2xkIGNvbmZpZyBgX3NlY3VyaXR5LmJhc2ljYXV0aC5sb2dpbmBcbiAgICAgIC8vIFNpbmNlIHdlIGFyZSBub3cgcmVuZGVyaW5nIGxvZ2luIHBhZ2UgdG8gYnJvd3NlciBhcHAsIHNvIG1vdmUgdGhlc2UgY29uZmlnIHRvIGJyb3dzZXIgc2lkZS5cbiAgICAgIGxvZ2luOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgdGl0bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdMb2cgaW4gdG8gT3BlblNlYXJjaCBEYXNoYm9hcmRzJyB9KSxcbiAgICAgICAgc3VidGl0bGU6IHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgIGRlZmF1bHRWYWx1ZTpcbiAgICAgICAgICAgICdJZiB5b3UgaGF2ZSBmb3Jnb3R0ZW4geW91ciB1c2VybmFtZSBvciBwYXNzd29yZCwgY29udGFjdCB5b3VyIHN5c3RlbSBhZG1pbmlzdHJhdG9yLicsXG4gICAgICAgIH0pLFxuICAgICAgICBzaG93YnJhbmRpbWFnZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBhbm9ueW1vdXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgbG9naW46IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBidXR0b25uYW1lOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnTG9nIGluIGFzIGFub255bW91cycgfSksXG4gICAgICAgIHNob3dicmFuZGltYWdlOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBvcGVuaWQ6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgbG9naW46IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBidXR0b25uYW1lOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnTG9nIGluIHdpdGggc2luZ2xlIHNpZ24tb24nIH0pLFxuICAgICAgICBzaG93YnJhbmRpbWFnZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgICAgICBicmFuZGltYWdlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgICAgYnV0dG9uc3R5bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgfSksXG4gICAgfSksXG4gICAgc2FtbDogc2NoZW1hLm9iamVjdCh7XG4gICAgICBsb2dpbjogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgIGJ1dHRvbm5hbWU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdMb2cgaW4gd2l0aCBzaW5nbGUgc2lnbi1vbicgfSksXG4gICAgICAgIHNob3dicmFuZGltYWdlOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBhdXRvbG9nb3V0OiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICBiYWNrZW5kX2NvbmZpZ3VyYWJsZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gIH0pLFxufSk7XG5cbmV4cG9ydCB0eXBlIFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSA9IFR5cGVPZjx0eXBlb2YgY29uZmlnU2NoZW1hPjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogUGx1Z2luQ29uZmlnRGVzY3JpcHRvcjxTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGU+ID0ge1xuICBleHBvc2VUb0Jyb3dzZXI6IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGF1dGg6IHRydWUsXG4gICAgdWk6IHRydWUsXG4gICAgbXVsdGl0ZW5hbmN5OiB0cnVlLFxuICAgIHJlYWRvbmx5X21vZGU6IHRydWUsXG4gICAgY2x1c3RlclBlcm1pc3Npb25zOiB0cnVlLFxuICAgIGluZGV4UGVybWlzc2lvbnM6IHRydWUsXG4gICAgZGlzYWJsZWRUcmFuc3BvcnRDYXRlZ29yaWVzOiB0cnVlLFxuICAgIGRpc2FibGVkUmVzdENhdGVnb3JpZXM6IHRydWUsXG4gIH0sXG4gIHNjaGVtYTogY29uZmlnU2NoZW1hLFxuICBkZXByZWNhdGlvbnM6ICh7IHJlbmFtZSwgdW51c2VkIH0pID0+IFtcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi50aXRsZScsICd1aS5iYXNpY2F1dGgubG9naW4udGl0bGUnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5zdWJ0aXRsZScsICd1aS5iYXNpY2F1dGgubG9naW4uc3VidGl0bGUnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5zaG93YnJhbmRpbWFnZScsICd1aS5iYXNpY2F1dGgubG9naW4uc2hvd2JyYW5kaW1hZ2UnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5icmFuZGltYWdlJywgJ3VpLmJhc2ljYXV0aC5sb2dpbi5icmFuZGltYWdlJyksXG4gICAgcmVuYW1lKCdiYXNpY2F1dGgubG9naW4uYnV0dG9uc3R5bGUnLCAndWkuYmFzaWNhdXRoLmxvZ2luLmJ1dHRvbnN0eWxlJyksXG4gIF0sXG59O1xuXG4vLyAgVGhpcyBleHBvcnRzIHN0YXRpYyBjb2RlIGFuZCBUeXBlU2NyaXB0IHR5cGVzLFxuLy8gIGFzIHdlbGwgYXMsIE9wZW5TZWFyY2hEYXNoYm9hcmRzIFBsYXRmb3JtIGBwbHVnaW4oKWAgaW5pdGlhbGl6ZXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oaW5pdGlhbGl6ZXJDb250ZXh0OiBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQpIHtcbiAgcmV0dXJuIG5ldyBTZWN1cml0eVBsdWdpbihpbml0aWFsaXplckNvbnRleHQpO1xufVxuXG5leHBvcnQgeyBTZWN1cml0eVBsdWdpblNldHVwLCBTZWN1cml0eVBsdWdpblN0YXJ0IH0gZnJvbSAnLi90eXBlcyc7XG4iXX0=