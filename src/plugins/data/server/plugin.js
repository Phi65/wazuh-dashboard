"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.DataServerPlugin = void 0;

var _index_patterns = require("./index_patterns");

var _search_service = require("./search/search_service");

var _query_service = require("./query/query_service");

var _scripts = require("./scripts");

var _dql_telemetry = require("./dql_telemetry");

var _autocomplete = require("./autocomplete");

var _field_formats = require("./field_formats");

var _ui_settings = require("./ui_settings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DataServerPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "searchService", void 0);

    _defineProperty(this, "scriptsService", void 0);

    _defineProperty(this, "dqlTelemetryService", void 0);

    _defineProperty(this, "autocompleteService", void 0);

    _defineProperty(this, "indexPatterns", new _index_patterns.IndexPatternsService());

    _defineProperty(this, "fieldFormats", new _field_formats.FieldFormatsService());

    _defineProperty(this, "queryService", new _query_service.QueryService());

    _defineProperty(this, "logger", void 0);

    this.logger = initializerContext.logger.get('data');
    this.searchService = new _search_service.SearchService(initializerContext, this.logger);
    this.scriptsService = new _scripts.ScriptsService();
    this.dqlTelemetryService = new _dql_telemetry.DqlTelemetryService(initializerContext);
    this.autocompleteService = new _autocomplete.AutocompleteService(initializerContext);
  }

  async setup(core, {
    expressions,
    usageCollection,
    dataSource
  }) {
    this.indexPatterns.setup(core);
    this.scriptsService.setup(core);
    this.queryService.setup(core);
    this.autocompleteService.setup(core);
    this.dqlTelemetryService.setup(core, {
      usageCollection
    });
    core.uiSettings.register((0, _ui_settings.getUiSettings)());
    const searchSetup = await this.searchService.setup(core, {
      registerFunction: expressions.registerFunction,
      usageCollection,
      dataSource
    });
    return {
      __enhance: enhancements => {
        searchSetup.__enhance(enhancements.search);
      },
      search: searchSetup,
      fieldFormats: this.fieldFormats.setup()
    };
  }

  start(core) {
    const fieldFormats = this.fieldFormats.start();
    const indexPatterns = this.indexPatterns.start(core, {
      fieldFormats,
      logger: this.logger.get('indexPatterns')
    });
    return {
      fieldFormats,
      indexPatterns,
      search: this.searchService.start(core, {
        fieldFormats,
        indexPatterns
      })
    };
  }

  stop() {
    this.searchService.stop();
  }

}

exports.Plugin = exports.DataServerPlugin = DataServerPlugin;