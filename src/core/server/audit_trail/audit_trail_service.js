"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuditTrailService = void 0;

var _router = require("../http/router");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultAuditorFactory = {
  asScoped() {
    return {
      add() {},

      withAuditScope() {}

    };
  }

};

class AuditTrailService {
  constructor(core) {
    _defineProperty(this, "log", void 0);

    _defineProperty(this, "auditor", defaultAuditorFactory);

    _defineProperty(this, "auditors", new WeakMap());

    this.log = core.logger.get('audit_trail');
  }

  setup() {
    return {
      register: auditor => {
        if (this.auditor !== defaultAuditorFactory) {
          throw new Error('An auditor factory has been already registered');
        }

        this.auditor = auditor;
        this.log.debug('An auditor factory has been registered');
      }
    };
  }

  start() {
    return {
      asScoped: request => {
        const key = (0, _router.ensureRawRequest)(request);

        if (!this.auditors.has(key)) {
          this.auditors.set(key, this.auditor.asScoped(request));
        }

        return this.auditors.get(key);
      }
    };
  }

  stop() {}

}

exports.AuditTrailService = AuditTrailService;