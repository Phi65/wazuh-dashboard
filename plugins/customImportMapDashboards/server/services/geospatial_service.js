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
class GeospatialService {
  constructor(driver) {
    _defineProperty(this, "uploadGeojson", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = await this.driver.asScoped(req);
        const uploadResponse = await callAsCurrentUser('geospatial.geospatialQuery', {
          body: req.body
        });
        return res.ok({
          body: {
            ok: true,
            resp: uploadResponse
          }
        });
      } catch (err) {
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    this.driver = driver;
  }

}

exports.default = GeospatialService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlb3NwYXRpYWxfc2VydmljZS5qcyJdLCJuYW1lcyI6WyJHZW9zcGF0aWFsU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZHJpdmVyIiwiY29udGV4dCIsInJlcSIsInJlcyIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJ1cGxvYWRSZXNwb25zZSIsImJvZHkiLCJvayIsInJlc3AiLCJlcnIiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLE1BQU1BLGlCQUFOLENBQXdCO0FBQ3JDQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBUztBQUFBLDJDQUlKLE9BQU9DLE9BQVAsRUFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixLQUE2QjtBQUMzQyxVQUFJO0FBQ0YsY0FBTTtBQUFFQyxVQUFBQTtBQUFGLFlBQXdCLE1BQU0sS0FBS0osTUFBTCxDQUFZSyxRQUFaLENBQXFCSCxHQUFyQixDQUFwQztBQUNBLGNBQU1JLGNBQWMsR0FBRyxNQUFNRixpQkFBaUIsQ0FBQyw0QkFBRCxFQUErQjtBQUMzRUcsVUFBQUEsSUFBSSxFQUFFTCxHQUFHLENBQUNLO0FBRGlFLFNBQS9CLENBQTlDO0FBR0EsZUFBT0osR0FBRyxDQUFDSyxFQUFKLENBQU87QUFDWkQsVUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFlBQUFBLEVBQUUsRUFBRSxJQURBO0FBRUpDLFlBQUFBLElBQUksRUFBRUg7QUFGRjtBQURNLFNBQVAsQ0FBUDtBQU1ELE9BWEQsQ0FXRSxPQUFPSSxHQUFQLEVBQVk7QUFDWixlQUFPUCxHQUFHLENBQUNLLEVBQUosQ0FBTztBQUNaRCxVQUFBQSxJQUFJLEVBQUU7QUFDSkMsWUFBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkMsWUFBQUEsSUFBSSxFQUFFQyxHQUFHLENBQUNDO0FBRk47QUFETSxTQUFQLENBQVA7QUFNRDtBQUNGLEtBeEJtQjs7QUFDbEIsU0FBS1gsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBSG9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9zcGF0aWFsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGRyaXZlcikge1xuICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICB9XG5cbiAgdXBsb2FkR2VvanNvbiA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmRyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignZ2Vvc3BhdGlhbC5nZW9zcGF0aWFsUXVlcnknLCB7XG4gICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IHVwbG9hZFJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==