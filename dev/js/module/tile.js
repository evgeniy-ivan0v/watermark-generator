var $ = require('jquery');
var setDefault = require('./setDefault.js');
var common = require('./common.js');
var opt = require('./options.js');

var tile = (function() {
			
	//Отрисовывает плитку
	var tiling = function(mx, my) {
		var qtyRow, qtyCol, wrapper,
			watermark = common.defmark(),
			markup = '<div class="marks-tile__wrapper">';
			common.container.append(markup);
			wrapper = $('.marks-tile__wrapper');
		wrapperSize(mx, my);

		for (var i = 0; i < countMarks().qtyRow * countMarks().qtyCol; i++) {
			var currentClone = watermark.clone();
			currentClone.css({
					'position': 'relative',
					'margin-right': my,
					'margin-bottom': mx,
					'width': watermark.width(),
					'height': watermark.height()
			});
			currentClone.appendTo(wrapper);
		}
		watermark.remove();
		setInputs(mx, my);
		lineWidth(mx, my);
	};

	//Устанавливает значения инпутов
	var setInputs = function(mx, my) {
		common.xInput.val(mx);
		common.yInput.val(my);
	};

	//Убирает плитку, оставляя только один вотермарк в top-left
	var removeTile = function() {
		var watermarks = $('.generator__watermark-image'),
			oneWatermark = watermarks.first().clone(),
			wrapper = $('.marks-tile__wrapper');
		watermarks.remove();
		wrapper.remove();
		oneWatermark.css({
			'top': 0, 
			'left': 0, 
			'position': 'absolute', 
			'margin': 0
		});
		oneWatermark.appendTo(common.container);
	};

	//Меняет ширину полоски
	var lineWidth = function(mx, my) {
		var horLine = $('.watermark__margin.horizontal'),
			verLine = $('.watermark__margin.vertical');
		horLine.css({
			'height': mx/3,
			'margin-top': -mx/6
		});
		verLine.css({
			'width': my/3,
			'margin-left': -my/6
		});
	};

	//Меняет марджины у вотермарков
	var changeMargin = function(mx, my) {
		common.defmark().css({'margin-right': my, 'margin-bottom': mx});
		wrapperSize(mx, my);
		lineWidth(mx, my);
		setInputs(mx, my);
	};

	//Рассчитывает количество вотермарков
	var countMarks = function() {
		var watermark = common.defmark().first(),
			qtyRow = Math.ceil(common.mainImg.width()/watermark.width()),
			qtyCol = Math.ceil(common.mainImg.height()/watermark.height());
		return {
			qtyRow: qtyRow,
			qtyCol: qtyCol
		}
	}

	//Задает размер обертки 
	var wrapperSize = function(mx, my) {
		var	watermark = common.defmark().first(),
			wrapper = $('.marks-tile__wrapper');

		wrapper.css({ 'width': countMarks().qtyRow*(watermark.width() + my),
					  'height': countMarks().qtyCol*(watermark.height() + mx)
					});
	};

	return {
		tiling: tiling,
		remove: removeTile,
		changeMargin: changeMargin
	}
})();

module.exports = tile