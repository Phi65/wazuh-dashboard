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
class OpensearchService {
  constructor(driver) {
    _defineProperty(this, "getIndex", async (context, req, res) => {
      try {
        const {
          index
        } = req.body;
        const {
          callAsCurrentUser
        } = this.driver.asScoped(req);
        const indices = await callAsCurrentUser('cat.indices', {
          index,
          format: 'json',
          h: 'health,index,status'
        });
        return res.ok({
          body: {
            ok: true,
            resp: indices
          }
        });
      } catch (err) {
        // Opensearch throws an index_not_found_exception which we'll treat as a success
        if (err.statusCode === 404) {
          return res.ok({
            body: {
              ok: false,
              resp: []
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false,
              resp: err.message
            }
          });
        }
      }
    });

    this.driver = driver;
  }

}

exports.default = OpensearchService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wZW5zZWFyY2hfc2VydmljZS5qcyJdLCJuYW1lcyI6WyJPcGVuc2VhcmNoU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZHJpdmVyIiwiY29udGV4dCIsInJlcSIsInJlcyIsImluZGV4IiwiYm9keSIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJpbmRpY2VzIiwiZm9ybWF0IiwiaCIsIm9rIiwicmVzcCIsImVyciIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLE1BQU1BLGlCQUFOLENBQXdCO0FBQ3JDQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBUztBQUFBLHNDQUlULE9BQU9DLE9BQVAsRUFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixLQUE2QjtBQUN0QyxVQUFJO0FBQ0YsY0FBTTtBQUFFQyxVQUFBQTtBQUFGLFlBQVlGLEdBQUcsQ0FBQ0csSUFBdEI7QUFDQSxjQUFNO0FBQUVDLFVBQUFBO0FBQUYsWUFBd0IsS0FBS04sTUFBTCxDQUFZTyxRQUFaLENBQXFCTCxHQUFyQixDQUE5QjtBQUNBLGNBQU1NLE9BQU8sR0FBRyxNQUFNRixpQkFBaUIsQ0FBQyxhQUFELEVBQWdCO0FBQ3JERixVQUFBQSxLQURxRDtBQUVyREssVUFBQUEsTUFBTSxFQUFFLE1BRjZDO0FBR3JEQyxVQUFBQSxDQUFDLEVBQUU7QUFIa0QsU0FBaEIsQ0FBdkM7QUFLQSxlQUFPUCxHQUFHLENBQUNRLEVBQUosQ0FBTztBQUNaTixVQUFBQSxJQUFJLEVBQUU7QUFDSk0sWUFBQUEsRUFBRSxFQUFFLElBREE7QUFFSkMsWUFBQUEsSUFBSSxFQUFFSjtBQUZGO0FBRE0sU0FBUCxDQUFQO0FBTUQsT0FkRCxDQWNFLE9BQU9LLEdBQVAsRUFBWTtBQUNaO0FBQ0EsWUFBSUEsR0FBRyxDQUFDQyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGlCQUFPWCxHQUFHLENBQUNRLEVBQUosQ0FBTztBQUNaTixZQUFBQSxJQUFJLEVBQUU7QUFDSk0sY0FBQUEsRUFBRSxFQUFFLEtBREE7QUFFSkMsY0FBQUEsSUFBSSxFQUFFO0FBRkY7QUFETSxXQUFQLENBQVA7QUFNRCxTQVBELE1BT087QUFDTCxpQkFBT1QsR0FBRyxDQUFDUSxFQUFKLENBQU87QUFDWk4sWUFBQUEsSUFBSSxFQUFFO0FBQ0pNLGNBQUFBLEVBQUUsRUFBRSxLQURBO0FBRUpDLGNBQUFBLElBQUksRUFBRUMsR0FBRyxDQUFDRTtBQUZOO0FBRE0sV0FBUCxDQUFQO0FBTUQ7QUFDRjtBQUNGLEtBckNtQjs7QUFDbEIsU0FBS2YsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBSG9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuc2VhcmNoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGRyaXZlcikge1xuICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICB9XG5cbiAgZ2V0SW5kZXggPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gcmVxLmJvZHk7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmRyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgaW5kaWNlcyA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdjYXQuaW5kaWNlcycsIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBoOiAnaGVhbHRoLGluZGV4LHN0YXR1cycsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogaW5kaWNlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gT3BlbnNlYXJjaCB0aHJvd3MgYW4gaW5kZXhfbm90X2ZvdW5kX2V4Y2VwdGlvbiB3aGljaCB3ZSdsbCB0cmVhdCBhcyBhIHN1Y2Nlc3NcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0KSB7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3A6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19