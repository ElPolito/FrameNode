let Controller = require("../_config/utils/controller.js");

class GlobalController extends Controller {

	home () {
		var view = this.nunjucksTemplate("Global:home", {toto : "the page"});
		this.returnResult(view.showTime());
	}

}

module.exports = GlobalController;