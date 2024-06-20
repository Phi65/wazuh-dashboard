"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BasicAuthentication", {
  enumerable: true,
  get: function () {
    return _basic_auth.BasicAuthentication;
  }
});
Object.defineProperty(exports, "JwtAuthentication", {
  enumerable: true,
  get: function () {
    return _jwt_auth.JwtAuthentication;
  }
});
Object.defineProperty(exports, "MultipleAuthentication", {
  enumerable: true,
  get: function () {
    return _multi_auth.MultipleAuthentication;
  }
});
Object.defineProperty(exports, "OpenIdAuthentication", {
  enumerable: true,
  get: function () {
    return _openid_auth.OpenIdAuthentication;
  }
});
Object.defineProperty(exports, "ProxyAuthentication", {
  enumerable: true,
  get: function () {
    return _proxy_auth.ProxyAuthentication;
  }
});
Object.defineProperty(exports, "SamlAuthentication", {
  enumerable: true,
  get: function () {
    return _saml_auth.SamlAuthentication;
  }
});

var _basic_auth = require("./basic/basic_auth");

var _jwt_auth = require("./jwt/jwt_auth");

var _openid_auth = require("./openid/openid_auth");

var _proxy_auth = require("./proxy/proxy_auth");

var _saml_auth = require("./saml/saml_auth");

var _multi_auth = require("./multiple/multi_auth");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgeyBCYXNpY0F1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9iYXNpYy9iYXNpY19hdXRoJztcbmV4cG9ydCB7IEp3dEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9qd3Qvand0X2F1dGgnO1xuZXhwb3J0IHsgT3BlbklkQXV0aGVudGljYXRpb24gfSBmcm9tICcuL29wZW5pZC9vcGVuaWRfYXV0aCc7XG5leHBvcnQgeyBQcm94eUF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9wcm94eS9wcm94eV9hdXRoJztcbmV4cG9ydCB7IFNhbWxBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vc2FtbC9zYW1sX2F1dGgnO1xuZXhwb3J0IHsgTXVsdGlwbGVBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vbXVsdGlwbGUvbXVsdGlfYXV0aCc7XG4iXX0=