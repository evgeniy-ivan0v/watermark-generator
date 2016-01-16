var $ = require('jquery');
 

var uploadModule = (function () {

    var 
        imgFlag = false,   //флаг загрузки основного изображения
        wmFlag = false;    //флаг водного знака

	function init() {
    	_setUpListener();
  	};


/*------------------- прослушка событий ---------------------*/

    function _setUpListener() {
        $(document).ready(function() {
            _placeholder();
            _isDisabled();    
        }); 
        $('.upload__file-upload').on('change', _fileUpload);   
    };



    function _isDisabled() {                                                                    

    	if (!(imgFlag||wmFlag)) {                                              //проверка загрузки изображений
    		$('.upload__file-upload_watermark').attr('disabled', true);        //если оба инпута пусты запрещаем выбор водного знака
    		$('.upload__label_watermark').addClass('disabled');
    	} else {
    		$('.upload__file-upload_watermark').attr('disabled', false);
    		$('.upload__label_watermark').removeClass('disabled');
    	}
    };



/*----------------- загрузка и отображение изображений -----------------------------*/
    function _fileUpload() {

    	var 
    		file            =   this.files[0],
    		img             =   document.createElement('img'),
    		reader          =   new FileReader(),
    		imgClass        =   $(this).data('img-class'),
    		placeholder     =   $(this)
                                    .closest('label')
                                    .find('.upload__fake-input')
                                    .data('placeholder'),
            fakeInput       =   $(this)
                                    .closest('label')
                                    .find('.upload__fake-input')
                                    .addClass('error')
    		fileNameField   =   $(this)
                                    .closest('label')
                                    .find('.upload__input-text');

 							
    	img.file = file;

    	if ((file)&&(!file.type.match('image.*'))) {           //простенькая валидация
    		fileNameField.text('Выберите изображение');        
    		fakeInput.addClass('error');
    	} else {
            fakeInput.removeClass('error');
    		if (file) {

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
            }    	
    };



/*----------------------- плейсхолдер ------------------------------*/


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