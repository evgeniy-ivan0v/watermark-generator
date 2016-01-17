var $ = require('jquery');
require('jquery-ui/draggable');
var common = require('./common.js');
var tile = require('./tile.js');

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
				common.curopt();
			}
		});
	};
	var tile = function() {
		var wrapper = $('.marks-tile__wrapper');
			
		wrapper.draggable({
			cursor: 'pointer',
			containment: dragArea() 
		});
	};

	//Задает размеры области драга в режиме плитки
	var dragArea = function() {
		var wrapper = defineWrapper();
		var holder = $('.generator__image-holder'),
			xHolder = holder.offset().left,
			yHolder = holder.offset().top,
			xtop, ytop, xbot, ybot, coords;
		xtop = xHolder - (wrapper.width() - holder.width());
		ytop = yHolder - (wrapper.height() - holder.height());
		xbot = xHolder + (wrapper.width() - holder.width());
		ybot = yHolder + (wrapper.height() - holder.height());
		coords = [xtop, ytop, xbot, ybot];
		return coords
	};

	var defineWrapper = function() {
		var wrapper = $('.marks-tile__wrapper');
		return wrapper;
	} 
	
	return {
		single: single,
		tile: tile
		}
	
})();

module.exports = drag