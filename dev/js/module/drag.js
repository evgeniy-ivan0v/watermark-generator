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
		var wrapper = $('.marks-tile__wrapper'),
			holder = $('.generator__image-holder'),
			xHolder = holder.offset().left,
			yHolder = holder.offset().top,
			wHolder = holder.width(),
			hHolder = holder.height(),
			wWrapper = wrapper.width(),
			hWrapper = wrapper.height(),
			xtop, ytop, xbot, ybot;

		xbot = xHolder + (wWrapper - wHolder);
		ybot = yHolder + (hWrapper - hHolder);
		xtop = xHolder - (wWrapper - wHolder);
		ytop = yHolder - (hWrapper - hHolder);
		console.log(wrapper);

		wrapper.draggable({
			cursor: 'pointer',
			containment: [xtop, ytop, xbot, ybot]
		});
	}
	
	return {
		single: single,
		tile: tile
		}
	
})();

module.exports = drag