"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _configSchema = require("@osd/config-schema");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line import/no-default-export
function _default(services, router) {
  router.post({
    path: '/api/custom_import_map/_indices',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string()
      })
    }
  }, services.getIndex);
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wZW5zZWFyY2gudHMiXSwibmFtZXMiOlsic2VydmljZXMiLCJyb3V0ZXIiLCJwb3N0IiwicGF0aCIsInZhbGlkYXRlIiwiYm9keSIsInNjaGVtYSIsIm9iamVjdCIsImluZGV4Iiwic3RyaW5nIiwiZ2V0SW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFLQTs7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ2Usa0JBQVVBLFFBQVYsRUFBb0JDLE1BQXBCLEVBQTRCO0FBQ3pDQSxFQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FDRTtBQUNFQyxJQUFBQSxJQUFJLEVBQUUsaUNBRFI7QUFFRUMsSUFBQUEsUUFBUSxFQUFFO0FBQ1JDLE1BQUFBLElBQUksRUFBRUMscUJBQU9DLE1BQVAsQ0FBYztBQUNsQkMsUUFBQUEsS0FBSyxFQUFFRixxQkFBT0csTUFBUDtBQURXLE9BQWQ7QUFERTtBQUZaLEdBREYsRUFTRVQsUUFBUSxDQUFDVSxRQVRYO0FBV0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZXJ2aWNlcywgcm91dGVyKSB7XG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYXBpL2N1c3RvbV9pbXBvcnRfbWFwL19pbmRpY2VzJyxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGluZGV4OiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZpY2VzLmdldEluZGV4XG4gICk7XG59XG4iXX0=