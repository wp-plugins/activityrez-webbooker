/**
 *	ActivityRez Web Booking Engine
 *	Activity JS Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 8469 B

WebBooker.MiniCart = (function(){
	var self = {};
	self.activity = ko.observable(null);
	self.cartItem = ko.observable(null);
	self.checkingInventory = ko.observable(false);
	self.date = ko.observable('');
	self.time = ko.observable('');
	self.blackoutDays = [];
	self.times = ko.observableArray([]);
	self.inventory = ko.observable();
	self.cfa = ko.observable();
	self.canBook = ko.observable(true);
	self.unlBooking = ko.observable(false);
	self.showTicketsLeft = true;
	
	self.getDeadline = function() {
		var unit = 60000, //60,000 milliseconds in a minute
			cfa = parseInt( self.cfa(), 10 ) === 1 ? true : false,
			//cutoff values are converted to minutes
			activity_deadline = ( self.activity().cutoff_hours ? parseInt( self.activity().cutoff_hours, 10 ) * 60 : 0 ) + ( self.activity().cutoff_minutes ? parseInt( self.activity().cutoff_minutes, 10 ) : 0 ),
			default_deadline = ( WebBooker.bootstrap.default_cutoff_hrs ? parseInt( WebBooker.bootstrap.default_cutoff_hrs, 10 ) * 60 : 0 ) + ( WebBooker.bootstrap.default_cutoff_mins ? parseInt( WebBooker.bootstrap.default_cutoff_mins, 10 ) : 0 ),
			_date;
			
		if( self.activity().book_until_end ) {
			if ( self.time().endTime === 'Open' ) {
				_date = new Date( self.date() );
				_date.setHours(23,59,59);
			} else {
				_date = new Date( self.date() + ' ' + self.time().endTime );
			}
		} else {
			if ( self.time().startTime === 'Open' ) {
				_date = new Date( self.date() );
			} else {
				_date = new Date( self.date() + ' ' + self.time().startTime );
			}
		}
		
		// if CFA off, then respect activity deadline when activity > default
		if( !cfa ) {
			_date = new Date( _date.getTime() - ( ( activity_deadline > default_deadline ? activity_deadline : default_deadline ) * unit ) );
		// otherwise, default deadline is always deadline.
		} else {
			_date = new Date( _date.getTime() - ( default_deadline * unit ) );
		}
		
		return _date;
	};

	self.guests = ko.computed(function(){
		if(!self.cartItem() || !Object.keys(self.cartItem().guests()).length) {
			return [];
		}
		return self.cartItem().guests();
	});
	
	self.ticketsLeft = ko.computed(function() {
		if ( !self.showTicketsLeft ) {
			return false;
		}
		
		var inv = self.inventory(),
			cfa = self.cfa();
		
		if ( !inv || cfa ) {
			return false;
		}
		
		if ( !inv.inventory || inv.inventory === 0 ) {
			return false;
		}
		
		var max = inv.available || 0,
			guests = self.guests(),
			ni;
			
		for ( ni = 0; ni < guests.length; ni += 1 ) {
			max -= guests[ni].qty();
		}
		
		if ( inv.inventory > 0 && max > 0 ) {
			if ( max <= 5 ) {
				return __('Only')() + ' ' + max + ' ' + __('tickets left!')();
			} if ( max === 1 ) {
				return __('Only')() + ' 1 ' + __('ticket left!')();
			} else {
				return false;
			}
		} else if ( inv.inventory > 0 && max <= 0 ) {
			return __('No more tickets left!')();
		}
		return false;
	});
	
	self.canCheckout = ko.computed(function(){
		if ( WebBooker.Cart.items().length > 0 ) {
			return true;
		}
		if ( self.cartItem() ) {
			var total = 0,
				g = self.guests(),
				ni;
			for ( ni = 0; ni < g.length; ni += 1 ) {
				total += g[ni].qty();
			}
			if ( total > 0 ) {
				return true;
			}
		}
		return false;
	});

	self.availabilityStatus = ko.computed(function() {
		if(self.checkingInventory()) {
			return __('Checking')() + '...';
		}
		if(self.date()) {
			if(self.time()) {
				if(self.canBook()) {
					return __('Available')();
				}
				return __('Unavailable')();
			}
			return __('Select a time')();
		}
		return __('Select a date')();
	});

	self.isAvailable = function(nval, pid) {
		function doNotification() {
			jQuery('#activity-subtotal').addClass('pulsate');
			setTimeout(function() {
				jQuery('#activity-subtotal').removeClass('pulsate');
			}, 1000);
			/*if(!self.cartUpdateNotification) {
				self.cartUpdateNotificationStart();
			} else {
				clearTimeout(self.cartUpdateNotification);
				self.cartUpdateNotificationStart();
			}*/
		};
		
		switch(true) {
			case ( nval < 0 ):
				return false;
				break;
				
			case ( parseInt(self.cfa(), 10) === 1 ):
				doNotification();
				return true;
				break;
				
			case ( self.inventory().inventory == 0 ):
				doNotification();
				return true;
				break;
		}

		var max = self.inventory().available, prices = self.cartItem().guests(), ni;
		for ( ni = 0; ni < prices.length; ni += 1 ) {
			if( prices[ni].id == pid )
				continue;
			max -= prices[ni].qty();
		}

		if ( nval > max ) {
			$ar.Notification( __('No more tickets left.'), 'error' );
			return false;
		}
		
		doNotification();
		return true;
	};
	
	self.cartUpdateNotification = false;
	self.cartUpdateNotificationStart = function() {
		self.cartUpdateNotification = setTimeout( function() {
			$ar.Notification( __('Cart Updated'), 'success' );
		}, 500 );
	};
	
	self.checkout = function(){
		if( !self.addToCart() ) {
			return false;
		}
		jQuery('html, body').animate({ scrollTop: 0 }, 500);
		window.location.href = WebBooker.bootstrap.wb_url + '/#/Checkout';
	};
	self.addToCart = function(){
		if(!self.cartItem()) return true;
		var g = self.cartItem().guests(),
			qty = 0,
			ni;
		for(ni = 0; ni < g.length; ni++){
			qty += g[ni].qty();
		}
		if(!qty) return true;
		if(self.cartItem().inCart) return true;
		self.cartItem().inCart = true;
		WebBooker.Cart.items.push(self.cartItem());

		// Analytics hook.
		//WebBooker.Analytics.trigger(event.target, 'action_addToCart');
		
		return true;
	};

	self.checkInventory = function() {
		var date = self.date(),
			_date = new Date( self.date() ),
			time = self.time().startTime == 'Open' ? '' : self.time().startTime,
			saved_time = self.time();
			
		self.checkingInventory(true);
		if(!saved_time){
			jQuery('#activity-availability > span').effect('pulsate', {times: 2}, 500);
			self.checkingInventory(false);
			return;
		}
			
		self.cartItem(null);
		
		WebBooker.API.checkAvailability({
			id: self.activity().id,
			datetime: createTimestamp(new Date(self.date() + ' ' + time))
		}, function(data){
			self.checkingInventory(false);
			
			data.inventory = parseInt(data.inventory, 10);
			data.available = parseInt(data.available, 10);
			data.cfa = parseInt(data.cfa, 10);
			
			if(data.status > 0){
				self.inventory(data);
				self.cfa(data.cfa);
			} else if(data.status < 0 && data.status != -10){
				self.inventory(false);
				self.canBook(false);
				return false;
			}
			
			var i = WebBooker.Cart.items(),
				deadline = self.getDeadline(),
				today = new Date(),
				ni;
				
				console.log(data);
				
			// the real beauty of simplifying this is we separate the deadline from the inventory checks,
			// so that after getting the deadline above (which accounts for CFA as well), we only have to determine
			// below whether certain conditions are met and if we are over or under the deadline.
			// Ryan Freeman
			switch(true) {
				// case #1 in matrix / line 3
				// cfa off, max inv is set, no available inventory: do not book
				case ( data.inventory > 0 && !data.cfa && data.available <= 0 ):
					self.canBook(false);
					self.inventory(false);
					console.log('failed at case #1');
					return false;
					break;
				
				// max inv not set, none available, deadline hasn't passed yet: allow booking (unlimited bookings)
				case ( data.inventory <= 0 && data.available <= 0 && deadline >= today ):
					if ( data.cfa ) {
						//set ticket cfa
					} else {
						//unset ticket cfa
					}
					self.canBook(true);
					self.unlBooking(true);
					console.log('passed at case #2');
					break;
				
				// max inv is set, inventory available, deadline hasn't passed yet: allow booking
				case ( data.inventory > 0 && data.available > 0 && deadline >= today ):
					self.canBook(true);
					console.log('passed at case #3');
					break;
					
				// max inv is set, no more inventory available, cfa on, and deadline hasn't passed yet: allow booking
				case ( data.cfa && data.inventory > 0 && data.available <= 0 && deadline >= today ):
					self.canBook(true);
					//set ticket cfa
					console.log('passed at case #4');
					break;
					
				// max inv is set, inventory available, deadline already past: do not book
				case ( data.inventory > 0 && data.available > 0 && deadline < today && !data.cfa ):
					self.canBook(false);
					self.inventory(false);
					console.log('failed at case #5');
					return false;
					break;
					
				//default behavior is to prevent booking
				default:
					self.canBook(false);
					self.inventory(false);
					console.log('failed at default case');
					return false;
					break;
			}
			
			//wraps the validation script to maintain object's presence in the cart
			var valFunc = function(obj){
				obj.qty.setValidate(function(nval){
					if(!self.isAvailable(nval, obj.id)||!self.cartItem())
						return false;
					var g = self.cartItem().guests(),
						tickets = 0,
						ni;
					//here we're only grabing tickets from other types
					//to see what's a valid number for this type
					for(ni = 0; ni < g.length; ni++){
						if(g[ni].id == obj.id) continue;
						tickets += g[ni].qty();
					}

					if(nval + tickets > 0 && !self.cartItem().inCart){
						self.cartItem().inCart = true;
						WebBooker.Cart.items.push(self.cartItem());
					} else if(nval+tickets <= 0 && self.cartItem().inCart){
						WebBooker.Cart.items.remove(self.cartItem());
						self.cartItem().inCart = false;
					}
					return true;
				});
			};

			var _ci;
			//check for thineself in the cart
			for(ni = 0; ni < i.length; ni++){
				if(i[ni].activity != self.activity().id) {
					continue;
				}
				if(i[ni].date != self.date() || i[ni].time.startTime != self.time().startTime) {
					continue;
				}
				_ci = i[ni];
				break;
			}
			if(!_ci){
				_ci = new $ar.CartItemModel({
					inCart: false,
					activity: self.activity().id,
					date: self.date(),
					time: self.time(),
					title: self.activity().title,
					url: WebBooker.bootstrap.wb_url + '/' + self.activity().slug + '/',
					destination: self.activity().destination
				});
			}
			var g = _ci.guests(), temp,found;
			for(ni = 0; ni < data.prices.length; ni++){
				temp = data.prices[ni].guest_type_id;
				found = false;
				for(no = 0; no < g.length; no++){
					if(g[no].id != temp) continue;
					g[no].json(data.prices[ni]);
					valFunc(g[no]);
					found = true;
				}
				if(!found){
					g.push($ar.CartGuestModel(data.prices[ni]));
					valFunc(g[g.length-1]);
				}
			}
			
			self.checkingInventory(false);
			_ci.guests(g);
			self.cartItem(_ci);
		});
	};
	
	//check all the days in the calendar against the dates in blackoutDays then check to see if the activity is available on that day
	self.dayAvailable = function(date) {
		var weekday = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ],
			times = self.activity().times,
			today = new Date(),
			diff = Math.floor( ( today.getTime() - date.getTime() ) / 86400000 ),
			ni, lifespanDateStart, lifespanDateEnd, ds, de;
			
		if('0000-00-00 00:00:00' == self.activity().date_start){
			ds = '2001/01/01 00:00:00';
		}else{
			ds = cleanTimestamp( self.activity().date_start );
		}
		if('0000-00-00 00:00:00' == self.activity().date_end){
			de = '2037/01/01 00:00:00';
		}else{
			de = cleanTimestamp( self.activity().date_end );
		}
		
		lifespanDateEnd = new Date(de);
		lifespanDateStart = new Date(ds);
			
		today.setHours(0, 0, 0);
		
		// reject old dates
		if(today > date && diff != 0) {
			return [false];
		}
		// check lifespan dates
		if(lifespanDateStart && lifespanDateEnd ){
			if( lifespanDateStart.getTime() > date.getTime() || lifespanDateEnd.getTime() < date.getTime() ){
				return [false];
			}
		}
		
		// check blackout days
		for(ni = 0; ni < (self.blackoutDays||[]).length; ni++){
			if(self.blackoutDays[ni].valueOf() != date.valueOf()) {
				continue;
			}
			return [false];
		}
		
		var _date = date.valueOf(),
			cutoff_hrs = parseInt(self.activity().cutoff_hours || 0),
			cutoff_minutes = parseInt(self.activity().cutoff_minutes || 0),
			cutoff_mins = ( cutoff_hrs * 60 ) + cutoff_minutes,
			book_until_end = self.activity().book_until_end,
			cfa = parseInt( self.cfa(), 10) === 1 ? true : false,
			time,
			time_diff,
			clean,
			start_date,
			end_date,
			_ret = [false];
		
		//reset today to new date for processing below
		today = new Date();
		
		//check the calendar date against all the days the activity is on
		for(ni = 0; ni < times.length; ni++){
			start_date = new Date( times[ni].startDate === '0000-00-00 00:00:00' ? '2001/01/01 00:00:00' : cleanTimestamp( times[ni].startDate ) );
			end_date = new Date( times[ni].endDate === '0000-00-00 00:00:00' ? '2037/01/01 00:00:00' : cleanTimestamp(times[ni].endDate) );
			
			if ( !book_until_end && times[ni].startDayOfWeek && times[ni].startDayOfWeek != weekday[date.getDay()]){
				continue;
			} else if ( book_until_end && times[ni].endDayOfWeek && times[ni].endDayOfWeek != weekday[date.getDay()] ) {
				continue;
			}
			
			if ( start_date > date || end_date < date ) {
				continue;
			}
			
			_ret = [true];
		}
		return _ret;
	};
	self.showDatePicker = function(){
		jQuery('#activity-date .datepicker').datepicker('show');
	};
	self.add = function( item, evt ) {
		item.qty( item.qty() + 1 );
		
		var d = self.cartItem().processActivityForAnalytics();
		
		WebBooker.Analytics.trigger( {
			element: evt.currentTarget,
			title: d.title,
			id: d.id,
			date: d.date,
			time: d.time,
			total_guests: d.total_guests,
			guest_types: d.guest_types
		}, 'action_updateCart' );
	};
	self.remove = function( item, evt ) {
		var d = self.cartItem().processActivityForAnalytics();
		
		WebBooker.Analytics.trigger( {
			element: evt.currentTarget,
			title: d.title,
			id: d.id,
			date: d.date,
			time: d.time,
			total_guests: d.total_guests,
			guest_types: d.guest_types
		}, 'action_removeFromCart' );
		
		item.qty( item.qty() - 1 );
	};
	
	self._grabDays = function(day){
		var times = self.activity().times,
			days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			start_date,
			end_date,
			out = [], ni;
		for(ni = 0; ni < times.length; ni += 1){
			start_date = new Date( times[ni].startDate === '0000-00-00 00:00:00' ? '2001/01/01 00:00:00' : cleanTimestamp(times[ni].startDate) );
			end_date = new Date( times[ni].endDate === '0000-00-00 00:00:00' ? '2037/01/01 00:00:00' : cleanTimestamp(times[ni].endDate) );
			
			if ( start_date >= day || end_date <= day ) {
				continue;
			}
			
			if(!days.hasOwnProperty(times[ni].startDayOfWeek)) {
				days[times[ni].startDayOfWeek] = {
					name: times[ni].startDayOfWeek,
					times: [],
					name_abbrv: times[ni].startDayOfWeek.substr(0,3)
				};
			}
			
			days[times[ni].startDayOfWeek].times.push({
				startDate: times[ni].startDate,
				endDate: times[ni].endDate,
				startTime: times[ni].startTime,
				endTime: times[ni].endTime
			});
		}
		//sort on key
		for(ni in days) {
			out.push(days[ni]);
		}
		out.sort(function(a,b){
			return d[a.name] > d[b.name];
		});
		return out;
	};
	self.getTimestamp = ko.computed(function() {
		if(!self.date() || !self.time())
			return;
		var time = (self.time().startTime == 'Open') ? '' : self.time().startTime;
		return createTimestamp(new Date(self.date() + ' ' + time));
	});

	self.activity.subscribe(function(activity){
	
		var today = function() {
			var d = new Date();
			var month = ('0' + (d.getMonth() + 1)).slice(-2),
				day = ('0' + d.getDate()).slice(-2);
			return month + "/" + day + "/" + d.getFullYear();
		}

		self.date(today());
		self.blackoutDays = [];
		self.cfa(activity.cfa);

		var blackouts = activity.blackouts||[],
			curr_date, end_date, ni;

		//get the dates for each blackout date range and append them to blackoutDays

		for(ni = 0; ni < blackouts.length; ni++) {
			//generate a list of dates from a range
			curr_date = new Date( cleanTimestamp( blackouts[ni].startDate ) );
			end_date = new Date( cleanTimestamp( blackouts[ni].endDate ) );
			while(curr_date <= end_date){
				self.blackoutDays.push(new Date(curr_date.getTime()));
				curr_date.setDate(curr_date.getDate() + 1);
			}
		}
		// adjust the date picker.
		jQuery('#webbooker-activity-book .datepicker').datepicker({
			numberOfMonths: 1,
			minDate: 0,
			//showOn: 'button',
			buttonImage: WebBooker.bootstrap.plugin_url + '/images/icon-calendar.png',
			dateFormat: 'mm/dd/yy',
			buttonImageOnly: true,
			beforeShowDay: self.dayAvailable
		});
	});
	self.date.subscribe(function(newValue) {
		var activityTimes = [];
		self.inventory([]);
		self.time(null);
		self.times([]);

		if(!newValue) return;
		
		var day = new Date(newValue),
			date = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day.getDay()],
			days = self._grabDays(day),
			today = new Date(),
			date_diff = Math.floor( ( today.getTime() - day.getTime() ) / 86400000 ),
			book_until_end = self.activity().book_until_end,
			ni,no;
			
		for(ni = 0; ni < days.length; ni++){
			if(days[ni].name != date) continue;

			for(no = 0; no < days[ni].times.length; no++){
			
				var time = days[ni].times[no];

				if ( self.times.indexOf( time ) >= 0 ) {
					continue;
				}
				self.times.push(time);
			}
			
			break;
		}
		self.times.sort( function( a, b ) {
			return new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime);
		} );
		// sort "Open"
		var o = -1;
		for( ni=0; ni < self.times().length; ni++ ) {
			if( jQuery.trim(self.times()[ni].startTime) == 'Open' ) {
				o = ni;
			}
		}
		if( o >= 0 ) {
			var _times = self.times.splice( o, 1 );
			self.times.unshift(_times[0]);
		}
		
		if(self.times().length === 1) {
			self.time(self.times()[0]);
		}
	});
	self.time.subscribe(function(newValue){
		if(newValue){
			self.checkInventory();
		}
	});
	
	return self;
})();

WebBooker.ChildActivityView = function(data){
	var self = {
		title: data.title,
		shortDesc: data.shortDesc,
		url: WebBooker.bootstrap.wb_url + '/' + data.slug + '/',
		display_price: false,
		low: null,
		high: null
	}, ni;

	if(!data.prices) return self;

	for ( ni = 0; ni < data.prices.length; ni += 1 ) {
		if (data.prices[ni].display_price == 1 ) {
			self.display_price = data.prices[ni].amount;
			break;
		}
		if (!self.low || data.prices[ni].amount < self.low ) {
			self.low = data.prices[ni].amount;
		}
		if ( !self.high || data.prices[ni].amount > self.high ) {
			self.high = data.prices[ni].amount;
		}
	}
	
	//self.low = low;
	//self.high = high;
	self.prices = data.prices

	return self;
};
WebBooker.ActivityView = (function(){
	var self = {};
	self.fullScreenShow  = ko.observable(false);
	self.show = ko.observable(false);
	self.invalidLanguage = ko.observable(false);
	self.activity = ko.observable();
	self.children = ko.observableArray([]);
	self.slideshow = ko.observableArray([]);

	self.i18n = function(val){
		WebBooker.API.changeI18N({ i18n: val.i18n });
	};
	
	self.analyticsContinueShopping = function(item, evt) {
		WebBooker.Analytics.trigger( evt.currentTarget, 'action_continueShopping' );
		return true;
	};
	
	self.displayPrice = ko.computed(function() {
		if ( !self.activity() ) return false;
		
		var kids = self.children(),
			prices = self.activity().prices || [],
			price = false,
			i;
		
		if ( kids.length > 0 ) {
			for ( i = 0; i < kids.length; i += 1 ) {
				if ( kids[i].display_price ) {
					price = kids[i].display_price;
					break;
				}
				else if ( !price || kids[i].low < price ) {
					price = kids[i].low;
				}
			}
		} else {
			for ( i = 0; i < prices.length; i += 1 ) {
				if ( prices[i].display_price == 1 ) {
					price = prices[i].amount;
					break;
				}
				else if ( ( !price || prices[i].amount < price ) && prices[i].amount > 0 ) {
					price = prices[i].amount;
				}
			}
		}
		return price;
	});
	
	self.days = ko.computed(function(){
		if(!self.activity()) return;
		if(!(self.activity().times||[]).length) return;

		var times = self.activity().times,
			days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			out = [], ni;
		for(ni = 0; ni < times.length; ni += 1){
			if(!days.hasOwnProperty(times[ni].startDayOfWeek))
				days[times[ni].startDayOfWeek] = {
					name: times[ni].startDayOfWeek,
					times: [],
					name_abbrv: times[ni].startDayOfWeek.substr(0,3)
				};
			days[times[ni].startDayOfWeek].times.push({
				from: times[ni].startDate,
				to: times[ni].endDate,
				time: times[ni].startTime
			});
		}
		//sort on key
		for(ni in days)
			out.push(days[ni]);
		out.sort(function(a,b){ return d[a.name] > d[b.name]; });

		if(out.length == 7){
			return __('Everyday')();
		}
		//make a string
		days = [];
		for(ni = 0; ni < out.length; ni++)
			days.push(__(out[ni].name_abbrv)());
		return days.join(', ');
	});

	self.viewFullSize = function(){
		$ar.load(wb_global_vars['plugin_url'] + '/js/lib/bootstrap-modal-carousel.js', function (){
			self.fullScreenShow(true);
			jQuery('.carousel').carousel({pause: 'hover'});
		});
	};

	self.activity.subscribe(function(activity){
		if(!activity) return;

		jQuery('#activityCarousel').hide();

		self.slideshow([]);
		self.children([]);

		for(ni = 0; ni < (activity.children||[]).length; ni++){
			self.children.push(new WebBooker.ChildActivityView(activity.children[ni]));
		}

		if(!self.children().length){
			//knockout has a rough time keeping up
			setTimeout(function(){
				ko.toJS(activity);
				WebBooker.MiniCart.activity(activity);
			},1);
		}

		//set up the gallery
		if(activity.media && activity.media.length > 0){
			var show = [];
			var columnWidth = jQuery('#webbooker-main').width();
			var makeurl = function(hash, height){
				return WebBooker.mediaServer+'/media/'+hash+'/thumbnail/height/'+height;
			}
			for(ni in activity.media){
				if(activity.media[ni] && activity.media[ni].type == 'image'){
					if(activity.media[ni].url){
						show.push( {
							standard: WebBooker.timthumb + 'tth/400/' + basename(activity.media[ni].url),
							full: WebBooker.timthumb + 'tth/' + WebBooker.galleryImageHeight + '/' + basename(activity.media[ni].url),
							orig: activity.media[ni] 
						} );
					}else if (activity.media[ni].hash) {
						if (activity.media[ni].hasOwnProperty('featured') && activity.media[ni].featured == 'true') {
							if (show.length > 0) {
								show.unshift({
									full : makeurl(activity.media[ni].hash, 700),
									standard : makeurl(activity.media[ni].hash, 400)
								});
							} else {
								show.push({
									full : makeurl(activity.media[ni].hash, 700),
									standard : makeurl(activity.media[ni].hash, 400)
								});
							}
						} else {
							show.push({
								full : makeurl(activity.media[ni].hash, 700),
								standard : makeurl(activity.media[ni].hash, 400)
							});
						}
					}
				}
			}
			self.slideshow(show);
			jQuery('.carousel').carousel({pause: 'hover'});
		}

		// Analytics hook
		WebBooker.Analytics.trigger({
			id: activity.id,
			title: activity.title
		}, 'action_viewActivity');

		if(activity.address_lng && activity.address_lat && !isNaN(activity.address_lng) && !isNaN(activity.address_lat)){
			jQuery(document).ready(function(){
				var map_canvas = document.getElementById('map_canvas');
				if ( map_canvas ) {
					map_canvas.style.width = '100%';
					if(window.innerWidth > 640){
						var mapOptions = {
							zoom: 10,
							center: new google.maps.LatLng(activity.address_lat, activity.address_lng),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false
						};
					} else{
						var mapOptions = {
							zoom: 10,
							center: new google.maps.LatLng(activity.address_lat, activity.address_lng),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							draggable: false
						};
					}
					map = new google.maps.Map(map_canvas, mapOptions);
					
					new google.maps.Marker({
						position: mapOptions.center,
						map: map,
						title:"Activity Location"
					});
				}
			});
		}

		WebBooker.showInitLoader(false);
		WebBooker.hideAllScreens();
		self.show(true);
		if(!window.isIE){
			$ar.load(wb_global_vars['plugin_url'] + '/js/lib/jquery.qrcode.min.js', function() {
				jQuery('#qrcode').qrcode(document.URL);
			});
		}
	});

	self.init = function(){

		if(!WebBooker.bootstrap.activity) {
			return;
		}
			
		if ( WebBooker.bootstrap.activity.status == -1 ) {
			WebBooker.errorMsg('There was a problem loading this activity.');
			return;
		}
		self.activity(WebBooker.bootstrap.activity);
		jQuery('.carousel').carousel({pause: 'hover'});
	};

	return self;
})();
