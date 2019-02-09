let routes = require("../_config/hide/routes");

routes.Route.add("/actus", "Actus:all");
routes.Route.add("/actus/{name}", "Actus:one");