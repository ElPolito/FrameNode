let uuidv4 = require("uuid/v4");
let jwt = require("jsonwebtoken");
let sqlite3 = require("sqlite3").verbose();
let events = require("events");

module.exports = class Session {

	constructor () {
		this.event = new events.EventEmitter();
	}

	getEvent () { return this.event; }

	getData (cookies) {
		this.alreadyExists = false;
		this.token = cookies.get("sessionId", {signed : true});
		if(this.token != null) {
			let db = new sqlite3.Database('./_config/hide/session.db');
			db.parallelize(() => {
				db.get("SELECT tokenSign, sessionId, datas FROM SESSIONS WHERE token = ?", [this.token], (err, row) => {
					if(err) throw err;
					if(row) {
						this.tokenSign = row.tokenSign;
						this.sessionId = row.sessionId;

						try{
							let decodedToken = jwt.verify(this.token, this.tokenSign);
							if(decodedToken.sessionId == this.sessionId) {
								this.alreadyExists = true;
								this.event.emit("getData", JSON.parse(row.datas));
							}else{
								db.run("DELETE FROM SESSIONS WHERE sessionId = ?", [this.sessionId], (err) => {});
								this.sessionId = uuidv4();
								this.tokenSign = uuidv4();
								this.event.emit("getData", {});
								
							}
						}catch(err) {
							db.run("DELETE FROM SESSIONS WHERE sessionId = ?", [this.sessionId], (err) => {});
							this.sessionId = uuidv4();
							this.tokenSign = uuidv4();
							this.event.emit("getData", {});
							
						}
					}else{
						this.sessionId = uuidv4();
						this.tokenSign = uuidv4();
						this.event.emit("getData", {});
						
					}
				});
				var time = new Date().getTime();
				db.run("DELETE FROM SESSIONS WHERE CAST(date as decimal) < ?", [time]);
			});
			db.close();
		}else{
			this.sessionId = uuidv4();
			this.tokenSign = uuidv4();
			this.event.emit("getData", {});
		}
	}

	setData (datas, cookies) {
		let db = new sqlite3.Database('./_config/hide/session.db');
		db.parallelize(() => {
			if(!this.alreadyExists) {
				this.token = jwt.sign({sessionId : this.sessionId}, this.tokenSign, {expiresIn : '1h'});
				var time = new Date().getTime();
				time += (60*60*1000);
				db.run("INSERT INTO SESSIONS (sessionId, tokenSign, token, datas, date) VALUES (?, ?, ?, ?, ?)", [this.sessionId, this.tokenSign, this.token, JSON.stringify(datas), time], (err) => {
					if(err) throw err;
					cookies.set("sessionId", this.token, {signed : true});
					this.event.emit("sessiondone");
				});
			}else{
				db.run("UPDATE SESSIONS SET datas = ? WHERE sessionId = ?", [JSON.stringify(datas), this.sessionId], (err) => {
					if(err) throw err;
					this.event.emit("sessiondone");
				});
			}
		});
		db.close();	
	}
}