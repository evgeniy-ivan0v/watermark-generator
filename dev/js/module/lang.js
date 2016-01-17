var $ = require('jquery');
require ('./jquery.localize.js');

var lang = (function() {

	var init = function() {
		$("[data-localize]").localize("index");
		setUpListeners();
	};

	var setUpListeners = function() {
		$('#ru').on('click', function(event) {
			event.preventDefault();
			$("[data-localize]").localize("index", { language: "ru" });
		});
		$('#en').on('click', function(event) {
			event.preventDefault();
			$("[data-localize]").localize("index", { language: "en" });
		});
	};

	return {
		init: init
	}
})();

module.exports = lang.init