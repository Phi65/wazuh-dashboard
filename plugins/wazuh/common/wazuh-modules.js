"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WAZUH_MODULES = void 0;

/*
 * Wazuh app - Simple description for each App tabs
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const WAZUH_MODULES = {
  general: {
    title: 'Security events',
    description: 'Browse through your security alerts, identifying issues and threats in your environment.'
  },
  fim: {
    title: 'Integrity monitoring',
    description: 'Alerts related to file changes, including permissions, content, ownership and attributes.'
  },
  pm: {
    title: 'Policy monitoring',
    description: 'Verify that your systems are configured according to your security policies baseline.'
  },
  vuls: {
    title: 'Vulnerabilities',
    description: 'Discover what applications in your environment are affected by well-known vulnerabilities.'
  },
  oscap: {
    title: 'OpenSCAP',
    description: 'Configuration assessment and automation of compliance monitoring using SCAP checks.'
  },
  audit: {
    title: 'System auditing',
    description: 'Audit users behavior, monitoring command execution and alerting on access to critical files.'
  },
  pci: {
    title: 'PCI DSS',
    description: 'Global security standard for entities that process, store or transmit payment cardholder data.'
  },
  gdpr: {
    title: 'GDPR',
    description: 'General Data Protection Regulation (GDPR) sets guidelines for processing of personal data.'
  },
  hipaa: {
    title: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act of 1996 (HIPAA) provides data privacy and security provisions for safeguarding medical information.'
  },
  nist: {
    title: 'NIST 800-53',
    description: 'National Institute of Standards and Technology Special Publication 800-53 (NIST 800-53) sets guidelines for federal information systems.'
  },
  tsc: {
    title: 'TSC',
    description: 'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy'
  },
  ciscat: {
    title: 'CIS-CAT',
    description: 'Configuration assessment using Center of Internet Security scanner and SCAP checks.'
  },
  aws: {
    title: 'Amazon AWS',
    description: 'Security events related to your Amazon AWS services, collected directly via AWS API.'
  },
  office: {
    title: 'Office 365',
    description: 'Security events related to your Office 365 services.'
  },
  gcp: {
    title: 'Google Cloud Platform',
    description: 'Security events related to your Google Cloud Platform services, collected directly via GCP API.' // TODO GCP

  },
  virustotal: {
    title: 'VirusTotal',
    description: 'Alerts resulting from VirusTotal analysis of suspicious files via an integration with their API.'
  },
  mitre: {
    title: 'MITRE ATT&CK',
    description: 'Security events from the knowledge base of adversary tactics and techniques based on real-world observations'
  },
  syscollector: {
    title: 'Inventory data',
    description: 'Applications, network configuration, open ports and processes running on your monitored systems.'
  },
  stats: {
    title: 'Stats',
    description: 'Stats for agent and logcollector'
  },
  configuration: {
    title: 'Configuration',
    description: 'Check the current agent configuration remotely applied by its group.'
  },
  osquery: {
    title: 'Osquery',
    description: 'Osquery can be used to expose an operating system as a high-performance relational database.'
  },
  sca: {
    title: 'Security configuration assessment',
    description: 'Scan your assets as part of a configuration assessment audit.'
  },
  docker: {
    title: 'Docker listener',
    description: 'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events.'
  },
  github: {
    title: 'GitHub',
    description: 'Monitoring events from audit logs of your GitHub organizations.'
  },
  devTools: {
    title: 'API console',
    description: 'Test the Wazuh API endpoints.'
  },
  logtest: {
    title: 'Test your logs',
    description: 'Check your ruleset testing logs.'
  },
  testConfiguration: {
    title: 'Test your configurations',
    description: 'Check configurations before applying them'
  }
};
exports.WAZUH_MODULES = WAZUH_MODULES;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhenVoLW1vZHVsZXMudHMiXSwibmFtZXMiOlsiV0FaVUhfTU9EVUxFUyIsImdlbmVyYWwiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiZmltIiwicG0iLCJ2dWxzIiwib3NjYXAiLCJhdWRpdCIsInBjaSIsImdkcHIiLCJoaXBhYSIsIm5pc3QiLCJ0c2MiLCJjaXNjYXQiLCJhd3MiLCJvZmZpY2UiLCJnY3AiLCJ2aXJ1c3RvdGFsIiwibWl0cmUiLCJzeXNjb2xsZWN0b3IiLCJzdGF0cyIsImNvbmZpZ3VyYXRpb24iLCJvc3F1ZXJ5Iiwic2NhIiwiZG9ja2VyIiwiZ2l0aHViIiwiZGV2VG9vbHMiLCJsb2d0ZXN0IiwidGVzdENvbmZpZ3VyYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTUEsYUFBYSxHQUFHO0FBQzNCQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsS0FBSyxFQUFFLGlCQURBO0FBRVBDLElBQUFBLFdBQVcsRUFDVDtBQUhLLEdBRGtCO0FBTTNCQyxFQUFBQSxHQUFHLEVBQUU7QUFDSEYsSUFBQUEsS0FBSyxFQUFFLHNCQURKO0FBRUhDLElBQUFBLFdBQVcsRUFDVDtBQUhDLEdBTnNCO0FBVzNCRSxFQUFBQSxFQUFFLEVBQUU7QUFDRkgsSUFBQUEsS0FBSyxFQUFFLG1CQURMO0FBRUZDLElBQUFBLFdBQVcsRUFDVDtBQUhBLEdBWHVCO0FBZ0IzQkcsRUFBQUEsSUFBSSxFQUFFO0FBQ0pKLElBQUFBLEtBQUssRUFBRSxpQkFESDtBQUVKQyxJQUFBQSxXQUFXLEVBQ1Q7QUFIRSxHQWhCcUI7QUFxQjNCSSxFQUFBQSxLQUFLLEVBQUU7QUFDTEwsSUFBQUEsS0FBSyxFQUFFLFVBREY7QUFFTEMsSUFBQUEsV0FBVyxFQUNUO0FBSEcsR0FyQm9CO0FBMEIzQkssRUFBQUEsS0FBSyxFQUFFO0FBQ0xOLElBQUFBLEtBQUssRUFBRSxp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QUU7QUFDakIzQixJQUFBQSxLQUFLLEVBQUUsMEJBRFU7QUFFakJDLElBQUFBLFdBQVcsRUFBRTtBQUZJO0FBL0hRLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIFNpbXBsZSBkZXNjcmlwdGlvbiBmb3IgZWFjaCBBcHAgdGFic1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBXQVpVSF9NT0RVTEVTID0ge1xuICBnZW5lcmFsOiB7XG4gICAgdGl0bGU6ICdTZWN1cml0eSBldmVudHMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0Jyb3dzZSB0aHJvdWdoIHlvdXIgc2VjdXJpdHkgYWxlcnRzLCBpZGVudGlmeWluZyBpc3N1ZXMgYW5kIHRocmVhdHMgaW4geW91ciBlbnZpcm9ubWVudC4nXG4gIH0sXG4gIGZpbToge1xuICAgIHRpdGxlOiAnSW50ZWdyaXR5IG1vbml0b3JpbmcnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0FsZXJ0cyByZWxhdGVkIHRvIGZpbGUgY2hhbmdlcywgaW5jbHVkaW5nIHBlcm1pc3Npb25zLCBjb250ZW50LCBvd25lcnNoaXAgYW5kIGF0dHJpYnV0ZXMuJ1xuICB9LFxuICBwbToge1xuICAgIHRpdGxlOiAnUG9saWN5IG1vbml0b3JpbmcnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1ZlcmlmeSB0aGF0IHlvdXIgc3lzdGVtcyBhcmUgY29uZmlndXJlZCBhY2NvcmRpbmcgdG8geW91ciBzZWN1cml0eSBwb2xpY2llcyBiYXNlbGluZS4nXG4gIH0sXG4gIHZ1bHM6IHtcbiAgICB0aXRsZTogJ1Z1bG5lcmFiaWxpdGllcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRGlzY292ZXIgd2hhdCBhcHBsaWNhdGlvbnMgaW4geW91ciBlbnZpcm9ubWVudCBhcmUgYWZmZWN0ZWQgYnkgd2VsbC1rbm93biB2dWxuZXJhYmlsaXRpZXMuJ1xuICB9LFxuICBvc2NhcDoge1xuICAgIHRpdGxlOiAnT3BlblNDQVAnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0NvbmZpZ3VyYXRpb24gYXNzZXNzbWVudCBhbmQgYXV0b21hdGlvbiBvZiBjb21wbGlhbmNlIG1vbml0b3JpbmcgdXNpbmcgU0NBUCBjaGVja3MuJ1xuICB9LFxuICBhdWRpdDoge1xuICAgIHRpdGxlOiAnU3lzdGVtIGF1ZGl0aW5nJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdBdWRpdCB1c2VycyBiZWhhdmlvciwgbW9uaXRvcmluZyBjb21tYW5kIGV4ZWN1dGlvbiBhbmQgYWxlcnRpbmcgb24gYWNjZXNzIHRvIGNyaXRpY2FsIGZpbGVzLidcbiAgfSxcbiAgcGNpOiB7XG4gICAgdGl0bGU6ICdQQ0kgRFNTJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdHbG9iYWwgc2VjdXJpdHkgc3RhbmRhcmQgZm9yIGVudGl0aWVzIHRoYXQgcHJvY2Vzcywgc3RvcmUgb3IgdHJhbnNtaXQgcGF5bWVudCBjYXJkaG9sZGVyIGRhdGEuJ1xuICB9LFxuICBnZHByOiB7XG4gICAgdGl0bGU6ICdHRFBSJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdHZW5lcmFsIERhdGEgUHJvdGVjdGlvbiBSZWd1bGF0aW9uIChHRFBSKSBzZXRzIGd1aWRlbGluZXMgZm9yIHByb2Nlc3Npbmcgb2YgcGVyc29uYWwgZGF0YS4nXG4gIH0sXG4gIGhpcGFhOiB7XG4gICAgdGl0bGU6ICdISVBBQScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnSGVhbHRoIEluc3VyYW5jZSBQb3J0YWJpbGl0eSBhbmQgQWNjb3VudGFiaWxpdHkgQWN0IG9mIDE5OTYgKEhJUEFBKSBwcm92aWRlcyBkYXRhIHByaXZhY3kgYW5kIHNlY3VyaXR5IHByb3Zpc2lvbnMgZm9yIHNhZmVndWFyZGluZyBtZWRpY2FsIGluZm9ybWF0aW9uLidcbiAgfSxcbiAgbmlzdDoge1xuICAgIHRpdGxlOiAnTklTVCA4MDAtNTMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ05hdGlvbmFsIEluc3RpdHV0ZSBvZiBTdGFuZGFyZHMgYW5kIFRlY2hub2xvZ3kgU3BlY2lhbCBQdWJsaWNhdGlvbiA4MDAtNTMgKE5JU1QgODAwLTUzKSBzZXRzIGd1aWRlbGluZXMgZm9yIGZlZGVyYWwgaW5mb3JtYXRpb24gc3lzdGVtcy4nXG4gIH0sXG4gIHRzYzoge1xuICAgIHRpdGxlOiAnVFNDJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUcnVzdCBTZXJ2aWNlcyBDcml0ZXJpYSBmb3IgU2VjdXJpdHksIEF2YWlsYWJpbGl0eSwgUHJvY2Vzc2luZyBJbnRlZ3JpdHksIENvbmZpZGVudGlhbGl0eSwgYW5kIFByaXZhY3knXG4gIH0sXG4gIGNpc2NhdDoge1xuICAgIHRpdGxlOiAnQ0lTLUNBVCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQ29uZmlndXJhdGlvbiBhc3Nlc3NtZW50IHVzaW5nIENlbnRlciBvZiBJbnRlcm5ldCBTZWN1cml0eSBzY2FubmVyIGFuZCBTQ0FQIGNoZWNrcy4nXG4gIH0sXG4gIGF3czoge1xuICAgIHRpdGxlOiAnQW1hem9uIEFXUycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnU2VjdXJpdHkgZXZlbnRzIHJlbGF0ZWQgdG8geW91ciBBbWF6b24gQVdTIHNlcnZpY2VzLCBjb2xsZWN0ZWQgZGlyZWN0bHkgdmlhIEFXUyBBUEkuJ1xuICB9LFxuICBvZmZpY2U6IHtcbiAgICB0aXRsZTogJ09mZmljZSAzNjUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1NlY3VyaXR5IGV2ZW50cyByZWxhdGVkIHRvIHlvdXIgT2ZmaWNlIDM2NSBzZXJ2aWNlcy4nXG4gIH0sXG4gIGdjcDoge1xuICAgIHRpdGxlOiAnR29vZ2xlIENsb3VkIFBsYXRmb3JtJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdTZWN1cml0eSBldmVudHMgcmVsYXRlZCB0byB5b3VyIEdvb2dsZSBDbG91ZCBQbGF0Zm9ybSBzZXJ2aWNlcywgY29sbGVjdGVkIGRpcmVjdGx5IHZpYSBHQ1AgQVBJLicgLy8gVE9ETyBHQ1BcbiAgfSxcbiAgdmlydXN0b3RhbDoge1xuICAgIHRpdGxlOiAnVmlydXNUb3RhbCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQWxlcnRzIHJlc3VsdGluZyBmcm9tIFZpcnVzVG90YWwgYW5hbHlzaXMgb2Ygc3VzcGljaW91cyBmaWxlcyB2aWEgYW4gaW50ZWdyYXRpb24gd2l0aCB0aGVpciBBUEkuJ1xuICB9LFxuICBtaXRyZToge1xuICAgIHRpdGxlOiAnTUlUUkUgQVRUJkNLJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdTZWN1cml0eSBldmVudHMgZnJvbSB0aGUga25vd2xlZGdlIGJhc2Ugb2YgYWR2ZXJzYXJ5IHRhY3RpY3MgYW5kIHRlY2huaXF1ZXMgYmFzZWQgb24gcmVhbC13b3JsZCBvYnNlcnZhdGlvbnMnXG4gIH0sXG4gIHN5c2NvbGxlY3Rvcjoge1xuICAgIHRpdGxlOiAnSW52ZW50b3J5IGRhdGEnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0FwcGxpY2F0aW9ucywgbmV0d29yayBjb25maWd1cmF0aW9uLCBvcGVuIHBvcnRzIGFuZCBwcm9jZXNzZXMgcnVubmluZyBvbiB5b3VyIG1vbml0b3JlZCBzeXN0ZW1zLidcbiAgfSxcbiAgc3RhdHM6IHtcbiAgICB0aXRsZTogJ1N0YXRzJyxcbiAgICBkZXNjcmlwdGlvbjogJ1N0YXRzIGZvciBhZ2VudCBhbmQgbG9nY29sbGVjdG9yJ1xuICB9LFxuICBjb25maWd1cmF0aW9uOiB7XG4gICAgdGl0bGU6ICdDb25maWd1cmF0aW9uJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdDaGVjayB0aGUgY3VycmVudCBhZ2VudCBjb25maWd1cmF0aW9uIHJlbW90ZWx5IGFwcGxpZWQgYnkgaXRzIGdyb3VwLidcbiAgfSxcbiAgb3NxdWVyeToge1xuICAgIHRpdGxlOiAnT3NxdWVyeScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnT3NxdWVyeSBjYW4gYmUgdXNlZCB0byBleHBvc2UgYW4gb3BlcmF0aW5nIHN5c3RlbSBhcyBhIGhpZ2gtcGVyZm9ybWFuY2UgcmVsYXRpb25hbCBkYXRhYmFzZS4nXG4gIH0sXG4gIHNjYToge1xuICAgIHRpdGxlOiAnU2VjdXJpdHkgY29uZmlndXJhdGlvbiBhc3Nlc3NtZW50JyxcbiAgICBkZXNjcmlwdGlvbjogJ1NjYW4geW91ciBhc3NldHMgYXMgcGFydCBvZiBhIGNvbmZpZ3VyYXRpb24gYXNzZXNzbWVudCBhdWRpdC4nXG4gIH0sXG4gIGRvY2tlcjoge1xuICAgIHRpdGxlOiAnRG9ja2VyIGxpc3RlbmVyJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdNb25pdG9yIGFuZCBjb2xsZWN0IHRoZSBhY3Rpdml0eSBmcm9tIERvY2tlciBjb250YWluZXJzIHN1Y2ggYXMgY3JlYXRpb24sIHJ1bm5pbmcsIHN0YXJ0aW5nLCBzdG9wcGluZyBvciBwYXVzaW5nIGV2ZW50cy4nXG4gIH0sXG4gIGdpdGh1Yjoge1xuICAgIHRpdGxlOiAnR2l0SHViJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdNb25pdG9yaW5nIGV2ZW50cyBmcm9tIGF1ZGl0IGxvZ3Mgb2YgeW91ciBHaXRIdWIgb3JnYW5pemF0aW9ucy4nXG4gIH0sXG4gIGRldlRvb2xzOiB7XG4gICAgdGl0bGU6ICdBUEkgY29uc29sZScsXG4gICAgZGVzY3JpcHRpb246ICdUZXN0IHRoZSBXYXp1aCBBUEkgZW5kcG9pbnRzLidcbiAgfSxcbiAgbG9ndGVzdDoge1xuICAgIHRpdGxlOiAnVGVzdCB5b3VyIGxvZ3MnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2hlY2sgeW91ciBydWxlc2V0IHRlc3RpbmcgbG9ncy4nXG4gIH0sXG4gIHRlc3RDb25maWd1cmF0aW9uOiB7XG4gICAgdGl0bGU6ICdUZXN0IHlvdXIgY29uZmlndXJhdGlvbnMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2hlY2sgY29uZmlndXJhdGlvbnMgYmVmb3JlIGFwcGx5aW5nIHRoZW0nXG4gIH1cbn07XG4iXX0=