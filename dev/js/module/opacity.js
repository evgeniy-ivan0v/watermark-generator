var $ = require('jquery');
require('jquery-ui/slider')
var opacity = (function () {
  var $elem = $( ".opacity__slider" ),
      $watermark = $('.generator__watermark-image'),
      option = {
        range: "min",
        value: 0.75,
        min: 0,
        max: 1,
        step: 0.01,
        disabled: true,
        slide: false
      };

  var setOpasity = function (event, ui) {
      $watermark = $('.generator__watermark-image');
      var value = $elem.slider( "value");
      $watermark.css('opacity', value);
  };

  var init = function () {
      $elem.slider(option)
  };

  function getWatermark() {
      return $watermark = $('.generator__watermark-image');
  }

  var enable = function () {
      option.disabled = false;
      option.slide = setOpasity;
      setDefault(); 
  };
  var setDefault = function () {
      $watermark = $('.generator__watermark-image');
      $watermark.css('opacity', (option.value));
      $elem.slider(option);
  };
  return {
      init: init,
      enable: enable,
      setDefault: setDefault
  };
})();

module.exports = opacity
