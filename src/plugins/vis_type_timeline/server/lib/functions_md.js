"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _load_functions = _interopRequireDefault(require("./load_functions.js"));

var _lodash = _interopRequireDefault(require("lodash"));

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
const functions = (0, _load_functions.default)('series_functions/');

var _default = function () {
  const functionArray = _lodash.default.map(functions, function (val, key) {
    // TODO: This won't work on frozen objects, it should be removed when everything is converted to datasources and chainables
    return _lodash.default.extend({}, val, {
      name: key
    });
  });

  function toDocBlock(fn) {
    let help = '';
    if (fn.isAlias) return help;
    help += '#### .' + fn.name + '()\n';
    help += fn.help + '\n\n'; // If chainable, drop first argument from help

    const args = fn.chainable ? fn.args.slice(1) : fn.args.slice();

    if (!args.length) {
      help += '*This function does not accept any arguments.*\n\n';
      return help;
    }

    help += 'Argument | Accepts | Description\n';
    help += '--- | --- | ---\n';

    _lodash.default.each(args, function (arg) {
      help += arg.name + ' | *' + _lodash.default.without(arg.types, 'null').join('/') + '* | ';
      help += arg.help ? arg.help : '*no help available*';
      help += '  \n';
    });

    help += '\n';
    return help;
  }

  function createDocs() {
    let help = '';
    help += '## Timeline function reference\n';
    help += 'This document is auto generated from the timeline code. ' + 'Do not submit pulls against this document. You want to submit a pull against something in the ' + '`series_functions/` directory.\n\n';
    help += '### Data sources\n';
    help += "Data sources can start a chain, they don't need to be attached to anything, but they still need to start" + ' with a `.` (dot). Data retrieved from a data source can be passed into the chainable functions in the next section.\n\n';
    help += _lodash.default.chain(functionArray).filter('datasource').map(toDocBlock).value().join('');
    help += '### Chainable functions\n';
    help += 'Chainable functions can not start a chain. Somewhere before them must be a data source function. Chainable' + ' functions modify the data output directly from a data source, or from another chainable function that has a data' + ' source somewhere before it.\n\n';
    help += _lodash.default.chain(functionArray).filter('chainable').map(toDocBlock).value().join('');
    return help;
  }

  return createDocs();
}();

exports.default = _default;
module.exports = exports.default;