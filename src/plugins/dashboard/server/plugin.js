"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardPlugin = void 0;

var _saved_objects = require("./saved_objects");

var _capabilities_provider = require("./capabilities_provider");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DashboardPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get();
  }

  setup(core) {
    this.logger.debug('dashboard: Setup');
    core.savedObjects.registerType(_saved_objects.dashboardSavedObjectType);
    core.capabilities.registerProvider(_capabilities_provider.capabilitiesProvider);
    return {};
  }

  start(core) {
    this.logger.debug('dashboard: Started');
    return {};
  }

  stop() {}

}

exports.DashboardPlugin = DashboardPlugin;