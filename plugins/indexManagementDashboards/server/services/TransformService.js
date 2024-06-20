"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TransformService {
  constructor(esDriver) {
    _defineProperty(this, "esDriver", void 0);

    _defineProperty(this, "getTransforms", async (context, request, response) => {
      try {
        const {
          from,
          size,
          search,
          sortDirection,
          sortField
        } = request.query;
        const transformSortMap = {
          _id: "transform.transform_id.keyword",
          "transform.source_index": "transform.source_index.keyword",
          "transform.target_index": "transform.target_index.keyword",
          "transform.transform.enabled": "transform.enabled"
        };
        const params = {
          from: parseInt(from, 10),
          size: parseInt(size, 10),
          search,
          sortField: transformSortMap[sortField] || transformSortMap._id,
          sortDirection
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const getTransformsResponse = await callWithRequest("ism.getTransforms", params);
        const totalTransforms = getTransformsResponse.total_transforms;
        const transforms = getTransformsResponse.transforms.map(transform => ({
          _seqNo: transform._seqNo,
          _primaryTerm: transform._primaryTerm,
          _id: transform._id,
          transform: transform.transform,
          metadata: null
        }));

        if (totalTransforms) {
          const ids = transforms.map(transform => transform._id).join(",");
          const explainResponse = await callWithRequest("ism.explainTransform", {
            transformId: ids
          });

          if (!explainResponse.error) {
            transforms.map(transform => {
              transform.metadata = explainResponse[transform._id];
            });
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  transforms: transforms,
                  totalTransforms: totalTransforms,
                  metadata: explainResponse
                }
              }
            });
          } else {
            return response.custom({
              statusCode: 200,
              body: {
                ok: false,
                error: explainResponse ? explainResponse.error : "An error occurred when calling getExplain API."
              }
            });
          }
        }

        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              transforms: transforms,
              totalTransforms: totalTransforms,
              metadata: {}
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.type === "index_not_found_exception") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                transforms: [],
                totalTransforms: 0,
                metadata: null
              }
            }
          });
        }

        console.error("Index Management - TransformService - getTransforms", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: "Error in getTransforms" + err.message
          }
        });
      }
    });

    _defineProperty(this, "getTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getTransform", params);
        const metadata = await callWithRequest("ism.explainTransform", params);

        const transform = _lodash.default.get(getResponse, "transform", null);

        const seqNo = _lodash.default.get(getResponse, "_seq_no", null);

        const primaryTerm = _lodash.default.get(getResponse, "_primary_term", null);

        if (transform) {
          if (metadata) {
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  _id: id,
                  _seqNo: seqNo,
                  _primaryTerm: primaryTerm,
                  transform: transform,
                  metadata: metadata
                }
              }
            });
          } else {
            return response.custom({
              statusCode: 200,
              body: {
                ok: false,
                error: "Failed to load metadata for transform"
              }
            });
          }
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to load transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - getTransform:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "startTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const startResponse = await callWithRequest("ism.startTransform", params);

        const acknowledged = _lodash.default.get(startResponse, "acknowledged");

        if (acknowledged) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: true
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to start transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - startTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "stopTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const stopResponse = await callWithRequest("ism.stopTransform", params);

        const acknowledged = _lodash.default.get(stopResponse, "acknowledged");

        if (acknowledged) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: true
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to stop transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - stopTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "deleteTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const deleteResponse = await callWithRequest("ism.deleteTransform", params);

        if (!deleteResponse.errors) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: true
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to delete transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - deleteTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "putTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        let method = "ism.putTransform";
        let params = {
          transformId: id,
          if_seq_no: seqNo,
          if_primary_term: primaryTerm,
          body: JSON.stringify(request.body)
        };

        if (seqNo === undefined || primaryTerm === undefined) {
          method = "ism.putTransform";
          params = {
            transformId: id,
            body: JSON.stringify(request.body)
          };
        }

        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const putTransformResponse = await callWithRequest(method, params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: putTransformResponse
          }
        });
      } catch (err) {
        console.error("Index Management - TransformService - putTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "searchSampleData", async (context, request, response) => {
      try {
        const {
          from,
          size
        } = request.query;
        const {
          index
        } = request.params;
        let params = {
          index: index,
          from: from,
          size: size,
          body: request.body ? JSON.stringify({
            query: request.body
          }) : {}
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const searchResponse = await callWithRequest("search", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              total: searchResponse.hits.total,
              data: searchResponse.hits.hits
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.type === "index_not_found_exception") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                total: 0,
                data: []
              }
            }
          });
        }

        console.error("Index Management - TransformService - searchSampleData", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "previewTransform", async (context, request, response) => {
      try {
        let params = {
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const previewResponse = await callWithRequest("ism.previewTransform", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: previewResponse
          }
        });
      } catch (err) {
        console.error("Index Management - TransformService - previewTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    this.esDriver = esDriver;
  }

}

exports.default = TransformService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyYW5zZm9ybVNlcnZpY2UudHMiXSwibmFtZXMiOlsiVHJhbnNmb3JtU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZXNEcml2ZXIiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiZnJvbSIsInNpemUiLCJzZWFyY2giLCJzb3J0RGlyZWN0aW9uIiwic29ydEZpZWxkIiwicXVlcnkiLCJ0cmFuc2Zvcm1Tb3J0TWFwIiwiX2lkIiwicGFyYW1zIiwicGFyc2VJbnQiLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwiZ2V0VHJhbnNmb3Jtc1Jlc3BvbnNlIiwidG90YWxUcmFuc2Zvcm1zIiwidG90YWxfdHJhbnNmb3JtcyIsInRyYW5zZm9ybXMiLCJtYXAiLCJ0cmFuc2Zvcm0iLCJfc2VxTm8iLCJfcHJpbWFyeVRlcm0iLCJtZXRhZGF0YSIsImlkcyIsImpvaW4iLCJleHBsYWluUmVzcG9uc2UiLCJ0cmFuc2Zvcm1JZCIsImVycm9yIiwiY3VzdG9tIiwic3RhdHVzQ29kZSIsImJvZHkiLCJvayIsImVyciIsInR5cGUiLCJjb25zb2xlIiwibWVzc2FnZSIsImlkIiwiZ2V0UmVzcG9uc2UiLCJfIiwiZ2V0Iiwic2VxTm8iLCJwcmltYXJ5VGVybSIsInN0YXJ0UmVzcG9uc2UiLCJhY2tub3dsZWRnZWQiLCJzdG9wUmVzcG9uc2UiLCJkZWxldGVSZXNwb25zZSIsImVycm9ycyIsIm1ldGhvZCIsImlmX3NlcV9ubyIsImlmX3ByaW1hcnlfdGVybSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1bmRlZmluZWQiLCJwdXRUcmFuc2Zvcm1SZXNwb25zZSIsImluZGV4Iiwic2VhcmNoUmVzcG9uc2UiLCJ0b3RhbCIsImhpdHMiLCJkYXRhIiwicHJldmlld1Jlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBcUJBOzs7Ozs7QUFFZSxNQUFNQSxnQkFBTixDQUF1QjtBQUdwQ0MsRUFBQUEsV0FBVyxDQUFDQyxRQUFELEVBQTJC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cUM7O0FBQ3BDLFNBQUt0QyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOztBQUxtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSUNsdXN0ZXJDbGllbnQsXG4gIElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlLFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG59IGZyb20gXCJvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyXCI7XG5pbXBvcnQgeyBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvdHlwZXNcIjtcbmltcG9ydCB7XG4gIEdldFRyYW5zZm9ybXNSZXNwb25zZSxcbiAgUHJldmlld1RyYW5zZm9ybVJlc3BvbnNlLFxuICBQdXRUcmFuc2Zvcm1QYXJhbXMsXG4gIFB1dFRyYW5zZm9ybVJlc3BvbnNlLFxuICBTZWFyY2hSZXNwb25zZSxcbn0gZnJvbSBcIi4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBEb2N1bWVudFRyYW5zZm9ybSwgVHJhbnNmb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zZm9ybVNlcnZpY2Uge1xuICBlc0RyaXZlcjogSUNsdXN0ZXJDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoZXNEcml2ZXI6IElDbHVzdGVyQ2xpZW50KSB7XG4gICAgdGhpcy5lc0RyaXZlciA9IGVzRHJpdmVyO1xuICB9XG5cbiAgZ2V0VHJhbnNmb3JtcyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldFRyYW5zZm9ybXNSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZnJvbSwgc2l6ZSwgc2VhcmNoLCBzb3J0RGlyZWN0aW9uLCBzb3J0RmllbGQgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICBmcm9tOiBudW1iZXI7XG4gICAgICAgIHNpemU6IG51bWJlcjtcbiAgICAgICAgc2VhcmNoOiBzdHJpbmc7XG4gICAgICAgIHNvcnREaXJlY3Rpb246IHN0cmluZztcbiAgICAgICAgc29ydEZpZWxkOiBzdHJpbmc7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB0cmFuc2Zvcm1Tb3J0TWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgICBfaWQ6IFwidHJhbnNmb3JtLnRyYW5zZm9ybV9pZC5rZXl3b3JkXCIsXG4gICAgICAgIFwidHJhbnNmb3JtLnNvdXJjZV9pbmRleFwiOiBcInRyYW5zZm9ybS5zb3VyY2VfaW5kZXgua2V5d29yZFwiLFxuICAgICAgICBcInRyYW5zZm9ybS50YXJnZXRfaW5kZXhcIjogXCJ0cmFuc2Zvcm0udGFyZ2V0X2luZGV4LmtleXdvcmRcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm0udHJhbnNmb3JtLmVuYWJsZWRcIjogXCJ0cmFuc2Zvcm0uZW5hYmxlZFwiLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBmcm9tOiBwYXJzZUludChmcm9tLCAxMCksXG4gICAgICAgIHNpemU6IHBhcnNlSW50KHNpemUsIDEwKSxcbiAgICAgICAgc2VhcmNoLFxuICAgICAgICBzb3J0RmllbGQ6IHRyYW5zZm9ybVNvcnRNYXBbc29ydEZpZWxkXSB8fCB0cmFuc2Zvcm1Tb3J0TWFwLl9pZCxcbiAgICAgICAgc29ydERpcmVjdGlvbixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGdldFRyYW5zZm9ybXNSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRUcmFuc2Zvcm1zXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCB0b3RhbFRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zUmVzcG9uc2UudG90YWxfdHJhbnNmb3JtcztcbiAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBnZXRUcmFuc2Zvcm1zUmVzcG9uc2UudHJhbnNmb3Jtcy5tYXAoKHRyYW5zZm9ybTogRG9jdW1lbnRUcmFuc2Zvcm0pID0+ICh7XG4gICAgICAgIF9zZXFObzogdHJhbnNmb3JtLl9zZXFObyBhcyBudW1iZXIsXG4gICAgICAgIF9wcmltYXJ5VGVybTogdHJhbnNmb3JtLl9wcmltYXJ5VGVybSBhcyBudW1iZXIsXG4gICAgICAgIF9pZDogdHJhbnNmb3JtLl9pZCxcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0udHJhbnNmb3JtLFxuICAgICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgIH0pKTtcbiAgICAgIGlmICh0b3RhbFRyYW5zZm9ybXMpIHtcbiAgICAgICAgY29uc3QgaWRzID0gdHJhbnNmb3Jtcy5tYXAoKHRyYW5zZm9ybTogRG9jdW1lbnRUcmFuc2Zvcm0pID0+IHRyYW5zZm9ybS5faWQpLmpvaW4oXCIsXCIpO1xuICAgICAgICBjb25zdCBleHBsYWluUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZXhwbGFpblRyYW5zZm9ybVwiLCB7IHRyYW5zZm9ybUlkOiBpZHMgfSk7XG4gICAgICAgIGlmICghZXhwbGFpblJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdHJhbnNmb3Jtcy5tYXAoKHRyYW5zZm9ybTogRG9jdW1lbnRUcmFuc2Zvcm0pID0+IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybS5tZXRhZGF0YSA9IGV4cGxhaW5SZXNwb25zZVt0cmFuc2Zvcm0uX2lkXTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVzcG9uc2U6IHsgdHJhbnNmb3JtczogdHJhbnNmb3JtcywgdG90YWxUcmFuc2Zvcm1zOiB0b3RhbFRyYW5zZm9ybXMsIG1ldGFkYXRhOiBleHBsYWluUmVzcG9uc2UgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IGV4cGxhaW5SZXNwb25zZSA/IGV4cGxhaW5SZXNwb25zZS5lcnJvciA6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBjYWxsaW5nIGdldEV4cGxhaW4gQVBJLlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwb25zZTogeyB0cmFuc2Zvcm1zOiB0cmFuc2Zvcm1zLCB0b3RhbFRyYW5zZm9ybXM6IHRvdGFsVHJhbnNmb3JtcywgbWV0YWRhdGE6IHt9IH0gfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDQgJiYgZXJyLmJvZHkuZXJyb3IudHlwZSA9PT0gXCJpbmRleF9ub3RfZm91bmRfZXhjZXB0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB7IHRyYW5zZm9ybXM6IFtdLCB0b3RhbFRyYW5zZm9ybXM6IDAsIG1ldGFkYXRhOiBudWxsIH0gfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFRyYW5zZm9ybVNlcnZpY2UgLSBnZXRUcmFuc2Zvcm1zXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBcIkVycm9yIGluIGdldFRyYW5zZm9ybXNcIiArIGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFRyYW5zZm9ybSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPERvY3VtZW50VHJhbnNmb3JtPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHRyYW5zZm9ybUlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZ2V0VHJhbnNmb3JtXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5leHBsYWluVHJhbnNmb3JtXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSBfLmdldChnZXRSZXNwb25zZSwgXCJ0cmFuc2Zvcm1cIiwgbnVsbCk7XG4gICAgICBjb25zdCBzZXFObyA9IF8uZ2V0KGdldFJlc3BvbnNlLCBcIl9zZXFfbm9cIiwgbnVsbCk7XG4gICAgICBjb25zdCBwcmltYXJ5VGVybSA9IF8uZ2V0KGdldFJlc3BvbnNlLCBcIl9wcmltYXJ5X3Rlcm1cIiwgbnVsbCk7XG5cbiAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgICAgIF9pZDogaWQsXG4gICAgICAgICAgICAgICAgX3NlcU5vOiBzZXFObyBhcyBudW1iZXIsXG4gICAgICAgICAgICAgICAgX3ByaW1hcnlUZXJtOiBwcmltYXJ5VGVybSBhcyBudW1iZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0gYXMgVHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGxvYWQgbWV0YWRhdGEgZm9yIHRyYW5zZm9ybVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBsb2FkIHRyYW5zZm9ybVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gZ2V0VHJhbnNmb3JtOlwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgc3RhcnRUcmFuc2Zvcm0gPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxib29sZWFuPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHRyYW5zZm9ybUlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgc3RhcnRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5zdGFydFRyYW5zZm9ybVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgYWNrbm93bGVkZ2VkID0gXy5nZXQoc3RhcnRSZXNwb25zZSwgXCJhY2tub3dsZWRnZWRcIik7XG4gICAgICBpZiAoYWNrbm93bGVkZ2VkKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwb25zZTogdHJ1ZSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHN0YXJ0IHRyYW5zZm9ybVwiIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gc3RhcnRUcmFuc2Zvcm1cIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzdG9wVHJhbnNmb3JtID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyB0cmFuc2Zvcm1JZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHN0b3BSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5zdG9wVHJhbnNmb3JtXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBhY2tub3dsZWRnZWQgPSBfLmdldChzdG9wUmVzcG9uc2UsIFwiYWNrbm93bGVkZ2VkXCIpO1xuICAgICAgaWYgKGFja25vd2xlZGdlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzdG9wIHRyYW5zZm9ybVwiIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gc3RvcFRyYW5zZm9ybVwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBlcnIubWVzc2FnZSB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlbGV0ZVRyYW5zZm9ybSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPGJvb2xlYW4+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgdHJhbnNmb3JtSWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBkZWxldGVSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5kZWxldGVUcmFuc2Zvcm1cIiwgcGFyYW1zKTtcbiAgICAgIGlmICghZGVsZXRlUmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwb25zZTogdHJ1ZSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGRlbGV0ZSB0cmFuc2Zvcm1cIiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gVHJhbnNmb3JtU2VydmljZSAtIGRlbGV0ZVRyYW5zZm9ybVwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBlcnIubWVzc2FnZSB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHB1dFRyYW5zZm9ybSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPFB1dFRyYW5zZm9ybVJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCB7IHNlcU5vLCBwcmltYXJ5VGVybSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7IHNlcU5vPzogc3RyaW5nOyBwcmltYXJ5VGVybT86IHN0cmluZyB9O1xuICAgICAgbGV0IG1ldGhvZCA9IFwiaXNtLnB1dFRyYW5zZm9ybVwiO1xuICAgICAgbGV0IHBhcmFtczogUHV0VHJhbnNmb3JtUGFyYW1zID0ge1xuICAgICAgICB0cmFuc2Zvcm1JZDogaWQsXG4gICAgICAgIGlmX3NlcV9ubzogc2VxTm8sXG4gICAgICAgIGlmX3ByaW1hcnlfdGVybTogcHJpbWFyeVRlcm0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSksXG4gICAgICB9O1xuICAgICAgaWYgKHNlcU5vID09PSB1bmRlZmluZWQgfHwgcHJpbWFyeVRlcm0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBtZXRob2QgPSBcImlzbS5wdXRUcmFuc2Zvcm1cIjtcbiAgICAgICAgcGFyYW1zID0geyB0cmFuc2Zvcm1JZDogaWQsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSkgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHB1dFRyYW5zZm9ybVJlc3BvbnNlOiBQdXRUcmFuc2Zvcm1SZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChtZXRob2QsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHB1dFRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFRyYW5zZm9ybVNlcnZpY2UgLSBwdXRUcmFuc2Zvcm1cIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNlYXJjaFNhbXBsZURhdGEgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxhbnk+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICBmcm9tOiBudW1iZXI7XG4gICAgICAgIHNpemU6IG51bWJlcjtcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGluZGV4OiBzdHJpbmcgfTtcbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgYm9keTogcmVxdWVzdC5ib2R5ID8gSlNPTi5zdHJpbmdpZnkoeyBxdWVyeTogcmVxdWVzdC5ib2R5IH0pIDoge30sXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgc2VhcmNoUmVzcG9uc2U6IFNlYXJjaFJlc3BvbnNlPGFueT4gPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzZWFyY2hcIiwgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgdG90YWw6IHNlYXJjaFJlc3BvbnNlLmhpdHMudG90YWwsXG4gICAgICAgICAgICBkYXRhOiBzZWFyY2hSZXNwb25zZS5oaXRzLmhpdHMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDQgJiYgZXJyLmJvZHkuZXJyb3IudHlwZSA9PT0gXCJpbmRleF9ub3RfZm91bmRfZXhjZXB0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgdG90YWw6IDAsXG4gICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gVHJhbnNmb3JtU2VydmljZSAtIHNlYXJjaFNhbXBsZURhdGFcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHByZXZpZXdUcmFuc2Zvcm0gPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxQcmV2aWV3VHJhbnNmb3JtUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHByZXZpZXdSZXNwb25zZTogUHJldmlld1RyYW5zZm9ybVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLnByZXZpZXdUcmFuc2Zvcm1cIiwgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcHJldmlld1Jlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFRyYW5zZm9ybVNlcnZpY2UgLSBwcmV2aWV3VHJhbnNmb3JtXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==