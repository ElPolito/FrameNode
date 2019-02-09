let http = require("http");
let url = require("url");
let events = require("events");
let fs = require("fs");
let querystring = require("querystring");
let Cookies = require("cookies");

let event = new events.EventEmitter();
let Session = require("./_config/hide/session.js");

let routes = require("./_config/hide/routes");
routes.Route.paths = [];
routes.Route.controllers = [];

let routesload = require("./_config/hide/requires/routes");
routesload.load();
require("./_config/database.js");
require("./Defines/default.js");

let server = http.createServer((req, res) => {
	processRequest(req, res);
	
});

server.listen(8100);

processRequest = (req, res) => {
	let isAsset = assetsRequest(req, res);
	if(isAsset) return;
	let controller = getController(req);
	if(controller == null) return;
	res.statusCode = controller.response;
	if(req.method == "POST") {
		var i = true;
		event.on("getpost", post => {
			if (!i) return;
			i = false;
			callController (controller, res, req, post);
		});
		getPost(req);
	}else{
		callController (controller, res, req, "");
	}
}

getController = (req) => {
	let page = url.parse(req.url).pathname;
	page = page.replace("..", "");
	var re = routes.Route.submit(page);
	return re;
}

callController = (re, response, req, post) => {
	let get = getGet(req);

	/* Cookies */
	let keys = ["8505230gres120efg12ef0sfe120s"];
	let cookies = new Cookies(req, response, {keys : keys});
	/* Sessions */
	let sessionObj = new Session();
	sessionObj.getEvent().on("getData", (data) => {
		let session = data;
		var name = re.controller + "Controller";
		let con = require("./Controllers/" + lowerFirstLetter(re.controller) + ".js");	
		var controller = new con (get, post, cookies, sessionObj, session, response);
		controller.getEvent().on("controllerResult", () => {
			response.end();
		});
		if(re.arguments.length == 0) {
			controller[re.func]();
		}else{
			controller[re.func](re.arguments);
		}
	});
	sessionObj.getData(cookies);
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

getGet = (req) => {
	var get = querystring.parse(url.parse(req.url).query);
	return get;
}

getPost = (req) => {
	let body = "";
	
	req.on("data", data => {
		body += data;
		if(body.length > 1e6) {
			req.connection.destroy();
		}
	});

	req.on("end", () => {
		let post = querystring.parse(body);
		event.emit("getpost", post);
	});
};


/* Private */
lowerFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
}