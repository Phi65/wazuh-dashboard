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
    rollupService,
    transformService
  } = services;
  router.get({
    path: _constants.NODE_API.ROLLUPS,
    validate: {
      query: _configSchema.schema.object({
        from: _configSchema.schema.number(),
        size: _configSchema.schema.number(),
        search: _configSchema.schema.string(),
        sortField: _configSchema.schema.string(),
        sortDirection: _configSchema.schema.string()
      })
    }
  }, rollupService.getRollups);
  router.put({
    path: `${_constants.NODE_API.ROLLUPS}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({
        seqNo: _configSchema.schema.maybe(_configSchema.schema.number()),
        primaryTerm: _configSchema.schema.maybe(_configSchema.schema.number())
      }),
      body: _configSchema.schema.any()
    }
  }, rollupService.putRollup);
  router.get({
    path: `${_constants.NODE_API.ROLLUPS}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, rollupService.getRollup);
  router.delete({
    path: `${_constants.NODE_API.ROLLUPS}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, rollupService.deleteRollup);
  router.post({
    path: `${_constants.NODE_API.ROLLUPS}/{id}/_start`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, rollupService.startRollup);
  router.post({
    path: `${_constants.NODE_API.ROLLUPS}/{id}/_stop`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, rollupService.stopRollup);
  router.post({
    path: _constants.NODE_API._MAPPINGS,
    validate: {
      body: _configSchema.schema.any()
    }
  }, rollupService.getMappings);
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvbGx1cHMudHMiXSwibmFtZXMiOlsic2VydmljZXMiLCJyb3V0ZXIiLCJyb2xsdXBTZXJ2aWNlIiwidHJhbnNmb3JtU2VydmljZSIsImdldCIsInBhdGgiLCJOT0RFX0FQSSIsIlJPTExVUFMiLCJ2YWxpZGF0ZSIsInF1ZXJ5Iiwic2NoZW1hIiwib2JqZWN0IiwiZnJvbSIsIm51bWJlciIsInNpemUiLCJzZWFyY2giLCJzdHJpbmciLCJzb3J0RmllbGQiLCJzb3J0RGlyZWN0aW9uIiwiZ2V0Um9sbHVwcyIsInB1dCIsInBhcmFtcyIsImlkIiwic2VxTm8iLCJtYXliZSIsInByaW1hcnlUZXJtIiwiYm9keSIsImFueSIsInB1dFJvbGx1cCIsImdldFJvbGx1cCIsImRlbGV0ZSIsImRlbGV0ZVJvbGx1cCIsInBvc3QiLCJzdGFydFJvbGx1cCIsInN0b3BSb2xsdXAiLCJfTUFQUElOR1MiLCJnZXRNYXBwaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOztBQUVBOztBQVJBO0FBQ0E7QUFDQTtBQUNBO0FBT2Usa0JBQVVBLFFBQVYsRUFBa0NDLE1BQWxDLEVBQW1EO0FBQ2hFLFFBQU07QUFBRUMsSUFBQUEsYUFBRjtBQUFpQkMsSUFBQUE7QUFBakIsTUFBc0NILFFBQTVDO0FBRUFDLEVBQUFBLE1BQU0sQ0FBQ0csR0FBUCxDQUNFO0FBQ0VDLElBQUFBLElBQUksRUFBRUMsb0JBQVNDLE9BRGpCO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxLQUFLLEVBQUVDLHFCQUFPQyxNQUFQLENBQWM7QUFDbkJDLFFBQUFBLElBQUksRUFBRUYscUJBQU9HLE1BQVAsRUFEYTtBQUVuQkMsUUFBQUEsSUFBSSxFQUFFSixxQkFBT0csTUFBUCxFQUZhO0FBR25CRSxRQUFBQSxNQUFNLEVBQUVMLHFCQUFPTSxNQUFQLEVBSFc7QUFJbkJDLFFBQUFBLFNBQVMsRUFBRVAscUJBQU9NLE1BQVAsRUFKUTtBQUtuQkUsUUFBQUEsYUFBYSxFQUFFUixxQkFBT00sTUFBUDtBQUxJLE9BQWQ7QUFEQztBQUZaLEdBREYsRUFhRWQsYUFBYSxDQUFDaUIsVUFiaEI7QUFnQkFsQixFQUFBQSxNQUFNLENBQUNtQixHQUFQLENBQ0U7QUFDRWYsSUFBQUEsSUFBSSxFQUFHLEdBQUVDLG9CQUFTQyxPQUFRLE9BRDVCO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSYSxNQUFBQSxNQUFNLEVBQUVYLHFCQUFPQyxNQUFQLENBQWM7QUFDcEJXLFFBQUFBLEVBQUUsRUFBRVoscUJBQU9NLE1BQVA7QUFEZ0IsT0FBZCxDQURBO0FBSVJQLE1BQUFBLEtBQUssRUFBRUMscUJBQU9DLE1BQVAsQ0FBYztBQUNuQlksUUFBQUEsS0FBSyxFQUFFYixxQkFBT2MsS0FBUCxDQUFhZCxxQkFBT0csTUFBUCxFQUFiLENBRFk7QUFFbkJZLFFBQUFBLFdBQVcsRUFBRWYscUJBQU9jLEtBQVAsQ0FBYWQscUJBQU9HLE1BQVAsRUFBYjtBQUZNLE9BQWQsQ0FKQztBQVFSYSxNQUFBQSxJQUFJLEVBQUVoQixxQkFBT2lCLEdBQVA7QUFSRTtBQUZaLEdBREYsRUFjRXpCLGFBQWEsQ0FBQzBCLFNBZGhCO0FBaUJBM0IsRUFBQUEsTUFBTSxDQUFDRyxHQUFQLENBQ0U7QUFDRUMsSUFBQUEsSUFBSSxFQUFHLEdBQUVDLG9CQUFTQyxPQUFRLE9BRDVCO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSYSxNQUFBQSxNQUFNLEVBQUVYLHFCQUFPQyxNQUFQLENBQWM7QUFDcEJXLFFBQUFBLEVBQUUsRUFBRVoscUJBQU9NLE1BQVA7QUFEZ0IsT0FBZDtBQURBO0FBRlosR0FERixFQVNFZCxhQUFhLENBQUMyQixTQVRoQjtBQVlBNUIsRUFBQUEsTUFBTSxDQUFDNkIsTUFBUCxDQUNFO0FBQ0V6QixJQUFBQSxJQUFJLEVBQUcsR0FBRUMsb0JBQVNDLE9BQVEsT0FENUI7QUFFRUMsSUFBQUEsUUFBUSxFQUFFO0FBQ1JhLE1BQUFBLE1BQU0sRUFBRVgscUJBQU9DLE1BQVAsQ0FBYztBQUNwQlcsUUFBQUEsRUFBRSxFQUFFWixxQkFBT00sTUFBUDtBQURnQixPQUFkO0FBREE7QUFGWixHQURGLEVBU0VkLGFBQWEsQ0FBQzZCLFlBVGhCO0FBWUE5QixFQUFBQSxNQUFNLENBQUMrQixJQUFQLENBQ0U7QUFDRTNCLElBQUFBLElBQUksRUFBRyxHQUFFQyxvQkFBU0MsT0FBUSxjQUQ1QjtBQUVFQyxJQUFBQSxRQUFRLEVBQUU7QUFDUmEsTUFBQUEsTUFBTSxFQUFFWCxxQkFBT0MsTUFBUCxDQUFjO0FBQ3BCVyxRQUFBQSxFQUFFLEVBQUVaLHFCQUFPTSxNQUFQO0FBRGdCLE9BQWQ7QUFEQTtBQUZaLEdBREYsRUFTRWQsYUFBYSxDQUFDK0IsV0FUaEI7QUFZQWhDLEVBQUFBLE1BQU0sQ0FBQytCLElBQVAsQ0FDRTtBQUNFM0IsSUFBQUEsSUFBSSxFQUFHLEdBQUVDLG9CQUFTQyxPQUFRLGFBRDVCO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSYSxNQUFBQSxNQUFNLEVBQUVYLHFCQUFPQyxNQUFQLENBQWM7QUFDcEJXLFFBQUFBLEVBQUUsRUFBRVoscUJBQU9NLE1BQVA7QUFEZ0IsT0FBZDtBQURBO0FBRlosR0FERixFQVNFZCxhQUFhLENBQUNnQyxVQVRoQjtBQVlBakMsRUFBQUEsTUFBTSxDQUFDK0IsSUFBUCxDQUNFO0FBQ0UzQixJQUFBQSxJQUFJLEVBQUVDLG9CQUFTNkIsU0FEakI7QUFFRTNCLElBQUFBLFFBQVEsRUFBRTtBQUNSa0IsTUFBQUEsSUFBSSxFQUFFaEIscUJBQU9pQixHQUFQO0FBREU7QUFGWixHQURGLEVBT0V6QixhQUFhLENBQUNrQyxXQVBoQjtBQVNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJUm91dGVyIH0gZnJvbSBcIm9wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXJcIjtcbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gXCJAb3NkL2NvbmZpZy1zY2hlbWFcIjtcbmltcG9ydCB7IE5vZGVTZXJ2aWNlcyB9IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTk9ERV9BUEkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZXJ2aWNlczogTm9kZVNlcnZpY2VzLCByb3V0ZXI6IElSb3V0ZXIpIHtcbiAgY29uc3QgeyByb2xsdXBTZXJ2aWNlLCB0cmFuc2Zvcm1TZXJ2aWNlIH0gPSBzZXJ2aWNlcztcblxuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IE5PREVfQVBJLlJPTExVUFMsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgZnJvbTogc2NoZW1hLm51bWJlcigpLFxuICAgICAgICAgIHNpemU6IHNjaGVtYS5udW1iZXIoKSxcbiAgICAgICAgICBzZWFyY2g6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBzb3J0RmllbGQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBzb3J0RGlyZWN0aW9uOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cFNlcnZpY2UuZ2V0Um9sbHVwc1xuICApO1xuXG4gIHJvdXRlci5wdXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7Tk9ERV9BUEkuUk9MTFVQU30ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgc2VxTm86IHNjaGVtYS5tYXliZShzY2hlbWEubnVtYmVyKCkpLFxuICAgICAgICAgIHByaW1hcnlUZXJtOiBzY2hlbWEubWF5YmUoc2NoZW1hLm51bWJlcigpKSxcbiAgICAgICAgfSksXG4gICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBTZXJ2aWNlLnB1dFJvbGx1cFxuICApO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7Tk9ERV9BUEkuUk9MTFVQU30ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cFNlcnZpY2UuZ2V0Um9sbHVwXG4gICk7XG5cbiAgcm91dGVyLmRlbGV0ZShcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5ST0xMVVBTfS97aWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgaWQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwU2VydmljZS5kZWxldGVSb2xsdXBcbiAgKTtcblxuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5ST0xMVVBTfS97aWR9L19zdGFydGAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cFNlcnZpY2Uuc3RhcnRSb2xsdXBcbiAgKTtcblxuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5ST0xMVVBTfS97aWR9L19zdG9wYCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgaWQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwU2VydmljZS5zdG9wUm9sbHVwXG4gICk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAge1xuICAgICAgcGF0aDogTk9ERV9BUEkuX01BUFBJTkdTLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cFNlcnZpY2UuZ2V0TWFwcGluZ3NcbiAgKTtcbn1cbiJdfQ==