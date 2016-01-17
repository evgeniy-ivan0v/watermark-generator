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
		fd.append('files', upload.getData())
		//console.log(data)
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
		//var json = JSON.stringify(data);
		//console.dir(json)

		$.ajax({
			url: action,
			type: 'POST',
            dataType: 'json',
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