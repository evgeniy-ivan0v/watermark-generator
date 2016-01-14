var $ = require('jquery');
require('jquery-ui/draggable');
var common = require('./common.js');

var drag = (function() {
	var single = function() {
		var watermark = common.defmark();
		watermark.draggable({
			cursor: 'pointer',
			containment: 'parent',
			start: function(event, ui) {
				common.posItems.removeClass('active__item');
			},
			drag: function(event, ui) {
				common.changeIn();
			}
		});
	};
	var tile = function() {
		var wrapper = $('.marks-tile__wrapper');
		wrapper.draggable({
			cursor: 'pointer'
		});
	}
	return {
		single: single,
		tile: tile
	}
})();

module.exports = drag