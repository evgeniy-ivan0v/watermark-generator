var $ = require('jquery');


var uploadModule = (function () {

    function _setUpListener() {
    
        $(document).ready(function() {
            console.log('ojfiji');
       
        });    
    };

  function init () {
    _setUpListener();
  };

  return {
    init: init
  };
})();

module.exports = uploadModule.init