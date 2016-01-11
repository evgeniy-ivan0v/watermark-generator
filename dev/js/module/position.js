var $ = require('jquery');
var setDefault = require('./setDefault.js');
var tile = require('./tile.js');

var position = (function() {
	var posBlock = $('.position-wrapper'),
		inputs = $('.coords__input'),
		xInput = $('#x-pos'),
		yInput = $('#y-pos'),
		posItems = $('.position__item'),
		mainImg = $('.generator__main-image'),
		mode = setDefault.mode,
		xmin = setDefault.xmin,
		ymin = setDefault.ymin,
		mxmin = setDefault.mxmin,
		mymin = setDefault.mymin,
		marginX = setDefault.marginX,
		marginY = setDefault.marginY,
		defPos = setDefault.defPos;
	var init = function() {
		_defaultSettings();
		_setUpListeners();
	};
	//Начальные настройки для работы с изображениями
	var _defaultSettings = function() {
		setDefault.init();
		posBlock.removeClass('unselect').addClass(mode);
		$('.switch__list').removeClass('unselect-list');
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
		var	xmax = mainImg.width() - defineMark().width(),
			ymax = mainImg.height() - defineMark().height();
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
		inputs.on('keyup', _writePos);
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
			posItems.removeClass('active__item');
			posItems.first().addClass('active__item');
			mode = 'single';
			tile.remove();
			changeInput();
		} else if (item.hasClass('tile')) {
			var defMx = condition(marginX, _defineMax().y, mxmin).cur,
				defMy = condition(marginY, _defineMax().x, mymin).cur;
			posBlock.removeClass('single').addClass('tile');
			mode = 'tile';
			posItems.removeClass('active__item');
			tile.remove();
			tile.tiling(defMx, defMy);
			tile.setInputs(defMx, defMy);
			tile.lineWidth(defMx, defMy);
		}
	};
	//Двигаем вотермарк при клике на позиции в режиме single
	var _blockMove = function() {
		var choosenPos = $(this).data('position'),
			items = $('.position__item'),
			choosenItem = $(this);
			
		if (mode === 'single') {
			moveWatermark(setDefault.diffPos(choosenPos).xPos, setDefault.diffPos(choosenPos).yPos);
			items.removeClass('active__item');
			choosenItem.addClass('active__item');			
		}
		
	};
	//Обрабатываем ввод значений в инпуты
	var _writePos = function(e) {
		//TODO: Форма не должна сабмититься при нажатии enter из инпута
		if (e.keyCode === 13) {
			e.preventDefault();
		}
		var elem = $(this),
			newX, newY, newMx, newMy,
			currentX = currentCoords(defineMark()).x,
			currentY = currentCoords(defineMark()).y,
			currentMx = parseInt(xInput.val()),
			currentMy = parseInt(yInput.val()),
			xmax = _defineMax().x,
			ymax = _defineMax().y,
			pattern = /^\d+$/;
		if ((mode === 'single') & (pattern.test(elem.val()))) {
			posItems.removeClass('active__item');
			if (elem.is('#x-pos')) {
				newX = condition((parseInt(elem.val())), xmax, xmin).cur;
				moveWatermark(newX, currentY);
			} else if (elem.is('#y-pos')) {
				newY = condition((parseInt(elem.val())), ymax, ymin).cur;
				moveWatermark(currentX, newY);
			}
		} else if ((mode === 'tile') & (pattern.test(elem.val()))) {
			tile.remove();
			if (elem.is('#x-pos')) {
				newMx = condition((parseInt(elem.val())), ymax, mxmin).cur;
				tile.tiling(newMx, currentMy);
				tile.setInputs(newMx, currentMy);
				tile.lineWidth(newMx, currentMy);
			} else if (elem.is('#y-pos')) {
				newMy = condition((parseInt(elem.val())), xmax, mymin).cur;
				tile.tiling(currentMx, newMy);
				tile.setInputs(currentMx, newMy);
				tile.lineWidth(currentMx, newMy);
			}
		} else {
			console.log('Вы ввели не цифру');
		}
	};
	//Обрабатываем клики на стрелках инпутов
	var _spinner = function() {
		var arrow = $(this),
			item = arrow.closest('.coords__item'),
			input = item.find('.coords__input'),
			delta = 1,
			currentX = currentCoords(defineMark()).x,
			currentY = currentCoords(defineMark()).y,
			currentMx = parseInt(xInput.val()),
			currentMy = parseInt(yInput.val()),
			xmax = _defineMax().x,
			ymax = _defineMax().y,
			newX, newY, newMx, newMy;
		if (arrow.hasClass('arrow-down')) {
			delta = -1;
		}
		if (mode === 'single') {
			posItems.removeClass('active__item');
			if (input.is('#x-pos')) {
				newX = condition((currentX + delta), xmax, xmin).cur;
				moveWatermark(newX, currentY);
			} else if (input.is('#y-pos')) {
				newY = condition((currentY + delta), ymax, ymin).cur;
				moveWatermark(currentX, newY);
			}
		} else if (mode === 'tile') {
			tile.remove();
			console.log(xmax, ymax);
			if (input.is('#x-pos')) {
				newMx = condition((currentMx + delta), ymax, mxmin).cur;
				tile.tiling(newMx, currentMy);
				tile.setInputs(newMx, currentMy);
				tile.lineWidth(newMx, currentMy);
			} else if (input.is('#y-pos')) {
				newMy = condition((currentMy + delta), xmax, mymin).cur;
				tile.tiling(currentMx, newMy);
				tile.setInputs(currentMx, newMy);
				tile.lineWidth(currentMx, newMy);
			}
		}
	};
	//Определяем вотермарк
	var defineMark = function() {
		var watermark = $('.generator__watermark-image');
		return watermark;
	};
	//Записываем новые значения положения в инпуты
	var changeInput = function() {
		var newX = currentCoords(defineMark()).x,
			newY = currentCoords(defineMark()).y;
		xInput.val(newX);
		yInput.val(newY);
	};
	//Двигаем вотермарк	
	var moveWatermark = function(newX, newY) {
		defineMark().animate({
			'top': newY,
			'left': newX
		}, 150, function() {
			changeInput();
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
	//Ограничиваем максимальное и минимальное значение
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
		init: init,
		setVal: changeInput,
		move: moveWatermark
	}

})();

module.exports = position