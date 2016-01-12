var setSizeHolder = require('./setSizeHolder.js');

var devPanel = (function () {
	var elem = document.querySelector('.dev-panel'),
		imageArea = document.querySelector('.generator__image-holder');

	var addImage = function (elem) {
		var src = getSelectValue(elem),
			imageClass = getImageClass(elem),
			image = imageArea.querySelector('.' + imageClass) || false;
		if(image) {
			image.setAttribute('src', src);
			if(imageClass === "generator__main-image"){
				setSizeHolder();
			}
		} else {
			crateImg(src, imageClass);
			if(imageClass === "generator__main-image"){
				setSizeHolder();
			}
		};
	};

	var crateImg = function (src, cls){
		var img = document.createElement('img');
		img.src = src;
		img.classList.add(cls);
		imageArea.appendChild(img);		
	};

	var getSelectValue = function (elem) {
		var src = "../images/test-image/" + elem.parentElement.querySelector('select').value + ".jpg";
		return src;
	};

	var getImageClass = function(elem) {
		var imgClass = elem.dataset.image;
		return imgClass;
	};

	var panelAddClass = function () {
		elem.classList.toggle('dev-panel_close');
	};

	var _addListener = function () {
		elem.addEventListener('click', function (e) {
			var target = e.target;
			if(target.classList.contains("dev-panel__button")) {
				event.preventDefault();
				addImage(target);
			}
			if(target.classList.contains("dev-panel__close")) {
				event.preventDefault();
				panelAddClass();
			}
		});
	};

	var init = function () {
		_addListener();
	};

	return {
		init: init
	};
})();

module.exports = devPanel.init