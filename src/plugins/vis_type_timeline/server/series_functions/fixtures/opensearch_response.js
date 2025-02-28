"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

/* eslint-disable quotes */

/*
 Really didn't want to do this, but testing the agg flatten logic
 in units isn't really possible since the functions depend on each other

 You ValueBn test each function, but at the end you really have to check the
 output of the entire thing.
*/
var _default = {
  _shards: {
    total: 1
  },
  aggregations: {
    q: {
      meta: {
        type: 'split'
      },
      buckets: {
        QueryA: {
          FieldA: {
            meta: {
              type: 'split'
            },
            buckets: [{
              key: 'ValueA',
              FieldB: {
                meta: {
                  type: 'split'
                },
                buckets: [{
                  key: 'Value2A',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 264
                      },
                      MetricB: {
                        value: 398
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 264
                      },
                      MetricB: {
                        value: 1124
                      }
                    }]
                  }
                }, {
                  key: 'Value2B',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 699
                      },
                      MetricB: {
                        value: 457
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 110
                      },
                      MetricB: {
                        value: 506
                      }
                    }]
                  }
                }]
              }
            }, {
              key: 'ValueB',
              FieldB: {
                meta: {
                  type: 'split'
                },
                buckets: [{
                  key: 'Value2B',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 152
                      },
                      MetricB: {
                        value: 61
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 518
                      },
                      MetricB: {
                        value: 77
                      }
                    }]
                  }
                }, {
                  key: 'Value2A',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 114
                      },
                      MetricB: {
                        value: 23
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 264
                      },
                      MetricB: {
                        value: 45
                      }
                    }]
                  }
                }]
              }
            }]
          }
        },
        QueryB: {
          FieldA: {
            meta: {
              type: 'split'
            },
            buckets: [{
              key: 'ValueA',
              FieldB: {
                meta: {
                  type: 'split'
                },
                buckets: [{
                  key: 'Value2B',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 621
                      },
                      MetricB: {
                        value: 12
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 751
                      },
                      MetricB: {
                        value: 12
                      }
                    }]
                  }
                }, {
                  key: 'Value2A',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 110
                      },
                      MetricB: {
                        value: 11
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 648
                      },
                      MetricB: {
                        value: 12
                      }
                    }]
                  }
                }]
              }
            }, {
              key: 'ValueC',
              FieldB: {
                meta: {
                  type: 'split'
                },
                buckets: [{
                  key: 'Value2C',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 755
                      },
                      MetricB: {
                        value: 10
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 713
                      },
                      MetricB: {
                        value: 18
                      }
                    }]
                  }
                }, {
                  key: 'Value2A',
                  time_buckets: {
                    meta: {
                      type: 'time_buckets'
                    },
                    buckets: [{
                      key: 1000,
                      MetricA: {
                        value: 391
                      },
                      MetricB: {
                        value: 4
                      }
                    }, {
                      key: 2000,
                      MetricA: {
                        value: 802
                      },
                      MetricB: {
                        value: 4
                      }
                    }]
                  }
                }]
              }
            }]
          }
        }
      }
    }
  }
};
exports.default = _default;
module.exports = exports.default;