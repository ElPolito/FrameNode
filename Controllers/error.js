var Controller = require("../_config/utils/controller.js");

class ErrorController extends Controller {

	notfounderror () {
		
		var view = this.handlebarTemplate("_Errors:404");
		this.returnResult(view.showTime());
	
	}

}

module.exports = ErrorController;