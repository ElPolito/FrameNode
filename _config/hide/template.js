var fs = require("fs");
var Handlebars = require("handlebars");

class Template {

	constructor (view, params = {}) {
		var filePath = "./Templates/" + view.split(":")[0] + "/" + view.split(":")[1] + ".html";
		this.content = fs.readFileSync(filePath, 'utf8');
		this.params = params;
		this.params.global = global;
	}

}


module.exports.HandlebarsTemplate = class HandlebarsTemplate extends Template{

	showTime () {
		var template = Handlebars.compile(this.content);
		return template(this.params);
	}

}