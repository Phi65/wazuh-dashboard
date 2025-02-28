"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useField = void 0;

var _react = require("react");

var _constants = require("../constants");

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
const useField = (form, path, config = {}, valueChangeListener) => {
  var _config$defaultValue;

  const {
    type = _constants.FIELD_TYPES.TEXT,
    defaultValue = '',
    // The value to use a fallback mecanism when no initial value is passed
    initialValue = (_config$defaultValue = config.defaultValue) !== null && _config$defaultValue !== void 0 ? _config$defaultValue : '',
    // The value explicitly passed
    isIncludedInOutput = true,
    label = '',
    labelAppend = '',
    helpText = '',
    validations,
    formatters,
    fieldsToValidateOnChange,
    valueChangeDebounceTime = form.__options.valueChangeDebounceTime,
    serializer,
    deserializer
  } = config;
  const {
    getFormData,
    getFields,
    __addField,
    __removeField,
    __updateFormDataAt,
    __validateFields
  } = form;
  const deserializeValue = (0, _react.useCallback)((rawValue = initialValue) => {
    if (typeof rawValue === 'function') {
      return deserializer ? deserializer(rawValue()) : rawValue();
    }

    return deserializer ? deserializer(rawValue) : rawValue;
  }, [initialValue, deserializer]);
  const [value, setStateValue] = (0, _react.useState)(deserializeValue);
  const [errors, setErrors] = (0, _react.useState)([]);
  const [isPristine, setPristine] = (0, _react.useState)(true);
  const [isValidating, setValidating] = (0, _react.useState)(false);
  const [isChangingValue, setIsChangingValue] = (0, _react.useState)(false);
  const [isValidated, setIsValidated] = (0, _react.useState)(false);
  const isMounted = (0, _react.useRef)(false);
  const validateCounter = (0, _react.useRef)(0);
  const changeCounter = (0, _react.useRef)(0);
  const hasBeenReset = (0, _react.useRef)(false);
  const inflightValidation = (0, _react.useRef)(null);
  const debounceTimeout = (0, _react.useRef)(null); // -- HELPERS
  // ----------------------------------

  const serializeValue = (0, _react.useCallback)((internalValue = value) => {
    return serializer ? serializer(internalValue) : internalValue;
  }, [serializer, value]);
  /**
   * Filter an array of errors with specific validation type on them
   *
   * @param _errors The array of errors to filter
   * @param validationType The validation type to filter out
   */

  const filterErrors = (_errors, validationTypeToFilterOut = _constants.VALIDATION_TYPES.FIELD) => {
    const validationTypeToArray = Array.isArray(validationTypeToFilterOut) ? validationTypeToFilterOut : [validationTypeToFilterOut];
    return _errors.filter(error => validationTypeToArray.every(_type => error.validationType !== _type));
  };

  const formatInputValue = (0, _react.useCallback)(inputValue => {
    const isEmptyString = typeof inputValue === 'string' && inputValue.trim() === '';

    if (isEmptyString || !formatters) {
      return inputValue;
    }

    const formData = getFormData({
      unflatten: false
    });
    return formatters.reduce((output, formatter) => formatter(output, formData), inputValue);
  }, [formatters, getFormData]);
  const onValueChange = (0, _react.useCallback)(async () => {
    const changeIteration = ++changeCounter.current;
    const startTime = Date.now();
    setPristine(false);
    setIsChangingValue(true); // Notify listener

    if (valueChangeListener) {
      valueChangeListener(value);
    } // Update the form data observable


    __updateFormDataAt(path, value); // Validate field(s) (that will update form.isValid state)


    await __validateFields(fieldsToValidateOnChange !== null && fieldsToValidateOnChange !== void 0 ? fieldsToValidateOnChange : [path]);

    if (isMounted.current === false) {
      return;
    }
    /**
     * If we have set a delay to display the error message after the field value has changed,
     * we first check that this is the last "change iteration" (=== the last keystroke from the user)
     * and then, we verify how long we've already waited for as form.__validateFields() is asynchronous
     * and might already have taken more than the specified delay)
     */


    if (changeIteration === changeCounter.current) {
      if (valueChangeDebounceTime > 0) {
        const delta = Date.now() - startTime;

        if (delta < valueChangeDebounceTime) {
          debounceTimeout.current = setTimeout(() => {
            debounceTimeout.current = null;
            setIsChangingValue(false);
          }, valueChangeDebounceTime - delta);
          return;
        }
      }

      setIsChangingValue(false);
    }
  }, [path, value, valueChangeListener, valueChangeDebounceTime, fieldsToValidateOnChange, __updateFormDataAt, __validateFields]);
  const cancelInflightValidation = (0, _react.useCallback)(() => {
    // Cancel any inflight validation (like an HTTP Request)
    if (inflightValidation.current && typeof inflightValidation.current.cancel === 'function') {
      inflightValidation.current.cancel();
      inflightValidation.current = null;
    }
  }, []);
  const clearErrors = (0, _react.useCallback)((validationType = _constants.VALIDATION_TYPES.FIELD) => {
    setErrors(previousErrors => filterErrors(previousErrors, validationType));
  }, []);
  const runValidations = (0, _react.useCallback)(({
    formData,
    value: valueToValidate,
    validationTypeToValidate
  }) => {
    if (!validations) {
      return [];
    } // By default, for fields that have an asynchronous validation
    // we will clear the errors as soon as the field value changes.


    clearErrors([_constants.VALIDATION_TYPES.FIELD, _constants.VALIDATION_TYPES.ASYNC]);
    cancelInflightValidation();

    const runAsync = async () => {
      const validationErrors = [];

      for (const validation of validations) {
        var _validationResult$__i;

        inflightValidation.current = null;
        const {
          validator,
          exitOnFail = true,
          type: validationType = _constants.VALIDATION_TYPES.FIELD
        } = validation;

        if (typeof validationTypeToValidate !== 'undefined' && validationType !== validationTypeToValidate) {
          continue;
        }

        inflightValidation.current = validator({
          value: valueToValidate,
          errors: validationErrors,
          form: {
            getFormData,
            getFields
          },
          formData,
          path
        });
        const validationResult = await inflightValidation.current;

        if (!validationResult) {
          continue;
        }

        validationErrors.push({ ...validationResult,
          // See comment below that explains why we add "__isBlocking__".
          __isBlocking__: (_validationResult$__i = validationResult.__isBlocking__) !== null && _validationResult$__i !== void 0 ? _validationResult$__i : validation.isBlocking,
          validationType: validationType || _constants.VALIDATION_TYPES.FIELD
        });

        if (exitOnFail) {
          break;
        }
      }

      return validationErrors;
    };

    const runSync = () => {
      const validationErrors = []; // Sequentially execute all the validations for the field

      for (const validation of validations) {
        var _isBlocking__;

        const {
          validator,
          exitOnFail = true,
          type: validationType = _constants.VALIDATION_TYPES.FIELD
        } = validation;

        if (typeof validationTypeToValidate !== 'undefined' && validationType !== validationTypeToValidate) {
          continue;
        }

        const validationResult = validator({
          value: valueToValidate,
          errors: validationErrors,
          form: {
            getFormData,
            getFields
          },
          formData,
          path
        });

        if (!validationResult) {
          continue;
        }

        if (!!validationResult.then) {
          // The validator returned a Promise: abort and run the validations asynchronously
          // We keep a reference to the onflith promise so we can cancel it.
          inflightValidation.current = validationResult;
          cancelInflightValidation();
          return runAsync();
        }

        validationErrors.push({ ...validationResult,
          // We add an "__isBlocking__" property to know if this error is a blocker or no.
          // Most validation errors are blockers but in some cases a validation is more a warning than an error
          // like with the ComboBox items when they are added.
          __isBlocking__: (_isBlocking__ = validationResult.__isBlocking__) !== null && _isBlocking__ !== void 0 ? _isBlocking__ : validation.isBlocking,
          validationType: validationType || _constants.VALIDATION_TYPES.FIELD
        });

        if (exitOnFail) {
          break;
        }
      }

      return validationErrors;
    }; // We first try to run the validations synchronously


    return runSync();
  }, [clearErrors, cancelInflightValidation, validations, getFormData, getFields, path]); // -- API
  // ----------------------------------

  /**
   * Validate a form field, running all its validations.
   * If a validationType is provided then only that validation will be executed,
   * skipping the other type of validation that might exist.
   */

  const validate = (0, _react.useCallback)((validationData = {}) => {
    const {
      formData = getFormData({
        unflatten: false
      }),
      value: valueToValidate = value,
      validationType
    } = validationData;
    setIsValidated(true);
    setValidating(true); // By the time our validate function has reached completion, it’s possible
    // that we have called validate() again. If this is the case, we need
    // to ignore the results of this invocation and only use the results of
    // the most recent invocation to update the error state for a field

    const validateIteration = ++validateCounter.current;

    const onValidationResult = _validationErrors => {
      if (validateIteration === validateCounter.current) {
        // This is the most recent invocation
        setValidating(false); // Update the errors array

        setErrors(prev => {
          const filteredErrors = filterErrors(prev, validationType);
          return [...filteredErrors, ..._validationErrors];
        });
      }

      return {
        isValid: _validationErrors.length === 0,
        errors: _validationErrors
      };
    };

    const validationErrors = runValidations({
      formData,
      value: valueToValidate,
      validationTypeToValidate: validationType
    });

    if (Reflect.has(validationErrors, 'then')) {
      return validationErrors.then(onValidationResult);
    }

    return onValidationResult(validationErrors);
  }, [getFormData, value, runValidations]);
  /**
   * Handler to change the field value
   *
   * @param newValue The new value to assign to the field
   */

  const setValue = (0, _react.useCallback)(newValue => {
    setStateValue(prev => {
      let formattedValue;

      if (typeof newValue === 'function') {
        formattedValue = formatInputValue(newValue(prev));
      } else {
        formattedValue = formatInputValue(newValue);
      }

      return formattedValue;
    });
  }, [formatInputValue]);

  const _setErrors = (0, _react.useCallback)(_errors => {
    setErrors(_errors.map(error => ({
      validationType: _constants.VALIDATION_TYPES.FIELD,
      __isBlocking__: true,
      ...error
    })));
  }, []);
  /**
   * Form <input /> "onChange" event handler
   *
   * @param event Form input change event
   */


  const onChange = (0, _react.useCallback)(event => {
    const newValue = {}.hasOwnProperty.call(event.target, 'checked') ? event.target.checked : event.target.value;
    setValue(newValue);
  }, [setValue]);
  /**
   * As we can have multiple validation types (FIELD, ASYNC, ARRAY_ITEM), this
   * method allows us to retrieve error messages for certain types of validation.
   *
   * For example, if we want to validation error messages to be displayed when the user clicks the "save" button
   * _but_ in case of an asynchronous validation (for ex. an HTTP request that would validate an index name) we
   * want to immediately display the error message, we would have 2 types of validation: FIELD & ASYNC
   *
   * @param validationType The validation type to return error messages from
   */

  const getErrorsMessages = (0, _react.useCallback)((args = {}) => {
    const {
      errorCode,
      validationType = _constants.VALIDATION_TYPES.FIELD
    } = args;
    const errorMessages = errors.reduce((messages, error) => {
      const isSameErrorCode = errorCode && error.code === errorCode;
      const isSamevalidationType = error.validationType === validationType || validationType === _constants.VALIDATION_TYPES.FIELD && !{}.hasOwnProperty.call(error, 'validationType');

      if (isSameErrorCode || typeof errorCode === 'undefined' && isSamevalidationType) {
        return messages ? `${messages}, ${error.message}` : error.message;
      }

      return messages;
    }, '');
    return errorMessages ? errorMessages : null;
  }, [errors]);
  /**
   * Handler to update the state and make sure the component is still mounted.
   * When resetting the form, some field might get unmounted (e.g. a toggle on "true" becomes "false" and now certain fields should not be in the DOM).
   * In that scenario there is a race condition in the "reset" method below, because the useState() hook is not synchronous.
   *
   * A better approach would be to have the state in a reducer and being able to update all values in a single dispatch action.
   */

  const updateStateIfMounted = (0, _react.useCallback)((state, nextValue) => {
    if (isMounted.current === false) {
      return;
    }

    switch (state) {
      case 'value':
        return setValue(nextValue);

      case 'errors':
        return setErrors(nextValue);

      case 'isChangingValue':
        return setIsChangingValue(nextValue);

      case 'isPristine':
        return setPristine(nextValue);

      case 'isValidated':
        return setIsValidated(nextValue);

      case 'isValidating':
        return setValidating(nextValue);
    }
  }, [setValue]);
  const reset = (0, _react.useCallback)((resetOptions = {
    resetValue: true
  }) => {
    const {
      resetValue = true,
      defaultValue: updatedDefaultValue
    } = resetOptions;
    updateStateIfMounted('isPristine', true);
    updateStateIfMounted('isValidating', false);
    updateStateIfMounted('isChangingValue', false);
    updateStateIfMounted('isValidated', false);
    updateStateIfMounted('errors', []);

    if (resetValue) {
      hasBeenReset.current = true;
      const newValue = deserializeValue(updatedDefaultValue !== null && updatedDefaultValue !== void 0 ? updatedDefaultValue : defaultValue);
      updateStateIfMounted('value', newValue);
      return newValue;
    }
  }, [updateStateIfMounted, deserializeValue, defaultValue]); // Don't take into account non blocker validation. Some are just warning (like trying to add a wrong ComboBox item)

  const isValid = errors.filter(e => e.__isBlocking__ !== false).length === 0;
  const field = (0, _react.useMemo)(() => {
    return {
      path,
      type,
      label,
      labelAppend,
      helpText,
      value,
      errors,
      isPristine,
      isValid,
      isValidating,
      isValidated,
      isChangingValue,
      onChange,
      getErrorsMessages,
      setValue,
      setErrors: _setErrors,
      clearErrors,
      validate,
      reset,
      __isIncludedInOutput: isIncludedInOutput,
      __serializeValue: serializeValue
    };
  }, [path, type, label, labelAppend, helpText, value, isPristine, errors, isValid, isValidating, isValidated, isChangingValue, isIncludedInOutput, onChange, getErrorsMessages, setValue, _setErrors, clearErrors, validate, reset, serializeValue]); // ----------------------------------
  // -- EFFECTS
  // ----------------------------------

  (0, _react.useEffect)(() => {
    __addField(field);
  }, [field, __addField]);
  (0, _react.useEffect)(() => {
    return () => {
      __removeField(path);
    };
  }, [path, __removeField]);
  (0, _react.useEffect)(() => {
    // If the field value has been reset, we don't want to call the "onValueChange()"
    // as it will set the "isPristine" state to true or validate the field, which initially we don't want.
    if (hasBeenReset.current) {
      hasBeenReset.current = false;
      return;
    }

    if (!isMounted.current) {
      return;
    }

    onValueChange();
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }
    };
  }, [onValueChange]);
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return field;
};

exports.useField = useField;