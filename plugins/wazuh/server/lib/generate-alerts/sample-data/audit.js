"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileName = exports.dataAudit = void 0;

var _common = require("./common");

/*
 * Wazuh app - Audit sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
// Audit
const fileName = ["/etc/samplefile", "/etc/sample/file", "/var/sample"];
exports.fileName = fileName;
const ruleId = ['80790', '80784', '80781', '80791'];
const auditType = ["SYSCALL", "EXECVE", "CWD", "NORMAL", "PATH", "PROCTITLE"];
const dataAudit = [{
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/sudo',
      command: 'sudo',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 12,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/sudo",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/sshd',
      command: 'ssh',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 3,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/ssh",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/crond',
      command: 'cron',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 1,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/crond",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: ''
      },
      exe: '/usr/sbin/ls',
      command: 'ls',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 6,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/ls",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/sbin/consoletype'
      },
      exe: '/usr/sbin/consoletype',
      command: 'consoletype',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 16,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/consoletype",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/bin/bash'
      },
      exe: '/usr/sbin/bash',
      command: 'bash',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 1,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/bash",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/id'
      },
      exe: '/usr/sbin/id',
      command: 'id',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 11,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/id",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/grep'
      },
      exe: '/usr/sbin/grep',
      command: 'grep',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 13,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/grep",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/hostname'
      },
      exe: '/usr/sbin/hostname',
      command: 'hostname',
      success: 'yes',
      cwd: "/home/wazuh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 13,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/hostname",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
}, {
  data: {
    audit: {
      file: {
        name: '/usr/bin/sh'
      },
      exe: '/usr/sbin/sh',
      command: 'sh',
      success: 'yes',
      cwd: "/home/sh",
      type: (0, _common.randomArrayItem)(auditType)
    }
  },
  rule: {
    id: (0, _common.randomArrayItem)(ruleId),
    firedtimes: 17,
    mail: false,
    level: 3,
    description: "Audit: Command: /usr/sbin/sh",
    groups: ["audit", "audit_command"],
    gdpr: ["IV_30.1.g"]
  }
} //   {
//     data: {
//       audit: {
//         res: "1",
//         id: "1002556",
//         type: "CONFIG_CHANGE",
//         list: "4",
//         key: "wazuh_fim"
//       },
//     },
//     rule: {
// id: randomArrayItem(ruleId),
//       firedtimes: 10,
//       mail: false,
//       level: 3,
//       description: "Auditd: Configuration changed",
//       groups: [
//         "audit",
//         "audit_configuration"
//       ],
//       gpg13: [
//         "10.1"
//       ],
//       gdpr: [
//         "IV_30.1.g"
//       ]
//     },
//   },
];
exports.dataAudit = dataAudit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGl0LmpzIl0sIm5hbWVzIjpbImZpbGVOYW1lIiwicnVsZUlkIiwiYXVkaXRUeXBlIiwiZGF0YUF1ZGl0IiwiZGF0YSIsImF1ZGl0IiwiZmlsZSIsIm5hbWUiLCJleGUiLCJjb21tYW5kIiwic3VjY2VzcyIsImN3ZCIsInR5cGUiLCJydWxlIiwiaWQiLCJmaXJlZHRpbWVzIiwibWFpbCIsImxldmVsIiwiZGVzY3JpcHRpb24iLCJncm91cHMiLCJnZHByIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSU8sTUFBTUEsUUFBUSxHQUFHLENBQUMsaUJBQUQsRUFBb0Isa0JBQXBCLEVBQXdDLGFBQXhDLENBQWpCOztBQUNQLE1BQU1DLE1BQU0sR0FBRyxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE9BQW5CLEVBQTRCLE9BQTVCLENBQWY7QUFDQSxNQUFNQyxTQUFTLEdBQUcsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixRQUE3QixFQUF1QyxNQUF2QyxFQUErQyxXQUEvQyxDQUFsQjtBQUVPLE1BQU1DLFNBQVMsR0FBRyxDQUFDO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUU7QUFDSkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xDLE1BQUFBLElBQUksRUFBRTtBQUNKQyxRQUFBQSxJQUFJLEVBQUU7QUFERixPQUREO0FBSUxDLE1BQUFBLEdBQUcsRUFBRSxnQkFKQTtBQUtMQyxNQUFBQSxPQUFPLEVBQUUsTUFMSjtBQU1MQyxNQUFBQSxPQUFPLEVBQUUsS0FOSjtBQU9MQyxNQUFBQSxHQUFHLEVBQUUsYUFQQTtBQVFMQyxNQUFBQSxJQUFJLEVBQUUsNkJBQWdCVixTQUFoQjtBQVJEO0FBREgsR0FEZ0I7QUFhdEJXLEVBQUFBLElBQUksRUFBRTtBQUNKQyxJQUFBQSxFQUFFLEVBQUUsNkJBQWdCYixNQUFoQixDQURBO0FBRUpjLElB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QyxJQUFBQSxLQUFLLEVBQUU7QUFDTEMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLElBQUksRUFBRTtBQURGLE9BREQ7QUFJTEMsTUFBQUEsR0FBRyxFQUFFLGNBSkE7QUFLTEMsTUFBQUEsT0FBTyxFQUFFLElBTEo7QUFNTEMsTUFBQUEsT0FBTyxFQUFFLEtBTko7QUFPTEMsTUFBQUEsR0FBRyxFQUFFLFVBUEE7QUFRTEMsTUFBQUEsSUFBSSxFQUFFLDZCQUFnQlYsU0FBaEI7QUFSRDtBQURILEdBRFI7QUFhRVcsRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLEVBQUUsRUFBRSw2QkFBZ0JiLE1BQWhCLENBREE7QUFFSmMsSUFBQUEsVUFBVSxFQUFFLEVBRlI7QUFHSkMsSUFBQUEsSUFBSSxFQUFFLEtBSEY7QUFJSkMsSUFBQUEsS0FBSyxFQUFFLENBSkg7QUFLSkMsSUFBQUEsV0FBVyxFQUFFLDhCQUxUO0FBTUpDLElBQUFBLE1BQU0sRUFBRSxDQUNOLE9BRE0sRUFFTixlQUZNLENBTko7QUFVSkMsSUFBQUEsSUFBSSxFQUFFLENBQ0osV0FESTtBQVZGO0FBYlIsQ0E1UHVCLENBd1J2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5UdUIsQ0FBbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gQXVkaXQgc2FtcGxlIGRhdGFcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbi8vIEF1ZGl0XG5cbmltcG9ydCB7IHJhbmRvbUFycmF5SXRlbSB9IGZyb20gJy4vY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IGZpbGVOYW1lID0gW1wiL2V0Yy9zYW1wbGVmaWxlXCIsIFwiL2V0Yy9zYW1wbGUvZmlsZVwiLCBcIi92YXIvc2FtcGxlXCJdO1xuY29uc3QgcnVsZUlkID0gWyc4MDc5MCcsICc4MDc4NCcsICc4MDc4MScsICc4MDc5MSddO1xuY29uc3QgYXVkaXRUeXBlID0gW1wiU1lTQ0FMTFwiLCBcIkVYRUNWRVwiLCBcIkNXRFwiLCBcIk5PUk1BTFwiLCBcIlBBVEhcIiwgXCJQUk9DVElUTEVcIl07XG5cbmV4cG9ydCBjb25zdCBkYXRhQXVkaXQgPSBbe1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vc3VkbycsXG4gICAgICAgIGNvbW1hbmQ6ICdzdWRvJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS93YXp1aFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiAxMixcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL3N1ZG9cIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vc3NoZCcsXG4gICAgICAgIGNvbW1hbmQ6ICdzc2gnLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDMsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9zc2hcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vY3JvbmQnLFxuICAgICAgICBjb21tYW5kOiAnY3JvbicsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMSxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBdWRpdDogQ29tbWFuZDogL3Vzci9zYmluL2Nyb25kXCIsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgXCJhdWRpdFwiLFxuICAgICAgICBcImF1ZGl0X2NvbW1hbmRcIlxuICAgICAgXSxcbiAgICAgIGdkcHI6IFtcbiAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBkYXRhOiB7XG4gICAgICBhdWRpdDoge1xuICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgZXhlOiAnL3Vzci9zYmluL2xzJyxcbiAgICAgICAgY29tbWFuZDogJ2xzJyxcbiAgICAgICAgc3VjY2VzczogJ3llcycsXG4gICAgICAgIGN3ZDogXCIvaG9tZS93YXp1aFwiLFxuICAgICAgICB0eXBlOiByYW5kb21BcnJheUl0ZW0oYXVkaXRUeXBlKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBpZDogcmFuZG9tQXJyYXlJdGVtKHJ1bGVJZCksXG4gICAgICBmaXJlZHRpbWVzOiA2LFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkF1ZGl0OiBDb21tYW5kOiAvdXNyL3NiaW4vbHNcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnL3NiaW4vY29uc29sZXR5cGUnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9jb25zb2xldHlwZScsXG4gICAgICAgIGNvbW1hbmQ6ICdjb25zb2xldHlwZScsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMTYsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9jb25zb2xldHlwZVwiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICB7XG4gICAgZGF0YToge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgZmlsZToge1xuICAgICAgICAgIG5hbWU6ICcvYmluL2Jhc2gnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9iYXNoJyxcbiAgICAgICAgY29tbWFuZDogJ2Jhc2gnLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDEsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9iYXNoXCIsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgXCJhdWRpdFwiLFxuICAgICAgICBcImF1ZGl0X2NvbW1hbmRcIlxuICAgICAgXSxcbiAgICAgIGdkcHI6IFtcbiAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBkYXRhOiB7XG4gICAgICBhdWRpdDoge1xuICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgbmFtZTogJy91c3IvYmluL2lkJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vaWQnLFxuICAgICAgICBjb21tYW5kOiAnaWQnLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDExLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkF1ZGl0OiBDb21tYW5kOiAvdXNyL3NiaW4vaWRcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnL3Vzci9iaW4vZ3JlcCdcbiAgICAgICAgfSxcbiAgICAgICAgZXhlOiAnL3Vzci9zYmluL2dyZXAnLFxuICAgICAgICBjb21tYW5kOiAnZ3JlcCcsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvd2F6dWhcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMTMsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9ncmVwXCIsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgXCJhdWRpdFwiLFxuICAgICAgICBcImF1ZGl0X2NvbW1hbmRcIlxuICAgICAgXSxcbiAgICAgIGdkcHI6IFtcbiAgICAgICAgXCJJVl8zMC4xLmdcIlxuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBkYXRhOiB7XG4gICAgICBhdWRpdDoge1xuICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgbmFtZTogJy91c3IvYmluL2hvc3RuYW1lJ1xuICAgICAgICB9LFxuICAgICAgICBleGU6ICcvdXNyL3NiaW4vaG9zdG5hbWUnLFxuICAgICAgICBjb21tYW5kOiAnaG9zdG5hbWUnLFxuICAgICAgICBzdWNjZXNzOiAneWVzJyxcbiAgICAgICAgY3dkOiBcIi9ob21lL3dhenVoXCIsXG4gICAgICAgIHR5cGU6IHJhbmRvbUFycmF5SXRlbShhdWRpdFR5cGUpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgICAgIGZpcmVkdGltZXM6IDEzLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkF1ZGl0OiBDb21tYW5kOiAvdXNyL3NiaW4vaG9zdG5hbWVcIixcbiAgICAgIGdyb3VwczogW1xuICAgICAgICBcImF1ZGl0XCIsXG4gICAgICAgIFwiYXVkaXRfY29tbWFuZFwiXG4gICAgICBdLFxuICAgICAgZ2RwcjogW1xuICAgICAgICBcIklWXzMwLjEuZ1wiXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGRhdGE6IHtcbiAgICAgIGF1ZGl0OiB7XG4gICAgICAgIGZpbGU6IHtcbiAgICAgICAgICBuYW1lOiAnL3Vzci9iaW4vc2gnXG4gICAgICAgIH0sXG4gICAgICAgIGV4ZTogJy91c3Ivc2Jpbi9zaCcsXG4gICAgICAgIGNvbW1hbmQ6ICdzaCcsXG4gICAgICAgIHN1Y2Nlc3M6ICd5ZXMnLFxuICAgICAgICBjd2Q6IFwiL2hvbWUvc2hcIixcbiAgICAgICAgdHlwZTogcmFuZG9tQXJyYXlJdGVtKGF1ZGl0VHlwZSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgaWQ6IHJhbmRvbUFycmF5SXRlbShydWxlSWQpLFxuICAgICAgZmlyZWR0aW1lczogMTcsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXQ6IENvbW1hbmQ6IC91c3Ivc2Jpbi9zaFwiLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgIFwiYXVkaXRcIixcbiAgICAgICAgXCJhdWRpdF9jb21tYW5kXCJcbiAgICAgIF0sXG4gICAgICBnZHByOiBbXG4gICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgICAgIF1cbiAgICB9LFxuICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIGRhdGE6IHtcbiAgLy8gICAgICAgYXVkaXQ6IHtcbiAgLy8gICAgICAgICByZXM6IFwiMVwiLFxuICAvLyAgICAgICAgIGlkOiBcIjEwMDI1NTZcIixcbiAgLy8gICAgICAgICB0eXBlOiBcIkNPTkZJR19DSEFOR0VcIixcbiAgLy8gICAgICAgICBsaXN0OiBcIjRcIixcbiAgLy8gICAgICAgICBrZXk6IFwid2F6dWhfZmltXCJcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIH0sXG4gIC8vICAgICBydWxlOiB7XG4gIC8vIGlkOiByYW5kb21BcnJheUl0ZW0ocnVsZUlkKSxcbiAgLy8gICAgICAgZmlyZWR0aW1lczogMTAsXG4gIC8vICAgICAgIG1haWw6IGZhbHNlLFxuICAvLyAgICAgICBsZXZlbDogMyxcbiAgLy8gICAgICAgZGVzY3JpcHRpb246IFwiQXVkaXRkOiBDb25maWd1cmF0aW9uIGNoYW5nZWRcIixcbiAgLy8gICAgICAgZ3JvdXBzOiBbXG4gIC8vICAgICAgICAgXCJhdWRpdFwiLFxuICAvLyAgICAgICAgIFwiYXVkaXRfY29uZmlndXJhdGlvblwiXG4gIC8vICAgICAgIF0sXG4gIC8vICAgICAgIGdwZzEzOiBbXG4gIC8vICAgICAgICAgXCIxMC4xXCJcbiAgLy8gICAgICAgXSxcbiAgLy8gICAgICAgZ2RwcjogW1xuICAvLyAgICAgICAgIFwiSVZfMzAuMS5nXCJcbiAgLy8gICAgICAgXVxuICAvLyAgICAgfSxcbiAgLy8gICB9LFxuXVxuIl19