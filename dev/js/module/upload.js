var $ = require('jquery');


var uploadModule = (function () {

	function init() {
    	_setUpListener();
  	};

    function _setUpListener() {
        $(document).ready(function() {
            _placeholder();    
        }); 
        $('.upload__file-upload').on('change', _fileUpload);
        $('.button__reset').on('click', _resetUploading);   
    };


    function _fileUpload() {

    	var 
    		file = this.files[0],
    		img = document.createElement('img'),
    		reader = new FileReader(),
    		fileNameField = $(this).closest('label').find('.upload__input-text');

    	img.file = file;

    	reader.readAsDataURL(file);

    	reader.onload = function(e) {
    		img.src = e.target.result;
    	};

    	$(img).appendTo('.generator__canvas').addClass('generator__main-image');

    	fileNameField.text(img.file.name);
  
    };

 	function _placeholder() {
 		
 		var input = $(document).find('.upload__fake-input');

 			input.each(function() {
 				var 
 					placeholder = $(this).data('placeholder'),
 					textField = $(this).find('.upload__input-text');

 				textField.text(placeholder);
 			});
 	};

 	function _resetUploading() {
 		$(document).find('input[file=file]').disable();
 		_placeholder();

 	}

 	function _showFileName(name) {

 		

	 	var $this = $(this),
	 		lbl = $this.closest('label'),
	 		fileName = lbl.find('.upload__input-text');
	


		lbl
			.closest('form')
			.find('input:disabled')
			.attr('disabled', false);

		lbl
			.closest('form')
			.find('.disabled')
			.removeClass('disabled');

		$(fileName).text(name);

	};

	

  return {
    init: init
  };
})();

module.exports = uploadModule.init