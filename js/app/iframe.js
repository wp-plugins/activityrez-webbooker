var urlParams = {};

var e,
	a = /\+/g,  // Regex for replacing addition symbol with a space
	r = /([^&=]+)=?([^&]*)/g,
	d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	q = window.location.search.substring(1);

while(e = r.exec(q))
	urlParams[d(e[1])] = d(e[2]);

function convertQueryString(str) {
	var vars = str.split('&'),
		obj = {},
		pair, i;
	for(i = 0; i < vars.length; i++) {
		pair = vars[i].split('=');
		obj[pair[0]] = pair[1];
	}
	return obj;
}

// URL Decode
function URLDecode(encodedString) {
	var output = encodedString;
	var binVal, thisString;
	var myregexp = /(%[^%]{2})/;
	while ((match = myregexp.exec(output)) != null
	&& match.length > 1
	&& match[1] != '') {

		binVal = parseInt(match[1].substr(1),16);
		thisString = String.fromCharCode(binVal);
		output = output.replace(match[1], thisString);
	}
	return output;
}

(function($) {

	$.activityrez = function(element, options) {

		var r2_id = (urlParams.resellerID) ? urlParams.resellerID : 0;

		var defaults = {
			reseller1_id: 0,
			reseller2_id: r2_id,
			wb_slug: '',
			env: 'dev',
			lang: ''
		};

		var plugin = this;
		plugin.settings = {};

		var $element = $(element);

		plugin.init = function() {
			plugin.settings = $.extend({}, defaults, options);

			var env = (plugin.settings.env === 'live') ? '' : plugin.settings.env + '.',
			arezURL = 'https://' + env + 'activityrez.com',
			src = arezURL + '/wb/' + plugin.settings.wb_slug,
			isSafari = (/Safari/.test(navigator.userAgent)),
			firstTimeSession = 0,
			if_height = 0;

			if(urlParams.activity_slug) {
				src += '/' + urlParams.activity_slug;
			}

			if(r2_id > 0) {
				src += '?resellerID=' + r2_id;
			}
			
			if (plugin.settings.lang){
				if(r2_id > 0){
					src += '&i18N=' + plugin.settings.lang
				} else
					src += '?i18N=' + plugin.settings.lang
			}

			var iframe = $( '<iframe id="arez-webbooker-frame" src="' + src + '" name="arez-webbooker-frame" width="100%" height="1500" scrolling="no" frameborder="0" allowTransparency="true" onload="scrollTo(0,0);"><\/iframe>' ).appendTo(element);

			// Grab the iframe's contentWindow for use with postMessage.
			var ifra = document.getElementById('arez-webbooker-frame'),
			ifra_window = (ifra.contentWindow || ifra.contentDocument),

			// This is to make sure permalink pages get the parent URL so
			// they can post back an iframe height.
			if_url_interval = setInterval(function() {
				ifra_window.postMessage(window.location.protocol + '//' + window.location.host, arezURL);
			}, 2000);

			// Sets the iframe's height based on the data posted back.
			function setHeight(event) {
				// First we must verify the origin is activityrez.com. Abort if it doesn't match.
				// Note: I see no real security concern here, but all postMessage documentation
				// recommends verifying the origin. -R
				var domain = /activityrez.com/i;
				if(!domain.test(event.origin)) { return; }

				var data = event.data;
				var ih = data.split('if_height=');
				var m = ih[1].split('=');
				var mstr = m[0];
				var marr = mstr.split('&');
				m = new Number(marr[0]);

				if (m > 0 && m !== if_height) {
					// Height has changed, update the iframe.
					if_height = m + 50;
					iframe.height(if_height+'px');
				}
			};

			function handlePostedMessage(message) {
				// First we must verify the origin is activityrez.com. Abort if it doesn't match.
				var domain = /activityrez.com/i;
				if(!domain.test(message.origin)) {
					return;
				}
				// Adjust iframe height
				if(message.data.indexOf('if_height') > -1) {
					var ih = parseInt(message.data.split('if_height=')[1].split('&')[0]);
					if(ih > 0 && ih !== if_height) {
						if_height = ih + 50;
						iframe.height(if_height+'px');
					}
				}
				// Scroll to vertical position
				if(message.data.indexOf('scroll_to') > -1) {
					var pos = parseInt(message.data.split('scroll_to=')[1].split('&')[0]);
					var offset = iframe.offset();
					$('html, body').animate({ scrollTop: pos + offset.top }, 500);
				}
			};

			// Listen for the message then call handlePostedMessage.
			if(window.addEventListener) {
				window.addEventListener('message', handlePostedMessage, false);
			} else if(window.attachEvent) {
				window.attachEvent('onmessage', handlePostedMessage);
			}

			// If the browser is Safari, we need to submit an invisible form in order to initiate the cross-domain session.
			if(isSafari) {
				$("body").append('<iframe id="activityrez-sessionframe" name="activityrez-sessionframe" src="' + arezURL + '" style="display:none;"></iframe><form id="activityrez-sessionform" enctype="application/x-www-form-urlencoded" action="' + arezURL + '/sessionstart.php" target="activityrez-sessionframe" method="post"></form>');
				submitSessionForm();
			}

			function submitSessionForm() {
				if (firstTimeSession == 0) {
					firstTimeSession = 1;
					$("#activityrez-sessionform").submit();
				}
			}
		}

		plugin.init();
	};

	$.fn.activityrez = function(options) {

		return this.each(function() {
			if(undefined == $(this).data('activityrez')) {
				var plugin = new $.activityrez(this, options);
				$(this).data('activityrez', plugin);
			}
		});

	};
})(jQuery);
