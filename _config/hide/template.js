var fs = require("fs");
var Handlebars = require("handlebars");
var Nunjucks = require("nunjucks");

class Template {

	constructor (view, params = {}, session) {
		var filePath = view.split(":")[0] + "/" + view.split(":")[1] + ".html";
		this.content = fs.readFileSync("./Templates/" + filePath, 'utf8');
		this.path = filePath;
		this.params = params;
		this.params.global = global;
		this.params.session = session;
	}

}


module.exports.HandlebarsTemplate = class HandlebarsTemplate extends Template{

	showTime () {
		var template = Handlebars.compile(this.content);
		return template(this.params);
	}

}

module.exports.NunjucksTemplate = class NunjucksTemplate extends Template {

	showTime() {
		Nunjucks.configure("./Templates/", {autoescape : true});
		return Nunjucks.render(this.path, this.params);
	}

}