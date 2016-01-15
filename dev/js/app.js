var $ = require('jquery');

var devPanel = require('./module/dePanel.js');
var position = require('./module/position.js');
var opacity = require('./module/opacity.js');
var uploadModule = require('./module/upload.js');
var dragndrop = require('./module/dragndrop.js');
var widgets = require('./module/widgets.js');


$(document).ready(function() {
	devPanel();
	position.init();
	opacity();
	uploadModule();
	dragndrop();
	widgets();
});

