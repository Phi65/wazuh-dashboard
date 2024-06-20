"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = exports.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = exports.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = exports.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = exports.WAZUH_ROLE_ADMINISTRATOR_NAME = exports.WAZUH_ROLE_ADMINISTRATOR_ID = exports.WAZUH_QUEUE_CRON_FREQ = exports.WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = exports.WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = exports.WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = exports.WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = exports.WAZUH_MONITORING_TEMPLATE_NAME = exports.WAZUH_MONITORING_PREFIX = exports.WAZUH_MONITORING_PATTERN = exports.WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = exports.WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = exports.WAZUH_MONITORING_DEFAULT_FREQUENCY = exports.WAZUH_MONITORING_DEFAULT_ENABLED = exports.WAZUH_MONITORING_DEFAULT_CRON_FREQ = exports.WAZUH_MONITORING_DEFAULT_CREATION = exports.WAZUH_MODULES_ID = exports.WAZUH_MENU_TOOLS_SECTIONS_ID = exports.WAZUH_MENU_SETTINGS_SECTIONS_ID = exports.WAZUH_MENU_SECURITY_SECTIONS_ID = exports.WAZUH_MENU_MANAGEMENT_SECTIONS_ID = exports.WAZUH_LINK_SLACK = exports.WAZUH_LINK_GOOGLE_GROUPS = exports.WAZUH_LINK_GITHUB = exports.WAZUH_INDEX_TYPE_STATISTICS = exports.WAZUH_INDEX_TYPE_MONITORING = exports.WAZUH_INDEX_TYPE_ALERTS = exports.WAZUH_INDEXER_NAME = exports.WAZUH_ERROR_DAEMONS_NOT_READY = exports.WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = exports.WAZUH_DATA_LOGS_RAW_PATH = exports.WAZUH_DATA_LOGS_RAW_FILENAME = exports.WAZUH_DATA_LOGS_PLAIN_PATH = exports.WAZUH_DATA_LOGS_PLAIN_FILENAME = exports.WAZUH_DATA_LOGS_DIRECTORY_PATH = exports.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = exports.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = exports.WAZUH_DATA_CONFIG_REGISTRY_PATH = exports.WAZUH_DATA_CONFIG_DIRECTORY_PATH = exports.WAZUH_DATA_CONFIG_APP_PATH = exports.WAZUH_DATA_ABSOLUTE_PATH = exports.WAZUH_CONFIGURATION_CACHE_TIME = exports.WAZUH_API_RESERVED_WUI_SECURITY_RULES = exports.WAZUH_API_RESERVED_ID_LOWER_THAN = exports.WAZUH_ALERTS_PREFIX = exports.WAZUH_ALERTS_PATTERN = exports.WAZUH_AGENTS_OS_TYPE = exports.UI_TOAST_COLOR = exports.UI_ORDER_AGENT_STATUS = exports.UI_LOGGER_LEVELS = exports.UI_LABEL_NAME_AGENT_STATUS = exports.UI_COLOR_AGENT_STATUS = exports.SettingCategory = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = exports.SEARCH_BAR_DEBOUNCE_UPDATE_TIME = exports.REPORTS_PRIMARY_COLOR = exports.REPORTS_PAGE_HEADER_TEXT = exports.REPORTS_PAGE_FOOTER_TEXT = exports.REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = exports.PLUGIN_VERSION_SHORT = exports.PLUGIN_VERSION = exports.PLUGIN_SETTINGS_CATEGORIES = exports.PLUGIN_SETTINGS = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = exports.PLUGIN_PLATFORM_URL_GUIDE_TITLE = exports.PLUGIN_PLATFORM_URL_GUIDE = exports.PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = exports.PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = exports.PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = exports.PLUGIN_PLATFORM_REQUEST_HEADERS = exports.PLUGIN_PLATFORM_NAME = exports.PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = exports.PLUGIN_PLATFORM_INSTALLATION_USER = exports.PLUGIN_PLATFORM_BASE_INSTALLATION_PATH = exports.PLUGIN_APP_NAME = exports.MODULE_SCA_CHECK_RESULT_LABEL = exports.MAX_MB_LOG_FILES = exports.HTTP_STATUS_CODES = exports.HEALTH_CHECK_REDIRECTION_TIME = exports.HEALTH_CHECK = exports.EpluginSettingType = exports.ELASTIC_NAME = exports.DOCUMENTATION_WEB_BASE_URL = exports.CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = exports.AUTHORIZED_AGENTS = exports.ASSETS_PUBLIC_URL = exports.ASSETS_BASE_URL_PREFIX = exports.API_NAME_AGENT_STATUS = exports.AGENT_SYNCED_STATUS = exports.AGENT_STATUS_CODE = void 0;
exports.WAZUH_UI_LOGS_RAW_PATH = exports.WAZUH_UI_LOGS_RAW_FILENAME = exports.WAZUH_UI_LOGS_PLAIN_PATH = exports.WAZUH_UI_LOGS_PLAIN_FILENAME = exports.WAZUH_STATISTICS_TEMPLATE_NAME = exports.WAZUH_STATISTICS_PATTERN = exports.WAZUH_STATISTICS_DEFAULT_STATUS = exports.WAZUH_STATISTICS_DEFAULT_PREFIX = exports.WAZUH_STATISTICS_DEFAULT_NAME = exports.WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = exports.WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = exports.WAZUH_STATISTICS_DEFAULT_FREQUENCY = exports.WAZUH_STATISTICS_DEFAULT_CRON_FREQ = exports.WAZUH_STATISTICS_DEFAULT_CREATION = exports.WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = exports.WAZUH_SECURITY_PLUGINS = exports.WAZUH_SAMPLE_ALERT_PREFIX = void 0;

var _path = _interopRequireDefault(require("path"));

var _package = require("../package.json");

var _nodeCron = require("node-cron");

var _settingsValidator = require("../common/services/settings-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Wazuh app - Wazuh Constants file
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
// Plugin
const PLUGIN_VERSION = _package.version;
exports.PLUGIN_VERSION = PLUGIN_VERSION;

const PLUGIN_VERSION_SHORT = _package.version.split('.').splice(0, 2).join('.'); // Index patterns - Wazuh alerts


exports.PLUGIN_VERSION_SHORT = PLUGIN_VERSION_SHORT;
const WAZUH_INDEX_TYPE_ALERTS = 'alerts';
exports.WAZUH_INDEX_TYPE_ALERTS = WAZUH_INDEX_TYPE_ALERTS;
const WAZUH_ALERTS_PREFIX = 'wazuh-alerts-';
exports.WAZUH_ALERTS_PREFIX = WAZUH_ALERTS_PREFIX;
const WAZUH_ALERTS_PATTERN = 'wazuh-alerts-*'; // Job - Wazuh monitoring

exports.WAZUH_ALERTS_PATTERN = WAZUH_ALERTS_PATTERN;
const WAZUH_INDEX_TYPE_MONITORING = 'monitoring';
exports.WAZUH_INDEX_TYPE_MONITORING = WAZUH_INDEX_TYPE_MONITORING;
const WAZUH_MONITORING_PREFIX = 'wazuh-monitoring-';
exports.WAZUH_MONITORING_PREFIX = WAZUH_MONITORING_PREFIX;
const WAZUH_MONITORING_PATTERN = 'wazuh-monitoring-*';
exports.WAZUH_MONITORING_PATTERN = WAZUH_MONITORING_PATTERN;
const WAZUH_MONITORING_TEMPLATE_NAME = 'wazuh-agent';
exports.WAZUH_MONITORING_TEMPLATE_NAME = WAZUH_MONITORING_TEMPLATE_NAME;
const WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = 1;
exports.WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = WAZUH_MONITORING_DEFAULT_INDICES_SHARDS;
const WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = 0;
exports.WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS;
const WAZUH_MONITORING_DEFAULT_CREATION = 'w';
exports.WAZUH_MONITORING_DEFAULT_CREATION = WAZUH_MONITORING_DEFAULT_CREATION;
const WAZUH_MONITORING_DEFAULT_ENABLED = true;
exports.WAZUH_MONITORING_DEFAULT_ENABLED = WAZUH_MONITORING_DEFAULT_ENABLED;
const WAZUH_MONITORING_DEFAULT_FREQUENCY = 900;
exports.WAZUH_MONITORING_DEFAULT_FREQUENCY = WAZUH_MONITORING_DEFAULT_FREQUENCY;
const WAZUH_MONITORING_DEFAULT_CRON_FREQ = '0 * * * * *'; // Job - Wazuh statistics

exports.WAZUH_MONITORING_DEFAULT_CRON_FREQ = WAZUH_MONITORING_DEFAULT_CRON_FREQ;
const WAZUH_INDEX_TYPE_STATISTICS = 'statistics';
exports.WAZUH_INDEX_TYPE_STATISTICS = WAZUH_INDEX_TYPE_STATISTICS;
const WAZUH_STATISTICS_DEFAULT_PREFIX = 'wazuh';
exports.WAZUH_STATISTICS_DEFAULT_PREFIX = WAZUH_STATISTICS_DEFAULT_PREFIX;
const WAZUH_STATISTICS_DEFAULT_NAME = 'statistics';
exports.WAZUH_STATISTICS_DEFAULT_NAME = WAZUH_STATISTICS_DEFAULT_NAME;
const WAZUH_STATISTICS_PATTERN = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}-*`;
exports.WAZUH_STATISTICS_PATTERN = WAZUH_STATISTICS_PATTERN;
const WAZUH_STATISTICS_TEMPLATE_NAME = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}`;
exports.WAZUH_STATISTICS_TEMPLATE_NAME = WAZUH_STATISTICS_TEMPLATE_NAME;
const WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = 1;
exports.WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS;
const WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = 0;
exports.WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS;
const WAZUH_STATISTICS_DEFAULT_CREATION = 'w';
exports.WAZUH_STATISTICS_DEFAULT_CREATION = WAZUH_STATISTICS_DEFAULT_CREATION;
const WAZUH_STATISTICS_DEFAULT_STATUS = true;
exports.WAZUH_STATISTICS_DEFAULT_STATUS = WAZUH_STATISTICS_DEFAULT_STATUS;
const WAZUH_STATISTICS_DEFAULT_FREQUENCY = 900;
exports.WAZUH_STATISTICS_DEFAULT_FREQUENCY = WAZUH_STATISTICS_DEFAULT_FREQUENCY;
const WAZUH_STATISTICS_DEFAULT_CRON_FREQ = '0 */5 * * * *'; // Job - Wazuh initialize

exports.WAZUH_STATISTICS_DEFAULT_CRON_FREQ = WAZUH_STATISTICS_DEFAULT_CRON_FREQ;
const WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = 'wazuh-kibana'; // Permissions

exports.WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME;
const WAZUH_ROLE_ADMINISTRATOR_ID = 1;
exports.WAZUH_ROLE_ADMINISTRATOR_ID = WAZUH_ROLE_ADMINISTRATOR_ID;
const WAZUH_ROLE_ADMINISTRATOR_NAME = 'administrator'; // Sample data

exports.WAZUH_ROLE_ADMINISTRATOR_NAME = WAZUH_ROLE_ADMINISTRATOR_NAME;
const WAZUH_SAMPLE_ALERT_PREFIX = 'wazuh-alerts-4.x-';
exports.WAZUH_SAMPLE_ALERT_PREFIX = WAZUH_SAMPLE_ALERT_PREFIX;
const WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = 1;
exports.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = WAZUH_SAMPLE_ALERTS_INDEX_SHARDS;
const WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = 0;
exports.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS;
const WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = 'security';
exports.WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY;
const WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = 'auditing-policy-monitoring';
exports.WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING;
const WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = 'threat-detection';
exports.WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION;
const WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = 3000;
exports.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS;
const WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = {
  [WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY]: [{
    syscheck: true
  }, {
    aws: true
  }, {
    office: true
  }, {
    gcp: true
  }, {
    authentication: true
  }, {
    ssh: true
  }, {
    apache: true,
    alerts: 2000
  }, {
    web: true
  }, {
    windows: {
      service_control_manager: true
    },
    alerts: 1000
  }, {
    github: true
  }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING]: [{
    rootcheck: true
  }, {
    audit: true
  }, {
    openscap: true
  }, {
    ciscat: true
  }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION]: [{
    vulnerabilities: true
  }, {
    virustotal: true
  }, {
    osquery: true
  }, {
    docker: true
  }, {
    mitre: true
  }]
}; // Security

exports.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS;
const WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = 'OpenSearch Dashboards Security';
exports.WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY;
const WAZUH_SECURITY_PLUGINS = [WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY]; // App configuration

exports.WAZUH_SECURITY_PLUGINS = WAZUH_SECURITY_PLUGINS;
const WAZUH_CONFIGURATION_CACHE_TIME = 10000; // time in ms;
// Reserved ids for Users/Role mapping

exports.WAZUH_CONFIGURATION_CACHE_TIME = WAZUH_CONFIGURATION_CACHE_TIME;
const WAZUH_API_RESERVED_ID_LOWER_THAN = 100;
exports.WAZUH_API_RESERVED_ID_LOWER_THAN = WAZUH_API_RESERVED_ID_LOWER_THAN;
const WAZUH_API_RESERVED_WUI_SECURITY_RULES = [1, 2]; // Wazuh data path

exports.WAZUH_API_RESERVED_WUI_SECURITY_RULES = WAZUH_API_RESERVED_WUI_SECURITY_RULES;
const WAZUH_DATA_PLUGIN_PLATFORM_BASE_PATH = 'data';

const WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = _path.default.join(__dirname, '../../../', WAZUH_DATA_PLUGIN_PLATFORM_BASE_PATH);

exports.WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH;

const WAZUH_DATA_ABSOLUTE_PATH = _path.default.join(WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH, 'wazuh'); // Wazuh data path - config


exports.WAZUH_DATA_ABSOLUTE_PATH = WAZUH_DATA_ABSOLUTE_PATH;

const WAZUH_DATA_CONFIG_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_ABSOLUTE_PATH, 'config');

exports.WAZUH_DATA_CONFIG_DIRECTORY_PATH = WAZUH_DATA_CONFIG_DIRECTORY_PATH;

const WAZUH_DATA_CONFIG_APP_PATH = _path.default.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'wazuh.yml');

exports.WAZUH_DATA_CONFIG_APP_PATH = WAZUH_DATA_CONFIG_APP_PATH;

const WAZUH_DATA_CONFIG_REGISTRY_PATH = _path.default.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'wazuh-registry.json'); // Wazuh data path - logs


exports.WAZUH_DATA_CONFIG_REGISTRY_PATH = WAZUH_DATA_CONFIG_REGISTRY_PATH;
const MAX_MB_LOG_FILES = 100;
exports.MAX_MB_LOG_FILES = MAX_MB_LOG_FILES;

const WAZUH_DATA_LOGS_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_ABSOLUTE_PATH, 'logs');

exports.WAZUH_DATA_LOGS_DIRECTORY_PATH = WAZUH_DATA_LOGS_DIRECTORY_PATH;
const WAZUH_DATA_LOGS_PLAIN_FILENAME = 'wazuhapp-plain.log';
exports.WAZUH_DATA_LOGS_PLAIN_FILENAME = WAZUH_DATA_LOGS_PLAIN_FILENAME;

const WAZUH_DATA_LOGS_PLAIN_PATH = _path.default.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, WAZUH_DATA_LOGS_PLAIN_FILENAME);

exports.WAZUH_DATA_LOGS_PLAIN_PATH = WAZUH_DATA_LOGS_PLAIN_PATH;
const WAZUH_DATA_LOGS_RAW_FILENAME = 'wazuhapp.log';
exports.WAZUH_DATA_LOGS_RAW_FILENAME = WAZUH_DATA_LOGS_RAW_FILENAME;

const WAZUH_DATA_LOGS_RAW_PATH = _path.default.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, WAZUH_DATA_LOGS_RAW_FILENAME); // Wazuh data path - UI logs


exports.WAZUH_DATA_LOGS_RAW_PATH = WAZUH_DATA_LOGS_RAW_PATH;
const WAZUH_UI_LOGS_PLAIN_FILENAME = 'wazuh-ui-plain.log';
exports.WAZUH_UI_LOGS_PLAIN_FILENAME = WAZUH_UI_LOGS_PLAIN_FILENAME;
const WAZUH_UI_LOGS_RAW_FILENAME = 'wazuh-ui.log';
exports.WAZUH_UI_LOGS_RAW_FILENAME = WAZUH_UI_LOGS_RAW_FILENAME;

const WAZUH_UI_LOGS_PLAIN_PATH = _path.default.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, WAZUH_UI_LOGS_PLAIN_FILENAME);

exports.WAZUH_UI_LOGS_PLAIN_PATH = WAZUH_UI_LOGS_PLAIN_PATH;

const WAZUH_UI_LOGS_RAW_PATH = _path.default.join(WAZUH_DATA_LOGS_DIRECTORY_PATH, WAZUH_UI_LOGS_RAW_FILENAME); // Wazuh data path - downloads


exports.WAZUH_UI_LOGS_RAW_PATH = WAZUH_UI_LOGS_RAW_PATH;

const WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_ABSOLUTE_PATH, 'downloads');

exports.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH;

const WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH, 'reports'); // Queue


exports.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH;
const WAZUH_QUEUE_CRON_FREQ = '*/15 * * * * *'; // Every 15 seconds
// Wazuh errors

exports.WAZUH_QUEUE_CRON_FREQ = WAZUH_QUEUE_CRON_FREQ;
const WAZUH_ERROR_DAEMONS_NOT_READY = 'ERROR3099'; // Agents

exports.WAZUH_ERROR_DAEMONS_NOT_READY = WAZUH_ERROR_DAEMONS_NOT_READY;
let WAZUH_AGENTS_OS_TYPE;
exports.WAZUH_AGENTS_OS_TYPE = WAZUH_AGENTS_OS_TYPE;

(function (WAZUH_AGENTS_OS_TYPE) {
  WAZUH_AGENTS_OS_TYPE["WINDOWS"] = "windows";
  WAZUH_AGENTS_OS_TYPE["LINUX"] = "linux";
  WAZUH_AGENTS_OS_TYPE["SUNOS"] = "sunos";
  WAZUH_AGENTS_OS_TYPE["DARWIN"] = "darwin";
  WAZUH_AGENTS_OS_TYPE["OTHERS"] = "";
})(WAZUH_AGENTS_OS_TYPE || (exports.WAZUH_AGENTS_OS_TYPE = WAZUH_AGENTS_OS_TYPE = {}));

let WAZUH_MODULES_ID;
exports.WAZUH_MODULES_ID = WAZUH_MODULES_ID;

(function (WAZUH_MODULES_ID) {
  WAZUH_MODULES_ID["SECURITY_EVENTS"] = "general";
  WAZUH_MODULES_ID["INTEGRITY_MONITORING"] = "fim";
  WAZUH_MODULES_ID["AMAZON_WEB_SERVICES"] = "aws";
  WAZUH_MODULES_ID["OFFICE_365"] = "office";
  WAZUH_MODULES_ID["GOOGLE_CLOUD_PLATFORM"] = "gcp";
  WAZUH_MODULES_ID["POLICY_MONITORING"] = "pm";
  WAZUH_MODULES_ID["SECURITY_CONFIGURATION_ASSESSMENT"] = "sca";
  WAZUH_MODULES_ID["AUDITING"] = "audit";
  WAZUH_MODULES_ID["OPEN_SCAP"] = "oscap";
  WAZUH_MODULES_ID["VULNERABILITIES"] = "vuls";
  WAZUH_MODULES_ID["OSQUERY"] = "osquery";
  WAZUH_MODULES_ID["DOCKER"] = "docker";
  WAZUH_MODULES_ID["MITRE_ATTACK"] = "mitre";
  WAZUH_MODULES_ID["PCI_DSS"] = "pci";
  WAZUH_MODULES_ID["HIPAA"] = "hipaa";
  WAZUH_MODULES_ID["NIST_800_53"] = "nist";
  WAZUH_MODULES_ID["TSC"] = "tsc";
  WAZUH_MODULES_ID["CIS_CAT"] = "ciscat";
  WAZUH_MODULES_ID["VIRUSTOTAL"] = "virustotal";
  WAZUH_MODULES_ID["GDPR"] = "gdpr";
  WAZUH_MODULES_ID["GITHUB"] = "github";
})(WAZUH_MODULES_ID || (exports.WAZUH_MODULES_ID = WAZUH_MODULES_ID = {}));

let WAZUH_MENU_MANAGEMENT_SECTIONS_ID;
exports.WAZUH_MENU_MANAGEMENT_SECTIONS_ID = WAZUH_MENU_MANAGEMENT_SECTIONS_ID;

(function (WAZUH_MENU_MANAGEMENT_SECTIONS_ID) {
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["MANAGEMENT"] = "management";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["ADMINISTRATION"] = "administration";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["RULESET"] = "ruleset";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["RULES"] = "rules";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["DECODERS"] = "decoders";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CDB_LISTS"] = "lists";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["GROUPS"] = "groups";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CONFIGURATION"] = "configuration";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATUS_AND_REPORTS"] = "statusReports";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATUS"] = "status";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CLUSTER"] = "monitoring";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["LOGS"] = "logs";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["REPORTING"] = "reporting";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATISTICS"] = "statistics";
})(WAZUH_MENU_MANAGEMENT_SECTIONS_ID || (exports.WAZUH_MENU_MANAGEMENT_SECTIONS_ID = WAZUH_MENU_MANAGEMENT_SECTIONS_ID = {}));

let WAZUH_MENU_TOOLS_SECTIONS_ID;
exports.WAZUH_MENU_TOOLS_SECTIONS_ID = WAZUH_MENU_TOOLS_SECTIONS_ID;

(function (WAZUH_MENU_TOOLS_SECTIONS_ID) {
  WAZUH_MENU_TOOLS_SECTIONS_ID["API_CONSOLE"] = "devTools";
  WAZUH_MENU_TOOLS_SECTIONS_ID["RULESET_TEST"] = "logtest";
})(WAZUH_MENU_TOOLS_SECTIONS_ID || (exports.WAZUH_MENU_TOOLS_SECTIONS_ID = WAZUH_MENU_TOOLS_SECTIONS_ID = {}));

let WAZUH_MENU_SECURITY_SECTIONS_ID;
exports.WAZUH_MENU_SECURITY_SECTIONS_ID = WAZUH_MENU_SECURITY_SECTIONS_ID;

(function (WAZUH_MENU_SECURITY_SECTIONS_ID) {
  WAZUH_MENU_SECURITY_SECTIONS_ID["USERS"] = "users";
  WAZUH_MENU_SECURITY_SECTIONS_ID["ROLES"] = "roles";
  WAZUH_MENU_SECURITY_SECTIONS_ID["POLICIES"] = "policies";
  WAZUH_MENU_SECURITY_SECTIONS_ID["ROLES_MAPPING"] = "roleMapping";
})(WAZUH_MENU_SECURITY_SECTIONS_ID || (exports.WAZUH_MENU_SECURITY_SECTIONS_ID = WAZUH_MENU_SECURITY_SECTIONS_ID = {}));

let WAZUH_MENU_SETTINGS_SECTIONS_ID;
exports.WAZUH_MENU_SETTINGS_SECTIONS_ID = WAZUH_MENU_SETTINGS_SECTIONS_ID;

(function (WAZUH_MENU_SETTINGS_SECTIONS_ID) {
  WAZUH_MENU_SETTINGS_SECTIONS_ID["SETTINGS"] = "settings";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["API_CONFIGURATION"] = "api";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["MODULES"] = "modules";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["SAMPLE_DATA"] = "sample_data";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["CONFIGURATION"] = "configuration";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["LOGS"] = "logs";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["MISCELLANEOUS"] = "miscellaneous";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["ABOUT"] = "about";
})(WAZUH_MENU_SETTINGS_SECTIONS_ID || (exports.WAZUH_MENU_SETTINGS_SECTIONS_ID = WAZUH_MENU_SETTINGS_SECTIONS_ID = {}));

const AUTHORIZED_AGENTS = 'authorized-agents'; // Wazuh links

exports.AUTHORIZED_AGENTS = AUTHORIZED_AGENTS;
const WAZUH_LINK_GITHUB = 'https://github.com/wazuh';
exports.WAZUH_LINK_GITHUB = WAZUH_LINK_GITHUB;
const WAZUH_LINK_GOOGLE_GROUPS = 'https://groups.google.com/forum/#!forum/wazuh';
exports.WAZUH_LINK_GOOGLE_GROUPS = WAZUH_LINK_GOOGLE_GROUPS;
const WAZUH_LINK_SLACK = 'https://wazuh.com/community/join-us-on-slack';
exports.WAZUH_LINK_SLACK = WAZUH_LINK_SLACK;
const HEALTH_CHECK = 'health-check'; // Health check

exports.HEALTH_CHECK = HEALTH_CHECK;
const HEALTH_CHECK_REDIRECTION_TIME = 300; //ms
// Plugin platform settings
// Default timeFilter set by the app

exports.HEALTH_CHECK_REDIRECTION_TIME = HEALTH_CHECK_REDIRECTION_TIME;
const WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = {
  from: 'now-24h',
  to: 'now'
};
exports.WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER;
const PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = 'timepicker:timeDefaults'; // Default maxBuckets set by the app

exports.PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER;
const WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = 200000;
exports.WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS;
const PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = 'timeline:max_buckets'; // Default metaFields set by the app

exports.PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS;
const WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = ['_source', '_index'];
exports.WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS;
const PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = 'metaFields'; // Logger

exports.PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS;
const UI_LOGGER_LEVELS = {
  WARNING: 'WARNING',
  INFO: 'INFO',
  ERROR: 'ERROR'
};
exports.UI_LOGGER_LEVELS = UI_LOGGER_LEVELS;
const UI_TOAST_COLOR = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger'
}; // Assets

exports.UI_TOAST_COLOR = UI_TOAST_COLOR;
const ASSETS_BASE_URL_PREFIX = '/plugins/wazuh/assets/';
exports.ASSETS_BASE_URL_PREFIX = ASSETS_BASE_URL_PREFIX;
const ASSETS_PUBLIC_URL = '/plugins/wazuh/public/assets/'; // Reports

exports.ASSETS_PUBLIC_URL = ASSETS_PUBLIC_URL;
const REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = 'images/logo_reports.png';
exports.REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH;
const REPORTS_PRIMARY_COLOR = '#256BD1';
exports.REPORTS_PRIMARY_COLOR = REPORTS_PRIMARY_COLOR;
const REPORTS_PAGE_FOOTER_TEXT = 'Copyright © 2023 Wazuh, Inc.';
exports.REPORTS_PAGE_FOOTER_TEXT = REPORTS_PAGE_FOOTER_TEXT;
const REPORTS_PAGE_HEADER_TEXT = 'info@wazuh.com\nhttps://wazuh.com'; // Plugin platform

exports.REPORTS_PAGE_HEADER_TEXT = REPORTS_PAGE_HEADER_TEXT;
const PLUGIN_PLATFORM_NAME = 'Wazuh dashboard';
exports.PLUGIN_PLATFORM_NAME = PLUGIN_PLATFORM_NAME;
const PLUGIN_PLATFORM_BASE_INSTALLATION_PATH = '/usr/share/wazuh-dashboard/data/wazuh/';
exports.PLUGIN_PLATFORM_BASE_INSTALLATION_PATH = PLUGIN_PLATFORM_BASE_INSTALLATION_PATH;
const PLUGIN_PLATFORM_INSTALLATION_USER = 'wazuh-dashboard';
exports.PLUGIN_PLATFORM_INSTALLATION_USER = PLUGIN_PLATFORM_INSTALLATION_USER;
const PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = 'wazuh-dashboard';
exports.PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = PLUGIN_PLATFORM_INSTALLATION_USER_GROUP;
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = 'upgrade-guide';
exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM;
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = 'user-manual/wazuh-dashboard/troubleshooting.html';
exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING;
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = 'user-manual/wazuh-dashboard/config-file.html';
exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION;
const PLUGIN_PLATFORM_URL_GUIDE = 'https://opensearch.org/docs/2.8/about';
exports.PLUGIN_PLATFORM_URL_GUIDE = PLUGIN_PLATFORM_URL_GUIDE;
const PLUGIN_PLATFORM_URL_GUIDE_TITLE = 'OpenSearch guide';
exports.PLUGIN_PLATFORM_URL_GUIDE_TITLE = PLUGIN_PLATFORM_URL_GUIDE_TITLE;
const PLUGIN_PLATFORM_REQUEST_HEADERS = {
  'osd-xsrf': 'kibana'
}; // Plugin app

exports.PLUGIN_PLATFORM_REQUEST_HEADERS = PLUGIN_PLATFORM_REQUEST_HEADERS;
const PLUGIN_APP_NAME = 'Wazuh dashboard'; // UI

exports.PLUGIN_APP_NAME = PLUGIN_APP_NAME;
const API_NAME_AGENT_STATUS = {
  ACTIVE: 'active',
  DISCONNECTED: 'disconnected',
  PENDING: 'pending',
  NEVER_CONNECTED: 'never_connected'
};
exports.API_NAME_AGENT_STATUS = API_NAME_AGENT_STATUS;
const UI_COLOR_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: '#007871',
  [API_NAME_AGENT_STATUS.DISCONNECTED]: '#BD271E',
  [API_NAME_AGENT_STATUS.PENDING]: '#FEC514',
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: '#646A77',
  default: '#000000'
};
exports.UI_COLOR_AGENT_STATUS = UI_COLOR_AGENT_STATUS;
const UI_LABEL_NAME_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: 'Active',
  [API_NAME_AGENT_STATUS.DISCONNECTED]: 'Disconnected',
  [API_NAME_AGENT_STATUS.PENDING]: 'Pending',
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: 'Never connected',
  default: 'Unknown'
};
exports.UI_LABEL_NAME_AGENT_STATUS = UI_LABEL_NAME_AGENT_STATUS;
const UI_ORDER_AGENT_STATUS = [API_NAME_AGENT_STATUS.ACTIVE, API_NAME_AGENT_STATUS.DISCONNECTED, API_NAME_AGENT_STATUS.PENDING, API_NAME_AGENT_STATUS.NEVER_CONNECTED];
exports.UI_ORDER_AGENT_STATUS = UI_ORDER_AGENT_STATUS;
const AGENT_SYNCED_STATUS = {
  SYNCED: 'synced',
  NOT_SYNCED: 'not synced'
}; // The status code can be seen here https://github.com/wazuh/wazuh/blob/686068a1f05d806b2e3b3d633a765320ae7ae114/src/wazuh_db/wdb.h#L55-L61

exports.AGENT_SYNCED_STATUS = AGENT_SYNCED_STATUS;
const AGENT_STATUS_CODE = [{
  STATUS_CODE: 0,
  STATUS_DESCRIPTION: 'Agent is connected'
}, {
  STATUS_CODE: 1,
  STATUS_DESCRIPTION: 'Invalid agent version'
}, {
  STATUS_CODE: 2,
  STATUS_DESCRIPTION: 'Error retrieving version'
}, {
  STATUS_CODE: 3,
  STATUS_DESCRIPTION: 'Shutdown message received'
}, {
  STATUS_CODE: 4,
  STATUS_DESCRIPTION: 'Disconnected because no keepalive received'
}, {
  STATUS_CODE: 5,
  STATUS_DESCRIPTION: 'Connection reset by manager'
}]; // Documentation

exports.AGENT_STATUS_CODE = AGENT_STATUS_CODE;
const DOCUMENTATION_WEB_BASE_URL = 'https://documentation.wazuh.com'; // Default Elasticsearch user name context

exports.DOCUMENTATION_WEB_BASE_URL = DOCUMENTATION_WEB_BASE_URL;
const ELASTIC_NAME = 'elastic'; // Default Wazuh indexer name

exports.ELASTIC_NAME = ELASTIC_NAME;
const WAZUH_INDEXER_NAME = 'Wazuh indexer'; // Customization

exports.WAZUH_INDEXER_NAME = WAZUH_INDEXER_NAME;
const CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = 1048576; // Plugin settings

exports.CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES;
let SettingCategory;
exports.SettingCategory = SettingCategory;

(function (SettingCategory) {
  SettingCategory[SettingCategory["GENERAL"] = 0] = "GENERAL";
  SettingCategory[SettingCategory["HEALTH_CHECK"] = 1] = "HEALTH_CHECK";
  SettingCategory[SettingCategory["EXTENSIONS"] = 2] = "EXTENSIONS";
  SettingCategory[SettingCategory["MONITORING"] = 3] = "MONITORING";
  SettingCategory[SettingCategory["STATISTICS"] = 4] = "STATISTICS";
  SettingCategory[SettingCategory["SECURITY"] = 5] = "SECURITY";
  SettingCategory[SettingCategory["CUSTOMIZATION"] = 6] = "CUSTOMIZATION";
})(SettingCategory || (exports.SettingCategory = SettingCategory = {}));

let EpluginSettingType;
exports.EpluginSettingType = EpluginSettingType;

(function (EpluginSettingType) {
  EpluginSettingType["text"] = "text";
  EpluginSettingType["textarea"] = "textarea";
  EpluginSettingType["switch"] = "switch";
  EpluginSettingType["number"] = "number";
  EpluginSettingType["editor"] = "editor";
  EpluginSettingType["select"] = "select";
  EpluginSettingType["filepicker"] = "filepicker";
})(EpluginSettingType || (exports.EpluginSettingType = EpluginSettingType = {}));

const PLUGIN_SETTINGS_CATEGORIES = {
  [SettingCategory.HEALTH_CHECK]: {
    title: 'Health check',
    description: "Checks will be executed by the app's Healthcheck.",
    renderOrder: SettingCategory.HEALTH_CHECK
  },
  [SettingCategory.GENERAL]: {
    title: 'General',
    description: 'Basic app settings related to alerts index pattern, hide the manager alerts in the dashboards, logs level and more.',
    renderOrder: SettingCategory.GENERAL
  },
  [SettingCategory.EXTENSIONS]: {
    title: 'Initial display state of the modules of the new API host entries.',
    description: 'Extensions.'
  },
  [SettingCategory.SECURITY]: {
    title: 'Security',
    description: 'Application security options such as unauthorized roles.',
    renderOrder: SettingCategory.SECURITY
  },
  [SettingCategory.MONITORING]: {
    title: 'Task:Monitoring',
    description: 'Options related to the agent status monitoring job and its storage in indexes.',
    renderOrder: SettingCategory.MONITORING
  },
  [SettingCategory.STATISTICS]: {
    title: 'Task:Statistics',
    description: 'Options related to the daemons manager monitoring job and their storage in indexes.',
    renderOrder: SettingCategory.STATISTICS
  },
  [SettingCategory.CUSTOMIZATION]: {
    title: 'Custom branding',
    description: 'If you want to use custom branding elements such as logos, you can do so by editing the settings below.',
    documentationLink: 'user-manual/wazuh-dashboard/white-labeling.html',
    renderOrder: SettingCategory.CUSTOMIZATION
  }
};
exports.PLUGIN_SETTINGS_CATEGORIES = PLUGIN_SETTINGS_CATEGORIES;
const PLUGIN_SETTINGS = {
  'alerts.sample.prefix': {
    title: 'Sample alerts prefix',
    description: 'Define the index name prefix of sample alerts. It must match the template used by the index pattern to avoid unknown fields in dashboards.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_SAMPLE_ALERT_PREFIX,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*')),
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'checks.api': {
    title: 'API connection',
    description: 'Enable or disable the API health check when opening the app.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.fields': {
    title: 'Known fields',
    description: 'Enable or disable the known fields health check when opening the app.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.maxBuckets': {
    title: 'Set max buckets to 200000',
    description: 'Change the default value of the plugin platform max buckets configuration.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.metaFields': {
    title: 'Remove meta fields',
    description: 'Change the default value of the plugin platform metaField configuration.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.pattern': {
    title: 'Index pattern',
    description: 'Enable or disable the index pattern health check when opening the app.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.setup': {
    title: 'API version',
    description: 'Enable or disable the setup health check when opening the app.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.template': {
    title: 'Index template',
    description: 'Enable or disable the template health check when opening the app.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'checks.timeFilter': {
    title: 'Set time filter to 24h',
    description: 'Change the default value of the plugin platform timeFilter configuration.',
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'cron.prefix': {
    title: 'Cron prefix',
    description: 'Define the index prefix of predefined jobs.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_PREFIX,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*')),
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'cron.statistics.apis': {
    title: 'Includes APIs',
    description: 'Enter the ID of the hosts you want to save data from, leave this empty to run the task on every host.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.editor,
    defaultValue: [],
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      editor: {
        language: 'json'
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return JSON.stringify(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    },
    validate: _settingsValidator.SettingsValidator.json(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.array(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces)))),
    validateBackend: function (schema) {
      return schema.arrayOf(schema.string({
        validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces)
      }));
    }
  },
  'cron.statistics.index.creation': {
    title: 'Index creation',
    description: 'Define the interval in which a new index will be created.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.select,
    options: {
      select: [{
        text: 'Hourly',
        value: 'h'
      }, {
        text: 'Daily',
        value: 'd'
      }, {
        text: 'Weekly',
        value: 'w'
      }, {
        text: 'Monthly',
        value: 'm'
      }]
    },
    defaultValue: WAZUH_STATISTICS_DEFAULT_CREATION,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    validate: function (value) {
      return _settingsValidator.SettingsValidator.literal(this.options.select.map(({
        value
      }) => value))(value);
    },
    validateBackend: function (schema) {
      return schema.oneOf(this.options.select.map(({
        value
      }) => schema.literal(value)));
    }
  },
  'cron.statistics.index.name': {
    title: 'Index name',
    description: 'Define the name of the index in which the documents will be saved.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_NAME,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*')),
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'cron.statistics.index.replicas': {
    title: 'Index replicas',
    description: 'Define the number of replicas to use for the statistics indices.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 0,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  },
  'cron.statistics.index.shards': {
    title: 'Index shards',
    description: 'Define the number of shards to use for the statistics indices.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 1,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  },
  'cron.statistics.interval': {
    title: 'Interval',
    description: 'Define the frequency of task execution using cron schedule expressions.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_CRON_FREQ,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRestartingPluginPlatform: true,
    validate: function (value) {
      return (0, _nodeCron.validate)(value) ? undefined : 'Interval is not valid.';
    },
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'cron.statistics.status': {
    title: 'Status',
    description: 'Enable or disable the statistics tasks.',
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.switch,
    defaultValue: WAZUH_STATISTICS_DEFAULT_STATUS,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'customization.enabled': {
    title: 'Status',
    description: 'Enable or disable the customization.',
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresReloadingBrowserTab: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'customization.logo.app': {
    title: 'App main logo',
    description: `This logo is used in the app main menu, at the top left corner.`,
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png', '.svg'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 300,
            height: 70,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.app',
          resolveStaticURL: filename => `custom/images/${filename}?v=${Date.now()}` // ?v=${Date.now()} is used to force the browser to reload the image when a new file is uploaded

        }
      }
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({ ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.logo.healthcheck': {
    title: 'Healthcheck logo',
    description: `This logo is displayed during the Healthcheck routine of the app.`,
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png', '.svg'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 300,
            height: 70,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.healthcheck',
          resolveStaticURL: filename => `custom/images/${filename}?v=${Date.now()}` // ?v=${Date.now()} is used to force the browser to reload the image when a new file is uploaded

        }
      }
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({ ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.logo.reports': {
    title: 'PDF reports logo',
    description: `This logo is used in the PDF reports generated by the app. It's placed at the top left corner of every page of the PDF.`,
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 190,
            height: 40,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.reports',
          resolveStaticURL: filename => `custom/images/${filename}`
        }
      }
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({ ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.logo.sidebar': {
    title: 'Navigation drawer logo',
    description: `This is the logo for the app to display in the platform's navigation drawer, this is, the main sidebar collapsible menu.`,
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresReloadingBrowserTab: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png', '.svg'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 80,
            height: 80,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.sidebar',
          resolveStaticURL: filename => `custom/images/${filename}?v=${Date.now()}` // ?v=${Date.now()} is used to force the browser to reload the image when a new file is uploaded

        }
      }
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({ ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.reports.footer': {
    title: 'Reports footer',
    description: 'Set the footer of the reports.',
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.textarea,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_PAGE_FOOTER_TEXT,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      maxRows: 2,
      maxLength: 50
    },
    validate: function (value) {
      var _this$options, _this$options2;

      return _settingsValidator.SettingsValidator.multipleLinesString({
        maxRows: (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.maxRows,
        maxLength: (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.maxLength
      })(value);
    },
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate.bind(this)
      });
    }
  },
  'customization.reports.header': {
    title: 'Reports header',
    description: 'Set the header of the reports.',
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.textarea,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_PAGE_HEADER_TEXT,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      maxRows: 3,
      maxLength: 40
    },
    validate: function (value) {
      var _this$options3, _this$options4;

      return _settingsValidator.SettingsValidator.multipleLinesString({
        maxRows: (_this$options3 = this.options) === null || _this$options3 === void 0 ? void 0 : _this$options3.maxRows,
        maxLength: (_this$options4 = this.options) === null || _this$options4 === void 0 ? void 0 : _this$options4.maxLength
      })(value);
    },
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate.bind(this)
      });
    }
  },
  disabled_roles: {
    title: 'Disable roles',
    description: 'Disabled the plugin visibility for users with the roles.',
    category: SettingCategory.SECURITY,
    type: EpluginSettingType.editor,
    defaultValue: [],
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      editor: {
        language: 'json'
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return JSON.stringify(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    },
    validate: _settingsValidator.SettingsValidator.json(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.array(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces)))),
    validateBackend: function (schema) {
      return schema.arrayOf(schema.string({
        validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces)
      }));
    }
  },
  'enrollment.dns': {
    title: 'Enrollment DNS',
    description: 'Specifies the Wazuh registration server, used for the agent enrollment.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: '',
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    validate: _settingsValidator.SettingsValidator.hasNoSpaces,
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'enrollment.password': {
    title: 'Enrollment password',
    description: 'Specifies the password used to authenticate during the agent enrollment.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: '',
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    validate: _settingsValidator.SettingsValidator.isNotEmptyString,
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  'extensions.audit': {
    title: 'System auditing',
    description: 'Enable or disable the Audit tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.aws': {
    title: 'Amazon AWS',
    description: 'Enable or disable the Amazon (AWS) tab on Overview.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.ciscat': {
    title: 'CIS-CAT',
    description: 'Enable or disable the CIS-CAT tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.docker': {
    title: 'Docker listener',
    description: 'Enable or disable the Docker listener tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.gcp': {
    title: 'Google Cloud platform',
    description: 'Enable or disable the Google Cloud Platform tab on Overview.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.gdpr': {
    title: 'GDPR',
    description: 'Enable or disable the GDPR tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.github': {
    title: 'GitHub',
    description: 'Enable or disable the GitHub tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.hipaa': {
    title: 'HIPAA',
    description: 'Enable or disable the HIPAA tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.nist': {
    title: 'NIST',
    description: 'Enable or disable the NIST 800-53 tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.office': {
    title: 'Office 365',
    description: 'Enable or disable the Office 365 tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.oscap': {
    title: 'OSCAP',
    description: 'Enable or disable the Open SCAP tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.osquery': {
    title: 'Osquery',
    description: 'Enable or disable the Osquery tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.pci': {
    title: 'PCI DSS',
    description: 'Enable or disable the PCI DSS tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.tsc': {
    title: 'TSC',
    description: 'Enable or disable the TSC tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'extensions.virustotal': {
    title: 'Virustotal',
    description: 'Enable or disable the VirusTotal tab on Overview and Agents.',
    category: SettingCategory.EXTENSIONS,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  hideManagerAlerts: {
    title: 'Hide manager alerts',
    description: 'Hide the alerts of the manager in every dashboard.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresReloadingBrowserTab: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'ip.ignore': {
    title: 'Index pattern ignore',
    description: 'Disable certain index pattern names from being available in index pattern selector.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.editor,
    defaultValue: [],
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      editor: {
        language: 'json'
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return JSON.stringify(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    },
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.json(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.array(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))))),
    validateBackend: function (schema) {
      return schema.arrayOf(schema.string({
        validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))
      }));
    }
  },
  'ip.selector': {
    title: 'IP selector',
    description: 'Define if the user is allowed to change the selected index pattern directly from the top menu bar.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromFile: true,
    isConfigurableFromUI: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'logs.level': {
    title: 'Log level',
    description: 'Logging level of the App.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.select,
    options: {
      select: [{
        text: 'Info',
        value: 'info'
      }, {
        text: 'Debug',
        value: 'debug'
      }]
    },
    defaultValue: 'info',
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRestartingPluginPlatform: true,
    validate: function (value) {
      return _settingsValidator.SettingsValidator.literal(this.options.select.map(({
        value
      }) => value))(value);
    },
    validateBackend: function (schema) {
      return schema.oneOf(this.options.select.map(({
        value
      }) => schema.literal(value)));
    }
  },
  pattern: {
    title: 'Index pattern',
    description: "Default index pattern to use on the app. If there's no valid index pattern, the app will automatically create one with the name indicated in this option.",
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_ALERTS_PATTERN,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#')),
    validateBackend: function (schema) {
      return schema.string({
        validate: this.validate
      });
    }
  },
  timeout: {
    title: 'Request timeout',
    description: 'Maximum time, in milliseconds, the app will wait for an API response when making requests to it. It will be ignored if the value is set under 1500 milliseconds.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.number,
    defaultValue: 20000,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    options: {
      number: {
        min: 1500,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  },
  'wazuh.monitoring.creation': {
    title: 'Index creation',
    description: 'Define the interval in which a new wazuh-monitoring index will be created.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.select,
    options: {
      select: [{
        text: 'Hourly',
        value: 'h'
      }, {
        text: 'Daily',
        value: 'd'
      }, {
        text: 'Weekly',
        value: 'w'
      }, {
        text: 'Monthly',
        value: 'm'
      }]
    },
    defaultValue: WAZUH_MONITORING_DEFAULT_CREATION,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    validate: function (value) {
      return _settingsValidator.SettingsValidator.literal(this.options.select.map(({
        value
      }) => value))(value);
    },
    validateBackend: function (schema) {
      return schema.oneOf(this.options.select.map(({
        value
      }) => schema.literal(value)));
    }
  },
  'wazuh.monitoring.enabled': {
    title: 'Status',
    description: 'Enable or disable the wazuh-monitoring index creation and/or visualization.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.switch,
    defaultValue: WAZUH_MONITORING_DEFAULT_ENABLED,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRestartingPluginPlatform: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean,
    validateBackend: function (schema) {
      return schema.boolean();
    }
  },
  'wazuh.monitoring.frequency': {
    title: 'Frequency',
    description: 'Frequency, in seconds, of API requests to get the state of the agents and create a new document in the wazuh-monitoring index with this data.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_FREQUENCY,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRestartingPluginPlatform: true,
    options: {
      number: {
        min: 60,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  },
  'wazuh.monitoring.pattern': {
    title: 'Index pattern',
    description: 'Default index pattern to use for Wazuh monitoring.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_MONITORING_PATTERN,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#')),
    validateBackend: function (schema) {
      return schema.string({
        minLength: 1,
        validate: this.validate
      });
    }
  },
  'wazuh.monitoring.replicas': {
    title: 'Index replicas',
    description: 'Define the number of replicas to use for the wazuh-monitoring-* indices.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 0,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  },
  'wazuh.monitoring.shards': {
    title: 'Index shards',
    description: 'Define the number of shards to use for the wazuh-monitoring-* indices.',
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_INDICES_SHARDS,
    isConfigurableFromFile: true,
    isConfigurableFromUI: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 1,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    },
    validateBackend: function (schema) {
      return schema.number({
        validate: this.validate.bind(this)
      });
    }
  }
};
exports.PLUGIN_SETTINGS = PLUGIN_SETTINGS;
let HTTP_STATUS_CODES; // Module Security configuration assessment

exports.HTTP_STATUS_CODES = HTTP_STATUS_CODES;

(function (HTTP_STATUS_CODES) {
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CONTINUE"] = 100] = "CONTINUE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PROCESSING"] = 102] = "PROCESSING";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["OK"] = 200] = "OK";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CREATED"] = 201] = "CREATED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["ACCEPTED"] = 202] = "ACCEPTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NO_CONTENT"] = 204] = "NO_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MULTI_STATUS"] = 207] = "MULTI_STATUS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MOVED_TEMPORARILY"] = 302] = "MOVED_TEMPORARILY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SEE_OTHER"] = 303] = "SEE_OTHER";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["USE_PROXY"] = 305] = "USE_PROXY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["FORBIDDEN"] = 403] = "FORBIDDEN";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CONFLICT"] = 409] = "CONFLICT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["GONE"] = 410] = "GONE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_TOO_LONG"] = 413] = "REQUEST_TOO_LONG";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INSUFFICIENT_SPACE_ON_RESOURCE"] = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["METHOD_FAILURE"] = 420] = "METHOD_FAILURE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["LOCKED"] = 423] = "LOCKED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HTTP_STATUS_CODES || (exports.HTTP_STATUS_CODES = HTTP_STATUS_CODES = {}));

const MODULE_SCA_CHECK_RESULT_LABEL = {
  passed: 'Passed',
  failed: 'Failed',
  'not applicable': 'Not applicable'
}; // Search bar
// This limits the results in the API request

exports.MODULE_SCA_CHECK_RESULT_LABEL = MODULE_SCA_CHECK_RESULT_LABEL;
const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = 30; // This limits the suggestions for the token of type value displayed in the search bar

exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT;
const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = 10;
/* Time in milliseconds to debounce the analysis of search bar. This mitigates some problems related
to changes running in parallel */

exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT;
const SEARCH_BAR_DEBOUNCE_UPDATE_TIME = 400;
exports.SEARCH_BAR_DEBOUNCE_UPDATE_TIME = SEARCH_BAR_DEBOUNCE_UPDATE_TIME;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy50cyJdLCJuYW1lcyI6WyJQTFVHSU5fVkVSU0lPTiIsInZlcnNpb24iLCJQTFVHSU5fVkVSU0lPTl9TSE9SVCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiIsIldBWlVIX0lOREVYX1RZUEVfQUxFUlRTIiwiV0FaVUhfQUxFUlRTX1BSRUZJWCIsIldBWlVIX0FMRVJUU19QQVRURVJOIiwiV0FaVUhfSU5ERVhfVFlQRV9NT05JVE9SSU5HIiwiV0FaVUhfTU9OSVRPUklOR19QUkVGSVgiLCJXQVpVSF9NT05JVE9SSU5HX1BBVFRFUk4iLCJXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUUiLCJXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMiLCJXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUkVBVElPTiIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9FTkFCTEVEIiwiV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0ZSRVFVRU5DWSIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUk9OX0ZSRVEiLCJXQVpVSF9JTkRFWF9UWVBFX1NUQVRJU1RJQ1MiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfUFJFRklYIiwiV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUUiLCJXQVpVSF9TVEFUSVNUSUNTX1BBVFRFUk4iLCJXQVpVSF9TVEFUSVNUSUNTX1RFTVBMQVRFX05BTUUiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyIsIldBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9DUkVBVElPTiIsIldBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9TVEFUVVMiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfRlJFUVVFTkNZIiwiV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX0NST05fRlJFUSIsIldBWlVIX1BMVUdJTl9QTEFURk9STV9URU1QTEFURV9OQU1FIiwiV0FaVUhfUk9MRV9BRE1JTklTVFJBVE9SX0lEIiwiV0FaVUhfUk9MRV9BRE1JTklTVFJBVE9SX05BTUUiLCJXQVpVSF9TQU1QTEVfQUxFUlRfUFJFRklYIiwiV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9TSEFSRFMiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1JFUExJQ0FTIiwiV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SWV9TRUNVUklUWSIsIldBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfQVVESVRJTkdfUE9MSUNZX01PTklUT1JJTkciLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX1RIUkVBVF9ERVRFQ1RJT04iLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0RFRkFVTFRfTlVNQkVSX0FMRVJUUyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUklFU19UWVBFX0FMRVJUUyIsInN5c2NoZWNrIiwiYXdzIiwib2ZmaWNlIiwiZ2NwIiwiYXV0aGVudGljYXRpb24iLCJzc2giLCJhcGFjaGUiLCJhbGVydHMiLCJ3ZWIiLCJ3aW5kb3dzIiwic2VydmljZV9jb250cm9sX21hbmFnZXIiLCJnaXRodWIiLCJyb290Y2hlY2siLCJhdWRpdCIsIm9wZW5zY2FwIiwiY2lzY2F0IiwidnVsbmVyYWJpbGl0aWVzIiwidmlydXN0b3RhbCIsIm9zcXVlcnkiLCJkb2NrZXIiLCJtaXRyZSIsIldBWlVIX1NFQ1VSSVRZX1BMVUdJTl9PUEVOU0VBUkNIX0RBU0hCT0FSRFNfU0VDVVJJVFkiLCJXQVpVSF9TRUNVUklUWV9QTFVHSU5TIiwiV0FaVUhfQ09ORklHVVJBVElPTl9DQUNIRV9USU1FIiwiV0FaVUhfQVBJX1JFU0VSVkVEX0lEX0xPV0VSX1RIQU4iLCJXQVpVSF9BUElfUkVTRVJWRURfV1VJX1NFQ1VSSVRZX1JVTEVTIiwiV0FaVUhfREFUQV9QTFVHSU5fUExBVEZPUk1fQkFTRV9QQVRIIiwiV0FaVUhfREFUQV9QTFVHSU5fUExBVEZPUk1fQkFTRV9BQlNPTFVURV9QQVRIIiwicGF0aCIsIl9fZGlybmFtZSIsIldBWlVIX0RBVEFfQUJTT0xVVEVfUEFUSCIsIldBWlVIX0RBVEFfQ09ORklHX0RJUkVDVE9SWV9QQVRIIiwiV0FaVUhfREFUQV9DT05GSUdfQVBQX1BBVEgiLCJXQVpVSF9EQVRBX0NPTkZJR19SRUdJU1RSWV9QQVRIIiwiTUFYX01CX0xPR19GSUxFUyIsIldBWlVIX0RBVEFfTE9HU19ESVJFQ1RPUllfUEFUSCIsIldBWlVIX0RBVEFfTE9HU19QTEFJTl9GSUxFTkFNRSIsIldBWlVIX0RBVEFfTE9HU19QTEFJTl9QQVRIIiwiV0FaVUhfREFUQV9MT0dTX1JBV19GSUxFTkFNRSIsIldBWlVIX0RBVEFfTE9HU19SQVdfUEFUSCIsIldBWlVIX1VJX0xPR1NfUExBSU5fRklMRU5BTUUiLCJXQVpVSF9VSV9MT0dTX1JBV19GSUxFTkFNRSIsIldBWlVIX1VJX0xPR1NfUExBSU5fUEFUSCIsIldBWlVIX1VJX0xPR1NfUkFXX1BBVEgiLCJXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCIsIldBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgiLCJXQVpVSF9RVUVVRV9DUk9OX0ZSRVEiLCJXQVpVSF9FUlJPUl9EQUVNT05TX05PVF9SRUFEWSIsIldBWlVIX0FHRU5UU19PU19UWVBFIiwiV0FaVUhfTU9EVUxFU19JRCIsIldBWlVIX01FTlVfTUFOQUdFTUVOVF9TRUNUSU9OU19JRCIsIldBWlVIX01FTlVfVE9PTFNfU0VDVElPTlNfSUQiLCJXQVpVSF9NRU5VX1NFQ1VSSVRZX1NFQ1RJT05TX0lEIiwiV0FaVUhfTUVOVV9TRVRUSU5HU19TRUNUSU9OU19JRCIsIkFVVEhPUklaRURfQUdFTlRTIiwiV0FaVUhfTElOS19HSVRIVUIiLCJXQVpVSF9MSU5LX0dPT0dMRV9HUk9VUFMiLCJXQVpVSF9MSU5LX1NMQUNLIiwiSEVBTFRIX0NIRUNLIiwiSEVBTFRIX0NIRUNLX1JFRElSRUNUSU9OX1RJTUUiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19USU1FX0ZJTFRFUiIsImZyb20iLCJ0byIsIlBMVUdJTl9QTEFURk9STV9TRVRUSU5HX05BTUVfVElNRV9GSUxURVIiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19NQVhfQlVDS0VUUyIsIlBMVUdJTl9QTEFURk9STV9TRVRUSU5HX05BTUVfTUFYX0JVQ0tFVFMiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19NRVRBRklFTERTIiwiUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTkFNRV9NRVRBRklFTERTIiwiVUlfTE9HR0VSX0xFVkVMUyIsIldBUk5JTkciLCJJTkZPIiwiRVJST1IiLCJVSV9UT0FTVF9DT0xPUiIsIlNVQ0NFU1MiLCJEQU5HRVIiLCJBU1NFVFNfQkFTRV9VUkxfUFJFRklYIiwiQVNTRVRTX1BVQkxJQ19VUkwiLCJSRVBPUlRTX0xPR09fSU1BR0VfQVNTRVRTX1JFTEFUSVZFX1BBVEgiLCJSRVBPUlRTX1BSSU1BUllfQ09MT1IiLCJSRVBPUlRTX1BBR0VfRk9PVEVSX1RFWFQiLCJSRVBPUlRTX1BBR0VfSEVBREVSX1RFWFQiLCJQTFVHSU5fUExBVEZPUk1fTkFNRSIsIlBMVUdJTl9QTEFURk9STV9CQVNFX0lOU1RBTExBVElPTl9QQVRIIiwiUExVR0lOX1BMQVRGT1JNX0lOU1RBTExBVElPTl9VU0VSIiwiUExVR0lOX1BMQVRGT1JNX0lOU1RBTExBVElPTl9VU0VSX0dST1VQIiwiUExVR0lOX1BMQVRGT1JNX1dBWlVIX0RPQ1VNRU5UQVRJT05fVVJMX1BBVEhfVVBHUkFERV9QTEFURk9STSIsIlBMVUdJTl9QTEFURk9STV9XQVpVSF9ET0NVTUVOVEFUSU9OX1VSTF9QQVRIX1RST1VCTEVTSE9PVElORyIsIlBMVUdJTl9QTEFURk9STV9XQVpVSF9ET0NVTUVOVEFUSU9OX1VSTF9QQVRIX0FQUF9DT05GSUdVUkFUSU9OIiwiUExVR0lOX1BMQVRGT1JNX1VSTF9HVUlERSIsIlBMVUdJTl9QTEFURk9STV9VUkxfR1VJREVfVElUTEUiLCJQTFVHSU5fUExBVEZPUk1fUkVRVUVTVF9IRUFERVJTIiwiUExVR0lOX0FQUF9OQU1FIiwiQVBJX05BTUVfQUdFTlRfU1RBVFVTIiwiQUNUSVZFIiwiRElTQ09OTkVDVEVEIiwiUEVORElORyIsIk5FVkVSX0NPTk5FQ1RFRCIsIlVJX0NPTE9SX0FHRU5UX1NUQVRVUyIsImRlZmF1bHQiLCJVSV9MQUJFTF9OQU1FX0FHRU5UX1NUQVRVUyIsIlVJX09SREVSX0FHRU5UX1NUQVRVUyIsIkFHRU5UX1NZTkNFRF9TVEFUVVMiLCJTWU5DRUQiLCJOT1RfU1lOQ0VEIiwiQUdFTlRfU1RBVFVTX0NPREUiLCJTVEFUVVNfQ09ERSIsIlNUQVRVU19ERVNDUklQVElPTiIsIkRPQ1VNRU5UQVRJT05fV0VCX0JBU0VfVVJMIiwiRUxBU1RJQ19OQU1FIiwiV0FaVUhfSU5ERVhFUl9OQU1FIiwiQ1VTVE9NSVpBVElPTl9FTkRQT0lOVF9QQVlMT0FEX1VQTE9BRF9DVVNUT01fRklMRV9NQVhJTVVNX0JZVEVTIiwiU2V0dGluZ0NhdGVnb3J5IiwiRXBsdWdpblNldHRpbmdUeXBlIiwiUExVR0lOX1NFVFRJTkdTX0NBVEVHT1JJRVMiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicmVuZGVyT3JkZXIiLCJHRU5FUkFMIiwiRVhURU5TSU9OUyIsIlNFQ1VSSVRZIiwiTU9OSVRPUklORyIsIlNUQVRJU1RJQ1MiLCJDVVNUT01JWkFUSU9OIiwiZG9jdW1lbnRhdGlvbkxpbmsiLCJQTFVHSU5fU0VUVElOR1MiLCJjYXRlZ29yeSIsInR5cGUiLCJ0ZXh0IiwiZGVmYXVsdFZhbHVlIiwiaXNDb25maWd1cmFibGVGcm9tRmlsZSIsImlzQ29uZmlndXJhYmxlRnJvbVVJIiwicmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2siLCJ2YWxpZGF0ZSIsIlNldHRpbmdzVmFsaWRhdG9yIiwiY29tcG9zZSIsImlzTm90RW1wdHlTdHJpbmciLCJoYXNOb1NwYWNlcyIsIm5vU3RhcnRzV2l0aFN0cmluZyIsImhhc05vdEludmFsaWRDaGFyYWN0ZXJzIiwidmFsaWRhdGVCYWNrZW5kIiwic2NoZW1hIiwic3RyaW5nIiwic3dpdGNoIiwib3B0aW9ucyIsInZhbHVlcyIsImRpc2FibGVkIiwibGFiZWwiLCJ2YWx1ZSIsImVuYWJsZWQiLCJ1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZSIsIkJvb2xlYW4iLCJpc0Jvb2xlYW4iLCJib29sZWFuIiwiZWRpdG9yIiwibGFuZ3VhZ2UiLCJ1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwidWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlIiwicGFyc2UiLCJlcnJvciIsImpzb24iLCJhcnJheSIsImlzU3RyaW5nIiwiYXJyYXlPZiIsInNlbGVjdCIsImxpdGVyYWwiLCJtYXAiLCJvbmVPZiIsIm51bWJlciIsIm1pbiIsImludGVnZXIiLCJTdHJpbmciLCJOdW1iZXIiLCJiaW5kIiwicmVxdWlyZXNSZXN0YXJ0aW5nUGx1Z2luUGxhdGZvcm0iLCJ1bmRlZmluZWQiLCJyZXF1aXJlc1JlbG9hZGluZ0Jyb3dzZXJUYWIiLCJmaWxlcGlja2VyIiwiZmlsZSIsImV4dGVuc2lvbnMiLCJzaXplIiwibWF4Qnl0ZXMiLCJyZWNvbW1lbmRlZCIsImRpbWVuc2lvbnMiLCJ3aWR0aCIsImhlaWdodCIsInVuaXQiLCJzdG9yZSIsInJlbGF0aXZlUGF0aEZpbGVTeXN0ZW0iLCJmaWxlbmFtZSIsInJlc29sdmVTdGF0aWNVUkwiLCJEYXRlIiwibm93IiwiZmlsZVBpY2tlckZpbGVTaXplIiwibWVhbmluZ2Z1bFVuaXQiLCJmaWxlUGlja2VyU3VwcG9ydGVkRXh0ZW5zaW9ucyIsImRlZmF1bHRWYWx1ZUlmTm90U2V0IiwidGV4dGFyZWEiLCJtYXhSb3dzIiwibWF4TGVuZ3RoIiwibXVsdGlwbGVMaW5lc1N0cmluZyIsImRpc2FibGVkX3JvbGVzIiwiaGlkZU1hbmFnZXJBbGVydHMiLCJub0xpdGVyYWxTdHJpbmciLCJwYXR0ZXJuIiwidGltZW91dCIsIm1pbkxlbmd0aCIsIkhUVFBfU1RBVFVTX0NPREVTIiwiTU9EVUxFX1NDQV9DSEVDS19SRVNVTFRfTEFCRUwiLCJwYXNzZWQiLCJmYWlsZWQiLCJTRUFSQ0hfQkFSX1dRTF9WQUxVRV9TVUdHRVNUSU9OU19DT1VOVCIsIlNFQVJDSF9CQVJfV1FMX1ZBTFVFX1NVR0dFU1RJT05TX0RJU1BMQVlfQ09VTlQiLCJTRUFSQ0hfQkFSX0RFQk9VTkNFX1VQREFURV9USU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVdBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ08sTUFBTUEsY0FBYyxHQUFHQyxnQkFBdkI7OztBQUNBLE1BQU1DLG9CQUFvQixHQUFHRCxpQkFBUUUsS0FBUixDQUFjLEdBQWQsRUFBbUJDLE1BQW5CLENBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDQyxJQUFoQyxDQUFxQyxHQUFyQyxDQUE3QixDLENBRVA7Ozs7QUFDTyxNQUFNQyx1QkFBdUIsR0FBRyxRQUFoQzs7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxlQUE1Qjs7QUFDQSxNQUFNQyxvQkFBb0IsR0FBRyxnQkFBN0IsQyxDQUVQOzs7QUFDTyxNQUFNQywyQkFBMkIsR0FBRyxZQUFwQzs7QUFDQSxNQUFNQyx1QkFBdUIsR0FBRyxtQkFBaEM7O0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUcsb0JBQWpDOztBQUNBLE1BQU1DLDhCQUE4QixHQUFHLGFBQXZDOztBQUNBLE1BQU1DLHVDQUF1QyxHQUFHLENBQWhEOztBQUNBLE1BQU1DLHlDQUF5QyxHQUFHLENBQWxEOztBQUNBLE1BQU1DLGlDQUFpQyxHQUFHLEdBQTFDOztBQUNBLE1BQU1DLGdDQUFnQyxHQUFHLElBQXpDOztBQUNBLE1BQU1DLGtDQUFrQyxHQUFHLEdBQTNDOztBQUNBLE1BQU1DLGtDQUFrQyxHQUFHLGFBQTNDLEMsQ0FFUDs7O0FBQ08sTUFBTUMsMkJBQTJCLEdBQUcsWUFBcEM7O0FBQ0EsTUFBTUMsK0JBQStCLEdBQUcsT0FBeEM7O0FBQ0EsTUFBTUMsNkJBQTZCLEdBQUcsWUFBdEM7O0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUksR0FBRUYsK0JBQWdDLElBQUdDLDZCQUE4QixJQUFyRzs7QUFDQSxNQUFNRSw4QkFBOEIsR0FBSSxHQUFFSCwrQkFBZ0MsSUFBR0MsNkJBQThCLEVBQTNHOztBQUNBLE1BQU1HLHVDQUF1QyxHQUFHLENBQWhEOztBQUNBLE1BQU1DLHlDQUF5QyxHQUFHLENBQWxEOztBQUNBLE1BQU1DLGlDQUFpQyxHQUFHLEdBQTFDOztBQUNBLE1BQU1DLCtCQUErQixHQUFHLElBQXhDOztBQUNBLE1BQU1DLGtDQUFrQyxHQUFHLEdBQTNDOztBQUNBLE1BQU1DLGtDQUFrQyxHQUFHLGVBQTNDLEMsQ0FFUDs7O0FBQ08sTUFBTUMsbUNBQW1DLEdBQUcsY0FBNUMsQyxDQUVQOzs7QUFDTyxNQUFNQywyQkFBMkIsR0FBRyxDQUFwQzs7QUFDQSxNQUFNQyw2QkFBNkIsR0FBRyxlQUF0QyxDLENBRVA7OztBQUNPLE1BQU1DLHlCQUF5QixHQUFHLG1CQUFsQzs7QUFDQSxNQUFNQyxnQ0FBZ0MsR0FBRyxDQUF6Qzs7QUFDQSxNQUFNQyxrQ0FBa0MsR0FBRyxDQUEzQzs7QUFDQSxNQUFNQyxxQ0FBcUMsR0FBRyxVQUE5Qzs7QUFDQSxNQUFNQyx1REFBdUQsR0FDbEUsNEJBREs7O0FBRUEsTUFBTUMsNkNBQTZDLEdBQUcsa0JBQXREOztBQUNBLE1BQU1DLHlDQUF5QyxHQUFHLElBQWxEOztBQUNBLE1BQU1DLDBDQUEwQyxHQUFHO0FBQ3hELEdBQUNKLHFDQUFELEdBQXlDLENBQ3ZDO0FBQUVLLElBQUFBLFFBQVEsRUFBRTtBQUFaLEdBRHVDLEVBRXZDO0FBQUVDLElBQUFBLEdBQUcsRUFBRTtBQUFQLEdBRnVDLEVBR3ZDO0FBQUVDLElBQUFBLE1BQU0sRUFBRTtBQUFWLEdBSHVDLEVBSXZDO0FBQUVDLElBQUFBLEdBQUcsRUFBRTtBQUFQLEdBSnVDLEVBS3ZDO0FBQUVDLElBQUFBLGNBQWMsRUFBRTtBQUFsQixHQUx1QyxFQU12QztBQUFFQyxJQUFBQSxHQUFHLEVBQUU7QUFBUCxHQU51QyxFQU92QztBQUFFQyxJQUFBQSxNQUFNLEVBQUUsSUFBVjtBQUFnQkMsSUFBQUEsTUFBTSxFQUFFO0FBQXhCLEdBUHVDLEVBUXZDO0FBQUVDLElBQUFBLEdBQUcsRUFBRTtBQUFQLEdBUnVDLEVBU3ZDO0FBQUVDLElBQUFBLE9BQU8sRUFBRTtBQUFFQyxNQUFBQSx1QkFBdUIsRUFBRTtBQUEzQixLQUFYO0FBQThDSCxJQUFBQSxNQUFNLEVBQUU7QUFBdEQsR0FUdUMsRUFVdkM7QUFBRUksSUFBQUEsTUFBTSxFQUFFO0FBQVYsR0FWdUMsQ0FEZTtBQWF4RCxHQUFDZix1REFBRCxHQUEyRCxDQUN6RDtBQUFFZ0IsSUFBQUEsU0FBUyxFQUFFO0FBQWIsR0FEeUQsRUFFekQ7QUFBRUMsSUFBQUEsS0FBSyxFQUFFO0FBQVQsR0FGeUQsRUFHekQ7QUFBRUMsSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FIeUQsRUFJekQ7QUFBRUMsSUFBQUEsTUFBTSxFQUFFO0FBQVYsR0FKeUQsQ0FiSDtBQW1CeEQsR0FBQ2xCLDZDQUFELEdBQWlELENBQy9DO0FBQUVtQixJQUFBQSxlQUFlLEVBQUU7QUFBbkIsR0FEK0MsRUFFL0M7QUFBRUMsSUFBQUEsVUFBVSxFQUFFO0FBQWQsR0FGK0MsRUFHL0M7QUFBRUMsSUFBQUEsT0FBTyxFQUFFO0FBQVgsR0FIK0MsRUFJL0M7QUFBRUMsSUFBQUEsTUFBTSxFQUFFO0FBQVYsR0FKK0MsRUFLL0M7QUFBRUMsSUFBQUEsS0FBSyxFQUFFO0FBQVQsR0FMK0M7QUFuQk8sQ0FBbkQsQyxDQTRCUDs7O0FBQ08sTUFBTUMsb0RBQW9ELEdBQy9ELGdDQURLOztBQUdBLE1BQU1DLHNCQUFzQixHQUFHLENBQ3BDRCxvREFEb0MsQ0FBL0IsQyxDQUlQOzs7QUFDTyxNQUFNRSw4QkFBOEIsR0FBRyxLQUF2QyxDLENBQThDO0FBRXJEOzs7QUFDTyxNQUFNQyxnQ0FBZ0MsR0FBRyxHQUF6Qzs7QUFDQSxNQUFNQyxxQ0FBcUMsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQTlDLEMsQ0FFUDs7O0FBQ0EsTUFBTUMsb0NBQW9DLEdBQUcsTUFBN0M7O0FBQ08sTUFBTUMsNkNBQTZDLEdBQUdDLGNBQUtoRSxJQUFMLENBQzNEaUUsU0FEMkQsRUFFM0QsV0FGMkQsRUFHM0RILG9DQUgyRCxDQUF0RDs7OztBQUtBLE1BQU1JLHdCQUF3QixHQUFHRixjQUFLaEUsSUFBTCxDQUN0QytELDZDQURzQyxFQUV0QyxPQUZzQyxDQUFqQyxDLENBS1A7Ozs7O0FBQ08sTUFBTUksZ0NBQWdDLEdBQUdILGNBQUtoRSxJQUFMLENBQzlDa0Usd0JBRDhDLEVBRTlDLFFBRjhDLENBQXpDOzs7O0FBSUEsTUFBTUUsMEJBQTBCLEdBQUdKLGNBQUtoRSxJQUFMLENBQ3hDbUUsZ0NBRHdDLEVBRXhDLFdBRndDLENBQW5DOzs7O0FBSUEsTUFBTUUsK0JBQStCLEdBQUdMLGNBQUtoRSxJQUFMLENBQzdDbUUsZ0NBRDZDLEVBRTdDLHFCQUY2QyxDQUF4QyxDLENBS1A7Ozs7QUFDTyxNQUFNRyxnQkFBZ0IsR0FBRyxHQUF6Qjs7O0FBQ0EsTUFBTUMsOEJBQThCLEdBQUdQLGNBQUtoRSxJQUFMLENBQzVDa0Usd0JBRDRDLEVBRTVDLE1BRjRDLENBQXZDOzs7QUFJQSxNQUFNTSw4QkFBOEIsR0FBRyxvQkFBdkM7OztBQUNBLE1BQU1DLDBCQUEwQixHQUFHVCxjQUFLaEUsSUFBTCxDQUN4Q3VFLDhCQUR3QyxFQUV4Q0MsOEJBRndDLENBQW5DOzs7QUFJQSxNQUFNRSw0QkFBNEIsR0FBRyxjQUFyQzs7O0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUdYLGNBQUtoRSxJQUFMLENBQ3RDdUUsOEJBRHNDLEVBRXRDRyw0QkFGc0MsQ0FBakMsQyxDQUtQOzs7O0FBQ08sTUFBTUUsNEJBQTRCLEdBQUcsb0JBQXJDOztBQUNBLE1BQU1DLDBCQUEwQixHQUFHLGNBQW5DOzs7QUFDQSxNQUFNQyx3QkFBd0IsR0FBR2QsY0FBS2hFLElBQUwsQ0FDdEN1RSw4QkFEc0MsRUFFdENLLDRCQUZzQyxDQUFqQzs7OztBQUlBLE1BQU1HLHNCQUFzQixHQUFHZixjQUFLaEUsSUFBTCxDQUNwQ3VFLDhCQURvQyxFQUVwQ00sMEJBRm9DLENBQS9CLEMsQ0FLUDs7Ozs7QUFDTyxNQUFNRyxtQ0FBbUMsR0FBR2hCLGNBQUtoRSxJQUFMLENBQ2pEa0Usd0JBRGlELEVBRWpELFdBRmlELENBQTVDOzs7O0FBSUEsTUFBTWUsMkNBQTJDLEdBQUdqQixjQUFLaEUsSUFBTCxDQUN6RGdGLG1DQUR5RCxFQUV6RCxTQUZ5RCxDQUFwRCxDLENBS1A7Ozs7QUFDTyxNQUFNRSxxQkFBcUIsR0FBRyxnQkFBOUIsQyxDQUFnRDtBQUV2RDs7O0FBQ08sTUFBTUMsNkJBQTZCLEdBQUcsV0FBdEMsQyxDQUVQOzs7SUFDWUMsb0I7OztXQUFBQSxvQjtBQUFBQSxFQUFBQSxvQjtBQUFBQSxFQUFBQSxvQjtBQUFBQSxFQUFBQSxvQjtBQUFBQSxFQUFBQSxvQjtBQUFBQSxFQUFBQSxvQjtHQUFBQSxvQixvQ0FBQUEsb0I7O0lBUUFDLGdCOzs7V0FBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7QUFBQUEsRUFBQUEsZ0I7R0FBQUEsZ0IsZ0NBQUFBLGdCOztJQXdCQUMsaUM7OztXQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztBQUFBQSxFQUFBQSxpQztHQUFBQSxpQyxpREFBQUEsaUM7O0lBaUJBQyw0Qjs7O1dBQUFBLDRCO0FBQUFBLEVBQUFBLDRCO0FBQUFBLEVBQUFBLDRCO0dBQUFBLDRCLDRDQUFBQSw0Qjs7SUFLQUMsK0I7OztXQUFBQSwrQjtBQUFBQSxFQUFBQSwrQjtBQUFBQSxFQUFBQSwrQjtBQUFBQSxFQUFBQSwrQjtBQUFBQSxFQUFBQSwrQjtHQUFBQSwrQiwrQ0FBQUEsK0I7O0lBT0FDLCtCOzs7V0FBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7QUFBQUEsRUFBQUEsK0I7R0FBQUEsK0IsK0NBQUFBLCtCOztBQVdMLE1BQU1DLGlCQUFpQixHQUFHLG1CQUExQixDLENBRVA7OztBQUNPLE1BQU1DLGlCQUFpQixHQUFHLDBCQUExQjs7QUFDQSxNQUFNQyx3QkFBd0IsR0FDbkMsK0NBREs7O0FBRUEsTUFBTUMsZ0JBQWdCLEdBQUcsOENBQXpCOztBQUVBLE1BQU1DLFlBQVksR0FBRyxjQUFyQixDLENBRVA7OztBQUNPLE1BQU1DLDZCQUE2QixHQUFHLEdBQXRDLEMsQ0FBMkM7QUFFbEQ7QUFDQTs7O0FBQ08sTUFBTUMseUNBQXlDLEdBQUc7QUFDdkRDLEVBQUFBLElBQUksRUFBRSxTQURpRDtBQUV2REMsRUFBQUEsRUFBRSxFQUFFO0FBRm1ELENBQWxEOztBQUlBLE1BQU1DLHdDQUF3QyxHQUNuRCx5QkFESyxDLENBR1A7OztBQUNPLE1BQU1DLHlDQUF5QyxHQUFHLE1BQWxEOztBQUNBLE1BQU1DLHdDQUF3QyxHQUFHLHNCQUFqRCxDLENBRVA7OztBQUNPLE1BQU1DLHdDQUF3QyxHQUFHLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBakQ7O0FBQ0EsTUFBTUMsdUNBQXVDLEdBQUcsWUFBaEQsQyxDQUVQOzs7QUFDTyxNQUFNQyxnQkFBZ0IsR0FBRztBQUM5QkMsRUFBQUEsT0FBTyxFQUFFLFNBRHFCO0FBRTlCQyxFQUFBQSxJQUFJLEVBQUUsTUFGd0I7QUFHOUJDLEVBQUFBLEtBQUssRUFBRTtBQUh1QixDQUF6Qjs7QUFNQSxNQUFNQyxjQUFjLEdBQUc7QUFDNUJDLEVBQUFBLE9BQU8sRUFBRSxTQURtQjtBQUU1QkosRUFBQUEsT0FBTyxFQUFFLFNBRm1CO0FBRzVCSyxFQUFBQSxNQUFNLEVBQUU7QUFIb0IsQ0FBdkIsQyxDQU1QOzs7QUFDTyxNQUFNQyxzQkFBc0IsR0FBRyx3QkFBL0I7O0FBQ0EsTUFBTUMsaUJBQWlCLEdBQUcsK0JBQTFCLEMsQ0FFUDs7O0FBQ08sTUFBTUMsdUNBQXVDLEdBQ2xELHlCQURLOztBQUVBLE1BQU1DLHFCQUFxQixHQUFHLFNBQTlCOztBQUNBLE1BQU1DLHdCQUF3QixHQUFHLDhCQUFqQzs7QUFDQSxNQUFNQyx3QkFBd0IsR0FBRyxtQ0FBakMsQyxDQUVQOzs7QUFDTyxNQUFNQyxvQkFBb0IsR0FBRyxpQkFBN0I7O0FBQ0EsTUFBTUMsc0NBQXNDLEdBQ2pELHdDQURLOztBQUVBLE1BQU1DLGlDQUFpQyxHQUFHLGlCQUExQzs7QUFDQSxNQUFNQyx1Q0FBdUMsR0FBRyxpQkFBaEQ7O0FBQ0EsTUFBTUMsNkRBQTZELEdBQ3hFLGVBREs7O0FBRUEsTUFBTUMsNERBQTRELEdBQ3ZFLGtEQURLOztBQUVBLE1BQU1DLDhEQUE4RCxHQUN6RSw4Q0FESzs7QUFFQSxNQUFNQyx5QkFBeUIsR0FDcEMsdUNBREs7O0FBRUEsTUFBTUMsK0JBQStCLEdBQUcsa0JBQXhDOztBQUVBLE1BQU1DLCtCQUErQixHQUFHO0FBQzdDLGNBQVk7QUFEaUMsQ0FBeEMsQyxDQUlQOzs7QUFDTyxNQUFNQyxlQUFlLEdBQUcsaUJBQXhCLEMsQ0FFUDs7O0FBQ08sTUFBTUMscUJBQXFCLEdBQUc7QUFDbkNDLEVBQUFBLE1BQU0sRUFBRSxRQUQyQjtBQUVuQ0MsRUFBQUEsWUFBWSxFQUFFLGNBRnFCO0FBR25DQyxFQUFBQSxPQUFPLEVBQUUsU0FIMEI7QUFJbkNDLEVBQUFBLGVBQWUsRUFBRTtBQUprQixDQUE5Qjs7QUFPQSxNQUFNQyxxQkFBcUIsR0FBRztBQUNuQyxHQUFDTCxxQkFBcUIsQ0FBQ0MsTUFBdkIsR0FBZ0MsU0FERztBQUVuQyxHQUFDRCxxQkFBcUIsQ0FBQ0UsWUFBdkIsR0FBc0MsU0FGSDtBQUduQyxHQUFDRixxQkFBcUIsQ0FBQ0csT0FBdkIsR0FBaUMsU0FIRTtBQUluQyxHQUFDSCxxQkFBcUIsQ0FBQ0ksZUFBdkIsR0FBeUMsU0FKTjtBQUtuQ0UsRUFBQUEsT0FBTyxFQUFFO0FBTDBCLENBQTlCOztBQVFBLE1BQU1DLDBCQUEwQixHQUFHO0FBQ3hDLEdBQUNQLHFCQUFxQixDQUFDQyxNQUF2QixHQUFnQyxRQURRO0FBRXhDLEdBQUNELHFCQUFxQixDQUFDRSxZQUF2QixHQUFzQyxjQUZFO0FBR3hDLEdBQUNGLHFCQUFxQixDQUFDRyxPQUF2QixHQUFpQyxTQUhPO0FBSXhDLEdBQUNILHFCQUFxQixDQUFDSSxlQUF2QixHQUF5QyxpQkFKRDtBQUt4Q0UsRUFBQUEsT0FBTyxFQUFFO0FBTCtCLENBQW5DOztBQVFBLE1BQU1FLHFCQUFxQixHQUFHLENBQ25DUixxQkFBcUIsQ0FBQ0MsTUFEYSxFQUVuQ0QscUJBQXFCLENBQUNFLFlBRmEsRUFHbkNGLHFCQUFxQixDQUFDRyxPQUhhLEVBSW5DSCxxQkFBcUIsQ0FBQ0ksZUFKYSxDQUE5Qjs7QUFPQSxNQUFNSyxtQkFBbUIsR0FBRztBQUNqQ0MsRUFBQUEsTUFBTSxFQUFFLFFBRHlCO0FBRWpDQyxFQUFBQSxVQUFVLEVBQUU7QUFGcUIsQ0FBNUIsQyxDQUtQOzs7QUFFTyxNQUFNQyxpQkFBaUIsR0FBRyxDQUMvQjtBQUNFQyxFQUFBQSxXQUFXLEVBQUUsQ0FEZjtBQUVFQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUZ0QixDQUQrQixFQUsvQjtBQUNFRCxFQUFBQSxXQUFXLEVBQUUsQ0FEZjtBQUVFQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUZ0QixDQUwrQixFQVMvQjtBQUNFRCxFQUFBQSxXQUFXLEVBQUUsQ0FEZjtBQUVFQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUZ0QixDQVQrQixFQWEvQjtBQUNFRCxFQUFBQSxXQUFXLEVBQUUsQ0FEZjtBQUVFQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUZ0QixDQWIrQixFQWlCL0I7QUFDRUQsRUFBQUEsV0FBVyxFQUFFLENBRGY7QUFFRUMsRUFBQUEsa0JBQWtCLEVBQUU7QUFGdEIsQ0FqQitCLEVBcUIvQjtBQUNFRCxFQUFBQSxXQUFXLEVBQUUsQ0FEZjtBQUVFQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUZ0QixDQXJCK0IsQ0FBMUIsQyxDQTJCUDs7O0FBQ08sTUFBTUMsMEJBQTBCLEdBQUcsaUNBQW5DLEMsQ0FFUDs7O0FBQ08sTUFBTUMsWUFBWSxHQUFHLFNBQXJCLEMsQ0FFUDs7O0FBQ08sTUFBTUMsa0JBQWtCLEdBQUcsZUFBM0IsQyxDQUVQOzs7QUFDTyxNQUFNQywrREFBK0QsR0FBRyxPQUF4RSxDLENBRVA7OztJQUNZQyxlOzs7V0FBQUEsZTtBQUFBQSxFQUFBQSxlLENBQUFBLGU7QUFBQUEsRUFBQUEsZSxDQUFBQSxlO0FBQUFBLEVBQUFBLGUsQ0FBQUEsZTtBQUFBQSxFQUFBQSxlLENBQUFBLGU7QUFBQUEsRUFBQUEsZSxDQUFBQSxlO0FBQUFBLEVBQUFBLGUsQ0FBQUEsZTtBQUFBQSxFQUFBQSxlLENBQUFBLGU7R0FBQUEsZSwrQkFBQUEsZTs7SUFrRUFDLGtCOzs7V0FBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7QUFBQUEsRUFBQUEsa0I7R0FBQUEsa0Isa0NBQUFBLGtCOztBQTZETCxNQUFNQywwQkFFWixHQUFHO0FBQ0YsR0FBQ0YsZUFBZSxDQUFDckQsWUFBakIsR0FBZ0M7QUFDOUJ3RCxJQUFBQSxLQUFLLEVBQUUsY0FEdUI7QUFFOUJDLElBQUFBLFdBQVcsRUFBRSxtREFGaUI7QUFHOUJDLElBQUFBLFdBQVcsRUFBRUwsZUFBZSxDQUFDckQ7QUFIQyxHQUQ5QjtBQU1GLEdBQUNxRCxlQUFlLENBQUNNLE9BQWpCLEdBQTJCO0FBQ3pCSCxJQUFBQSxLQUFLLEVBQUUsU0FEa0I7QUFFekJDLElBQUFBLFdBQVcsRUFDVCxxSEFIdUI7QUFJekJDLElBQUFBLFdBQVcsRUFBRUwsZUFBZSxDQUFDTTtBQUpKLEdBTnpCO0FBWUYsR0FBQ04sZUFBZSxDQUFDTyxVQUFqQixHQUE4QjtBQUM1QkosSUFBQUEsS0FBSyxFQUFFLG1FQURxQjtBQUU1QkMsSUFBQUEsV0FBVyxFQUFFO0FBRmUsR0FaNUI7QUFnQkYsR0FBQ0osZUFBZSxDQUFDUSxRQUFqQixHQUE0QjtBQUMxQkwsSUFBQUEsS0FBSyxFQUFFLFVBRG1CO0FBRTFCQyxJQUFBQSxXQUFXLEVBQUUsMERBRmE7QUFHMUJDLElBQUFBLFdBQVcsRUFBRUwsZUFBZSxDQUFDUTtBQUhILEdBaEIxQjtBQXFCRixHQUFDUixlQUFlLENBQUNTLFVBQWpCLEdBQThCO0FBQzVCTixJQUFBQSxLQUFLLEVBQUUsaUJBRHFCO0FBRTVCQyxJQUFBQSxXQUFXLEVBQ1QsZ0ZBSDBCO0FBSTVCQyxJQUFBQSxXQUFXLEVBQUVMLGVBQWUsQ0FBQ1M7QUFKRCxHQXJCNUI7QUEyQkYsR0FBQ1QsZUFBZSxDQUFDVSxVQUFqQixHQUE4QjtBQUM1QlAsSUFBQUEsS0FBSyxFQUFFLGlCQURxQjtBQUU1QkMsSUFBQUEsV0FBVyxFQUNULHFGQUgwQjtBQUk1QkMsSUFBQUEsV0FBVyxFQUFFTCxlQUFlLENBQUNVO0FBSkQsR0EzQjVCO0FBaUNGLEdBQUNWLGVBQWUsQ0FBQ1csYUFBakIsR0FBaUM7QUFDL0JSLElBQUFBLEtBQUssRUFBRSxpQkFEd0I7QUFFL0JDLElBQUFBLFdBQVcsRUFDVCx5R0FINkI7QUFJL0JRLElBQUFBLGlCQUFpQixFQUFFLGlEQUpZO0FBSy9CUCxJQUFBQSxXQUFXLEVBQUVMLGVBQWUsQ0FBQ1c7QUFMRTtBQWpDL0IsQ0FGRzs7QUE0Q0EsTUFBTUUsZUFBa0QsR0FBRztBQUNoRSwwQkFBd0I7QUFDdEJWLElBQUFBLEtBQUssRUFBRSxzQkFEZTtBQUV0QkMsSUFBQUEsV0FBVyxFQUNULDRJQUhvQjtBQUl0QlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNNLE9BSko7QUFLdEJTLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUNlLElBTEg7QUFNdEJDLElBQUFBLFlBQVksRUFBRXhJLHlCQU5RO0FBT3RCeUksSUFBQUEsc0JBQXNCLEVBQUUsSUFQRjtBQVF0QkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSQTtBQVN0QkMsSUFBQUEsMEJBQTBCLEVBQUUsSUFUTjtBQVV0QjtBQUNBQyxJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQkMsT0FBbEIsQ0FDUkQscUNBQWtCRSxnQkFEVixFQUVSRixxQ0FBa0JHLFdBRlYsRUFHUkgscUNBQWtCSSxrQkFBbEIsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsRUFBK0MsR0FBL0MsRUFBb0QsR0FBcEQsQ0FIUSxFQUlSSixxQ0FBa0JLLHVCQUFsQixDQUNFLElBREYsRUFFRSxHQUZGLEVBR0UsR0FIRixFQUlFLEdBSkYsRUFLRSxHQUxGLEVBTUUsR0FORixFQU9FLEdBUEYsRUFRRSxHQVJGLEVBU0UsR0FURixFQVVFLEdBVkYsQ0FKUSxDQVhZO0FBNEJ0QkMsSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRVQsUUFBQUEsUUFBUSxFQUFFLEtBQUtBO0FBQWpCLE9BQWQsQ0FBUDtBQUNEO0FBOUJxQixHQUR3QztBQWlDaEUsZ0JBQWM7QUFDWmxCLElBQUFBLEtBQUssRUFBRSxnQkFESztBQUVaQyxJQUFBQSxXQUFXLEVBQUUsOERBRkQ7QUFHWlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNyRCxZQUhkO0FBSVpvRSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKYjtBQUtaZCxJQUFBQSxZQUFZLEVBQUUsSUFMRjtBQU1aQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5aO0FBT1pDLElBQUFBLG9CQUFvQixFQUFFLElBUFY7QUFRWmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVJHO0FBZ0JaRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJXO0FBcUJaZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJoQjtBQXNCWlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCVyxHQWpDa0Q7QUEyRGhFLG1CQUFpQjtBQUNmdEMsSUFBQUEsS0FBSyxFQUFFLGNBRFE7QUFFZkMsSUFBQUEsV0FBVyxFQUNULHVFQUhhO0FBSWZVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDckQsWUFKWDtBQUtmb0UsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BTFY7QUFNZmQsSUFBQUEsWUFBWSxFQUFFLElBTkM7QUFPZkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQVDtBQVFmQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJQO0FBU2ZhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FUTTtBQWlCZkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCYztBQXNCZmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXRCYjtBQXVCZlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXpCYyxHQTNEK0M7QUFzRmhFLHVCQUFxQjtBQUNuQnRDLElBQUFBLEtBQUssRUFBRSwyQkFEWTtBQUVuQkMsSUFBQUEsV0FBVyxFQUNULDRFQUhpQjtBQUluQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNyRCxZQUpQO0FBS25Cb0UsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BTE47QUFNbkJkLElBQUFBLFlBQVksRUFBRSxJQU5LO0FBT25CQyxJQUFBQSxzQkFBc0IsRUFBRSxJQVBMO0FBUW5CQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJIO0FBU25CYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBVFU7QUFpQm5CRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBckJrQjtBQXNCbkJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0F0QlQ7QUF1Qm5CWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBekJrQixHQXRGMkM7QUFpSGhFLHVCQUFxQjtBQUNuQnRDLElBQUFBLEtBQUssRUFBRSxvQkFEWTtBQUVuQkMsSUFBQUEsV0FBVyxFQUNULDBFQUhpQjtBQUluQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNyRCxZQUpQO0FBS25Cb0UsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BTE47QUFNbkJkLElBQUFBLFlBQVksRUFBRSxJQU5LO0FBT25CQyxJQUFBQSxzQkFBc0IsRUFBRSxJQVBMO0FBUW5CQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJIO0FBU25CYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBVFU7QUFpQm5CRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBckJrQjtBQXNCbkJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0F0QlQ7QUF1Qm5CWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBekJrQixHQWpIMkM7QUE0SWhFLG9CQUFrQjtBQUNoQnRDLElBQUFBLEtBQUssRUFBRSxlQURTO0FBRWhCQyxJQUFBQSxXQUFXLEVBQ1Qsd0VBSGM7QUFJaEJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDckQsWUFKVjtBQUtoQm9FLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUxUO0FBTWhCZCxJQUFBQSxZQUFZLEVBQUUsSUFORTtBQU9oQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQUjtBQVFoQkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSTjtBQVNoQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRPO0FBaUJoQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCZTtBQXNCaEJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0F0Qlo7QUF1QmhCWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBekJlLEdBNUk4QztBQXVLaEUsa0JBQWdCO0FBQ2R0QyxJQUFBQSxLQUFLLEVBQUUsYUFETztBQUVkQyxJQUFBQSxXQUFXLEVBQ1QsZ0VBSFk7QUFJZFUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNyRCxZQUpaO0FBS2RvRSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFMWDtBQU1kZCxJQUFBQSxZQUFZLEVBQUUsSUFOQTtBQU9kQyxJQUFBQSxzQkFBc0IsRUFBRSxJQVBWO0FBUWRDLElBQUFBLG9CQUFvQixFQUFFLElBUlI7QUFTZGEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRLO0FBaUJkRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBckJhO0FBc0JkZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJkO0FBdUJkWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBekJhLEdBdktnRDtBQWtNaEUscUJBQW1CO0FBQ2pCdEMsSUFBQUEsS0FBSyxFQUFFLGdCQURVO0FBRWpCQyxJQUFBQSxXQUFXLEVBQ1QsbUVBSGU7QUFJakJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDckQsWUFKVDtBQUtqQm9FLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUxSO0FBTWpCZCxJQUFBQSxZQUFZLEVBQUUsSUFORztBQU9qQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQUDtBQVFqQkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSTDtBQVNqQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRRO0FBaUJqQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCZ0I7QUFzQmpCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJYO0FBdUJqQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXpCZ0IsR0FsTTZDO0FBNk5oRSx1QkFBcUI7QUFDbkJ0QyxJQUFBQSxLQUFLLEVBQUUsd0JBRFk7QUFFbkJDLElBQUFBLFdBQVcsRUFDVCwyRUFIaUI7QUFJbkJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDckQsWUFKUDtBQUtuQm9FLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUxOO0FBTW5CZCxJQUFBQSxZQUFZLEVBQUUsSUFOSztBQU9uQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQTDtBQVFuQkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSSDtBQVNuQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRVO0FBaUJuQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCa0I7QUFzQm5CZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJUO0FBdUJuQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXpCa0IsR0E3TjJDO0FBd1BoRSxpQkFBZTtBQUNidEMsSUFBQUEsS0FBSyxFQUFFLGFBRE07QUFFYkMsSUFBQUEsV0FBVyxFQUFFLDZDQUZBO0FBR2JVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTSxPQUhiO0FBSWJTLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUNlLElBSlo7QUFLYkMsSUFBQUEsWUFBWSxFQUFFckosK0JBTEQ7QUFNYnNKLElBQUFBLHNCQUFzQixFQUFFLElBTlg7QUFPYkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFQVDtBQVFiO0FBQ0FFLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCQyxPQUFsQixDQUNSRCxxQ0FBa0JFLGdCQURWLEVBRVJGLHFDQUFrQkcsV0FGVixFQUdSSCxxQ0FBa0JJLGtCQUFsQixDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxFQUErQyxHQUEvQyxFQUFvRCxHQUFwRCxDQUhRLEVBSVJKLHFDQUFrQkssdUJBQWxCLENBQ0UsSUFERixFQUVFLEdBRkYsRUFHRSxHQUhGLEVBSUUsR0FKRixFQUtFLEdBTEYsRUFNRSxHQU5GLEVBT0UsR0FQRixFQVFFLEdBUkYsRUFTRSxHQVRGLEVBVUUsR0FWRixDQUpRLENBVEc7QUEwQmJDLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUVULFFBQUFBLFFBQVEsRUFBRSxLQUFLQTtBQUFqQixPQUFkLENBQVA7QUFDRDtBQTVCWSxHQXhQaUQ7QUFzUmhFLDBCQUF3QjtBQUN0QmxCLElBQUFBLEtBQUssRUFBRSxlQURlO0FBRXRCQyxJQUFBQSxXQUFXLEVBQ1QsdUdBSG9CO0FBSXRCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1UsVUFKSjtBQUt0QkssSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lDLE1BTEg7QUFNdEJ6QixJQUFBQSxZQUFZLEVBQUUsRUFOUTtBQU90QkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQRjtBQVF0QkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSQTtBQVN0QmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BVLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxRQUFRLEVBQUU7QUFESjtBQURELEtBVGE7QUFjdEJDLElBQUFBLDZDQUE2QyxFQUFFLFVBQVVSLEtBQVYsRUFBMkI7QUFDeEUsYUFBT1MsSUFBSSxDQUFDQyxTQUFMLENBQWVWLEtBQWYsQ0FBUDtBQUNELEtBaEJxQjtBQWlCdEJXLElBQUFBLDZDQUE2QyxFQUFFLFVBQzdDWCxLQUQ2QyxFQUV4QztBQUNMLFVBQUk7QUFDRixlQUFPUyxJQUFJLENBQUNHLEtBQUwsQ0FBV1osS0FBWCxDQUFQO0FBQ0QsT0FGRCxDQUVFLE9BQU9hLEtBQVAsRUFBYztBQUNkLGVBQU9iLEtBQVA7QUFDRDtBQUNGLEtBekJxQjtBQTBCdEJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCNEIsSUFBbEIsQ0FDUjVCLHFDQUFrQkMsT0FBbEIsQ0FDRUQscUNBQWtCNkIsS0FBbEIsQ0FDRTdCLHFDQUFrQkMsT0FBbEIsQ0FDRUQscUNBQWtCOEIsUUFEcEIsRUFFRTlCLHFDQUFrQkUsZ0JBRnBCLEVBR0VGLHFDQUFrQkcsV0FIcEIsQ0FERixDQURGLENBRFEsQ0ExQlk7QUFxQ3RCRyxJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUN3QixPQUFQLENBQ0x4QixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUNaVCxRQUFBQSxRQUFRLEVBQUVDLHFDQUFrQkMsT0FBbEIsQ0FDUkQscUNBQWtCRSxnQkFEVixFQUVSRixxQ0FBa0JHLFdBRlY7QUFERSxPQUFkLENBREssQ0FBUDtBQVFEO0FBOUNxQixHQXRSd0M7QUFzVWhFLG9DQUFrQztBQUNoQ3RCLElBQUFBLEtBQUssRUFBRSxnQkFEeUI7QUFFaENDLElBQUFBLFdBQVcsRUFBRSwyREFGbUI7QUFHaENVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVSxVQUhNO0FBSWhDSyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDcUQsTUFKTztBQUtoQ3RCLElBQUFBLE9BQU8sRUFBRTtBQUNQc0IsTUFBQUEsTUFBTSxFQUFFLENBQ047QUFDRXRDLFFBQUFBLElBQUksRUFBRSxRQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQURNLEVBS047QUFDRXBCLFFBQUFBLElBQUksRUFBRSxPQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQUxNLEVBU047QUFDRXBCLFFBQUFBLElBQUksRUFBRSxRQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQVRNLEVBYU47QUFDRXBCLFFBQUFBLElBQUksRUFBRSxTQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQWJNO0FBREQsS0FMdUI7QUF5QmhDbkIsSUFBQUEsWUFBWSxFQUFFL0ksaUNBekJrQjtBQTBCaENnSixJQUFBQSxzQkFBc0IsRUFBRSxJQTFCUTtBQTJCaENDLElBQUFBLG9CQUFvQixFQUFFLElBM0JVO0FBNEJoQ0MsSUFBQUEsMEJBQTBCLEVBQUUsSUE1Qkk7QUE2QmhDQyxJQUFBQSxRQUFRLEVBQUUsVUFBVWUsS0FBVixFQUFpQjtBQUN6QixhQUFPZCxxQ0FBa0JpQyxPQUFsQixDQUNMLEtBQUt2QixPQUFMLENBQWFzQixNQUFiLENBQW9CRSxHQUFwQixDQUF3QixDQUFDO0FBQUVwQixRQUFBQTtBQUFGLE9BQUQsS0FBZUEsS0FBdkMsQ0FESyxFQUVMQSxLQUZLLENBQVA7QUFHRCxLQWpDK0I7QUFrQ2hDUixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUM0QixLQUFQLENBQ0wsS0FBS3pCLE9BQUwsQ0FBYXNCLE1BQWIsQ0FBb0JFLEdBQXBCLENBQXdCLENBQUM7QUFBRXBCLFFBQUFBO0FBQUYsT0FBRCxLQUFlUCxNQUFNLENBQUMwQixPQUFQLENBQWVuQixLQUFmLENBQXZDLENBREssQ0FBUDtBQUdEO0FBdEMrQixHQXRVOEI7QUE4V2hFLGdDQUE4QjtBQUM1QmpDLElBQUFBLEtBQUssRUFBRSxZQURxQjtBQUU1QkMsSUFBQUEsV0FBVyxFQUNULG9FQUgwQjtBQUk1QlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNVLFVBSkU7QUFLNUJLLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUNlLElBTEc7QUFNNUJDLElBQUFBLFlBQVksRUFBRXBKLDZCQU5jO0FBTzVCcUosSUFBQUEsc0JBQXNCLEVBQUUsSUFQSTtBQVE1QkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSTTtBQVM1QkMsSUFBQUEsMEJBQTBCLEVBQUUsSUFUQTtBQVU1QjtBQUNBQyxJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQkMsT0FBbEIsQ0FDUkQscUNBQWtCRSxnQkFEVixFQUVSRixxQ0FBa0JHLFdBRlYsRUFHUkgscUNBQWtCSSxrQkFBbEIsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsRUFBK0MsR0FBL0MsRUFBb0QsR0FBcEQsQ0FIUSxFQUlSSixxQ0FBa0JLLHVCQUFsQixDQUNFLElBREYsRUFFRSxHQUZGLEVBR0UsR0FIRixFQUlFLEdBSkYsRUFLRSxHQUxGLEVBTUUsR0FORixFQU9FLEdBUEYsRUFRRSxHQVJGLEVBU0UsR0FURixFQVVFLEdBVkYsQ0FKUSxDQVhrQjtBQTRCNUJDLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUVULFFBQUFBLFFBQVEsRUFBRSxLQUFLQTtBQUFqQixPQUFkLENBQVA7QUFDRDtBQTlCMkIsR0E5V2tDO0FBOFloRSxvQ0FBa0M7QUFDaENsQixJQUFBQSxLQUFLLEVBQUUsZ0JBRHlCO0FBRWhDQyxJQUFBQSxXQUFXLEVBQ1Qsa0VBSDhCO0FBSWhDVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1UsVUFKTTtBQUtoQ0ssSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lELE1BTE87QUFNaEN6QyxJQUFBQSxZQUFZLEVBQUVoSix5Q0FOa0I7QUFPaENpSixJQUFBQSxzQkFBc0IsRUFBRSxJQVBRO0FBUWhDQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJVO0FBU2hDQyxJQUFBQSwwQkFBMEIsRUFBRSxJQVRJO0FBVWhDWSxJQUFBQSxPQUFPLEVBQUU7QUFDUDBCLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxHQUFHLEVBQUUsQ0FEQztBQUVOQyxRQUFBQSxPQUFPLEVBQUU7QUFGSDtBQURELEtBVnVCO0FBZ0JoQ2hCLElBQUFBLDZDQUE2QyxFQUFFLFVBQzdDUixLQUQ2QyxFQUVyQztBQUNSLGFBQU95QixNQUFNLENBQUN6QixLQUFELENBQWI7QUFDRCxLQXBCK0I7QUFxQmhDVyxJQUFBQSw2Q0FBNkMsRUFBRSxVQUM3Q1gsS0FENkMsRUFFckM7QUFDUixhQUFPMEIsTUFBTSxDQUFDMUIsS0FBRCxDQUFiO0FBQ0QsS0F6QitCO0FBMEJoQ2YsSUFBQUEsUUFBUSxFQUFFLFVBQVVlLEtBQVYsRUFBaUI7QUFDekIsYUFBT2QscUNBQWtCb0MsTUFBbEIsQ0FBeUIsS0FBSzFCLE9BQUwsQ0FBYTBCLE1BQXRDLEVBQThDdEIsS0FBOUMsQ0FBUDtBQUNELEtBNUIrQjtBQTZCaENSLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQzZCLE1BQVAsQ0FBYztBQUFFckMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQUwsQ0FBYzBDLElBQWQsQ0FBbUIsSUFBbkI7QUFBWixPQUFkLENBQVA7QUFDRDtBQS9CK0IsR0E5WThCO0FBK2FoRSxrQ0FBZ0M7QUFDOUI1RCxJQUFBQSxLQUFLLEVBQUUsY0FEdUI7QUFFOUJDLElBQUFBLFdBQVcsRUFDVCxnRUFINEI7QUFJOUJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVSxVQUpJO0FBSzlCSyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDeUQsTUFMSztBQU05QnpDLElBQUFBLFlBQVksRUFBRWpKLHVDQU5nQjtBQU85QmtKLElBQUFBLHNCQUFzQixFQUFFLElBUE07QUFROUJDLElBQUFBLG9CQUFvQixFQUFFLElBUlE7QUFTOUJDLElBQUFBLDBCQUEwQixFQUFFLElBVEU7QUFVOUJZLElBQUFBLE9BQU8sRUFBRTtBQUNQMEIsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLEdBQUcsRUFBRSxDQURDO0FBRU5DLFFBQUFBLE9BQU8sRUFBRTtBQUZIO0FBREQsS0FWcUI7QUFnQjlCaEIsSUFBQUEsNkNBQTZDLEVBQUUsVUFBVVIsS0FBVixFQUF5QjtBQUN0RSxhQUFPeUIsTUFBTSxDQUFDekIsS0FBRCxDQUFiO0FBQ0QsS0FsQjZCO0FBbUI5QlcsSUFBQUEsNkNBQTZDLEVBQUUsVUFDN0NYLEtBRDZDLEVBRXJDO0FBQ1IsYUFBTzBCLE1BQU0sQ0FBQzFCLEtBQUQsQ0FBYjtBQUNELEtBdkI2QjtBQXdCOUJmLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQm9DLE1BQWxCLENBQXlCLEtBQUsxQixPQUFMLENBQWEwQixNQUF0QyxFQUE4Q3RCLEtBQTlDLENBQVA7QUFDRCxLQTFCNkI7QUEyQjlCUixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUM2QixNQUFQLENBQWM7QUFBRXJDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUFMLENBQWMwQyxJQUFkLENBQW1CLElBQW5CO0FBQVosT0FBZCxDQUFQO0FBQ0Q7QUE3QjZCLEdBL2FnQztBQThjaEUsOEJBQTRCO0FBQzFCNUQsSUFBQUEsS0FBSyxFQUFFLFVBRG1CO0FBRTFCQyxJQUFBQSxXQUFXLEVBQ1QseUVBSHdCO0FBSTFCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1UsVUFKQTtBQUsxQkssSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ2UsSUFMQztBQU0xQkMsSUFBQUEsWUFBWSxFQUFFNUksa0NBTlk7QUFPMUI2SSxJQUFBQSxzQkFBc0IsRUFBRSxJQVBFO0FBUTFCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJJO0FBUzFCNkMsSUFBQUEsZ0NBQWdDLEVBQUUsSUFUUjtBQVUxQjNDLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQXlCO0FBQ2pDLGFBQU8sd0JBQXlCQSxLQUF6QixJQUNINkIsU0FERyxHQUVILHdCQUZKO0FBR0QsS0FkeUI7QUFlMUJyQyxJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFFVCxRQUFBQSxRQUFRLEVBQUUsS0FBS0E7QUFBakIsT0FBZCxDQUFQO0FBQ0Q7QUFqQnlCLEdBOWNvQztBQWllaEUsNEJBQTBCO0FBQ3hCbEIsSUFBQUEsS0FBSyxFQUFFLFFBRGlCO0FBRXhCQyxJQUFBQSxXQUFXLEVBQUUseUNBRlc7QUFHeEJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVSxVQUhGO0FBSXhCSyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKRDtBQUt4QmQsSUFBQUEsWUFBWSxFQUFFOUksK0JBTFU7QUFNeEIrSSxJQUFBQSxzQkFBc0IsRUFBRSxJQU5BO0FBT3hCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVBFO0FBUXhCYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBUmU7QUFnQnhCRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJ1QjtBQXFCeEJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0FyQko7QUFzQnhCWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBeEJ1QixHQWplc0M7QUEyZmhFLDJCQUF5QjtBQUN2QnRDLElBQUFBLEtBQUssRUFBRSxRQURnQjtBQUV2QkMsSUFBQUEsV0FBVyxFQUFFLHNDQUZVO0FBR3ZCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1csYUFISDtBQUl2QkksSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BSkY7QUFLdkJkLElBQUFBLFlBQVksRUFBRSxJQUxTO0FBTXZCQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5EO0FBT3ZCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVBDO0FBUXZCK0MsSUFBQUEsMkJBQTJCLEVBQUUsSUFSTjtBQVN2QmxDLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FUYztBQWlCdkJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FyQnNCO0FBc0J2QmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXRCTDtBQXVCdkJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF6QnNCLEdBM2Z1QztBQXNoQmhFLDRCQUEwQjtBQUN4QnRDLElBQUFBLEtBQUssRUFBRSxlQURpQjtBQUV4QkMsSUFBQUEsV0FBVyxFQUFHLGlFQUZVO0FBR3hCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1csYUFIRjtBQUl4QkksSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ2tFLFVBSkQ7QUFLeEJsRCxJQUFBQSxZQUFZLEVBQUUsRUFMVTtBQU14QkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFOQTtBQU94QkMsSUFBQUEsb0JBQW9CLEVBQUUsSUFQRTtBQVF4QmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BvQyxNQUFBQSxJQUFJLEVBQUU7QUFDSnJELFFBQUFBLElBQUksRUFBRSxPQURGO0FBRUpzRCxRQUFBQSxVQUFVLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixNQUFsQixFQUEwQixNQUExQixDQUZSO0FBR0pDLFFBQUFBLElBQUksRUFBRTtBQUNKQyxVQUFBQSxRQUFRLEVBQ054RTtBQUZFLFNBSEY7QUFPSnlFLFFBQUFBLFdBQVcsRUFBRTtBQUNYQyxVQUFBQSxVQUFVLEVBQUU7QUFDVkMsWUFBQUEsS0FBSyxFQUFFLEdBREc7QUFFVkMsWUFBQUEsTUFBTSxFQUFFLEVBRkU7QUFHVkMsWUFBQUEsSUFBSSxFQUFFO0FBSEk7QUFERCxTQVBUO0FBY0pDLFFBQUFBLEtBQUssRUFBRTtBQUNMQyxVQUFBQSxzQkFBc0IsRUFBRSw2QkFEbkI7QUFFTEMsVUFBQUEsUUFBUSxFQUFFLHdCQUZMO0FBR0xDLFVBQUFBLGdCQUFnQixFQUFHRCxRQUFELElBQ2YsaUJBQWdCQSxRQUFTLE1BQUtFLElBQUksQ0FBQ0MsR0FBTCxFQUFXLEVBSnZDLENBS0w7O0FBTEs7QUFkSDtBQURDLEtBUmU7QUFnQ3hCN0QsSUFBQUEsUUFBUSxFQUFFLFVBQVVlLEtBQVYsRUFBaUI7QUFDekIsYUFBT2QscUNBQWtCQyxPQUFsQixDQUNMRCxxQ0FBa0I2RCxrQkFBbEIsQ0FBcUMsRUFDbkMsR0FBRyxLQUFLbkQsT0FBTCxDQUFhb0MsSUFBYixDQUFrQkUsSUFEYztBQUVuQ2MsUUFBQUEsY0FBYyxFQUFFO0FBRm1CLE9BQXJDLENBREssRUFLTDlELHFDQUFrQitELDZCQUFsQixDQUNFLEtBQUtyRCxPQUFMLENBQWFvQyxJQUFiLENBQWtCQyxVQURwQixDQUxLLEVBUUxqQyxLQVJLLENBQVA7QUFTRDtBQTFDdUIsR0F0aEJzQztBQWtrQmhFLG9DQUFrQztBQUNoQ2pDLElBQUFBLEtBQUssRUFBRSxrQkFEeUI7QUFFaENDLElBQUFBLFdBQVcsRUFBRyxtRUFGa0I7QUFHaENVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVyxhQUhNO0FBSWhDSSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDa0UsVUFKTztBQUtoQ2xELElBQUFBLFlBQVksRUFBRSxFQUxrQjtBQU1oQ0MsSUFBQUEsc0JBQXNCLEVBQUUsSUFOUTtBQU9oQ0MsSUFBQUEsb0JBQW9CLEVBQUUsSUFQVTtBQVFoQ2EsSUFBQUEsT0FBTyxFQUFFO0FBQ1BvQyxNQUFBQSxJQUFJLEVBQUU7QUFDSnJELFFBQUFBLElBQUksRUFBRSxPQURGO0FBRUpzRCxRQUFBQSxVQUFVLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixNQUFsQixFQUEwQixNQUExQixDQUZSO0FBR0pDLFFBQUFBLElBQUksRUFBRTtBQUNKQyxVQUFBQSxRQUFRLEVBQ054RTtBQUZFLFNBSEY7QUFPSnlFLFFBQUFBLFdBQVcsRUFBRTtBQUNYQyxVQUFBQSxVQUFVLEVBQUU7QUFDVkMsWUFBQUEsS0FBSyxFQUFFLEdBREc7QUFFVkMsWUFBQUEsTUFBTSxFQUFFLEVBRkU7QUFHVkMsWUFBQUEsSUFBSSxFQUFFO0FBSEk7QUFERCxTQVBUO0FBY0pDLFFBQUFBLEtBQUssRUFBRTtBQUNMQyxVQUFBQSxzQkFBc0IsRUFBRSw2QkFEbkI7QUFFTEMsVUFBQUEsUUFBUSxFQUFFLGdDQUZMO0FBR0xDLFVBQUFBLGdCQUFnQixFQUFHRCxRQUFELElBQ2YsaUJBQWdCQSxRQUFTLE1BQUtFLElBQUksQ0FBQ0MsR0FBTCxFQUFXLEVBSnZDLENBS0w7O0FBTEs7QUFkSDtBQURDLEtBUnVCO0FBZ0NoQzdELElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQkMsT0FBbEIsQ0FDTEQscUNBQWtCNkQsa0JBQWxCLENBQXFDLEVBQ25DLEdBQUcsS0FBS25ELE9BQUwsQ0FBYW9DLElBQWIsQ0FBa0JFLElBRGM7QUFFbkNjLFFBQUFBLGNBQWMsRUFBRTtBQUZtQixPQUFyQyxDQURLLEVBS0w5RCxxQ0FBa0IrRCw2QkFBbEIsQ0FDRSxLQUFLckQsT0FBTCxDQUFhb0MsSUFBYixDQUFrQkMsVUFEcEIsQ0FMSyxFQVFMakMsS0FSSyxDQUFQO0FBU0Q7QUExQytCLEdBbGtCOEI7QUE4bUJoRSxnQ0FBOEI7QUFDNUJqQyxJQUFBQSxLQUFLLEVBQUUsa0JBRHFCO0FBRTVCQyxJQUFBQSxXQUFXLEVBQUcseUhBRmM7QUFHNUJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVyxhQUhFO0FBSTVCSSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDa0UsVUFKRztBQUs1QmxELElBQUFBLFlBQVksRUFBRSxFQUxjO0FBTTVCcUUsSUFBQUEsb0JBQW9CLEVBQUV4SCx1Q0FOTTtBQU81Qm9ELElBQUFBLHNCQUFzQixFQUFFLElBUEk7QUFRNUJDLElBQUFBLG9CQUFvQixFQUFFLElBUk07QUFTNUJhLElBQUFBLE9BQU8sRUFBRTtBQUNQb0MsTUFBQUEsSUFBSSxFQUFFO0FBQ0pyRCxRQUFBQSxJQUFJLEVBQUUsT0FERjtBQUVKc0QsUUFBQUEsVUFBVSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsTUFBbEIsQ0FGUjtBQUdKQyxRQUFBQSxJQUFJLEVBQUU7QUFDSkMsVUFBQUEsUUFBUSxFQUNOeEU7QUFGRSxTQUhGO0FBT0p5RSxRQUFBQSxXQUFXLEVBQUU7QUFDWEMsVUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFlBQUFBLEtBQUssRUFBRSxHQURHO0FBRVZDLFlBQUFBLE1BQU0sRUFBRSxFQUZFO0FBR1ZDLFlBQUFBLElBQUksRUFBRTtBQUhJO0FBREQsU0FQVDtBQWNKQyxRQUFBQSxLQUFLLEVBQUU7QUFDTEMsVUFBQUEsc0JBQXNCLEVBQUUsNkJBRG5CO0FBRUxDLFVBQUFBLFFBQVEsRUFBRSw0QkFGTDtBQUdMQyxVQUFBQSxnQkFBZ0IsRUFBR0QsUUFBRCxJQUF1QixpQkFBZ0JBLFFBQVM7QUFIN0Q7QUFkSDtBQURDLEtBVG1CO0FBK0I1QjFELElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQkMsT0FBbEIsQ0FDTEQscUNBQWtCNkQsa0JBQWxCLENBQXFDLEVBQ25DLEdBQUcsS0FBS25ELE9BQUwsQ0FBYW9DLElBQWIsQ0FBa0JFLElBRGM7QUFFbkNjLFFBQUFBLGNBQWMsRUFBRTtBQUZtQixPQUFyQyxDQURLLEVBS0w5RCxxQ0FBa0IrRCw2QkFBbEIsQ0FDRSxLQUFLckQsT0FBTCxDQUFhb0MsSUFBYixDQUFrQkMsVUFEcEIsQ0FMSyxFQVFMakMsS0FSSyxDQUFQO0FBU0Q7QUF6QzJCLEdBOW1Ca0M7QUF5cEJoRSxnQ0FBOEI7QUFDNUJqQyxJQUFBQSxLQUFLLEVBQUUsd0JBRHFCO0FBRTVCQyxJQUFBQSxXQUFXLEVBQUcsMEhBRmM7QUFHNUJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVyxhQUhFO0FBSTVCSSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDa0UsVUFKRztBQUs1QmxELElBQUFBLFlBQVksRUFBRSxFQUxjO0FBTTVCQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5JO0FBTzVCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVBNO0FBUTVCK0MsSUFBQUEsMkJBQTJCLEVBQUUsSUFSRDtBQVM1QmxDLElBQUFBLE9BQU8sRUFBRTtBQUNQb0MsTUFBQUEsSUFBSSxFQUFFO0FBQ0pyRCxRQUFBQSxJQUFJLEVBQUUsT0FERjtBQUVKc0QsUUFBQUEsVUFBVSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMEIsTUFBMUIsQ0FGUjtBQUdKQyxRQUFBQSxJQUFJLEVBQUU7QUFDSkMsVUFBQUEsUUFBUSxFQUNOeEU7QUFGRSxTQUhGO0FBT0p5RSxRQUFBQSxXQUFXLEVBQUU7QUFDWEMsVUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFlBQUFBLEtBQUssRUFBRSxFQURHO0FBRVZDLFlBQUFBLE1BQU0sRUFBRSxFQUZFO0FBR1ZDLFlBQUFBLElBQUksRUFBRTtBQUhJO0FBREQsU0FQVDtBQWNKQyxRQUFBQSxLQUFLLEVBQUU7QUFDTEMsVUFBQUEsc0JBQXNCLEVBQUUsNkJBRG5CO0FBRUxDLFVBQUFBLFFBQVEsRUFBRSw0QkFGTDtBQUdMQyxVQUFBQSxnQkFBZ0IsRUFBR0QsUUFBRCxJQUNmLGlCQUFnQkEsUUFBUyxNQUFLRSxJQUFJLENBQUNDLEdBQUwsRUFBVyxFQUp2QyxDQUtMOztBQUxLO0FBZEg7QUFEQyxLQVRtQjtBQWlDNUI3RCxJQUFBQSxRQUFRLEVBQUUsVUFBVWUsS0FBVixFQUFpQjtBQUN6QixhQUFPZCxxQ0FBa0JDLE9BQWxCLENBQ0xELHFDQUFrQjZELGtCQUFsQixDQUFxQyxFQUNuQyxHQUFHLEtBQUtuRCxPQUFMLENBQWFvQyxJQUFiLENBQWtCRSxJQURjO0FBRW5DYyxRQUFBQSxjQUFjLEVBQUU7QUFGbUIsT0FBckMsQ0FESyxFQUtMOUQscUNBQWtCK0QsNkJBQWxCLENBQ0UsS0FBS3JELE9BQUwsQ0FBYW9DLElBQWIsQ0FBa0JDLFVBRHBCLENBTEssRUFRTGpDLEtBUkssQ0FBUDtBQVNEO0FBM0MyQixHQXpwQmtDO0FBc3NCaEUsa0NBQWdDO0FBQzlCakMsSUFBQUEsS0FBSyxFQUFFLGdCQUR1QjtBQUU5QkMsSUFBQUEsV0FBVyxFQUFFLGdDQUZpQjtBQUc5QlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNXLGFBSEk7QUFJOUJJLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUNzRixRQUpLO0FBSzlCdEUsSUFBQUEsWUFBWSxFQUFFLEVBTGdCO0FBTTlCcUUsSUFBQUEsb0JBQW9CLEVBQUV0SCx3QkFOUTtBQU85QmtELElBQUFBLHNCQUFzQixFQUFFLElBUE07QUFROUJDLElBQUFBLG9CQUFvQixFQUFFLElBUlE7QUFTOUJhLElBQUFBLE9BQU8sRUFBRTtBQUFFd0QsTUFBQUEsT0FBTyxFQUFFLENBQVg7QUFBY0MsTUFBQUEsU0FBUyxFQUFFO0FBQXpCLEtBVHFCO0FBVTlCcEUsSUFBQUEsUUFBUSxFQUFFLFVBQVVlLEtBQVYsRUFBaUI7QUFBQTs7QUFDekIsYUFBT2QscUNBQWtCb0UsbUJBQWxCLENBQXNDO0FBQzNDRixRQUFBQSxPQUFPLG1CQUFFLEtBQUt4RCxPQUFQLGtEQUFFLGNBQWN3RCxPQURvQjtBQUUzQ0MsUUFBQUEsU0FBUyxvQkFBRSxLQUFLekQsT0FBUCxtREFBRSxlQUFjeUQ7QUFGa0IsT0FBdEMsRUFHSnJELEtBSEksQ0FBUDtBQUlELEtBZjZCO0FBZ0I5QlIsSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRVQsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQUwsQ0FBYzBDLElBQWQsQ0FBbUIsSUFBbkI7QUFBWixPQUFkLENBQVA7QUFDRDtBQWxCNkIsR0F0c0JnQztBQTB0QmhFLGtDQUFnQztBQUM5QjVELElBQUFBLEtBQUssRUFBRSxnQkFEdUI7QUFFOUJDLElBQUFBLFdBQVcsRUFBRSxnQ0FGaUI7QUFHOUJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDVyxhQUhJO0FBSTlCSSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDc0YsUUFKSztBQUs5QnRFLElBQUFBLFlBQVksRUFBRSxFQUxnQjtBQU05QnFFLElBQUFBLG9CQUFvQixFQUFFckgsd0JBTlE7QUFPOUJpRCxJQUFBQSxzQkFBc0IsRUFBRSxJQVBNO0FBUTlCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJRO0FBUzlCYSxJQUFBQSxPQUFPLEVBQUU7QUFBRXdELE1BQUFBLE9BQU8sRUFBRSxDQUFYO0FBQWNDLE1BQUFBLFNBQVMsRUFBRTtBQUF6QixLQVRxQjtBQVU5QnBFLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQUE7O0FBQ3pCLGFBQU9kLHFDQUFrQm9FLG1CQUFsQixDQUFzQztBQUMzQ0YsUUFBQUEsT0FBTyxvQkFBRSxLQUFLeEQsT0FBUCxtREFBRSxlQUFjd0QsT0FEb0I7QUFFM0NDLFFBQUFBLFNBQVMsb0JBQUUsS0FBS3pELE9BQVAsbURBQUUsZUFBY3lEO0FBRmtCLE9BQXRDLEVBR0pyRCxLQUhJLENBQVA7QUFJRCxLQWY2QjtBQWdCOUJSLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUVULFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUFMLENBQWMwQyxJQUFkLENBQW1CLElBQW5CO0FBQVosT0FBZCxDQUFQO0FBQ0Q7QUFsQjZCLEdBMXRCZ0M7QUE4dUJoRTRCLEVBQUFBLGNBQWMsRUFBRTtBQUNkeEYsSUFBQUEsS0FBSyxFQUFFLGVBRE87QUFFZEMsSUFBQUEsV0FBVyxFQUFFLDBEQUZDO0FBR2RVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDUSxRQUhaO0FBSWRPLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUN5QyxNQUpYO0FBS2R6QixJQUFBQSxZQUFZLEVBQUUsRUFMQTtBQU1kQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5WO0FBT2RDLElBQUFBLG9CQUFvQixFQUFFLElBUFI7QUFRZGEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BVLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxRQUFRLEVBQUU7QUFESjtBQURELEtBUks7QUFhZEMsSUFBQUEsNkNBQTZDLEVBQUUsVUFBVVIsS0FBVixFQUEyQjtBQUN4RSxhQUFPUyxJQUFJLENBQUNDLFNBQUwsQ0FBZVYsS0FBZixDQUFQO0FBQ0QsS0FmYTtBQWdCZFcsSUFBQUEsNkNBQTZDLEVBQUUsVUFDN0NYLEtBRDZDLEVBRXhDO0FBQ0wsVUFBSTtBQUNGLGVBQU9TLElBQUksQ0FBQ0csS0FBTCxDQUFXWixLQUFYLENBQVA7QUFDRCxPQUZELENBRUUsT0FBT2EsS0FBUCxFQUFjO0FBQ2QsZUFBT2IsS0FBUDtBQUNEO0FBQ0YsS0F4QmE7QUF5QmRmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCNEIsSUFBbEIsQ0FDUjVCLHFDQUFrQkMsT0FBbEIsQ0FDRUQscUNBQWtCNkIsS0FBbEIsQ0FDRTdCLHFDQUFrQkMsT0FBbEIsQ0FDRUQscUNBQWtCOEIsUUFEcEIsRUFFRTlCLHFDQUFrQkUsZ0JBRnBCLEVBR0VGLHFDQUFrQkcsV0FIcEIsQ0FERixDQURGLENBRFEsQ0F6Qkk7QUFvQ2RHLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FDTHhCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ1pULFFBQUFBLFFBQVEsRUFBRUMscUNBQWtCQyxPQUFsQixDQUNSRCxxQ0FBa0JFLGdCQURWLEVBRVJGLHFDQUFrQkcsV0FGVjtBQURFLE9BQWQsQ0FESyxDQUFQO0FBUUQ7QUE3Q2EsR0E5dUJnRDtBQTZ4QmhFLG9CQUFrQjtBQUNoQnRCLElBQUFBLEtBQUssRUFBRSxnQkFEUztBQUVoQkMsSUFBQUEsV0FBVyxFQUNULHlFQUhjO0FBSWhCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ00sT0FKVjtBQUtoQlMsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ2UsSUFMVDtBQU1oQkMsSUFBQUEsWUFBWSxFQUFFLEVBTkU7QUFPaEJDLElBQUFBLHNCQUFzQixFQUFFLElBUFI7QUFRaEJDLElBQUFBLG9CQUFvQixFQUFFLElBUk47QUFTaEJFLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCRyxXQVRaO0FBVWhCRyxJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFFVCxRQUFBQSxRQUFRLEVBQUUsS0FBS0E7QUFBakIsT0FBZCxDQUFQO0FBQ0Q7QUFaZSxHQTd4QjhDO0FBMnlCaEUseUJBQXVCO0FBQ3JCbEIsSUFBQUEsS0FBSyxFQUFFLHFCQURjO0FBRXJCQyxJQUFBQSxXQUFXLEVBQ1QsMEVBSG1CO0FBSXJCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ00sT0FKTDtBQUtyQlMsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ2UsSUFMSjtBQU1yQkMsSUFBQUEsWUFBWSxFQUFFLEVBTk87QUFPckJDLElBQUFBLHNCQUFzQixFQUFFLElBUEg7QUFRckJDLElBQUFBLG9CQUFvQixFQUFFLEtBUkQ7QUFTckJFLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCRSxnQkFUUDtBQVVyQkksSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRVQsUUFBQUEsUUFBUSxFQUFFLEtBQUtBO0FBQWpCLE9BQWQsQ0FBUDtBQUNEO0FBWm9CLEdBM3lCeUM7QUF5ekJoRSxzQkFBb0I7QUFDbEJsQixJQUFBQSxLQUFLLEVBQUUsaUJBRFc7QUFFbEJDLElBQUFBLFdBQVcsRUFBRSx5REFGSztBQUdsQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNPLFVBSFI7QUFJbEJRLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUpQO0FBS2xCZCxJQUFBQSxZQUFZLEVBQUUsSUFMSTtBQU1sQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFOTjtBQU9sQkMsSUFBQUEsb0JBQW9CLEVBQUUsS0FQSjtBQVFsQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVJTO0FBZ0JsQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXBCaUI7QUFxQmxCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJWO0FBc0JsQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCaUIsR0F6ekI0QztBQW0xQmhFLG9CQUFrQjtBQUNoQnRDLElBQUFBLEtBQUssRUFBRSxZQURTO0FBRWhCQyxJQUFBQSxXQUFXLEVBQUUscURBRkc7QUFHaEJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUhWO0FBSWhCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKVDtBQUtoQmQsSUFBQUEsWUFBWSxFQUFFLEtBTEU7QUFNaEJDLElBQUFBLHNCQUFzQixFQUFFLElBTlI7QUFPaEJDLElBQUFBLG9CQUFvQixFQUFFLEtBUE47QUFRaEJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FSTztBQWdCaEJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FwQmU7QUFxQmhCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJaO0FBc0JoQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCZSxHQW4xQjhDO0FBNjJCaEUsdUJBQXFCO0FBQ25CdEMsSUFBQUEsS0FBSyxFQUFFLFNBRFk7QUFFbkJDLElBQUFBLFdBQVcsRUFBRSwyREFGTTtBQUduQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNPLFVBSFA7QUFJbkJRLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUpOO0FBS25CZCxJQUFBQSxZQUFZLEVBQUUsS0FMSztBQU1uQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFOTDtBQU9uQkMsSUFBQUEsb0JBQW9CLEVBQUUsS0FQSDtBQVFuQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVJVO0FBZ0JuQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXBCa0I7QUFxQm5CZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJUO0FBc0JuQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCa0IsR0E3MkIyQztBQXU0QmhFLHVCQUFxQjtBQUNuQnRDLElBQUFBLEtBQUssRUFBRSxpQkFEWTtBQUVuQkMsSUFBQUEsV0FBVyxFQUNULG1FQUhpQjtBQUluQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNPLFVBSlA7QUFLbkJRLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUxOO0FBTW5CZCxJQUFBQSxZQUFZLEVBQUUsS0FOSztBQU9uQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFQTDtBQVFuQkMsSUFBQUEsb0JBQW9CLEVBQUUsS0FSSDtBQVNuQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRVO0FBaUJuQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCa0I7QUFzQm5CZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJUO0FBdUJuQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXpCa0IsR0F2NEIyQztBQWs2QmhFLG9CQUFrQjtBQUNoQnRDLElBQUFBLEtBQUssRUFBRSx1QkFEUztBQUVoQkMsSUFBQUEsV0FBVyxFQUFFLDhEQUZHO0FBR2hCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ08sVUFIVjtBQUloQlEsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BSlQ7QUFLaEJkLElBQUFBLFlBQVksRUFBRSxLQUxFO0FBTWhCQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5SO0FBT2hCQyxJQUFBQSxvQkFBb0IsRUFBRSxLQVBOO0FBUWhCYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBUk87QUFnQmhCRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJlO0FBcUJoQmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXJCWjtBQXNCaEJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF4QmUsR0FsNkI4QztBQTQ3QmhFLHFCQUFtQjtBQUNqQnRDLElBQUFBLEtBQUssRUFBRSxNQURVO0FBRWpCQyxJQUFBQSxXQUFXLEVBQUUsd0RBRkk7QUFHakJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUhUO0FBSWpCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKUjtBQUtqQmQsSUFBQUEsWUFBWSxFQUFFLElBTEc7QUFNakJDLElBQUFBLHNCQUFzQixFQUFFLElBTlA7QUFPakJDLElBQUFBLG9CQUFvQixFQUFFLEtBUEw7QUFRakJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FSUTtBQWdCakJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FwQmdCO0FBcUJqQmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXJCWDtBQXNCakJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF4QmdCLEdBNTdCNkM7QUFzOUJoRSx1QkFBcUI7QUFDbkJ0QyxJQUFBQSxLQUFLLEVBQUUsUUFEWTtBQUVuQkMsSUFBQUEsV0FBVyxFQUFFLDBEQUZNO0FBR25CVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ08sVUFIUDtBQUluQlEsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BSk47QUFLbkJkLElBQUFBLFlBQVksRUFBRSxLQUxLO0FBTW5CQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5MO0FBT25CQyxJQUFBQSxvQkFBb0IsRUFBRSxLQVBIO0FBUW5CYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBUlU7QUFnQm5CRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJrQjtBQXFCbkJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0FyQlQ7QUFzQm5CWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBeEJrQixHQXQ5QjJDO0FBZy9CaEUsc0JBQW9CO0FBQ2xCdEMsSUFBQUEsS0FBSyxFQUFFLE9BRFc7QUFFbEJDLElBQUFBLFdBQVcsRUFBRSx5REFGSztBQUdsQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNPLFVBSFI7QUFJbEJRLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUpQO0FBS2xCZCxJQUFBQSxZQUFZLEVBQUUsSUFMSTtBQU1sQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFOTjtBQU9sQkMsSUFBQUEsb0JBQW9CLEVBQUUsS0FQSjtBQVFsQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVJTO0FBZ0JsQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXBCaUI7QUFxQmxCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJWO0FBc0JsQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCaUIsR0FoL0I0QztBQTBnQ2hFLHFCQUFtQjtBQUNqQnRDLElBQUFBLEtBQUssRUFBRSxNQURVO0FBRWpCQyxJQUFBQSxXQUFXLEVBQ1QsK0RBSGU7QUFJakJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUpUO0FBS2pCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFMUjtBQU1qQmQsSUFBQUEsWUFBWSxFQUFFLElBTkc7QUFPakJDLElBQUFBLHNCQUFzQixFQUFFLElBUFA7QUFRakJDLElBQUFBLG9CQUFvQixFQUFFLEtBUkw7QUFTakJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FUUTtBQWlCakJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FyQmdCO0FBc0JqQmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXRCWDtBQXVCakJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF6QmdCLEdBMWdDNkM7QUFxaUNoRSx1QkFBcUI7QUFDbkJ0QyxJQUFBQSxLQUFLLEVBQUUsWUFEWTtBQUVuQkMsSUFBQUEsV0FBVyxFQUFFLDhEQUZNO0FBR25CVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ08sVUFIUDtBQUluQlEsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BSk47QUFLbkJkLElBQUFBLFlBQVksRUFBRSxLQUxLO0FBTW5CQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5MO0FBT25CQyxJQUFBQSxvQkFBb0IsRUFBRSxLQVBIO0FBUW5CYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBUlU7QUFnQm5CRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJrQjtBQXFCbkJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0FyQlQ7QUFzQm5CWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBeEJrQixHQXJpQzJDO0FBK2pDaEUsc0JBQW9CO0FBQ2xCdEMsSUFBQUEsS0FBSyxFQUFFLE9BRFc7QUFFbEJDLElBQUFBLFdBQVcsRUFBRSw2REFGSztBQUdsQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNPLFVBSFI7QUFJbEJRLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUM4QixNQUpQO0FBS2xCZCxJQUFBQSxZQUFZLEVBQUUsS0FMSTtBQU1sQkMsSUFBQUEsc0JBQXNCLEVBQUUsSUFOTjtBQU9sQkMsSUFBQUEsb0JBQW9CLEVBQUUsS0FQSjtBQVFsQmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVJTO0FBZ0JsQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXBCaUI7QUFxQmxCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJWO0FBc0JsQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCaUIsR0EvakM0QztBQXlsQ2hFLHdCQUFzQjtBQUNwQnRDLElBQUFBLEtBQUssRUFBRSxTQURhO0FBRXBCQyxJQUFBQSxXQUFXLEVBQUUsMkRBRk87QUFHcEJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUhOO0FBSXBCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKTDtBQUtwQmQsSUFBQUEsWUFBWSxFQUFFLEtBTE07QUFNcEJDLElBQUFBLHNCQUFzQixFQUFFLElBTko7QUFPcEJDLElBQUFBLG9CQUFvQixFQUFFLEtBUEY7QUFRcEJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FSVztBQWdCcEJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FwQm1CO0FBcUJwQmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXJCUjtBQXNCcEJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF4Qm1CLEdBemxDMEM7QUFtbkNoRSxvQkFBa0I7QUFDaEJ0QyxJQUFBQSxLQUFLLEVBQUUsU0FEUztBQUVoQkMsSUFBQUEsV0FBVyxFQUFFLDJEQUZHO0FBR2hCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ08sVUFIVjtBQUloQlEsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQzhCLE1BSlQ7QUFLaEJkLElBQUFBLFlBQVksRUFBRSxJQUxFO0FBTWhCQyxJQUFBQSxzQkFBc0IsRUFBRSxJQU5SO0FBT2hCQyxJQUFBQSxvQkFBb0IsRUFBRSxLQVBOO0FBUWhCYSxJQUFBQSxPQUFPLEVBQUU7QUFDUEQsTUFBQUEsTUFBTSxFQUFFO0FBQ05FLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFlBQUFBLEtBQUssRUFBRTtBQUF6QixXQURKO0FBRU5DLFVBQUFBLE9BQU8sRUFBRTtBQUFFRixZQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXhCO0FBRkg7QUFERjtBQURELEtBUk87QUFnQmhCRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBcEJlO0FBcUJoQmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXJCWjtBQXNCaEJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF4QmUsR0FubkM4QztBQTZvQ2hFLG9CQUFrQjtBQUNoQnRDLElBQUFBLEtBQUssRUFBRSxLQURTO0FBRWhCQyxJQUFBQSxXQUFXLEVBQUUsdURBRkc7QUFHaEJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUhWO0FBSWhCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKVDtBQUtoQmQsSUFBQUEsWUFBWSxFQUFFLElBTEU7QUFNaEJDLElBQUFBLHNCQUFzQixFQUFFLElBTlI7QUFPaEJDLElBQUFBLG9CQUFvQixFQUFFLEtBUE47QUFRaEJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FSTztBQWdCaEJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FwQmU7QUFxQmhCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBckJaO0FBc0JoQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXhCZSxHQTdvQzhDO0FBdXFDaEUsMkJBQXlCO0FBQ3ZCdEMsSUFBQUEsS0FBSyxFQUFFLFlBRGdCO0FBRXZCQyxJQUFBQSxXQUFXLEVBQUUsOERBRlU7QUFHdkJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTyxVQUhIO0FBSXZCUSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKRjtBQUt2QmQsSUFBQUEsWUFBWSxFQUFFLEtBTFM7QUFNdkJDLElBQUFBLHNCQUFzQixFQUFFLElBTkQ7QUFPdkJDLElBQUFBLG9CQUFvQixFQUFFLEtBUEM7QUFRdkJhLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FSYztBQWdCdkJFLElBQUFBLGdDQUFnQyxFQUFFLFVBQ2hDRixLQURnQyxFQUV2QjtBQUNULGFBQU9HLE9BQU8sQ0FBQ0gsS0FBRCxDQUFkO0FBQ0QsS0FwQnNCO0FBcUJ2QmYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0JrQixTQXJCTDtBQXNCdkJaLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ1ksT0FBUCxFQUFQO0FBQ0Q7QUF4QnNCLEdBdnFDdUM7QUFpc0NoRW1ELEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCekYsSUFBQUEsS0FBSyxFQUFFLHFCQURVO0FBRWpCQyxJQUFBQSxXQUFXLEVBQUUsb0RBRkk7QUFHakJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTSxPQUhUO0FBSWpCUyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFKUjtBQUtqQmQsSUFBQUEsWUFBWSxFQUFFLEtBTEc7QUFNakJDLElBQUFBLHNCQUFzQixFQUFFLElBTlA7QUFPakJDLElBQUFBLG9CQUFvQixFQUFFLElBUEw7QUFRakIrQyxJQUFBQSwyQkFBMkIsRUFBRSxJQVJaO0FBU2pCbEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRRO0FBaUJqQkUsSUFBQUEsZ0NBQWdDLEVBQUUsVUFDaENGLEtBRGdDLEVBRXZCO0FBQ1QsYUFBT0csT0FBTyxDQUFDSCxLQUFELENBQWQ7QUFDRCxLQXJCZ0I7QUFzQmpCZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJYO0FBdUJqQlosSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDWSxPQUFQLEVBQVA7QUFDRDtBQXpCZ0IsR0Fqc0M2QztBQTR0Q2hFLGVBQWE7QUFDWHRDLElBQUFBLEtBQUssRUFBRSxzQkFESTtBQUVYQyxJQUFBQSxXQUFXLEVBQ1QscUZBSFM7QUFJWFUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNNLE9BSmY7QUFLWFMsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lDLE1BTGQ7QUFNWHpCLElBQUFBLFlBQVksRUFBRSxFQU5IO0FBT1hDLElBQUFBLHNCQUFzQixFQUFFLElBUGI7QUFRWEMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSWDtBQVNYYSxJQUFBQSxPQUFPLEVBQUU7QUFDUFUsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLFFBQVEsRUFBRTtBQURKO0FBREQsS0FURTtBQWNYQyxJQUFBQSw2Q0FBNkMsRUFBRSxVQUFVUixLQUFWLEVBQTJCO0FBQ3hFLGFBQU9TLElBQUksQ0FBQ0MsU0FBTCxDQUFlVixLQUFmLENBQVA7QUFDRCxLQWhCVTtBQWlCWFcsSUFBQUEsNkNBQTZDLEVBQUUsVUFDN0NYLEtBRDZDLEVBRXhDO0FBQ0wsVUFBSTtBQUNGLGVBQU9TLElBQUksQ0FBQ0csS0FBTCxDQUFXWixLQUFYLENBQVA7QUFDRCxPQUZELENBRUUsT0FBT2EsS0FBUCxFQUFjO0FBQ2QsZUFBT2IsS0FBUDtBQUNEO0FBQ0YsS0F6QlU7QUEwQlg7QUFDQWYsSUFBQUEsUUFBUSxFQUFFQyxxQ0FBa0I0QixJQUFsQixDQUNSNUIscUNBQWtCQyxPQUFsQixDQUNFRCxxQ0FBa0I2QixLQUFsQixDQUNFN0IscUNBQWtCQyxPQUFsQixDQUNFRCxxQ0FBa0I4QixRQURwQixFQUVFOUIscUNBQWtCRSxnQkFGcEIsRUFHRUYscUNBQWtCRyxXQUhwQixFQUlFSCxxQ0FBa0J1RSxlQUFsQixDQUFrQyxHQUFsQyxFQUF1QyxJQUF2QyxDQUpGLEVBS0V2RSxxQ0FBa0JJLGtCQUFsQixDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxFQUErQyxHQUEvQyxFQUFvRCxHQUFwRCxDQUxGLEVBTUVKLHFDQUFrQkssdUJBQWxCLENBQ0UsSUFERixFQUVFLEdBRkYsRUFHRSxHQUhGLEVBSUUsR0FKRixFQUtFLEdBTEYsRUFNRSxHQU5GLEVBT0UsR0FQRixFQVFFLEdBUkYsRUFTRSxHQVRGLENBTkYsQ0FERixDQURGLENBRFEsQ0EzQkM7QUFtRFhDLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FDTHhCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ1pULFFBQUFBLFFBQVEsRUFBRUMscUNBQWtCQyxPQUFsQixDQUNSRCxxQ0FBa0JFLGdCQURWLEVBRVJGLHFDQUFrQkcsV0FGVixFQUdSSCxxQ0FBa0J1RSxlQUFsQixDQUFrQyxHQUFsQyxFQUF1QyxJQUF2QyxDQUhRLEVBSVJ2RSxxQ0FBa0JJLGtCQUFsQixDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxFQUErQyxHQUEvQyxFQUFvRCxHQUFwRCxDQUpRLEVBS1JKLHFDQUFrQkssdUJBQWxCLENBQ0UsSUFERixFQUVFLEdBRkYsRUFHRSxHQUhGLEVBSUUsR0FKRixFQUtFLEdBTEYsRUFNRSxHQU5GLEVBT0UsR0FQRixFQVFFLEdBUkYsRUFTRSxHQVRGLENBTFE7QUFERSxPQUFkLENBREssQ0FBUDtBQXFCRDtBQXpFVSxHQTV0Q21EO0FBdXlDaEUsaUJBQWU7QUFDYnhCLElBQUFBLEtBQUssRUFBRSxhQURNO0FBRWJDLElBQUFBLFdBQVcsRUFDVCxvR0FIVztBQUliVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ00sT0FKYjtBQUtiUyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFMWjtBQU1iZCxJQUFBQSxZQUFZLEVBQUUsSUFORDtBQU9iQyxJQUFBQSxzQkFBc0IsRUFBRSxJQVBYO0FBUWJDLElBQUFBLG9CQUFvQixFQUFFLEtBUlQ7QUFTYmEsSUFBQUEsT0FBTyxFQUFFO0FBQ1BELE1BQUFBLE1BQU0sRUFBRTtBQUNORSxRQUFBQSxNQUFNLEVBQUU7QUFDTkMsVUFBQUEsUUFBUSxFQUFFO0FBQUVDLFlBQUFBLEtBQUssRUFBRSxPQUFUO0FBQWtCQyxZQUFBQSxLQUFLLEVBQUU7QUFBekIsV0FESjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFBRUYsWUFBQUEsS0FBSyxFQUFFLE1BQVQ7QUFBaUJDLFlBQUFBLEtBQUssRUFBRTtBQUF4QjtBQUZIO0FBREY7QUFERCxLQVRJO0FBaUJiRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBckJZO0FBc0JiZixJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQmtCLFNBdEJmO0FBdUJiWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBekJZLEdBdnlDaUQ7QUFrMENoRSxnQkFBYztBQUNadEMsSUFBQUEsS0FBSyxFQUFFLFdBREs7QUFFWkMsSUFBQUEsV0FBVyxFQUFFLDJCQUZEO0FBR1pVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTSxPQUhkO0FBSVpTLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUNxRCxNQUpiO0FBS1p0QixJQUFBQSxPQUFPLEVBQUU7QUFDUHNCLE1BQUFBLE1BQU0sRUFBRSxDQUNOO0FBQ0V0QyxRQUFBQSxJQUFJLEVBQUUsTUFEUjtBQUVFb0IsUUFBQUEsS0FBSyxFQUFFO0FBRlQsT0FETSxFQUtOO0FBQ0VwQixRQUFBQSxJQUFJLEVBQUUsT0FEUjtBQUVFb0IsUUFBQUEsS0FBSyxFQUFFO0FBRlQsT0FMTTtBQURELEtBTEc7QUFpQlpuQixJQUFBQSxZQUFZLEVBQUUsTUFqQkY7QUFrQlpDLElBQUFBLHNCQUFzQixFQUFFLElBbEJaO0FBbUJaQyxJQUFBQSxvQkFBb0IsRUFBRSxJQW5CVjtBQW9CWjZDLElBQUFBLGdDQUFnQyxFQUFFLElBcEJ0QjtBQXFCWjNDLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQmlDLE9BQWxCLENBQ0wsS0FBS3ZCLE9BQUwsQ0FBYXNCLE1BQWIsQ0FBb0JFLEdBQXBCLENBQXdCLENBQUM7QUFBRXBCLFFBQUFBO0FBQUYsT0FBRCxLQUFlQSxLQUF2QyxDQURLLEVBRUxBLEtBRkssQ0FBUDtBQUdELEtBekJXO0FBMEJaUixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUM0QixLQUFQLENBQ0wsS0FBS3pCLE9BQUwsQ0FBYXNCLE1BQWIsQ0FBb0JFLEdBQXBCLENBQXdCLENBQUM7QUFBRXBCLFFBQUFBO0FBQUYsT0FBRCxLQUFlUCxNQUFNLENBQUMwQixPQUFQLENBQWVuQixLQUFmLENBQXZDLENBREssQ0FBUDtBQUdEO0FBOUJXLEdBbDBDa0Q7QUFrMkNoRTBELEVBQUFBLE9BQU8sRUFBRTtBQUNQM0YsSUFBQUEsS0FBSyxFQUFFLGVBREE7QUFFUEMsSUFBQUEsV0FBVyxFQUNULDJKQUhLO0FBSVBVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDTSxPQUpuQjtBQUtQUyxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDZSxJQUxsQjtBQU1QQyxJQUFBQSxZQUFZLEVBQUVqSyxvQkFOUDtBQU9Qa0ssSUFBQUEsc0JBQXNCLEVBQUUsSUFQakI7QUFRUEMsSUFBQUEsb0JBQW9CLEVBQUUsSUFSZjtBQVNQQyxJQUFBQSwwQkFBMEIsRUFBRSxJQVRyQjtBQVVQO0FBQ0FDLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCQyxPQUFsQixDQUNSRCxxQ0FBa0JFLGdCQURWLEVBRVJGLHFDQUFrQkcsV0FGVixFQUdSSCxxQ0FBa0J1RSxlQUFsQixDQUFrQyxHQUFsQyxFQUF1QyxJQUF2QyxDQUhRLEVBSVJ2RSxxQ0FBa0JJLGtCQUFsQixDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxFQUErQyxHQUEvQyxFQUFvRCxHQUFwRCxDQUpRLEVBS1JKLHFDQUFrQkssdUJBQWxCLENBQ0UsSUFERixFQUVFLEdBRkYsRUFHRSxHQUhGLEVBSUUsR0FKRixFQUtFLEdBTEYsRUFNRSxHQU5GLEVBT0UsR0FQRixFQVFFLEdBUkYsRUFTRSxHQVRGLENBTFEsQ0FYSDtBQTRCUEMsSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRVQsUUFBQUEsUUFBUSxFQUFFLEtBQUtBO0FBQWpCLE9BQWQsQ0FBUDtBQUNEO0FBOUJNLEdBbDJDdUQ7QUFrNENoRTBFLEVBQUFBLE9BQU8sRUFBRTtBQUNQNUYsSUFBQUEsS0FBSyxFQUFFLGlCQURBO0FBRVBDLElBQUFBLFdBQVcsRUFDVCxrS0FISztBQUlQVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ00sT0FKbkI7QUFLUFMsSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lELE1BTGxCO0FBTVB6QyxJQUFBQSxZQUFZLEVBQUUsS0FOUDtBQU9QQyxJQUFBQSxzQkFBc0IsRUFBRSxJQVBqQjtBQVFQQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJmO0FBU1BhLElBQUFBLE9BQU8sRUFBRTtBQUNQMEIsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLEdBQUcsRUFBRSxJQURDO0FBRU5DLFFBQUFBLE9BQU8sRUFBRTtBQUZIO0FBREQsS0FURjtBQWVQaEIsSUFBQUEsNkNBQTZDLEVBQUUsVUFBVVIsS0FBVixFQUF5QjtBQUN0RSxhQUFPeUIsTUFBTSxDQUFDekIsS0FBRCxDQUFiO0FBQ0QsS0FqQk07QUFrQlBXLElBQUFBLDZDQUE2QyxFQUFFLFVBQzdDWCxLQUQ2QyxFQUVyQztBQUNSLGFBQU8wQixNQUFNLENBQUMxQixLQUFELENBQWI7QUFDRCxLQXRCTTtBQXVCUGYsSUFBQUEsUUFBUSxFQUFFLFVBQVVlLEtBQVYsRUFBaUI7QUFDekIsYUFBT2QscUNBQWtCb0MsTUFBbEIsQ0FBeUIsS0FBSzFCLE9BQUwsQ0FBYTBCLE1BQXRDLEVBQThDdEIsS0FBOUMsQ0FBUDtBQUNELEtBekJNO0FBMEJQUixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUM2QixNQUFQLENBQWM7QUFBRXJDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUFMLENBQWMwQyxJQUFkLENBQW1CLElBQW5CO0FBQVosT0FBZCxDQUFQO0FBQ0Q7QUE1Qk0sR0FsNEN1RDtBQWc2Q2hFLCtCQUE2QjtBQUMzQjVELElBQUFBLEtBQUssRUFBRSxnQkFEb0I7QUFFM0JDLElBQUFBLFdBQVcsRUFDVCw0RUFIeUI7QUFJM0JVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDUyxVQUpDO0FBSzNCTSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDcUQsTUFMRTtBQU0zQnRCLElBQUFBLE9BQU8sRUFBRTtBQUNQc0IsTUFBQUEsTUFBTSxFQUFFLENBQ047QUFDRXRDLFFBQUFBLElBQUksRUFBRSxRQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQURNLEVBS047QUFDRXBCLFFBQUFBLElBQUksRUFBRSxPQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQUxNLEVBU047QUFDRXBCLFFBQUFBLElBQUksRUFBRSxRQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQVRNLEVBYU47QUFDRXBCLFFBQUFBLElBQUksRUFBRSxTQURSO0FBRUVvQixRQUFBQSxLQUFLLEVBQUU7QUFGVCxPQWJNO0FBREQsS0FOa0I7QUEwQjNCbkIsSUFBQUEsWUFBWSxFQUFFMUosaUNBMUJhO0FBMkIzQjJKLElBQUFBLHNCQUFzQixFQUFFLElBM0JHO0FBNEIzQkMsSUFBQUEsb0JBQW9CLEVBQUUsSUE1Qks7QUE2QjNCQyxJQUFBQSwwQkFBMEIsRUFBRSxJQTdCRDtBQThCM0JDLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQmlDLE9BQWxCLENBQ0wsS0FBS3ZCLE9BQUwsQ0FBYXNCLE1BQWIsQ0FBb0JFLEdBQXBCLENBQXdCLENBQUM7QUFBRXBCLFFBQUFBO0FBQUYsT0FBRCxLQUFlQSxLQUF2QyxDQURLLEVBRUxBLEtBRkssQ0FBUDtBQUdELEtBbEMwQjtBQW1DM0JSLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQzRCLEtBQVAsQ0FDTCxLQUFLekIsT0FBTCxDQUFhc0IsTUFBYixDQUFvQkUsR0FBcEIsQ0FBd0IsQ0FBQztBQUFFcEIsUUFBQUE7QUFBRixPQUFELEtBQWVQLE1BQU0sQ0FBQzBCLE9BQVAsQ0FBZW5CLEtBQWYsQ0FBdkMsQ0FESyxDQUFQO0FBR0Q7QUF2QzBCLEdBaDZDbUM7QUF5OENoRSw4QkFBNEI7QUFDMUJqQyxJQUFBQSxLQUFLLEVBQUUsUUFEbUI7QUFFMUJDLElBQUFBLFdBQVcsRUFDVCw2RUFId0I7QUFJMUJVLElBQUFBLFFBQVEsRUFBRWQsZUFBZSxDQUFDUyxVQUpBO0FBSzFCTSxJQUFBQSxJQUFJLEVBQUVkLGtCQUFrQixDQUFDOEIsTUFMQztBQU0xQmQsSUFBQUEsWUFBWSxFQUFFekosZ0NBTlk7QUFPMUIwSixJQUFBQSxzQkFBc0IsRUFBRSxJQVBFO0FBUTFCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJJO0FBUzFCNkMsSUFBQUEsZ0NBQWdDLEVBQUUsSUFUUjtBQVUxQmhDLElBQUFBLE9BQU8sRUFBRTtBQUNQRCxNQUFBQSxNQUFNLEVBQUU7QUFDTkUsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRTtBQUFFQyxZQUFBQSxLQUFLLEVBQUUsT0FBVDtBQUFrQkMsWUFBQUEsS0FBSyxFQUFFO0FBQXpCLFdBREo7QUFFTkMsVUFBQUEsT0FBTyxFQUFFO0FBQUVGLFlBQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUU7QUFBeEI7QUFGSDtBQURGO0FBREQsS0FWaUI7QUFrQjFCRSxJQUFBQSxnQ0FBZ0MsRUFBRSxVQUNoQ0YsS0FEZ0MsRUFFdkI7QUFDVCxhQUFPRyxPQUFPLENBQUNILEtBQUQsQ0FBZDtBQUNELEtBdEJ5QjtBQXVCMUJmLElBQUFBLFFBQVEsRUFBRUMscUNBQWtCa0IsU0F2QkY7QUF3QjFCWixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUNZLE9BQVAsRUFBUDtBQUNEO0FBMUJ5QixHQXo4Q29DO0FBcStDaEUsZ0NBQThCO0FBQzVCdEMsSUFBQUEsS0FBSyxFQUFFLFdBRHFCO0FBRTVCQyxJQUFBQSxXQUFXLEVBQ1QsK0lBSDBCO0FBSTVCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1MsVUFKRTtBQUs1Qk0sSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lELE1BTEc7QUFNNUJ6QyxJQUFBQSxZQUFZLEVBQUV4SixrQ0FOYztBQU81QnlKLElBQUFBLHNCQUFzQixFQUFFLElBUEk7QUFRNUJDLElBQUFBLG9CQUFvQixFQUFFLElBUk07QUFTNUI2QyxJQUFBQSxnQ0FBZ0MsRUFBRSxJQVROO0FBVTVCaEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1AwQixNQUFBQSxNQUFNLEVBQUU7QUFDTkMsUUFBQUEsR0FBRyxFQUFFLEVBREM7QUFFTkMsUUFBQUEsT0FBTyxFQUFFO0FBRkg7QUFERCxLQVZtQjtBQWdCNUJoQixJQUFBQSw2Q0FBNkMsRUFBRSxVQUFVUixLQUFWLEVBQXlCO0FBQ3RFLGFBQU95QixNQUFNLENBQUN6QixLQUFELENBQWI7QUFDRCxLQWxCMkI7QUFtQjVCVyxJQUFBQSw2Q0FBNkMsRUFBRSxVQUM3Q1gsS0FENkMsRUFFckM7QUFDUixhQUFPMEIsTUFBTSxDQUFDMUIsS0FBRCxDQUFiO0FBQ0QsS0F2QjJCO0FBd0I1QmYsSUFBQUEsUUFBUSxFQUFFLFVBQVVlLEtBQVYsRUFBaUI7QUFDekIsYUFBT2QscUNBQWtCb0MsTUFBbEIsQ0FBeUIsS0FBSzFCLE9BQUwsQ0FBYTBCLE1BQXRDLEVBQThDdEIsS0FBOUMsQ0FBUDtBQUNELEtBMUIyQjtBQTJCNUJSLElBQUFBLGVBQWUsRUFBRSxVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLGFBQU9BLE1BQU0sQ0FBQzZCLE1BQVAsQ0FBYztBQUFFckMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQUwsQ0FBYzBDLElBQWQsQ0FBbUIsSUFBbkI7QUFBWixPQUFkLENBQVA7QUFDRDtBQTdCMkIsR0FyK0NrQztBQW9nRGhFLDhCQUE0QjtBQUMxQjVELElBQUFBLEtBQUssRUFBRSxlQURtQjtBQUUxQkMsSUFBQUEsV0FBVyxFQUFFLG9EQUZhO0FBRzFCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1MsVUFIQTtBQUkxQk0sSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ2UsSUFKQztBQUsxQkMsSUFBQUEsWUFBWSxFQUFFOUosd0JBTFk7QUFNMUIrSixJQUFBQSxzQkFBc0IsRUFBRSxJQU5FO0FBTzFCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVBJO0FBUTFCQyxJQUFBQSwwQkFBMEIsRUFBRSxJQVJGO0FBUzFCQyxJQUFBQSxRQUFRLEVBQUVDLHFDQUFrQkMsT0FBbEIsQ0FDUkQscUNBQWtCRSxnQkFEVixFQUVSRixxQ0FBa0JHLFdBRlYsRUFHUkgscUNBQWtCdUUsZUFBbEIsQ0FBa0MsR0FBbEMsRUFBdUMsSUFBdkMsQ0FIUSxFQUlSdkUscUNBQWtCSSxrQkFBbEIsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsRUFBK0MsR0FBL0MsRUFBb0QsR0FBcEQsQ0FKUSxFQUtSSixxQ0FBa0JLLHVCQUFsQixDQUNFLElBREYsRUFFRSxHQUZGLEVBR0UsR0FIRixFQUlFLEdBSkYsRUFLRSxHQUxGLEVBTUUsR0FORixFQU9FLEdBUEYsRUFRRSxHQVJGLEVBU0UsR0FURixDQUxRLENBVGdCO0FBMEIxQkMsSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRWtFLFFBQUFBLFNBQVMsRUFBRSxDQUFiO0FBQWdCM0UsUUFBQUEsUUFBUSxFQUFFLEtBQUtBO0FBQS9CLE9BQWQsQ0FBUDtBQUNEO0FBNUJ5QixHQXBnRG9DO0FBa2lEaEUsK0JBQTZCO0FBQzNCbEIsSUFBQUEsS0FBSyxFQUFFLGdCQURvQjtBQUUzQkMsSUFBQUEsV0FBVyxFQUNULDBFQUh5QjtBQUkzQlUsSUFBQUEsUUFBUSxFQUFFZCxlQUFlLENBQUNTLFVBSkM7QUFLM0JNLElBQUFBLElBQUksRUFBRWQsa0JBQWtCLENBQUN5RCxNQUxFO0FBTTNCekMsSUFBQUEsWUFBWSxFQUFFM0oseUNBTmE7QUFPM0I0SixJQUFBQSxzQkFBc0IsRUFBRSxJQVBHO0FBUTNCQyxJQUFBQSxvQkFBb0IsRUFBRSxJQVJLO0FBUzNCQyxJQUFBQSwwQkFBMEIsRUFBRSxJQVREO0FBVTNCWSxJQUFBQSxPQUFPLEVBQUU7QUFDUDBCLE1BQUFBLE1BQU0sRUFBRTtBQUNOQyxRQUFBQSxHQUFHLEVBQUUsQ0FEQztBQUVOQyxRQUFBQSxPQUFPLEVBQUU7QUFGSDtBQURELEtBVmtCO0FBZ0IzQmhCLElBQUFBLDZDQUE2QyxFQUFFLFVBQVVSLEtBQVYsRUFBeUI7QUFDdEUsYUFBT3lCLE1BQU0sQ0FBQ3pCLEtBQUQsQ0FBYjtBQUNELEtBbEIwQjtBQW1CM0JXLElBQUFBLDZDQUE2QyxFQUFFLFVBQzdDWCxLQUQ2QyxFQUVyQztBQUNSLGFBQU8wQixNQUFNLENBQUMxQixLQUFELENBQWI7QUFDRCxLQXZCMEI7QUF3QjNCZixJQUFBQSxRQUFRLEVBQUUsVUFBVWUsS0FBVixFQUFpQjtBQUN6QixhQUFPZCxxQ0FBa0JvQyxNQUFsQixDQUF5QixLQUFLMUIsT0FBTCxDQUFhMEIsTUFBdEMsRUFBOEN0QixLQUE5QyxDQUFQO0FBQ0QsS0ExQjBCO0FBMkIzQlIsSUFBQUEsZUFBZSxFQUFFLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsYUFBT0EsTUFBTSxDQUFDNkIsTUFBUCxDQUFjO0FBQUVyQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBTCxDQUFjMEMsSUFBZCxDQUFtQixJQUFuQjtBQUFaLE9BQWQsQ0FBUDtBQUNEO0FBN0IwQixHQWxpRG1DO0FBaWtEaEUsNkJBQTJCO0FBQ3pCNUQsSUFBQUEsS0FBSyxFQUFFLGNBRGtCO0FBRXpCQyxJQUFBQSxXQUFXLEVBQ1Qsd0VBSHVCO0FBSXpCVSxJQUFBQSxRQUFRLEVBQUVkLGVBQWUsQ0FBQ1MsVUFKRDtBQUt6Qk0sSUFBQUEsSUFBSSxFQUFFZCxrQkFBa0IsQ0FBQ3lELE1BTEE7QUFNekJ6QyxJQUFBQSxZQUFZLEVBQUU1Six1Q0FOVztBQU96QjZKLElBQUFBLHNCQUFzQixFQUFFLElBUEM7QUFRekJDLElBQUFBLG9CQUFvQixFQUFFLElBUkc7QUFTekJDLElBQUFBLDBCQUEwQixFQUFFLElBVEg7QUFVekJZLElBQUFBLE9BQU8sRUFBRTtBQUNQMEIsTUFBQUEsTUFBTSxFQUFFO0FBQ05DLFFBQUFBLEdBQUcsRUFBRSxDQURDO0FBRU5DLFFBQUFBLE9BQU8sRUFBRTtBQUZIO0FBREQsS0FWZ0I7QUFnQnpCaEIsSUFBQUEsNkNBQTZDLEVBQUUsVUFBVVIsS0FBVixFQUF5QjtBQUN0RSxhQUFPeUIsTUFBTSxDQUFDekIsS0FBRCxDQUFiO0FBQ0QsS0FsQndCO0FBbUJ6QlcsSUFBQUEsNkNBQTZDLEVBQUUsVUFDN0NYLEtBRDZDLEVBRXJDO0FBQ1IsYUFBTzBCLE1BQU0sQ0FBQzFCLEtBQUQsQ0FBYjtBQUNELEtBdkJ3QjtBQXdCekJmLElBQUFBLFFBQVEsRUFBRSxVQUFVZSxLQUFWLEVBQWlCO0FBQ3pCLGFBQU9kLHFDQUFrQm9DLE1BQWxCLENBQXlCLEtBQUsxQixPQUFMLENBQWEwQixNQUF0QyxFQUE4Q3RCLEtBQTlDLENBQVA7QUFDRCxLQTFCd0I7QUEyQnpCUixJQUFBQSxlQUFlLEVBQUUsVUFBVUMsTUFBVixFQUFrQjtBQUNqQyxhQUFPQSxNQUFNLENBQUM2QixNQUFQLENBQWM7QUFBRXJDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUFMLENBQWMwQyxJQUFkLENBQW1CLElBQW5CO0FBQVosT0FBZCxDQUFQO0FBQ0Q7QUE3QndCO0FBamtEcUMsQ0FBM0Q7O0lBb21ES2tDLGlCLEVBMkRaOzs7O1dBM0RZQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtBQUFBQSxFQUFBQSxpQixDQUFBQSxpQjtHQUFBQSxpQixpQ0FBQUEsaUI7O0FBNERMLE1BQU1DLDZCQUE2QixHQUFHO0FBQzNDQyxFQUFBQSxNQUFNLEVBQUUsUUFEbUM7QUFFM0NDLEVBQUFBLE1BQU0sRUFBRSxRQUZtQztBQUczQyxvQkFBa0I7QUFIeUIsQ0FBdEMsQyxDQU1QO0FBRUE7OztBQUNPLE1BQU1DLHNDQUFzQyxHQUFHLEVBQS9DLEMsQ0FDUDs7O0FBQ08sTUFBTUMsOENBQThDLEdBQUcsRUFBdkQ7QUFDUDtBQUNBOzs7QUFDTyxNQUFNQywrQkFBK0IsR0FBRyxHQUF4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBXYXp1aCBDb25zdGFudHMgZmlsZVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyB2YWxpZGF0ZU5vZGVDcm9uSW50ZXJ2YWwgfSBmcm9tICdub2RlLWNyb24nO1xuaW1wb3J0IHsgU2V0dGluZ3NWYWxpZGF0b3IgfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvc2V0dGluZ3MtdmFsaWRhdG9yJztcblxuLy8gUGx1Z2luXG5leHBvcnQgY29uc3QgUExVR0lOX1ZFUlNJT04gPSB2ZXJzaW9uO1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9WRVJTSU9OX1NIT1JUID0gdmVyc2lvbi5zcGxpdCgnLicpLnNwbGljZSgwLCAyKS5qb2luKCcuJyk7XG5cbi8vIEluZGV4IHBhdHRlcm5zIC0gV2F6dWggYWxlcnRzXG5leHBvcnQgY29uc3QgV0FaVUhfSU5ERVhfVFlQRV9BTEVSVFMgPSAnYWxlcnRzJztcbmV4cG9ydCBjb25zdCBXQVpVSF9BTEVSVFNfUFJFRklYID0gJ3dhenVoLWFsZXJ0cy0nO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0FMRVJUU19QQVRURVJOID0gJ3dhenVoLWFsZXJ0cy0qJztcblxuLy8gSm9iIC0gV2F6dWggbW9uaXRvcmluZ1xuZXhwb3J0IGNvbnN0IFdBWlVIX0lOREVYX1RZUEVfTU9OSVRPUklORyA9ICdtb25pdG9yaW5nJztcbmV4cG9ydCBjb25zdCBXQVpVSF9NT05JVE9SSU5HX1BSRUZJWCA9ICd3YXp1aC1tb25pdG9yaW5nLSc7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19QQVRURVJOID0gJ3dhenVoLW1vbml0b3JpbmctKic7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19URU1QTEFURV9OQU1FID0gJ3dhenVoLWFnZW50JztcbmV4cG9ydCBjb25zdCBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMgPSAxO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9JTkRJQ0VTX1JFUExJQ0FTID0gMDtcbmV4cG9ydCBjb25zdCBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfQ1JFQVRJT04gPSAndyc7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0VOQUJMRUQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9GUkVRVUVOQ1kgPSA5MDA7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0NST05fRlJFUSA9ICcwICogKiAqICogKic7XG5cbi8vIEpvYiAtIFdhenVoIHN0YXRpc3RpY3NcbmV4cG9ydCBjb25zdCBXQVpVSF9JTkRFWF9UWVBFX1NUQVRJU1RJQ1MgPSAnc3RhdGlzdGljcyc7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1BSRUZJWCA9ICd3YXp1aCc7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUUgPSAnc3RhdGlzdGljcyc7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19QQVRURVJOID0gYCR7V0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1BSRUZJWH0tJHtXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfTkFNRX0tKmA7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19URU1QTEFURV9OQU1FID0gYCR7V0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1BSRUZJWH0tJHtXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfTkFNRX1gO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1NIQVJEUyA9IDE7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX0lORElDRVNfUkVQTElDQVMgPSAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9DUkVBVElPTiA9ICd3JztcbmV4cG9ydCBjb25zdCBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfU1RBVFVTID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfRlJFUVVFTkNZID0gOTAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9DUk9OX0ZSRVEgPSAnMCAqLzUgKiAqICogKic7XG5cbi8vIEpvYiAtIFdhenVoIGluaXRpYWxpemVcbmV4cG9ydCBjb25zdCBXQVpVSF9QTFVHSU5fUExBVEZPUk1fVEVNUExBVEVfTkFNRSA9ICd3YXp1aC1raWJhbmEnO1xuXG4vLyBQZXJtaXNzaW9uc1xuZXhwb3J0IGNvbnN0IFdBWlVIX1JPTEVfQURNSU5JU1RSQVRPUl9JRCA9IDE7XG5leHBvcnQgY29uc3QgV0FaVUhfUk9MRV9BRE1JTklTVFJBVE9SX05BTUUgPSAnYWRtaW5pc3RyYXRvcic7XG5cbi8vIFNhbXBsZSBkYXRhXG5leHBvcnQgY29uc3QgV0FaVUhfU0FNUExFX0FMRVJUX1BSRUZJWCA9ICd3YXp1aC1hbGVydHMtNC54LSc7XG5leHBvcnQgY29uc3QgV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9TSEFSRFMgPSAxO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfUkVQTElDQVMgPSAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfU0VDVVJJVFkgPSAnc2VjdXJpdHknO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfQVVESVRJTkdfUE9MSUNZX01PTklUT1JJTkcgPVxuICAnYXVkaXRpbmctcG9saWN5LW1vbml0b3JpbmcnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfVEhSRUFUX0RFVEVDVElPTiA9ICd0aHJlYXQtZGV0ZWN0aW9uJztcbmV4cG9ydCBjb25zdCBXQVpVSF9TQU1QTEVfQUxFUlRTX0RFRkFVTFRfTlVNQkVSX0FMRVJUUyA9IDMwMDA7XG5leHBvcnQgY29uc3QgV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SSUVTX1RZUEVfQUxFUlRTID0ge1xuICBbV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SWV9TRUNVUklUWV06IFtcbiAgICB7IHN5c2NoZWNrOiB0cnVlIH0sXG4gICAgeyBhd3M6IHRydWUgfSxcbiAgICB7IG9mZmljZTogdHJ1ZSB9LFxuICAgIHsgZ2NwOiB0cnVlIH0sXG4gICAgeyBhdXRoZW50aWNhdGlvbjogdHJ1ZSB9LFxuICAgIHsgc3NoOiB0cnVlIH0sXG4gICAgeyBhcGFjaGU6IHRydWUsIGFsZXJ0czogMjAwMCB9LFxuICAgIHsgd2ViOiB0cnVlIH0sXG4gICAgeyB3aW5kb3dzOiB7IHNlcnZpY2VfY29udHJvbF9tYW5hZ2VyOiB0cnVlIH0sIGFsZXJ0czogMTAwMCB9LFxuICAgIHsgZ2l0aHViOiB0cnVlIH0sXG4gIF0sXG4gIFtXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX0FVRElUSU5HX1BPTElDWV9NT05JVE9SSU5HXTogW1xuICAgIHsgcm9vdGNoZWNrOiB0cnVlIH0sXG4gICAgeyBhdWRpdDogdHJ1ZSB9LFxuICAgIHsgb3BlbnNjYXA6IHRydWUgfSxcbiAgICB7IGNpc2NhdDogdHJ1ZSB9LFxuICBdLFxuICBbV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SWV9USFJFQVRfREVURUNUSU9OXTogW1xuICAgIHsgdnVsbmVyYWJpbGl0aWVzOiB0cnVlIH0sXG4gICAgeyB2aXJ1c3RvdGFsOiB0cnVlIH0sXG4gICAgeyBvc3F1ZXJ5OiB0cnVlIH0sXG4gICAgeyBkb2NrZXI6IHRydWUgfSxcbiAgICB7IG1pdHJlOiB0cnVlIH0sXG4gIF0sXG59O1xuXG4vLyBTZWN1cml0eVxuZXhwb3J0IGNvbnN0IFdBWlVIX1NFQ1VSSVRZX1BMVUdJTl9PUEVOU0VBUkNIX0RBU0hCT0FSRFNfU0VDVVJJVFkgPVxuICAnT3BlblNlYXJjaCBEYXNoYm9hcmRzIFNlY3VyaXR5JztcblxuZXhwb3J0IGNvbnN0IFdBWlVIX1NFQ1VSSVRZX1BMVUdJTlMgPSBbXG4gIFdBWlVIX1NFQ1VSSVRZX1BMVUdJTl9PUEVOU0VBUkNIX0RBU0hCT0FSRFNfU0VDVVJJVFksXG5dO1xuXG4vLyBBcHAgY29uZmlndXJhdGlvblxuZXhwb3J0IGNvbnN0IFdBWlVIX0NPTkZJR1VSQVRJT05fQ0FDSEVfVElNRSA9IDEwMDAwOyAvLyB0aW1lIGluIG1zO1xuXG4vLyBSZXNlcnZlZCBpZHMgZm9yIFVzZXJzL1JvbGUgbWFwcGluZ1xuZXhwb3J0IGNvbnN0IFdBWlVIX0FQSV9SRVNFUlZFRF9JRF9MT1dFUl9USEFOID0gMTAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0FQSV9SRVNFUlZFRF9XVUlfU0VDVVJJVFlfUlVMRVMgPSBbMSwgMl07XG5cbi8vIFdhenVoIGRhdGEgcGF0aFxuY29uc3QgV0FaVUhfREFUQV9QTFVHSU5fUExBVEZPUk1fQkFTRV9QQVRIID0gJ2RhdGEnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0RBVEFfUExVR0lOX1BMQVRGT1JNX0JBU0VfQUJTT0xVVEVfUEFUSCA9IHBhdGguam9pbihcbiAgX19kaXJuYW1lLFxuICAnLi4vLi4vLi4vJyxcbiAgV0FaVUhfREFUQV9QTFVHSU5fUExBVEZPUk1fQkFTRV9QQVRILFxuKTtcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0FCU09MVVRFX1BBVEggPSBwYXRoLmpvaW4oXG4gIFdBWlVIX0RBVEFfUExVR0lOX1BMQVRGT1JNX0JBU0VfQUJTT0xVVEVfUEFUSCxcbiAgJ3dhenVoJyxcbik7XG5cbi8vIFdhenVoIGRhdGEgcGF0aCAtIGNvbmZpZ1xuZXhwb3J0IGNvbnN0IFdBWlVIX0RBVEFfQ09ORklHX0RJUkVDVE9SWV9QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX0FCU09MVVRFX1BBVEgsXG4gICdjb25maWcnLFxuKTtcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0NPTkZJR19BUFBfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9DT05GSUdfRElSRUNUT1JZX1BBVEgsXG4gICd3YXp1aC55bWwnLFxuKTtcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0NPTkZJR19SRUdJU1RSWV9QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX0NPTkZJR19ESVJFQ1RPUllfUEFUSCxcbiAgJ3dhenVoLXJlZ2lzdHJ5Lmpzb24nLFxuKTtcblxuLy8gV2F6dWggZGF0YSBwYXRoIC0gbG9nc1xuZXhwb3J0IGNvbnN0IE1BWF9NQl9MT0dfRklMRVMgPSAxMDA7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9MT0dTX0RJUkVDVE9SWV9QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX0FCU09MVVRFX1BBVEgsXG4gICdsb2dzJyxcbik7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9MT0dTX1BMQUlOX0ZJTEVOQU1FID0gJ3dhenVoYXBwLXBsYWluLmxvZyc7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9MT0dTX1BMQUlOX1BBVEggPSBwYXRoLmpvaW4oXG4gIFdBWlVIX0RBVEFfTE9HU19ESVJFQ1RPUllfUEFUSCxcbiAgV0FaVUhfREFUQV9MT0dTX1BMQUlOX0ZJTEVOQU1FLFxuKTtcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0xPR1NfUkFXX0ZJTEVOQU1FID0gJ3dhenVoYXBwLmxvZyc7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9MT0dTX1JBV19QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX0xPR1NfRElSRUNUT1JZX1BBVEgsXG4gIFdBWlVIX0RBVEFfTE9HU19SQVdfRklMRU5BTUUsXG4pO1xuXG4vLyBXYXp1aCBkYXRhIHBhdGggLSBVSSBsb2dzXG5leHBvcnQgY29uc3QgV0FaVUhfVUlfTE9HU19QTEFJTl9GSUxFTkFNRSA9ICd3YXp1aC11aS1wbGFpbi5sb2cnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1VJX0xPR1NfUkFXX0ZJTEVOQU1FID0gJ3dhenVoLXVpLmxvZyc7XG5leHBvcnQgY29uc3QgV0FaVUhfVUlfTE9HU19QTEFJTl9QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX0xPR1NfRElSRUNUT1JZX1BBVEgsXG4gIFdBWlVIX1VJX0xPR1NfUExBSU5fRklMRU5BTUUsXG4pO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1VJX0xPR1NfUkFXX1BBVEggPSBwYXRoLmpvaW4oXG4gIFdBWlVIX0RBVEFfTE9HU19ESVJFQ1RPUllfUEFUSCxcbiAgV0FaVUhfVUlfTE9HU19SQVdfRklMRU5BTUUsXG4pO1xuXG4vLyBXYXp1aCBkYXRhIHBhdGggLSBkb3dubG9hZHNcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9BQlNPTFVURV9QQVRILFxuICAnZG93bmxvYWRzJyxcbik7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgsXG4gICdyZXBvcnRzJyxcbik7XG5cbi8vIFF1ZXVlXG5leHBvcnQgY29uc3QgV0FaVUhfUVVFVUVfQ1JPTl9GUkVRID0gJyovMTUgKiAqICogKiAqJzsgLy8gRXZlcnkgMTUgc2Vjb25kc1xuXG4vLyBXYXp1aCBlcnJvcnNcbmV4cG9ydCBjb25zdCBXQVpVSF9FUlJPUl9EQUVNT05TX05PVF9SRUFEWSA9ICdFUlJPUjMwOTknO1xuXG4vLyBBZ2VudHNcbmV4cG9ydCBlbnVtIFdBWlVIX0FHRU5UU19PU19UWVBFIHtcbiAgV0lORE9XUyA9ICd3aW5kb3dzJyxcbiAgTElOVVggPSAnbGludXgnLFxuICBTVU5PUyA9ICdzdW5vcycsXG4gIERBUldJTiA9ICdkYXJ3aW4nLFxuICBPVEhFUlMgPSAnJyxcbn1cblxuZXhwb3J0IGVudW0gV0FaVUhfTU9EVUxFU19JRCB7XG4gIFNFQ1VSSVRZX0VWRU5UUyA9ICdnZW5lcmFsJyxcbiAgSU5URUdSSVRZX01PTklUT1JJTkcgPSAnZmltJyxcbiAgQU1BWk9OX1dFQl9TRVJWSUNFUyA9ICdhd3MnLFxuICBPRkZJQ0VfMzY1ID0gJ29mZmljZScsXG4gIEdPT0dMRV9DTE9VRF9QTEFURk9STSA9ICdnY3AnLFxuICBQT0xJQ1lfTU9OSVRPUklORyA9ICdwbScsXG4gIFNFQ1VSSVRZX0NPTkZJR1VSQVRJT05fQVNTRVNTTUVOVCA9ICdzY2EnLFxuICBBVURJVElORyA9ICdhdWRpdCcsXG4gIE9QRU5fU0NBUCA9ICdvc2NhcCcsXG4gIFZVTE5FUkFCSUxJVElFUyA9ICd2dWxzJyxcbiAgT1NRVUVSWSA9ICdvc3F1ZXJ5JyxcbiAgRE9DS0VSID0gJ2RvY2tlcicsXG4gIE1JVFJFX0FUVEFDSyA9ICdtaXRyZScsXG4gIFBDSV9EU1MgPSAncGNpJyxcbiAgSElQQUEgPSAnaGlwYWEnLFxuICBOSVNUXzgwMF81MyA9ICduaXN0JyxcbiAgVFNDID0gJ3RzYycsXG4gIENJU19DQVQgPSAnY2lzY2F0JyxcbiAgVklSVVNUT1RBTCA9ICd2aXJ1c3RvdGFsJyxcbiAgR0RQUiA9ICdnZHByJyxcbiAgR0lUSFVCID0gJ2dpdGh1YicsXG59XG5cbmV4cG9ydCBlbnVtIFdBWlVIX01FTlVfTUFOQUdFTUVOVF9TRUNUSU9OU19JRCB7XG4gIE1BTkFHRU1FTlQgPSAnbWFuYWdlbWVudCcsXG4gIEFETUlOSVNUUkFUSU9OID0gJ2FkbWluaXN0cmF0aW9uJyxcbiAgUlVMRVNFVCA9ICdydWxlc2V0JyxcbiAgUlVMRVMgPSAncnVsZXMnLFxuICBERUNPREVSUyA9ICdkZWNvZGVycycsXG4gIENEQl9MSVNUUyA9ICdsaXN0cycsXG4gIEdST1VQUyA9ICdncm91cHMnLFxuICBDT05GSUdVUkFUSU9OID0gJ2NvbmZpZ3VyYXRpb24nLFxuICBTVEFUVVNfQU5EX1JFUE9SVFMgPSAnc3RhdHVzUmVwb3J0cycsXG4gIFNUQVRVUyA9ICdzdGF0dXMnLFxuICBDTFVTVEVSID0gJ21vbml0b3JpbmcnLFxuICBMT0dTID0gJ2xvZ3MnLFxuICBSRVBPUlRJTkcgPSAncmVwb3J0aW5nJyxcbiAgU1RBVElTVElDUyA9ICdzdGF0aXN0aWNzJyxcbn1cblxuZXhwb3J0IGVudW0gV0FaVUhfTUVOVV9UT09MU19TRUNUSU9OU19JRCB7XG4gIEFQSV9DT05TT0xFID0gJ2RldlRvb2xzJyxcbiAgUlVMRVNFVF9URVNUID0gJ2xvZ3Rlc3QnLFxufVxuXG5leHBvcnQgZW51bSBXQVpVSF9NRU5VX1NFQ1VSSVRZX1NFQ1RJT05TX0lEIHtcbiAgVVNFUlMgPSAndXNlcnMnLFxuICBST0xFUyA9ICdyb2xlcycsXG4gIFBPTElDSUVTID0gJ3BvbGljaWVzJyxcbiAgUk9MRVNfTUFQUElORyA9ICdyb2xlTWFwcGluZycsXG59XG5cbmV4cG9ydCBlbnVtIFdBWlVIX01FTlVfU0VUVElOR1NfU0VDVElPTlNfSUQge1xuICBTRVRUSU5HUyA9ICdzZXR0aW5ncycsXG4gIEFQSV9DT05GSUdVUkFUSU9OID0gJ2FwaScsXG4gIE1PRFVMRVMgPSAnbW9kdWxlcycsXG4gIFNBTVBMRV9EQVRBID0gJ3NhbXBsZV9kYXRhJyxcbiAgQ09ORklHVVJBVElPTiA9ICdjb25maWd1cmF0aW9uJyxcbiAgTE9HUyA9ICdsb2dzJyxcbiAgTUlTQ0VMTEFORU9VUyA9ICdtaXNjZWxsYW5lb3VzJyxcbiAgQUJPVVQgPSAnYWJvdXQnLFxufVxuXG5leHBvcnQgY29uc3QgQVVUSE9SSVpFRF9BR0VOVFMgPSAnYXV0aG9yaXplZC1hZ2VudHMnO1xuXG4vLyBXYXp1aCBsaW5rc1xuZXhwb3J0IGNvbnN0IFdBWlVIX0xJTktfR0lUSFVCID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS93YXp1aCc7XG5leHBvcnQgY29uc3QgV0FaVUhfTElOS19HT09HTEVfR1JPVVBTID1cbiAgJ2h0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFmb3J1bS93YXp1aCc7XG5leHBvcnQgY29uc3QgV0FaVUhfTElOS19TTEFDSyA9ICdodHRwczovL3dhenVoLmNvbS9jb21tdW5pdHkvam9pbi11cy1vbi1zbGFjayc7XG5cbmV4cG9ydCBjb25zdCBIRUFMVEhfQ0hFQ0sgPSAnaGVhbHRoLWNoZWNrJztcblxuLy8gSGVhbHRoIGNoZWNrXG5leHBvcnQgY29uc3QgSEVBTFRIX0NIRUNLX1JFRElSRUNUSU9OX1RJTUUgPSAzMDA7IC8vbXNcblxuLy8gUGx1Z2luIHBsYXRmb3JtIHNldHRpbmdzXG4vLyBEZWZhdWx0IHRpbWVGaWx0ZXIgc2V0IGJ5IHRoZSBhcHBcbmV4cG9ydCBjb25zdCBXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19USU1FX0ZJTFRFUiA9IHtcbiAgZnJvbTogJ25vdy0yNGgnLFxuICB0bzogJ25vdycsXG59O1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9TRVRUSU5HX05BTUVfVElNRV9GSUxURVIgPVxuICAndGltZXBpY2tlcjp0aW1lRGVmYXVsdHMnO1xuXG4vLyBEZWZhdWx0IG1heEJ1Y2tldHMgc2V0IGJ5IHRoZSBhcHBcbmV4cG9ydCBjb25zdCBXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19NQVhfQlVDS0VUUyA9IDIwMDAwMDtcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fU0VUVElOR19OQU1FX01BWF9CVUNLRVRTID0gJ3RpbWVsaW5lOm1heF9idWNrZXRzJztcblxuLy8gRGVmYXVsdCBtZXRhRmllbGRzIHNldCBieSB0aGUgYXBwXG5leHBvcnQgY29uc3QgV0FaVUhfUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTUVUQUZJRUxEUyA9IFsnX3NvdXJjZScsICdfaW5kZXgnXTtcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fU0VUVElOR19OQU1FX01FVEFGSUVMRFMgPSAnbWV0YUZpZWxkcyc7XG5cbi8vIExvZ2dlclxuZXhwb3J0IGNvbnN0IFVJX0xPR0dFUl9MRVZFTFMgPSB7XG4gIFdBUk5JTkc6ICdXQVJOSU5HJyxcbiAgSU5GTzogJ0lORk8nLFxuICBFUlJPUjogJ0VSUk9SJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVSV9UT0FTVF9DT0xPUiA9IHtcbiAgU1VDQ0VTUzogJ3N1Y2Nlc3MnLFxuICBXQVJOSU5HOiAnd2FybmluZycsXG4gIERBTkdFUjogJ2RhbmdlcicsXG59O1xuXG4vLyBBc3NldHNcbmV4cG9ydCBjb25zdCBBU1NFVFNfQkFTRV9VUkxfUFJFRklYID0gJy9wbHVnaW5zL3dhenVoL2Fzc2V0cy8nO1xuZXhwb3J0IGNvbnN0IEFTU0VUU19QVUJMSUNfVVJMID0gJy9wbHVnaW5zL3dhenVoL3B1YmxpYy9hc3NldHMvJztcblxuLy8gUmVwb3J0c1xuZXhwb3J0IGNvbnN0IFJFUE9SVFNfTE9HT19JTUFHRV9BU1NFVFNfUkVMQVRJVkVfUEFUSCA9XG4gICdpbWFnZXMvbG9nb19yZXBvcnRzLnBuZyc7XG5leHBvcnQgY29uc3QgUkVQT1JUU19QUklNQVJZX0NPTE9SID0gJyMyNTZCRDEnO1xuZXhwb3J0IGNvbnN0IFJFUE9SVFNfUEFHRV9GT09URVJfVEVYVCA9ICdDb3B5cmlnaHQgwqkgMjAyMyBXYXp1aCwgSW5jLic7XG5leHBvcnQgY29uc3QgUkVQT1JUU19QQUdFX0hFQURFUl9URVhUID0gJ2luZm9Ad2F6dWguY29tXFxuaHR0cHM6Ly93YXp1aC5jb20nO1xuXG4vLyBQbHVnaW4gcGxhdGZvcm1cbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fTkFNRSA9ICdXYXp1aCBkYXNoYm9hcmQnO1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9CQVNFX0lOU1RBTExBVElPTl9QQVRIID1cbiAgJy91c3Ivc2hhcmUvd2F6dWgtZGFzaGJvYXJkL2RhdGEvd2F6dWgvJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fSU5TVEFMTEFUSU9OX1VTRVIgPSAnd2F6dWgtZGFzaGJvYXJkJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fSU5TVEFMTEFUSU9OX1VTRVJfR1JPVVAgPSAnd2F6dWgtZGFzaGJvYXJkJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fV0FaVUhfRE9DVU1FTlRBVElPTl9VUkxfUEFUSF9VUEdSQURFX1BMQVRGT1JNID1cbiAgJ3VwZ3JhZGUtZ3VpZGUnO1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9XQVpVSF9ET0NVTUVOVEFUSU9OX1VSTF9QQVRIX1RST1VCTEVTSE9PVElORyA9XG4gICd1c2VyLW1hbnVhbC93YXp1aC1kYXNoYm9hcmQvdHJvdWJsZXNob290aW5nLmh0bWwnO1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9XQVpVSF9ET0NVTUVOVEFUSU9OX1VSTF9QQVRIX0FQUF9DT05GSUdVUkFUSU9OID1cbiAgJ3VzZXItbWFudWFsL3dhenVoLWRhc2hib2FyZC9jb25maWctZmlsZS5odG1sJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fVVJMX0dVSURFID1cbiAgJ2h0dHBzOi8vb3BlbnNlYXJjaC5vcmcvZG9jcy8yLjgvYWJvdXQnO1xuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9VUkxfR1VJREVfVElUTEUgPSAnT3BlblNlYXJjaCBndWlkZSc7XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fUkVRVUVTVF9IRUFERVJTID0ge1xuICAnb3NkLXhzcmYnOiAna2liYW5hJyxcbn07XG5cbi8vIFBsdWdpbiBhcHBcbmV4cG9ydCBjb25zdCBQTFVHSU5fQVBQX05BTUUgPSAnV2F6dWggZGFzaGJvYXJkJztcblxuLy8gVUlcbmV4cG9ydCBjb25zdCBBUElfTkFNRV9BR0VOVF9TVEFUVVMgPSB7XG4gIEFDVElWRTogJ2FjdGl2ZScsXG4gIERJU0NPTk5FQ1RFRDogJ2Rpc2Nvbm5lY3RlZCcsXG4gIFBFTkRJTkc6ICdwZW5kaW5nJyxcbiAgTkVWRVJfQ09OTkVDVEVEOiAnbmV2ZXJfY29ubmVjdGVkJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBVSV9DT0xPUl9BR0VOVF9TVEFUVVMgPSB7XG4gIFtBUElfTkFNRV9BR0VOVF9TVEFUVVMuQUNUSVZFXTogJyMwMDc4NzEnLFxuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLkRJU0NPTk5FQ1RFRF06ICcjQkQyNzFFJyxcbiAgW0FQSV9OQU1FX0FHRU5UX1NUQVRVUy5QRU5ESU5HXTogJyNGRUM1MTQnLFxuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLk5FVkVSX0NPTk5FQ1RFRF06ICcjNjQ2QTc3JyxcbiAgZGVmYXVsdDogJyMwMDAwMDAnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IGNvbnN0IFVJX0xBQkVMX05BTUVfQUdFTlRfU1RBVFVTID0ge1xuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLkFDVElWRV06ICdBY3RpdmUnLFxuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLkRJU0NPTk5FQ1RFRF06ICdEaXNjb25uZWN0ZWQnLFxuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLlBFTkRJTkddOiAnUGVuZGluZycsXG4gIFtBUElfTkFNRV9BR0VOVF9TVEFUVVMuTkVWRVJfQ09OTkVDVEVEXTogJ05ldmVyIGNvbm5lY3RlZCcsXG4gIGRlZmF1bHQ6ICdVbmtub3duJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBVSV9PUkRFUl9BR0VOVF9TVEFUVVMgPSBbXG4gIEFQSV9OQU1FX0FHRU5UX1NUQVRVUy5BQ1RJVkUsXG4gIEFQSV9OQU1FX0FHRU5UX1NUQVRVUy5ESVNDT05ORUNURUQsXG4gIEFQSV9OQU1FX0FHRU5UX1NUQVRVUy5QRU5ESU5HLFxuICBBUElfTkFNRV9BR0VOVF9TVEFUVVMuTkVWRVJfQ09OTkVDVEVELFxuXTtcblxuZXhwb3J0IGNvbnN0IEFHRU5UX1NZTkNFRF9TVEFUVVMgPSB7XG4gIFNZTkNFRDogJ3N5bmNlZCcsXG4gIE5PVF9TWU5DRUQ6ICdub3Qgc3luY2VkJyxcbn07XG5cbi8vIFRoZSBzdGF0dXMgY29kZSBjYW4gYmUgc2VlbiBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS93YXp1aC93YXp1aC9ibG9iLzY4NjA2OGExZjA1ZDgwNmIyZTNiM2Q2MzNhNzY1MzIwYWU3YWUxMTQvc3JjL3dhenVoX2RiL3dkYi5oI0w1NS1MNjFcblxuZXhwb3J0IGNvbnN0IEFHRU5UX1NUQVRVU19DT0RFID0gW1xuICB7XG4gICAgU1RBVFVTX0NPREU6IDAsXG4gICAgU1RBVFVTX0RFU0NSSVBUSU9OOiAnQWdlbnQgaXMgY29ubmVjdGVkJyxcbiAgfSxcbiAge1xuICAgIFNUQVRVU19DT0RFOiAxLFxuICAgIFNUQVRVU19ERVNDUklQVElPTjogJ0ludmFsaWQgYWdlbnQgdmVyc2lvbicsXG4gIH0sXG4gIHtcbiAgICBTVEFUVVNfQ09ERTogMixcbiAgICBTVEFUVVNfREVTQ1JJUFRJT046ICdFcnJvciByZXRyaWV2aW5nIHZlcnNpb24nLFxuICB9LFxuICB7XG4gICAgU1RBVFVTX0NPREU6IDMsXG4gICAgU1RBVFVTX0RFU0NSSVBUSU9OOiAnU2h1dGRvd24gbWVzc2FnZSByZWNlaXZlZCcsXG4gIH0sXG4gIHtcbiAgICBTVEFUVVNfQ09ERTogNCxcbiAgICBTVEFUVVNfREVTQ1JJUFRJT046ICdEaXNjb25uZWN0ZWQgYmVjYXVzZSBubyBrZWVwYWxpdmUgcmVjZWl2ZWQnLFxuICB9LFxuICB7XG4gICAgU1RBVFVTX0NPREU6IDUsXG4gICAgU1RBVFVTX0RFU0NSSVBUSU9OOiAnQ29ubmVjdGlvbiByZXNldCBieSBtYW5hZ2VyJyxcbiAgfSxcbl07XG5cbi8vIERvY3VtZW50YXRpb25cbmV4cG9ydCBjb25zdCBET0NVTUVOVEFUSU9OX1dFQl9CQVNFX1VSTCA9ICdodHRwczovL2RvY3VtZW50YXRpb24ud2F6dWguY29tJztcblxuLy8gRGVmYXVsdCBFbGFzdGljc2VhcmNoIHVzZXIgbmFtZSBjb250ZXh0XG5leHBvcnQgY29uc3QgRUxBU1RJQ19OQU1FID0gJ2VsYXN0aWMnO1xuXG4vLyBEZWZhdWx0IFdhenVoIGluZGV4ZXIgbmFtZVxuZXhwb3J0IGNvbnN0IFdBWlVIX0lOREVYRVJfTkFNRSA9ICdXYXp1aCBpbmRleGVyJztcblxuLy8gQ3VzdG9taXphdGlvblxuZXhwb3J0IGNvbnN0IENVU1RPTUlaQVRJT05fRU5EUE9JTlRfUEFZTE9BRF9VUExPQURfQ1VTVE9NX0ZJTEVfTUFYSU1VTV9CWVRFUyA9IDEwNDg1NzY7XG5cbi8vIFBsdWdpbiBzZXR0aW5nc1xuZXhwb3J0IGVudW0gU2V0dGluZ0NhdGVnb3J5IHtcbiAgR0VORVJBTCxcbiAgSEVBTFRIX0NIRUNLLFxuICBFWFRFTlNJT05TLFxuICBNT05JVE9SSU5HLFxuICBTVEFUSVNUSUNTLFxuICBTRUNVUklUWSxcbiAgQ1VTVE9NSVpBVElPTixcbn1cblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNUZXh0QXJlYSA9IHtcbiAgbWF4Um93cz86IG51bWJlcjtcbiAgbWluUm93cz86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xufTtcblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNTZWxlY3QgPSB7XG4gIHNlbGVjdDogeyB0ZXh0OiBzdHJpbmc7IHZhbHVlOiBhbnkgfVtdO1xufTtcblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNFZGl0b3IgPSB7XG4gIGVkaXRvcjoge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gIH07XG59O1xuXG50eXBlIFRQbHVnaW5TZXR0aW5nT3B0aW9uc0ZpbGUgPSB7XG4gIGZpbGU6IHtcbiAgICB0eXBlOiAnaW1hZ2UnO1xuICAgIGV4dGVuc2lvbnM/OiBzdHJpbmdbXTtcbiAgICBzaXplPzoge1xuICAgICAgbWF4Qnl0ZXM/OiBudW1iZXI7XG4gICAgICBtaW5CeXRlcz86IG51bWJlcjtcbiAgICB9O1xuICAgIHJlY29tbWVuZGVkPzoge1xuICAgICAgZGltZW5zaW9ucz86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIHVuaXQ6IHN0cmluZztcbiAgICAgIH07XG4gICAgfTtcbiAgICBzdG9yZT86IHtcbiAgICAgIHJlbGF0aXZlUGF0aEZpbGVTeXN0ZW06IHN0cmluZztcbiAgICAgIGZpbGVuYW1lOiBzdHJpbmc7XG4gICAgICByZXNvbHZlU3RhdGljVVJMOiAoZmlsZW5hbWU6IHN0cmluZykgPT4gc3RyaW5nO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIFRQbHVnaW5TZXR0aW5nT3B0aW9uc051bWJlciA9IHtcbiAgbnVtYmVyOiB7XG4gICAgbWluPzogbnVtYmVyO1xuICAgIG1heD86IG51bWJlcjtcbiAgICBpbnRlZ2VyPzogYm9vbGVhbjtcbiAgfTtcbn07XG5cbnR5cGUgVFBsdWdpblNldHRpbmdPcHRpb25zU3dpdGNoID0ge1xuICBzd2l0Y2g6IHtcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGRpc2FibGVkOiB7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZTogYW55IH07XG4gICAgICBlbmFibGVkOiB7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZTogYW55IH07XG4gICAgfTtcbiAgfTtcbn07XG5cbmV4cG9ydCBlbnVtIEVwbHVnaW5TZXR0aW5nVHlwZSB7XG4gIHRleHQgPSAndGV4dCcsXG4gIHRleHRhcmVhID0gJ3RleHRhcmVhJyxcbiAgc3dpdGNoID0gJ3N3aXRjaCcsXG4gIG51bWJlciA9ICdudW1iZXInLFxuICBlZGl0b3IgPSAnZWRpdG9yJyxcbiAgc2VsZWN0ID0gJ3NlbGVjdCcsXG4gIGZpbGVwaWNrZXIgPSAnZmlsZXBpY2tlcicsXG59XG5cbmV4cG9ydCB0eXBlIFRQbHVnaW5TZXR0aW5nID0ge1xuICAvLyBEZWZpbmUgdGhlIHRleHQgZGlzcGxheWVkIGluIHRoZSBVSS5cbiAgdGl0bGU6IHN0cmluZztcbiAgLy8gRGVzY3JpcHRpb24uXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIC8vIENhdGVnb3J5LlxuICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5O1xuICAvLyBUeXBlLlxuICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGU7XG4gIC8vIERlZmF1bHQgdmFsdWUuXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuICAvLyBEZWZhdWx0IHZhbHVlIGlmIGl0IGlzIG5vdCBzZXQuIEl0IGhhcyBwcmVmZXJlbmNlIG92ZXIgYGRlZmF1bHRgLlxuICBkZWZhdWx0VmFsdWVJZk5vdFNldD86IGFueTtcbiAgLy8gQ29uZmlndXJhYmxlIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogYm9vbGVhbjtcbiAgLy8gQ29uZmlndXJhYmxlIGZyb20gdGhlIFVJIChTZXR0aW5ncy9Db25maWd1cmF0aW9uKS5cbiAgaXNDb25maWd1cmFibGVGcm9tVUk6IGJvb2xlYW47XG4gIC8vIE1vZGlmeSB0aGUgc2V0dGluZyByZXF1aXJlcyBydW5uaW5nIHRoZSBwbHVnaW4gaGVhbHRoIGNoZWNrIChmcm9udGVuZCkuXG4gIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrPzogYm9vbGVhbjtcbiAgLy8gTW9kaWZ5IHRoZSBzZXR0aW5nIHJlcXVpcmVzIHJlbG9hZGluZyB0aGUgYnJvd3NlciB0YWIgKGZyb250ZW5kKS5cbiAgcmVxdWlyZXNSZWxvYWRpbmdCcm93c2VyVGFiPzogYm9vbGVhbjtcbiAgLy8gTW9kaWZ5IHRoZSBzZXR0aW5nIHJlcXVpcmVzIHJlc3RhcnRpbmcgdGhlIHBsdWdpbiBwbGF0Zm9ybSB0byB0YWtlIGVmZmVjdC5cbiAgcmVxdWlyZXNSZXN0YXJ0aW5nUGx1Z2luUGxhdGZvcm0/OiBib29sZWFuO1xuICAvLyBEZWZpbmUgb3B0aW9ucyByZWxhdGVkIHRvIHRoZSBgdHlwZWAuXG4gIG9wdGlvbnM/OlxuICAgIHwgVFBsdWdpblNldHRpbmdPcHRpb25zRWRpdG9yXG4gICAgfCBUUGx1Z2luU2V0dGluZ09wdGlvbnNGaWxlXG4gICAgfCBUUGx1Z2luU2V0dGluZ09wdGlvbnNOdW1iZXJcbiAgICB8IFRQbHVnaW5TZXR0aW5nT3B0aW9uc1NlbGVjdFxuICAgIHwgVFBsdWdpblNldHRpbmdPcHRpb25zU3dpdGNoXG4gICAgfCBUUGx1Z2luU2V0dGluZ09wdGlvbnNUZXh0QXJlYTtcbiAgLy8gVHJhbnNmb3JtIHRoZSBpbnB1dCB2YWx1ZS4gVGhlIHJlc3VsdCBpcyBzYXZlZCBpbiB0aGUgZm9ybSBnbG9iYWwgc3RhdGUgb2YgU2V0dGluZ3MvQ29uZmlndXJhdGlvblxuICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZT86ICh2YWx1ZTogYW55KSA9PiBhbnk7XG4gIC8vIFRyYW5zZm9ybSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBvciBkZWZhdWx0IGFzIGluaXRpYWwgdmFsdWUgZm9yIHRoZSBpbnB1dCBpbiBTZXR0aW5ncy9Db25maWd1cmF0aW9uXG4gIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZT86ICh2YWx1ZTogYW55KSA9PiBhbnk7XG4gIC8vIFRyYW5zZm9ybSB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlZCBpbiB0aGUgZm9ybSBvZiBTZXR0aW5ncy9Db25maWd1cmF0aW9uIGFuZCByZXR1cm5lZCBpbiB0aGUgYGNoYW5nZWRgIHByb3BlcnR5IG9mIHRoZSBob29rIHVzZUZvcm1cbiAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlPzogKHZhbHVlOiBhbnkpID0+IGFueTtcbiAgLy8gVmFsaWRhdGUgdGhlIHZhbHVlIGluIHRoZSBmb3JtIG9mIFNldHRpbmdzL0NvbmZpZ3VyYXRpb24uIEl0IHJldHVybnMgYSBzdHJpbmcgaWYgdGhlcmUgaXMgc29tZSB2YWxpZGF0aW9uIGVycm9yLlxuICB2YWxpZGF0ZT86ICh2YWx1ZTogYW55KSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIC8vIFZhbGlkYXRlIGZ1bmN0aW9uIGNyZWF0b3IgdG8gdmFsaWRhdGUgdGhlIHNldHRpbmcgaW4gdGhlIGJhY2tlbmQuIEl0IHVzZXMgYHNjaGVtYWAgb2YgdGhlIGBAa2JuL2NvbmZpZy1zY2hlbWFgIHBhY2thZ2UuXG4gIHZhbGlkYXRlQmFja2VuZD86IChzY2hlbWE6IGFueSkgPT4gKHZhbHVlOiB1bmtub3duKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgdHlwZSBUUGx1Z2luU2V0dGluZ1dpdGhLZXkgPSBUUGx1Z2luU2V0dGluZyAmIHsga2V5OiBUUGx1Z2luU2V0dGluZ0tleSB9O1xuZXhwb3J0IHR5cGUgVFBsdWdpblNldHRpbmdDYXRlZ29yeSA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGRvY3VtZW50YXRpb25MaW5rPzogc3RyaW5nO1xuICByZW5kZXJPcmRlcj86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fU0VUVElOR1NfQ0FURUdPUklFUzoge1xuICBbY2F0ZWdvcnk6IG51bWJlcl06IFRQbHVnaW5TZXR0aW5nQ2F0ZWdvcnk7XG59ID0ge1xuICBbU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDS106IHtcbiAgICB0aXRsZTogJ0hlYWx0aCBjaGVjaycsXG4gICAgZGVzY3JpcHRpb246IFwiQ2hlY2tzIHdpbGwgYmUgZXhlY3V0ZWQgYnkgdGhlIGFwcCdzIEhlYWx0aGNoZWNrLlwiLFxuICAgIHJlbmRlck9yZGVyOiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICB9LFxuICBbU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUxdOiB7XG4gICAgdGl0bGU6ICdHZW5lcmFsJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdCYXNpYyBhcHAgc2V0dGluZ3MgcmVsYXRlZCB0byBhbGVydHMgaW5kZXggcGF0dGVybiwgaGlkZSB0aGUgbWFuYWdlciBhbGVydHMgaW4gdGhlIGRhc2hib2FyZHMsIGxvZ3MgbGV2ZWwgYW5kIG1vcmUuJyxcbiAgICByZW5kZXJPcmRlcjogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gIH0sXG4gIFtTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OU106IHtcbiAgICB0aXRsZTogJ0luaXRpYWwgZGlzcGxheSBzdGF0ZSBvZiB0aGUgbW9kdWxlcyBvZiB0aGUgbmV3IEFQSSBob3N0IGVudHJpZXMuJyxcbiAgICBkZXNjcmlwdGlvbjogJ0V4dGVuc2lvbnMuJyxcbiAgfSxcbiAgW1NldHRpbmdDYXRlZ29yeS5TRUNVUklUWV06IHtcbiAgICB0aXRsZTogJ1NlY3VyaXR5JyxcbiAgICBkZXNjcmlwdGlvbjogJ0FwcGxpY2F0aW9uIHNlY3VyaXR5IG9wdGlvbnMgc3VjaCBhcyB1bmF1dGhvcml6ZWQgcm9sZXMuJyxcbiAgICByZW5kZXJPcmRlcjogU2V0dGluZ0NhdGVnb3J5LlNFQ1VSSVRZLFxuICB9LFxuICBbU2V0dGluZ0NhdGVnb3J5Lk1PTklUT1JJTkddOiB7XG4gICAgdGl0bGU6ICdUYXNrOk1vbml0b3JpbmcnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ09wdGlvbnMgcmVsYXRlZCB0byB0aGUgYWdlbnQgc3RhdHVzIG1vbml0b3Jpbmcgam9iIGFuZCBpdHMgc3RvcmFnZSBpbiBpbmRleGVzLicsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5NT05JVE9SSU5HLFxuICB9LFxuICBbU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1NdOiB7XG4gICAgdGl0bGU6ICdUYXNrOlN0YXRpc3RpY3MnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ09wdGlvbnMgcmVsYXRlZCB0byB0aGUgZGFlbW9ucyBtYW5hZ2VyIG1vbml0b3Jpbmcgam9iIGFuZCB0aGVpciBzdG9yYWdlIGluIGluZGV4ZXMuJyxcbiAgICByZW5kZXJPcmRlcjogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gIH0sXG4gIFtTZXR0aW5nQ2F0ZWdvcnkuQ1VTVE9NSVpBVElPTl06IHtcbiAgICB0aXRsZTogJ0N1c3RvbSBicmFuZGluZycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnSWYgeW91IHdhbnQgdG8gdXNlIGN1c3RvbSBicmFuZGluZyBlbGVtZW50cyBzdWNoIGFzIGxvZ29zLCB5b3UgY2FuIGRvIHNvIGJ5IGVkaXRpbmcgdGhlIHNldHRpbmdzIGJlbG93LicsXG4gICAgZG9jdW1lbnRhdGlvbkxpbms6ICd1c2VyLW1hbnVhbC93YXp1aC1kYXNoYm9hcmQvd2hpdGUtbGFiZWxpbmcuaHRtbCcsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9TRVRUSU5HUzogeyBba2V5OiBzdHJpbmddOiBUUGx1Z2luU2V0dGluZyB9ID0ge1xuICAnYWxlcnRzLnNhbXBsZS5wcmVmaXgnOiB7XG4gICAgdGl0bGU6ICdTYW1wbGUgYWxlcnRzIHByZWZpeCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRGVmaW5lIHRoZSBpbmRleCBuYW1lIHByZWZpeCBvZiBzYW1wbGUgYWxlcnRzLiBJdCBtdXN0IG1hdGNoIHRoZSB0ZW1wbGF0ZSB1c2VkIGJ5IHRoZSBpbmRleCBwYXR0ZXJuIHRvIGF2b2lkIHVua25vd24gZmllbGRzIGluIGRhc2hib2FyZHMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9TQU1QTEVfQUxFUlRfUFJFRklYLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2s6IHRydWUsXG4gICAgLy8gVmFsaWRhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMvZWxhc3RpY3NlYXJjaC9ibG9iL3Y3LjEwLjIvZG9jcy9yZWZlcmVuY2UvaW5kaWNlcy9jcmVhdGUtaW5kZXguYXNjaWlkb2NcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vU3RhcnRzV2l0aFN0cmluZygnLScsICdfJywgJysnLCAnLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm90SW52YWxpZENoYXJhY3RlcnMoXG4gICAgICAgICdcXFxcJyxcbiAgICAgICAgJy8nLFxuICAgICAgICAnPycsXG4gICAgICAgICdcIicsXG4gICAgICAgICc8JyxcbiAgICAgICAgJz4nLFxuICAgICAgICAnfCcsXG4gICAgICAgICcsJyxcbiAgICAgICAgJyMnLFxuICAgICAgICAnKicsXG4gICAgICApLFxuICAgICksXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLnN0cmluZyh7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlIH0pO1xuICAgIH0sXG4gIH0sXG4gICdjaGVja3MuYXBpJzoge1xuICAgIHRpdGxlOiAnQVBJIGNvbm5lY3Rpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIEFQSSBoZWFsdGggY2hlY2sgd2hlbiBvcGVuaW5nIHRoZSBhcHAuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDSyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnY2hlY2tzLmZpZWxkcyc6IHtcbiAgICB0aXRsZTogJ0tub3duIGZpZWxkcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIGtub3duIGZpZWxkcyBoZWFsdGggY2hlY2sgd2hlbiBvcGVuaW5nIHRoZSBhcHAuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDSyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnY2hlY2tzLm1heEJ1Y2tldHMnOiB7XG4gICAgdGl0bGU6ICdTZXQgbWF4IGJ1Y2tldHMgdG8gMjAwMDAwJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdDaGFuZ2UgdGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHBsdWdpbiBwbGF0Zm9ybSBtYXggYnVja2V0cyBjb25maWd1cmF0aW9uLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0ssXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2NoZWNrcy5tZXRhRmllbGRzJzoge1xuICAgIHRpdGxlOiAnUmVtb3ZlIG1ldGEgZmllbGRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdDaGFuZ2UgdGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHBsdWdpbiBwbGF0Zm9ybSBtZXRhRmllbGQgY29uZmlndXJhdGlvbi4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdjaGVja3MucGF0dGVybic6IHtcbiAgICB0aXRsZTogJ0luZGV4IHBhdHRlcm4nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBpbmRleCBwYXR0ZXJuIGhlYWx0aCBjaGVjayB3aGVuIG9wZW5pbmcgdGhlIGFwcC4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdjaGVja3Muc2V0dXAnOiB7XG4gICAgdGl0bGU6ICdBUEkgdmVyc2lvbicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIHNldHVwIGhlYWx0aCBjaGVjayB3aGVuIG9wZW5pbmcgdGhlIGFwcC4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdjaGVja3MudGVtcGxhdGUnOiB7XG4gICAgdGl0bGU6ICdJbmRleCB0ZW1wbGF0ZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIHRlbXBsYXRlIGhlYWx0aCBjaGVjayB3aGVuIG9wZW5pbmcgdGhlIGFwcC4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdjaGVja3MudGltZUZpbHRlcic6IHtcbiAgICB0aXRsZTogJ1NldCB0aW1lIGZpbHRlciB0byAyNGgnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0NoYW5nZSB0aGUgZGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGx1Z2luIHBsYXRmb3JtIHRpbWVGaWx0ZXIgY29uZmlndXJhdGlvbi4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdjcm9uLnByZWZpeCc6IHtcbiAgICB0aXRsZTogJ0Nyb24gcHJlZml4JyxcbiAgICBkZXNjcmlwdGlvbjogJ0RlZmluZSB0aGUgaW5kZXggcHJlZml4IG9mIHByZWRlZmluZWQgam9icy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9QUkVGSVgsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICAvLyBWYWxpZGF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vZWxhc3RpYy9lbGFzdGljc2VhcmNoL2Jsb2IvdjcuMTAuMi9kb2NzL3JlZmVyZW5jZS9pbmRpY2VzL2NyZWF0ZS1pbmRleC5hc2NpaWRvY1xuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9TdGFydHNXaXRoU3RyaW5nKCctJywgJ18nLCAnKycsICcuJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgJ1xcXFwnLFxuICAgICAgICAnLycsXG4gICAgICAgICc/JyxcbiAgICAgICAgJ1wiJyxcbiAgICAgICAgJzwnLFxuICAgICAgICAnPicsXG4gICAgICAgICd8JyxcbiAgICAgICAgJywnLFxuICAgICAgICAnIycsXG4gICAgICAgICcqJyxcbiAgICAgICksXG4gICAgKSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuc3RyaW5nKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5hcGlzJzoge1xuICAgIHRpdGxlOiAnSW5jbHVkZXMgQVBJcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW50ZXIgdGhlIElEIG9mIHRoZSBob3N0cyB5b3Ugd2FudCB0byBzYXZlIGRhdGEgZnJvbSwgbGVhdmUgdGhpcyBlbXB0eSB0byBydW4gdGhlIHRhc2sgb24gZXZlcnkgaG9zdC4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuZWRpdG9yLFxuICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBlZGl0b3I6IHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdqc29uJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgKTogYW55IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5qc29uKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuYXJyYXkoXG4gICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzU3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmFycmF5T2YoXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgICAgICksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICAnY3Jvbi5zdGF0aXN0aWNzLmluZGV4LmNyZWF0aW9uJzoge1xuICAgIHRpdGxlOiAnSW5kZXggY3JlYXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVmaW5lIHRoZSBpbnRlcnZhbCBpbiB3aGljaCBhIG5ldyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnNlbGVjdCxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzZWxlY3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIb3VybHknLFxuICAgICAgICAgIHZhbHVlOiAnaCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnRGFpbHknLFxuICAgICAgICAgIHZhbHVlOiAnZCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnV2Vla2x5JyxcbiAgICAgICAgICB2YWx1ZTogJ3cnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ01vbnRobHknLFxuICAgICAgICAgIHZhbHVlOiAnbScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfQ1JFQVRJT04sXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IubGl0ZXJhbChcbiAgICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdC5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEub25lT2YoXG4gICAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3QubWFwKCh7IHZhbHVlIH0pID0+IHNjaGVtYS5saXRlcmFsKHZhbHVlKSksXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gICdjcm9uLnN0YXRpc3RpY3MuaW5kZXgubmFtZSc6IHtcbiAgICB0aXRsZTogJ0luZGV4IG5hbWUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSB0aGUgbmFtZSBvZiB0aGUgaW5kZXggaW4gd2hpY2ggdGhlIGRvY3VtZW50cyB3aWxsIGJlIHNhdmVkLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5TVEFUSVNUSUNTLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICAvLyBWYWxpZGF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vZWxhc3RpYy9lbGFzdGljc2VhcmNoL2Jsb2IvdjcuMTAuMi9kb2NzL3JlZmVyZW5jZS9pbmRpY2VzL2NyZWF0ZS1pbmRleC5hc2NpaWRvY1xuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9TdGFydHNXaXRoU3RyaW5nKCctJywgJ18nLCAnKycsICcuJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgJ1xcXFwnLFxuICAgICAgICAnLycsXG4gICAgICAgICc/JyxcbiAgICAgICAgJ1wiJyxcbiAgICAgICAgJzwnLFxuICAgICAgICAnPicsXG4gICAgICAgICd8JyxcbiAgICAgICAgJywnLFxuICAgICAgICAnIycsXG4gICAgICAgICcqJyxcbiAgICAgICksXG4gICAgKSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuc3RyaW5nKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5pbmRleC5yZXBsaWNhcyc6IHtcbiAgICB0aXRsZTogJ0luZGV4IHJlcGxpY2FzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiByZXBsaWNhcyB0byB1c2UgZm9yIHRoZSBzdGF0aXN0aWNzIGluZGljZXMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLm51bWJlcixcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1JFUExJQ0FTLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2s6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgbnVtYmVyOiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgaW50ZWdlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBudW1iZXIsXG4gICAgKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5udW1iZXIodGhpcy5vcHRpb25zLm51bWJlcikodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLm51bWJlcih7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlLmJpbmQodGhpcykgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5pbmRleC5zaGFyZHMnOiB7XG4gICAgdGl0bGU6ICdJbmRleCBzaGFyZHMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSB0aGUgbnVtYmVyIG9mIHNoYXJkcyB0byB1c2UgZm9yIHRoZSBzdGF0aXN0aWNzIGluZGljZXMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLm51bWJlcixcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1NIQVJEUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDEsXG4gICAgICAgIGludGVnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEubnVtYmVyKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKSB9KTtcbiAgICB9LFxuICB9LFxuICAnY3Jvbi5zdGF0aXN0aWNzLmludGVydmFsJzoge1xuICAgIHRpdGxlOiAnSW50ZXJ2YWwnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSB0aGUgZnJlcXVlbmN5IG9mIHRhc2sgZXhlY3V0aW9uIHVzaW5nIGNyb24gc2NoZWR1bGUgZXhwcmVzc2lvbnMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfQ1JPTl9GUkVRLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSZXN0YXJ0aW5nUGx1Z2luUGxhdGZvcm06IHRydWUsXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGVOb2RlQ3JvbkludGVydmFsKHZhbHVlKVxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6ICdJbnRlcnZhbCBpcyBub3QgdmFsaWQuJztcbiAgICB9LFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5zdHJpbmcoeyB2YWxpZGF0ZTogdGhpcy52YWxpZGF0ZSB9KTtcbiAgICB9LFxuICB9LFxuICAnY3Jvbi5zdGF0aXN0aWNzLnN0YXR1cyc6IHtcbiAgICB0aXRsZTogJ1N0YXR1cycsXG4gICAgZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgc3RhdGlzdGljcyB0YXNrcy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1NUQVRVUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5lbmFibGVkJzoge1xuICAgIHRpdGxlOiAnU3RhdHVzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBjdXN0b21pemF0aW9uLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSZWxvYWRpbmdCcm93c2VyVGFiOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5sb2dvLmFwcCc6IHtcbiAgICB0aXRsZTogJ0FwcCBtYWluIGxvZ28nLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhpcyBsb2dvIGlzIHVzZWQgaW4gdGhlIGFwcCBtYWluIG1lbnUsIGF0IHRoZSB0b3AgbGVmdCBjb3JuZXIuYCxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmZpbGVwaWNrZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgZXh0ZW5zaW9uczogWycuanBlZycsICcuanBnJywgJy5wbmcnLCAnLnN2ZyddLFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgbWF4Qnl0ZXM6XG4gICAgICAgICAgICBDVVNUT01JWkFUSU9OX0VORFBPSU5UX1BBWUxPQURfVVBMT0FEX0NVU1RPTV9GSUxFX01BWElNVU1fQllURVMsXG4gICAgICAgIH0sXG4gICAgICAgIHJlY29tbWVuZGVkOiB7XG4gICAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgICAgd2lkdGg6IDMwMCxcbiAgICAgICAgICAgIGhlaWdodDogNzAsXG4gICAgICAgICAgICB1bml0OiAncHgnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0b3JlOiB7XG4gICAgICAgICAgcmVsYXRpdmVQYXRoRmlsZVN5c3RlbTogJ3B1YmxpYy9hc3NldHMvY3VzdG9tL2ltYWdlcycsXG4gICAgICAgICAgZmlsZW5hbWU6ICdjdXN0b21pemF0aW9uLmxvZ28uYXBwJyxcbiAgICAgICAgICByZXNvbHZlU3RhdGljVVJMOiAoZmlsZW5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIGBjdXN0b20vaW1hZ2VzLyR7ZmlsZW5hbWV9P3Y9JHtEYXRlLm5vdygpfWAsXG4gICAgICAgICAgLy8gP3Y9JHtEYXRlLm5vdygpfSBpcyB1c2VkIHRvIGZvcmNlIHRoZSBicm93c2VyIHRvIHJlbG9hZCB0aGUgaW1hZ2Ugd2hlbiBhIG5ldyBmaWxlIGlzIHVwbG9hZGVkXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJGaWxlU2l6ZSh7XG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLmZpbGUuc2l6ZSxcbiAgICAgICAgICBtZWFuaW5nZnVsVW5pdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJTdXBwb3J0ZWRFeHRlbnNpb25zKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5maWxlLmV4dGVuc2lvbnMsXG4gICAgICAgICksXG4gICAgICApKHZhbHVlKTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5sb2dvLmhlYWx0aGNoZWNrJzoge1xuICAgIHRpdGxlOiAnSGVhbHRoY2hlY2sgbG9nbycsXG4gICAgZGVzY3JpcHRpb246IGBUaGlzIGxvZ28gaXMgZGlzcGxheWVkIGR1cmluZyB0aGUgSGVhbHRoY2hlY2sgcm91dGluZSBvZiB0aGUgYXBwLmAsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5maWxlcGlja2VyLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLmpwZWcnLCAnLmpwZycsICcucG5nJywgJy5zdmcnXSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIG1heEJ5dGVzOlxuICAgICAgICAgICAgQ1VTVE9NSVpBVElPTl9FTkRQT0lOVF9QQVlMT0FEX1VQTE9BRF9DVVNUT01fRklMRV9NQVhJTVVNX0JZVEVTLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbW1lbmRlZDoge1xuICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDcwLFxuICAgICAgICAgICAgdW5pdDogJ3B4JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdG9yZToge1xuICAgICAgICAgIHJlbGF0aXZlUGF0aEZpbGVTeXN0ZW06ICdwdWJsaWMvYXNzZXRzL2N1c3RvbS9pbWFnZXMnLFxuICAgICAgICAgIGZpbGVuYW1lOiAnY3VzdG9taXphdGlvbi5sb2dvLmhlYWx0aGNoZWNrJyxcbiAgICAgICAgICByZXNvbHZlU3RhdGljVVJMOiAoZmlsZW5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIGBjdXN0b20vaW1hZ2VzLyR7ZmlsZW5hbWV9P3Y9JHtEYXRlLm5vdygpfWAsXG4gICAgICAgICAgLy8gP3Y9JHtEYXRlLm5vdygpfSBpcyB1c2VkIHRvIGZvcmNlIHRoZSBicm93c2VyIHRvIHJlbG9hZCB0aGUgaW1hZ2Ugd2hlbiBhIG5ldyBmaWxlIGlzIHVwbG9hZGVkXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJGaWxlU2l6ZSh7XG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLmZpbGUuc2l6ZSxcbiAgICAgICAgICBtZWFuaW5nZnVsVW5pdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJTdXBwb3J0ZWRFeHRlbnNpb25zKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5maWxlLmV4dGVuc2lvbnMsXG4gICAgICAgICksXG4gICAgICApKHZhbHVlKTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5sb2dvLnJlcG9ydHMnOiB7XG4gICAgdGl0bGU6ICdQREYgcmVwb3J0cyBsb2dvJyxcbiAgICBkZXNjcmlwdGlvbjogYFRoaXMgbG9nbyBpcyB1c2VkIGluIHRoZSBQREYgcmVwb3J0cyBnZW5lcmF0ZWQgYnkgdGhlIGFwcC4gSXQncyBwbGFjZWQgYXQgdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiBldmVyeSBwYWdlIG9mIHRoZSBQREYuYCxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmZpbGVwaWNrZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBkZWZhdWx0VmFsdWVJZk5vdFNldDogUkVQT1JUU19MT0dPX0lNQUdFX0FTU0VUU19SRUxBVElWRV9QQVRILFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgZmlsZToge1xuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICBleHRlbnNpb25zOiBbJy5qcGVnJywgJy5qcGcnLCAnLnBuZyddLFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgbWF4Qnl0ZXM6XG4gICAgICAgICAgICBDVVNUT01JWkFUSU9OX0VORFBPSU5UX1BBWUxPQURfVVBMT0FEX0NVU1RPTV9GSUxFX01BWElNVU1fQllURVMsXG4gICAgICAgIH0sXG4gICAgICAgIHJlY29tbWVuZGVkOiB7XG4gICAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgICAgd2lkdGg6IDE5MCxcbiAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICB1bml0OiAncHgnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0b3JlOiB7XG4gICAgICAgICAgcmVsYXRpdmVQYXRoRmlsZVN5c3RlbTogJ3B1YmxpYy9hc3NldHMvY3VzdG9tL2ltYWdlcycsXG4gICAgICAgICAgZmlsZW5hbWU6ICdjdXN0b21pemF0aW9uLmxvZ28ucmVwb3J0cycsXG4gICAgICAgICAgcmVzb2x2ZVN0YXRpY1VSTDogKGZpbGVuYW1lOiBzdHJpbmcpID0+IGBjdXN0b20vaW1hZ2VzLyR7ZmlsZW5hbWV9YCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuZmlsZVBpY2tlckZpbGVTaXplKHtcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuZmlsZS5zaXplLFxuICAgICAgICAgIG1lYW5pbmdmdWxVbml0OiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuZmlsZVBpY2tlclN1cHBvcnRlZEV4dGVuc2lvbnMoXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmZpbGUuZXh0ZW5zaW9ucyxcbiAgICAgICAgKSxcbiAgICAgICkodmFsdWUpO1xuICAgIH0sXG4gIH0sXG4gICdjdXN0b21pemF0aW9uLmxvZ28uc2lkZWJhcic6IHtcbiAgICB0aXRsZTogJ05hdmlnYXRpb24gZHJhd2VyIGxvZ28nLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhpcyBpcyB0aGUgbG9nbyBmb3IgdGhlIGFwcCB0byBkaXNwbGF5IGluIHRoZSBwbGF0Zm9ybSdzIG5hdmlnYXRpb24gZHJhd2VyLCB0aGlzIGlzLCB0aGUgbWFpbiBzaWRlYmFyIGNvbGxhcHNpYmxlIG1lbnUuYCxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmZpbGVwaWNrZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVsb2FkaW5nQnJvd3NlclRhYjogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLmpwZWcnLCAnLmpwZycsICcucG5nJywgJy5zdmcnXSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIG1heEJ5dGVzOlxuICAgICAgICAgICAgQ1VTVE9NSVpBVElPTl9FTkRQT0lOVF9QQVlMT0FEX1VQTE9BRF9DVVNUT01fRklMRV9NQVhJTVVNX0JZVEVTLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbW1lbmRlZDoge1xuICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgIHdpZHRoOiA4MCxcbiAgICAgICAgICAgIGhlaWdodDogODAsXG4gICAgICAgICAgICB1bml0OiAncHgnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0b3JlOiB7XG4gICAgICAgICAgcmVsYXRpdmVQYXRoRmlsZVN5c3RlbTogJ3B1YmxpYy9hc3NldHMvY3VzdG9tL2ltYWdlcycsXG4gICAgICAgICAgZmlsZW5hbWU6ICdjdXN0b21pemF0aW9uLmxvZ28uc2lkZWJhcicsXG4gICAgICAgICAgcmVzb2x2ZVN0YXRpY1VSTDogKGZpbGVuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgY3VzdG9tL2ltYWdlcy8ke2ZpbGVuYW1lfT92PSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgIC8vID92PSR7RGF0ZS5ub3coKX0gaXMgdXNlZCB0byBmb3JjZSB0aGUgYnJvd3NlciB0byByZWxvYWQgdGhlIGltYWdlIHdoZW4gYSBuZXcgZmlsZSBpcyB1cGxvYWRlZFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyRmlsZVNpemUoe1xuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5maWxlLnNpemUsXG4gICAgICAgICAgbWVhbmluZ2Z1bFVuaXQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyU3VwcG9ydGVkRXh0ZW5zaW9ucyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsZS5leHRlbnNpb25zLFxuICAgICAgICApLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2N1c3RvbWl6YXRpb24ucmVwb3J0cy5mb290ZXInOiB7XG4gICAgdGl0bGU6ICdSZXBvcnRzIGZvb3RlcicsXG4gICAgZGVzY3JpcHRpb246ICdTZXQgdGhlIGZvb3RlciBvZiB0aGUgcmVwb3J0cy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuQ1VTVE9NSVpBVElPTixcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dGFyZWEsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBkZWZhdWx0VmFsdWVJZk5vdFNldDogUkVQT1JUU19QQUdFX0ZPT1RFUl9URVhULFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgb3B0aW9uczogeyBtYXhSb3dzOiAyLCBtYXhMZW5ndGg6IDUwIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm11bHRpcGxlTGluZXNTdHJpbmcoe1xuICAgICAgICBtYXhSb3dzOiB0aGlzLm9wdGlvbnM/Lm1heFJvd3MsXG4gICAgICAgIG1heExlbmd0aDogdGhpcy5vcHRpb25zPy5tYXhMZW5ndGgsXG4gICAgICB9KSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuc3RyaW5nKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKSB9KTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5yZXBvcnRzLmhlYWRlcic6IHtcbiAgICB0aXRsZTogJ1JlcG9ydHMgaGVhZGVyJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NldCB0aGUgaGVhZGVyIG9mIHRoZSByZXBvcnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0YXJlYSxcbiAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgIGRlZmF1bHRWYWx1ZUlmTm90U2V0OiBSRVBPUlRTX1BBR0VfSEVBREVSX1RFWFQsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICBvcHRpb25zOiB7IG1heFJvd3M6IDMsIG1heExlbmd0aDogNDAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IubXVsdGlwbGVMaW5lc1N0cmluZyh7XG4gICAgICAgIG1heFJvd3M6IHRoaXMub3B0aW9ucz8ubWF4Um93cyxcbiAgICAgICAgbWF4TGVuZ3RoOiB0aGlzLm9wdGlvbnM/Lm1heExlbmd0aCxcbiAgICAgIH0pKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5zdHJpbmcoeyB2YWxpZGF0ZTogdGhpcy52YWxpZGF0ZS5iaW5kKHRoaXMpIH0pO1xuICAgIH0sXG4gIH0sXG4gIGRpc2FibGVkX3JvbGVzOiB7XG4gICAgdGl0bGU6ICdEaXNhYmxlIHJvbGVzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Rpc2FibGVkIHRoZSBwbHVnaW4gdmlzaWJpbGl0eSBmb3IgdXNlcnMgd2l0aCB0aGUgcm9sZXMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNFQ1VSSVRZLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5lZGl0b3IsXG4gICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGVkaXRvcjoge1xuICAgICAgICBsYW5ndWFnZTogJ2pzb24nLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICApOiBhbnkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmpzb24oXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5hcnJheShcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm9TcGFjZXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYXJyYXlPZihcbiAgICAgICAgc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm9TcGFjZXMsXG4gICAgICAgICAgKSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gICdlbnJvbGxtZW50LmRucyc6IHtcbiAgICB0aXRsZTogJ0Vucm9sbG1lbnQgRE5TJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdTcGVjaWZpZXMgdGhlIFdhenVoIHJlZ2lzdHJhdGlvbiBzZXJ2ZXIsIHVzZWQgZm9yIHRoZSBhZ2VudCBlbnJvbGxtZW50LicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm9TcGFjZXMsXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLnN0cmluZyh7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlIH0pO1xuICAgIH0sXG4gIH0sXG4gICdlbnJvbGxtZW50LnBhc3N3b3JkJzoge1xuICAgIHRpdGxlOiAnRW5yb2xsbWVudCBwYXNzd29yZCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnU3BlY2lmaWVzIHRoZSBwYXNzd29yZCB1c2VkIHRvIGF1dGhlbnRpY2F0ZSBkdXJpbmcgdGhlIGFnZW50IGVucm9sbG1lbnQuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiBmYWxzZSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuc3RyaW5nKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ2V4dGVuc2lvbnMuYXVkaXQnOiB7XG4gICAgdGl0bGU6ICdTeXN0ZW0gYXVkaXRpbmcnLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIEF1ZGl0IHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy5hd3MnOiB7XG4gICAgdGl0bGU6ICdBbWF6b24gQVdTJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBBbWF6b24gKEFXUykgdGFiIG9uIE92ZXJ2aWV3LicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiBmYWxzZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2V4dGVuc2lvbnMuY2lzY2F0Jzoge1xuICAgIHRpdGxlOiAnQ0lTLUNBVCcsXG4gICAgZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgQ0lTLUNBVCB0YWIgb24gT3ZlcnZpZXcgYW5kIEFnZW50cy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdleHRlbnNpb25zLmRvY2tlcic6IHtcbiAgICB0aXRsZTogJ0RvY2tlciBsaXN0ZW5lcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIERvY2tlciBsaXN0ZW5lciB0YWIgb24gT3ZlcnZpZXcgYW5kIEFnZW50cy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdleHRlbnNpb25zLmdjcCc6IHtcbiAgICB0aXRsZTogJ0dvb2dsZSBDbG91ZCBwbGF0Zm9ybScsXG4gICAgZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgR29vZ2xlIENsb3VkIFBsYXRmb3JtIHRhYiBvbiBPdmVydmlldy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdleHRlbnNpb25zLmdkcHInOiB7XG4gICAgdGl0bGU6ICdHRFBSJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBHRFBSIHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy5naXRodWInOiB7XG4gICAgdGl0bGU6ICdHaXRIdWInLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIEdpdEh1YiB0YWIgb24gT3ZlcnZpZXcgYW5kIEFnZW50cy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYm9vbGVhbigpO1xuICAgIH0sXG4gIH0sXG4gICdleHRlbnNpb25zLmhpcGFhJzoge1xuICAgIHRpdGxlOiAnSElQQUEnLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIEhJUEFBIHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy5uaXN0Jzoge1xuICAgIHRpdGxlOiAnTklTVCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIE5JU1QgODAwLTUzIHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy5vZmZpY2UnOiB7XG4gICAgdGl0bGU6ICdPZmZpY2UgMzY1JyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBPZmZpY2UgMzY1IHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiBmYWxzZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2V4dGVuc2lvbnMub3NjYXAnOiB7XG4gICAgdGl0bGU6ICdPU0NBUCcsXG4gICAgZGVzY3JpcHRpb246ICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgT3BlbiBTQ0FQIHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiBmYWxzZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2V4dGVuc2lvbnMub3NxdWVyeSc6IHtcbiAgICB0aXRsZTogJ09zcXVlcnknLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIE9zcXVlcnkgdGFiIG9uIE92ZXJ2aWV3IGFuZCBBZ2VudHMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkVYVEVOU0lPTlMsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy5wY2knOiB7XG4gICAgdGl0bGU6ICdQQ0kgRFNTJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBQQ0kgRFNTIHRhYiBvbiBPdmVydmlldyBhbmQgQWdlbnRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5FWFRFTlNJT05TLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnZXh0ZW5zaW9ucy50c2MnOiB7XG4gICAgdGl0bGU6ICdUU0MnLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIFRTQyB0YWIgb24gT3ZlcnZpZXcgYW5kIEFnZW50cy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuRVhURU5TSU9OUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiBmYWxzZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2V4dGVuc2lvbnMudmlydXN0b3RhbCc6IHtcbiAgICB0aXRsZTogJ1ZpcnVzdG90YWwnLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIFZpcnVzVG90YWwgdGFiIG9uIE92ZXJ2aWV3IGFuZCBBZ2VudHMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkVYVEVOU0lPTlMsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICBoaWRlTWFuYWdlckFsZXJ0czoge1xuICAgIHRpdGxlOiAnSGlkZSBtYW5hZ2VyIGFsZXJ0cycsXG4gICAgZGVzY3JpcHRpb246ICdIaWRlIHRoZSBhbGVydHMgb2YgdGhlIG1hbmFnZXIgaW4gZXZlcnkgZGFzaGJvYXJkLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVsb2FkaW5nQnJvd3NlclRhYjogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ2lwLmlnbm9yZSc6IHtcbiAgICB0aXRsZTogJ0luZGV4IHBhdHRlcm4gaWdub3JlJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEaXNhYmxlIGNlcnRhaW4gaW5kZXggcGF0dGVybiBuYW1lcyBmcm9tIGJlaW5nIGF2YWlsYWJsZSBpbiBpbmRleCBwYXR0ZXJuIHNlbGVjdG9yLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5lZGl0b3IsXG4gICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGVkaXRvcjoge1xuICAgICAgICBsYW5ndWFnZTogJ2pzb24nLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICApOiBhbnkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gVmFsaWRhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMvZWxhc3RpY3NlYXJjaC9ibG9iL3Y3LjEwLjIvZG9jcy9yZWZlcmVuY2UvaW5kaWNlcy9jcmVhdGUtaW5kZXguYXNjaWlkb2NcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuanNvbihcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmFycmF5KFxuICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vTGl0ZXJhbFN0cmluZygnLicsICcuLicpLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9TdGFydHNXaXRoU3RyaW5nKCctJywgJ18nLCAnKycsICcuJyksXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgJ1xcXFwnLFxuICAgICAgICAgICAgICAnLycsXG4gICAgICAgICAgICAgICc/JyxcbiAgICAgICAgICAgICAgJ1wiJyxcbiAgICAgICAgICAgICAgJzwnLFxuICAgICAgICAgICAgICAnPicsXG4gICAgICAgICAgICAgICd8JyxcbiAgICAgICAgICAgICAgJywnLFxuICAgICAgICAgICAgICAnIycsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmFycmF5T2YoXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9MaXRlcmFsU3RyaW5nKCcuJywgJy4uJyksXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub1N0YXJ0c1dpdGhTdHJpbmcoJy0nLCAnXycsICcrJywgJy4nKSxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vdEludmFsaWRDaGFyYWN0ZXJzKFxuICAgICAgICAgICAgICAnXFxcXCcsXG4gICAgICAgICAgICAgICcvJyxcbiAgICAgICAgICAgICAgJz8nLFxuICAgICAgICAgICAgICAnXCInLFxuICAgICAgICAgICAgICAnPCcsXG4gICAgICAgICAgICAgICc+JyxcbiAgICAgICAgICAgICAgJ3wnLFxuICAgICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAgICcjJyxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gICdpcC5zZWxlY3Rvcic6IHtcbiAgICB0aXRsZTogJ0lQIHNlbGVjdG9yJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgaWYgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBjaGFuZ2UgdGhlIHNlbGVjdGVkIGluZGV4IHBhdHRlcm4gZGlyZWN0bHkgZnJvbSB0aGUgdG9wIG1lbnUgYmFyLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICB9LFxuICB9LFxuICAnbG9ncy5sZXZlbCc6IHtcbiAgICB0aXRsZTogJ0xvZyBsZXZlbCcsXG4gICAgZGVzY3JpcHRpb246ICdMb2dnaW5nIGxldmVsIG9mIHRoZSBBcHAuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnNlbGVjdCxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzZWxlY3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdJbmZvJyxcbiAgICAgICAgICB2YWx1ZTogJ2luZm8nLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0RlYnVnJyxcbiAgICAgICAgICB2YWx1ZTogJ2RlYnVnJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFsdWU6ICdpbmZvJyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtOiB0cnVlLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5saXRlcmFsKFxuICAgICAgICB0aGlzLm9wdGlvbnMuc2VsZWN0Lm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSksXG4gICAgICApKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5vbmVPZihcbiAgICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdC5tYXAoKHsgdmFsdWUgfSkgPT4gc2NoZW1hLmxpdGVyYWwodmFsdWUpKSxcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgcGF0dGVybjoge1xuICAgIHRpdGxlOiAnSW5kZXggcGF0dGVybicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIkRlZmF1bHQgaW5kZXggcGF0dGVybiB0byB1c2Ugb24gdGhlIGFwcC4gSWYgdGhlcmUncyBubyB2YWxpZCBpbmRleCBwYXR0ZXJuLCB0aGUgYXBwIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgb25lIHdpdGggdGhlIG5hbWUgaW5kaWNhdGVkIGluIHRoaXMgb3B0aW9uLlwiLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX0FMRVJUU19QQVRURVJOLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2s6IHRydWUsXG4gICAgLy8gVmFsaWRhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMvZWxhc3RpY3NlYXJjaC9ibG9iL3Y3LjEwLjIvZG9jcy9yZWZlcmVuY2UvaW5kaWNlcy9jcmVhdGUtaW5kZXguYXNjaWlkb2NcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vTGl0ZXJhbFN0cmluZygnLicsICcuLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9TdGFydHNXaXRoU3RyaW5nKCctJywgJ18nLCAnKycsICcuJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgJ1xcXFwnLFxuICAgICAgICAnLycsXG4gICAgICAgICc/JyxcbiAgICAgICAgJ1wiJyxcbiAgICAgICAgJzwnLFxuICAgICAgICAnPicsXG4gICAgICAgICd8JyxcbiAgICAgICAgJywnLFxuICAgICAgICAnIycsXG4gICAgICApLFxuICAgICksXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLnN0cmluZyh7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlIH0pO1xuICAgIH0sXG4gIH0sXG4gIHRpbWVvdXQ6IHtcbiAgICB0aXRsZTogJ1JlcXVlc3QgdGltZW91dCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnTWF4aW11bSB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHRoZSBhcHAgd2lsbCB3YWl0IGZvciBhbiBBUEkgcmVzcG9uc2Ugd2hlbiBtYWtpbmcgcmVxdWVzdHMgdG8gaXQuIEl0IHdpbGwgYmUgaWdub3JlZCBpZiB0aGUgdmFsdWUgaXMgc2V0IHVuZGVyIDE1MDAgbWlsbGlzZWNvbmRzLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5udW1iZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAyMDAwMCxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDE1MDAsXG4gICAgICAgIGludGVnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEubnVtYmVyKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKSB9KTtcbiAgICB9LFxuICB9LFxuICAnd2F6dWgubW9uaXRvcmluZy5jcmVhdGlvbic6IHtcbiAgICB0aXRsZTogJ0luZGV4IGNyZWF0aW9uJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIGludGVydmFsIGluIHdoaWNoIGEgbmV3IHdhenVoLW1vbml0b3JpbmcgaW5kZXggd2lsbCBiZSBjcmVhdGVkLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5NT05JVE9SSU5HLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zZWxlY3QsXG4gICAgb3B0aW9uczoge1xuICAgICAgc2VsZWN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSG91cmx5JyxcbiAgICAgICAgICB2YWx1ZTogJ2gnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0RhaWx5JyxcbiAgICAgICAgICB2YWx1ZTogJ2QnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1dlZWtseScsXG4gICAgICAgICAgdmFsdWU6ICd3JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdNb250aGx5JyxcbiAgICAgICAgICB2YWx1ZTogJ20nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0NSRUFUSU9OLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbUZpbGU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tVUk6IHRydWUsXG4gICAgcmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2s6IHRydWUsXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLmxpdGVyYWwoXG4gICAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3QubWFwKCh7IHZhbHVlIH0pID0+IHZhbHVlKSxcbiAgICAgICkodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLm9uZU9mKFxuICAgICAgICB0aGlzLm9wdGlvbnMuc2VsZWN0Lm1hcCgoeyB2YWx1ZSB9KSA9PiBzY2hlbWEubGl0ZXJhbCh2YWx1ZSkpLFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICAnd2F6dWgubW9uaXRvcmluZy5lbmFibGVkJzoge1xuICAgIHRpdGxlOiAnU3RhdHVzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgd2F6dWgtbW9uaXRvcmluZyBpbmRleCBjcmVhdGlvbiBhbmQvb3IgdmlzdWFsaXphdGlvbi4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0VOQUJMRUQsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICByZXF1aXJlc1Jlc3RhcnRpbmdQbHVnaW5QbGF0Zm9ybTogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIHZhbGlkYXRlQmFja2VuZDogZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5ib29sZWFuKCk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3JpbmcuZnJlcXVlbmN5Jzoge1xuICAgIHRpdGxlOiAnRnJlcXVlbmN5JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdGcmVxdWVuY3ksIGluIHNlY29uZHMsIG9mIEFQSSByZXF1ZXN0cyB0byBnZXQgdGhlIHN0YXRlIG9mIHRoZSBhZ2VudHMgYW5kIGNyZWF0ZSBhIG5ldyBkb2N1bWVudCBpbiB0aGUgd2F6dWgtbW9uaXRvcmluZyBpbmRleCB3aXRoIHRoaXMgZGF0YS4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUubnVtYmVyLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0ZSRVFVRU5DWSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDYwLFxuICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5udW1iZXIodGhpcy5vcHRpb25zLm51bWJlcikodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLm51bWJlcih7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlLmJpbmQodGhpcykgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3JpbmcucGF0dGVybic6IHtcbiAgICB0aXRsZTogJ0luZGV4IHBhdHRlcm4nLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBpbmRleCBwYXR0ZXJuIHRvIHVzZSBmb3IgV2F6dWggbW9uaXRvcmluZy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX01PTklUT1JJTkdfUEFUVEVSTixcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9MaXRlcmFsU3RyaW5nKCcuJywgJy4uJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub1N0YXJ0c1dpdGhTdHJpbmcoJy0nLCAnXycsICcrJywgJy4nKSxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vdEludmFsaWRDaGFyYWN0ZXJzKFxuICAgICAgICAnXFxcXCcsXG4gICAgICAgICcvJyxcbiAgICAgICAgJz8nLFxuICAgICAgICAnXCInLFxuICAgICAgICAnPCcsXG4gICAgICAgICc+JyxcbiAgICAgICAgJ3wnLFxuICAgICAgICAnLCcsXG4gICAgICAgICcjJyxcbiAgICAgICksXG4gICAgKSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuc3RyaW5nKHsgbWluTGVuZ3RoOiAxLCB2YWxpZGF0ZTogdGhpcy52YWxpZGF0ZSB9KTtcbiAgICB9LFxuICB9LFxuICAnd2F6dWgubW9uaXRvcmluZy5yZXBsaWNhcyc6IHtcbiAgICB0aXRsZTogJ0luZGV4IHJlcGxpY2FzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiByZXBsaWNhcyB0byB1c2UgZm9yIHRoZSB3YXp1aC1tb25pdG9yaW5nLSogaW5kaWNlcy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUubnVtYmVyLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0lORElDRVNfUkVQTElDQVMsXG4gICAgaXNDb25maWd1cmFibGVGcm9tRmlsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21VSTogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBudW1iZXI6IHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5udW1iZXIodGhpcy5vcHRpb25zLm51bWJlcikodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVCYWNrZW5kOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLm51bWJlcih7IHZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlLmJpbmQodGhpcykgfSk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3Jpbmcuc2hhcmRzJzoge1xuICAgIHRpdGxlOiAnSW5kZXggc2hhcmRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiBzaGFyZHMgdG8gdXNlIGZvciB0aGUgd2F6dWgtbW9uaXRvcmluZy0qIGluZGljZXMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5Lk1PTklUT1JJTkcsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLm51bWJlcixcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9JTkRJQ0VTX1NIQVJEUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21GaWxlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVVJOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDEsXG4gICAgICAgIGludGVnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUJhY2tlbmQ6IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgIHJldHVybiBzY2hlbWEubnVtYmVyKHsgdmFsaWRhdGU6IHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKSB9KTtcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgVFBsdWdpblNldHRpbmdLZXkgPSBrZXlvZiB0eXBlb2YgUExVR0lOX1NFVFRJTkdTO1xuXG5leHBvcnQgZW51bSBIVFRQX1NUQVRVU19DT0RFUyB7XG4gIENPTlRJTlVFID0gMTAwLFxuICBTV0lUQ0hJTkdfUFJPVE9DT0xTID0gMTAxLFxuICBQUk9DRVNTSU5HID0gMTAyLFxuICBPSyA9IDIwMCxcbiAgQ1JFQVRFRCA9IDIwMSxcbiAgQUNDRVBURUQgPSAyMDIsXG4gIE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OID0gMjAzLFxuICBOT19DT05URU5UID0gMjA0LFxuICBSRVNFVF9DT05URU5UID0gMjA1LFxuICBQQVJUSUFMX0NPTlRFTlQgPSAyMDYsXG4gIE1VTFRJX1NUQVRVUyA9IDIwNyxcbiAgTVVMVElQTEVfQ0hPSUNFUyA9IDMwMCxcbiAgTU9WRURfUEVSTUFORU5UTFkgPSAzMDEsXG4gIE1PVkVEX1RFTVBPUkFSSUxZID0gMzAyLFxuICBTRUVfT1RIRVIgPSAzMDMsXG4gIE5PVF9NT0RJRklFRCA9IDMwNCxcbiAgVVNFX1BST1hZID0gMzA1LFxuICBURU1QT1JBUllfUkVESVJFQ1QgPSAzMDcsXG4gIFBFUk1BTkVOVF9SRURJUkVDVCA9IDMwOCxcbiAgQkFEX1JFUVVFU1QgPSA0MDAsXG4gIFVOQVVUSE9SSVpFRCA9IDQwMSxcbiAgUEFZTUVOVF9SRVFVSVJFRCA9IDQwMixcbiAgRk9SQklEREVOID0gNDAzLFxuICBOT1RfRk9VTkQgPSA0MDQsXG4gIE1FVEhPRF9OT1RfQUxMT1dFRCA9IDQwNSxcbiAgTk9UX0FDQ0VQVEFCTEUgPSA0MDYsXG4gIFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEID0gNDA3LFxuICBSRVFVRVNUX1RJTUVPVVQgPSA0MDgsXG4gIENPTkZMSUNUID0gNDA5LFxuICBHT05FID0gNDEwLFxuICBMRU5HVEhfUkVRVUlSRUQgPSA0MTEsXG4gIFBSRUNPTkRJVElPTl9GQUlMRUQgPSA0MTIsXG4gIFJFUVVFU1RfVE9PX0xPTkcgPSA0MTMsXG4gIFJFUVVFU1RfVVJJX1RPT19MT05HID0gNDE0LFxuICBVTlNVUFBPUlRFRF9NRURJQV9UWVBFID0gNDE1LFxuICBSRVFVRVNURURfUkFOR0VfTk9UX1NBVElTRklBQkxFID0gNDE2LFxuICBFWFBFQ1RBVElPTl9GQUlMRUQgPSA0MTcsXG4gIElNX0FfVEVBUE9UID0gNDE4LFxuICBJTlNVRkZJQ0lFTlRfU1BBQ0VfT05fUkVTT1VSQ0UgPSA0MTksXG4gIE1FVEhPRF9GQUlMVVJFID0gNDIwLFxuICBNSVNESVJFQ1RFRF9SRVFVRVNUID0gNDIxLFxuICBVTlBST0NFU1NBQkxFX0VOVElUWSA9IDQyMixcbiAgTE9DS0VEID0gNDIzLFxuICBGQUlMRURfREVQRU5ERU5DWSA9IDQyNCxcbiAgUFJFQ09ORElUSU9OX1JFUVVJUkVEID0gNDI4LFxuICBUT09fTUFOWV9SRVFVRVNUUyA9IDQyOSxcbiAgUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRSA9IDQzMSxcbiAgVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMgPSA0NTEsXG4gIElOVEVSTkFMX1NFUlZFUl9FUlJPUiA9IDUwMCxcbiAgTk9UX0lNUExFTUVOVEVEID0gNTAxLFxuICBCQURfR0FURVdBWSA9IDUwMixcbiAgU0VSVklDRV9VTkFWQUlMQUJMRSA9IDUwMyxcbiAgR0FURVdBWV9USU1FT1VUID0gNTA0LFxuICBIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRCA9IDUwNSxcbiAgSU5TVUZGSUNJRU5UX1NUT1JBR0UgPSA1MDcsXG4gIE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQgPSA1MTEsXG59XG5cbi8vIE1vZHVsZSBTZWN1cml0eSBjb25maWd1cmF0aW9uIGFzc2Vzc21lbnRcbmV4cG9ydCBjb25zdCBNT0RVTEVfU0NBX0NIRUNLX1JFU1VMVF9MQUJFTCA9IHtcbiAgcGFzc2VkOiAnUGFzc2VkJyxcbiAgZmFpbGVkOiAnRmFpbGVkJyxcbiAgJ25vdCBhcHBsaWNhYmxlJzogJ05vdCBhcHBsaWNhYmxlJyxcbn07XG5cbi8vIFNlYXJjaCBiYXJcblxuLy8gVGhpcyBsaW1pdHMgdGhlIHJlc3VsdHMgaW4gdGhlIEFQSSByZXF1ZXN0XG5leHBvcnQgY29uc3QgU0VBUkNIX0JBUl9XUUxfVkFMVUVfU1VHR0VTVElPTlNfQ09VTlQgPSAzMDtcbi8vIFRoaXMgbGltaXRzIHRoZSBzdWdnZXN0aW9ucyBmb3IgdGhlIHRva2VuIG9mIHR5cGUgdmFsdWUgZGlzcGxheWVkIGluIHRoZSBzZWFyY2ggYmFyXG5leHBvcnQgY29uc3QgU0VBUkNIX0JBUl9XUUxfVkFMVUVfU1VHR0VTVElPTlNfRElTUExBWV9DT1VOVCA9IDEwO1xuLyogVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZGVib3VuY2UgdGhlIGFuYWx5c2lzIG9mIHNlYXJjaCBiYXIuIFRoaXMgbWl0aWdhdGVzIHNvbWUgcHJvYmxlbXMgcmVsYXRlZFxudG8gY2hhbmdlcyBydW5uaW5nIGluIHBhcmFsbGVsICovXG5leHBvcnQgY29uc3QgU0VBUkNIX0JBUl9ERUJPVU5DRV9VUERBVEVfVElNRSA9IDQwMDtcbiJdfQ==