let DAO = require("../_config/utils/dao.js");
let User = require("../Classes/Entities/user.js");

class UserDAO extends DAO {

	getAllUsers () {
		let nb = this.query("SELECT * FROM user");
		this.event.on("queryRes_" + nb, res => {
			if(res != false) {
				let users = [];
				res.forEach (e => {
					users.push(new User(e["ID"], e["MAIL"], e["PASS"], e["PSEUDO"], e["PIC"]));
				});
				this.event.emit("getAllUsers", users);
			}else{
				this.event.emit("getAllUsers", []);
			}
		});
	}

}


module.exports = UserDAO;