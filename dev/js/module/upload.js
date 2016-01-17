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
            validType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
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
        },
        files = {
            main: '',
            wt: ''
        }



	var init = function () {
    	_setUpListener();
        _placeholder(); 
  	};


/*------------------- прослушка событий ---------------------*/

    function _setUpListener() {   
        $('.upload__file-upload').on('change', _fileUpload);
    };

    function _checkFile (file) {
        if(!file){ return; }
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
        $('.preloader').fadeIn();
        $(image).on('load', function () {
            $('.preloader').fadeOut();
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
  
/*----------------- загрузка и отображение изображений -----------------------------*/
    function _fileUpload() {
        var file = this.files[0],
            imageClass = this.dataset.image,
            fileStatus = _checkFile(file);
        if (fileStatus) {
            if(imageClass === 'generator__main-image' ){
                files.main = file;
            } else if (imageClass === 'generator__watermark-image'){
                files.wt = file;
            }
            addImage(file, imageClass);
            _placeholder(this, file.name); 
        }; 
    };
/*----------------------- плейсхолдер ------------------------------*/
    function getData () {
        return files;
    }
 	function _placeholder(input, text) {
        if(input && text && text != ''){
            $(input).closest('.upload__label')
                .find('.upload__input-text')
                .text(text);
        }
 		var input = $(document).find('.upload__fake-input');
		input.each(function() {
			var 
				placeholder = $(this).data('placeholder'),
				textField = $(this).find('.upload__input-text');
            // if(text && text != ''){
            //     textField.text(text);
            // };
			if (textField.text() == '') {
				textField.text(placeholder);
			};
		});
 	};	

  return {
    init: init,
    getData: getData
  };
})();

module.exports = uploadModule