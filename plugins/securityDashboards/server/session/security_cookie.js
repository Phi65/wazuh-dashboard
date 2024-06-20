"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearOldVersionCookieValue = clearOldVersionCookieValue;
exports.getSecurityCookieOptions = getSecurityCookieOptions;

/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */
function getSecurityCookieOptions(config) {
  return {
    name: config.cookie.name,
    encryptionKey: config.cookie.password,
    validate: sessionStorage => {
      sessionStorage = sessionStorage;

      if (sessionStorage === undefined) {
        return {
          isValid: false,
          path: '/'
        };
      } // TODO: with setting redirect attributes to support OIDC and SAML,
      //       we need to do additonal cookie validatin in AuthenticationHandlers.
      // if SAML fields present


      if (sessionStorage.saml && sessionStorage.saml.requestId && sessionStorage.saml.nextUrl) {
        return {
          isValid: true,
          path: '/'
        };
      } // if OIDC fields present


      if (sessionStorage.oidc) {
        return {
          isValid: true,
          path: '/'
        };
      }

      if (sessionStorage.expiryTime === undefined || sessionStorage.expiryTime < Date.now()) {
        return {
          isValid: false,
          path: '/'
        };
      }

      return {
        isValid: true,
        path: '/'
      };
    },
    isSecure: config.cookie.secure,
    sameSite: config.cookie.isSameSite || undefined
  };
}

function clearOldVersionCookieValue(config) {
  if (config.cookie.secure) {
    return 'security_authentication=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; Path=/';
  } else {
    return 'security_authentication=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/';
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3VyaXR5X2Nvb2tpZS50cyJdLCJuYW1lcyI6WyJnZXRTZWN1cml0eUNvb2tpZU9wdGlvbnMiLCJjb25maWciLCJuYW1lIiwiY29va2llIiwiZW5jcnlwdGlvbktleSIsInBhc3N3b3JkIiwidmFsaWRhdGUiLCJzZXNzaW9uU3RvcmFnZSIsInVuZGVmaW5lZCIsImlzVmFsaWQiLCJwYXRoIiwic2FtbCIsInJlcXVlc3RJZCIsIm5leHRVcmwiLCJvaWRjIiwiZXhwaXJ5VGltZSIsIkRhdGUiLCJub3ciLCJpc1NlY3VyZSIsInNlY3VyZSIsInNhbWVTaXRlIiwiaXNTYW1lU2l0ZSIsImNsZWFyT2xkVmVyc2lvbkNvb2tpZVZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE2Qk8sU0FBU0Esd0JBQVQsQ0FDTEMsTUFESyxFQUUrQztBQUNwRCxTQUFPO0FBQ0xDLElBQUFBLElBQUksRUFBRUQsTUFBTSxDQUFDRSxNQUFQLENBQWNELElBRGY7QUFFTEUsSUFBQUEsYUFBYSxFQUFFSCxNQUFNLENBQUNFLE1BQVAsQ0FBY0UsUUFGeEI7QUFHTEMsSUFBQUEsUUFBUSxFQUFHQyxjQUFELElBQXFFO0FBQzdFQSxNQUFBQSxjQUFjLEdBQUdBLGNBQWpCOztBQUNBLFVBQUlBLGNBQWMsS0FBS0MsU0FBdkIsRUFBa0M7QUFDaEMsZUFBTztBQUFFQyxVQUFBQSxPQUFPLEVBQUUsS0FBWDtBQUFrQkMsVUFBQUEsSUFBSSxFQUFFO0FBQXhCLFNBQVA7QUFDRCxPQUo0RSxDQU03RTtBQUNBO0FBQ0E7OztBQUNBLFVBQUlILGNBQWMsQ0FBQ0ksSUFBZixJQUF1QkosY0FBYyxDQUFDSSxJQUFmLENBQW9CQyxTQUEzQyxJQUF3REwsY0FBYyxDQUFDSSxJQUFmLENBQW9CRSxPQUFoRixFQUF5RjtBQUN2RixlQUFPO0FBQUVKLFVBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCQyxVQUFBQSxJQUFJLEVBQUU7QUFBdkIsU0FBUDtBQUNELE9BWDRFLENBYTdFOzs7QUFDQSxVQUFJSCxjQUFjLENBQUNPLElBQW5CLEVBQXlCO0FBQ3ZCLGVBQU87QUFBRUwsVUFBQUEsT0FBTyxFQUFFLElBQVg7QUFBaUJDLFVBQUFBLElBQUksRUFBRTtBQUF2QixTQUFQO0FBQ0Q7O0FBRUQsVUFBSUgsY0FBYyxDQUFDUSxVQUFmLEtBQThCUCxTQUE5QixJQUEyQ0QsY0FBYyxDQUFDUSxVQUFmLEdBQTRCQyxJQUFJLENBQUNDLEdBQUwsRUFBM0UsRUFBdUY7QUFDckYsZUFBTztBQUFFUixVQUFBQSxPQUFPLEVBQUUsS0FBWDtBQUFrQkMsVUFBQUEsSUFBSSxFQUFFO0FBQXhCLFNBQVA7QUFDRDs7QUFDRCxhQUFPO0FBQUVELFFBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCQyxRQUFBQSxJQUFJLEVBQUU7QUFBdkIsT0FBUDtBQUNELEtBekJJO0FBMEJMUSxJQUFBQSxRQUFRLEVBQUVqQixNQUFNLENBQUNFLE1BQVAsQ0FBY2dCLE1BMUJuQjtBQTJCTEMsSUFBQUEsUUFBUSxFQUFFbkIsTUFBTSxDQUFDRSxNQUFQLENBQWNrQixVQUFkLElBQTRCYjtBQTNCakMsR0FBUDtBQTZCRDs7QUFFTSxTQUFTYywwQkFBVCxDQUFvQ3JCLE1BQXBDLEVBQThFO0FBQ25GLE1BQUlBLE1BQU0sQ0FBQ0UsTUFBUCxDQUFjZ0IsTUFBbEIsRUFBMEI7QUFDeEIsV0FBTyxzR0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sOEZBQVA7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBTZXNzaW9uU3RvcmFnZUNvb2tpZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlIH0gZnJvbSAnLi4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSB7XG4gIC8vIHNlY3VyaXR5X2F1dGhlbnRpY2F0aW9uXG4gIHVzZXJuYW1lPzogc3RyaW5nO1xuICBjcmVkZW50aWFscz86IGFueTtcbiAgYXV0aFR5cGU/OiBzdHJpbmc7XG4gIGFzc2lnbkF1dGhIZWFkZXI/OiBib29sZWFuO1xuICBpc0Fub255bW91c0F1dGg/OiBib29sZWFuO1xuICBleHBpcnlUaW1lPzogbnVtYmVyO1xuICBhZGRpdGlvbmFsQXV0aEhlYWRlcnM/OiBhbnk7XG5cbiAgLy8gc2VjdXJpdHlfc3RvcmFnZVxuICB0ZW5hbnQ/OiBhbnk7XG5cbiAgLy8gZm9yIG9pZGMgYXV0aCB3b3JrZmxvd1xuICBvaWRjPzogYW55O1xuXG4gIC8vIGZvciBTYW1sIGF1dGggd29ya2Zsb3dcbiAgc2FtbD86IHtcbiAgICByZXF1ZXN0SWQ/OiBzdHJpbmc7XG4gICAgbmV4dFVybD86IHN0cmluZztcbiAgICByZWRpcmVjdEhhc2g/OiBib29sZWFuO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VjdXJpdHlDb29raWVPcHRpb25zKFxuICBjb25maWc6IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZVxuKTogU2Vzc2lvblN0b3JhZ2VDb29raWVPcHRpb25zPFNlY3VyaXR5U2Vzc2lvbkNvb2tpZT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGNvbmZpZy5jb29raWUubmFtZSxcbiAgICBlbmNyeXB0aW9uS2V5OiBjb25maWcuY29va2llLnBhc3N3b3JkLFxuICAgIHZhbGlkYXRlOiAoc2Vzc2lvblN0b3JhZ2U6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSB8IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZVtdKSA9PiB7XG4gICAgICBzZXNzaW9uU3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlIGFzIFNlY3VyaXR5U2Vzc2lvbkNvb2tpZTtcbiAgICAgIGlmIChzZXNzaW9uU3RvcmFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7IGlzVmFsaWQ6IGZhbHNlLCBwYXRoOiAnLycgfTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogd2l0aCBzZXR0aW5nIHJlZGlyZWN0IGF0dHJpYnV0ZXMgdG8gc3VwcG9ydCBPSURDIGFuZCBTQU1MLFxuICAgICAgLy8gICAgICAgd2UgbmVlZCB0byBkbyBhZGRpdG9uYWwgY29va2llIHZhbGlkYXRpbiBpbiBBdXRoZW50aWNhdGlvbkhhbmRsZXJzLlxuICAgICAgLy8gaWYgU0FNTCBmaWVsZHMgcHJlc2VudFxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLnNhbWwgJiYgc2Vzc2lvblN0b3JhZ2Uuc2FtbC5yZXF1ZXN0SWQgJiYgc2Vzc2lvblN0b3JhZ2Uuc2FtbC5uZXh0VXJsKSB7XG4gICAgICAgIHJldHVybiB7IGlzVmFsaWQ6IHRydWUsIHBhdGg6ICcvJyB9O1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBPSURDIGZpZWxkcyBwcmVzZW50XG4gICAgICBpZiAoc2Vzc2lvblN0b3JhZ2Uub2lkYykge1xuICAgICAgICByZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCBwYXRoOiAnLycgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmV4cGlyeVRpbWUgPT09IHVuZGVmaW5lZCB8fCBzZXNzaW9uU3RvcmFnZS5leHBpcnlUaW1lIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICByZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcGF0aDogJy8nIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCBwYXRoOiAnLycgfTtcbiAgICB9LFxuICAgIGlzU2VjdXJlOiBjb25maWcuY29va2llLnNlY3VyZSxcbiAgICBzYW1lU2l0ZTogY29uZmlnLmNvb2tpZS5pc1NhbWVTaXRlIHx8IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyT2xkVmVyc2lvbkNvb2tpZVZhbHVlKGNvbmZpZzogU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlKTogc3RyaW5nIHtcbiAgaWYgKGNvbmZpZy5jb29raWUuc2VjdXJlKSB7XG4gICAgcmV0dXJuICdzZWN1cml0eV9hdXRoZW50aWNhdGlvbj07IE1heC1BZ2U9MDsgRXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVDsgU2VjdXJlOyBIdHRwT25seTsgUGF0aD0vJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ3NlY3VyaXR5X2F1dGhlbnRpY2F0aW9uPTsgTWF4LUFnZT0wOyBFeHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UOyBIdHRwT25seTsgUGF0aD0vJztcbiAgfVxufVxuIl19