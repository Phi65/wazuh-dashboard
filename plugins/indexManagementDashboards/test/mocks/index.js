"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCallerMock = void 0;
Object.defineProperty(exports, "browserServicesMock", {
  enumerable: true,
  get: function () {
    return _browserServicesMock.default;
  }
});
Object.defineProperty(exports, "coreServicesMock", {
  enumerable: true,
  get: function () {
    return _coreServicesMock.default;
  }
});
Object.defineProperty(exports, "historyMock", {
  enumerable: true,
  get: function () {
    return _historyMock.default;
  }
});
Object.defineProperty(exports, "httpClientMock", {
  enumerable: true,
  get: function () {
    return _httpClientMock.default;
  }
});
Object.defineProperty(exports, "styleMock", {
  enumerable: true,
  get: function () {
    return _styleMock.default;
  }
});

var _browserServicesMock = _interopRequireDefault(require("./browserServicesMock"));

var _historyMock = _interopRequireDefault(require("./historyMock"));

var _httpClientMock = _interopRequireDefault(require("./httpClientMock"));

var _styleMock = _interopRequireDefault(require("./styleMock"));

var _coreServicesMock = _interopRequireDefault(require("./coreServicesMock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const apiCallerMock = browserServicesMockObject => {
  browserServicesMockObject.commonService.apiCaller = jest.fn(async payload => {
    var _payload$data5, _payload$data6, _payload$data7;

    switch (payload.endpoint) {
      case "transport.request":
        {
          var _payload$data, _payload$data$path, _payload$data2, _payload$data2$path, _payload$data3, _payload$data3$path, _payload$data4, _payload$data4$path;

          if ((_payload$data = payload.data) !== null && _payload$data !== void 0 && (_payload$data$path = _payload$data.path) !== null && _payload$data$path !== void 0 && _payload$data$path.startsWith("/_index_template/_simulate_index/bad_index")) {
            return {
              ok: true,
              response: {}
            };
          } else if ((_payload$data2 = payload.data) !== null && _payload$data2 !== void 0 && (_payload$data2$path = _payload$data2.path) !== null && _payload$data2$path !== void 0 && _payload$data2$path.startsWith("/_index_template/bad_template")) {
            return {
              ok: false,
              error: "bad template"
            };
          } else if ((_payload$data3 = payload.data) !== null && _payload$data3 !== void 0 && (_payload$data3$path = _payload$data3.path) !== null && _payload$data3$path !== void 0 && _payload$data3$path.startsWith("/_index_template/good_template")) {
            return {
              ok: true,
              response: {
                index_templates: [{
                  name: "good_template",
                  index_template: {}
                }]
              }
            };
          } else if ((_payload$data4 = payload.data) !== null && _payload$data4 !== void 0 && (_payload$data4$path = _payload$data4.path) !== null && _payload$data4$path !== void 0 && _payload$data4$path.startsWith("/_component_template/good_template")) {
            return {
              ok: true,
              response: {
                component_templates: [{
                  name: "good_template",
                  component_template: {
                    template: {}
                  }
                }]
              }
            };
          } else {
            return {
              ok: true,
              response: {
                template: {
                  settings: {
                    index: {
                      number_of_replicas: "10",
                      number_of_shards: "1"
                    }
                  }
                }
              }
            };
          }
        }

      case "indices.create":
        if (((_payload$data5 = payload.data) === null || _payload$data5 === void 0 ? void 0 : _payload$data5.index) === "bad_index") {
          return {
            ok: false,
            error: "bad_index"
          };
        }

        return {
          ok: true,
          response: {}
        };
        break;

      case "cat.aliases":
        return {
          ok: true,
          response: [{
            alias: ".kibana",
            index: ".kibana_1",
            filter: "-",
            is_write_index: "-"
          }, {
            alias: "2",
            index: "1234",
            filter: "-",
            is_write_index: "-"
          }]
        };

      case "indices.get":
        const payloadIndex = (_payload$data6 = payload.data) === null || _payload$data6 === void 0 ? void 0 : _payload$data6.index;

        if (payloadIndex === "bad_index") {
          return {
            ok: false,
            error: "bad_error",
            response: {}
          };
        }

        return {
          ok: true,
          response: {
            [(_payload$data7 = payload.data) === null || _payload$data7 === void 0 ? void 0 : _payload$data7.index]: {
              aliases: {
                update_test_1: {}
              },
              mappings: {
                properties: {
                  test_mapping_1: {
                    type: "text"
                  }
                }
              },
              settings: {
                "index.number_of_shards": "1",
                "index.number_of_replicas": "1"
              }
            }
          }
        };
    }

    return {
      ok: true,
      response: {}
    };
  });
};

exports.apiCallerMock = apiCallerMock;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImFwaUNhbGxlck1vY2siLCJicm93c2VyU2VydmljZXNNb2NrT2JqZWN0IiwiY29tbW9uU2VydmljZSIsImFwaUNhbGxlciIsImplc3QiLCJmbiIsInBheWxvYWQiLCJlbmRwb2ludCIsImRhdGEiLCJwYXRoIiwic3RhcnRzV2l0aCIsIm9rIiwicmVzcG9uc2UiLCJlcnJvciIsImluZGV4X3RlbXBsYXRlcyIsIm5hbWUiLCJpbmRleF90ZW1wbGF0ZSIsImNvbXBvbmVudF90ZW1wbGF0ZXMiLCJjb21wb25lbnRfdGVtcGxhdGUiLCJ0ZW1wbGF0ZSIsInNldHRpbmdzIiwiaW5kZXgiLCJudW1iZXJfb2ZfcmVwbGljYXMiLCJudW1iZXJfb2Zfc2hhcmRzIiwiYWxpYXMiLCJmaWx0ZXIiLCJpc193cml0ZV9pbmRleCIsInBheWxvYWRJbmRleCIsImFsaWFzZXMiLCJ1cGRhdGVfdGVzdF8xIiwibWFwcGluZ3MiLCJwcm9wZXJ0aWVzIiwidGVzdF9tYXBwaW5nXzEiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFUQTtBQUNBO0FBQ0E7QUFDQTtBQVFBLE1BQU1BLGFBQWEsR0FBSUMseUJBQUQsSUFBMkQ7QUFDL0VBLEVBQUFBLHlCQUF5QixDQUFDQyxhQUExQixDQUF3Q0MsU0FBeEMsR0FBb0RDLElBQUksQ0FBQ0MsRUFBTCxDQUNsRCxNQUFPQyxPQUFQLElBQWlDO0FBQUE7O0FBQy9CLFlBQVFBLE9BQU8sQ0FBQ0MsUUFBaEI7QUFDRSxXQUFLLG1CQUFMO0FBQTBCO0FBQUE7O0FBQ3hCLCtCQUFJRCxPQUFPLENBQUNFLElBQVosZ0VBQUksY0FBY0MsSUFBbEIsK0NBQUksbUJBQW9CQyxVQUFwQixDQUErQiw0Q0FBL0IsQ0FBSixFQUFrRjtBQUNoRixtQkFBTztBQUNMQyxjQUFBQSxFQUFFLEVBQUUsSUFEQztB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LEVBQUUsRUFBRSxJQURDO0FBRUxDLFVBQUFBLFFBQVEsRUFBRTtBQUNSLCtCQUFDTixPQUFPLENBQUNFLElBQVQsbURBQUMsZUFBY2EsS0FBZixHQUF1QjtBQUNyQk8sY0FBQUEsT0FBTyxFQUFFO0FBQ1BDLGdCQUFBQSxhQUFhLEVBQUU7QUFEUixlQURZO0FBSXJCQyxjQUFBQSxRQUFRLEVBQUU7QUFDUkMsZ0JBQUFBLFVBQVUsRUFBRTtBQUNWQyxrQkFBQUEsY0FBYyxFQUFFO0FBQ2RDLG9CQUFBQSxJQUFJLEVBQUU7QUFEUTtBQUROO0FBREosZUFKVztBQVdyQmIsY0FBQUEsUUFBUSxFQUFFO0FBQ1IsMENBQTBCLEdBRGxCO0FBRVIsNENBQTRCO0FBRnBCO0FBWFc7QUFEZjtBQUZMLFNBQVA7QUEvRko7O0FBcUhBLFdBQU87QUFDTFQsTUFBQUEsRUFBRSxFQUFFLElBREM7QUFFTEMsTUFBQUEsUUFBUSxFQUFFO0FBRkwsS0FBUDtBQUlELEdBM0hpRCxDQUFwRDtBQTZIRCxDQTlIRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IGJyb3dzZXJTZXJ2aWNlc01vY2sgZnJvbSBcIi4vYnJvd3NlclNlcnZpY2VzTW9ja1wiO1xuaW1wb3J0IGhpc3RvcnlNb2NrIGZyb20gXCIuL2hpc3RvcnlNb2NrXCI7XG5pbXBvcnQgaHR0cENsaWVudE1vY2sgZnJvbSBcIi4vaHR0cENsaWVudE1vY2tcIjtcbmltcG9ydCBzdHlsZU1vY2sgZnJvbSBcIi4vc3R5bGVNb2NrXCI7XG5pbXBvcnQgY29yZVNlcnZpY2VzTW9jayBmcm9tIFwiLi9jb3JlU2VydmljZXNNb2NrXCI7XG5cbmNvbnN0IGFwaUNhbGxlck1vY2sgPSAoYnJvd3NlclNlcnZpY2VzTW9ja09iamVjdDogdHlwZW9mIGJyb3dzZXJTZXJ2aWNlc01vY2spID0+IHtcbiAgYnJvd3NlclNlcnZpY2VzTW9ja09iamVjdC5jb21tb25TZXJ2aWNlLmFwaUNhbGxlciA9IGplc3QuZm4oXG4gICAgYXN5bmMgKHBheWxvYWQpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgc3dpdGNoIChwYXlsb2FkLmVuZHBvaW50KSB7XG4gICAgICAgIGNhc2UgXCJ0cmFuc3BvcnQucmVxdWVzdFwiOiB7XG4gICAgICAgICAgaWYgKHBheWxvYWQuZGF0YT8ucGF0aD8uc3RhcnRzV2l0aChcIi9faW5kZXhfdGVtcGxhdGUvX3NpbXVsYXRlX2luZGV4L2JhZF9pbmRleFwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmRhdGE/LnBhdGg/LnN0YXJ0c1dpdGgoXCIvX2luZGV4X3RlbXBsYXRlL2JhZF90ZW1wbGF0ZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICBlcnJvcjogXCJiYWQgdGVtcGxhdGVcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmRhdGE/LnBhdGg/LnN0YXJ0c1dpdGgoXCIvX2luZGV4X3RlbXBsYXRlL2dvb2RfdGVtcGxhdGVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgICAgIGluZGV4X3RlbXBsYXRlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdvb2RfdGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhfdGVtcGxhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBheWxvYWQuZGF0YT8ucGF0aD8uc3RhcnRzV2l0aChcIi9fY29tcG9uZW50X3RlbXBsYXRlL2dvb2RfdGVtcGxhdGVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudF90ZW1wbGF0ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnb29kX3RlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudF90ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDoge1xuICAgICAgICAgICAgICAgICAgICAgIG51bWJlcl9vZl9yZXBsaWNhczogXCIxMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG51bWJlcl9vZl9zaGFyZHM6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcImluZGljZXMuY3JlYXRlXCI6XG4gICAgICAgICAgaWYgKHBheWxvYWQuZGF0YT8uaW5kZXggPT09IFwiYmFkX2luZGV4XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IFwiYmFkX2luZGV4XCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY2F0LmFsaWFzZXNcIjpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwiLmtpYmFuYVwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBcIi5raWJhbmFfMVwiLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogXCItXCIsXG4gICAgICAgICAgICAgICAgaXNfd3JpdGVfaW5kZXg6IFwiLVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwiMlwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBcIjEyMzRcIixcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IFwiLVwiLFxuICAgICAgICAgICAgICAgIGlzX3dyaXRlX2luZGV4OiBcIi1cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcImluZGljZXMuZ2V0XCI6XG4gICAgICAgICAgY29uc3QgcGF5bG9hZEluZGV4ID0gcGF5bG9hZC5kYXRhPy5pbmRleDtcbiAgICAgICAgICBpZiAocGF5bG9hZEluZGV4ID09PSBcImJhZF9pbmRleFwiKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOiBcImJhZF9lcnJvclwiLFxuICAgICAgICAgICAgICByZXNwb25zZToge30sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgIFtwYXlsb2FkLmRhdGE/LmluZGV4XToge1xuICAgICAgICAgICAgICAgIGFsaWFzZXM6IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZV90ZXN0XzE6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWFwcGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdF9tYXBwaW5nXzE6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgXCJpbmRleC5udW1iZXJfb2Zfc2hhcmRzXCI6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgXCJpbmRleC5udW1iZXJfb2ZfcmVwbGljYXNcIjogXCIxXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICByZXNwb25zZToge30sXG4gICAgICB9O1xuICAgIH1cbiAgKTtcbn07XG5cbmV4cG9ydCB7IGJyb3dzZXJTZXJ2aWNlc01vY2ssIGhpc3RvcnlNb2NrLCBodHRwQ2xpZW50TW9jaywgc3R5bGVNb2NrLCBjb3JlU2VydmljZXNNb2NrLCBhcGlDYWxsZXJNb2NrIH07XG4iXX0=