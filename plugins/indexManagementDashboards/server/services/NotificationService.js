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
class NotificationService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);

    _defineProperty(this, "getChannels", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getChannelsResponse = await callWithRequest("ism.getChannels");
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: getChannelsResponse
          }
        });
      } catch (err) {
        console.error("Index Management - NotificationService - getChannels:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "getChannelById", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getChannel", {
          id
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: getResponse
          }
        });
      } catch (err) {
        console.error("Index Management - NotificationService - getChannel:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    this.osDriver = osDriver;
  }

}

exports.default = NotificationService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5vdGlmaWNhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOlsiTm90aWZpY2F0aW9uU2VydmljZSIsImNvbnN0cnVjdG9yIiwib3NEcml2ZXIiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJjYWxsV2l0aFJlcXVlc3QiLCJhc1Njb3BlZCIsImdldENoYW5uZWxzUmVzcG9uc2UiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwiYm9keSIsIm9rIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsImlkIiwicGFyYW1zIiwiZ2V0UmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBYWUsTUFBTUEsbUJBQU4sQ0FBMEI7QUFHdkNDLEVBQUFBLFdBQVcsQ0FBQ0MsUUFBRCxFQUF1QztBQUFBOztBQUFBLHlDQUlwQyxPQUNaQyxPQURZLEVBRVpDLE9BRlksRUFHWkMsUUFIWSxLQUlvRjtBQUNoRyxVQUFJO0FBQ0YsY0FBTTtBQUFFQyxVQUFBQSxpQkFBaUIsRUFBRUM7QUFBckIsWUFBeUMsS0FBS0wsUUFBTCxDQUFjTSxRQUFkLENBQXVCSixPQUF2QixDQUEvQztBQUNBLGNBQU1LLG1CQUF3QyxHQUFHLE1BQU1GLGVBQWUsQ0FBQyxpQkFBRCxDQUF0RTtBQUVBLGVBQU9GLFFBQVEsQ0FBQ0ssTUFBVCxDQUFnQjtBQUNyQkMsVUFBQUEsVUFBVSxFQUFFLEdBRFM7QUFFckJDLFVBQUFBLElBQUksRUFBRTtBQUNKQyxZQUFBQSxFQUFFLEVBQUUsSUFEQTtBQUVKUixZQUFBQSxRQUFRLEVBQUVJO0FBRk47QUFGZSxTQUFoQixDQUFQO0FBT0QsT0FYRCxDQVdFLE9BQU9LLEdBQVAsRUFBWTtBQUNaQyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyx1REFBZCxFQUF1RUYsR0FBdkU7QUFDQSxlQUFPVCxRQUFRLENBQUNLLE1BQVQsQ0FBZ0I7QUFDckJDLFVBQUFBLFVBQVUsRUFBRSxHQURTO0FBRXJCQyxVQUFBQSxJQUFJLEVBQUU7QUFDSkMsWUFBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkcsWUFBQUEsS0FBSyxFQUFFRixHQUFHLENBQUNHO0FBRlA7QUFGZSxTQUFoQixDQUFQO0FBT0Q7QUFDRixLQTlCaUQ7O0FBQUEsNENBZ0NqQyxPQUNmZCxPQURlLEVBRWZDLE9BRmUsRUFHZkMsUUFIZSxLQUk0RjtBQUMzRyxVQUFJO0FBQ0YsY0FBTTtBQUFFYSxVQUFBQTtBQUFGLFlBQVNkLE9BQU8sQ0FBQ2UsTUFBdkI7QUFJQSxjQUFNO0FBQUViLFVBQUFBLGlCQUFpQixFQUFFQztBQUFyQixZQUF5QyxLQUFLTCxRQUFMLENBQWNNLFFBQWQsQ0FBdUJKLE9BQXZCLENBQS9DO0FBQ0EsY0FBTWdCLFdBQTJDLEdBQUcsTUFBTWIsZUFBZSxDQUFDLGdCQUFELEVBQW1CO0FBQzFGVyxVQUFBQTtBQUQwRixTQUFuQixDQUF6RTtBQUlBLGVBQU9iLFFBQVEsQ0FBQ0ssTUFBVCxDQUFnQjtBQUNyQkMsVUFBQUEsVUFBVSxFQUFFLEdBRFM7QUFFckJDLFVBQUFBLElBQUksRUFBRTtBQUNKQyxZQUFBQSxFQUFFLEVBQUUsSUFEQTtBQUVKUixZQUFBQSxRQUFRLEVBQUVlO0FBRk47QUFGZSxTQUFoQixDQUFQO0FBT0QsT0FqQkQsQ0FpQkUsT0FBT04sR0FBUCxFQUFZO0FBQ1pDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHNEQUFkLEVBQXNFRixHQUF0RTtBQUNBLGVBQU9ULFFBQVEsQ0FBQ0ssTUFBVCxDQUFnQjtBQUNyQkMsVUFBQUEsVUFBVSxFQUFFLEdBRFM7QUFFckJDLFVBQUFBLElBQUksRUFBRTtBQUNKQyxZQUFBQSxFQUFFLEVBQUUsS0FEQTtBQUVKRyxZQUFBQSxLQUFLLEVBQUVGLEdBQUcsQ0FBQ0c7QUFGUDtBQUZlLFNBQWhCLENBQVA7QUFPRDtBQUNGLEtBaEVpRDs7QUFDaEQsU0FBS2YsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7QUFMc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UsXG4gIElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50LFxuICBSZXNwb25zZUVycm9yLFxufSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlclwiO1xuaW1wb3J0IHsgU2VydmVyUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL3R5cGVzXCI7XG5pbXBvcnQgeyBHZXRDaGFubmVsc1Jlc3BvbnNlLCBHZXROb3RpZmljYXRpb25Db25maWdzUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIG9zRHJpdmVyOiBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQpIHtcbiAgICB0aGlzLm9zRHJpdmVyID0gb3NEcml2ZXI7XG4gIH1cblxuICBnZXRDaGFubmVscyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldENoYW5uZWxzUmVzcG9uc2U+IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZ2V0Q2hhbm5lbHNSZXNwb25zZTogR2V0Q2hhbm5lbHNSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRDaGFubmVsc1wiKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiBnZXRDaGFubmVsc1Jlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIE5vdGlmaWNhdGlvblNlcnZpY2UgLSBnZXRDaGFubmVsczpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldENoYW5uZWxCeUlkID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8R2V0Tm90aWZpY2F0aW9uQ29uZmlnc1Jlc3BvbnNlPiB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlOiBHZXROb3RpZmljYXRpb25Db25maWdzUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZ2V0Q2hhbm5lbFwiLCB7XG4gICAgICAgIGlkLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogZ2V0UmVzcG9uc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gTm90aWZpY2F0aW9uU2VydmljZSAtIGdldENoYW5uZWw6XCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==