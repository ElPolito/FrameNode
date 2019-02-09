let Controller = require("../_config/utils/controller.js");

class FilmsAndSeriesController extends Controller {

	films () {
		var view = this.nunjucksTemplate("FilmsAndSeries:films");
		this.returnResult(view.showTime());
	}

	series () {
		var view = this.nunjucksTemplate("FilmsAndSeries:series");
		this.returnResult(view.showTime());
	}

	film (name) {
		this.returnResult(name);
	}

	serie (name) {
		this.returnResult(name);
	}

}

module.exports = FilmsAndSeriesController;