"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.top5RootkitsDetected = exports.agentsWithHiddenPorts = exports.agentsWithHiddenPids = void 0;

var _baseQuery = require("./base-query");

var _settings = require("../../../common/services/settings");

/*
 * Wazuh app - Specific methods to fetch Wazuh rootcheck data from Elasticsearch
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
 * Returns top 5 rootkits found along all agents
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
const top5RootkitsDetected = async (context, gte, lte, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern'), size = 5) => {
  try {
    var _base$query, _base$query$bool, _base$query$bool$must;

    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'data.title',
          size: size,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    (_base$query = base.query) === null || _base$query === void 0 ? void 0 : (_base$query$bool = _base$query.bool) === null || _base$query$bool === void 0 ? void 0 : (_base$query$bool$must = _base$query$bool.must) === null || _base$query$bool$must === void 0 ? void 0 : _base$query$bool$must.push({
      query_string: {
        query: '"rootkit" AND "detected"'
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    const mapped = buckets.map(item => item.key);
    const result = [];

    for (const item of mapped) {
      result.push(item.split("'")[1].split("'")[0]);
    }

    ;
    return result.filter((item, pos) => result.indexOf(item) === pos);
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * Returns the number of agents that have one or more hidden processes
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */


exports.top5RootkitsDetected = top5RootkitsDetected;

const agentsWithHiddenPids = async (context, gte, lte, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern')) => {
  try {
    var _base$query2, _base$query2$bool, _base$query2$bool$mus;

    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '1': {
        cardinality: {
          field: 'agent.id'
        }
      }
    });
    (_base$query2 = base.query) === null || _base$query2 === void 0 ? void 0 : (_base$query2$bool = _base$query2.bool) === null || _base$query2$bool === void 0 ? void 0 : (_base$query2$bool$mus = _base$query2$bool.must) === null || _base$query2$bool$mus === void 0 ? void 0 : _base$query2$bool$mus.push({
      query_string: {
        query: '"process" AND "hidden"'
      }
    }); // "aggregations": { "1": { "value": 1 } }

    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    return response.body && response.body.aggregations && response.body.aggregations['1'] && response.body.aggregations['1'].value ? response.body.aggregations['1'].value : 0;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * Returns the number of agents that have one or more hidden ports
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */


exports.agentsWithHiddenPids = agentsWithHiddenPids;

const agentsWithHiddenPorts = async (context, gte, lte, filters, allowedAgentsFilter, pattern = (0, _settings.getSettingDefaultValue)('pattern')) => {
  try {
    var _base$query3, _base$query3$bool, _base$query3$bool$mus;

    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '1': {
        cardinality: {
          field: 'agent.id'
        }
      }
    });
    (_base$query3 = base.query) === null || _base$query3 === void 0 ? void 0 : (_base$query3$bool = _base$query3.bool) === null || _base$query3$bool === void 0 ? void 0 : (_base$query3$bool$mus = _base$query3$bool.must) === null || _base$query3$bool$mus === void 0 ? void 0 : _base$query3$bool$mus.push({
      query_string: {
        query: '"port" AND "hidden"'
      }
    }); // "aggregations": { "1": { "value": 1 } }

    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    return response.body && response.body.aggregations && response.body.aggregations['1'] && response.body.aggregations['1'].value ? response.body.aggregations['1'].value : 0;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.agentsWithHiddenPorts = agentsWithHiddenPorts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvb3RjaGVjay1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbInRvcDVSb290a2l0c0RldGVjdGVkIiwiY29udGV4dCIsImd0ZSIsImx0ZSIsImZpbHRlcnMiLCJhbGxvd2VkQWdlbnRzRmlsdGVyIiwicGF0dGVybiIsInNpemUiLCJiYXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiYWdncyIsInRlcm1zIiwiZmllbGQiLCJvcmRlciIsIl9jb3VudCIsInF1ZXJ5IiwiYm9vbCIsIm11c3QiLCJwdXNoIiwicXVlcnlfc3RyaW5nIiwicmVzcG9uc2UiLCJjb3JlIiwib3BlbnNlYXJjaCIsImNsaWVudCIsImFzQ3VycmVudFVzZXIiLCJzZWFyY2giLCJpbmRleCIsImJvZHkiLCJidWNrZXRzIiwiYWdncmVnYXRpb25zIiwibWFwcGVkIiwibWFwIiwiaXRlbSIsImtleSIsInJlc3VsdCIsInNwbGl0IiwiZmlsdGVyIiwicG9zIiwiaW5kZXhPZiIsImVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsImFnZW50c1dpdGhIaWRkZW5QaWRzIiwiY2FyZGluYWxpdHkiLCJ2YWx1ZSIsImFnZW50c1dpdGhIaWRkZW5Qb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVdBOztBQUNBOztBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLG9CQUFvQixHQUFHLE9BQ2xDQyxPQURrQyxFQUVsQ0MsR0FGa0MsRUFHbENDLEdBSGtDLEVBSWxDQyxPQUprQyxFQUtsQ0MsbUJBTGtDLEVBTWxDQyxPQUFPLEdBQUcsc0NBQXVCLFNBQXZCLENBTndCLEVBT2xDQyxJQUFJLEdBQUcsQ0FQMkIsS0FRL0I7QUFDSCxNQUFJO0FBQUE7O0FBQ0YsVUFBTUMsSUFBSSxHQUFHLEVBQWI7QUFFQUMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNGLElBQWQsRUFBb0Is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LEtBQUssRUFBRTtBQURJO0FBRFY7QUFEa0IsS0FBekI7QUFRQSxvQkFBQUwsSUFBSSxDQUFDUSxLQUFMLG1GQUFZQyxJQUFaLGlHQUFrQkMsSUFBbEIsZ0ZBQXdCQyxJQUF4QixDQUE2QjtBQUMzQkMsTUFBQUEsWUFBWSxFQUFFO0FBQ1pKLFFBQUFBLEtBQUssRUFBRTtBQURLO0FBRGEsS0FBN0IsRUFiRSxDQW1CRjs7QUFDQSxVQUFNSyxRQUFRLEdBQUcsTUFBTXBCLE9BQU8sQ0FBQ3FCLElBQVIsQ0FBYUMsVUFBYixDQUF3QkMsTUFBeEIsQ0FBK0JDLGFBQS9CLENBQTZDQyxNQUE3QyxDQUFvRDtBQUN6RUMsTUFBQUEsS0FBSyxFQUFFckIsT0FEa0U7QUFFekVzQixNQUFBQSxJQUFJLEVBQUVwQjtBQUZtRSxLQUFwRCxDQUF2QjtBQUtBLFdBQU9hLFFBQVEsQ0FBQ08sSUFBVCxJQUNMUCxRQUFRLENBQUNPLElBQVQsQ0FBY0UsWUFEVCxJQUVMVCxRQUFRLENBQUNPLElBQVQsQ0FBY0UsWUFBZCxDQUEyQixHQUEzQixDQUZLLElBR0xULFFBQVEsQ0FBQ08sSUFBVCxDQUFjRSxZQUFkLENBQTJCLEdBQTNCLEVBQWdDZSxLQUgzQixHQUlIeEIsUUFBUSxDQUFDTyxJQUFULENBQWNFLFlBQWQsQ0FBMkIsR0FBM0IsRUFBZ0NlLEtBSjdCLEdBS0gsQ0FMSjtBQU1ELEdBL0JELENBK0JFLE9BQU9MLEtBQVAsRUFBYztBQUNkLFdBQU9DLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRixLQUFmLENBQVA7QUFDRDtBQUNGLENBMUNNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIFNwZWNpZmljIG1ldGhvZHMgdG8gZmV0Y2ggV2F6dWggcm9vdGNoZWNrIGRhdGEgZnJvbSBFbGFzdGljc2VhcmNoXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuaW1wb3J0IHsgQmFzZSB9IGZyb20gJy4vYmFzZS1xdWVyeSc7XG5pbXBvcnQgeyBnZXRTZXR0aW5nRGVmYXVsdFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3NldHRpbmdzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRvcCA1IHJvb3RraXRzIGZvdW5kIGFsb25nIGFsbCBhZ2VudHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgdG9wNVJvb3RraXRzRGV0ZWN0ZWQgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICBwYXR0ZXJuID0gZ2V0U2V0dGluZ0RlZmF1bHRWYWx1ZSgncGF0dGVybicpLFxuICBzaXplID0gNVxuKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgYmFzZSA9IHt9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLCBCYXNlKHBhdHRlcm4sIGZpbHRlcnMsIGd0ZSwgbHRlLCBhbGxvd2VkQWdlbnRzRmlsdGVyKSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UuYWdncywge1xuICAgICAgJzInOiB7XG4gICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgZmllbGQ6ICdkYXRhLnRpdGxlJyxcbiAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICBfY291bnQ6ICdkZXNjJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYmFzZS5xdWVyeT8uYm9vbD8ubXVzdD8ucHVzaCh7XG4gICAgICBxdWVyeV9zdHJpbmc6IHtcbiAgICAgICAgcXVlcnk6ICdcInJvb3RraXRcIiBBTkQgXCJkZXRlY3RlZFwiJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgaW5kZXg6IHBhdHRlcm4sXG4gICAgICBib2R5OiBiYXNlXG4gICAgfSk7XG4gICAgY29uc3QgeyBidWNrZXRzIH0gPSByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMiddO1xuICAgIGNvbnN0IG1hcHBlZCA9IGJ1Y2tldHMubWFwKGl0ZW0gPT4gaXRlbS5rZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG1hcHBlZCkge1xuICAgICAgcmVzdWx0LnB1c2goaXRlbS5zcGxpdChcIidcIilbMV0uc3BsaXQoXCInXCIpWzBdKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoKGl0ZW0sIHBvcykgPT4gcmVzdWx0LmluZGV4T2YoaXRlbSkgPT09IHBvcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBhZ2VudHMgdGhhdCBoYXZlIG9uZSBvciBtb3JlIGhpZGRlbiBwcm9jZXNzZXNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgYWdlbnRzV2l0aEhpZGRlblBpZHMgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICBwYXR0ZXJuID0gZ2V0U2V0dGluZ0RlZmF1bHRWYWx1ZSgncGF0dGVybicpXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMSc6IHtcbiAgICAgICAgY2FyZGluYWxpdHk6IHtcbiAgICAgICAgICBmaWVsZDogJ2FnZW50LmlkJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5Py5ib29sPy5tdXN0Py5wdXNoKHtcbiAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICBxdWVyeTogJ1wicHJvY2Vzc1wiIEFORCBcImhpZGRlblwiJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gXCJhZ2dyZWdhdGlvbnNcIjogeyBcIjFcIjogeyBcInZhbHVlXCI6IDEgfSB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgaW5kZXg6IHBhdHRlcm4sXG4gICAgICBib2R5OiBiYXNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keSAmJlxuICAgICAgcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnMgJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10gJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10udmFsdWVcbiAgICAgID8gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzEnXS52YWx1ZVxuICAgICAgOiAwO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYWdlbnRzIHRoYXQgaGF2ZSBvbmUgb3IgbW9yZSBoaWRkZW4gcG9ydHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgYWdlbnRzV2l0aEhpZGRlblBvcnRzID0gYXN5bmMgKFxuICBjb250ZXh0LFxuICBndGUsXG4gIGx0ZSxcbiAgZmlsdGVycyxcbiAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgcGF0dGVybiA9IGdldFNldHRpbmdEZWZhdWx0VmFsdWUoJ3BhdHRlcm4nKVxuKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgYmFzZSA9IHt9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLCBCYXNlKHBhdHRlcm4sIGZpbHRlcnMsIGd0ZSwgbHRlLCBhbGxvd2VkQWdlbnRzRmlsdGVyKSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UuYWdncywge1xuICAgICAgJzEnOiB7XG4gICAgICAgIGNhcmRpbmFsaXR5OiB7XG4gICAgICAgICAgZmllbGQ6ICdhZ2VudC5pZCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYmFzZS5xdWVyeT8uYm9vbD8ubXVzdD8ucHVzaCh7XG4gICAgICBxdWVyeV9zdHJpbmc6IHtcbiAgICAgICAgcXVlcnk6ICdcInBvcnRcIiBBTkQgXCJoaWRkZW5cIidcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFwiYWdncmVnYXRpb25zXCI6IHsgXCIxXCI6IHsgXCJ2YWx1ZVwiOiAxIH0gfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgIGluZGV4OiBwYXR0ZXJuLFxuICAgICAgYm9keTogYmFzZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkgJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zICYmXG4gICAgICByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMSddICYmXG4gICAgICByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMSddLnZhbHVlXG4gICAgICA/IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10udmFsdWVcbiAgICAgIDogMDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG59XG4iXX0=