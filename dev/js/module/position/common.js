//Служебные функции и подзадачи для основных модулей
var $ = require('jquery'),
	opt = require('./options.js');

var common = (function() {
	var mainImg = $('.generator__image-holder'),
		inputs = $('.coords__input'),
		xInput = $('#x-pos'),
		yInput = $('#y-pos'),
		posBlock = $('.position-wrapper'),
		container = $('.generator__image-holder'),
		switches = $('.switch__list'),
		posItems = $('.position__item');

	//Определение вотермарка
	function defineWatermark() {
		var watermark = $('.generator__watermark-image');
		return watermark
	}

	//Получение максимальных значений сдвигов
	function setBorders() {
		var	xmax = mainImg.width() - defineWatermark().width(),
			ymax = mainImg.height() - defineWatermark().height();
		return {
			x: xmax,
			y: ymax
		}
	}

	//Смена значений инпутов
	function changeInput() {
		var newX = defineCoords(defineWatermark()).x,
			newY = defineCoords(defineWatermark()).y;
		xInput.val(newX);
		yInput.val(newY);
	};

	function posTile() {
		return{
			x: defineCoords(getTileWrapper()).x,
			y: defineCoords(getTileWrapper()).y
		}
	};

	function getTileWrapper() {
		return $('.marks-tile__wrapper');
	};

	//Получение значения, не выходящего за рамки заданного диапазона
	function condition(current, min, max) {
		if (current > max) {
			current = max;
		} else if (current < min) {
			current = min;
		}
		return current
	}

	//Получение текущих координат элемента
	function defineCoords(element) {
		var currentX = parseInt(element.css('left')),
			currentY = parseInt(element.css('top'));
		return {
			x: currentX,
			y: currentY
		}
	}

	//Движение вотермарка
	function moveWatermark(newX, newY) {
		defineWatermark().animate({
			'top': newY,
			'left': newX
		}, opt.duration, function() {
			changeInput();
			curOptions();
		});
	}

	//Определяет координаты сдвига вотермарка по сетке
	function setGridCoords(pos) {
		var xstart, ystart,
			watermark = defineWatermark();
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

	//Определяем нужный квадрат сетки согласно дата-положению
	function classBox(position) {
		posItems.removeClass('active__item');
		posItems.each(function() {
			if ($(this).data('position') === position) {
				$(this).addClass('active__item');
			}
		});
	}

	//Записываем текущие координаты одиночного вотермарка
	function curOptions() {
		opt.curX = defineCoords(defineWatermark()).x;
		opt.curY = defineCoords(defineWatermark()).y;
	}
	
	return {
		defmark: defineWatermark,
		setbr: setBorders,
		changeIn: changeInput,
		cnd: condition,
		defcoords: defineCoords,
		move: moveWatermark,
		grid: setGridCoords,
		classBox: classBox,
		mainImg: mainImg,
		posBlock: posBlock,
		inputs: inputs,
		xInput: xInput,
		yInput: yInput,
		switches: switches,
		container: container,
		posItems: posItems,
		posTile: posTile,
		curopt: curOptions
	}
})();

module.exports = common 