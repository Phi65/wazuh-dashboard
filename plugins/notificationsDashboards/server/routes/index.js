"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineRoutes = defineRoutes;

var _configRoutes = require("./configRoutes");

var _eventRoutes = require("./eventRoutes");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function defineRoutes(router) {
  (0, _configRoutes.configRoutes)(router);
  (0, _eventRoutes.eventRoutes)(router);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImRlZmluZVJvdXRlcyIsInJvdXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOztBQUNBOztBQVBBO0FBQ0E7QUFDQTtBQUNBO0FBTU8sU0FBU0EsWUFBVCxDQUFzQkMsTUFBdEIsRUFBdUM7QUFDNUMsa0NBQWFBLE1BQWI7QUFDQSxnQ0FBWUEsTUFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJUm91dGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IGNvbmZpZ1JvdXRlcyB9IGZyb20gJy4vY29uZmlnUm91dGVzJztcbmltcG9ydCB7IGV2ZW50Um91dGVzIH0gZnJvbSAnLi9ldmVudFJvdXRlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVSb3V0ZXMocm91dGVyOiBJUm91dGVyKSB7XG4gIGNvbmZpZ1JvdXRlcyhyb3V0ZXIpO1xuICBldmVudFJvdXRlcyhyb3V0ZXIpO1xufVxuIl19