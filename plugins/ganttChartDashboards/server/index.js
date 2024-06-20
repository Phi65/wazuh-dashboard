"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GanttVisPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.GanttVisPluginSetup;
  }
});
Object.defineProperty(exports, "GanttVisPluginStart", {
  enumerable: true,
  get: function () {
    return _types.GanttVisPluginStart;
  }
});
exports.plugin = plugin;

var _plugin = require("./plugin");

var _types = require("./types");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
//  This exports static code and TypeScript types,
//  as well as, OpenSearch Dashboards Platform `plugin()` initializer.
function plugin(initializerContext) {
  return new _plugin.GanttVisPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIkdhbnR0VmlzUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBU0E7O0FBZkE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBRU8sU0FBU0EsTUFBVCxDQUFnQkMsa0JBQWhCLEVBQThEO0FBQ25FLFNBQU8sSUFBSUMsc0JBQUosQ0FBbUJELGtCQUFuQixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBHYW50dFZpc1BsdWdpbiB9IGZyb20gJy4vcGx1Z2luJztcblxuLy8gIFRoaXMgZXhwb3J0cyBzdGF0aWMgY29kZSBhbmQgVHlwZVNjcmlwdCB0eXBlcyxcbi8vICBhcyB3ZWxsIGFzLCBPcGVuU2VhcmNoIERhc2hib2FyZHMgUGxhdGZvcm0gYHBsdWdpbigpYCBpbml0aWFsaXplci5cblxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbihpbml0aWFsaXplckNvbnRleHQ6IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCkge1xuICByZXR1cm4gbmV3IEdhbnR0VmlzUGx1Z2luKGluaXRpYWxpemVyQ29udGV4dCk7XG59XG5cbmV4cG9ydCB7IEdhbnR0VmlzUGx1Z2luU2V0dXAsIEdhbnR0VmlzUGx1Z2luU3RhcnQgfSBmcm9tICcuL3R5cGVzJztcbiJdfQ==