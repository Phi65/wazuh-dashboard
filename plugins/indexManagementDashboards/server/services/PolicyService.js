"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PolicyService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);

    _defineProperty(this, "putPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        let method = "ism.putPolicy";
        let params = {
          policyId: id,
          ifSeqNo: seqNo,
          ifPrimaryTerm: primaryTerm,
          body: JSON.stringify(request.body)
        };

        if (seqNo === undefined || primaryTerm === undefined) {
          method = "ism.createPolicy";
          params = {
            policyId: id,
            body: JSON.stringify(request.body)
          };
        }

        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const putPolicyResponse = await callWithRequest(method, params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: putPolicyResponse
          }
        });
      } catch (err) {
        console.error("Index Management - PolicyService - putPolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "deletePolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          policyId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const deletePolicyResponse = await callWithRequest("ism.deletePolicy", params);

        if (deletePolicyResponse.result !== "deleted") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: deletePolicyResponse.result
            }
          });
        }

        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: true
          }
        });
      } catch (err) {
        console.error("Index Management - PolicyService - deletePolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "getPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          policyId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getPolicy", params);

        const policy = _lodash.default.get(getResponse, "policy", null);

        const seqNo = _lodash.default.get(getResponse, "_seq_no");

        const primaryTerm = _lodash.default.get(getResponse, "_primary_term");

        if (policy) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                id,
                seqNo: seqNo,
                primaryTerm: primaryTerm,
                policy: policy
              }
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to load policy"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - PolicyService - getPolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });

    _defineProperty(this, "getPolicies", async (context, request, response) => {
      try {
        const {
          from = 0,
          size = 20,
          search,
          sortDirection = "desc",
          sortField = "id"
        } = request.query;
        const policySorts = {
          id: "policy.policy_id.keyword",
          "policy.policy.description": "policy.description.keyword",
          "policy.policy.last_updated_time": "policy.last_updated_time"
        };
        const params = {
          from,
          size,
          sortOrder: sortDirection,
          sortField: policySorts[sortField] || policySorts.id,
          queryString: search.trim() ? `*${search.trim().split(" ").join("* *")}*` : "*"
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getPolicies", params);
        const policies = getResponse.policies.map(p => ({
          seqNo: p._seq_no,
          primaryTerm: p._primary_term,
          id: p._id,
          policy: p.policy
        }));
        const totalPolicies = getResponse.total_policies;
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              policies: policies,
              totalPolicies
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
                policies: [],
                totalPolicies: 0
              }
            }
          });
        }

        console.error("Index Management - PolicyService - getPolicies", err);
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
  /**
   * Calls backend Put Policy API
   */


}

exports.default = PolicyService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBvbGljeVNlcnZpY2UudHMiXSwibmFtZXMiOlsiUG9saWN5U2VydmljZSIsImNvbnN0cnVjdG9yIiwib3NEcml2ZXIiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiaWQiLCJwYXJhbXMiLCJzZXFObyIsInByaW1hcnlUZXJtIiwicXVlcnkiLCJtZXRob2QiLCJwb2xpY3lJZCIsImlmU2VxTm8iLCJpZlByaW1hcnlUZXJtIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1bmRlZmluZWQiLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwicHV0UG9saWN5UmVzcG9uc2UiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwib2siLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiZGVsZXRlUG9saWN5UmVzcG9uc2UiLCJyZXN1bHQiLCJnZXRSZXNwb25zZSIsInBvbGljeSIsIl8iLCJnZXQiLCJmcm9tIiwic2l6ZSIsInNlYXJjaCIsInNvcnREaXJlY3Rpb24iLCJzb3J0RmllbGQiLCJwb2xpY3lTb3J0cyIsInNvcnRPcmRlciIsInF1ZXJ5U3RyaW5nIiwidHJpbSIsInNwbGl0Iiwiam9pbiIsInBvbGljaWVzIiwibWFwIiwicCIsIl9zZXFfbm8iLCJfcHJpbWFyeV90ZXJtIiwiX2lkIiwidG90YWxQb2xpY2llcyIsInRvdGFsX3BvbGljaWVzIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOzs7Ozs7QUFhZSxNQUFNQSxhQUFOLENBQW9CO0FBR2pDQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBdUM7QUFBQTs7QUFBQSx1Q0FPdEMsT0FDVkMsT0FEVSxFQUVWQyxPQUZVLEVBR1ZDLFFBSFUsS0FJb0Y7QUFDOUYsVUFBSTtBQUNGLGNBQU07QUFBRUMsVUFBQUE7QUFBRixZQUFTRixPQUFPLENBQUNHLE1BQXZCO0FBQ0EsY0FBTTtBQUFFQyxVQUFBQSxLQUFGO0FBQVNDLFVBQUFBO0FB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QUFRLEVBQUU7QUFBRTBDLGNBQUFBLFFBQVEsRUFBRUEsUUFBWjtBQUFzQk0sY0FBQUE7QUFBdEI7QUFGTjtBQUZlLFNBQWhCLENBQVA7QUFPRCxPQTFDRCxDQTBDRSxPQUFPM0IsR0FBUCxFQUFZO0FBQ1osWUFBSUEsR0FBRyxDQUFDRixVQUFKLEtBQW1CLEdBQW5CLElBQTBCRSxHQUFHLENBQUNYLElBQUosQ0FBU2EsS0FBVCxDQUFlMkIsSUFBZixLQUF3QiwyQkFBdEQsRUFBbUY7QUFDakYsaUJBQU9sRCxRQUFRLENBQUNrQixNQUFULENBQWdCO0FBQ3JCQyxZQUFBQSxVQUFVLEVBQUUsR0FEUztBQUVyQlQsWUFBQUEsSUFBSSxFQUFFO0FBQ0pVLGNBQUFBLEVBQUUsRUFBRSxJQURBO0FBRUpwQixjQUFBQSxRQUFRLEVBQUU7QUFBRTBDLGdCQUFBQSxRQUFRLEVBQUUsRUFBWjtBQUFnQk0sZ0JBQUFBLGFBQWEsRUFBRTtBQUEvQjtBQUZOO0FBRmUsV0FBaEIsQ0FBUDtBQU9EOztBQUNEMUIsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsZ0RBQWQsRUFBZ0VGLEdBQWhFO0FBQ0EsZUFBT3JCLFFBQVEsQ0FBQ2tCLE1BQVQsQ0FBZ0I7QUFDckJDLFVBQUFBLFVBQVUsRUFBRSxHQURTO0FBRXJCVCxVQUFBQSxJQUFJLEVBQUU7QUFDSlUsWUFBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkcsWUFBQUEsS0FBSyxFQUFFRixHQUFHLENBQUNHO0FBRlA7QUFGZSxTQUFoQixDQUFQO0FBT0Q7QUFDRixLQXJNaUQ7O0FBQ2hELFNBQUszQixRQUFMLEdBQWdCQSxRQUFoQjtBQUNEO0FBRUQ7QUFDRjtBQUNBOzs7QUFUbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7XG4gIElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgUmVzcG9uc2VFcnJvcixcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxufSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlclwiO1xuaW1wb3J0IHsgRGVsZXRlUG9saWN5UGFyYW1zLCBEZWxldGVQb2xpY3lSZXNwb25zZSwgR2V0UG9saWNpZXNSZXNwb25zZSwgUHV0UG9saWN5UGFyYW1zLCBQdXRQb2xpY3lSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgUG9saWNpZXNTb3J0LCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvdHlwZXNcIjtcbmltcG9ydCB7IERvY3VtZW50UG9saWN5LCBQb2xpY3kgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9saWN5U2VydmljZSB7XG4gIG9zRHJpdmVyOiBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQpIHtcbiAgICB0aGlzLm9zRHJpdmVyID0gb3NEcml2ZXI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgYmFja2VuZCBQdXQgUG9saWN5IEFQSVxuICAgKi9cbiAgcHV0UG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8UHV0UG9saWN5UmVzcG9uc2U+IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCB7IHNlcU5vLCBwcmltYXJ5VGVybSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7IHNlcU5vPzogc3RyaW5nOyBwcmltYXJ5VGVybT86IHN0cmluZyB9O1xuICAgICAgbGV0IG1ldGhvZCA9IFwiaXNtLnB1dFBvbGljeVwiO1xuICAgICAgbGV0IHBhcmFtczogUHV0UG9saWN5UGFyYW1zID0geyBwb2xpY3lJZDogaWQsIGlmU2VxTm86IHNlcU5vLCBpZlByaW1hcnlUZXJtOiBwcmltYXJ5VGVybSwgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSB9O1xuICAgICAgaWYgKHNlcU5vID09PSB1bmRlZmluZWQgfHwgcHJpbWFyeVRlcm0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBtZXRob2QgPSBcImlzbS5jcmVhdGVQb2xpY3lcIjtcbiAgICAgICAgcGFyYW1zID0geyBwb2xpY3lJZDogaWQsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSkgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHB1dFBvbGljeVJlc3BvbnNlOiBQdXRQb2xpY3lSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChtZXRob2QsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHB1dFBvbGljeVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFBvbGljeVNlcnZpY2UgLSBwdXRQb2xpY3k6XCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgYmFja2VuZCBEZWxldGUgUG9saWN5IEFQSVxuICAgKi9cbiAgZGVsZXRlUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4gfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtczogRGVsZXRlUG9saWN5UGFyYW1zID0geyBwb2xpY3lJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGRlbGV0ZVBvbGljeVJlc3BvbnNlOiBEZWxldGVQb2xpY3lSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5kZWxldGVQb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGlmIChkZWxldGVQb2xpY3lSZXNwb25zZS5yZXN1bHQgIT09IFwiZGVsZXRlZFwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZGVsZXRlUG9saWN5UmVzcG9uc2UucmVzdWx0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFBvbGljeVNlcnZpY2UgLSBkZWxldGVQb2xpY3k6XCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgYmFja2VuZCBHZXQgUG9saWN5IEFQSVxuICAgKi9cbiAgZ2V0UG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8RG9jdW1lbnRQb2xpY3k+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgcG9saWN5SWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBnZXRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRQb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHBvbGljeSA9IF8uZ2V0KGdldFJlc3BvbnNlLCBcInBvbGljeVwiLCBudWxsKTtcbiAgICAgIGNvbnN0IHNlcU5vID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwiX3NlcV9ub1wiKTtcbiAgICAgIGNvbnN0IHByaW1hcnlUZXJtID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwiX3ByaW1hcnlfdGVybVwiKTtcbiAgICAgIGlmIChwb2xpY3kpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHsgaWQsIHNlcU5vOiBzZXFObyBhcyBudW1iZXIsIHByaW1hcnlUZXJtOiBwcmltYXJ5VGVybSBhcyBudW1iZXIsIHBvbGljeTogcG9saWN5IGFzIFBvbGljeSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBsb2FkIHBvbGljeVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBQb2xpY3lTZXJ2aWNlIC0gZ2V0UG9saWN5OlwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIGJhY2tlbmQgR2V0IFBvbGljeSBBUElcbiAgICovXG4gIGdldFBvbGljaWVzID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8R2V0UG9saWNpZXNSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZnJvbSA9IDAsIHNpemUgPSAyMCwgc2VhcmNoLCBzb3J0RGlyZWN0aW9uID0gXCJkZXNjXCIsIHNvcnRGaWVsZCA9IFwiaWRcIiB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIGZyb206IG51bWJlcjtcbiAgICAgICAgc2l6ZTogbnVtYmVyO1xuICAgICAgICBzZWFyY2g6IHN0cmluZztcbiAgICAgICAgc29ydERpcmVjdGlvbjogc3RyaW5nO1xuICAgICAgICBzb3J0RmllbGQ6IHN0cmluZztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBvbGljeVNvcnRzOiBQb2xpY2llc1NvcnQgPSB7XG4gICAgICAgIGlkOiBcInBvbGljeS5wb2xpY3lfaWQua2V5d29yZFwiLFxuICAgICAgICBcInBvbGljeS5wb2xpY3kuZGVzY3JpcHRpb25cIjogXCJwb2xpY3kuZGVzY3JpcHRpb24ua2V5d29yZFwiLFxuICAgICAgICBcInBvbGljeS5wb2xpY3kubGFzdF91cGRhdGVkX3RpbWVcIjogXCJwb2xpY3kubGFzdF91cGRhdGVkX3RpbWVcIixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgZnJvbSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgc29ydE9yZGVyOiBzb3J0RGlyZWN0aW9uLFxuICAgICAgICBzb3J0RmllbGQ6IHBvbGljeVNvcnRzW3NvcnRGaWVsZF0gfHwgcG9saWN5U29ydHMuaWQsXG4gICAgICAgIHF1ZXJ5U3RyaW5nOiBzZWFyY2gudHJpbSgpID8gYCoke3NlYXJjaC50cmltKCkuc3BsaXQoXCIgXCIpLmpvaW4oXCIqICpcIil9KmAgOiBcIipcIixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmdldFBvbGljaWVzXCIsIHBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IHBvbGljaWVzOiBEb2N1bWVudFBvbGljeVtdID0gZ2V0UmVzcG9uc2UucG9saWNpZXMubWFwKChwKSA9PiAoe1xuICAgICAgICBzZXFObzogcC5fc2VxX25vLFxuICAgICAgICBwcmltYXJ5VGVybTogcC5fcHJpbWFyeV90ZXJtLFxuICAgICAgICBpZDogcC5faWQsXG4gICAgICAgIHBvbGljeTogcC5wb2xpY3ksXG4gICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IHRvdGFsUG9saWNpZXM6IG51bWJlciA9IGdldFJlc3BvbnNlLnRvdGFsX3BvbGljaWVzO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHsgcG9saWNpZXM6IHBvbGljaWVzLCB0b3RhbFBvbGljaWVzIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0ICYmIGVyci5ib2R5LmVycm9yLnR5cGUgPT09IFwiaW5kZXhfbm90X2ZvdW5kX2V4Y2VwdGlvblwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7IHBvbGljaWVzOiBbXSwgdG90YWxQb2xpY2llczogMCB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBQb2xpY3lTZXJ2aWNlIC0gZ2V0UG9saWNpZXNcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19