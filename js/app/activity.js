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
	self.notPastCutoff = ko.observable();

	self.guests = ko.computed(function(){
		if(!self.cartItem() || !Object.keys(self.cartItem().guests()).length) return [];
		return self.cartItem().guests();
	});
	self.canAdd = ko.computed(function(){
		if(!self.cartItem || !self.cartItem() ) return false;
		if(!Object.keys(self.cartItem).length) return false;
		var total = 0,
			g = self.cartItem().guests(),
			ni;
		for(ni = 0; ni < g.length; ++ni)
			total += g[ni].qty();
		return total > 0;
	});
	self.canBook = ko.computed(function() {
		if(!self.inventory()) return false;
		if(!self.cartItem) return false;

		var avai = self.inventory().available,
			inv = self.inventory().inventory,
			cfa = self.cfa();

		if(!self.notPastCutoff())
			return false;
		if(inv === 0 && self.guests().length)
			return true;
		if(avai === 0 && cfa === 0)
			return false;
		if(inv === 0 && avai === 0)
			return false;
		if(inv > 0 || avai > 0){
			if(self.guests().length && (avai <= inv || (avai > inv && cfa))) {
				return true;
			}
		} else {
			return false;
		}
		if(!self.guests().length){
			return false;
		}
	});
	self.availabilityStatus = ko.computed(function() {
		if(self.checkingInventory()) {
			return __('Checking')() + '...';
		}
		if(self.date()) {
			if(self.time()) {
				if(self.notPastCutoff()) {
					if(self.guests().length) {
						if(self.canBook()) {
							return __('Available')();
						}
						return __('Unavailable')();
					}
					return __('No Pricing Available')();
				}
				return __('Past cutoff time')();
			}
			return __('Select a time')();
		}
		return __('Select a date')();
	});

	self.isAvailable = function(nval, pid) {
		function doNotification() {
			if(!self.cartUpdateNotification) {
				self.cartUpdateNotificationStart();
			} else {
				clearTimeout(self.cartUpdateNotification);
				self.cartUpdateNotificationStart();
			}
		};
		
		if ( !self.notPastCutoff() ) {
			$ar.Notification( __('Past cutoff time.'), 'error' );
			return false;
		}
		
		switch(true) {
			case ( nval < 0 ):
				return false;
				break;
				
			case ( self.cfa() == 1 ):
				doNotification();
				return true;
				break;
				
			case ( self.inventory().inventory == 0 ):
				doNotification();
				return true;
				break;
		}

		var max = self.inventory().available, prices = self.cartItem().guests(), ni;
		for ( ni = 0; ni < prices.length; ni++ ) {
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
		if( !self.addToCart() ) return;
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
		time = self.time()=='Open'?'':self.time();

		self.checkingInventory(true);
		if(!self.time()){
			jQuery('#activity-availability > span').effect('pulsate', {times: 2}, 500);
			self.checkingInventory(false);
			return;
		}

		WebBooker.API.checkAvailability({
			id: self.activity().id,
			datetime: createTimestamp(new Date(self.date() + ' ' + (self.time()=='Open'?'':self.time())))
		}, function(data){
			self.checkingInventory(false);
			
			if(data.status > 0){
				self.inventory(data);
				self.cfa(data.cfa);
			} else {
				if(data.status == -10){
					self.inventory(false);
					return false;
				} else if(data.status < 0){
					self.inventory(false);
					return false;
				}
			}

			self.cartItem(null);
			var i = WebBooker.Cart.items(), ni,
				bookDate = ( new Date( self.date() + ' ' + ( self.time() == 'Open' ? '' : self.time() ) ) ).getTime(),
				today = ( new Date() ).getTime(),
				time_diff = bookDate - today,
				cutoff,
				cutoff_hrs = parseInt( self.activity().cutoff_hours ),
				cutoff_mins = parseInt( self.activity().cutoff_minutes );
			
			if ( data.cfa ) {
				// zero inventory left and time left is 48hrs or under, cutoff enabled.
				if ( !data.available && ( time_diff / 3600000 ) <= 48 ) {
					self.notPastCutoff(false);
					self.inventory(false);
					return false;
				}
				else if ( data.available ) {
					// if has inventory left and vendor cutoff is higher than 48hrs, use vendor cutoff
					if ( cutoff_hrs > 48 ) {
						cutoff = new Date( today + ( cutoff_hrs * 3600000 ) + ( cutoff_mins * 60000 ) );
						if ( bookDate <= cutoff.getTime() ) {
							self.notPastCutoff(false);
							self.inventory(false);
							return false;
						} else {
							self.notPastCutoff(true);
						}
					// else default 48 hrs
					} else if ( ( time_diff / 3600000 ) <= 48 ) {
						self.notPastCutoff(false);
						self.inventory(false);
						return false;
					}
				}
			}
			// else if cfa not enabled and vendor set their own cutoff
			else if ( !data.cfa && !isNaN( cutoff_hrs ) && !isNaN( cutoff_mins ) ) {
				cutoff = new Date( today + ( cutoff_hrs * 3600000 ) + ( cutoff_mins * 60000 ) );
				if ( bookDate <= cutoff.getTime() ) {
					self.notPastCutoff(false);
					self.inventory(false);
					return false;
				} else {
					self.notPastCutoff(true);
				}
			}
			// else if activity already started, cutoff enabled.
			else if ( ( time_diff / 60000 ) < 1 ) {
				self.notPastCutoff(false);
				self.inventory(false);
				self.date(false);
				return false;
			}
			
			// all clear, no cutoff
			self.notPastCutoff(true);

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
				if(i[ni].activity != self.activity().id)
					continue;
				if(i[ni].date != self.date() || i[ni].time != self.time())
					continue;
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
	//safe defaults
		if('0000-00-00 00:00:00' == self.activity().date_start){
			var ds = '2001-01-01 00:00:00';
		}else{
			var ds = self.activity().date_start;			
		}
		if('0000-00-00 00:00:00' == self.activity().date_end){
			var de = '2037-01-01 00:00:00';
		}else{
			var de = self.activity().date_end;			
		}
		var weekday = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ],
			times = self.activity().times,
			lifespanDateStart = new Date(ds),
			lifespanDateEnd = new Date(de),
			today = new Date(),
			ni, diff;
			
			
		diff = Math.floor( ( today.getTime() - date.getTime() ) / 86400000 );

		// reject old dates
		if(today > date && diff != 0)
			return [false];
		// check lifespan dates
		if(lifespanDateStart && lifespanDateEnd ){
			if( lifespanDateStart.getTime() > date.getTime() || lifespanDateEnd.getTime() < date.getTime() ){
				return [false];
			}
		}

		// check blackout days
		for(ni = 0; ni < (self.blackoutDays||[]).length; ni++){			
			if(self.blackoutDays[ni].valueOf() != date.valueOf())
				continue;
			return [false];
		}

		var _date = date.valueOf(),
			today = new Date(),
			cutoff_hrs = parseInt(self.activity().cutoff_hours || 0),
			cutoff_minutes = parseInt(self.activity().cutoff_minutes || 0),
			clean;
		//check the calendar date against all the days the activity is on
		for(ni = 0; ni < times.length; ni++){

			if(times[ni].startDayOfWeek && times[ni].startDayOfWeek != weekday[date.getDay()]){
				continue;
			}
			if(times[ni].startDate != "0000-00-00 00:00:00"){
				clean = times[ni].startDate.split('/');
				if(clean.length > 1 && clean[2].length == 2) clean[2] = '20'+clean[2];
				times[ni].startDate = clean.join('/');
			}
			if(times[ni].endDate != "0000-00-00 00:00:00"){
				clean = times[ni].endDate.split('/');
				if(clean.length > 1 && clean[2].length == 2) clean[2] = '20'+clean[2];
				times[ni].endDate = clean.join('/');
			}
			
			var time_diff = Math.floor( ( ( new Date( date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + times[ni].startTime ) ).getTime() - today.getTime() ) / 60000 ),
				cutoff_mins = ( cutoff_hrs * 60 ) + cutoff_minutes;
			
			if( time_diff <= 0 || ( cutoff_mins >= time_diff && !self.cfa() ) ){
				return[false];
			}
			if(
				( times[ni].startDate == "0000-00-00 00:00:00" || ( new Date(times[ni].startDate.replace(/-/g, '/')) ).valueOf() <= _date ) &&
				( times[ni].endDate == "0000-00-00 00:00:00" || ( new Date(times[ni].endDate.replace(/-/g, '/')) ).valueOf() >= _date )
			)
				return [true];
		}
		return [false];
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
	self._grabDays = function(){
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
				startDate: times[ni].startDate,
				endDate: times[ni].endDate,
				startTime: times[ni].startTime
			});
		}
		//sort on key
		for(ni in days)
			out.push(days[ni]);
		out.sort(function(a,b){ return d[a.name] > d[b.name]; });
		return out;
	};
	self.getTimestamp = ko.computed(function() {
		if(!self.date() || !self.time())
			return;
		var time = (self.time() == 'Open') ? '' : self.time();
		return createTimestamp(new Date(self.date() + ' ' + time));
	});

	self.activity.subscribe(function(activity){
		self.date(null);
		self.blackoutDays = [];
		self.cfa(activity.cfa);

		var blackouts = activity.blackouts||[],
			curr_date, end_date, ni;

		//get the dates for each blackout date range and append them to blackoutDays

		for(ni = 0; ni < blackouts.length; ni++) {
			//ff and IE are dumb
			blackouts[ni].startDate = blackouts[ni].startDate.replace(/-/g, '/');
			blackouts[ni].endDate = blackouts[ni].endDate.replace(/-/g, '/');		
			//generate a list of dates from a range
			curr_date = new Date(blackouts[ni].startDate);
			end_date = new Date(blackouts[ni].endDate);
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
			days = self._grabDays(),
			today = new Date(),
			date_diff = Math.floor( ( today.getTime() - day.getTime() ) / 86400000 ),
			ni,no;

		for(ni = 0; ni < days.length; ni++){
			if(days[ni].name != date) continue;
			for(no = 0; no < days[ni].times.length; no++){
				var time = days[ni].times[no];
				
				if(time.startDate && time.startDate !== '' && time.startDate !== '0000-00-00 00:00:00' && (new Date(time.startDate)) > day){
					continue;
				}
				if(time.endDate && time.endDate !== '' && time.endDate !== '0000-00-00 00:00:00' && (new Date(time.endDate)) < day){
					continue;
				}
				if(self.times.indexOf(time.startTime)>=0){
					continue;
				}
				if ( date_diff == 0 && today.getTime() >= ( new Date( newValue + ' ' + time.startTime ).getTime() ) ) {
					continue;
				}
				self.times.push(time.startTime);
			}
			if(self.times().length === 1)
				self.time(self.times()[0]);
			break;
		}
		self.times.sort( function( a, b ) {
			return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
		} );
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
					}
					else if(activity.media[ni].hash){
					    if(activity.media[ni].featured == 'true'){
					        if(show.length > 0){
					            show.unshift({
                                    full: makeurl(activity.media[ni].hash,700),
                                    standard: makeurl(activity.media[ni].hash,400)
                                });
                            }else{
        						show.push({
        							full: makeurl(activity.media[ni].hash,700),
        							standard: makeurl(activity.media[ni].hash,400)
        						});                                
                            }
                        }else{
    						show.push({
    							full: makeurl(activity.media[ni].hash,700),
    							standard: makeurl(activity.media[ni].hash,400)
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
		if(!WebBooker.bootstrap.activity)
			return;
			
		if ( WebBooker.bootstrap.activity.status == -1 ) {
			WebBooker.errorMsg('There was a problem loading this activity.');
			return;
		}

		self.activity(WebBooker.bootstrap.activity);
	};

	return self;
})();
