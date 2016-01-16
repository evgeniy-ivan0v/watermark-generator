
<<<<<<< HEAD
=======
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
>>>>>>> d38f5e65e7c0a1df4842b5eb440c6ebd722818b4
