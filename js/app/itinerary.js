/**
 *	ActivityRez Web Booker
 *	Itinerary File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker
 */

//compresses to 936 B

WebBooker.Itinerary = (function(){
	var self = {
		show: ko.observable(false),
		sale: $ar.SaleModel(),
		loading: ko.observable(false),
		loaded: ko.observable(false),

		errorMsg: ko.observable(),
	};

	self.show.subscribe(function(value) {
		if(value) {
			// Analytics hook.
			WebBooker.Analytics.trigger({}, 'action_Itinerary');
		}
	});

	self.reset = function(){
		self.loading(false);
		self.errorMsg(null);
		self.loaded(false);
		self.sale.id('');
		self.sale.leadGuest.email('');
	};

	self.load = function(){
		if(!self.sale.leadGuest.email() && !WebBooker.Agent.user_id()) {
			self.errorMsg(__('E-mail address is missing.')());
			return false;
		}

		if(!self.sale.id()) {
			self.errorMsg(__('Reservation number is missing.')());
			return false;
		}

		self.loaded(false);
		self.loading(true);
		self.errorMsg(null);

		self.sale.load(function(result){
			self.loading(false);
			if(result.status != 1) {
				self.loaded(false);
				self.errorMsg(__(result.msg)());
				return;
			}
			
			self.loaded(true);
			
			WebBooker.Analytics.trigger( result.data, 'action_viewItinerary' );
		});
	};
	self.popupError = ko.observable(false);
	self.popupErrorClose = function(){
		self.popupError(false);
	}
	self.printTickets = function(args) {
		var params = {
			saleID: args.id || self.sale.id(),
			output: 'html',
			email: args.email || self.sale.leadGuest.email()
		};
		WebBooker.API.doItineraryAction(params, function(data) {
			var itineraryWindow = window.open('');
			if(!itineraryWindow || itineraryWindow.closed || typeof itineraryWindow.closed=='undefined'){ 
				self.popupError(true);
			}
			if(itineraryWindow){
				itineraryWindow.document.write(data.data);
				itineraryWindow.focus();
			}
		});
	};

	return self;
})();
