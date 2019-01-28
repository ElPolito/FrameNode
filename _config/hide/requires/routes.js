module.exports = {
	
	load : function () {
		var normalizedPath = require("path").join(__dirname, "../../../Routes");
		require("fs").readdirSync(normalizedPath).forEach((file) => {
			require("../../../Routes/" + file);
		});
	}

}