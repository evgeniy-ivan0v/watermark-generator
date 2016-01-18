var $ = require('jquery');

var setError = function (text) {
    var elem = document.createElement('div');
    elem.className = "error";
    elem.innerHTML = text;
    $(elem).hide()
    $(elem).appendTo('body').fadeIn();
    setTimeout(function() {
        $(elem).fadeOut().remove();
    }, 2000);
};

module.exports = setError;