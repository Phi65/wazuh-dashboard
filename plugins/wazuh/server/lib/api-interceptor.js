"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAsInternalUser = exports.requestAsCurrentUser = exports.authenticate = void 0;

var _axios2 = _interopRequireDefault(require("axios"));

var _manageHosts = require("./manage-hosts");

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Wazuh app - Interceptor API entries
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const httpsAgent = new _https.default.Agent({
  rejectUnauthorized: false
});

const _axios = _axios2.default.create({
  httpsAgent
});

const manageHosts = new _manageHosts.ManageHosts(); // Cache to save the token for the internal user by API host ID

const CacheInternalUserAPIHostToken = new Map();

const authenticate = async (apiHostID, authContext) => {
  try {
    const api = await manageHosts.getHostById(apiHostID);
    const optionsRequest = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      auth: {
        username: api.username,
        password: api.password
      },
      url: `${api.url}:${api.port}/security/user/authenticate${!!authContext ? '/run_as' : ''}`,
      ...(!!authContext ? {
        data: authContext
      } : {})
    };
    const response = await _axios(optionsRequest);
    const token = (((response || {}).data || {}).data || {}).token;

    if (!authContext) {
      CacheInternalUserAPIHostToken.set(apiHostID, token);
    }

    ;
    return token;
  } catch (error) {
    throw error;
  }
};

exports.authenticate = authenticate;

const buildRequestOptions = async (method, path, data, {
  apiHostID,
  forceRefresh,
  token
}) => {
  const api = await manageHosts.getHostById(apiHostID);
  const {
    body,
    params,
    headers,
    ...rest
  } = data;
  return {
    method: method,
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
      ...(headers ? headers : {})
    },
    data: body || rest || {},
    params: params || {},
    url: `${api.url}:${api.port}${path}`
  };
};

const requestAsInternalUser = async (method, path, data, options) => {
  try {
    const token = CacheInternalUserAPIHostToken.has(options.apiHostID) && !options.forceRefresh ? CacheInternalUserAPIHostToken.get(options.apiHostID) : await authenticate(options.apiHostID);
    return await request(method, path, data, { ...options,
      token
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const token = await authenticate(options.apiHostID);
        return await request(method, path, data, { ...options,
          token
        });
      } catch (error) {
        throw error;
      }
    }

    throw error;
  }
};

exports.requestAsInternalUser = requestAsInternalUser;

const requestAsCurrentUser = async (method, path, data, options) => {
  return await request(method, path, data, options);
};

exports.requestAsCurrentUser = requestAsCurrentUser;

const request = async (method, path, data, options) => {
  try {
    const optionsRequest = await buildRequestOptions(method, path, data, options);
    const response = await _axios(optionsRequest);
    return response;
  } catch (error) {
    throw error;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6WyJodHRwc0FnZW50IiwiaHR0cHMiLCJBZ2VudCIsInJlamVjdFVuYXV0aG9yaXplZCIsIl9heGlvcyIsImF4aW9zIiwiY3JlYXRlIiwibWFuYWdlSG9zdHMiLCJNYW5hZ2VIb3N0cyIsIkNhY2hlSW50ZXJuYWxVc2VyQVBJSG9zdFRva2VuIiwiTWFwIiwiYXV0aGVudGljYXRlIiwiYXBpSG9zdElEIiwiYXV0aENvbnRleHQiLCJhcGkiLCJnZXRIb3N0QnlJZCIsIm9wdGlvbnNSZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVycyIsImF1dGgiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidXJsIiwicG9ydCIsImRhdGEiLCJyZXNwb25zZSIsInRva2VuIiwic2V0IiwiZXJyb3IiLCJidWlsZFJlcXVlc3RPcHRpb25zIiwicGF0aCIsImZvcmNlUmVmcmVzaCIsImJvZHkiLCJwYXJhbXMiLCJyZXN0IiwiQXV0aG9yaXphdGlvbiIsInJlcXVlc3RBc0ludGVybmFsVXNlciIsIm9wdGlvbnMiLCJoYXMiLCJnZXQiLCJyZXF1ZXN0Iiwic3RhdHVzIiwicmVxdWVzdEFzQ3VycmVudFVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZQTs7QUFDQTs7QUFDQTs7OztBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxNQUFNQSxVQUFVLEdBQUcsSUFBSUMsZUFBTUMsS0FBVixDQUFnQjtBQUNqQ0MsRUFBQUEsa0JBQWtCLEVBQUU7QUFEYSxDQUFoQixDQUFuQjs7QUFJQSxNQUFNQyxNQUFNLEdBQUdDLGdCQUFNQyxNQUFOLENBQWE7QUFBRU4sRUFBQUE7QUFBRixDQUFiLENBQWY7O0FBb0JBLE1BQU1PLFdBQVcsR0FBRyxJQUFJQyx3QkFBSixFQUFwQixDLENBRUE7O0FBQ0EsTUFBTUMsNkJBQTZCLEdBQUcsSUFBSUMsR0FBSixFQUF0Qzs7QUFFTyxNQUFNQyxZQUFZLEdBQUcsT0FBT0MsU0FBUCxFQUEwQkMsV0FBMUIsS0FBaUU7QUFDM0YsTUFBRztBQUNELFVBQU1DLEdBQVksR0FBRyxNQUFNUCxXQUFXLENBQUNRLFdBQVosQ0FBd0JILFNBQXhCLENBQTNCO0FBQ0EsVUFBTUksY0FBYyxHQUFHO0FBQ3JCQyxNQUFBQSxNQUFNLEVBQUUsTUFEYTtBQUVyQkMsTUFBQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FGWTtBQUtyQkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLFFBQVEsRUFBRU4sR0FBRyxDQUFDTSxRQURWO0FBRUpDLFFBQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTztBQUZWLE9BTGU7QUFTckJDLE1BQUFBLEdBQUcsRUFBRyxHQUFFUixHQUFHLENBQUNRLEdBQUksSUFBR1IsR0FBRyxDQUFDUyxJQUFLLDhCQUE2QixDQUFDLENBQUNWLFdBQUYsR0FBZ0IsU0FBaEIsR0FBNEIsRUFBRyxFQVRuRTtBQVVyQixVQUFJLENBQUMsQ0FBQ0EsV0FBRixHQUFnQjtBQUFFVyxRQUFBQSxJQUFJLEVBQUVYO0FBQVIsT0FBaEIsR0FBd0MsRUFBNUM7QUFWcUIsS0FBdkI7QUFhQSxVQUFNWSxRQUF1QixHQUFHLE1BQU1yQixNQUFNLENBQUNZLGNBQUQsQ0FBNUM7QUFDQSxVQUFNVSxLQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUNELFFBQVEsSUFBSSxFQUFiLEVBQWlCRCxJQUFqQixJQUF5QixFQUExQixFQUE4QkEsSUFBOUIsSUFBc0MsRUFBdkMsRUFBMkNFLEtBQWpFOztBQUNBLFFBQUksQ0FBQ2IsV0FBTCxFQUFrQjtBQUNoQkosTUFBQUEsNkJBQTZCLENBQUNrQixHQUE5QixDQUFrQ2YsU0FBbEMsRUFBNkNjLEtBQTdDO0FBQ0Q7O0FBQUE7QUFDRCxXQUFPQSxLQUFQO0FBQ0QsR0FyQkQsQ0FxQkMsT0FBTUUsS0FBTixFQUFZO0FBQ1gsVUFBTUEsS0FBTjtBQUNEO0FBQ0YsQ0F6Qk07Ozs7QUEyQlAsTUFBTUMsbUJBQW1CLEdBQUcsT0FBT1osTUFBUCxFQUF1QmEsSUFBdkIsRUFBcUNOLElBQXJDLEVBQWdEO0FBQUVaLEVBQUFBLFNBQUY7QUFBYW1CLEVBQUFBLFlBQWI7QUFBMkJMLEVBQUFBO0FBQTNCLENBQWhELEtBQXFIO0FBQy9JLFFBQU1aLEdBQUcsR0FBRyxNQUFNUCxXQUFXLENBQUNRLFdBQVosQ0FBd0JILFNBQXhCLENBQWxCO0FBQ0EsUUFBTTtBQUFFb0IsSUFBQUEsSUFBRjtBQUFRQyxJQUFBQSxNQUFSO0FBQWdCZixJQUFBQSxPQUFoQjtBQUF5QixPQUFHZ0I7QUFBNUIsTUFBcUNWLElBQTNDO0FBQ0EsU0FBTztBQUNMUCxJQUFBQSxNQUFNLEVBQUVBLE1BREg7QUFFTEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asc0JBQWdCLGtCQURUO0FBRVBpQixNQUFBQSxhQUFhLEVBQUUsWUFBWVQsS0FGcEI7QUFHUCxVQUFJUixPQUFPLEdBQUdBLE9BQUgsR0FBYSxFQUF4QjtBQUhPLEtBRko7QUFPTE0sSUFBQUEsSUFBSSxFQUFFUSxJQUFJLElBQUlFLElBQVIsSUFBZ0IsRUFQakI7QUFRTEQsSUFBQUEsTUFBTSxFQUFFQSxNQUFNLElBQUksRUFSYjtBQVNMWCxJQUFBQSxHQUFHLEVBQUcsR0FBRVIsR0FBRyxDQUFDUSxHQUFJLElBQUdSLEdBQUcsQ0FBQ1MsSUFBSyxHQUFFTyxJQUFLO0FBVDlCLEdBQVA7QUFXRCxDQWREOztBQWdCTyxNQUFNTSxxQkFBcUIsR0FBRyxPQUFPbkIsTUFBUCxFQUF1QmEsSUFBdkIsRUFBcUNOLElBQXJDLEVBQWdEYSxPQUFoRCxLQUFzRztBQUN6SSxNQUFHO0FBQ0QsVUFBTVgsS0FBSyxHQUFHakIsNkJBQTZCLENBQUM2QixHQUE5QixDQUFrQ0QsT0FBTyxDQUFDekIsU0FBMUMsS0FBd0QsQ0FBQ3lCLE9BQU8sQ0FBQ04sWUFBakUsR0FDVnRCLDZCQUE2QixDQUFDOEIsR0FBOUIsQ0FBa0NGLE9BQU8sQ0FBQ3pCLFNBQTFDLENBRFUsR0FFVixNQUFNRCxZQUFZLENBQUMwQixPQUFPLENBQUN6QixTQUFULENBRnRCO0FBR0EsV0FBTyxNQUFNNEIsT0FBTyxDQUFDdkIsTUFBRCxFQUFTYSxJQUFULEVBQWVOLElBQWYsRUFBcUIsRUFBQyxHQUFHYSxPQUFKO0FBQWFYLE1BQUFBO0FBQWIsS0FBckIsQ0FBcEI7QUFDRCxHQUxELENBS0MsT0FBTUUsS0FBTixFQUFZO0FBQ1gsUUFBSUEsS0FBSyxDQUFDSCxRQUFOLElBQWtCRyxLQUFLLENBQUNILFFBQU4sQ0FBZWdCLE1BQWYsS0FBMEIsR0FBaEQsRUFBcUQ7QUFDbkQsVUFBRztBQUNELGNBQU1mLEtBQWEsR0FBRyxNQUFNZixZQUFZLENBQUMwQixPQUFPLENBQUN6QixTQUFULENBQXhDO0FBQ0EsZUFBTyxNQUFNNEIsT0FBTyxDQUFDdkIsTUFBRCxFQUFTYSxJQUFULEVBQWVOLElBQWYsRUFBcUIsRUFBQyxHQUFHYSxPQUFKO0FBQWFYLFVBQUFBO0FBQWIsU0FBckIsQ0FBcEI7QUFDRCxPQUhELENBR0MsT0FBTUUsS0FBTixFQUFZO0FBQ1gsY0FBTUEsS0FBTjtBQUNEO0FBQ0Y7O0FBQ0QsVUFBTUEsS0FBTjtBQUNEO0FBQ0YsQ0FqQk07Ozs7QUFtQkEsTUFBTWMsb0JBQW9CLEdBQUcsT0FBT3pCLE1BQVAsRUFBdUJhLElBQXZCLEVBQXFDTixJQUFyQyxFQUFnRGEsT0FBaEQsS0FBMEY7QUFDNUgsU0FBTyxNQUFNRyxPQUFPLENBQUN2QixNQUFELEVBQVNhLElBQVQsRUFBZU4sSUFBZixFQUFxQmEsT0FBckIsQ0FBcEI7QUFDRCxDQUZNOzs7O0FBSVAsTUFBTUcsT0FBTyxHQUFHLE9BQU92QixNQUFQLEVBQXVCYSxJQUF2QixFQUFxQ04sSUFBckMsRUFBZ0RhLE9BQWhELEtBQXlGO0FBQ3ZHLE1BQUc7QUFDRCxVQUFNckIsY0FBYyxHQUFHLE1BQU1hLG1CQUFtQixDQUFDWixNQUFELEVBQVNhLElBQVQsRUFBZU4sSUFBZixFQUFxQmEsT0FBckIsQ0FBaEQ7QUFDQSxVQUFNWixRQUF1QixHQUFHLE1BQU1yQixNQUFNLENBQUNZLGNBQUQsQ0FBNUM7QUFDQSxXQUFPUyxRQUFQO0FBQ0QsR0FKRCxDQUlDLE9BQU1HLEtBQU4sRUFBWTtBQUNYLFVBQU1BLEtBQU47QUFDRDtBQUNGLENBUkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gSW50ZXJjZXB0b3IgQVBJIGVudHJpZXNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbmltcG9ydCBheGlvcywgeyBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgTWFuYWdlSG9zdHMgfSBmcm9tICcuL21hbmFnZS1ob3N0cyc7XG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuXG5jb25zdCBodHRwc0FnZW50ID0gbmV3IGh0dHBzLkFnZW50KHtcbiAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbn0pO1xuXG5jb25zdCBfYXhpb3MgPSBheGlvcy5jcmVhdGUoeyBodHRwc0FnZW50IH0pO1xuXG5pbnRlcmZhY2UgQVBJSG9zdHtcbiAgdXJsOiBzdHJpbmdcbiAgcG9ydDogc3RyaW5nXG4gIHVzZXJuYW1lOiBzdHJpbmdcbiAgcGFzc3dvcmQ6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFQSUludGVyY2VwdG9yUmVxdWVzdE9wdGlvbnN7XG4gIGFwaUhvc3RJRDogc3RyaW5nXG4gIHRva2VuOiBzdHJpbmdcbiAgZm9yY2VSZWZyZXNoPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFQSUludGVyY2VwdG9yUmVxdWVzdE9wdGlvbnNJbnRlcm5hbFVzZXJ7XG4gIGFwaUhvc3RJRDogc3RyaW5nXG4gIGZvcmNlUmVmcmVzaD86IGJvb2xlYW5cbn1cblxuY29uc3QgbWFuYWdlSG9zdHMgPSBuZXcgTWFuYWdlSG9zdHMoKTtcblxuLy8gQ2FjaGUgdG8gc2F2ZSB0aGUgdG9rZW4gZm9yIHRoZSBpbnRlcm5hbCB1c2VyIGJ5IEFQSSBob3N0IElEXG5jb25zdCBDYWNoZUludGVybmFsVXNlckFQSUhvc3RUb2tlbiA9IG5ldyBNYXA8c3RyaW5nLHN0cmluZz4oKTtcblxuZXhwb3J0IGNvbnN0IGF1dGhlbnRpY2F0ZSA9IGFzeW5jIChhcGlIb3N0SUQ6IHN0cmluZywgYXV0aENvbnRleHQ/OiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICB0cnl7XG4gICAgY29uc3QgYXBpOiBBUElIb3N0ID0gYXdhaXQgbWFuYWdlSG9zdHMuZ2V0SG9zdEJ5SWQoYXBpSG9zdElEKTtcbiAgICBjb25zdCBvcHRpb25zUmVxdWVzdCA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcm5hbWU6IGFwaS51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IGFwaS5wYXNzd29yZCxcbiAgICAgIH0sXG4gICAgICB1cmw6IGAke2FwaS51cmx9OiR7YXBpLnBvcnR9L3NlY3VyaXR5L3VzZXIvYXV0aGVudGljYXRlJHshIWF1dGhDb250ZXh0ID8gJy9ydW5fYXMnIDogJyd9YCxcbiAgICAgIC4uLighIWF1dGhDb250ZXh0ID8geyBkYXRhOiBhdXRoQ29udGV4dCB9IDoge30pXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlID0gYXdhaXQgX2F4aW9zKG9wdGlvbnNSZXF1ZXN0KTtcbiAgICBjb25zdCB0b2tlbjogc3RyaW5nID0gKCgocmVzcG9uc2UgfHwge30pLmRhdGEgfHwge30pLmRhdGEgfHwge30pLnRva2VuO1xuICAgIGlmICghYXV0aENvbnRleHQpIHtcbiAgICAgIENhY2hlSW50ZXJuYWxVc2VyQVBJSG9zdFRva2VuLnNldChhcGlIb3N0SUQsIHRva2VuKTtcbiAgICB9O1xuICAgIHJldHVybiB0b2tlbjtcbiAgfWNhdGNoKGVycm9yKXtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuY29uc3QgYnVpbGRSZXF1ZXN0T3B0aW9ucyA9IGFzeW5jIChtZXRob2Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIHsgYXBpSG9zdElELCBmb3JjZVJlZnJlc2gsIHRva2VuIH06IEFQSUludGVyY2VwdG9yUmVxdWVzdE9wdGlvbnMpID0+IHtcbiAgY29uc3QgYXBpID0gYXdhaXQgbWFuYWdlSG9zdHMuZ2V0SG9zdEJ5SWQoYXBpSG9zdElEKTtcbiAgY29uc3QgeyBib2R5LCBwYXJhbXMsIGhlYWRlcnMsIC4uLnJlc3QgfSA9IGRhdGE7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIEF1dGhvcml6YXRpb246ICdCZWFyZXIgJyArIHRva2VuLFxuICAgICAgLi4uKGhlYWRlcnMgPyBoZWFkZXJzIDoge30pXG4gICAgfSxcbiAgICBkYXRhOiBib2R5IHx8IHJlc3QgfHwge30sXG4gICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgdXJsOiBgJHthcGkudXJsfToke2FwaS5wb3J0fSR7cGF0aH1gLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0QXNJbnRlcm5hbFVzZXIgPSBhc3luYyAobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBBUElJbnRlcmNlcHRvclJlcXVlc3RPcHRpb25zSW50ZXJuYWxVc2VyKSA9PiB7XG4gIHRyeXtcbiAgICBjb25zdCB0b2tlbiA9IENhY2hlSW50ZXJuYWxVc2VyQVBJSG9zdFRva2VuLmhhcyhvcHRpb25zLmFwaUhvc3RJRCkgJiYgIW9wdGlvbnMuZm9yY2VSZWZyZXNoXG4gICAgICA/IENhY2hlSW50ZXJuYWxVc2VyQVBJSG9zdFRva2VuLmdldChvcHRpb25zLmFwaUhvc3RJRClcbiAgICAgIDogYXdhaXQgYXV0aGVudGljYXRlKG9wdGlvbnMuYXBpSG9zdElEKTtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEsIHsuLi5vcHRpb25zLCB0b2tlbn0pO1xuICB9Y2F0Y2goZXJyb3Ipe1xuICAgIGlmIChlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgdHJ5e1xuICAgICAgICBjb25zdCB0b2tlbjogc3RyaW5nID0gYXdhaXQgYXV0aGVudGljYXRlKG9wdGlvbnMuYXBpSG9zdElEKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QobWV0aG9kLCBwYXRoLCBkYXRhLCB7Li4ub3B0aW9ucywgdG9rZW59KTtcbiAgICAgIH1jYXRjaChlcnJvcil7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlcXVlc3RBc0N1cnJlbnRVc2VyID0gYXN5bmMgKG1ldGhvZDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9uczogQVBJSW50ZXJjZXB0b3JSZXF1ZXN0T3B0aW9ucykgPT4ge1xuICByZXR1cm4gYXdhaXQgcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEsIG9wdGlvbnMpXG59O1xuXG5jb25zdCByZXF1ZXN0ID0gYXN5bmMgKG1ldGhvZDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9uczogYW55KTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPiA9PiB7XG4gIHRyeXtcbiAgICBjb25zdCBvcHRpb25zUmVxdWVzdCA9IGF3YWl0IGJ1aWxkUmVxdWVzdE9wdGlvbnMobWV0aG9kLCBwYXRoLCBkYXRhLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXNwb25zZTogQXhpb3NSZXNwb25zZSA9IGF3YWl0IF9heGlvcyhvcHRpb25zUmVxdWVzdCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9Y2F0Y2goZXJyb3Ipe1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuIl19