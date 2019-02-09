let events = require("events");
let DB = require("../hide/connectdb.js");

module.exports = class DAO {

	constructor () {
		this.event = new events.EventEmitter();
		this.nb = 0;	
	}

	getEvent () {
		return this.event;
	}

	query (sql, args = []) {
		
		let mynb = this.nb;
		this.nb ++;

		DB.db.query(sql, args, (err, result) => {
			if(err) {
				this.event.emit("queryRes_" + mynb, null);
				throw err;
			}else{
				this.event.emit("queryRes_" + mynb, result);
			}
		});
		return mynb;
	}

}