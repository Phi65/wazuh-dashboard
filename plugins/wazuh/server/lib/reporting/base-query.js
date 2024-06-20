"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = Base;

var _lodash = require("lodash");

/*
 * Wazuh app - Base query for reporting queries
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
function Base(pattern, filters, gte, lte, allowedAgentsFilter = null) {
  var _clonedFilter$bool, _clonedFilter$bool$mu, _clonedFilter$bool$mu2;

  const clonedFilter = (0, _lodash.cloneDeep)(filters);
  clonedFilter === null || clonedFilter === void 0 ? void 0 : (_clonedFilter$bool = clonedFilter.bool) === null || _clonedFilter$bool === void 0 ? void 0 : (_clonedFilter$bool$mu = _clonedFilter$bool.must) === null || _clonedFilter$bool$mu === void 0 ? void 0 : (_clonedFilter$bool$mu2 = _clonedFilter$bool$mu.push) === null || _clonedFilter$bool$mu2 === void 0 ? void 0 : _clonedFilter$bool$mu2.call(_clonedFilter$bool$mu, {
    range: {
      timestamp: {
        gte: gte,
        lte: lte,
        format: 'epoch_millis'
      }
    }
  });
  const base = {
    from: 0,
    size: 500,
    aggs: {},
    sort: [],
    script_fields: {},
    query: clonedFilter
  };
  return base;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtcXVlcnkudHMiXSwibmFtZXMiOlsiQmFzZSIsInBhdHRlcm4iLCJmaWx0ZXJzIiwiZ3RlIiwibHRlIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsImNsb25lZEZpbHRlciIsImJvb2wiLCJtdXN0IiwicHVzaCIsInJhbmdlIiwidGltZXN0YW1wIiwiZm9ybWF0IiwiYmFzZSIsImZyb20iLCJzaXplIiwiYWdncyIsInNvcnQiLCJzY3JpcHRfZmllbGRzIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZQTs7QUFaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSU8sU0FBU0EsSUFBVCxDQUFjQyxPQUFkLEVBQStCQyxPQUEvQixFQUE2Q0MsR0FBN0MsRUFBMERDLEdBQTFELEVBQXVFQyxtQkFBd0IsR0FBRyxJQUFsRyxFQUF3RztBQUFBOztBQUM3RyxRQUFNQyxZQUFZLEdBQUcsdUJBQVVKLE9BQVYsQ0FBckI7QUFDQUksRUFBQUEsWUFBWSxTQUFaLElBQUFBLFlBQVksV0FBWixrQ0FBQUEsWUFBWSxDQUFFQyxJQUFkLG1HQUFvQkMsSUFBcEIsMEdBQTBCQyxJQUExQiw4R0FBaUM7QUFDL0JDLElBQUFBLEtBQUssRUFBRTtBQUNMQyxNQUFBQSxTQUFTLEVBQUU7QUFDVFIsUUFBQUEsR0FBRyxFQUFFQSxHQURJO0FBRVRDLFFBQUFBLEdBQUcsRUFBRUEsR0FGSTtBQUdUUSxRQUFBQSxNQUFNLEVBQUU7QUFIQztBQUROO0FBRHdCLEdBQWpDO0FBU0EsUUFBTUMsSUFBSSxHQUFHO0FBQ1hDLElBQUFBLElBQUksRUFBRSxDQURLO0FBRVhDLElBQUFBLElBQUksRUFBRSxHQUZLO0FBR1hDLElBQUFBLElBQUksRUFBRSxFQUhLO0FBSVhDLElBQUFBLElBQUksRUFBRSxFQUpLO0FBS1hDLElBQUFBLGFBQWEsRUFBRSxFQUxKO0FBTVhDLElBQUFBLEtBQUssRUFBRWI7QUFOSSxHQUFiO0FBU0EsU0FBT08sSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIEJhc2UgcXVlcnkgZm9yIHJlcG9ydGluZyBxdWVyaWVzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gQmFzZShwYXR0ZXJuOiBzdHJpbmcsIGZpbHRlcnM6IGFueSwgZ3RlOiBudW1iZXIsIGx0ZTogbnVtYmVyLCBhbGxvd2VkQWdlbnRzRmlsdGVyOiBhbnkgPSBudWxsKSB7XG4gIGNvbnN0IGNsb25lZEZpbHRlciA9IGNsb25lRGVlcChmaWx0ZXJzKTtcbiAgY2xvbmVkRmlsdGVyPy5ib29sPy5tdXN0Py5wdXNoPy4oe1xuICAgIHJhbmdlOiB7XG4gICAgICB0aW1lc3RhbXA6IHtcbiAgICAgICAgZ3RlOiBndGUsXG4gICAgICAgIGx0ZTogbHRlLFxuICAgICAgICBmb3JtYXQ6ICdlcG9jaF9taWxsaXMnXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgY29uc3QgYmFzZSA9IHtcbiAgICBmcm9tOiAwLFxuICAgIHNpemU6IDUwMCxcbiAgICBhZ2dzOiB7fSxcbiAgICBzb3J0OiBbXSxcbiAgICBzY3JpcHRfZmllbGRzOiB7fSxcbiAgICBxdWVyeTogY2xvbmVkRmlsdGVyXG4gIH07XG5cbiAgcmV0dXJuIGJhc2U7XG59XG4iXX0=