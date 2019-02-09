let Controller = require("../_config/utils/controller.js");

class ListsController extends Controller {

	home () {
		
		var view = this.nunjucksTemplate("Lists:home");
		this.returnResult(view.showTime());
	}

	one (name) {
		var view = this.nunjucksTemplate("Lists:one");
		this.returnResult(view.showTime());	
	}

}

module.exports = ListsController;