"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineAuthTypeRoutes = defineAuthTypeRoutes;

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
function defineAuthTypeRoutes(router, config) {
  /**
   * Auth type API that returns current auth type configured on OpenSearchDashboards Server.
   *
   * GET /api/authtype
   * Response:
   *  200 OK
   *  {
   *    authtype: saml
   *  }
   */
  router.get({
    path: '/api/authtype',
    validate: false,
    options: {
      authRequired: false
    }
  }, async (context, request, response) => {
    const authType = config.auth.type || 'basicauth';
    return response.ok({
      body: {
        authtype: authType
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhfdHlwZV9yb3V0ZXMudHMiXSwibmFtZXMiOlsiZGVmaW5lQXV0aFR5cGVSb3V0ZXMiLCJyb3V0ZXIiLCJjb25maWciLCJnZXQiLCJwYXRoIiwidmFsaWRhdGUiLCJvcHRpb25zIiwiYXV0aFJlcXVpcmVkIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImF1dGhUeXBlIiwiYXV0aCIsInR5cGUiLCJvayIsImJvZHkiLCJhdXRodHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLTyxTQUFTQSxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBK0NDLE1BQS9DLEVBQWlGO0FBQ3RGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VELEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUNFO0FBQUVDLElBQUFBLElBQUksRUFBRSxlQUFSO0FBQXlCQyxJQUFBQSxRQUFRLEVBQUUsS0FBbkM7QUFBMENDLElBQUFBLE9BQU8sRUFBRTtBQUFFQyxNQUFBQSxZQUFZLEVBQUU7QUFBaEI7QUFBbkQsR0FERixFQUVFLE9BQU9DLE9BQVAsRUFBZ0JDLE9BQWhCLEVBQXlCQyxRQUF6QixLQUFzQztBQUNwQyxVQUFNQyxRQUFRLEdBQUdULE1BQU0sQ0FBQ1UsSUFBUCxDQUFZQyxJQUFaLElBQW9CLFdBQXJDO0FBQ0EsV0FBT0gsUUFBUSxDQUFDSSxFQUFULENBQVk7QUFDakJDLE1BQUFBLElBQUksRUFBRTtBQUNKQyxRQUFBQSxRQUFRLEVBQUVMO0FBRE47QUFEVyxLQUFaLENBQVA7QUFLRCxHQVRIO0FBV0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IElSb3V0ZXIgfSBmcm9tICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUF1dGhUeXBlUm91dGVzKHJvdXRlcjogSVJvdXRlciwgY29uZmlnOiBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGUpIHtcbiAgLyoqXG4gICAqIEF1dGggdHlwZSBBUEkgdGhhdCByZXR1cm5zIGN1cnJlbnQgYXV0aCB0eXBlIGNvbmZpZ3VyZWQgb24gT3BlblNlYXJjaERhc2hib2FyZHMgU2VydmVyLlxuICAgKlxuICAgKiBHRVQgL2FwaS9hdXRodHlwZVxuICAgKiBSZXNwb25zZTpcbiAgICogIDIwMCBPS1xuICAgKiAge1xuICAgKiAgICBhdXRodHlwZTogc2FtbFxuICAgKiAgfVxuICAgKi9cbiAgcm91dGVyLmdldChcbiAgICB7IHBhdGg6ICcvYXBpL2F1dGh0eXBlJywgdmFsaWRhdGU6IGZhbHNlLCBvcHRpb25zOiB7IGF1dGhSZXF1aXJlZDogZmFsc2UgfSB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgYXV0aFR5cGUgPSBjb25maWcuYXV0aC50eXBlIHx8ICdiYXNpY2F1dGgnO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGF1dGh0eXBlOiBhdXRoVHlwZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcbn1cbiJdfQ==