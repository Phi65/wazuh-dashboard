"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _configSchema = require("@osd/config-schema");

var _constants = require("../../utils/constants");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function _default(services, router) {
  const {
    commonService
  } = services;
  const payload = {
    path: _constants.NODE_API.API_CALLER,
    validate: {
      body: _configSchema.schema.nullable(_configSchema.schema.object({
        endpoint: _configSchema.schema.string(),
        data: _configSchema.schema.nullable(_configSchema.schema.any()),
        hideLog: _configSchema.schema.nullable(_configSchema.schema.boolean())
      })),
      query: _configSchema.schema.any()
    }
  };
  router.post(payload, commonService.apiCaller);
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi50cyJdLCJuYW1lcyI6WyJzZXJ2aWNlcyIsInJvdXRlciIsImNvbW1vblNlcnZpY2UiLCJwYXlsb2FkIiwicGF0aCIsIk5PREVfQVBJIiwiQVBJX0NBTExFUiIsInZhbGlkYXRlIiwiYm9keSIsInNjaGVtYSIsIm51bGxhYmxlIiwib2JqZWN0IiwiZW5kcG9pbnQiLCJzdHJpbmciLCJkYXRhIiwiYW55IiwiaGlkZUxvZyIsImJvb2xlYW4iLCJxdWVyeSIsInBvc3QiLCJhcGlDYWxsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFLQTs7QUFFQTs7QUFQQTtBQUNBO0FBQ0E7QUFDQTtBQU9lLGtCQUFVQSxRQUFWLEVBQWtDQyxNQUFsQyxFQUFtRDtBQUNoRSxRQUFNO0FBQUVDLElBQUFBO0FBQUYsTUFBb0JGLFFBQTFCO0FBQ0EsUUFBTUcsT0FBTyxHQUFHO0FBQ2RDLElBQUFBLElBQUksRUFBRUMsb0JBQVNDLFVBREQ7QUFFZEMsSUFBQUEsUUFBUSxFQUFFO0FBQ1JDLE1BQUFBLElBQUksRUFBRUMscUJBQU9DLFFBQVAsQ0FDSkQscUJBQU9FLE1BQVAsQ0FBYztBQUNaQyxRQUFBQSxRQUFRLEVBQUVILHFCQUFPSSxNQUFQLEVBREU7QUFFWkMsUUFBQUEsSUFBSSxFQUFFTCxxQkFBT0MsUUFBUCxDQUFnQkQscUJBQU9NLEdBQVAsRUFBaEIsQ0FGTTtBQUdaQyxRQUFBQSxPQUFPLEVBQUVQLHFCQUFPQyxRQUFQLENBQWdCRCxxQkFBT1EsT0FBUCxFQUFoQjtBQUhHLE9BQWQsQ0FESSxDQURFO0FBUVJDLE1BQUFBLEtBQUssRUFBRVQscUJBQU9NLEdBQVA7QUFSQztBQUZJLEdBQWhCO0FBY0FkLEVBQUFBLE1BQU0sQ0FBQ2tCLElBQVAsQ0FBWWhCLE9BQVosRUFBcUJELGFBQWEsQ0FBQ2tCLFNBQW5DO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gXCJAb3NkL2NvbmZpZy1zY2hlbWFcIjtcbmltcG9ydCB7IE5vZGVTZXJ2aWNlcyB9IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTk9ERV9BUEkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBJUm91dGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VydmljZXM6IE5vZGVTZXJ2aWNlcywgcm91dGVyOiBJUm91dGVyKSB7XG4gIGNvbnN0IHsgY29tbW9uU2VydmljZSB9ID0gc2VydmljZXM7XG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgcGF0aDogTk9ERV9BUEkuQVBJX0NBTExFUixcbiAgICB2YWxpZGF0ZToge1xuICAgICAgYm9keTogc2NoZW1hLm51bGxhYmxlKFxuICAgICAgICBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBlbmRwb2ludDogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICAgIGRhdGE6IHNjaGVtYS5udWxsYWJsZShzY2hlbWEuYW55KCkpLFxuICAgICAgICAgIGhpZGVMb2c6IHNjaGVtYS5udWxsYWJsZShzY2hlbWEuYm9vbGVhbigpKSxcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBxdWVyeTogc2NoZW1hLmFueSgpLFxuICAgIH0sXG4gIH07XG5cbiAgcm91dGVyLnBvc3QocGF5bG9hZCwgY29tbW9uU2VydmljZS5hcGlDYWxsZXIpO1xufVxuIl19