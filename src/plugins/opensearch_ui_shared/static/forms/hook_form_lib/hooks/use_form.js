"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = useForm;

var _react = require("react");

var _lodash = require("lodash");

var _saferLodashSet = require("@elastic/safer-lodash-set");

var _lib = require("../lib");

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
const DEFAULT_OPTIONS = {
  valueChangeDebounceTime: 500,
  stripEmptyFields: true
};

function useForm(formConfig) {
  const {
    onSubmit,
    schema,
    serializer,
    deserializer,
    options,
    id = 'default',
    defaultValue
  } = formConfig !== null && formConfig !== void 0 ? formConfig : {};
  const initDefaultValue = (0, _react.useCallback)(_defaultValue => {
    if (_defaultValue === undefined || Object.keys(_defaultValue).length === 0) {
      return {};
    }

    const filtered = Object.entries(_defaultValue).filter(({
      1: value
    }) => value !== undefined).reduce((acc, [key, value]) => ({ ...acc,
      [key]: value
    }), {});
    return deserializer ? deserializer(filtered) : filtered;
  }, [deserializer]);
  const defaultValueMemoized = (0, _react.useMemo)(() => {
    return initDefaultValue(defaultValue);
  }, [defaultValue, initDefaultValue]);
  const defaultValueDeserialized = (0, _react.useRef)(defaultValueMemoized);
  const {
    valueChangeDebounceTime,
    stripEmptyFields: doStripEmptyFields
  } = options !== null && options !== void 0 ? options : {};
  const formOptions = (0, _react.useMemo)(() => ({
    stripEmptyFields: doStripEmptyFields !== null && doStripEmptyFields !== void 0 ? doStripEmptyFields : DEFAULT_OPTIONS.stripEmptyFields,
    valueChangeDebounceTime: valueChangeDebounceTime !== null && valueChangeDebounceTime !== void 0 ? valueChangeDebounceTime : DEFAULT_OPTIONS.valueChangeDebounceTime
  }), [valueChangeDebounceTime, doStripEmptyFields]);
  const [isSubmitted, setIsSubmitted] = (0, _react.useState)(false);
  const [isSubmitting, setSubmitting] = (0, _react.useState)(false);
  const [isValid, setIsValid] = (0, _react.useState)(undefined);
  const fieldsRefs = (0, _react.useRef)({});
  const formUpdateSubscribers = (0, _react.useRef)([]);
  const isMounted = (0, _react.useRef)(false); // formData$ is an observable we can subscribe to in order to receive live
  // update of the raw form data. As an observable it does not trigger any React
  // render().
  // The <FormDataProvider> component is the one in charge of reading this observable
  // and updating its state to trigger the necessary view render.

  const formData$ = (0, _react.useRef)(null); // -- HELPERS
  // ----------------------------------

  const getFormData$ = (0, _react.useCallback)(() => {
    if (formData$.current === null) {
      formData$.current = new _lib.Subject({});
    }

    return formData$.current;
  }, []);
  const fieldsToArray = (0, _react.useCallback)(() => Object.values(fieldsRefs.current), []);
  const getFieldsForOutput = (0, _react.useCallback)((fields, opts) => {
    return Object.entries(fields).reduce((acc, [key, field]) => {
      if (!field.__isIncludedInOutput) {
        return acc;
      }

      if (opts.stripEmptyFields) {
        const isFieldEmpty = typeof field.value === 'string' && field.value.trim() === '';

        if (isFieldEmpty) {
          return acc;
        }
      }

      acc[key] = field;
      return acc;
    }, {});
  }, []);
  const updateFormDataAt = (0, _react.useCallback)((path, value) => {
    const _formData$ = getFormData$();

    const currentFormData = _formData$.value;

    if (currentFormData[path] !== value) {
      _formData$.next({ ...currentFormData,
        [path]: value
      });
    }

    return _formData$.value;
  }, [getFormData$]);
  const updateDefaultValueAt = (0, _react.useCallback)((path, value) => {
    (0, _saferLodashSet.set)(defaultValueDeserialized.current, path, value);
  }, []); // -- API
  // ----------------------------------

  const getFormData = (0, _react.useCallback)((getDataOptions = {
    unflatten: true
  }) => {
    if (getDataOptions.unflatten) {
      const fieldsToOutput = getFieldsForOutput(fieldsRefs.current, {
        stripEmptyFields: formOptions.stripEmptyFields
      });
      const fieldsValue = (0, _lib.mapFormFields)(fieldsToOutput, field => field.__serializeValue());
      return serializer ? serializer((0, _lib.unflattenObject)(fieldsValue)) : (0, _lib.unflattenObject)(fieldsValue);
    }

    return Object.entries(fieldsRefs.current).reduce((acc, [key, field]) => ({ ...acc,
      [key]: field.value
    }), {});
  }, [getFieldsForOutput, formOptions.stripEmptyFields, serializer]);
  const getErrors = (0, _react.useCallback)(() => {
    if (isValid === true) {
      return [];
    }

    return fieldsToArray().reduce((acc, field) => {
      const fieldError = field.getErrorsMessages();

      if (fieldError === null) {
        return acc;
      }

      return [...acc, fieldError];
    }, []);
  }, [isValid, fieldsToArray]);

  const isFieldValid = field => field.isValid && !field.isValidating;

  const waitForFieldsToFinishValidating = (0, _react.useCallback)(async () => {
    let areSomeFieldValidating = fieldsToArray().some(field => field.isValidating);

    if (!areSomeFieldValidating) {
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        areSomeFieldValidating = fieldsToArray().some(field => field.isValidating);

        if (areSomeFieldValidating) {
          // Recursively wait for all the fields to finish validating.
          return waitForFieldsToFinishValidating().then(resolve);
        }

        resolve();
      }, 100);
    });
  }, [fieldsToArray]);
  const validateFields = (0, _react.useCallback)(async fieldNames => {
    const fieldsToValidate = fieldNames.map(name => fieldsRefs.current[name]).filter(field => field !== undefined);
    const formData = getFormData({
      unflatten: false
    });
    const validationResult = await Promise.all(fieldsToValidate.map(field => field.validate({
      formData
    })));

    if (isMounted.current === false) {
      return {
        areFieldsValid: true,
        isFormValid: true
      };
    }

    const areFieldsValid = validationResult.every(Boolean);
    const validationResultByPath = fieldsToValidate.reduce((acc, field, i) => {
      acc[field.path] = validationResult[i].isValid;
      return acc;
    }, {}); // At this stage we have an updated field validation state inside the "validationResultByPath" object.
    // The fields we have in our "fieldsRefs.current" have not been updated yet with the new validation state
    // (isValid, isValidated...) as this will happen _after_, when the "useEffect" triggers and calls "addField()".
    // This means that we have **stale state value** in our fieldsRefs.
    // To know the current form validity, we will then merge the "validationResult" _with_ the fieldsRefs object state,
    // the "validationResult" taking presedence over the fieldsRefs values.

    const formFieldsValidity = fieldsToArray().map(field => {
      var _validationResultByPa;

      const hasUpdatedValidity = validationResultByPath[field.path] !== undefined;

      const _isValid = (_validationResultByPa = validationResultByPath[field.path]) !== null && _validationResultByPa !== void 0 ? _validationResultByPa : field.isValid;

      const _isValidated = hasUpdatedValidity ? true : field.isValidated;

      const _isValidating = hasUpdatedValidity ? false : field.isValidating;

      return {
        isValid: _isValid,
        isValidated: _isValidated,
        isValidating: _isValidating
      };
    });
    const areAllFieldsValidated = formFieldsValidity.every(field => field.isValidated);
    const areSomeFieldValidating = formFieldsValidity.some(field => field.isValidating); // If *not* all the fiels have been validated, the validity of the form is unknown, thus still "undefined"

    const isFormValid = areAllFieldsValidated && areSomeFieldValidating === false ? formFieldsValidity.every(field => field.isValid) : undefined;
    setIsValid(isFormValid);
    return {
      areFieldsValid,
      isFormValid
    };
  }, [getFormData, fieldsToArray]);
  const validateAllFields = (0, _react.useCallback)(async () => {
    // Maybe some field are being validated because of their async validation(s).
    // We make sure those validations have finished executing before proceeding.
    await waitForFieldsToFinishValidating();

    if (!isMounted.current) {
      return false;
    }

    const fieldsArray = fieldsToArray();
    const fieldsToValidate = fieldsArray.filter(field => !field.isValidated);
    let isFormValid;

    if (fieldsToValidate.length === 0) {
      isFormValid = fieldsArray.every(isFieldValid);
    } else {
      ({
        isFormValid
      } = await validateFields(fieldsToValidate.map(field => field.path)));
    }

    setIsValid(isFormValid);
    return isFormValid;
  }, [fieldsToArray, validateFields, waitForFieldsToFinishValidating]);
  const addField = (0, _react.useCallback)(field => {
    fieldsRefs.current[field.path] = field;
    updateFormDataAt(field.path, field.value);

    if (!field.isValidated) {
      setIsValid(undefined); // When we submit the form (and set "isSubmitted" to "true"), we validate **all fields**.
      // If a field is added and it is not validated it means that we have swapped fields and added new ones:
      // --> we have basically have a new form in front of us.
      // For that reason we make sure that the "isSubmitted" state is false.

      setIsSubmitted(false);
    }
  }, [updateFormDataAt]);
  const removeField = (0, _react.useCallback)(_fieldNames => {
    const fieldNames = Array.isArray(_fieldNames) ? _fieldNames : [_fieldNames];
    const currentFormData = { ...getFormData$().value
    };
    fieldNames.forEach(name => {
      delete fieldsRefs.current[name];
      delete currentFormData[name];
    });
    getFormData$().next(currentFormData);
    /**
     * After removing a field, the form validity might have changed
     * (an invalid field might have been removed and now the form is valid)
     */

    setIsValid(prev => {
      if (prev === false) {
        const isFormValid = fieldsToArray().every(isFieldValid);
        return isFormValid;
      } // If the form validity is "true" or "undefined", it does not change after removing a field


      return prev;
    });
  }, [getFormData$, fieldsToArray]);
  const setFieldValue = (0, _react.useCallback)((fieldName, value) => {
    if (fieldsRefs.current[fieldName] === undefined) {
      return;
    }

    fieldsRefs.current[fieldName].setValue(value);
  }, []);
  const setFieldErrors = (0, _react.useCallback)((fieldName, errors) => {
    if (fieldsRefs.current[fieldName] === undefined) {
      return;
    }

    fieldsRefs.current[fieldName].setErrors(errors);
  }, []);
  const getFields = (0, _react.useCallback)(() => fieldsRefs.current, []);
  const getFieldDefaultValue = (0, _react.useCallback)(fieldName => (0, _lodash.get)(defaultValueDeserialized.current, fieldName), []);
  const readFieldConfigFromSchema = (0, _react.useCallback)(fieldName => {
    const config = (0, _lodash.get)(schema !== null && schema !== void 0 ? schema : {}, fieldName) || {};
    return config;
  }, [schema]);
  const submitForm = (0, _react.useCallback)(async e => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitted(true); // User has attempted to submit the form at least once

    setSubmitting(true);
    const isFormValid = await validateAllFields();
    const formData = isFormValid ? getFormData() : {};

    if (onSubmit) {
      await onSubmit(formData, isFormValid);
    }

    if (isMounted.current) {
      setSubmitting(false);
    }

    return {
      data: formData,
      isValid: isFormValid
    };
  }, [validateAllFields, getFormData, onSubmit]);
  const subscribe = (0, _react.useCallback)(handler => {
    const subscription = getFormData$().subscribe(raw => {
      handler({
        isValid,
        data: {
          raw,
          format: getFormData
        },
        validate: validateAllFields
      });
    });
    formUpdateSubscribers.current.push(subscription);
    return {
      unsubscribe() {
        formUpdateSubscribers.current = formUpdateSubscribers.current.filter(sub => sub !== subscription);
        return subscription.unsubscribe();
      }

    };
  }, [getFormData$, isValid, getFormData, validateAllFields]);
  /**
   * Reset all the fields of the form to their default values
   * and reset all the states to their original value.
   */

  const reset = (0, _react.useCallback)((resetOptions = {
    resetValues: true
  }) => {
    const {
      resetValues = true,
      defaultValue: updatedDefaultValue
    } = resetOptions;
    const currentFormData = { ...getFormData$().value
    };

    if (updatedDefaultValue) {
      defaultValueDeserialized.current = initDefaultValue(updatedDefaultValue);
    }

    Object.entries(fieldsRefs.current).forEach(([path, field]) => {
      // By resetting the form, some field might be unmounted. In order
      // to avoid a race condition, we check that the field still exists.
      const isFieldMounted = fieldsRefs.current[path] !== undefined;

      if (isFieldMounted) {
        const fieldDefaultValue = getFieldDefaultValue(path);
        field.reset({
          resetValue: resetValues,
          defaultValue: fieldDefaultValue
        });
        currentFormData[path] = fieldDefaultValue;
      }
    });

    if (resetValues) {
      getFormData$().next(currentFormData);
    }

    setIsSubmitted(false);
    setSubmitting(false);
    setIsValid(undefined);
  }, [getFormData$, initDefaultValue, getFieldDefaultValue]);
  const form = (0, _react.useMemo)(() => {
    return {
      isSubmitted,
      isSubmitting,
      isValid,
      id,
      submit: submitForm,
      validate: validateAllFields,
      subscribe,
      setFieldValue,
      setFieldErrors,
      getFields,
      getFormData,
      getErrors,
      reset,
      __options: formOptions,
      __getFormData$: getFormData$,
      __updateFormDataAt: updateFormDataAt,
      __updateDefaultValueAt: updateDefaultValueAt,
      __readFieldConfigFromSchema: readFieldConfigFromSchema,
      __getFieldDefaultValue: getFieldDefaultValue,
      __addField: addField,
      __removeField: removeField,
      __validateFields: validateFields
    };
  }, [isSubmitted, isSubmitting, isValid, id, submitForm, subscribe, setFieldValue, setFieldErrors, getFields, getFormData, getErrors, getFieldDefaultValue, reset, formOptions, getFormData$, updateFormDataAt, updateDefaultValueAt, readFieldConfigFromSchema, addField, removeField, validateFields, validateAllFields]);
  (0, _react.useEffect)(() => {
    if (!isMounted.current) {
      return;
    } // Whenever the "defaultValue" prop changes, reinitialize our ref


    defaultValueDeserialized.current = defaultValueMemoized;
  }, [defaultValueMemoized]);
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      formUpdateSubscribers.current.forEach(subscription => subscription.unsubscribe());
      formUpdateSubscribers.current = [];
    };
  }, []);
  return {
    form
  };
}