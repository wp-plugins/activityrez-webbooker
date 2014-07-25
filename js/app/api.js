/**
 *	ActivityRez Web Booking Engine
 *	API Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 5858 B

WebBooker.API = {
	raw: function(url,data,callback){
		var args = {
			type: 'POST',
			async: true,
			data: data
		};

		if(WebBooker.bootstrap.crossDomain){
			args.url = url;
			args.dataType = 'jsonp';
			args.crossDomain = true;
		} else {
			args.url = url;
			args.dataType = 'json';
			args.crossDomain = false;
		}

		jQuery.ajax(args).always(function(result){
			if(typeof callback == 'function'){
				callback(result);
			}
		});
	},
	request : function(service,action,params,callback){
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			service: service,
			action: action,
			nonce: WebBooker.bootstrap.nonce,
			data: params
		},callback);
	},
	queryCatalog: function(callback) {
		var destination = WebBooker.Catalog.search_params.destination();
		if(WebBooker.bootstrap['search_destination'] && WebBooker.bootstrap['search_destination'].length > 0){
			destination = {name: ko.observable(WebBooker.bootstrap['search_destination'])};
		}

		var keywords = WebBooker.Catalog.search_params.keywords(),
			tag = WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
			category = WebBooker.Catalog.search_params.category(),
			startDate = WebBooker.Catalog.search_params.date_start(),
			endDate = WebBooker.Catalog.search_params.date_end(),
			minPrice = WebBooker.Catalog.search_params.price_min(),
			maxPrice = WebBooker.Catalog.search_params.price_max(),
			moods = [];
			for(var i = 0; i < WebBooker.Catalog.search_params.moods().length; ++i)
				moods.push(WebBooker.Catalog.search_params.moods()[i].name());

		WebBooker.API.request('lookup','activities',{
			i18n: WebBooker.bootstrap['i18n'],
			des: (destination) ? destination.name : '',
			s: (keywords) ? keywords : '',
			tag: (tag) ? tag : '',
			moods: (moods) ? moods : '',
			category: (category) ? category : '',
			startDate: (startDate) ? startDate : '',
			endDate: (endDate) ? endDate : '',
			minPrice: minPrice,
			maxPrice: maxPrice,
			featured: WebBooker.Catalog.search_params.featured(),
			count: WebBooker.Catalog.pageSize(),
			page: WebBooker.Catalog.pageIndex(),
			sort: WebBooker.Catalog.search_params.sort().sort,
			sortDir: WebBooker.Catalog.search_params.sort().sort_dir,
			showInWB: WebBooker.bootstrap.webBookerID,
			reseller2ID: WebBooker.bootstrap.reseller2_id,
			reseller2_userID: WebBooker.bootstrap.user_id
		},callback);
	},
	
	fetchImages: function(id,callback){
		jQuery.ajax({
		    url: WebBooker.mediaServer + '/media/' + WebBooker.bootstrap.nonce + '/meta/all/activity_id/' + id,
		    type: 'GET',
			async: true
		}).always(function(result){
			if(typeof callback == 'function'){
				callback(result);
			}
		});
	},
	
	getFeaturedActivities: function (dest, callback) {
		WebBooker.API.request('lookup','activities',{
			i18n: WebBooker.bootstrap['i18n'],
			des: dest,
			featured: true,
			count: 100,
			showInWB: WebBooker.bootstrap.webBookerID
		},callback);
	},

	getActivity: function(id, date, callback) {
		WebBooker.API.request('lookup','getActivity',{
			ID: id,
			reseller2ID: WebBooker.bootstrap.reseller2_id,
			reseller2_userID: WebBooker.bootstrap.user_id,
			showInWB: WebBooker.bootstrap.webBookerID,
			date: date
		},callback);
	},

	betterGetActivity: function(params, callback){
		params['showInWB'] = WebBooker.bootstrap.webBookerID;
		if(params['id']){
			params['ID'] = params['id'];
			delete params['id'];
		}
		if(WebBooker.bootstrap.reseller2_id){
			params['reseller2ID'] = WebBooker.bootstrap.reseller2_id;
		}
		if(WebBooker.bootstrap.user_id){
			params['reseller2_userID'] = WebBooker.bootstrap.user_id;
		}

		WebBooker.API.request('lookup','getActivity',params,callback);
	},

	checkAvailability: function (params, callback) {
		WebBooker.API.request('lookup','inventory',{
			activityID: params.id,
			timestamp: params.datetime,
			locationID: WebBooker.bootstrap.webBookerID,
			resellerID: WebBooker.bootstrap.reseller2_id
		},callback);
	},

	getSale: function(params, callback) {
		WebBooker.API.request('checkOut','getSale',{
			saleID: params.saleID,
			email: params.email
		},callback);
	},

	saveSale: function(sale, callback) {
		sale.i18n = WebBooker.selectedLanguage().i18n;
		sale.source = 'web';
		sale.currency = WebBooker.selectedCurrency().title;
		sale.locationID = WebBooker.bootstrap.webBookerID;
		sale.balance_due = 0;
		if(WebBooker.bootstrap.user_id){
			sale.reseller2ID = WebBooker.bootstrap.reseller2_id;
			sale.reseller2_userID = WebBooker.bootstrap.user_id;
		}

		WebBooker.API.request('checkOut','saveSale',sale,function(sale){
			if(sale.status == 1 && typeof callback == 'function')
				callback(sale);
		});
	},

	saveTicket: function(ticket, callback) {
		WebBooker.API.request('checkOut','saveTicket',{
			ID: ticket.id,
			activityID: ticket.aid,
			datetime: ticket.timestamp,
			saleID: ticket.sid,
			locationID: WebBooker.bootstrap.webBookerID,
			guest_type_id: ticket.guest_type_id,
			guest_type: ticket.guest_type,
			leadGuest: ticket.leadGuest,
			cfa: ticket.cfa,
			cfa_name: ticket.cfa_name,
			cfa_number: ticket.cfa_number,
			firstName: ticket.firstName,
			lastName: ticket.lastName,
			currency: WebBooker.selectedCurrency().title,
			lead_guest_hotel: ticket.lead_guest_hotel
		}, function(tix){
			if(tix.status == 1 && typeof callback == 'function'){
				callback(tix);
			} else {
				WebBooker.Checkout.errorMsg(tix.msg);
			}
		});
	},

	saveDiscount: function(discount, callback) {
		WebBooker.API.request('checkOut','saveDiscount',{
			ticketID: discount.ticketID,
			saleID: discount.saleID,
			amount: discount.amount,
			percent: discount.percent,
			scope: discount.scope,
			reason: discount.reason,
			approval: discount.approval,
			discount_id: discount.discount_id,
			locationID: WebBooker.bootstrap.webBookerID
		}, function(disc){
			if(disc.status == 1 && typeof callback == 'function'){
				callback(disc);
			}
		});
	},

	saveOption: function(option, callback) {
		WebBooker.API.request('checkOut','saveOption',{
			ID: option.id,
			ticketID: option.ticketID,
			saleID: option.saleID,
			name: option.name,
			value: option.value,
			choice: option.choice,
			fee: option.fee,
			type: option.type,
			locationID: WebBooker.bootstrap.webBookerID
		}, function(opt){
			if(opt.status == 1 && typeof callback == 'function'){
				callback(opt);
			}
		});
	},

	savePayment: function(payment, callback) {
		WebBooker.API.request('checkOut','savePayment',{
			saleID: payment.sid,
			source: 'web',
			payment_type_id: payment.payment_type_id,
			locationID: WebBooker.bootstrap.webBookerID,
			amount: payment.amount,
			payee: payment.payee,
			currency: WebBooker.selectedCurrency().title,
			options: payment.options,
			comment: payment.comment,
			authorization_ID: payment.authorization_ID
		},callback);
	},

	doItineraryAction: function(params, callback) {
		params.all = 1;
		params.wb = true;
		params.resellerID = WebBooker.bootstrap.reseller2_id;
		params.locationID = WebBooker.bootstrap.webBookerID;

		WebBooker.API.request('arezConfirmation','printConfirm',params,callback);
	},

	loginAgent: function(params, callback){
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			service: 'userLogin',
			action: 'login',
			nonce: WebBooker.bootstrap.nonce,
			user: params.user,
			pass: params.pass
		},callback);
	},

	logoutAgent: function(params, callback){
		WebBooker.API.request('userLogin','logout',null,function(){
			window.location.reload();
		});
	},

	signupAgent: function(params, callback) {
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			nonce: WebBooker.bootstrap.nonce,
			service: 'updateUser',
			first_name: params.first_name,
			last_name: params.last_name,
			user_email: params.email,
			user_pass: params.password,
			confirm_pass: params.verify_password,
			user_login: params.user_name,
			arc_number: params.arc,
			reseller1ID: WebBooker.bootstrap.reseller1_id,
			booker_site: true,
			cache_buster: new Date().getTime()
		},callback);
	},
	
	passwordReset: function(params, callback){
		WebBooker.API.request('accountManage','userPasswordReset',{
			login: params.login,
			password: params.password,
			key: params.key
		},callback);
	},
	
	passwordResetRequest: function(params, callback) {
		WebBooker.API.request('accountManage', 'userPasswordResetRequest', {
			wbID: WebBooker.bootstrap.webBookerID,
			site: WebBooker.bootstrap.wb_url,
			user: params.user
		}, callback);
	},
	
	resetPassword: function(params, callback) {
		WebBooker.API.request('userLogin', 'pw_reset', params, callback);
	},

	validateDiscountCode: function(promo_code, callback) {
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			nonce: WebBooker.bootstrap.nonce,
			service: 'validateDiscount',
			code: promo_code,
			pos: WebBooker.bootstrap.webBookerID
		},callback);
	},

	geocodeAddress: function(address, callback) {
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			nonce: WebBooker.bootstrap.nonce,
			service: 'geocodeAddress',
			address: address
		},callback);
	},

	getAgentCommissions: function(params, callback) {
		WebBooker.API.request('arezReporting','getMyCommissions',{
			startDate: params.startDate,
			endDate: params.endDate,
			tz: params.tz,
			wb: true
		},function(data){
			if(data.status == 1 && typeof callback == 'function'){
				callback(data);
			}
		});
	},

	updateCurrency : function(locationID, callback){
		WebBooker.API.request('lookup','getExchangeRates',{
			locationID: locationID
		},callback);
	},

	getPOFile: function(params, callback) {
		WebBooker.API.request('webBooker','getPO',{
			webBookerID: params.post_id,
			i18n: params.i18n
		},callback);
	},

	changeI18N: function(params){
		WebBooker.API.request('webBooker','changeI18N',{
			i18N: params.i18n
		}, function(data){
			if(data.status == 1) window.location.reload(true);
		});
	}
};
