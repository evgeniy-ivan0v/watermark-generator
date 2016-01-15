var $ = require('jquery');
var opt = require('./options.js');
var common = require('./common.js');
var setDefault = require('./setDefault.js');
var tile = require('./tile.js');
var drag = require('./drag.js');

var position = (function() {
	var mode = opt.mode,
		switchItem = $('.switch__item');

	//Инициализируем модуль: устанавливаем прослушку событий и 
	//ставим вотермарк в дефолтные настройки	
	var init = function() {
		setDefault.init();
		_setUpListeners();
	};

	//Прослушка событий
	var _setUpListeners = function() {
		switchItem.on('click', _switchMode);
		$('.position__item').on('click', _blockMove);
		$('.coords__arrow').on('click', _spinner);
		common.inputs.on('keyup', _writePos);
		//TODO перенести обработчик reset в отдельный модуль
		// и подключить функцию setDefault.resetPos
		$('.button__reset').on('click', setDefault.resetPos);
		$('.button__submit').on('click', getVars);
	};

	//Переключаем режим
	var _switchMode = function() {
		var item = $(this),
			items = switchItem;
		items.removeClass('active');
		item.addClass('active');
		if (item.hasClass('single')) {
			common.posBlock.removeClass('tile').addClass('single');
			mode = 'single';
			opt.mode = mode;
			tile.remove();
			drag.single();
		} else if (item.hasClass('tile')) {
			var defMx = common.cnd(opt.marginX, opt.minY, common.setbr().y),
				defMy = common.cnd(opt.marginY, opt.minX, common.setbr().x);
			common.posBlock.removeClass('single').addClass('tile');
			mode = 'tile';
			opt.mode = mode;
			common.posItems.removeClass('active__item');
			tile.remove();
			tile.tiling(defMx, defMy);
			drag.tile();

		}
	};

	//Двигаем вотермарк при клике на позиции в режиме single
	var _blockMove = function() {
		var choosenPos = $(this).data('position');
					
		if (mode === 'single') {
			common.move(common.grid(choosenPos).xPos, common.grid(choosenPos).yPos);
			common.classBox(choosenPos);
		}
		
	};

	//Обрабатываем ввод значений в инпуты
	var _writePos = function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
		var elem = $(this),
			newX, newY, newMx, newMy,
			currentX = common.defcoords(common.defmark()).x,
			currentY = common.defcoords(common.defmark()).y,
			currentMx = parseInt(common.xInput.val()),
			currentMy = parseInt(common.yInput.val()),
			xmax = common.setbr().x,
			ymax = common.setbr().y,
			pattern = /^\d+$/;
		if ((mode === 'single') & (pattern.test(elem.val()))) {
			common.posItems.removeClass('active__item');
			if (elem.is('#x-pos')) {
				newX = common.cnd((parseInt(elem.val())), opt.minX, xmax);
				common.move(newX, currentY);
			} else if (elem.is('#y-pos')) {
				newY = common.cnd((parseInt(elem.val())), opt.minY, ymax);
				common.move(currentX, newY);
			}
		} else if ((mode === 'tile') & (pattern.test(elem.val()))) {
			if (elem.is('#x-pos')) {
				newMx = common.cnd((parseInt(elem.val())), opt.minY, ymax);
				tile.changeMargin(newMx, currentMy);
				drag.tile();
			} else if (elem.is('#y-pos')) {
				newMy = common.cnd((parseInt(elem.val())), opt.minX, xmax);
				tile.changeMargin(currentMx, newMy);
				drag.tile();
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
			currentX = common.defcoords(common.defmark()).x,
			currentY = common.defcoords(common.defmark()).y,
			currentMx = parseInt(common.xInput.val()),
			currentMy = parseInt(common.yInput.val()),
			xmax = common.setbr().x,
			ymax = common.setbr().y,
			newX, newY, newMx, newMy;
		if (arrow.hasClass('arrow-down')) {
			delta = -1;
		}
		if (mode === 'single') {
			common.posItems.removeClass('active__item');
			if (input.is('#x-pos')) {
				newX = common.cnd((currentX + delta), opt.minX, xmax);
				common.move(newX, currentY);
			} else if (input.is('#y-pos')) {
				newY = common.cnd((currentY + delta), opt.minY, ymax);
				common.move(currentX, newY);
			}
		} else if (mode === 'tile') {
			if (input.is('#x-pos')) {
				newMx = common.cnd((currentMx + delta), opt.minY, ymax);
				tile.changeMargin(newMx, currentMy);
				drag.tile();
			} else if (input.is('#y-pos')) {
				newMy = common.cnd((currentMy + delta), opt.minX, xmax);
				tile.changeMargin(currentMx, newMy);
				drag.tile();
			}
		}
	};

	//Собираем данные для сабмита
	var getVars = function(event) {
		event.preventDefault();
		data = {
			'mode': opt.mode,
			'xPos': common.xInput.val(),
			'yPos': common.yInput.val()
		};
		// console.log(data);
	};
	
	return {
		init: init
	}

})();

module.exports = position