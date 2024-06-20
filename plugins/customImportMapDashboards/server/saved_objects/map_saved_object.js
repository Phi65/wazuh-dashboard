"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapSavedObjectsType = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const mapSavedObjectsType = {
  name: 'map',
  hidden: false,
  namespaceType: 'agnostic',
  management: {
    defaultSearchField: 'title',
    importableAndExportable: true,

    getTitle(obj) {
      return obj.attributes.title;
    },

    getInAppUrl(obj) {
      return {
        path: `/app/maps-dashboards#/${encodeURIComponent(obj.id)}`,
        uiCapabilitiesPath: 'map.show'
      };
    },

    getEditUrl(obj) {
      return `/management/opensearch-dashboards/objects/map/${encodeURIComponent(obj.id)}`;
    }

  },
  mappings: {
    properties: {
      title: {
        type: 'text'
      },
      description: {
        type: 'text'
      },
      layerList: {
        type: 'text',
        index: false
      },
      uiState: {
        type: 'text',
        index: false
      },
      mapState: {
        type: 'text',
        index: false
      },
      version: {
        type: 'integer'
      },
      // Need to add a kibanaSavedObjectMeta attribute here to follow the current saved object flow
      // When we save a saved object, the saved object plugin will extract the search source into two parts
      // Some information will be put into kibanaSavedObjectMeta while others will be created as a reference object and pushed to the reference array
      kibanaSavedObjectMeta: {
        properties: {
          searchSourceJSON: {
            type: 'text',
            index: false
          }
        }
      }
    }
  },
  migrations: {}
};
exports.mapSavedObjectsType = mapSavedObjectsType;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcF9zYXZlZF9vYmplY3QudHMiXSwibmFtZXMiOlsibWFwU2F2ZWRPYmplY3RzVHlwZSIsIm5hbWUiLCJoaWRkZW4iLCJuYW1lc3BhY2VUeXBlIiwibWFuYWdlbWVudCIsImRlZmF1bHRTZWFyY2hGaWVsZCIsImltcG9ydGFibGVBbmRFeHBvcnRhYmxlIiwiZ2V0VGl0bGUiLCJvYmoiLCJhdHRyaWJ1dGVzIiwidGl0bGUiLCJnZXRJbkFwcFVybCIsInBhdGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJpZCIsInVpQ2FwYWJpbGl0aWVzUGF0aCIsImdldEVkaXRVcmwiLCJtYXBwaW5ncyIsInByb3BlcnRpZXMiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJsYXllckxpc3QiLCJpbmRleCIsInVpU3RhdGUiLCJtYXBTdGF0ZSIsInZlcnNpb24iLCJraWJhbmFTYXZlZE9iamVjdE1ldGEiLCJzZWFyY2hTb3VyY2VKU09OIiwibWlncmF0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSU8sTUFBTUEsbUJBQXFDLEdBQUc7QUFDbkRDLEVBQUFBLElBQUksRUFBRSxLQUQ2QztBQUVuREMsRUFBQUEsTUFBTSxFQUFFLEtBRjJDO0FBR25EQyxFQUFBQSxhQUFhLEVBQUUsVUFIb0M7QUFJbkRDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxrQkFBa0IsRUFBRSxPQURWO0FBRVZDLElBQUFBLHVCQUF1QixFQUFFLElBRmY7O0FBR1ZDLElBQUFBLFFBQVEsQ0FBQ0MsR0FBRCxFQUFNO0FBQ1osYUFBT0EsR0FBRyxDQUFDQyxVQUFKLENBQWVDLEtBQXRCO0FBQ0QsS0FMUzs7QUFNVkMsSUFBQUEsV0FBVyxDQUFDSCxHQUFELEVBQU07QUFDZixhQUFPO0FBQ0xJLFFBQUFBLElBQUksRUFBRyx5QkFBd0JDLGtCQUFrQixDQUFDTCxHQUFHLENBQUNNLEVBQUwsQ0FBUyxFQURyRDtBQUVMQyxRQUFBQSxrQkFBa0IsRUFBRTtBQUZmLE9BQVA7QUFJRCxLQVhTOztBQVlWQyxJQUFBQSxVQUFVLENBQUNSLEdBQUQsRUFBTTtBQUNkLGFBQVEsaURBQWdESyxrQkFBa0IsQ0FBQ0wsR0FBRyxDQUFDTSxFQUFMLENBQVMsRUFBbkY7QUFDRDs7QUFkUyxHQUp1QztBQW9CbkRHLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDVlIsTUFBQUEsS0FBSyxFQUFFO0FBQUVTLFFBQUFBLElBQUksRUFBRTtBQUFSLE9BREc7QUFFVkMsTUFBQUEsV0FBVyxFQUFFO0FBQUVELFFBQUFBLElBQUksRUFBRTtBQUFSLE9BRkg7QUFHVkUsTUFBQUEsU0FBUyxFQUFFO0FBQUVGLFFBQUFBLElBQUksRUFBRSxNQUFSO0FBQWdCRyxRQUFBQSxLQUFLLEVBQUU7QUFBdkIsT0FIRDtBQUlWQyxNQUFBQSxPQUFPLEVBQUU7QUFBRUosUUFBQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0JHLFFBQUFBLEtBQUssRUFBRTtBQUF2QixPQUpDO0FBS1ZFLE1BQUFBLFFBQVEsRUFBRTtBQUFFTCxRQUFBQSxJQUFJLEVBQUUsTUFBUjtBQUFnQkcsUUFBQUEsS0FBSyxFQUFFO0FBQXZCLE9BTEE7QUFNVkcsTUFBQUEsT0FBTyxFQUFFO0FBQUVOLFFBQUFBLElBQUksRUFBRTtBQUFSLE9BTkM7QUFPVjtBQUNBO0FBQ0E7QUFDQU8sTUFBQUEscUJBQXFCLEVBQUU7QUFDckJSLFFBQUFBLFVBQVUsRUFBRTtBQUFFUyxVQUFBQSxnQkFBZ0IsRUFBRTtBQUFFUixZQUFBQSxJQUFJLEVBQUUsTUFBUjtBQUFnQkcsWUFBQUEsS0FBSyxFQUFFO0FBQXZCO0FBQXBCO0FBRFM7QUFWYjtBQURKLEdBcEJ5QztBQW9DbkRNLEVBQUFBLFVBQVUsRUFBRTtBQXBDdUMsQ0FBOUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFNhdmVkT2JqZWN0c1R5cGUgfSBmcm9tICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJztcblxuZXhwb3J0IGNvbnN0IG1hcFNhdmVkT2JqZWN0c1R5cGU6IFNhdmVkT2JqZWN0c1R5cGUgPSB7XG4gIG5hbWU6ICdtYXAnLFxuICBoaWRkZW46IGZhbHNlLFxuICBuYW1lc3BhY2VUeXBlOiAnYWdub3N0aWMnLFxuICBtYW5hZ2VtZW50OiB7XG4gICAgZGVmYXVsdFNlYXJjaEZpZWxkOiAndGl0bGUnLFxuICAgIGltcG9ydGFibGVBbmRFeHBvcnRhYmxlOiB0cnVlLFxuICAgIGdldFRpdGxlKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5hdHRyaWJ1dGVzLnRpdGxlO1xuICAgIH0sXG4gICAgZ2V0SW5BcHBVcmwob2JqKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRoOiBgL2FwcC9tYXBzLWRhc2hib2FyZHMjLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG9iai5pZCl9YCxcbiAgICAgICAgdWlDYXBhYmlsaXRpZXNQYXRoOiAnbWFwLnNob3cnLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGdldEVkaXRVcmwob2JqKSB7XG4gICAgICByZXR1cm4gYC9tYW5hZ2VtZW50L29wZW5zZWFyY2gtZGFzaGJvYXJkcy9vYmplY3RzL21hcC8ke2VuY29kZVVSSUNvbXBvbmVudChvYmouaWQpfWA7XG4gICAgfSxcbiAgfSxcbiAgbWFwcGluZ3M6IHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0aXRsZTogeyB0eXBlOiAndGV4dCcgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7IHR5cGU6ICd0ZXh0JyB9LFxuICAgICAgbGF5ZXJMaXN0OiB7IHR5cGU6ICd0ZXh0JywgaW5kZXg6IGZhbHNlIH0sXG4gICAgICB1aVN0YXRlOiB7IHR5cGU6ICd0ZXh0JywgaW5kZXg6IGZhbHNlIH0sXG4gICAgICBtYXBTdGF0ZTogeyB0eXBlOiAndGV4dCcsIGluZGV4OiBmYWxzZSB9LFxuICAgICAgdmVyc2lvbjogeyB0eXBlOiAnaW50ZWdlcicgfSxcbiAgICAgIC8vIE5lZWQgdG8gYWRkIGEga2liYW5hU2F2ZWRPYmplY3RNZXRhIGF0dHJpYnV0ZSBoZXJlIHRvIGZvbGxvdyB0aGUgY3VycmVudCBzYXZlZCBvYmplY3QgZmxvd1xuICAgICAgLy8gV2hlbiB3ZSBzYXZlIGEgc2F2ZWQgb2JqZWN0LCB0aGUgc2F2ZWQgb2JqZWN0IHBsdWdpbiB3aWxsIGV4dHJhY3QgdGhlIHNlYXJjaCBzb3VyY2UgaW50byB0d28gcGFydHNcbiAgICAgIC8vIFNvbWUgaW5mb3JtYXRpb24gd2lsbCBiZSBwdXQgaW50byBraWJhbmFTYXZlZE9iamVjdE1ldGEgd2hpbGUgb3RoZXJzIHdpbGwgYmUgY3JlYXRlZCBhcyBhIHJlZmVyZW5jZSBvYmplY3QgYW5kIHB1c2hlZCB0byB0aGUgcmVmZXJlbmNlIGFycmF5XG4gICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgcHJvcGVydGllczogeyBzZWFyY2hTb3VyY2VKU09OOiB7IHR5cGU6ICd0ZXh0JywgaW5kZXg6IGZhbHNlIH0gfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgbWlncmF0aW9uczoge30sXG59O1xuIl19