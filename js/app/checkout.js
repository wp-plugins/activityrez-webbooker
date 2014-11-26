/**
 *	ActivityRez Web Booking Engine
 *	Checkout File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 20348 B

$ar = $ar||{};
WebBooker = WebBooker||{};

$ar.CreditCardModel = function(data){
	var that = $ar.Model({
		number: '',
		year: '',
		month: '',
		code: ''
	},$ar.data_mapper({
		'cc_number':'number'
	},data));

	for(var ni in that){
		if(typeof that[ni] == 'function')
			continue;
		that[ni] = ko.observable(that[ni]);
	}

	var luhnCheck = function(s){
		var i, n, c, r;

		// First, reverse the string and remove any non-numeric characters.
		// we're also turing it into an array now
		r = s.replace(/[^\d]/g,'').split("").reverse();
		if (r.length <= 1)
			return false;

		// Now run through each single digit to create a new string. Even digits
		// are multiplied by two, odd digits are left alone. Then add the string
		// digits (13 -> '1' + '3' -> 4)

		n = 0;
		for(i = 0; i < r.length; i++){
			c = parseInt(r[i], 10) * ((i % 2)+1);
			n += c%10 + Math.floor(c/10);
		}

		// If the resulting sum is an even multiple of ten (but not zero), the
		// card number is good.
		if(n > 0 && n % 10 === 0)
			return true;
		return false;
	};

	that.errors = ko.observableArray([]);
	that.numberValidate = function(){
		that.errors([]);
		if(!that.number()){
			that.errors.push(__('Card number is required.')());
		}
		if(!luhnCheck(that.number()) || !that.type()){
			that.errors.push(__('Invalid card number.')());
		}
	};
	that.validate = function(){
		that.numberValidate();
		if(!that.year()){
			that.errors.push(__('Card expiration year is required.')());
		}
		if(!that.month()){
			that.errors.push(__('Card expiration month is required.')());
		}
		if(!that.code()){
			that.errors.push(__('Card security code is required.')());
		}
		return that.errors().length === 0;
	};
	that.type = ko.computed(function(){
		if(/^4[0-9]{12}(?:[0-9]{3})?$/.test(that.number())) {
			return 'visa';
		}
		if(/^5[1-5][0-9]{14}$/.test(that.number())) {
			return 'mastercard';
		}
		if(/^3[47][0-9]{13}$/.test(that.number())) {
			return 'amex';
		}
		if(/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(that.number()) || /^35(?:2[89]|[3-8]\d)([\ \-]?)\d{4}\1\d{4}\1\d{4}$/.test(that.number())) {
			return 'discover';
		}
		return false;
	});

	that.number.subscribe(that.numberValidate);

	return that;
};
$ar.CheckoutItemModel = function(data){
	var that = $ar.Model({
		activity: 0,
		date: null,
		i18n_date: null,
		time: null,

		url: '',
		title: '',
		destination: '',

		directions_url: '',
		instructions: '',

		cfa: false,
		pending: false,
		inventory: 0,
		tickets: [],

		discounts: [],
		options: [],
		fees: [],
		transportation: [],
		transport: null,
		row_id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
	});
	that._json_callback = function(beans){
		if(!beans) return;

		beans.tickets = beans.tickets||[];
		beans.options = beans.options||[];
		beans.transportation = beans.transportation||[];
		beans.fees = beans.fees||[];
		
		if(beans.cfa && !beans.inventory) {
			beans.pending = 1;
		}

		var ni;
		for(ni = 0; ni < beans.tickets.length; ni++) {
			beans.tickets[ni] = $ar.CheckoutTicketModel(beans.tickets[ni]);
		}
		for(ni = 0; ni < beans.fees.length; ni++) {
			beans.fees[ni] = $ar.FeeModel(beans.fees[ni]);
		}
		for(ni = 0; ni < beans.options.length; ni++) {
			beans.options[ni] = $ar.OptionModel(beans.options[ni]);
		}
		for(ni = 0; ni < beans.transportation.length; ni++) {
			beans.transportation[ni] = $ar.TransportationModel(beans.transportation[ni]);
		}
	};
	that.json(data);

	that.url = ko.observable(that.url);
	that.title = ko.observable(that.title);
	that.destination = ko.observable(that.destination);
	that.instructions = ko.observable(that.instructions);
	that.cfa = ko.observable(that.cfa);
	that.inventory = ko.observable(that.inventory);

	that.copyToAll = ko.observable( (wb_global_vars.guest_copytoall == 'true') ? true : false ); //keep this false. pleasant will lose their shit if this is checked by default.
	that.cartItem = (data?data.cartItem:false)||null;
	that.pending = ko.observable(that.pending);
	that.fees = ko.observableArray(that.fees||[]);
	
	that.transport = ko.observable(that.transport);
	that.transport.subscribe(function(transport) {
		that.makeTransportMaster( that.transportView );
	});
	that.transportation = ko.observableArray(that.transportation||[]);
	that.transportation.subscribe(function(nval){
		var no, ni, out = [], outtix = [], tickets = that.tickets();
		if ( that.transport() ) {
			return false;
		}
		for(no = 0; no < nval.length; no++){
			// don't add transp options that are outside the date range
			var date_start = (nval[no].start && nval[no].start != '0000/00/00 00:00:00') ? (new Date(nval[no].start)).getTime() : false,
				date_end = (nval[no].end && nval[no].end != '0000/00/00 00:00:00') ? (new Date(nval[no].end)).getTime() : false,
				act_date = (new Date(that.date + ' ' + that.time)).getTime();
			
			if ( date_start && date_end ) {
				if ( act_date < date_start || act_date > date_end ) {
					continue;
				}
			} else if ( date_start && !date_end ) {
				if ( act_date < date_start ) {
					continue;
				}
			} else if ( date_end && !date_start ) {
				if ( act_date > date_end ) {
					continue;
				}
			}
			
			out.push($ar.TransportationModel(nval[no].json()));
			outtix.push(nval[no].json());
		}
		that.transportView.transportation( out );
		for ( no = 0; no < tickets.length; no += 1 ) {
			if ( tickets[no].transport() ) {
				continue;
			}
			for ( ni = 0; ni < outtix.length; ni += 1 ) {
				tickets[no].transportView.transportation.push( $ar.TransportationModel( outtix[ni] ) );
			}
		}
	});
	that.transportView = $ar.TransportView();
	that.transportView.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni,
			setTransport = function(item){
				return function(_nval){
					if(!_nval) {
						that.transport(null);
					} else {
						that.transport(item);
					}
				};
			};

		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((setTransport)(nval[ni]));
		}
	});
	that.transportView.hotel.subscribe(function(nval){
		if(!nval)
			that.transport(null);
	});
	that.transportView.room.subscribe(function(val) {
		that.makeTransportMaster( that.transportView );
	});
	that.transportView.selectTransport.subscribe(function(val) {
		if ( val == 'false' ) {
			that.makeTransportsFalse();
		} else if ( val == 'empty' ) {
			that.undoTransportMaster();
		} else {
			that.makeTransportMaster( that.transportView );
		}
	});
	that.transportView.row_id = that.row_id;
	
	that.options = ko.observableArray(that.options||[]);
	that.options.subscribe(function(nval){
		var tix = that.tickets(),
			open = false,
			ni, no, out;
		for(ni = 0; ni < nval.length; ni++){
			if(nval[ni].required){
				open = true;
			}
		}
		for(ni = 0; ni < tix.length; ni++){
			if(tix[ni].options().length) continue;
			out = [];
			for(no = 0; no < nval.length; no++){
				out.push($ar.OptionModel(nval[no].json()));
			}
			tix[ni].options(out);
			if(open || ni === 0) {
				tix[ni].showOptions(true);
			}
		}
	});
	that.tickets = ko.observableArray(that.tickets||[]);

	that.guests = ko.computed(function(){
		var tix = that.tickets(),
			guests = {},
			out = [],
			ni,no,fees;
		for(ni = 0; ni < tix.length; ni++){
			if(!guests[tix[ni].id]){
				guests[tix[ni].id] = {
					name: __(tix[ni].name)(),
					price: tix[ni].price(),
					qty: 0
				};
			}
			guests[tix[ni].id].qty++;
		}
		for(ni in guests){
			fees = that.fees()||[];
			guests[ni].fees = 0;
			for(no = 0; no < fees.length; no++){
				if(fees[no].percentage)
					guests[ni].fees += guests[ni].price * guests[ni].qty * fees[no].percentage;
				else
					guests[ni].fees += fees[no].amount * guests[ni].qty;
			}
			guests[ni].total = guests[ni].price * guests[ni].qty;
			out.push(guests[ni]);
		}
		return out;
	}).extend({ throttle: 10 });

	that.validate = function(){
		var valid = true,
			tix = that.tickets(),
			lead = tix[0].options(),
			opt, ni, no;
		for( ni = 0; ni < tix.length; ni++ ) {
			if( that.copyToAll() ) {
				opt = tix[ni].options();
				for(no = 0; no < opt.length; no++){
					opt[no].json(lead[no].json());
				}
			}
			valid = valid && tix[ni].validate();
		}
		return valid;
	};

	//this function is super ugly because of json_input on the activity
	//and the way options are stored on tickets. Guarenteed to break.
	that.parseOptions = function(_json){
		var tix = that.tickets(),
			hash = {},
			opt,ni,no,items;
			
		for(ni = 0; ni < tix.length; ni++)
			hash[tix[ni].ticket_id] = tix[ni];
		for(ni = 0; ni < _json.length; ni++){
			if(!hash.hasOwnProperty(parseInt(_json[ni].ticketID,10))) continue;
			if(_json[ni].type != 'criteria') continue;
			opt = hash[parseInt(_json[ni].ticketID,10)].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].name != _json[ni].name) continue;
				if(/^\s*(dropdown|combo)\s*$/.test(opt[no].type.toLowerCase())){
					items = opt[no].items();
					for(na = 0; na < items.length; na++){
						if(items[na].name == _json[ni].value){
							opt[no].selectedItem(items[na]);
						}
					}
				}
			}
		}
	};

	that.remove = function(){
		if(that.cartItem)
			WebBooker.Cart.items.remove(that.cartItem);
		WebBooker.Checkout.sale.items.remove(that);
	};

	that.removeGuest = function(poo){
		var ni, guests;
		that.tickets.remove(poo);
		if(!that.tickets().length) {
			that.remove();
		} else if( that.cartItem ) {
			guests = that.cartItem.guests();
			for ( ni = 0; ni < guests.length; ni += 1 ) {
				if ( guests[ni].id === poo.id ) {
					guests[ni].qty( guests[ni].qty() - 1 );
				}
			}
		}
	};

	that.ticketTotal = ko.computed(function(){
		var tix = that.tickets(),
			sub = 0,
			ni,no;
		for(ni = 0; ni < tix.length; ni++){
			sub += tix[ni].price();
		}
		return sub;
	}).extend({ throttle: 10 });
	that.optionTotal = ko.computed(function(){
		var tix = that.tickets()||[],
			fees = that.fees()||[],
			toAll = that.copyToAll()&&tix[0]?tix[0].options():false,
			sub = 0,
			ni, no, opt;
		for(ni = 0; ni < tix.length; ni++){
			for(no = 0; no < fees.length; no++){
				sub += Math.round(fees[no].price(tix[ni].price())*100)/100;
			}

			opt = toAll||tix[ni].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].type.toLowerCase() == 'text') continue;
				if(!opt[no].selectedItem()) continue;
				sub += opt[no].selectedItem().fee||0;
			}
		}
		return sub;
	}).extend({ throttle: 10 });
	that.transportTotal = ko.computed(function(){
		var tix = that.tickets(),
			sub = 0,
			ni;
		for(ni = 0; ni < tix.length; ni++){
			if(!tix[ni].transportView.wantsTransport()) continue;
			/*if(that.transportMaster() && that.transportMaster().transport()){
				if ( that.transportMaster().transportView.hotel() ) {
					WebBooker.Checkout.sale.leadGuest.hotel( $ar.HotelModel(that.transportMaster().transportView.hotel().json()) );
					WebBooker.Checkout.sale.leadGuest.room( that.transportMaster().transportView.room() );
				}
				sub += that.transportMaster().transport().amount;
				continue;
			}*/
			if(tix[ni].transport() && tix[ni].transport().amount) {
				sub += tix[ni].transport().amount;
			}
			/*if ( !that.transportMaster() && tix[ni].transport() && tix[ni].transportView.hotel() ) {
				WebBooker.Checkout.sale.leadGuest.hotel( $ar.HotelModel(tix[ni].transportView.hotel().json()) );
				WebBooker.Checkout.sale.leadGuest.room( tix[ni].transportView.room() );
			}*/
		}
		return sub;
	}).extend({ throttle: 10 });
	that.subtotal = ko.computed(function(){
		var sub = that.ticketTotal();
		sub += that.optionTotal();
		sub += that.transportTotal();
		return sub;
	}).extend({ throttle: 10 });
	that.taxTotal = function(discount){
		var tix = that.tickets()||[],
			fees = that.fees()||[],
			toAll = that.copyToAll()&&tix[0]?tix[0].options():false,
			//masterTran = that.transportMaster() && that.transportMaster().transport()?that.transportMaster().transport().amount:false,
			dis = discount||{ rate: 0, amount: 0 },
			taxRate = WebBooker.bootstrap.taxRate,
			sub = 0,
			dis_r = parseFloat(dis.rate),
			dis_a = parseFloat(dis.amount),
			ni, no, tix_sub;

		for(ni = 0; ni < tix.length; ni++){
			tix_sub = tix[ni].price();
			for(no = 0; no < fees.length; no++){
				tix_sub += fees[no].price(tix[ni].price());
			}

			opt = toAll||tix[ni].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].type.toLowerCase() == 'text') continue;
				if(!opt[no].selectedItem()) continue;
				tix_sub += opt[no].selectedItem().fee||0;
			}

			if(tix[ni].transportView.wantsTransport()){
				//if(masterTran){
				//	tix_sub += masterTran;
				//} else 
				if(tix[ni].transport() && tix[ni].transport().amount){
					tix_sub += tix[ni].transport().amount;
				}
			}
			tix_sub = tix_sub - ((dis_r*tix_sub) / 100) - dis_a;
			sub += Math.round(tix_sub * taxRate)/100;
		}

		return sub;
	};

	//this function connects an item in the cart to this checkout item
	that.connectCart = function(cartItem){
		that.cartItem = cartItem;
		that.json(cartItem.json());
		
		var guests = cartItem.guests(),
			data,qty,ni,no;

		var tickets = [];
		for(ni = 0; ni < guests.length; ni++){
			qty = guests[ni].qty();
			for(no = 0; no < qty; no++){
				data = {
					id: guests[ni].id,
					name: guests[ni].name,
					price: guests[ni].price()
				};
				if(that.options().length){
					data.options = that.options();
				}
				tickets.push($ar.CheckoutTicketModel(data));
			}
		}
		that.tickets(tickets);
	};
	that.load = function(_callback){
		if(!that.activity){
			if(typeof _callback == 'function')
				_callback();
			return;
		}

		var params = {
			id: that.activity,
			date: createTimestamp(new Date(that.date + (that.time.startTime == 'Open'?'': ' ' + that.time.startTime))),
			currency: WebBooker.selectedCurrency().title
		};
		WebBooker.API.betterGetActivity(params,function(result){
			that.cfa(result.inventory.cfa);
			that.inventory(result.inventory.available);
			
			if ( result.inventory.cfa && result.inventory.available <= 0 ) {
				that.pending(1);
			}

			that.title(result.title);
			that.destination(__(result.destination)());
			that.url(WebBooker.bootstrap.wb_url + '/' + result.slug + '/');
			that.instructions(result.instructions);

			var tix = that.tickets(),
				guests = that.cartItem?that.cartItem.guests():[],
				prices = {};
				
			//adjust the prices of all the tickets
			for(ni = 0; ni < result.prices.length; ni++){
				prices[result.prices[ni].guest_type_id] = result.prices[ni];
			}
			for(ni = 0; ni < tix.length; ni++){
				if(!prices[tix[ni].id]) continue;
				tix[ni].price(parseFloat(prices[tix[ni].id].amount));
			}
			for(ni = 0; ni < guests.length; ni++){
				if(!prices[guests[ni].id]) continue;
				guests[ni].price(prices[guests[ni].id].amount / prices[guests[ni].id].rate);
			}
			that.tickets.valueHasMutated();
			if(that.cartItem) {
				that.cartItem.guests.valueHasMutated();
			}

			var crit = result.criteria||[];
			for(ni = 0; ni < crit.length; ni++){
				crit[ni] = $ar.OptionModel(crit[ni]);
			}
			that.options(crit);
			
			var transport = result.transport||[];
			for(ni=0;ni<transport.length;ni++){
				transport[ni] = $ar.TransportationModel(transport[ni]);
			}
			that.transportation(transport);

			var fee = result.fees||[];
			for(ni = 0; ni < fee.length; ni++){
				fee[ni] = $ar.FeeModel(fee[ni]);
			}
			that.fees(fee);

			if(typeof _callback == 'function'){
				_callback();
			}
		});
	};
	that.save = function(sale_id, _callback){
		var tix = that.tickets()||[],
			tix_num = 0,
			ni;

		//if(that.transportMaster() && that.transportMaster().transport()){
		//	for(ni = 0; ni < tix.length; ni++){
		//		tix[ni].transport($ar.TransportationModel(that.transportMaster().transport().json()));
		//	}
		//}
		var parse_tix = function(result){
			if(!--tix_num && typeof _callback == 'function'){
				_callback();
			}
		};
		for(ni = 0; ni < tix.length; ni++){
			tix_num++;
			tix[ni].save(that, sale_id,parse_tix);
		}
	};
	that.transportMaster = ko.observable(false);
	that.makeTransportMaster = function(item){
		var tix = that.tickets(), ni;
		if ( !that.transport() ) return;
		for(ni = 0; ni < tix.length; ni++){
			if ( tix[ni].transportView.selectTransport() === 'false' ) {
				continue;
			}
			tix[ni].transportView.selectTransport('true');
			tix[ni].transportView.wantsTransport(true);
			tix[ni].transportView.selectedTransType(item.selectedTransType());
			tix[ni].transportView.locationSelect(item.locationSelect());
			tix[ni].transport( $ar.TransportationModel( that.transport().json() ) );
			if(item.locationSelect() == 'hotel' && item.hotel()) {
				tix[ni].transportView.hotel($ar.HotelModel(item.hotel().json()));
				tix[ni].transportView.room(item.room());
			} else if(item.locationSelect() == 'address' && item.lat()) {
				tix[ni].transportView.lat(item.lat());
				tix[ni].transportView.lng(item.lng());
				tix[ni].transportView.home.address(item.home.address());
				tix[ni].transportView.home.city(item.home.city());
				tix[ni].transportView.home.state(item.home.state());
				tix[ni].transportView.home.postal(item.home.postal());
				tix[ni].transportView.home.country(item.home.country());
			}
			//if(tix[ni].transportView == item){
			//	that.transportMaster(!!!tix[ni].transportView.master()?tix[ni]:null);
			//	tix[ni].transportView.master(!!!tix[ni].transportView.master());
			//	continue;
			//}
			//tix[ni].transportView.master(false);
			for ( var no = 0; no < tix[ni].transportView.transportation().length; no += 1 ) {
				var transp = tix[ni].transportView.transportation()[no];
				if ( transp.name == that.transport().name ) {
					transp.selected(true);
				} else {
					transp.selected(false);
				}
			}
		}
	};
	that.undoTransportMaster = function() {
		var tix = that.tickets(), ni;
		//that.transportMaster(false);
		for ( ni = 0; ni < tix.length; ni += 1 ) {
			tix[ni].transport(null);
			//tix[ni].transportView.master(false);
			tix[ni].transportView.selectTransport('empty');
			tix[ni].transportView.wantsTransport(false);
			tix[ni].transportView.selectedTransType(null);
			tix[ni].transportView.locationSelect(false);
			tix[ni].transportView.hotel(null);
			tix[ni].transportView.room(null);
			tix[ni].transportView.lat(null);
			tix[ni].transportView.lng(null);
			tix[ni].transportView.home.address('');
			tix[ni].transportView.home.city('');
			tix[ni].transportView.home.state('');
			tix[ni].transportView.home.postal('');
			tix[ni].transportView.home.country('');
		}
	};
	that.makeTransportsFalse = function() {
		var tix = that.tickets(), ni;
		//that.transportMaster(false);
		for ( ni = 0; ni < tix.length; ni += 1 ) {
			tix[ni].transport(null);
			//tix[ni].transportView.master(false);
			tix[ni].transportView.selectTransport('false');
			tix[ni].transportView.wantsTransport(false);
		}
	};
	
	that.i18n_date = function(){
		if( typeof that.time === 'object' ) {
			var time = new Date(that.date + (that.time.startTime=='Open'?' ':' ' + that.time.startTime));
		} else {
			var time = new Date(that.date + (that.time == 'Open'?'': ' ' + that.time));
		}
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
				   date;
		switch( i18n ) {
			case 'ja' 	:	//iso
			case 'zh_SG':
			case 'zh_TW':
			case 'zh_HK':
			case 'zh_CN':
			case 'ko_KR':
							date =  time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
							break;			
			case 'en_GB':	//euro
			case 'en_AU':
			case 'en_AG':
			case 'cs_CZ':
			case 'da_DK':
			case 'nl_NL':
			case 'fi_FI':
			case 'fr_FR':
			case 'fr_BE':
			case 'fr_CA':
			case 'de_DE':
			case 'de_AT':
			case 'el_GR':
			case 'it':
			case 'in_IN':
			case 'ms_MY':
			case 'ml_IN':
			case 'no_NO':
			case 'nb_NO':
			case 'nn_NO':
			case 'pl_PL':
			case 'pt_BR':
			case 'pt_PT':
			case 'ru_RU':
			case 'es_ES':
			case 'es_AR':
			case 'es_MX':
			case 'es':
			case 'sv_se':
			case 'th':
			case 'vi':
							date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
							break;
			case 'en_US':	//us original
			case 'en_CA':
			default		:	date = (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
		}
		return date;
	};
	
	return that;
};
$ar.TransportView = function(data){
	var self = $ar.Model({
		master: false,
		transportation: [],
		wantsTransport: 'empty',
		locationSelect: false,
		hotel: null,
		room: null,
		home: {
			address: ko.observable(''),
			city: ko.observable(''),
			state: ko.observable(''),
			postal: ko.observable(''),
			country: ko.observable('')
		},
		lat: null,
		lng: null,
		stored_lat: null,
		stored_lng: null,
		showMoreTransports: false,
		map: null,
		row_id: null,
		map_container: null
	});

	self.drawMap = function() {
		if(!self.map_container)
			self.map_container = document.getElementById(self.row_id).getElementsByClassName('map-canvas')[0];

		var options = {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				maxZoom: 22,
				scrollwheel: false,
				zoom: 18
			};

		self.map_container.style.display = 'block';
		self.map = new google.maps.Map(self.map_container, options);
		self.map_container.style.display = 'none';
	};

	self.doGeocode = function() {
		if(!self.home.address() || !self.home.city() || !self.home.state() || !self.home.postal() || !self.home.country()) return;
		var address = self.home.address() + ' ' + self.home.city() + ' ' + self.home.state() + ' ' + self.home.postal() + ' ' + self.home.country()['alpha-2'];
		if(!self.map_container) {
			self.map_container = document.getElementById(self.row_id).getElementsByClassName('map-canvas')[0];
		}

		$ar.Geocoder.geocode({ address: address }, function(results) {
			var loc = results[0].geometry.location;
			self.stored_lat(loc.lat());
			self.stored_lng(loc.lng());
			self.map_container.style.display = 'block';
			self.map = new google.maps.Map(self.map_container, {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				maxZoom: 22,
				scrollwheel: false,
				zoom: 18,
				center: new google.maps.LatLng(loc.lat(), loc.lng())
			});
			new google.maps.Marker({
				map: self.map,
				position: loc,
				draggable: false,
				animation: google.maps.Animation.DROP
			});
		});
	};

	self.acceptGeocode = function() {
		self.lat(self.stored_lat());
		self.lng(self.stored_lng());
		self.stored_lat(null);
		self.stored_lng(null);
		self.map_container.style.display = 'none';
		self.map = null;
	};

	self._json_callback = function(beans){
		beans = beans||{};
		beans.home = beans.home||{};
		beans.home = {
			address: ko.observable(beans.home.address),
			city: ko.observable(beans.home.city),
			state: ko.observable(beans.home.state),
			postal: ko.observable(beans.home.postal),
			country: ko.observable(beans.home.country)
		};
	};

	self.master = ko.observable(self.master);

	self.transportation = ko.observableArray(self.transportation);
	self.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni;
		var clean_house = function(item){
			return function(_nval){
				if(!_nval) return;
				var trans = self.transportation(),
					no;
				for(no = 0; no < trans.length; no++){
					if(trans[no] == item) continue;
					trans[no].selected(false);
				}
			};
		};
		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((clean_house)(nval[ni]));
		}
	});
	self.transportationTypes = ko.computed(function() {
		var types = [__('Any')()], ni;
		for ( ni = 0; ni < self.transportation().length; ni += 1 ) {
			var trans = self.transportation()[ni],
				vehicle = decodeURIComponent(trans.vehicle);//Remove URL Encoding if there
				vehicle = __( trans.vehicle.charAt(0).toUpperCase() + trans.vehicle.slice(1) )();
			
			if ( jQuery.inArray( vehicle, types ) < 0 ) {
				types.push( vehicle );
			}
		}
		return types;
	});
	self.selectedTransType = ko.observable();
	self.selectTransport = ko.observable(self.wantsTransport);
	self.selectTransport.subscribe(function(value) {
		if ( value == 'empty' || value == 'false' ) {
			self.wantsTransport(false);
		} else if ( value == 'true' ) {
			self.wantsTransport(true);
		}
	});
	self.wantsTransport = ko.observable( ( self.wantsTransport == 'empty' ) ? false : self.wantsTransport );
	self.locationSelect = ko.observable(self.locationSelect);
	if(WebBooker.bootstrap.agencyID == 1260) {
		// TODO - We should not hard-code clients like this. Let's make it manageable
		// from the Admin, i.e. option to set default hotel on a Web Booker.
		self.hotel = ko.observable( $ar.HotelModel( {
			'ID': 18655,
			'hotel_addr1': '92-1185 Aliinui Dr',
			'hotel_addr2': '',
			'hotel_city': 'Kapolei',
			'hotel_country': 'US',
			'hotel_lat': '21.33914939329752',
			'hotel_lng': '-158.12336684232787',
			'hotel_phone': '(808) 674-6200',
			'hotel_st': 'HI',
			'hotel_zip': '96707',
			'name': 'Aulani Resort & Spa'
		} ) );
	} else {
		self.hotel = ko.observable(self.hotel);
	}
	self.room = ko.observable(self.room);

	self.lat = ko.observable(self.lat);
	self.lng = ko.observable(self.lng);
	self.stored_lat = ko.observable(self.stored_lat);
	self.stored_lng = ko.observable(self.stored_lng);

	self.showMoreTransports = ko.observable(self.showMoreTransports);
	self.transportsToShow = ko.computed(function(){
		if(!self.locationSelect()) return [];
		var transports = [],
			location = {},
			location_select = self.locationSelect();

		if(location_select == 'hotel') {
			location = self.hotel();
		}else if(self.lat() && self.lng()) {
			location.lat = parseFloat(self.lat());
			location.lng = parseFloat(self.lng());
		}
		if(!location)
			return [];
		if(!location.lat || !location.lng)
			return [];
		
		for ( var ni = 0; ni < self.transportation().length; ni += 1 ) {
			var transport = self.transportation()[ni];
			transport.distance = getDistance(transport.lat, transport.lng, location.lat, location.lng, 'M');
			if ( self.selectedTransType() && ( self.selectedTransType() === __( transport.vehicle.charAt(0).toUpperCase() + transport.vehicle.slice(1) )() || self.selectedTransType() === __('Any')() ) ) {
				transports.push(transport);
			}
		}

		if ( transports.length ) {
			transports.sort(sortNearestDistance);
			transports[0].selected(true);
		}

		if(!self.showMoreTransports())
			return transports.slice(0,3);
		return transports;
	});
	self.toggleTransportMore = function(){
		self.showMoreTransports(!!!self.showMoreTransports());
	};

	return self;
};
$ar.CheckoutTicketModel = function(data){
	var that = $ar.Model({
		ticket_id: 0,
		row_id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),

		id: 0,
		name: '',
		price: 0,

		first_name: '',
		last_name: '',

		options: [],
		transport: null,
		editTransport: false
	});
	that._json_callback = function(beans){
		if(!beans) return;
		beans.options = beans.options||[];
		var ni;
		for(ni = 0; ni < beans.options.length; ni++)
			beans.options[ni] = $ar.OptionModel(beans.options[ni]);
		if(beans.transport) beans.transport = $ar.TransportationModel(beans.transport);
	};
	that.json(data);

	that.price = ko.observable(that.price||0);
	that.first_name = ko.observable(that.first_name||'');
	that.last_name = ko.observable(that.last_name||'');
	that.options = ko.observableArray(that.options||[]);
	that.showOptions = ko.observable(true);

	that.editTransport = ko.observable(that.editTransport||false);
	that.transport = ko.observable(that.transport);
	that.hotelRoom = ko.observable('');
	that.transportView = $ar.TransportView();
	that.transportView.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni,
			setTransport = function(item){
				return function(_nval){
					if(!_nval) that.transport(null);
					else that.transport(item);
				};
			};

		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((setTransport)(nval[ni]));
		}
	});
	that.transportView.hotel.subscribe(function(nval){
		if(!nval)
			that.transport(null);
	});

	that.transportView.row_id = that.row_id;

	that.toggleEditTransport = function() {
		that.editTransport( that.editTransport() ? false : true );
	};

	that.validate = function(){
		var valid = true,
			opt = that.options(),
			ni;
		for(ni = 0; ni < opt.length; ni++){
			valid = valid && opt[ni].validate();
		}
		if( that.transportView.transportation().length > 0 && that.transportView.selectTransport() == 'empty' ) {
			valid = false;
		}
		if( that.transportView.wantsTransport() ) {
			if( !that.transport() || 
				!that.transportView.locationSelect() || 
				( that.transportView.locationSelect() == 'hotel' && ( !that.transportView.hotel() || !that.transportView.room() ) ) ||
				( that.transportView.locationSelect() == 'address' && !that.transportView.lat() ) ) {
				valid = false;
			}
		}
		if(!valid) that.showOptions(true);
		return valid;
	};
	that.toggleOptions = function(){
		that.showOptions(!that.showOptions());
	};

	that.save = function(guest,sale_id,_callback){
		var a_cfa = guest.cfa && !guest.inventory;
		var ticket = {
			aid: guest.activity,
			sid: sale_id,
			timestamp: createTimestamp(new Date(guest.date + (guest.time.startTime=='Open'?' ':' ' + guest.time.startTime))),
			guest_type_id: that.id,
			guest_type: that.name,
			//leadGuest: guest.lead(),
			lead_guest_hotel: (that.transportView.hotel()||{ json:function(){ return null; }}).json(),
			cfa: guest.cfa,
			cfa_name: '',
			cfa_number: '',
			firstName: that.first_name(),
			lastName: that.last_name()
		};
		WebBooker.API.saveTicket(ticket, function(result){
			if(result.status != 1){
				if(typeof _callback == 'function')
					_callback();
				return;
			}
			that.ticket_id = result.data.ID;

			if(result.data.cfa == 1 && !a_cfa){
				guest.pending(1);
			}

			var opts = that.options(),
				ni;
			for(ni = 0; ni < opts.length; ni++){
				opts[ni].save(that.ticket_id,sale_id);
			}

			if(WebBooker.Checkout.sale.discount()){
				WebBooker.Checkout.sale.discount().save(that.ticket_id,sale_id);
			}

			if(that.transportView.wantsTransport() && that.transport()){
				that.transport().save(that.ticket_id, sale_id);
			}

			if(typeof _callback == 'function')
				_callback();
		});
	};

	return that;
};
$ar.FeeModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		label: '',
		amount: false,
		percentage: false
	});
	that._json_callback = function(beans){
		if(/\%/.test(beans.amount)){
			beans.percentage = parseFloat(beans.amount);
			beans.amount = false;
		} else {
			beans.percentage = false;
			beans.amount = beans.amount;
		}
	};
	that.json(data);

	that.displayText = ko.computed(function(){
		if(that.percentage){
			return that.percentage + '%';
		}
		return WebBooker.selectedCurrency().symbol + that.amount;
	});
	that.price = function(p){
		if(that.amount) return that.amount;
		return p * that.percentage/100;
	};

	return that;
};
$ar.TransportationModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		type: 'transportation',
		name: '',
		id: '',
		vehicle: '',
		amount: '',
		start: false,
		end: false,
		lat: 0,
		lng: 0,
		instructions: '',
		address: ''
	},$ar.data_mapper({ 'ID': 'id' },data));

	that.selected = ko.observable(false);
	that.save = function(ticket, sale_id){
		WebBooker.API.saveOption({
			ticketID: ticket,
			saleID: sale_id,
			name: that.name,
			value: that.id,
			fee: that.amount,
			type: 'transportation'
		});
	};

	return that;
};
$ar.OptionModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		id: '',
		type: '',
		name: '',
		qty: 0,
		required: false,
		items: [],
		selectedItem: null,
		text: ''
	},$ar.data_mapper({
		'req': 'required',
		'amount': 'fee'
	},data));

	that.text = ko.observable(that.text||'');
	that.items = ko.observableArray(that.items||[]);
	that.selectedItem = ko.observable(that.selectedItem);

	that.validate = function(){
		if(!that.required) return true;
		switch(that.type.toLowerCase()){
			case 'text':
				if(!that.text()) return false;
				return true;
			case 'dropdown':
			case 'combo':
				if(!that.selectedItem()) return false;
				return true;
			default:
				return false;
		}
		return true;
	};

	that.save = function(ticket, sale_id){
		var opt_value,
			opt_fee,
			opt_choice = '';

		if(that.type.toLowerCase() == 'text') {
			opt_value = that.text;
			opt_fee = '';
			opt_choice = that.text;
		}
		if(/^(dropdown|combo)/.test(that.type.toLowerCase())){
			opt_value = that.selectedItem() ? that.selectedItem().name : '';
			opt_fee = that.selectedItem() ? parseFloat(that.selectedItem().fee) : '';

			if(opt_fee)
				opt_choice =  opt_value + ' &#043;' + opt_fee;
			else
				opt_choice =  opt_value;
		}
		WebBooker.API.saveOption({
			ticketID: ticket,
			saleID: sale_id,
			name: that.name,
			value: opt_value,
			fee: opt_fee,
			type: /^(text|combo|dropdown)/.test(that.type.toLowerCase()) ? 'criteria' : that.type
		});
	};

	return that;
};

$ar.LeadGuestInfoModel = function(data){
	var that = new $ar.Model({
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		state: '',
		postal: '',
		country: '',
		hotel: null,
		room: null
	},data);

	for(var ni in that){
		if(typeof that[ni] == 'function' || /^(_)/.test(ni))
			continue;
		that[ni] = ko.observable(that[ni]);
	}

	that.full_name = ko.computed(function(){
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n;
		
		if ( WebBooker.Checkout ) {
			var sale = WebBooker.Checkout.sale;
		
			if ( sale.items().length && WebBooker.Checkout.copyNames() ) {
				var items = sale.items(),
					ni, no, tix;
				for ( ni = 0; ni < items.length; ni += 1) {
					tix = items[ni].tickets();
					for ( no = 0; no < tix.length; no += 1 ) {
						//if ( !tix[no].first_name() || tix[no].first_name() === '' )
							tix[no].first_name( that.first_name() );
						//if ( !tix[no].last_name() || tix[no].last_name() === '' )
							tix[no].last_name( that.last_name() );
					}
				}
			}
		}
		
		if( i18n == 'ja' ) {
			return that.last_name() + ' ' + that.first_name();
		} else {
			return that.first_name() + ' ' + that.last_name();
		}
	});
	that.saveToLocal = ko.computed(function() {
		var f_name = that.first_name(),
			l_name = that.last_name(),
			phone = that.phone(),
			email = that.email();
			
		if ( !f_name || !l_name || !phone || !email ) return false;
		WebBooker.Sale.set('leadGuestInfo', {
			f_name: f_name,
			l_name: l_name,
			phone: phone,
			email: email
		});
	});
	that.states = WebBooker.us_states;
	that.errors = ko.observableArray([]);
	that.validate = function(){
		that.errors([]);
		var email_regexp = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?/;

		if(!that.first_name()){
			that.errors.push(__('First name is required.')());
		}
		if(!that.last_name()){
			that.errors.push(__('Last name is required.')());
		}
		if(!that.phone()){
			that.errors.push(__('Telephone number is required.')());
		}
		if(!that.email()){
			that.errors.push(__('E-mail address is required.')());
		}
		if(that.email() && !email_regexp.test(that.email())){
			that.errors.push(__('E-mail address is not valid.')());
		}
		return that.errors().length === 0;
	};
	
	that.copyToPayment = function() {
		var payments = WebBooker.Checkout.sale.payments(), ni, pmt;
		for ( ni = 0; ni < payments.length; ni += 1 ) {
			pmt = payments[ni];
			if ( pmt.type !== 'credit' ) continue;
			
			if ( !pmt.payee.first_name() ) {
				pmt.payee.first_name( that.first_name() );
			}
			if ( !pmt.payee.last_name() ) {
				pmt.payee.last_name( that.last_name() );
			}
			if ( !pmt.payee.email() ) {
				pmt.payee.email( that.email() );
			}
			if ( !pmt.payee.phone() ) {
				pmt.payee.phone( that.phone() );
			}
			
			break;
		}
	};

	return that;
};

$ar.PaymentInfoModel = function(data){
	var that = $ar.Model({
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		state: '',
		postal: '',
		country: ''
	},data);

	for(var ni in that){
		if(typeof that[ni] == 'function' || /^_/.test(ni))
			continue;
		that[ni] = ko.observable(that[ni]);
	}
	that.states = WebBooker.us_states;
	that.errors = ko.observableArray([]);
	that.validate = function(){
		that.errors([]);
		var email_regexp = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?/;

		if(!that.first_name()){
			that.errors.push(__('First name is required.')());
		}
		if(!that.last_name()){
			that.errors.push(__('Last name is required.')());
		}
		if(!that.phone()){
			that.errors.push(__('Telephone number is required.')());
		}
		if(!that.country()){
			that.errors.push(__('Country is required.')());
		}
		if(!that.city()){
			that.errors.push(__('City is required.')());
		}
		if(!that.state()){
			that.errors.push(__('State is required.')());
		}
		if(!that.address()){
			that.errors.push(__('Address number is required.')());
		}
		if(!that.postal()){
			that.errors.push(__('Postal Code is required.')());
		}

		if( that.errors().length === 0 ) {
			WebBooker.Checkout.sale.leadGuest.json({
				'country': that.country(),
				'city': that.city(),
				'state': that.state(),
				'address': that.address(),
				'postal': that.postal()
			});
		}
		
		return that.errors().length === 0;
	};

	return that;
};

$ar.HotelModel = function(data){
	var that = $ar.Model({
		id: 0,
		addr1: '',
		addr2: '',
		st:'',
		city: '',
		zip: '',
		country: '',

		lat: '',
		lng: '',

		name: '',
		phone: '',
		generatedName: ''
	},$ar.data_mapper({
		'ID': 'id',
		'hotel_addr1': 'addr1',
		'hotel_addr2': 'addr2',
		'hotel_city': 'city',
		'hotel_country': 'country',
		'hotel_lat': 'lat',
		'hotel_lng': 'lng',
		'hotel_phone': 'phone',
		'hotel_st': 'st',
		'hotel_zip': 'zip'
	},data));
	
	var n = that.name + ' - ';
	if ( that.st ) n = n + that.st + ', ';
	n += that.country;
	
	that.generatedName = n;

	return that;
};
$ar.PaymentModel = function(data){
	var that = $ar.Model({
		type: '',
		type_id: '',
		label: '',
		amount: 0,
		comment: '',
	},data);

	that.amount = ko.observable(that.amount||0);
	that.comment = ko.observable(that.comment||'');

	return that;
};
$ar.VoucherPaymentModel = function(data){
	data.type = 'voucher';
	var that = $ar.PaymentModel().extend({
		max_amount: 0,
		default_amount: 0,
		require_authorization_id: 0,
		authorization_ID: '',
	},$ar.data_mapper({
		'ID':'type_id',
		'payment_type_id':'type_id'
	},data));
	
	that.require_authorization_id = ko.observable(that.require_authorization_id||0);
	that.authorization_ID = ko.observable(that.authorization_ID);

	that.save = function(sale_id,_callback){
		var obj = {
			sid: sale_id,
			payment_type_id: that.type_id,
			amount: that.amount(),
			comment: that.comment(),
			authorization_ID: that.authorization_ID()
		};

		WebBooker.API.savePayment(obj, function(result){
			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};

	return that;
};
$ar.CreditCardPaymentModel = function(data){
	var use_hosted = (WebBooker.bootstrap.paymentInfo[WebBooker.selectedCurrency().title].options||{}).hosted||false;
	var that = $ar.PaymentModel().extend({
		type: 'credit',
		payee: null,
		useHostedPage: use_hosted,
		card: null
	},data);

	that.payee = $ar.PaymentInfoModel(that.payee);
	that.card = $ar.CreditCardModel(that.card);
	that.type_id = WebBooker.bootstrap.paymentInfo.ID;
	that.label = __('Credit Card')();
	that.years = (function(){
		var thisyr = new Date(),
			out = [];
		for(var i = 0; i <= 20; i++){
			out.push(thisyr.getFullYear()+i);
		}
		return out;
	})();
	
	that.months = $ar.ccMonthModel();
	that.lastFour = ko.computed(function(){
		return that.card?(''+that.card.number()).slice(-4):false;
	});
	that.sameAsContact = ko.computed({
		read: function(){
			var pj = that.payee.json(),
				cj = WebBooker.Checkout.sale.leadGuest.json(),
				ni;
			for(ni in cj){
				if(!pj.hasOwnProperty(ni) || pj[ni] != cj[ni])
					return false;
			}
			return true;
		},
		write: function(val){
			if(val)
				that.payee.json(WebBooker.Checkout.sale.leadGuest.json());
			else
				that.payee = $ar.PaymentInfoModel();
		}
	});

	that.validate = function(){
		if(!that.payee.validate())
			return false;
		if(!that.useHostedPage && !that.card.validate())
			return false;
		return true;
	};
	that.save = function(sale_id,_callback){
		var obj = {
			sid: sale_id,
			payment_type_id: that.type_id,
			amount: that.amount(),
			comment: that.comment(),
			payee: $ar.data_mapper({
				'first_name':'firstName',
				'last_name':'lastName'
			},that.payee.json())
		};

		obj.payee.country = obj.payee.country['alpha-2'];

		if(!that.useHostedPage){
			obj.options = $ar.data_mapper({
				'number':'cc_number',
				'month': 'cc_exp_month',
				'year': 'cc_exp_year',
				'code':'cc_security'
			},that.card.json());
		}

		WebBooker.API.savePayment(obj, function(result){
			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};

	return that;
};
$ar.DiscountModel = function(data){
	if(data && data.discount_amt){
		if(data.discount_amt.indexOf('%') < 0) {
			data.amount = data.discount_amt;
		} else {
			data.rate = data.discount_amt;
		}
		delete data.discount_amt;
	}

	var that = $ar.Model({
		id: 0,
		name: '',
		amount: 0,
		rate: 0
	},$ar.data_mapper({
		'discount_id':'id',
		"discount_name":'name'
	},data));

	that.save = function(ticket,sale_id){
		WebBooker.API.saveDiscount({
			ticketID: ticket,
			saleID: sale_id,
			amount: that.amount||'',
			percent: that.rate||'',
			scope: 'all',
			discount_id: that.id
		});
	};

	return that;
};
$ar.SaleModel = function(data){
	var self = $ar.Model({
		id: 0,
		items: [],
		payments: [],
		discount: null,
		leadGuest: null,
		modified: null,
		i18n_modified: null
	});
	self._json_callback = function(beans){
		if(!beans) return;

		beans.items = beans.items||[];
		beans.payments = beans.payments||[];

		var ni;
		for(ni = 0; ni < beans.items.length; ni++){
			beans.items[ni] = $ar.CheckoutItemModel(beans.items[ni]);
		}
		for(ni = 0; ni < beans.payments.length; ni++){
			if(beans.payments[ni].type == 'credit')
				beans.payments[ni] = $ar.CreditCardPaymentModel(beans.payments[ni]);
			if(beans.payments[ni].type == 'voucher')
				beans.payments[ni] = $ar.VoucherPaymentModel(beans.payments[ni]);
		}
		beans.leadGuest = $ar.LeadGuestInfoModel(beans.leadGuest);
		if(beans.discount) beans.discount = $ar.DiscountModel(beans.discount);
	};
	self.json(data);

	self.id = ko.observable(self.id||0);
	self.items = ko.observableArray(self.items||[]);
	self.leadGuest = self.leadGuest||$ar.LeadGuestInfoModel();
	self.payments = ko.observableArray(self.payments||[]);
	self.discount = ko.observable(self.discount);
	self.modified = ko.observable(self.modified);
	self.i18n_modified = ko.observable(self.i18n_modified);
	
	self.hasTransportOptions = ko.computed(function(){
		var item = self.items(),
			transport = false,
			ni;
		for(ni = 0; ni < item.length; ni++){
			if(item[ni].transportation().length) {
				transport = true;
			}
		}

		return transport;
	}).extend({ throttle: 10 });

	self.cfa_activities = ko.computed(function(){
		var items = self.items(),
			cfa = [],
			ni;
		for(ni = 0; ni < items.length; ni++){
			if(!items[ni].pending()) continue;
			cfa.push(items[ni]);
		}
		return cfa;
	}).extend({ throttle: 10 });

	self.discountTotal = ko.computed(function(){
		if(!self.discount() || !self.items().length) return 0;
		var items = self.items(),
			sub = 0,
			amt,ni;
		if(self.discount().rate){
			amt = parseFloat( self.discount().rate.replace('%', '') )/100;
			for(ni = 0; ni < items.length; ni++){
				sub += items[ni].subtotal() * amt;
			}
		} else {
			sub = self.discount().amount;
		}
		return sub;
	}).extend({ throttle: 10 });
	self.validateCustomize = function(){
		var valid = true,
			item = self.sale.items(),
			tix, opt, ni, no, na;
		for(ni = 0; ni < item.length; ni++){
			valid = valid && item[ni].validate();
		}
		return sub;
	};
	self.subtotal = ko.computed(function(){
		if(!self.items().length) return 0;
		var items = self.items(),
			sub = 0,
			ni;
		for(ni = 0; ni < items.length; ni++){
			sub += items[ni].subtotal();
		}
		return sub;
	}).extend({ throttle: 10 });
	self.taxes = ko.computed(function(){
		var items = self.items(),
			sub = 0,
			ni;
		for(ni = 0; ni < items.length; ni++)
			sub += items[ni].taxTotal(self.discount());
		return sub;
	}).extend({ throttle: 10 });
	self.total = ko.computed(function(){
		var sub = self.subtotal() - self.discountTotal();
		sub += self.taxes();
		return sub;
	}).extend({ throttle: 10 });

	self.loadFromCart = function(_callback){
		var items = WebBooker.Cart.items(),
			lead_guest_info = WebBooker.Sale.get('leadGuestInfo'),
			caller = function(){ self.items.valueHasMutated(); },
			_items = [],
			ni, no,
			act, it, json, tmp_amt;
			
		for(ni = 0; ni < items.length; ni++){
			it = $ar.CheckoutItemModel();
			it.connectCart(items[ni]);
			it.load(caller);
			_items.push(it);
		}
		self.items(_items);
		
		// load guest info
		if ( lead_guest_info ) {
			self.leadGuest.first_name( lead_guest_info.f_name );
			self.leadGuest.last_name( lead_guest_info.l_name );
			self.leadGuest.phone( lead_guest_info.phone );
			self.leadGuest.email( lead_guest_info.email );
		}
		
		WebBooker.CheckoutNav.goToStep('Customize');
		if(typeof _callback == 'function')
			_callback();
	};
	self.load = function(_callback){
		WebBooker.API.getSale({
			saleID: self.id(),
			email: self.leadGuest.email()
		},function(result){
			if(result.status != 1) {
				_callback(result);
				return
			}

			self.leadGuest.json($ar.data_mapper({
				'lead_guest_firstName': 'first_name',
				'lead_guest_lastName': 'last_name',
				'lead_guest_city': 'city',
				'lead_guest_state': 'state',
				'lead_guest_address': 'address',
				'lead_guest_postal':'postal',
				'lead_guest_country':'country',
				'lead_guest_phone': 'phone',
				'lead_guest_email': 'email'
			},result.data));

			var currs = WebBooker.available_currencies(),
				types = [],
				tix = result.data.tickets,
				options = result.data.options,
				time,type,ni,no;

			self.modified(new Date(result.data.modified * 1000).toDateString());
			self.i18n_modified( self.getDateOrder( new Date(result.data.modified * 1000) ));
			
			for(ni = 0; ni < currs.length; ni++){
				if(currs[ni].title != result.data.currency) continue;
				WebBooker.selectedCurrency(currs[ni]);
				break;
			}

			for(ni = 0; ni < tix.length; ni++){
				type = false;
				time = new Date(tix[ni].datetime);
				for(no = 0; no < types.length; no++){
					if(types[no].activity != tix[ni].activityID) continue;
					if(types[no].date != (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear()) continue;
					if(types[no].time != formatTime(tix[ni].datetime)) continue;
					type = types[no];
					break;
				}
				if(!type){
					type = $ar.CheckoutItemModel({
						activity: tix[ni].activityID,
						date: (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear(),
						time: formatTime(tix[ni].datetime),
						tickets: []
					});
					type.load((function(beans,opt){
						return function(){
							beans.parseOptions(opt);
						}
					})(type,options));
					types.push(type);
				}
				
				if ( tix[ni].cfa ) {
					type.pending(true);
				}
				
				tix[ni] = $ar.CheckoutTicketModel($ar.data_mapper({
					'ID':'ticket_id',
					'guest_type_id':'id',
					'guest_type':'name',
					'firstName':'first_name',
					'last_name':'last_name'
				},tix[ni]));

				for(no = 0; no < options.length; no++){
					if(options[no].ticketID != tix[ni].ticket_id) continue;
					if(options[no].type == 'transportation'){
						tix[ni].transportView.wantsTransport(true);
						tix[ni].transport($ar.TransportationModel($ar.data_mapper({
							'fee':'amount'
						},options[no])));
					}
				}
				
				type.tickets.push(tix[ni]);
			}
			self.items(types);

			var payments = result.data.payments;
			self.payments([]);
			for(ni = 0; ni < payments.length; ni++){
				delete payments[ni].label;
				payments[ni] = $ar.data_mapper({
					'payment-type':'type',
					'payment_type_label':'label'
				},payments[ni]);
				if(payments[ni].type == 'credit')
					self.payments.push($ar.CreditCardPaymentModel(payments[ni]));
				if(payments[ni].type == 'voucher'){
					self.payments.push($ar.VoucherPaymentModel(payments[ni]));
				}
			}

			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};
	self.save = function(_callback){
		// Create the sale.
		var sale = $ar.data_mapper({
			'first_name': 'lead_guest_firstName',
			'last_name': 'lead_guest_lastName',
			'hotel': 'lead_guest_hotel',
			'room': 'lead_guest_room',
			'phone': 'lead_guest_phone',
			'email':'lead_guest_email',
			'address':'lead_guest_address',
			'city': 'lead_guest_city',
			'state': 'lead_guest_state',
			'postal': 'lead_guest_postal',
			'country': 'lead_guest_country'
		},self.leadGuest.json()),
			ni;
		if(sale.lead_guest_country) {
			sale.lead_guest_country = (sale||{}).lead_guest_country['alpha-2']||'';
		}

		// Send the sale.
		WebBooker.API.saveSale(sale, function(result) {
			if(!result||!result.data||!result.data.ID){
				if(typeof _callback == 'function')
					_callback(result);
				return;
			}
			self.id(result.data.ID);
			WebBooker.Sale.set('sale', self.json());

			var items = self.items(),
				item_num = 0,
				tix,ni,no;

			var done_tickets = function(){
				if(--item_num) return;
				var payments = self.payments(),
					pay_count = 0,
					res = {
						error_msg: false,
						hosted: false
					};

				var parseSave = function(payment){
					return function(result){
						if(result.status != 1 && result.status != 2) {
							res.error_msg = result.msg;
						} else if(payment.hasOwnProperty('useHostedPage') && payment.useHostedPage && result.status == 2) {
							res.hosted = result.redirect;
						}

						if(!--pay_count){
							if(!res.error_msg){
								var items = self.items(),
									ni;
								for(ni = 0; ni < items.length; ni++){
									if(items[ni].cartItem){
										//should be pushed to pubsub
										WebBooker.Cart.items.remove(items[ni].cartItem);
									}
								}
							}
							if(typeof _callback == 'function')
								_callback(res);
						}
					};
				};
				for(ni = 0; ni < payments.length; ni++) {
					pay_count++;
					payments[ni].save(self.id(),(parseSave)(payments[ni]));
				}
			};

			for(ni = 0; ni < items.length; ni++){
				item_num++;
				items[ni].save(self.id(),done_tickets);
			}
			
			// clear guest info
			setTimeout(function() {
				WebBooker.Sale.remove('leadGuestInfo');
				//WebBooker.Sale.set('leadGuestInfo',{});
			},1000);
		});
	};

	WebBooker.selectedCurrency.subscribe(function(){
		var items = self.items(),
			payments = self.payments(),
			total = self.total(),
			the_credit, ni;

		var caller = function(){ self.items.valueHasMutated(); };
		for(ni = 0; ni < items.length; ni++){
			items[ni].load(caller);
		}
	});

	self.getDateOrder = function(time){
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
			days = new Array( __('Sun')(), __('Mon')(), __('Tue')(), __('Wed')(), __('Thu')(), __('Fri')(), __('Sat')() ),
			date;
		switch( i18n ) {
			case 'ja' 	:	//iso
			case 'zh_SG':
			case 'zh_TW':
			case 'zh_HK':
			case 'zh_CN':
			case 'ko_KR':
							date =  time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + ' (' + days[time.getDay()] + ')';
							break;
			case 'en_GB':	//euro
			case 'en_AU':
			case 'en_AG':
			case 'cs_CZ':
			case 'da_DK':
			case 'nl_NL':
			case 'fi_FI':
			case 'fr_FR':
			case 'fr_BE':
			case 'fr_CA':
			case 'de_DE':
			case 'de_AT':
			case 'el_GR':
			case 'it':
			case 'in_IN':
			case 'ms_MY':
			case 'ml_IN':
			case 'no_NO':
			case 'nb_NO':
			case 'nn_NO':
			case 'pl_PL':
			case 'pt_BR':
			case 'pt_PT':
			case 'ru_RU':
			case 'es_ES':
			case 'es_AR':
			case 'es_MX':
			case 'es':
			case 'sv_se':
			case 'th':
			case 'vi':			
							date = days[time.getDay()] + ' ' + time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
							break;
			case 'en_US':	//us original
			case 'en_CA':
			default		:	date = days[time.getDay()] + ' ' + (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
		}
		return date;
	};

	return self;
};

$ar.ccMonthModel = function(){
	months = [
		{
			index: 1,
			label: '01 - ' + __('January')()
		}, {
			index: 2,
			label: '02 - ' + __('February')()
		}, {
			index: 3,
			label: '03 - ' + __('March')()
		}, {
			index: 4,
			label: '04 - ' + __('April')()
		}, {
			index: 5,
			label: '05 - ' + __('May')()
		}, {
			index: 6,
			label: '06 - ' + __('June')()
		}, {
			index: 7,
			label: '07 - ' + __('July')()
		}, {
			index: 8,
			label: '08 - ' + __('August')()
		}, {
			index: 9,
			label: '09 - ' + __('September')()
		}, {
			index: 10,
			label: '10 - ' + __('October')()
		}, {
			index: 11,
			label: '11 - ' + __('November')()
		}, {
			index: 12,
			label: '12 - ' + __('December')()
		}
	];
	return months;
};

WebBooker.Checkout = (function(){
	var self = {};

	self.sale = $ar.SaleModel();

	self.termsAccepted = ko.observable(false);
	self.copyNames = ko.observable(true);

	self.copyNames.subscribe(function(value) {
		if ( !self.sale.items().length ) return;
		var item = self.sale.items(),
			ni,no,tix;
		for(ni = 0; ni < item.length; ni++){
			tix = item[ni].tickets();
			for(no = 0; no < tix.length; no++){
				//if ( !tix[no].first_name() || tix[no].first_name() === '' )
					tix[no].first_name( self.sale.leadGuest.first_name() );
				//if ( !tix[no].last_name() || tix[no].last_name() === '' )
					tix[no].last_name( self.sale.leadGuest.last_name() );
			}
		}
	});

	self.errorMsg = ko.observable(false);
	self.moreErrorMsg = ko.observable(false);
	self.locationSelect = ko.observable();

	self.paymentType = ko.observable();
	self.paymentType.subscribe(function(type){
		self.sale.payments([]);
		if(!type || !/^(credit|voucher)$/.test(type.type)){
			return;
		}

		if(type.type == 'voucher' && type.default_amount < self.sale.total()){
			// If so, push the CC payment type in, input the amount difference
			// and post an alert message.
			var cc = new $ar.CreditCardPaymentModel();
			cc.amount(self.sale.total() - type.default_amount);
			type.amount(type.default_amount);
			self.sale.payments.push(cc);
			$ar.Notification(__('Voucher amount is less than sale total. We have applied it, but you must complete the sale with a credit card.'),'error');
		} else {
			type.amount(self.sale.total());
			type.months = $ar.ccMonthModel();
		}
		self.sale.payments.push(type);
		WebBooker.Checkout.sale.leadGuest.copyToPayment();
	});
	
	self.printTickets = function() {
		WebBooker.Itinerary.printTickets({
			id: self.sale.id() || false,
			email: self.sale.leadGuest.email() || false
		});
	};
	
	self.updatePmtAmounts = function() {
		var pmts = self.sale.payments(),
			total = self.sale.total(),
			ni;
			
		if ( !pmts.length ) return false;
			
		for ( ni = 0; ni < pmts.length; ni += 1 ) {
			if ( pmts[ni].type == 'voucher' ) {
				var diff = pmts[ni].default_amount - self.sale.total();
				if ( diff < 0 ) {
					total - pmts[ni].default_amount;
				} else {
					if ( self.paymentType() && self.paymentType().type != 'voucher' ) {
						self.sale.payments.remove( pmts[ni] );
					}
				}
			}
		}
		for ( ni = 0; ni < pmts.length; ni += 1 ) {
			if ( pmts[ni].type == 'credit' && total > 0 ) {
				pmts[ni].amount( total );
			}
		}
	};

	//@ should this be here or in the app.js?
	self.hotels = ko.observableArray([]);

	self.verifying = ko.observable(false);
	self.discountCode = ko.observable();
	self.codeGood = ko.observable(true);

	self.enableSubmit = ko.computed(function() {
		if(!self.paymentType()){
			return false;
		}
		if(!self.termsAccepted()){
			return false;
		}
		if(WebBooker.CheckoutNav.processing()){
			return false;
		}
		var payments = self.sale.payments(),
			ni;
		for(ni = 0; ni < payments.length; ni++){
			if(payments[ni].type != 'credit') continue;
		}
		return true;
	});

	self.process = function(item, event){
		var voucher = true,
			payments = self.sale.payments(),
			ni;
		for(ni = 0; ni < payments.length; ni++){
			if(payments[ni].type == 'credit') continue;

			//should we check if r2 is in use now?
			//TODO insure this is for r2
			if(payments[ni].require_authorization_id() && !payments[ni].authorization_ID()){
				$ar.Notification(__('Authorization ID is required'),'error');
				jQuery(window).scrollTop(jQuery("#authorization_id").offset().top, 200);
				return false;	
			}
		}

		WebBooker.CheckoutNav.processing(true);

		for(ni = 0; ni < payments.length; ni++) {

			if(payments[ni].type != 'credit')
				continue;
			if(payments[ni].payee.validate() && (payments[ni].useHostedPage || payments[ni].card.validate()))
				continue;

			if(payments[ni].payee.errors().length){
				$ar.Notification(payments[ni].payee.errors,'error');
			} else {
				$ar.Notification(payments[ni].card.errors,'error');
			}
			WebBooker.CheckoutNav.processing(false);
			jQuery('#checkout-processing').modal('hide');
			return false;
		}

		jQuery('#checkout-processing').removeData('modal').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		});

		self.sale.save(function(result){
			if(!self.sale.id()){
				jQuery('#checkout-processing').modal('hide');
				return;
			}

			WebBooker.CheckoutNav.processing(false);

			if(result.error_msg){
				self.errorMsg(result.error_msg);
			} else {
				self.errorMsg(false);
				
				//cleanup current session
				var saleid = self.sale.id();
//				self.sale = $ar.SaleModel();
//				WebBooker.Sale.remove('leadGuestInfo');
				WebBooker.Sale.set('loadedConfirmation', false);

				if(result.hosted){
					window.location.href = result.hosted;
				} else {
					jQuery('.modal-backdrop').hide();
					jQuery('html, body').animate({ scrollTop: 0 }, 500);
					window.location.hash = '/Confirmation/' + saleid;
				}
			}

			jQuery('#checkout-processing').modal('hide');
		});
	};

	self.newSale = function(){
		Store.clear();
		self.sale = $ar.SaleModel();
		WebBooker.Cart.items([]);
		self.termsAccepted(false);
		WebBooker.Catalog.clearFilters();
	};
	self.setAgreement = function() {
		self.termsAccepted(true);
		$('#reseller-agreement').modal('hide');
		return false;
	};
	self.unsetAgreement = function() {
		self.termsAccepted(false);
		$('#reseller-agreement').modal('hide');
		return false;
	};

	self.getDiscount = function(){
		self.verifying(true);
		if(!self.discountCode()){
			self.verifying(false);
			self.codeGood(false);
			return;
		}
		WebBooker.API.validateDiscountCode(self.discountCode(), function(response){
			self.verifying(false);
			if(response.status == 'valid' && response.discount_apr != 'true' ){
				self.sale.discount($ar.DiscountModel(response));
				self.codeGood(true);
			} else {
				self.sale.discount(null);
				self.codeGood(false);
			}
		});
	};
	
	self.clearDiscount = function() {
		self.verifying(false);
		self.discountCode(undefined);
		self.sale.discount(undefined);
	};
	self.validateCustomize = function(){
		var valid = true,
			item = self.sale.items(),
			tix, opt, ni, no, na;
		for(ni = 0; ni < item.length; ni++){
			valid = valid && item[ni].validate();
		}
		if(!valid){
			jQuery("#checkout-customize .required").addClass('warning-shadow');
			$ar.Notification(__('You seem to have missed something. Please check again.'),'error');
			jQuery(window).scrollTop(jQuery("#checkout-activities").offset().top, 200);
		} else {
			jQuery('#checkout-customize .warning-shadow').removeClass('warning-shadow');
			jQuery("#checkout-customize .required").removeClass('warning-shadow');
		}
		return valid;
	};

	return self;
})();
WebBooker.CheckoutNav = (function(){
	var self = {};

	self.show = ko.observable(false);
	self.showCustomize = ko.observable(false);
	self.showContact = ko.observable(false);
	self.showReview = ko.observable(false);
	self.showPayment = ko.observable(false);
	self.showConfirmation = ko.observable(false);
	self.processing = ko.observable(false);

	self.progress = ko.observable(4);
	self.progressWidth = ko.computed(function(){ return self.progress() + '%'; });
	self.goToStep = function(item, event) {
		var which = arguments.length == 2?jQuery(event.currentTarget).attr('data-target'):item;
		if(which == 'Confirmation' && !self.termsAccepted()){
			return false;
		}
		//the progress for this is handled in app.js
		if(which == 'Payment'){
			if(!WebBooker.Checkout.sale.leadGuest.validate()){
				$ar.Notification(WebBooker.Checkout.sale.leadGuest.errors,'error');
				return false;
			}
			if(!WebBooker.Checkout.validateCustomize()) return false;
			
			/*var items = [];
			for ( ni = 0; ni < WebBooker.Cart.items().length; ni += 1 ) {
				items.push( WebBooker.Cart.items()[ni].processActivityForAnalytics( true ) );
			}*/

			WebBooker.Analytics.trigger( {
				cart_items: WebBooker.Cart.items(),
				subtotal: WebBooker.Checkout.sale.subtotal(),
				currency: WebBooker.selectedCurrency().title,
				prev_url: false
			}, 'action_Customize');
			
			WebBooker.Checkout.sale.leadGuest.copyToPayment();
			
			WebBooker.Analytics.trigger( { cart_items: WebBooker.Cart.items() } , 'action_checkoutBilling');
			self.progress(37);
		}
		if(which == 'Customize'){
			self.progress(8);
		}
		if(WebBooker.bootstrap.payment_types && WebBooker.bootstrap.payment_types.length == 1){
			WebBooker.Checkout.paymentType(WebBooker.bootstrap.payment_types[0]);
		}
		self.hideAll();
		WebBooker.Sale.set('sale', WebBooker.Checkout.sale.json());
		self['show' + which](true);
	};
	self.hideAll = function(){
		self.showCustomize(false);
		self.showContact(false);
		self.showReview(false);
		self.showPayment(false);
		self.showConfirmation(false);
	};
	self.continueShopping = function() {
		WebBooker.Analytics.trigger({}, 'action_continueShopping');
		window.location.hash = '/Search';
	};
	self.viewItinerary = function(){
		window.location.hash = '/Itinerary/' + WebBooker.Checkout.sale.id();
	};
	self.goToSearch = function(){
		window.location.hash = '/Search';
	};

	self.showNav = ko.computed(function(){
		return self.show() && WebBooker.Checkout.sale.items().length > 0 && !self.showConfirmation();
	});

	return self;
})();

jQuery(document).ready(function(){
	ko.applyBindings(WebBooker.bootstrap, jQuery('#reseller-privacy-policy .modal-body')[0]);
});
