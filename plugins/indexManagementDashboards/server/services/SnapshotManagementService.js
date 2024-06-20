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
class SnapshotManagementService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);

    _defineProperty(this, "getAllSnapshotsWithPolicy", async (context, request, response) => {
      try {
        var _getRepositoryRes$pay;

        // if no repository input, we need to first get back all repositories
        const getRepositoryRes = await this.catRepositories(context, request, response);
        let repositories;

        if ((_getRepositoryRes$pay = getRepositoryRes.payload) !== null && _getRepositoryRes$pay !== void 0 && _getRepositoryRes$pay.ok) {
          var _getRepositoryRes$pay2;

          repositories = (_getRepositoryRes$pay2 = getRepositoryRes.payload) === null || _getRepositoryRes$pay2 === void 0 ? void 0 : _getRepositoryRes$pay2.response.map(repo => repo.id);
        } else {
          var _getRepositoryRes$pay3;

          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: (_getRepositoryRes$pay3 = getRepositoryRes.payload) === null || _getRepositoryRes$pay3 === void 0 ? void 0 : _getRepositoryRes$pay3.error
            }
          });
        }

        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        let snapshots = [];

        for (let i = 0; i < repositories.length; i++) {
          const res = await callWithRequest("snapshot.get", {
            repository: repositories[i],
            snapshot: "_all",
            ignore_unavailable: true
          });
          const snapshotWithPolicy = res.snapshots.map(s => {
            var _s$metadata;

            return {
              id: s.snapshot,
              status: s.state,
              start_epoch: s.start_time_in_millis,
              end_epoch: s.end_time_in_millis,
              duration: s.duration_in_millis,
              indices: s.indices.length,
              successful_shards: s.shards.successful,
              failed_shards: s.shards.failed,
              total_shards: s.shards.total,
              repository: repositories[i],
              policy: (_s$metadata = s.metadata) === null || _s$metadata === void 0 ? void 0 : _s$metadata.sm_policy
            };
          });
          snapshots = [...snapshots, ...snapshotWithPolicy];
        }

        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              snapshots: snapshots,
              totalSnapshots: snapshots.length
            }
          }
        });
      } catch (err) {
        // If getting a non-existing snapshot, need to handle the missing snapshot exception, and return empty
        return this.errorResponse(response, err, "getAllSnapshotsWithPolicy");
      }
    });

    _defineProperty(this, "getSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.get", {
          repository: repository,
          snapshot: `${id}`,
          ignore_unavailable: true
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res.snapshots[0]
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getSnapshot");
      }
    });

    _defineProperty(this, "deleteSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.delete", {
          repository: repository,
          snapshot: `${id}`
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "deleteSnapshot");
      }
    });

    _defineProperty(this, "createSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const params = {
          repository: repository,
          snapshot: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.create", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createSnapshot");
      }
    });

    _defineProperty(this, "restoreSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const params = {
          repository: repository,
          snapshot: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.restore", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "restoreSnapshot");
      }
    });

    _defineProperty(this, "createPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          policyId: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const rawRes = await callWithRequest("ism.createSMPolicy", params);
        const res = {
          seqNo: rawRes._seq_no,
          primaryTerm: rawRes._primary_term,
          id: rawRes._id,
          policy: rawRes.sm_policy
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createPolicy");
      }
    });

    _defineProperty(this, "updatePolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        const params = {
          policyId: id,
          ifSeqNo: seqNo,
          ifPrimaryTerm: primaryTerm,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const rawRes = await callWithRequest("ism.updateSMPolicy", params);
        const res = {
          seqNo: rawRes._seq_no,
          primaryTerm: rawRes._primary_term,
          id: rawRes._id,
          policy: rawRes.sm_policy
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "updatePolicy");
      }
    });

    _defineProperty(this, "getPolicies", async (context, request, response) => {
      try {
        const {
          from,
          size,
          sortField,
          sortOrder,
          queryString
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        let params = {
          from,
          size,
          sortField: `sm_policy.${sortField}`,
          sortOrder,
          queryString: queryString.trim() ? `${queryString.trim()}` : "*"
        };
        const res = await callWithRequest("ism.getSMPolicies", params);
        const policies = res.policies.map(p => ({
          seqNo: p._seq_no,
          primaryTerm: p._primary_term,
          id: p._id,
          policy: p.sm_policy
        }));
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              policies,
              totalPolicies: res.total_policies
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.reason === "Snapshot management config index not found") {
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

        return this.errorResponse(response, err, "getPolicies");
      }
    });

    _defineProperty(this, "getPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getSMPolicy", params);
        const metadata = await callWithRequest("ism.explainSnapshotPolicy", params);
        const documentPolicy = {
          id: id,
          seqNo: getResponse._seq_no,
          primaryTerm: getResponse._primary_term,
          policy: getResponse.sm_policy,
          metadata: metadata.policies[0]
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: documentPolicy
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.reason === "Snapshot management config index not found") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: null
            }
          });
        }

        return this.errorResponse(response, err, "getPolicy");
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
        const deletePolicyResponse = await callWithRequest("ism.deleteSMPolicy", params);

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
        return this.errorResponse(response, err, "deletePolicy");
      }
    });

    _defineProperty(this, "startPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("ism.startSnapshotPolicy", params);

        if (resp.acknowledged) {
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
              error: "Failed to start snapshot policy."
            }
          });
        }
      } catch (err) {
        return this.errorResponse(response, err, "startPolicy");
      }
    });

    _defineProperty(this, "stopPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("ism.stopSnapshotPolicy", params);

        if (resp.acknowledged) {
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
              error: "Failed to stop snapshot policy."
            }
          });
        }
      } catch (err) {
        return this.errorResponse(response, err, "stopPolicy");
      }
    });

    _defineProperty(this, "catRepositories", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.repositories", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catRepositories");
      }
    });

    _defineProperty(this, "getIndexRecovery", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("indices.recovery", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getIndexRecovery");
      }
    });

    _defineProperty(this, "catSnapshotIndices", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.indices", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catSnapshotIndices");
      }
    });

    _defineProperty(this, "catRepositoriesWithSnapshotCount", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.repositories", {
          format: "json"
        });

        for (let i = 0; i < res.length; i++) {
          const getSnapshotRes = await callWithRequest("snapshot.get", {
            repository: res[i].id,
            snapshot: "_all",
            ignore_unavailable: true
          });
          res[i].snapshotCount = getSnapshotRes.snapshots.length;
        }

        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catRepositoriesWithSnapshotCount");
      }
    });

    _defineProperty(this, "deleteRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.deleteRepository", {
          repository: id
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "deleteRepository");
      }
    });

    _defineProperty(this, "getRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.getRepository", {
          repository: id
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getRepository");
      }
    });

    _defineProperty(this, "createRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          repository: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.createRepository", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createRepository");
      }
    });

    _defineProperty(this, "errorResponse", (response, error, methodName) => {
      console.error(`Index Management - SnapshotManagementService - ${methodName}:`, error);
      return response.custom({
        statusCode: 200,
        // error?.statusCode || 500,
        body: {
          ok: false,
          error: this.parseEsErrorResponse(error)
        }
      });
    });

    _defineProperty(this, "parseEsErrorResponse", error => {
      if (error.response) {
        try {
          const esErrorResponse = JSON.parse(error.response);
          return esErrorResponse.reason || error.response;
        } catch (parsingError) {
          return error.response;
        }
      }

      return error.message;
    });

    this.osDriver = osDriver;
  }

}

exports.default = SnapshotManagementService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNuYXBzaG90TWFuYWdlbWVudFNlcnZpY2UudHMiXSwibmFtZXMiOlsiU25hcHNob3RNYW5hZ2VtZW50U2VydmljZSIsImNvbnN0cnVjdG9yIiwib3NEcml2ZXIiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiZ2V0UmVwb3NpdG9yeVJlcyIsImNhdFJlcG9zaXRvcmllcyIsInJlcG9zaXRvcmllcyIsInBheWxvYWQiLCJvayIsIm1hcCIsInJlcG8iLCJpZCIsImN1c3RvbSIsInN0YXR1c0NvZGUiLCJib2R5IiwiZXJyb3IiLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwic25hcHNob3RzIiwiaSIsImxlbmd0aCIsInJlcyIsInJlcG9zaXRvcnkiLCJzbmFwc2hvdCIsImlnbm9yZV91bmF2YWlsYWJsZSIsInNuYXBzaG90V2l0aFBvbGljeSIsInMiLCJzdGF0dXMiLCJzdGF0ZSIsInN0YXJ0X2Vwb2NoIiwic3RhcnRfdGltZV9pbl9taWxsaXMiLCJlbmRfZXBvY2giLCJlbmRfdGltZV9pbl9taWxsaXMiLCJkdXJhdGlvbiIsImR1cmF0aW9uX2luX21pbGxpcyIsImluZGljZXMiLCJzdWNjZXNzZnVsX3NoYXJkcyIsInNoYXJkcyIsInN1Y2Nlc3NmdWwiLCJmYWlsZWRfc2hhcmRzIiwiZmFpbGVkIiwidG90YWxfc2hhcmRzIiwidG90YWwiLCJwb2xpY3kiLCJtZXRhZGF0YSIsInNtX3BvbGljeSIsInRvdGFsU25hcHNob3RzIiwiZXJyIiwiZXJyb3JSZXNwb25zZSIsInBhcmFtcyIsInF1ZXJ5IiwicmVzcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb2xpY3lJZCIsInJhd1JlcyIsInNlcU5vIiwiX3NlcV9ubyIsInByaW1hcnlUZXJtIiwiX3ByaW1hcnlfdGVybSIsIl9pZCIsImlmU2VxTm8iLCJpZlByaW1hcnlUZXJtIiwiZnJvbSIsInNpemUiLCJzb3J0RmllbGQiLCJzb3J0T3JkZXIiLCJxdWVyeVN0cmluZyIsInRyaW0iLCJwb2xpY2llcyIsInAiLCJ0b3RhbFBvbGljaWVzIiwidG90YWxfcG9saWNpZXMiLCJyZWFzb24iLCJnZXRSZXNwb25zZSIsImRvY3VtZW50UG9saWN5IiwiZGVsZXRlUG9saWN5UmVzcG9uc2UiLCJyZXN1bHQiLCJhY2tub3dsZWRnZWQiLCJmb3JtYXQiLCJnZXRTbmFwc2hvdFJlcyIsInNuYXBzaG90Q291bnQiLCJtZXRob2ROYW1lIiwiY29uc29sZSIsInBhcnNlRXNFcnJvclJlc3BvbnNlIiwiZXNFcnJvclJlc3BvbnNlIiwicGFyc2UiLCJwYXJzaW5nRXJyb3IiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQTRCZSxNQUFNQSx5QkFBTixDQUFnQztBQUc3Q0MsRUFBQUEsV0FBVyxDQUFDQyxRQUFELEVBQXVDO0FBQUE7O0FBQUEsdURBSXRCLE9BQzFCQyxPQUQwQixFQUUxQkMsT0FGMEIsRUFHMUJDLFFBSDBCLEtBSXVEO0FBQ2pGLFVBQUk7QUFBQTs7QUFDRjtBQUNBLGNBQU1DLGdCQUFnQixHQUFHLE1BQU0sS0FBS0MsZUFBTCxDQUFxQkosT0FBckIsRUFBOEJDLE9BQTlCLEVBQXVDQyxRQUF2QyxDQUEvQjtBQUNBLFlBQUlHLFlBQUo7O0FBQ0EscUNBQUlGLGdCQUFnQixDQUFDRyxPQUFyQixrREFBSSxzQkFBMEJDLEVBQTlCLEVBQWtDO0FBQUE7O0FBQ2hDRixVQUFBQSxZQUFZLDZCQUFHRixnQkFBZ0IsQ0FBQ0csT0FBcEIsMkRBQUcsdUJBQTBCSixRQUExQixDQUFtQ00sR0FBbkMsQ0FBd0NDLElBQUQsSUFBVUEsSUFBSSxDQUFDQyxFQUF0RCxDQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQUE7O0FBQ0wsaUJBQU9SLFFBQVEsQ0FBQ1MsTUFBVCxDQUFnQjtBQUNyQkMsWUFBQUEsVUFBVSxFQUFFLEdBRFM7QUFFckJDLFlBQUFBLElBQUksRUFBRTtBQUNKTixjQUFBQSxFQUFFLEVBQUUsS0FEQTtBQUVKTyxjQUFBQSxL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LEtBQUssQ0FBQ1osUUFBdkM7QUFDRCxTQUhELENBR0UsT0FBT3FGLFlBQVAsRUFBcUI7QUFDckIsaUJBQU96RSxLQUFLLENBQUNaLFFBQWI7QUFDRDtBQUNGOztBQUNELGFBQU9ZLEtBQUssQ0FBQzBFLE9BQWI7QUFDRCxLQXJuQmlEOztBQUNoRCxTQUFLekYsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7QUFMNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7XG4gIElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50LFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxufSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyXCI7XG5pbXBvcnQgeyBTTVBvbGljeSwgRG9jdW1lbnRTTVBvbGljeSwgRG9jdW1lbnRTTVBvbGljeVdpdGhNZXRhZGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHtcbiAgQ2F0UmVwb3NpdG9yeSxcbiAgQ2F0U25hcHNob3RJbmRleCxcbiAgQ2F0U25hcHNob3RXaXRoUmVwb0FuZFBvbGljeSxcbiAgR2V0SW5kZXhSZWNvdmVyeVJlc3BvbnNlLFxuICBHZXRTbmFwc2hvdHNSZXNwb25zZSxcbiAgR2V0U01Qb2xpY2llc1Jlc3BvbnNlLFxuICBEZWxldGVQb2xpY3lSZXNwb25zZSxcbiAgR2V0U25hcHNob3QsXG4gIEdldFNuYXBzaG90UmVzcG9uc2UsXG4gIEdldFJlcG9zaXRvcnlSZXNwb25zZSxcbiAgQWNrbm93bGVkZ2VkUmVzcG9uc2UsXG4gIENyZWF0ZVNuYXBzaG90UmVzcG9uc2UsXG4gIFJlc3RvcmVTbmFwc2hvdFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vbW9kZWxzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IEZhaWxlZFNlcnZlclJlc3BvbnNlLCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25hcHNob3RNYW5hZ2VtZW50U2VydmljZSB7XG4gIG9zRHJpdmVyOiBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQpIHtcbiAgICB0aGlzLm9zRHJpdmVyID0gb3NEcml2ZXI7XG4gIH1cblxuICBnZXRBbGxTbmFwc2hvdHNXaXRoUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8R2V0U25hcHNob3RzUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBpZiBubyByZXBvc2l0b3J5IGlucHV0LCB3ZSBuZWVkIHRvIGZpcnN0IGdldCBiYWNrIGFsbCByZXBvc2l0b3JpZXNcbiAgICAgIGNvbnN0IGdldFJlcG9zaXRvcnlSZXMgPSBhd2FpdCB0aGlzLmNhdFJlcG9zaXRvcmllcyhjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICBsZXQgcmVwb3NpdG9yaWVzOiBzdHJpbmdbXTtcbiAgICAgIGlmIChnZXRSZXBvc2l0b3J5UmVzLnBheWxvYWQ/Lm9rKSB7XG4gICAgICAgIHJlcG9zaXRvcmllcyA9IGdldFJlcG9zaXRvcnlSZXMucGF5bG9hZD8ucmVzcG9uc2UubWFwKChyZXBvKSA9PiByZXBvLmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZ2V0UmVwb3NpdG9yeVJlcy5wYXlsb2FkPy5lcnJvciBhcyBzdHJpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBzbmFwc2hvdHM6IENhdFNuYXBzaG90V2l0aFJlcG9BbmRQb2xpY3lbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBvc2l0b3JpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmVzOiBHZXRTbmFwc2hvdFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwic25hcHNob3QuZ2V0XCIsIHtcbiAgICAgICAgICByZXBvc2l0b3J5OiByZXBvc2l0b3JpZXNbaV0sXG4gICAgICAgICAgc25hcHNob3Q6IFwiX2FsbFwiLFxuICAgICAgICAgIGlnbm9yZV91bmF2YWlsYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNuYXBzaG90V2l0aFBvbGljeTogQ2F0U25hcHNob3RXaXRoUmVwb0FuZFBvbGljeVtdID0gcmVzLnNuYXBzaG90cy5tYXAoKHM6IEdldFNuYXBzaG90KSA9PiAoe1xuICAgICAgICAgIGlkOiBzLnNuYXBzaG90LFxuICAgICAgICAgIHN0YXR1czogcy5zdGF0ZSxcbiAgICAgICAgICBzdGFydF9lcG9jaDogcy5zdGFydF90aW1lX2luX21pbGxpcyxcbiAgICAgICAgICBlbmRfZXBvY2g6IHMuZW5kX3RpbWVfaW5fbWlsbGlzLFxuICAgICAgICAgIGR1cmF0aW9uOiBzLmR1cmF0aW9uX2luX21pbGxpcyxcbiAgICAgICAgICBpbmRpY2VzOiBzLmluZGljZXMubGVuZ3RoLFxuICAgICAgICAgIHN1Y2Nlc3NmdWxfc2hhcmRzOiBzLnNoYXJkcy5zdWNjZXNzZnVsLFxuICAgICAgICAgIGZhaWxlZF9zaGFyZHM6IHMuc2hhcmRzLmZhaWxlZCxcbiAgICAgICAgICB0b3RhbF9zaGFyZHM6IHMuc2hhcmRzLnRvdGFsLFxuICAgICAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcmllc1tpXSxcbiAgICAgICAgICBwb2xpY3k6IHMubWV0YWRhdGE/LnNtX3BvbGljeSxcbiAgICAgICAgfSkpO1xuICAgICAgICBzbmFwc2hvdHMgPSBbLi4uc25hcHNob3RzLCAuLi5zbmFwc2hvdFdpdGhQb2xpY3ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgIHNuYXBzaG90czogc25hcHNob3RzLFxuICAgICAgICAgICAgdG90YWxTbmFwc2hvdHM6IHNuYXBzaG90cy5sZW5ndGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWYgZ2V0dGluZyBhIG5vbi1leGlzdGluZyBzbmFwc2hvdCwgbmVlZCB0byBoYW5kbGUgdGhlIG1pc3Npbmcgc25hcHNob3QgZXhjZXB0aW9uLCBhbmQgcmV0dXJuIGVtcHR5XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZ2V0QWxsU25hcHNob3RzV2l0aFBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U25hcHNob3QgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxHZXRTbmFwc2hvdD4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCB7IHJlcG9zaXRvcnkgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICByZXBvc2l0b3J5OiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBHZXRTbmFwc2hvdFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwic25hcHNob3QuZ2V0XCIsIHtcbiAgICAgICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcbiAgICAgICAgc25hcHNob3Q6IGAke2lkfWAsXG4gICAgICAgIGlnbm9yZV91bmF2YWlsYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcy5zbmFwc2hvdHNbMF0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJnZXRTbmFwc2hvdFwiKTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlU25hcHNob3QgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxBY2tub3dsZWRnZWRSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCB7IHJlcG9zaXRvcnkgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICByZXBvc2l0b3J5OiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzcDogQWNrbm93bGVkZ2VkUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5kZWxldGVcIiwge1xuICAgICAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxuICAgICAgICBzbmFwc2hvdDogYCR7aWR9YCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3AsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJkZWxldGVTbmFwc2hvdFwiKTtcbiAgICB9XG4gIH07XG5cbiAgY3JlYXRlU25hcHNob3QgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxDcmVhdGVTbmFwc2hvdFJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMge1xuICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcmVwb3NpdG9yeSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG4gICAgICAgIHNuYXBzaG90OiBpZCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXNwOiBDcmVhdGVTbmFwc2hvdFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwic25hcHNob3QuY3JlYXRlXCIsIHBhcmFtcyk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzcCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImNyZWF0ZVNuYXBzaG90XCIpO1xuICAgIH1cbiAgfTtcblxuICByZXN0b3JlU25hcHNob3QgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxSZXN0b3JlU25hcHNob3RSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCB7IHJlcG9zaXRvcnkgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICByZXBvc2l0b3J5OiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxuICAgICAgICBzbmFwc2hvdDogaWQsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSksXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzcDogUmVzdG9yZVNuYXBzaG90UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5yZXN0b3JlXCIsIHBhcmFtcyk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzcCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcInJlc3RvcmVTbmFwc2hvdFwiKTtcbiAgICB9XG4gIH07XG5cbiAgY3JlYXRlUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8RG9jdW1lbnRTTVBvbGljeT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBwb2xpY3lJZDogaWQsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByYXdSZXMgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uY3JlYXRlU01Qb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHJlczogRG9jdW1lbnRTTVBvbGljeSA9IHtcbiAgICAgICAgc2VxTm86IHJhd1Jlcy5fc2VxX25vLFxuICAgICAgICBwcmltYXJ5VGVybTogcmF3UmVzLl9wcmltYXJ5X3Rlcm0sXG4gICAgICAgIGlkOiByYXdSZXMuX2lkLFxuICAgICAgICBwb2xpY3k6IHJhd1Jlcy5zbV9wb2xpY3ksXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImNyZWF0ZVBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8RG9jdW1lbnRTTVBvbGljeT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgeyBzZXFObywgcHJpbWFyeVRlcm0gfSA9IHJlcXVlc3QucXVlcnkgYXMgeyBzZXFObz86IHN0cmluZzsgcHJpbWFyeVRlcm0/OiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgcG9saWN5SWQ6IGlkLFxuICAgICAgICBpZlNlcU5vOiBzZXFObyxcbiAgICAgICAgaWZQcmltYXJ5VGVybTogcHJpbWFyeVRlcm0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByYXdSZXMgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20udXBkYXRlU01Qb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHJlczogRG9jdW1lbnRTTVBvbGljeSA9IHtcbiAgICAgICAgc2VxTm86IHJhd1Jlcy5fc2VxX25vLFxuICAgICAgICBwcmltYXJ5VGVybTogcmF3UmVzLl9wcmltYXJ5X3Rlcm0sXG4gICAgICAgIGlkOiByYXdSZXMuX2lkLFxuICAgICAgICBwb2xpY3k6IHJhd1Jlcy5zbV9wb2xpY3ksXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcInVwZGF0ZVBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UG9saWNpZXMgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxHZXRTTVBvbGljaWVzUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUsIHNvcnRGaWVsZCwgc29ydE9yZGVyLCBxdWVyeVN0cmluZyB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIGZyb206IHN0cmluZztcbiAgICAgICAgc2l6ZTogc3RyaW5nO1xuICAgICAgICBzb3J0RmllbGQ6IHN0cmluZztcbiAgICAgICAgc29ydE9yZGVyOiBzdHJpbmc7XG4gICAgICAgIHF1ZXJ5U3RyaW5nOiBzdHJpbmc7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBmcm9tLFxuICAgICAgICBzaXplLFxuICAgICAgICBzb3J0RmllbGQ6IGBzbV9wb2xpY3kuJHtzb3J0RmllbGR9YCxcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgICBxdWVyeVN0cmluZzogcXVlcnlTdHJpbmcudHJpbSgpID8gYCR7cXVlcnlTdHJpbmcudHJpbSgpfWAgOiBcIipcIixcbiAgICAgIH07XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZ2V0U01Qb2xpY2llc1wiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgcG9saWNpZXM6IERvY3VtZW50U01Qb2xpY3lbXSA9IHJlcy5wb2xpY2llcy5tYXAoXG4gICAgICAgIChwOiB7IF9pZDogc3RyaW5nOyBfc2VxX25vOiBudW1iZXI7IF9wcmltYXJ5X3Rlcm06IG51bWJlcjsgc21fcG9saWN5OiBTTVBvbGljeSB9KSA9PiAoe1xuICAgICAgICAgIHNlcU5vOiBwLl9zZXFfbm8sXG4gICAgICAgICAgcHJpbWFyeVRlcm06IHAuX3ByaW1hcnlfdGVybSxcbiAgICAgICAgICBpZDogcC5faWQsXG4gICAgICAgICAgcG9saWN5OiBwLnNtX3BvbGljeSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHsgcG9saWNpZXMsIHRvdGFsUG9saWNpZXM6IHJlcy50b3RhbF9wb2xpY2llcyBhcyBudW1iZXIgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBpZiAoZXJyLnN0YXR1c0NvZGUgPT09IDQwNCAmJiBlcnIuYm9keS5lcnJvci5yZWFzb24gPT09IFwiU25hcHNob3QgbWFuYWdlbWVudCBjb25maWcgaW5kZXggbm90IGZvdW5kXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHsgcG9saWNpZXM6IFtdLCB0b3RhbFBvbGljaWVzOiAwIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZ2V0UG9saWNpZXNcIik7XG4gICAgfVxuICB9O1xuXG4gIGdldFBvbGljeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPERvY3VtZW50U01Qb2xpY3lXaXRoTWV0YWRhdGEgfCBudWxsPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZ2V0U01Qb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmV4cGxhaW5TbmFwc2hvdFBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgZG9jdW1lbnRQb2xpY3kgPSB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgc2VxTm86IGdldFJlc3BvbnNlLl9zZXFfbm8sXG4gICAgICAgIHByaW1hcnlUZXJtOiBnZXRSZXNwb25zZS5fcHJpbWFyeV90ZXJtLFxuICAgICAgICBwb2xpY3k6IGdldFJlc3BvbnNlLnNtX3BvbGljeSxcbiAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLnBvbGljaWVzWzBdLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogZG9jdW1lbnRQb2xpY3ksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDQgJiYgZXJyLmJvZHkuZXJyb3IucmVhc29uID09PSBcIlNuYXBzaG90IG1hbmFnZW1lbnQgY29uZmlnIGluZGV4IG5vdCBmb3VuZFwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImdldFBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyBwb2xpY3lJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGRlbGV0ZVBvbGljeVJlc3BvbnNlOiBEZWxldGVQb2xpY3lSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5kZWxldGVTTVBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgaWYgKGRlbGV0ZVBvbGljeVJlc3BvbnNlLnJlc3VsdCAhPT0gXCJkZWxldGVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBkZWxldGVQb2xpY3lSZXNwb25zZS5yZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJkZWxldGVQb2xpY3lcIik7XG4gICAgfVxuICB9O1xuXG4gIHN0YXJ0UG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyBpZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlc3A6IEFja25vd2xlZGdlZFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLnN0YXJ0U25hcHNob3RQb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGlmIChyZXNwLmFja25vd2xlZGdlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzdGFydCBzbmFwc2hvdCBwb2xpY3kuXCIgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwic3RhcnRQb2xpY3lcIik7XG4gICAgfVxuICB9O1xuXG4gIHN0b3BQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxib29sZWFuPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzcDogQWNrbm93bGVkZ2VkUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uc3RvcFNuYXBzaG90UG9saWN5XCIsIHBhcmFtcyk7XG4gICAgICBpZiAocmVzcC5hY2tub3dsZWRnZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RvcCBzbmFwc2hvdCBwb2xpY3kuXCIgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwic3RvcFBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgY2F0UmVwb3NpdG9yaWVzID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Q2F0UmVwb3NpdG9yeVtdPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBDYXRSZXBvc2l0b3J5W10gPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJjYXQucmVwb3NpdG9yaWVzXCIsIHtcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJjYXRSZXBvc2l0b3JpZXNcIik7XG4gICAgfVxuICB9O1xuXG4gIGdldEluZGV4UmVjb3ZlcnkgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxHZXRJbmRleFJlY292ZXJ5UmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXM6IEdldEluZGV4UmVjb3ZlcnlSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImluZGljZXMucmVjb3ZlcnlcIiwge1xuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImdldEluZGV4UmVjb3ZlcnlcIik7XG4gICAgfVxuICB9O1xuXG4gIGNhdFNuYXBzaG90SW5kaWNlcyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPENhdFNuYXBzaG90SW5kZXhbXT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlczogQ2F0U25hcHNob3RJbmRleFtdID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiY2F0LmluZGljZXNcIiwge1xuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiY2F0U25hcHNob3RJbmRpY2VzXCIpO1xuICAgIH1cbiAgfTtcblxuICBjYXRSZXBvc2l0b3JpZXNXaXRoU25hcHNob3RDb3VudCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPENhdFJlcG9zaXRvcnlbXT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlczogQ2F0UmVwb3NpdG9yeVtdID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiY2F0LnJlcG9zaXRvcmllc1wiLCB7XG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICB9KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ2V0U25hcHNob3RSZXM6IEdldFNuYXBzaG90UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5nZXRcIiwge1xuICAgICAgICAgIHJlcG9zaXRvcnk6IHJlc1tpXS5pZCxcbiAgICAgICAgICBzbmFwc2hvdDogXCJfYWxsXCIsXG4gICAgICAgICAgaWdub3JlX3VuYXZhaWxhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzW2ldLnNuYXBzaG90Q291bnQgPSBnZXRTbmFwc2hvdFJlcy5zbmFwc2hvdHMubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImNhdFJlcG9zaXRvcmllc1dpdGhTbmFwc2hvdENvdW50XCIpO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVSZXBvc2l0b3J5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8QWNrbm93bGVkZ2VkUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlczogQWNrbm93bGVkZ2VkUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5kZWxldGVSZXBvc2l0b3J5XCIsIHtcbiAgICAgICAgcmVwb3NpdG9yeTogaWQsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZGVsZXRlUmVwb3NpdG9yeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UmVwb3NpdG9yeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldFJlcG9zaXRvcnlSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBHZXRSZXBvc2l0b3J5UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5nZXRSZXBvc2l0b3J5XCIsIHtcbiAgICAgICAgcmVwb3NpdG9yeTogaWQsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZ2V0UmVwb3NpdG9yeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgY3JlYXRlUmVwb3NpdG9yeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEFja25vd2xlZGdlZFJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIHJlcG9zaXRvcnk6IGlkLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlczogQWNrbm93bGVkZ2VkUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5jcmVhdGVSZXBvc2l0b3J5XCIsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImNyZWF0ZVJlcG9zaXRvcnlcIik7XG4gICAgfVxuICB9O1xuXG4gIGVycm9yUmVzcG9uc2UgPSAoXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgIGVycm9yOiBhbnksXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nXG4gICk6IElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPEZhaWxlZFNlcnZlclJlc3BvbnNlPiA9PiB7XG4gICAgY29uc29sZS5lcnJvcihgSW5kZXggTWFuYWdlbWVudCAtIFNuYXBzaG90TWFuYWdlbWVudFNlcnZpY2UgLSAke21ldGhvZE5hbWV9OmAsIGVycm9yKTtcblxuICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgc3RhdHVzQ29kZTogMjAwLCAvLyBlcnJvcj8uc3RhdHVzQ29kZSB8fCA1MDAsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IHRoaXMucGFyc2VFc0Vycm9yUmVzcG9uc2UoZXJyb3IpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBwYXJzZUVzRXJyb3JSZXNwb25zZSA9IChlcnJvcjogYW55KTogc3RyaW5nID0+IHtcbiAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVzRXJyb3JSZXNwb25zZSA9IEpTT04ucGFyc2UoZXJyb3IucmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gZXNFcnJvclJlc3BvbnNlLnJlYXNvbiB8fCBlcnJvci5yZXNwb25zZTtcbiAgICAgIH0gY2F0Y2ggKHBhcnNpbmdFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvci5tZXNzYWdlO1xuICB9O1xufVxuIl19