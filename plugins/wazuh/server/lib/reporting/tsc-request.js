"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topTSCRequirements = exports.getRulesByRequirement = void 0;

var _baseQuery = require("./base-query");

var _settings = require("../../../common/services/settings");

/*
 * Wazuh app - Specific methods to fetch Wazuh TSC data from Elasticsearch
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
 * Returns top 5 TSC requirements
 * @param {Number} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
const topTSCRequirements = async (context, gte, lte, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern')) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'rule.tsc',
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
 * Returns top 3 rules for specific TSC requirement
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} requirement TSCrequirement. E.g: 'CC7.2'
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */


exports.topTSCRequirements = topTSCRequirements;

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
        'rule.tsc': {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRzYy1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbInRvcFRTQ1JlcXVpcmVtZW50cyIsImNvbnRleHQiLCJndGUiLCJsdGUiLCJmaWx0ZXJzIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsInBhdHRlcm4iLCJiYXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiYWdncyIsInRlcm1zIiwiZmllbGQiLCJzaXplIiwib3JkZXIiLCJfY291bnQiLCJyZXNwb25zZSIsImNvcmUiLCJvcGVuc2VhcmNoIiwiY2xpZW50IiwiYXNDdXJyZW50VXNlciIsInNlYXJjaCIsImluZGV4IiwiYm9keSIsImJ1Y2tldHMiLCJhZ2dyZWdhdGlvbnMiLCJtYXAiLCJpdGVtIiwia2V5Iiwic29ydCIsImEiLCJiIiwiYV9zcGxpdCIsInNwbGl0IiwiYl9zcGxpdCIsInBhcnNlSW50IiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZ2V0UnVsZXNCeVJlcXVpcmVtZW50IiwicmVxdWlyZW1lbnQiLCJxdWVyeSIsImJvb2wiLCJmaWx0ZXIiLCJwdXNoIiwibWF0Y2hfcGhyYXNlIiwicmVkdWNlIiwiYWNjdW0iLCJidWNrZXQiLCJydWxlSUQiLCJydWxlRGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxrQkFBa0IsR0FBRyxPQUNoQ0MsT0FEZ0MsRUFFaENDLEdBRmdDLEVBR2hDQyxHQUhnQyxFQUloQ0MsT0FKZ0MsRUFLaENDLG1CQUxnQyxFQU1oQ0MsT0FBTyxHQUFHLHNDQUF1QixTQUF2QixDQU5zQixLQU83QjtBQUVILE1BQUk7QUFDRixVQUFNQyxJQUFJLEdBQUcsRUFBYjtBQUVBQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0YsSUFBZCxFQUFvQixxQkFBS0QsT0FB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QjtBQUVBLFdBQU9ELE9BQU8sQ0FBQ3NCLE1BQVIsQ0FBZSxDQUFDQyxLQUFELEVBQVFDLE1BQVIsS0FBbUI7QUFDdkMsVUFDRSxDQUFDQSxNQUFELElBQ0EsQ0FBQ0EsTUFBTSxDQUFDLEdBQUQsQ0FEUCxJQUVBLENBQUNBLE1BQU0sQ0FBQyxHQUFELENBQU4sQ0FBWXhCLE9BRmIsSUFHQSxDQUFDd0IsTUFBTSxDQUFDLEdBQUQsQ0FBTixDQUFZeEIsT0FBWixDQUFvQixDQUFwQixDQUhELElBSUEsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFELENBQU4sQ0FBWXhCLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUJJLEdBSnhCLElBS0EsQ0FBQ29CLE1BQU0sQ0FBQ3BCLEdBTlYsRUFPRTtBQUNBLGVBQU9tQixLQUFQO0FBQ0Q7O0FBQUE7QUFDREEsTUFBQUEsS0FBSyxDQUFDSCxJQUFOLENBQVc7QUFBRUssUUFBQUEsTUFBTSxFQUFFRCxNQUFNLENBQUMsR0FBRCxDQUFOLENBQVl4QixPQUFaLENBQW9CLENBQXBCLEVBQXVCSSxHQUFqQztBQUFzQ3NCLFFBQUFBLGVBQWUsRUFBRUYsTUFBTSxDQUFDcEI7QUFBOUQsT0FBWDtBQUNBLGFBQU9tQixLQUFQO0FBQ0QsS0FiTSxFQWFKLEVBYkksQ0FBUDtBQWNELEdBeERELENBd0RFLE9BQU9YLEtBQVAsRUFBYztBQUNkLFdBQU9DLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRixLQUFmLENBQVA7QUFDRDtBQUNGLENBckVNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIFNwZWNpZmljIG1ldGhvZHMgdG8gZmV0Y2ggV2F6dWggVFNDIGRhdGEgZnJvbSBFbGFzdGljc2VhcmNoXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuaW1wb3J0IHsgQmFzZSB9IGZyb20gJy4vYmFzZS1xdWVyeSc7XG5pbXBvcnQgeyBnZXRTZXR0aW5nRGVmYXVsdFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3NldHRpbmdzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRvcCA1IFRTQyByZXF1aXJlbWVudHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb250ZXh0IEVuZHBvaW50IGNvbnRleHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBndGUgVGltZXN0YW1wIChtcykgZnJvbVxuICogQHBhcmFtIHtOdW1iZXJ9IGx0ZSBUaW1lc3RhbXAgKG1zKSB0b1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCB0b3BUU0NSZXF1aXJlbWVudHMgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICBwYXR0ZXJuID0gZ2V0U2V0dGluZ0RlZmF1bHRWYWx1ZSgncGF0dGVybicpXG4pID0+IHtcblxuICB0cnkge1xuICAgIGNvbnN0IGJhc2UgPSB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZSwgQmFzZShwYXR0ZXJuLCBmaWx0ZXJzLCBndGUsIGx0ZSwgYWxsb3dlZEFnZW50c0ZpbHRlcikpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLmFnZ3MsIHtcbiAgICAgICcyJzoge1xuICAgICAgICB0ZXJtczoge1xuICAgICAgICAgIGZpZWxkOiAncnVsZS50c2MnLFxuICAgICAgICAgIHNpemU6IDUsXG4gICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2VcbiAgICB9KTtcbiAgICBjb25zdCB7IGJ1Y2tldHMgfSA9IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycyJ107XG5cbiAgICByZXR1cm4gYnVja2V0c1xuICAgICAgLm1hcChpdGVtID0+IGl0ZW0ua2V5KVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgYV9zcGxpdCA9IGEuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgYl9zcGxpdCA9IGIuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHBhcnNlSW50KGFfc3BsaXRbMF0pID4gcGFyc2VJbnQoYl9zcGxpdFswXSkpIHJldHVybiAxO1xuICAgICAgICBlbHNlIGlmIChwYXJzZUludChhX3NwbGl0WzBdKSA8IHBhcnNlSW50KGJfc3BsaXRbMF0pKSByZXR1cm4gLTE7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChwYXJzZUludChhX3NwbGl0WzFdKSA+IHBhcnNlSW50KGJfc3BsaXRbMV0pKSByZXR1cm4gMTtcbiAgICAgICAgICBlbHNlIGlmIChwYXJzZUludChhX3NwbGl0WzFdKSA8IHBhcnNlSW50KGJfc3BsaXRbMV0pKSByZXR1cm4gLTE7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoYV9zcGxpdFsyXSkgPiBwYXJzZUludChiX3NwbGl0WzJdKSkgcmV0dXJuIDE7XG4gICAgICAgICAgICBlbHNlIGlmIChwYXJzZUludChhX3NwbGl0WzJdKSA8IHBhcnNlSW50KGJfc3BsaXRbMl0pKSByZXR1cm4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0b3AgMyBydWxlcyBmb3Igc3BlY2lmaWMgVFNDIHJlcXVpcmVtZW50XG4gKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICogQHBhcmFtIHtOdW1iZXJ9IGd0ZSBUaW1lc3RhbXAgKG1zKSBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gbHRlIFRpbWVzdGFtcCAobXMpIHRvXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWlyZW1lbnQgVFNDcmVxdWlyZW1lbnQuIEUuZzogJ0NDNy4yJ1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSdWxlc0J5UmVxdWlyZW1lbnQgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICByZXF1aXJlbWVudCxcbiAgcGF0dGVybiA9IGdldFNldHRpbmdEZWZhdWx0VmFsdWUoJ3BhdHRlcm4nKVxuKSA9PiB7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ3J1bGUuZGVzY3JpcHRpb24nLFxuICAgICAgICAgIHNpemU6IDMsXG4gICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhZ2dzOiB7XG4gICAgICAgICAgJzMnOiB7XG4gICAgICAgICAgICB0ZXJtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ3J1bGUuaWQnLFxuICAgICAgICAgICAgICBzaXplOiAxLFxuICAgICAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJhc2UucXVlcnkuYm9vbC5maWx0ZXIucHVzaCh7XG4gICAgICBtYXRjaF9waHJhc2U6IHtcbiAgICAgICAgJ3J1bGUudHNjJzoge1xuICAgICAgICAgIHF1ZXJ5OiByZXF1aXJlbWVudFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2VcbiAgICB9KTtcbiAgICBjb25zdCB7IGJ1Y2tldHMgfSA9IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycyJ107XG5cbiAgICByZXR1cm4gYnVja2V0cy5yZWR1Y2UoKGFjY3VtLCBidWNrZXQpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWJ1Y2tldCB8fFxuICAgICAgICAhYnVja2V0WyczJ10gfHxcbiAgICAgICAgIWJ1Y2tldFsnMyddLmJ1Y2tldHMgfHxcbiAgICAgICAgIWJ1Y2tldFsnMyddLmJ1Y2tldHNbMF0gfHxcbiAgICAgICAgIWJ1Y2tldFsnMyddLmJ1Y2tldHNbMF0ua2V5IHx8XG4gICAgICAgICFidWNrZXQua2V5XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgfTtcbiAgICAgIGFjY3VtLnB1c2goeyBydWxlSUQ6IGJ1Y2tldFsnMyddLmJ1Y2tldHNbMF0ua2V5LCBydWxlRGVzY3JpcHRpb246IGJ1Y2tldC5rZXkgfSk7XG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSwgW10pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cbiJdfQ==