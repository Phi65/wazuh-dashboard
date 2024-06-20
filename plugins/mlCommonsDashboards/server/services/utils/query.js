"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTermQuery = exports.generateMustQueries = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const generateTermQuery = (key, value) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return {
      term: {
        [key]: {
          value
        }
      }
    };
  }

  return {
    terms: {
      [key]: value
    }
  };
};

exports.generateTermQuery = generateTermQuery;

const generateMustQueries = queries => {
  switch (queries.length) {
    case 0:
      return {
        match_all: {}
      };

    case 1:
      return queries[0];

    default:
      return {
        bool: {
          must: queries
        }
      };
  }
};

exports.generateMustQueries = generateMustQueries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXJ5LnRzIl0sIm5hbWVzIjpbImdlbmVyYXRlVGVybVF1ZXJ5Iiwia2V5IiwidmFsdWUiLCJ0ZXJtIiwidGVybXMiLCJnZW5lcmF0ZU11c3RRdWVyaWVzIiwicXVlcmllcyIsImxlbmd0aCIsIm1hdGNoX2FsbCIsImJvb2wiLCJtdXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFTyxNQUFNQSxpQkFBaUIsR0FBRyxDQUFDQyxHQUFELEVBQWNDLEtBQWQsS0FBa0U7QUFDakcsTUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEQsRUFBNEQ7QUFDMUQsV0FBTztBQUNMQyxNQUFBQSxJQUFJLEVBQUU7QUFDSixTQUFDRixHQUFELEdBQU87QUFBRUMsVUFBQUE7QUFBRjtBQURIO0FBREQsS0FBUDtBQUtEOztBQUNELFNBQU87QUFDTEUsSUFBQUEsS0FBSyxFQUFFO0FBQ0wsT0FBQ0gsR0FBRCxHQUFPQztBQURGO0FBREYsR0FBUDtBQUtELENBYk07Ozs7QUFlQSxNQUFNRyxtQkFBbUIsR0FBT0MsT0FBSixJQUFxQjtBQUN0RCxVQUFRQSxPQUFPLENBQUNDLE1BQWhCO0FBQ0UsU0FBSyxDQUFMO0FBQ0UsYUFBTztBQUNMQyxRQUFBQSxTQUFTLEVBQUU7QUFETixPQUFQOztBQUdGLFNBQUssQ0FBTDtBQUNFLGFBQU9GLE9BQU8sQ0FBQyxDQUFELENBQWQ7O0FBQ0Y7QUFDRSxhQUFPO0FBQ0xHLFFBQUFBLElBQUksRUFBRTtBQUNKQyxVQUFBQSxJQUFJLEVBQUVKO0FBREY7QUFERCxPQUFQO0FBUko7QUFjRCxDQWZNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVUZXJtUXVlcnkgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGVybToge1xuICAgICAgICBba2V5XTogeyB2YWx1ZSB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgdGVybXM6IHtcbiAgICAgIFtrZXldOiB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlTXVzdFF1ZXJpZXMgPSA8VD4ocXVlcmllczogVFtdKSA9PiB7XG4gIHN3aXRjaCAocXVlcmllcy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYXRjaF9hbGw6IHt9LFxuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gcXVlcmllc1swXTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYm9vbDoge1xuICAgICAgICAgIG11c3Q6IHF1ZXJpZXMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICB9XG59O1xuIl19