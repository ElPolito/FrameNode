let template = require("../hide/template.js");
let events = require("events");

module.exports = class Controller {

	constructor () {
		this.event = new events.EventEmitter();
	}

	/* Templates */
	handlebarTemplate (path, args = {}) {
		return new template.HandlebarsTemplate(path, args);
	}
	/* END */

	returnResult (res) {
		this.event.emit("controllerResult", res);
	}

	getEvent () {
		return this.event;
	}
};