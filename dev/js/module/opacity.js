var $ = require('jquery');
require('jquery-ui/slider');

var opacity = (function () {

    function _setUpListener() {
        
        $(document).ready(function() {
            $( ".opacity__slider" ).slider({
                range: "min",
                value: 0.75,
                min: 0,
                max: 1,
                step: 0.01,
                slide: function( event, ui ) {
                    var value = $( ".opacity__slider" ).slider( "value");
                    $('.generator__watermark-image').css('opacity', value);
                }
            });
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
