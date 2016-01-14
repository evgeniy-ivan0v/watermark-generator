var $ = require('jquery');

var opacity = require('./module/opacity.js');
var upload = require('./module/upload.js');


$(document).ready(function() {
	app.init();
});


var app = (function () {
	var module = {
		upload: upload,
		slider: opacity
	};
	var init = function () {
		module.slider.init();
		module.upload.init();
	};
	return {
		init: init
	};
})();

