"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DQLSyntaxError = void 0;

var _lodash = require("lodash");

var _i18n = require("@osd/i18n");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const endOfInputText = _i18n.i18n.translate('data.common.dql.errors.endOfInputText', {
  defaultMessage: 'end of input'
});

const grammarRuleTranslations = {
  fieldName: _i18n.i18n.translate('data.common.dql.errors.fieldNameText', {
    defaultMessage: 'field name'
  }),
  value: _i18n.i18n.translate('data.common.dql.errors.valueText', {
    defaultMessage: 'value'
  }),
  literal: _i18n.i18n.translate('data.common.dql.errors.literalText', {
    defaultMessage: 'literal'
  }),
  whitespace: _i18n.i18n.translate('data.common.dql.errors.whitespaceText', {
    defaultMessage: 'whitespace'
  })
};

class DQLSyntaxError extends Error {
  constructor(error, expression) {
    let message = error.message;

    if (error.expected) {
      const translatedExpectations = error.expected.map(expected => {
        return grammarRuleTranslations[expected.description] || expected.description;
      });
      const translatedExpectationText = translatedExpectations.join(', ');
      message = _i18n.i18n.translate('data.common.dql.errors.syntaxError', {
        defaultMessage: 'Expected {expectedList} but {foundInput} found.',
        values: {
          expectedList: translatedExpectationText,
          foundInput: error.found ? `"${error.found}"` : endOfInputText
        }
      });
    }

    const fullMessage = [message, expression, (0, _lodash.repeat)('-', error.location.start.offset) + '^'].join('\n');
    super(fullMessage);

    _defineProperty(this, "shortMessage", void 0);

    this.name = 'DQLSyntaxError';
    this.shortMessage = message;
  }

}

exports.DQLSyntaxError = DQLSyntaxError;