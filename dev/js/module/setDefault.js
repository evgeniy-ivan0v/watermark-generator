var $ = require('jquery');

var setDefault = (function() {
	var xmin = 0,
		ymin = 0,
		mainImg = $('.generator__main-image'),
		watermark = $('.generator__watermark-image'),
		xmax = mainImg.width() - watermark.width(),
		ymax = mainImg.height() - watermark.height(),
		defPos = 'top-left',
		mode = 'single',
		container = $('.canvas-wrapper');
		//Задаем дефолтные координаты в зависимости от выбранного начального положения
		function diffPos(pos) {
			var xstart, ystart;
			switch (pos) {
			case 'top-left':
				xstart = 0;
				ystart = 0;
				break;
			case 'top-center':
				xstart = (mainImg.width() - watermark.width())/2;
				ystart = 0;
				break;
			case 'top-right':
				xstart = mainImg.width() - watermark.width();
				ystart = 0;
				break;
			case 'middle-left':
				xstart = 0;
				ystart = (mainImg.height() - watermark.height())/2;
				break;
			case 'middle-center':
				xstart = (mainImg.width() - watermark.width())/2;
				ystart = (mainImg.height() - watermark.height())/2;
				break;
			case 'middle-right':
				xstart = mainImg.width() - watermark.width();
				ystart = (mainImg.height() - watermark.height())/2;
				break;
			case 'bottom-left':
				xstart = 0;
				ystart = mainImg.height() - watermark.height();
				break;
			case 'bottom-center':
				xstart = (mainImg.width() - watermark.width())/2;
				ystart = mainImg.height() - watermark.height();
				break;
			case 'bottom-right':
				xstart = mainImg.width() - watermark.width();
				ystart = mainImg.height() - watermark.height();
				break;
			default:
				xstart = 0;
				ystart = 0;
			}
			return {
				xPos: xstart,
				yPos: ystart
			}

		}
		
	var init = function() {
		//Задаем размеры контейнера в зависимости от ширины и высоты основного фото
			container.css({
				'width': mainImg.width(),
				'height': mainImg.height(),
				'margin': 'auto',
				'position': 'relative'
			});
		//Помещаем вотермарк в дефолтные координаты
			watermark.css({
					'top': diffPos(defPos).yPos,
					'left': diffPos(defPos).xPos,
					'margin': 0
				});
		};	

	return {
		xmin: xmin,
		ymin: ymin,
		xmax: xmax,
		ymax: ymax,
		defPos: defPos,
		mode: mode,
		init: init,
		diffPos: diffPos
	}
})();

module.exports = setDefault