"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollDailyData = rollDailyData;
exports.rollTotals = rollTotals;

var _moment = _interopRequireDefault(require("moment"));

var _saved_objects_types = require("./saved_objects_types");

var _server = require("../../../../../../src/core/server");

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

/**
 * Aggregates all the transactional events into daily aggregates
 * @param logger
 * @param savedObjectsClient
 */
async function rollDailyData(logger, savedObjectsClient) {
  if (!savedObjectsClient) {
    return;
  }

  try {
    let toCreate;

    do {
      toCreate = new Map();
      const {
        saved_objects: rawApplicationUsageTransactional
      } = await savedObjectsClient.find({
        type: _saved_objects_types.SAVED_OBJECTS_TRANSACTIONAL_TYPE,
        perPage: 1000 // Process 1000 at a time as a compromise of speed and overload

      });

      for (const doc of rawApplicationUsageTransactional) {
        const {
          attributes: {
            appId,
            minutesOnScreen,
            numberOfClicks,
            timestamp
          }
        } = doc;
        const dayId = (0, _moment.default)(timestamp).format('YYYY-MM-DD');
        const dailyId = `${appId}:${dayId}`;
        const existingDoc = toCreate.get(dailyId) || (await getDailyDoc(savedObjectsClient, dailyId, appId, dayId));
        toCreate.set(dailyId, { ...existingDoc,
          attributes: { ...existingDoc.attributes,
            minutesOnScreen: existingDoc.attributes.minutesOnScreen + minutesOnScreen,
            numberOfClicks: existingDoc.attributes.numberOfClicks + numberOfClicks
          }
        });
      }

      if (toCreate.size > 0) {
        await savedObjectsClient.bulkCreate([...toCreate.entries()].map(([id, {
          attributes,
          version
        }]) => ({
          type: _saved_objects_types.SAVED_OBJECTS_DAILY_TYPE,
          id,
          attributes,
          version // Providing version to ensure via conflict matching that only 1 OpenSearch Dashboards instance (or interval) is taking care of the updates

        })), {
          overwrite: true
        });
        await Promise.all(rawApplicationUsageTransactional.map(({
          id
        }) => savedObjectsClient.delete(_saved_objects_types.SAVED_OBJECTS_TRANSACTIONAL_TYPE, id) // There is no bulkDelete :(
        ));
      }
    } while (toCreate.size > 0);
  } catch (err) {
    logger.warn(`Failed to rollup transactional to daily entries`);
    logger.warn(err);
  }
}
/**
 * Gets daily doc from the SavedObjects repository. Creates a new one if not found
 * @param savedObjectsClient
 * @param id The ID of the document to retrieve (typically, `${appId}:${dayId}`)
 * @param appId The application ID
 * @param dayId The date of the document in the format YYYY-MM-DD
 */


async function getDailyDoc(savedObjectsClient, id, appId, dayId) {
  try {
    return await savedObjectsClient.get(_saved_objects_types.SAVED_OBJECTS_DAILY_TYPE, id);
  } catch (err) {
    if (_server.SavedObjectsErrorHelpers.isNotFoundError(err)) {
      return {
        attributes: {
          appId,
          // Concatenating the day in YYYY-MM-DD form to T00:00:00Z to reduce the TZ effects
          timestamp: (0, _moment.default)(`${(0, _moment.default)(dayId).format('YYYY-MM-DD')}T00:00:00Z`).toISOString(),
          minutesOnScreen: 0,
          numberOfClicks: 0
        }
      };
    }

    throw err;
  }
}
/**
 * Moves all the daily documents into aggregated "total" documents as we don't care about any granularity after 90 days
 * @param logger
 * @param savedObjectsClient
 */


async function rollTotals(logger, savedObjectsClient) {
  if (!savedObjectsClient) {
    return;
  }

  try {
    const [{
      saved_objects: rawApplicationUsageTotals
    }, {
      saved_objects: rawApplicationUsageDaily
    }] = await Promise.all([savedObjectsClient.find({
      perPage: 10000,
      type: _saved_objects_types.SAVED_OBJECTS_TOTAL_TYPE
    }), savedObjectsClient.find({
      perPage: 10000,
      type: _saved_objects_types.SAVED_OBJECTS_DAILY_TYPE,
      filter: `${_saved_objects_types.SAVED_OBJECTS_DAILY_TYPE}.attributes.timestamp < now-90d`
    })]);
    const existingTotals = rawApplicationUsageTotals.reduce((acc, {
      attributes: {
        appId,
        numberOfClicks,
        minutesOnScreen
      }
    }) => {
      return { ...acc,
        // No need to sum because there should be 1 document per appId only
        [appId]: {
          appId,
          numberOfClicks,
          minutesOnScreen
        }
      };
    }, {});
    const totals = rawApplicationUsageDaily.reduce((acc, {
      attributes
    }) => {
      const {
        appId,
        numberOfClicks,
        minutesOnScreen
      } = attributes;
      const existing = acc[appId] || {
        minutesOnScreen: 0,
        numberOfClicks: 0
      };
      return { ...acc,
        [appId]: {
          appId,
          numberOfClicks: numberOfClicks + existing.numberOfClicks,
          minutesOnScreen: minutesOnScreen + existing.minutesOnScreen
        }
      };
    }, existingTotals);
    await Promise.all([Object.entries(totals).length && savedObjectsClient.bulkCreate(Object.entries(totals).map(([id, entry]) => ({
      type: _saved_objects_types.SAVED_OBJECTS_TOTAL_TYPE,
      id,
      attributes: entry
    })), {
      overwrite: true
    }), ...rawApplicationUsageDaily.map(({
      id
    }) => savedObjectsClient.delete(_saved_objects_types.SAVED_OBJECTS_DAILY_TYPE, id) // There is no bulkDelete :(
    )]);
  } catch (err) {
    logger.warn(`Failed to rollup daily entries to totals`);
    logger.warn(err);
  }
}