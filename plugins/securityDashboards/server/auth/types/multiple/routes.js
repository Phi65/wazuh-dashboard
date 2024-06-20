"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiAuthRoutes = void 0;

var _common = require("../../../../common");

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
class MultiAuthRoutes {
  constructor(router, sessionStorageFactory) {
    this.router = router;
    this.sessionStorageFactory = sessionStorageFactory;
  }

  setupRoutes() {
    this.router.get({
      path: _common.API_ENDPOINT_AUTHTYPE,
      validate: false
    }, async (context, request, response) => {
      const cookie = await this.sessionStorageFactory.asScoped(request).get();

      if (!cookie) {
        return response.badRequest({
          body: 'Invalid cookie'
        });
      }

      return response.ok({
        body: {
          currentAuthType: cookie === null || cookie === void 0 ? void 0 : cookie.authType
        }
      });
    });
  }

}

exports.MultiAuthRoutes = MultiAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6WyJNdWx0aUF1dGhSb3V0ZXMiLCJjb25zdHJ1Y3RvciIsInJvdXRlciIsInNlc3Npb25TdG9yYWdlRmFjdG9yeSIsInNldHVwUm91dGVzIiwiZ2V0IiwicGF0aCIsIkFQSV9FTkRQT0lOVF9BVVRIVFlQRSIsInZhbGlkYXRlIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImNvb2tpZSIsImFzU2NvcGVkIiwiYmFkUmVxdWVzdCIsImJvZHkiLCJvayIsImN1cnJlbnRBdXRoVHlwZSIsImF1dGhUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBaUJBOztBQWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTU8sTUFBTUEsZUFBTixDQUFzQjtBQUMzQkMsRUFBQUEsV0FBVyxDQUNRQyxNQURSLEVBRVFDLHFCQUZSLEVBR1Q7QUFBQSxTQUZpQkQsTUFFakIsR0FGaUJBLE1BRWpCO0FBQUEsU0FEaUJDLHFCQUNqQixHQURpQkEscUJBQ2pCO0FBQUU7O0FBRUdDLEVBQUFBLFdBQVcsR0FBRztBQUNuQixTQUFLRixNQUFMLENBQVlHLEdBQVosQ0FDRTtBQUNFQyxNQUFBQSxJQUFJLEVBQUVDLDZCQURSO0FBRUVDLE1BQUFBLFFBQVEsRUFBRTtBQUZaLEtBREYsRUFLRSxPQUFPQyxPQUFQLEVBQWdCQyxPQUFoQixFQUF5QkMsUUFBekIsS0FBc0M7QUFDcEMsWUFBTUMsTUFBTSxHQUFHLE1BQU0sS0FBS1QscUJBQUwsQ0FBMkJVLFFBQTNCLENBQW9DSCxPQUFwQyxFQUE2Q0wsR0FBN0MsRUFBckI7O0FBQ0EsVUFBSSxDQUFDTyxNQUFMLEVBQWE7QUFDWCxlQUFPRCxRQUFRLENBQUNHLFVBQVQsQ0FBb0I7QUFDekJDLFVBQUFBLElBQUksRUFBRTtBQURtQixTQUFwQixDQUFQO0FBR0Q7O0FBQ0QsYUFBT0osUUFBUSxDQUFDSyxFQUFULENBQVk7QUFDakJELFFBQUFBLElBQUksRUFBRTtBQUNKRSxVQUFBQSxlQUFlLEVBQUVMLE1BQUYsYUFBRUEsTUFBRix1QkFBRUEsTUFBTSxDQUFFTTtBQURyQjtBQURXLE9BQVosQ0FBUDtBQUtELEtBakJIO0FBbUJEOztBQTFCMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IElSb3V0ZXIsIFNlc3Npb25TdG9yYWdlRmFjdG9yeSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBTZWN1cml0eVNlc3Npb25Db29raWUgfSBmcm9tICcuLi8uLi8uLi9zZXNzaW9uL3NlY3VyaXR5X2Nvb2tpZSc7XG5pbXBvcnQgeyBBUElfRU5EUE9JTlRfQVVUSFRZUEUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24nO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlBdXRoUm91dGVzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IElSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZUZhY3Rvcnk6IFNlc3Npb25TdG9yYWdlRmFjdG9yeTxTZWN1cml0eVNlc3Npb25Db29raWU+XG4gICkge31cblxuICBwdWJsaWMgc2V0dXBSb3V0ZXMoKSB7XG4gICAgdGhpcy5yb3V0ZXIuZ2V0KFxuICAgICAge1xuICAgICAgICBwYXRoOiBBUElfRU5EUE9JTlRfQVVUSFRZUEUsXG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgY29va2llID0gYXdhaXQgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuZ2V0KCk7XG4gICAgICAgIGlmICghY29va2llKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJhZFJlcXVlc3Qoe1xuICAgICAgICAgICAgYm9keTogJ0ludmFsaWQgY29va2llJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIGN1cnJlbnRBdXRoVHlwZTogY29va2llPy5hdXRoVHlwZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=