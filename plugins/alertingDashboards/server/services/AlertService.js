"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GET_ALERTS_SORT_FILTERS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GET_ALERTS_SORT_FILTERS = {
  MONITOR_NAME: 'monitor_name',
  TRIGGER_NAME: 'trigger_name',
  START_TIME: 'start_time',
  END_TIME: 'end_time',
  ACKNOWLEDGE_TIME: 'acknowledged_time'
};
exports.GET_ALERTS_SORT_FILTERS = GET_ALERTS_SORT_FILTERS;

class AlertService {
  constructor(esDriver) {
    _defineProperty(this, "getAlerts", async (context, req, res) => {
      const {
        from = 0,
        size = 20,
        search = '',
        sortDirection = 'desc',
        sortField = GET_ALERTS_SORT_FILTERS.START_TIME,
        severityLevel = 'ALL',
        alertState = 'ALL',
        monitorIds = []
      } = req.query;
      var params;

      switch (sortField) {
        case GET_ALERTS_SORT_FILTERS.MONITOR_NAME:
          params = {
            sortString: `${sortField}.keyword`,
            sortOrder: sortDirection
          };
          break;

        case GET_ALERTS_SORT_FILTERS.TRIGGER_NAME:
          params = {
            sortString: `${sortField}.keyword`,
            sortOrder: sortDirection
          };
          break;

        case GET_ALERTS_SORT_FILTERS.END_TIME:
          params = {
            sortString: sortField,
            sortOrder: sortDirection,
            missing: sortDirection === 'asc' ? '_last' : '_first'
          };
          break;

        case GET_ALERTS_SORT_FILTERS.ACKNOWLEDGE_TIME:
          params = {
            sortString: sortField,
            sortOrder: sortDirection,
            missing: '_last'
          };
          break;

        default:
          // If the sortField parsed from the URL isn't a valid option for this API, use a default option.
          params = {
            sortString: GET_ALERTS_SORT_FILTERS.START_TIME,
            sortOrder: sortDirection
          };
      }

      params.startIndex = from;
      params.size = size;
      params.severityLevel = severityLevel;
      params.alertState = alertState;
      params.searchString = search;
      if (search.trim()) params.searchString = `*${search.trim().split(' ').join('* *')}*`;
      if (monitorIds.length > 0) params.monitorId = !Array.isArray(monitorIds) ? monitorIds : monitorIds[0];
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);

      try {
        const resp = await callAsCurrentUser('alerting.getAlerts', params);
        const alerts = resp.alerts.map(hit => {
          const alert = hit;
          const id = hit.alert_id;
          const version = hit.alert_version;
          return {
            id,
            ...alert,
            version
          };
        });
        const totalAlerts = resp.totalAlerts;
        return res.ok({
          body: {
            ok: true,
            alerts,
            totalAlerts
          }
        });
      } catch (err) {
        console.log(err.message);
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });

    this.esDriver = esDriver;
  }

}

exports.default = AlertService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFsZXJ0U2VydmljZS5qcyJdLCJuYW1lcyI6WyJHRVRfQUxFUlRTX1NPUlRfRklMVEVSUyIsIk1PTklUT1JfTkFNRSIsIlRSSUdHRVJfTkFNRSIsIlNUQVJUX1RJTUUiLCJFTkRfVElNRSIsIkFDS05PV0xFREdFX1RJTUUiLCJBbGVydFNlcnZpY2UiLCJjb25zdHJ1Y3RvciIsImVzRHJpdmVyIiwiY29udGV4dCIsInJlcSIsInJlcyIsImZyb20iLCJzaXplIiwic2VhcmNoIiwic29ydERpcmVjdGlvbiIsInNvcnRGaWVsZCIsInNldmVyaXR5TGV2ZWwiLCJhbGVydFN0YXRlIiwibW9uaXRvcklkcyIsInF1ZXJ5IiwicGFyYW1zIiwic29ydFN0cmluZyIsInNvcnRPcmRlciIsIm1pc3NpbmciLCJzdGFydEluZGV4Iiwic2VhcmNoU3RyaW5nIiwidHJpbSIsInNwbGl0Iiwiam9pbiIsImxlbmd0aCIsIm1vbml0b3JJZCIsIkFycmF5IiwiaXNBcnJheSIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJyZXNwIiwiYWxlcnRzIiwibWFwIiwiaGl0IiwiYWxlcnQiLCJpZCIsImFsZXJ0X2lkIiwidmVyc2lvbiIsImFsZXJ0X3ZlcnNpb24iLCJ0b3RhbEFsZXJ0cyIsIm9rIiwiYm9keSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7Ozs7OztBQUVPLE1BQU1BLHVCQUF1QixHQUFHO0FBQ3JDQyxFQUFBQSxZQUFZLEVBQUUsY0FEdUI7QUFFckNDLEVBQUFBLFlBQVksRUFBRSxjQUZ1QjtBQUdyQ0MsRUFBQUEsVUFBVSxFQUFFLFlBSHlCO0FBSXJDQyxFQUFBQSxRQUFRLEVBQUUsVUFKMkI7QUFLckNDLEVBQUFBLGdCQUFnQixFQUFFO0FBTG1CLENBQWhDOzs7QUFRUSxNQUFNQyxZQUFOLENBQW1CO0FBQ2hDQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBVztBQUFBLHVDQUlWLE9BQU9DLE9BQVAs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R0FBR0YsR0FBRyxDQUFDRyxRQUFmO0FBQ0EsZ0JBQU1DLE9BQU8sR0FBR0osR0FBRyxDQUFDSyxhQUFwQjtBQUNBLGlCQUFPO0FBQUVILFlBQUFBLEVBQUY7QUFBTSxlQUFHRCxLQUFUO0FBQWdCRyxZQUFBQTtBQUFoQixXQUFQO0FBQ0QsU0FMYyxDQUFmO0FBTUEsY0FBTUUsV0FBVyxHQUFHVCxJQUFJLENBQUNTLFdBQXpCO0FBRUEsZUFBT2xDLEdBQUcsQ0FBQ21DLEVBQUosQ0FBTztBQUNaQyxVQUFBQSxJQUFJLEVBQUU7QUFDSkQsWUFBQUEsRUFBRSxFQUFFLElBREE7QUFFSlQsWUFBQUEsTUFGSTtBQUdKUSxZQUFBQTtBQUhJO0FBRE0sU0FBUCxDQUFQO0FBT0QsT0FqQkQsQ0FpQkUsT0FBT0csR0FBUCxFQUFZO0FBQ1pDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFHLENBQUNHLE9BQWhCO0FBQ0EsZUFBT3hDLEdBQUcsQ0FBQ21DLEVBQUosQ0FBTztBQUNaQyxVQUFBQSxJQUFJLEVBQUU7QUFDSkQsWUFBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkUsWUFBQUEsR0FBRyxFQUFFQSxHQUFHLENBQUNHO0FBRkw7QUFETSxTQUFQLENBQVA7QUFNRDtBQUNGLEtBeEZxQjs7QUFDcEIsU0FBSzNDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7O0FBSCtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgR0VUX0FMRVJUU19TT1JUX0ZJTFRFUlMgPSB7XG4gIE1PTklUT1JfTkFNRTogJ21vbml0b3JfbmFtZScsXG4gIFRSSUdHRVJfTkFNRTogJ3RyaWdnZXJfbmFtZScsXG4gIFNUQVJUX1RJTUU6ICdzdGFydF90aW1lJyxcbiAgRU5EX1RJTUU6ICdlbmRfdGltZScsXG4gIEFDS05PV0xFREdFX1RJTUU6ICdhY2tub3dsZWRnZWRfdGltZScsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihlc0RyaXZlcikge1xuICAgIHRoaXMuZXNEcml2ZXIgPSBlc0RyaXZlcjtcbiAgfVxuXG4gIGdldEFsZXJ0cyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGZyb20gPSAwLFxuICAgICAgc2l6ZSA9IDIwLFxuICAgICAgc2VhcmNoID0gJycsXG4gICAgICBzb3J0RGlyZWN0aW9uID0gJ2Rlc2MnLFxuICAgICAgc29ydEZpZWxkID0gR0VUX0FMRVJUU19TT1JUX0ZJTFRFUlMuU1RBUlRfVElNRSxcbiAgICAgIHNldmVyaXR5TGV2ZWwgPSAnQUxMJyxcbiAgICAgIGFsZXJ0U3RhdGUgPSAnQUxMJyxcbiAgICAgIG1vbml0b3JJZHMgPSBbXSxcbiAgICB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgdmFyIHBhcmFtcztcbiAgICBzd2l0Y2ggKHNvcnRGaWVsZCkge1xuICAgICAgY2FzZSBHRVRfQUxFUlRTX1NPUlRfRklMVEVSUy5NT05JVE9SX05BTUU6XG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICBzb3J0U3RyaW5nOiBgJHtzb3J0RmllbGR9LmtleXdvcmRgLFxuICAgICAgICAgIHNvcnRPcmRlcjogc29ydERpcmVjdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdFVF9BTEVSVFNfU09SVF9GSUxURVJTLlRSSUdHRVJfTkFNRTpcbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIHNvcnRTdHJpbmc6IGAke3NvcnRGaWVsZH0ua2V5d29yZGAsXG4gICAgICAgICAgc29ydE9yZGVyOiBzb3J0RGlyZWN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR0VUX0FMRVJUU19TT1JUX0ZJTFRFUlMuRU5EX1RJTUU6XG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICBzb3J0U3RyaW5nOiBzb3J0RmllbGQsXG4gICAgICAgICAgc29ydE9yZGVyOiBzb3J0RGlyZWN0aW9uLFxuICAgICAgICAgIG1pc3Npbmc6IHNvcnREaXJlY3Rpb24gPT09ICdhc2MnID8gJ19sYXN0JyA6ICdfZmlyc3QnLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR0VUX0FMRVJUU19TT1JUX0ZJTFRFUlMuQUNLTk9XTEVER0VfVElNRTpcbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIHNvcnRTdHJpbmc6IHNvcnRGaWVsZCxcbiAgICAgICAgICBzb3J0T3JkZXI6IHNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgbWlzc2luZzogJ19sYXN0JyxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBJZiB0aGUgc29ydEZpZWxkIHBhcnNlZCBmcm9tIHRoZSBVUkwgaXNuJ3QgYSB2YWxpZCBvcHRpb24gZm9yIHRoaXMgQVBJLCB1c2UgYSBkZWZhdWx0IG9wdGlvbi5cbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIHNvcnRTdHJpbmc6IEdFVF9BTEVSVFNfU09SVF9GSUxURVJTLlNUQVJUX1RJTUUsXG4gICAgICAgICAgc29ydE9yZGVyOiBzb3J0RGlyZWN0aW9uLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHBhcmFtcy5zdGFydEluZGV4ID0gZnJvbTtcbiAgICBwYXJhbXMuc2l6ZSA9IHNpemU7XG4gICAgcGFyYW1zLnNldmVyaXR5TGV2ZWwgPSBzZXZlcml0eUxldmVsO1xuICAgIHBhcmFtcy5hbGVydFN0YXRlID0gYWxlcnRTdGF0ZTtcbiAgICBwYXJhbXMuc2VhcmNoU3RyaW5nID0gc2VhcmNoO1xuICAgIGlmIChzZWFyY2gudHJpbSgpKSBwYXJhbXMuc2VhcmNoU3RyaW5nID0gYCoke3NlYXJjaC50cmltKCkuc3BsaXQoJyAnKS5qb2luKCcqIConKX0qYDtcbiAgICBpZiAobW9uaXRvcklkcy5sZW5ndGggPiAwKVxuICAgICAgcGFyYW1zLm1vbml0b3JJZCA9ICFBcnJheS5pc0FycmF5KG1vbml0b3JJZHMpID8gbW9uaXRvcklkcyA6IG1vbml0b3JJZHNbMF07XG5cbiAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0QWxlcnRzJywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IGFsZXJ0cyA9IHJlc3AuYWxlcnRzLm1hcCgoaGl0KSA9PiB7XG4gICAgICAgIGNvbnN0IGFsZXJ0ID0gaGl0O1xuICAgICAgICBjb25zdCBpZCA9IGhpdC5hbGVydF9pZDtcbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IGhpdC5hbGVydF92ZXJzaW9uO1xuICAgICAgICByZXR1cm4geyBpZCwgLi4uYWxlcnQsIHZlcnNpb24gfTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdG90YWxBbGVydHMgPSByZXNwLnRvdGFsQWxlcnRzO1xuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGFsZXJ0cyxcbiAgICAgICAgICB0b3RhbEFsZXJ0cyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==