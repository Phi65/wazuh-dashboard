"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const coreServicesMock = {
  uiSettings: {
    get: jest.fn()
  },
  chrome: {
    setBreadcrumbs: jest.fn()
  },
  notifications: {
    toasts: {
      addDanger: jest.fn(() => ({})).mockName("addDanger"),
      addSuccess: jest.fn(() => ({})).mockName("addSuccess"),
      addWarning: jest.fn(() => ({})).mockName("addWarning"),
      remove: jest.fn(() => ({})).mockName("remove")
    }
  },
  docLinks: {
    links: {
      opensearch: {
        reindexData: {
          base: "https://opensearch.org/docs/latest/opensearch/reindex-data/",
          transform: "https://opensearch.org/docs/latest/opensearch/reindex-data/#transform-documents-during-reindexing"
        },
        queryDSL: {
          base: "https://opensearch.org/docs/opensearch/query-dsl/index/"
        },
        indexTemplates: {
          base: "https://opensearch.org/docs/latest/opensearch/index-templates"
        },
        indexAlias: {
          base: "https://opensearch.org/docs/latest/opensearch/index-alias/"
        }
      }
    }
  }
};
var _default = coreServicesMock;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmVTZXJ2aWNlc01vY2sudHMiXSwibmFtZXMiOlsiY29yZVNlcnZpY2VzTW9jayIsInVpU2V0dGluZ3MiLCJnZXQiLCJqZXN0IiwiZm4iLCJjaHJvbWUiLCJzZXRCcmVhZGNydW1icyIsIm5vdGlmaWNhdGlvbnMiLCJ0b2FzdHMiLCJhZGREYW5nZXIiLCJtb2NrTmFtZSIsImFkZFN1Y2Nlc3MiLCJhZGRXYXJuaW5nIiwicmVtb3ZlIiwiZG9jTGlua3MiLCJsaW5rcyIsIm9wZW5zZWFyY2giLCJyZWluZGV4RGF0YSIsImJhc2UiLCJ0cmFuc2Zvcm0iLCJxdWVyeURTTCIsImluZGV4VGVtcGxhdGVzIiwiaW5kZXhBbGlhcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUEsTUFBTUEsZ0JBQWdCLEdBQUc7QUFDdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxHQUFHLEVBQUVDLElBQUksQ0FBQ0MsRUFBTDtBQURLLEdBRFc7QUFJdkJDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxjQUFjLEVBQUVILElBQUksQ0FBQ0MsRUFBTDtBQURWLEdBSmU7QUFPdkJHLEVBQUFBLGFBQWEsRUFBRTtBQUNiQyxJQUFBQSxNQUFNLEVBQUU7QUFDTkMsTUFBQUEsU0FBUyxFQUFFTixJQUFJLENBQUNDLEVBQUwsQ0FBUSxPQUFPLEVBQVAsQ0FBUixFQUFvQk0sUUFBcEIsQ0FBNkIsV0FBN0IsQ0FETDtBQUVOQyxNQUFBQSxVQUFVLEVBQUVSLElBQUksQ0FBQ0MsRUFBTCxDQUFRLE9BQU8sRUFBUCxDQUFSLEVBQW9CTSxRQUFwQixDQUE2QixZQUE3QixDQUZOO0FBR05FLE1BQUFBLFVBQVUsRUFBRVQsSUFBSSxDQUFDQyxFQUFMLENBQVEsT0FBTyxFQUFQLENBQVIsRUFBb0JNLFFBQXBCLENBQTZCLFlBQTdCLENBSE47QUFJTkcsTUFBQUEsTUFBTSxFQUFFVixJQUFJLENBQUNDLEVBQUwsQ0FBUSxPQUFPLEVBQVAsQ0FBUixFQUFvQk0sUUFBcEIsQ0FBNkIsUUFBN0I7QUFKRjtBQURLLEdBUFE7QUFldkJJLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUU7QUFDTEMsTUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFFBQUFBLFdBQVcsRUFBRTtBQUNYQyxVQUFBQSxJQUFJLEVBQUUsNkRBREs7QUFFWEMsVUFBQUEsU0FBUyxFQUFFO0FBRkEsU0FESDtBQUtWQyxRQUFBQSxRQUFRLEVBQUU7QUFDUkYsVUFBQUEsSUFBSSxFQUFFO0FBREUsU0FMQTtBQVFWRyxRQUFBQSxjQUFjLEVBQUU7QUFDZEgsVUFBQUEsSUFBSSxFQUFFO0FBRFEsU0FSTjtBQVdWSSxRQUFBQSxVQUFVLEVBQUU7QUFDVkosVUFBQUEsSUFBSSxFQUFFO0FBREk7QUFYRjtBQURQO0FBREM7QUFmYSxDQUF6QjtlQW9DZ0JsQixnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29yZVN0YXJ0IH0gZnJvbSBcIm9wZW5zZWFyY2gtZGFzaGJvYXJkcy9wdWJsaWNcIjtcblxuY29uc3QgY29yZVNlcnZpY2VzTW9jayA9IHtcbiAgdWlTZXR0aW5nczoge1xuICAgIGdldDogamVzdC5mbigpLFxuICB9LFxuICBjaHJvbWU6IHtcbiAgICBzZXRCcmVhZGNydW1iczogamVzdC5mbigpLFxuICB9LFxuICBub3RpZmljYXRpb25zOiB7XG4gICAgdG9hc3RzOiB7XG4gICAgICBhZGREYW5nZXI6IGplc3QuZm4oKCkgPT4gKHt9KSkubW9ja05hbWUoXCJhZGREYW5nZXJcIiksXG4gICAgICBhZGRTdWNjZXNzOiBqZXN0LmZuKCgpID0+ICh7fSkpLm1vY2tOYW1lKFwiYWRkU3VjY2Vzc1wiKSxcbiAgICAgIGFkZFdhcm5pbmc6IGplc3QuZm4oKCkgPT4gKHt9KSkubW9ja05hbWUoXCJhZGRXYXJuaW5nXCIpLFxuICAgICAgcmVtb3ZlOiBqZXN0LmZuKCgpID0+ICh7fSkpLm1vY2tOYW1lKFwicmVtb3ZlXCIpLFxuICAgIH0sXG4gIH0sXG4gIGRvY0xpbmtzOiB7XG4gICAgbGlua3M6IHtcbiAgICAgIG9wZW5zZWFyY2g6IHtcbiAgICAgICAgcmVpbmRleERhdGE6IHtcbiAgICAgICAgICBiYXNlOiBcImh0dHBzOi8vb3BlbnNlYXJjaC5vcmcvZG9jcy9sYXRlc3Qvb3BlbnNlYXJjaC9yZWluZGV4LWRhdGEvXCIsXG4gICAgICAgICAgdHJhbnNmb3JtOiBcImh0dHBzOi8vb3BlbnNlYXJjaC5vcmcvZG9jcy9sYXRlc3Qvb3BlbnNlYXJjaC9yZWluZGV4LWRhdGEvI3RyYW5zZm9ybS1kb2N1bWVudHMtZHVyaW5nLXJlaW5kZXhpbmdcIixcbiAgICAgICAgfSxcbiAgICAgICAgcXVlcnlEU0w6IHtcbiAgICAgICAgICBiYXNlOiBcImh0dHBzOi8vb3BlbnNlYXJjaC5vcmcvZG9jcy9vcGVuc2VhcmNoL3F1ZXJ5LWRzbC9pbmRleC9cIixcbiAgICAgICAgfSxcbiAgICAgICAgaW5kZXhUZW1wbGF0ZXM6IHtcbiAgICAgICAgICBiYXNlOiBcImh0dHBzOi8vb3BlbnNlYXJjaC5vcmcvZG9jcy9sYXRlc3Qvb3BlbnNlYXJjaC9pbmRleC10ZW1wbGF0ZXNcIixcbiAgICAgICAgfSxcbiAgICAgICAgaW5kZXhBbGlhczoge1xuICAgICAgICAgIGJhc2U6IFwiaHR0cHM6Ly9vcGVuc2VhcmNoLm9yZy9kb2NzL2xhdGVzdC9vcGVuc2VhcmNoL2luZGV4LWFsaWFzL1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGNvcmVTZXJ2aWNlc01vY2sgYXMgdW5rbm93bikgYXMgQ29yZVN0YXJ0O1xuIl19