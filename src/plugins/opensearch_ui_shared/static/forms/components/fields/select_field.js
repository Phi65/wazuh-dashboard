"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectField = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _hook_form_lib = require("../../hook_form_lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SelectField = ({
  field,
  euiFieldProps,
  ...rest
}) => {
  const {
    isInvalid,
    errorMessage
  } = (0, _hook_form_lib.getFieldValidityAndErrorMessage)(field);
  return /*#__PURE__*/_react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    helpText: typeof field.helpText === 'function' ? field.helpText() : field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: true,
    "data-test-subj": rest['data-test-subj'],
    describedByIds: rest.idAria ? [rest.idAria] : undefined
  }, /*#__PURE__*/_react.default.createElement(_eui.EuiSelect, _extends({
    fullWidth: true,
    value: field.value,
    onChange: e => {
      field.setValue(e.target.value);
    },
    hasNoInitialSelection: true,
    isInvalid: isInvalid,
    "data-test-subj": "select"
  }, euiFieldProps)));
};

exports.SelectField = SelectField;