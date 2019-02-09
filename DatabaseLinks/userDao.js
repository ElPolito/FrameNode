let DAO = require("../_config/utils/dao.js");
let User = require("../Classes/Entities/user.js");

class UserDAO extends DAO {

	getAllUsers () {
		let nb = this.query("SELECT * FROM USER");
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

	connectUser (pseudo, pass) {
		let nb = this.query("SELECT * FROM user WHERE PSEUDO = ? AND PASSWORD = ?", [pseudo, pass]);
		this.event.on("queryRes_" + nb, res => {
			if(res != false) {
				if(res.length == 0) {
					this.event.emit("connectUser", null);
				}else{
					let e = res[0];
					let user = new User(e["ID_USER"], e["MAIL"], e["PASSWORD"], e["PSEUDO"], e["PIC"]);
					this.event.emit("connectUser", user);
				}
			}else{
				this.event.emit("connectUser", null);
			}
		});
	}

}


module.exports = UserDAO;