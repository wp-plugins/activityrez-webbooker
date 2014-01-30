if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
		],
		dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop);
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
				}
			}
			return result;
		};
	})();
}

//special consideration for internet exploder < 8
if (!Date.now) {
  Date.now = function() {
    return new Date().valueOf();
  };
}

window.console = console || { log : function() {} };

function basename(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

/**
 *	ActivityRez Web Booker
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker
 */

//compresses to 21207 B

var WebBooker = {
	bootstrap: {},
	showInitLoader: ko.observable(true),
	wbLoaded: ko.observable(false),
	show404: ko.observable(false),
	hasReseller: ko.observable(false),
	selectedCurrency: ko.observable({}),
	available_currencies: ko.observableArray([]),
	thumbnailHeight: wb_global_vars.thumbnailHeight || 125,
	galleryImageHeight: wb_global_vars.galleryImageHeight || 700,
	timthumb: 'https://media1.activityrez.com/images/',
	mediaServer: (wb_global_vars && wb_global_vars.server == 'training') ? '//devmedia.activityrez.com' : '//media.activityrez.com',
	selectedLanguage: ko.observable(),
	available_langs: ko.observableArray([]),

	us_states: [
		'Alabama',
		'Alaska',
		'American Samoa',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'District of Columbia',
		'Florida',
		'Georgia',
		'Guam',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Northern Marianas Islands',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Puerto Rico',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Virgin Islands',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	],

	setCurrency: function(val){
		WebBooker.selectedCurrency(val);
		WebBooker.Settings.set('currency',val.title);
	},

	init: function() {
		var sel_curr = WebBooker.Settings.get('currency')||wb_global_vars.currency,
			sel_lang = WebBooker.Settings.get('i18n')||wb_global_vars.i18n,
			ni, elem;
		for(ni=0; ni<wb_global_vars.available_currencies.length; ni++){
			elem = document.createElement('span');
			elem.innerHTML = wb_global_vars.available_currencies[ni].symbol;
			wb_global_vars.available_currencies[ni].symbol = elem.innerHTML;

			WebBooker.available_currencies.push(wb_global_vars.available_currencies[ni]);
			if(sel_curr != wb_global_vars.available_currencies[ni].title)
				continue;
			WebBooker.selectedCurrency(wb_global_vars.available_currencies[ni]);
		}

		if(!WebBooker.selectedCurrency()){	//triggered by a saved currency not existing in available_currencies
			sel_curr = wb_global_vars.currency;
			for(ni in wb_global_vars.available_currencies){
				if(sel_curr != wb_global_vars.available_currencies[ni].title)
					continue;
				WebBooker.selectedCurrency(wb_global_vars.available_currencies[ni]);
				break;
			}
		}

		for(ni=0; ni<wb_global_vars.languages.length; ni++){
			WebBooker.available_langs.push(wb_global_vars.languages[ni]);
			if(sel_lang != wb_global_vars.languages[ni].i18n)
				continue;
			WebBooker.selectedLanguage(wb_global_vars.languages[ni]);
		}

		if(!WebBooker.selectedLanguage()){	//triggered by a saved currency not existing in available_currencies
			sel_lang = wb_global_vars.i18n;
			for(ni in wb_global_vars.languages){
				if(sel_lang != wb_global_vars.languages[ni].i18n)
					continue;
				WebBooker.selectedLanguage(wb_global_vars.languages[ni]);
				break;
			}
		}
		WebBooker.selectedLanguage.subscribe(function(val){
			if(!val) return;
			WebBooker.API.changeI18N(val);
		});

		WebBooker.bootstrap = wb_global_vars;
		if(WebBooker && WebBooker.bootstrap){
			var training_div = '<div class="trainingWarning">You are currently in training mode. Switch to production mode <a href="' ;
				training_div += WebBooker.bootstrap.webbooker_settings + '" target="_blank">here</a> to start accepting payments.<div class="trainingClose">X</div></div>';

			$('body').addClass('training');
			$('body').append(training_div);
		}
		createCookie('ACTIVITYREZ', WebBooker.bootstrap.nonce);
		WebBooker.Agent.last_key = WebBooker.bootstrap.nonce;
		$('#wb_bootstrapper').remove();

		//lets save some keystrokes
		var boot = WebBooker.bootstrap;
		boot.crossDomain = true;
		boot.privacy = ko.observable(boot.privacy);
		WebBooker.searchUrl = boot.wb_url + '/#/Search';

		// Begin bootstrapping.
		WebBooker.hasReseller(boot.user_id && boot.user_id > 0);
		WebBooker.About.content(boot.aboutus);
		WebBooker.Contact.content(boot.contact);
		if(boot.user_name){
			WebBooker.Agent.name(boot.user_name);
		} else if(boot.user_fname){
			WebBooker.Agent.name(boot.user_fname + (boot.user_lname?' ' + boot.user_lname:''));
		}

		// Set the user id.
		WebBooker.Agent.user_id(boot.user_id);

		//start the deafult language grab for js
		__.load(boot.webBookerID,boot.i18n);

		// Load voucher payment types.
		var vouch = (boot.vouchers||[]).slice(0);
		boot.payment_types = [];
		for(ni = 0; ni < vouch.length; ni++){
			boot.payment_types.push(new $ar.VoucherPaymentModel(vouch[ni]));
		}
		// Load cc payment type.
		boot.payment_types.push(new $ar.CreditCardPaymentModel());

		for(ni=0; ni<WebBooker.bootstrap.payment_types.length; ni++){
			WebBooker.bootstrap.payment_types[ni].label = __(WebBooker.bootstrap.payment_types[ni].label);
		}
		// translate destinations,categories,tags,and moods
		boot.wb_destinations = boot.wb_destinations || [];
		for(ni = 0; ni < boot.wb_destinations.length; ni++){
			boot.wb_destinations[ni].__name = __(boot.wb_destinations[ni].name);
			boot.wb_destinations[ni].name = ko.observable(boot.wb_destinations[ni].name);
		}
		boot.wb_destinations.sort(function(a, b) {
			if ( a.name() > b.name() ) {
				return 1;
			}
			if ( a.name() < b.name() ) {
				return -1;
			}
			return 0;
		});
		boot.cats = boot.cats || [];
		for(ni = 0; ni < boot.cats.length; ni++){
			boot.cats[ni] = $ar.Taxonomy(boot.cats[ni]);
		}
		boot.tags = boot.tags || [];
		for(ni = 0; ni < boot.tags.length; ni++){
			boot.tags[ni] = $ar.Taxonomy(boot.tags[ni]);
		}
		boot.moods = boot.moods || [];
		for(ni = 0; ni < boot.moods.length; ni++){
			boot.moods[ni] = $ar.Taxonomy(boot.moods[ni]);
		}

		// init the date pickers
		$('.datepicker').each(function() {
			$(this).datepicker({
				minDate: 0,
				numberOfMonths: 2,
				dateFormat: 'mm/dd/yy',
				beforeShow: function(a) {
					if( a.id == 'datepicker-second' && $('#datepicker-first').datepicker('getDate') ) {
						return {
							minDate: $('#datepicker-first').datepicker('getDate')
						};
					}
					var b = new Date();
					return	{
						minDate: new Date(b.getFullYear(), b.getMonth(), b.getDate())
					};
				}
			});
		});
		
		// init the price range slider
		$('#price-range-slider').noUiSlider({
			range: [0,10000],
			start: [0,10000],
			step: 10,
			slide: function() {
				var values = $(this).val();
				
				WebBooker.Catalog.search_params.price_min( values[0] );
				WebBooker.Catalog.search_params.price_max( values[1] );
			}
		});

		// init pages.
		WebBooker.Cart.init();
		WebBooker.Catalog.init();
		WebBooker.Homepage.init();
		WebBooker.ActivityView.init();
		
		// Start cookie listener
		WebBooker.Agent.cookieInterval = setInterval( WebBooker.Agent.pingCookie, 3000 );
	},

	hideAllScreens: function() {
		$('#cart-sidebar .retrieve').show(); //this is dumb
		WebBooker.Homepage.show(false);
		WebBooker.Catalog.show(false);
		WebBooker.ActivityView.show(false);
		WebBooker.Dashboard.show(false);
		WebBooker.Dashboard.showMain(true);
		WebBooker.Dashboard.showReports(false);
		WebBooker.Dashboard.showSignup(false);
		WebBooker.CheckoutNav.show(false);
		WebBooker.CheckoutNav.showConfirmation(false);
		WebBooker.Itinerary.show(false);
		WebBooker.Contact.show(false);
		WebBooker.show404(false);
		WebBooker.Agent.passwordReset(false);
		WebBooker.Agent.passwordResetRequest(false);
		WebBooker.Dashboard.showPasswordResetConfirmation(false);
	},

	successMsg: function(msg) {
		$ar.Notification(msg,'success');
	},

	errorMsg: function(msg){
		$ar.Notification(msg,'error');
	}
};

// Agents
WebBooker.Agent = {
	user_id: ko.observable(),
	user: ko.observable(),
	name: ko.observable(),
	email: ko.observable(),
	password: ko.observable(),
	password2: ko.observable(),
	key: ko.observable(),
	isLoggingIn: ko.observable(false),
	loginError: ko.observable(),
	loginSuccess: ko.observable(),
	passwordReset: ko.observable(false),
	passwordResetRequest: ko.observable(false),
	signup_fields: {
		first_name: ko.observable(),
		last_name: ko.observable(),
		user_name: ko.observable(),
		email: ko.observable(),
		arc: ko.observable(),
		password: ko.observable(),
		verify_password: ko.observable()
	},
	pw_reset: {
		username: ko.observable(),
		old_pw: ko.observable(),
		new_pw: ko.observable(),
		new_pw_confirm: ko.observable()
	},
	signup_error: ko.observable(false),
	last_key: false,
	cookieInterval: false,

	login: function() {
		var email = WebBooker.Agent.email(),
		password = WebBooker.Agent.password();

		if(!email || email === '') {
			$ar.Notification(__('Please enter a username.'),'error');
			return false;
		}

		if(!password || password === '') {
			$ar.Notification(__('Please enter a password.'),'error');
			return false;
		}

		WebBooker.Agent.loginError(null);
		WebBooker.Agent.isLoggingIn(true);

		WebBooker.API.loginAgent({
			user: email,
			pass: password
		}, function(data) {
			WebBooker.Agent.isLoggingIn(false);

			if(data.status <= 0 && data.status != -2){
				WebBooker.Agent.loginError(data.msg);
				return;
			}
			
			if ( data.status == -2 ) {
				window.location.hash = '#/Dashboard/PasswordReset';
				return;
			}

			data.display_name = data.display_name||'';
			WebBooker.bootstrap.reseller2_id = data.agencyID;
			WebBooker.Agent.user_id(data.userID);
			if(data.display_name.replace(/\s/g,'').length){
				WebBooker.Agent.name(data.display_name);
			} else {
				WebBooker.Agent.name(data.name);
			}
			// Set the nonce to this new one.
			WebBooker.bootstrap.nonce = data.nonce;
			WebBooker.Agent.last_key = data.nonce;
			// Reload the page so we can get the WP cookie.
			if(window.location.hash != '/Dashboard/signup'){
				location.reload();
			} else {
				window.location.hash = '/Home';
				location.reload();
			}
		});
	},
	
	logout : function(){
		WebBooker.API.logoutAgent();
	},
	
	resetPassword: function() {
		WebBooker.Agent.loginError(false);
		if ( !WebBooker.Agent.pw_reset.username() ) {
			WebBooker.errorMsg(__('Please enter your username.'));
			return false;
		}
		if ( !WebBooker.Agent.pw_reset.old_pw() ) {
			WebBooker.errorMsg(__('Please enter your current password.'));
			return false;
		}
		if ( !WebBooker.Agent.pw_reset.new_pw() ) {
			WebBooker.errorMsg(__('Please enter a new password.'));
			return false;
		}
		if ( WebBooker.Agent.pw_reset.new_pw() != WebBooker.Agent.pw_reset.new_pw_confirm() ) {
			WebBooker.errorMsg(__('New passwords do not match.'));
			return false;
		}
		
		WebBooker.Agent.isLoggingIn(true);
		
		WebBooker.API.resetPassword({
			username: WebBooker.Agent.pw_reset.username(),
			old_pw: WebBooker.Agent.pw_reset.old_pw(),
			new_pw: WebBooker.Agent.pw_reset.new_pw(),
			new_pw_confirm: WebBooker.Agent.pw_reset.new_pw_confirm()
		}, function(result) {
			WebBooker.Agent.isLoggingIn(false);
			if ( result.status == 1 ) {
				WebBooker.Agent.password(null);
				WebBooker.Dashboard.showPasswordReset(false);
				WebBooker.Dashboard.showPasswordResetConfirmation(true);
				WebBooker.Agent.loginSuccess(__('Your password has been reset successfully. Please log-in here.'));
				var sidebar = $('#agents-sidebar');
				$('html, body').animate({ scrollTop: sidebar.offset().top }, 500);
				WebBooker.postMessage('scroll_to=' + sidebar.offset().top);
			} else {
				WebBooker.Agent.loginError(result.msg);
			}
		});
	},

	doSignup: function() {
		if(!WebBooker.Agent.verifySignupFields()) {
			return false;
		}

		var params = {
			first_name: WebBooker.Agent.signup_fields.first_name(),
			last_name: WebBooker.Agent.signup_fields.last_name(),
			email: WebBooker.Agent.signup_fields.email(),
			password: WebBooker.Agent.signup_fields.password(),
			verify_password: WebBooker.Agent.signup_fields.verify_password(),
			arc: WebBooker.Agent.signup_fields.arc(),
			user_name: WebBooker.Agent.signup_fields.user_name()
		};

		WebBooker.hideAllScreens();
		WebBooker.showInitLoader(true);

		WebBooker.API.signupAgent(params, function(result) {
			if(result.status == 1) {
				WebBooker.Agent.resetSignupFields();
				WebBooker.showInitLoader(false);
				WebBooker.Dashboard.show(true);
				WebBooker.Dashboard.showMain(false);
				WebBooker.Dashboard.showReports(false);
				WebBooker.Dashboard.showSignup(false);
				WebBooker.Dashboard.signupSuccessMsg(true);
				var sidebar = $('#agents-sidebar');
				$('html, body').animate({ scrollTop: sidebar.offset().top }, 500);
				WebBooker.postMessage('scroll_to=' + sidebar.offset().top);
				WebBooker.Agent.loginSuccess(__('Congratulations, your travel agent sign-up is complete! You may log-in now below.')());
			} else {
				WebBooker.showInitLoader(false);
				WebBooker.Dashboard.show(true);
				WebBooker.Dashboard.showMain(false);
				WebBooker.Dashboard.showReports(false);
				WebBooker.Dashboard.showSignup(true);
				WebBooker.Agent.signup_error(result.msg);
				WebBooker.Dashboard.signupSuccessMsg(false);
				WebBooker.Agent.loginSuccess(false);
			}
		});
	},

	verifySignupFields: function() {
		var msg = false;
		WebBooker.Agent.signup_error(false);
		if(WebBooker.Agent.signup_fields.password() !== WebBooker.Agent.signup_fields.verify_password()) {
			msg = __('The passwords you entered don\'t match.');
		}
		if(!WebBooker.Agent.signup_fields.verify_password()) {
			msg = __('You need to enter the password again for verification.');
		}
		if(!WebBooker.Agent.signup_fields.password()) {
			msg = __('You need to enter a password.');
		}
		if(!WebBooker.Agent.signup_fields.arc()) {
			msg = __('You need to enter the ARC number.');
		}
		if(!WebBooker.Agent.signup_fields.email()) {
			msg = __('You need to enter your e-mail address.');
		}
		if(!WebBooker.Agent.signup_fields.user_name()) {
			msg = __('You need to enter a user name.');
		}
		if ( /[^A-Za-z0-9\.]+/gi.test(WebBooker.Agent.signup_fields.user_name()) ) {
			msg = __('Your username cannot have spaces or special characters in it.');
		}
		if(!WebBooker.Agent.signup_fields.last_name()) {
			msg = __('You need to enter your last name.');
		}
		if(!WebBooker.Agent.signup_fields.first_name()) {
			msg = __('You need to enter your first name.');
		}
		if(msg) {
			WebBooker.Agent.signup_error(msg());
			return false;
		}
		return true;
	},

	resetSignupFields: function() {
		WebBooker.Agent.signup_fields.password('');
		WebBooker.Agent.signup_fields.verify_password('');
		WebBooker.Agent.signup_fields.arc('');
		WebBooker.Agent.signup_fields.email('');
		WebBooker.Agent.signup_fields.user_name('');
		WebBooker.Agent.signup_fields.last_name('');
		WebBooker.Agent.signup_fields.first_name('');
		WebBooker.Agent.signup_error(false);
	},

	doShowSignup: function() {
		if(window.location.href != WebBooker.bootstrap.wb_url + '/#/Dashboard/signup') {
			window.location.href = WebBooker.bootstrap.wb_url + '/#/Dashboard/signup';
			return;
		}
		if(window.location.hash != '#/Dashboard/signup') {
			window.location.hash = '#/Dashboard/signup';
		}
	},
	
	PasswordReset: function(login, key) {
		if ( WebBooker.Agent.password() == WebBooker.Agent.password2() ) {
			var args = {
				login: WebBooker.Agent.user(),
				password: WebBooker.Agent.password(),
				key: WebBooker.Agent.key()
			};
			
			WebBooker.API.passwordReset(args,
				function(json) {
					if ( json.status == 1 ) {
						WebBooker.successMsg(json.msg);
						window.location.hash = '#/Home';
					} else if ( json.status == -1 ) {
						WebBooker.errorMsg(json.msg);
					} else {
						WebBooker.errorMsg(json.msg);
					}
				}
			);
		} else {
			WebBooker.errorMsg( __('Passwords do not match!') );
		}
	},
	
	PasswordResetRequest: function() {
		var args = {
			user: WebBooker.Agent.user()
		};
		
		WebBooker.API.passwordResetRequest(args,
			function(json) {
				if ( json.status == 1 ) {
					WebBooker.successMsg(json.msg);
				} else if ( json.status == -1 ) {
					WebBooker.errorMsg(json.msg);
				} else {
					WebBooker.errorMsg(json.msg);
				}
			}
		);
	},
	
	pingCookie: function() {
		var cookie = readCookie('ACTIVITYREZ');
		
		if ( cookie && cookie != WebBooker.Agent.last_key ) {
			WebBooker.bootstrap.nonce = cookie;
		}
		
		return;
	}
};

// Routes
function notFound() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.show404(true);
}

Path.map("#/Home").to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Homepage.show(true);
	WebBooker.Analytics.trigger({}, 'action_Home');
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Search').to(function() {
	if(!WebBooker.Catalog.searchResults().length) {
		WebBooker.Catalog.hasSearched(false);
	}
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Catalog.show(true);
	setTimeout(function() {
		$('html, body').animate({ scrollTop: 0 }, 500);
		WebBooker.postMessage('scroll_to=0');
		WebBooker.Catalog.loadWithFilters();
		$('#webbooker-search-results .results').focus();
	}, 1);
});

Path.map('#/Contact').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Contact.show(true);
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/About').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.About.show(true);
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.showMain(true);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.show(true);
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/reports').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.showReports(true);
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/signup').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.showSignup(true);
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/PasswordReset').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showSignup(false);
	WebBooker.Dashboard.showPasswordReset(true);
	WebBooker.Agent.pw_reset.username(WebBooker.Agent.email());
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Checkout').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Checkout.sale.loadFromCart();
	WebBooker.CheckoutNav.show(true);

	setTimeout(function() {
		/*var items = [];
		for ( ni = 0; ni < WebBooker.Cart.items().length; ni += 1 ) {
			items.push( WebBooker.Cart.items()[ni].processActivityForAnalytics() );
		}*/

		WebBooker.Analytics.trigger( {
			cart_items: WebBooker.Cart.items(),
			subtotal: WebBooker.Checkout.sale.subtotal(),
			currency: WebBooker.selectedCurrency().title,
			prev_url: false
		}, 'action_Checkout');
	}, 1000);
});

Path.map('#/Confirmation/:saleID').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();

	WebBooker.CheckoutNav.showConfirmation(true);
	WebBooker.CheckoutNav.progress(71);
	var sale = WebBooker.Sale.get('sale');
	if( !sale.leadGuest.email ) {
		WebBooker.Checkout.moreErrorMsg(__('Unable to retrieve sale; Missing e-mail.'));
		return;
	}
	WebBooker.Checkout.sale.id(parseInt(this.params['saleID'],10));
	WebBooker.Checkout.sale.leadGuest.email( sale.leadGuest.email );

	WebBooker.Checkout.sale.load(function(){
		WebBooker.Analytics.trigger( WebBooker.Checkout.sale, 'action_Confirmation' );
	});
	
	window.addEventListener('unload', function(event) {
		WebBooker.Checkout.newSale();
	});

	// send confirmation email
	if(!WebBooker.Sale.get('loadedConfirmation')) {
		WebBooker.Sale.set('loadedConfirmation', true);
		WebBooker.API.doItineraryAction({
			saleID: WebBooker.Checkout.sale.id(),
			email: WebBooker.Checkout.sale.leadGuest.email(),
			output: 'email',
			subject: __('Itinerary Confirmation')()
		});
	}
});

Path.map('#/Confirmation/error/:errorMsg').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.CheckoutNav.showConfirmation(true);
	WebBooker.Checkout.errorMsg(this.params['errorMsg']);
	var sale = WebBooker.Sale.get('sale');
	if(sale) {
		WebBooker.Checkout.sale.json(sale);
	}
});

Path.map('#/Itinerary').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	$('#cart-sidebar .retrieve').hide(); //dumbness
	WebBooker.Itinerary.show(true);
});

Path.map('#/Itinerary/:saleID').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	$('#cart-sidebar .retrieve').hide(); //dumbness
	var sale = WebBooker.Sale.get('sale');
	if(sale) WebBooker.Itinerary.sale = $ar.SaleModel(sale);
	WebBooker.Itinerary.sale.id(this.params['saleID']);
	WebBooker.Itinerary.load();
	WebBooker.Itinerary.show(true);
});

Path.map('#/PasswordResetRequest').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Agent.passwordResetRequest(true);
	$('#passwordResetRequest input').focus();
	$('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/PasswordReset/:login/:key').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Agent.passwordReset(true);
	WebBooker.Agent.user(this.params['login']);
	WebBooker.Agent.key(this.params['key']);
});

// Settings
WebBooker.Settings = new Store('WebBooker_Settings_' + wb_global_vars.webBookerID);

// Store sale info locally
WebBooker.Sale = new Store('WebBooker_Sale_' + wb_global_vars.webBookerID);

WebBooker.Contact = {
	show: ko.observable(false),
	content: ko.observable('')
};

WebBooker.About = {
	show: ko.observable(false),
	content: ko.observable('')
};

// postMessage for iFrame
WebBooker.postMessage = function(message) {
	if(WebBooker.bootstrap.parent_url) {
		parent.postMessage(message, WebBooker.bootstrap.parent_url);
	}
};

// Binding Handlers
ko.bindingHandlers.collapseSidebarBox = {
	init: function(element, valueAccessor) {
		setTimeout(function(){
		    if(!$(element).siblings('.collapse-me').is(':hidden')){
		        $(element).children('i').removeClass('icon-chevron-down');
				$(element).children('i').addClass('icon-chevron-up');
			}
		}, 2000);
		$(element).click(function(e) {
			e.preventDefault();
			$(this).siblings('.collapse-me').slideToggle();
			$(this).children('i').toggleClass('icon-chevron-down icon-chevron-up');
			var title = $(this).attr('title');
			title = (title == __('Show')()) ? __('Hide')() : __('Show')();
			$(this).attr('title', title);
			return false;
		});
	}
};

ko.bindingHandlers.hotelTypeahead = {
	init: function(element, valueAccessor) {
		var option = valueAccessor()['value'];
		var saved_query = '';
		if(WebBooker.bootstrap.agencyID == 1260) return false;
		$(element).typeahead({
			source: function(query,process) {
				if(query.length < 3 || query == saved_query) {
					if(!query.length) {
						option(null);
					}
					return [];
				}

				saved_query = query;
				option(null);

				WebBooker.API.request('lookup','liveSearch',{
					object: 'hotel',
					property: 'post_title',
					query: query
				},function(data){
					var names = [];
					var mappedObjs = $.map(data.items,
						function(item) {
							names.push(item.name);
							return $ar.HotelModel(item);
						}
					);
					WebBooker.Checkout.hotels(mappedObjs);
					process(names);
				});
			},
			property: 'name',
			items: 8,
			updater: function(item) {
				option(null);
				for(var r = 0; r < WebBooker.Checkout.hotels().length; r++){
					var hotel = WebBooker.Checkout.hotels()[r];
					if(hotel.name == item){
						option(hotel);
						$(element).val(hotel.name);
						return item;
					}
				}
			},
			matcher: function(item) {
				// we return true because the ajax livesearch handles the matching.
				return true;
			}
		});
	},
	update: function(element, valueAccessor) {
		var option = valueAccessor()['value'];
		if(option()) {
			$(element).val(option().name);
		}
	}
};

ko.bindingHandlers.processingBtn = {
	update: function(element, valueAccessor) {
		if(valueAccessor()) {
			$(element).prepend('<i class="icon-processing"></i> ');
		} else {
			var content = $(element).html();
			content.replace('<i class="icon-processing"></i> ', '');
			$(element).html(content);
		}
	}
};

ko.bindingHandlers.scrollTopOnClick = {
	init: function(element, valueAccessor) {
		$(element).click(function(e) {
			$('html, body').animate({ scrollTop: 0 }, 500);
			WebBooker.postMessage('scroll_to=0');
		});
	}
};

ko.bindingHandlers.scrollTo = {
	init: function(element, scrollTo) {
		$(element).click(function(e) {
			var offset = $(scrollTo()).offset();
			$('html, body').animate({ scrollTop: offset.top }, 1000);
			WebBooker.postMessage('scroll_to=' + offset.top);
		});
	}
};

ko.bindingHandlers.fadeOpacity = {
	init: function(element, valueAccessor) {
		$(element).css({opacity: 0.2});
	},
	update: function(element, valueAccessor) {
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		shouldDisplay ? $(element).fadeTo('slow', 1) : $(element).fadeTo('slow', 0.2);
	}
};

ko.bindingHandlers.fadeVisible = {
	init: function(element, valueAccessor) {
		// Start visible/invisible according to initial value
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		$(element).toggle(shouldDisplay);
	},
	update: function(element, valueAccessor) {
		// On update, fade in/out
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
	}
};

// Utilities
// Calculates the distance between two locations.
function getDistance(lat1,lon1,lat2,lon2) {
	var R = 6371, // km
		dLat = toRad(lat2-lat1),
		dLon = toRad(lon2-lon1),
		a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
			Math.sin(dLon/2) * Math.sin(dLon/2),
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return Math.round((R * c)*Math.pow(10,2))/Math.pow(10,2);
}

// Converts numeric degrees to radians
function toRad(value) {
	return value * Math.PI / 180;
}

function sortNearestDistance(a,b) {
	return a.distance - b.distance;
}

function formatTime(date) {
	var d = new Date(date),
		hh = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds(),
		dd = " am",
		h = hh;

	if (h >= 12) {
		h = hh-12;
		dd = " pm";
	}
	if (h == 0) {
		h = 12;
	}
	m = m<10?"0"+m:m;

	s = s<10?"0"+s:s;

	/* if you want 2 digit hours: */
	//h = h<10?"0"+h:h;

	return h + ':' + m + dd;

  //  var pattern = new RegExp("0?"+hh+":"+m+":"+s);
   // return date.replace(pattern,h+":"+m+":"+s+" "+dd)
}

function createTimestamp(now) {
	var year = "" + now.getFullYear();
	var month = "" + (now.getMonth() + 1);if (month.length == 1) {month = "0" + month;}
	var day = "" + now.getDate();if (day.length == 1) {day = "0" + day;}
	var hour = "" + now.getHours();if (hour.length == 1) {hour = "0" + hour;}
	var minute = "" + now.getMinutes();if (minute.length == 1) {minute = "0" + minute;}
	var second = "" + now.getSeconds();if (second.length == 1) {second = "0" + second;}
	return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
}

function getDateString(date) {
	var month = '' + (date.getMonth() + 1);
	var day = '' + date.getDate();

	if (month.length == 1) {
		month = '0' + month;
	}
	if (day.length == 1) {
		day = '0' + day;
	}

	return month + '/' + day + '/' + date.getFullYear();
}

function createCookie(name, value, days){
	var expires = '',
		date = new Date();

	if(days) {
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = '; expires=' + date.toGMTString();
	} else {
		expires = '';
	}

	document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name){
	var nameEQ = name + '=',
		ca = document.cookie.split(';');

	for(var i=0; i<ca.length; i+=1) {
		var c = ca[i];
		while(c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if(c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

function deleteCookie(name) {
	createCookie(name, '', -1);
}

function betterRounding(amt) {
	return Math.round( parseFloat(amt) * 100 ) / 100;
}

//javascript i18n
var __ = (function(){
	var langFile = ko.observable(),
		ret = function(){
			return (function(args){
				var _val = args[0];
				var _params = Array.prototype.slice.call(args,1);
				return ko.computed({
					read: function(){
						var text = '' + _val;
						if(langFile() && langFile()[_val]){
							text = langFile()[_val].translation;
						}

						//basic sprintf feature
						var bits = text.split('%'),
							out = bits[0],
							re = /^([ds])(.*)$/;

						for(var i=1; i<bits.length; i++){
							p = re.exec(bits[i]);
							if(!p || _params[i-1]===null) continue;
							if(p[1] == 'd')
								out += parseFloat(ko.utils.unwrapObservable(_params[i-1]), 10);
							else if(p[1] == 's')
								out += _params[i-1];
							out += p[2];
						}
						return out;
					},
					write: function(){
						_val = arguments[0];
						if(arguments.length > 1){
							_params = Array.prototype.slice.call(arguments,1);
						}

					}
				});
			})(arguments);
		};
	ret.load = function(post_id, i18n) {
		WebBooker.API.getPOFile({
			post_id: post_id,
			i18n: i18n
		}, function(data) {
			if(data.status != 1) return false;
			langFile(data.po);
			return true;
		});
	};

	return ret;
})();

var fn_format_money = function() {
	var val, elem, format;

	//format comes in as:
	//{ symbol: string, title: string, rate: number, thousands: string, decimal: string }
	if(arguments.length < 2){
		throw new Error("fn_format_money called with too few parameters");
	}

	if(arguments.length < 3){
		val = arguments[0];
		format = arguments[1];
		elem = {};
	} else {
		elem = arguments[0];
		val = arguments[1];
		format = arguments[2];
	}

	if(typeof val == 'function')
		val = ko.utils.unwrapObservable(val());

	if(!val || isNaN(val)) val = 0;

	var pad = function(num,dec,toLeft){ var str = ''+num; while(str.length<dec) str=toLeft?'0'+str:str+'0'; return str; },
		value = ko.utils.unwrapObservable(val),
		decimalPlaces = 2,
		pow = Math.pow(10,decimalPlaces),
		before, curr, after = [];
	value = Math.round(val*(format.rate||1) * pow)/pow;
	curr = Math.floor(Math.abs(value));
	while(Math.floor(curr/1000)){
		after.push(pad(curr%1000,3,1));
		curr = (curr/1000)&~0;
	}
	after.push(curr);
	curr = after.reverse().join(format.thousands||',');
	value = (format.symbol||'$') + (val < 0?'-':'') + curr + (format.decimal||'.') + pad(Math.abs(Math.round((value*pow)%pow)), decimalPlaces,1);
	elem.innerHTML = value;
	return value;
};

//formats numbers based on the location's currency
ko.bindingHandlers.money = {
	init : function(elem, val){
		var format = WebBooker.selectedCurrency()||{};
		fn_format_money(elem, val, format);
	},
	update : function(elem, val){
		var format = WebBooker.selectedCurrency()||{};
		fn_format_money(elem, val, format);
	}
};

//still formats, but ignores the rate
ko.bindingHandlers.clean_money = {
	init : function(elem, val){
		var format = WebBooker.selectedCurrency()||{},
			newFormat = {
				decimal: format.decimal||'.',
				rate: 1,
				symbol: format.symbol||'',
				thousands: format.thousands||',',
				title: format.title||''
			};

		fn_format_money(elem, val, newFormat);
	},
	update : function(elem, val){
		var format = WebBooker.selectedCurrency()||{},
			newFormat = {
				decimal: format.decimal||'.',
				rate: 1,
				symbol: format.symbol||'',
				thousands: format.thousands||',',
				title: format.title||''
			};

		fn_format_money(elem, val, newFormat);
	}
};
/* TODO, figure out why this is here
$(document).ready(function(){
	 if($.browser.msie){
		 $(function() {
			$('[placeholder]').focus(function() {
			  if($(this).val() == $(this).attr('placeholder')) {
				$(this).val('');
			  }
			}).blur(function() {
			  if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
				$(this).val($(this).attr('placeholder'));
			  }
			}).blur();
		});
	}
});
*/

window.$ar = window.$ar||{};
$ar.Notification = (function(){
	var visible = 6000,
		remove = 300;

	var notice = function(msg,level){
		var _self = {};
		_self.elem = document.createElement('div');
		_self.elem.className = 'entry';
		if(/(error|success)/.test(level))
			_self.elem.className += ' ' + level;
		if(ko && ko.isObservable(msg))
			msg = msg();
		_self.elem.innerHTML = msg;
		if(/^error$/.test(level)){
			var close = document.createElement('p');
			close.className = 'closeClick';
			close.innerHTML = __('click to close')();
			_self.elem.appendChild(close);
		}

		var clearElem = function(){
			if(_self.time) clearTimeout(_self.time);
			$(_self.elem).off('mousedown',clearElem);
			_self.elem.className += ' remove';
			setTimeout(function(){
				_self.elem.parentNode.removeChild(_self.elem);
			},remove);
		};
		$(_self.elem).mousedown(clearElem);
		//if(!/(error)/.test(level)){
			_self.time = setTimeout(clearElem,visible);
		//}

		setTimeout(function(){ _self.elem.className += ' active'; },5);
		return _self.elem;
	};

	var self = function(msg,level){
		if(!/(error|success)/.test(level))
			level = 'normal';
		if(ko && ko.isObservable(msg) && Object.prototype.toString.call(msg()) == '[object Array]')
			msg = msg();
		if(Object.prototype.toString.call(msg) != '[object Array]')
			msg = [msg];

		for(var ni = 0; ni < msg.length; ni++){
			if(self.preinit){
				self.prequeue.push({ msg: msg[ni], level: level });
				continue;
			}
			self.elem.insertBefore(new notice(msg[ni],level),self.elem.firstChild);
		}
	};
	self.elem = null;
	self.prequeue = [];
	self.preinit = setInterval(function(){
		if(!document.body) return;
		clearInterval(self.preinit);
		if(!self.elem){
			self.elem = document.createElement('div');
			self.elem.className = 'notifications';
			document.body.appendChild(self.elem);
		}
		for(var ni = 0; ni < self.prequeue.length; ni++){
			self.elem.insertBefore(new notice(self.prequeue[ni].msg,self.prequeue[ni].level),self.elem.firstChild);
		}
		self.preinit = null;
	},30);

	return self;
})();

$ar.data_mapper = function(map,data){
	if(!map || !data) return;
	for(var ni in map){
		if(!data.hasOwnProperty(ni)) continue;
		data[map[ni]] = data[ni];
		delete data[ni];
	}

	return data;
};
$ar.load = function(path,callback){
	var d = document,
		js = /\.js$/.test(path),
		elem;

	if(!/\.(js|css)$/.test(path)) return;
	elem = d.createElement(js?'script':'link');
	elem[js?'src':'href'] = path;
	if(!js) elem.rel = 'stylesheet';

	if(typeof callback == 'function')
		elem.onload = callback;

	d.body.appendChild(elem);
};
$ar.Model = function(def, _json){
	var ret = {};
	for(var ni in def){
		ret[ni] = def[ni];
	}
	ret._json_callback = null;
	ret.json = function(json){
		var ni, no;
		if(!json){
			var obj = {}, tmp, _tmp;
			for(ni in def){
				tmp = ko.utils.unwrapObservable(ret[ni]);

				if(/^_/.test(ni) || typeof tmp == 'function'){
					continue;
				}

				//gotta look for models WITHIN models
				if(!tmp){
					obj[ni] = tmp;
				} else if(tmp.hasOwnProperty && tmp.hasOwnProperty('json')){
					obj[ni] = tmp.json();
				} else if(Object.prototype.toString.call(tmp) == '[object Array]'){
					_tmp = [];
					for(no = 0; no < tmp.length; no++){
						if(tmp[no].hasOwnProperty && tmp[no].hasOwnProperty('json')){
							_tmp[no] = tmp[no].json();
						} else {
							_tmp[no] = tmp[no];
						}
					}
					obj[ni] = _tmp;
				} else if(typeof tmp == 'object'){
					for(no in tmp){
						if(tmp[no].hasOwnProperty && tmp[no].hasOwnProperty('json'))
							tmp[no] = tmp[no].json();
					}
					obj[ni] = tmp;
				} else {
					obj[ni] = tmp;
				}
			}
			return obj;
		}
		if(ret._json_callback) ret._json_callback(json);
		for(ni in json){
			if(!def.hasOwnProperty(ni))
				continue;
			if(ko.isObservable(ret[ni])){
				ret[ni](ret.cleanNumbers(json[ni]));
			} else {
				ret[ni] = ret.cleanNumbers(json[ni]);
			}
		}
		return ret;
	};
	ret.extend = function(_def,_json){
		for(var ni in _def){
			if(def[ni]) continue;
			if(/^(json|_|cleanNumbers|extend)/.test(ni)) continue;
			def[ni] = ret[ni] = _def[ni];
		}
		if(_json) ret.json(_json);
		return ret;
	};
	ret.cleanNumbers = function(obj){
		if(!obj)
			return obj;
		if(!isNaN(parseFloat(obj)) && isFinite(obj))
			return parseFloat(obj);
		if(typeof obj == 'string'){
			if(obj == 'null' || obj == '')
				obj = null;
			return obj;
		}
		if(typeof obj == 'function')
			return obj;
		for(var ni in obj)
			obj[ni] = ret.cleanNumbers(obj[ni]);
		return obj;
	};

	if(_json) ret.json(_json);

	return ret;
};
$ar.MiniActivityModel = (function() {
	var cache = {};
	return function( data ) {
		if( cache[( data || { id: 0 } ).id]) {
			return cache[data.id];
		}
		var that = $ar.Model({
			id: 0,
			activityID: 0,
			title: '',
			slug: '',
			i18n: 'en_US',
			destination: '',
			destinationID: 0,
			shortDesc: null,
			duration: null,
			tags: [],
			prices: [],
			r2: 0,
			times: []
		});

		that.thumbnail_url = ko.observable();
		that.slug = ko.observable( that.slug );
		that.url = ko.computed(function() {
			return WebBooker.bootstrap.wb_url + '/' + that.slug() + '/';//added terminating slash to avoid a redirect and 400ms
		});

		that.link = function() {
			window.location.href = that.url();
		};

		that._json_callback = function( beans ) {
			//need to normalize this on the backend
			beans.id = beans.json_input.id;
			beans.prices = beans.json_input.prices;
			beans.times = beans.json_input.times;

			if ( beans.prices && beans.prices.length ) {
				beans.r2 = beans.prices[0].r2;
			}

			if ( beans.id ) {
				cache[beans.id] = that;
			}
			if ( beans.json_input && beans.json_input.media ) {
				var media = beans.json_input.media, na, featured;
				for( na in media ) {
					if ( media[na].type != 'image' ) continue;
					if(media[na].featured){
						that.thumbnail_url(WebBooker.mediaServer+'/media/'+media[na].hash+'/thumbnail/height/'+200);
						break;
					}
					if(!that.thumbnail_url() && media[na].url){
					  that.thumbnail_url(WebBooker.timthumb + 'tth/' + WebBooker.thumbnailHeight + '/' + basename(media[na].url));
					  break;
					}else if(media[na].hash){
					  that.thumbnail_url(WebBooker.mediaServer+'/media/'+media[na].hash+'/thumbnail/height/'+200);
					  break;
					}
				} 
				if ( beans.id ) {
					cache[beans.id] = that;
				}
			}
		};

		that.json( data );

		return that;
	};
})();
$ar.SearchResult = function(data) {
	var that = $ar.MiniActivityModel( data ),
		price, ni;
	if( that.prices ){
		for ( ni = 0; ni < that.prices.length; ni += 1 ) {
			if ( that.prices[ni].display_price == 1 ) {
				price = that.prices[ni].amount;
				break;
			}
			else if( ( !price || that.prices[ni].amount < price ) && that.prices[ni].amount > 0 ) {
				price = that.prices[ni].amount;
			}
		}
	}
	that.displayPrice = price || 0;
	that.active_days = ko.computed(function(){
		if(!that.times || !that.times.length)
			return '';
		var days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			out = [];
		for ( ni = 0; ni < that.times.length; ni += 1 ) {
			if( that.times[ni].start && !days.hasOwnProperty( that.times[ni].start.day ) )
				days[that.times[ni].start.day] = __( that.times[ni].start.day.substr(0,3) )();
		}
		//sort on key
		for(ni in days) {
			out.push(days[ni]);
		}
		out.sort( function( a, b ) {
			return d[a.name] > d[b.name];
		} );

		if( out.length == 7 ) {
			return __('Every day')();
		} else {
			return out.join(', ');
		}
	});

	return that;
};
$ar.Taxonomy = function(data){
	var that = $ar.Model({
		name: '',
		__name: '',
		slug: '',
		term_id: 0
	},data);
	that.selected = ko.observable(false);
	that.__name = __(that.name);
	that.name = ko.observable(that.name);
	return that;
};
$ar.Geocoder = (function() {
	var google = google || {};
	if(google && google.maps){
		var that = {
			geocoder: new google.maps.Geocoder()
		};
	
		that.geocode = function(object, callback) {
			that.geocoder.geocode(
				object,
				function(results, status) {
					if(status == google.maps.GeocoderStatus.OK) {
						callback(results);
					}
					else {
						WebBooker.errorMsg('ERROR: Can not geocode address.');
					}
				}
			);
		};
	
		return that;
	}
})();
$(document).ready(function(){
	setTimeout(function(){
		$('.collapse-me input[type="text"]').each(function(){
			if ($(this).val())
				$(this).closest('.collapse-me').show();
		});

		$('.collapse-me select').each(function(){
			if ($(this).val())
				$(this).closest('.collapse-me').show();
		});

		$('.collapse-me input:checked').each(function(){
			$(this).closest('.collapse-me').show();
		});
	}, 2000);

	
	$('.trainingClose').click(function(){
		$('.trainingWarning').hide();
	});
	
	$("#search-keywords").keypress(function(event){
		if(event.keyCode == 13){
			$("#searchActivitiesButton").click();
		}
	});
});
