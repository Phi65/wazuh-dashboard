"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class IndexService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);

    _defineProperty(this, "apiCaller", async (context, request, response) => {
      const useQuery = !request.body;
      const usedParam = useQuery ? request.query : request.body;
      const {
        endpoint,
        data,
        hideLog
      } = usedParam || {};

      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const finalData = data;
        /**
         * Update path parameter to follow RFC/generic HTTP convention
         */

        if (endpoint === "transport.request" && typeof (finalData === null || finalData === void 0 ? void 0 : finalData.path) === "string" && !/^\//.test((finalData === null || finalData === void 0 ? void 0 : finalData.path) || "")) {
          finalData.path = `/${finalData.path || ""}`;
        }

        const payload = useQuery ? JSON.parse(finalData || "{}") : finalData;
        const commonCallerResponse = await callWithRequest(endpoint, payload || {});
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: commonCallerResponse
          }
        });
      } catch (err) {
        if (!hideLog) {
          console.error("Index Management - CommonService - apiCaller", err);
        }

        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err === null || err === void 0 ? void 0 : err.message,
            body: (err === null || err === void 0 ? void 0 : err.body) || ""
          }
        });
      }
    });

    this.osDriver = osDriver;
  }

}

exports.default = IndexService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbW1vblNlcnZpY2UudHMiXSwibmFtZXMiOlsiSW5kZXhTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJvc0RyaXZlciIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJ1c2VRdWVyeSIsImJvZHkiLCJ1c2VkUGFyYW0iLCJxdWVyeSIsImVuZHBvaW50IiwiZGF0YSIsImhpZGVMb2ciLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwiZmluYWxEYXRhIiwicGF0aCIsInRlc3QiLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiY29tbW9uQ2FsbGVyUmVzcG9uc2UiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwib2siLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQWlCZSxNQUFNQSxZQUFOLENBQW1CO0FBR2hDQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBdUM7QUFBQTs7QUFBQSx1Q0FJdEMsT0FDVkMsT0FEVSxFQUVWQyxPQUZVLEVBR1ZDLFFBSFUsS0FJdUU7QUFDakYsWUFBTUMsUUFBUSxHQUFHLENBQUNGLE9BQU8sQ0FBQ0csSUFBMUI7QUFDQSxZQUFNQyxTQUFTLEdBQUlGLFFBQVEsR0FBR0YsT0FBTyxDQUFDSyxLQUFYLEdBQW1CTCxPQUFPLENBQUNHLElBQXREO0FBQ0EsWUFBTTtBQUFFRyxRQUFBQSxRQUFGO0FBQVlDLFFBQUFBLElBQVo7QUFBa0JDLFFBQUFBO0FBQWxCLFVBQThCSixTQUFTLElBQUksRUFBakQ7O0FBQ0EsVUFBSTtBQUNGLGNBQU07QUFBRUssVUFBQUEsaUJBQWlCLEVBQUVDO0FBQXJCLFlBQXlDLEtBQUtaLFFBQUwsQ0FBY2EsUUFBZCxDQUF1QlgsT0FBdkIsQ0FBL0M7QUFDQSxjQUFNWSxTQUFTLEdBQUdMLElBQWxCO0FBQ0E7QUFDTjtBQUNBOztBQUNNLFlBQUlELFFBQVEsS0FBSyxtQkFBYixJQUFvQyxRQUFPTSxTQUFQLGFBQU9BLFNBQVAsdUJBQU9BLFNBQVMsQ0FBRUMsSUFBbEIsTUFBMkIsUUFBL0QsSUFBMkUsQ0FBQyxNQUFNQyxJQUFOLENBQVcsQ0FBQUYsU0FBUyxTQUFULElBQUFBLFNBQVMsV0FBVCxZQUFBQSxTQUFTLENBQUVDLElBQVgsS0FBbUIsRUFBOUIsQ0FBaEYsRUFBbUg7QUFDakhELFVBQUFBLFNBQVMsQ0FBQ0MsSUFBVixHQUFrQixJQUFHRCxTQUFTLENBQUNDLElBQVYsSUFBa0IsRUFBRyxFQUExQztBQUNEOztBQUNELGNBQU1FLE9BQU8sR0FBR2IsUUFBUSxHQUFHYyxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsU0FBUyxJQUFJLElBQXhCLENBQUgsR0FBbUNBLFNBQTNEO0FBQ0EsY0FBTU0sb0JBQW9CLEdBQUcsTUFBTVIsZUFBZSxDQUFDSixRQUFELEVBQVdTLE9BQU8sSUFBSSxFQUF0QixDQUFsRDtBQUNBLGVBQU9kLFFBQVEsQ0FBQ2tCLE1BQVQsQ0FBZ0I7QUFDckJDLFVBQUFBLFVBQVUsRUFBRSxHQURTO0FBRXJCakIsVUFBQUEsSUFBSSxFQUFFO0FBQ0prQixZQUFBQSxFQUFFLEVBQUUsSUFEQTtBQUVKcEIsWUFBQUEsUUFBUSxFQUFFaUI7QUFGTjtBQUZlLFNBQWhCLENBQVA7QUFPRCxPQWxCRCxDQWtCRSxPQUFPSSxHQUFQLEVBQVk7QUFDWixZQUFJLENBQUNkLE9BQUwsRUFBYztBQUNaZSxVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyw4Q0FBZCxFQUE4REYsR0FBOUQ7QUFDRDs7QUFDRCxlQUFPckIsUUFBUSxDQUFDa0IsTUFBVCxDQUFnQjtBQUNyQkMsVUFBQUEsVUFBVSxFQUFFLEdBRFM7QUFFckJqQixVQUFBQSxJQUFJLEVBQUU7QUFDSmtCLFlBQUFBLEVBQUUsRUFBRSxLQURBO0FBRUpHLFlBQUFBLEtBQUssRUFBRUYsR0FBRixhQUFFQSxHQUFGLHVCQUFFQSxHQUFHLENBQUVHLE9BRlI7QUFHSnRCLFlBQUFBLElBQUksRUFBRSxDQUFBbUIsR0FBRyxTQUFILElBQUFBLEdBQUcsV0FBSCxZQUFBQSxHQUFHLENBQUVuQixJQUFMLEtBQWE7QUFIZjtBQUZlLFNBQWhCLENBQVA7QUFRRDtBQUNGLEtBM0NpRDs7QUFDaEQsU0FBS0wsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7QUFMK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEFja25vd2xlZGdlZFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvdHlwZXNcIjtcbmltcG9ydCB7XG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gIElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50LFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyXCI7XG5pbXBvcnQgeyBJQVBJQ2FsbGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbW1vbkNhbGxlciB7XG4gIDxUPihhcmc6IGFueSk6IFQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4U2VydmljZSB7XG4gIG9zRHJpdmVyOiBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQpIHtcbiAgICB0aGlzLm9zRHJpdmVyID0gb3NEcml2ZXI7XG4gIH1cblxuICBhcGlDYWxsZXIgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxBY2tub3dsZWRnZWRSZXNwb25zZT4+PiA9PiB7XG4gICAgY29uc3QgdXNlUXVlcnkgPSAhcmVxdWVzdC5ib2R5O1xuICAgIGNvbnN0IHVzZWRQYXJhbSA9ICh1c2VRdWVyeSA/IHJlcXVlc3QucXVlcnkgOiByZXF1ZXN0LmJvZHkpIGFzIElBUElDYWxsZXI7XG4gICAgY29uc3QgeyBlbmRwb2ludCwgZGF0YSwgaGlkZUxvZyB9ID0gdXNlZFBhcmFtIHx8IHt9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBmaW5hbERhdGEgPSBkYXRhO1xuICAgICAgLyoqXG4gICAgICAgKiBVcGRhdGUgcGF0aCBwYXJhbWV0ZXIgdG8gZm9sbG93IFJGQy9nZW5lcmljIEhUVFAgY29udmVudGlvblxuICAgICAgICovXG4gICAgICBpZiAoZW5kcG9pbnQgPT09IFwidHJhbnNwb3J0LnJlcXVlc3RcIiAmJiB0eXBlb2YgZmluYWxEYXRhPy5wYXRoID09PSBcInN0cmluZ1wiICYmICEvXlxcLy8udGVzdChmaW5hbERhdGE/LnBhdGggfHwgXCJcIikpIHtcbiAgICAgICAgZmluYWxEYXRhLnBhdGggPSBgLyR7ZmluYWxEYXRhLnBhdGggfHwgXCJcIn1gO1xuICAgICAgfVxuICAgICAgY29uc3QgcGF5bG9hZCA9IHVzZVF1ZXJ5ID8gSlNPTi5wYXJzZShmaW5hbERhdGEgfHwgXCJ7fVwiKSA6IGZpbmFsRGF0YTtcbiAgICAgIGNvbnN0IGNvbW1vbkNhbGxlclJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KGVuZHBvaW50LCBwYXlsb2FkIHx8IHt9KTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogY29tbW9uQ2FsbGVyUmVzcG9uc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmICghaGlkZUxvZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIENvbW1vblNlcnZpY2UgLSBhcGlDYWxsZXJcIiwgZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVycj8ubWVzc2FnZSxcbiAgICAgICAgICBib2R5OiBlcnI/LmJvZHkgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==