let Controller = require("../_config/utils/controller.js");
let UserDAO = require("../DatabaseLinks/userDao.js");

class UserController extends Controller {

	login () {
		if(this.session.user != null) {
			this.redirect(global.path);
			return;
		}
		if(this.post.pseudo != null && this.post.pass != null) {
			var dao = new UserDAO();
			dao.connectUser(this.post.pseudo, this.post.pass);
			dao.getEvent().on("connectUser", res => {
				if(res == null) {
					var view = this.nunjucksTemplate("User:login", {error : true});
					this.returnResult(view.showTime());
				}else{
					this.session.user = res;
					this.redirect(global.path);
					return;
				}
			});
		}else{
			var view = this.nunjucksTemplate("User:login", {error : false});
			this.returnResult(view.showTime());
		}
	}

	register () {
		this.returnResult("register");
	}

	disconnect () {
		delete this.session.user;
		this.redirect(global.path);
	}

}

module.exports = UserController;