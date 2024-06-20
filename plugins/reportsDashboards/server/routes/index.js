"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _report = _interopRequireDefault(require("./report"));

var _reportDefinition = _interopRequireDefault(require("./reportDefinition"));

var _reportSource = _interopRequireDefault(require("./reportSource"));

var _metric = _interopRequireDefault(require("./metric"));

var _notifications = _interopRequireDefault(require("./notifications"));

var _tesseract = _interopRequireDefault(require("./tesseract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function _default(router, config) {
  (0, _report.default)(router, config);
  (0, _reportDefinition.default)(router, config);
  (0, _reportSource.default)(router);
  (0, _metric.default)(router);
  (0, _notifications.default)(router);
  (0, _tesseract.default)(router);
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInJvdXRlciIsImNvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBVkE7QUFDQTtBQUNBO0FBQ0E7QUFXZSxrQkFBVUEsTUFBVixFQUEyQkMsTUFBM0IsRUFBb0Q7QUFDakUsdUJBQW9CRCxNQUFwQixFQUE0QkMsTUFBNUI7QUFDQSxpQ0FBOEJELE1BQTlCLEVBQXNDQyxNQUF0QztBQUNBLDZCQUEwQkQsTUFBMUI7QUFDQSx1QkFBb0JBLE1BQXBCO0FBQ0EsOEJBQTBCQSxNQUExQjtBQUNBLDBCQUF1QkEsTUFBdkI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHJlZ2lzdGVyUmVwb3J0Um91dGUgZnJvbSAnLi9yZXBvcnQnO1xuaW1wb3J0IHJlZ2lzdGVyUmVwb3J0RGVmaW5pdGlvblJvdXRlIGZyb20gJy4vcmVwb3J0RGVmaW5pdGlvbic7XG5pbXBvcnQgcmVnaXN0ZXJSZXBvcnRTb3VyY2VSb3V0ZSBmcm9tICcuL3JlcG9ydFNvdXJjZSc7XG5pbXBvcnQgcmVnaXN0ZXJNZXRyaWNSb3V0ZSBmcm9tICcuL21ldHJpYyc7XG5pbXBvcnQgcmVnaXN0ZXJOb3RpZmljYXRpb25Sb3V0ZSBmcm9tICcuL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHJlZ2lzdGVyVGVzc2VyYWN0Um91dGUgZnJvbSAnLi90ZXNzZXJhY3QnO1xuaW1wb3J0IHsgSVJvdXRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBSZXBvcnRpbmdDb25maWcgfSBmcm9tICdzZXJ2ZXIvY29uZmlnL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyb3V0ZXI6IElSb3V0ZXIsIGNvbmZpZzogUmVwb3J0aW5nQ29uZmlnKSB7XG4gIHJlZ2lzdGVyUmVwb3J0Um91dGUocm91dGVyLCBjb25maWcpO1xuICByZWdpc3RlclJlcG9ydERlZmluaXRpb25Sb3V0ZShyb3V0ZXIsIGNvbmZpZyk7XG4gIHJlZ2lzdGVyUmVwb3J0U291cmNlUm91dGUocm91dGVyKTtcbiAgcmVnaXN0ZXJNZXRyaWNSb3V0ZShyb3V0ZXIpO1xuICByZWdpc3Rlck5vdGlmaWNhdGlvblJvdXRlKHJvdXRlcik7XG4gIHJlZ2lzdGVyVGVzc2VyYWN0Um91dGUocm91dGVyKTtcbn1cbiJdfQ==