"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildNode = buildNode;
exports.hasLeadingWildcard = hasLeadingWildcard;
exports.test = test;
exports.toOpenSearchQuery = toOpenSearchQuery;
exports.toQueryStringQuery = toQueryStringQuery;
exports.wildcardSymbol = void 0;

var _ast = require("../ast/ast");

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
const wildcardSymbol = '@kuery-wildcard@'; // Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

exports.wildcardSymbol = wildcardSymbol;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
} // See https://opensearch.org/docs/latest/opensearch/query-dsl/term/#regex


function escapeQueryString(str) {
  return str.replace(/[+-=&|><!(){}[\]^"~*?:\\/]/g, '\\$&'); // $& means the whole matched string
}

function buildNode(value) {
  if (!value.includes(wildcardSymbol)) {
    return (0, _ast.fromLiteralExpression)(value);
  }

  return {
    type: 'wildcard',
    value
  };
}

function test(node, str) {
  const {
    value
  } = node;
  const regex = value.split(wildcardSymbol).map(escapeRegExp).join('[\\s\\S]*');
  const regexp = new RegExp(`^${regex}$`);
  return regexp.test(str);
}

function toOpenSearchQuery(node) {
  const {
    value
  } = node;
  return value.split(wildcardSymbol).join('*');
}

function toQueryStringQuery(node) {
  const {
    value
  } = node;
  return value.split(wildcardSymbol).map(escapeQueryString).join('*');
}

function hasLeadingWildcard(node) {
  const {
    value
  } = node; // A lone wildcard turns into an `exists` query, so we're only concerned with
  // leading wildcards followed by additional characters.

  return value.startsWith(wildcardSymbol) && value.replace(wildcardSymbol, '').length > 0;
}