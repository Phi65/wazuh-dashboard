"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../../utils/constants");

var _helpers = require("./utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MonitorService {
  constructor(esDriver) {
    _defineProperty(this, "createMonitor", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createMonitor', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - createMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "deleteMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.deleteMonitor', params);
        return res.ok({
          body: {
            ok: response.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - deleteMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getMonitor', params);

        const monitor = _lodash.default.get(getResponse, 'monitor', null);

        const version = _lodash.default.get(getResponse, '_version', null);

        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);

        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);

        if (monitor) {
          const {
            callAsCurrentUser
          } = this.esDriver.asScoped(req);
          const searchResponse = await callAsCurrentUser('alerting.getMonitors', {
            index: _constants.INDEX.ALL_ALERTS,
            body: {
              size: 0,
              query: {
                bool: {
                  must: {
                    term: {
                      monitor_id: id
                    }
                  }
                }
              },
              aggs: {
                active_count: {
                  terms: {
                    field: 'state'
                  }
                },
                '24_hour_count': {
                  date_range: {
                    field: 'start_time',
                    ranges: [{
                      from: 'now-24h/h'
                    }]
                  }
                }
              }
            }
          });

          const dayCount = _lodash.default.get(searchResponse, 'aggregations.24_hour_count.buckets.0.doc_count', 0);

          const activeBuckets = _lodash.default.get(searchResponse, 'aggregations.active_count.buckets', []);

          const activeCount = activeBuckets.reduce((acc, curr) => curr.key === 'ACTIVE' ? curr.doc_count : acc, 0);
          return res.ok({
            body: {
              ok: true,
              resp: monitor,
              activeCount,
              dayCount,
              version,
              ifSeqNo,
              ifPrimaryTerm
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false
            }
          });
        }
      } catch (err) {
        console.error('Alerting - MonitorService - getMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "updateMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id,
          body: req.body,
          refresh: 'wait_for'
        }; // TODO DRAFT: Are we sure we need to include ifSeqNo and ifPrimaryTerm from the UI side when updating monitors?

        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;

        if (ifSeqNo && ifPrimaryTerm) {
          params.if_seq_no = ifSeqNo;
          params.if_primary_term = ifPrimaryTerm;
        }

        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateMonitor', params);
        const {
          _version,
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            version: _version,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - updateMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getMonitors", async (context, req, res) => {
      try {
        const {
          from,
          size,
          search,
          sortDirection,
          sortField,
          state
        } = req.query;
        let must = {
          match_all: {}
        };

        if (search.trim()) {
          // This is an expensive wildcard query to match monitor names such as: "This is a long monitor name"
          // search query => "long monit"
          // This is acceptable because we will never allow more than 1,000 monitors
          must = {
            query_string: {
              default_field: 'monitor.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }

        const filter = [{
          term: {
            'monitor.type': 'monitor'
          }
        }];

        if (state !== 'all') {
          const enabled = state === 'enabled';
          filter.push({
            term: {
              'monitor.enabled': enabled
            }
          });
        }

        const monitorSorts = {
          name: 'monitor.name.keyword'
        };
        const monitorSortPageData = {
          size: 1000
        };

        if (monitorSorts[sortField]) {
          monitorSortPageData.sort = [{
            [monitorSorts[sortField]]: sortDirection
          }];
          monitorSortPageData.size = _lodash.default.defaultTo(size, 1000);
          monitorSortPageData.from = _lodash.default.defaultTo(from, 0);
        }

        const params = {
          body: {
            seq_no_primary_term: true,
            version: true,
            ...monitorSortPageData,
            query: {
              bool: {
                filter,
                must
              }
            }
          }
        };
        const {
          callAsCurrentUser: alertingCallAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await alertingCallAsCurrentUser('alerting.getMonitors', params);

        const totalMonitors = _lodash.default.get(getResponse, 'hits.total.value', 0);

        const monitorKeyValueTuples = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _version: version,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source: monitor
          } = result;
          const {
            name,
            enabled
          } = monitor;
          return [id, {
            id,
            version,
            ifSeqNo,
            ifPrimaryTerm,
            name,
            enabled,
            monitor
          }];
        }, {});

        const monitorMap = new Map(monitorKeyValueTuples);
        const monitorIds = [...monitorMap.keys()];
        const aggsOrderData = {};
        const aggsSorts = {
          active: 'active',
          acknowledged: 'acknowledged',
          errors: 'errors',
          ignored: 'ignored',
          lastNotificationTime: 'last_notification_time'
        };

        if (aggsSorts[sortField]) {
          aggsOrderData.order = {
            [aggsSorts[sortField]]: sortDirection
          };
        }

        const aggsParams = {
          index: _constants.INDEX.ALL_ALERTS,
          body: {
            size: 0,
            query: {
              terms: {
                monitor_id: monitorIds
              }
            },
            aggregations: {
              uniq_monitor_ids: {
                terms: {
                  field: 'monitor_id',
                  ...aggsOrderData,
                  size: from + size
                },
                aggregations: {
                  active: {
                    filter: {
                      term: {
                        state: 'ACTIVE'
                      }
                    }
                  },
                  acknowledged: {
                    filter: {
                      term: {
                        state: 'ACKNOWLEDGED'
                      }
                    }
                  },
                  errors: {
                    filter: {
                      term: {
                        state: 'ERROR'
                      }
                    }
                  },
                  ignored: {
                    filter: {
                      bool: {
                        filter: {
                          term: {
                            state: 'COMPLETED'
                          }
                        },
                        must_not: {
                          exists: {
                            field: 'acknowledged_time'
                          }
                        }
                      }
                    }
                  },
                  last_notification_time: {
                    max: {
                      field: 'last_notification_time'
                    }
                  },
                  latest_alert: {
                    top_hits: {
                      size: 1,
                      sort: [{
                        start_time: {
                          order: 'desc'
                        }
                      }],
                      _source: {
                        includes: ['last_notification_time', 'trigger_name']
                      }
                    }
                  }
                }
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const esAggsResponse = await callAsCurrentUser('alerting.getMonitors', aggsParams);

        const buckets = _lodash.default.get(esAggsResponse, 'aggregations.uniq_monitor_ids.buckets', []).map(bucket => {
          const {
            key: id,
            last_notification_time: {
              value: lastNotificationTime
            },
            ignored: {
              doc_count: ignored
            },
            acknowledged: {
              doc_count: acknowledged
            },
            active: {
              doc_count: active
            },
            errors: {
              doc_count: errors
            },
            latest_alert: {
              hits: {
                hits: [{
                  _source: {
                    trigger_name: latestAlert
                  }
                }]
              }
            }
          } = bucket;
          const monitor = monitorMap.get(id);
          monitorMap.delete(id);
          return { ...monitor,
            id,
            lastNotificationTime,
            ignored,
            latestAlert,
            acknowledged,
            active,
            errors,
            currentTime: Date.now()
          };
        });

        const unusedMonitors = [...monitorMap.values()].map(monitor => ({ ...monitor,
          lastNotificationTime: null,
          ignored: 0,
          active: 0,
          acknowledged: 0,
          errors: 0,
          latestAlert: '--',
          currentTime: Date.now()
        }));

        let results = _lodash.default.orderBy(buckets.concat(unusedMonitors), [sortField], [sortDirection]); // If we sorted on monitor name then we already applied from/size to the first query to limit what we're aggregating over
        // Therefore we do not need to apply from/size to this result set
        // If we sorted on aggregations, then this is our in memory pagination


        if (!monitorSorts[sortField]) {
          results = results.slice(from, from + size);
        }

        return res.ok({
          body: {
            ok: true,
            monitors: results,
            totalMonitors
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - getMonitors', err);

        if ((0, _helpers.isIndexNotFoundError)(err)) {
          return res.ok({
            body: {
              ok: false,
              resp: {
                totalMonitors: 0,
                monitors: []
              }
            }
          });
        }

        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "acknowledgeAlerts", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const acknowledgeResponse = await callAsCurrentUser('alerting.acknowledgeAlerts', params);
        return res.ok({
          body: {
            ok: !acknowledgeResponse.failed.length,
            resp: acknowledgeResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - acknowledgeAlerts:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "executeMonitor", async (context, req, res) => {
      try {
        const {
          dryrun = 'true'
        } = req.query;
        const params = {
          body: req.body,
          dryrun
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const executeResponse = await callAsCurrentUser('alerting.executeMonitor', params);
        return res.ok({
          body: {
            ok: true,
            resp: executeResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - executeMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "searchMonitors", async (context, req, res) => {
      try {
        const {
          query,
          index,
          size
        } = req.body;
        const params = {
          index,
          size,
          body: query
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const results = await callAsCurrentUser('alerting.getMonitors', params);
        return res.ok({
          body: {
            ok: true,
            resp: results
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - searchMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    this.esDriver = esDriver;
  }

}

exports.default = MonitorService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vbml0b3JTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIk1vbml0b3JTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJlc0RyaXZlciIsImNvbnRleHQiLCJyZXEiLCJyZXMiLCJwYXJhbXMiLCJib2R5IiwiY2FsbEFzQ3VycmVudFVzZXIiLCJhc1Njb3BlZCIsImNyZWF0ZVJlc3BvbnNlIiwib2siLCJyZXNwIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsImlkIiwibW9uaXRvcklkIiwicmVzcG9uc2UiLCJyZXN1bHQiLCJnZXRSZXNwb25zZSIsIm1vbml0b3IiLCJfIiwiZ2V0IiwidmVyc2lvbiIsImlmU2VxTm8iLCJpZlByaW1hcnlUZXJtIiwic2VhcmNoUmVzcG9uc2UiLCJpbmRleCIsIklOREVYIiwiQUxMX0FMRVJUUyIsInNpemUiLCJxdWVyeSIsImJvb2wiLCJtdXN0IiwidGVybSIsIm1vbml0b3JfaWQiLCJhZ2dzIiwiYWN0aXZlX2NvdW50IiwidGVybXMiLCJmaWVsZCIsImRhdGVfcmFuZ2UiLCJyYW5nZXMiLCJmcm9tIiwiZGF5Q291bnQiLCJhY3RpdmVCdWNrZXRzIiwiYWN0aXZlQ291bnQiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwia2V5IiwiZG9jX2NvdW50IiwicmVmcmVzaCIsImlmX3NlcV9ubyIsImlmX3ByaW1hcnlfdGVybSIsInVwZGF0ZVJlc3BvbnNlIiwiX3ZlcnNpb24iLCJfaWQiLCJzZWFyY2giLCJzb3J0RGlyZWN0aW9uIiwic29ydEZpZWxkIiwic3RhdGUiLCJtYXRjaF9hbGwiLCJ0cmltIiwicXVlcnlfc3RyaW5nIiwiZGVmYXVsdF9maWVsZCIsImRlZmF1bHRfb3BlcmF0b3IiLCJzcGxpdCIsImpvaW4iLCJmaWx0ZXIiLCJlbmFibGVkIiwicHVzaCIsIm1vbml0b3JTb3J0cyIsIm5hbWUiLCJtb25pdG9yU29ydFBhZ2VEYXRhIiwic29ydCIsImRlZmF1bHRUbyIsInNlcV9ub19wcmltYXJ5X3Rlcm0iLCJhbGVydGluZ0NhbGxBc0N1cnJlbnRVc2VyIiwidG90YWxNb25pdG9ycyIsIm1vbml0b3JLZXlWYWx1ZVR1cGxlcyIsIm1hcCIsIl9zZXFfbm8iLCJfcHJpbWFyeV90ZXJtIiwiX3NvdXJjZSIsIm1vbml0b3JNYXAiLCJNYXAiLCJtb25pdG9ySWRzIiwia2V5cyIsImFnZ3NPcmRlckRhdGEiLCJhZ2dzU29ydHMiLCJhY3RpdmUiLCJhY2tub3dsZWRnZWQiLCJlcnJvcnMiLCJpZ25vcmVkIiwibGFzdE5vdGlmaWNhdGlvblRpbWUiLCJvcmRlciIsImFnZ3NQYXJhbXMiLCJhZ2dyZWdhdGlvbnMiLCJ1bmlxX21vbml0b3JfaWRzIiwibXVzdF9ub3QiLCJleGlzdHMiLCJsYXN0X25vdGlmaWNhdGlvbl90aW1lIiwibWF4IiwibGF0ZXN0X2FsZXJ0IiwidG9wX2hpdHMiLCJzdGFydF90aW1lIiwiaW5jbHVkZXMiLCJlc0FnZ3NSZXNwb25zZSIsImJ1Y2tldHMiLCJidWNrZXQiLCJ2YWx1ZSIsImhpdHMiLCJ0cmlnZ2VyX25hbWUiLCJsYXRlc3RBbGVydCIsImRlbGV0ZSIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsIm5vdyIsInVudXNlZE1vbml0b3JzIiwidmFsdWVzIiwicmVzdWx0cyIsIm9yZGVyQnkiLCJjb25jYXQiLCJzbGljZSIsIm1vbml0b3JzIiwiYWNrbm93bGVkZ2VSZXNwb25zZSIsImZhaWxlZCIsImxlbmd0aCIsImRyeXJ1biIsImV4ZWN1dGVSZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOztBQUVBOztBQUNBOzs7Ozs7QUFFZSxNQUFNQSxjQUFOLENBQXFCO0FBQ2xDQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBVztBQUFBLDJDQUlOLE9BQU9DLE9BQVAsRUFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixLQUE2QjtBQUMzQyxVQUFJO0FBQ0YsY0FBTUMsTUFBTSxHQUFHO0FBQUVDLFVBQUFBLElBQUksRUFBRUgsR0FBRyxDQUFDRztBQUFaLFNBQWY7QUFDQSxjQUFNO0FBQUVDLFVBQUFBO0FB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QU87QUFDWkosVUFBQUEsSUFBSSxFQUFFO0FBQ0pJLFlBQUFBLEVBQUUsRUFBRSxJQURBO0FBRUpDLFlBQUFBLElBQUksRUFBRThHO0FBRkY7QUFETSxTQUFQLENBQVA7QUFNRCxPQVpELENBWUUsT0FBTzdHLEdBQVAsRUFBWTtBQUNaQyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyw0Q0FBZCxFQUE0REYsR0FBNUQ7QUFDQSxlQUFPUixHQUFHLENBQUNNLEVBQUosQ0FBTztBQUNaSixVQUFBQSxJQUFJLEVBQUU7QUFDSkksWUFBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkMsWUFBQUEsSUFBSSxFQUFFQyxHQUFHLENBQUNHO0FBRk47QUFETSxTQUFQLENBQVA7QUFNRDtBQUNGLEtBamFxQjs7QUFDcEIsU0FBS2QsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7QUFIaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IElOREVYIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IGlzSW5kZXhOb3RGb3VuZEVycm9yIH0gZnJvbSAnLi91dGlscy9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uaXRvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihlc0RyaXZlcikge1xuICAgIHRoaXMuZXNEcml2ZXIgPSBlc0RyaXZlcjtcbiAgfVxuXG4gIGNyZWF0ZU1vbml0b3IgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBib2R5OiByZXEuYm9keSB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgY3JlYXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuY3JlYXRlTW9uaXRvcicsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGNyZWF0ZVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gY3JlYXRlTW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlTW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBtb25pdG9ySWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5kZWxldGVNb25pdG9yJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHJlc3BvbnNlLnJlc3VsdCA9PT0gJ2RlbGV0ZWQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gZGVsZXRlTW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0TW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBtb25pdG9ySWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBnZXRSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5nZXRNb25pdG9yJywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IG1vbml0b3IgPSBfLmdldChnZXRSZXNwb25zZSwgJ21vbml0b3InLCBudWxsKTtcbiAgICAgIGNvbnN0IHZlcnNpb24gPSBfLmdldChnZXRSZXNwb25zZSwgJ192ZXJzaW9uJywgbnVsbCk7XG4gICAgICBjb25zdCBpZlNlcU5vID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdfc2VxX25vJywgbnVsbCk7XG4gICAgICBjb25zdCBpZlByaW1hcnlUZXJtID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdfcHJpbWFyeV90ZXJtJywgbnVsbCk7XG4gICAgICBpZiAobW9uaXRvcikge1xuICAgICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldE1vbml0b3JzJywge1xuICAgICAgICAgIGluZGV4OiBJTkRFWC5BTExfQUxFUlRTLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDoge1xuICAgICAgICAgICAgICAgICAgdGVybToge1xuICAgICAgICAgICAgICAgICAgICBtb25pdG9yX2lkOiBpZCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZ2dzOiB7XG4gICAgICAgICAgICAgIGFjdGl2ZV9jb3VudDoge1xuICAgICAgICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAgICAgICBmaWVsZDogJ3N0YXRlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnMjRfaG91cl9jb3VudCc6IHtcbiAgICAgICAgICAgICAgICBkYXRlX3JhbmdlOiB7XG4gICAgICAgICAgICAgICAgICBmaWVsZDogJ3N0YXJ0X3RpbWUnLFxuICAgICAgICAgICAgICAgICAgcmFuZ2VzOiBbeyBmcm9tOiAnbm93LTI0aC9oJyB9XSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF5Q291bnQgPSBfLmdldChzZWFyY2hSZXNwb25zZSwgJ2FnZ3JlZ2F0aW9ucy4yNF9ob3VyX2NvdW50LmJ1Y2tldHMuMC5kb2NfY291bnQnLCAwKTtcbiAgICAgICAgY29uc3QgYWN0aXZlQnVja2V0cyA9IF8uZ2V0KHNlYXJjaFJlc3BvbnNlLCAnYWdncmVnYXRpb25zLmFjdGl2ZV9jb3VudC5idWNrZXRzJywgW10pO1xuICAgICAgICBjb25zdCBhY3RpdmVDb3VudCA9IGFjdGl2ZUJ1Y2tldHMucmVkdWNlKFxuICAgICAgICAgIChhY2MsIGN1cnIpID0+IChjdXJyLmtleSA9PT0gJ0FDVElWRScgPyBjdXJyLmRvY19jb3VudCA6IGFjYyksXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwOiBtb25pdG9yLCBhY3RpdmVDb3VudCwgZGF5Q291bnQsIHZlcnNpb24sIGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gZ2V0TW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlTW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBtb25pdG9ySWQ6IGlkLCBib2R5OiByZXEuYm9keSwgcmVmcmVzaDogJ3dhaXRfZm9yJyB9O1xuXG4gICAgICAvLyBUT0RPIERSQUZUOiBBcmUgd2Ugc3VyZSB3ZSBuZWVkIHRvIGluY2x1ZGUgaWZTZXFObyBhbmQgaWZQcmltYXJ5VGVybSBmcm9tIHRoZSBVSSBzaWRlIHdoZW4gdXBkYXRpbmcgbW9uaXRvcnM/XG4gICAgICBjb25zdCB7IGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfSA9IHJlcS5xdWVyeTtcbiAgICAgIGlmIChpZlNlcU5vICYmIGlmUHJpbWFyeVRlcm0pIHtcbiAgICAgICAgcGFyYW1zLmlmX3NlcV9ubyA9IGlmU2VxTm87XG4gICAgICAgIHBhcmFtcy5pZl9wcmltYXJ5X3Rlcm0gPSBpZlByaW1hcnlUZXJtO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy51cGRhdGVNb25pdG9yJywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHsgX3ZlcnNpb24sIF9pZCB9ID0gdXBkYXRlUmVzcG9uc2U7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHZlcnNpb246IF92ZXJzaW9uLFxuICAgICAgICAgIGlkOiBfaWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gTW9uaXRvclNlcnZpY2UgLSB1cGRhdGVNb25pdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRNb25pdG9ycyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUsIHNlYXJjaCwgc29ydERpcmVjdGlvbiwgc29ydEZpZWxkLCBzdGF0ZSB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgICBsZXQgbXVzdCA9IHsgbWF0Y2hfYWxsOiB7fSB9O1xuICAgICAgaWYgKHNlYXJjaC50cmltKCkpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBleHBlbnNpdmUgd2lsZGNhcmQgcXVlcnkgdG8gbWF0Y2ggbW9uaXRvciBuYW1lcyBzdWNoIGFzOiBcIlRoaXMgaXMgYSBsb25nIG1vbml0b3IgbmFtZVwiXG4gICAgICAgIC8vIHNlYXJjaCBxdWVyeSA9PiBcImxvbmcgbW9uaXRcIlxuICAgICAgICAvLyBUaGlzIGlzIGFjY2VwdGFibGUgYmVjYXVzZSB3ZSB3aWxsIG5ldmVyIGFsbG93IG1vcmUgdGhhbiAxLDAwMCBtb25pdG9yc1xuICAgICAgICBtdXN0ID0ge1xuICAgICAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICAgICAgZGVmYXVsdF9maWVsZDogJ21vbml0b3IubmFtZScsXG4gICAgICAgICAgICBkZWZhdWx0X29wZXJhdG9yOiAnQU5EJyxcbiAgICAgICAgICAgIHF1ZXJ5OiBgKiR7c2VhcmNoLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJyogKicpfSpgLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbHRlciA9IFt7IHRlcm06IHsgJ21vbml0b3IudHlwZSc6ICdtb25pdG9yJyB9IH1dO1xuICAgICAgaWYgKHN0YXRlICE9PSAnYWxsJykge1xuICAgICAgICBjb25zdCBlbmFibGVkID0gc3RhdGUgPT09ICdlbmFibGVkJztcbiAgICAgICAgZmlsdGVyLnB1c2goeyB0ZXJtOiB7ICdtb25pdG9yLmVuYWJsZWQnOiBlbmFibGVkIH0gfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vbml0b3JTb3J0cyA9IHsgbmFtZTogJ21vbml0b3IubmFtZS5rZXl3b3JkJyB9O1xuICAgICAgY29uc3QgbW9uaXRvclNvcnRQYWdlRGF0YSA9IHsgc2l6ZTogMTAwMCB9O1xuICAgICAgaWYgKG1vbml0b3JTb3J0c1tzb3J0RmllbGRdKSB7XG4gICAgICAgIG1vbml0b3JTb3J0UGFnZURhdGEuc29ydCA9IFt7IFttb25pdG9yU29ydHNbc29ydEZpZWxkXV06IHNvcnREaXJlY3Rpb24gfV07XG4gICAgICAgIG1vbml0b3JTb3J0UGFnZURhdGEuc2l6ZSA9IF8uZGVmYXVsdFRvKHNpemUsIDEwMDApO1xuICAgICAgICBtb25pdG9yU29ydFBhZ2VEYXRhLmZyb20gPSBfLmRlZmF1bHRUbyhmcm9tLCAwKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgc2VxX25vX3ByaW1hcnlfdGVybTogdHJ1ZSxcbiAgICAgICAgICB2ZXJzaW9uOiB0cnVlLFxuICAgICAgICAgIC4uLm1vbml0b3JTb3J0UGFnZURhdGEsXG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIGJvb2w6IHtcbiAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICBtdXN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogYWxlcnRpbmdDYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBhbGVydGluZ0NhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5nZXRNb25pdG9ycycsIHBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IHRvdGFsTW9uaXRvcnMgPSBfLmdldChnZXRSZXNwb25zZSwgJ2hpdHMudG90YWwudmFsdWUnLCAwKTtcbiAgICAgIGNvbnN0IG1vbml0b3JLZXlWYWx1ZVR1cGxlcyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnaGl0cy5oaXRzJywgW10pLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgIF92ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgIF9zZXFfbm86IGlmU2VxTm8sXG4gICAgICAgICAgX3ByaW1hcnlfdGVybTogaWZQcmltYXJ5VGVybSxcbiAgICAgICAgICBfc291cmNlOiBtb25pdG9yLFxuICAgICAgICB9ID0gcmVzdWx0O1xuICAgICAgICBjb25zdCB7IG5hbWUsIGVuYWJsZWQgfSA9IG1vbml0b3I7XG4gICAgICAgIHJldHVybiBbaWQsIHsgaWQsIHZlcnNpb24sIGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0sIG5hbWUsIGVuYWJsZWQsIG1vbml0b3IgfV07XG4gICAgICB9LCB7fSk7XG4gICAgICBjb25zdCBtb25pdG9yTWFwID0gbmV3IE1hcChtb25pdG9yS2V5VmFsdWVUdXBsZXMpO1xuICAgICAgY29uc3QgbW9uaXRvcklkcyA9IFsuLi5tb25pdG9yTWFwLmtleXMoKV07XG5cbiAgICAgIGNvbnN0IGFnZ3NPcmRlckRhdGEgPSB7fTtcbiAgICAgIGNvbnN0IGFnZ3NTb3J0cyA9IHtcbiAgICAgICAgYWN0aXZlOiAnYWN0aXZlJyxcbiAgICAgICAgYWNrbm93bGVkZ2VkOiAnYWNrbm93bGVkZ2VkJyxcbiAgICAgICAgZXJyb3JzOiAnZXJyb3JzJyxcbiAgICAgICAgaWdub3JlZDogJ2lnbm9yZWQnLFxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uVGltZTogJ2xhc3Rfbm90aWZpY2F0aW9uX3RpbWUnLFxuICAgICAgfTtcbiAgICAgIGlmIChhZ2dzU29ydHNbc29ydEZpZWxkXSkge1xuICAgICAgICBhZ2dzT3JkZXJEYXRhLm9yZGVyID0geyBbYWdnc1NvcnRzW3NvcnRGaWVsZF1dOiBzb3J0RGlyZWN0aW9uIH07XG4gICAgICB9XG4gICAgICBjb25zdCBhZ2dzUGFyYW1zID0ge1xuICAgICAgICBpbmRleDogSU5ERVguQUxMX0FMRVJUUyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgcXVlcnk6IHsgdGVybXM6IHsgbW9uaXRvcl9pZDogbW9uaXRvcklkcyB9IH0sXG4gICAgICAgICAgYWdncmVnYXRpb25zOiB7XG4gICAgICAgICAgICB1bmlxX21vbml0b3JfaWRzOiB7XG4gICAgICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdtb25pdG9yX2lkJyxcbiAgICAgICAgICAgICAgICAuLi5hZ2dzT3JkZXJEYXRhLFxuICAgICAgICAgICAgICAgIHNpemU6IGZyb20gKyBzaXplLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHsgZmlsdGVyOiB7IHRlcm06IHsgc3RhdGU6ICdBQ1RJVkUnIH0gfSB9LFxuICAgICAgICAgICAgICAgIGFja25vd2xlZGdlZDogeyBmaWx0ZXI6IHsgdGVybTogeyBzdGF0ZTogJ0FDS05PV0xFREdFRCcgfSB9IH0sXG4gICAgICAgICAgICAgICAgZXJyb3JzOiB7IGZpbHRlcjogeyB0ZXJtOiB7IHN0YXRlOiAnRVJST1InIH0gfSB9LFxuICAgICAgICAgICAgICAgIGlnbm9yZWQ6IHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7IHRlcm06IHsgc3RhdGU6ICdDT01QTEVURUQnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBtdXN0X25vdDogeyBleGlzdHM6IHsgZmllbGQ6ICdhY2tub3dsZWRnZWRfdGltZScgfSB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxhc3Rfbm90aWZpY2F0aW9uX3RpbWU6IHsgbWF4OiB7IGZpZWxkOiAnbGFzdF9ub3RpZmljYXRpb25fdGltZScgfSB9LFxuICAgICAgICAgICAgICAgIGxhdGVzdF9hbGVydDoge1xuICAgICAgICAgICAgICAgICAgdG9wX2hpdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogW3sgc3RhcnRfdGltZTogeyBvcmRlcjogJ2Rlc2MnIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlczogWydsYXN0X25vdGlmaWNhdGlvbl90aW1lJywgJ3RyaWdnZXJfbmFtZSddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZXNBZ2dzUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBhZ2dzUGFyYW1zKTtcbiAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLmdldChlc0FnZ3NSZXNwb25zZSwgJ2FnZ3JlZ2F0aW9ucy51bmlxX21vbml0b3JfaWRzLmJ1Y2tldHMnLCBbXSkubWFwKFxuICAgICAgICAoYnVja2V0KSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAga2V5OiBpZCxcbiAgICAgICAgICAgIGxhc3Rfbm90aWZpY2F0aW9uX3RpbWU6IHsgdmFsdWU6IGxhc3ROb3RpZmljYXRpb25UaW1lIH0sXG4gICAgICAgICAgICBpZ25vcmVkOiB7IGRvY19jb3VudDogaWdub3JlZCB9LFxuICAgICAgICAgICAgYWNrbm93bGVkZ2VkOiB7IGRvY19jb3VudDogYWNrbm93bGVkZ2VkIH0sXG4gICAgICAgICAgICBhY3RpdmU6IHsgZG9jX2NvdW50OiBhY3RpdmUgfSxcbiAgICAgICAgICAgIGVycm9yczogeyBkb2NfY291bnQ6IGVycm9ycyB9LFxuICAgICAgICAgICAgbGF0ZXN0X2FsZXJ0OiB7XG4gICAgICAgICAgICAgIGhpdHM6IHtcbiAgICAgICAgICAgICAgICBoaXRzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2U6IHsgdHJpZ2dlcl9uYW1lOiBsYXRlc3RBbGVydCB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9ID0gYnVja2V0O1xuICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBtb25pdG9yTWFwLmdldChpZCk7XG4gICAgICAgICAgbW9uaXRvck1hcC5kZWxldGUoaWQpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5tb25pdG9yLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBsYXN0Tm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgICAgIGlnbm9yZWQsXG4gICAgICAgICAgICBsYXRlc3RBbGVydCxcbiAgICAgICAgICAgIGFja25vd2xlZGdlZCxcbiAgICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICAgIGVycm9ycyxcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHVudXNlZE1vbml0b3JzID0gWy4uLm1vbml0b3JNYXAudmFsdWVzKCldLm1hcCgobW9uaXRvcikgPT4gKHtcbiAgICAgICAgLi4ubW9uaXRvcixcbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvblRpbWU6IG51bGwsXG4gICAgICAgIGlnbm9yZWQ6IDAsXG4gICAgICAgIGFjdGl2ZTogMCxcbiAgICAgICAgYWNrbm93bGVkZ2VkOiAwLFxuICAgICAgICBlcnJvcnM6IDAsXG4gICAgICAgIGxhdGVzdEFsZXJ0OiAnLS0nLFxuICAgICAgICBjdXJyZW50VGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0pKTtcblxuICAgICAgbGV0IHJlc3VsdHMgPSBfLm9yZGVyQnkoYnVja2V0cy5jb25jYXQodW51c2VkTW9uaXRvcnMpLCBbc29ydEZpZWxkXSwgW3NvcnREaXJlY3Rpb25dKTtcbiAgICAgIC8vIElmIHdlIHNvcnRlZCBvbiBtb25pdG9yIG5hbWUgdGhlbiB3ZSBhbHJlYWR5IGFwcGxpZWQgZnJvbS9zaXplIHRvIHRoZSBmaXJzdCBxdWVyeSB0byBsaW1pdCB3aGF0IHdlJ3JlIGFnZ3JlZ2F0aW5nIG92ZXJcbiAgICAgIC8vIFRoZXJlZm9yZSB3ZSBkbyBub3QgbmVlZCB0byBhcHBseSBmcm9tL3NpemUgdG8gdGhpcyByZXN1bHQgc2V0XG4gICAgICAvLyBJZiB3ZSBzb3J0ZWQgb24gYWdncmVnYXRpb25zLCB0aGVuIHRoaXMgaXMgb3VyIGluIG1lbW9yeSBwYWdpbmF0aW9uXG4gICAgICBpZiAoIW1vbml0b3JTb3J0c1tzb3J0RmllbGRdKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNsaWNlKGZyb20sIGZyb20gKyBzaXplKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBtb25pdG9yczogcmVzdWx0cyxcbiAgICAgICAgICB0b3RhbE1vbml0b3JzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gZ2V0TW9uaXRvcnMnLCBlcnIpO1xuICAgICAgaWYgKGlzSW5kZXhOb3RGb3VuZEVycm9yKGVycikpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIHJlc3A6IHsgdG90YWxNb25pdG9yczogMCwgbW9uaXRvcnM6IFtdIH0gfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBhY2tub3dsZWRnZUFsZXJ0cyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBtb25pdG9ySWQ6IGlkLFxuICAgICAgICBib2R5OiByZXEuYm9keSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBhY2tub3dsZWRnZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmFja25vd2xlZGdlQWxlcnRzJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6ICFhY2tub3dsZWRnZVJlc3BvbnNlLmZhaWxlZC5sZW5ndGgsXG4gICAgICAgICAgcmVzcDogYWNrbm93bGVkZ2VSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBNb25pdG9yU2VydmljZSAtIGFja25vd2xlZGdlQWxlcnRzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBleGVjdXRlTW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRyeXJ1biA9ICd0cnVlJyB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiByZXEuYm9keSxcbiAgICAgICAgZHJ5cnVuLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGV4ZWN1dGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5leGVjdXRlTW9uaXRvcicsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGV4ZWN1dGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBNb25pdG9yU2VydmljZSAtIGV4ZWN1dGVNb25pdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvL1RPRE86IFRoaXMgaXMgdGVtcG9yYXJpbHkgYSBwYXNzIHRocm91Z2ggY2FsbCB3aGljaCBuZWVkcyB0byBiZSBkZXByZWNhdGVkXG4gIHNlYXJjaE1vbml0b3JzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcXVlcnksIGluZGV4LCBzaXplIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaW5kZXgsIHNpemUsIGJvZHk6IHF1ZXJ5IH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiByZXN1bHRzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gc2VhcmNoTW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=