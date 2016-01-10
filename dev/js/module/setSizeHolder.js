var $ = require('jquery');

var setSizeHolder = function () {
	var $elem = $('.generator__image-holder'),
		$img = $elem.find('.generator__main-image'),
		$holder = $('.generator__canvas');

	setSize("auto","auto");

	$holder.addClass('generator__canvas_preload');
	$img.on('load', function () {
		setSize($img.outerWidth(), $img.outerHeight())
		$holder.removeClass('generator__canvas_preload');
	});

	function setSize (elemWidth, elemHeight) {
		$elem.height(elemHeight);
		$elem.width(elemWidth);
	};
	
};

module.exports = setSizeHolder;