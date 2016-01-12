var $ = require('jquery');
require('jquery-ui/draggable');

var dragndrop = (function () {

    function _setUpListener() {  
    	$('.generator__watermark-image').draggable({ containment: "parent" });
    };

  function init () {
    _setUpListener();
  };

  return {
    init: init
  };
})();

module.exports = dragndrop.init
