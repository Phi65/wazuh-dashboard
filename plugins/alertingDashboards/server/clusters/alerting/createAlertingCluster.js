"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAlertingCluster;

var _alertingPlugin = _interopRequireDefault(require("./alertingPlugin"));

var _constants = require("../../services/utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function createAlertingCluster(core, globalConfig) {
  const {
    customHeaders,
    ...rest
  } = globalConfig.opensearch;
  return core.opensearch.legacy.createClient(_constants.CLUSTER.ALERTING, {
    plugins: [_alertingPlugin.default],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUFsZXJ0aW5nQ2x1c3Rlci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVBbGVydGluZ0NsdXN0ZXIiLCJjb3JlIiwiZ2xvYmFsQ29uZmlnIiwiY3VzdG9tSGVhZGVycyIsInJlc3QiLCJvcGVuc2VhcmNoIiwibGVnYWN5IiwiY3JlYXRlQ2xpZW50IiwiQ0xVU1RFUiIsIkFMRVJUSU5HIiwicGx1Z2lucyIsImFsZXJ0aW5nUGx1Z2luIiwiREVGQVVMVF9IRUFERVJTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBQ0E7Ozs7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUtlLFNBQVNBLHFCQUFULENBQStCQyxJQUEvQixFQUFxQ0MsWUFBckMsRUFBbUQ7QUFDaEUsUUFBTTtBQUFFQyxJQUFBQSxhQUFGO0FBQWlCLE9BQUdDO0FBQXBCLE1BQTZCRixZQUFZLENBQUNHLFVBQWhEO0FBQ0EsU0FBT0osSUFBSSxDQUFDSSxVQUFMLENBQWdCQyxNQUFoQixDQUF1QkMsWUFBdkIsQ0FBb0NDLG1CQUFRQyxRQUE1QyxFQUFzRDtBQUMzREMsSUFBQUEsT0FBTyxFQUFFLENBQUNDLHVCQUFELENBRGtEO0FBRTNEO0FBQ0E7QUFDQTtBQUNBUixJQUFBQSxhQUFhLEVBQUUsRUFBRSxHQUFHQSxhQUFMO0FBQW9CLFNBQUdTO0FBQXZCLEtBTDRDO0FBTTNELE9BQUdSO0FBTndELEdBQXRELENBQVA7QUFRRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IGFsZXJ0aW5nUGx1Z2luIGZyb20gJy4vYWxlcnRpbmdQbHVnaW4nO1xuaW1wb3J0IHsgQ0xVU1RFUiwgREVGQVVMVF9IRUFERVJTIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXRpbHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQWxlcnRpbmdDbHVzdGVyKGNvcmUsIGdsb2JhbENvbmZpZykge1xuICBjb25zdCB7IGN1c3RvbUhlYWRlcnMsIC4uLnJlc3QgfSA9IGdsb2JhbENvbmZpZy5vcGVuc2VhcmNoO1xuICByZXR1cm4gY29yZS5vcGVuc2VhcmNoLmxlZ2FjeS5jcmVhdGVDbGllbnQoQ0xVU1RFUi5BTEVSVElORywge1xuICAgIHBsdWdpbnM6IFthbGVydGluZ1BsdWdpbl0sXG4gICAgLy8gQ3VycmVudGx5IHdlIGFyZSBvdmVycmlkaW5nIGFueSBoZWFkZXJzIHdpdGggb3VyIG93biBzaW5jZSB3ZSBleHBsaWNpdGx5IHJlcXVpcmVkIFVzZXItQWdlbnQgdG8gYmUgT3BlblNlYXJjaCBEYXNoYm9hcmRzXG4gICAgLy8gZm9yIGludGVncmF0aW9uIHdpdGggb3VyIGJhY2tlbmQgcGx1Z2luLlxuICAgIC8vIFRPRE86IENoYW5nZSBvdXIgcmVxdWlyZWQgaGVhZGVyIHRvIHgtPEhlYWRlcj4gdG8gYXZvaWQgb3ZlcnJpZGluZ1xuICAgIGN1c3RvbUhlYWRlcnM6IHsgLi4uY3VzdG9tSGVhZGVycywgLi4uREVGQVVMVF9IRUFERVJTIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59XG4iXX0=