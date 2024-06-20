"use strict";

var _events = require("events");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable */
// transpiled typescript->javascript from
// https://github.com/aurelia/pal-nodejs/blob/master/src/polyfills/mutation-observer.ts

/*
 * Based on Shim for MutationObserver interface
 * Author: Graeme Yeates (github.com/megawac)
 * Repository: https://github.com/megawac/MutationObserver.js
 */
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

module.exports = {};
Object.defineProperty(module.exports, "__esModule", {
  value: true
});

var Util =
/** @class */
function () {
  function Util() {}

  Util.clone = function ($target, config) {
    var recurse = true; // set true so childList we'll always check the first level

    return function copy($target) {
      var elestruct = {
        /** @type {Node} */
        node: $target,
        charData: null,
        attr: null,
        kids: null
      }; // Store current character data of target text or comment node if the config requests
      // those properties to be observed.

      if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
        elestruct.charData = $target.nodeValue;
      } else {
        // Add attr only if subtree is specified or top level and avoid if
        // attributes is a document object (#13).
        if (config.attr && recurse && $target.nodeType === 1) {
          /**
           * clone live attribute list to an object structure {name: val}
           * @type {Object.<string, string>}
           */
          elestruct.attr = Util.reduce($target.attributes, function (memo, attr) {
            if (!config.afilter || config.afilter[attr.name]) {
              memo[attr.name] = attr.value;
            }

            return memo;
          }, {});
        } // whether we should iterate the children of $target node


        if (recurse && (config.kids || config.charData || config.attr && config.descendents)) {
          /** @type {Array.<!Object>} : Array of custom clone */
          elestruct.kids = Util.map($target.childNodes, copy);
        }

        recurse = config.descendents;
      }

      return elestruct;
    }($target);
  };
  /**
   * indexOf an element in a collection of custom nodes
   *
   * @param {NodeList} set
   * @param {!Object} $node : A custom cloned nodeg333
   * @param {number} idx : index to start the loop
   * @return {number}
   */


  Util.indexOfCustomNode = function (set, $node, idx) {
    var JSCompiler_renameProperty = function (a) {
      return a;
    };

    return this.indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
  };
  /**
   * Attempt to uniquely id an element for hashing. We could optimize this for legacy browsers but it hopefully wont be called enough to be a concern
   *
   * @param {Node} $ele
   * @return {(string|number)}
   */


  Util.getElementId = function ($ele) {
    try {
      return $ele.id || ($ele[this.expando] = $ele[this.expando] || this.counter++);
    } catch (e) {
      // ie <8 will throw if you set an unknown property on a text node
      try {
        return $ele.nodeValue; // naive
      } catch (shitie) {
        // when text node is removed: https://gist.github.com/megawac/8355978 :(
        return this.counter++;
      }
    }
  };
  /**
   * **map** Apply a mapping function to each item of a set
   * @param {Array|NodeList} set
   * @param {Function} iterator
   */


  Util.map = function (set, iterator) {
    var results = [];

    for (var index = 0; index < set.length; index++) {
      results[index] = iterator(set[index], index, set);
    }

    return results;
  };
  /**
   * **Reduce** builds up a single result from a list of values
   * @param {Array|NodeList|NamedNodeMap} set
   * @param {Function} iterator
   * @param {*} [memo] Initial value of the memo.
   */


  Util.reduce = function (set, iterator, memo) {
    for (var index = 0; index < set.length; index++) {
      memo = iterator(memo, set[index], index, set);
    }

    return memo;
  };
  /**
   * **indexOf** find index of item in collection.
   * @param {Array|NodeList} set
   * @param {Object} item
   * @param {number} idx
   * @param {string} [prop] Property on set item to compare to item
   */


  Util.indexOf = function (set, item, idx, prop) {
    for (;
    /*idx = ~~idx*/
    idx < set.length; idx++) {
      // start idx is always given as this is internal
      if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
    }

    return -1;
  };
  /**
   * @param {Object} obj
   * @param {(string|number)} prop
   * @return {boolean}
   */


  Util.has = function (obj, prop) {
    return obj[prop] !== undefined; // will be nicely inlined by gcc
  };

  Util.counter = 1;
  Util.expando = "mo_id";
  return Util;
}();

module.exports.Util = Util;

var MutationObserver =
/** @class */
function () {
  function MutationObserver(listener) {
    var _this = this;

    this._watched = [];
    this._listener = null;
    this._period = 30;
    this._timeout = null;
    this._disposed = false;
    this._notifyListener = null;
    this._watched = [];
    this._listener = listener;
    this._period = 30;

    this._notifyListener = function () {
      _this.scheduleMutationCheck(_this);
    };
  }

  MutationObserver.prototype.observe = function ($target, config) {
    var settings = {
      attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),
      // some browsers enforce that subtree must be set with childList, attributes or characterData.
      // We don't care as spec doesn't specify this rule.
      kids: !!config.childList,
      descendents: !!config.subtree,
      charData: !!(config.characterData || config.characterDataOldValue),
      afilter: null
    };
    MutationNotifier.getInstance().on("changed", this._notifyListener);
    var watched = this._watched; // remove already observed target element from pool

    for (var i = 0; i < watched.length; i++) {
      if (watched[i].tar === $target) watched.splice(i, 1);
    }

    if (config.attributeFilter) {
      /**
       * converts to a {key: true} dict for faster lookup
       * @type {Object.<String,Boolean>}
       */
      settings.afilter = Util.reduce(config.attributeFilter, function (a, b) {
        a[b] = true;
        return a;
      }, {});
    }

    watched.push({
      tar: $target,
      fn: this.createMutationSearcher($target, settings)
    });
  };

  MutationObserver.prototype.takeRecords = function () {
    var mutations = [];
    var watched = this._watched;

    for (var i = 0; i < watched.length; i++) {
      watched[i].fn(mutations);
    }

    return mutations;
  };

  MutationObserver.prototype.disconnect = function () {
    this._watched = []; // clear the stuff being observed

    MutationNotifier.getInstance().removeListener("changed", this._notifyListener);
    this._disposed = true;
    clearTimeout(this._timeout); // ready for garbage collection

    this._timeout = null;
  };

  MutationObserver.prototype.createMutationSearcher = function ($target, config) {
    var _this = this;
    /** type {Elestuct} */


    var $oldstate = Util.clone($target, config); // create the cloned datastructure

    /**
     * consumes array of mutations we can push to
     *
     * @param {Array.<MutationRecord>} mutations
     */

    return function (mutations) {
      var olen = mutations.length;
      var dirty;

      if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
        mutations.push(new MutationRecord({
          type: "characterData",
          target: $target,
          oldValue: $oldstate.charData
        }));
      } // Alright we check base level changes in attributes... easy


      if (config.attr && $oldstate.attr) {
        _this.findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
      } // check childlist or subtree for mutations


      if (config.kids || config.descendents) {
        dirty = _this.searchSubtree(mutations, $target, $oldstate, config);
      } // reclone data structure if theres changes


      if (dirty || mutations.length !== olen) {
        /** type {Elestuct} */
        $oldstate = Util.clone($target, config);
      }
    };
  };

  MutationObserver.prototype.scheduleMutationCheck = function (observer) {
    var _this = this; // Only schedule if there isn't already a timer.


    if (!observer._timeout) {
      observer._timeout = setTimeout(function () {
        return _this.mutationChecker(observer);
      }, this._period);
    }
  };

  MutationObserver.prototype.mutationChecker = function (observer) {
    // allow scheduling a new timer.
    observer._timeout = null;
    var mutations = observer.takeRecords();

    if (mutations.length) {
      // fire away
      // calling the listener with context is not spec but currently consistent with FF and WebKit
      observer._listener(mutations, observer);
    }
  };

  MutationObserver.prototype.searchSubtree = function (mutations, $target, $oldstate, config) {
    var _this = this; // Track if the tree is dirty and has to be recomputed (#14).


    var dirty;
    /*
     * Helper to identify node rearrangment and stuff...
     * There is no gaurentee that the same node will be identified for both added and removed nodes
     * if the positions have been shuffled.
     * conflicts array will be emptied by end of operation
     */

    var _resolveConflicts = function (conflicts, node, $kids, $oldkids, numAddedNodes) {
      // the distance between the first conflicting node and the last
      var distance = conflicts.length - 1; // prevents same conflict being resolved twice consider when two nodes switch places.
      // only one should be given a mutation event (note -~ is used as a math.ceil shorthand)

      var counter = -~((distance - numAddedNodes) / 2);
      var $cur;
      var oldstruct;
      var conflict;

      while (conflict = conflicts.pop()) {
        $cur = $kids[conflict.i];
        oldstruct = $oldkids[conflict.j]; // attempt to determine if there was node rearrangement... won't gaurentee all matches
        // also handles case where added/removed nodes cause nodes to be identified as conflicts

        if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
          mutations.push(new MutationRecord({
            type: "childList",
            target: node,
            addedNodes: [$cur],
            removedNodes: [$cur],
            // haha don't rely on this please
            nextSibling: $cur.nextSibling,
            previousSibling: $cur.previousSibling
          }));
          counter--; // found conflict
        } // Alright we found the resorted nodes now check for other types of mutations


        if (config.attr && oldstruct.attr) _this.findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);

        if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
          mutations.push(new MutationRecord({
            type: "characterData",
            target: $cur,
            oldValue: oldstruct.charData
          }));
        } // now look @ subtree


        if (config.descendents) _findMutations($cur, oldstruct);
      }
    };
    /**
     * Main worker. Finds and adds mutations if there are any
     * @param {Node} node
     * @param {!Object} old : A cloned data structure using internal clone
     */


    var _findMutations = function (node, old) {
      var $kids = node.childNodes;
      var $oldkids = old.kids;
      var klen = $kids.length; // $oldkids will be undefined for text and comment nodes

      var olen = $oldkids ? $oldkids.length : 0; // if (!olen && !klen) return; // both empty; clearly no changes
      // we delay the intialization of these for marginal performance in the expected case (actually quite signficant on large subtrees when these would be otherwise unused)
      // map of checked element of ids to prevent registering the same conflict twice

      var map; // array of potential conflicts (ie nodes that may have been re arranged)

      var conflicts;
      var id; // element id from getElementId helper

      var idx; // index of a moved or inserted element

      var oldstruct; // current and old nodes

      var $cur;
      var $old; // track the number of added nodes so we can resolve conflicts more accurately

      var numAddedNodes = 0; // iterate over both old and current child nodes at the same time

      var i = 0;
      var j = 0; // while there is still anything left in $kids or $oldkids (same as i < $kids.length || j < $oldkids.length;)

      while (i < klen || j < olen) {
        // current and old nodes at the indexs
        $cur = $kids[i];
        oldstruct = $oldkids[j];
        $old = oldstruct && oldstruct.node;

        if ($cur === $old) {
          // expected case - optimized for this case
          // check attributes as specified by config
          if (config.attr && oldstruct.attr) {
            /* oldstruct.attr instead of textnode check */
            _this.findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
          } // check character data if node is a comment or textNode and it's being observed


          if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
            mutations.push(new MutationRecord({
              type: "characterData",
              target: $cur
            }));
          } // resolve conflicts; it will be undefined if there are no conflicts - otherwise an array


          if (conflicts) _resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes); // recurse on next level of children. Avoids the recursive call when there are no children left to iterate

          if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) _findMutations($cur, oldstruct);
          i++;
          j++;
        } else {
          // (uncommon case) lookahead until they are the same again or the end of children
          dirty = true;

          if (!map) {
            // delayed initalization (big perf benefit)
            map = {};
            conflicts = [];
          }

          if ($cur) {
            // check id is in the location map otherwise do a indexOf search
            if (!map[id = Util.getElementId($cur)]) {
              // to prevent double checking
              // mark id as found
              map[id] = true; // custom indexOf using comparitor checking oldkids[i].node === $cur

              if ((idx = Util.indexOfCustomNode($oldkids, $cur, j)) === -1) {
                if (config.kids) {
                  mutations.push(new MutationRecord({
                    type: "childList",
                    target: node,
                    addedNodes: [$cur],
                    nextSibling: $cur.nextSibling,
                    previousSibling: $cur.previousSibling
                  }));
                  numAddedNodes++;
                }
              } else {
                conflicts.push({
                  i: i,
                  j: idx
                });
              }
            }

            i++;
          }

          if ($old && // special case: the changes may have been resolved: i and j appear congurent so we can continue using the expected case
          $old !== $kids[i]) {
            if (!map[id = Util.getElementId($old)]) {
              map[id] = true;

              if ((idx = Util.indexOf($kids, $old, i)) === -1) {
                if (config.kids) {
                  mutations.push(new MutationRecord({
                    type: "childList",
                    target: old.node,
                    removedNodes: [$old],
                    nextSibling: $oldkids[j + 1],
                    previousSibling: $oldkids[j - 1]
                  }));
                  numAddedNodes--;
                }
              } else {
                conflicts.push({
                  i: idx,
                  j: j
                });
              }
            }

            j++;
          }
        } // end uncommon case

      } // end loop
      // resolve any remaining conflicts


      if (conflicts) _resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
    };

    _findMutations($target, $oldstate);

    return dirty;
  };

  MutationObserver.prototype.findAttributeMutations = function (mutations, $target, $oldstate, filter) {
    var checked = {};
    var attributes = $target.attributes;
    var attr;
    var name;
    var i = attributes.length;

    while (i--) {
      attr = attributes[i];
      name = attr.name;

      if (!filter || Util.has(filter, name)) {
        if (attr.value !== $oldstate[name]) {
          // The pushing is redundant but gzips very nicely
          mutations.push(new MutationRecord({
            type: "attributes",
            target: $target,
            attributeName: name,
            oldValue: $oldstate[name],
            attributeNamespace: attr.namespaceURI // in ie<8 it incorrectly will return undefined

          }));
        }

        checked[name] = true;
      }
    }

    for (name in $oldstate) {
      if (!checked[name]) {
        mutations.push(new MutationRecord({
          target: $target,
          type: "attributes",
          attributeName: name,
          oldValue: $oldstate[name]
        }));
      }
    }
  };

  return MutationObserver;
}();

module.exports.MutationObserver = MutationObserver;

var MutationRecord =
/** @class */
function () {
  function MutationRecord(data) {
    var settings = {
      type: null,
      target: null,
      addedNodes: [],
      removedNodes: [],
      previousSibling: null,
      nextSibling: null,
      attributeName: null,
      attributeNamespace: null,
      oldValue: null
    };

    for (var prop in data) {
      if (Util.has(settings, prop) && data[prop] !== undefined) settings[prop] = data[prop];
    }

    return settings;
  }

  return MutationRecord;
}();

module.exports.MutationRecord = MutationRecord;

var MutationNotifier =
/** @class */
function (_super) {
  __extends(MutationNotifier, _super);

  function MutationNotifier() {
    var _this = _super.call(this) || this;

    _this.setMaxListeners(100);

    return _this;
  }

  MutationNotifier.getInstance = function () {
    if (!MutationNotifier._instance) {
      MutationNotifier._instance = new MutationNotifier();
    }

    return MutationNotifier._instance;
  };

  MutationNotifier.prototype.destruct = function () {
    this.removeAllListeners("changed");
  };

  MutationNotifier.prototype.notifyChanged = function (node) {
    this.emit("changed", node);
  };

  MutationNotifier._instance = null;
  return MutationNotifier;
}(_events.EventEmitter);

module.exports.MutationNotifier = MutationNotifier;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11dGF0aW9uT2JzZXJ2ZXIuanMiXSwibmFtZXMiOlsiX19leHRlbmRzIiwiZXh0ZW5kU3RhdGljcyIsIk9iamVjdCIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiQXJyYXkiLCJkIiwiYiIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIlV0aWwiLCJjbG9uZSIsIiR0YXJnZXQiLCJjb25maWciLCJyZWN1cnNlIiwiY29weSIsImVsZXN0cnVjdCIsIm5vZGUiLCJjaGFyRGF0YSIsImF0dHIiLCJraWRzIiwibm9kZVR5cGUiLCJub2RlVmFsdWUiLCJyZWR1Y2UiLCJhdHRyaWJ1dGVzIiwibWVtbyIsImFmaWx0ZXIiLCJuYW1lIiwiZGVzY2VuZGVudHMiLCJtYXAiLCJjaGlsZE5vZGVzIiwiaW5kZXhPZkN1c3RvbU5vZGUiLCJzZXQiLCIkbm9kZSIsImlkeCIsIkpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkiLCJhIiwiaW5kZXhPZiIsImdldEVsZW1lbnRJZCIsIiRlbGUiLCJpZCIsImV4cGFuZG8iLCJjb3VudGVyIiwiZSIsInNoaXRpZSIsIml0ZXJhdG9yIiwicmVzdWx0cyIsImluZGV4IiwibGVuZ3RoIiwiaXRlbSIsInByb3AiLCJoYXMiLCJvYmoiLCJ1bmRlZmluZWQiLCJNdXRhdGlvbk9ic2VydmVyIiwibGlzdGVuZXIiLCJfdGhpcyIsIl93YXRjaGVkIiwiX2xpc3RlbmVyIiwiX3BlcmlvZCIsIl90aW1lb3V0IiwiX2Rpc3Bvc2VkIiwiX25vdGlmeUxpc3RlbmVyIiwic2NoZWR1bGVNdXRhdGlvbkNoZWNrIiwib2JzZXJ2ZSIsInNldHRpbmdzIiwiYXR0cmlidXRlRmlsdGVyIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiY2hhcmFjdGVyRGF0YSIsImNoYXJhY3RlckRhdGFPbGRWYWx1ZSIsIk11dGF0aW9uTm90aWZpZXIiLCJnZXRJbnN0YW5jZSIsIm9uIiwid2F0Y2hlZCIsImkiLCJ0YXIiLCJzcGxpY2UiLCJwdXNoIiwiZm4iLCJjcmVhdGVNdXRhdGlvblNlYXJjaGVyIiwidGFrZVJlY29yZHMiLCJtdXRhdGlvbnMiLCJkaXNjb25uZWN0IiwicmVtb3ZlTGlzdGVuZXIiLCJjbGVhclRpbWVvdXQiLCIkb2xkc3RhdGUiLCJvbGVuIiwiZGlydHkiLCJNdXRhdGlvblJlY29yZCIsInR5cGUiLCJ0YXJnZXQiLCJvbGRWYWx1ZSIsImZpbmRBdHRyaWJ1dGVNdXRhdGlvbnMiLCJzZWFyY2hTdWJ0cmVlIiwib2JzZXJ2ZXIiLCJzZXRUaW1lb3V0IiwibXV0YXRpb25DaGVja2VyIiwiX3Jlc29sdmVDb25mbGljdHMiLCJjb25mbGljdHMiLCIka2lkcyIsIiRvbGRraWRzIiwibnVtQWRkZWROb2RlcyIsImRpc3RhbmNlIiwiJGN1ciIsIm9sZHN0cnVjdCIsImNvbmZsaWN0IiwicG9wIiwiaiIsIk1hdGgiLCJhYnMiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwibmV4dFNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJfZmluZE11dGF0aW9ucyIsIm9sZCIsImtsZW4iLCIkb2xkIiwiZmlsdGVyIiwiY2hlY2tlZCIsImF0dHJpYnV0ZU5hbWUiLCJhdHRyaWJ1dGVOYW1lc3BhY2UiLCJuYW1lc3BhY2VVUkkiLCJkYXRhIiwiX3N1cGVyIiwiY2FsbCIsInNldE1heExpc3RlbmVycyIsIl9pbnN0YW5jZSIsImRlc3RydWN0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwibm90aWZ5Q2hhbmdlZCIsImVtaXQiLCJFdmVudEVtaXR0ZXIiXSwibWFwcGluZ3MiOiI7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxTQUFTLEdBQ1YsVUFBUSxTQUFLQSxTQUFkLElBQ0MsWUFBVztBQUNW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ZSxVQUFTc0QsTUFBVCxFQUFpQjtBQUNyRHRJLEVBQUFBLFNBQVMsQ0FBQ2dGLGdCQUFELEVBQW1Cc0QsTUFBbkIsQ0FBVDs7QUFDQSxXQUFTdEQsZ0JBQVQsR0FBNEI7QUFDMUIsUUFBSWhCLEtBQUssR0FBR3NFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLElBQVosS0FBcUIsSUFBakM7O0FBQ0F2RSxJQUFBQSxLQUFLLENBQUN3RSxlQUFOLENBQXNCLEdBQXRCOztBQUNBLFdBQU94RSxLQUFQO0FBQ0Q7O0FBQ0RnQixFQUFBQSxnQkFBZ0IsQ0FBQ0MsV0FBakIsR0FBK0IsWUFBVztBQUN4QyxRQUFJLENBQUNELGdCQUFnQixDQUFDeUQsU0FBdEIsRUFBaUM7QUFDL0J6RCxNQUFBQSxnQkFBZ0IsQ0FBQ3lELFNBQWpCLEdBQTZCLElBQUl6RCxnQkFBSixFQUE3QjtBQUNEOztBQUNELFdBQU9BLGdCQUFnQixDQUFDeUQsU0FBeEI7QUFDRCxHQUxEOztBQU1BekQsRUFBQUEsZ0JBQWdCLENBQUNwRSxTQUFqQixDQUEyQjhILFFBQTNCLEdBQXNDLFlBQVc7QUFDL0MsU0FBS0Msa0JBQUwsQ0FBd0IsU0FBeEI7QUFDRCxHQUZEOztBQUdBM0QsRUFBQUEsZ0JBQWdCLENBQUNwRSxTQUFqQixDQUEyQmdJLGFBQTNCLEdBQTJDLFVBQVNuSCxJQUFULEVBQWU7QUFDeEQsU0FBS29ILElBQUwsQ0FBVSxTQUFWLEVBQXFCcEgsSUFBckI7QUFDRCxHQUZEOztBQUdBdUQsRUFBQUEsZ0JBQWdCLENBQUN5RCxTQUFqQixHQUE2QixJQUE3QjtBQUNBLFNBQU96RCxnQkFBUDtBQUNELENBckJvQyxDQXFCbEM4RCxvQkFyQmtDLENBQXJDOztBQXNCQWhJLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlaUUsZ0JBQWYsR0FBa0NBLGdCQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIHRyYW5zcGlsZWQgdHlwZXNjcmlwdC0+amF2YXNjcmlwdCBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYXVyZWxpYS9wYWwtbm9kZWpzL2Jsb2IvbWFzdGVyL3NyYy9wb2x5ZmlsbHMvbXV0YXRpb24tb2JzZXJ2ZXIudHNcblxuLypcbiAqIEJhc2VkIG9uIFNoaW0gZm9yIE11dGF0aW9uT2JzZXJ2ZXIgaW50ZXJmYWNlXG4gKiBBdXRob3I6IEdyYWVtZSBZZWF0ZXMgKGdpdGh1Yi5jb20vbWVnYXdhYylcbiAqIFJlcG9zaXRvcnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9tZWdhd2FjL011dGF0aW9uT2JzZXJ2ZXIuanNcbiAqL1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG52YXIgX19leHRlbmRzID1cbiAgKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8XG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgICAgIGZ1bmN0aW9uKGQsIGIpIHtcbiAgICAgICAgICBkLl9fcHJvdG9fXyA9IGI7XG4gICAgICAgIH0pIHx8XG4gICAgICBmdW5jdGlvbihkLCBiKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24oZCwgYikge1xuICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgIGZ1bmN0aW9uIF9fKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgICAgIH1cbiAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlKSwgbmV3IF9fKCkpO1xuICAgIH07XG4gIH0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBVdGlsKCkge31cbiAgVXRpbC5jbG9uZSA9IGZ1bmN0aW9uKCR0YXJnZXQsIGNvbmZpZykge1xuICAgIHZhciByZWN1cnNlID0gdHJ1ZTsgLy8gc2V0IHRydWUgc28gY2hpbGRMaXN0IHdlJ2xsIGFsd2F5cyBjaGVjayB0aGUgZmlyc3QgbGV2ZWxcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGNvcHkoJHRhcmdldCkge1xuICAgICAgdmFyIGVsZXN0cnVjdCA9IHtcbiAgICAgICAgLyoqIEB0eXBlIHtOb2RlfSAqL1xuICAgICAgICBub2RlOiAkdGFyZ2V0LFxuICAgICAgICBjaGFyRGF0YTogbnVsbCxcbiAgICAgICAgYXR0cjogbnVsbCxcbiAgICAgICAga2lkczogbnVsbCxcbiAgICAgIH07XG4gICAgICAvLyBTdG9yZSBjdXJyZW50IGNoYXJhY3RlciBkYXRhIG9mIHRhcmdldCB0ZXh0IG9yIGNvbW1lbnQgbm9kZSBpZiB0aGUgY29uZmlnIHJlcXVlc3RzXG4gICAgICAvLyB0aG9zZSBwcm9wZXJ0aWVzIHRvIGJlIG9ic2VydmVkLlxuICAgICAgaWYgKGNvbmZpZy5jaGFyRGF0YSAmJiAoJHRhcmdldC5ub2RlVHlwZSA9PT0gMyB8fCAkdGFyZ2V0Lm5vZGVUeXBlID09PSA4KSkge1xuICAgICAgICBlbGVzdHJ1Y3QuY2hhckRhdGEgPSAkdGFyZ2V0Lm5vZGVWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFkZCBhdHRyIG9ubHkgaWYgc3VidHJlZSBpcyBzcGVjaWZpZWQgb3IgdG9wIGxldmVsIGFuZCBhdm9pZCBpZlxuICAgICAgICAvLyBhdHRyaWJ1dGVzIGlzIGEgZG9jdW1lbnQgb2JqZWN0ICgjMTMpLlxuICAgICAgICBpZiAoY29uZmlnLmF0dHIgJiYgcmVjdXJzZSAmJiAkdGFyZ2V0Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogY2xvbmUgbGl2ZSBhdHRyaWJ1dGUgbGlzdCB0byBhbiBvYmplY3Qgc3RydWN0dXJlIHtuYW1lOiB2YWx9XG4gICAgICAgICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCBzdHJpbmc+fVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGVsZXN0cnVjdC5hdHRyID0gVXRpbC5yZWR1Y2UoXG4gICAgICAgICAgICAkdGFyZ2V0LmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBmdW5jdGlvbihtZW1vLCBhdHRyKSB7XG4gICAgICAgICAgICAgIGlmICghY29uZmlnLmFmaWx0ZXIgfHwgY29uZmlnLmFmaWx0ZXJbYXR0ci5uYW1lXSkge1xuICAgICAgICAgICAgICAgIG1lbW9bYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdoZXRoZXIgd2Ugc2hvdWxkIGl0ZXJhdGUgdGhlIGNoaWxkcmVuIG9mICR0YXJnZXQgbm9kZVxuICAgICAgICBpZiAocmVjdXJzZSAmJiAoY29uZmlnLmtpZHMgfHwgY29uZmlnLmNoYXJEYXRhIHx8IChjb25maWcuYXR0ciAmJiBjb25maWcuZGVzY2VuZGVudHMpKSkge1xuICAgICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPCFPYmplY3Q+fSA6IEFycmF5IG9mIGN1c3RvbSBjbG9uZSAqL1xuICAgICAgICAgIGVsZXN0cnVjdC5raWRzID0gVXRpbC5tYXAoJHRhcmdldC5jaGlsZE5vZGVzLCBjb3B5KTtcbiAgICAgICAgfVxuICAgICAgICByZWN1cnNlID0gY29uZmlnLmRlc2NlbmRlbnRzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZXN0cnVjdDtcbiAgICB9KSgkdGFyZ2V0KTtcbiAgfTtcbiAgLyoqXG4gICAqIGluZGV4T2YgYW4gZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24gb2YgY3VzdG9tIG5vZGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZUxpc3R9IHNldFxuICAgKiBAcGFyYW0geyFPYmplY3R9ICRub2RlIDogQSBjdXN0b20gY2xvbmVkIG5vZGVnMzMzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZHggOiBpbmRleCB0byBzdGFydCB0aGUgbG9vcFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBVdGlsLmluZGV4T2ZDdXN0b21Ob2RlID0gZnVuY3Rpb24oc2V0LCAkbm9kZSwgaWR4KSB7XG4gICAgdmFyIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkgPSBmdW5jdGlvbihhKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2V0LCAkbm9kZSwgaWR4LCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KFwibm9kZVwiKSk7XG4gIH07XG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIHVuaXF1ZWx5IGlkIGFuIGVsZW1lbnQgZm9yIGhhc2hpbmcuIFdlIGNvdWxkIG9wdGltaXplIHRoaXMgZm9yIGxlZ2FjeSBicm93c2VycyBidXQgaXQgaG9wZWZ1bGx5IHdvbnQgYmUgY2FsbGVkIGVub3VnaCB0byBiZSBhIGNvbmNlcm5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfSAkZWxlXG4gICAqIEByZXR1cm4geyhzdHJpbmd8bnVtYmVyKX1cbiAgICovXG4gIFV0aWwuZ2V0RWxlbWVudElkID0gZnVuY3Rpb24oJGVsZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJGVsZS5pZCB8fCAoJGVsZVt0aGlzLmV4cGFuZG9dID0gJGVsZVt0aGlzLmV4cGFuZG9dIHx8IHRoaXMuY291bnRlcisrKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpZSA8OCB3aWxsIHRocm93IGlmIHlvdSBzZXQgYW4gdW5rbm93biBwcm9wZXJ0eSBvbiBhIHRleHQgbm9kZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICRlbGUubm9kZVZhbHVlOyAvLyBuYWl2ZVxuICAgICAgfSBjYXRjaCAoc2hpdGllKSB7XG4gICAgICAgIC8vIHdoZW4gdGV4dCBub2RlIGlzIHJlbW92ZWQ6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21lZ2F3YWMvODM1NTk3OCA6KFxuICAgICAgICByZXR1cm4gdGhpcy5jb3VudGVyKys7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogKiptYXAqKiBBcHBseSBhIG1hcHBpbmcgZnVuY3Rpb24gdG8gZWFjaCBpdGVtIG9mIGEgc2V0XG4gICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IHNldFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICAgKi9cbiAgVXRpbC5tYXAgPSBmdW5jdGlvbihzZXQsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc2V0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRvcihzZXRbaW5kZXhdLCBpbmRleCwgc2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG4gIC8qKlxuICAgKiAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzXG4gICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R8TmFtZWROb2RlTWFwfSBzZXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAgICogQHBhcmFtIHsqfSBbbWVtb10gSW5pdGlhbCB2YWx1ZSBvZiB0aGUgbWVtby5cbiAgICovXG4gIFV0aWwucmVkdWNlID0gZnVuY3Rpb24oc2V0LCBpdGVyYXRvciwgbWVtbykge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzZXQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBtZW1vID0gaXRlcmF0b3IobWVtbywgc2V0W2luZGV4XSwgaW5kZXgsIHNldCk7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xuICAvKipcbiAgICogKippbmRleE9mKiogZmluZCBpbmRleCBvZiBpdGVtIGluIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IHNldFxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvcF0gUHJvcGVydHkgb24gc2V0IGl0ZW0gdG8gY29tcGFyZSB0byBpdGVtXG4gICAqL1xuICBVdGlsLmluZGV4T2YgPSBmdW5jdGlvbihzZXQsIGl0ZW0sIGlkeCwgcHJvcCkge1xuICAgIGZvciAoOyAvKmlkeCA9IH5+aWR4Ki8gaWR4IDwgc2V0Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIC8vIHN0YXJ0IGlkeCBpcyBhbHdheXMgZ2l2ZW4gYXMgdGhpcyBpcyBpbnRlcm5hbFxuICAgICAgaWYgKChwcm9wID8gc2V0W2lkeF1bcHJvcF0gOiBzZXRbaWR4XSkgPT09IGl0ZW0pIHJldHVybiBpZHg7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcil9IHByb3BcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIFV0aWwuaGFzID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7XG4gICAgcmV0dXJuIG9ialtwcm9wXSAhPT0gdW5kZWZpbmVkOyAvLyB3aWxsIGJlIG5pY2VseSBpbmxpbmVkIGJ5IGdjY1xuICB9O1xuICBVdGlsLmNvdW50ZXIgPSAxO1xuICBVdGlsLmV4cGFuZG8gPSBcIm1vX2lkXCI7XG4gIHJldHVybiBVdGlsO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLlV0aWwgPSBVdGlsO1xudmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gTXV0YXRpb25PYnNlcnZlcihsaXN0ZW5lcikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fd2F0Y2hlZCA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyID0gbnVsbDtcbiAgICB0aGlzLl9wZXJpb2QgPSAzMDtcbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLl9kaXNwb3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuX25vdGlmeUxpc3RlbmVyID0gbnVsbDtcbiAgICB0aGlzLl93YXRjaGVkID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB0aGlzLl9wZXJpb2QgPSAzMDtcbiAgICB0aGlzLl9ub3RpZnlMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuc2NoZWR1bGVNdXRhdGlvbkNoZWNrKF90aGlzKTtcbiAgICB9O1xuICB9XG4gIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbigkdGFyZ2V0LCBjb25maWcpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICBhdHRyOiAhIShjb25maWcuYXR0cmlidXRlcyB8fCBjb25maWcuYXR0cmlidXRlRmlsdGVyIHx8IGNvbmZpZy5hdHRyaWJ1dGVPbGRWYWx1ZSksXG4gICAgICAvLyBzb21lIGJyb3dzZXJzIGVuZm9yY2UgdGhhdCBzdWJ0cmVlIG11c3QgYmUgc2V0IHdpdGggY2hpbGRMaXN0LCBhdHRyaWJ1dGVzIG9yIGNoYXJhY3RlckRhdGEuXG4gICAgICAvLyBXZSBkb24ndCBjYXJlIGFzIHNwZWMgZG9lc24ndCBzcGVjaWZ5IHRoaXMgcnVsZS5cbiAgICAgIGtpZHM6ICEhY29uZmlnLmNoaWxkTGlzdCxcbiAgICAgIGRlc2NlbmRlbnRzOiAhIWNvbmZpZy5zdWJ0cmVlLFxuICAgICAgY2hhckRhdGE6ICEhKGNvbmZpZy5jaGFyYWN0ZXJEYXRhIHx8IGNvbmZpZy5jaGFyYWN0ZXJEYXRhT2xkVmFsdWUpLFxuICAgICAgYWZpbHRlcjogbnVsbCxcbiAgICB9O1xuICAgIE11dGF0aW9uTm90aWZpZXIuZ2V0SW5zdGFuY2UoKS5vbihcImNoYW5nZWRcIiwgdGhpcy5fbm90aWZ5TGlzdGVuZXIpO1xuICAgIHZhciB3YXRjaGVkID0gdGhpcy5fd2F0Y2hlZDtcbiAgICAvLyByZW1vdmUgYWxyZWFkeSBvYnNlcnZlZCB0YXJnZXQgZWxlbWVudCBmcm9tIHBvb2xcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdhdGNoZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh3YXRjaGVkW2ldLnRhciA9PT0gJHRhcmdldCkgd2F0Y2hlZC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICAgIGlmIChjb25maWcuYXR0cmlidXRlRmlsdGVyKSB7XG4gICAgICAvKipcbiAgICAgICAqIGNvbnZlcnRzIHRvIGEge2tleTogdHJ1ZX0gZGljdCBmb3IgZmFzdGVyIGxvb2t1cFxuICAgICAgICogQHR5cGUge09iamVjdC48U3RyaW5nLEJvb2xlYW4+fVxuICAgICAgICovXG4gICAgICBzZXR0aW5ncy5hZmlsdGVyID0gVXRpbC5yZWR1Y2UoXG4gICAgICAgIGNvbmZpZy5hdHRyaWJ1dGVGaWx0ZXIsXG4gICAgICAgIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICBhW2JdID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSxcbiAgICAgICAge31cbiAgICAgICk7XG4gICAgfVxuICAgIHdhdGNoZWQucHVzaCh7XG4gICAgICB0YXI6ICR0YXJnZXQsXG4gICAgICBmbjogdGhpcy5jcmVhdGVNdXRhdGlvblNlYXJjaGVyKCR0YXJnZXQsIHNldHRpbmdzKSxcbiAgICB9KTtcbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUudGFrZVJlY29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbXV0YXRpb25zID0gW107XG4gICAgdmFyIHdhdGNoZWQgPSB0aGlzLl93YXRjaGVkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2F0Y2hlZC5sZW5ndGg7IGkrKykge1xuICAgICAgd2F0Y2hlZFtpXS5mbihtdXRhdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gbXV0YXRpb25zO1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fd2F0Y2hlZCA9IFtdOyAvLyBjbGVhciB0aGUgc3R1ZmYgYmVpbmcgb2JzZXJ2ZWRcbiAgICBNdXRhdGlvbk5vdGlmaWVyLmdldEluc3RhbmNlKCkucmVtb3ZlTGlzdGVuZXIoXCJjaGFuZ2VkXCIsIHRoaXMuX25vdGlmeUxpc3RlbmVyKTtcbiAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpOyAvLyByZWFkeSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gIH07XG4gIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLmNyZWF0ZU11dGF0aW9uU2VhcmNoZXIgPSBmdW5jdGlvbigkdGFyZ2V0LCBjb25maWcpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiB0eXBlIHtFbGVzdHVjdH0gKi9cbiAgICB2YXIgJG9sZHN0YXRlID0gVXRpbC5jbG9uZSgkdGFyZ2V0LCBjb25maWcpOyAvLyBjcmVhdGUgdGhlIGNsb25lZCBkYXRhc3RydWN0dXJlXG4gICAgLyoqXG4gICAgICogY29uc3VtZXMgYXJyYXkgb2YgbXV0YXRpb25zIHdlIGNhbiBwdXNoIHRvXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxNdXRhdGlvblJlY29yZD59IG11dGF0aW9uc1xuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgIHZhciBvbGVuID0gbXV0YXRpb25zLmxlbmd0aDtcbiAgICAgIHZhciBkaXJ0eTtcbiAgICAgIGlmIChjb25maWcuY2hhckRhdGEgJiYgJHRhcmdldC5ub2RlVHlwZSA9PT0gMyAmJiAkdGFyZ2V0Lm5vZGVWYWx1ZSAhPT0gJG9sZHN0YXRlLmNoYXJEYXRhKSB7XG4gICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICB0eXBlOiBcImNoYXJhY3RlckRhdGFcIixcbiAgICAgICAgICAgIHRhcmdldDogJHRhcmdldCxcbiAgICAgICAgICAgIG9sZFZhbHVlOiAkb2xkc3RhdGUuY2hhckRhdGEsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIEFscmlnaHQgd2UgY2hlY2sgYmFzZSBsZXZlbCBjaGFuZ2VzIGluIGF0dHJpYnV0ZXMuLi4gZWFzeVxuICAgICAgaWYgKGNvbmZpZy5hdHRyICYmICRvbGRzdGF0ZS5hdHRyKSB7XG4gICAgICAgIF90aGlzLmZpbmRBdHRyaWJ1dGVNdXRhdGlvbnMobXV0YXRpb25zLCAkdGFyZ2V0LCAkb2xkc3RhdGUuYXR0ciwgY29uZmlnLmFmaWx0ZXIpO1xuICAgICAgfVxuICAgICAgLy8gY2hlY2sgY2hpbGRsaXN0IG9yIHN1YnRyZWUgZm9yIG11dGF0aW9uc1xuICAgICAgaWYgKGNvbmZpZy5raWRzIHx8IGNvbmZpZy5kZXNjZW5kZW50cykge1xuICAgICAgICBkaXJ0eSA9IF90aGlzLnNlYXJjaFN1YnRyZWUobXV0YXRpb25zLCAkdGFyZ2V0LCAkb2xkc3RhdGUsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgICAvLyByZWNsb25lIGRhdGEgc3RydWN0dXJlIGlmIHRoZXJlcyBjaGFuZ2VzXG4gICAgICBpZiAoZGlydHkgfHwgbXV0YXRpb25zLmxlbmd0aCAhPT0gb2xlbikge1xuICAgICAgICAvKiogdHlwZSB7RWxlc3R1Y3R9ICovXG4gICAgICAgICRvbGRzdGF0ZSA9IFV0aWwuY2xvbmUoJHRhcmdldCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5zY2hlZHVsZU11dGF0aW9uQ2hlY2sgPSBmdW5jdGlvbihvYnNlcnZlcikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy8gT25seSBzY2hlZHVsZSBpZiB0aGVyZSBpc24ndCBhbHJlYWR5IGEgdGltZXIuXG4gICAgaWYgKCFvYnNlcnZlci5fdGltZW91dCkge1xuICAgICAgb2JzZXJ2ZXIuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMubXV0YXRpb25DaGVja2VyKG9ic2VydmVyKTtcbiAgICAgIH0sIHRoaXMuX3BlcmlvZCk7XG4gICAgfVxuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5tdXRhdGlvbkNoZWNrZXIgPSBmdW5jdGlvbihvYnNlcnZlcikge1xuICAgIC8vIGFsbG93IHNjaGVkdWxpbmcgYSBuZXcgdGltZXIuXG4gICAgb2JzZXJ2ZXIuX3RpbWVvdXQgPSBudWxsO1xuICAgIHZhciBtdXRhdGlvbnMgPSBvYnNlcnZlci50YWtlUmVjb3JkcygpO1xuICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAvLyBmaXJlIGF3YXlcbiAgICAgIC8vIGNhbGxpbmcgdGhlIGxpc3RlbmVyIHdpdGggY29udGV4dCBpcyBub3Qgc3BlYyBidXQgY3VycmVudGx5IGNvbnNpc3RlbnQgd2l0aCBGRiBhbmQgV2ViS2l0XG4gICAgICBvYnNlcnZlci5fbGlzdGVuZXIobXV0YXRpb25zLCBvYnNlcnZlcik7XG4gICAgfVxuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5zZWFyY2hTdWJ0cmVlID0gZnVuY3Rpb24obXV0YXRpb25zLCAkdGFyZ2V0LCAkb2xkc3RhdGUsIGNvbmZpZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy8gVHJhY2sgaWYgdGhlIHRyZWUgaXMgZGlydHkgYW5kIGhhcyB0byBiZSByZWNvbXB1dGVkICgjMTQpLlxuICAgIHZhciBkaXJ0eTtcbiAgICAvKlxuICAgICAqIEhlbHBlciB0byBpZGVudGlmeSBub2RlIHJlYXJyYW5nbWVudCBhbmQgc3R1ZmYuLi5cbiAgICAgKiBUaGVyZSBpcyBubyBnYXVyZW50ZWUgdGhhdCB0aGUgc2FtZSBub2RlIHdpbGwgYmUgaWRlbnRpZmllZCBmb3IgYm90aCBhZGRlZCBhbmQgcmVtb3ZlZCBub2Rlc1xuICAgICAqIGlmIHRoZSBwb3NpdGlvbnMgaGF2ZSBiZWVuIHNodWZmbGVkLlxuICAgICAqIGNvbmZsaWN0cyBhcnJheSB3aWxsIGJlIGVtcHRpZWQgYnkgZW5kIG9mIG9wZXJhdGlvblxuICAgICAqL1xuICAgIHZhciBfcmVzb2x2ZUNvbmZsaWN0cyA9IGZ1bmN0aW9uKGNvbmZsaWN0cywgbm9kZSwgJGtpZHMsICRvbGRraWRzLCBudW1BZGRlZE5vZGVzKSB7XG4gICAgICAvLyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZmlyc3QgY29uZmxpY3Rpbmcgbm9kZSBhbmQgdGhlIGxhc3RcbiAgICAgIHZhciBkaXN0YW5jZSA9IGNvbmZsaWN0cy5sZW5ndGggLSAxO1xuICAgICAgLy8gcHJldmVudHMgc2FtZSBjb25mbGljdCBiZWluZyByZXNvbHZlZCB0d2ljZSBjb25zaWRlciB3aGVuIHR3byBub2RlcyBzd2l0Y2ggcGxhY2VzLlxuICAgICAgLy8gb25seSBvbmUgc2hvdWxkIGJlIGdpdmVuIGEgbXV0YXRpb24gZXZlbnQgKG5vdGUgLX4gaXMgdXNlZCBhcyBhIG1hdGguY2VpbCBzaG9ydGhhbmQpXG4gICAgICB2YXIgY291bnRlciA9IC1+KChkaXN0YW5jZSAtIG51bUFkZGVkTm9kZXMpIC8gMik7XG4gICAgICB2YXIgJGN1cjtcbiAgICAgIHZhciBvbGRzdHJ1Y3Q7XG4gICAgICB2YXIgY29uZmxpY3Q7XG4gICAgICB3aGlsZSAoKGNvbmZsaWN0ID0gY29uZmxpY3RzLnBvcCgpKSkge1xuICAgICAgICAkY3VyID0gJGtpZHNbY29uZmxpY3QuaV07XG4gICAgICAgIG9sZHN0cnVjdCA9ICRvbGRraWRzW2NvbmZsaWN0LmpdO1xuICAgICAgICAvLyBhdHRlbXB0IHRvIGRldGVybWluZSBpZiB0aGVyZSB3YXMgbm9kZSByZWFycmFuZ2VtZW50Li4uIHdvbid0IGdhdXJlbnRlZSBhbGwgbWF0Y2hlc1xuICAgICAgICAvLyBhbHNvIGhhbmRsZXMgY2FzZSB3aGVyZSBhZGRlZC9yZW1vdmVkIG5vZGVzIGNhdXNlIG5vZGVzIHRvIGJlIGlkZW50aWZpZWQgYXMgY29uZmxpY3RzXG4gICAgICAgIGlmIChjb25maWcua2lkcyAmJiBjb3VudGVyICYmIE1hdGguYWJzKGNvbmZsaWN0LmkgLSBjb25mbGljdC5qKSA+PSBkaXN0YW5jZSkge1xuICAgICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgdHlwZTogXCJjaGlsZExpc3RcIixcbiAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICBhZGRlZE5vZGVzOiBbJGN1cl0sXG4gICAgICAgICAgICAgIHJlbW92ZWROb2RlczogWyRjdXJdLFxuICAgICAgICAgICAgICAvLyBoYWhhIGRvbid0IHJlbHkgb24gdGhpcyBwbGVhc2VcbiAgICAgICAgICAgICAgbmV4dFNpYmxpbmc6ICRjdXIubmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogJGN1ci5wcmV2aW91c1NpYmxpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgY291bnRlci0tOyAvLyBmb3VuZCBjb25mbGljdFxuICAgICAgICB9XG4gICAgICAgIC8vIEFscmlnaHQgd2UgZm91bmQgdGhlIHJlc29ydGVkIG5vZGVzIG5vdyBjaGVjayBmb3Igb3RoZXIgdHlwZXMgb2YgbXV0YXRpb25zXG4gICAgICAgIGlmIChjb25maWcuYXR0ciAmJiBvbGRzdHJ1Y3QuYXR0cikgX3RoaXMuZmluZEF0dHJpYnV0ZU11dGF0aW9ucyhtdXRhdGlvbnMsICRjdXIsIG9sZHN0cnVjdC5hdHRyLCBjb25maWcuYWZpbHRlcik7XG4gICAgICAgIGlmIChjb25maWcuY2hhckRhdGEgJiYgJGN1ci5ub2RlVHlwZSA9PT0gMyAmJiAkY3VyLm5vZGVWYWx1ZSAhPT0gb2xkc3RydWN0LmNoYXJEYXRhKSB7XG4gICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgICB0eXBlOiBcImNoYXJhY3RlckRhdGFcIixcbiAgICAgICAgICAgICAgdGFyZ2V0OiAkY3VyLFxuICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkc3RydWN0LmNoYXJEYXRhLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdyBsb29rIEAgc3VidHJlZVxuICAgICAgICBpZiAoY29uZmlnLmRlc2NlbmRlbnRzKSBfZmluZE11dGF0aW9ucygkY3VyLCBvbGRzdHJ1Y3QpO1xuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTWFpbiB3b3JrZXIuIEZpbmRzIGFuZCBhZGRzIG11dGF0aW9ucyBpZiB0aGVyZSBhcmUgYW55XG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAgICogQHBhcmFtIHshT2JqZWN0fSBvbGQgOiBBIGNsb25lZCBkYXRhIHN0cnVjdHVyZSB1c2luZyBpbnRlcm5hbCBjbG9uZVxuICAgICAqL1xuICAgIHZhciBfZmluZE11dGF0aW9ucyA9IGZ1bmN0aW9uKG5vZGUsIG9sZCkge1xuICAgICAgdmFyICRraWRzID0gbm9kZS5jaGlsZE5vZGVzO1xuICAgICAgdmFyICRvbGRraWRzID0gb2xkLmtpZHM7XG4gICAgICB2YXIga2xlbiA9ICRraWRzLmxlbmd0aDtcbiAgICAgIC8vICRvbGRraWRzIHdpbGwgYmUgdW5kZWZpbmVkIGZvciB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG4gICAgICB2YXIgb2xlbiA9ICRvbGRraWRzID8gJG9sZGtpZHMubGVuZ3RoIDogMDtcbiAgICAgIC8vIGlmICghb2xlbiAmJiAha2xlbikgcmV0dXJuOyAvLyBib3RoIGVtcHR5OyBjbGVhcmx5IG5vIGNoYW5nZXNcbiAgICAgIC8vIHdlIGRlbGF5IHRoZSBpbnRpYWxpemF0aW9uIG9mIHRoZXNlIGZvciBtYXJnaW5hbCBwZXJmb3JtYW5jZSBpbiB0aGUgZXhwZWN0ZWQgY2FzZSAoYWN0dWFsbHkgcXVpdGUgc2lnbmZpY2FudCBvbiBsYXJnZSBzdWJ0cmVlcyB3aGVuIHRoZXNlIHdvdWxkIGJlIG90aGVyd2lzZSB1bnVzZWQpXG4gICAgICAvLyBtYXAgb2YgY2hlY2tlZCBlbGVtZW50IG9mIGlkcyB0byBwcmV2ZW50IHJlZ2lzdGVyaW5nIHRoZSBzYW1lIGNvbmZsaWN0IHR3aWNlXG4gICAgICB2YXIgbWFwO1xuICAgICAgLy8gYXJyYXkgb2YgcG90ZW50aWFsIGNvbmZsaWN0cyAoaWUgbm9kZXMgdGhhdCBtYXkgaGF2ZSBiZWVuIHJlIGFycmFuZ2VkKVxuICAgICAgdmFyIGNvbmZsaWN0cztcbiAgICAgIHZhciBpZDsgLy8gZWxlbWVudCBpZCBmcm9tIGdldEVsZW1lbnRJZCBoZWxwZXJcbiAgICAgIHZhciBpZHg7IC8vIGluZGV4IG9mIGEgbW92ZWQgb3IgaW5zZXJ0ZWQgZWxlbWVudFxuICAgICAgdmFyIG9sZHN0cnVjdDtcbiAgICAgIC8vIGN1cnJlbnQgYW5kIG9sZCBub2Rlc1xuICAgICAgdmFyICRjdXI7XG4gICAgICB2YXIgJG9sZDtcbiAgICAgIC8vIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkZWQgbm9kZXMgc28gd2UgY2FuIHJlc29sdmUgY29uZmxpY3RzIG1vcmUgYWNjdXJhdGVseVxuICAgICAgdmFyIG51bUFkZGVkTm9kZXMgPSAwO1xuICAgICAgLy8gaXRlcmF0ZSBvdmVyIGJvdGggb2xkIGFuZCBjdXJyZW50IGNoaWxkIG5vZGVzIGF0IHRoZSBzYW1lIHRpbWVcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBqID0gMDtcbiAgICAgIC8vIHdoaWxlIHRoZXJlIGlzIHN0aWxsIGFueXRoaW5nIGxlZnQgaW4gJGtpZHMgb3IgJG9sZGtpZHMgKHNhbWUgYXMgaSA8ICRraWRzLmxlbmd0aCB8fCBqIDwgJG9sZGtpZHMubGVuZ3RoOylcbiAgICAgIHdoaWxlIChpIDwga2xlbiB8fCBqIDwgb2xlbikge1xuICAgICAgICAvLyBjdXJyZW50IGFuZCBvbGQgbm9kZXMgYXQgdGhlIGluZGV4c1xuICAgICAgICAkY3VyID0gJGtpZHNbaV07XG4gICAgICAgIG9sZHN0cnVjdCA9ICRvbGRraWRzW2pdO1xuICAgICAgICAkb2xkID0gb2xkc3RydWN0ICYmIG9sZHN0cnVjdC5ub2RlO1xuICAgICAgICBpZiAoJGN1ciA9PT0gJG9sZCkge1xuICAgICAgICAgIC8vIGV4cGVjdGVkIGNhc2UgLSBvcHRpbWl6ZWQgZm9yIHRoaXMgY2FzZVxuICAgICAgICAgIC8vIGNoZWNrIGF0dHJpYnV0ZXMgYXMgc3BlY2lmaWVkIGJ5IGNvbmZpZ1xuICAgICAgICAgIGlmIChjb25maWcuYXR0ciAmJiBvbGRzdHJ1Y3QuYXR0cikge1xuICAgICAgICAgICAgLyogb2xkc3RydWN0LmF0dHIgaW5zdGVhZCBvZiB0ZXh0bm9kZSBjaGVjayAqL1xuICAgICAgICAgICAgX3RoaXMuZmluZEF0dHJpYnV0ZU11dGF0aW9ucyhtdXRhdGlvbnMsICRjdXIsIG9sZHN0cnVjdC5hdHRyLCBjb25maWcuYWZpbHRlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNoZWNrIGNoYXJhY3RlciBkYXRhIGlmIG5vZGUgaXMgYSBjb21tZW50IG9yIHRleHROb2RlIGFuZCBpdCdzIGJlaW5nIG9ic2VydmVkXG4gICAgICAgICAgaWYgKGNvbmZpZy5jaGFyRGF0YSAmJiBvbGRzdHJ1Y3QuY2hhckRhdGEgIT09IHVuZGVmaW5lZCAmJiAkY3VyLm5vZGVWYWx1ZSAhPT0gb2xkc3RydWN0LmNoYXJEYXRhKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoYXJhY3RlckRhdGFcIixcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICRjdXIsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXNvbHZlIGNvbmZsaWN0czsgaXQgd2lsbCBiZSB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIGNvbmZsaWN0cyAtIG90aGVyd2lzZSBhbiBhcnJheVxuICAgICAgICAgIGlmIChjb25mbGljdHMpIF9yZXNvbHZlQ29uZmxpY3RzKGNvbmZsaWN0cywgbm9kZSwgJGtpZHMsICRvbGRraWRzLCBudW1BZGRlZE5vZGVzKTtcbiAgICAgICAgICAvLyByZWN1cnNlIG9uIG5leHQgbGV2ZWwgb2YgY2hpbGRyZW4uIEF2b2lkcyB0aGUgcmVjdXJzaXZlIGNhbGwgd2hlbiB0aGVyZSBhcmUgbm8gY2hpbGRyZW4gbGVmdCB0byBpdGVyYXRlXG4gICAgICAgICAgaWYgKGNvbmZpZy5kZXNjZW5kZW50cyAmJiAoJGN1ci5jaGlsZE5vZGVzLmxlbmd0aCB8fCAob2xkc3RydWN0LmtpZHMgJiYgb2xkc3RydWN0LmtpZHMubGVuZ3RoKSkpIF9maW5kTXV0YXRpb25zKCRjdXIsIG9sZHN0cnVjdCk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAodW5jb21tb24gY2FzZSkgbG9va2FoZWFkIHVudGlsIHRoZXkgYXJlIHRoZSBzYW1lIGFnYWluIG9yIHRoZSBlbmQgb2YgY2hpbGRyZW5cbiAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIC8vIGRlbGF5ZWQgaW5pdGFsaXphdGlvbiAoYmlnIHBlcmYgYmVuZWZpdClcbiAgICAgICAgICAgIG1hcCA9IHt9O1xuICAgICAgICAgICAgY29uZmxpY3RzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkY3VyKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZCBpcyBpbiB0aGUgbG9jYXRpb24gbWFwIG90aGVyd2lzZSBkbyBhIGluZGV4T2Ygc2VhcmNoXG4gICAgICAgICAgICBpZiAoIW1hcFsoaWQgPSBVdGlsLmdldEVsZW1lbnRJZCgkY3VyKSldKSB7XG4gICAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgZG91YmxlIGNoZWNraW5nXG4gICAgICAgICAgICAgIC8vIG1hcmsgaWQgYXMgZm91bmRcbiAgICAgICAgICAgICAgbWFwW2lkXSA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBpbmRleE9mIHVzaW5nIGNvbXBhcml0b3IgY2hlY2tpbmcgb2xka2lkc1tpXS5ub2RlID09PSAkY3VyXG4gICAgICAgICAgICAgIGlmICgoaWR4ID0gVXRpbC5pbmRleE9mQ3VzdG9tTm9kZSgkb2xka2lkcywgJGN1ciwgaikpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcua2lkcykge1xuICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGlsZExpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlczogWyRjdXJdLFxuICAgICAgICAgICAgICAgICAgICAgIG5leHRTaWJsaW5nOiAkY3VyLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogJGN1ci5wcmV2aW91c1NpYmxpbmcsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgbnVtQWRkZWROb2RlcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25mbGljdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBpOiBpLFxuICAgICAgICAgICAgICAgICAgajogaWR4LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICRvbGQgJiZcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZTogdGhlIGNoYW5nZXMgbWF5IGhhdmUgYmVlbiByZXNvbHZlZDogaSBhbmQgaiBhcHBlYXIgY29uZ3VyZW50IHNvIHdlIGNhbiBjb250aW51ZSB1c2luZyB0aGUgZXhwZWN0ZWQgY2FzZVxuICAgICAgICAgICAgJG9sZCAhPT0gJGtpZHNbaV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICghbWFwWyhpZCA9IFV0aWwuZ2V0RWxlbWVudElkKCRvbGQpKV0pIHtcbiAgICAgICAgICAgICAgbWFwW2lkXSA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICgoaWR4ID0gVXRpbC5pbmRleE9mKCRraWRzLCAkb2xkLCBpKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5raWRzKSB7XG4gICAgICAgICAgICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImNoaWxkTGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogb2xkLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZE5vZGVzOiBbJG9sZF0sXG4gICAgICAgICAgICAgICAgICAgICAgbmV4dFNpYmxpbmc6ICRvbGRraWRzW2ogKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6ICRvbGRraWRzW2ogLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBudW1BZGRlZE5vZGVzLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZsaWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGk6IGlkeCxcbiAgICAgICAgICAgICAgICAgIGo6IGosXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gZW5kIHVuY29tbW9uIGNhc2VcbiAgICAgIH0gLy8gZW5kIGxvb3BcbiAgICAgIC8vIHJlc29sdmUgYW55IHJlbWFpbmluZyBjb25mbGljdHNcbiAgICAgIGlmIChjb25mbGljdHMpIF9yZXNvbHZlQ29uZmxpY3RzKGNvbmZsaWN0cywgbm9kZSwgJGtpZHMsICRvbGRraWRzLCBudW1BZGRlZE5vZGVzKTtcbiAgICB9O1xuICAgIF9maW5kTXV0YXRpb25zKCR0YXJnZXQsICRvbGRzdGF0ZSk7XG4gICAgcmV0dXJuIGRpcnR5O1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5maW5kQXR0cmlidXRlTXV0YXRpb25zID0gZnVuY3Rpb24obXV0YXRpb25zLCAkdGFyZ2V0LCAkb2xkc3RhdGUsIGZpbHRlcikge1xuICAgIHZhciBjaGVja2VkID0ge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSAkdGFyZ2V0LmF0dHJpYnV0ZXM7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIG5hbWU7XG4gICAgdmFyIGkgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhdHRyID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIG5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICBpZiAoIWZpbHRlciB8fCBVdGlsLmhhcyhmaWx0ZXIsIG5hbWUpKSB7XG4gICAgICAgIGlmIChhdHRyLnZhbHVlICE9PSAkb2xkc3RhdGVbbmFtZV0pIHtcbiAgICAgICAgICAvLyBUaGUgcHVzaGluZyBpcyByZWR1bmRhbnQgYnV0IGd6aXBzIHZlcnkgbmljZWx5XG4gICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgICB0eXBlOiBcImF0dHJpYnV0ZXNcIixcbiAgICAgICAgICAgICAgdGFyZ2V0OiAkdGFyZ2V0LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBvbGRWYWx1ZTogJG9sZHN0YXRlW25hbWVdLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lc3BhY2U6IGF0dHIubmFtZXNwYWNlVVJJLCAvLyBpbiBpZTw4IGl0IGluY29ycmVjdGx5IHdpbGwgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrZWRbbmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4gJG9sZHN0YXRlKSB7XG4gICAgICBpZiAoIWNoZWNrZWRbbmFtZV0pIHtcbiAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgIHRhcmdldDogJHRhcmdldCxcbiAgICAgICAgICAgIHR5cGU6IFwiYXR0cmlidXRlc1wiLFxuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogbmFtZSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiAkb2xkc3RhdGVbbmFtZV0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBNdXRhdGlvbk9ic2VydmVyO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLk11dGF0aW9uT2JzZXJ2ZXIgPSBNdXRhdGlvbk9ic2VydmVyO1xudmFyIE11dGF0aW9uUmVjb3JkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIE11dGF0aW9uUmVjb3JkKGRhdGEpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgYWRkZWROb2RlczogW10sXG4gICAgICByZW1vdmVkTm9kZXM6IFtdLFxuICAgICAgcHJldmlvdXNTaWJsaW5nOiBudWxsLFxuICAgICAgbmV4dFNpYmxpbmc6IG51bGwsXG4gICAgICBhdHRyaWJ1dGVOYW1lOiBudWxsLFxuICAgICAgYXR0cmlidXRlTmFtZXNwYWNlOiBudWxsLFxuICAgICAgb2xkVmFsdWU6IG51bGwsXG4gICAgfTtcbiAgICBmb3IgKHZhciBwcm9wIGluIGRhdGEpIHtcbiAgICAgIGlmIChVdGlsLmhhcyhzZXR0aW5ncywgcHJvcCkgJiYgZGF0YVtwcm9wXSAhPT0gdW5kZWZpbmVkKSBzZXR0aW5nc1twcm9wXSA9IGRhdGFbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBzZXR0aW5ncztcbiAgfVxuICByZXR1cm4gTXV0YXRpb25SZWNvcmQ7XG59KSgpO1xubW9kdWxlLmV4cG9ydHMuTXV0YXRpb25SZWNvcmQgPSBNdXRhdGlvblJlY29yZDtcbnZhciBNdXRhdGlvbk5vdGlmaWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhNdXRhdGlvbk5vdGlmaWVyLCBfc3VwZXIpO1xuICBmdW5jdGlvbiBNdXRhdGlvbk5vdGlmaWVyKCkge1xuICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMuc2V0TWF4TGlzdGVuZXJzKDEwMCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIE11dGF0aW9uTm90aWZpZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIU11dGF0aW9uTm90aWZpZXIuX2luc3RhbmNlKSB7XG4gICAgICBNdXRhdGlvbk5vdGlmaWVyLl9pbnN0YW5jZSA9IG5ldyBNdXRhdGlvbk5vdGlmaWVyKCk7XG4gICAgfVxuICAgIHJldHVybiBNdXRhdGlvbk5vdGlmaWVyLl9pbnN0YW5jZTtcbiAgfTtcbiAgTXV0YXRpb25Ob3RpZmllci5wcm90b3R5cGUuZGVzdHJ1Y3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcImNoYW5nZWRcIik7XG4gIH07XG4gIE11dGF0aW9uTm90aWZpZXIucHJvdG90eXBlLm5vdGlmeUNoYW5nZWQgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdGhpcy5lbWl0KFwiY2hhbmdlZFwiLCBub2RlKTtcbiAgfTtcbiAgTXV0YXRpb25Ob3RpZmllci5faW5zdGFuY2UgPSBudWxsO1xuICByZXR1cm4gTXV0YXRpb25Ob3RpZmllcjtcbn0pKEV2ZW50RW1pdHRlcik7XG5tb2R1bGUuZXhwb3J0cy5NdXRhdGlvbk5vdGlmaWVyID0gTXV0YXRpb25Ob3RpZmllcjtcbiJdfQ==