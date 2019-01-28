module.exports = class DB {

	static set db (d) {
		this._db = d;
	}

	static get db () {
		return this._db;
	}

}