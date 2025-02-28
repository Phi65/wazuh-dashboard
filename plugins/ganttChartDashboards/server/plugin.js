"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttVisPlugin = void 0;

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GanttVisPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  setup(core) {
    this.logger.debug('gantt_vis: Setup');
    const router = core.http.createRouter(); // Register server side APIs

    (0, _routes.defineRoutes)(router);
    return {};
  }

  start(core) {
    this.logger.debug('gantt_vis: Started');
    return {};
  }

  stop() {}

}

exports.GanttVisPlugin = GanttVisPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi50cyJdLCJuYW1lcyI6WyJHYW50dFZpc1BsdWdpbiIsImNvbnN0cnVjdG9yIiwiaW5pdGlhbGl6ZXJDb250ZXh0IiwibG9nZ2VyIiwiZ2V0Iiwic2V0dXAiLCJjb3JlIiwiZGVidWciLCJyb3V0ZXIiLCJodHRwIiwiY3JlYXRlUm91dGVyIiwic3RhcnQiLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBY0E7Ozs7QUFFTyxNQUFNQSxjQUFOLENBQWlGO0FBR3RGQyxFQUFBQSxXQUFXLENBQUNDLGtCQUFELEVBQStDO0FBQUE7O0FBQ3hELFNBQUtDLE1BQUwsR0FBY0Qsa0JBQWtCLENBQUNDLE1BQW5CLENBQTBCQyxHQUExQixFQUFkO0FBQ0Q7O0FBRU1DLEVBQUFBLEtBQUssQ0FBQ0MsSUFBRCxFQUFrQjtBQUM1QixTQUFLSCxNQUFMLENBQVlJLEtBQVosQ0FBa0Isa0JBQWxCO0FBQ0EsVUFBTUMsTUFBTSxHQUFHRixJQUFJLENBQUNHLElBQUwsQ0FBVUMsWUFBVixFQUFmLENBRjRCLENBSTVCOztBQUNBLDhCQUFhRixNQUFiO0FBRUEsV0FBTyxFQUFQO0FBQ0Q7O0FBRU1HLEVBQUFBLEtBQUssQ0FBQ0wsSUFBRCxFQUFrQjtBQUM1QixTQUFLSCxNQUFMLENBQVlJLEtBQVosQ0FBa0Isb0JBQWxCO0FBQ0EsV0FBTyxFQUFQO0FBQ0Q7O0FBRU1LLEVBQUFBLElBQUksR0FBRyxDQUFFOztBQXRCc0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCxcbiAgQ29yZVNldHVwLFxuICBDb3JlU3RhcnQsXG4gIFBsdWdpbixcbiAgTG9nZ2VyLFxufSBmcm9tICcuLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuXG5pbXBvcnQgeyBHYW50dFZpc1BsdWdpblNldHVwLCBHYW50dFZpc1BsdWdpblN0YXJ0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBkZWZpbmVSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5cbmV4cG9ydCBjbGFzcyBHYW50dFZpc1BsdWdpbiBpbXBsZW1lbnRzIFBsdWdpbjxHYW50dFZpc1BsdWdpblNldHVwLCBHYW50dFZpc1BsdWdpblN0YXJ0PiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IoaW5pdGlhbGl6ZXJDb250ZXh0OiBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQpIHtcbiAgICB0aGlzLmxvZ2dlciA9IGluaXRpYWxpemVyQ29udGV4dC5sb2dnZXIuZ2V0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoY29yZTogQ29yZVNldHVwKSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ2dhbnR0X3ZpczogU2V0dXAnKTtcbiAgICBjb25zdCByb3V0ZXIgPSBjb3JlLmh0dHAuY3JlYXRlUm91dGVyKCk7XG5cbiAgICAvLyBSZWdpc3RlciBzZXJ2ZXIgc2lkZSBBUElzXG4gICAgZGVmaW5lUm91dGVzKHJvdXRlcik7XG5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwdWJsaWMgc3RhcnQoY29yZTogQ29yZVN0YXJ0KSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ2dhbnR0X3ZpczogU3RhcnRlZCcpO1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge31cbn1cbiJdfQ==