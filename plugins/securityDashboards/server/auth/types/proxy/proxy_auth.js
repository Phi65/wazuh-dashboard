"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyAuthentication = void 0;

var _lodash = require("lodash");

var _routes = require("./routes");

var _authentication_type = require("../authentication_type");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ProxyAuthentication extends _authentication_type.AuthenticationType {
  constructor(config, sessionStorageFactory, router, esClient, coreSetup, logger) {
    var _this$config$proxycac, _this$config$proxycac2, _this$config$proxycac3, _this$config$proxycac4;

    super(config, sessionStorageFactory, router, esClient, coreSetup, logger);

    _defineProperty(this, "type", 'proxy');

    _defineProperty(this, "authType", 'proxycache');

    _defineProperty(this, "userHeaderName", void 0);

    _defineProperty(this, "roleHeaderName", void 0);

    this.userHeaderName = ((_this$config$proxycac = this.config.proxycache) === null || _this$config$proxycac === void 0 ? void 0 : (_this$config$proxycac2 = _this$config$proxycac.user_header) === null || _this$config$proxycac2 === void 0 ? void 0 : _this$config$proxycac2.toLowerCase()) || '';
    this.roleHeaderName = ((_this$config$proxycac3 = this.config.proxycache) === null || _this$config$proxycac3 === void 0 ? void 0 : (_this$config$proxycac4 = _this$config$proxycac3.roles_header) === null || _this$config$proxycac4 === void 0 ? void 0 : _this$config$proxycac4.toLowerCase()) || '';
  }

  async init() {
    const routes = new _routes.ProxyAuthRoutes(this.router, this.config, this.sessionStorageFactory, this.securityClient, this.coreSetup);
    routes.setupRoutes();
  }

  requestIncludesAuthInfo(request) {
    return request.headers[ProxyAuthentication.XFF] && request.headers[this.userHeaderName] ? true : false;
  }

  async getAdditionalAuthHeader(request) {
    var _this$config$proxycac5, _this$config$proxycac6;

    const authHeaders = {};
    const customProxyHeader = (_this$config$proxycac5 = this.config.proxycache) === null || _this$config$proxycac5 === void 0 ? void 0 : _this$config$proxycac5.proxy_header;

    if (customProxyHeader && !request.headers[customProxyHeader] && (_this$config$proxycac6 = this.config.proxycache) !== null && _this$config$proxycac6 !== void 0 && _this$config$proxycac6.proxy_header_ip) {
      // TODO: check how to get remoteIp from OpenSearchDashboardsRequest and add remoteIp to this header
      authHeaders[customProxyHeader] = this.config.proxycache.proxy_header_ip;
    }

    return authHeaders;
  }

  getCookie(request, authInfo) {
    const cookie = {
      username: authInfo.username,
      credentials: {},
      authType: this.authType,
      isAnonymousAuth: false,
      expiryTime: Date.now() + this.config.session.ttl
    };

    if (this.userHeaderName && request.headers[this.userHeaderName]) {
      cookie.credentials[this.userHeaderName] = request.headers[this.userHeaderName];
    }

    if (this.roleHeaderName && request.headers[this.roleHeaderName]) {
      cookie.credentials[this.roleHeaderName] = request.headers[this.roleHeaderName];
    }

    if (request.headers[ProxyAuthentication.XFF]) {
      cookie.credentials[ProxyAuthentication.XFF] = request.headers[ProxyAuthentication.XFF];
    }

    if (request.headers.authorization) {
      cookie.credentials.authorization = request.headers.authorization;
    }

    return cookie;
  }

  async isValidCookie(cookie) {
    return cookie.authType === this.type && cookie.username && cookie.expiryTime && cookie.credentials[this.userHeaderName];
  }

  handleUnauthedRequest(request, response, toolkit) {
    var _this$config$proxycac7;

    const loginEndpoint = (_this$config$proxycac7 = this.config.proxycache) === null || _this$config$proxycac7 === void 0 ? void 0 : _this$config$proxycac7.login_endpoint;

    if (loginEndpoint) {
      return toolkit.redirected({
        location: loginEndpoint
      });
    } else {
      return toolkit.notHandled(); // TODO: redirect to error page?
    }
  }

  buildAuthHeaderFromCookie(cookie) {
    const authHeaders = {};

    if ((0, _lodash.get)(cookie.credentials, this.userHeaderName)) {
      authHeaders[this.userHeaderName] = cookie.credentials[this.userHeaderName];

      if ((0, _lodash.get)(cookie.credentials, this.roleHeaderName)) {
        authHeaders[this.roleHeaderName] = cookie.credentials[this.roleHeaderName];
      }

      if ((0, _lodash.get)(cookie.credentials, ProxyAuthentication.XFF)) {
        authHeaders[ProxyAuthentication.XFF] = cookie.credentials[ProxyAuthentication.XFF];
      }

      return authHeaders;
    } else if ((0, _lodash.get)(cookie.credentials, 'authorization')) {
      authHeaders.authorization = (0, _lodash.get)(cookie.credentials, 'authorization');
      return authHeaders;
    }
  }

}

exports.ProxyAuthentication = ProxyAuthentication;

_defineProperty(ProxyAuthentication, "XFF", 'x-forwarded-for');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3h5X2F1dGgudHMiXSwibmFtZXMiOlsiUHJveHlBdXRoZW50aWNhdGlvbiIsIkF1dGhlbnRpY2F0aW9uVHlwZSIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwic2Vzc2lvblN0b3JhZ2VGYWN0b3J5Iiwicm91dGVyIiwiZXNDbGllbnQiLCJjb3JlU2V0dXAiLCJsb2dnZXIiLCJ1c2VySGVhZGVyTmFtZSIsInByb3h5Y2FjaGUiLCJ1c2VyX2hlYWRlciIsInRvTG93ZXJDYXNlIiwicm9sZUhlYWRlck5hbWUiLCJyb2xlc19oZWFkZXIiLCJpbml0Iiwicm91dGVzIiwiUHJveHlBdXRoUm91dGVzIiwic2VjdXJpdHlDbGllbnQiLCJzZXR1cFJvdXRlcyIsInJlcXVlc3RJbmNsdWRlc0F1dGhJbmZvIiwicmVxdWVzdCIsImhlYWRlcnMiLCJYRkYiLCJnZXRBZGRpdGlvbmFsQXV0aEhlYWRlciIsImF1dGhIZWFkZXJzIiwiY3VzdG9tUHJveHlIZWFkZXIiLCJwcm94eV9oZWFkZXIiLCJwcm94eV9oZWFkZXJfaXAiLCJnZXRDb29raWUiLCJhdXRoSW5mbyIsImNvb2tpZSIsInVzZXJuYW1lIiwiY3JlZGVudGlhbHMiLCJhdXRoVHlwZSIsImlzQW5vbnltb3VzQXV0aCIsImV4cGlyeVRpbWUiLCJEYXRlIiwibm93Iiwic2Vzc2lvbiIsInR0bCIsImF1dGhvcml6YXRpb24iLCJpc1ZhbGlkQ29va2llIiwidHlwZSIsImhhbmRsZVVuYXV0aGVkUmVxdWVzdCIsInJlc3BvbnNlIiwidG9vbGtpdCIsImxvZ2luRW5kcG9pbnQiLCJsb2dpbl9lbmRwb2ludCIsInJlZGlyZWN0ZWQiLCJsb2NhdGlvbiIsIm5vdEhhbmRsZWQiLCJidWlsZEF1dGhIZWFkZXJGcm9tQ29va2llIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBZUE7O0FBZUE7O0FBQ0E7Ozs7QUFHTyxNQUFNQSxtQkFBTixTQUFrQ0MsdUNBQWxDLENBQXFEO0FBVTFEQyxFQUFBQSxXQUFXLENBQ1RDLE1BRFMsRUFF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LENBQUMsS0FBS2hCLGNBQU4sQ0FBWCxHQUFtQ3NCLE1BQU0sQ0FBQ0UsV0FBUCxDQUFtQixLQUFLeEIsY0FBeEIsQ0FBbkM7O0FBQ0EsVUFBSSxpQkFBSXNCLE1BQU0sQ0FBQ0UsV0FBWCxFQUF3QixLQUFLcEIsY0FBN0IsQ0FBSixFQUFrRDtBQUNoRFksUUFBQUEsV0FBVyxDQUFDLEtBQUtaLGNBQU4sQ0FBWCxHQUFtQ2tCLE1BQU0sQ0FBQ0UsV0FBUCxDQUFtQixLQUFLcEIsY0FBeEIsQ0FBbkM7QUFDRDs7QUFDRCxVQUFJLGlCQUFJa0IsTUFBTSxDQUFDRSxXQUFYLEVBQXdCakMsbUJBQW1CLENBQUN1QixHQUE1QyxDQUFKLEVBQXNEO0FBQ3BERSxRQUFBQSxXQUFXLENBQUN6QixtQkFBbUIsQ0FBQ3VCLEdBQXJCLENBQVgsR0FBdUNRLE1BQU0sQ0FBQ0UsV0FBUCxDQUFtQmpDLG1CQUFtQixDQUFDdUIsR0FBdkMsQ0FBdkM7QUFDRDs7QUFDRCxhQUFPRSxXQUFQO0FBQ0QsS0FURCxNQVNPLElBQUksaUJBQUlNLE1BQU0sQ0FBQ0UsV0FBWCxFQUF3QixlQUF4QixDQUFKLEVBQThDO0FBQ25EUixNQUFBQSxXQUFXLENBQUNnQixhQUFaLEdBQTRCLGlCQUFJVixNQUFNLENBQUNFLFdBQVgsRUFBd0IsZUFBeEIsQ0FBNUI7QUFDQSxhQUFPUixXQUFQO0FBQ0Q7QUFDRjs7QUF0SHlEOzs7O2dCQUEvQ3pCLG1CLFNBQzJCLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5LFxuICBJUm91dGVyLFxuICBJTGVnYWN5Q2x1c3RlckNsaWVudCxcbiAgQ29yZVNldHVwLFxuICBMb2dnZXIsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgTGlmZWN5Y2xlUmVzcG9uc2VGYWN0b3J5LFxuICBBdXRoVG9vbGtpdCxcbiAgSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UsXG4gIEF1dGhSZXN1bHQsXG59IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuaW1wb3J0IHsgU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlIH0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXNzaW9uQ29va2llIH0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9zZWN1cml0eV9jb29raWUnO1xuaW1wb3J0IHsgUHJveHlBdXRoUm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25UeXBlIH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb25fdHlwZSc7XG5pbXBvcnQgeyBpc1ZhbGlkVGVuYW50IH0gZnJvbSAnLi4vLi4vLi4vbXVsdGl0ZW5hbmN5L3RlbmFudF9yZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm94eUF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgQXV0aGVudGljYXRpb25UeXBlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgWEZGOiBzdHJpbmcgPSAneC1mb3J3YXJkZWQtZm9yJztcblxuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gJ3Byb3h5JztcblxuICBwcml2YXRlIHJlYWRvbmx5IGF1dGhUeXBlOiBzdHJpbmcgPSAncHJveHljYWNoZSc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSB1c2VySGVhZGVyTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IHJvbGVIZWFkZXJOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlnOiBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGUsXG4gICAgc2Vzc2lvblN0b3JhZ2VGYWN0b3J5OiBTZXNzaW9uU3RvcmFnZUZhY3Rvcnk8U2VjdXJpdHlTZXNzaW9uQ29va2llPixcbiAgICByb3V0ZXI6IElSb3V0ZXIsXG4gICAgZXNDbGllbnQ6IElMZWdhY3lDbHVzdGVyQ2xpZW50LFxuICAgIGNvcmVTZXR1cDogQ29yZVNldHVwLFxuICAgIGxvZ2dlcjogTG9nZ2VyXG4gICkge1xuICAgIHN1cGVyKGNvbmZpZywgc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LCByb3V0ZXIsIGVzQ2xpZW50LCBjb3JlU2V0dXAsIGxvZ2dlcik7XG5cbiAgICB0aGlzLnVzZXJIZWFkZXJOYW1lID0gdGhpcy5jb25maWcucHJveHljYWNoZT8udXNlcl9oZWFkZXI/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG4gICAgdGhpcy5yb2xlSGVhZGVyTmFtZSA9IHRoaXMuY29uZmlnLnByb3h5Y2FjaGU/LnJvbGVzX2hlYWRlcj8udG9Mb3dlckNhc2UoKSB8fCAnJztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbml0KCkge1xuICAgIGNvbnN0IHJvdXRlcyA9IG5ldyBQcm94eUF1dGhSb3V0ZXMoXG4gICAgICB0aGlzLnJvdXRlcixcbiAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnksXG4gICAgICB0aGlzLnNlY3VyaXR5Q2xpZW50LFxuICAgICAgdGhpcy5jb3JlU2V0dXBcbiAgICApO1xuICAgIHJvdXRlcy5zZXR1cFJvdXRlcygpO1xuICB9XG5cbiAgcmVxdWVzdEluY2x1ZGVzQXV0aEluZm8ocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlcXVlc3QuaGVhZGVyc1tQcm94eUF1dGhlbnRpY2F0aW9uLlhGRl0gJiYgcmVxdWVzdC5oZWFkZXJzW3RoaXMudXNlckhlYWRlck5hbWVdXG4gICAgICA/IHRydWVcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBhc3luYyBnZXRBZGRpdGlvbmFsQXV0aEhlYWRlcihyZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGF1dGhIZWFkZXJzOiBhbnkgPSB7fTtcbiAgICBjb25zdCBjdXN0b21Qcm94eUhlYWRlciA9IHRoaXMuY29uZmlnLnByb3h5Y2FjaGU/LnByb3h5X2hlYWRlcjtcbiAgICBpZiAoXG4gICAgICBjdXN0b21Qcm94eUhlYWRlciAmJlxuICAgICAgIXJlcXVlc3QuaGVhZGVyc1tjdXN0b21Qcm94eUhlYWRlcl0gJiZcbiAgICAgIHRoaXMuY29uZmlnLnByb3h5Y2FjaGU/LnByb3h5X2hlYWRlcl9pcFxuICAgICkge1xuICAgICAgLy8gVE9ETzogY2hlY2sgaG93IHRvIGdldCByZW1vdGVJcCBmcm9tIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCBhbmQgYWRkIHJlbW90ZUlwIHRvIHRoaXMgaGVhZGVyXG4gICAgICBhdXRoSGVhZGVyc1tjdXN0b21Qcm94eUhlYWRlcl0gPSB0aGlzLmNvbmZpZy5wcm94eWNhY2hlIS5wcm94eV9oZWFkZXJfaXA7XG4gICAgfVxuICAgIHJldHVybiBhdXRoSGVhZGVycztcbiAgfVxuXG4gIGdldENvb2tpZShyZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsIGF1dGhJbmZvOiBhbnkpOiBTZWN1cml0eVNlc3Npb25Db29raWUge1xuICAgIGNvbnN0IGNvb2tpZTogU2VjdXJpdHlTZXNzaW9uQ29va2llID0ge1xuICAgICAgdXNlcm5hbWU6IGF1dGhJbmZvLnVzZXJuYW1lLFxuICAgICAgY3JlZGVudGlhbHM6IHt9LFxuICAgICAgYXV0aFR5cGU6IHRoaXMuYXV0aFR5cGUsXG4gICAgICBpc0Fub255bW91c0F1dGg6IGZhbHNlLFxuICAgICAgZXhwaXJ5VGltZTogRGF0ZS5ub3coKSArIHRoaXMuY29uZmlnLnNlc3Npb24udHRsLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy51c2VySGVhZGVyTmFtZSAmJiByZXF1ZXN0LmhlYWRlcnNbdGhpcy51c2VySGVhZGVyTmFtZV0pIHtcbiAgICAgIGNvb2tpZS5jcmVkZW50aWFsc1t0aGlzLnVzZXJIZWFkZXJOYW1lXSA9IHJlcXVlc3QuaGVhZGVyc1t0aGlzLnVzZXJIZWFkZXJOYW1lXTtcbiAgICB9XG4gICAgaWYgKHRoaXMucm9sZUhlYWRlck5hbWUgJiYgcmVxdWVzdC5oZWFkZXJzW3RoaXMucm9sZUhlYWRlck5hbWVdKSB7XG4gICAgICBjb29raWUuY3JlZGVudGlhbHNbdGhpcy5yb2xlSGVhZGVyTmFtZV0gPSByZXF1ZXN0LmhlYWRlcnNbdGhpcy5yb2xlSGVhZGVyTmFtZV07XG4gICAgfVxuICAgIGlmIChyZXF1ZXN0LmhlYWRlcnNbUHJveHlBdXRoZW50aWNhdGlvbi5YRkZdKSB7XG4gICAgICBjb29raWUuY3JlZGVudGlhbHNbUHJveHlBdXRoZW50aWNhdGlvbi5YRkZdID0gcmVxdWVzdC5oZWFkZXJzW1Byb3h5QXV0aGVudGljYXRpb24uWEZGXTtcbiAgICB9XG4gICAgaWYgKHJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgICBjb29raWUuY3JlZGVudGlhbHMuYXV0aG9yaXphdGlvbiA9IHJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gY29va2llO1xuICB9XG5cbiAgYXN5bmMgaXNWYWxpZENvb2tpZShjb29raWU6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoXG4gICAgICBjb29raWUuYXV0aFR5cGUgPT09IHRoaXMudHlwZSAmJlxuICAgICAgY29va2llLnVzZXJuYW1lICYmXG4gICAgICBjb29raWUuZXhwaXJ5VGltZSAmJlxuICAgICAgY29va2llLmNyZWRlbnRpYWxzW3RoaXMudXNlckhlYWRlck5hbWVdXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZVVuYXV0aGVkUmVxdWVzdChcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IExpZmVjeWNsZVJlc3BvbnNlRmFjdG9yeSxcbiAgICB0b29sa2l0OiBBdXRoVG9vbGtpdFxuICApOiBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSB8IEF1dGhSZXN1bHQge1xuICAgIGNvbnN0IGxvZ2luRW5kcG9pbnQgPSB0aGlzLmNvbmZpZy5wcm94eWNhY2hlPy5sb2dpbl9lbmRwb2ludDtcbiAgICBpZiAobG9naW5FbmRwb2ludCkge1xuICAgICAgcmV0dXJuIHRvb2xraXQucmVkaXJlY3RlZCh7XG4gICAgICAgIGxvY2F0aW9uOiBsb2dpbkVuZHBvaW50LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0b29sa2l0Lm5vdEhhbmRsZWQoKTsgLy8gVE9ETzogcmVkaXJlY3QgdG8gZXJyb3IgcGFnZT9cbiAgICB9XG4gIH1cblxuICBidWlsZEF1dGhIZWFkZXJGcm9tQ29va2llKGNvb2tpZTogU2VjdXJpdHlTZXNzaW9uQ29va2llKTogYW55IHtcbiAgICBjb25zdCBhdXRoSGVhZGVyczogYW55ID0ge307XG4gICAgaWYgKGdldChjb29raWUuY3JlZGVudGlhbHMsIHRoaXMudXNlckhlYWRlck5hbWUpKSB7XG4gICAgICBhdXRoSGVhZGVyc1t0aGlzLnVzZXJIZWFkZXJOYW1lXSA9IGNvb2tpZS5jcmVkZW50aWFsc1t0aGlzLnVzZXJIZWFkZXJOYW1lXTtcbiAgICAgIGlmIChnZXQoY29va2llLmNyZWRlbnRpYWxzLCB0aGlzLnJvbGVIZWFkZXJOYW1lKSkge1xuICAgICAgICBhdXRoSGVhZGVyc1t0aGlzLnJvbGVIZWFkZXJOYW1lXSA9IGNvb2tpZS5jcmVkZW50aWFsc1t0aGlzLnJvbGVIZWFkZXJOYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmIChnZXQoY29va2llLmNyZWRlbnRpYWxzLCBQcm94eUF1dGhlbnRpY2F0aW9uLlhGRikpIHtcbiAgICAgICAgYXV0aEhlYWRlcnNbUHJveHlBdXRoZW50aWNhdGlvbi5YRkZdID0gY29va2llLmNyZWRlbnRpYWxzW1Byb3h5QXV0aGVudGljYXRpb24uWEZGXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhdXRoSGVhZGVycztcbiAgICB9IGVsc2UgaWYgKGdldChjb29raWUuY3JlZGVudGlhbHMsICdhdXRob3JpemF0aW9uJykpIHtcbiAgICAgIGF1dGhIZWFkZXJzLmF1dGhvcml6YXRpb24gPSBnZXQoY29va2llLmNyZWRlbnRpYWxzLCAnYXV0aG9yaXphdGlvbicpO1xuICAgICAgcmV0dXJuIGF1dGhIZWFkZXJzO1xuICAgIH1cbiAgfVxufVxuIl19