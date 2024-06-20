"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderedJson = exports.filterByMinimatch = void 0;

var _minimatch = _interopRequireDefault(require("minimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// minimatch is a peer dependency of glob
const filterByMinimatch = (input, rules) => {
  return rules.some(item => (0, _minimatch.default)(input, item, {
    dot: true
  }));
};

exports.filterByMinimatch = filterByMinimatch;

const getOrderedJson = json => {
  const entries = Object.entries(json);
  entries.sort((a, b) => a[0] < b[0] ? -1 : 1);
  return entries.reduce((total, [key, value]) => ({ ...total,
    [key]: value
  }), {});
};

exports.getOrderedJson = getOrderedJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlci50cyJdLCJuYW1lcyI6WyJmaWx0ZXJCeU1pbmltYXRjaCIsImlucHV0IiwicnVsZXMiLCJzb21lIiwiaXRlbSIsImRvdCIsImdldE9yZGVyZWRKc29uIiwianNvbiIsImVudHJpZXMiLCJPYmplY3QiLCJzb3J0IiwiYSIsImIiLCJyZWR1Y2UiLCJ0b3RhbCIsImtleSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFEQTtBQUVPLE1BQU1BLGlCQUFpQixHQUFHLENBQUNDLEtBQUQsRUFBZ0JDLEtBQWhCLEtBQTZDO0FBQzVFLFNBQU9BLEtBQUssQ0FBQ0MsSUFBTixDQUFZQyxJQUFELElBQ2hCLHdCQUFVSCxLQUFWLEVBQWlCRyxJQUFqQixFQUF1QjtBQUNyQkMsSUFBQUEsR0FBRyxFQUFFO0FBRGdCLEdBQXZCLENBREssQ0FBUDtBQUtELENBTk07Ozs7QUFRQSxNQUFNQyxjQUFjLEdBQUlDLElBQUQsSUFBa0I7QUFDOUMsUUFBTUMsT0FBTyxHQUFHQyxNQUFNLENBQUNELE9BQVAsQ0FBZUQsSUFBZixDQUFoQjtBQUNBQyxFQUFBQSxPQUFPLENBQUNFLElBQVIsQ0FBYSxDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBV0QsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPQyxDQUFDLENBQUMsQ0FBRCxDQUFSLEdBQWMsQ0FBQyxDQUFmLEdBQW1CLENBQTNDO0FBQ0EsU0FBT0osT0FBTyxDQUFDSyxNQUFSLENBQWUsQ0FBQ0MsS0FBRCxFQUFRLENBQUNDLEdBQUQsRUFBTUMsS0FBTixDQUFSLE1BQTBCLEVBQUUsR0FBR0YsS0FBTDtBQUFZLEtBQUNDLEdBQUQsR0FBT0M7QUFBbkIsR0FBMUIsQ0FBZixFQUFzRSxFQUF0RSxDQUFQO0FBQ0QsQ0FKTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmltYXRjaCBpcyBhIHBlZXIgZGVwZW5kZW5jeSBvZiBnbG9iXG5pbXBvcnQgbWluaW1hdGNoIGZyb20gXCJtaW5pbWF0Y2hcIjtcbmV4cG9ydCBjb25zdCBmaWx0ZXJCeU1pbmltYXRjaCA9IChpbnB1dDogc3RyaW5nLCBydWxlczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHJ1bGVzLnNvbWUoKGl0ZW0pID0+XG4gICAgbWluaW1hdGNoKGlucHV0LCBpdGVtLCB7XG4gICAgICBkb3Q6IHRydWUsXG4gICAgfSlcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPcmRlcmVkSnNvbiA9IChqc29uOiBvYmplY3QpID0+IHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGpzb24pO1xuICBlbnRyaWVzLnNvcnQoKGEsIGIpID0+IChhWzBdIDwgYlswXSA/IC0xIDogMSkpO1xuICByZXR1cm4gZW50cmllcy5yZWR1Y2UoKHRvdGFsLCBba2V5LCB2YWx1ZV0pID0+ICh7IC4uLnRvdGFsLCBba2V5XTogdmFsdWUgfSksIHt9KTtcbn07XG4iXX0=