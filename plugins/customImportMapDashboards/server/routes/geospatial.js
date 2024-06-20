"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _configSchema = require("@osd/config-schema");

var _common = require("../../common");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line import/no-default-export
function _default(services, router) {
  router.post({
    path: '/api/custom_import_map/_upload',
    validate: {
      body: _configSchema.schema.any()
    },
    options: {
      body: {
        accepts: 'application/json',
        maxBytes: _common.MAX_FILE_PAYLOAD_SIZE // 25 MB payload limit for custom geoJSON feature

      }
    }
  }, services.uploadGeojson);
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlb3NwYXRpYWwudHMiXSwibmFtZXMiOlsic2VydmljZXMiLCJyb3V0ZXIiLCJwb3N0IiwicGF0aCIsInZhbGlkYXRlIiwiYm9keSIsInNjaGVtYSIsImFueSIsIm9wdGlvbnMiLCJhY2NlcHRzIiwibWF4Qnl0ZXMiLCJNQVhfRklMRV9QQVlMT0FEX1NJWkUiLCJ1cGxvYWRHZW9qc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBQ0E7O0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNlLGtCQUFVQSxRQUFWLEVBQW9CQyxNQUFwQixFQUE0QjtBQUN6Q0EsRUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQ0U7QUFDRUMsSUFBQUEsSUFBSSxFQUFFLGdDQURSO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxJQUFJLEVBQUVDLHFCQUFPQyxHQUFQO0FBREUsS0FGWjtBQUtFQyxJQUFBQSxPQUFPLEVBQUU7QUFDUEgsTUFBQUEsSUFBSSxFQUFFO0FBQ0pJLFFBQUFBLE9BQU8sRUFBRSxrQkFETDtBQUVKQyxRQUFBQSxRQUFRLEVBQUVDLDZCQUZOLENBRTZCOztBQUY3QjtBQURDO0FBTFgsR0FERixFQWFFWCxRQUFRLENBQUNZLGFBYlg7QUFlRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7IE1BWF9GSUxFX1BBWUxPQURfU0laRSB9IGZyb20gJy4uLy4uL2NvbW1vbic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZXJ2aWNlcywgcm91dGVyKSB7XG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYXBpL2N1c3RvbV9pbXBvcnRfbWFwL191cGxvYWQnLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGFjY2VwdHM6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICBtYXhCeXRlczogTUFYX0ZJTEVfUEFZTE9BRF9TSVpFLCAvLyAyNSBNQiBwYXlsb2FkIGxpbWl0IGZvciBjdXN0b20gZ2VvSlNPTiBmZWF0dXJlXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmljZXMudXBsb2FkR2VvanNvblxuICApO1xufVxuIl19