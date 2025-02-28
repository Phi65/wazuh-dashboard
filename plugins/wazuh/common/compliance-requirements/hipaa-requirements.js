"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hipaaRequirementsFile = void 0;

/*
 * Wazuh app - Module for HIPAA requirements
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const hipaaRequirementsFile = {
  '164.312.a.1': 'Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have access.',
  '164.312.a.2.I': 'Assign a unique name and/or number for identifying and tracking user identity.',
  '164.312.a.2.II': 'Establish (and implement as needed) procedures for obtaining necessary electronic protected health information during an emergency.',
  '164.312.a.2.III': 'Implement electronic procedures that terminate an electronic session  after a predetermined time of inactivity.',
  '164.312.a.2.IV': 'Implement a mechanism to encrypt and decrypt electronic protected health information.',
  '164.312.b': 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.',
  '164.312.c.1': 'Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.',
  '164.312.c.2': 'Implement electronic mechanisms to corroborate that electronic protected health information has not been altered or destroyed in an unauthorized manner.',
  '164.312.d': 'Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.',
  '164.312.e.1': 'Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network.',
  '164.312.e.2.I': 'Implement security measures to ensure that electronically transmitted electronic protected health information is not improperly modified without detection until disposed of.',
  '164.312.e.2.II': 'Implement a mechanism to encrypt electronic protected health information whenever deemed appropriate.'
};
exports.hipaaRequirementsFile = hipaaRequirementsFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpcGFhLXJlcXVpcmVtZW50cy50cyJdLCJuYW1lcyI6WyJoaXBhYVJlcXVpcmVtZW50c0ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTUEscUJBQXFCLEdBQUc7QUFDbkMsaUJBQ0UsbU5BRmlDO0FBR25DLG1CQUNFLGdGQUppQztBQUtuQyxvQkFDRSxxSUFOaUM7QUFPbkMscUJBQ0UsaUhBUmlDO0FBU25DLG9CQUNFLHVGQVZpQztBQVduQyxlQUNFLGlMQVppQztBQWFuQyxpQkFDRSwrSEFkaUM7QUFlbkMsaUJBQ0UsMEpBaEJpQztBQWlCbkMsZUFDRSxzSUFsQmlDO0FBbUJuQyxpQkFDRSw0TEFwQmlDO0FBcUJuQyxtQkFDRSwrS0F0QmlDO0FBdUJuQyxvQkFDRTtBQXhCaUMsQ0FBOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gTW9kdWxlIGZvciBISVBBQSByZXF1aXJlbWVudHNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5leHBvcnQgY29uc3QgaGlwYWFSZXF1aXJlbWVudHNGaWxlID0ge1xuICAnMTY0LjMxMi5hLjEnOlxuICAgICdJbXBsZW1lbnQgdGVjaG5pY2FsIHBvbGljaWVzIGFuZCBwcm9jZWR1cmVzIGZvciBlbGVjdHJvbmljIGluZm9ybWF0aW9uIHN5c3RlbXMgdGhhdCBtYWludGFpbiBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gdG8gYWxsb3cgYWNjZXNzIG9ubHkgdG8gdGhvc2UgcGVyc29ucyBvciBzb2Z0d2FyZSBwcm9ncmFtcyB0aGF0IGhhdmUgYWNjZXNzLicsXG4gICcxNjQuMzEyLmEuMi5JJzpcbiAgICAnQXNzaWduIGEgdW5pcXVlIG5hbWUgYW5kL29yIG51bWJlciBmb3IgaWRlbnRpZnlpbmcgYW5kIHRyYWNraW5nIHVzZXIgaWRlbnRpdHkuJyxcbiAgJzE2NC4zMTIuYS4yLklJJzpcbiAgICAnRXN0YWJsaXNoIChhbmQgaW1wbGVtZW50IGFzIG5lZWRlZCkgcHJvY2VkdXJlcyBmb3Igb2J0YWluaW5nIG5lY2Vzc2FyeSBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gZHVyaW5nIGFuIGVtZXJnZW5jeS4nLFxuICAnMTY0LjMxMi5hLjIuSUlJJzpcbiAgICAnSW1wbGVtZW50IGVsZWN0cm9uaWMgcHJvY2VkdXJlcyB0aGF0IHRlcm1pbmF0ZSBhbiBlbGVjdHJvbmljIHNlc3Npb24gIGFmdGVyIGEgcHJlZGV0ZXJtaW5lZCB0aW1lIG9mIGluYWN0aXZpdHkuJyxcbiAgJzE2NC4zMTIuYS4yLklWJzpcbiAgICAnSW1wbGVtZW50IGEgbWVjaGFuaXNtIHRvIGVuY3J5cHQgYW5kIGRlY3J5cHQgZWxlY3Ryb25pYyBwcm90ZWN0ZWQgaGVhbHRoIGluZm9ybWF0aW9uLicsXG4gICcxNjQuMzEyLmInOlxuICAgICdJbXBsZW1lbnQgaGFyZHdhcmUsIHNvZnR3YXJlLCBhbmQvb3IgcHJvY2VkdXJhbCBtZWNoYW5pc21zIHRoYXQgcmVjb3JkIGFuZCBleGFtaW5lIGFjdGl2aXR5IGluIGluZm9ybWF0aW9uIHN5c3RlbXMgdGhhdCBjb250YWluIG9yIHVzZSBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24uJyxcbiAgJzE2NC4zMTIuYy4xJzpcbiAgICAnSW1wbGVtZW50IHBvbGljaWVzIGFuZCBwcm9jZWR1cmVzIHRvIHByb3RlY3QgZWxlY3Ryb25pYyBwcm90ZWN0ZWQgaGVhbHRoIGluZm9ybWF0aW9uIGZyb20gaW1wcm9wZXIgYWx0ZXJhdGlvbiBvciBkZXN0cnVjdGlvbi4nLFxuICAnMTY0LjMxMi5jLjInOlxuICAgICdJbXBsZW1lbnQgZWxlY3Ryb25pYyBtZWNoYW5pc21zIHRvIGNvcnJvYm9yYXRlIHRoYXQgZWxlY3Ryb25pYyBwcm90ZWN0ZWQgaGVhbHRoIGluZm9ybWF0aW9uIGhhcyBub3QgYmVlbiBhbHRlcmVkIG9yIGRlc3Ryb3llZCBpbiBhbiB1bmF1dGhvcml6ZWQgbWFubmVyLicsXG4gICcxNjQuMzEyLmQnOlxuICAgICdJbXBsZW1lbnQgcHJvY2VkdXJlcyB0byB2ZXJpZnkgdGhhdCBhIHBlcnNvbiBvciBlbnRpdHkgc2Vla2luZyBhY2Nlc3MgdG8gZWxlY3Ryb25pYyBwcm90ZWN0ZWQgaGVhbHRoIGluZm9ybWF0aW9uIGlzIHRoZSBvbmUgY2xhaW1lZC4nLFxuICAnMTY0LjMxMi5lLjEnOlxuICAgICdJbXBsZW1lbnQgdGVjaG5pY2FsIHNlY3VyaXR5IG1lYXN1cmVzIHRvIGd1YXJkIGFnYWluc3QgdW5hdXRob3JpemVkIGFjY2VzcyB0byBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gdGhhdCBpcyBiZWluZyB0cmFuc21pdHRlZCBvdmVyIGFuIGVsZWN0cm9uaWMgY29tbXVuaWNhdGlvbnMgbmV0d29yay4nLFxuICAnMTY0LjMxMi5lLjIuSSc6XG4gICAgJ0ltcGxlbWVudCBzZWN1cml0eSBtZWFzdXJlcyB0byBlbnN1cmUgdGhhdCBlbGVjdHJvbmljYWxseSB0cmFuc21pdHRlZCBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gaXMgbm90IGltcHJvcGVybHkgbW9kaWZpZWQgd2l0aG91dCBkZXRlY3Rpb24gdW50aWwgZGlzcG9zZWQgb2YuJyxcbiAgJzE2NC4zMTIuZS4yLklJJzpcbiAgICAnSW1wbGVtZW50IGEgbWVjaGFuaXNtIHRvIGVuY3J5cHQgZWxlY3Ryb25pYyBwcm90ZWN0ZWQgaGVhbHRoIGluZm9ybWF0aW9uIHdoZW5ldmVyIGRlZW1lZCBhcHByb3ByaWF0ZS4nXG59O1xuIl19