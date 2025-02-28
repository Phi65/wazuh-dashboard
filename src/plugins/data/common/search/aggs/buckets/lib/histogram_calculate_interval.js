"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateHistogramInterval = void 0;

var _interval_options = require("../_interval_options");

var _types = require("../../../../types");

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

/**
 * Round interval by order of magnitude to provide clean intervals
 */
const roundInterval = minInterval => {
  const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(minInterval)));
  let interval = orderOfMagnitude;

  while (interval < minInterval) {
    interval += orderOfMagnitude;
  }

  return interval;
};

const calculateForGivenInterval = (diff, interval, maxBucketsUiSettings) => {
  const bars = diff / interval;

  if (bars > maxBucketsUiSettings) {
    const minInterval = diff / maxBucketsUiSettings;
    return roundInterval(minInterval);
  }

  return interval;
};
/**
 * Algorithm for determining auto-interval

   1. Define maxBars as Math.min(<user input>, <max buckets setting>)
   2. Find the min and max values in the data
   3. Subtract the min from max to get diff
   4. Set exactInterval to diff / maxBars
   5. Based on exactInterval, find the power of 10 that's lower and higher
   6. Find the number of expected buckets that lowerPower would create: diff / lowerPower
   7. Find the number of expected buckets that higherPower would create: diff / higherPower
   8. There are three possible final intervals, pick the one that's closest to maxBars:
     - The lower power of 10
     - The lower power of 10, times 2
     - The lower power of 10, times 5
 **/


const calculateAutoInterval = (diff, maxBars, esTypes) => {
  const exactInterval = diff / maxBars; // For integer fields that are less than maxBars, we should use 1 as the value of interval
  // OpenSearch has 5 integer data types: long, integer, byte, double and float
  // see: https://opensearch.org/docs/latest/search-plugins/sql/datatypes/#data-types

  if (diff < maxBars && esTypes.every(opensearchType => [_types.OPENSEARCH_FIELD_TYPES.INTEGER, _types.OPENSEARCH_FIELD_TYPES.LONG, _types.OPENSEARCH_FIELD_TYPES.SHORT, _types.OPENSEARCH_FIELD_TYPES.BYTE].includes(opensearchType))) {
    return 1;
  }

  const lowerPower = Math.pow(10, Math.floor(Math.log10(exactInterval)));
  const autoBuckets = diff / lowerPower;

  if (autoBuckets > maxBars) {
    if (autoBuckets / 2 <= maxBars) {
      return lowerPower * 2;
    } else if (autoBuckets / 5 <= maxBars) {
      return lowerPower * 5;
    } else {
      return lowerPower * 10;
    }
  }

  return lowerPower;
};

const calculateHistogramInterval = ({
  interval,
  maxBucketsUiSettings,
  maxBucketsUserInput,
  intervalBase,
  values,
  esTypes
}) => {
  const isAuto = (0, _interval_options.isAutoInterval)(interval);
  let calculatedInterval = isAuto ? 0 : parseFloat(interval); // should return NaN on non-numeric or invalid values

  if (Number.isNaN(calculatedInterval)) {
    return calculatedInterval;
  }

  if (values) {
    const diff = values.max - values.min;

    if (diff) {
      calculatedInterval = isAuto ? calculateAutoInterval(diff, // Mind maxBucketsUserInput can be an empty string, hence we need to ensure it here
      Math.min(maxBucketsUiSettings, maxBucketsUserInput || maxBucketsUiSettings), esTypes) : calculateForGivenInterval(diff, calculatedInterval, maxBucketsUiSettings);
    }
  }

  if (intervalBase) {
    if (calculatedInterval < intervalBase) {
      // In case the specified interval is below the base, just increase it to it's base
      calculatedInterval = intervalBase;
    } else if (calculatedInterval % intervalBase !== 0) {
      // In case the interval is not a multiple of the base round it to the next base
      calculatedInterval = Math.round(calculatedInterval / intervalBase) * intervalBase;
    }
  }

  const defaultValueForUnspecifiedInterval = 1;
  return calculatedInterval || defaultValueForUnspecifiedInterval;
};

exports.calculateHistogramInterval = calculateHistogramInterval;