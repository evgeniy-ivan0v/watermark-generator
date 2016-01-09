var $ = require('jquery');
var position = (function() {
	var init = function() {
		_setUpListeners();
		},
		_setUpListeners = function() {
			$('.switch__item').on('click', _switchMode);
			$('.coords__arrow').on('click', _changeInputs);
			$('.coords__input').on('change', _moveWatermark);
		},
		_switchMode = function() {
			var element = $(this),
				elements = $('.switch__item'),
				posBlock = $('.position-wrapper');
			elements.removeClass('active');
			element.addClass('active');
			if (element.hasClass('single')) {
				posBlock.removeClass('tile')
						.addClass('single');
				mode = 'single';
			} else if (element.hasClass('tile')) {
				posBlock.removeClass('single')
						.addClass('tile');
				mode = 'tile';
			}
		},
		setDefaults = function() {
			var xmin = 0,
				ymin = 0,
				mainImg = $('.generator__main-image'),
				watermark = $('.generator__watermark-image'),
				xmax = mainImg.width() - watermark.width(),
				ymax = mainImg.height() - watermark.height(),
				defPos = 'top-left';
				
			$('#x-pos').val(xmin);
			$('#y-pos').val(ymin);
			$('.position__item').each(function() {
				if ($(this).data('position') === defPos) {
					$(this).addClass('active__item');
				}
			});
		},
		_moveWatermark = function() {

		},
		_changeInputs = function() {
			var arrow = $(this),
				item = arrow.closest('.coords__item'),
				input = item.find('.coords__input'),
				val = input.val();
				watermark = $('.generator__watermark-image');
				currentX = watermark.css('left');
				currentY = watermark.css('top');
			if (arrow.hasClass('arrow-up')) {
				val++;
				input.val(val);
			} else if (arrow.hasClass('arrow-down')) {
				val--;
				input.val(val);
			}
		},
		mode = 'single';
	return {
		init: init,
		setDefaults: setDefaults,
		mode: mode
	}

})();

module.exports = position