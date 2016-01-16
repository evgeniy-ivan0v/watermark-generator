var $ = require('jquery');

var devPanel = require('./module/dePanel.js');
var opacity = require('./module/opacity.js');
var uploadModule = require('./module/upload.js');
var position = require('./module/position.js');

$(document).ready(function() {
	devPanel();
	opacity();
	uploadModule();
	position.init();
});

