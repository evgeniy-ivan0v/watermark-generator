var $ = require('jquery');
var upload = require('./upload.js');

var download = (function() {

	var testData = {

		upload: {
			image: File,
			watermark: File
		},
		
		position: {
			mode: 'single',
			posX: 50,
			posY: 30,
			marginX: 10,
			marginY: 20
		},
		
		opacity: .75
	};
	function getData () {
		var fd = new FormData();
		fd.append('mainImg', upload.getData().main);
		fd.append('wtImg', upload.getData().wt);
		fd.append('mode', "single");
		fd.append('posX', 5);
		fd.append('posY', 30);
		fd.append('marginX', 100);
		fd.append('marginY', 500);
		fd.append('opasity', .75);
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

		// .done (function(answer) {
		// 	console.log('yupiii');
		// 	console.log(answer);
		// })



		// .fail (function(answer) {
		// 	console.log('fail');
		// });

	}

	return {
		init: init
	}

})();

module.exports = download.init