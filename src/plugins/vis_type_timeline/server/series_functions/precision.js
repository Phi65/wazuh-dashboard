"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@osd/i18n");

var _reduce = _interopRequireDefault(require("../lib/reduce.js"));

var _alter = _interopRequireDefault(require("../lib/alter.js"));

var _chainable = _interopRequireDefault(require("../lib/classes/chainable"));

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
var _default = new _chainable.default('precision', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'precision',
    types: ['number'],
    help: _i18n.i18n.translate('timeline.help.functions.precision.args.precisionHelpText', {
      defaultMessage: 'The number of digits to truncate each value to'
    })
  }],
  help: _i18n.i18n.translate('timeline.help.functions.precisionHelpText', {
    defaultMessage: 'The number of digits to truncate the decimal portion of the value to'
  }),
  fn: async function precisionFn(args) {
    await (0, _alter.default)(args, function (eachSeries, precision) {
      eachSeries._meta = eachSeries._meta || {};
      eachSeries._meta.precision = precision;
      return eachSeries;
    });
    return (0, _reduce.default)(args, function (a, b) {
      return parseInt(a * Math.pow(10, b), 10) / Math.pow(10, b);
    });
  }
});

exports.default = _default;
module.exports = exports.default;