"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createISMCluster;

var _ismPlugin = _interopRequireDefault(require("./ismPlugin"));

var _constants = require("../../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function createISMCluster(server) {
  const {
    customHeaders,
    ...rest
  } = server.config().get("opensearch");
  server.plugins.opensearch.createCluster(_constants.CLUSTER.ISM, {
    plugins: [_ismPlugin.default],
    customHeaders: { ...customHeaders,
      ..._constants.DEFAULT_HEADERS
    },
    ...rest
  });
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUlTTUNsdXN0ZXIudHMiXSwibmFtZXMiOlsiY3JlYXRlSVNNQ2x1c3RlciIsInNlcnZlciIsImN1c3RvbUhlYWRlcnMiLCJyZXN0IiwiY29uZmlnIiwiZ2V0IiwicGx1Z2lucyIsIm9wZW5zZWFyY2giLCJjcmVhdGVDbHVzdGVyIiwiQ0xVU1RFUiIsIklTTSIsImlzbVBsdWdpbiIsIkRFRkFVTFRfSEVBREVSUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOztBQUNBOzs7O0FBUEE7QUFDQTtBQUNBO0FBQ0E7QUFRZSxTQUFTQSxnQkFBVCxDQUEwQkMsTUFBMUIsRUFBMEM7QUFDdkQsUUFBTTtBQUFFQyxJQUFBQSxhQUFGO0FBQWlCLE9BQUdDO0FBQXBCLE1BQTZCRixNQUFNLENBQUNHLE1BQVAsR0FBZ0JDLEdBQWhCLENBQW9CLFlBQXBCLENBQW5DO0FBQ0FKLEVBQUFBLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlQyxVQUFmLENBQTBCQyxhQUExQixDQUF3Q0MsbUJBQVFDLEdBQWhELEVBQXFEO0FBQ25ESixJQUFBQSxPQUFPLEVBQUUsQ0FBQ0ssa0JBQUQsQ0FEMEM7QUFFbkRULElBQUFBLGFBQWEsRUFBRSxFQUFFLEdBQUdBLGFBQUw7QUFBb0IsU0FBR1U7QUFBdkIsS0FGb0M7QUFHbkQsT0FBR1Q7QUFIZ0QsR0FBckQ7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTGVnYWN5IH0gZnJvbSBcIm9wZW5zZWFyY2gtZGFzaGJvYXJkc1wiO1xuaW1wb3J0IGlzbVBsdWdpbiBmcm9tIFwiLi9pc21QbHVnaW5cIjtcbmltcG9ydCB7IENMVVNURVIsIERFRkFVTFRfSEVBREVSUyB9IGZyb20gXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxudHlwZSBTZXJ2ZXIgPSBMZWdhY3kuU2VydmVyO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJU01DbHVzdGVyKHNlcnZlcjogU2VydmVyKSB7XG4gIGNvbnN0IHsgY3VzdG9tSGVhZGVycywgLi4ucmVzdCB9ID0gc2VydmVyLmNvbmZpZygpLmdldChcIm9wZW5zZWFyY2hcIik7XG4gIHNlcnZlci5wbHVnaW5zLm9wZW5zZWFyY2guY3JlYXRlQ2x1c3RlcihDTFVTVEVSLklTTSwge1xuICAgIHBsdWdpbnM6IFtpc21QbHVnaW5dLFxuICAgIGN1c3RvbUhlYWRlcnM6IHsgLi4uY3VzdG9tSGVhZGVycywgLi4uREVGQVVMVF9IRUFERVJTIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59XG4iXX0=