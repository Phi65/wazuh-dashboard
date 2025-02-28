"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUIAceKeyboardMode = useUIAceKeyboardMode;

var _react = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _eui = require("@elastic/eui");

require("./_ui_ace_keyboard_mode.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
const OverlayText = () =>
/*#__PURE__*/
// The point of this element is for accessibility purposes, so ignore eslint error
// in this case
//
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_eui.EuiText, {
  size: "s"
}, "Press Enter to start editing."), /*#__PURE__*/_react.default.createElement(_eui.EuiText, {
  size: "s"
}, "When you\u2019re done, press Escape to stop editing."));

function useUIAceKeyboardMode(aceTextAreaElement) {
  const overlayMountNode = (0, _react.useRef)(null);
  const autoCompleteVisibleRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    function onDismissOverlay(event) {
      if (event.key === _eui.keys.ENTER) {
        event.preventDefault();
        aceTextAreaElement.focus();
      }
    }

    function enableOverlay() {
      if (overlayMountNode.current) {
        overlayMountNode.current.focus();
      }
    }

    const isAutoCompleteVisible = () => {
      const autoCompleter = document.querySelector('.ace_autocomplete');

      if (!autoCompleter) {
        return false;
      } // The autoComplete is just hidden when it's closed, not removed from the DOM.


      return autoCompleter.style.display !== 'none';
    };

    const documentKeyDownListener = () => {
      autoCompleteVisibleRef.current = isAutoCompleteVisible();
    };

    const aceKeydownListener = event => {
      if (event.key === _eui.keys.ESCAPE && !autoCompleteVisibleRef.current) {
        event.preventDefault();
        event.stopPropagation();
        enableOverlay();
      }
    };

    if (aceTextAreaElement) {
      // We don't control HTML elements inside of ace so we imperatively create an element
      // that acts as a container and insert it just before ace's textarea element
      // so that the overlay lives at the correct spot in the DOM hierarchy.
      overlayMountNode.current = document.createElement('div');
      overlayMountNode.current.className = 'osdUiAceKeyboardHint';
      overlayMountNode.current.setAttribute('role', 'application');
      overlayMountNode.current.tabIndex = 0;
      overlayMountNode.current.addEventListener('focus', enableOverlay);
      overlayMountNode.current.addEventListener('keydown', onDismissOverlay);
      ReactDOM.render( /*#__PURE__*/_react.default.createElement(OverlayText, null), overlayMountNode.current);
      aceTextAreaElement.parentElement.insertBefore(overlayMountNode.current, aceTextAreaElement);
      aceTextAreaElement.setAttribute('tabindex', '-1'); // Order of events:
      // 1. Document capture event fires first and we check whether an autocomplete menu is open on keydown
      //    (not ideal because this is scoped to the entire document).
      // 2. Ace changes it's state (like hiding or showing autocomplete menu)
      // 3. We check what button was pressed and whether autocomplete was visible then determine
      //    whether it should act like a dismiss or if we should display an overlay.

      document.addEventListener('keydown', documentKeyDownListener, {
        capture: true
      });
      aceTextAreaElement.addEventListener('keydown', aceKeydownListener);
    }

    return () => {
      if (aceTextAreaElement) {
        document.removeEventListener('keydown', documentKeyDownListener, {
          capture: true
        });
        aceTextAreaElement.removeEventListener('keydown', aceKeydownListener);
        const textAreaContainer = aceTextAreaElement.parentElement;

        if (textAreaContainer && textAreaContainer.contains(overlayMountNode.current)) {
          textAreaContainer.removeChild(overlayMountNode.current);
        }
      }
    };
  }, [aceTextAreaElement]);
}