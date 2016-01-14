var $ = require('jquery');

var opacity = require('./opacity.js')

var reset = (function () {
	var $elem = $(".button__reset");
	var module = {
		opacity: opacity
	};

	var _setListener = function () {
		$elem.on('click', function (e) {
			e.preventDefault();
			reset();
		});
	};

	var reset = function () {
		module.opacity.setDefault();
	};

	var init = function () {
		_setListener();
	};

	return {
		init: init
	};
})();

module.exports = reset