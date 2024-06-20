"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("./utils/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DestinationsService {
  constructor(esDriver) {
    _defineProperty(this, "createDestination", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createDestination', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "updateDestination", async (context, req, res) => {
      try {
        const {
          destinationId
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          body: req.body,
          destinationId,
          ifSeqNo,
          ifPrimaryTerm
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateDestination', params);
        const {
          _version,
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            version: _version,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "deleteDestination", async (context, req, res) => {
      try {
        const {
          destinationId
        } = req.params;
        const params = {
          destinationId
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.deleteDestination', params);
        return res.ok({
          body: {
            ok: response.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getDestination", async (context, req, res) => {
      const {
        destinationId
      } = req.params;
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);

      try {
        const params = {
          destinationId
        };
        const resp = await callAsCurrentUser('alerting.getDestination', params);
        const destination = resp.destinations[0];
        const version = destination.schema_version;
        const ifSeqNo = destination.seq_no;
        const ifPrimaryTerm = destination.primary_term;
        return res.ok({
          body: {
            ok: true,
            destination,
            version,
            ifSeqNo,
            ifPrimaryTerm
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getDestinations", async (context, req, res) => {
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);
      const {
        from = 0,
        size = 20,
        search = '',
        sortDirection = 'desc',
        sortField = 'start_time',
        type = 'ALL'
      } = req.query;
      var params;

      switch (sortField) {
        case 'name':
          params = {
            sortString: 'destination.name.keyword',
            sortOrder: sortDirection
          };
          break;

        case 'type':
          params = {
            sortString: 'destination.type',
            sortOrder: sortDirection
          };
          break;

        default:
          params = {};
          break;
      }

      params.startIndex = from;
      params.size = size;
      params.searchString = search;
      if (search.trim()) params.searchString = `*${search.trim().split(' ').join('* *')}*`;
      params.destinationType = type;

      try {
        const resp = await callAsCurrentUser('alerting.searchDestinations', params);
        const destinations = resp.destinations.map(hit => {
          const destination = hit;
          const id = destination.id;
          const version = destination.schema_version;
          const ifSeqNo = destination.seq_no;
          const ifPrimaryTerm = destination.primary_term;
          return {
            id,
            ...destination,
            version,
            ifSeqNo,
            ifPrimaryTerm
          };
        });
        const totalDestinations = resp.totalDestinations;
        return res.ok({
          body: {
            ok: true,
            destinations,
            totalDestinations
          }
        });
      } catch (err) {
        if ((0, _helpers.isIndexNotFoundError)(err)) {
          return res.ok({
            body: {
              ok: false,
              resp: {}
            }
          });
        }

        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });

    _defineProperty(this, "createEmailAccount", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createEmailAccount', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "updateEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          emailAccountId: id,
          ifSeqNo,
          ifPrimaryTerm,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateEmailAccount', params);
        const {
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "deleteEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailAccountId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const deleteResponse = await callAsCurrentUser('alerting.deleteEmailAccount', params);
        return res.ok({
          body: {
            ok: deleteResponse.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailAccountId: id
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailAccount', params);

        const emailAccount = _lodash.default.get(getResponse, 'email_account', null);

        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);

        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);

        if (emailAccount) {
          return res.ok({
            body: {
              ok: true,
              resp: emailAccount,
              ifSeqNo,
              ifPrimaryTerm
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false
            }
          });
        }
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getEmailAccounts", async (context, req, res) => {
      try {
        const {
          from = 0,
          size = 20,
          search = '',
          sortDirection = 'desc',
          sortField = 'name'
        } = req.query;
        let must = {
          match_all: {}
        };

        if (search.trim()) {
          must = {
            query_string: {
              default_field: 'email_account.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }

        const sortQueryMap = {
          name: {
            'email_account.name.keyword': sortDirection
          }
        };
        let sort = [];
        const sortQuery = sortQueryMap[sortField];
        if (sortQuery) sort = sortQuery;
        const params = {
          body: {
            from,
            size,
            sort,
            query: {
              bool: {
                must
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailAccounts', params);

        const totalEmailAccounts = _lodash.default.get(getResponse, 'hits.total.value', 0);

        const emailAccounts = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source: emailAccount
          } = result;
          return {
            id,
            ...emailAccount,
            ifSeqNo,
            ifPrimaryTerm
          };
        });

        return res.ok({
          body: {
            ok: true,
            emailAccounts,
            totalEmailAccounts
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailAccounts:', err);
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });

    _defineProperty(this, "createEmailGroup", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createEmailGroup', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "updateEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          emailGroupId: id,
          ifSeqNo,
          ifPrimaryTerm,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateEmailGroup', params);
        const {
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "deleteEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailGroupId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const deleteResponse = await callAsCurrentUser('alerting.deleteEmailGroup', params);
        return res.ok({
          body: {
            ok: deleteResponse.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailGroupId: id
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailGroup', params);

        const emailGroup = _lodash.default.get(getResponse, 'email_group', null);

        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);

        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);

        if (emailGroup) {
          return res.ok({
            body: {
              ok: true,
              resp: emailGroup,
              ifSeqNo,
              ifPrimaryTerm
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false
            }
          });
        }
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });

    _defineProperty(this, "getEmailGroups", async (context, req, res) => {
      try {
        const {
          from = 0,
          size = 20,
          search = '',
          sortDirection = 'desc',
          sortField = 'name'
        } = req.query;
        let must = {
          match_all: {}
        };

        if (search.trim()) {
          must = {
            query_string: {
              default_field: 'email_group.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }

        const sortQueryMap = {
          name: {
            'email_group.name.keyword': sortDirection
          }
        };
        let sort = [];
        const sortQuery = sortQueryMap[sortField];
        if (sortQuery) sort = sortQuery;
        const params = {
          body: {
            from,
            size,
            sort,
            query: {
              bool: {
                must
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailGroups', params);

        const totalEmailGroups = _lodash.default.get(getResponse, 'hits.total.value', 0);

        const emailGroups = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source: emailGroup
          } = result;
          return {
            id,
            ...emailGroup,
            ifSeqNo,
            ifPrimaryTerm
          };
        });

        return res.ok({
          body: {
            ok: true,
            emailGroups,
            totalEmailGroups
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailGroups:', err);
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });

    this.esDriver = esDriver;
  }

}

exports.default = DestinationsService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlc3RpbmF0aW9uc1NlcnZpY2UuanMiXSwibmFtZXMiOlsiRGVzdGluYXRpb25zU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZXNEcml2ZXIiLCJjb250ZXh0IiwicmVxIiwicmVzIiwicGFyYW1zIiwiYm9keSIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJjcmVhdGVSZXNwb25zZSIsIm9rIiwicmVzcCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJkZXN0aW5hdGlvbklkIiwiaWZTZXFObyIsImlmUHJpbWFyeVRlcm0iLCJxdWVyeSIsInVwZGF0ZVJlc3BvbnNlIiwiX3ZlcnNpb24iLCJfaWQiLCJ2ZXJzaW9uIiwiaWQiLCJyZXNwb25zZSIsInJlc3VsdCIsImRlc3RpbmF0aW9uIiwiZGVzdGluYXRpb25zIiwic2NoZW1hX3ZlcnNpb24iLCJzZXFfbm8iLCJwcmltYXJ5X3Rlcm0iLCJmcm9tIiwic2l6ZSIsInNlYXJjaCIsInNvcnREaXJlY3Rpb24iLCJzb3J0RmllbGQiLCJ0eXBlIiwic29ydFN0cmluZyIsInNvcnRPcmRlciIsInN0YXJ0SW5kZXgiLCJzZWFyY2hTdHJpbmciLCJ0cmltIiwic3BsaXQiLCJqb2luIiwiZGVzdGluYXRpb25UeXBlIiwibWFwIiwiaGl0IiwidG90YWxEZXN0aW5hdGlvbnMiLCJlbWFpbEFjY291bnRJZCIsImRlbGV0ZVJlc3BvbnNlIiwiZ2V0UmVzcG9uc2UiLCJlbWFpbEFjY291bnQiLCJfIiwiZ2V0IiwibXVzdCIsIm1hdGNoX2FsbCIsInF1ZXJ5X3N0cmluZyIsImRlZmF1bHRfZmllbGQiLCJkZWZhdWx0X29wZXJhdG9yIiwic29ydFF1ZXJ5TWFwIiwibmFtZSIsInNvcnQiLCJzb3J0UXVlcnkiLCJib29sIiwidG90YWxFbWFpbEFjY291bnRzIiwiZW1haWxBY2NvdW50cyIsIl9zZXFfbm8iLCJfcHJpbWFyeV90ZXJtIiwiX3NvdXJjZSIsImVtYWlsR3JvdXBJZCIsImVtYWlsR3JvdXAi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QUFBLEVBQUUsRUFBRSxLQURBO0FBRUpFLFlBQUFBLEdBQUcsRUFBRUEsR0FBRyxDQUFDRztBQUZMO0FBRE0sU0FBUCxDQUFQO0FBTUQ7QUFDRixLQTdpQnFCOztBQUNwQixTQUFLZCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOztBQUhzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzSW5kZXhOb3RGb3VuZEVycm9yIH0gZnJvbSAnLi91dGlscy9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVzdGluYXRpb25zU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGVzRHJpdmVyKSB7XG4gICAgdGhpcy5lc0RyaXZlciA9IGVzRHJpdmVyO1xuICB9XG5cbiAgY3JlYXRlRGVzdGluYXRpb24gPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyYW1zID0geyBib2R5OiByZXEuYm9keSB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgY3JlYXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuY3JlYXRlRGVzdGluYXRpb24nLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiBjcmVhdGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBjcmVhdGVEZXN0aW5hdGlvbjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlRGVzdGluYXRpb24gPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkZXN0aW5hdGlvbklkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgeyBpZlNlcU5vLCBpZlByaW1hcnlUZXJtIH0gPSByZXEucXVlcnk7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgICBkZXN0aW5hdGlvbklkLFxuICAgICAgICBpZlNlcU5vLFxuICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLnVwZGF0ZURlc3RpbmF0aW9uJywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHsgX3ZlcnNpb24sIF9pZCB9ID0gdXBkYXRlUmVzcG9uc2U7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHZlcnNpb246IF92ZXJzaW9uLFxuICAgICAgICAgIGlkOiBfaWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gdXBkYXRlRGVzdGluYXRpb246JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlbGV0ZURlc3RpbmF0aW9uID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGVzdGluYXRpb25JZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgZGVzdGluYXRpb25JZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZGVsZXRlRGVzdGluYXRpb24nLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogcmVzcG9uc2UucmVzdWx0ID09PSAnZGVsZXRlZCcsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gZGVsZXRlRGVzdGluYXRpb246JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldERlc3RpbmF0aW9uID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbklkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBkZXN0aW5hdGlvbklkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0RGVzdGluYXRpb24nLCBwYXJhbXMpO1xuXG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHJlc3AuZGVzdGluYXRpb25zWzBdO1xuICAgICAgY29uc3QgdmVyc2lvbiA9IGRlc3RpbmF0aW9uLnNjaGVtYV92ZXJzaW9uO1xuICAgICAgY29uc3QgaWZTZXFObyA9IGRlc3RpbmF0aW9uLnNlcV9ubztcbiAgICAgIGNvbnN0IGlmUHJpbWFyeVRlcm0gPSBkZXN0aW5hdGlvbi5wcmltYXJ5X3Rlcm07XG5cbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgZGVzdGluYXRpb24sXG4gICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICBpZlNlcU5vLFxuICAgICAgICAgIGlmUHJpbWFyeVRlcm0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gZ2V0RGVzdGluYXRpb246JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldERlc3RpbmF0aW9ucyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGZyb20gPSAwLFxuICAgICAgc2l6ZSA9IDIwLFxuICAgICAgc2VhcmNoID0gJycsXG4gICAgICBzb3J0RGlyZWN0aW9uID0gJ2Rlc2MnLFxuICAgICAgc29ydEZpZWxkID0gJ3N0YXJ0X3RpbWUnLFxuICAgICAgdHlwZSA9ICdBTEwnLFxuICAgIH0gPSByZXEucXVlcnk7XG5cbiAgICB2YXIgcGFyYW1zO1xuICAgIHN3aXRjaCAoc29ydEZpZWxkKSB7XG4gICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIHNvcnRTdHJpbmc6ICdkZXN0aW5hdGlvbi5uYW1lLmtleXdvcmQnLFxuICAgICAgICAgIHNvcnRPcmRlcjogc29ydERpcmVjdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0eXBlJzpcbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgIHNvcnRTdHJpbmc6ICdkZXN0aW5hdGlvbi50eXBlJyxcbiAgICAgICAgICBzb3J0T3JkZXI6IHNvcnREaXJlY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGFyYW1zID0ge307XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwYXJhbXMuc3RhcnRJbmRleCA9IGZyb207XG4gICAgcGFyYW1zLnNpemUgPSBzaXplO1xuICAgIHBhcmFtcy5zZWFyY2hTdHJpbmcgPSBzZWFyY2g7XG4gICAgaWYgKHNlYXJjaC50cmltKCkpIHBhcmFtcy5zZWFyY2hTdHJpbmcgPSBgKiR7c2VhcmNoLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJyogKicpfSpgO1xuICAgIHBhcmFtcy5kZXN0aW5hdGlvblR5cGUgPSB0eXBlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuc2VhcmNoRGVzdGluYXRpb25zJywgcGFyYW1zKTtcblxuICAgICAgY29uc3QgZGVzdGluYXRpb25zID0gcmVzcC5kZXN0aW5hdGlvbnMubWFwKChoaXQpID0+IHtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBoaXQ7XG4gICAgICAgIGNvbnN0IGlkID0gZGVzdGluYXRpb24uaWQ7XG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSBkZXN0aW5hdGlvbi5zY2hlbWFfdmVyc2lvbjtcbiAgICAgICAgY29uc3QgaWZTZXFObyA9IGRlc3RpbmF0aW9uLnNlcV9ubztcbiAgICAgICAgY29uc3QgaWZQcmltYXJ5VGVybSA9IGRlc3RpbmF0aW9uLnByaW1hcnlfdGVybTtcbiAgICAgICAgcmV0dXJuIHsgaWQsIC4uLmRlc3RpbmF0aW9uLCB2ZXJzaW9uLCBpZlNlcU5vLCBpZlByaW1hcnlUZXJtIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG90YWxEZXN0aW5hdGlvbnMgPSByZXNwLnRvdGFsRGVzdGluYXRpb25zO1xuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGRlc3RpbmF0aW9ucyxcbiAgICAgICAgICB0b3RhbERlc3RpbmF0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGlzSW5kZXhOb3RGb3VuZEVycm9yKGVycikpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIHJlc3A6IHt9IH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqICAtLS0tLS0tLS0tLS0tLS0tLSBFbWFpbCBBY2NvdW50IEFQSSAtLS0tLS0tLS0tLS0tLS0tLVxuICAgKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY3JlYXRlRW1haWxBY2NvdW50ID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYm9keTogcmVxLmJvZHkgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmNyZWF0ZUVtYWlsQWNjb3VudCcsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGNyZWF0ZVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGNyZWF0ZUVtYWlsQWNjb3VudDonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlRW1haWxBY2NvdW50ID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCB7IGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfSA9IHJlcS5xdWVyeTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgZW1haWxBY2NvdW50SWQ6IGlkLFxuICAgICAgICBpZlNlcU5vLFxuICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgICBib2R5OiByZXEuYm9keSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy51cGRhdGVFbWFpbEFjY291bnQnLCBwYXJhbXMpO1xuICAgICAgY29uc3QgeyBfaWQgfSA9IHVwZGF0ZVJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBpZDogX2lkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIHVwZGF0ZUVtYWlsQWNjb3VudDonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlRW1haWxBY2NvdW50ID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGVtYWlsQWNjb3VudElkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZGVsZXRlRW1haWxBY2NvdW50JywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGRlbGV0ZVJlc3BvbnNlLnJlc3VsdCA9PT0gJ2RlbGV0ZWQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGRlbGV0ZUVtYWlsQWNjb3VudDonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RW1haWxBY2NvdW50ID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGVtYWlsQWNjb3VudElkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0RW1haWxBY2NvdW50JywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IGVtYWlsQWNjb3VudCA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnZW1haWxfYWNjb3VudCcsIG51bGwpO1xuICAgICAgY29uc3QgaWZTZXFObyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnX3NlcV9ubycsIG51bGwpO1xuICAgICAgY29uc3QgaWZQcmltYXJ5VGVybSA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnX3ByaW1hcnlfdGVybScsIG51bGwpO1xuICAgICAgaWYgKGVtYWlsQWNjb3VudCkge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3A6IGVtYWlsQWNjb3VudCxcbiAgICAgICAgICAgIGlmU2VxTm8sXG4gICAgICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBnZXRFbWFpbEFjY291bnQ6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEVtYWlsQWNjb3VudHMgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmcm9tID0gMCxcbiAgICAgICAgc2l6ZSA9IDIwLFxuICAgICAgICBzZWFyY2ggPSAnJyxcbiAgICAgICAgc29ydERpcmVjdGlvbiA9ICdkZXNjJyxcbiAgICAgICAgc29ydEZpZWxkID0gJ25hbWUnLFxuICAgICAgfSA9IHJlcS5xdWVyeTtcblxuICAgICAgbGV0IG11c3QgPSB7IG1hdGNoX2FsbDoge30gfTtcbiAgICAgIGlmIChzZWFyY2gudHJpbSgpKSB7XG4gICAgICAgIG11c3QgPSB7XG4gICAgICAgICAgcXVlcnlfc3RyaW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0X2ZpZWxkOiAnZW1haWxfYWNjb3VudC5uYW1lJyxcbiAgICAgICAgICAgIGRlZmF1bHRfb3BlcmF0b3I6ICdBTkQnLFxuICAgICAgICAgICAgcXVlcnk6IGAqJHtzZWFyY2gudHJpbSgpLnNwbGl0KCcgJykuam9pbignKiAqJyl9KmAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ydFF1ZXJ5TWFwID0geyBuYW1lOiB7ICdlbWFpbF9hY2NvdW50Lm5hbWUua2V5d29yZCc6IHNvcnREaXJlY3Rpb24gfSB9O1xuXG4gICAgICBsZXQgc29ydCA9IFtdO1xuICAgICAgY29uc3Qgc29ydFF1ZXJ5ID0gc29ydFF1ZXJ5TWFwW3NvcnRGaWVsZF07XG4gICAgICBpZiAoc29ydFF1ZXJ5KSBzb3J0ID0gc29ydFF1ZXJ5O1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHNpemUsXG4gICAgICAgICAgc29ydCxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgICBtdXN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0RW1haWxBY2NvdW50cycsIHBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IHRvdGFsRW1haWxBY2NvdW50cyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnaGl0cy50b3RhbC52YWx1ZScsIDApO1xuICAgICAgY29uc3QgZW1haWxBY2NvdW50cyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnaGl0cy5oaXRzJywgW10pLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgIF9zZXFfbm86IGlmU2VxTm8sXG4gICAgICAgICAgX3ByaW1hcnlfdGVybTogaWZQcmltYXJ5VGVybSxcbiAgICAgICAgICBfc291cmNlOiBlbWFpbEFjY291bnQsXG4gICAgICAgIH0gPSByZXN1bHQ7XG4gICAgICAgIHJldHVybiB7IGlkLCAuLi5lbWFpbEFjY291bnQsIGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBlbWFpbEFjY291bnRzLFxuICAgICAgICAgIHRvdGFsRW1haWxBY2NvdW50cyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBnZXRFbWFpbEFjY291bnRzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnI6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogIC0tLS0tLS0tLS0tLS0tLS0tIEVtYWlsIEdyb3VwIEFQSSAtLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjcmVhdGVFbWFpbEdyb3VwID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYm9keTogcmVxLmJvZHkgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmNyZWF0ZUVtYWlsR3JvdXAnLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiBjcmVhdGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBjcmVhdGVFbWFpbEdyb3VwOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVFbWFpbEdyb3VwID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCB7IGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfSA9IHJlcS5xdWVyeTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgZW1haWxHcm91cElkOiBpZCxcbiAgICAgICAgaWZTZXFObyxcbiAgICAgICAgaWZQcmltYXJ5VGVybSxcbiAgICAgICAgYm9keTogcmVxLmJvZHksXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcudXBkYXRlRW1haWxHcm91cCcsIHBhcmFtcyk7XG4gICAgICBjb25zdCB7IF9pZCB9ID0gdXBkYXRlUmVzcG9uc2U7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGlkOiBfaWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gdXBkYXRlRW1haWxHcm91cDonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlRW1haWxHcm91cCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBlbWFpbEdyb3VwSWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBkZWxldGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5kZWxldGVFbWFpbEdyb3VwJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGRlbGV0ZVJlc3BvbnNlLnJlc3VsdCA9PT0gJ2RlbGV0ZWQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGRlbGV0ZUVtYWlsR3JvdXA6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEVtYWlsR3JvdXAgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgZW1haWxHcm91cElkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0RW1haWxHcm91cCcsIHBhcmFtcyk7XG4gICAgICBjb25zdCBlbWFpbEdyb3VwID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdlbWFpbF9ncm91cCcsIG51bGwpO1xuICAgICAgY29uc3QgaWZTZXFObyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnX3NlcV9ubycsIG51bGwpO1xuICAgICAgY29uc3QgaWZQcmltYXJ5VGVybSA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnX3ByaW1hcnlfdGVybScsIG51bGwpO1xuICAgICAgaWYgKGVtYWlsR3JvdXApIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICByZXNwOiBlbWFpbEdyb3VwLFxuICAgICAgICAgICAgaWZTZXFObyxcbiAgICAgICAgICAgIGlmUHJpbWFyeVRlcm0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGdldEVtYWlsR3JvdXA6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEVtYWlsR3JvdXBzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZnJvbSA9IDAsXG4gICAgICAgIHNpemUgPSAyMCxcbiAgICAgICAgc2VhcmNoID0gJycsXG4gICAgICAgIHNvcnREaXJlY3Rpb24gPSAnZGVzYycsXG4gICAgICAgIHNvcnRGaWVsZCA9ICduYW1lJyxcbiAgICAgIH0gPSByZXEucXVlcnk7XG5cbiAgICAgIGxldCBtdXN0ID0geyBtYXRjaF9hbGw6IHt9IH07XG4gICAgICBpZiAoc2VhcmNoLnRyaW0oKSkge1xuICAgICAgICBtdXN0ID0ge1xuICAgICAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICAgICAgZGVmYXVsdF9maWVsZDogJ2VtYWlsX2dyb3VwLm5hbWUnLFxuICAgICAgICAgICAgZGVmYXVsdF9vcGVyYXRvcjogJ0FORCcsXG4gICAgICAgICAgICBxdWVyeTogYCoke3NlYXJjaC50cmltKCkuc3BsaXQoJyAnKS5qb2luKCcqIConKX0qYCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0UXVlcnlNYXAgPSB7IG5hbWU6IHsgJ2VtYWlsX2dyb3VwLm5hbWUua2V5d29yZCc6IHNvcnREaXJlY3Rpb24gfSB9O1xuXG4gICAgICBsZXQgc29ydCA9IFtdO1xuICAgICAgY29uc3Qgc29ydFF1ZXJ5ID0gc29ydFF1ZXJ5TWFwW3NvcnRGaWVsZF07XG4gICAgICBpZiAoc29ydFF1ZXJ5KSBzb3J0ID0gc29ydFF1ZXJ5O1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHNpemUsXG4gICAgICAgICAgc29ydCxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgICBtdXN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0RW1haWxHcm91cHMnLCBwYXJhbXMpO1xuXG4gICAgICBjb25zdCB0b3RhbEVtYWlsR3JvdXBzID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdoaXRzLnRvdGFsLnZhbHVlJywgMCk7XG4gICAgICBjb25zdCBlbWFpbEdyb3VwcyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnaGl0cy5oaXRzJywgW10pLm1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgIF9zZXFfbm86IGlmU2VxTm8sXG4gICAgICAgICAgX3ByaW1hcnlfdGVybTogaWZQcmltYXJ5VGVybSxcbiAgICAgICAgICBfc291cmNlOiBlbWFpbEdyb3VwLFxuICAgICAgICB9ID0gcmVzdWx0O1xuICAgICAgICByZXR1cm4geyBpZCwgLi4uZW1haWxHcm91cCwgaWZTZXFObywgaWZQcmltYXJ5VGVybSB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGVtYWlsR3JvdXBzLFxuICAgICAgICAgIHRvdGFsRW1haWxHcm91cHMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gZ2V0RW1haWxHcm91cHM6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=