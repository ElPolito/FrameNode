module.exports = {

	/*
	Submit function return an object :
	{
		response : 200,
		controller : "toto",
		func : "tata",
		arguments : []
	}


	*/

	Route : class {

		static add (path, controller) {
			this._paths.push(path);
			this._controllers.push(controller);
		}

		static submit (uri) {
			let found = false;
			let paths = this._paths;
			let controllers = this._controllers;
			for(var i = 0; i < paths.length; i++) {
				let real = paths[i];
				if(real.includes("{")){
					let args = [];
					let firstStr = real.substr(0, real.indexOf("{"));
					if(uri.substr(0, firstStr.length) == firstStr) {
						var a = 0;
						var b = real.indexOf("{", a);
						var c = 0;
						var d = firstStr.length;
						var error = false;
						var count = (real.match(/{/g) || []).length;
						for(var j = 0; j < count; j++) {
							c = uri.indexOf("/", d);
							if(c == -1) c = uri.length;
							args.push(uri.substr(d, c-d));
							a = real.indexOf("}", b);
							b = real.indexOf("{", a);
							if(b == -1) b = real.length;
							var chain = real.substr(a+1, b-a-1);
							var cutUri = uri.substr(c, chain.length);
							d = c + cutUri.length;
							if(chain != cutUri) {
								error = true;
								break;
							}
						}
						if(!error) {
							if(args.length == 1){
								args = args[0];
							}
							var controller = controllers[i].split(":")[0];
							var func = controllers[i].split(":")[1]; 
							return {response : 200, controller : controller, func : func, arguments : args};
						}
					}
				}else {
					if(uri == real) {
						var controller = controllers[i].split(":")[0];
						var func = controllers[i].split(":")[1]; 
						return {response : 200, controller : controller, func : func, arguments : []};
					}
				}
			}

			if(!found) {
				return {response : 404, controller : "error", func : "notfounderror", arguments : []};
			}
		}

		static get paths () { return this._paths; }

		static set paths (p) { this._paths = p; }

		static get controllers () { return this._controllers; }

		static set controllers (c) { this._controllers = c; }
	},

};


