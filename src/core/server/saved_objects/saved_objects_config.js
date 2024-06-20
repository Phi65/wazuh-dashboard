"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectsMigrationConfig = exports.savedObjectsConfig = exports.SavedObjectConfig = void 0;

var _configSchema = require("@osd/config-schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const savedObjectsMigrationConfig = {
  path: 'migrations',
  schema: _configSchema.schema.object({
    batchSize: _configSchema.schema.number({
      defaultValue: 100
    }),
    scrollDuration: _configSchema.schema.string({
      defaultValue: '15m'
    }),
    pollInterval: _configSchema.schema.number({
      defaultValue: 1500
    }),
    skip: _configSchema.schema.boolean({
      defaultValue: false
    })
  })
};
exports.savedObjectsMigrationConfig = savedObjectsMigrationConfig;
const savedObjectsConfig = {
  path: 'savedObjects',
  schema: _configSchema.schema.object({
    maxImportPayloadBytes: _configSchema.schema.byteSize({
      defaultValue: 26214400
    }),
    maxImportExportSize: _configSchema.schema.byteSize({
      defaultValue: 10000
    })
  })
};
exports.savedObjectsConfig = savedObjectsConfig;

class SavedObjectConfig {
  constructor(rawConfig, rawMigrationConfig) {
    _defineProperty(this, "maxImportPayloadBytes", void 0);

    _defineProperty(this, "maxImportExportSize", void 0);

    _defineProperty(this, "migration", void 0);

    this.maxImportPayloadBytes = rawConfig.maxImportPayloadBytes.getValueInBytes();
    this.maxImportExportSize = rawConfig.maxImportExportSize.getValueInBytes();
    this.migration = rawMigrationConfig;
  }

}

exports.SavedObjectConfig = SavedObjectConfig;