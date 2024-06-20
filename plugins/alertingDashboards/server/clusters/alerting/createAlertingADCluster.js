"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAlertingADCluster;

var _adPlugin = _interopRequireDefault(require("./adPlugin"));

var _constants = require("../../services/utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function createAlertingADCluster(core, globalConfig) {
  const {
    customHeaders,
    ...rest
  } = globalConfig.opensearch;
  return core.opensearch.legacy.createClient(_constants.CLUSTER.AD_ALERTING, {
    plugins: [_adPlugin.default],
    // Currently we are overriding any headers with our own since we explicitly required User-Agent to be OpenSearch Dashboards
    // for integration with our backend plugin.
    // TODO: Change our required header to x-<Header> to avoid overriding
    customHeaders: { ...customHeaders,
      ..._constants.DEFAULT_HEADERS
    },
    ...rest
  });
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUFsZXJ0aW5nQURDbHVzdGVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0aW5nQURDbHVzdGVyIiwiY29yZSIsImdsb2JhbENvbmZpZyIsImN1c3RvbUhlYWRlcnMiLCJyZXN0Iiwib3BlbnNlYXJjaCIsImxlZ2FjeSIsImNyZWF0ZUNsaWVudCIsIkNMVVNURVIiLCJBRF9BTEVSVElORyIsInBsdWdpbnMiLCJhbGVydGluZ0FEUGx1Z2luIiwiREVGQVVMVF9IRUFERVJTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBQ0E7Ozs7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUtlLFNBQVNBLHVCQUFULENBQWlDQyxJQUFqQyxFQUF1Q0MsWUFBdkMsRUFBcUQ7QUFDbEUsUUFBTTtBQUFFQyxJQUFBQSxhQUFGO0FBQWlCLE9BQUdDO0FBQXBCLE1BQTZCRixZQUFZLENBQUNHLFVBQWhEO0FBQ0EsU0FBT0osSUFBSSxDQUFDSSxVQUFMLENBQWdCQyxNQUFoQixDQUF1QkMsWUFBdkIsQ0FBb0NDLG1CQUFRQyxXQUE1QyxFQUF5RDtBQUM5REMsSUFBQUEsT0FBTyxFQUFFLENBQUNDLGlCQUFELENBRHFEO0FBRTlEO0FBQ0E7QUFDQTtBQUNBUixJQUFBQSxhQUFhLEVBQUUsRUFBRSxHQUFHQSxhQUFMO0FBQW9CLFNBQUdTO0FBQXZCLEtBTCtDO0FBTTlELE9BQUdSO0FBTjJELEdBQXpELENBQVA7QUFRRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IGFsZXJ0aW5nQURQbHVnaW4gZnJvbSAnLi9hZFBsdWdpbic7XG5pbXBvcnQgeyBDTFVTVEVSLCBERUZBVUxUX0hFQURFUlMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBbGVydGluZ0FEQ2x1c3Rlcihjb3JlLCBnbG9iYWxDb25maWcpIHtcbiAgY29uc3QgeyBjdXN0b21IZWFkZXJzLCAuLi5yZXN0IH0gPSBnbG9iYWxDb25maWcub3BlbnNlYXJjaDtcbiAgcmV0dXJuIGNvcmUub3BlbnNlYXJjaC5sZWdhY3kuY3JlYXRlQ2xpZW50KENMVVNURVIuQURfQUxFUlRJTkcsIHtcbiAgICBwbHVnaW5zOiBbYWxlcnRpbmdBRFBsdWdpbl0sXG4gICAgLy8gQ3VycmVudGx5IHdlIGFyZSBvdmVycmlkaW5nIGFueSBoZWFkZXJzIHdpdGggb3VyIG93biBzaW5jZSB3ZSBleHBsaWNpdGx5IHJlcXVpcmVkIFVzZXItQWdlbnQgdG8gYmUgT3BlblNlYXJjaCBEYXNoYm9hcmRzXG4gICAgLy8gZm9yIGludGVncmF0aW9uIHdpdGggb3VyIGJhY2tlbmQgcGx1Z2luLlxuICAgIC8vIFRPRE86IENoYW5nZSBvdXIgcmVxdWlyZWQgaGVhZGVyIHRvIHgtPEhlYWRlcj4gdG8gYXZvaWQgb3ZlcnJpZGluZ1xuICAgIGN1c3RvbUhlYWRlcnM6IHsgLi4uY3VzdG9tSGVhZGVycywgLi4uREVGQVVMVF9IRUFERVJTIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59XG4iXX0=