var $ = require('jquery');
var setDefault = require('./setDefault.js');

var position = (function() {
	var posBlock = $('.position-wrapper'),
		inputs = $('.coords__input'),
		xInput = $('#x-pos'),
		yInput = $('#y-pos'),
		posItems = $('.position__item'),
		watermark = $('.generator__watermark-image'),
		mainImg = $('.generator__main-image'),
		mode = setDefault.mode,
		xmin = setDefault.xmin,
		ymin = setDefault.ymin,
		defPos = setDefault.defPos;
	var init = function() {
		_defaultSettings();
		_setUpListeners();
	};
	//Начальные настройки для работы с изображениями
	var _defaultSettings = function() {
		setDefault.init();
		posBlock.removeClass('unselect')
				.addClass(mode);
		inputs.attr('disabled', false);
		xInput.val(xmin);
		yInput.val(ymin);
		posItems.each(function() {
			if ($(this).data('position') === defPos) {
				$(this).addClass('active__item');
			}
		});
	};
	//Определяем xmax и imax
	function  _defineMax() {
		var xmax = mainImg.width() - watermark.width(),
			ymax = mainImg.height() - watermark.height();
		return {
			x: xmax,
			y: ymax
		}

	};
	//Прослушка событий
	var _setUpListeners = function() {
		$('.switch__item').on('click', _switchMode);
		$('.position__item').on('click', _blockMove);
		$('.coords__arrow').on('click', _spinner);
		inputs.on('change', _writePos);
	};
	//Переключаем режим
	var _switchMode = function() {
		var item = $(this),
			items = $('.switch__item');
		items.removeClass('active');
		item.addClass('active');
		if (item.hasClass('single')) {
			posBlock.removeClass('tile')
					.addClass('single');
			mode = 'single';
		} else if (item.hasClass('tile')) {
			posBlock.removeClass('single')
					.addClass('tile');
			mode = 'tile';
		}
	};
	//Двигаем вотермарк при клике на позиции в режиме single
	var _blockMove = function() {
		var choosenPos = $(this).data('position'),
			items = $('.position__item'),
			choosenItem = $(this);
		if (mode === 'single') {
			watermark.css({
					'top': setDefault.diffPos(choosenPos).yPos,
					'left': setDefault.diffPos(choosenPos).xPos,
				});
			items.removeClass('active__item');
			choosenItem.addClass('active__item');
			changeInput();
		}
		
	};
	//Обрабатываем ввод значений в инпуты
	var _writePos = function(e) {
		//TODO: Форма не должна сабмититься при нажатии enter из инпута
		// if (e.keyCode == 13) {
		// 	e.preventDefault();
		// }		
		var elem = $(this),
			newX, newY,
			currentX = currentCoords(watermark).x,
			currentY = currentCoords(watermark).y,
			xmax = _defineMax().x,
			ymax = _defineMax().y;
		if (mode === 'single') {
			if (elem.is('#x-pos')) {
				newX = condition((parseInt(elem.val())), xmax, xmin).cur;
				moveWatermark(newX, currentY);
				changeInput();
			} else if (elem.is('#y-pos')) {
				newY = condition((parseInt(elem.val())), ymax, ymin).cur;
				moveWatermark(currentX, newY);
				changeInput();
			}
		}
		
	};
	//Обрабатываем клики на стрелках инпутов
	var _spinner = function() {
		var arrow = $(this),
			item = arrow.closest('.coords__item'),
			input = item.find('.coords__input'),
			delta = 1,
			currentX = currentCoords(watermark).x,
			currentY = currentCoords(watermark).y,
			xmax = _defineMax().x,
			ymax = _defineMax().y,
			newX, newY;
		if (arrow.hasClass('arrow-down')) {
			delta = -1;
		}
		if (mode === 'single') {
			if (input.is('#x-pos', delta)) {
				newX = condition((currentX + delta), xmax, xmin).cur;
				moveWatermark(newX, currentY);
				changeInput();
			} else if (input.is('#y-pos')) {
				newY = condition((currentY + delta), ymax, ymin).cur;
				moveWatermark(currentX, newY);
				changeInput();
			}
		}
	}
	//Записываем новые значения положения в инпуты
	var changeInput = function() {
		var newX = currentCoords(watermark).x,
			newY = currentCoords(watermark).y;
		xInput.val(newX);
		yInput.val(newY);
	};
	//Двигаем вотермарк	
	var moveWatermark = function(newX, newY) {
		watermark.css({
			'top': newY,
			'left': newX
		});
	}
	//Получаем текущие координаты элемента
	var currentCoords = function(elem) {
		var currentX = parseInt(elem.css('left')),
			currentY = parseInt(elem.css('top'));
		return {
			x: currentX,
			y: currentY
		}
	};

	var condition = function(current, max, min) {
		if (current > max) {
			current = max;
		} else if (current < min) {
			current = min;
		}
		return {
			cur: current
		}

	};

	return {
		init: init
	}

})();

module.exports = position