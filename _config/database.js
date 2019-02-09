var events = require("events");

var DB = require("./hide/connectdb.js");
DB.event = new events.EventEmitter();
DB.error = false;
DB.connected = false;

var mysql = require("mysql");
var dbInfos = {
	host : "localhost",
	user : "root",
	password : "",
	database : "watchers"
}

var db = mysql.createConnection(dbInfos);
DB.db = db;