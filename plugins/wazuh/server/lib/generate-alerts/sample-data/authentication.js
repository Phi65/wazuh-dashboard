"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowsInvalidLoginPassword = exports.userLoginFailed = exports.passwordCheckFailed = exports.nonExistentUser = exports.multipleAuthenticationFailures = exports.maximumAuthenticationAttemptsExceeded = exports.invalidLoginUser = exports.invalidLoginPassword = exports.bruteForceTryingAccessSystem = exports.authenticationSuccess = void 0;

/*
 * Wazuh app - Authentication sample alerts
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const invalidLoginPassword = {
  decoder: {
    parent: 'sshd',
    name: 'sshd'
  },
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[5330]: Failed password for {data.srcuser} from {data.srcip} port {data.srcport} ssh2',
  location: '/var/log/auth.log',
  predecoder: {
    program_name: 'sshd',
    timestamp: 'Apr 17 00:17:52',
    hostname: 'ip-10-0-1-50'
  },
  rule: {
    description: 'sshd: authentication failed.',
    groups: ['syslog', 'sshd', 'invalid_login', 'authentication_failed'],
    id: 5716,
    level: 5,
    mail: false,
    pci_dss: ['10.2.4', '10.2.5'],
    gpg13: ['7.1'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.14', 'AC.7']
  }
};
exports.invalidLoginPassword = invalidLoginPassword;
const invalidLoginUser = {
  decoder: {
    parent: 'sshd',
    name: 'sshd'
  },
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[10022]: Invalid user {data.srcuser} from {data.srcuser} from {data.srcip} port {data.srcport} ssh2',
  location: '/var/log/secure',
  predecoder: {
    program_name: 'sshd',
    timestamp: 'Apr 17 00:17:52',
    hostname: 'ip-10-0-1-50'
  },
  rule: {
    description: 'sshd: Attempt to login using a non-existent user',
    groups: ['syslog', 'sshd', 'invalid_login', 'authentication_failed'],
    id: 5710,
    level: 5,
    pci_dss: ['10.2.4', '10.2.5', '10.6.1'],
    gpg13: ['7.1'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.14', 'AC.7', 'AU.6']
  }
};
exports.invalidLoginUser = invalidLoginUser;
const multipleAuthenticationFailures = {
  decoder: {
    parent: 'sshd',
    name: 'sshd'
  },
  full_log: `{predecoder.timestamp} {predecoder.hostname} sshd[5413]: Failed password for invalid user {data.srcuser} from {data.srcip} port {data.srcport} ssh2`,
  location: '/var/log/secure',
  rule: {
    description: 'sshd: Multiple authentication failures.',
    id: 5720,
    level: 10,
    frequency: 8,
    groups: ['syslog', 'sshd', 'authentication_failures'],
    pci_dss: ['10.2.4', '10.2.5', '11.4'],
    gpg13: ['7.1'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.14', 'AC.7', 'SI.4']
  },
  predecoder: {
    program_name: 'sshd',
    timestamp: 'Apr 17 00:17:52',
    hostname: 'ip-10-0-1-50'
  }
};
exports.multipleAuthenticationFailures = multipleAuthenticationFailures;
const windowsInvalidLoginPassword = {
  full_log: `{predecoder.timestamp} {predecoder.hostname} sshd[5413]: Failed password for invalid user {data.srcuser} from {data.srcip} port {data.srcport} ssh2`,
  data_win: {
    eventdata: {
      authenticationPackageName: 'NTLM',
      failureReason: '%%2313',
      keyLength: 0,
      logonProcessName: 'NtLmSsp',
      logonType: '3',
      processId: '0x0',
      status: '0xc000006d',
      subStatus: '0xc0000064',
      subjectLogonId: '0x0',
      subjectUserSid: 'S-1-0-0',
      targetUserName: 'DIRECTION'
    },
    system: {
      channel: 'Security',
      keywords: '0x8010000000000000',
      level: '0',
      message: '',
      opcode: '0',
      providerGuid: '{54849625-5478-4994-a5ba-3e3b0328c30d}',
      providerName: 'Microsoft-Windows-Security-Auditing',
      severityValue: 'AUDIT_FAILURE',
      version: '0'
    }
  },
  decoder: {
    parent: 'sshd',
    name: 'windows_eventchannel'
  },
  location: 'EventChannel',
  rule: {
    description: 'Logon Failure - Unknown user or bad password',
    groups: ['windows', 'windows_security', 'win_authentication_failed'],
    id: 60122,
    level: 5,
    pci_dss: ['10.2.4', '10.2.5'],
    gpg13: ['7.1'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.1', 'AC.7']
  }
};
exports.windowsInvalidLoginPassword = windowsInvalidLoginPassword;
const userLoginFailed = {
  rule: {
    id: 5503,
    level: 5,
    description: 'PAM: User login failed.',
    mail: false,
    groups: ['pam', 'syslog', 'authentication_failed'],
    pci_dss: ['10.2.4', '10.2.5'],
    gpg13: ['7.8'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.14', 'AC.7']
  },
  predecoder: {
    program_name: 'sshd',
    timestamp: 'Apr 17 00:04:40',
    hostname: 'ip-10-0-1-178'
  },
  decoder: {
    name: 'pam'
  },
  location: '/var/log/secure',
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[11294]: pam_unix(sshd:auth): authentication failure; logname= uid={data.uid} euid={data.euid} tty={data.tty} ruser= rhost={data.srcip}  user={data.dstuser}'
};
exports.userLoginFailed = userLoginFailed;
const passwordCheckFailed = {
  rule: {
    level: 5,
    description: 'unix_chkpwd: Password check failed.',
    id: '5557',
    mail: false,
    groups: ['pam', 'syslog', 'authentication_failed'],
    pci_dss: ['10.2.4', '10.2.5'],
    gpg13: ['4.3'],
    gdpr: ['IV_35.7.d', 'IV_32.2'],
    hipaa: ['164.312.b'],
    nist_800_53: ['AU.14', 'AC.7']
  },
  predecoder: {
    program_name: 'unix_chkpwd',
    timestamp: 'Apr 17 00:07:04',
    hostname: 'ip-10-0-1-132'
  },
  decoder: {
    name: 'unix_chkpwd'
  },
  data: {
    srcuser: 'root'
  },
  location: '/var/log/secure',
  full_log: '{predecoder.timestamp} {predecoder.hostname} {decoder.name}[29593]: password check failed for user ({data.srcuser})'
};
exports.passwordCheckFailed = passwordCheckFailed;
const nonExistentUser = {
  rule: {
    mail: false,
    level: 5,
    pci_dss: ['10.2.4', '10.2.5', '10.6.1'],
    hipaa: ['164.312.b'],
    description: 'sshd: Attempt to login using a non-existent user',
    groups: ['syslog', 'sshd', 'invalid_login', 'authentication_failed'],
    id: '5710',
    nist_800_53: ['AU.14', 'AC.7', 'AU.6'],
    gpg13: ['7.1'],
    gdpr: ['IV_35.7.d', 'IV_32.2']
  },
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[15724]: Invalid user {data.srcuser} from {data.srcip} port {data.srcport}',
  location: '/var/log/secure'
};
exports.nonExistentUser = nonExistentUser;
const bruteForceTryingAccessSystem = {
  rule: {
    mail: false,
    level: 10,
    pci_dss: ['11.4', '10.2.4', '10.2.5'],
    hipaa: ['164.312.b'],
    description: 'sshd: brute force trying to get access to the system.',
    groups: ['syslog', 'sshd', 'authentication_failures'],
    mitre: {
      tactic: ['Credential Access', 'Lateral Movement'],
      technique: ['Brute Force', 'Remove Services'],
      id: ['T1110', 'T1021']
    },
    id: '5712',
    nist_800_53: ['SI.4', 'AU.14', 'AC.7'],
    frequency: 8,
    gdpr: ['IV_35.7.d', 'IV_32.2']
  },
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[15722]: Invalid user {data.srcuser} from {data.srcip} port {data.srcport}',
  location: '/var/log/secure'
};
exports.bruteForceTryingAccessSystem = bruteForceTryingAccessSystem;
const authenticationSuccess = {
  data: {
    srcip: '84.122.71.89',
    dstuser: 'ec2-user'
  },
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[12727]: Accepted publickey for {data.dstuser} from {data.srcip} port {data.srcport} ssh2: RSA SHA256:ET29+nbiHqrKs1gUewWTFRCHWdO/vMoRQXPESWn8ZG4',
  input: {
    type: 'log'
  },
  location: '/var/log/secure',
  rule: {
    mail: false,
    level: 3,
    pci_dss: ['10.2.5'],
    hipaa: ['164.312.b'],
    description: 'sshd: authentication success.',
    groups: ['syslog', 'sshd', 'authentication_success'],
    id: '5715',
    nist_800_53: ['AU.14', 'AC.7'],
    gpg13: ['7.1', '7.2'],
    gdpr: ['IV_32.2']
  }
};
exports.authenticationSuccess = authenticationSuccess;
const maximumAuthenticationAttemptsExceeded = {
  rule: {
    mail: false,
    level: 8,
    description: 'Maximum authentication attempts exceeded.',
    groups: ['syslog', 'sshd', 'authentication_failed'],
    mitre: {
      tactic: ['Credential Access', 'Lateral Movement'],
      technique: ['Brute Force', 'Remove Services'],
      id: ['T1110', 'T1021']
    },
    id: '5758',
    gpg13: ['7.1']
  },
  location: '/var/log/secure',
  full_log: '{predecoder.timestamp} {predecoder.hostname} sshd[19767]: error: maximum authentication attempts exceeded for {data.dstuser} from {data.srcip} port {data.srcport} ssh2 [preauth]'
};
exports.maximumAuthenticationAttemptsExceeded = maximumAuthenticationAttemptsExceeded;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImludmFsaWRMb2dpblBhc3N3b3JkIiwiZGVjb2RlciIsInBhcmVudCIsIm5hbWUiLCJmdWxsX2xvZyIsImxvY2F0aW9uIiwicHJlZGVjb2RlciIsInByb2dyYW1fbmFtZSIsInRpbWVzdGFtcCIsImhvc3RuYW1lIiwicnVsZSIsImRlc2NyaXB0aW9uIiwiZ3JvdXBzIiwiaWQiLCJsZXZlbCIsIm1haWwiLCJwY2lfZHNzIiwiZ3BnMTMiLCJnZHByIiwiaGlwYWEiLCJuaXN0XzgwMF81MyIsImludmFsaWRMb2dpblVzZXIiLCJtdWx0aXBsZUF1dGhlbnRpY2F0aW9uRmFpbHVyZXMiLCJmcmVxdWVuY3kiLCJ3aW5kb3dzSW52YWxpZExvZ2luUGFzc3dvcmQiLCJkYXRhX3dpbiIsImV2ZW50ZGF0YSIsImF1dGhlbnRpY2F0aW9uUGFja2FnZU5hbWUiLCJmYWlsdXJlUmVhc29uIiwia2V5TGVuZ3RoIiwibG9nb25Qcm9jZXNzTmFtZSIsImxvZ29uVHlwZSIsInByb2Nlc3NJZCIsInN0YXR1cyIsInN1YlN0YXR1cyIsInN1YmplY3RMb2dvbklkIiwic3ViamVjdFVzZXJTaWQiLCJ0YXJnZXRVc2VyTmFtZSIsInN5c3RlbSIsImNoYW5uZWwiLCJrZXl3b3JkcyIsIm1lc3NhZ2UiLCJvcGNvZGUiLCJwcm92aWRlckd1aWQiLCJwcm92aWRlck5hbWUiLCJzZXZlcml0eVZhbHVlIiwidmVyc2lvbiIsInVzZXJMb2dpbkZhaWxlZCIsInBhc3N3b3JkQ2hlY2tGYWlsZWQiLCJkYXRhIiwic3JjdXNlciIsIm5vbkV4aXN0ZW50VXNlciIsImJydXRlRm9yY2VUcnlpbmdBY2Nlc3NTeXN0ZW0iLCJtaXRyZSIsInRhY3RpYyIsInRlY2huaXF1ZSIsImF1dGhlbnRpY2F0aW9uU3VjY2VzcyIsInNyY2lwIiwiZHN0dXNlciIsImlucHV0IiwidHlwZSIsIm1heGltdW1BdXRoZW50aWNhdGlvbkF0dGVtcHRzRXhjZWVkZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sTUFBTUEsb0JBQW9CLEdBQUc7QUFDbENDLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxNQUFNLEVBQUUsTUFERDtBQUVQQyxJQUFBQSxJQUFJLEVBQUU7QUFGQyxHQUR5QjtBQUtsQ0MsRUFBQUEsUUFBUSxFQUNOLHdJQU5nQztBQU9sQ0MsRUFBQUEsUUFBUSxFQUFFLG1CQVB3QjtBQVFsQ0MsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFlBQVksRUFBRSxNQURKO0FBRVZDLElBQUFBLFNBQVMsRUFBRSxpQkFGRDtBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQSxHQVJzQjtBQWFsQ0MsRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLFdBQVcsRUFBRSw4QkFEVDtBQUVKQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixlQUFuQixFQUFvQyx1QkFBcEMsQ0FGSjtBQUdKQyxJQUFBQSxFQUFFLEVBQUUsSUFIQTtBQUlKQyxJQUFBQSxLQUFLLEVBQUUsQ0FKSDtBQUtKQyxJQUFBQSxJQUFJLEVBQUUsS0FMRjtBQU1KQyxJQUFBQSxPQUFPLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQU5MO0FBT0pDLElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQsQ0FQSDtBQVFKQyxJQUFBQSxJQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQVJGO0FBU0pDLElBQUFBLEtBQUssRUFBRSxDQUFDLFdBQUQsQ0FUSDtBQVVKQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVjtBQVZUO0FBYjRCLENBQTdCOztBQTJCQSxNQUFNQyxnQkFBZ0IsR0FBRztBQUM5QnBCLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxNQUFNLEVBQUUsTUFERDtBQUVQQyxJQUFBQSxJQUFJLEVBQUU7QUFGQyxHQURxQjtBQUs5QkMsRUFBQUEsUUFBUSxFQUNOLHNKQU40QjtBQU85QkMsRUFBQUEsUUFBUSxFQUFFLGlCQVBvQjtBQVE5QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFlBQVksRUFBRSxNQURKO0FBRVZDLElBQUFBLFNBQVMsRUFBRSxpQkFGRDtBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQSxHQVJrQjtBQWE5QkMsRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLFdBQVcsRUFBRSxrREFEVDtBQUVKQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixlQUFuQixFQUFvQyx1QkFBcEMsQ0FGSjtBQUdKQyxJQUFBQSxFQUFFLEVBQUUsSUFIQTtBQUlKQyxJQUFBQSxLQUFLLEVBQUUsQ0FKSDtBQUtKRSxJQUFBQSxPQUFPLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixDQUxMO0FBTUpDLElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQsQ0FOSDtBQU9KQyxJQUFBQSxJQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQVBGO0FBUUpDLElBQUFBLEtBQUssRUFBRSxDQUFDLFdBQUQsQ0FSSDtBQVNKQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixNQUFsQjtBQVRUO0FBYndCLENBQXpCOztBQTBCQSxNQUFNRSw4QkFBOEIsR0FBRztBQUM1Q3JCLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxNQUFNLEVBQUUsTUFERDtBQUVQQyxJQUFBQSxJQUFJLEVBQUU7QUFGQyxHQURtQztBQUs1Q0MsRUFBQUEsUUFBUSxFQUFHLHFKQUxpQztBQU01Q0MsRUFBQUEsUUFBUSxFQUFFLGlCQU5rQztBQU81Q0ssRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLFdBQVcsRUFBRSx5Q0FEVDtBQUVKRSxJQUFBQSxFQUFFLEVBQUUsSUFGQTtBQUdKQyxJQUFBQSxLQUFLLEVBQUUsRUFISDtBQUlKUyxJQUFBQSxTQUFTLEVBQUUsQ0FKUDtBQUtKWCxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQix5QkFBbkIsQ0FMSjtBQU1KSSxJQUFBQSxPQUFPLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixNQUFyQixDQU5MO0FBT0pDLElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQsQ0FQSDtBQVFKQyxJQUFBQSxJQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQVJGO0FBU0pDLElBQUFBLEtBQUssRUFBRSxDQUFDLFdBQUQsQ0FUSDtBQVVKQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixNQUFsQjtBQVZULEdBUHNDO0FBbUI1Q2QsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFlBQVksRUFBRSxNQURKO0FBRVZDLElBQUFBLFNBQVMsRUFBRSxpQkFGRDtBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQTtBQW5CZ0MsQ0FBdkM7O0FBMEJBLE1BQU1lLDJCQUEyQixHQUFHO0FBQ3pDcEIsRUFBQUEsUUFBUSxFQUFHLHFKQUQ4QjtBQUV6Q3FCLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDVEMsTUFBQUEseUJBQXlCLEVBQUUsTUFEbEI7QUFFVEMsTUFBQUEsYUFBYSxFQUFFLFFBRk47QUFHVEMsTUFBQUEsU0FBUyxFQUFFLENBSEY7QUFJVEMsTUFBQUEsZ0JBQWdCLEVBQUUsU0FKVDtBQUtUQyxNQUFBQSxTQUFTLEVBQUUsR0FMRjtBQU1UQyxNQUFBQSxTQUFTLEVBQUUsS0FORjtBQU9UQyxNQUFBQSxNQUFNLEVBQUUsWUFQQztBQVFUQyxNQUFBQSxTQUFTLEVBQUUsWUFSRjtBQVNUQyxNQUFBQSxjQUFjLEVBQUUsS0FUUDtBQVVUQyxNQUFBQSxjQUFjLEVBQUUsU0FWUDtBQVdUQyxNQUFBQSxjQUFjLEVBQUU7QUFYUCxLQURIO0FBY1JDLElBQUFBLE1BQU0sRUFBRTtBQUNOQyxNQUFBQSxPQUFPLEVBQUUsVUFESDtBQUVOQyxNQUFBQSxRQUFRLEVBQUUsb0JBRko7QUFHTjFCLE1BQUFBLEtBQUssRUFBRSxHQUhEO0FBSU4yQixNQUFBQSxPQUFPLEVBQUUsRUFKSDtBQUtOQyxNQUFBQSxNQUFNLEVBQUUsR0FMRjtBQU1OQyxNQUFBQSxZQUFZLEVBQUUsd0NBTlI7QUFPTkMsTUFBQUEsWUFBWSxFQUFFLHFDQVBSO0FBUU5DLE1BQUFBLGFBQWEsRUFBRSxlQVJUO0FBU05DLE1BQUFBLE9BQU8sRUFBRTtBQVRIO0FBZEEsR0FGK0I7QUE0QnpDN0MsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLE1BQU0sRUFBRSxNQUREO0FBRVBDLElBQUFBLElBQUksRUFBRTtBQUZDLEdBNUJnQztBQWdDekNFLEVBQUFBLFFBQVEsRUFBRSxjQWhDK0I7QUFpQ3pDSyxFQUFBQSxJQUFJLEVBQUU7QUFDSkMsSUFBQUEsV0FBVyxFQUFFLDhDQURUO0FBRUpDLElBQUFBLE1BQU0sRUFBRSxDQUFDLFNBQUQsRUFBWSxrQkFBWixFQUFnQywyQkFBaEMsQ0FGSjtBQUdKQyxJQUFBQSxFQUFFLEVBQUUsS0FIQTtBQUlKQyxJQUFBQSxLQUFLLEVBQUUsQ0FKSDtBQUtKRSxJQUFBQSxPQUFPLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUxMO0FBTUpDLElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQsQ0FOSDtBQU9KQyxJQUFBQSxJQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsU0FBZCxDQVBGO0FBUUpDLElBQUFBLEtBQUssRUFBRSxDQUFDLFdBQUQsQ0FSSDtBQVNKQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxNQUFELEVBQVMsTUFBVDtBQVRUO0FBakNtQyxDQUFwQzs7QUE4Q0EsTUFBTTJCLGVBQWUsR0FBRztBQUM3QnJDLEVBQUFBLElBQUksRUFBRTtBQUNKRyxJQUFBQSxFQUFFLEVBQUUsSUFEQTtBQUVKQyxJQUFBQSxLQUFLLEVBQUUsQ0FGSDtBQUdKSCxJQUFBQSxXQUFXLEVBQUUseUJBSFQ7QUFJSkksSUFBQUEsSUFBSSxFQUFFLEtBSkY7QUFLSkgsSUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsdUJBQWxCLENBTEo7QUFNSkksSUFBQUEsT0FBTyxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FOTDtBQU9KQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxLQUFELENBUEg7QUFRSkMsSUFBQUEsSUFBSSxFQUFFLENBQUMsV0FBRCxFQUFjLFNBQWQsQ0FSRjtBQVNKQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxXQUFELENBVEg7QUFVSkMsSUFBQUEsV0FBVyxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVY7QUFWVCxHQUR1QjtBQWE3QmQsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFlBQVksRUFBRSxNQURKO0FBRVZDLElBQUFBLFNBQVMsRUFBRSxpQkFGRDtBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQSxHQWJpQjtBQWtCN0JSLEVBQUFBLE9BQU8sRUFBRTtBQUNQRSxJQUFBQSxJQUFJLEVBQUU7QUFEQyxHQWxCb0I7QUFxQjdCRSxFQUFBQSxRQUFRLEVBQUUsaUJBckJtQjtBQXNCN0JELEVBQUFBLFFBQVEsRUFDTjtBQXZCMkIsQ0FBeEI7O0FBMEJBLE1BQU00QyxtQkFBbUIsR0FBRztBQUNqQ3RDLEVBQUFBLElBQUksRUFBRTtBQUNKSSxJQUFBQSxLQUFLLEVBQUUsQ0FESDtBQUVKSCxJQUFBQSxXQUFXLEVBQUUscUNBRlQ7QUFHSkUsSUFBQUEsRUFBRSxFQUFFLE1BSEE7QUFJSkUsSUFBQUEsSUFBSSxFQUFFLEtBSkY7QUFLSkgsSUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsdUJBQWxCLENBTEo7QUFNSkksSUFBQUEsT0FBTyxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FOTDtBQU9KQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxLQUFELENBUEg7QUFRSkMsSUFBQUEsSUFBSSxFQUFFLENBQUMsV0FBRCxFQUFjLFNBQWQsQ0FSRjtBQVNKQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxXQUFELENBVEg7QUFVSkMsSUFBQUEsV0FBVyxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVY7QUFWVCxHQUQyQjtBQWFqQ2QsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFlBQVksRUFBRSxhQURKO0FBRVZDLElBQUFBLFNBQVMsRUFBRSxpQkFGRDtBQUdWQyxJQUFBQSxRQUFRLEVBQUU7QUFIQSxHQWJxQjtBQWtCakNSLEVBQUFBLE9BQU8sRUFBRTtBQUNQRSxJQUFBQSxJQUFJLEVBQUU7QUFEQyxHQWxCd0I7QUFxQmpDOEMsRUFBQUEsSUFBSSxFQUFFO0FBQUVDLElBQUFBLE9BQU8sRUFBRTtBQUFYLEdBckIyQjtBQXNCakM3QyxFQUFBQSxRQUFRLEVBQUUsaUJBdEJ1QjtBQXVCakNELEVBQUFBLFFBQVEsRUFDTjtBQXhCK0IsQ0FBNUI7O0FBMkJBLE1BQU0rQyxlQUFlLEdBQUc7QUFDN0J6QyxFQUFBQSxJQUFJLEVBQUU7QUFDSkssSUFBQUEsSUFBSSxFQUFFLEtBREY7QUFFSkQsSUFBQUEsS0FBSyxFQUFFLENBRkg7QUFHSkUsSUFBQUEsT0FBTyxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsQ0FITDtBQUlKRyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxXQUFELENBSkg7QUFLSlIsSUFBQUEsV0FBVyxFQUFFLGtEQUxUO0FBTUpDLElBQUFBLE1BQU0sRUFBRSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLGVBQW5CLEVBQW9DLHVCQUFwQyxDQU5KO0FBT0pDLElBQUFBLEVBQUUsRUFBRSxNQVBBO0FBUUpPLElBQUFBLFdBQVcsRUFBRSxDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLE1BQWxCLENBUlQ7QUFTSkgsSUFBQUEsS0FBSyxFQUFFLENBQUMsS0FBRCxDQVRIO0FBVUpDLElBQUFBLElBQUksRUFBRSxDQUFDLFdBQUQsRUFBYyxTQUFkO0FBVkYsR0FEdUI7QUFhN0JkLEVBQUFBLFFBQVEsRUFDTiw2SEFkMkI7QUFlN0JDLEVBQUFBLFFBQVEsRUFBRTtBQWZtQixDQUF4Qjs7QUFrQkEsTUFBTStDLDRCQUE0QixHQUFHO0FBQzFDMUMsRUFBQUEsSUFBSSxFQUFFO0FBQ0pLLElBQUFBLElBQUksRUFBRSxLQURGO0FBRUpELElBQUFBLEtBQUssRUFBRSxFQUZIO0FBR0pFLElBQUFBLE9BQU8sRUFBRSxDQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLFFBQW5CLENBSEw7QUFJSkcsSUFBQUEsS0FBSyxFQUFFLENBQUMsV0FBRCxDQUpIO0FBS0pSLElBQUFBLFdBQVcsRUFBRSx1REFMVDtBQU1KQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQix5QkFBbkIsQ0FOSjtBQU9KeUMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xDLE1BQUFBLE1BQU0sRUFBRSxDQUFDLG1CQUFELEVBQXNCLGtCQUF0QixDQURIO0FBRUxDLE1BQUFBLFNBQVMsRUFBRSxDQUFDLGFBQUQsRUFBZ0IsaUJBQWhCLENBRk47QUFHTDFDLE1BQUFBLEVBQUUsRUFBRSxDQUFDLE9BQUQsRUFBVSxPQUFWO0FBSEMsS0FQSDtBQVlKQSxJQUFBQSxFQUFFLEVBQUUsTUFaQTtBQWFKTyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixNQUFsQixDQWJUO0FBY0pHLElBQUFBLFNBQVMsRUFBRSxDQWRQO0FBZUpMLElBQUFBLElBQUksRUFBRSxDQUFDLFdBQUQsRUFBYyxTQUFkO0FBZkYsR0FEb0M7QUFrQjFDZCxFQUFBQSxRQUFRLEVBQ04sNkhBbkJ3QztBQW9CMUNDLEVBQUFBLFFBQVEsRUFBRTtBQXBCZ0MsQ0FBckM7O0FBdUJBLE1BQU1tRCxxQkFBcUIsR0FBRztBQUNuQ1AsRUFBQUEsSUFBSSxFQUFFO0FBQ0pRLElBQUFBLEtBQUssRUFBRSxjQURIO0FBRUpDLElBQUFBLE9BQU8sRUFBRTtBQUZMLEdBRDZCO0FBS25DdEQsRUFBQUEsUUFBUSxFQUNOLG9NQU5pQztBQU9uQ3VELEVBQUFBLEtBQUssRUFBRTtBQUNMQyxJQUFBQSxJQUFJLEVBQUU7QUFERCxHQVA0QjtBQVVuQ3ZELEVBQUFBLFFBQVEsRUFBRSxpQkFWeUI7QUFXbkNLLEVBQUFBLElBQUksRUFBRTtBQUNKSyxJQUFBQSxJQUFJLEVBQUUsS0FERjtBQUVKRCxJQUFBQSxLQUFLLEVBQUUsQ0FGSDtBQUdKRSxJQUFBQSxPQUFPLEVBQUUsQ0FBQyxRQUFELENBSEw7QUFJSkcsSUFBQUEsS0FBSyxFQUFFLENBQUMsV0FBRCxDQUpIO0FBS0pSLElBQUFBLFdBQVcsRUFBRSwrQkFMVDtBQU1KQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQix3QkFBbkIsQ0FOSjtBQU9KQyxJQUFBQSxFQUFFLEVBQUUsTUFQQTtBQVFKTyxJQUFBQSxXQUFXLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixDQVJUO0FBU0pILElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBVEg7QUFVSkMsSUFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQVZGO0FBWDZCLENBQTlCOztBQXlCQSxNQUFNMkMscUNBQXFDLEdBQUc7QUFDbkRuRCxFQUFBQSxJQUFJLEVBQUU7QUFDSkssSUFBQUEsSUFBSSxFQUFFLEtBREY7QUFFSkQsSUFBQUEsS0FBSyxFQUFFLENBRkg7QUFHSkgsSUFBQUEsV0FBVyxFQUFFLDJDQUhUO0FBSUpDLElBQUFBLE1BQU0sRUFBRSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLHVCQUFuQixDQUpKO0FBS0p5QyxJQUFBQSxLQUFLLEVBQUU7QUFDTEMsTUFBQUEsTUFBTSxFQUFFLENBQUMsbUJBQUQsRUFBc0Isa0JBQXRCLENBREg7QUFFTEMsTUFBQUEsU0FBUyxFQUFFLENBQUMsYUFBRCxFQUFnQixpQkFBaEIsQ0FGTjtBQUdMMUMsTUFBQUEsRUFBRSxFQUFFLENBQUMsT0FBRCxFQUFVLE9BQVY7QUFIQyxLQUxIO0FBVUpBLElBQUFBLEVBQUUsRUFBRSxNQVZBO0FBV0pJLElBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUQ7QUFYSCxHQUQ2QztBQWNuRFosRUFBQUEsUUFBUSxFQUFFLGlCQWR5QztBQWVuREQsRUFBQUEsUUFBUSxFQUNOO0FBaEJpRCxDQUE5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBBdXRoZW50aWNhdGlvbiBzYW1wbGUgYWxlcnRzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgaW52YWxpZExvZ2luUGFzc3dvcmQgPSB7XG4gIGRlY29kZXI6IHtcbiAgICBwYXJlbnQ6ICdzc2hkJyxcbiAgICBuYW1lOiAnc3NoZCcsXG4gIH0sXG4gIGZ1bGxfbG9nOlxuICAgICd7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzUzMzBdOiBGYWlsZWQgcGFzc3dvcmQgZm9yIHtkYXRhLnNyY3VzZXJ9IGZyb20ge2RhdGEuc3JjaXB9IHBvcnQge2RhdGEuc3JjcG9ydH0gc3NoMicsXG4gIGxvY2F0aW9uOiAnL3Zhci9sb2cvYXV0aC5sb2cnLFxuICBwcmVkZWNvZGVyOiB7XG4gICAgcHJvZ3JhbV9uYW1lOiAnc3NoZCcsXG4gICAgdGltZXN0YW1wOiAnQXByIDE3IDAwOjE3OjUyJyxcbiAgICBob3N0bmFtZTogJ2lwLTEwLTAtMS01MCcsXG4gIH0sXG4gIHJ1bGU6IHtcbiAgICBkZXNjcmlwdGlvbjogJ3NzaGQ6IGF1dGhlbnRpY2F0aW9uIGZhaWxlZC4nLFxuICAgIGdyb3VwczogWydzeXNsb2cnLCAnc3NoZCcsICdpbnZhbGlkX2xvZ2luJywgJ2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCddLFxuICAgIGlkOiA1NzE2LFxuICAgIGxldmVsOiA1LFxuICAgIG1haWw6IGZhbHNlLFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZExvZ2luVXNlciA9IHtcbiAgZGVjb2Rlcjoge1xuICAgIHBhcmVudDogJ3NzaGQnLFxuICAgIG5hbWU6ICdzc2hkJyxcbiAgfSxcbiAgZnVsbF9sb2c6XG4gICAgJ3twcmVkZWNvZGVyLnRpbWVzdGFtcH0ge3ByZWRlY29kZXIuaG9zdG5hbWV9IHNzaGRbMTAwMjJdOiBJbnZhbGlkIHVzZXIge2RhdGEuc3JjdXNlcn0gZnJvbSB7ZGF0YS5zcmN1c2VyfSBmcm9tIHtkYXRhLnNyY2lwfSBwb3J0IHtkYXRhLnNyY3BvcnR9IHNzaDInLFxuICBsb2NhdGlvbjogJy92YXIvbG9nL3NlY3VyZScsXG4gIHByZWRlY29kZXI6IHtcbiAgICBwcm9ncmFtX25hbWU6ICdzc2hkJyxcbiAgICB0aW1lc3RhbXA6ICdBcHIgMTcgMDA6MTc6NTInLFxuICAgIGhvc3RuYW1lOiAnaXAtMTAtMC0xLTUwJyxcbiAgfSxcbiAgcnVsZToge1xuICAgIGRlc2NyaXB0aW9uOiAnc3NoZDogQXR0ZW1wdCB0byBsb2dpbiB1c2luZyBhIG5vbi1leGlzdGVudCB1c2VyJyxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3NzaGQnLCAnaW52YWxpZF9sb2dpbicsICdhdXRoZW50aWNhdGlvbl9mYWlsZWQnXSxcbiAgICBpZDogNTcxMCxcbiAgICBsZXZlbDogNSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNCcsICcxMC4yLjUnLCAnMTAuNi4xJ10sXG4gICAgZ3BnMTM6IFsnNy4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnQVUuNiddLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpcGxlQXV0aGVudGljYXRpb25GYWlsdXJlcyA9IHtcbiAgZGVjb2Rlcjoge1xuICAgIHBhcmVudDogJ3NzaGQnLFxuICAgIG5hbWU6ICdzc2hkJyxcbiAgfSxcbiAgZnVsbF9sb2c6IGB7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzU0MTNdOiBGYWlsZWQgcGFzc3dvcmQgZm9yIGludmFsaWQgdXNlciB7ZGF0YS5zcmN1c2VyfSBmcm9tIHtkYXRhLnNyY2lwfSBwb3J0IHtkYXRhLnNyY3BvcnR9IHNzaDJgLFxuICBsb2NhdGlvbjogJy92YXIvbG9nL3NlY3VyZScsXG4gIHJ1bGU6IHtcbiAgICBkZXNjcmlwdGlvbjogJ3NzaGQ6IE11bHRpcGxlIGF1dGhlbnRpY2F0aW9uIGZhaWx1cmVzLicsXG4gICAgaWQ6IDU3MjAsXG4gICAgbGV2ZWw6IDEwLFxuICAgIGZyZXF1ZW5jeTogOCxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3NzaGQnLCAnYXV0aGVudGljYXRpb25fZmFpbHVyZXMnXSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNCcsICcxMC4yLjUnLCAnMTEuNCddLFxuICAgIGdwZzEzOiBbJzcuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43JywgJ1NJLjQnXSxcbiAgfSxcbiAgcHJlZGVjb2Rlcjoge1xuICAgIHByb2dyYW1fbmFtZTogJ3NzaGQnLFxuICAgIHRpbWVzdGFtcDogJ0FwciAxNyAwMDoxNzo1MicsXG4gICAgaG9zdG5hbWU6ICdpcC0xMC0wLTEtNTAnLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHdpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZCA9IHtcbiAgZnVsbF9sb2c6IGB7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzU0MTNdOiBGYWlsZWQgcGFzc3dvcmQgZm9yIGludmFsaWQgdXNlciB7ZGF0YS5zcmN1c2VyfSBmcm9tIHtkYXRhLnNyY2lwfSBwb3J0IHtkYXRhLnNyY3BvcnR9IHNzaDJgLFxuICBkYXRhX3dpbjoge1xuICAgIGV2ZW50ZGF0YToge1xuICAgICAgYXV0aGVudGljYXRpb25QYWNrYWdlTmFtZTogJ05UTE0nLFxuICAgICAgZmFpbHVyZVJlYXNvbjogJyUlMjMxMycsXG4gICAgICBrZXlMZW5ndGg6IDAsXG4gICAgICBsb2dvblByb2Nlc3NOYW1lOiAnTnRMbVNzcCcsXG4gICAgICBsb2dvblR5cGU6ICczJyxcbiAgICAgIHByb2Nlc3NJZDogJzB4MCcsXG4gICAgICBzdGF0dXM6ICcweGMwMDAwMDZkJyxcbiAgICAgIHN1YlN0YXR1czogJzB4YzAwMDAwNjQnLFxuICAgICAgc3ViamVjdExvZ29uSWQ6ICcweDAnLFxuICAgICAgc3ViamVjdFVzZXJTaWQ6ICdTLTEtMC0wJyxcbiAgICAgIHRhcmdldFVzZXJOYW1lOiAnRElSRUNUSU9OJyxcbiAgICB9LFxuICAgIHN5c3RlbToge1xuICAgICAgY2hhbm5lbDogJ1NlY3VyaXR5JyxcbiAgICAgIGtleXdvcmRzOiAnMHg4MDEwMDAwMDAwMDAwMDAwJyxcbiAgICAgIGxldmVsOiAnMCcsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICAgIG9wY29kZTogJzAnLFxuICAgICAgcHJvdmlkZXJHdWlkOiAnezU0ODQ5NjI1LTU0NzgtNDk5NC1hNWJhLTNlM2IwMzI4YzMwZH0nLFxuICAgICAgcHJvdmlkZXJOYW1lOiAnTWljcm9zb2Z0LVdpbmRvd3MtU2VjdXJpdHktQXVkaXRpbmcnLFxuICAgICAgc2V2ZXJpdHlWYWx1ZTogJ0FVRElUX0ZBSUxVUkUnLFxuICAgICAgdmVyc2lvbjogJzAnLFxuICAgIH0sXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBwYXJlbnQ6ICdzc2hkJyxcbiAgICBuYW1lOiAnd2luZG93c19ldmVudGNoYW5uZWwnLFxuICB9LFxuICBsb2NhdGlvbjogJ0V2ZW50Q2hhbm5lbCcsXG4gIHJ1bGU6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0xvZ29uIEZhaWx1cmUgLSBVbmtub3duIHVzZXIgb3IgYmFkIHBhc3N3b3JkJyxcbiAgICBncm91cHM6IFsnd2luZG93cycsICd3aW5kb3dzX3NlY3VyaXR5JywgJ3dpbl9hdXRoZW50aWNhdGlvbl9mYWlsZWQnXSxcbiAgICBpZDogNjAxMjIsXG4gICAgbGV2ZWw6IDUsXG4gICAgcGNpX2RzczogWycxMC4yLjQnLCAnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjEnLCAnQUMuNyddLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZXJMb2dpbkZhaWxlZCA9IHtcbiAgcnVsZToge1xuICAgIGlkOiA1NTAzLFxuICAgIGxldmVsOiA1LFxuICAgIGRlc2NyaXB0aW9uOiAnUEFNOiBVc2VyIGxvZ2luIGZhaWxlZC4nLFxuICAgIG1haWw6IGZhbHNlLFxuICAgIGdyb3VwczogWydwYW0nLCAnc3lzbG9nJywgJ2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCddLFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gIH0sXG4gIHByZWRlY29kZXI6IHtcbiAgICBwcm9ncmFtX25hbWU6ICdzc2hkJyxcbiAgICB0aW1lc3RhbXA6ICdBcHIgMTcgMDA6MDQ6NDAnLFxuICAgIGhvc3RuYW1lOiAnaXAtMTAtMC0xLTE3OCcsXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBuYW1lOiAncGFtJyxcbiAgfSxcbiAgbG9jYXRpb246ICcvdmFyL2xvZy9zZWN1cmUnLFxuICBmdWxsX2xvZzpcbiAgICAne3ByZWRlY29kZXIudGltZXN0YW1wfSB7cHJlZGVjb2Rlci5ob3N0bmFtZX0gc3NoZFsxMTI5NF06IHBhbV91bml4KHNzaGQ6YXV0aCk6IGF1dGhlbnRpY2F0aW9uIGZhaWx1cmU7IGxvZ25hbWU9IHVpZD17ZGF0YS51aWR9IGV1aWQ9e2RhdGEuZXVpZH0gdHR5PXtkYXRhLnR0eX0gcnVzZXI9IHJob3N0PXtkYXRhLnNyY2lwfSAgdXNlcj17ZGF0YS5kc3R1c2VyfScsXG59O1xuXG5leHBvcnQgY29uc3QgcGFzc3dvcmRDaGVja0ZhaWxlZCA9IHtcbiAgcnVsZToge1xuICAgIGxldmVsOiA1LFxuICAgIGRlc2NyaXB0aW9uOiAndW5peF9jaGtwd2Q6IFBhc3N3b3JkIGNoZWNrIGZhaWxlZC4nLFxuICAgIGlkOiAnNTU1NycsXG4gICAgbWFpbDogZmFsc2UsXG4gICAgZ3JvdXBzOiBbJ3BhbScsICdzeXNsb2cnLCAnYXV0aGVudGljYXRpb25fZmFpbGVkJ10sXG4gICAgcGNpX2RzczogWycxMC4yLjQnLCAnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNC4zJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgfSxcbiAgcHJlZGVjb2Rlcjoge1xuICAgIHByb2dyYW1fbmFtZTogJ3VuaXhfY2hrcHdkJyxcbiAgICB0aW1lc3RhbXA6ICdBcHIgMTcgMDA6MDc6MDQnLFxuICAgIGhvc3RuYW1lOiAnaXAtMTAtMC0xLTEzMicsXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBuYW1lOiAndW5peF9jaGtwd2QnLFxuICB9LFxuICBkYXRhOiB7IHNyY3VzZXI6ICdyb290JyB9LFxuICBsb2NhdGlvbjogJy92YXIvbG9nL3NlY3VyZScsXG4gIGZ1bGxfbG9nOlxuICAgICd7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSB7ZGVjb2Rlci5uYW1lfVsyOTU5M106IHBhc3N3b3JkIGNoZWNrIGZhaWxlZCBmb3IgdXNlciAoe2RhdGEuc3JjdXNlcn0pJyxcbn07XG5cbmV4cG9ydCBjb25zdCBub25FeGlzdGVudFVzZXIgPSB7XG4gIHJ1bGU6IHtcbiAgICBtYWlsOiBmYWxzZSxcbiAgICBsZXZlbDogNSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNCcsICcxMC4yLjUnLCAnMTAuNi4xJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgZGVzY3JpcHRpb246ICdzc2hkOiBBdHRlbXB0IHRvIGxvZ2luIHVzaW5nIGEgbm9uLWV4aXN0ZW50IHVzZXInLFxuICAgIGdyb3VwczogWydzeXNsb2cnLCAnc3NoZCcsICdpbnZhbGlkX2xvZ2luJywgJ2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCddLFxuICAgIGlkOiAnNTcxMCcsXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNycsICdBVS42J10sXG4gICAgZ3BnMTM6IFsnNy4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICB9LFxuICBmdWxsX2xvZzpcbiAgICAne3ByZWRlY29kZXIudGltZXN0YW1wfSB7cHJlZGVjb2Rlci5ob3N0bmFtZX0gc3NoZFsxNTcyNF06IEludmFsaWQgdXNlciB7ZGF0YS5zcmN1c2VyfSBmcm9tIHtkYXRhLnNyY2lwfSBwb3J0IHtkYXRhLnNyY3BvcnR9JyxcbiAgbG9jYXRpb246ICcvdmFyL2xvZy9zZWN1cmUnLFxufTtcblxuZXhwb3J0IGNvbnN0IGJydXRlRm9yY2VUcnlpbmdBY2Nlc3NTeXN0ZW0gPSB7XG4gIHJ1bGU6IHtcbiAgICBtYWlsOiBmYWxzZSxcbiAgICBsZXZlbDogMTAsXG4gICAgcGNpX2RzczogWycxMS40JywgJzEwLjIuNCcsICcxMC4yLjUnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NzaGQ6IGJydXRlIGZvcmNlIHRyeWluZyB0byBnZXQgYWNjZXNzIHRvIHRoZSBzeXN0ZW0uJyxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3NzaGQnLCAnYXV0aGVudGljYXRpb25fZmFpbHVyZXMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJywgJ0xhdGVyYWwgTW92ZW1lbnQnXSxcbiAgICAgIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZScsICdSZW1vdmUgU2VydmljZXMnXSxcbiAgICAgIGlkOiBbJ1QxMTEwJywgJ1QxMDIxJ10sXG4gICAgfSxcbiAgICBpZDogJzU3MTInLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnLCAnQVUuMTQnLCAnQUMuNyddLFxuICAgIGZyZXF1ZW5jeTogOCxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gIH0sXG4gIGZ1bGxfbG9nOlxuICAgICd7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzE1NzIyXTogSW52YWxpZCB1c2VyIHtkYXRhLnNyY3VzZXJ9IGZyb20ge2RhdGEuc3JjaXB9IHBvcnQge2RhdGEuc3JjcG9ydH0nLFxuICBsb2NhdGlvbjogJy92YXIvbG9nL3NlY3VyZScsXG59O1xuXG5leHBvcnQgY29uc3QgYXV0aGVudGljYXRpb25TdWNjZXNzID0ge1xuICBkYXRhOiB7XG4gICAgc3JjaXA6ICc4NC4xMjIuNzEuODknLFxuICAgIGRzdHVzZXI6ICdlYzItdXNlcicsXG4gIH0sXG4gIGZ1bGxfbG9nOlxuICAgICd7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzEyNzI3XTogQWNjZXB0ZWQgcHVibGlja2V5IGZvciB7ZGF0YS5kc3R1c2VyfSBmcm9tIHtkYXRhLnNyY2lwfSBwb3J0IHtkYXRhLnNyY3BvcnR9IHNzaDI6IFJTQSBTSEEyNTY6RVQyOStuYmlIcXJLczFnVWV3V1RGUkNIV2RPL3ZNb1JRWFBFU1duOFpHNCcsXG4gIGlucHV0OiB7XG4gICAgdHlwZTogJ2xvZycsXG4gIH0sXG4gIGxvY2F0aW9uOiAnL3Zhci9sb2cvc2VjdXJlJyxcbiAgcnVsZToge1xuICAgIG1haWw6IGZhbHNlLFxuICAgIGxldmVsOiAzLFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgZGVzY3JpcHRpb246ICdzc2hkOiBhdXRoZW50aWNhdGlvbiBzdWNjZXNzLicsXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdzc2hkJywgJ2F1dGhlbnRpY2F0aW9uX3N1Y2Nlc3MnXSxcbiAgICBpZDogJzU3MTUnLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICBncGcxMzogWyc3LjEnLCAnNy4yJ10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgbWF4aW11bUF1dGhlbnRpY2F0aW9uQXR0ZW1wdHNFeGNlZWRlZCA9IHtcbiAgcnVsZToge1xuICAgIG1haWw6IGZhbHNlLFxuICAgIGxldmVsOiA4LFxuICAgIGRlc2NyaXB0aW9uOiAnTWF4aW11bSBhdXRoZW50aWNhdGlvbiBhdHRlbXB0cyBleGNlZWRlZC4nLFxuICAgIGdyb3VwczogWydzeXNsb2cnLCAnc3NoZCcsICdhdXRoZW50aWNhdGlvbl9mYWlsZWQnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJywgJ0xhdGVyYWwgTW92ZW1lbnQnXSxcbiAgICAgIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZScsICdSZW1vdmUgU2VydmljZXMnXSxcbiAgICAgIGlkOiBbJ1QxMTEwJywgJ1QxMDIxJ10sXG4gICAgfSxcbiAgICBpZDogJzU3NTgnLFxuICAgIGdwZzEzOiBbJzcuMSddLFxuICB9LFxuICBsb2NhdGlvbjogJy92YXIvbG9nL3NlY3VyZScsXG4gIGZ1bGxfbG9nOlxuICAgICd7cHJlZGVjb2Rlci50aW1lc3RhbXB9IHtwcmVkZWNvZGVyLmhvc3RuYW1lfSBzc2hkWzE5NzY3XTogZXJyb3I6IG1heGltdW0gYXV0aGVudGljYXRpb24gYXR0ZW1wdHMgZXhjZWVkZWQgZm9yIHtkYXRhLmRzdHVzZXJ9IGZyb20ge2RhdGEuc3JjaXB9IHBvcnQge2RhdGEuc3JjcG9ydH0gc3NoMiBbcHJlYXV0aF0nLFxufTtcbiJdfQ==