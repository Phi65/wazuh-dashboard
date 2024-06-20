"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SORT_DEFAULT_ORDER_SETTING = exports.SEARCH_ON_PAGE_LOAD_SETTING = exports.SAMPLE_SIZE_SETTING = exports.MODIFY_COLUMNS_ON_SWITCH = exports.FIELDS_LIMIT_SETTING = exports.DOC_HIDE_TIME_COLUMN_SETTING = exports.DEFAULT_COLUMNS_SETTING = exports.CONTEXT_TIE_BREAKER_FIELDS_SETTING = exports.CONTEXT_STEP_SETTING = exports.CONTEXT_DEFAULT_SIZE_SETTING = exports.AGGS_TERMS_SIZE_SETTING = void 0;

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
const DEFAULT_COLUMNS_SETTING = 'defaultColumns';
exports.DEFAULT_COLUMNS_SETTING = DEFAULT_COLUMNS_SETTING;
const SAMPLE_SIZE_SETTING = 'discover:sampleSize';
exports.SAMPLE_SIZE_SETTING = SAMPLE_SIZE_SETTING;
const AGGS_TERMS_SIZE_SETTING = 'discover:aggs:terms:size';
exports.AGGS_TERMS_SIZE_SETTING = AGGS_TERMS_SIZE_SETTING;
const SORT_DEFAULT_ORDER_SETTING = 'discover:sort:defaultOrder';
exports.SORT_DEFAULT_ORDER_SETTING = SORT_DEFAULT_ORDER_SETTING;
const SEARCH_ON_PAGE_LOAD_SETTING = 'discover:searchOnPageLoad';
exports.SEARCH_ON_PAGE_LOAD_SETTING = SEARCH_ON_PAGE_LOAD_SETTING;
const DOC_HIDE_TIME_COLUMN_SETTING = 'doc_table:hideTimeColumn';
exports.DOC_HIDE_TIME_COLUMN_SETTING = DOC_HIDE_TIME_COLUMN_SETTING;
const FIELDS_LIMIT_SETTING = 'fields:popularLimit';
exports.FIELDS_LIMIT_SETTING = FIELDS_LIMIT_SETTING;
const CONTEXT_DEFAULT_SIZE_SETTING = 'context:defaultSize';
exports.CONTEXT_DEFAULT_SIZE_SETTING = CONTEXT_DEFAULT_SIZE_SETTING;
const CONTEXT_STEP_SETTING = 'context:step';
exports.CONTEXT_STEP_SETTING = CONTEXT_STEP_SETTING;
const CONTEXT_TIE_BREAKER_FIELDS_SETTING = 'context:tieBreakerFields';
exports.CONTEXT_TIE_BREAKER_FIELDS_SETTING = CONTEXT_TIE_BREAKER_FIELDS_SETTING;
const MODIFY_COLUMNS_ON_SWITCH = 'discover:modifyColumnsOnSwitch';
exports.MODIFY_COLUMNS_ON_SWITCH = MODIFY_COLUMNS_ON_SWITCH;