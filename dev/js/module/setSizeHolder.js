

var setSizeHolder = function () {
	var $elem = $('.generator__image-holder');
	var $img = $elem.find('.generator__main-image').outerWidth();
	$img.on('load' function () {
		console.log($img.outerWidth())	
	})
	console.log($img)
	// $elem.height(height);
	// $elem.width(width);
};

module.exports = setSizeHolder;