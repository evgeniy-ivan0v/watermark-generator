var $ = require('jquery');

var devPanel = require('./module/dePanel.js');
var position = require('./module/position.js');


$(document).ready(function() {
	devPanel();
	position.init();
});
