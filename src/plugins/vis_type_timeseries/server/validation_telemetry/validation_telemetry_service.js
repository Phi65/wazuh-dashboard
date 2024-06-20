"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationTelemetryService = void 0;

var _saved_objects = require("../saved_objects");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ValidationTelemetryService {
  constructor() {
    _defineProperty(this, "opensearchDashboardsIndex", '');
  }

  async setup(core, {
    usageCollection,
    globalConfig$
  }) {
    core.savedObjects.registerType(_saved_objects.tsvbTelemetrySavedObjectType);
    globalConfig$.subscribe(config => {
      this.opensearchDashboardsIndex = config.opensearchDashboards.index;
    });

    if (usageCollection) {
      usageCollection.registerCollector(usageCollection.makeUsageCollector({
        type: 'tsvb-validation',
        isReady: () => this.opensearchDashboardsIndex !== '',
        fetch: async callCluster => {
          try {
            var _response$_source, _response$_source$tsv;

            const response = await callCluster('get', {
              index: this.opensearchDashboardsIndex,
              id: 'tsvb-validation-telemetry:tsvb-validation-telemetry',
              ignore: [404]
            });
            return {
              failed_validations: (response === null || response === void 0 ? void 0 : (_response$_source = response._source) === null || _response$_source === void 0 ? void 0 : (_response$_source$tsv = _response$_source['tsvb-validation-telemetry']) === null || _response$_source$tsv === void 0 ? void 0 : _response$_source$tsv.failedRequests) || 0
            };
          } catch (err) {
            return {
              failed_validations: 0
            };
          }
        },
        schema: {
          failed_validations: {
            type: 'long'
          }
        }
      }));
    }

    const internalRepositoryPromise = core.getStartServices().then(([start]) => start.savedObjects.createInternalRepository());
    return {
      logFailedValidation: async () => {
        try {
          const internalRepository = await internalRepositoryPromise;
          await internalRepository.incrementCounter('tsvb-validation-telemetry', 'tsvb-validation-telemetry', 'failedRequests');
        } catch (e) {// swallow error, validation telemetry shouldn't fail anything else
        }
      }
    };
  }

  start() {}

}

exports.ValidationTelemetryService = ValidationTelemetryService;