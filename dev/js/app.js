var devPanel = require('./module/dePanel.js');
var opacity = require('./module/opacity.js');
var uploadModule = require('./module/upload.js');
var $ = require('jquery')

$(document).ready(function() {
	devPanel();
	opacity();
	uploadModule();
});