"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeospatialPlugin;

var _shared = require("../../common/constants/shared");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line import/no-default-export
function GeospatialPlugin(Client, config, components) {
  const ca = components.clientAction.factory;
  Client.prototype.geospatial = components.clientAction.namespaceFactory();
  const geospatial = Client.prototype.geospatial.prototype;
  geospatial.geospatialQuery = ca({
    url: {
      fmt: `${_shared.UPLOAD_GEOJSON_API_PATH}`
    },
    method: 'POST'
  });
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlb3NwYXRpYWxfcGx1Z2luLnRzIl0sIm5hbWVzIjpbIkdlb3NwYXRpYWxQbHVnaW4iLCJDbGllbnQiLCJjb25maWciLCJjb21wb25lbnRzIiwiY2EiLCJjbGllbnRBY3Rpb24iLCJmYWN0b3J5IiwicHJvdG90eXBlIiwiZ2Vvc3BhdGlhbCIsIm5hbWVzcGFjZUZhY3RvcnkiLCJnZW9zcGF0aWFsUXVlcnkiLCJ1cmwiLCJmbXQiLCJVUExPQURfR0VPSlNPTl9BUElfUEFUSCIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOztBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDZSxTQUFTQSxnQkFBVCxDQUEwQkMsTUFBMUIsRUFBa0NDLE1BQWxDLEVBQTBDQyxVQUExQyxFQUFzRDtBQUNuRSxRQUFNQyxFQUFFLEdBQUdELFVBQVUsQ0FBQ0UsWUFBWCxDQUF3QkMsT0FBbkM7QUFDQUwsRUFBQUEsTUFBTSxDQUFDTSxTQUFQLENBQWlCQyxVQUFqQixHQUE4QkwsVUFBVSxDQUFDRSxZQUFYLENBQXdCSSxnQkFBeEIsRUFBOUI7QUFDQSxRQUFNRCxVQUFVLEdBQUdQLE1BQU0sQ0FBQ00sU0FBUCxDQUFpQkMsVUFBakIsQ0FBNEJELFNBQS9DO0FBRUFDLEVBQUFBLFVBQVUsQ0FBQ0UsZUFBWCxHQUE2Qk4sRUFBRSxDQUFDO0FBQzlCTyxJQUFBQSxHQUFHLEVBQUU7QUFDSEMsTUFBQUEsR0FBRyxFQUFHLEdBQUVDLCtCQUF3QjtBQUQ3QixLQUR5QjtBQUk5QkMsSUFBQUEsTUFBTSxFQUFFO0FBSnNCLEdBQUQsQ0FBL0I7QUFNRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgVVBMT0FEX0dFT0pTT05fQVBJX1BBVEggfSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzL3NoYXJlZCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdlb3NwYXRpYWxQbHVnaW4oQ2xpZW50LCBjb25maWcsIGNvbXBvbmVudHMpIHtcbiAgY29uc3QgY2EgPSBjb21wb25lbnRzLmNsaWVudEFjdGlvbi5mYWN0b3J5O1xuICBDbGllbnQucHJvdG90eXBlLmdlb3NwYXRpYWwgPSBjb21wb25lbnRzLmNsaWVudEFjdGlvbi5uYW1lc3BhY2VGYWN0b3J5KCk7XG4gIGNvbnN0IGdlb3NwYXRpYWwgPSBDbGllbnQucHJvdG90eXBlLmdlb3NwYXRpYWwucHJvdG90eXBlO1xuXG4gIGdlb3NwYXRpYWwuZ2Vvc3BhdGlhbFF1ZXJ5ID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtVUExPQURfR0VPSlNPTl9BUElfUEFUSH1gLFxuICAgIH0sXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gIH0pO1xufVxuIl19