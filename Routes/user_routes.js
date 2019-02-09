let routes = require("../_config/hide/routes");

routes.Route.add("/login", "User:login");
routes.Route.add("/register", "User:register");
routes.Route.add("/disconnect", "User:disconnect");