var $ = require('jquery');
var setError = require('./setError.js');
var setSizeHolder = require('./setSizeHolder.js');
var enableModule = require('./enableModule.js');


var uploadModule = (function () {
    var $imageHolder = $('.generator__image-holder'),
        option = {
            errorText: {
                size: "Файл превышает допустимый размер",
                type: "Не допустимый тип файла"
            },
            validType: ['image/png', 'image/jpeg'],
            maxSize: 2e+6
        },
        imgSize = {
            main : {
                naturalWidth: 0,
                naturalHeight: 0,
                newWidth: 0,
                newHeight: 0
            },
            water: {
                width: 0,
                height: 0
            }
        }



	var init = function () {
    	_setUpListener();
  	};

    function _setUpListener() {
        _placeholder();    
        $('.upload__file-upload').on('change', _fileUpload);
    };

    function _checkFile (file) {
        var validType = option.validType
            maxSize = option.maxSize,
            fileType = file.type,
            fileSize = file.size,
            status;
            
        if (file.size > maxSize){
            setError(option.errorText.size);
            return false;            
        };

        if (!(validType.indexOf(fileType)+1)) {
            setError(option.errorText.type); 
            return false;
        };

        return true;        
    };

    function createImage (file, className) {
        var img = document.createElement('img'),
            reader = new FileReader();

        img.file = file;
        img.className = className;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        return img;
    };

    function setSizeWatermark () {
        var natWidth = imgSize.main.naturalWidth,
            natHeight = imgSize.main.naturalHeight,
            newWidth = imgSize.main.newWidth,
            newHeight = imgSize.main.newHeight,
            watWidth = imgSize.water.width,
            watHeight = imgSize.water.height,
            watNewWidth = watWidth / (natWidth / newWidth),
            watNewHeight = watHeight / (natHeight / newHeight);
            //console.log('Натуральная ширика изображения - '+natWidth+'\nНатуральная высота изображения - '+natHeight+'\nНовая ширина изображения - '+newWidth+'\nНовая высота изображения - '+newHeight+'\nОригинальная ширина ватермарка - '+watWidth+'\nОригинальняя высота ватермарка - '+watHeight+'\nНовая ширина ватермарка - '+watNewWidth+'\nНовая высота ватермарка - '+watNewHeight)
        if($('img').is('.generator__watermark-image')){
            $('.generator__watermark-image')
                .width(watNewWidth)
                .height(watNewHeight);
        };
    };

    function addImage (file, className) {
        var image = createImage(file, className),
            selector = '.' + className,
            oldImg = $imageHolder.find('img').is(selector);
        
        $(image).on('load', function () {
            var self = $(this),
                src = self.attr('src');
            if(oldImg) {
                $(selector).remove();
                $imageHolder.append(self);
            } else {
                $imageHolder.append(self);
            };
            if(className === 'generator__main-image') {
                setSizeHolder(self);
                enableModule.watermark();
                imgSize.main.naturalWidth = this.naturalWidth;
                imgSize.main.naturalHeight = this.naturalHeight;
                imgSize.main.newWidth = this.width;
                imgSize.main.newHeight = this.height;                
            } else {
                enableModule.all();
                imgSize.water.width = this.naturalWidth;
                imgSize.water.height = this.naturalHeight;
            }
            setSizeWatermark();
        });
    };
  
    function _fileUpload() {
    	var file = this.files[0],
            imageClass = this.dataset.image,
            fileStatus = _checkFile(file);
        if (fileStatus) {
            //img = createImage(file, imageClass);
            addImage(file, imageClass);
        };

    	// img.file = file;
    	// reader.readAsDataURL(file);
    	// reader.onload = function(e) {
    	// 	img.src = e.target.result;
    	// };
    	// $(img).appendTo('.generator__canvas').addClass('generator__main-image');
    	// fileNameField.text(img.file.name);
  
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

 	// function _resetUploading() {
 	// 	$(document).find('input[file=file]').disable();
 	// 	_placeholder();

 	// }

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

module.exports = uploadModule