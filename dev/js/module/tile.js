var $ = require('jquery');
var setDefault = require('./setDefault.js');

var tile = (function() {
	var mainImg = $('.generator__main-image'),
		container = $('.generator__image-holder'),
		marginX = setDefault.marginX,
		marginY = setDefault.marginY,
		inputs = $('.coords__input'),
		xInput = $('#x-pos'),
		yInput = $('#y-pos');

	//Инициализирует режим плитки с дефолтными настройками
	var init = function() {
		tiling(marginX, marginY);
		setInputs(marginX, marginY);
	};
	//Отрисовывает плитку
	var tiling = function(mx, my) {
		var qtyRow, qtyCol,
			watermark = $('.generator__watermark-image');					
		qtyRow = Math.ceil(mainImg.width()/watermark.width()) + 1;
		qtyCol = Math.ceil(mainImg.height()/watermark.height()) + 1;
		for (var j = 0; j < qtyCol; j++) {
			for (var i = 0; i < qtyRow; i++) {
				var currentClone = watermark.clone();
				currentClone.css({
					'top': (watermark.height() + mx)*(j - 1),
					'left': (watermark.width() + my)*(i - 1)
				});
				currentClone.appendTo(container);
			}
		}
		watermark.remove();
	};
	//Устанавливает значения инпутов
	var setInputs = function(mx, my) {
		xInput.val(mx);
		yInput.val(my);
	};
	//Убирает плитку, оставляя только один вотермарк в top-left
	var removeTile = function() {
		var watermarks = $('.generator__watermark-image'),
			oneWatermark = watermarks.first().clone();
		watermarks.remove();
		oneWatermark.css({'top': 0, 'left': 0});
		oneWatermark.appendTo(container);
	};
	//Меняет ширину полоски
	var lineWidth = function(mx, my) {
		var horLine = $('.watermark__margin.horizontal'),
			verLine = $('.watermark__margin.vertical');
		horLine.css({
			'height': mx,
			'margin-top': -mx/2
		});
		verLine.css({
			'width': my,
			'margin-left': -my/2
		});
	};

	return {
		init:init,
		tiling: tiling,
		remove: removeTile,
		setInputs: setInputs,
		lineWidth: lineWidth
	}
})();

module.exports = tile