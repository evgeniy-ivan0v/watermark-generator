var $ = require('jquery');

var setSizeHolder = function (img) {
	var $elem = $('.generator__image-holder'),
		$img = $(img);

	setSize("auto","auto");
	setSize($img.outerWidth(), $img.outerHeight());

	function setSize (elemWidth, elemHeight) {
		$elem.height(elemHeight);
		$elem.width(elemWidth);
	};	
};

module.exports = setSizeHolder;