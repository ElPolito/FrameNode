let Controller = require("../_config/utils/controller.js");

class ActusController extends Controller {

	all () {
		var view = this.nunjucksTemplate("Actus:home");
		this.returnResult(view.showTime());
	}

	one (name) {
		this.returnResult(name);
	}

}

module.exports = ActusController;