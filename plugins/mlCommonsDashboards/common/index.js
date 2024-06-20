"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PLUGIN_ID: true,
  PLUGIN_NAME: true,
  PLUGIN_DESC: true
};
exports.PLUGIN_NAME = exports.PLUGIN_ID = exports.PLUGIN_DESC = void 0;

var _status = require("./status");

Object.keys(_status).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _status[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _status[key];
    }
  });
});

var _model = require("./model");

Object.keys(_model).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _model[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _model[key];
    }
  });
});

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const PLUGIN_ID = 'ml-commons-dashboards';
exports.PLUGIN_ID = PLUGIN_ID;
const PLUGIN_NAME = 'Machine Learning';
exports.PLUGIN_NAME = PLUGIN_NAME;
const PLUGIN_DESC = `ML Commons for OpenSearch eases the development of machine learning features by providing a set of common machine learning (ML) algorithms through transport and REST API calls. Those calls choose the right nodes and resources for each ML request and monitors ML tasks to ensure uptime. This allows you to leverage existing open-source ML algorithms and reduce the effort required to develop new ML features.`;
exports.PLUGIN_DESC = PLUGIN_DESC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbIlBMVUdJTl9JRCIsIlBMVUdJTl9OQU1FIiwiUExVR0lOX0RFU0MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFWQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU1BLFNBQVMsR0FBRyx1QkFBbEI7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHLGtCQUFwQjs7QUFDQSxNQUFNQyxXQUFXLEdBQUkseVpBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgUExVR0lOX0lEID0gJ21sLWNvbW1vbnMtZGFzaGJvYXJkcyc7XG5leHBvcnQgY29uc3QgUExVR0lOX05BTUUgPSAnTWFjaGluZSBMZWFybmluZyc7XG5leHBvcnQgY29uc3QgUExVR0lOX0RFU0MgPSBgTUwgQ29tbW9ucyBmb3IgT3BlblNlYXJjaCBlYXNlcyB0aGUgZGV2ZWxvcG1lbnQgb2YgbWFjaGluZSBsZWFybmluZyBmZWF0dXJlcyBieSBwcm92aWRpbmcgYSBzZXQgb2YgY29tbW9uIG1hY2hpbmUgbGVhcm5pbmcgKE1MKSBhbGdvcml0aG1zIHRocm91Z2ggdHJhbnNwb3J0IGFuZCBSRVNUIEFQSSBjYWxscy4gVGhvc2UgY2FsbHMgY2hvb3NlIHRoZSByaWdodCBub2RlcyBhbmQgcmVzb3VyY2VzIGZvciBlYWNoIE1MIHJlcXVlc3QgYW5kIG1vbml0b3JzIE1MIHRhc2tzIHRvIGVuc3VyZSB1cHRpbWUuIFRoaXMgYWxsb3dzIHlvdSB0byBsZXZlcmFnZSBleGlzdGluZyBvcGVuLXNvdXJjZSBNTCBhbGdvcml0aG1zIGFuZCByZWR1Y2UgdGhlIGVmZm9ydCByZXF1aXJlZCB0byBkZXZlbG9wIG5ldyBNTCBmZWF0dXJlcy5gO1xuXG5leHBvcnQgKiBmcm9tICcuL3N0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbiJdfQ==