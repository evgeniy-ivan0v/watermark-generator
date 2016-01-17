var $ = require('jquery');
var upload = require('./upload.js');

var download = (function() {
	function getData () {
		var fd = new FormData();
		fd.append('mainImg', upload.getData().main);
		fd.append('wtImg', upload.getData().wt);
		fd.append('mode', "single");
		fd.append('posX', 5);
		fd.append('posY', 30);
		fd.append('marginX', 100);
		fd.append('marginY', 500);
		fd.append('opacity', .75);
		return fd;
	};
	var init = function() {
		setUpListeners();
	};

	var setUpListeners = function() {
		$('.settings__form').on("submit", sendData);
	};

	var sendData = function(e) {
		e.preventDefault();
		var action = this.action;
		
		var data = getData();

		$.ajax({
			url: action,
			type: 'POST',
            dataType: 'multipart/form-data',
            data: data,
            processData: false, // не обрабатывать файлы
            contentType: false, 
            success: function(data) {
			   console.dir(data); // apple
			}
		})

	}

	return {
		init: init
	}

})();

module.exports = download.init
