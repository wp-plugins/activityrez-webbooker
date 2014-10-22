/**
 *	ActivityRez Web Booking Engine
 *	Initalization File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker Plugin
 */

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

// Function for posting the current page's height through
// the iframe to the parent.
var if_height_interval = false;
function setHeight(parent_url) {
	if_height_interval = setInterval(function() {
		WebBooker.postMessage('if_height=' + jQuery('body').outerHeight(true));
	}, 2000);
}

function unescapeHTML(code) {
	var node = document.createElement('div');
	node.innerHTML = code;
	var node_r = node.innerHTML;
	return node_r;
}

// Listeners to grab the parent page's URL and use it
// in the postMessage setting the iframe's height.
var if_parent_url = false;
if(window.addEventListener) {
	window.addEventListener('message', function(event) {
		if(if_height_interval) {
			clearInterval(if_height_interval);
		}
		console.log(event.data);
		if(event.data.substring(0,4) !== '_FB_'){
			WebBooker.bootstrap.parent_url = event.data;
			setHeight(event.data);
		}
	});
} else if(window.attachEvent) {
	window.attachEvent('onmessage', function(event) {
		if(if_height_interval) {
			clearInterval(if_height_interval);
		}
		if(event.data.substring(0,4) !== '_FB_'){
			WebBooker.bootstrap.parent_url = event.data;
			setHeight(event.data);
		}
	});
}

jQuery(document).ready(function(){
	if(jQuery('#multi-everything').length){
		ko.applyBindings(WebBooker, jQuery('#multi-everything')[0]);
	}
	if(jQuery('#webbooker-sidebar').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-sidebar')[0]);
	}
	if(jQuery('#webbooker-modals').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-modals')[0]);
	}
	if(jQuery('#webbooker-main').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-main')[0]);//don't bind the same object to different places in ie8
	}

	WebBooker.init();
	WebBooker.wbLoaded(true);
    Path.rescue(notFound);
	//this interval updates the currency exchange rates for the user every 3min
	//in case there's an update on the server
	setInterval( function(){
		WebBooker.API.updateCurrency( WebBooker.bootstrap.webBookerID, function( data ) {
			data = data.data;
			var curr = WebBooker.selectedCurrency().title,
				ni;
			WebBooker.available_currencies(data);
			for ( ni in data ) {
				if ( data[ni].title != curr ) continue;
				WebBooker.selectedCurrency(data[ni]);
				break;
			}
		} );
	}, 180000 );
	
	var searches = [ 'search_tag', 'search_category', 'search_destination', 'search_mood' ],
		is_search = false;
	
	for ( var ni = 0; ni < searches.length; ni += 1 ) {
		if ( !WebBooker.bootstrap[ searches[ ni ] ] ) continue;
		is_search = true;
		if(!WebBooker.Catalog.searchResults().length) {
			WebBooker.Catalog.hasSearched(false);
		}
		WebBooker.showInitLoader(false);
		WebBooker.hideAllScreens();
		WebBooker.Catalog.show(true);
		if(WebBooker.Catalog.pageIndex() != 1) {
			WebBooker.Catalog.pageIndex(1);
		} else {
			WebBooker.Catalog.load();
		}
		jQuery('#webbooker-search-results .results').focus();
	}
	
	if ( !WebBooker.bootstrap.activity && !is_search ) {
		Path.root("#/Home");
		Path.listen();
	}
});