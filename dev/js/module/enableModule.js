var $ = require('jquery');
var opacity = require('./opacity.js');
var position = require('./position/position.js');

var enableModule = (function () {
    var $form = $('.settings__form-holder'),
        disabledElems = $form.find('.disabled, :disabled');
    

    var enableAll = function () {
    	disabledElems.attr('disabled', false).removeClass('disabled');
    	opacity.enable();
        position.init();
    };

   var enableWatermark = function () {
    	$('.upload__label_watermark')
    		.removeClass('disabled')
    		.find(':disabled')
    		.attr('disabled', false);
    };

    return {
    	all: enableAll,
    	watermark: enableWatermark
    };
})();

module.exports = enableModule;