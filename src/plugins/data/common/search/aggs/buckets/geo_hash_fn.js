"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggGeoHash = void 0;

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
const fnName = 'aggGeoHash';

const aggGeoHash = () => ({
  name: fnName,
  help: _i18n.i18n.translate('data.search.aggs.function.buckets.geoHash.help', {
    defaultMessage: 'Generates a serialized agg config for a Geo Hash agg'
  }),
  type: 'agg_type',
  args: {
    id: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.id.help', {
        defaultMessage: 'ID for this aggregation'
      })
    },
    enabled: {
      types: ['boolean'],
      default: true,
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.enabled.help', {
        defaultMessage: 'Specifies whether this aggregation should be enabled'
      })
    },
    schema: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.schema.help', {
        defaultMessage: 'Schema to use for this aggregation'
      })
    },
    field: {
      types: ['string'],
      required: true,
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.field.help', {
        defaultMessage: 'Field to use for this aggregation'
      })
    },
    useGeocentroid: {
      types: ['boolean'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.useGeocentroid.help', {
        defaultMessage: 'Specifies whether to use geocentroid for this aggregation'
      })
    },
    autoPrecision: {
      types: ['boolean'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.autoPrecision.help', {
        defaultMessage: 'Specifies whether to use auto precision for this aggregation'
      })
    },
    isFilteredByCollar: {
      types: ['boolean'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.isFilteredByCollar.help', {
        defaultMessage: 'Specifies whether to filter by collar'
      })
    },
    boundingBox: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.boundingBox.help', {
        defaultMessage: 'Filter results based on a point location within a bounding box'
      })
    },
    precision: {
      types: ['number'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.precision.help', {
        defaultMessage: 'Precision to use for this aggregation.'
      })
    },
    json: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.json.help', {
        defaultMessage: 'Advanced json to include when the agg is sent to OpenSearch'
      })
    },
    customLabel: {
      types: ['string'],
      help: _i18n.i18n.translate('data.search.aggs.buckets.geoHash.customLabel.help', {
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
        type: _.BUCKET_TYPES.GEOHASH_GRID,
        params: { ...rest,
          boundingBox: (0, _get_parsed_value.getParsedValue)(args, 'boundingBox'),
          json: (0, _get_parsed_value.getParsedValue)(args, 'json')
        }
      }
    };
  }
});

exports.aggGeoHash = aggGeoHash;