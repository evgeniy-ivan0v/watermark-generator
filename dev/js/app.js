var $ = require('jquery');

var opacity = require('./module/opacity.js');
var upload = require('./module/upload.js');
var lang = require('./module/lang.js');
var reset = require('./module/reset.js');
var widgets = require('./module/widgets.js');


$(document).ready(function() {
	app.init();
});


var app = (function () {
	var module = {
		upload: upload,
		slider: opacity,
		lang: lang,
		reset: reset,
		widgets: widgets
	};
	var init = function () {
		module.slider.init();
		module.upload.init();
		module.lang();
		module.reset.init();
		module.widgets();
	};
	return {
		init: init
	};
})();

