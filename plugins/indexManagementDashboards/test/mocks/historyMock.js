"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const historyMock = {
  action: "REPLACE",
  // PUSH, REPLACE, POP
  block: jest.fn(),
  // prevents navigation
  createHref: jest.fn(),
  go: jest.fn(),
  // moves the pointer in the history stack by n entries
  goBack: jest.fn(),
  // equivalent to go(-1)
  goForward: jest.fn(),
  // equivalent to go(1)
  length: 0,
  // number of entries in the history stack
  listen: jest.fn(),
  location: {
    hash: "",
    // URL hash fragment
    pathname: "",
    // path of URL
    search: "",
    // URL query string
    state: undefined // location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack

  },
  push: jest.fn(),
  // pushes new entry onto history stack
  replace: jest.fn() // replaces current entry on history stack

};
var _default = historyMock;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpc3RvcnlNb2NrLnRzIl0sIm5hbWVzIjpbImhpc3RvcnlNb2NrIiwiYWN0aW9uIiwiYmxvY2siLCJqZXN0IiwiZm4iLCJjcmVhdGVIcmVmIiwiZ28iLCJnb0JhY2siLCJnb0ZvcndhcmQiLCJsZW5ndGgiLCJsaXN0ZW4iLCJsb2NhdGlvbiIsImhhc2giLCJwYXRobmFtZSIsInNlYXJjaCIsInN0YXRlIiwidW5kZWZpbmVkIiwicHVzaCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLE1BQU1BLFdBQXNCLEdBQUc7QUFDN0JDLEVBQUFBLE1BQU0sRUFBRSxTQURxQjtBQUNWO0FBQ25CQyxFQUFBQSxLQUFLLEVBQUVDLElBQUksQ0FBQ0MsRUFBTCxFQUZzQjtBQUVYO0FBQ2xCQyxFQUFBQSxVQUFVLEVBQUVGLElBQUksQ0FBQ0MsRUFBTCxFQUhpQjtBQUk3QkUsRUFBQUEsRUFBRSxFQUFFSCxJQUFJLENBQUNDLEVBQUwsRUFKeUI7QUFJZDtBQUNmRyxFQUFBQSxNQUFNLEVBQUVKLElBQUksQ0FBQ0MsRUFBTCxFQUxxQjtBQUtWO0FBQ25CSSxFQUFBQSxTQUFTLEVBQUVMLElBQUksQ0FBQ0MsRUFBTCxFQU5rQjtBQU1QO0FBQ3RCSyxFQUFBQSxNQUFNLEVBQUUsQ0FQcUI7QUFPbEI7QUFDWEMsRUFBQUEsTUFBTSxFQUFFUCxJQUFJLENBQUNDLEVBQUwsRUFScUI7QUFTN0JPLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsRUFERTtBQUNFO0FBQ1ZDLElBQUFBLFFBQVEsRUFBRSxFQUZGO0FBRU07QUFDZEMsSUFBQUEsTUFBTSxFQUFFLEVBSEE7QUFHSTtBQUNaQyxJQUFBQSxLQUFLLEVBQUVDLFNBSkMsQ0FJVTs7QUFKVixHQVRtQjtBQWU3QkMsRUFBQUEsSUFBSSxFQUFFZCxJQUFJLENBQUNDLEVBQUwsRUFmdUI7QUFlWjtBQUNqQmMsRUFBQUEsT0FBTyxFQUFFZixJQUFJLENBQUNDLEVBQUwsRUFoQm9CLENBZ0JUOztBQWhCUyxDQUEvQjtlQW1CZUosVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cbmltcG9ydCAqIGFzIEggZnJvbSBcImhpc3RvcnlcIjtcblxuY29uc3QgaGlzdG9yeU1vY2s6IEguSGlzdG9yeSA9IHtcbiAgYWN0aW9uOiBcIlJFUExBQ0VcIiwgLy8gUFVTSCwgUkVQTEFDRSwgUE9QXG4gIGJsb2NrOiBqZXN0LmZuKCksIC8vIHByZXZlbnRzIG5hdmlnYXRpb25cbiAgY3JlYXRlSHJlZjogamVzdC5mbigpLFxuICBnbzogamVzdC5mbigpLCAvLyBtb3ZlcyB0aGUgcG9pbnRlciBpbiB0aGUgaGlzdG9yeSBzdGFjayBieSBuIGVudHJpZXNcbiAgZ29CYWNrOiBqZXN0LmZuKCksIC8vIGVxdWl2YWxlbnQgdG8gZ28oLTEpXG4gIGdvRm9yd2FyZDogamVzdC5mbigpLCAvLyBlcXVpdmFsZW50IHRvIGdvKDEpXG4gIGxlbmd0aDogMCwgLy8gbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhlIGhpc3Rvcnkgc3RhY2tcbiAgbGlzdGVuOiBqZXN0LmZuKCksXG4gIGxvY2F0aW9uOiB7XG4gICAgaGFzaDogXCJcIiwgLy8gVVJMIGhhc2ggZnJhZ21lbnRcbiAgICBwYXRobmFtZTogXCJcIiwgLy8gcGF0aCBvZiBVUkxcbiAgICBzZWFyY2g6IFwiXCIsIC8vIFVSTCBxdWVyeSBzdHJpbmdcbiAgICBzdGF0ZTogdW5kZWZpbmVkLCAvLyBsb2NhdGlvbi1zcGVjaWZpYyBzdGF0ZSB0aGF0IHdhcyBwcm92aWRlZCB0byBlLmcuIHB1c2gocGF0aCwgc3RhdGUpIHdoZW4gdGhpcyBsb2NhdGlvbiB3YXMgcHVzaGVkIG9udG8gdGhlIHN0YWNrXG4gIH0sXG4gIHB1c2g6IGplc3QuZm4oKSwgLy8gcHVzaGVzIG5ldyBlbnRyeSBvbnRvIGhpc3Rvcnkgc3RhY2tcbiAgcmVwbGFjZTogamVzdC5mbigpLCAvLyByZXBsYWNlcyBjdXJyZW50IGVudHJ5IG9uIGhpc3Rvcnkgc3RhY2tcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhpc3RvcnlNb2NrO1xuIl19