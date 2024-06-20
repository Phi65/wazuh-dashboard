"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyAuthRoutes = void 0;

var _configSchema = require("@osd/config-schema");

var _next_url = require("../../../utils/next_url");

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
class ProxyAuthRoutes {
  constructor(router, config, sessionStorageFactory, securityClient, coreSetup) {
    this.router = router;
    this.config = config;
    this.sessionStorageFactory = sessionStorageFactory;
    this.securityClient = securityClient;
    this.coreSetup = coreSetup;
  }

  setupRoutes() {
    this.router.get({
      path: `/auth/proxy/login`,
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          }))
        })
      },
      options: {
        // TODO: set to false?
        authRequired: 'optional'
      }
    }, async (context, request, response) => {
      var _this$config$proxycac;

      if (request.auth.isAuthenticated) {
        const nextUrl = request.query.nextUrl || `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`;
        response.redirected({
          headers: {
            location: nextUrl
          }
        });
      }

      const loginEndpoint = (_this$config$proxycac = this.config.proxycache) === null || _this$config$proxycac === void 0 ? void 0 : _this$config$proxycac.login_endpoint;

      if (loginEndpoint) {
        return response.redirected({
          headers: {
            location: loginEndpoint
          }
        });
      } else {
        return response.badRequest();
      }
    });
    this.router.post({
      path: `/auth/proxy/logout`,
      validate: false
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      return response.ok();
    });
  }

}

exports.ProxyAuthRoutes = ProxyAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6WyJQcm94eUF1dGhSb3V0ZXMiLCJjb25zdHJ1Y3RvciIsInJvdXRlciIsImNvbmZpZyIsInNlc3Npb25TdG9yYWdlRmFjdG9yeSIsInNlY3VyaXR5Q2xpZW50IiwiY29yZVNldHVwIiwic2V0dXBSb3V0ZXMiLCJnZXQiLCJwYXRoIiwidmFsaWRhdGUiLCJxdWVyeSIsInNjaGVtYSIsIm9iamVjdCIsIm5leHRVcmwiLCJtYXliZSIsInN0cmluZyIsInZhbGlkYXRlTmV4dFVybCIsIm9wdGlvbnMiLCJhdXRoUmVxdWlyZWQiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXV0aCIsImlzQXV0aGVudGljYXRlZCIsImh0dHAiLCJiYXNlUGF0aCIsInNlcnZlckJhc2VQYXRoIiwicmVkaXJlY3RlZCIsImhlYWRlcnMiLCJsb2NhdGlvbiIsImxvZ2luRW5kcG9pbnQiLCJwcm94eWNhY2hlIiwibG9naW5fZW5kcG9pbnQiLCJiYWRSZXF1ZXN0IiwicG9zdCIsImFzU2NvcGVkIiwiY2xlYXIiLCJvayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWVBOztBQU1BOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVU8sTUFBTUEsZUFBTixDQUFzQjtBQUMzQkMsRUFBQUEsV0FBVyxDQUNRQyxNQURSLEVBRVFDLE1BRlIsRUFHUUMscUJBSFIsRUFJUUMsY0FKUixFQUtRQyxTQUxSLEVBTVQ7QUFBQSxTQUxpQkosTUFLakIsR0FMaUJBLE1BS2pCO0FBQUEsU0FKaUJDLE1BSWpCLEdBSmlCQSxNQUlqQjtBQUFBLFNBSGlCQyxxQkFHakIsR0FIaUJBLHFCQUdqQjtBQUFBLFNBRmlCQyxjQUVqQixHQUZpQkEsY0FFakI7QUFBQSxTQURpQkMsU0FDakIsR0FEaUJBLFNBQ2pCO0FBQUU7O0FBRUdDLEVBQUFBLFdBQVcsR0FBRztBQUNuQixTQUFLTCxNQUFMLENBQVlNLEdBQVosQ0FDRTtBQUNFQyxNQUFBQSxJQUFJLEVBQUcsbUJBRFQ7QUFFRUMsTUFBQUEsUUFBUSxFQUFFO0FBQ1JDLFFBQUFBLEtBQUssRUFBRUMscUJBQU9DLE1BQVAsQ0FBYztBQUNuQkMsVUFBQUEsT0FBTyxFQUFFRixxQkFBT0csS0FBUCxDQUNQSCxxQkFBT0ksTUFBUCxDQUFjO0FBQ1pOLFlBQUFBLFFBQVEsRUFBRU87QUFERSxXQUFkLENBRE87QUFEVSxTQUFkO0FBREMsT0FGWjtBQVdFQyxNQUFBQSxPQUFPLEVBQUU7QUFDUDtBQUNBQyxRQUFBQSxZQUFZLEVBQUU7QUFGUDtBQVhYLEtBREYsRUFpQkUsT0FBT0MsT0FBUCxFQUFnQkMsT0FBaEIsRUFBeUJDLFFBQXpCLEtBQXNDO0FBQUE7O0FBQ3BDLFVBQUlELE9BQU8sQ0FBQ0UsSUFBUixDQUFhQyxlQUFqQixFQUFrQztBQUNoQyxjQUFNVixPQUFPLEdBQ1hPLE9BQU8sQ0FBQ1YsS0FBUixDQUFjRyxPQUFkLElBQ0MsR0FBRSxLQUFLUixTQUFMLENBQWVtQixJQUFmLENBQW9CQyxRQUFwQixDQUE2QkMsY0FBZSw0QkFGakQ7QUFHQUwsUUFBQUEsUUFBUSxDQUFDTSxVQUFULENBQW9CO0FBQ2xCQyxVQUFBQSxPQUFPLEVBQUU7QUFDUEMsWUFBQUEsUUFBUSxFQUFFaEI7QUFESDtBQURTLFNBQXBCO0FBS0Q7O0FBRUQsWUFBTWlCLGFBQWEsNEJBQUcsS0FBSzVCLE1BQUwsQ0FBWTZCLFVBQWYsMERBQUcsc0JBQXdCQyxjQUE5Qzs7QUFDQSxVQUFJRixhQUFKLEVBQW1CO0FBQ2pCLGVBQU9ULFFBQVEsQ0FBQ00sVUFBVCxDQUFvQjtBQUN6QkMsVUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFlBQUFBLFFBQVEsRUFBRUM7QUFESDtBQURnQixTQUFwQixDQUFQO0FBS0QsT0FORCxNQU1PO0FBQ0wsZUFBT1QsUUFBUSxDQUFDWSxVQUFULEVBQVA7QUFDRDtBQUNGLEtBdkNIO0FBMENBLFNBQUtoQyxNQUFMLENBQVlpQyxJQUFaLENBQ0U7QUFDRTFCLE1BQUFBLElBQUksRUFBRyxvQkFEVDtBQUVFQyxNQUFBQSxRQUFRLEVBQUU7QUFGWixLQURGLEVBS0UsT0FBT1UsT0FBUCxFQUFnQkMsT0FBaEIsRUFBeUJDLFFBQXpCLEtBQXNDO0FBQ3BDLFdBQUtsQixxQkFBTCxDQUEyQmdDLFFBQTNCLENBQW9DZixPQUFwQyxFQUE2Q2dCLEtBQTdDO0FBQ0EsYUFBT2YsUUFBUSxDQUFDZ0IsRUFBVCxFQUFQO0FBQ0QsS0FSSDtBQVVEOztBQTlEMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5pbXBvcnQgeyBJUm91dGVyLCBTZXNzaW9uU3RvcmFnZUZhY3RvcnkgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXNzaW9uQ29va2llIH0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9zZWN1cml0eV9jb29raWUnO1xuaW1wb3J0IHsgU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlIH0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHsgU2VjdXJpdHlDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9iYWNrZW5kL29wZW5zZWFyY2hfc2VjdXJpdHlfY2xpZW50JztcbmltcG9ydCB7IENvcmVTZXR1cCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZU5leHRVcmwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9uZXh0X3VybCc7XG5cbmV4cG9ydCBjbGFzcyBQcm94eUF1dGhSb3V0ZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogSVJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VGYWN0b3J5OiBTZXNzaW9uU3RvcmFnZUZhY3Rvcnk8U2VjdXJpdHlTZXNzaW9uQ29va2llPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlY3VyaXR5Q2xpZW50OiBTZWN1cml0eUNsaWVudCxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvcmVTZXR1cDogQ29yZVNldHVwXG4gICkge31cblxuICBwdWJsaWMgc2V0dXBSb3V0ZXMoKSB7XG4gICAgdGhpcy5yb3V0ZXIuZ2V0KFxuICAgICAge1xuICAgICAgICBwYXRoOiBgL2F1dGgvcHJveHkvbG9naW5gLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIHF1ZXJ5OiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICAgIG5leHRVcmw6IHNjaGVtYS5tYXliZShcbiAgICAgICAgICAgICAgc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IHZhbGlkYXRlTmV4dFVybCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAvLyBUT0RPOiBzZXQgdG8gZmFsc2U/XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiAnb3B0aW9uYWwnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVxdWVzdC5hdXRoLmlzQXV0aGVudGljYXRlZCkge1xuICAgICAgICAgIGNvbnN0IG5leHRVcmwgPVxuICAgICAgICAgICAgcmVxdWVzdC5xdWVyeS5uZXh0VXJsIHx8XG4gICAgICAgICAgICBgJHt0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRofS9hcHAvb3BlbnNlYXJjaC1kYXNoYm9hcmRzYDtcbiAgICAgICAgICByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IG5leHRVcmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9naW5FbmRwb2ludCA9IHRoaXMuY29uZmlnLnByb3h5Y2FjaGU/LmxvZ2luX2VuZHBvaW50O1xuICAgICAgICBpZiAobG9naW5FbmRwb2ludCkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGxvZ2luRW5kcG9pbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5yb3V0ZXIucG9zdChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogYC9hdXRoL3Byb3h5L2xvZ291dGAsXG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19