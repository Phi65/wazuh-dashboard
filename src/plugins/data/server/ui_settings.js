"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUiSettings = getUiSettings;

var _i18n = require("@osd/i18n");

var _configSchema = require("@osd/config-schema");

var _languages = _interopRequireDefault(require("@elastic/numeral/languages"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// @ts-ignore untyped module
const luceneQueryLanguageLabel = _i18n.i18n.translate('data.advancedSettings.searchQueryLanguageLucene', {
  defaultMessage: 'Lucene'
});

const queryLanguageSettingName = _i18n.i18n.translate('data.advancedSettings.searchQueryLanguageTitle', {
  defaultMessage: 'Query language'
});

const requestPreferenceOptionLabels = {
  sessionId: _i18n.i18n.translate('data.advancedSettings.courier.requestPreferenceSessionId', {
    defaultMessage: 'Session ID'
  }),
  custom: _i18n.i18n.translate('data.advancedSettings.courier.requestPreferenceCustom', {
    defaultMessage: 'Custom'
  }),
  none: _i18n.i18n.translate('data.advancedSettings.courier.requestPreferenceNone', {
    defaultMessage: 'None'
  })
}; // We add the `en` key manually here, since that's not a real numeral locale, but the
// default fallback in case the locale is not found.

const numeralLanguageIds = ['en', ..._languages.default.map(numeralLanguage => {
  return numeralLanguage.id;
})];

function getUiSettings() {
  return {
    [_common.UI_SETTINGS.META_FIELDS]: {
      name: _i18n.i18n.translate('data.advancedSettings.metaFieldsTitle', {
        defaultMessage: 'Meta fields'
      }),
      value: ['_source', '_id', '_type', '_index', '_score'],
      description: _i18n.i18n.translate('data.advancedSettings.metaFieldsText', {
        defaultMessage: 'Fields that exist outside of _source to merge into our document when displaying it'
      }),
      schema: _configSchema.schema.arrayOf(_configSchema.schema.string())
    },
    [_common.UI_SETTINGS.DOC_HIGHLIGHT]: {
      name: _i18n.i18n.translate('data.advancedSettings.docTableHighlightTitle', {
        defaultMessage: 'Highlight results'
      }),
      value: true,
      description: _i18n.i18n.translate('data.advancedSettings.docTableHighlightText', {
        defaultMessage: 'Highlight results in Discover and Saved Searches Dashboard. ' + 'Highlighting makes requests slow when working on big documents.'
      }),
      category: ['discover'],
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.QUERY_STRING_OPTIONS]: {
      name: _i18n.i18n.translate('data.advancedSettings.query.queryStringOptionsTitle', {
        defaultMessage: 'Query string options'
      }),
      value: '{ "analyze_wildcard": true }',
      description: _i18n.i18n.translate('data.advancedSettings.query.queryStringOptionsText', {
        defaultMessage: '{optionsLink} for the lucene query string parser. Is only used when "{queryLanguage}" is set ' + 'to {luceneLanguage}.',
        description: 'Part of composite text: data.advancedSettings.query.queryStringOptions.optionsLinkText + ' + 'data.advancedSettings.query.queryStringOptionsText',
        values: {
          optionsLink: '<a href="https://opensearch.org/docs/latest/opensearch/query-dsl/index/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.query.queryStringOptions.optionsLinkText', {
            defaultMessage: 'Options'
          }) + '</a>',
          luceneLanguage: luceneQueryLanguageLabel,
          queryLanguage: queryLanguageSettingName
        }
      }),
      type: 'json',
      schema: _configSchema.schema.object({
        analyze_wildcard: _configSchema.schema.boolean()
      })
    },
    [_common.UI_SETTINGS.QUERY_ALLOW_LEADING_WILDCARDS]: {
      name: _i18n.i18n.translate('data.advancedSettings.query.allowWildcardsTitle', {
        defaultMessage: 'Allow leading wildcards in query'
      }),
      value: true,
      description: _i18n.i18n.translate('data.advancedSettings.query.allowWildcardsText', {
        defaultMessage: 'When set, * is allowed as the first character in a query clause. ' + 'Currently only applies when experimental query features are enabled in the query bar. ' + 'To disallow leading wildcards in basic lucene queries, use {queryStringOptionsPattern}.',
        values: {
          queryStringOptionsPattern: _common.UI_SETTINGS.QUERY_STRING_OPTIONS
        }
      }),
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.SEARCH_QUERY_LANGUAGE]: {
      name: queryLanguageSettingName,
      value: _common.DEFAULT_QUERY_LANGUAGE,
      description: _i18n.i18n.translate('data.advancedSettings.searchQueryLanguageText', {
        defaultMessage: 'Query language used by the query bar. DQL is a new language built specifically for OpenSearch Dashboards.'
      }),
      type: 'select',
      options: ['lucene', 'kuery'],
      optionLabels: {
        lucene: luceneQueryLanguageLabel,
        kuery: _i18n.i18n.translate('data.advancedSettings.searchQueryLanguageDql', {
          defaultMessage: 'DQL'
        })
      },
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.SORT_OPTIONS]: {
      name: _i18n.i18n.translate('data.advancedSettings.sortOptionsTitle', {
        defaultMessage: 'Sort options'
      }),
      value: '{ "unmapped_type": "boolean" }',
      description: _i18n.i18n.translate('data.advancedSettings.sortOptionsText', {
        defaultMessage: '{optionsLink} for the OpenSearch sort parameter',
        description: 'Part of composite text: data.advancedSettings.sortOptions.optionsLinkText + ' + 'data.advancedSettings.sortOptionsText',
        values: {
          optionsLink: '<a href="https://opensearch.org/docs/latest/opensearch/ux/#sort-results" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.sortOptions.optionsLinkText', {
            defaultMessage: 'Options'
          }) + '</a>'
        }
      }),
      type: 'json',
      schema: _configSchema.schema.object({
        unmapped_type: _configSchema.schema.string()
      })
    },
    defaultIndex: {
      name: _i18n.i18n.translate('data.advancedSettings.defaultIndexTitle', {
        defaultMessage: 'Default index'
      }),
      value: null,
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.defaultIndexText', {
        defaultMessage: 'The index to access if no index is set'
      }),
      schema: _configSchema.schema.nullable(_configSchema.schema.string())
    },
    [_common.UI_SETTINGS.COURIER_IGNORE_FILTER_IF_FIELD_NOT_IN_INDEX]: {
      name: _i18n.i18n.translate('data.advancedSettings.courier.ignoreFilterTitle', {
        defaultMessage: 'Ignore filter(s)'
      }),
      value: false,
      description: _i18n.i18n.translate('data.advancedSettings.courier.ignoreFilterText', {
        defaultMessage: 'This configuration enhances support for dashboards containing visualizations accessing dissimilar indexes. ' + 'When disabled, all filters are applied to all visualizations. ' + 'When enabled, filter(s) will be ignored for a visualization ' + `when the visualization's index does not contain the filtering field.`
      }),
      category: ['search'],
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.COURIER_SET_REQUEST_PREFERENCE]: {
      name: _i18n.i18n.translate('data.advancedSettings.courier.requestPreferenceTitle', {
        defaultMessage: 'Request preference'
      }),
      value: 'sessionId',
      options: ['sessionId', 'custom', 'none'],
      optionLabels: requestPreferenceOptionLabels,
      type: 'select',
      description: _i18n.i18n.translate('data.advancedSettings.courier.requestPreferenceText', {
        defaultMessage: `Allows you to set which shards handle your search requests.
          <ul>
            <li><strong>{sessionId}:</strong> restricts operations to execute all search requests on the same shards.
              This has the benefit of reusing shard caches across requests.</li>
            <li><strong>{custom}:</strong> allows you to define a your own preference.
              Use <strong>'courier:customRequestPreference'</strong> to customize your preference value.</li>
            <li><strong>{none}:</strong> means do not set a preference.
              This might provide better performance because requests can be spread across all shard copies.
              However, results might be inconsistent because different shards might be in different refresh states.</li>
          </ul>`,
        values: {
          sessionId: requestPreferenceOptionLabels.sessionId,
          custom: requestPreferenceOptionLabels.custom,
          none: requestPreferenceOptionLabels.none
        }
      }),
      category: ['search'],
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.COURIER_CUSTOM_REQUEST_PREFERENCE]: {
      name: _i18n.i18n.translate('data.advancedSettings.courier.customRequestPreferenceTitle', {
        defaultMessage: 'Custom request preference'
      }),
      value: '_local',
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.courier.customRequestPreferenceText', {
        defaultMessage: '{requestPreferenceLink} used when {setRequestReferenceSetting} is set to {customSettingValue}.',
        description: 'Part of composite text: data.advancedSettings.courier.customRequestPreference.requestPreferenceLinkText + ' + 'data.advancedSettings.courier.customRequestPreferenceText',
        values: {
          setRequestReferenceSetting: `<strong>${_common.UI_SETTINGS.COURIER_SET_REQUEST_PREFERENCE}</strong>`,
          customSettingValue: '"custom"',
          requestPreferenceLink: '<a href="https://opensearch.org/docs/latest/opensearch/popular-api" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.courier.customRequestPreference.requestPreferenceLinkText', {
            defaultMessage: 'Request Preference'
          }) + '</a>'
        }
      }),
      category: ['search'],
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.COURIER_MAX_CONCURRENT_SHARD_REQUESTS]: {
      name: _i18n.i18n.translate('data.advancedSettings.courier.maxRequestsTitle', {
        defaultMessage: 'Max Concurrent Shard Requests'
      }),
      value: 0,
      type: 'number',
      description: _i18n.i18n.translate('data.advancedSettings.courier.maxRequestsText', {
        defaultMessage: 'Controls the {maxRequestsLink} setting used for _msearch requests sent by OpenSearch Dashboards. ' + 'Set to 0 to disable this config and use the OpenSearch default.',
        values: {
          maxRequestsLink: `<a href="https://opensearch.org/docs/latest/opensearch/query-dsl/full-text/#multi-match"
            target="_blank" rel="noopener noreferrer" >max_concurrent_shard_requests</a>`
        }
      }),
      category: ['search'],
      schema: _configSchema.schema.number()
    },
    [_common.UI_SETTINGS.COURIER_BATCH_SEARCHES]: {
      name: _i18n.i18n.translate('data.advancedSettings.courier.batchSearchesTitle', {
        defaultMessage: 'Batch concurrent searches'
      }),
      value: false,
      type: 'boolean',
      description: _i18n.i18n.translate('data.advancedSettings.courier.batchSearchesText', {
        defaultMessage: `When disabled, dashboard panels will load individually, and search requests will terminate when users navigate
           away or update the query. When enabled, dashboard panels will load together when all of the data is loaded, and
           searches will not terminate.`
      }),
      category: ['search'],
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.SEARCH_INCLUDE_FROZEN]: {
      name: 'Search in frozen indices',
      description: `Will include <a href="https://opensearch.org/docs/latest/opensearch/index-data"
        target="_blank" rel="noopener noreferrer">frozen indices</a> in results if enabled. Searching through frozen indices
        might increase the search time.`,
      value: false,
      category: ['search'],
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.HISTOGRAM_BAR_TARGET]: {
      name: _i18n.i18n.translate('data.advancedSettings.histogram.barTargetTitle', {
        defaultMessage: 'Target bars'
      }),
      value: 50,
      description: _i18n.i18n.translate('data.advancedSettings.histogram.barTargetText', {
        defaultMessage: 'Attempt to generate around this many bars when using "auto" interval in date histograms'
      }),
      schema: _configSchema.schema.number()
    },
    [_common.UI_SETTINGS.HISTOGRAM_MAX_BARS]: {
      name: _i18n.i18n.translate('data.advancedSettings.histogram.maxBarsTitle', {
        defaultMessage: 'Maximum bars'
      }),
      value: 100,
      description: _i18n.i18n.translate('data.advancedSettings.histogram.maxBarsText', {
        defaultMessage: 'Never show more than this many bars in date histograms, scale values if needed'
      }),
      schema: _configSchema.schema.number()
    },
    [_common.UI_SETTINGS.HISTORY_LIMIT]: {
      name: _i18n.i18n.translate('data.advancedSettings.historyLimitTitle', {
        defaultMessage: 'History limit'
      }),
      value: 10,
      description: _i18n.i18n.translate('data.advancedSettings.historyLimitText', {
        defaultMessage: 'In fields that have history (e.g. query inputs), show this many recent values'
      }),
      schema: _configSchema.schema.number()
    },
    [_common.UI_SETTINGS.SHORT_DOTS_ENABLE]: {
      name: _i18n.i18n.translate('data.advancedSettings.shortenFieldsTitle', {
        defaultMessage: 'Shorten fields'
      }),
      value: false,
      description: _i18n.i18n.translate('data.advancedSettings.shortenFieldsText', {
        defaultMessage: 'Shorten long fields, for example, instead of foo.bar.baz, show f.b.baz'
      }),
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.FORMAT_DEFAULT_TYPE_MAP]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.defaultTypeMapTitle', {
        defaultMessage: 'Field type format name'
      }),
      value: `{
  "ip": { "id": "ip", "params": {} },
  "date": { "id": "date", "params": {} },
  "date_nanos": { "id": "date_nanos", "params": {}, "opensearch": true },
  "number": { "id": "number", "params": {} },
  "boolean": { "id": "boolean", "params": {} },
  "_source": { "id": "_source", "params": {} },
  "_default_": { "id": "string", "params": {} }
}`,
      type: 'json',
      description: _i18n.i18n.translate('data.advancedSettings.format.defaultTypeMapText', {
        defaultMessage: 'Map of the format name to use by default for each field type. ' + '{defaultFormat} is used if the field type is not mentioned explicitly',
        values: {
          defaultFormat: '"_default_"'
        }
      }),
      schema: _configSchema.schema.object({
        ip: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        }),
        date: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        }),
        date_nanos: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({}),
          opensearch: _configSchema.schema.boolean()
        }),
        number: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        }),
        boolean: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        }),
        _source: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        }),
        _default_: _configSchema.schema.object({
          id: _configSchema.schema.string(),
          params: _configSchema.schema.object({})
        })
      })
    },
    [_common.UI_SETTINGS.FORMAT_NUMBER_DEFAULT_PATTERN]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.numberFormatTitle', {
        defaultMessage: 'Number format'
      }),
      value: '0,0.[000]',
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.format.numberFormatText', {
        defaultMessage: 'Default {numeralFormatLink} for the "number" format',
        description: 'Part of composite text: data.advancedSettings.format.numberFormatText + ' + 'data.advancedSettings.format.numberFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink: '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.format.numberFormat.numeralFormatLinkText', {
            defaultMessage: 'numeral format'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.FORMAT_PERCENT_DEFAULT_PATTERN]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.percentFormatTitle', {
        defaultMessage: 'Percent format'
      }),
      value: '0,0.[000]%',
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.format.percentFormatText', {
        defaultMessage: 'Default {numeralFormatLink} for the "percent" format',
        description: 'Part of composite text: data.advancedSettings.format.percentFormatText + ' + 'data.advancedSettings.format.percentFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink: '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.format.percentFormat.numeralFormatLinkText', {
            defaultMessage: 'numeral format'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.FORMAT_BYTES_DEFAULT_PATTERN]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.bytesFormatTitle', {
        defaultMessage: 'Bytes format'
      }),
      value: '0,0.[0]b',
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.format.bytesFormatText', {
        defaultMessage: 'Default {numeralFormatLink} for the "bytes" format',
        description: 'Part of composite text: data.advancedSettings.format.bytesFormatText + ' + 'data.advancedSettings.format.bytesFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink: '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.format.bytesFormat.numeralFormatLinkText', {
            defaultMessage: 'numeral format'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.FORMAT_CURRENCY_DEFAULT_PATTERN]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.currencyFormatTitle', {
        defaultMessage: 'Currency format'
      }),
      value: '($0,0.[00])',
      type: 'string',
      description: _i18n.i18n.translate('data.advancedSettings.format.currencyFormatText', {
        defaultMessage: 'Default {numeralFormatLink} for the "currency" format',
        description: 'Part of composite text: data.advancedSettings.format.currencyFormatText + ' + 'data.advancedSettings.format.currencyFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink: '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.format.currencyFormat.numeralFormatLinkText', {
            defaultMessage: 'numeral format'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.FORMAT_NUMBER_DEFAULT_LOCALE]: {
      name: _i18n.i18n.translate('data.advancedSettings.format.formattingLocaleTitle', {
        defaultMessage: 'Formatting locale'
      }),
      value: 'en',
      type: 'select',
      options: numeralLanguageIds,
      optionLabels: Object.fromEntries(_languages.default.map(language => [language.id, language.name])),
      description: _i18n.i18n.translate('data.advancedSettings.format.formattingLocaleText', {
        defaultMessage: `{numeralLanguageLink} locale`,
        description: 'Part of composite text: data.advancedSettings.format.formattingLocale.numeralLanguageLinkText + ' + 'data.advancedSettings.format.formattingLocaleText',
        values: {
          numeralLanguageLink: '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' + _i18n.i18n.translate('data.advancedSettings.format.formattingLocale.numeralLanguageLinkText', {
            defaultMessage: 'Numeral language'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.TIMEPICKER_REFRESH_INTERVAL_DEFAULTS]: {
      name: _i18n.i18n.translate('data.advancedSettings.timepicker.refreshIntervalDefaultsTitle', {
        defaultMessage: 'Time filter refresh interval'
      }),
      value: `{
  "pause": false,
  "value": 0
}`,
      type: 'json',
      description: _i18n.i18n.translate('data.advancedSettings.timepicker.refreshIntervalDefaultsText', {
        defaultMessage: `The timefilter's default refresh interval. The "value" needs to be specified in milliseconds.`
      }),
      requiresPageReload: true,
      schema: _configSchema.schema.object({
        pause: _configSchema.schema.boolean(),
        value: _configSchema.schema.number()
      })
    },
    [_common.UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS]: {
      name: _i18n.i18n.translate('data.advancedSettings.timepicker.timeDefaultsTitle', {
        defaultMessage: 'Time filter defaults'
      }),
      value: `{
  "from": "now-15m",
  "to": "now"
}`,
      type: 'json',
      description: _i18n.i18n.translate('data.advancedSettings.timepicker.timeDefaultsText', {
        defaultMessage: 'The timefilter selection to use when OpenSearch Dashboards is started without one'
      }),
      requiresPageReload: true,
      schema: _configSchema.schema.object({
        from: _configSchema.schema.string(),
        to: _configSchema.schema.string()
      })
    },
    [_common.UI_SETTINGS.TIMEPICKER_QUICK_RANGES]: {
      name: _i18n.i18n.translate('data.advancedSettings.timepicker.quickRangesTitle', {
        defaultMessage: 'Time filter quick ranges'
      }),
      value: JSON.stringify([{
        from: 'now/d',
        to: 'now/d',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.today', {
          defaultMessage: 'Today'
        })
      }, {
        from: 'now/w',
        to: 'now/w',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.thisWeek', {
          defaultMessage: 'This week'
        })
      }, {
        from: 'now-15m',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last15Minutes', {
          defaultMessage: 'Last 15 minutes'
        })
      }, {
        from: 'now-30m',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last30Minutes', {
          defaultMessage: 'Last 30 minutes'
        })
      }, {
        from: 'now-1h',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last1Hour', {
          defaultMessage: 'Last 1 hour'
        })
      }, {
        from: 'now-24h',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last24Hours', {
          defaultMessage: 'Last 24 hours'
        })
      }, {
        from: 'now-7d',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last7Days', {
          defaultMessage: 'Last 7 days'
        })
      }, {
        from: 'now-30d',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last30Days', {
          defaultMessage: 'Last 30 days'
        })
      }, {
        from: 'now-90d',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last90Days', {
          defaultMessage: 'Last 90 days'
        })
      }, {
        from: 'now-1y',
        to: 'now',
        display: _i18n.i18n.translate('data.advancedSettings.timepicker.last1Year', {
          defaultMessage: 'Last 1 year'
        })
      }], null, 2),
      type: 'json',
      description: _i18n.i18n.translate('data.advancedSettings.timepicker.quickRangesText', {
        defaultMessage: 'The list of ranges to show in the Quick section of the time filter. This should be an array of objects, ' + 'with each object containing "from", "to" (see {acceptedFormatsLink}), and ' + '"display" (the title to be displayed).',
        description: 'Part of composite text: data.advancedSettings.timepicker.quickRangesText + ' + 'data.advancedSettings.timepicker.quickRanges.acceptedFormatsLinkText',
        values: {
          acceptedFormatsLink: `<a href="https://opensearch.org/docs/latest/opensearch/units"
            target="_blank" rel="noopener noreferrer">` + _i18n.i18n.translate('data.advancedSettings.timepicker.quickRanges.acceptedFormatsLinkText', {
            defaultMessage: 'accepted formats'
          }) + '</a>'
        }
      }),
      schema: _configSchema.schema.arrayOf(_configSchema.schema.object({
        from: _configSchema.schema.string(),
        to: _configSchema.schema.string(),
        display: _configSchema.schema.string()
      }))
    },
    [_common.UI_SETTINGS.INDEXPATTERN_PLACEHOLDER]: {
      name: _i18n.i18n.translate('data.advancedSettings.indexPatternPlaceholderTitle', {
        defaultMessage: 'Index pattern placeholder'
      }),
      value: '',
      description: _i18n.i18n.translate('data.advancedSettings.indexPatternPlaceholderText', {
        defaultMessage: 'The placeholder for the "Index pattern name" field in "Management > Index Patterns > Create Index Pattern".'
      }),
      schema: _configSchema.schema.string()
    },
    [_common.UI_SETTINGS.FILTERS_PINNED_BY_DEFAULT]: {
      name: _i18n.i18n.translate('data.advancedSettings.pinFiltersTitle', {
        defaultMessage: 'Pin filters by default'
      }),
      value: false,
      description: _i18n.i18n.translate('data.advancedSettings.pinFiltersText', {
        defaultMessage: 'Whether the filters should have a global state (be pinned) by default'
      }),
      schema: _configSchema.schema.boolean()
    },
    [_common.UI_SETTINGS.FILTERS_EDITOR_SUGGEST_VALUES]: {
      name: _i18n.i18n.translate('data.advancedSettings.suggestFilterValuesTitle', {
        defaultMessage: 'Filter editor suggest values',
        description: '"Filter editor" refers to the UI you create filters in.'
      }),
      value: true,
      description: _i18n.i18n.translate('data.advancedSettings.suggestFilterValuesText', {
        defaultMessage: 'Set this property to false to prevent the filter editor from suggesting values for fields.'
      }),
      schema: _configSchema.schema.boolean()
    }
  };
}