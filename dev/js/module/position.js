var $ = require('jquery');
var setDefault = require('./setDefault.js');

var position = (function() {
	var posBlock = $('.position-wrapper'),
		inputs = $('.coords__input'),
		xInput = $('#x-pos'),
		yInput = $('#y-pos'),
		posItems = $('.position__item'),
		watermark = $('.generator__watermark-image'),
		mode = setDefault.mode,
		xmin = setDefault.xmin,
		ymin = setDefault.ymin,
		xmax = setDefault.xmax,
		ymax = setDefault.ymax,
		defPos = setDefault.defPos;
	var init = function() {
		_setUpListeners();
		_defaultSettings();
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
	//Прослушка событий
	var _setUpListeners = function() {
		$('.switch__item').on('click', _switchMode);
		$('.position__item').on('click', _blockMove);
		$('.coords__arrow').on('click', _spinner);
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
	//Обрабатываем клики на стрелках инпутов
	var _spinner = function() {
		var arrow = $(this),
			item = arrow.closest('.coords__item'),
			input = item.find('.coords__input'),
			delta = 1,
			currentX = parseInt(watermark.css('left')),
			currentY = parseInt(watermark.css('top')),
			newX, newY;
		if (arrow.hasClass('arrow-down')) {
			delta = -1;
		}
		if (mode === 'single') {
			if (input.is('#x-pos', delta)) {
				newX = currentX + delta;
				if (newX > xmax) {
					newX = xmax;
				} else if (newX < xmin) {
					newX = xmin;
				}
				moveWatermark(newX, currentY);
				changeInput();
			} else if (input.is('#y-pos')) {
				newY = currentY + delta;
				if (newY > ymax) {
					newY = ymax;
				} else if (newY < ymin) {
					newY = ymin;
				}
				moveWatermark(currentX, newY);
				changeInput();
			}
		}
	}
	//Записываем новые значения положения в инпуты
	var changeInput = function() {
		var newX = parseInt(watermark.css('left')),
			newY = parseInt(watermark.css('top'));
		xInput.val(newX);
		yInput.val(newY);
	};
		
	var moveWatermark = function(newX, newY) {
		watermark.css({
			'top': newY,
			'left': newX
		});
	}

	return {
		init: init
	}

})();

module.exports = position