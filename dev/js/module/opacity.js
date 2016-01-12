var $ = require('jquery');
require('jquery-ui/slider');

var opacity = (function () {

    function _setUpListener() {
        
        $( ".opacity__slider" ).slider({
            range: "min",
            value: 50,
            min: 0,
            max: 100,
            slide: function( event, ui ) {
                var value = ($( ".opacity__slider" ).slider( "value"))/100;
                $('.generator__watermark-image').css('opacity', value);
            }
        }); 
    };

  function init () {
    _setUpListener();
  };

  return {
    init: init
  };
})();

module.exports = opacity.init