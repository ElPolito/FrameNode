let Controller = require("../_config/utils/controller.js");
let UserDAO = require("../DatabaseLinks/userDao.js");

class DefaultController extends Controller {

	home () {
		var dao = new UserDAO();
		dao.getAllUsers();
		dao.getEvent().on("getAllUsers", res => {
			var view = this.handlebarTemplate("Global:home", {toto : "the page"});
			this.returnResult(view.showTime());
			dao.close();
		});
		
	
	}

	connection () {
		this.returnResult("toto");
	}

}

module.exports = DefaultController;