"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginPlatformTemplate = void 0;

/*
 * Wazuh app - Module for Kibana template
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const pluginPlatformTemplate = {
  order: 0,
  template: '.kibana*',
  settings: {
    'index.refresh_interval': '5s'
  },
  mappings: {
    properties: {
      type: {
        type: 'keyword'
      },
      updated_at: {
        type: 'date'
      },
      config: {
        properties: {
          buildNum: {
            type: 'keyword'
          }
        }
      },
      'index-pattern': {
        properties: {
          fieldFormatMap: {
            type: 'text'
          },
          fields: {
            type: 'text'
          },
          intervalName: {
            type: 'keyword'
          },
          notExpandable: {
            type: 'boolean'
          },
          sourceFilters: {
            type: 'text'
          },
          timeFieldName: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          }
        }
      },
      visualization: {
        properties: {
          description: {
            type: 'text'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          savedSearchId: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          uiStateJSON: {
            type: 'text'
          },
          version: {
            type: 'integer'
          },
          visState: {
            type: 'text'
          }
        }
      },
      search: {
        properties: {
          columns: {
            type: 'keyword'
          },
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          sort: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      dashboard: {
        properties: {
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          optionsJSON: {
            type: 'text'
          },
          panelsJSON: {
            type: 'text'
          },
          refreshInterval: {
            properties: {
              display: {
                type: 'keyword'
              },
              pause: {
                type: 'boolean'
              },
              section: {
                type: 'integer'
              },
              value: {
                type: 'integer'
              }
            }
          },
          timeFrom: {
            type: 'keyword'
          },
          timeRestore: {
            type: 'boolean'
          },
          timeTo: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          uiStateJSON: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      url: {
        properties: {
          accessCount: {
            type: 'long'
          },
          accessDate: {
            type: 'date'
          },
          createDate: {
            type: 'date'
          },
          url: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
                ignore_above: 2048
              }
            }
          }
        }
      },
      server: {
        properties: {
          uuid: {
            type: 'keyword'
          }
        }
      },
      'timelion-sheet': {
        properties: {
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          timelion_chart_height: {
            type: 'integer'
          },
          timelion_columns: {
            type: 'integer'
          },
          timelion_interval: {
            type: 'keyword'
          },
          timelion_other_interval: {
            type: 'keyword'
          },
          timelion_rows: {
            type: 'integer'
          },
          timelion_sheet: {
            type: 'text'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      'graph-workspace': {
        properties: {
          description: {
            type: 'text'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          numLinks: {
            type: 'integer'
          },
          numVertices: {
            type: 'integer'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          },
          wsState: {
            type: 'text'
          }
        }
      }
    }
  }
};
exports.pluginPlatformTemplate = pluginPlatformTemplate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtpYmFuYS10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6WyJwbHVnaW5QbGF0Zm9ybVRlbXBsYXRlIiwib3JkZXIiLCJ0ZW1wbGF0ZSIsInNldHRpbmdzIiwibWFwcGluZ3MiLCJwcm9wZXJ0aWVzIiwidHlwZSIsInVwZGF0ZWRfYXQiLCJjb25maWciLCJidWlsZE51bSIsImZpZWxkRm9ybWF0TWFwIiwiZmllbGRzIiwiaW50ZXJ2YWxOYW1lIiwibm90RXhwYW5kYWJsZSIsInNvdXJjZUZpbHRlcnMiLCJ0aW1lRmllbGROYW1lIiwidGl0bGUiLCJ2aXN1YWxpemF0aW9uIiwiZGVzY3JpcHRpb24iLCJraWJhbmFTYXZlZE9iamVjdE1ldGEiLCJzZWFyY2hTb3VyY2VKU09OIiwic2F2ZWRTZWFyY2hJZCIsInVpU3RhdGVKU09OIiwidmVyc2lvbiIsInZpc1N0YXRlIiwic2VhcmNoIiwiY29sdW1ucyIsImhpdHMiLCJzb3J0IiwiZGFzaGJvYXJkIiwib3B0aW9uc0pTT04iLCJwYW5lbHNKU09OIiwicmVmcmVzaEludGVydmFsIiwiZGlzcGxheSIsInBhdXNlIiwic2VjdGlvbiIsInZhbHVlIiwidGltZUZyb20iLCJ0aW1lUmVzdG9yZSIsInRpbWVUbyIsInVybCIsImFjY2Vzc0NvdW50IiwiYWNjZXNzRGF0ZSIsImNyZWF0ZURhdGUiLCJrZXl3b3JkIiwiaWdub3JlX2Fib3ZlIiwic2VydmVyIiwidXVpZCIsInRpbWVsaW9uX2NoYXJ0X2hlaWdodCIsInRpbWVsaW9uX2NvbHVtbnMiLCJ0aW1lbGlvbl9pbnRlcnZhbCIsInRpbWVsaW9uX290aGVyX2ludGVydmFsIiwidGltZWxpb25fcm93cyIsInRpbWVsaW9uX3NoZWV0IiwibnVtTGlua3MiLCJudW1WZXJ0aWNlcyIsIndzU3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTUEsc0JBQXNCLEdBQUc7QUFD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QUFJLEVBQUU7QUFEQyxXQXBCQztBQXVCVmtELFVBQUFBLE9BQU8sRUFBRTtBQUNQbEQsWUFBQUEsSUFBSSxFQUFFO0FBREM7QUF2QkM7QUFESztBQWhPVDtBQURKO0FBTjBCLENBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIE1vZHVsZSBmb3IgS2liYW5hIHRlbXBsYXRlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHBsdWdpblBsYXRmb3JtVGVtcGxhdGUgPSB7XG4gIG9yZGVyOiAwLFxuICB0ZW1wbGF0ZTogJy5raWJhbmEqJyxcbiAgc2V0dGluZ3M6IHtcbiAgICAnaW5kZXgucmVmcmVzaF9pbnRlcnZhbCc6ICc1cydcbiAgfSxcbiAgbWFwcGluZ3M6IHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZWRfYXQ6IHtcbiAgICAgICAgdHlwZTogJ2RhdGUnXG4gICAgICB9LFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBidWlsZE51bToge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2luZGV4LXBhdHRlcm4nOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBmaWVsZEZvcm1hdE1hcDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaW50ZXJ2YWxOYW1lOiB7XG4gICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5vdEV4cGFuZGFibGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlRmlsdGVyczoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lRmllbGROYW1lOiB7XG4gICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB2aXN1YWxpemF0aW9uOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgc2VhcmNoU291cmNlSlNPTjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzYXZlZFNlYXJjaElkOiB7XG4gICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpU3RhdGVKU09OOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzU3RhdGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgY29sdW1uczoge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoaXRzOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGFzaGJvYXJkOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoaXRzOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGtpYmFuYVNhdmVkT2JqZWN0TWV0YToge1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBzZWFyY2hTb3VyY2VKU09OOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnNKU09OOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhbmVsc0pTT046IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVmcmVzaEludGVydmFsOiB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2VjdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lRnJvbToge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lUmVzdG9yZToge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lVG86IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdWlTdGF0ZUpTT046IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBhY2Nlc3NDb3VudDoge1xuICAgICAgICAgICAgdHlwZTogJ2xvbmcnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY2Nlc3NEYXRlOiB7XG4gICAgICAgICAgICB0eXBlOiAnZGF0ZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNyZWF0ZURhdGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgICAga2V5d29yZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICBpZ25vcmVfYWJvdmU6IDIwNDhcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgdXVpZDoge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3RpbWVsaW9uLXNoZWV0Jzoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGl0czoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgc2VhcmNoU291cmNlSlNPTjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lbGlvbl9jaGFydF9oZWlnaHQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZWxpb25fY29sdW1uczoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lbGlvbl9pbnRlcnZhbDoge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lbGlvbl9vdGhlcl9pbnRlcnZhbDoge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lbGlvbl9yb3dzOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpbWVsaW9uX3NoZWV0OiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdncmFwaC13b3Jrc3BhY2UnOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgc2VhcmNoU291cmNlSlNPTjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBudW1MaW5rczoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBudW1WZXJ0aWNlczoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHdzU3RhdGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdfQ==