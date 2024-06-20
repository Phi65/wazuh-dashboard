"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = exports.config = exports.MapsLegacyPlugin = void 0;

var _config = require("../config");

var _ui_settings = require("./ui_settings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const config = {
  exposeToBrowser: {
    includeOpenSearchMapsService: true,
    proxyOpenSearchMapsServiceInMaps: true,
    showRegionDeniedWarning: true,
    tilemap: true,
    regionmap: true,
    manifestServiceUrl: true,
    opensearchManifestServiceUrl: true,
    emsFileApiUrl: true,
    emsTileApiUrl: true,
    emsLandingPageUrl: true,
    emsFontLibraryUrl: true,
    emsTileLayerId: true
  },
  schema: _config.configSchema,
  deprecations: ({
    renameFromRoot
  }) => [renameFromRoot('map.includeElasticMapsService', 'map.includeOpenSearchMapsService'), renameFromRoot('map.proxyOpenSearchMapsServiceInMaps', 'map.proxyElasticMapsServiceInMaps'), renameFromRoot('map.regionmap.includeElasticMapsService', 'map.regionmap.includeOpenSearchMapsService'), renameFromRoot('map.showRegionBlockedWarning', 'map.showRegionDeniedWarning')]
};
exports.config = config;

class MapsLegacyPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "_initializerContext", void 0);

    this._initializerContext = initializerContext;
  }

  setup(core) {
    core.uiSettings.register((0, _ui_settings.getUiSettings)()); // @ts-ignore

    const config$ = this._initializerContext.config.create();

    return {
      config$
    };
  }

  start() {}

}

exports.MapsLegacyPlugin = MapsLegacyPlugin;

const plugin = initializerContext => new MapsLegacyPlugin(initializerContext);

exports.plugin = plugin;