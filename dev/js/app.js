var $ = require('jquery');

var opacity = require('./module/opacity.js');
var upload = require('./module/upload.js');
var lang = require('./module/lang.js');



$(document).ready(function() {
	app.init();
});


var app = (function () {
	var module = {
		upload: upload,
		slider: opacity,
		lang: lang
	};
	var init = function () {
		module.slider.init();
		module.upload.init();
		module.lang();
	};
	return {
		init: init
	};
})();

