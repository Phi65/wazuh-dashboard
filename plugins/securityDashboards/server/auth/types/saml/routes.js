"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SamlAuthRoutes = void 0;

var _configSchema = require("@osd/config-schema");

var _next_url = require("../../../utils/next_url");

var _common = require("../../../../common");

var _cookie_splitter = require("../../../session/cookie_splitter");

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
class SamlAuthRoutes {
  constructor(router, // @ts-ignore: unused variable
  config, sessionStorageFactory, securityClient, coreSetup) {
    this.router = router;
    this.config = config;
    this.sessionStorageFactory = sessionStorageFactory;
    this.securityClient = securityClient;
    this.coreSetup = coreSetup;
  }

  getExtraAuthStorageOptions(logger) {
    // If we're here, we will always have the openid configuration
    return {
      cookiePrefix: this.config.saml.extra_storage.cookie_prefix,
      additionalCookies: this.config.saml.extra_storage.additional_cookies,
      logger
    };
  }

  setupRoutes() {
    this.router.get({
      path: _common.SAML_AUTH_LOGIN,
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          })),
          redirectHash: _configSchema.schema.string()
        })
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      if (request.auth.isAuthenticated) {
        return response.redirected({
          headers: {
            location: `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`
          }
        });
      }

      try {
        const samlHeader = await this.securityClient.getSamlHeader(request); // const { nextUrl = '/' } = request.query;

        const cookie = {
          saml: {
            nextUrl: request.query.nextUrl,
            requestId: samlHeader.requestId,
            redirectHash: request.query.redirectHash === 'true'
          }
        };
        this.sessionStorageFactory.asScoped(request).set(cookie);
        return response.redirected({
          headers: {
            location: samlHeader.location
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`Failed to get saml header: ${error}`);
        return response.internalError(); // TODO: redirect to error page?
      }
    });
    this.router.post({
      path: `/_opendistro/_security/saml/acs`,
      validate: {
        body: _configSchema.schema.any()
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      let requestId = '';
      let nextUrl = '/';
      let redirectHash = false;

      try {
        const cookie = await this.sessionStorageFactory.asScoped(request).get();

        if (cookie) {
          var _cookie$saml, _cookie$saml2, _cookie$saml3;

          requestId = ((_cookie$saml = cookie.saml) === null || _cookie$saml === void 0 ? void 0 : _cookie$saml.requestId) || '';
          nextUrl = ((_cookie$saml2 = cookie.saml) === null || _cookie$saml2 === void 0 ? void 0 : _cookie$saml2.nextUrl) || `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`;
          redirectHash = ((_cookie$saml3 = cookie.saml) === null || _cookie$saml3 === void 0 ? void 0 : _cookie$saml3.redirectHash) || false;
        }

        if (!requestId) {
          return response.badRequest({
            body: 'Invalid requestId'
          });
        }
      } catch (error) {
        context.security_plugin.logger.error(`Failed to parse cookie: ${error}`);
        return response.badRequest();
      }

      try {
        const credentials = await this.securityClient.authToken(requestId, request.body.SAMLResponse, undefined);
        const user = await this.securityClient.authenticateWithHeader(request, 'authorization', credentials.authorization);
        let expiryTime = Date.now() + this.config.session.ttl;
        const [headerEncoded, payloadEncoded, signature] = credentials.authorization.split('.');

        if (!payloadEncoded) {
          context.security_plugin.logger.error('JWT token payload not found');
        }

        const tokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());

        if (tokenPayload.exp) {
          expiryTime = parseInt(tokenPayload.exp, 10) * 1000;
        }

        const cookie = {
          username: user.username,
          credentials: {
            authHeaderValueExtra: true
          },
          authType: _common.AuthType.SAML,
          // TODO: create constant
          expiryTime
        };
        (0, _cookie_splitter.setExtraAuthStorage)(request, credentials.authorization, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).set(cookie);

        if (redirectHash) {
          return response.redirected({
            headers: {
              location: `${this.coreSetup.http.basePath.serverBasePath}/auth/saml/redirectUrlFragment?nextUrl=${escape(nextUrl)}`
            }
          });
        } else {
          return response.redirected({
            headers: {
              location: nextUrl
            }
          });
        }
      } catch (error) {
        context.security_plugin.logger.error(`SAML SP initiated authentication workflow failed: ${error}`);
      }

      return response.internalError();
    });
    this.router.post({
      path: `/_opendistro/_security/saml/acs/idpinitiated`,
      validate: {
        body: _configSchema.schema.any()
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      const acsEndpoint = `${this.coreSetup.http.basePath.serverBasePath}/_opendistro/_security/saml/acs/idpinitiated`;

      try {
        const credentials = await this.securityClient.authToken(undefined, request.body.SAMLResponse, acsEndpoint);
        const user = await this.securityClient.authenticateWithHeader(request, 'authorization', credentials.authorization);
        let expiryTime = Date.now() + this.config.session.ttl;
        const [headerEncoded, payloadEncoded, signature] = credentials.authorization.split('.');

        if (!payloadEncoded) {
          context.security_plugin.logger.error('JWT token payload not found');
        }

        const tokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());

        if (tokenPayload.exp) {
          expiryTime = parseInt(tokenPayload.exp, 10) * 1000;
        }

        const cookie = {
          username: user.username,
          credentials: {
            authHeaderValueExtra: true
          },
          authType: _common.AuthType.SAML,
          // TODO: create constant
          expiryTime
        };
        (0, _cookie_splitter.setExtraAuthStorage)(request, credentials.authorization, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).set(cookie);
        return response.redirected({
          headers: {
            location: `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`SAML IDP initiated authentication workflow failed: ${error}`);
      }

      return response.internalError();
    }); // captureUrlFragment is the first route that will be invoked in the SP initiated login.
    // This route will execute the captureUrlFragment.js script.

    this.coreSetup.http.resources.register({
      path: '/auth/saml/captureUrlFragment',
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          }))
        })
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      const serverBasePath = this.coreSetup.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
            <!DOCTYPE html>
            <title>OSD SAML Capture</title>
            <link rel="icon" href="data:,">
            <script src="${serverBasePath}/auth/saml/captureUrlFragment.js"></script>
          `
      });
    }); // This script will store the URL Hash in browser's local storage.

    this.coreSetup.http.resources.register({
      path: '/auth/saml/captureUrlFragment.js',
      validate: false,
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      return response.renderJs({
        body: `let samlHash=window.location.hash.toString();
                 let redirectHash = false;
                 if (samlHash !== "") {
                    window.localStorage.removeItem('samlHash');
                    window.localStorage.setItem('samlHash', samlHash);
                     redirectHash = true;
                  }
                 let params = new URLSearchParams(window.location.search);
                 let nextUrl = params.get("nextUrl");
                 finalUrl = "login?nextUrl=" + encodeURIComponent(nextUrl);
                 finalUrl += "&redirectHash=" + encodeURIComponent(redirectHash);
                 window.location.replace(finalUrl);
                `
      });
    }); //  Once the User is authenticated via the '_opendistro/_security/saml/acs' route,
    //  the browser will be redirected to '/auth/saml/redirectUrlFragment' route,
    //  which will execute the redirectUrlFragment.js.

    this.coreSetup.http.resources.register({
      path: '/auth/saml/redirectUrlFragment',
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.any()
        })
      },
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      const serverBasePath = this.coreSetup.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
            <!DOCTYPE html>
            <title>OSD SAML Success</title>
            <link rel="icon" href="data:,">
            <script src="${serverBasePath}/auth/saml/redirectUrlFragment.js"></script>
          `
      });
    }); // This script will pop the Hash from local storage if it exists.
    // And forward the browser to the next url.

    this.coreSetup.http.resources.register({
      path: '/auth/saml/redirectUrlFragment.js',
      validate: false,
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      return response.renderJs({
        body: `let samlHash=window.localStorage.getItem('samlHash');
                 window.localStorage.removeItem('samlHash');
                 let params = new URLSearchParams(window.location.search);
                 let nextUrl = params.get("nextUrl");
                 finalUrl = nextUrl + samlHash;
                 window.location.replace(finalUrl);
                `
      });
    });
    this.router.get({
      path: _common.SAML_AUTH_LOGOUT,
      validate: false
    }, async (context, request, response) => {
      try {
        const authInfo = await this.securityClient.authinfo(request);
        await (0, _cookie_splitter.clearSplitCookies)(request, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).clear(); // TODO: need a default logout page

        const redirectUrl = authInfo.sso_logout_url || this.coreSetup.http.basePath.serverBasePath || '/';
        return response.redirected({
          headers: {
            location: redirectUrl
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`SAML logout failed: ${error}`);
        return response.badRequest();
      }
    });
  }

}

exports.SamlAuthRoutes = SamlAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6WyJTYW1sQXV0aFJvdXRlcyIsImNvbnN0cnVjdG9yIiwicm91dGVyIiwiY29uZmlnIiwic2Vzc2lvblN0b3JhZ2VGYWN0b3J5Iiwic2VjdXJpdHlDbGllbnQiLCJjb3JlU2V0dXAiLCJnZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyIsImxvZ2dlciIsImNvb2tpZVByZWZpeCIsInNhbWwiLCJleHRyYV9zdG9yYWdlIiwiY29va2llX3ByZWZpeCIsImFkZGl0aW9uYWxDb29raWVzIiwiYWRkaXRpb25hbF9jb29raWVzIiwic2V0dXBSb3V0ZXMiLCJnZXQiLCJwYXRoIiwiU0FNTF9BVVRIX0xPR0lOIiwidmFsaWRhdGUiLCJxdWVyeSIsInNjaGVtYSIsIm9iamVjdCIsIm5leHRVcmwiLCJtYXliZSIsInN0cmluZyIsInZhbGlkYXRlTmV4dFVybCIsInJlZGlyZWN0SGFzaCIsIm9wdGlvbnMiLCJhdXRoUmVxdWlyZWQiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXV0aCIsImlzQXV0aGVudGljYXRlZCIsInJlZGlyZWN0ZWQiLCJoZWFkZXJzIiwibG9jYXRpb24iLCJodHRwIiwiYmFzZVBhdGgiLCJzZXJ2ZXJCYXNlUGF0aCIsInNhbWxIZWFkZXIiLCJnZXRTYW1sSGVhZGVyIiwiY29va2llIiwicmVxdWVzdElkIiwiYXNTY29wZWQiLCJzZXQiLCJlcnJvciIsInNlY3VyaXR5X3BsdWdpbiIsImludGVybmFsRXJyb3IiLCJwb3N0IiwiYm9keSIsImFueSIsImJhZFJlcXVlc3QiLCJjcmVkZW50aWFscyIsImF1dGhUb2tlbiIsIlNBTUxSZXNwb25zZSIsInVuZGVmaW5lZCIsInVzZXIiLCJhdXRoZW50aWNhdGVXaXRoSGVhZGVyIiwiYXV0aG9yaXphdGlvbiIsImV4cGlyeVRpbWUiLCJEYXRlIiwibm93Iiwic2Vzc2lvbiIsInR0bCIsImhlYWRlckVuY29kZWQiLCJwYXlsb2FkRW5jb2RlZCIsInNpZ25hdHVyZSIsInNwbGl0IiwidG9rZW5QYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiZXhwIiwicGFyc2VJbnQiLCJ1c2VybmFtZSIsImF1dGhIZWFkZXJWYWx1ZUV4dHJhIiwiYXV0aFR5cGUiLCJBdXRoVHlwZSIsIlNBTUwiLCJlc2NhcGUiLCJhY3NFbmRwb2ludCIsInJlc291cmNlcyIsInJlZ2lzdGVyIiwiY2xlYXIiLCJyZW5kZXJIdG1sIiwicmVuZGVySnMiLCJTQU1MX0FVVEhfTE9HT1VUIiwiYXV0aEluZm8iLCJhdXRoaW5mbyIsInJlZGlyZWN0VXJsIiwic3NvX2xvZ291dF91cmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFlQTs7QUFNQTs7QUFDQTs7QUFFQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWlCTyxNQUFNQSxjQUFOLENBQXFCO0FBQzFCQyxFQUFBQSxXQUFXLENBQ1FDLE1BRFIsRUFFVDtBQUNpQkMsRUFBQUEsTUFIUixFQUlRQyxxQkFKUixFQUtRQyxjQUxSLEVBTVFDLFNBTlIsRUFPVDtBQUFBLFNBTmlCSixNQU1qQixHQU5pQkEsTUFNakI7QUFBQSxTQUppQkMsTUFJakIsR0FKaUJBLE1BSWpCO0FBQUEsU0FIaUJDLHFCQUdqQixHQUhpQkEscUJBR2pCO0FBQUEsU0FGaUJDLGNBRWpCLEdBRmlCQSxjQUVqQjtBQUFBLFNBRGlCQyxTQUNqQixHQURpQkEsU0FDakI7QUFBRTs7QUFFSUMsRUFBQUEsMEJBQTBCLENBQUNDLE1BQUQsRUFBMkM7QUFDM0U7QUFDQSxXQUFPO0FBQ0xDLE1BQUFBLFlBQVksRUFBRSxLQUFLTixNQUFMLENBQVlPLElBQVosQ0FBaUJDLGFBQWpCLENBQStCQyxhQUR4QztBQUVMQyxNQUFBQSxpQkFBaUIsRUFBRSxLQUFLVixNQUFMLENBQVlPLElBQVosQ0FBaUJDLGFBQWpCLENBQStCRyxrQkFGN0M7QUFHTE4sTUFBQUE7QUFI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USxDQUFDRyxjQUFULElBQTJCLEtBQUt4RixTQUFMLENBQWVnQyxJQUFmLENBQW9CQyxRQUFwQixDQUE2QkMsY0FBeEQsSUFBMEUsR0FENUU7QUFFQSxlQUFPUixRQUFRLENBQUNHLFVBQVQsQ0FBb0I7QUFDekJDLFVBQUFBLE9BQU8sRUFBRTtBQUNQQyxZQUFBQSxRQUFRLEVBQUV3RDtBQURIO0FBRGdCLFNBQXBCLENBQVA7QUFLRCxPQWZELENBZUUsT0FBTzlDLEtBQVAsRUFBYztBQUNkakIsUUFBQUEsT0FBTyxDQUFDa0IsZUFBUixDQUF3QnhDLE1BQXhCLENBQStCdUMsS0FBL0IsQ0FBc0MsdUJBQXNCQSxLQUFNLEVBQWxFO0FBQ0EsZUFBT2YsUUFBUSxDQUFDcUIsVUFBVCxFQUFQO0FBQ0Q7QUFDRixLQXpCSDtBQTJCRDs7QUFsWHlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBzY2hlbWEgfSBmcm9tICdAb3NkL2NvbmZpZy1zY2hlbWEnO1xuaW1wb3J0IHsgSVJvdXRlciwgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5LCBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXNzaW9uQ29va2llIH0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9zZWN1cml0eV9jb29raWUnO1xuaW1wb3J0IHsgU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlIH0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHsgU2VjdXJpdHlDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9iYWNrZW5kL29wZW5zZWFyY2hfc2VjdXJpdHlfY2xpZW50JztcbmltcG9ydCB7IENvcmVTZXR1cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZU5leHRVcmwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9uZXh0X3VybCc7XG5pbXBvcnQgeyBBdXRoVHlwZSwgU0FNTF9BVVRIX0xPR0lOLCBTQU1MX0FVVEhfTE9HT1VUIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uJztcblxuaW1wb3J0IHtcbiAgY2xlYXJTcGxpdENvb2tpZXMsXG4gIEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zLFxuICBzZXRFeHRyYUF1dGhTdG9yYWdlLFxufSBmcm9tICcuLi8uLi8uLi9zZXNzaW9uL2Nvb2tpZV9zcGxpdHRlcic7XG5cbmV4cG9ydCBjbGFzcyBTYW1sQXV0aFJvdXRlcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBJUm91dGVyLFxuICAgIC8vIEB0cy1pZ25vcmU6IHVudXNlZCB2YXJpYWJsZVxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZUZhY3Rvcnk6IFNlc3Npb25TdG9yYWdlRmFjdG9yeTxTZWN1cml0eVNlc3Npb25Db29raWU+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VjdXJpdHlDbGllbnQ6IFNlY3VyaXR5Q2xpZW50LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29yZVNldHVwOiBDb3JlU2V0dXBcbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMobG9nZ2VyPzogTG9nZ2VyKTogRXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMge1xuICAgIC8vIElmIHdlJ3JlIGhlcmUsIHdlIHdpbGwgYWx3YXlzIGhhdmUgdGhlIG9wZW5pZCBjb25maWd1cmF0aW9uXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvb2tpZVByZWZpeDogdGhpcy5jb25maWcuc2FtbC5leHRyYV9zdG9yYWdlLmNvb2tpZV9wcmVmaXgsXG4gICAgICBhZGRpdGlvbmFsQ29va2llczogdGhpcy5jb25maWcuc2FtbC5leHRyYV9zdG9yYWdlLmFkZGl0aW9uYWxfY29va2llcyxcbiAgICAgIGxvZ2dlcixcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHNldHVwUm91dGVzKCkge1xuICAgIHRoaXMucm91dGVyLmdldChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogU0FNTF9BVVRIX0xPR0lOLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIHF1ZXJ5OiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICAgIG5leHRVcmw6IHNjaGVtYS5tYXliZShcbiAgICAgICAgICAgICAgc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IHZhbGlkYXRlTmV4dFVybCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZWRpcmVjdEhhc2g6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmF1dGguaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogYCR7dGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aH0vYXBwL29wZW5zZWFyY2gtZGFzaGJvYXJkc2AsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzYW1sSGVhZGVyID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5nZXRTYW1sSGVhZGVyKHJlcXVlc3QpO1xuICAgICAgICAgIC8vIGNvbnN0IHsgbmV4dFVybCA9ICcvJyB9ID0gcmVxdWVzdC5xdWVyeTtcbiAgICAgICAgICBjb25zdCBjb29raWU6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSA9IHtcbiAgICAgICAgICAgIHNhbWw6IHtcbiAgICAgICAgICAgICAgbmV4dFVybDogcmVxdWVzdC5xdWVyeS5uZXh0VXJsLFxuICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHNhbWxIZWFkZXIucmVxdWVzdElkLFxuICAgICAgICAgICAgICByZWRpcmVjdEhhc2g6IHJlcXVlc3QucXVlcnkucmVkaXJlY3RIYXNoID09PSAndHJ1ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuc2V0KGNvb2tpZSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogc2FtbEhlYWRlci5sb2NhdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gZ2V0IHNhbWwgaGVhZGVyOiAke2Vycm9yfWApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5pbnRlcm5hbEVycm9yKCk7IC8vIFRPRE86IHJlZGlyZWN0IHRvIGVycm9yIHBhZ2U/XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5yb3V0ZXIucG9zdChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogYC9fb3BlbmRpc3Ryby9fc2VjdXJpdHkvc2FtbC9hY3NgLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCByZXF1ZXN0SWQ6IHN0cmluZyA9ICcnO1xuICAgICAgICBsZXQgbmV4dFVybDogc3RyaW5nID0gJy8nO1xuICAgICAgICBsZXQgcmVkaXJlY3RIYXNoOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29va2llID0gYXdhaXQgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuZ2V0KCk7XG4gICAgICAgICAgaWYgKGNvb2tpZSkge1xuICAgICAgICAgICAgcmVxdWVzdElkID0gY29va2llLnNhbWw/LnJlcXVlc3RJZCB8fCAnJztcbiAgICAgICAgICAgIG5leHRVcmwgPVxuICAgICAgICAgICAgICBjb29raWUuc2FtbD8ubmV4dFVybCB8fFxuICAgICAgICAgICAgICBgJHt0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRofS9hcHAvb3BlbnNlYXJjaC1kYXNoYm9hcmRzYDtcbiAgICAgICAgICAgIHJlZGlyZWN0SGFzaCA9IGNvb2tpZS5zYW1sPy5yZWRpcmVjdEhhc2ggfHwgZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmVxdWVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCh7XG4gICAgICAgICAgICAgIGJvZHk6ICdJbnZhbGlkIHJlcXVlc3RJZCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgY29va2llOiAke2Vycm9yfWApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5hdXRoVG9rZW4oXG4gICAgICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgICAgICByZXF1ZXN0LmJvZHkuU0FNTFJlc3BvbnNlLFxuICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5hdXRoZW50aWNhdGVXaXRoSGVhZGVyKFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICdhdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzLmF1dGhvcml6YXRpb25cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGV4cGlyeVRpbWUgPSBEYXRlLm5vdygpICsgdGhpcy5jb25maWcuc2Vzc2lvbi50dGw7XG4gICAgICAgICAgY29uc3QgW2hlYWRlckVuY29kZWQsIHBheWxvYWRFbmNvZGVkLCBzaWduYXR1cmVdID0gY3JlZGVudGlhbHMuYXV0aG9yaXphdGlvbi5zcGxpdCgnLicpO1xuICAgICAgICAgIGlmICghcGF5bG9hZEVuY29kZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcignSldUIHRva2VuIHBheWxvYWQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRva2VuUGF5bG9hZCA9IEpTT04ucGFyc2UoQnVmZmVyLmZyb20ocGF5bG9hZEVuY29kZWQsICdiYXNlNjQnKS50b1N0cmluZygpKTtcblxuICAgICAgICAgIGlmICh0b2tlblBheWxvYWQuZXhwKSB7XG4gICAgICAgICAgICBleHBpcnlUaW1lID0gcGFyc2VJbnQodG9rZW5QYXlsb2FkLmV4cCwgMTApICogMTAwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb29raWU6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgICAgICAgYXV0aEhlYWRlclZhbHVlRXh0cmE6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0aFR5cGU6IEF1dGhUeXBlLlNBTUwsIC8vIFRPRE86IGNyZWF0ZSBjb25zdGFudFxuICAgICAgICAgICAgZXhwaXJ5VGltZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2V0RXh0cmFBdXRoU3RvcmFnZShcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBjcmVkZW50aWFscy5hdXRob3JpemF0aW9uLFxuICAgICAgICAgICAgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyhjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLnNldChjb29raWUpO1xuXG4gICAgICAgICAgaWYgKHJlZGlyZWN0SGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGAke1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aFxuICAgICAgICAgICAgICAgIH0vYXV0aC9zYW1sL3JlZGlyZWN0VXJsRnJhZ21lbnQ/bmV4dFVybD0ke2VzY2FwZShuZXh0VXJsKX1gLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBuZXh0VXJsLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGBTQU1MIFNQIGluaXRpYXRlZCBhdXRoZW50aWNhdGlvbiB3b3JrZmxvdyBmYWlsZWQ6ICR7ZXJyb3J9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuaW50ZXJuYWxFcnJvcigpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnJvdXRlci5wb3N0KFxuICAgICAge1xuICAgICAgICBwYXRoOiBgL19vcGVuZGlzdHJvL19zZWN1cml0eS9zYW1sL2Fjcy9pZHBpbml0aWF0ZWRgLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjc0VuZHBvaW50ID0gYCR7dGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aH0vX29wZW5kaXN0cm8vX3NlY3VyaXR5L3NhbWwvYWNzL2lkcGluaXRpYXRlZGA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLnNlY3VyaXR5Q2xpZW50LmF1dGhUb2tlbihcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJlcXVlc3QuYm9keS5TQU1MUmVzcG9uc2UsXG4gICAgICAgICAgICBhY3NFbmRwb2ludFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuc2VjdXJpdHlDbGllbnQuYXV0aGVudGljYXRlV2l0aEhlYWRlcihcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAnYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICBjcmVkZW50aWFscy5hdXRob3JpemF0aW9uXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxldCBleHBpcnlUaW1lID0gRGF0ZS5ub3coKSArIHRoaXMuY29uZmlnLnNlc3Npb24udHRsO1xuICAgICAgICAgIGNvbnN0IFtoZWFkZXJFbmNvZGVkLCBwYXlsb2FkRW5jb2RlZCwgc2lnbmF0dXJlXSA9IGNyZWRlbnRpYWxzLmF1dGhvcml6YXRpb24uc3BsaXQoJy4nKTtcbiAgICAgICAgICBpZiAoIXBheWxvYWRFbmNvZGVkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIuZXJyb3IoJ0pXVCB0b2tlbiBwYXlsb2FkIG5vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b2tlblBheWxvYWQgPSBKU09OLnBhcnNlKEJ1ZmZlci5mcm9tKHBheWxvYWRFbmNvZGVkLCAnYmFzZTY0JykudG9TdHJpbmcoKSk7XG4gICAgICAgICAgaWYgKHRva2VuUGF5bG9hZC5leHApIHtcbiAgICAgICAgICAgIGV4cGlyeVRpbWUgPSBwYXJzZUludCh0b2tlblBheWxvYWQuZXhwLCAxMCkgKiAxMDAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNvb2tpZTogU2VjdXJpdHlTZXNzaW9uQ29va2llID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICAgICAgICBhdXRoSGVhZGVyVmFsdWVFeHRyYTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRoVHlwZTogQXV0aFR5cGUuU0FNTCwgLy8gVE9ETzogY3JlYXRlIGNvbnN0YW50XG4gICAgICAgICAgICBleHBpcnlUaW1lLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBzZXRFeHRyYUF1dGhTdG9yYWdlKFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzLmF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICB0aGlzLmdldEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zKGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlcilcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuc2V0KGNvb2tpZSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogYCR7dGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aH0vYXBwL29wZW5zZWFyY2gtZGFzaGJvYXJkc2AsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGBTQU1MIElEUCBpbml0aWF0ZWQgYXV0aGVudGljYXRpb24gd29ya2Zsb3cgZmFpbGVkOiAke2Vycm9yfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5pbnRlcm5hbEVycm9yKCk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGNhcHR1cmVVcmxGcmFnbWVudCBpcyB0aGUgZmlyc3Qgcm91dGUgdGhhdCB3aWxsIGJlIGludm9rZWQgaW4gdGhlIFNQIGluaXRpYXRlZCBsb2dpbi5cbiAgICAvLyBUaGlzIHJvdXRlIHdpbGwgZXhlY3V0ZSB0aGUgY2FwdHVyZVVybEZyYWdtZW50LmpzIHNjcmlwdC5cbiAgICB0aGlzLmNvcmVTZXR1cC5odHRwLnJlc291cmNlcy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJy9hdXRoL3NhbWwvY2FwdHVyZVVybEZyYWdtZW50JyxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgICBuZXh0VXJsOiBzY2hlbWEubWF5YmUoXG4gICAgICAgICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZU5leHRVcmwsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuY2xlYXIoKTtcbiAgICAgICAgY29uc3Qgc2VydmVyQmFzZVBhdGggPSB0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRoO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVuZGVySHRtbCh7XG4gICAgICAgICAgYm9keTogYFxuICAgICAgICAgICAgPCFET0NUWVBFIGh0bWw+XG4gICAgICAgICAgICA8dGl0bGU+T1NEIFNBTUwgQ2FwdHVyZTwvdGl0bGU+XG4gICAgICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cImRhdGE6LFwiPlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIke3NlcnZlckJhc2VQYXRofS9hdXRoL3NhbWwvY2FwdHVyZVVybEZyYWdtZW50LmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoaXMgc2NyaXB0IHdpbGwgc3RvcmUgdGhlIFVSTCBIYXNoIGluIGJyb3dzZXIncyBsb2NhbCBzdG9yYWdlLlxuICAgIHRoaXMuY29yZVNldHVwLmh0dHAucmVzb3VyY2VzLnJlZ2lzdGVyKFxuICAgICAge1xuICAgICAgICBwYXRoOiAnL2F1dGgvc2FtbC9jYXB0dXJlVXJsRnJhZ21lbnQuanMnLFxuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVuZGVySnMoe1xuICAgICAgICAgIGJvZHk6IGBsZXQgc2FtbEhhc2g9d2luZG93LmxvY2F0aW9uLmhhc2gudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgbGV0IHJlZGlyZWN0SGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICBpZiAoc2FtbEhhc2ggIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzYW1sSGFzaCcpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NhbWxIYXNoJywgc2FtbEhhc2gpO1xuICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RIYXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgICAgIGxldCBuZXh0VXJsID0gcGFyYW1zLmdldChcIm5leHRVcmxcIik7XG4gICAgICAgICAgICAgICAgIGZpbmFsVXJsID0gXCJsb2dpbj9uZXh0VXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5leHRVcmwpO1xuICAgICAgICAgICAgICAgICBmaW5hbFVybCArPSBcIiZyZWRpcmVjdEhhc2g9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RIYXNoKTtcbiAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZmluYWxVcmwpO1xuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyAgT25jZSB0aGUgVXNlciBpcyBhdXRoZW50aWNhdGVkIHZpYSB0aGUgJ19vcGVuZGlzdHJvL19zZWN1cml0eS9zYW1sL2Fjcycgcm91dGUsXG4gICAgLy8gIHRoZSBicm93c2VyIHdpbGwgYmUgcmVkaXJlY3RlZCB0byAnL2F1dGgvc2FtbC9yZWRpcmVjdFVybEZyYWdtZW50JyByb3V0ZSxcbiAgICAvLyAgd2hpY2ggd2lsbCBleGVjdXRlIHRoZSByZWRpcmVjdFVybEZyYWdtZW50LmpzLlxuICAgIHRoaXMuY29yZVNldHVwLmh0dHAucmVzb3VyY2VzLnJlZ2lzdGVyKFxuICAgICAge1xuICAgICAgICBwYXRoOiAnL2F1dGgvc2FtbC9yZWRpcmVjdFVybEZyYWdtZW50JyxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgICBuZXh0VXJsOiBzY2hlbWEuYW55KCksXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZlckJhc2VQYXRoID0gdGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aDtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlbmRlckh0bWwoe1xuICAgICAgICAgIGJvZHk6IGBcbiAgICAgICAgICAgIDwhRE9DVFlQRSBodG1sPlxuICAgICAgICAgICAgPHRpdGxlPk9TRCBTQU1MIFN1Y2Nlc3M8L3RpdGxlPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCJkYXRhOixcIj5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiJHtzZXJ2ZXJCYXNlUGF0aH0vYXV0aC9zYW1sL3JlZGlyZWN0VXJsRnJhZ21lbnQuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICBgLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gVGhpcyBzY3JpcHQgd2lsbCBwb3AgdGhlIEhhc2ggZnJvbSBsb2NhbCBzdG9yYWdlIGlmIGl0IGV4aXN0cy5cbiAgICAvLyBBbmQgZm9yd2FyZCB0aGUgYnJvd3NlciB0byB0aGUgbmV4dCB1cmwuXG4gICAgdGhpcy5jb3JlU2V0dXAuaHR0cC5yZXNvdXJjZXMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICcvYXV0aC9zYW1sL3JlZGlyZWN0VXJsRnJhZ21lbnQuanMnLFxuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5yZW5kZXJKcyh7XG4gICAgICAgICAgYm9keTogYGxldCBzYW1sSGFzaD13aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhbWxIYXNoJyk7XG4gICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2FtbEhhc2gnKTtcbiAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgICAgIGxldCBuZXh0VXJsID0gcGFyYW1zLmdldChcIm5leHRVcmxcIik7XG4gICAgICAgICAgICAgICAgIGZpbmFsVXJsID0gbmV4dFVybCArIHNhbWxIYXNoO1xuICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShmaW5hbFVybCk7XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMucm91dGVyLmdldChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogU0FNTF9BVVRIX0xPR09VVCxcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGF1dGhJbmZvID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5hdXRoaW5mbyhyZXF1ZXN0KTtcbiAgICAgICAgICBhd2FpdCBjbGVhclNwbGl0Q29va2llcyhcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICB0aGlzLmdldEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zKGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlcilcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLmNsZWFyKCk7XG4gICAgICAgICAgLy8gVE9ETzogbmVlZCBhIGRlZmF1bHQgbG9nb3V0IHBhZ2VcbiAgICAgICAgICBjb25zdCByZWRpcmVjdFVybCA9XG4gICAgICAgICAgICBhdXRoSW5mby5zc29fbG9nb3V0X3VybCB8fCB0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRoIHx8ICcvJztcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVkaXJlY3RlZCh7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiByZWRpcmVjdFVybCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyLmVycm9yKGBTQU1MIGxvZ291dCBmYWlsZWQ6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJhZFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==