"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@osd/i18n");

var _alter = _interopRequireDefault(require("../lib/alter.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _chainable = _interopRequireDefault(require("../lib/classes/chainable"));

var _to_milliseconds = require("../../common/lib/to_milliseconds");

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
const validPositions = ['left', 'right', 'center'];
const defaultPosition = 'center';

var _default = new _chainable.default('movingaverage', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'window',
    types: ['number', 'string'],
    help: _i18n.i18n.translate('timeline.help.functions.movingaverage.args.windowHelpText', {
      defaultMessage: 'Number of points, or a date math expression (eg 1d, 1M) to average over. If a date math expression ' + 'is specified, the function will get as close as possible given the currently select interval. ' + 'If the date math expression is not evenly divisible by the interval the results may appear abnormal.'
    })
  }, {
    name: 'position',
    types: ['string', 'null'],
    help: _i18n.i18n.translate('timeline.help.functions.movingaverage.args.positionHelpText', {
      defaultMessage: 'Position of the averaged points relative to the result time. One of: {validPositions}',
      values: {
        validPositions: validPositions.join(', ')
      }
    }),
    suggestions: validPositions.map(position => {
      const suggestion = {
        name: position
      };

      if (position === defaultPosition) {
        suggestion.help = 'default';
      }

      return suggestion;
    })
  }],
  aliases: ['mvavg'],
  help: _i18n.i18n.translate('timeline.help.functions.movingaverageHelpText', {
    defaultMessage: 'Calculate the moving average over a given window. Nice for smoothing noisy series'
  }),
  fn: function movingaverageFn(args, tlConfig) {
    return (0, _alter.default)(args, function (eachSeries, _window, _position) {
      // _window always needs to be a number, if isn't we have to make it into one.
      if (typeof _window !== 'number') {
        // Ok, I guess its a datemath expression
        const windowMilliseconds = (0, _to_milliseconds.toMS)(_window); // calculate how many buckets that _window represents

        const intervalMilliseconds = (0, _to_milliseconds.toMS)(tlConfig.time.interval); // Round, floor, ceil? We're going with round because it splits the difference.

        _window = Math.round(windowMilliseconds / intervalMilliseconds) || 1;
      }

      _position = _position || defaultPosition;

      if (!_lodash.default.includes(validPositions, _position)) {
        throw new Error(_i18n.i18n.translate('timeline.serverSideErrors.movingaverageFunction.notValidPositionErrorMessage', {
          defaultMessage: 'Valid positions are: {validPositions}',
          values: {
            validPositions: validPositions.join(', ')
          }
        }));
      }

      const pairs = eachSeries.data;
      const pairsLen = pairs.length;
      eachSeries.label = eachSeries.label + ' mvavg=' + _window;

      function toPoint(point, pairSlice) {
        const average = _lodash.default.chain(pairSlice).map(1).reduce(function (memo, num) {
          return memo + num;
        }).value() / _window;

        return [point[0], average];
      }

      if (_position === 'center') {
        const windowLeft = Math.floor(_window / 2);
        const windowRight = _window - windowLeft;
        eachSeries.data = _lodash.default.map(pairs, function (point, i) {
          if (i < windowLeft || i > pairsLen - windowRight) return [point[0], null];
          return toPoint(point, pairs.slice(i - windowLeft, i + windowRight));
        });
      } else if (_position === 'left') {
        eachSeries.data = _lodash.default.map(pairs, function (point, i) {
          const cursor = i + 1;
          if (cursor < _window) return [point[0], null];
          return toPoint(point, pairs.slice(cursor - _window, cursor));
        });
      } else if (_position === 'right') {
        eachSeries.data = _lodash.default.map(pairs, function (point, i) {
          if (i > pairsLen - _window) return [point[0], null];
          return toPoint(point, pairs.slice(i, i + _window));
        });
      }

      return eachSeries;
    });
  }
});

exports.default = _default;
module.exports = exports.default;