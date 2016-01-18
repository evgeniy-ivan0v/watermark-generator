var $ = require('jquery');
var upload = require('./upload.js');
var opacity = require('./opacity.js')
var position = require('./position/position.js')

var download = (function() {
	function getData () {
		var obj = {
			'mainImg': upload.getData().main,
			'wtImg': upload.getData().wt,
			'mode': position.getData().mode,
			'posX': position.getData().xPos,
			'posY': position.getData().yPos,
			'marginX': position.getData().marginX,
			'marginY': position.getData().marginY,
			'opacity': opacity.getData().opacity
		},
			fd = new FormData();

		for(var prop in obj) {
			fd.append(prop, obj[prop]);
		};

		return fd;
	};
	var init = function() {
		setUpListeners();
	};

	var setUpListeners = function() {
		$('.settings__form').on("submit", sendData);
		//$('#download-link').on('click')
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
			   console.dir("fdfd"); // apple
			}
		})

		.done (function(answer) {
			console.log('yupiii');
			console.log(answer)
		})

		.fail (function(answer) {
			console.log('fail');
		});

	};

	return {
		init: init
	}

})();

module.exports = download.init