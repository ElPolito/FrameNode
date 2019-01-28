let http = require("http");
let url = require("url");
let events = require("events");
let fs = require("fs");

let routes = require("./_config/hide/routes");
routes.Route.paths = [];
routes.Route.controllers = [];

let routesload = require("./_config/hide/requires/routes");
routesload.load();
require("./_config/database.js");
require("./Defines/default.js");

let server = http.createServer((req, res) => {
	let isAsset = assetsRequest(req, res);
	if(isAsset) return;
	let controller = getController(req);
	if(controller == null) return;
	callController (controller, res);
});

server.listen(8080);

getController = (req) => {
	let page = url.parse(req.url).pathname;
	page = page.replace("..", "");
	var re = routes.Route.submit(page);
	return re;
}

callController = (re, response) => {
	var name = re.controller + "Controller";
	let con = require("./Controllers/" + lowerFirstLetter(re.controller) + ".js");
	var controller = new con ();
	controller.getEvent().on("controllerResult", res => {
		response.writeHead(re.response, {"Content-Type": "text/html"});
		response.write(res);
		response.end();
	});
	controller[re.func]();
}

assetsRequest = (req, res) => {
	let page = url.parse(req.url).pathname;
	page = page.replace("..", "");
	if(page.startsWith("/Assets")){
    	fs.readFile("." + page, "utf8", (err, contents) => {
    		res.end(contents);
    	});
		return true;
	}else{
		return false;
	}
}


/* Private */
lowerFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
}