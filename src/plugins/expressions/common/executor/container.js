"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pureTransitions = exports.pureSelectors = exports.defaultState = exports.createExecutorContainer = void 0;

var _state_containers = require("../../../opensearch_dashboards_utils/common/state_containers");

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
const defaultState = {
  functions: {},
  types: {},
  context: {}
};
exports.defaultState = defaultState;
const pureTransitions = {
  addFunction: state => fn => ({ ...state,
    functions: { ...state.functions,
      [fn.name]: fn
    }
  }),
  addType: state => type => ({ ...state,
    types: { ...state.types,
      [type.name]: type
    }
  }),
  extendContext: state => extraContext => ({ ...state,
    context: { ...state.context,
      ...extraContext
    }
  })
};
exports.pureTransitions = pureTransitions;
const pureSelectors = {
  getFunction: state => id => state.functions[id] || null,
  getType: state => id => state.types[id] || null,
  getContext: ({
    context
  }) => () => context
};
exports.pureSelectors = pureSelectors;

const createExecutorContainer = (state = defaultState) => {
  const container = (0, _state_containers.createStateContainer)(state, pureTransitions, pureSelectors);
  return container;
};

exports.createExecutorContainer = createExecutorContainer;