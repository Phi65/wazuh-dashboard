"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topPCIRequirements = exports.getRulesByRequirement = void 0;

var _baseQuery = require("./base-query");

var _settings = require("../../../common/services/settings");

/*
 * Wazuh app - Specific methods to fetch Wazuh PCI DSS data from Elasticsearch
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

/**
 * Returns top 5 PCI DSS requirements
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
const topPCIRequirements = async (context, gte, lte, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern')) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'rule.pci_dss',
          size: 5,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    return buckets.map(item => item.key).sort((a, b) => {
      const a_split = a.split('.');
      const b_split = b.split('.');
      if (parseInt(a_split[0]) > parseInt(b_split[0])) return 1;else if (parseInt(a_split[0]) < parseInt(b_split[0])) return -1;else {
        if (parseInt(a_split[1]) > parseInt(b_split[1])) return 1;else if (parseInt(a_split[1]) < parseInt(b_split[1])) return -1;else {
          if (parseInt(a_split[2]) > parseInt(b_split[2])) return 1;else if (parseInt(a_split[2]) < parseInt(b_split[2])) return -1;
        }
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * Returns top 3 rules for specific PCI DSS requirement
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} requirement PCI DSS requirement. E.g: '10.2.3'
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */


exports.topPCIRequirements = topPCIRequirements;

const getRulesByRequirement = async (context, gte, lte, filters, allowedAgentsFilter, requirement, pattern = (0, _settings.getSettingDefaultValue)('pattern')) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'rule.description',
          size: 3,
          order: {
            _count: 'desc'
          }
        },
        aggs: {
          '3': {
            terms: {
              field: 'rule.id',
              size: 1,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      }
    });
    base.query.bool.filter.push({
      match_phrase: {
        'rule.pci_dss': {
          query: requirement
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    return buckets.reduce((accum, bucket) => {
      if (!bucket || !bucket['3'] || !bucket['3'].buckets || !bucket['3'].buckets[0] || !bucket['3'].buckets[0].key || !bucket.key) {
        return accum;
      }

      ;
      accum.push({
        ruleID: bucket['3'].buckets[0].key,
        ruleDescription: bucket.key
      });
      return accum;
    }, []);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getRulesByRequirement = getRulesByRequirement;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBjaS1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbInRvcFBDSVJlcXVpcmVtZW50cyIsImNvbnRleHQiLCJndGUiLCJsdGUiLCJmaWx0ZXJzIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsInBhdHRlcm4iLCJiYXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiYWdncyIsInRlcm1zIiwiZmllbGQiLCJzaXplIiwib3JkZXIiLCJfY291bnQiLCJyZXNwb25zZSIsImNvcmUiLCJvcGVuc2VhcmNoIiwiY2xpZW50IiwiYXNDdXJyZW50VXNlciIsInNlYXJjaCIsImluZGV4IiwiYm9keSIsImJ1Y2tldHMiLCJhZ2dyZWdhdGlvbnMiLCJtYXAiLCJpdGVtIiwia2V5Iiwic29ydCIsImEiLCJiIiwiYV9zcGxpdCIsInNwbGl0IiwiYl9zcGxpdCIsInBhcnNlSW50IiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZ2V0UnVsZXNCeVJlcXVpcmVtZW50IiwicmVxdWlyZW1lbnQiLCJxdWVyeSIsImJvb2wiLCJmaWx0ZXIiLCJwdXNoIiwibWF0Y2hfcGhyYXNlIiwicmVkdWNlIiwiYWNjdW0iLCJidWNrZXQiLCJydWxlSUQiLCJydWxlRGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxrQkFBa0IsR0FBRyxPQUNoQ0MsT0FEZ0MsRUFFaENDLEdBRmdDLEVBR2hDQyxHQUhnQyxFQUloQ0MsT0FKZ0MsRUFLaENDLG1CQUxnQyxFQU1oQ0MsT0FBTyxHQUFHLHNDQUF1QixTQUF2QixDQU5zQixLQU83QjtBQUVILE1BQUk7QUFDRixVQUFNQyxJQUFJLEdBQUcsRUFBYjtBQUVBQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0YsSUFBZCxFQUFvQixxQkFBS0QsT0FBTCxFQUFjRixPQUFkLEVBQXVCRixHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNFLG1CQUFqQyxDQUFwQjtBQUVBRyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0YsSUFBSSxDQUFDRyxJQUFuQixFQUF5QjtBQUN2QixXQUFLO0FBQ0hDLFFBQUFBLEtBQUssRUFBRTtBQUNMQyxVQUFBQSxLQUFLLEVBQUUsY0FERjtBQUVMQyxVQUFBQSxJQUFJLEVBQUUsQ0FGRDtBQUdMQyxVQUFBQSxLQUFLLEVBQUU7QUFDTEMsWUFBQUEsTUFBTSxFQUFFO0FBREg7QUFIRjtBQURKO0FBRGtCLEtBQXpCO0FBWUEsVUFBTUMsUUFBUSxHQUFHLE1BQU1mLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYUMsVUFBYixDQUF3QkMsTUFBeEIsQ0FBK0JDLGFBQS9CLENBQTZDQyxNQUE3QyxDQUFvRDtBQUN6RUMsTUFBQUEsS0FBSyxFQUFFaEIsT0FEa0U7QUFFekVpQixNQUFBQSxJQUFJLEVBQUVoQjtBQUZtRSxLQUFwRCxDQUF2QjtBQUlBLFVBQU07QUFBRWlCLE1BQUFBO0FBQUYsUUFBY1IsUUFBUSxDQUFDTyxJQUFULENBQWNFLFlBQWQsQ0FBMkIsR0FBM0IsQ0FBcEI7QUFFQSxXQUFPRCxPQUFPLENBQ1hFLEdBREksQ0FDQUMsSUFBSSxJQUFJQSxJQUFJLENBQUNDLEdBRGIsRUFFSkMsSUFGSSxDQUVDLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVO0FBQ2QsWUFBTUMsT0FBTyxHQUFHRixDQUFDLENBQUNHLEtBQUYsQ0FBUSxHQUFSLENBQWhCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHSCxDQUFDLENBQUNFLEtBQUYsQ0FBUSxHQUFSLENBQWhCO0FBQ0EsVUFBSUUsUUFBUSxDQUFDSCxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQVIsR0FBdUJHLFFBQVEsQ0FBQ0QsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUFuQyxFQUFpRCxPQUFPLENBQVAsQ0FBakQsS0FDSyxJQUFJQyxRQUFRLENBQUNILE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBUixHQUF1QkcsUUFBUSxDQUFDRCxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQW5DLEVBQWlELE9BQU8sQ0FBQyxDQUFSLENBQWpELEtBQ0E7QUFDSCxZQUFJQyxRQUFRLENBQUNILE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBUixHQUF1QkcsUUFBUSxDQUFDRCxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQW5DLEVBQWlELE9BQU8sQ0FBUCxDQUFqRCxLQUNLLElBQUlDLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUFSLEdBQXVCRyxRQUFRLENBQUNELE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBbkMsRUFBaUQsT0FBTyxDQUFDLENBQVIsQ0FBakQsS0FDQTtBQUNILGNBQUlDLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUFSLEdBQXVCRyxRQUFRLENBQUNELE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBbkMsRUFBaUQsT0FBTyxDQUFQLENBQWpELEtBQ0ssSUFBSUMsUUFBUSxDQUFDSCxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQVIsR0FBdUJHLFFBQVEsQ0FBQ0QsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUFuQyxFQUFpRCxPQUFPLENBQUMsQ0FBUjtBQUN2RDtBQUNGO0FBQ0YsS0FmSSxDQUFQO0FBZ0JELEdBdkNELENBdUNFLE9BQU9FLEtBQVAsRUFBYztBQUNkLFdBQU9DLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRixLQUFmLENBQVA7QUFDRDtBQUNGLENBbkRNO0FBcURQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDTyxNQUFNRyxxQkFBcUIsR0FBRyxPQUNuQ3RDLE9BRG1DLEVBRW5DQyxHQUZtQyxFQUduQ0MsR0FIbUMsRUFJbkNDLE9BSm1DLEVBS25DQyxtQkFMbUMsRUFNbkNtQyxXQU5tQyxFQU9uQ2xDLE9BQU8sR0FBRyxzQ0FBdUIsU0FBdkIsQ0FQeUIsS0FRaEM7QUFFSCxNQUFJO0FBQ0YsVUFBTUMsSUFBSSxHQUFHLEVBQWI7QUFFQUMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNGLElBQWQsRUFBb0IscUJBQUtELE9BQUwsRUFBY0YsT0FBZCxFQUF1QkYsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDRSxtQkFBakMsQ0FBcEI7QUFFQUcsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNGLElBQUksQ0FBQ0csSUFBbkIsRUFBeUI7QUFDdkIsV0FBSztBQUNIQyxRQUFBQSxLQUFLLEVBQUU7QUFDTEMsVUFBQUEsS0FBSyxFQUFFLGtCQURGO0FBRUxDLFVBQUFBLElBQUksRUFBRSxDQUZEO0FBR0xDLFVBQUFBLEtBQUssRUFBRTtBQUNMQyxZQUFBQSxNQUFNLEVBQUU7QUFESDtBQUhGLFNBREo7QUFRSEwsUUFBQUEsSUFBSSxFQUFFO0FBQ0osZUFBSztBQUNIQyxZQUFBQSxLQUFLLEVBQUU7QUFDTEMsY0FBQUEsS0FBSyxFQUFFLFNBREY7QUFFTEMsY0FBQUEsSUFBSSxFQUFFLENBRkQ7QUFHTEMsY0FBQUEsS0FBSyxFQUFFO0FBQ0xDLGdCQUFBQSxNQUFNLEVBQUU7QUFESDtBQUhGO0FBREo7QUFERDtBQVJIO0FBRGtCLEtBQXpCO0FBdUJBUixJQUFBQSxJQUFJLENBQUNrQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JDLE1BQWhCLENBQXVCQyxJQUF2QixDQUE0QjtBQUMxQkMsTUFBQUEsWUFBWSxFQUFFO0FBQ1osd0JBQWdCO0FBQ2RKLFVBQUFBLEtBQUssRUFBRUQ7QUFETztBQURKO0FBRFksS0FBNUI7QUFRQSxVQUFNeEIsUUFBUSxHQUFHLE1BQU1mLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYUMsVUFBYixDQUF3QkMsTUFBeEIsQ0FBK0JDLGFBQS9CLENBQTZDQyxNQUE3QyxDQUFvRDtBQUN6RUMsTUFBQUEsS0FBSyxFQUFFaEIsT0FEa0U7QUFFekVpQixNQUFBQSxJQUFJLEVBQUVoQjtBQUZtRSxLQUFwRCxDQUF2QjtBQUlBLFVBQU07QUFBRWlCLE1BQUFBO0FBQUYsUUFBY1IsUUFBUSxDQUFDTyxJQUFULENBQWNFLFlBQWQsQ0FBMkIsR0FBM0IsQ0FBcEI7QUFDQSxXQUFPRCxPQUFPLENBQUNzQixNQUFSLENBQWUsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEtBQW1CO0FBQ3ZDLFVBQ0UsQ0FBQ0EsTUFBRCxJQUNBLENBQUNBLE1BQU0sQ0FBQyxHQUFELENBRFAsSUFFQSxDQUFDQSxNQUFNLENBQUMsR0FBRCxDQUFOLENBQVl4QixPQUZiLElBR0EsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFELENBQU4sQ0FBWXhCLE9BQVosQ0FBb0IsQ0FBcEIsQ0FIRCxJQUlBLENBQUN3QixNQUFNLENBQUMsR0FBRCxDQUFOLENBQVl4QixPQUFaLENBQW9CLENBQXBCLEVBQXVCSSxHQUp4QixJQUtBLENBQUNvQixNQUFNLENBQUNwQixHQU5WLEVBT0U7QUFDQSxlQUFPbUIsS0FBUDtBQUNEOztBQUFBO0FBQ0RBLE1BQUFBLEtBQUssQ0FBQ0gsSUFBTixDQUFXO0FBQUVLLFFBQUFBLE1BQU0sRUFBRUQsTUFBTSxDQUFDLEdBQUQsQ0FBTixDQUFZeEIsT0FBWixDQUFvQixDQUFwQixFQUF1QkksR0FBakM7QUFBc0NzQixRQUFBQSxlQUFlLEVBQUVGLE1BQU0sQ0FBQ3BCO0FBQTlELE9BQVg7QUFDQSxhQUFPbUIsS0FBUDtBQUNELEtBYk0sRUFhSixFQWJJLENBQVA7QUFjRCxHQXZERCxDQXVERSxPQUFPWCxLQUFQLEVBQWM7QUFDZCxXQUFPQyxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixDQUFQO0FBQ0Q7QUFDRixDQXBFTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBTcGVjaWZpYyBtZXRob2RzIHRvIGZldGNoIFdhenVoIFBDSSBEU1MgZGF0YSBmcm9tIEVsYXN0aWNzZWFyY2hcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5pbXBvcnQgeyBCYXNlIH0gZnJvbSAnLi9iYXNlLXF1ZXJ5JztcbmltcG9ydCB7IGdldFNldHRpbmdEZWZhdWx0VmFsdWUgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vc2VydmljZXMvc2V0dGluZ3MnO1xuXG4vKipcbiAqIFJldHVybnMgdG9wIDUgUENJIERTUyByZXF1aXJlbWVudHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgdG9wUENJUmVxdWlyZW1lbnRzID0gYXN5bmMgKFxuICBjb250ZXh0LFxuICBndGUsXG4gIGx0ZSxcbiAgZmlsdGVycyxcbiAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgcGF0dGVybiA9IGdldFNldHRpbmdEZWZhdWx0VmFsdWUoJ3BhdHRlcm4nKVxuKSA9PiB7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ3J1bGUucGNpX2RzcycsXG4gICAgICAgICAgc2l6ZTogNSxcbiAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYydcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgIGluZGV4OiBwYXR0ZXJuLFxuICAgICAgYm9keTogYmFzZVxuICAgIH0pO1xuICAgIGNvbnN0IHsgYnVja2V0cyB9ID0gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzInXTtcblxuICAgIHJldHVybiBidWNrZXRzXG4gICAgICAubWFwKGl0ZW0gPT4gaXRlbS5rZXkpXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBhX3NwbGl0ID0gYS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBiX3NwbGl0ID0gYi5zcGxpdCgnLicpO1xuICAgICAgICBpZiAocGFyc2VJbnQoYV9zcGxpdFswXSkgPiBwYXJzZUludChiX3NwbGl0WzBdKSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KGFfc3BsaXRbMF0pIDwgcGFyc2VJbnQoYl9zcGxpdFswXSkpIHJldHVybiAtMTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHBhcnNlSW50KGFfc3BsaXRbMV0pID4gcGFyc2VJbnQoYl9zcGxpdFsxXSkpIHJldHVybiAxO1xuICAgICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KGFfc3BsaXRbMV0pIDwgcGFyc2VJbnQoYl9zcGxpdFsxXSkpIHJldHVybiAtMTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChhX3NwbGl0WzJdKSA+IHBhcnNlSW50KGJfc3BsaXRbMl0pKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KGFfc3BsaXRbMl0pIDwgcGFyc2VJbnQoYl9zcGxpdFsyXSkpIHJldHVybiAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRvcCAzIHJ1bGVzIGZvciBzcGVjaWZpYyBQQ0kgRFNTIHJlcXVpcmVtZW50XG4gKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICogQHBhcmFtIHtOdW1iZXJ9IGd0ZSBUaW1lc3RhbXAgKG1zKSBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gbHRlIFRpbWVzdGFtcCAobXMpIHRvXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWlyZW1lbnQgUENJIERTUyByZXF1aXJlbWVudC4gRS5nOiAnMTAuMi4zJ1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSdWxlc0J5UmVxdWlyZW1lbnQgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICByZXF1aXJlbWVudCxcbiAgcGF0dGVybiA9IGdldFNldHRpbmdEZWZhdWx0VmFsdWUoJ3BhdHRlcm4nKVxuKSA9PiB7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ3J1bGUuZGVzY3JpcHRpb24nLFxuICAgICAgICAgIHNpemU6IDMsXG4gICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhZ2dzOiB7XG4gICAgICAgICAgJzMnOiB7XG4gICAgICAgICAgICB0ZXJtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ3J1bGUuaWQnLFxuICAgICAgICAgICAgICBzaXplOiAxLFxuICAgICAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJhc2UucXVlcnkuYm9vbC5maWx0ZXIucHVzaCh7XG4gICAgICBtYXRjaF9waHJhc2U6IHtcbiAgICAgICAgJ3J1bGUucGNpX2Rzcyc6IHtcbiAgICAgICAgICBxdWVyeTogcmVxdWlyZW1lbnRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgaW5kZXg6IHBhdHRlcm4sXG4gICAgICBib2R5OiBiYXNlXG4gICAgfSk7XG4gICAgY29uc3QgeyBidWNrZXRzIH0gPSByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMiddO1xuICAgIHJldHVybiBidWNrZXRzLnJlZHVjZSgoYWNjdW0sIGJ1Y2tldCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhYnVja2V0IHx8XG4gICAgICAgICFidWNrZXRbJzMnXSB8fFxuICAgICAgICAhYnVja2V0WyczJ10uYnVja2V0cyB8fFxuICAgICAgICAhYnVja2V0WyczJ10uYnVja2V0c1swXSB8fFxuICAgICAgICAhYnVja2V0WyczJ10uYnVja2V0c1swXS5rZXkgfHxcbiAgICAgICAgIWJ1Y2tldC5rZXlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gYWNjdW07XG4gICAgICB9O1xuICAgICAgYWNjdW0ucHVzaCh7IHJ1bGVJRDogYnVja2V0WyczJ10uYnVja2V0c1swXS5rZXksIHJ1bGVEZXNjcmlwdGlvbjogYnVja2V0LmtleSB9KTtcbiAgICAgIHJldHVybiBhY2N1bTtcbiAgICB9LCBbXSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxufVxuXG4iXX0=