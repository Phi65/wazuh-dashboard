"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileService = void 0;

var _constants = require("./utils/constants");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
class ProfileService {
  static convertModel(model, id) {
    var _model$target_worker_;

    return {
      id,
      target_worker_nodes: model.target_worker_nodes,
      worker_nodes: model.worker_nodes,
      not_worker_nodes: (_model$target_worker_ = model.target_worker_nodes.filter(nodeId => {
        var _model$worker_nodes;

        return !((_model$worker_nodes = model.worker_nodes) !== null && _model$worker_nodes !== void 0 && _model$worker_nodes.includes(nodeId));
      })) !== null && _model$target_worker_ !== void 0 ? _model$target_worker_ : []
    };
  }

  static async getModel(params) {
    const {
      client,
      modelId
    } = params;
    const result = (await client.asCurrentUser.transport.request({
      method: 'GET',
      path: `${_constants.PROFILE_BASE_API}/models/${modelId}?view=model`
    })).body;

    if (!result.models) {
      return {};
    }

    const model = result.models[modelId];
    return this.convertModel(model, modelId);
  }

}

exports.ProfileService = ProfileService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGVfc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9maWxlU2VydmljZSIsImNvbnZlcnRNb2RlbCIsIm1vZGVsIiwiaWQiLCJ0YXJnZXRfd29ya2VyX25vZGVzIiwid29ya2VyX25vZGVzIiwibm90X3dvcmtlcl9ub2RlcyIsImZpbHRlciIsIm5vZGVJZCIsImluY2x1ZGVzIiwiZ2V0TW9kZWwiLCJwYXJhbXMiLCJjbGllbnQiLCJtb2RlbElkIiwicmVzdWx0IiwiYXNDdXJyZW50VXNlciIsInRyYW5zcG9ydCIsInJlcXVlc3QiLCJtZXRob2QiLCJwYXRoIiwiUFJPRklMRV9CQVNFX0FQSSIsImJvZHkiLCJtb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBdkJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPTyxNQUFNQSxjQUFOLENBQXFCO0FBQ1AsU0FBWkMsWUFBWSxDQUFDQyxLQUFELEVBQXFEQyxFQUFyRCxFQUFpRTtBQUFBOztBQUNsRixXQUFPO0FBQ0xBLE1BQUFBLEVBREs7QUFFTEMsTUFBQUEsbUJBQW1CLEVBQUVGLEtBQUssQ0FBQ0UsbUJBRnRCO0FBR0xDLE1BQUFBLFlBQVksRUFBRUgsS0FBSyxDQUFDRyxZQUhmO0FBSUxDLE1BQUFBLGdCQUFnQiwyQkFDZEosS0FBSyxDQUFDRSxtQkFBTixDQUEwQkcsTUFBMUIsQ0FBa0NDLE1BQUQ7QUFBQTs7QUFBQSxlQUFZLHlCQUFDTixLQUFLLENBQUNHLFlBQVAsZ0RBQUMsb0JBQW9CSSxRQUFwQixDQUE2QkQsTUFBN0IsQ0FBRCxDQUFaO0FBQUEsT0FBakMsQ0FEYyx5RUFDeUU7QUFMcEYsS0FBUDtBQU9EOztBQUUyQixlQUFSRSxRQUFRLENBQUNDLE1BQUQsRUFBNEQ7QUFDdEYsVUFBTTtBQUFFQyxNQUFBQSxNQUFGO0FBQVVDLE1BQUFBO0FBQVYsUUFBc0JGLE1BQTVCO0FBQ0EsVUFBTUcsTUFBTSxHQUFHLENBQ2IsTUFBTUYsTUFBTSxDQUFDRyxhQUFQLENBQXFCQyxTQUFyQixDQUErQkMsT0FBL0IsQ0FBdUM7QUFDM0NDLE1BQUFBLE1BQU0sRUFBRSxLQURtQztBQUUzQ0MsTUFBQUEsSUFBSSxFQUFHLEdBQUVDLDJCQUFpQixXQUFVUCxPQUFRO0FBRkQsS0FBdkMsQ0FETyxFQUtiUSxJQUxGOztBQU1BLFFBQUksQ0FBQ1AsTUFBTSxDQUFDUSxNQUFaLEVBQW9CO0FBQ2xCLGFBQU8sRUFBUDtBQUNEOztBQUNELFVBQU1wQixLQUFLLEdBQUdZLE1BQU0sQ0FBQ1EsTUFBUCxDQUFjVCxPQUFkLENBQWQ7QUFDQSxXQUFPLEtBQUtaLFlBQUwsQ0FBa0JDLEtBQWxCLEVBQXlCVyxPQUF6QixDQUFQO0FBQ0Q7O0FBeEJ5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBJU2NvcGVkQ2x1c3RlckNsaWVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBPcGVuU2VhcmNoTUxDb21tb25zUHJvZmlsZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9wcm9maWxlJztcblxuaW1wb3J0IHsgUFJPRklMRV9CQVNFX0FQSSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVTZXJ2aWNlIHtcbiAgc3RhdGljIGNvbnZlcnRNb2RlbChtb2RlbDogT3BlblNlYXJjaE1MQ29tbW9uc1Byb2ZpbGVbJ21vZGVscyddWydrZXknXSwgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHRhcmdldF93b3JrZXJfbm9kZXM6IG1vZGVsLnRhcmdldF93b3JrZXJfbm9kZXMsXG4gICAgICB3b3JrZXJfbm9kZXM6IG1vZGVsLndvcmtlcl9ub2RlcyxcbiAgICAgIG5vdF93b3JrZXJfbm9kZXM6XG4gICAgICAgIG1vZGVsLnRhcmdldF93b3JrZXJfbm9kZXMuZmlsdGVyKChub2RlSWQpID0+ICFtb2RlbC53b3JrZXJfbm9kZXM/LmluY2x1ZGVzKG5vZGVJZCkpID8/IFtdLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldE1vZGVsKHBhcmFtczogeyBjbGllbnQ6IElTY29wZWRDbHVzdGVyQ2xpZW50OyBtb2RlbElkOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgY2xpZW50LCBtb2RlbElkIH0gPSBwYXJhbXM7XG4gICAgY29uc3QgcmVzdWx0ID0gKFxuICAgICAgYXdhaXQgY2xpZW50LmFzQ3VycmVudFVzZXIudHJhbnNwb3J0LnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBgJHtQUk9GSUxFX0JBU0VfQVBJfS9tb2RlbHMvJHttb2RlbElkfT92aWV3PW1vZGVsYCxcbiAgICAgIH0pXG4gICAgKS5ib2R5IGFzIE9wZW5TZWFyY2hNTENvbW1vbnNQcm9maWxlO1xuICAgIGlmICghcmVzdWx0Lm1vZGVscykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBtb2RlbCA9IHJlc3VsdC5tb2RlbHNbbW9kZWxJZF07XG4gICAgcmV0dXJuIHRoaXMuY29udmVydE1vZGVsKG1vZGVsLCBtb2RlbElkKTtcbiAgfVxufVxuIl19