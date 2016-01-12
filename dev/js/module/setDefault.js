var $ = require('jquery');
var common = require('./common.js');
var opt = require('./options.js');
var position = require('./position.js');
var drag = require('./drag.js');

var setDefault = (function() {
			
	var init = function() {
			//Задаем размеры контейнера в зависимости от ширины и высоты основного фото
			common.container.css({
				'width': common.mainImg.width(),
				'height': common.mainImg.height()
			});
			//Помещаем вотермарк в дефолтные координаты
			common.defmark().css({
					'top': common.grid(opt.defPos).yPos,
					'left': common.grid(opt.defPos).xPos,
					'margin': 0
			});
			//Убираем unselect классы, добавляем класс режима, 
			//добавляем активный класс нужному квадрату сетки
			common.posBlock.removeClass('unselect').addClass(opt.defMode);
			common.switches.removeClass('unselect-list');
			common.inputs.attr('disabled', false);
			common.changeIn();
			common.classBox(opt.defPos);

			drag.single();
		};

	var resetPos = function(event) {
		event.preventDefault();
		$('.switch__item.single').click();
	}	

	return {
		init: init,
		resetPos: resetPos
	}
})();

module.exports = setDefault