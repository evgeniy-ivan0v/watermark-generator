var $ = require('jquery');

var opacity = require('./opacity.js'),
	setDefault = require('./position/setDefault.js');

var reset = (function () {
	var $elem = $(".button__reset");
	var module = {
		opacity: opacity,
		position: setDefault
	};

	var _setListener = function () {
		$elem.on('click', function (e) {
			e.preventDefault();
			reset();
		});
	};

	var reset = function () {
		module.opacity.setDefault();
		module.position.resetPos();
	};

	var init = function () {
		_setListener();
	};

	return {
		init: init
	};
})();

module.exports = reset