"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _hook_form_lib = require("../../hook_form_lib");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RangeField = ({
  field,
  euiFieldProps = {},
  ...rest
}) => {
  const {
    isInvalid,
    errorMessage
  } = (0, _hook_form_lib.getFieldValidityAndErrorMessage)(field);
  const {
    onChange: onFieldChange
  } = field;
  const onChange = (0, _react.useCallback)(e => {
    const event = { ...e,
      value: `${e.currentTarget.value}`
    };
    onFieldChange(event);
  }, [onFieldChange]);
  return /*#__PURE__*/_react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    helpText: typeof field.helpText === 'function' ? field.helpText() : field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: true,
    "data-test-subj": rest['data-test-subj'],
    describedByIds: rest.idAria ? [rest.idAria] : undefined
  }, /*#__PURE__*/_react.default.createElement(_eui.EuiRange, _extends({
    value: field.value,
    onChange: onChange,
    max: 10,
    min: 0,
    showRange: true,
    showInput: true,
    fullWidth: true,
    "data-test-subj": "range"
  }, euiFieldProps)));
};

exports.RangeField = RangeField;