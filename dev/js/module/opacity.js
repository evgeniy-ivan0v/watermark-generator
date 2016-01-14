var $ = require('jquery');
require('jquery-ui');

var opacity = (function () {

    function _setUpListener() {
        
        $(document).ready(function() {
            $( ".opacity__slider" ).slider({
                range: "min",
                value: 75,
                min: 0,
                max: 100,
                slide: function( event, ui ) {
                    var value = ($( ".opacity__slider" ).slider( "value"))/100;
                    $('.generator__watermark-image').css('opacity', value);
                }
            });
            $( ".opacity__slider" ).slider("disable");
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
