"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = alertingPlugin;

var _constants = require("../../services/utils/constants");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function alertingPlugin(Client, config, components) {
  const ca = components.clientAction.factory;
  Client.prototype.alerting = components.clientAction.namespaceFactory();
  const alerting = Client.prototype.alerting.prototype;
  alerting.getFindings = ca({
    url: {
      fmt: `${_constants.API_ROUTE_PREFIX}/findings/_search`
    },
    needBody: true,
    method: 'GET'
  });
  alerting.getMonitor = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/<%=monitorId%>`,
      req: {
        monitorId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'GET'
  });
  alerting.createMonitor = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}?refresh=wait_for`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.deleteMonitor = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/<%=monitorId%>`,
      req: {
        monitorId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'DELETE'
  }); // TODO DRAFT: May need to add 'refresh' assignment here again.

  alerting.updateMonitor = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/<%=monitorId%>`,
      req: {
        monitorId: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'PUT'
  });
  alerting.getMonitors = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/_search`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.acknowledgeAlerts = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/<%=monitorId%>/_acknowledge/alerts`,
      req: {
        monitorId: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'POST'
  });
  alerting.getAlerts = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/alerts`
    },
    method: 'GET'
  });
  alerting.executeMonitor = ca({
    url: {
      fmt: `${_constants.MONITOR_BASE_API}/_execute?dryrun=<%=dryrun%>`,
      req: {
        dryrun: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'POST'
  });
  alerting.getDestination = ca({
    url: {
      fmt: `${_constants.DESTINATION_BASE_API}/<%=destinationId%>`,
      req: {
        destinationId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'GET'
  });
  alerting.searchDestinations = ca({
    url: {
      fmt: `${_constants.DESTINATION_BASE_API}`
    },
    method: 'GET'
  });
  alerting.createDestination = ca({
    url: {
      fmt: `${_constants.DESTINATION_BASE_API}?refresh=wait_for`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.updateDestination = ca({
    url: {
      fmt: `${_constants.DESTINATION_BASE_API}/<%=destinationId%>?if_seq_no=<%=ifSeqNo%>&if_primary_term=<%=ifPrimaryTerm%>&refresh=wait_for`,
      req: {
        destinationId: {
          type: 'string',
          required: true
        },
        ifSeqNo: {
          type: 'string',
          required: true
        },
        ifPrimaryTerm: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'PUT'
  });
  alerting.deleteDestination = ca({
    url: {
      fmt: `${_constants.DESTINATION_BASE_API}/<%=destinationId%>`,
      req: {
        destinationId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'DELETE'
  });
  alerting.getEmailAccount = ca({
    url: {
      fmt: `${_constants.EMAIL_ACCOUNT_BASE_API}/<%=emailAccountId%>`,
      req: {
        emailAccountId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'GET'
  });
  alerting.getEmailAccounts = ca({
    url: {
      fmt: `${_constants.EMAIL_ACCOUNT_BASE_API}/_search`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.createEmailAccount = ca({
    url: {
      fmt: `${_constants.EMAIL_ACCOUNT_BASE_API}?refresh=wait_for`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.updateEmailAccount = ca({
    url: {
      fmt: `${_constants.EMAIL_ACCOUNT_BASE_API}/<%=emailAccountId%>?if_seq_no=<%=ifSeqNo%>&if_primary_term=<%=ifPrimaryTerm%>&refresh=wait_for`,
      req: {
        emailAccountId: {
          type: 'string',
          required: true
        },
        ifSeqNo: {
          type: 'string',
          required: true
        },
        ifPrimaryTerm: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'PUT'
  });
  alerting.deleteEmailAccount = ca({
    url: {
      fmt: `${_constants.EMAIL_ACCOUNT_BASE_API}/<%=emailAccountId%>`,
      req: {
        emailAccountId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'DELETE'
  });
  alerting.getEmailGroup = ca({
    url: {
      fmt: `${_constants.EMAIL_GROUP_BASE_API}/<%=emailGroupId%>`,
      req: {
        emailGroupId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'GET'
  });
  alerting.getEmailGroups = ca({
    url: {
      fmt: `${_constants.EMAIL_GROUP_BASE_API}/_search`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.createEmailGroup = ca({
    url: {
      fmt: `${_constants.EMAIL_GROUP_BASE_API}?refresh=wait_for`
    },
    needBody: true,
    method: 'POST'
  });
  alerting.updateEmailGroup = ca({
    url: {
      fmt: `${_constants.EMAIL_GROUP_BASE_API}/<%=emailGroupId%>?if_seq_no=<%=ifSeqNo%>&if_primary_term=<%=ifPrimaryTerm%>&refresh=wait_for`,
      req: {
        emailGroupId: {
          type: 'string',
          required: true
        },
        ifSeqNo: {
          type: 'string',
          required: true
        },
        ifPrimaryTerm: {
          type: 'string',
          required: true
        }
      }
    },
    needBody: true,
    method: 'PUT'
  });
  alerting.deleteEmailGroup = ca({
    url: {
      fmt: `${_constants.EMAIL_GROUP_BASE_API}/<%=emailGroupId%>`,
      req: {
        emailGroupId: {
          type: 'string',
          required: true
        }
      }
    },
    method: 'DELETE'
  });
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0aW5nUGx1Z2luLmpzIl0sIm5hbWVzIjpbImFsZXJ0aW5nUGx1Z2luIiwiQ2xpZW50IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNhIiwiY2xpZW50QWN0aW9uIiwiZmFjdG9yeSIsInByb3RvdHlwZSIsImFsZXJ0aW5nIiwibmFtZXNwYWNlRmFjdG9yeSIsImdldEZpbmRpbmdzIiwidXJsIiwiZm10IiwiQVBJX1JPVVRFX1BSRUZJWCIsIm5lZWRCb2R5IiwibWV0aG9kIiwiZ2V0TW9uaXRvciIsIk1PTklUT1JfQkFTRV9BUEkiLCJyZXEiLCJtb25pdG9ySWQiLCJ0eXBlIiwicmVxdWlyZWQiLCJjcmVhdGVNb25pdG9yIiwiZGVsZXRlTW9uaXRvciIsInVwZGF0ZU1vbml0b3IiLCJnZXRNb25pdG9ycyIsImFja25vd2xlZGdlQWxlcnRzIiwiZ2V0QWxlcnRzIiwiZXhlY3V0ZU1vbml0b3IiLCJkcnlydW4iLCJnZXREZXN0aW5hdGlvbiIsIkRFU1RJTkFUSU9OX0JBU0VfQVBJIiwiZGVzdGluYXRpb25JZCIsInNlYXJjaERlc3RpbmF0aW9ucyIsImNyZWF0ZURlc3RpbmF0aW9uIiwidXBkYXRlRGVzdGluYXRpb24iLCJpZlNlcU5vIiwiaWZQcmltYXJ5VGVybSIsImRlbGV0ZURlc3RpbmF0aW9uIiwiZ2V0RW1haWxBY2NvdW50IiwiRU1BSUxfQUNDT1VOVF9CQVNFX0FQSSIsImVtYWlsQWNjb3VudElkIiwiZ2V0RW1haWxBY2NvdW50cyIsImNyZWF0ZUVtYWlsQWNjb3VudCIsInVwZGF0ZUVtYWlsQWNjb3VudCIsImRlbGV0ZUVtYWlsQWNjb3VudCIsImdldEVtYWlsR3JvdXAiLCJFTUFJTF9HUk9VUF9CQVNFX0FQSSIsImVtYWlsR3JvdXBJZCIsImdldEVtYWlsR3JvdXBzIiwiY3JlYXRlRW1haWxHcm91cCIsInVwZGF0ZUVtYWlsR3JvdXAiLCJkZWxldGVFbWFpbEdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBTEE7QUFDQTtBQUNB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RUFBRSxDQUFDO0FBQzdCTyxJQUFBQSxHQUFHLEVBQUU7QUFDSEMsTUFBQUEsR0FBRyxFQUFHLEdBQUVtQywrQkFBcUIsb0JBRDFCO0FBRUg3QixNQUFBQSxHQUFHLEVBQUU7QUFDSDhCLFFBQUFBLFlBQVksRUFBRTtBQUNaNUIsVUFBQUEsSUFBSSxFQUFFLFFBRE07QUFFWkMsVUFBQUEsUUFBUSxFQUFFO0FBRkU7QUFEWDtBQUZGLEtBRHdCO0FBVTdCTixJQUFBQSxNQUFNLEVBQUU7QUFWcUIsR0FBRCxDQUE5QjtBQVlEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBUElfUk9VVEVfUFJFRklYLFxuICBNT05JVE9SX0JBU0VfQVBJLFxuICBERVNUSU5BVElPTl9CQVNFX0FQSSxcbiAgRU1BSUxfQUNDT1VOVF9CQVNFX0FQSSxcbiAgRU1BSUxfR1JPVVBfQkFTRV9BUEksXG59IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFsZXJ0aW5nUGx1Z2luKENsaWVudCwgY29uZmlnLCBjb21wb25lbnRzKSB7XG4gIGNvbnN0IGNhID0gY29tcG9uZW50cy5jbGllbnRBY3Rpb24uZmFjdG9yeTtcblxuICBDbGllbnQucHJvdG90eXBlLmFsZXJ0aW5nID0gY29tcG9uZW50cy5jbGllbnRBY3Rpb24ubmFtZXNwYWNlRmFjdG9yeSgpO1xuICBjb25zdCBhbGVydGluZyA9IENsaWVudC5wcm90b3R5cGUuYWxlcnRpbmcucHJvdG90eXBlO1xuXG4gIGFsZXJ0aW5nLmdldEZpbmRpbmdzID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtBUElfUk9VVEVfUFJFRklYfS9maW5kaW5ncy9fc2VhcmNoYCxcbiAgICB9LFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLmdldE1vbml0b3IgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke01PTklUT1JfQkFTRV9BUEl9LzwlPW1vbml0b3JJZCU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBtb25pdG9ySWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcblxuICBhbGVydGluZy5jcmVhdGVNb25pdG9yID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtNT05JVE9SX0JBU0VfQVBJfT9yZWZyZXNoPXdhaXRfZm9yYCxcbiAgICB9LFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICB9KTtcblxuICBhbGVydGluZy5kZWxldGVNb25pdG9yID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtNT05JVE9SX0JBU0VfQVBJfS88JT1tb25pdG9ySWQlPmAsXG4gICAgICByZXE6IHtcbiAgICAgICAgbW9uaXRvcklkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG5cbiAgLy8gVE9ETyBEUkFGVDogTWF5IG5lZWQgdG8gYWRkICdyZWZyZXNoJyBhc3NpZ25tZW50IGhlcmUgYWdhaW4uXG4gIGFsZXJ0aW5nLnVwZGF0ZU1vbml0b3IgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke01PTklUT1JfQkFTRV9BUEl9LzwlPW1vbml0b3JJZCU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBtb25pdG9ySWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQVVQnLFxuICB9KTtcblxuICBhbGVydGluZy5nZXRNb25pdG9ycyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7TU9OSVRPUl9CQVNFX0FQSX0vX3NlYXJjaGAsXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgfSk7XG5cbiAgYWxlcnRpbmcuYWNrbm93bGVkZ2VBbGVydHMgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke01PTklUT1JfQkFTRV9BUEl9LzwlPW1vbml0b3JJZCU+L19hY2tub3dsZWRnZS9hbGVydHNgLFxuICAgICAgcmVxOiB7XG4gICAgICAgIG1vbml0b3JJZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICB9KTtcblxuICBhbGVydGluZy5nZXRBbGVydHMgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke01PTklUT1JfQkFTRV9BUEl9L2FsZXJ0c2AsXG4gICAgfSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcblxuICBhbGVydGluZy5leGVjdXRlTW9uaXRvciA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7TU9OSVRPUl9CQVNFX0FQSX0vX2V4ZWN1dGU/ZHJ5cnVuPTwlPWRyeXJ1biU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBkcnlydW46IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgfSk7XG5cbiAgYWxlcnRpbmcuZ2V0RGVzdGluYXRpb24gPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke0RFU1RJTkFUSU9OX0JBU0VfQVBJfS88JT1kZXN0aW5hdGlvbklkJT5gLFxuICAgICAgcmVxOiB7XG4gICAgICAgIGRlc3RpbmF0aW9uSWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcblxuICBhbGVydGluZy5zZWFyY2hEZXN0aW5hdGlvbnMgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke0RFU1RJTkFUSU9OX0JBU0VfQVBJfWAsXG4gICAgfSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcblxuICBhbGVydGluZy5jcmVhdGVEZXN0aW5hdGlvbiA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7REVTVElOQVRJT05fQkFTRV9BUEl9P3JlZnJlc2g9d2FpdF9mb3JgLFxuICAgIH0sXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLnVwZGF0ZURlc3RpbmF0aW9uID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtERVNUSU5BVElPTl9CQVNFX0FQSX0vPCU9ZGVzdGluYXRpb25JZCU+P2lmX3NlcV9ubz08JT1pZlNlcU5vJT4maWZfcHJpbWFyeV90ZXJtPTwlPWlmUHJpbWFyeVRlcm0lPiZyZWZyZXNoPXdhaXRfZm9yYCxcbiAgICAgIHJlcToge1xuICAgICAgICBkZXN0aW5hdGlvbklkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGlmU2VxTm86IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaWZQcmltYXJ5VGVybToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIG1ldGhvZDogJ1BVVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLmRlbGV0ZURlc3RpbmF0aW9uID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtERVNUSU5BVElPTl9CQVNFX0FQSX0vPCU9ZGVzdGluYXRpb25JZCU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBkZXN0aW5hdGlvbklkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG5cbiAgYWxlcnRpbmcuZ2V0RW1haWxBY2NvdW50ID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtFTUFJTF9BQ0NPVU5UX0JBU0VfQVBJfS88JT1lbWFpbEFjY291bnRJZCU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBlbWFpbEFjY291bnRJZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLmdldEVtYWlsQWNjb3VudHMgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke0VNQUlMX0FDQ09VTlRfQkFTRV9BUEl9L19zZWFyY2hgLFxuICAgIH0sXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLmNyZWF0ZUVtYWlsQWNjb3VudCA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7RU1BSUxfQUNDT1VOVF9CQVNFX0FQSX0/cmVmcmVzaD13YWl0X2ZvcmAsXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgfSk7XG5cbiAgYWxlcnRpbmcudXBkYXRlRW1haWxBY2NvdW50ID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtFTUFJTF9BQ0NPVU5UX0JBU0VfQVBJfS88JT1lbWFpbEFjY291bnRJZCU+P2lmX3NlcV9ubz08JT1pZlNlcU5vJT4maWZfcHJpbWFyeV90ZXJtPTwlPWlmUHJpbWFyeVRlcm0lPiZyZWZyZXNoPXdhaXRfZm9yYCxcbiAgICAgIHJlcToge1xuICAgICAgICBlbWFpbEFjY291bnRJZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBpZlNlcU5vOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGlmUHJpbWFyeVRlcm06IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQVVQnLFxuICB9KTtcblxuICBhbGVydGluZy5kZWxldGVFbWFpbEFjY291bnQgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke0VNQUlMX0FDQ09VTlRfQkFTRV9BUEl9LzwlPWVtYWlsQWNjb3VudElkJT5gLFxuICAgICAgcmVxOiB7XG4gICAgICAgIGVtYWlsQWNjb3VudElkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG5cbiAgYWxlcnRpbmcuZ2V0RW1haWxHcm91cCA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7RU1BSUxfR1JPVVBfQkFTRV9BUEl9LzwlPWVtYWlsR3JvdXBJZCU+YCxcbiAgICAgIHJlcToge1xuICAgICAgICBlbWFpbEdyb3VwSWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcblxuICBhbGVydGluZy5nZXRFbWFpbEdyb3VwcyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogYCR7RU1BSUxfR1JPVVBfQkFTRV9BUEl9L19zZWFyY2hgLFxuICAgIH0sXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gIH0pO1xuXG4gIGFsZXJ0aW5nLmNyZWF0ZUVtYWlsR3JvdXAgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6IGAke0VNQUlMX0dST1VQX0JBU0VfQVBJfT9yZWZyZXNoPXdhaXRfZm9yYCxcbiAgICB9LFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICB9KTtcblxuICBhbGVydGluZy51cGRhdGVFbWFpbEdyb3VwID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtFTUFJTF9HUk9VUF9CQVNFX0FQSX0vPCU9ZW1haWxHcm91cElkJT4/aWZfc2VxX25vPTwlPWlmU2VxTm8lPiZpZl9wcmltYXJ5X3Rlcm09PCU9aWZQcmltYXJ5VGVybSU+JnJlZnJlc2g9d2FpdF9mb3JgLFxuICAgICAgcmVxOiB7XG4gICAgICAgIGVtYWlsR3JvdXBJZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBpZlNlcU5vOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGlmUHJpbWFyeVRlcm06IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICBtZXRob2Q6ICdQVVQnLFxuICB9KTtcblxuICBhbGVydGluZy5kZWxldGVFbWFpbEdyb3VwID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiBgJHtFTUFJTF9HUk9VUF9CQVNFX0FQSX0vPCU9ZW1haWxHcm91cElkJT5gLFxuICAgICAgcmVxOiB7XG4gICAgICAgIGVtYWlsR3JvdXBJZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIH0pO1xufVxuIl19