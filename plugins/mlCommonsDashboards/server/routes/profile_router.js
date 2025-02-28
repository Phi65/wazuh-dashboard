"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileRouter = void 0;

var _configSchema = require("@osd/config-schema");

var _server = require("../../../../src/core/server");

var _profile_service = require("../services/profile_service");

var _constants = require("./constants");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const profileRouter = router => {
  router.get({
    path: `${_constants.DEPLOYED_MODEL_PROFILE_API_ENDPOINT}/{modelId}`,
    validate: {
      params: _configSchema.schema.object({
        modelId: _configSchema.schema.string({
          validate: value => {
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
              return 'Invalid model id';
            }
          }
        })
      })
    }
  }, async (context, request) => {
    try {
      const payload = await _profile_service.ProfileService.getModel({
        client: context.core.opensearch.client,
        modelId: request.params.modelId
      });
      return _server.opensearchDashboardsResponseFactory.ok({
        body: payload
      });
    } catch (error) {
      return _server.opensearchDashboardsResponseFactory.badRequest({
        body: error
      });
    }
  });
};

exports.profileRouter = profileRouter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGVfcm91dGVyLnRzIl0sIm5hbWVzIjpbInByb2ZpbGVSb3V0ZXIiLCJyb3V0ZXIiLCJnZXQiLCJwYXRoIiwiREVQTE9ZRURfTU9ERUxfUFJPRklMRV9BUElfRU5EUE9JTlQiLCJ2YWxpZGF0ZSIsInBhcmFtcyIsInNjaGVtYSIsIm9iamVjdCIsIm1vZGVsSWQiLCJzdHJpbmciLCJ2YWx1ZSIsInRlc3QiLCJjb250ZXh0IiwicmVxdWVzdCIsInBheWxvYWQiLCJQcm9maWxlU2VydmljZSIsImdldE1vZGVsIiwiY2xpZW50IiwiY29yZSIsIm9wZW5zZWFyY2giLCJvcGVuc2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSIsIm9rIiwiYm9keSIsImVycm9yIiwiYmFkUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOztBQVJBO0FBQ0E7QUFDQTtBQUNBO0FBT08sTUFBTUEsYUFBYSxHQUFJQyxNQUFELElBQXFCO0FBQ2hEQSxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FDRTtBQUNFQyxJQUFBQSxJQUFJLEVBQUcsR0FBRUMsOENBQW9DLFlBRC9DO0FBRUVDLElBQUFBLFFBQVEsRUFBRTtBQUNSQyxNQUFBQSxNQUFNLEVBQUVDLHFCQUFPQyxNQUFQLENBQWM7QUFDcEJDLFFBQUFBLE9BQU8sRUFBRUYscUJBQU9HLE1BQVAsQ0FBYztBQUNyQkwsVUFBQUEsUUFBUSxFQUFHTSxLQUFELElBQVc7QUFDbkIsZ0JBQUksQ0FBQyxtQkFBbUJDLElBQW5CLENBQXdCRCxLQUF4QixDQUFMLEVBQXFDO0FBQ25DLHFCQUFPLGtCQUFQO0FBQ0Q7QUFDRjtBQUxvQixTQUFkO0FBRFcsT0FBZDtBQURBO0FBRlosR0FERixFQWVFLE9BQU9FLE9BQVAsRUFBZ0JDLE9BQWhCLEtBQTRCO0FBQzFCLFFBQUk7QUFDRixZQUFNQyxPQUFPLEdBQUcsTUFBTUMsZ0NBQWVDLFFBQWYsQ0FBd0I7QUFDNUNDLFFBQUFBLE1BQU0sRUFBRUwsT0FBTyxDQUFDTSxJQUFSLENBQWFDLFVBQWIsQ0FBd0JGLE1BRFk7QUFFNUNULFFBQUFBLE9BQU8sRUFBRUssT0FBTyxDQUFDUixNQUFSLENBQWVHO0FBRm9CLE9BQXhCLENBQXRCO0FBSUEsYUFBT1ksNENBQW9DQyxFQUFwQyxDQUF1QztBQUFFQyxRQUFBQSxJQUFJLEVBQUVSO0FBQVIsT0FBdkMsQ0FBUDtBQUNELEtBTkQsQ0FNRSxPQUFPUyxLQUFQLEVBQWM7QUFDZCxhQUFPSCw0Q0FBb0NJLFVBQXBDLENBQStDO0FBQUVGLFFBQUFBLElBQUksRUFBRUM7QUFBUixPQUEvQyxDQUFQO0FBQ0Q7QUFDRixHQXpCSDtBQTJCRCxDQTVCTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7IElSb3V0ZXIsIG9wZW5zZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5IH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFByb2ZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZV9zZXJ2aWNlJztcbmltcG9ydCB7IERFUExPWUVEX01PREVMX1BST0ZJTEVfQVBJX0VORFBPSU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgcHJvZmlsZVJvdXRlciA9IChyb3V0ZXI6IElSb3V0ZXIpID0+IHtcbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtERVBMT1lFRF9NT0RFTF9QUk9GSUxFX0FQSV9FTkRQT0lOVH0ve21vZGVsSWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgbW9kZWxJZDogc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghL15bYS16QS1aMC05Xy1dKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdJbnZhbGlkIG1vZGVsIGlkJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCBQcm9maWxlU2VydmljZS5nZXRNb2RlbCh7XG4gICAgICAgICAgY2xpZW50OiBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQsXG4gICAgICAgICAgbW9kZWxJZDogcmVxdWVzdC5wYXJhbXMubW9kZWxJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvcGVuc2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeS5vayh7IGJvZHk6IHBheWxvYWQgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gb3BlbnNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnkuYmFkUmVxdWVzdCh7IGJvZHk6IGVycm9yIGFzIEVycm9yIH0pO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn07XG4iXX0=