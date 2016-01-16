var $ = require('jquery');

var widgets = (function () {
	var vk = document.getElementById('vk'),
		tw = document.getElementById('twitter'),
		fb = document.getElementById('facebook'),
		Share = {
			vkontakte: function(purl, ptitle, pimg, text) {
				url  = 'http://vkontakte.ru/share.php?';
				url += 'url='          + encodeURIComponent(purl);
				url += '&title='       + encodeURIComponent(ptitle);
				url += '&description=' + encodeURIComponent(text);
				url += '&image='       + encodeURIComponent(pimg);
				url += '&noparse=true';
				Share.popup(url);
			},
			facebook: function(purl, ptitle, pimg, text) {
				url  = 'http://www.facebook.com/sharer.php?s=100';
				url += '&p[title]='     + encodeURIComponent(ptitle);
				url += '&p[summary]='   + encodeURIComponent(text);
				url += '&p[url]='       + encodeURIComponent(purl);
				url += '&p[images][0]=' + encodeURIComponent(pimg);
				Share.popup(url);
			},
			twitter: function(purl, ptitle) {
				url  = 'http://twitter.com/share?';
				url += 'text='      + encodeURIComponent(ptitle);
				url += '&url='      + encodeURIComponent(purl);
				url += '&counturl=' + encodeURIComponent(purl);
				Share.popup(url);
			},

			popup: function(url) {
				var left = (screen.width-626)/2,
					top = (screen.height-436)/2;

				window.open(url,'','toolbar=0,status=0,width=626,height=436,left='+ left +',top='+ top +'');
			}
		};
    function _setUpListener() {
		

		vk.addEventListener('click', function(e){
			e.preventDefault();
			Share.vkontakte('URL','Генератор водяных знаков','IMG_PATH','Самое лучшее описание, которое вообще можно придумать');
		});		


		fb.addEventListener('click', function(e){
			e.preventDefault();
			Share.facebook('URL','Генератор водяных знаков','IMG_PATH','Самое лучшее описание, которое вообще можно придумать');
		});

		tw.addEventListener('click', function(e){
			e.preventDefault();
			Share.twitter('URL','Генератор водяных знаков');
		});		
    };

	function init () {
		_setUpListener();
	};

  return {
    init: init
  };
})();

module.exports = widgets.init