"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugin.ReportsDashboardsPlugin;
  }
});
Object.defineProperty(exports, "ReportingConfig", {
  enumerable: true,
  get: function () {
    return _config2.ReportingConfig;
  }
});
Object.defineProperty(exports, "ReportsDashboardsPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.ReportsDashboardsPluginSetup;
  }
});
Object.defineProperty(exports, "ReportsDashboardsPluginStart", {
  enumerable: true,
  get: function () {
    return _types.ReportsDashboardsPluginStart;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _config.config;
  }
});
exports.plugin = plugin;

var _plugin = require("./plugin");

var _config = require("./config");

var _config2 = require("./config/config");

var _types = require("./types");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
//  This exports static code and TypeScript types,
//  as well as, OpenSearch Dashboards Platform `plugin()` initializer.
function plugin(initializerContext) {
  return new _plugin.ReportsDashboardsPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIlJlcG9ydHNEYXNoYm9hcmRzUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7O0FBRUE7O0FBQ0E7O0FBV0E7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNPLFNBQVNBLE1BQVQsQ0FDTEMsa0JBREssRUFFTDtBQUNBLFNBQU8sSUFBSUMsK0JBQUosQ0FBNEJELGtCQUE1QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBSZXBvcnRpbmdDb25maWdUeXBlIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgUmVwb3J0c0Rhc2hib2FyZHNQbHVnaW4gfSBmcm9tICcuL3BsdWdpbic7XG5cbmV4cG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmV4cG9ydCB7IFJlcG9ydGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5leHBvcnQgeyBSZXBvcnRzRGFzaGJvYXJkc1BsdWdpbiBhcyBQbHVnaW4gfTtcblxuLy8gIFRoaXMgZXhwb3J0cyBzdGF0aWMgY29kZSBhbmQgVHlwZVNjcmlwdCB0eXBlcyxcbi8vICBhcyB3ZWxsIGFzLCBPcGVuU2VhcmNoIERhc2hib2FyZHMgUGxhdGZvcm0gYHBsdWdpbigpYCBpbml0aWFsaXplci5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oXG4gIGluaXRpYWxpemVyQ29udGV4dDogUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0PFJlcG9ydGluZ0NvbmZpZ1R5cGU+XG4pIHtcbiAgcmV0dXJuIG5ldyBSZXBvcnRzRGFzaGJvYXJkc1BsdWdpbihpbml0aWFsaXplckNvbnRleHQpO1xufVxuXG5leHBvcnQge1xuICBSZXBvcnRzRGFzaGJvYXJkc1BsdWdpblNldHVwLFxuICBSZXBvcnRzRGFzaGJvYXJkc1BsdWdpblN0YXJ0LFxufSBmcm9tICcuL3R5cGVzJztcbiJdfQ==