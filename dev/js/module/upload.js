var 
	$ = require('jquery'),
 
	imgFlag = false,	//флаг выбрана ли основная картинка
	wmFlag = false;		//флаг выбран ли водный знак


var uploadModule = (function () {

	function init() {
    	_setUpListener();
  	};

    function _setUpListener() {
        $(document).ready(function() {
            _placeholder();
            _isDisabled();    
        }); 
        $('.upload__file-upload').on('change', _fileUpload);   
    };

    function _isDisabled() {

    	if (!(imgFlag||wmFlag)) {
    		$('.upload__file-upload_watermark').attr('disabled', true);
    		$('.upload__label_watermark').addClass('disabled');
    	} else {
    		$('.upload__file-upload_watermark').attr('disabled', false);
    		$('.upload__label_watermark').removeClass('disabled');
    	}
    };


    function _fileUpload() {

    	var 
    		file = this.files[0],
    		img = document.createElement('img'),
    		reader = new FileReader(),
    		imgClass = $(this).data('img-class'),
    		placeholder = $(this)
    							.closest('label')
    							.find('.upload__fake-input')
    							.data('placeholder'),
    		fileNameField = $(this)
    							.closest('label')
    							.find('.upload__input-text');

 							
    	img.file = file;

    	// if (!file.type.match('image.*')) {
    	// 	fileNameField.text('Выберите изображение');
    	// 	$(this)
    	// 		.closest('label')
    	// 		.find('.upload__fake-input')
    	// 		.addClass('error');
    	// } else {
    		if (!!file) {
				reader.readAsDataURL(file);

		    	reader.onload = function(e) {
	    			img.src = e
	    						.target
	    						.result;
		    };

			$('.generator__image-holder')
								.find('.' + imgClass)
								.remove();
			$(img)
				.appendTo('.generator__image-holder')
				.addClass(imgClass);

			fileNameField.text(img.file.name);

			if (imgClass == 'generator__main-image') {
			 	imgFlag = true;
			} else {
			 	wmFlag =true;
			};
			_isDisabled();


	    	} else {
	    		$('.generator__image-holder')
	    								.find('.' + imgClass)
	    								.remove();
	    		
	    		if (imgClass == 'generator__main-image') {
					imgFlag = false;
				} else {
					wmFlag =false;
				};


				 
				fileNameField.text('');
	    		_placeholder();
	    		_isDisabled();
	    	}
    	// }

    	
    	
    };

 	function _placeholder() {
 		
 		var input = $(document).find('.upload__fake-input');

 			input.each(function() {
 				var 
 					placeholder = $(this).data('placeholder'),
 					textField = $(this).find('.upload__input-text');

 				if (textField.text() == '') {

 					textField.text(placeholder);
 				};
 			});
 	};
	

  return {
    init: init
  };
})();

module.exports = uploadModule.init