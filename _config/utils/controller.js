let template = require("../hide/template.js");
let events = require("events");
let Session = require("../hide/session.js");

module.exports = class Controller {

	constructor (query, body, cook, sessionObj, session, response) {
		this.event = new events.EventEmitter();
		this.get = query;
		this.post = body;
		this.cookies = cook;
		this.sessionObj = sessionObj;
		this.session = session;
		this.response = response;
	}

	/* Templates */
	handlebarTemplate (path, args = {}) {
		return new template.HandlebarsTemplate(path, args, this.session);
	}

	nunjucksTemplate (path, args = {}) {
		return new template.NunjucksTemplate(path, args, this.session);
	}
	/* END */

	returnResult (res) {
		this.response.setHeader("Content-Type", "text/html; charset=UTF-8");
		this.sessionObj.getEvent().on("sessiondone", () => {
			this.response.write(res);
			this.event.emit("controllerResult");
		});
		this.sessionObj.setData(this.session, this.cookies);
	}

	redirect (path) {
		this.response.statusCode = 301;
		this.response.writeHead(301, {
			Location: path
		});
		this.sessionObj.getEvent().on("sessiondone", () => {
			this.event.emit("controllerResult");
		});
		this.sessionObj.setData(this.session, this.cookies);
	}

	getEvent () {
		return this.event;
	}
};