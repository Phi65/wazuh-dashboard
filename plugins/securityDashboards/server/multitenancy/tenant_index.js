"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateTenantIndices = migrateTenantIndices;
exports.setupIndexTemplate = setupIndexTemplate;

var _core = require("../../../../src/core/server/saved_objects/migrations/core");

var _build_index_map = require("../../../../src/core/server/saved_objects/migrations/core/build_index_map");

var _opensearch_dashboards_migrator = require("../../../../src/core/server/saved_objects/migrations/opensearch_dashboards/opensearch_dashboards_migrator");

var _common = require("../../common");

/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */
async function setupIndexTemplate(esClient, opensearchDashboardsIndex, typeRegistry, logger) {
  const mappings = (0, _core.buildActiveMappings)((0, _opensearch_dashboards_migrator.mergeTypes)(typeRegistry.getAllTypes()));

  try {
    await esClient.indices.putIndexTemplate({
      name: 'tenant_template',
      body: {
        // Setting priority to the max value to avoid being overridden by custom index templates.
        priority: _common.MAX_INTEGER,
        index_patterns: [opensearchDashboardsIndex + '_-*_*', opensearchDashboardsIndex + '_0*_*', opensearchDashboardsIndex + '_1*_*', opensearchDashboardsIndex + '_2*_*', opensearchDashboardsIndex + '_3*_*', opensearchDashboardsIndex + '_4*_*', opensearchDashboardsIndex + '_5*_*', opensearchDashboardsIndex + '_6*_*', opensearchDashboardsIndex + '_7*_*', opensearchDashboardsIndex + '_8*_*', opensearchDashboardsIndex + '_9*_*'],
        template: {
          settings: {
            number_of_shards: 1
          },
          mappings
        }
      }
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function migrateTenantIndices(opensearchDashboardsVersion, migrationClient, securityClient, typeRegistry, serializer, logger) {
  let tenentInfo;

  try {
    tenentInfo = await securityClient.getTenantInfoWithInternalUser();
  } catch (error) {
    logger.error(error);
    throw error;
  } // follows the same approach in opensearch_dashboards_migrator.ts to initiate DocumentMigrator here


  const documentMigrator = new _core.DocumentMigrator({
    opensearchDashboardsVersion,
    typeRegistry,
    log: logger
  });

  for (const indexName of Object.keys(tenentInfo)) {
    const indexMap = (0, _build_index_map.createIndexMap)({
      opensearchDashboardsIndexName: indexName,
      indexMap: (0, _opensearch_dashboards_migrator.mergeTypes)(typeRegistry.getAllTypes()),
      registry: typeRegistry
    }); // follows the same aporach in opensearch_dashboards_mirator.ts to construct IndexMigrator
    //
    // FIXME: hard code batchSize, pollInterval, and scrollDuration for now
    //        they are used to fetched from `migration.xxx` config, which is not accessible from new playform

    const indexMigrator = new _core.IndexMigrator({
      batchSize: 100,
      client: migrationClient,
      documentMigrator,
      index: indexName,
      log: logger,
      mappingProperties: indexMap[indexName].typeMappings,
      pollInterval: 1500,
      // millisec
      scrollDuration: '15m',
      serializer,
      obsoleteIndexTemplatePattern: undefined,
      convertToAliasScript: indexMap[indexName].script
    });

    try {
      await indexMigrator.migrate();
    } catch (error) {
      logger.error(error); // fail early, exit the kibana process
      // NOTE: according to https://github.com/elastic/kibana/issues/41983 ,
      //       PR https://github.com/elastic/kibana/pull/75819 , API to allow plugins
      //       to set status will be available in 7.10, for now, we fail OpenSearchDashboards
      //       process to indicate index migration error. Customer can fix their
      //       tenant indices in ES then restart OpenSearchDashboards.

      process.exit(1);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbmFudF9pbmRleC50cyJdLCJuYW1lcyI6WyJzZXR1cEluZGV4VGVtcGxhdGUiLCJlc0NsaWVudCIsIm9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXgiLCJ0eXBlUmVnaXN0cnkiLCJsb2dnZXIiLCJtYXBwaW5ncyIsImdldEFsbFR5cGVzIiwiaW5kaWNlcyIsInB1dEluZGV4VGVtcGxhdGUiLCJuYW1lIiwiYm9keSIsInByaW9yaXR5IiwiTUFYX0lOVEVHRVIiLCJpbmRleF9wYXR0ZXJucyIsInRlbXBsYXRlIiwic2V0dGluZ3MiLCJudW1iZXJfb2Zfc2hhcmRzIiwiZXJyb3IiLCJtaWdyYXRlVGVuYW50SW5kaWNlcyIsIm9wZW5zZWFyY2hEYXNoYm9hcmRzVmVyc2lvbiIsIm1pZ3JhdGlvbkNsaWVudCIsInNlY3VyaXR5Q2xpZW50Iiwic2VyaWFsaXplciIsInRlbmVudEluZm8iLCJnZXRUZW5hbnRJbmZvV2l0aEludGVybmFsVXNlciIsImRvY3VtZW50TWlncmF0b3IiLCJEb2N1bWVudE1pZ3JhdG9yIiwibG9nIiwiaW5kZXhOYW1lIiwiT2JqZWN0Iiwia2V5cyIsImluZGV4TWFwIiwib3BlbnNlYXJjaERhc2hib2FyZHNJbmRleE5hbWUiLCJyZWdpc3RyeSIsImluZGV4TWlncmF0b3IiLCJJbmRleE1pZ3JhdG9yIiwiYmF0Y2hTaXplIiwiY2xpZW50IiwiaW5kZXgiLCJtYXBwaW5nUHJvcGVydGllcyIsInR5cGVNYXBwaW5ncyIsInBvbGxJbnRlcnZhbCIsInNjcm9sbER1cmF0aW9uIiwib2Jzb2xldGVJbmRleFRlbXBsYXRlUGF0dGVybiIsInVuZGVmaW5lZCIsImNvbnZlcnRUb0FsaWFzU2NyaXB0Iiwic2NyaXB0IiwibWlncmF0ZSIsInByb2Nlc3MiLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQXNCQTs7QUFNQTs7QUFDQTs7QUFFQTs7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RUMsU0FWUTtBQVd0Q0MsTUFBQUEsb0JBQW9CLEVBQUVkLFFBQVEsQ0FBQ0gsU0FBRCxDQUFSLENBQW9Ca0I7QUFYSixLQUFsQixDQUF0Qjs7QUFhQSxRQUFJO0FBQ0YsWUFBTVosYUFBYSxDQUFDYSxPQUFkLEVBQU47QUFDRCxLQUZELENBRUUsT0FBTzlCLEtBQVAsRUFBYztBQUNkYixNQUFBQSxNQUFNLENBQUNhLEtBQVAsQ0FBYUEsS0FBYixFQURjLENBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBK0IsTUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQUNEO0FBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtcbiAgT3BlblNlYXJjaENsaWVudCxcbiAgSVNhdmVkT2JqZWN0VHlwZVJlZ2lzdHJ5LFxuICBMb2dnZXIsXG4gIFNhdmVkT2JqZWN0c1NlcmlhbGl6ZXIsXG59IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBJbmRleE1hcHBpbmcgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXIvc2F2ZWRfb2JqZWN0cy9tYXBwaW5ncyc7XG5pbXBvcnQge1xuICBidWlsZEFjdGl2ZU1hcHBpbmdzLFxuICBEb2N1bWVudE1pZ3JhdG9yLFxuICBJbmRleE1pZ3JhdG9yLFxuICBNaWdyYXRpb25PcGVuU2VhcmNoQ2xpZW50LFxufSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXIvc2F2ZWRfb2JqZWN0cy9taWdyYXRpb25zL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlSW5kZXhNYXAgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXIvc2F2ZWRfb2JqZWN0cy9taWdyYXRpb25zL2NvcmUvYnVpbGRfaW5kZXhfbWFwJztcbmltcG9ydCB7IG1lcmdlVHlwZXMgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXIvc2F2ZWRfb2JqZWN0cy9taWdyYXRpb25zL29wZW5zZWFyY2hfZGFzaGJvYXJkcy9vcGVuc2VhcmNoX2Rhc2hib2FyZHNfbWlncmF0b3InO1xuaW1wb3J0IHsgU2VjdXJpdHlDbGllbnQgfSBmcm9tICcuLi9iYWNrZW5kL29wZW5zZWFyY2hfc2VjdXJpdHlfY2xpZW50JztcbmltcG9ydCB7IE1BWF9JTlRFR0VSIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwSW5kZXhUZW1wbGF0ZShcbiAgZXNDbGllbnQ6IE9wZW5TZWFyY2hDbGllbnQsXG4gIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXg6IHN0cmluZyxcbiAgdHlwZVJlZ2lzdHJ5OiBJU2F2ZWRPYmplY3RUeXBlUmVnaXN0cnksXG4gIGxvZ2dlcjogTG9nZ2VyXG4pIHtcbiAgY29uc3QgbWFwcGluZ3M6IEluZGV4TWFwcGluZyA9IGJ1aWxkQWN0aXZlTWFwcGluZ3MobWVyZ2VUeXBlcyh0eXBlUmVnaXN0cnkuZ2V0QWxsVHlwZXMoKSkpO1xuICB0cnkge1xuICAgIGF3YWl0IGVzQ2xpZW50LmluZGljZXMucHV0SW5kZXhUZW1wbGF0ZSh7XG4gICAgICBuYW1lOiAndGVuYW50X3RlbXBsYXRlJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgLy8gU2V0dGluZyBwcmlvcml0eSB0byB0aGUgbWF4IHZhbHVlIHRvIGF2b2lkIGJlaW5nIG92ZXJyaWRkZW4gYnkgY3VzdG9tIGluZGV4IHRlbXBsYXRlcy5cbiAgICAgICAgcHJpb3JpdHk6IE1BWF9JTlRFR0VSLFxuICAgICAgICBpbmRleF9wYXR0ZXJuczogW1xuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXy0qXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzAqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzEqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzIqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzMqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzQqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzUqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzYqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzcqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzgqXyonLFxuICAgICAgICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzSW5kZXggKyAnXzkqXyonLFxuICAgICAgICBdLFxuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBudW1iZXJfb2Zfc2hhcmRzOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFwcGluZ3MsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGVUZW5hbnRJbmRpY2VzKFxuICBvcGVuc2VhcmNoRGFzaGJvYXJkc1ZlcnNpb246IHN0cmluZyxcbiAgbWlncmF0aW9uQ2xpZW50OiBNaWdyYXRpb25PcGVuU2VhcmNoQ2xpZW50LFxuICBzZWN1cml0eUNsaWVudDogU2VjdXJpdHlDbGllbnQsXG4gIHR5cGVSZWdpc3RyeTogSVNhdmVkT2JqZWN0VHlwZVJlZ2lzdHJ5LFxuICBzZXJpYWxpemVyOiBTYXZlZE9iamVjdHNTZXJpYWxpemVyLFxuICBsb2dnZXI6IExvZ2dlclxuKSB7XG4gIGxldCB0ZW5lbnRJbmZvOiBhbnk7XG4gIHRyeSB7XG4gICAgdGVuZW50SW5mbyA9IGF3YWl0IHNlY3VyaXR5Q2xpZW50LmdldFRlbmFudEluZm9XaXRoSW50ZXJuYWxVc2VyKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIC8vIGZvbGxvd3MgdGhlIHNhbWUgYXBwcm9hY2ggaW4gb3BlbnNlYXJjaF9kYXNoYm9hcmRzX21pZ3JhdG9yLnRzIHRvIGluaXRpYXRlIERvY3VtZW50TWlncmF0b3IgaGVyZVxuICBjb25zdCBkb2N1bWVudE1pZ3JhdG9yID0gbmV3IERvY3VtZW50TWlncmF0b3Ioe1xuICAgIG9wZW5zZWFyY2hEYXNoYm9hcmRzVmVyc2lvbixcbiAgICB0eXBlUmVnaXN0cnksXG4gICAgbG9nOiBsb2dnZXIsXG4gIH0pO1xuXG4gIGZvciAoY29uc3QgaW5kZXhOYW1lIG9mIE9iamVjdC5rZXlzKHRlbmVudEluZm8pKSB7XG4gICAgY29uc3QgaW5kZXhNYXAgPSBjcmVhdGVJbmRleE1hcCh7XG4gICAgICBvcGVuc2VhcmNoRGFzaGJvYXJkc0luZGV4TmFtZTogaW5kZXhOYW1lLFxuICAgICAgaW5kZXhNYXA6IG1lcmdlVHlwZXModHlwZVJlZ2lzdHJ5LmdldEFsbFR5cGVzKCkpLFxuICAgICAgcmVnaXN0cnk6IHR5cGVSZWdpc3RyeSxcbiAgICB9KTtcblxuICAgIC8vIGZvbGxvd3MgdGhlIHNhbWUgYXBvcmFjaCBpbiBvcGVuc2VhcmNoX2Rhc2hib2FyZHNfbWlyYXRvci50cyB0byBjb25zdHJ1Y3QgSW5kZXhNaWdyYXRvclxuICAgIC8vXG4gICAgLy8gRklYTUU6IGhhcmQgY29kZSBiYXRjaFNpemUsIHBvbGxJbnRlcnZhbCwgYW5kIHNjcm9sbER1cmF0aW9uIGZvciBub3dcbiAgICAvLyAgICAgICAgdGhleSBhcmUgdXNlZCB0byBmZXRjaGVkIGZyb20gYG1pZ3JhdGlvbi54eHhgIGNvbmZpZywgd2hpY2ggaXMgbm90IGFjY2Vzc2libGUgZnJvbSBuZXcgcGxheWZvcm1cbiAgICBjb25zdCBpbmRleE1pZ3JhdG9yID0gbmV3IEluZGV4TWlncmF0b3Ioe1xuICAgICAgYmF0Y2hTaXplOiAxMDAsXG4gICAgICBjbGllbnQ6IG1pZ3JhdGlvbkNsaWVudCxcbiAgICAgIGRvY3VtZW50TWlncmF0b3IsXG4gICAgICBpbmRleDogaW5kZXhOYW1lLFxuICAgICAgbG9nOiBsb2dnZXIsXG4gICAgICBtYXBwaW5nUHJvcGVydGllczogaW5kZXhNYXBbaW5kZXhOYW1lXS50eXBlTWFwcGluZ3MsXG4gICAgICBwb2xsSW50ZXJ2YWw6IDE1MDAsIC8vIG1pbGxpc2VjXG4gICAgICBzY3JvbGxEdXJhdGlvbjogJzE1bScsXG4gICAgICBzZXJpYWxpemVyLFxuICAgICAgb2Jzb2xldGVJbmRleFRlbXBsYXRlUGF0dGVybjogdW5kZWZpbmVkLFxuICAgICAgY29udmVydFRvQWxpYXNTY3JpcHQ6IGluZGV4TWFwW2luZGV4TmFtZV0uc2NyaXB0LFxuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBpbmRleE1pZ3JhdG9yLm1pZ3JhdGUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgIC8vIGZhaWwgZWFybHksIGV4aXQgdGhlIGtpYmFuYSBwcm9jZXNzXG4gICAgICAvLyBOT1RFOiBhY2NvcmRpbmcgdG8gaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMva2liYW5hL2lzc3Vlcy80MTk4MyAsXG4gICAgICAvLyAgICAgICBQUiBodHRwczovL2dpdGh1Yi5jb20vZWxhc3RpYy9raWJhbmEvcHVsbC83NTgxOSAsIEFQSSB0byBhbGxvdyBwbHVnaW5zXG4gICAgICAvLyAgICAgICB0byBzZXQgc3RhdHVzIHdpbGwgYmUgYXZhaWxhYmxlIGluIDcuMTAsIGZvciBub3csIHdlIGZhaWwgT3BlblNlYXJjaERhc2hib2FyZHNcbiAgICAgIC8vICAgICAgIHByb2Nlc3MgdG8gaW5kaWNhdGUgaW5kZXggbWlncmF0aW9uIGVycm9yLiBDdXN0b21lciBjYW4gZml4IHRoZWlyXG4gICAgICAvLyAgICAgICB0ZW5hbnQgaW5kaWNlcyBpbiBFUyB0aGVuIHJlc3RhcnQgT3BlblNlYXJjaERhc2hib2FyZHMuXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICB9XG59XG4iXX0=