"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = exports.config = exports.OpenSearchConfig = exports.DEFAULT_API_VERSION = void 0;

var _configSchema = require("@osd/config-schema");

var _fs = require("fs");

var _utils = require("../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const hostURISchema = _configSchema.schema.uri({
  scheme: ['http', 'https']
});

const DEFAULT_API_VERSION = '7.x';
exports.DEFAULT_API_VERSION = DEFAULT_API_VERSION;

/**
 * Validation schema for opensearch service config. It can be reused when plugins allow users
 * to specify a local opensearch config.
 * @public
 */
const configSchema = _configSchema.schema.object({
  sniffOnStart: _configSchema.schema.boolean({
    defaultValue: false
  }),
  sniffInterval: _configSchema.schema.oneOf([_configSchema.schema.duration(), _configSchema.schema.literal(false)], {
    defaultValue: false
  }),
  sniffOnConnectionFault: _configSchema.schema.boolean({
    defaultValue: false
  }),
  hosts: _configSchema.schema.oneOf([hostURISchema, _configSchema.schema.arrayOf(hostURISchema, {
    minSize: 1
  })], {
    defaultValue: 'http://localhost:9200'
  }),
  username: _configSchema.schema.maybe(_configSchema.schema.conditional(_configSchema.schema.contextRef('dist'), false, _configSchema.schema.string({
    validate: rawConfig => {
      if (rawConfig === 'elastic') {
        return 'value of "elastic" is forbidden. This is a superuser account that can obfuscate ' + 'privilege-related issues. You should use the "opensearch_dashboards_system" user instead.';
      }
    }
  }), _configSchema.schema.string())),
  password: _configSchema.schema.maybe(_configSchema.schema.string()),
  requestHeadersWhitelist: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
    defaultValue: ['authorization']
  }),
  memoryCircuitBreaker: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    maxPercentage: _configSchema.schema.number({
      defaultValue: 1.0
    })
  }),
  customHeaders: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
    defaultValue: {}
  }),
  shardTimeout: _configSchema.schema.duration({
    defaultValue: '30s'
  }),
  requestTimeout: _configSchema.schema.duration({
    defaultValue: '30s'
  }),
  pingTimeout: _configSchema.schema.duration({
    defaultValue: _configSchema.schema.siblingRef('requestTimeout')
  }),
  logQueries: _configSchema.schema.boolean({
    defaultValue: false
  }),
  optimizedHealthcheck: _configSchema.schema.maybe(_configSchema.schema.object({
    id: _configSchema.schema.string(),
    filters: _configSchema.schema.maybe(_configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
      defaultValue: {}
    }))
  })),
  ssl: _configSchema.schema.object({
    verificationMode: _configSchema.schema.oneOf([_configSchema.schema.literal('none'), _configSchema.schema.literal('certificate'), _configSchema.schema.literal('full')], {
      defaultValue: 'full'
    }),
    certificateAuthorities: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      minSize: 1
    })])),
    certificate: _configSchema.schema.maybe(_configSchema.schema.string()),
    key: _configSchema.schema.maybe(_configSchema.schema.string()),
    keyPassphrase: _configSchema.schema.maybe(_configSchema.schema.string()),
    keystore: _configSchema.schema.object({
      path: _configSchema.schema.maybe(_configSchema.schema.string()),
      password: _configSchema.schema.maybe(_configSchema.schema.string())
    }),
    truststore: _configSchema.schema.object({
      path: _configSchema.schema.maybe(_configSchema.schema.string()),
      password: _configSchema.schema.maybe(_configSchema.schema.string())
    }),
    alwaysPresentCertificate: _configSchema.schema.boolean({
      defaultValue: false
    })
  }, {
    validate: rawConfig => {
      if (rawConfig.key && rawConfig.keystore.path) {
        return 'cannot use [key] when [keystore.path] is specified';
      }

      if (rawConfig.certificate && rawConfig.keystore.path) {
        return 'cannot use [certificate] when [keystore.path] is specified';
      }
    }
  }),
  apiVersion: _configSchema.schema.string({
    defaultValue: DEFAULT_API_VERSION
  }),
  healthCheck: _configSchema.schema.object({
    delay: _configSchema.schema.duration({
      defaultValue: 2500
    })
  }),
  ignoreVersionMismatch: _configSchema.schema.conditional(_configSchema.schema.contextRef('dev'), false, _configSchema.schema.boolean({
    validate: rawValue => {
      if (rawValue === true) {
        return '"ignoreVersionMismatch" can only be set to true in development mode';
      }
    },
    defaultValue: false
  }), _configSchema.schema.boolean({
    defaultValue: false
  })),
  disablePrototypePoisoningProtection: _configSchema.schema.maybe(_configSchema.schema.boolean({
    defaultValue: false
  }))
});

exports.configSchema = configSchema;

const deprecations = ({
  renameFromRoot,
  renameFromRootWithoutMap
}) => [renameFromRoot('elasticsearch.sniffOnStart', 'opensearch.sniffOnStart'), renameFromRoot('elasticsearch.sniffInterval', 'opensearch.sniffInterval'), renameFromRoot('elasticsearch.sniffOnConnectionFault', 'opensearch.sniffOnConnectionFault'), renameFromRoot('elasticsearch.hosts', 'opensearch.hosts'), renameFromRoot('elasticsearch.username', 'opensearch.username'), renameFromRoot('elasticsearch.password', 'opensearch.password'), renameFromRoot('elasticsearch.requestHeadersWhitelist', 'opensearch.requestHeadersWhitelist'), renameFromRootWithoutMap('opensearch.requestHeadersWhitelist', 'opensearch.requestHeadersAllowlist'), renameFromRootWithoutMap('opensearch.requestHeadersWhitelistConfigured', 'opensearch.requestHeadersAllowlistConfigured'), renameFromRoot('elasticsearch.customHeaders', 'opensearch.customHeaders'), renameFromRoot('elasticsearch.shardTimeout', 'opensearch.shardTimeout'), renameFromRoot('elasticsearch.requestTimeout', 'opensearch.requestTimeout'), renameFromRoot('elasticsearch.pingTimeout', 'opensearch.pingTimeout'), renameFromRoot('elasticsearch.logQueries', 'opensearch.logQueries'), renameFromRoot('elasticsearch.optimizedHealthcheckId', 'opensearch.optimizedHealthcheck.id'), renameFromRoot('opensearch.optimizedHealthcheckId', 'opensearch.optimizedHealthcheck.id'), renameFromRoot('elasticsearch.ssl', 'opensearch.ssl'), renameFromRoot('elasticsearch.apiVersion', 'opensearch.apiVersion'), renameFromRoot('elasticsearch.healthCheck', 'opensearch.healthCheck'), renameFromRoot('elasticsearch.ignoreVersionMismatch', 'opensearch.ignoreVersionMismatch'), (settings, fromPath, log) => {
  var _opensearch$ssl, _opensearch$ssl2, _opensearch$ssl3, _opensearch$ssl4;

  const opensearch = settings[fromPath];

  if (!opensearch) {
    return settings;
  }

  if (opensearch.username === 'elastic') {
    log(`Setting [${fromPath}.username] to "elastic" is deprecated. You should use the "opensearch_dashboards_system" user instead.`);
  } else if (opensearch.username === 'opensearchDashboards') {
    log(`Setting [${fromPath}.username] to "opensearchDashboards" is deprecated. You should use the "opensearch_dashboards_system" user instead.`);
  }

  if (((_opensearch$ssl = opensearch.ssl) === null || _opensearch$ssl === void 0 ? void 0 : _opensearch$ssl.key) !== undefined && ((_opensearch$ssl2 = opensearch.ssl) === null || _opensearch$ssl2 === void 0 ? void 0 : _opensearch$ssl2.certificate) === undefined) {
    log(`Setting [${fromPath}.ssl.key] without [${fromPath}.ssl.certificate] is deprecated. This has no effect, you should use both settings to enable TLS client authentication to OpenSearch.`);
  } else if (((_opensearch$ssl3 = opensearch.ssl) === null || _opensearch$ssl3 === void 0 ? void 0 : _opensearch$ssl3.certificate) !== undefined && ((_opensearch$ssl4 = opensearch.ssl) === null || _opensearch$ssl4 === void 0 ? void 0 : _opensearch$ssl4.key) === undefined) {
    log(`Setting [${fromPath}.ssl.certificate] without [${fromPath}.ssl.key] is deprecated. This has no effect, you should use both settings to enable TLS client authentication to OpenSearch.`);
  }

  return settings;
}];

const config = {
  path: 'opensearch',
  schema: configSchema,
  deprecations
};
/**
 * Wrapper of config schema.
 * @public
 */

exports.config = config;

class OpenSearchConfig {
  /**
   * The interval between health check requests OpenSearch Dashboards sends to the OpenSearch.
   */

  /**
   * Whether to allow opensearch-dashboards to connect to a non-compatible opensearch node.
   */

  /**
   * Version of the OpenSearch (1.1, 2.1 or `main`) client will be connecting to.
   */

  /**
   * Specifies whether all queries to the client should be logged (status code,
   * method, query etc.).
   */

  /**
   * Specifies whether Dashboards should only query the local OpenSearch node when
   * all nodes in the cluster have the same node attribute value
   */

  /**
   * Hosts that the client will connect to. If sniffing is enabled, this list will
   * be used as seeds to discover the rest of your cluster.
   */

  /**
   * List of OpenSearch Dashboards client-side headers to send to OpenSearch when request
   * scoped cluster client is used. If this is an empty array then *no* client-side
   * will be sent.
   */

  /**
   * Timeout after which PING HTTP request will be aborted and retried.
   */

  /**
   * Timeout after which HTTP request will be aborted and retried.
   */

  /**
   * Timeout for OpenSearch to wait for responses from shards. Set to 0 to disable.
   */

  /**
   * Set of options to configure memory circuit breaker for query response.
   * The `maxPercentage` field is to determine the threshold for maximum heap size for memory circuit breaker. By default the value is `1.0`.
   * The `enabled` field specifies whether the client should protect large response that can't fit into memory.
   */

  /**
   * Specifies whether the client should attempt to detect the rest of the cluster
   * when it is first instantiated.
   */

  /**
   * Interval to perform a sniff operation and make sure the list of nodes is complete.
   * If `false` then sniffing is disabled.
   */

  /**
   * Specifies whether the client should immediately sniff for a more current list
   * of nodes when a connection dies.
   */

  /**
   * If OpenSearch is protected with basic authentication, this setting provides
   * the username that the OpenSearch Dashboards server uses to perform its administrative functions.
   */

  /**
   * If OpenSearch is protected with basic authentication, this setting provides
   * the password that the OpenSearch Dashboards server uses to perform its administrative functions.
   */

  /**
   * Set of settings configure SSL connection between OpenSearch Dashboards and OpenSearch that
   * are required when `xpack.ssl.verification_mode` in OpenSearch is set to
   * either `certificate` or `full`.
   */

  /**
   * Header names and values to send to OpenSearch with every request. These
   * headers cannot be overwritten by client-side headers and aren't affected by
   * `requestHeadersWhitelist` configuration.
   */

  /**
   * Specifies whether the client should attempt to protect against reserved words
   * or not.
   */
  constructor(rawConfig) {
    _defineProperty(this, "healthCheckDelay", void 0);

    _defineProperty(this, "ignoreVersionMismatch", void 0);

    _defineProperty(this, "apiVersion", void 0);

    _defineProperty(this, "logQueries", void 0);

    _defineProperty(this, "optimizedHealthcheck", void 0);

    _defineProperty(this, "hosts", void 0);

    _defineProperty(this, "requestHeadersWhitelist", void 0);

    _defineProperty(this, "pingTimeout", void 0);

    _defineProperty(this, "requestTimeout", void 0);

    _defineProperty(this, "shardTimeout", void 0);

    _defineProperty(this, "memoryCircuitBreaker", void 0);

    _defineProperty(this, "sniffOnStart", void 0);

    _defineProperty(this, "sniffInterval", void 0);

    _defineProperty(this, "sniffOnConnectionFault", void 0);

    _defineProperty(this, "username", void 0);

    _defineProperty(this, "password", void 0);

    _defineProperty(this, "ssl", void 0);

    _defineProperty(this, "customHeaders", void 0);

    _defineProperty(this, "disablePrototypePoisoningProtection", void 0);

    this.ignoreVersionMismatch = rawConfig.ignoreVersionMismatch;
    this.apiVersion = rawConfig.apiVersion;
    this.logQueries = rawConfig.logQueries;
    this.optimizedHealthcheck = rawConfig.optimizedHealthcheck;
    this.hosts = Array.isArray(rawConfig.hosts) ? rawConfig.hosts : [rawConfig.hosts];
    this.requestHeadersWhitelist = Array.isArray(rawConfig.requestHeadersWhitelist) ? rawConfig.requestHeadersWhitelist : [rawConfig.requestHeadersWhitelist];
    this.memoryCircuitBreaker = rawConfig.memoryCircuitBreaker;
    this.pingTimeout = rawConfig.pingTimeout;
    this.requestTimeout = rawConfig.requestTimeout;
    this.shardTimeout = rawConfig.shardTimeout;
    this.sniffOnStart = rawConfig.sniffOnStart;
    this.sniffOnConnectionFault = rawConfig.sniffOnConnectionFault;
    this.sniffInterval = rawConfig.sniffInterval;
    this.healthCheckDelay = rawConfig.healthCheck.delay;
    this.username = rawConfig.username;
    this.password = rawConfig.password;
    this.customHeaders = rawConfig.customHeaders;
    this.disablePrototypePoisoningProtection = rawConfig.disablePrototypePoisoningProtection;
    const {
      alwaysPresentCertificate,
      verificationMode
    } = rawConfig.ssl;
    const {
      key,
      keyPassphrase,
      certificate,
      certificateAuthorities
    } = readKeyAndCerts(rawConfig);
    this.ssl = {
      alwaysPresentCertificate,
      key,
      keyPassphrase,
      certificate,
      certificateAuthorities,
      verificationMode
    };
  }

}

exports.OpenSearchConfig = OpenSearchConfig;

const readKeyAndCerts = rawConfig => {
  var _rawConfig$ssl$keysto, _rawConfig$ssl$trusts;

  let key;
  let keyPassphrase;
  let certificate;
  let certificateAuthorities;

  const addCAs = ca => {
    if (ca && ca.length) {
      certificateAuthorities = [...(certificateAuthorities || []), ...ca];
    }
  };

  if ((_rawConfig$ssl$keysto = rawConfig.ssl.keystore) !== null && _rawConfig$ssl$keysto !== void 0 && _rawConfig$ssl$keysto.path) {
    const keystore = (0, _utils.readPkcs12Keystore)(rawConfig.ssl.keystore.path, rawConfig.ssl.keystore.password);

    if (!keystore.key) {
      throw new Error(`Did not find key in OpenSearch keystore.`);
    } else if (!keystore.cert) {
      throw new Error(`Did not find certificate in OpenSearch keystore.`);
    }

    key = keystore.key;
    certificate = keystore.cert;
    addCAs(keystore.ca);
  } else {
    if (rawConfig.ssl.key) {
      key = readFile(rawConfig.ssl.key);
      keyPassphrase = rawConfig.ssl.keyPassphrase;
    }

    if (rawConfig.ssl.certificate) {
      certificate = readFile(rawConfig.ssl.certificate);
    }
  }

  if ((_rawConfig$ssl$trusts = rawConfig.ssl.truststore) !== null && _rawConfig$ssl$trusts !== void 0 && _rawConfig$ssl$trusts.path) {
    const ca = (0, _utils.readPkcs12Truststore)(rawConfig.ssl.truststore.path, rawConfig.ssl.truststore.password);
    addCAs(ca);
  }

  const ca = rawConfig.ssl.certificateAuthorities;

  if (ca) {
    const parsed = [];
    const paths = Array.isArray(ca) ? ca : [ca];

    if (paths.length > 0) {
      for (const path of paths) {
        parsed.push(readFile(path));
      }

      addCAs(parsed);
    }
  }

  return {
    key,
    keyPassphrase,
    certificate,
    certificateAuthorities
  };
};

const readFile = file => {
  return (0, _fs.readFileSync)(file, 'utf8');
};