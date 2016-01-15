var $ = require('jquery');
var common = require('./common.js');
var opt = require('./options.js');
var position = require('./position.js');
var drag = require('./drag.js');
var tile = require('./tile.js');

var setDefault = (function() {
			
	var init = function() {
			
			//Помещаем вотермарк в дефолтные координаты
			common.defmark().css({
					'top': common.grid(opt.defPos).yPos,
					'left': common.grid(opt.defPos).xPos,
					'margin': 0
			});
			//добавляем класс режима, 
			//добавляем активный класс нужному квадрату сетки
			common.posBlock.addClass(opt.defMode);
			common.changeIn();
			common.classBox(opt.defPos);

			drag.single();

			//Записываем текущие координаты вотермарка
			opt.curX = common.grid(opt.defPos).xPos;
			opt.curY = common.grid(opt.defPos).yPos;
		};

	var resetPos = function(event) {
		$('.single').click();
		common.move(common.grid(opt.defPos).xPos, common.grid(opt.defPos).yPos);
		common.classBox(opt.defPos);
		
	}	

	return {
		init: init,
		resetPos: resetPos
	}
})();

module.exports = setDefault