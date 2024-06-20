"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultSearchStrategy = void 0;

var _server = require("../../../../../data/server");

var _abstract_search_strategy = require("./abstract_search_strategy");

var _default_search_capabilities = require("../default_search_capabilities");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DefaultSearchStrategy extends _abstract_search_strategy.AbstractSearchStrategy {
  constructor() {
    super(_server.OPENSEARCH_SEARCH_STRATEGY);

    _defineProperty(this, "name", 'default');
  }

  checkForViability(req) {
    return {
      isViable: true,
      capabilities: new _default_search_capabilities.DefaultSearchCapabilities(req)
    };
  }

}

exports.DefaultSearchStrategy = DefaultSearchStrategy;