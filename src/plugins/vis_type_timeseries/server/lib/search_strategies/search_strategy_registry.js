"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchStrategyRegistry = void 0;

var _abstract_search_strategy = require("./strategies/abstract_search_strategy");

var _default_search_strategy = require("./strategies/default_search_strategy");

var _extract_index_patterns = require("../../../common/extract_index_patterns");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchStrategyRegistry {
  constructor() {
    _defineProperty(this, "strategies", []);

    this.addStrategy(new _default_search_strategy.DefaultSearchStrategy());
  }

  addStrategy(searchStrategy) {
    if (searchStrategy instanceof _abstract_search_strategy.AbstractSearchStrategy) {
      this.strategies.unshift(searchStrategy);
    }

    return this.strategies;
  }

  async getViableStrategy(req, indexPattern) {
    for (const searchStrategy of this.strategies) {
      const {
        isViable,
        capabilities
      } = await searchStrategy.checkForViability(req, indexPattern);

      if (isViable) {
        return {
          searchStrategy,
          capabilities
        };
      }
    }
  }

  async getViableStrategyForPanel(req, panel) {
    const indexPattern = (0, _extract_index_patterns.extractIndexPatterns)(panel).join(',');
    return this.getViableStrategy(req, indexPattern);
  }

}

exports.SearchStrategyRegistry = SearchStrategyRegistry;