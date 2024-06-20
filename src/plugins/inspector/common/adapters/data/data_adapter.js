"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataAdapter = void 0;

var _events = require("events");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DataAdapter extends _events.EventEmitter {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tabular", void 0);

    _defineProperty(this, "tabularOptions", void 0);
  }

  setTabularLoader(callback, options = {}) {
    this.tabular = callback;
    this.tabularOptions = options;
    this.emit('change', 'tabular');
  }

  getTabular() {
    if (!this.tabular || !this.tabularOptions) {
      return Promise.resolve({
        data: null,
        options: {}
      });
    }

    const options = this.tabularOptions;
    return Promise.resolve(this.tabular()).then(data => ({
      data,
      options
    }));
  }

}

exports.DataAdapter = DataAdapter;