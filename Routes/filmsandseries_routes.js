let routes = require("../_config/hide/routes");

routes.Route.add("/films", "FilmsAndSeries:films");
routes.Route.add("/series", "FilmsAndSeries:series");

routes.Route.add("/films/{name}", "FilmsAndSeries:film");
routes.Route.add("/series/{name}", "FilmsAndSeries:serie");