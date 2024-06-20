"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Wazuh app - Cluster monitoring visualizations
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
var _default = [{
  _id: 'Wazuh-App-Statistics-remoted-Recv-bytes',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics remoted Recv bytes',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics remoted Recv bytes',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'remoted.recv_bytes',
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'filters',
        params: {
          filters: [{
            input: {
              query: 'remoted.recv_bytes:*',
              language: 'kuery'
            },
            label: 'recv_bytes'
          }]
        },
        schema: 'group'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        } // row: true,

      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'recv_bytes': '#70DBED' // prettier-ignore

        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-remoted-event-count',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics remoted event count',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics remoted event count',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'remoted.evt_count',
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-30m',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'filters',
        params: {
          filters: [{
            input: {
              query: 'remoted.evt_count:*',
              language: 'kuery'
            },
            label: 'evt_count'
          }]
        },
        schema: 'group'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'evt_count': '#70DBED' // prettier-ignore

        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-remoted-tcp-sessions',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics remoted tcp sessions',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics remoted tcp sessions',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'sum',
        params: {
          field: 'remoted.tcp_sessions',
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'filters',
        params: {
          filters: [{
            input: {
              query: 'remoted.tcp_sessions:*',
              language: 'kuery'
            },
            label: 'tcp_sessions'
          }]
        },
        schema: 'group'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          "tcp_sessions": "#70DBED" // prettier-ignore

        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Overview-Events-Decoded',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Overview events decoded',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Overview events decoded',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: false,
        type: 'count',
        params: {
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-30m',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_events_decoded',
          customLabel: 'Syscheck Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_events_decoded',
          customLabel: 'Syscollector Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_events_decoded',
          customLabel: 'Rootcheck Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_events_decoded',
          customLabel: 'SCA Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '7',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.other_events_decoded',
          customLabel: 'Other Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '8',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_events_decoded',
          customLabel: 'Host Info Events Decoded'
        },
        schema: 'metric'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '3',
            label: 'Syscheck Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '4',
            label: 'Syscollector Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '5',
            label: 'Rootcheck Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '6',
            label: 'SCA Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '7',
            label: 'Other Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '8',
            label: 'Host Info Events Decoded'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Syscheck Events Decoded': '#70DBED',
          'Other Events Decoded': '#705DA0',
          'Rootcheck Events Decoded': '#7EB26D',
          'SCA Events Decoded': '#EAB839',
          'Syscollector Events Decoded': '#D683CE',
          'Host Info Events Decoded': '#EF843C'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Syscheck',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Syscheck',
    visState: JSON.stringify({
      title: 'syscheck',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_events_decoded',
          customLabel: 'Syscheck Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_edps',
          customLabel: 'Syscheck EDPS'
        },
        schema: 'metric'
      }, {
        id: '3',
        enabled: false,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_queue_size',
          customLabel: 'Queue size'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: false,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_queue_usage',
          customLabel: 'Queue Usage'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          json: '',
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '6',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "def size = doc[\'analysisd.syscheck_queue_size\'];def usage = doc[\'analysisd.syscheck_queue_usage\'];def finalSize = size.size() > 0 ? size.value : 0;def finalUsage = usage.size() > 0 ? usage.value : 0;return finalUsage/finalSize * 100;"\r\n  }\r\n}',
          customLabel: 'Queue Usage %'
        },
        schema: 'metric'
      }, {
        id: '8',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 70;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 70%'
        },
        schema: 'metric'
      }, {
        id: '7',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 90;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 90%'
        },
        schema: 'metric'
      }],
      params: {
        addLegend: true,
        addTimeMarker: false,
        addTooltip: true,
        categoryAxes: [{
          id: 'CategoryAxis-1',
          labels: {
            filter: true,
            show: true,
            truncate: 100
          },
          position: 'bottom',
          scale: {
            type: 'linear'
          },
          show: true,
          style: {},
          title: {},
          type: 'category'
        }],
        grid: {
          categoryLines: false
        },
        labels: {},
        legendPosition: 'right',
        seriesParams: [{
          data: {
            id: '1',
            label: 'Syscheck Events Decoded'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: true,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          data: {
            id: '2',
            label: 'Syscheck EDPS'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: true,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          data: {
            id: '3',
            label: 'Queue size'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: true,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          data: {
            id: '4',
            label: 'Queue Usage'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          data: {
            id: '6',
            label: 'Queue Usage %'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }, {
          data: {
            id: '8',
            label: 'Queue Usage 70%'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }, {
          data: {
            id: '7',
            label: 'Queue Usage 90%'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }],
        thresholdLine: {
          color: '#E7664C',
          show: false,
          style: 'full',
          value: 14000,
          width: 1
        },
        times: [],
        type: 'line',
        valueAxes: [{
          id: 'ValueAxis-1',
          labels: {
            filter: false,
            rotate: 0,
            show: true,
            truncate: 100
          },
          name: 'LeftAxis-1',
          position: 'left',
          scale: {
            defaultYExtents: false,
            mode: 'normal',
            type: 'linear'
          },
          show: true,
          style: {},
          title: {
            text: 'Count'
          },
          type: 'value'
        }, {
          id: 'ValueAxis-2',
          labels: {
            filter: false,
            rotate: 0,
            show: true,
            truncate: 100
          },
          name: 'RightAxis-1',
          position: 'right',
          scale: {
            defaultYExtents: false,
            mode: 'normal',
            type: 'linear',
            setYExtents: true,
            min: 0,
            max: 100
          },
          show: true,
          style: {},
          title: {
            text: '%'
          },
          type: 'value'
        }],
        row: false,
        radiusRatio: 22
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Queue Usage %': '#7EB26D',
          'Queue Usage 70%': '#EAB839',
          'Queue Usage 90%': '#E24D42',
          'Syscheck EDPS': '#D683CE',
          'Syscheck Events Decoded': '#70DBED'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Syscollector',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Syscollector',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Syscollector',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_events_decoded',
          customLabel: 'Syscollector Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_edps',
          customLabel: 'Syscollector EDPS'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: false,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_queue_usage',
          customLabel: 'Queue Usage'
        },
        schema: 'metric'
      }, {
        id: '7',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "def size = doc[\'analysisd.syscollector_queue_size\'];def usage = doc[\'analysisd.syscollector_queue_usage\'];def finalSize = size.size() > 0 ? size.value : 0;def finalUsage = usage.size() > 0 ? usage.value : 0;return finalUsage/finalSize * 100;"\r\n  }\r\n}',
          customLabel: 'Queue Usage %'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 70;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 70%'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 90;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 90%'
        },
        schema: 'metric'
      }, {
        id: '8',
        enabled: false,
        type: 'avg',
        params: {
          field: 'analysisd.syscollector_queue_size',
          customLabel: 'analysisd.syscollector_queue_size'
        },
        schema: 'metric'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: false
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }, {
          id: 'ValueAxis-2',
          name: 'RightAxis-1',
          type: 'value',
          position: 'right',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal',
            setYExtents: true,
            max: 100
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: '%'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Syscollector Events Decoded',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '3',
            label: 'Syscollector EDPS'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '4',
            label: 'Queue Usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '7',
            label: 'Queue Usage %'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '5',
            label: 'Queue Usage 70%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '6',
            label: 'Queue Usage 90%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '8',
            label: 'analysisd.syscollector_queue_size'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Queue Usage %': '#7EB26D',
          'Queue Usage 70%': '#EAB839',
          'Queue Usage 90%': '#E24D42',
          'Syscollector EDPS': '#D683CE',
          'Syscollector Events Decoded': '#70DBED'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Rootcheck',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Rootcheck',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Rootcheck',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_events_decoded',
          customLabel: 'Rootcheck Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_edps',
          customLabel: 'Rootcheck EDPS'
        },
        schema: 'metric'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "def size = doc[\'analysisd.rootcheck_queue_size\'];def usage = doc[\'analysisd.rootcheck_queue_usage\'];def finalSize = size.size() > 0 ? size.value : 0;def finalUsage = usage.size() > 0 ? usage.value : 0;return finalUsage/finalSize * 100;"\r\n  }\r\n}',
          customLabel: 'Queue Usage %'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 70;"\r\n  }\r\n}',
          customLabel: 'Queue usage 70%'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rootcheck_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 90;"\r\n  }\r\n}',
          customLabel: 'Queue usage 90%'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: false
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }, {
          id: 'ValueAxis-2',
          name: 'RightAxis-1',
          type: 'value',
          position: 'right',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal',
            setYExtents: true,
            max: 100
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: '%'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Rootcheck Events Decoded',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '2',
            label: 'Rootcheck EDPS'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '3',
            label: 'Queue Usage %'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '4',
            label: 'Queue usage 70%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '5',
            label: 'Queue usage 90%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Queue Usage %': '#7EB26D',
          'Queue usage 70%': '#EAB839',
          'Queue usage 90%': '#E24D42',
          'Rootcheck EDPS': '#D683CE',
          'Rootcheck Events Decoded': '#70DBED'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-SCA',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics SCA',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics SCA',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_events_decoded',
          customLabel: 'SCA Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_edps',
          customLabel: 'SCA EDPS'
        },
        schema: 'metric'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "def size = doc[\'analysisd.sca_queue_size\'];def usage = doc[\'analysisd.sca_queue_usage\'];def finalSize = size.size() > 0 ? size.value : 0;def finalUsage = usage.size() > 0 ? usage.value : 0;return finalUsage/finalSize * 100;"\r\n  }\r\n}',
          customLabel: 'Queue Usage %'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 70;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 70%'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.sca_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 90;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 90%'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: false
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }, {
          id: 'ValueAxis-2',
          name: 'RightAxis-1',
          type: 'value',
          position: 'right',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal',
            setYExtents: true,
            max: 100
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: '%'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'SCA Events Decoded',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '2',
            label: 'SCA EDPS'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '3',
            label: 'Queue Usage %'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '4',
            label: 'Queue Usage 70%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '5',
            label: 'Queue Usage 90%'
          },
          valueAxis: 'ValueAxis-2',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: false
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Queue Usage %': '#7EB26D',
          'Queue Usage 70%': '#EAB839',
          'Queue Usage 90%': '#E24D42',
          'SCA EDPS': '#D683CE',
          'SCA Events Decoded': '#70DBED'
        },
        legendOpen: true
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-HostInfo',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics HostInfo',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics HostInfo',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_events_decoded',
          customLabel: 'Host info Events Decoded'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_edps',
          customLabel: 'Host info EDPS'
        },
        schema: 'metric'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "def size = doc[\'analysisd.hostinfo_queue_size\'];def usage = doc[\'analysisd.hostinfo_queue_usage\'];def finalSize = size.size() > 0 ? size.value : 0;def finalUsage = usage.size() > 0 ? usage.value : 0;return finalUsage/finalSize * 100;"\r\n  }\r\n}',
          customLabel: 'Queue Usage %'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-24h',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {}
        },
        schema: 'segment'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 70;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 70%'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.hostinfo_queue_usage',
          json: '{\r\n  "script": {\r\n      "source": "return 90;"\r\n  }\r\n}',
          customLabel: 'Queue Usage 90%'
        },
        schema: 'metric'
      }],
      params: {
        addLegend: true,
        addTimeMarker: false,
        addTooltip: true,
        categoryAxes: [{
          id: 'CategoryAxis-1',
          labels: {
            filter: true,
            show: true,
            truncate: 100
          },
          position: 'bottom',
          scale: {
            type: 'linear'
          },
          show: true,
          style: {},
          title: {},
          type: 'category'
        }],
        grid: {
          categoryLines: false
        },
        labels: {},
        legendPosition: 'right',
        seriesParams: [{
          color: '#0000FF',
          data: {
            id: '1',
            label: 'Host info Events Decoded'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: true,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          color: '#0000FF',
          data: {
            id: '2',
            label: 'Host info EDPS'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: true,
          type: 'line',
          valueAxis: 'ValueAxis-1'
        }, {
          color: '#0000FF',
          data: {
            id: '3',
            label: 'Queue Usage %'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }, {
          color: '#FFCC11',
          data: {
            id: '5',
            label: 'Queue Usage 70%',
            style: {
              color: '#FFCC11'
            }
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          style: {
            color: '#FFCC11'
          },
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }, {
          color: '#E7664C',
          data: {
            id: '6',
            label: 'Queue Usage 90%'
          },
          drawLinesBetweenPoints: true,
          interpolate: 'linear',
          lineWidth: 2,
          mode: 'normal',
          show: true,
          showCircles: false,
          style: {
            color: '#E7664C'
          },
          type: 'line',
          valueAxis: 'ValueAxis-2'
        }],
        thresholdLine: {
          color: '#E7664C',
          show: false,
          style: 'full',
          value: 10,
          width: 1
        },
        times: [],
        type: 'line',
        valueAxes: [{
          id: 'ValueAxis-1',
          labels: {
            filter: false,
            rotate: 0,
            show: true,
            truncate: 100
          },
          name: 'LeftAxis-1',
          position: 'left',
          scale: {
            mode: 'normal',
            type: 'linear'
          },
          show: true,
          style: {},
          title: {
            text: 'Count'
          },
          type: 'value'
        }, {
          id: 'ValueAxis-2',
          labels: {
            filter: false,
            rotate: 0,
            show: true,
            truncate: 100
          },
          name: 'RightAxis-1',
          position: 'right',
          scale: {
            mode: 'normal',
            type: 'linear',
            setYExtents: true,
            max: 100
          },
          show: true,
          style: {},
          title: {
            text: '%'
          },
          type: 'value'
        }]
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Host info EDPS': '#D683CE',
          'Host info Events Decoded': '#70DBED',
          'Queue Usage %': '#7EB26D',
          'Queue Usage 70%': '#EAB839',
          'Queue Usage 90%': '#E24D42'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Events-By-Node',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Events by Node',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Events by Node',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'sum',
        params: {
          field: 'analysisd.events_processed',
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-30m',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '4',
        enabled: true,
        type: 'filters',
        params: {
          filters: [{
            input: {
              query: 'analysisd.events_processed:*',
              language: 'kuery'
            },
            label: 'Events processed by Node:'
          }]
        },
        schema: 'group'
      }, {
        id: '3',
        enabled: true,
        type: 'terms',
        params: {
          field: 'nodeName.keyword',
          orderBy: '1',
          order: 'desc',
          size: 5,
          otherBucket: false,
          otherBucketLabel: 'Other',
          missingBucket: false,
          missingBucketLabel: 'Missing',
          customLabel: ''
        },
        schema: 'group'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Events-Dropped-By-Node',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Events Dropped by Node',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Events Dropped by Node',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: true,
        type: 'sum',
        params: {
          field: 'analysisd.events_dropped',
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-30m',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'filters',
        params: {
          filters: [{
            input: {
              query: 'analysisd.events_dropped:*',
              language: 'kuery'
            },
            label: 'Events dropped by Node:'
          }]
        },
        schema: 'group'
      }, {
        id: '4',
        enabled: true,
        type: 'terms',
        params: {
          field: 'nodeName.keyword',
          orderBy: '1',
          order: 'desc',
          size: 5,
          otherBucket: false,
          otherBucketLabel: 'Other',
          missingBucket: false,
          missingBucketLabel: 'Missing'
        },
        schema: 'group'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}, {
  _id: 'Wazuh-App-Statistics-Analysisd-Queues-Usage',
  _type: 'visualization',
  _source: {
    title: 'Wazuh App Statistics Queues Usage',
    visState: JSON.stringify({
      title: 'Wazuh App Statistics Queues Usage',
      type: 'line',
      aggs: [{
        id: '1',
        enabled: false,
        type: 'count',
        params: {
          customLabel: 'Count'
        },
        schema: 'metric'
      }, {
        id: '2',
        enabled: true,
        type: 'date_histogram',
        params: {
          field: 'timestamp',
          timeRange: {
            from: 'now-30m',
            to: 'now'
          },
          useNormalizedOpenSearchInterval: true,
          scaleMetricValues: false,
          interval: 'auto',
          drop_partials: false,
          min_doc_count: 1,
          extended_bounds: {},
          customLabel: 'timestamp'
        },
        schema: 'segment'
      }, {
        id: '3',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.event_queue_size',
          customLabel: 'Event queue usage'
        },
        schema: 'metric'
      }, {
        id: '4',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.rule_matching_queue_size',
          customLabel: 'Rule matching queue usage'
        },
        schema: 'metric'
      }, {
        id: '5',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.alerts_queue_size',
          customLabel: 'Alerts log queue usage'
        },
        schema: 'metric'
      }, {
        id: '6',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.firewall_queue_size',
          customLabel: 'Firewall log queue usage'
        },
        schema: 'metric'
      }, {
        id: '7',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.statistical_queue_size',
          customLabel: 'Statistical log queue usage'
        },
        schema: 'metric'
      }, {
        id: '8',
        enabled: true,
        type: 'avg',
        params: {
          field: 'analysisd.archives_queue_size',
          customLabel: 'Archives queue usage'
        },
        schema: 'metric'
      }],
      params: {
        type: 'line',
        grid: {
          categoryLines: true
        },
        categoryAxes: [{
          id: 'CategoryAxis-1',
          type: 'category',
          position: 'bottom',
          show: true,
          style: {},
          scale: {
            type: 'linear'
          },
          labels: {
            show: true,
            filter: true,
            truncate: 100
          },
          title: {}
        }],
        valueAxes: [{
          id: 'ValueAxis-1',
          name: 'LeftAxis-1',
          type: 'value',
          position: 'left',
          show: true,
          style: {},
          scale: {
            type: 'linear',
            mode: 'normal'
          },
          labels: {
            show: true,
            rotate: 0,
            filter: false,
            truncate: 100
          },
          title: {
            text: 'Count'
          }
        }],
        seriesParams: [{
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            label: 'Count',
            id: '1'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '3',
            label: 'Event queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '4',
            label: 'Rule matching queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '5',
            label: 'Alerts log queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '6',
            label: 'Firewall log queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '7',
            label: 'Statistical log queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }, {
          show: true,
          type: 'line',
          mode: 'normal',
          data: {
            id: '8',
            label: 'Archives queue usage'
          },
          valueAxis: 'ValueAxis-1',
          drawLinesBetweenPoints: true,
          lineWidth: 2,
          interpolate: 'linear',
          showCircles: true
        }],
        addTooltip: true,
        addLegend: true,
        legendPosition: 'right',
        times: [],
        addTimeMarker: false,
        labels: {},
        thresholdLine: {
          show: false,
          value: 10,
          width: 1,
          style: 'full',
          color: '#E7664C'
        }
      }
    }),
    uiStateJSON: JSON.stringify({
      vis: {
        colors: {
          'Alerts log queue usage': '#7EB26D',
          'Archives queue usage': '#EF843C',
          'Event queue usage': '#70DBED',
          'Firewall log queue usage': '#EAB839',
          'Rule matching queue usage': '#D683CE',
          'Statistical log queue usage': '#705DA0'
        }
      }
    }),
    description: '',
    version: 1,
    kibanaSavedObjectMeta: {
      searchSourceJSON: JSON.stringify({
        index: 'wazuh-statistics-*',
        filter: [],
        query: {
          query: '',
          language: 'lucene'
        }
      })
    }
  }
}];
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRpc3RpY3MudHMiXSwibmFtZXMiOlsiX2lkIiwiX3R5cGUiLCJfc291cmNlIiwidGl0bGUiLCJ2aXNTdGF0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0eXBlIiwiYWdncyIsImlkIiwiZW5hYmxlZCIsInBhcmFtcyIsImZpZWxkIiwiY3VzdG9tTGFiZWwiLCJzY2hlbWEiLCJ0aW1lUmFuZ2UiLCJmcm9tIiwidG8iLCJ1c2VOb3JtYWxpemVkT3BlblNlYXJjaEludGVydmFsIiwic2NhbGVNZXRyaWNWYWx1ZXMiLCJpbnRlcnZhbCIsImRyb3BfcGFydGlhbHMiLCJtaW5fZG9jX2NvdW50IiwiZXh0ZW5kZWRfYm91bmRzIiwiZmlsdGVycyIsImlucHV0IiwicXVlcnkiLCJsYW5ndWFnZSIsImxhYmVsIiwiZ3JpZCIsImNhdGVnb3J5TGluZXMiLCJjYXRlZ29yeUF4ZXMiLCJwb3NpdGlvbiIsInNob3ciLCJzdHlsZSIsInNjYWxlIiwibGFiZWxzIiwiZmlsdGVyIiwidHJ1bmNhdGUiLCJ2YWx1ZUF4ZXMiLCJuYW1lIiwibW9kZSIsInJvdGF0ZSIsInRleHQiLCJzZXJpZXNQYXJhbXMiLCJkYXRhIiwidmFsdWVBeGlzIiwiZHJhd0xpbmVzQmV0d2VlblBvaW50cyIsImxpbmVXaWR0aCIsImludGVycG9sYXRlIiwic2hvd0NpcmNsZXMiLCJhZGRUb29sdGlwIiwiYWRkTGVnZW5kIiwibGVnZW5kUG9zaXRpb24iLCJ0aW1lcyIsImFkZFRpbWVNYXJrZXIiLCJ0aHJlc2hvbGRMaW5lIiwidmFsdWUiLCJ3aWR0aCIsImNvbG9yIiwidWlTdGF0ZUpTT04iLCJ2aXMiLCJjb2xvcnMiLCJkZXNjcmlwdGlvbiIsInZlcnNpb24iLCJraWJhbmFTYXZlZE9iamVjdE1ldGEiLCJzZWFyY2hTb3VyY2VKU09OIiwiaW5kZXgiLCJqc29uIiwiZGVmYXVsdFlFeHRlbnRzIiwic2V0WUV4dGVudHMiLCJtaW4iLCJtYXgiLCJyb3ciLCJyYWRpdXNSYXRpbyIsImxlZ2VuZE9wZW4iLCJvcmRlckJ5Iiwib3JkZXIiLCJzaXplIiwib3RoZXJCdWNrZXQiLCJvdGhlckJ1Y2tldExhYmVsIiwibWlzc2luZ0J1Y2tldCIsIm1pc3NpbmdCdWNrZXRMYWJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFDZSxDQUNiO0FBQ0VBLEVBQUFBLEdBQUcsRUFBRSx5Q0FEUDtBQUVFQyxFQUFBQSxLQUFLLEVBQUUsZUFGVDtBQUdFQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsS0FBSyxFQUFFLHlDQURBO0FBRVBDLElBQUFBLFFBQVEsRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDdkJILE1BQUFBLEtBQUssRUFBRSx5Q0FEZ0I7QUFFdkJJLE1BQUFBLElBQUksRUFBRSxNQUZpQjtBQUd2QkMsTUFBQUEsSUFBSSxFQUFFLENBQ0o7QUFDRUMsUUFBQUEsRUFBRSxFQUFFLEdBRE47QUFFRUMsUUFBQUEsT0FBTyxFQUFFLElBRlg7QUFHRUgsUUFBQUEsSUFBSSxFQUFFLEtBSFI7QUFJRUksUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLEtBQUssRUFBRSxvQkFERDtBQUVOQyxVQUFBQSxXQUFXLEVBQUU7QUFGUCxTQUpWO0FBUUVDLFFBQUFBLE1BQU0sRUFBRTtBQVJWLE9BREksRUFXSjtBQUNFTCxRQUFBQSxFQUFFLEVBQUUsR0FETjtBQUVFQyxRQUFBQSxPQUFPLEVBQUUsSUFGWDtBQUdFSCxRQUFBQSxJQUFJLEVBQUUsZ0JBSFI7QUFJRUksUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLEtBQUssRUFBRSxXQUREO0FBRU5HLFVBQUFBLFNBQVMsRUFBRTtBQUNUQyxZQUFBQSxJQUFJLEVBQUUsU0FERztBQUVUQyxZQUFBQSxFQUFFLEVBQUU7QUFGSyxXQUZMO0FBTU5DLFVBQUFBLCtCQUErQixFQUFFLElBTjNCO0FBT05DLFVBQUFBLGlCQUFpQixFQUFFLEtBUGI7QUFRTkMsVUFBQUEs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QUFJLEVBQUUsUUFIUjtBQUlFSSxVQUFBQSxJQUFJLEVBQUU7QUFDSnBDLFlBQUFBLEVBQUUsRUFBRSxHQURBO0FBRUptQixZQUFBQSxLQUFLLEVBQUU7QUFGSCxXQUpSO0FBUUVrQixVQUFBQSxTQUFTLEVBQUUsYUFSYjtBQVNFQyxVQUFBQSxzQkFBc0IsRUFBRSxJQVQxQjtBQVVFQyxVQUFBQSxTQUFTLEVBQUUsQ0FWYjtBQVdFQyxVQUFBQSxXQUFXLEVBQUUsUUFYZjtBQVlFQyxVQUFBQSxXQUFXLEVBQUU7QUFaZixTQTNDWSxFQXlEWjtBQUNFakIsVUFBQUEsSUFBSSxFQUFFLElBRFI7QUFFRTFCLFVBQUFBLElBQUksRUFBRSxNQUZSO0FBR0VrQyxVQUFBQSxJQUFJLEVBQUUsUUFIUjtBQUlFSSxVQUFBQSxJQUFJLEVBQUU7QUFDSnBDLFlBQUFBLEVBQUUsRUFBRSxHQURBO0FBRUptQixZQUFBQSxLQUFLLEVBQUU7QUFGSCxXQUpSO0FBUUVrQixVQUFBQSxTQUFTLEVBQUUsYUFSYjtBQVNFQyxVQUFBQSxzQkFBc0IsRUFBRSxJQVQxQjtBQVVFQyxVQUFBQSxTQUFTLEVBQUUsQ0FWYjtBQVdFQyxVQUFBQSxXQUFXLEVBQUUsUUFYZjtBQVlFQyxVQUFBQSxXQUFXLEVBQUU7QUFaZixTQXpEWSxFQXVFWjtBQUNFakIsVUFBQUEsSUFBSSxFQUFFLElBRFI7QUFFRTFCLFVBQUFBLElBQUksRUFBRSxNQUZSO0FBR0VrQyxVQUFBQSxJQUFJLEVBQUUsUUFIUjtBQUlFSSxVQUFBQSxJQUFJLEVBQUU7QUFDSnBDLFlBQUFBLEVBQUUsRUFBRSxHQURBO0FBRUptQixZQUFBQSxLQUFLLEVBQUU7QUFGSCxXQUpSO0FBUUVrQixVQUFBQSxTQUFTLEVBQUUsYUFSYjtBQVNFQyxVQUFBQSxzQkFBc0IsRUFBRSxJQVQxQjtBQVVFQyxVQUFBQSxTQUFTLEVBQUUsQ0FWYjtBQVdFQyxVQUFBQSxXQUFXLEVBQUUsUUFYZjtBQVlFQyxVQUFBQSxXQUFXLEVBQUU7QUFaZixTQXZFWSxFQXFGWjtBQUNFakIsVUFBQUEsSUFB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QUFDTixvQ0FBMEIsU0FEcEI7QUFFTixrQ0FBd0IsU0FGbEI7QUFHTiwrQkFBcUIsU0FIZjtBQUlOLHNDQUE0QixTQUp0QjtBQUtOLHVDQUE2QixTQUx2QjtBQU1OLHlDQUErQjtBQU56QjtBQURMO0FBRHFCLEtBQWYsQ0FqUU47QUE2UVBDLElBQUFBLFdBQVcsRUFBRSxFQTdRTjtBQThRUEMsSUFBQUEsT0FBTyxFQUFFLENBOVFGO0FBK1FQQyxJQUFBQSxxQkFBcUIsRUFBRTtBQUNyQkMsTUFBQUEsZ0JBQWdCLEVBQUU3RCxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUMvQjZELFFBQUFBLEtBQUssRUFBRSxvQkFEd0I7QUFFL0I5QixRQUFBQSxNQUFNLEVBQUUsRUFGdUI7QUFHL0JYLFFBQUFBLEtBQUssRUFBRTtBQUFFQSxVQUFBQSxLQUFLLEVBQUUsRUFBVDtBQUFhQyxVQUFBQSxRQUFRLEVBQUU7QUFBdkI7QUFId0IsT0FBZjtBQURHO0FBL1FoQjtBQUhYLENBcjdFYSxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIENsdXN0ZXIgbW9uaXRvcmluZyB2aXN1YWxpemF0aW9uc1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIF9pZDogJ1dhenVoLUFwcC1TdGF0aXN0aWNzLXJlbW90ZWQtUmVjdi1ieXRlcycsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIHJlbW90ZWQgUmVjdiBieXRlcycsXG4gICAgICB2aXNTdGF0ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIHJlbW90ZWQgUmVjdiBieXRlcycsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgYWdnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdyZW1vdGVkLnJlY3ZfYnl0ZXMnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ0NvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZV9oaXN0b2dyYW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgdGltZVJhbmdlOiB7XG4gICAgICAgICAgICAgICAgZnJvbTogJ25vdy0yNGgnLFxuICAgICAgICAgICAgICAgIHRvOiAnbm93JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXNlTm9ybWFsaXplZE9wZW5TZWFyY2hJbnRlcnZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NhbGVNZXRyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ2F1dG8nLFxuICAgICAgICAgICAgICBkcm9wX3BhcnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWluX2RvY19jb3VudDogMSxcbiAgICAgICAgICAgICAgZXh0ZW5kZWRfYm91bmRzOiB7fSxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ3NlZ21lbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZmlsdGVycycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmlsdGVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiAncmVtb3RlZC5yZWN2X2J5dGVzOionLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogJ2t1ZXJ5JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ3JlY3ZfYnl0ZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnZ3JvdXAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmVzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2F0ZWdvcnlBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQ2F0ZWdvcnlBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHZhbHVlQXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0xlZnRBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ291bnQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkVG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICBhZGRMZWdlbmQ6IHRydWUsXG4gICAgICAgICAgbGVnZW5kUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgdGltZXM6IFtdLFxuICAgICAgICAgIGFkZFRpbWVNYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIGxhYmVsczoge30sXG4gICAgICAgICAgdGhyZXNob2xkTGluZToge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMTAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIHN0eWxlOiAnZnVsbCcsXG4gICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gcm93OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICdyZWN2X2J5dGVzJzogJyM3MERCRUQnLCAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICB2ZXJzaW9uOiAxLFxuICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgIHNlYXJjaFNvdXJjZUpTT046IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpbmRleDogJ3dhenVoLXN0YXRpc3RpY3MtKicsXG4gICAgICAgICAgZmlsdGVyOiBbXSxcbiAgICAgICAgICBxdWVyeTogeyBxdWVyeTogJycsIGxhbmd1YWdlOiAnbHVjZW5lJyB9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIF9pZDogJ1dhenVoLUFwcC1TdGF0aXN0aWNzLXJlbW90ZWQtZXZlbnQtY291bnQnLFxuICAgIF90eXBlOiAndmlzdWFsaXphdGlvbicsXG4gICAgX3NvdXJjZToge1xuICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyByZW1vdGVkIGV2ZW50IGNvdW50JyxcbiAgICAgIHZpc1N0YXRlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgcmVtb3RlZCBldmVudCBjb3VudCcsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgYWdnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdyZW1vdGVkLmV2dF9jb3VudCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlX2hpc3RvZ3JhbScsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgICB0aW1lUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAnbm93LTMwbScsXG4gICAgICAgICAgICAgICAgdG86ICdub3cnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1c2VOb3JtYWxpemVkT3BlblNlYXJjaEludGVydmFsOiB0cnVlLFxuICAgICAgICAgICAgICBzY2FsZU1ldHJpY1ZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnYXV0bycsXG4gICAgICAgICAgICAgIGRyb3BfcGFydGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtaW5fZG9jX2NvdW50OiAxLFxuICAgICAgICAgICAgICBleHRlbmRlZF9ib3VuZHM6IHt9LFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnc2VnbWVudCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdmaWx0ZXJzJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWx0ZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6ICdyZW1vdGVkLmV2dF9jb3VudDoqJyxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U6ICdrdWVyeScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGFiZWw6ICdldnRfY291bnQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnZ3JvdXAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmVzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2F0ZWdvcnlBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQ2F0ZWdvcnlBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHZhbHVlQXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0xlZnRBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ291bnQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkVG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICBhZGRMZWdlbmQ6IHRydWUsXG4gICAgICAgICAgbGVnZW5kUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgdGltZXM6IFtdLFxuICAgICAgICAgIGFkZFRpbWVNYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIGxhYmVsczoge30sXG4gICAgICAgICAgdGhyZXNob2xkTGluZToge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMTAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIHN0eWxlOiAnZnVsbCcsXG4gICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHVpU3RhdGVKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZpczoge1xuICAgICAgICAgIGNvbG9yczoge1xuICAgICAgICAgICAgJ2V2dF9jb3VudCc6ICcjNzBEQkVEJywgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6ICd3YXp1aC1zdGF0aXN0aWNzLSonLFxuICAgICAgICAgIGZpbHRlcjogW10sXG4gICAgICAgICAgcXVlcnk6IHsgcXVlcnk6ICcnLCBsYW5ndWFnZTogJ2x1Y2VuZScgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBfaWQ6ICdXYXp1aC1BcHAtU3RhdGlzdGljcy1yZW1vdGVkLXRjcC1zZXNzaW9ucycsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIHJlbW90ZWQgdGNwIHNlc3Npb25zJyxcbiAgICAgIHZpc1N0YXRlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgcmVtb3RlZCB0Y3Agc2Vzc2lvbnMnLFxuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIGFnZ3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdzdW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAncmVtb3RlZC50Y3Bfc2Vzc2lvbnMnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ0NvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZV9oaXN0b2dyYW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgdGltZVJhbmdlOiB7XG4gICAgICAgICAgICAgICAgZnJvbTogJ25vdy0yNGgnLFxuICAgICAgICAgICAgICAgIHRvOiAnbm93JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXNlTm9ybWFsaXplZE9wZW5TZWFyY2hJbnRlcnZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NhbGVNZXRyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ2F1dG8nLFxuICAgICAgICAgICAgICBkcm9wX3BhcnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWluX2RvY19jb3VudDogMSxcbiAgICAgICAgICAgICAgZXh0ZW5kZWRfYm91bmRzOiB7fSxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ3NlZ21lbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZmlsdGVycycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmlsdGVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiAncmVtb3RlZC50Y3Bfc2Vzc2lvbnM6KicsXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAna3VlcnknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAndGNwX3Nlc3Npb25zJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ2dyb3VwJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlMaW5lczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhdGVnb3J5QXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ0NhdGVnb3J5QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB2YWx1ZUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIG5hbWU6ICdMZWZ0QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvdW50JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzZXJpZXNQYXJhbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZFRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgYWRkTGVnZW5kOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHRpbWVzOiBbXSxcbiAgICAgICAgICBhZGRUaW1lTWFya2VyOiBmYWxzZSxcbiAgICAgICAgICBsYWJlbHM6IHt9LFxuICAgICAgICAgIHRocmVzaG9sZExpbmU6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBzdHlsZTogJ2Z1bGwnLFxuICAgICAgICAgICAgY29sb3I6ICcjRTc2NjRDJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgIFwidGNwX3Nlc3Npb25zXCI6IFwiIzcwREJFRFwiLCAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICB2ZXJzaW9uOiAxLFxuICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgIHNlYXJjaFNvdXJjZUpTT046IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpbmRleDogJ3dhenVoLXN0YXRpc3RpY3MtKicsXG4gICAgICAgICAgZmlsdGVyOiBbXSxcbiAgICAgICAgICBxdWVyeTogeyBxdWVyeTogJycsIGxhbmd1YWdlOiAnbHVjZW5lJyB9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIF9pZDogJ1dhenVoLUFwcC1TdGF0aXN0aWNzLUFuYWx5c2lzZC1PdmVydmlldy1FdmVudHMtRGVjb2RlZCcsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIE92ZXJ2aWV3IGV2ZW50cyBkZWNvZGVkJyxcbiAgICAgIHZpc1N0YXRlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgT3ZlcnZpZXcgZXZlbnRzIGRlY29kZWQnLFxuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIGFnZ3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAnY291bnQnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlX2hpc3RvZ3JhbScsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgICB0aW1lUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAnbm93LTMwbScsXG4gICAgICAgICAgICAgICAgdG86ICdub3cnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1c2VOb3JtYWxpemVkT3BlblNlYXJjaEludGVydmFsOiB0cnVlLFxuICAgICAgICAgICAgICBzY2FsZU1ldHJpY1ZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnYXV0bycsXG4gICAgICAgICAgICAgIGRyb3BfcGFydGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtaW5fZG9jX2NvdW50OiAxLFxuICAgICAgICAgICAgICBleHRlbmRlZF9ib3VuZHM6IHt9LFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnc2VnbWVudCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnN5c2NoZWNrX2V2ZW50c19kZWNvZGVkJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdTeXNjaGVjayBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNCcsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3lzY29sbGVjdG9yX2V2ZW50c19kZWNvZGVkJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdTeXNjb2xsZWN0b3IgRXZlbnRzIERlY29kZWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzUnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnJvb3RjaGVja19ldmVudHNfZGVjb2RlZCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUm9vdGNoZWNrIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc2JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zY2FfZXZlbnRzX2RlY29kZWQnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1NDQSBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNycsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Qub3RoZXJfZXZlbnRzX2RlY29kZWQnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ090aGVyIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5ob3N0aW5mb19ldmVudHNfZGVjb2RlZCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnSG9zdCBJbmZvIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmVzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2F0ZWdvcnlBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQ2F0ZWdvcnlBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHZhbHVlQXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0xlZnRBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ291bnQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N5c2NoZWNrIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc0JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N5c2NvbGxlY3RvciBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSb290Y2hlY2sgRXZlbnRzIERlY29kZWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzYnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU0NBIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc3JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ090aGVyIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvc3QgSW5mbyBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZFRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgYWRkTGVnZW5kOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHRpbWVzOiBbXSxcbiAgICAgICAgICBhZGRUaW1lTWFya2VyOiBmYWxzZSxcbiAgICAgICAgICBsYWJlbHM6IHt9LFxuICAgICAgICAgIHRocmVzaG9sZExpbmU6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBzdHlsZTogJ2Z1bGwnLFxuICAgICAgICAgICAgY29sb3I6ICcjRTc2NjRDJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICdTeXNjaGVjayBFdmVudHMgRGVjb2RlZCc6ICcjNzBEQkVEJyxcbiAgICAgICAgICAgICdPdGhlciBFdmVudHMgRGVjb2RlZCc6ICcjNzA1REEwJyxcbiAgICAgICAgICAgICdSb290Y2hlY2sgRXZlbnRzIERlY29kZWQnOiAnIzdFQjI2RCcsXG4gICAgICAgICAgICAnU0NBIEV2ZW50cyBEZWNvZGVkJzogJyNFQUI4MzknLFxuICAgICAgICAgICAgJ1N5c2NvbGxlY3RvciBFdmVudHMgRGVjb2RlZCc6ICcjRDY4M0NFJyxcbiAgICAgICAgICAgICdIb3N0IEluZm8gRXZlbnRzIERlY29kZWQnOiAnI0VGODQzQycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6ICd3YXp1aC1zdGF0aXN0aWNzLSonLFxuICAgICAgICAgIGZpbHRlcjogW10sXG4gICAgICAgICAgcXVlcnk6IHsgcXVlcnk6ICcnLCBsYW5ndWFnZTogJ2x1Y2VuZScgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBfaWQ6ICdXYXp1aC1BcHAtU3RhdGlzdGljcy1BbmFseXNpc2QtU3lzY2hlY2snLFxuICAgIF90eXBlOiAndmlzdWFsaXphdGlvbicsXG4gICAgX3NvdXJjZToge1xuICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBTeXNjaGVjaycsXG4gICAgICB2aXNTdGF0ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0aXRsZTogJ3N5c2NoZWNrJyxcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBhZ2dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjaGVja19ldmVudHNfZGVjb2RlZCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnU3lzY2hlY2sgRXZlbnRzIERlY29kZWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnN5c2NoZWNrX2VkcHMnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1N5c2NoZWNrIEVEUFMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjaGVja19xdWV1ZV9zaXplJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdRdWV1ZSBzaXplJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc0JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3lzY2hlY2tfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIFVzYWdlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZV9oaXN0b2dyYW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgdGltZVJhbmdlOiB7XG4gICAgICAgICAgICAgICAgZnJvbTogJ25vdy0yNGgnLFxuICAgICAgICAgICAgICAgIHRvOiAnbm93JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXNlTm9ybWFsaXplZE9wZW5TZWFyY2hJbnRlcnZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NhbGVNZXRyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ2F1dG8nLFxuICAgICAgICAgICAgICBkcm9wX3BhcnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWluX2RvY19jb3VudDogMSxcbiAgICAgICAgICAgICAgZXh0ZW5kZWRfYm91bmRzOiB7fSxcbiAgICAgICAgICAgICAganNvbjogJycsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdzZWdtZW50JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3lzY2hlY2tfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwiZGVmIHNpemUgPSBkb2NbXFwnYW5hbHlzaXNkLnN5c2NoZWNrX3F1ZXVlX3NpemVcXCddO2RlZiB1c2FnZSA9IGRvY1tcXCdhbmFseXNpc2Quc3lzY2hlY2tfcXVldWVfdXNhZ2VcXCddO2RlZiBmaW5hbFNpemUgPSBzaXplLnNpemUoKSA+IDAgPyBzaXplLnZhbHVlIDogMDtkZWYgZmluYWxVc2FnZSA9IHVzYWdlLnNpemUoKSA+IDAgPyB1c2FnZS52YWx1ZSA6IDA7cmV0dXJuIGZpbmFsVXNhZ2UvZmluYWxTaXplICogMTAwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnOCcsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3lzY2hlY2tfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwicmV0dXJuIDcwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgNzAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc3JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjaGVja19xdWV1ZV91c2FnZScsXG4gICAgICAgICAgICAgIGpzb246ICd7XFxyXFxuICBcInNjcmlwdFwiOiB7XFxyXFxuICAgICAgXCJzb3VyY2VcIjogXCJyZXR1cm4gOTA7XCJcXHJcXG4gIH1cXHJcXG59JyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdRdWV1ZSBVc2FnZSA5MCUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgYWRkTGVnZW5kOiB0cnVlLFxuICAgICAgICAgIGFkZFRpbWVNYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIGFkZFRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgY2F0ZWdvcnlBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQ2F0ZWdvcnlBeGlzLTEnLFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgdGl0bGU6IHt9LFxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TGluZXM6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWxzOiB7fSxcbiAgICAgICAgICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICBzZXJpZXNQYXJhbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTeXNjaGVjayBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTeXNjaGVjayBFRFBTJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1F1ZXVlIHNpemUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc2JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1F1ZXVlIFVzYWdlICUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1F1ZXVlIFVzYWdlIDcwJScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IGZhbHNlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzcnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UgOTAlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogZmFsc2UsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHRocmVzaG9sZExpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnI0U3NjY0QycsXG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgIHN0eWxlOiAnZnVsbCcsXG4gICAgICAgICAgICB2YWx1ZTogMTQwMDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpbWVzOiBbXSxcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgdmFsdWVBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdMZWZ0QXhpcy0xJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0WUV4dGVudHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvdW50JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdSaWdodEF4aXMtMScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRZRXh0ZW50czogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgc2V0WUV4dGVudHM6IHRydWUsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJyUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHJvdzogZmFsc2UsXG4gICAgICAgICAgcmFkaXVzUmF0aW86IDIyLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSAlJzogJyM3RUIyNkQnLFxuICAgICAgICAgICAgJ1F1ZXVlIFVzYWdlIDcwJSc6ICcjRUFCODM5JyxcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSA5MCUnOiAnI0UyNEQ0MicsXG4gICAgICAgICAgICAnU3lzY2hlY2sgRURQUyc6ICcjRDY4M0NFJyxcbiAgICAgICAgICAgICdTeXNjaGVjayBFdmVudHMgRGVjb2RlZCc6ICcjNzBEQkVEJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICB2ZXJzaW9uOiAxLFxuICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgIHNlYXJjaFNvdXJjZUpTT046IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpbmRleDogJ3dhenVoLXN0YXRpc3RpY3MtKicsXG4gICAgICAgICAgZmlsdGVyOiBbXSxcbiAgICAgICAgICBxdWVyeTogeyBxdWVyeTogJycsIGxhbmd1YWdlOiAnbHVjZW5lJyB9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIF9pZDogJ1dhenVoLUFwcC1TdGF0aXN0aWNzLUFuYWx5c2lzZC1TeXNjb2xsZWN0b3InLFxuICAgIF90eXBlOiAndmlzdWFsaXphdGlvbicsXG4gICAgX3NvdXJjZToge1xuICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBTeXNjb2xsZWN0b3InLFxuICAgICAgdmlzU3RhdGU6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBTeXNjb2xsZWN0b3InLFxuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIGFnZ3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnN5c2NvbGxlY3Rvcl9ldmVudHNfZGVjb2RlZCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnU3lzY29sbGVjdG9yIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZV9oaXN0b2dyYW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgdGltZVJhbmdlOiB7XG4gICAgICAgICAgICAgICAgZnJvbTogJ25vdy0yNGgnLFxuICAgICAgICAgICAgICAgIHRvOiAnbm93JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXNlTm9ybWFsaXplZE9wZW5TZWFyY2hJbnRlcnZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NhbGVNZXRyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ2F1dG8nLFxuICAgICAgICAgICAgICBkcm9wX3BhcnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWluX2RvY19jb3VudDogMSxcbiAgICAgICAgICAgICAgZXh0ZW5kZWRfYm91bmRzOiB7fSxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ3NlZ21lbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfZWRwcycsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnU3lzY29sbGVjdG9yIEVEUFMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIFVzYWdlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc3JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwiZGVmIHNpemUgPSBkb2NbXFwnYW5hbHlzaXNkLnN5c2NvbGxlY3Rvcl9xdWV1ZV9zaXplXFwnXTtkZWYgdXNhZ2UgPSBkb2NbXFwnYW5hbHlzaXNkLnN5c2NvbGxlY3Rvcl9xdWV1ZV91c2FnZVxcJ107ZGVmIGZpbmFsU2l6ZSA9IHNpemUuc2l6ZSgpID4gMCA/IHNpemUudmFsdWUgOiAwO2RlZiBmaW5hbFVzYWdlID0gdXNhZ2Uuc2l6ZSgpID4gMCA/IHVzYWdlLnZhbHVlIDogMDtyZXR1cm4gZmluYWxVc2FnZS9maW5hbFNpemUgKiAxMDA7XCJcXHJcXG4gIH1cXHJcXG59JyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdRdWV1ZSBVc2FnZSAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwicmV0dXJuIDcwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgNzAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc2JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwicmV0dXJuIDkwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgOTAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3lzY29sbGVjdG9yX3F1ZXVlX3NpemUnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfc2l6ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlMaW5lczogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYXRlZ29yeUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdDYXRlZ29yeUF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdmFsdWVBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBuYW1lOiAnTGVmdEF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb3VudCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgbmFtZTogJ1JpZ2h0QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBzZXRZRXh0ZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICclJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzZXJpZXNQYXJhbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3lzY29sbGVjdG9yIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3lzY29sbGVjdG9yIEVEUFMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzcnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UgJScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UgNzAlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSA5MCUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMicsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2FuYWx5c2lzZC5zeXNjb2xsZWN0b3JfcXVldWVfc2l6ZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZFRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgYWRkTGVnZW5kOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHRpbWVzOiBbXSxcbiAgICAgICAgICBhZGRUaW1lTWFya2VyOiBmYWxzZSxcbiAgICAgICAgICBsYWJlbHM6IHt9LFxuICAgICAgICAgIHRocmVzaG9sZExpbmU6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBzdHlsZTogJ2Z1bGwnLFxuICAgICAgICAgICAgY29sb3I6ICcjRTc2NjRDJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSAlJzogJyM3RUIyNkQnLFxuICAgICAgICAgICAgJ1F1ZXVlIFVzYWdlIDcwJSc6ICcjRUFCODM5JyxcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSA5MCUnOiAnI0UyNEQ0MicsXG4gICAgICAgICAgICAnU3lzY29sbGVjdG9yIEVEUFMnOiAnI0Q2ODNDRScsXG4gICAgICAgICAgICAnU3lzY29sbGVjdG9yIEV2ZW50cyBEZWNvZGVkJzogJyM3MERCRUQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIHZlcnNpb246IDEsXG4gICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgc2VhcmNoU291cmNlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGluZGV4OiAnd2F6dWgtc3RhdGlzdGljcy0qJyxcbiAgICAgICAgICBmaWx0ZXI6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiB7IHF1ZXJ5OiAnJywgbGFuZ3VhZ2U6ICdsdWNlbmUnIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgX2lkOiAnV2F6dWgtQXBwLVN0YXRpc3RpY3MtQW5hbHlzaXNkLVJvb3RjaGVjaycsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIFJvb3RjaGVjaycsXG4gICAgICB2aXNTdGF0ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIFJvb3RjaGVjaycsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgYWdnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Qucm9vdGNoZWNrX2V2ZW50c19kZWNvZGVkJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdSb290Y2hlY2sgRXZlbnRzIERlY29kZWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnJvb3RjaGVja19lZHBzJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdSb290Y2hlY2sgRURQUycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Qucm9vdGNoZWNrX3F1ZXVlX3VzYWdlJyxcbiAgICAgICAgICAgICAganNvbjogJ3tcXHJcXG4gIFwic2NyaXB0XCI6IHtcXHJcXG4gICAgICBcInNvdXJjZVwiOiBcImRlZiBzaXplID0gZG9jW1xcJ2FuYWx5c2lzZC5yb290Y2hlY2tfcXVldWVfc2l6ZVxcJ107ZGVmIHVzYWdlID0gZG9jW1xcJ2FuYWx5c2lzZC5yb290Y2hlY2tfcXVldWVfdXNhZ2VcXCddO2RlZiBmaW5hbFNpemUgPSBzaXplLnNpemUoKSA+IDAgPyBzaXplLnZhbHVlIDogMDtkZWYgZmluYWxVc2FnZSA9IHVzYWdlLnNpemUoKSA+IDAgPyB1c2FnZS52YWx1ZSA6IDA7cmV0dXJuIGZpbmFsVXNhZ2UvZmluYWxTaXplICogMTAwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNCcsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Qucm9vdGNoZWNrX3F1ZXVlX3VzYWdlJyxcbiAgICAgICAgICAgICAganNvbjogJ3tcXHJcXG4gIFwic2NyaXB0XCI6IHtcXHJcXG4gICAgICBcInNvdXJjZVwiOiBcInJldHVybiA3MDtcIlxcclxcbiAgfVxcclxcbn0nLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIHVzYWdlIDcwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Qucm9vdGNoZWNrX3F1ZXVlX3VzYWdlJyxcbiAgICAgICAgICAgICAganNvbjogJ3tcXHJcXG4gIFwic2NyaXB0XCI6IHtcXHJcXG4gICAgICBcInNvdXJjZVwiOiBcInJldHVybiA5MDtcIlxcclxcbiAgfVxcclxcbn0nLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIHVzYWdlIDkwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2RhdGVfaGlzdG9ncmFtJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICAgIHRpbWVSYW5nZToge1xuICAgICAgICAgICAgICAgIGZyb206ICdub3ctMjRoJyxcbiAgICAgICAgICAgICAgICB0bzogJ25vdycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHVzZU5vcm1hbGl6ZWRPcGVuU2VhcmNoSW50ZXJ2YWw6IHRydWUsXG4gICAgICAgICAgICAgIHNjYWxlTWV0cmljVmFsdWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWw6ICdhdXRvJyxcbiAgICAgICAgICAgICAgZHJvcF9wYXJ0aWFsczogZmFsc2UsXG4gICAgICAgICAgICAgIG1pbl9kb2NfY291bnQ6IDEsXG4gICAgICAgICAgICAgIGV4dGVuZGVkX2JvdW5kczoge30sXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdzZWdtZW50JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlMaW5lczogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYXRlZ29yeUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdDYXRlZ29yeUF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdmFsdWVBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBuYW1lOiAnTGVmdEF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb3VudCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgbmFtZTogJ1JpZ2h0QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBzZXRZRXh0ZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICclJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzZXJpZXNQYXJhbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnUm9vdGNoZWNrIEV2ZW50cyBEZWNvZGVkJyxcbiAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUm9vdGNoZWNrIEVEUFMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgVXNhZ2UgJScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVldWUgdXNhZ2UgNzAlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSB1c2FnZSA5MCUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMicsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkVG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICBhZGRMZWdlbmQ6IHRydWUsXG4gICAgICAgICAgbGVnZW5kUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgdGltZXM6IFtdLFxuICAgICAgICAgIGFkZFRpbWVNYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIGxhYmVsczoge30sXG4gICAgICAgICAgdGhyZXNob2xkTGluZToge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMTAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIHN0eWxlOiAnZnVsbCcsXG4gICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHVpU3RhdGVKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZpczoge1xuICAgICAgICAgIGNvbG9yczoge1xuICAgICAgICAgICAgJ1F1ZXVlIFVzYWdlICUnOiAnIzdFQjI2RCcsXG4gICAgICAgICAgICAnUXVldWUgdXNhZ2UgNzAlJzogJyNFQUI4MzknLFxuICAgICAgICAgICAgJ1F1ZXVlIHVzYWdlIDkwJSc6ICcjRTI0RDQyJyxcbiAgICAgICAgICAgICdSb290Y2hlY2sgRURQUyc6ICcjRDY4M0NFJyxcbiAgICAgICAgICAgICdSb290Y2hlY2sgRXZlbnRzIERlY29kZWQnOiAnIzcwREJFRCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6ICd3YXp1aC1zdGF0aXN0aWNzLSonLFxuICAgICAgICAgIGZpbHRlcjogW10sXG4gICAgICAgICAgcXVlcnk6IHsgcXVlcnk6ICcnLCBsYW5ndWFnZTogJ2x1Y2VuZScgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBfaWQ6ICdXYXp1aC1BcHAtU3RhdGlzdGljcy1BbmFseXNpc2QtU0NBJyxcbiAgICBfdHlwZTogJ3Zpc3VhbGl6YXRpb24nLFxuICAgIF9zb3VyY2U6IHtcbiAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgU0NBJyxcbiAgICAgIHZpc1N0YXRlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgU0NBJyxcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBhZ2dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zY2FfZXZlbnRzX2RlY29kZWQnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1NDQSBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc2NhX2VkcHMnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1NDQSBFRFBTJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zY2FfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwiZGVmIHNpemUgPSBkb2NbXFwnYW5hbHlzaXNkLnNjYV9xdWV1ZV9zaXplXFwnXTtkZWYgdXNhZ2UgPSBkb2NbXFwnYW5hbHlzaXNkLnNjYV9xdWV1ZV91c2FnZVxcJ107ZGVmIGZpbmFsU2l6ZSA9IHNpemUuc2l6ZSgpID4gMCA/IHNpemUudmFsdWUgOiAwO2RlZiBmaW5hbFVzYWdlID0gdXNhZ2Uuc2l6ZSgpID4gMCA/IHVzYWdlLnZhbHVlIDogMDtyZXR1cm4gZmluYWxVc2FnZS9maW5hbFNpemUgKiAxMDA7XCJcXHJcXG4gIH1cXHJcXG59JyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdRdWV1ZSBVc2FnZSAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc0JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zY2FfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwicmV0dXJuIDcwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgNzAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5zY2FfcXVldWVfdXNhZ2UnLFxuICAgICAgICAgICAgICBqc29uOiAne1xcclxcbiAgXCJzY3JpcHRcIjoge1xcclxcbiAgICAgIFwic291cmNlXCI6IFwicmV0dXJuIDkwO1wiXFxyXFxuICB9XFxyXFxufScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUXVldWUgVXNhZ2UgOTAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc2JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZV9oaXN0b2dyYW0nLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgdGltZVJhbmdlOiB7XG4gICAgICAgICAgICAgICAgZnJvbTogJ25vdy0yNGgnLFxuICAgICAgICAgICAgICAgIHRvOiAnbm93JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXNlTm9ybWFsaXplZE9wZW5TZWFyY2hJbnRlcnZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NhbGVNZXRyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ2F1dG8nLFxuICAgICAgICAgICAgICBkcm9wX3BhcnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWluX2RvY19jb3VudDogMSxcbiAgICAgICAgICAgICAgZXh0ZW5kZWRfYm91bmRzOiB7fSxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ3NlZ21lbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmVzOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhdGVnb3J5QXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ0NhdGVnb3J5QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB2YWx1ZUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIG5hbWU6ICdMZWZ0QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvdW50JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgICBuYW1lOiAnUmlnaHRBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIHNldFlFeHRlbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJyUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTQ0EgRXZlbnRzIERlY29kZWQnLFxuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTQ0EgRURQUycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSAlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSA3MCUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMicsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1F1ZXVlIFVzYWdlIDkwJScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhZGRUb29sdGlwOiB0cnVlLFxuICAgICAgICAgIGFkZExlZ2VuZDogdHJ1ZSxcbiAgICAgICAgICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICB0aW1lczogW10sXG4gICAgICAgICAgYWRkVGltZU1hcmtlcjogZmFsc2UsXG4gICAgICAgICAgbGFiZWxzOiB7fSxcbiAgICAgICAgICB0aHJlc2hvbGRMaW5lOiB7XG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAxMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgc3R5bGU6ICdmdWxsJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI0U3NjY0QycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgdWlTdGF0ZUpTT046IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmlzOiB7XG4gICAgICAgICAgY29sb3JzOiB7XG4gICAgICAgICAgICAnUXVldWUgVXNhZ2UgJSc6ICcjN0VCMjZEJyxcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSA3MCUnOiAnI0VBQjgzOScsXG4gICAgICAgICAgICAnUXVldWUgVXNhZ2UgOTAlJzogJyNFMjRENDInLFxuICAgICAgICAgICAgJ1NDQSBFRFBTJzogJyNENjgzQ0UnLFxuICAgICAgICAgICAgJ1NDQSBFdmVudHMgRGVjb2RlZCc6ICcjNzBEQkVEJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxlZ2VuZE9wZW46IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIHZlcnNpb246IDEsXG4gICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgc2VhcmNoU291cmNlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGluZGV4OiAnd2F6dWgtc3RhdGlzdGljcy0qJyxcbiAgICAgICAgICBmaWx0ZXI6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiB7IHF1ZXJ5OiAnJywgbGFuZ3VhZ2U6ICdsdWNlbmUnIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgX2lkOiAnV2F6dWgtQXBwLVN0YXRpc3RpY3MtQW5hbHlzaXNkLUhvc3RJbmZvJyxcbiAgICBfdHlwZTogJ3Zpc3VhbGl6YXRpb24nLFxuICAgIF9zb3VyY2U6IHtcbiAgICAgIHRpdGxlOiAnV2F6dWggQXBwIFN0YXRpc3RpY3MgSG9zdEluZm8nLFxuICAgICAgdmlzU3RhdGU6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBIb3N0SW5mbycsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgYWdnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2QuaG9zdGluZm9fZXZlbnRzX2RlY29kZWQnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ0hvc3QgaW5mbyBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2QuaG9zdGluZm9fZWRwcycsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnSG9zdCBpbmZvIEVEUFMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLmhvc3RpbmZvX3F1ZXVlX3VzYWdlJyxcbiAgICAgICAgICAgICAganNvbjogJ3tcXHJcXG4gIFwic2NyaXB0XCI6IHtcXHJcXG4gICAgICBcInNvdXJjZVwiOiBcImRlZiBzaXplID0gZG9jW1xcJ2FuYWx5c2lzZC5ob3N0aW5mb19xdWV1ZV9zaXplXFwnXTtkZWYgdXNhZ2UgPSBkb2NbXFwnYW5hbHlzaXNkLmhvc3RpbmZvX3F1ZXVlX3VzYWdlXFwnXTtkZWYgZmluYWxTaXplID0gc2l6ZS5zaXplKCkgPiAwID8gc2l6ZS52YWx1ZSA6IDA7ZGVmIGZpbmFsVXNhZ2UgPSB1c2FnZS5zaXplKCkgPiAwID8gdXNhZ2UudmFsdWUgOiAwO3JldHVybiBmaW5hbFVzYWdlL2ZpbmFsU2l6ZSAqIDEwMDtcIlxcclxcbiAgfVxcclxcbn0nLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIFVzYWdlICUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlX2hpc3RvZ3JhbScsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgICB0aW1lUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAnbm93LTI0aCcsXG4gICAgICAgICAgICAgICAgdG86ICdub3cnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1c2VOb3JtYWxpemVkT3BlblNlYXJjaEludGVydmFsOiB0cnVlLFxuICAgICAgICAgICAgICBzY2FsZU1ldHJpY1ZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnYXV0bycsXG4gICAgICAgICAgICAgIGRyb3BfcGFydGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtaW5fZG9jX2NvdW50OiAxLFxuICAgICAgICAgICAgICBleHRlbmRlZF9ib3VuZHM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ3NlZ21lbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5ob3N0aW5mb19xdWV1ZV91c2FnZScsXG4gICAgICAgICAgICAgIGpzb246ICd7XFxyXFxuICBcInNjcmlwdFwiOiB7XFxyXFxuICAgICAgXCJzb3VyY2VcIjogXCJyZXR1cm4gNzA7XCJcXHJcXG4gIH1cXHJcXG59JyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdRdWV1ZSBVc2FnZSA3MCUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzYnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLmhvc3RpbmZvX3F1ZXVlX3VzYWdlJyxcbiAgICAgICAgICAgICAganNvbjogJ3tcXHJcXG4gIFwic2NyaXB0XCI6IHtcXHJcXG4gICAgICBcInNvdXJjZVwiOiBcInJldHVybiA5MDtcIlxcclxcbiAgfVxcclxcbn0nLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ1F1ZXVlIFVzYWdlIDkwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBhZGRMZWdlbmQ6IHRydWUsXG4gICAgICAgICAgYWRkVGltZU1hcmtlcjogZmFsc2UsXG4gICAgICAgICAgYWRkVG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICBjYXRlZ29yeUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdDYXRlZ29yeUF4aXMtMScsXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICB0aXRsZToge30sXG4gICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlMaW5lczogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbHM6IHt9LFxuICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb2xvcjogJyMwMDAwRkYnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvc3QgaW5mbyBFdmVudHMgRGVjb2RlZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjMDAwMEZGJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3N0IGluZm8gRURQUycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjMDAwMEZGJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSAlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogZmFsc2UsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjRkZDQzExJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSA3MCUnLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNGRkNDMTEnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnI0ZGQ0MxMScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjRTc2NjRDJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWV1ZSBVc2FnZSA5MCUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0yJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aHJlc2hvbGRMaW5lOiB7XG4gICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICBzdHlsZTogJ2Z1bGwnLFxuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lczogW10sXG4gICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgIHZhbHVlQXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnTGVmdEF4aXMtMScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ291bnQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdWYWx1ZUF4aXMtMicsXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ1JpZ2h0QXhpcy0xJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgc2V0WUV4dGVudHM6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHVpU3RhdGVKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZpczoge1xuICAgICAgICAgIGNvbG9yczoge1xuICAgICAgICAgICAgJ0hvc3QgaW5mbyBFRFBTJzogJyNENjgzQ0UnLFxuICAgICAgICAgICAgJ0hvc3QgaW5mbyBFdmVudHMgRGVjb2RlZCc6ICcjNzBEQkVEJyxcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSAlJzogJyM3RUIyNkQnLFxuICAgICAgICAgICAgJ1F1ZXVlIFVzYWdlIDcwJSc6ICcjRUFCODM5JyxcbiAgICAgICAgICAgICdRdWV1ZSBVc2FnZSA5MCUnOiAnI0UyNEQ0MicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6ICd3YXp1aC1zdGF0aXN0aWNzLSonLFxuICAgICAgICAgIGZpbHRlcjogW10sXG4gICAgICAgICAgcXVlcnk6IHsgcXVlcnk6ICcnLCBsYW5ndWFnZTogJ2x1Y2VuZScgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBfaWQ6ICdXYXp1aC1BcHAtU3RhdGlzdGljcy1BbmFseXNpc2QtRXZlbnRzLUJ5LU5vZGUnLFxuICAgIF90eXBlOiAndmlzdWFsaXphdGlvbicsXG4gICAgX3NvdXJjZToge1xuICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBFdmVudHMgYnkgTm9kZScsXG4gICAgICB2aXNTdGF0ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIEV2ZW50cyBieSBOb2RlJyxcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBhZ2dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnc3VtJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5ldmVudHNfcHJvY2Vzc2VkJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2RhdGVfaGlzdG9ncmFtJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICAgIHRpbWVSYW5nZToge1xuICAgICAgICAgICAgICAgIGZyb206ICdub3ctMzBtJyxcbiAgICAgICAgICAgICAgICB0bzogJ25vdycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHVzZU5vcm1hbGl6ZWRPcGVuU2VhcmNoSW50ZXJ2YWw6IHRydWUsXG4gICAgICAgICAgICAgIHNjYWxlTWV0cmljVmFsdWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWw6ICdhdXRvJyxcbiAgICAgICAgICAgICAgZHJvcF9wYXJ0aWFsczogZmFsc2UsXG4gICAgICAgICAgICAgIG1pbl9kb2NfY291bnQ6IDEsXG4gICAgICAgICAgICAgIGV4dGVuZGVkX2JvdW5kczoge30sXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdzZWdtZW50JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNCcsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2ZpbHRlcnMnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpbHRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogJ2FuYWx5c2lzZC5ldmVudHNfcHJvY2Vzc2VkOionLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogJ2t1ZXJ5JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ0V2ZW50cyBwcm9jZXNzZWQgYnkgTm9kZTonLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnZ3JvdXAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAndGVybXMnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnbm9kZU5hbWUua2V5d29yZCcsXG4gICAgICAgICAgICAgIG9yZGVyQnk6ICcxJyxcbiAgICAgICAgICAgICAgb3JkZXI6ICdkZXNjJyxcbiAgICAgICAgICAgICAgc2l6ZTogNSxcbiAgICAgICAgICAgICAgb3RoZXJCdWNrZXQ6IGZhbHNlLFxuICAgICAgICAgICAgICBvdGhlckJ1Y2tldExhYmVsOiAnT3RoZXInLFxuICAgICAgICAgICAgICBtaXNzaW5nQnVja2V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgbWlzc2luZ0J1Y2tldExhYmVsOiAnTWlzc2luZycsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdncm91cCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TGluZXM6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYXRlZ29yeUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdDYXRlZ29yeUF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdmFsdWVBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBuYW1lOiAnTGVmdEF4aXMtMScsXG4gICAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cnVuY2F0ZTogMTAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb3VudCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgc2VyaWVzUGFyYW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvdW50JyxcbiAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhZGRUb29sdGlwOiB0cnVlLFxuICAgICAgICAgIGFkZExlZ2VuZDogdHJ1ZSxcbiAgICAgICAgICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICB0aW1lczogW10sXG4gICAgICAgICAgYWRkVGltZU1hcmtlcjogZmFsc2UsXG4gICAgICAgICAgbGFiZWxzOiB7fSxcbiAgICAgICAgICB0aHJlc2hvbGRMaW5lOiB7XG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAxMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgc3R5bGU6ICdmdWxsJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI0U3NjY0QycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6ICd3YXp1aC1zdGF0aXN0aWNzLSonLFxuICAgICAgICAgIGZpbHRlcjogW10sXG4gICAgICAgICAgcXVlcnk6IHsgcXVlcnk6ICcnLCBsYW5ndWFnZTogJ2x1Y2VuZScgfSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBfaWQ6ICdXYXp1aC1BcHAtU3RhdGlzdGljcy1BbmFseXNpc2QtRXZlbnRzLURyb3BwZWQtQnktTm9kZScsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIEV2ZW50cyBEcm9wcGVkIGJ5IE5vZGUnLFxuICAgICAgdmlzU3RhdGU6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGl0bGU6ICdXYXp1aCBBcHAgU3RhdGlzdGljcyBFdmVudHMgRHJvcHBlZCBieSBOb2RlJyxcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBhZ2dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnc3VtJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5ldmVudHNfZHJvcHBlZCcsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlX2hpc3RvZ3JhbScsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgICB0aW1lUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAnbm93LTMwbScsXG4gICAgICAgICAgICAgICAgdG86ICdub3cnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1c2VOb3JtYWxpemVkT3BlblNlYXJjaEludGVydmFsOiB0cnVlLFxuICAgICAgICAgICAgICBzY2FsZU1ldHJpY1ZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnYXV0bycsXG4gICAgICAgICAgICAgIGRyb3BfcGFydGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtaW5fZG9jX2NvdW50OiAxLFxuICAgICAgICAgICAgICBleHRlbmRlZF9ib3VuZHM6IHt9LFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnc2VnbWVudCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdmaWx0ZXJzJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWx0ZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6ICdhbmFseXNpc2QuZXZlbnRzX2Ryb3BwZWQ6KicsXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAna3VlcnknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRXZlbnRzIGRyb3BwZWQgYnkgTm9kZTonLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnZ3JvdXAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc0JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAndGVybXMnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnbm9kZU5hbWUua2V5d29yZCcsXG4gICAgICAgICAgICAgIG9yZGVyQnk6ICcxJyxcbiAgICAgICAgICAgICAgb3JkZXI6ICdkZXNjJyxcbiAgICAgICAgICAgICAgc2l6ZTogNSxcbiAgICAgICAgICAgICAgb3RoZXJCdWNrZXQ6IGZhbHNlLFxuICAgICAgICAgICAgICBvdGhlckJ1Y2tldExhYmVsOiAnT3RoZXInLFxuICAgICAgICAgICAgICBtaXNzaW5nQnVja2V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgbWlzc2luZ0J1Y2tldExhYmVsOiAnTWlzc2luZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnZ3JvdXAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUxpbmVzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2F0ZWdvcnlBeGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQ2F0ZWdvcnlBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHZhbHVlQXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0xlZnRBeGlzLTEnLFxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJ1bmNhdGU6IDEwMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ291bnQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlcmllc1BhcmFtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkVG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICBhZGRMZWdlbmQ6IHRydWUsXG4gICAgICAgICAgbGVnZW5kUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgdGltZXM6IFtdLFxuICAgICAgICAgIGFkZFRpbWVNYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIGxhYmVsczoge30sXG4gICAgICAgICAgdGhyZXNob2xkTGluZToge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMTAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIHN0eWxlOiAnZnVsbCcsXG4gICAgICAgICAgICBjb2xvcjogJyNFNzY2NEMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIHZlcnNpb246IDEsXG4gICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgc2VhcmNoU291cmNlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGluZGV4OiAnd2F6dWgtc3RhdGlzdGljcy0qJyxcbiAgICAgICAgICBmaWx0ZXI6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiB7IHF1ZXJ5OiAnJywgbGFuZ3VhZ2U6ICdsdWNlbmUnIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgX2lkOiAnV2F6dWgtQXBwLVN0YXRpc3RpY3MtQW5hbHlzaXNkLVF1ZXVlcy1Vc2FnZScsXG4gICAgX3R5cGU6ICd2aXN1YWxpemF0aW9uJyxcbiAgICBfc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIFF1ZXVlcyBVc2FnZScsXG4gICAgICB2aXNTdGF0ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0aXRsZTogJ1dhenVoIEFwcCBTdGF0aXN0aWNzIFF1ZXVlcyBVc2FnZScsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgYWdnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6ICdjb3VudCcsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdDb3VudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2RhdGVfaGlzdG9ncmFtJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ3RpbWVzdGFtcCcsXG4gICAgICAgICAgICAgIHRpbWVSYW5nZToge1xuICAgICAgICAgICAgICAgIGZyb206ICdub3ctMzBtJyxcbiAgICAgICAgICAgICAgICB0bzogJ25vdycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHVzZU5vcm1hbGl6ZWRPcGVuU2VhcmNoSW50ZXJ2YWw6IHRydWUsXG4gICAgICAgICAgICAgIHNjYWxlTWV0cmljVmFsdWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWw6ICdhdXRvJyxcbiAgICAgICAgICAgICAgZHJvcF9wYXJ0aWFsczogZmFsc2UsXG4gICAgICAgICAgICAgIG1pbl9kb2NfY291bnQ6IDEsXG4gICAgICAgICAgICAgIGV4dGVuZGVkX2JvdW5kczoge30sXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAndGltZXN0YW1wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdzZWdtZW50JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2QuZXZlbnRfcXVldWVfc2l6ZScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnRXZlbnQgcXVldWUgdXNhZ2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzQnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLnJ1bGVfbWF0Y2hpbmdfcXVldWVfc2l6ZScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnUnVsZSBtYXRjaGluZyBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNScsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2QuYWxlcnRzX3F1ZXVlX3NpemUnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ0FsZXJ0cyBsb2cgcXVldWUgdXNhZ2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjaGVtYTogJ21ldHJpYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJzYnLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdhdmcnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnYW5hbHlzaXNkLmZpcmV3YWxsX3F1ZXVlX3NpemUnLFxuICAgICAgICAgICAgICBjdXN0b21MYWJlbDogJ0ZpcmV3YWxsIGxvZyBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnNycsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2F2ZycsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdhbmFseXNpc2Quc3RhdGlzdGljYWxfcXVldWVfc2l6ZScsXG4gICAgICAgICAgICAgIGN1c3RvbUxhYmVsOiAnU3RhdGlzdGljYWwgbG9nIHF1ZXVlIHVzYWdlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hlbWE6ICdtZXRyaWMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICc4JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnYXZnJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJ2FuYWx5c2lzZC5hcmNoaXZlc19xdWV1ZV9zaXplJyxcbiAgICAgICAgICAgICAgY3VzdG9tTGFiZWw6ICdBcmNoaXZlcyBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NoZW1hOiAnbWV0cmljJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgY2F0ZWdvcnlMaW5lczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhdGVnb3J5QXhlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ0NhdGVnb3J5QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB2YWx1ZUF4ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIG5hbWU6ICdMZWZ0QXhpcy0xJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRydW5jYXRlOiAxMDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvdW50JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzZXJpZXNQYXJhbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ291bnQnLFxuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFdmVudCBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnNCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSdWxlIG1hdGNoaW5nIHF1ZXVlIHVzYWdlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc1JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FsZXJ0cyBsb2cgcXVldWUgdXNhZ2UnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZUF4aXM6ICdWYWx1ZUF4aXMtMScsXG4gICAgICAgICAgICAgIGRyYXdMaW5lc0JldHdlZW5Qb2ludHM6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgaW50ZXJwb2xhdGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgICBzaG93Q2lyY2xlczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCcsXG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzYnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRmlyZXdhbGwgbG9nIHF1ZXVlIHVzYWdlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWVBeGlzOiAnVmFsdWVBeGlzLTEnLFxuICAgICAgICAgICAgICBkcmF3TGluZXNCZXR3ZWVuUG9pbnRzOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGludGVycG9sYXRlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgc2hvd0NpcmNsZXM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgIG1vZGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc3JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N0YXRpc3RpY2FsIGxvZyBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICBtb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiAnOCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBcmNoaXZlcyBxdWV1ZSB1c2FnZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZhbHVlQXhpczogJ1ZhbHVlQXhpcy0xJyxcbiAgICAgICAgICAgICAgZHJhd0xpbmVzQmV0d2VlblBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgIHNob3dDaXJjbGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZFRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgYWRkTGVnZW5kOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHRpbWVzOiBbXSxcbiAgICAgICAgICBhZGRUaW1lTWFya2VyOiBmYWxzZSxcbiAgICAgICAgICBsYWJlbHM6IHt9LFxuICAgICAgICAgIHRocmVzaG9sZExpbmU6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBzdHlsZTogJ2Z1bGwnLFxuICAgICAgICAgICAgY29sb3I6ICcjRTc2NjRDJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB1aVN0YXRlSlNPTjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2aXM6IHtcbiAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICdBbGVydHMgbG9nIHF1ZXVlIHVzYWdlJzogJyM3RUIyNkQnLFxuICAgICAgICAgICAgJ0FyY2hpdmVzIHF1ZXVlIHVzYWdlJzogJyNFRjg0M0MnLFxuICAgICAgICAgICAgJ0V2ZW50IHF1ZXVlIHVzYWdlJzogJyM3MERCRUQnLFxuICAgICAgICAgICAgJ0ZpcmV3YWxsIGxvZyBxdWV1ZSB1c2FnZSc6ICcjRUFCODM5JyxcbiAgICAgICAgICAgICdSdWxlIG1hdGNoaW5nIHF1ZXVlIHVzYWdlJzogJyNENjgzQ0UnLFxuICAgICAgICAgICAgJ1N0YXRpc3RpY2FsIGxvZyBxdWV1ZSB1c2FnZSc6ICcjNzA1REEwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICB2ZXJzaW9uOiAxLFxuICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgIHNlYXJjaFNvdXJjZUpTT046IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpbmRleDogJ3dhenVoLXN0YXRpc3RpY3MtKicsXG4gICAgICAgICAgZmlsdGVyOiBbXSxcbiAgICAgICAgICBxdWVyeTogeyBxdWVyeTogJycsIGxhbmd1YWdlOiAnbHVjZW5lJyB9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbl07XG4iXX0=