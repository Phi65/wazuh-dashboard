"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@osd/i18n");

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
var _default = new _chainable.default('lines', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'width',
    types: ['number', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.lines.args.widthHelpText', {
      defaultMessage: 'Line thickness'
    })
  }, {
    name: 'fill',
    types: ['number', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.lines.args.fillHelpText', {
      defaultMessage: 'Number between 0 and 10. Use for making area charts'
    })
  }, {
    name: 'stack',
    types: ['boolean', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.lines.args.stackHelpText', {
      defaultMessage: 'Stack lines, often misleading. At least use some fill if you use this.'
    })
  }, {
    name: 'show',
    types: ['number', 'boolean', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.lines.args.showHelpText', {
      defaultMessage: 'Show or hide lines'
    })
  }, {
    name: 'steps',
    types: ['number', 'boolean', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.lines.args.stepsHelpText', {
      defaultMessage: 'Show line as step, e.g., do not interpolate between points'
    })
  }],
  help: _i18n.i18n.translate('timeline.help.functions.linesHelpText', {
    defaultMessage: 'Show the seriesList as lines'
  }),
  fn: function linesFn(args) {
    return (0, _alter.default)(args, function (eachSeries, width, fill, stack, show, steps) {
      eachSeries.lines = eachSeries.lines || {}; // Defaults

      if (eachSeries.lines.lineWidth == null) eachSeries.lines.lineWidth = 3;
      if (width != null) eachSeries.lines.lineWidth = width;
      if (fill != null) eachSeries.lines.fill = fill / 10;
      if (stack != null) eachSeries.stack = stack;
      if (show != null) eachSeries.lines.show = show;
      if (steps != null) eachSeries.lines.steps = steps;
      return eachSeries;
    });
  }
});

exports.default = _default;
module.exports = exports.default;