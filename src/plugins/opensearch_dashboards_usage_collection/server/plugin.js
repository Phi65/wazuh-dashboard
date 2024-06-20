"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSearchDashboardsUsageCollectionPlugin = void 0;

var _rxjs = require("rxjs");

var _server = require("../../../core/server");

var _collectors = require("./collectors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OpenSearchDashboardsUsageCollectionPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "legacyConfig$", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "uiSettingsClient", void 0);

    _defineProperty(this, "metric$", void 0);

    _defineProperty(this, "coreUsageData", void 0);

    this.logger = initializerContext.logger.get();
    this.legacyConfig$ = initializerContext.config.legacy.globalConfig$;
    this.metric$ = new _rxjs.Subject();
  }

  setup(coreSetup, {
    usageCollection
  }) {
    this.registerUsageCollectors(usageCollection, coreSetup, this.metric$, opts => coreSetup.savedObjects.registerType(opts));
  }

  start(core) {
    const {
      savedObjects,
      uiSettings
    } = core;
    this.savedObjectsClient = savedObjects.createInternalRepository();
    const savedObjectsClient = new _server.SavedObjectsClient(this.savedObjectsClient);
    this.uiSettingsClient = uiSettings.asScopedToClient(savedObjectsClient);
    core.metrics.getOpsMetrics$().subscribe(this.metric$);
    this.coreUsageData = core.coreUsageData;
  }

  stop() {
    this.metric$.complete();
  }

  registerUsageCollectors(usageCollection, coreSetup, metric$, registerType) {
    const getSavedObjectsClient = () => this.savedObjectsClient;

    const getUiSettingsClient = () => this.uiSettingsClient;

    const getCoreUsageDataService = () => this.coreUsageData;

    (0, _collectors.registerOpsStatsCollector)(usageCollection, metric$);
    (0, _collectors.registerOpenSearchDashboardsUsageCollector)(usageCollection, this.legacyConfig$);
    (0, _collectors.registerManagementUsageCollector)(usageCollection, getUiSettingsClient);
    (0, _collectors.registerUiMetricUsageCollector)(usageCollection, registerType, getSavedObjectsClient);
    (0, _collectors.registerApplicationUsageCollector)(this.logger.get('application-usage'), usageCollection, registerType, getSavedObjectsClient);
    (0, _collectors.registerCspCollector)(usageCollection, coreSetup.http);
    (0, _collectors.registerCoreUsageCollector)(usageCollection, getCoreUsageDataService);
  }

}

exports.OpenSearchDashboardsUsageCollectionPlugin = OpenSearchDashboardsUsageCollectionPlugin;