"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationFields = void 0;
const AggregationFields = {
  'rule.id': {
    field: 'rule.id',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule ID'
  },
  'rule.description': {
    field: 'rule.description',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Description'
  },
  'rule.level': {
    field: 'rule.level',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Level'
  },
  'rule.groups': {
    field: 'rule.groups',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Groups',
    missing: '-'
  },
  'agent.name': {
    field: 'agent.name',
    size: 1000,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Agent name',
    missing: '-'
  },
  'syscheck.path': {
    field: 'syscheck.path',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Path',
    missing: '-'
  },
  'syscheck.event': {
    field: 'syscheck.event',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-'
  },
  'rule.pci_dss': {
    field: 'rule.pci_dss',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-'
  },
  'rule.gdpr': {
    field: 'rule.gdpr',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-'
  },
  'rule.nist_800_53': {
    field: 'rule.nist_800_53',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-'
  },
  'rule.hipaa': {
    field: 'rule.hipaa',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-'
  },
  'rule.tsc': {
    field: 'rule.tsc',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-'
  },
  'data.audit.exe': {
    field: 'data.audit.exe',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Command',
    missing: '-'
  },
  'data.audit.type': {
    field: 'data.audit.type',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Type',
    missing: '-'
  },
  'data.osquery.name': {
    field: 'data.osquery.name',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Name',
    missing: '-'
  },
  'data.osquery.action': {
    field: 'data.osquery.action',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-'
  },
  'data.osquery.pack': {
    field: 'data.osquery.pack',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Pack',
    missing: '-'
  },
  'data.osquery.calendarTime': {
    field: 'data.osquery.calendarTime',
    size: 2,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date',
    missing: '-'
  },
  'data.cis.rule_title': {
    field: 'data.cis.rule_title',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule title',
    missing: '-'
  },
  'data.cis.group': {
    field: 'data.cis.group',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Group',
    missing: '-'
  },
  'data.cis.result': {
    field: 'data.cis.result',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Result',
    missing: '-'
  },
  'data.title': {
    field: 'data.title',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Control',
    missing: '-'
  },
  'data.docker.Actor.Attributes.name': {
    field: 'data.docker.Actor.Attributes.name',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Container',
    missing: '-'
  },
  'data.docker.Action': {
    field: 'data.docker.Action',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-'
  },
  'timestamp': {
    field: 'timestamp',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date'
  },
  'data.github.org': {
    field: 'data.github.org',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Organization',
    missing: '-'
  },
  'data.oscap.check.title': {
    field: 'data.oscap.check.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Title',
    missing: '-'
  },
  'data.oscap.scan.profile.title': {
    field: 'data.oscap.scan.profile.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Profile',
    missing: '-'
  }
};
exports.AggregationFields = AggregationFields;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZ3JlZ2F0aW9uX2ZpZWxkcy50cyJdLCJuYW1lcyI6WyJBZ2dyZWdhdGlvbkZpZWxkcyIsImZpZWxkIiwic2l6ZSIsIm9yZGVyIiwib3JkZXJCeSIsImN1c3RvbUxhYmVsIiwibWlzc2luZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTUEsaUJBQWlCLEdBQUc7QUFDL0IsYUFBVztBQUNUQyxJQUFBQSxLQUFLLEVBQUUsU0FERTtBQUVUQyxJQUFBQSxJQUFJLEVBQUUsRUFGRztBQUdUQyxJQUFBQSxLQUFLLEVBQUUsTUFIRTtBQUlUQyxJQUFBQSxPQUFPLEVBQUUsR0FKQTtBQUtUQyxJQUFBQSxXQUFXLEVBQUU7QUFMSixHQURvQjtBQVEvQixzQkFBb0I7QUFDbEJKLElBQUFBLEtBQUssRUFBRSxrQkFEVztBQUVsQkMsSUFBQUEsSUFBSSxFQUFFLEVBRlk7QUFHbEJDLElBQUFBLEtBQUssRUFBRSxNQUhXO0FBSWxCQyxJQUFBQSxPQUFPLEVBQUUsR0FKUztBQUtsQkMsSUFBQUEsV0FBVyxFQUFFO0FBTEssR0FSVztBQWUvQixnQkFBYztBQUNaSixJQUFBQSxLQUFLLEVBQUUsWUFESztBQUVaQyxJQUFBQSxJQUFJLEVBQUUsRUFGTTtBQUdaQyxJQUFBQSxLQUFLLEVBQUUsTUFISztBQUlaQyxJQUFBQSxPQUFPLEVBQUUsR0FKRztBQUtaQyxJQUFBQSxXQUFXLEVBQUU7QUFMRCxHQWZpQjtBQXNCL0IsaUJBQWU7QUFDYkosSUFBQUEsS0FBSyxFQUFFLGFBRE07QUFFYkMsSUFBQUEsSUFBSSxFQUFFLEVBRk87QUFHYkMsSUFBQUEsS0FBSyxFQUFFLE1BSE07QUFJYkMsSUFBQUEsT0FBTyxFQUFFLEdBSkk7QUFLYkMsSUFBQUEsV0FBVyxFQUFFLFFBTEE7QUFNYkMsSUFBQUEsT0FBTyxFQUFFO0FBTkksR0F0QmdCO0FBOEIvQixnQkFBYztBQUNaTCxJQUFBQSxLQUFLLEVBQUUsWUFESztBQUVaQyxJQUFBQSxJQUFJLEVBQUUsSUFGTTtBQUdaQyxJQUFB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O0FBS3BCQyxJQUFBQSxXQUFXLEVBQUUsUUFMTztBQU1wQkMsSUFBQUEsT0FBTyxFQUFFO0FBTlcsR0F0TFM7QUE4TC9CLGVBQWE7QUFDWEwsSUFBQUEsS0FBSyxFQUFFLFdBREk7QUFFWEMsSUFBQUEsSUFBSSxFQUFFLENBRks7QUFHWEMsSUFBQUEsS0FBSyxFQUFFLE1BSEk7QUFJWEMsSUFBQUEsT0FBTyxFQUFFLEdBSkU7QUFLWEMsSUFBQUEsV0FBVyxFQUFFO0FBTEYsR0E5TGtCO0FBcU0vQixxQkFBbUI7QUFDakJKLElBQUFBLEtBQUssRUFBRSxpQkFEVTtBQUVqQkMsSUFBQUEsSUFBSSxFQUFFLEVBRlc7QUFHakJDLElBQUFBLEtBQUssRUFBRSxNQUhVO0FBSWpCQyxJQUFBQSxPQUFPLEVBQUUsR0FKUTtBQUtqQkMsSUFBQUEsV0FBVyxFQUFFLGNBTEk7QUFNakJDLElBQUFBLE9BQU8sRUFBRTtBQU5RLEdBck1ZO0FBNk0vQiw0QkFBMEI7QUFDeEJMLElBQUFBLEtBQUssRUFBRSx3QkFEaUI7QUFFeEJDLElBQUFBLElBQUksRUFBRSxDQUZrQjtBQUd4QkMsSUFBQUEsS0FBSyxFQUFFLE1BSGlCO0FBSXhCQyxJQUFBQSxPQUFPLEVBQUUsR0FKZTtBQUt4QkMsSUFBQUEsV0FBVyxFQUFFLE9BTFc7QUFNeEJDLElBQUFBLE9BQU8sRUFBRTtBQU5lLEdBN01LO0FBcU4vQixtQ0FBaUM7QUFDL0JMLElBQUFBLEtBQUssRUFBRSwrQkFEd0I7QUFFL0JDLElBQUFBLElBQUksRUFBRSxDQUZ5QjtBQUcvQkMsSUFBQUEsS0FBSyxFQUFFLE1BSHdCO0FBSS9CQyxJQUFBQSxPQUFPLEVBQUUsR0FKc0I7QUFLL0JDLElBQUFBLFdBQVcsRUFBRSxTQUxrQjtBQU0vQkMsSUFBQUEsT0FBTyxFQUFFO0FBTnNCO0FBck5GLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFnZ3JlZ2F0aW9uRmllbGRzID0ge1xuICAncnVsZS5pZCc6IHtcbiAgICBmaWVsZDogJ3J1bGUuaWQnLFxuICAgIHNpemU6IDUwLFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnUnVsZSBJRCcsXG4gIH0sXG4gICdydWxlLmRlc2NyaXB0aW9uJzoge1xuICAgIGZpZWxkOiAncnVsZS5kZXNjcmlwdGlvbicsXG4gICAgc2l6ZTogMjAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdEZXNjcmlwdGlvbicsXG4gIH0sXG4gICdydWxlLmxldmVsJzoge1xuICAgIGZpZWxkOiAncnVsZS5sZXZlbCcsXG4gICAgc2l6ZTogMTIsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdMZXZlbCcsXG4gIH0sXG4gICdydWxlLmdyb3Vwcyc6IHtcbiAgICBmaWVsZDogJ3J1bGUuZ3JvdXBzJyxcbiAgICBzaXplOiA1MCxcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ0dyb3VwcycsXG4gICAgbWlzc2luZzogJy0nLFxuICB9LFxuICAnYWdlbnQubmFtZSc6IHtcbiAgICBmaWVsZDogJ2FnZW50Lm5hbWUnLFxuICAgIHNpemU6IDEwMDAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdBZ2VudCBuYW1lJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdzeXNjaGVjay5wYXRoJzoge1xuICAgIGZpZWxkOiAnc3lzY2hlY2sucGF0aCcsXG4gICAgc2l6ZTogMjAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdQYXRoJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdzeXNjaGVjay5ldmVudCc6IHtcbiAgICBmaWVsZDogJ3N5c2NoZWNrLmV2ZW50JyxcbiAgICBzaXplOiAxMixcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ0FjdGlvbicsXG4gICAgbWlzc2luZzogJy0nLFxuICB9LFxuICAncnVsZS5wY2lfZHNzJzoge1xuICAgIGZpZWxkOiAncnVsZS5wY2lfZHNzJyxcbiAgICBzaXplOiAxMCxcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ1JlcXVpcmVtZW50JyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdydWxlLmdkcHInOiB7XG4gICAgZmllbGQ6ICdydWxlLmdkcHInLFxuICAgIHNpemU6IDEwLFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnUmVxdWlyZW1lbnQnLFxuICAgIG1pc3Npbmc6ICctJyxcbiAgfSxcbiAgJ3J1bGUubmlzdF84MDBfNTMnOiB7XG4gICAgZmllbGQ6ICdydWxlLm5pc3RfODAwXzUzJyxcbiAgICBzaXplOiAxMCxcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ1JlcXVpcmVtZW50JyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdydWxlLmhpcGFhJzoge1xuICAgIGZpZWxkOiAncnVsZS5oaXBhYScsXG4gICAgc2l6ZTogMTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdSZXF1aXJlbWVudCcsXG4gICAgbWlzc2luZzogJy0nLFxuICB9LFxuICAncnVsZS50c2MnOiB7XG4gICAgZmllbGQ6ICdydWxlLnRzYycsXG4gICAgc2l6ZTogMTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdSZXF1aXJlbWVudCcsXG4gICAgbWlzc2luZzogJy0nLFxuICB9LFxuICAnZGF0YS5hdWRpdC5leGUnOiB7XG4gICAgZmllbGQ6ICdkYXRhLmF1ZGl0LmV4ZScsXG4gICAgc2l6ZTogMTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdDb21tYW5kJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmF1ZGl0LnR5cGUnOiB7XG4gICAgZmllbGQ6ICdkYXRhLmF1ZGl0LnR5cGUnLFxuICAgIHNpemU6IDUsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdUeXBlJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLm9zcXVlcnkubmFtZSc6IHtcbiAgICBmaWVsZDogJ2RhdGEub3NxdWVyeS5uYW1lJyxcbiAgICBzaXplOiAyMCxcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ05hbWUnLFxuICAgIG1pc3Npbmc6ICctJyxcbiAgfSxcbiAgJ2RhdGEub3NxdWVyeS5hY3Rpb24nOiB7XG4gICAgZmllbGQ6ICdkYXRhLm9zcXVlcnkuYWN0aW9uJyxcbiAgICBzaXplOiA1LFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnQWN0aW9uJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLm9zcXVlcnkucGFjayc6IHtcbiAgICBmaWVsZDogJ2RhdGEub3NxdWVyeS5wYWNrJyxcbiAgICBzaXplOiA1LFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnUGFjaycsXG4gICAgbWlzc2luZzogJy0nLFxuICB9LFxuICAnZGF0YS5vc3F1ZXJ5LmNhbGVuZGFyVGltZSc6IHtcbiAgICBmaWVsZDogJ2RhdGEub3NxdWVyeS5jYWxlbmRhclRpbWUnLFxuICAgIHNpemU6IDIsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdEYXRlJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmNpcy5ydWxlX3RpdGxlJzoge1xuICAgIGZpZWxkOiAnZGF0YS5jaXMucnVsZV90aXRsZScsXG4gICAgc2l6ZTogNTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdSdWxlIHRpdGxlJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmNpcy5ncm91cCc6IHtcbiAgICBmaWVsZDogJ2RhdGEuY2lzLmdyb3VwJyxcbiAgICBzaXplOiA1MCxcbiAgICBvcmRlcjogJ2Rlc2MnLFxuICAgIG9yZGVyQnk6ICcxJyxcbiAgICBjdXN0b21MYWJlbDogJ0dyb3VwJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmNpcy5yZXN1bHQnOiB7XG4gICAgZmllbGQ6ICdkYXRhLmNpcy5yZXN1bHQnLFxuICAgIHNpemU6IDEwLFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnUmVzdWx0JyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLnRpdGxlJzoge1xuICAgIGZpZWxkOiAnZGF0YS50aXRsZScsXG4gICAgc2l6ZTogMTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdDb250cm9sJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmRvY2tlci5BY3Rvci5BdHRyaWJ1dGVzLm5hbWUnOiB7XG4gICAgZmllbGQ6ICdkYXRhLmRvY2tlci5BY3Rvci5BdHRyaWJ1dGVzLm5hbWUnLFxuICAgIHNpemU6IDUwLFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnQ29udGFpbmVyJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICdkYXRhLmRvY2tlci5BY3Rpb24nOiB7XG4gICAgZmllbGQ6ICdkYXRhLmRvY2tlci5BY3Rpb24nLFxuICAgIHNpemU6IDIwLFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnQWN0aW9uJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG4gICd0aW1lc3RhbXAnOiB7XG4gICAgZmllbGQ6ICd0aW1lc3RhbXAnLFxuICAgIHNpemU6IDUsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdEYXRlJyxcbiAgfSxcbiAgJ2RhdGEuZ2l0aHViLm9yZyc6IHtcbiAgICBmaWVsZDogJ2RhdGEuZ2l0aHViLm9yZycsXG4gICAgc2l6ZTogMTAsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdPcmdhbml6YXRpb24nLFxuICAgIG1pc3Npbmc6ICctJyxcbiAgfSxcbiAgJ2RhdGEub3NjYXAuY2hlY2sudGl0bGUnOiB7XG4gICAgZmllbGQ6ICdkYXRhLm9zY2FwLmNoZWNrLnRpdGxlJyxcbiAgICBzaXplOiA1LFxuICAgIG9yZGVyOiAnZGVzYycsXG4gICAgb3JkZXJCeTogJzEnLFxuICAgIGN1c3RvbUxhYmVsOiAnVGl0bGUnLFxuICAgIG1pc3Npbmc6ICctJyxcbiAgfSxcbiAgJ2RhdGEub3NjYXAuc2Nhbi5wcm9maWxlLnRpdGxlJzoge1xuICAgIGZpZWxkOiAnZGF0YS5vc2NhcC5zY2FuLnByb2ZpbGUudGl0bGUnLFxuICAgIHNpemU6IDUsXG4gICAgb3JkZXI6ICdkZXNjJyxcbiAgICBvcmRlckJ5OiAnMScsXG4gICAgY3VzdG9tTGFiZWw6ICdQcm9maWxlJyxcbiAgICBtaXNzaW5nOiAnLScsXG4gIH0sXG59O1xuIl19