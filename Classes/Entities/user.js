class User {

	constructor (id, mail, pass, pseudo, pic) {
		this.id = id;
		this.mail = mail;
		this.pass = pass;
		this.pseudo = pseudo;
		this.pic = pic;
	}

	getId () {
		return this.id;
	}

	getMail () {
		return this.mail;
	}

	getPass () {
		return this.pass;
	}

	getPseudo () {
		return this.pseudo;
	}

	getPic () {
		return this.pic;
	}

}

module.exports = User;