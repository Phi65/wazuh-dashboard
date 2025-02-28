"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getField = exports.fields = void 0;

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
const fields = [{
  name: 'bytes',
  type: 'number',
  esTypes: ['long'],
  count: 10,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'ssl',
  type: 'boolean',
  esTypes: ['boolean'],
  count: 20,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: '@timestamp',
  type: 'date',
  esTypes: ['date'],
  count: 30,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'time',
  type: 'date',
  esTypes: ['date'],
  count: 30,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: '@tags',
  type: 'string',
  esTypes: ['keyword'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'utc_time',
  type: 'date',
  esTypes: ['date'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'phpmemory',
  type: 'number',
  esTypes: ['integer'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'ip',
  type: 'ip',
  esTypes: ['ip'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'request_body',
  type: 'attachment',
  esTypes: ['attachment'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'point',
  type: 'geo_point',
  esTypes: ['geo_point'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'area',
  type: 'geo_shape',
  esTypes: ['geo_shape'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'hashed',
  type: 'murmur3',
  esTypes: ['murmur3'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: false,
  readFromDocValues: false
}, {
  name: 'geo.coordinates',
  type: 'geo_point',
  esTypes: ['geo_point'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'extension',
  type: 'string',
  esTypes: ['keyword'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'machine.os',
  type: 'string',
  esTypes: ['text'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'machine.os.raw',
  type: 'string',
  esTypes: ['keyword'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true,
  subType: {
    multi: {
      parent: 'machine.os'
    }
  }
}, {
  name: 'geo.src',
  type: 'string',
  esTypes: ['keyword'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: '_id',
  type: 'string',
  esTypes: ['_id'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: '_type',
  type: 'string',
  esTypes: ['_type'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: '_source',
  type: '_source',
  esTypes: ['_source'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'non-filterable',
  type: 'string',
  esTypes: ['text'],
  count: 0,
  scripted: false,
  searchable: false,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'non-sortable',
  type: 'string',
  esTypes: ['text'],
  count: 0,
  scripted: false,
  searchable: false,
  aggregatable: false,
  readFromDocValues: false
}, {
  name: 'custom_user_field',
  type: 'conflict',
  esTypes: ['long', 'text'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: true,
  readFromDocValues: true
}, {
  name: 'script string',
  type: 'string',
  count: 0,
  scripted: true,
  script: "'i am a string'",
  lang: 'expression',
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'script number',
  type: 'number',
  count: 0,
  scripted: true,
  script: '1234',
  lang: 'expression',
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'script date',
  type: 'date',
  count: 0,
  scripted: true,
  script: '1234',
  lang: 'painless',
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'script murmur3',
  type: 'murmur3',
  count: 0,
  scripted: true,
  script: '1234',
  lang: 'expression',
  searchable: true,
  aggregatable: true,
  readFromDocValues: false
}, {
  name: 'nestedField.child',
  type: 'string',
  esTypes: ['text'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: false,
  readFromDocValues: false,
  subType: {
    nested: {
      path: 'nestedField'
    }
  }
}, {
  name: 'nestedField.nestedChild.doublyNestedChild',
  type: 'string',
  esTypes: ['text'],
  count: 0,
  scripted: false,
  searchable: true,
  aggregatable: false,
  readFromDocValues: false,
  subType: {
    nested: {
      path: 'nestedField.nestedChild'
    }
  }
}];
exports.fields = fields;

const getField = name => fields.find(field => field.name === name);

exports.getField = getField;