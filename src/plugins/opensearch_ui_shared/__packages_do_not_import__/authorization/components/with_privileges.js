"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithPrivileges = void 0;

var _authorization_provider = require("./authorization_provider");

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
const toArray = value => Array.isArray(value) ? value : [value];

const WithPrivileges = ({
  privileges: requiredPrivileges,
  children
}) => {
  const {
    isLoading,
    privileges
  } = (0, _authorization_provider.useAuthorizationContext)();
  const privilegesToArray = toArray(requiredPrivileges).map(p => {
    const [section, privilege] = p.split('.');

    if (!privilege) {
      // Oh! we forgot to use the dot "." notation.
      throw new Error('Required privilege must have the format "section.privilege"');
    }

    return [section, privilege];
  });
  const hasPrivileges = isLoading ? false : privilegesToArray.every(privilege => {
    const [section, requiredPrivilege] = privilege;

    if (!privileges.missingPrivileges[section]) {
      // if the section does not exist in our missingPriviledges, everything is OK
      return true;
    }

    if (privileges.missingPrivileges[section].length === 0) {
      return true;
    }

    if (requiredPrivilege === '*') {
      // If length > 0 and we require them all... KO
      return false;
    } // If we require _some_ privilege, we make sure that the one
    // we require is *not* in the missingPrivilege array


    return !privileges.missingPrivileges[section].includes(requiredPrivilege);
  });
  const privilegesMissing = privilegesToArray.reduce((acc, [section, privilege]) => {
    if (privilege === '*') {
      acc[section] = privileges.missingPrivileges[section] || [];
    } else if (privileges.missingPrivileges[section] && privileges.missingPrivileges[section].includes(privilege)) {
      const missing = acc[section] || [];
      acc[section] = [...missing, privilege];
    }

    return acc;
  }, {});
  return children({
    isLoading,
    hasPrivileges,
    privilegesMissing
  });
};

exports.WithPrivileges = WithPrivileges;