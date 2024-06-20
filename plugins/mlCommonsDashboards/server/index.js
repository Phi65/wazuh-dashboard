"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MlCommonsPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.MlCommonsPluginSetup;
  }
});
Object.defineProperty(exports, "MlCommonsPluginStart", {
  enumerable: true,
  get: function () {
    return _types.MlCommonsPluginStart;
  }
});
exports.config = void 0;
exports.plugin = plugin;

var _configSchema = require("@osd/config-schema");

var _plugin = require("./plugin");

var _types = require("./types");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
function plugin(initializerContext) {
  return new _plugin.MlCommonsPlugin(initializerContext);
}

const config = {
  schema: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  })
};
exports.config = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIk1sQ29tbW9uc1BsdWdpbiIsImNvbmZpZyIsInNjaGVtYSIsIm9iamVjdCIsImVuYWJsZWQiLCJib29sZWFuIiwiZGVmYXVsdFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBOztBQUdBOztBQVNBOztBQWpCQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFFTyxTQUFTQSxNQUFULENBQWdCQyxrQkFBaEIsRUFBOEQ7QUFDbkUsU0FBTyxJQUFJQyx1QkFBSixDQUFvQkQsa0JBQXBCLENBQVA7QUFDRDs7QUFJTSxNQUFNRSxNQUE4QixHQUFHO0FBQzVDQyxFQUFBQSxNQUFNLEVBQUVBLHFCQUFPQyxNQUFQLENBQWM7QUFDcEJDLElBQUFBLE9BQU8sRUFBRUYscUJBQU9HLE9BQVAsQ0FBZTtBQUFFQyxNQUFBQSxZQUFZLEVBQUU7QUFBaEIsS0FBZjtBQURXLEdBQWQ7QUFEb0MsQ0FBdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5cbmltcG9ydCB7IFBsdWdpbkNvbmZpZ0Rlc2NyaXB0b3IsIFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBNbENvbW1vbnNQbHVnaW4gfSBmcm9tICcuL3BsdWdpbic7XG5cbi8vIFRoaXMgZXhwb3J0cyBzdGF0aWMgY29kZSBhbmQgVHlwZVNjcmlwdCB0eXBlcyxcbi8vIGFzIHdlbGwgYXMsIE9wZW5TZWFyY2ggRGFzaGJvYXJkcyBQbGF0Zm9ybSBgcGx1Z2luKClgIGluaXRpYWxpemVyLlxuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKGluaXRpYWxpemVyQ29udGV4dDogUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0KSB7XG4gIHJldHVybiBuZXcgTWxDb21tb25zUGx1Z2luKGluaXRpYWxpemVyQ29udGV4dCk7XG59XG5cbmV4cG9ydCB7IE1sQ29tbW9uc1BsdWdpblNldHVwLCBNbENvbW1vbnNQbHVnaW5TdGFydCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgY29uZmlnOiBQbHVnaW5Db25maWdEZXNjcmlwdG9yID0ge1xuICBzY2hlbWE6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGVuYWJsZWQ6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgfSksXG59O1xuIl19