"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildExpressionFunction = buildExpressionFunction;

var _build_expression = require("./build_expression");

var _format = require("./format");

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
 * Manages an AST for a single expression function. The return value
 * can be provided to `buildExpression` to add this function to an
 * expression.
 *
 * Note that to preserve type safety and ensure no args are missing,
 * all required arguments for the specified function must be provided
 * up front. If desired, they can be changed or removed later.
 *
 * @param fnName String representing the name of this expression function.
 * @param initialArgs Object containing the arguments to this function.
 * @return `this`
 */
function buildExpressionFunction(fnName,
/**
 * To support subexpressions, we override all args to also accept an
 * ExpressionBuilder. This isn't perfectly typesafe since we don't
 * know with certainty that the builder's output matches the required
 * argument input, so we trust that folks using subexpressions in the
 * builder know what they're doing.
 */
initialArgs) {
  const args = Object.entries(initialArgs).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value.map(v => {
        return (0, _build_expression.isExpressionAst)(v) ? (0, _build_expression.buildExpression)(v) : v;
      });
    } else if (value !== undefined) {
      acc[key] = (0, _build_expression.isExpressionAst)(value) ? [(0, _build_expression.buildExpression)(value)] : [value];
    } else {
      delete acc[key];
    }

    return acc;
  }, initialArgs);
  return {
    type: 'expression_function_builder',
    name: fnName,
    arguments: args,

    addArgument(key, value) {
      if (value !== undefined) {
        if (!args.hasOwnProperty(key)) {
          args[key] = [];
        }

        args[key].push(value);
      }

      return this;
    },

    getArgument(key) {
      if (!args.hasOwnProperty(key)) {
        return;
      }

      return args[key];
    },

    replaceArgument(key, values) {
      if (!args.hasOwnProperty(key)) {
        throw new Error('Argument to replace does not exist on this function');
      }

      args[key] = values;
      return this;
    },

    removeArgument(key) {
      delete args[key];
      return this;
    },

    toAst() {
      const ast = {};
      return {
        type: 'function',
        function: fnName,
        arguments: Object.entries(args).reduce((acc, [key, values]) => {
          acc[key] = values.map(val => {
            return (0, _build_expression.isExpressionAstBuilder)(val) ? val.toAst() : val;
          });
          return acc;
        }, ast)
      };
    },

    toString() {
      return (0, _format.format)({
        type: 'expression',
        chain: [this.toAst()]
      }, 'expression');
    }

  };
}