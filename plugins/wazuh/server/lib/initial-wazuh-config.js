"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialWazuhConfig = exports.hostsConfiguration = exports.header = void 0;
exports.printSection = printSection;
exports.printSetting = printSetting;
exports.printSettingCategory = printSettingCategory;
exports.printSettingValue = printSettingValue;
exports.splitDescription = splitDescription;

var _constants = require("../../common/constants");

var _settings = require("../../common/services/settings");

var _web_documentation = require("../../common/services/web_documentation");

/*
 * Wazuh app - App configuration file
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const header = `---
#
# ${_constants.PLUGIN_APP_NAME} - App configuration file
# Copyright (C) 2015-2022 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
${printSection('Wazuh app configuration file', {
  prefix: '# ',
  fill: '='
})}
#
# Please check the documentation for more information about configuration options:
# ${(0, _web_documentation.webDocumentationLink)('user-manual/wazuh-dashboard/config-file.html')}
#
# Also, you can check our repository:
# https://github.com/wazuh/wazuh-dashboard-plugins`;
exports.header = header;
const pluginSettingsConfigurationFile = (0, _settings.getSettingsDefaultList)().filter(({
  isConfigurableFromFile
}) => isConfigurableFromFile);
const pluginSettingsConfigurationFileGroupByCategory = (0, _settings.groupSettingsByCategory)(pluginSettingsConfigurationFile);
const pluginSettingsConfiguration = pluginSettingsConfigurationFileGroupByCategory.map(({
  category: categoryID,
  settings
}) => {
  const category = printSettingCategory(_constants.PLUGIN_SETTINGS_CATEGORIES[categoryID]);
  const pluginSettingsOfCategory = settings.map(setting => printSetting(setting)).join('\n#\n');
  /*
  #------------------- {category name} --------------
  #
  #  {category description}
  #
  # {setting description}
  # settingKey: settingDefaultValue
  #
  # {setting description}
  # settingKey: settingDefaultValue
  # ...
  */

  return [category, pluginSettingsOfCategory].join('\n#\n');
}).join('\n#\n');

function printSettingValue(value) {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  ;

  if (typeof value === 'string' && value.length === 0) {
    return `''`;
  }

  ;
  return value;
}

;

function printSetting(setting) {
  /*
  # {setting description}
  # {settingKey}: {settingDefaultValue}
  */
  return [splitDescription((0, _settings.getPluginSettingDescription)(setting)), `# ${setting.key}: ${printSettingValue(setting.defaultValue)}`].join('\n');
}

function printSettingCategory({
  title,
  description
}) {
  /*
  #------------------------------- {category title} -------------------------------
  # {category description}
  #
  */
  return [printSection(title, {
    prefix: '# ',
    fill: '-'
  }), ...(description ? [splitDescription(description)] : [''])].join('\n#\n');
}

;

function printSection(text, options) {
  var _options$maxLength, _options$prefix, _options$suffix, _options$spaceAround, _options$fill;

  const maxLength = (_options$maxLength = options === null || options === void 0 ? void 0 : options.maxLength) !== null && _options$maxLength !== void 0 ? _options$maxLength : 80;
  const prefix = (_options$prefix = options === null || options === void 0 ? void 0 : options.prefix) !== null && _options$prefix !== void 0 ? _options$prefix : '';
  const sufix = (_options$suffix = options === null || options === void 0 ? void 0 : options.suffix) !== null && _options$suffix !== void 0 ? _options$suffix : '';
  const spaceAround = (_options$spaceAround = options === null || options === void 0 ? void 0 : options.spaceAround) !== null && _options$spaceAround !== void 0 ? _options$spaceAround : 1;
  const fill = (_options$fill = options === null || options === void 0 ? void 0 : options.fill) !== null && _options$fill !== void 0 ? _options$fill : ' ';
  const fillLength = maxLength - prefix.length - sufix.length - 2 * spaceAround - text.length;
  return [prefix, fill.repeat(Math.floor(fillLength / 2)), ` ${text} `, fill.repeat(Math.ceil(fillLength / 2)), sufix].join('');
}

;
const hostsConfiguration = `${printSection('Wazuh hosts', {
  prefix: '# ',
  fill: '-'
})}
#
# The following configuration is the default structure to define a host.
#
# hosts:
#   # Host ID / name,
#   - env-1:
#       # Host URL
#       url: https://env-1.example
#       # Host / API port
#       port: 55000
#       # Host / API username
#       username: wazuh-wui
#       # Host / API password
#       password: wazuh-wui
#       # Use RBAC or not. If set to true, the username must be "wazuh-wui".
#       run_as: true
#   - env-2:
#       url: https://env-2.example
#       port: 55000
#       username: wazuh-wui
#       password: wazuh-wui
#       run_as: true

hosts:
  - default:
      url: https://localhost
      port: 55000
      username: wazuh-wui
      password: wazuh-wui
      run_as: false
`;
/**
 * Given a string, this function builds a multine string, each line about 70
 * characters long, splitted at the closest whitespace character to that lentgh.
 *
 * This function is used to transform the settings description
 * into a multiline string to be used as the setting documentation.
 *
 * The # character is also appended to the beginning of each line.
 *
 * @param text
 * @returns multine string
 */

exports.hostsConfiguration = hostsConfiguration;

function splitDescription(text = '') {
  const lines = text.match(/.{1,80}(?=\s|$)/g) || [];
  return lines.map(z => '# ' + z.trim()).join('\n');
}

const initialWazuhConfig = [header, pluginSettingsConfiguration, hostsConfiguration].join('\n#\n');
exports.initialWazuhConfig = initialWazuhConfig;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWwtd2F6dWgtY29uZmlnLnRzIl0sIm5hbWVzIjpbImhlYWRlciIsIlBMVUdJTl9BUFBfTkFNRSIsInByaW50U2VjdGlvbiIsInByZWZpeCIsImZpbGwiLCJwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb25GaWxlIiwiZmlsdGVyIiwiaXNDb25maWd1cmFibGVGcm9tRmlsZSIsInBsdWdpblNldHRpbmdzQ29uZmlndXJhdGlvbkZpbGVHcm91cEJ5Q2F0ZWdvcnkiLCJwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb24iLCJtYXAiLCJjYXRlZ29yeSIsImNhdGVnb3J5SUQiLCJzZXR0aW5ncyIsInByaW50U2V0dGluZ0NhdGVnb3J5IiwiUExVR0lOX1NFVFRJTkdTX0NBVEVHT1JJRVMiLCJwbHVnaW5TZXR0aW5nc09mQ2F0ZWdvcnkiLCJzZXR0aW5nIiwicHJpbnRTZXR0aW5nIiwiam9pbiIsInByaW50U2V0dGluZ1ZhbHVlIiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwibGVuZ3RoIiwic3BsaXREZXNjcmlwdGlvbiIsImtleSIsImRlZmF1bHRWYWx1ZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ0ZXh0Iiwib3B0aW9ucyIsIm1heExlbmd0aCIsInN1Zml4Iiwic3VmZml4Iiwic3BhY2VBcm91bmQiLCJmaWxsTGVuZ3RoIiwicmVwZWF0IiwiTWF0aCIsImZsb29yIiwiY2VpbCIsImhvc3RzQ29uZmlndXJhdGlvbiIsImxpbmVzIiwibWF0Y2giLCJ6IiwidHJpbSIsImluaXRpYWxXYXp1aENvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUE7O0FBS0E7O0FBQ0E7O0FBbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFVTyxNQUFNQSxNQUFjLEdBQUk7QUFDL0I7QUFDQSxJQUFJQywwQkFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTs7OztBQUNPLFNBQVNxQixnQkFBVCxDQUEwQkssSUFBWSxHQUFHLEVBQXpDLEVBQXFEO0FBQzFELFFBQU1ZLEtBQUssR0FBR1osSUFBSSxDQUFDYSxLQUFMLENBQVcsa0JBQVgsS0FBa0MsRUFBaEQ7QUFDQSxTQUFPRCxLQUFLLENBQUNoQyxHQUFOLENBQVdrQyxDQUFELElBQU8sT0FBT0EsQ0FBQyxDQUFDQyxJQUFGLEVBQXhCLEVBQWtDMUIsSUFBbEMsQ0FBdUMsSUFBdkMsQ0FBUDtBQUNEOztBQUVNLE1BQU0yQixrQkFBMEIsR0FBRyxDQUFDOUMsTUFBRCxFQUFTUywyQkFBVCxFQUFzQ2dDLGtCQUF0QyxFQUEwRHRCLElBQTFELENBQStELE9BQS9ELENBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIEFwcCBjb25maWd1cmF0aW9uIGZpbGVcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbmltcG9ydCB7XG4gIFBMVUdJTl9BUFBfTkFNRSxcbiAgUExVR0lOX1NFVFRJTkdTX0NBVEVHT1JJRVMsXG4gIFRQbHVnaW5TZXR0aW5nV2l0aEtleSxcbn0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRQbHVnaW5TZXR0aW5nRGVzY3JpcHRpb24sIGdldFNldHRpbmdzRGVmYXVsdExpc3QsIGdyb3VwU2V0dGluZ3NCeUNhdGVnb3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3NldHRpbmdzJztcbmltcG9ydCB7IHdlYkRvY3VtZW50YXRpb25MaW5rIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3dlYl9kb2N1bWVudGF0aW9uJztcblxuZXhwb3J0IGNvbnN0IGhlYWRlcjogc3RyaW5nID0gYC0tLVxuI1xuIyAke1BMVUdJTl9BUFBfTkFNRX0gLSBBcHAgY29uZmlndXJhdGlvbiBmaWxlXG4jIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4jXG4jIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4jIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4jIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4jIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4jXG4jIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4jXG4ke3ByaW50U2VjdGlvbignV2F6dWggYXBwIGNvbmZpZ3VyYXRpb24gZmlsZScsIHsgcHJlZml4OiAnIyAnLCBmaWxsOiAnPScgfSl9XG4jXG4jIFBsZWFzZSBjaGVjayB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjb25maWd1cmF0aW9uIG9wdGlvbnM6XG4jICR7d2ViRG9jdW1lbnRhdGlvbkxpbmsoJ3VzZXItbWFudWFsL3dhenVoLWRhc2hib2FyZC9jb25maWctZmlsZS5odG1sJyl9XG4jXG4jIEFsc28sIHlvdSBjYW4gY2hlY2sgb3VyIHJlcG9zaXRvcnk6XG4jIGh0dHBzOi8vZ2l0aHViLmNvbS93YXp1aC93YXp1aC1kYXNoYm9hcmQtcGx1Z2luc2A7XG5cbmNvbnN0IHBsdWdpblNldHRpbmdzQ29uZmlndXJhdGlvbkZpbGUgPSBnZXRTZXR0aW5nc0RlZmF1bHRMaXN0KCkuZmlsdGVyKCh7IGlzQ29uZmlndXJhYmxlRnJvbUZpbGUgfSkgPT4gaXNDb25maWd1cmFibGVGcm9tRmlsZSk7XG5cbmNvbnN0IHBsdWdpblNldHRpbmdzQ29uZmlndXJhdGlvbkZpbGVHcm91cEJ5Q2F0ZWdvcnkgPSBncm91cFNldHRpbmdzQnlDYXRlZ29yeShwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb25GaWxlKTtcblxuY29uc3QgcGx1Z2luU2V0dGluZ3NDb25maWd1cmF0aW9uID0gcGx1Z2luU2V0dGluZ3NDb25maWd1cmF0aW9uRmlsZUdyb3VwQnlDYXRlZ29yeS5tYXAoKHsgY2F0ZWdvcnk6IGNhdGVnb3J5SUQsIHNldHRpbmdzIH0pID0+IHtcbiAgY29uc3QgY2F0ZWdvcnkgPSBwcmludFNldHRpbmdDYXRlZ29yeShQTFVHSU5fU0VUVElOR1NfQ0FURUdPUklFU1tjYXRlZ29yeUlEXSk7XG5cbiAgY29uc3QgcGx1Z2luU2V0dGluZ3NPZkNhdGVnb3J5ID0gc2V0dGluZ3NcbiAgICAubWFwKHNldHRpbmcgPT4gcHJpbnRTZXR0aW5nKHNldHRpbmcpXG4gICAgKS5qb2luKCdcXG4jXFxuJyk7XG4gIC8qXG4gICMtLS0tLS0tLS0tLS0tLS0tLS0tIHtjYXRlZ29yeSBuYW1lfSAtLS0tLS0tLS0tLS0tLVxuICAjXG4gICMgIHtjYXRlZ29yeSBkZXNjcmlwdGlvbn1cbiAgI1xuICAjIHtzZXR0aW5nIGRlc2NyaXB0aW9ufVxuICAjIHNldHRpbmdLZXk6IHNldHRpbmdEZWZhdWx0VmFsdWVcbiAgI1xuICAjIHtzZXR0aW5nIGRlc2NyaXB0aW9ufVxuICAjIHNldHRpbmdLZXk6IHNldHRpbmdEZWZhdWx0VmFsdWVcbiAgIyAuLi5cbiAgKi9cbiAgcmV0dXJuIFtjYXRlZ29yeSwgcGx1Z2luU2V0dGluZ3NPZkNhdGVnb3J5XS5qb2luKCdcXG4jXFxuJyk7XG59KS5qb2luKCdcXG4jXFxuJyk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50U2V0dGluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogYW55IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gIH07XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGAnJ2BcbiAgfTtcblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRTZXR0aW5nKHNldHRpbmc6IFRQbHVnaW5TZXR0aW5nV2l0aEtleSk6IHN0cmluZyB7XG4gIC8qXG4gICMge3NldHRpbmcgZGVzY3JpcHRpb259XG4gICMge3NldHRpbmdLZXl9OiB7c2V0dGluZ0RlZmF1bHRWYWx1ZX1cbiAgKi9cbiAgcmV0dXJuIFtcbiAgICBzcGxpdERlc2NyaXB0aW9uKGdldFBsdWdpblNldHRpbmdEZXNjcmlwdGlvbihzZXR0aW5nKSksXG4gICAgYCMgJHtzZXR0aW5nLmtleX06ICR7cHJpbnRTZXR0aW5nVmFsdWUoc2V0dGluZy5kZWZhdWx0VmFsdWUpfWBcbiAgXS5qb2luKCdcXG4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRTZXR0aW5nQ2F0ZWdvcnkoeyB0aXRsZSwgZGVzY3JpcHRpb24gfSkge1xuICAvKlxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7Y2F0ZWdvcnkgdGl0bGV9IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgIyB7Y2F0ZWdvcnkgZGVzY3JpcHRpb259XG4gICNcbiAgKi9cbiAgcmV0dXJuIFtcbiAgICBwcmludFNlY3Rpb24odGl0bGUsIHsgcHJlZml4OiAnIyAnLCBmaWxsOiAnLScgfSksXG4gICAgLi4uKGRlc2NyaXB0aW9uID8gW3NwbGl0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXSA6IFsnJ10pXG4gIF0uam9pbignXFxuI1xcbicpXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRTZWN0aW9uKHRleHQ6IHN0cmluZywgb3B0aW9ucz86IHsgbWF4TGVuZ3RoPzogbnVtYmVyLCBwcmVmaXg/OiBzdHJpbmcsIHN1ZmZpeD86IHN0cmluZywgc3BhY2VBcm91bmQ/OiBudW1iZXIsIGZpbGw/OiBzdHJpbmcgfSkge1xuICBjb25zdCBtYXhMZW5ndGggPSBvcHRpb25zPy5tYXhMZW5ndGggPz8gODA7XG4gIGNvbnN0IHByZWZpeCA9IG9wdGlvbnM/LnByZWZpeCA/PyAnJztcbiAgY29uc3Qgc3VmaXggPSBvcHRpb25zPy5zdWZmaXggPz8gJyc7XG4gIGNvbnN0IHNwYWNlQXJvdW5kID0gb3B0aW9ucz8uc3BhY2VBcm91bmQgPz8gMTtcbiAgY29uc3QgZmlsbCA9IG9wdGlvbnM/LmZpbGwgPz8gJyAnO1xuICBjb25zdCBmaWxsTGVuZ3RoID0gbWF4TGVuZ3RoIC0gcHJlZml4Lmxlbmd0aCAtIHN1Zml4Lmxlbmd0aCAtICgyICogc3BhY2VBcm91bmQpIC0gdGV4dC5sZW5ndGg7XG5cbiAgcmV0dXJuIFtcbiAgICBwcmVmaXgsXG4gICAgZmlsbC5yZXBlYXQoTWF0aC5mbG9vcihmaWxsTGVuZ3RoIC8gMikpLFxuICAgIGAgJHt0ZXh0fSBgLFxuICAgIGZpbGwucmVwZWF0KE1hdGguY2VpbChmaWxsTGVuZ3RoIC8gMikpLFxuICAgIHN1Zml4XG4gIF0uam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgaG9zdHNDb25maWd1cmF0aW9uID0gYCR7cHJpbnRTZWN0aW9uKCdXYXp1aCBob3N0cycsIHsgcHJlZml4OiAnIyAnLCBmaWxsOiAnLScgfSl9XG4jXG4jIFRoZSBmb2xsb3dpbmcgY29uZmlndXJhdGlvbiBpcyB0aGUgZGVmYXVsdCBzdHJ1Y3R1cmUgdG8gZGVmaW5lIGEgaG9zdC5cbiNcbiMgaG9zdHM6XG4jICAgIyBIb3N0IElEIC8gbmFtZSxcbiMgICAtIGVudi0xOlxuIyAgICAgICAjIEhvc3QgVVJMXG4jICAgICAgIHVybDogaHR0cHM6Ly9lbnYtMS5leGFtcGxlXG4jICAgICAgICMgSG9zdCAvIEFQSSBwb3J0XG4jICAgICAgIHBvcnQ6IDU1MDAwXG4jICAgICAgICMgSG9zdCAvIEFQSSB1c2VybmFtZVxuIyAgICAgICB1c2VybmFtZTogd2F6dWgtd3VpXG4jICAgICAgICMgSG9zdCAvIEFQSSBwYXNzd29yZFxuIyAgICAgICBwYXNzd29yZDogd2F6dWgtd3VpXG4jICAgICAgICMgVXNlIFJCQUMgb3Igbm90LiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXJuYW1lIG11c3QgYmUgXCJ3YXp1aC13dWlcIi5cbiMgICAgICAgcnVuX2FzOiB0cnVlXG4jICAgLSBlbnYtMjpcbiMgICAgICAgdXJsOiBodHRwczovL2Vudi0yLmV4YW1wbGVcbiMgICAgICAgcG9ydDogNTUwMDBcbiMgICAgICAgdXNlcm5hbWU6IHdhenVoLXd1aVxuIyAgICAgICBwYXNzd29yZDogd2F6dWgtd3VpXG4jICAgICAgIHJ1bl9hczogdHJ1ZVxuXG5ob3N0czpcbiAgLSBkZWZhdWx0OlxuICAgICAgdXJsOiBodHRwczovL2xvY2FsaG9zdFxuICAgICAgcG9ydDogNTUwMDBcbiAgICAgIHVzZXJuYW1lOiB3YXp1aC13dWlcbiAgICAgIHBhc3N3b3JkOiB3YXp1aC13dWlcbiAgICAgIHJ1bl9hczogZmFsc2VcbmA7XG5cbi8qKlxuICogR2l2ZW4gYSBzdHJpbmcsIHRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgbXVsdGluZSBzdHJpbmcsIGVhY2ggbGluZSBhYm91dCA3MFxuICogY2hhcmFjdGVycyBsb25nLCBzcGxpdHRlZCBhdCB0aGUgY2xvc2VzdCB3aGl0ZXNwYWNlIGNoYXJhY3RlciB0byB0aGF0IGxlbnRnaC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBzZXR0aW5ncyBkZXNjcmlwdGlvblxuICogaW50byBhIG11bHRpbGluZSBzdHJpbmcgdG8gYmUgdXNlZCBhcyB0aGUgc2V0dGluZyBkb2N1bWVudGF0aW9uLlxuICpcbiAqIFRoZSAjIGNoYXJhY3RlciBpcyBhbHNvIGFwcGVuZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBsaW5lLlxuICpcbiAqIEBwYXJhbSB0ZXh0XG4gKiBAcmV0dXJucyBtdWx0aW5lIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXREZXNjcmlwdGlvbih0ZXh0OiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzID0gdGV4dC5tYXRjaCgvLnsxLDgwfSg/PVxcc3wkKS9nKSB8fCBbXTtcbiAgcmV0dXJuIGxpbmVzLm1hcCgoeikgPT4gJyMgJyArIHoudHJpbSgpKS5qb2luKCdcXG4nKTtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxXYXp1aENvbmZpZzogc3RyaW5nID0gW2hlYWRlciwgcGx1Z2luU2V0dGluZ3NDb25maWd1cmF0aW9uLCBob3N0c0NvbmZpZ3VyYXRpb25dLmpvaW4oJ1xcbiNcXG4nKTtcbiJdfQ==