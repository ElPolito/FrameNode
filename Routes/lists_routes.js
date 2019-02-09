let routes = require("../_config/hide/routes");

routes.Route.add("/lists", "Lists:home");
routes.Route.add("/lists/{name}", "Lists:one");