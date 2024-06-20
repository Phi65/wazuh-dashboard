"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternField = void 0;

var _osd_field_types = require("../../osd_field_types");

var _types = require("../../osd_field_types/types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class IndexPatternField {
  // not writable or serialized
  constructor(spec, displayName) {
    _defineProperty(this, "spec", void 0);

    _defineProperty(this, "displayName", void 0);

    _defineProperty(this, "osdFieldType", void 0);

    this.spec = { ...spec,
      type: spec.name === '_source' ? '_source' : spec.type
    };
    this.displayName = displayName;
    this.osdFieldType = (0, _osd_field_types.getOsdFieldType)(spec.type);
  } // writable attrs

  /**
   * Count is used for field popularity
   */


  get count() {
    return this.spec.count || 0;
  }

  set count(count) {
    this.spec.count = count;
  }
  /**
   * Script field code
   */


  get script() {
    return this.spec.script;
  }

  set script(script) {
    this.spec.script = script;
  }
  /**
   * Script field language
   */


  get lang() {
    return this.spec.lang;
  }

  set lang(lang) {
    this.spec.lang = lang;
  }
  /**
   * Description of field type conflicts across different indices in the same index pattern
   */


  get conflictDescriptions() {
    return this.spec.conflictDescriptions;
  }

  set conflictDescriptions(conflictDescriptions) {
    this.spec.conflictDescriptions = conflictDescriptions;
  } // read only attrs


  get name() {
    return this.spec.name;
  }

  get type() {
    return this.spec.type;
  }

  get esTypes() {
    return this.spec.esTypes;
  }

  get scripted() {
    return !!this.spec.scripted;
  }

  get searchable() {
    return !!(this.spec.searchable || this.scripted);
  }

  get aggregatable() {
    return !!(this.spec.aggregatable || this.scripted);
  }

  get readFromDocValues() {
    return !!(this.spec.readFromDocValues && !this.scripted);
  }

  get subType() {
    return this.spec.subType;
  } // not writable, not serialized


  get sortable() {
    return this.name === '_score' || (this.spec.indexed || this.aggregatable) && this.osdFieldType.sortable;
  }

  get filterable() {
    return this.name === '_id' || this.scripted || (this.spec.indexed || this.searchable) && this.osdFieldType.filterable;
  }

  get visualizable() {
    const notVisualizableFieldTypes = [_types.OSD_FIELD_TYPES.UNKNOWN, _types.OSD_FIELD_TYPES.CONFLICT];
    return this.aggregatable && !notVisualizableFieldTypes.includes(this.spec.type);
  }

  toJSON() {
    return {
      count: this.count,
      script: this.script,
      lang: this.lang,
      conflictDescriptions: this.conflictDescriptions,
      name: this.name,
      type: this.type,
      esTypes: this.esTypes,
      scripted: this.scripted,
      searchable: this.searchable,
      aggregatable: this.aggregatable,
      readFromDocValues: this.readFromDocValues,
      subType: this.subType
    };
  }

  toSpec({
    getFormatterForField
  } = {}) {
    return {
      count: this.count,
      script: this.script,
      lang: this.lang,
      conflictDescriptions: this.conflictDescriptions,
      name: this.name,
      type: this.type,
      esTypes: this.esTypes,
      scripted: this.scripted,
      searchable: this.searchable,
      aggregatable: this.aggregatable,
      readFromDocValues: this.readFromDocValues,
      subType: this.subType,
      format: getFormatterForField ? getFormatterForField(this).toJSON() : undefined
    };
  }

}

exports.IndexPatternField = IndexPatternField;