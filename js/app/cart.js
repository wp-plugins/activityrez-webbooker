/**
 *	ActivityRez Web Booking Engine
 *	Shopping Cart
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 2391 B

$ar = $ar||{};
WebBooker = WebBooker||{};

WebBooker.Cart = (function(){
	var self = {
		cart: null,
		items: ko.observableArray([])
	};

	self.init = function(){
		self.cart = new Store('WebBooker_Cart_' + WebBooker.bootstrap.webBookerID);
		var items = self.cart.get('Items'),
			timestamp = self.cart.get('Timestamp');

		// that honkey has expired
		if(!timestamp || Math.floor(((new Date()).getTime() - (new Date(timestamp)).getTime())/3600000) > 48){
			self.items([]);
			self.cart.reset();
		} else if(items){
			var _items = [],ni;
			for(ni = 0; ni < items.length; ni++){
				_items.push($ar.CartItemModel(items[ni]));
			}
			self.items(_items);
		}

		self.items.subscribe(function(){
			self.saveToLocal();
		});
	};

	self.saveToLocal = function(){
		var _items = self.items(), items = [], ni;
		for(ni = 0; ni < _items.length; ni++){
			_items[ni].inCart = true;
			items.push(_items[ni].json());
		}
		self.cart.set('Items', items);
		self.cart.set('Timestamp', new Date());
	};

	self.viewCart = function(){
		window.location.href = WebBooker.bootstrap.wb_url + '/#/Checkout';
	};

	self.subtotal = ko.computed(function(){
		var items = self.items(),
			sub = 0,
			ni;

		for(ni = 0; ni < items.length; ni++) {
			sub += items[ni].subtotal();
		}

		return sub;
	});

	return self;
})();
$ar.CartItemModel = function(data){
	var that = new $ar.Model({
		inCart: false,
		activity: 0,
		date: null,
		i18n_date: null,
		time: null,

		url: '',
		title: '',
		destination: '',

		guests: []
	});
	
	that._json_callback = function(beans){
		if(!beans) return;
		beans.guests = beans.guests||[];

		var ni;
		for(ni = 0; ni < beans.guests.length; ni++){
			beans.guests[ni] = $ar.CartGuestModel(beans.guests[ni]);
		}
	};
	that.json(data);

	that.guests = ko.observableArray(that.guests||[]);
	that.remove = function() {
		if(!that.inCart) return;
		that.inCart = false;
		var items = WebBooker.Checkout.sale.items(),
			guests = that.guests(),
			ni;

		for(ni = 0; ni < guests.length; ni++){
			guests[ni].qty(0);
		}
		WebBooker.Cart.items.remove(that);
		for(ni = 0; ni < items.length; ni++) {
			if(!items[ni].cartItem || items[ni].cartItem != that) {
				continue;
			}
			WebBooker.Checkout.sale.items.remove(items[ni]);
		}
		setTimeout(function() {
			WebBooker.Checkout.updatePmtAmounts();
		}, 100);
		return;
	};

	that.subtotal = ko.computed(function(){
		var guests = that.guests()||{},
			subtotal = 0,
			rate = (WebBooker.selectedCurrency().rate||1)*100,
			ni;

		for(ni = 0; ni < guests.length; ni++){
			subtotal += Math.round(parseFloat(guests[ni].price())*rate)/100 * guests[ni].qty();
		}

		return subtotal/(WebBooker.selectedCurrency().rate||1);
	});
	
	that.processActivityForAnalytics = function( include_options ) {
		var total_guests = 0,
			types = [],
			options = [];
			
		for ( ni = 0; ni < that.guests().length; ni += 1 ) {
			total_guests += that.guests()[ni].qty();
			types.push({
				name: that.guests()[ni].name,
				qty: that.guests()[ni].qty()
			});
		}
		
		return {
			title: that.json().title,
			id: that.activity,
			date: that.date,
			time: that.time,
			total_guests: total_guests,
			guest_types: types
		};
	};
	
	that.i18n_date = function(){
		var time = new Date(that.date + (that.time.startTime === 'Open' ? '' : ' ' + that.time.startTime)),
			i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
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
			default:
				date = (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
				break;
		}
		return date;
	};

	return that;
};
$ar.CartGuestModel = function(data){
	var that = new $ar.Model({
		id: 0,
		name: '',
		qty: 0,
		price: 0,
		r2: 0
	},$ar.data_mapper({
		'guest_type_id':'id',
		'guest_type':'name',
		'amount':'price'
	},data));

	that.price = ko.observable(that.price||0);
	(function(){
		var _qty = ko.observable(that.qty||0),
			_validate;
		that.qty = ko.computed({
			read: function(){ return _qty(); },
			write: function(nval){
				if(typeof _validate == 'function' && !_validate(nval))
					return;

				_qty(nval);
				WebBooker.Cart.saveToLocal();
			}
		});
		that.qty.setValidate = function(val){
			_validate = val;
		};
		that.qty.real = function(){ return _qty; };
	})();

	that.subtotal = ko.computed(function(){
		var rate = WebBooker.selectedCurrency().rate||1;
		return (Math.round(parseFloat(that.price())* rate * 100)/100 * that.qty()) / rate;
	});
	
	that.name = __( that.name )();

	return that;
};
