"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggTopHit = void 0;

var _i18n = require("@osd/i18n");

var _ = require("../");

var _get_parsed_value = require("../utils/get_parsed_value");

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
const fnName = 'aggTopHit';

const aggTopHit = () => ({
  name: fnName,
  help: _i18n.i18n.translate('data.search.aggs.function.metrics.top_hit.help', {
    defaultMessage: 'Generates a serialized agg config for a Top Hit agg'
  }),
  type: 'agg_type',
  args: {
    id: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.id.help', {
        defaultMessage: 'ID for this aggregation'
      })
    },
    enabled: {
      types: ['boolean'],
      default: true,
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.enabled.help', {
        defaultMessage: 'Specifies whether this aggregation should be enabled'
      })
    },
    schema: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.schema.help', {
        defaultMessage: 'Schema to use for this aggregation'
      })
    },
    field: {
      types: ['string'],
      required: true,
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.field.help', {
        defaultMessage: 'Field to use for this aggregation'
      })
    },
    aggregate: {
      types: ['string'],
      required: true,
      options: ['min', 'max', 'sum', 'average', 'concat'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.aggregate.help', {
        defaultMessage: 'Aggregate type'
      })
    },
    size: {
      types: ['number'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.size.help', {
        defaultMessage: 'Max number of buckets to retrieve'
      })
    },
    sortOrder: {
      types: ['string'],
      options: ['desc', 'asc'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.sortOrder.help', {
        defaultMessage: 'Order in which to return the results: asc or desc'
      })
    },
    sortField: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.sortField.help', {
        defaultMessage: 'Field to order results by'
      })
    },
    json: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.json.help', {
        defaultMessage: 'Advanced json to include when the agg is sent to OpenSearch'
      })
    },
    customLabel: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.metrics.top_hit.customLabel.help', {
        defaultMessage: 'Represents a custom label for this aggregation'
      })
    }
  },
  fn: (input, args) => {
    const {
      id,
      enabled,
      schema,
      ...rest
    } = args;
    return {
      type: 'agg_type',
      value: {
        id,
        enabled,
        schema,
        type: _.METRIC_TYPES.TOP_HITS,
        params: { ...rest,
          json: (0, _get_parsed_value.getParsedValue)(args, 'json')
        }
      }
    };
  }
});

exports.aggTopHit = aggTopHit;