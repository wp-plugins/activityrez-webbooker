/**
 *	ActivityRez Web Booking Engine
 *	Catalog File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

 //compresses to 4498 B

WebBooker.Catalog = (function(){
	var self = {};

	self.show = ko.observable(false);
	self.show_mini_search = ko.observable(false);
	self.isSearching = ko.observable(false),
	self.hasSearched = ko.observable(false),
	self.sortToggle = ko.observable(1),

	self.toggle_mini_search = function(evt){
		self.show_mini_search(!self.show_mini_search());
	};

	self.search_filter_data = {
		destinations: ko.observableArray([]),
		sub_destinations: ko.observableArray([]),
		categories: ko.observableArray([]),
		tags: ko.observableArray([]),
		moods: ko.observableArray([]),
		sorts: ko.observableArray([{
			id: 1,
			sort: 'title',
			sort_dir: 'asc',
			label: __('Alphabetical: A to Z')
		}, {
			id: 2,
			sort: 'title',
			sort_dir: 'desc',
			label: __('Alphabetical: Z to A')
		}, {
			id: 3,
			sort: 'price',
			sort_dir: 'asc',
			label: __('Price: Low to High')
		}, {
			id: 4,
			sort: 'price',
			sort_dir: 'desc',
			label: __('Price: High to Low')
		}])
	};
	self.search_params = {
		sort: ko.observable({
			id: 1,
			sort: 'title',
			sort_dir: 'asc',
			label: __('Alphabetical: A to Z')
		}),
		keywords: ko.observable(),
		date_start: ko.observable(),
		date_end: ko.observable(),
		price_min: ko.observable(0),
		price_max: ko.observable(10000),
		destination: ko.observable(),
		sub_destination: ko.observable(),
		featured: ko.observable(),
		category: ko.observable(),
		tag: ko.observable(),
		tag_private: ko.observable(false),
		moods: ko.computed({
			read: function(){
				var checked = [],
					moods = self.search_filter_data.moods(),
					ni;
				for(ni = 0; ni < moods.length;ni++){
					if(!moods[ni].selected()) continue;
					checked.push(moods[ni]);
				}
				return checked;
			},
			write: function(val){
				var moods = self.search_filter_data.moods(),
					ni,no;
				val = val||[];
				if(Object.prototype.toString.call(val)!='[object Array]') return;
				for(ni = 0; ni < moods.length; ni++){
					moods[ni].selected(false);
				}
				for(ni = 0; ni < val.length; ni++){
					if(!val[ni].term_id) continue;
					for(no = 0; no < moods.length; no++){
						if(moods[no].term_id != val[ni].term_id) continue;
						moods[no].selected(true);
						break;
					}
				}
			}
		})
	};
	
	self.backup_search_params = {
		keywords: '',
		destinaton: '',
		moods: '',
		category: '',
		tag: '',
		date_start: '',
		date_end: ''
	};

	self.searchResults = ko.observableArray([]);
	self.totalResults = ko.observable(0);

	self.pageIndex = ko.observable(false);
	self.pageSize = ko.observable(15);

	self.maxPageIndex = ko.computed(function(){
		return Math.ceil(self.totalResults() / self.pageSize());
	});

	self.pages = ko.computed(function() {
		var maxPages = Math.min(self.maxPageIndex(),12),
			pages = [],
			ni = self.pageIndex(), i;

		for(i = 1; i <= maxPages; i++) {
			pages.push({
				index: i,
				current: ni == i
			});
		}

		return pages;
	});

	self.totalResultsText = ko.computed(function() {
		if(self.totalResults() == 1 && WebBooker.selectedLanguage().i18n != 'ja')
			return self.totalResults() + ' ' + __('Activity')();
		return self.totalResults() + ' ' + __('Activities')();
	});

	self.load = function(){
		self.isSearching(true);
		self.hasSearched(false);

		if( self.checkUpdateParams() ) {
			self.searchResults([]);
			self.pageIndex(1);
		} else {
			WebBooker.API.queryCatalog(function(results) {
				self.isSearching(false);
				self.hasSearched(true);
				self.totalResults(0);

				var destination = WebBooker.Catalog.search_params.destination(),
					category = WebBooker.Catalog.search_params.category(),
					keywords = WebBooker.Catalog.search_params.keywords(),
					tag = WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
					moods = WebBooker.Catalog.search_params.moods(),
					dstart = WebBooker.Catalog.search_params.date_start(),
					dend = WebBooker.Catalog.search_params.date_end();

				// Analytics hook
				WebBooker.Analytics.trigger( {
					keywords: keywords ? keywords : false,
					destinaton: destination ? destination.name() : false,
					moods: ( moods.length ) ? moods : false,
					category: category ? category : false,
					tag: tag ? tag : false,
					date_start: dstart ? dstart : false,
					date_end: dend ? dend : false,
					total_results: results.total ? results.total : 0
				}, 'action_Search' );
			
				if( results.status != 1 ) {
					if( results.status == 0 && results.total > 0 ) {
						self.totalResults( self.searchResults().length  );
					} else if( results.status == 0 && results.total == 0 ) {
						self.searchResults([]);
					}
					return;
				}
				self.processResults( results );
				self.isSearching(false);
				// keep previous search paramaters
				self.backupParams();
			});
		}
	};

	self.processResults = function(results) {
		self.totalResults( results.total );

		var data = results.data, ni;

		for ( ni = 0; ni < data.length; ni += 1 ) {
			self.searchResults.push( new $ar.SearchResult( data[ni] ) );
		}
	};

	self.checkUpdateParams = function() {
		var ret = false,
			params = self.getParams();
		for( var k in self.backup_search_params ) {
			curr = typeof params[k]=='undefined' ? '' : params[k];
			prev = self.backup_search_params[k];
			if( self.pageIndex() > 1 && prev != curr ) {
				ret = true;
				break;
			}
		}
		return ret;
	};

	self.backupParams = function() {
		var params = self.getParams();
		jQuery.each( params, function( key, value ) {
			self.backup_search_params[key] = typeof value == 'undefined' ? '' : value;
		});
	};
	
	self.getParams = function() {
		var params = {
			destination: WebBooker.Catalog.search_params.destination(),
			category: WebBooker.Catalog.search_params.category(),
			keywords: WebBooker.Catalog.search_params.keywords(),
			tag: WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
			moods: WebBooker.Catalog.search_params.moods(),
			dstart: WebBooker.Catalog.search_params.date_start(),
			dend: WebBooker.Catalog.search_params.date_end()
		}
		return params;
	};

	self.loadWithFilters = function() {
		if(window.location.href != WebBooker.bootstrap.wb_url + '/#/Search') {
			window.location.href = WebBooker.bootstrap.wb_url + '/#/Search';
			return;
		}
		if(window.location.hash != '#/Search') {
			window.location.hash = '#/Search';
		}

		self.searchResults([]);
		if(self.pageIndex() != 1) {
			self.pageIndex(1);
		} else {
			self.load();
		}
	};

	self.clearFilters = function(){
		self.search_params.keywords('');
		self.search_params.date_start('');
		self.search_params.date_end('');
		self.search_params.destination(null);
		self.search_params.sub_destination(null);
		self.search_params.category(null);
		self.search_params.tag(null);
		self.search_params.moods([]);
		self.search_params.price_min(0);
		self.search_params.price_max(10000);
		jQuery('#price-range-slider').val([0,10000]);
	};

	self.init = function() {
		// load the parameters from the cookie
		var cookie_grab = function( fdata, pdata, m, m_on ) {
			m_on = m_on || 'id';
			m = WebBooker.Settings.get(m);
			if( !m ) return;
			var no = self.search_filter_data[fdata](), ni;
			for( ni = 0; ni < no.length; ni += 1 ) {
				if( no[ni][m_on] != m[m_on] ) continue;
				self.search_params[pdata]( no[ni] );
				break;
			}
		}, bootstrap_grab = function( args ) {
			var no = WebBooker.bootstrap[ args.boot_source ], ni;
			
			for ( ni = 0; ni < no.length; ni += 1 ) {
				// if no bootstrapped value, abort.
				if ( !WebBooker.bootstrap[ args.search_name ] ) return false;
				
				// otherwise continue as usual.
				var m = decodeEntities( WebBooker.bootstrap[ args.search_name ] ).toLowerCase(),
					b = decodeEntities( no[ni].name() ).toLowerCase();
					
				if ( b != m ) {
					if ( args.filter_name === 'tag' ) {
						self.search_params.tag_private( m );
					}
					continue;
				}
				
				if ( args.filter_name !== 'moods' ) {
					self.search_params[ args.filter_name ]( args.use_name ? no[ ni ].name() : no[ ni ] );
					break;
				} else {
					// we have to handle moods a little differently.
					for ( var ne = 0; ne < self.search_filter_data[ args.filter_name ]().length; ne += 1 ) {
						if ( self.search_filter_data[ args.filter_name ]()[ ne ].name().toLowerCase() != m ) continue;
						self.search_filter_data[ args.filter_name ]()[ ne ].selected(true);
					}
				}
			}
			return true;
		},
		decodeEntities = (function() {
		  // this prevents any overhead from creating the object each time
		  var element = document.createElement('div');
		
		  function decodeHTMLEntities (str) {
		    if(str && typeof str === 'string') {
		      // strip script/html tags
		      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
		      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
		      element.innerHTML = str;
		      str = element.innerHTML;
		      element.innerHTML = '';
		    }
		
		    return str;
		  }
		
		  return decodeHTMLEntities;
		})(),
		has_bootstrapped = false,
		min_price = WebBooker.Settings.get('SearchParams_MinPrice'),
		max_price = WebBooker.Settings.get('SearchParams_MaxPrice');

		self.search_params.date_start(WebBooker.Settings.get('SearchParams_StartDate') || null);
		self.search_params.date_end(WebBooker.Settings.get('SearchParams_EndDate') || null);
		self.search_params.keywords(WebBooker.Settings.get('SearchParams_Keywords') || null);
		self.search_params.price_min(min_price || 0);
		self.search_params.price_max(max_price || 10000);
		jQuery('#price-range-slider').val([ min_price || 0, max_price || 10000 ]);

		//grab this bit from the bootstrap
		for ( var i = 0; i < WebBooker.bootstrap.wb_destinations.length; i += 1 ) {
			WebBooker.bootstrap.wb_destinations[i].name( decodeEntities( WebBooker.bootstrap.wb_destinations[i].name() ) );
		}
		self.search_filter_data.destinations(WebBooker.bootstrap.wb_destinations);
		self.search_filter_data.categories(WebBooker.bootstrap.cats);
		self.search_filter_data.tags(WebBooker.bootstrap.tags);
		self.search_filter_data.moods(WebBooker.bootstrap.moods);
		
		cookie_grab('sorts','sort','SearchParams_Sort');
		
		if ( bootstrap_grab( { filter_name: 'destination', search_name: 'search_destination', boot_source: 'wb_destinations' } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'category', search_name: 'search_category', boot_source: 'cats', use_name: true } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'tag', search_name: 'search_tag', boot_source: 'tags', use_name: true } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'moods', search_name: 'search_mood', boot_source: 'moods' } ) ) {
			has_bootstrapped = true;
		}
		
		// if we didn't receive any bootstrapped search values,
		// now we see if local storage has any.
		if ( !has_bootstrapped ) {
			//self.search_params.destination(WebBooker.Settings.get('SearchParams_Destination') || null);
			cookie_grab('destinations','destination','SearchParams_Destination');
			self.search_params.category(WebBooker.Settings.get('SearchParams_Category') || null);
			self.search_params.tag(WebBooker.Settings.get('SearchParams_Tag') || null);
			var moods = WebBooker.Settings.get('SearchParams_Moods') || [],
				mods = self.search_filter_data.moods() || [],
				ni, no;
			for ( ni = 0; ni < mods.length; ni += 1 ) {
				for ( no = 0; no < moods.length; no += 1 ) {
					if ( moods[ no ] == mods[ ni ].name() ) {
						mods[ ni ].selected( true );
					}
				}
			}
		}

		// set pageIndex, if bootstrap initially has destination search..
		if(	has_bootstrapped && WebBooker.bootstrap['search_destination'] ) {
			self.pageIndex(1);
		}
		
		// Init subscriptions after loading parameters
		// So we aren't accidentally saving the initial bindings.
		self.search_params.sort.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_Sort', value.id);

			if( self.pageIndex() !== false ) {
				// Refresh to subscribe self.pageIndex(), if sortToggle is changed
				if(	self.pageIndex() == 1 && self.sortToggle() != value.id ) {
					self.pageIndex(false);
				}
				self.searchResults([]);
				self.pageIndex(1);
				self.sortToggle(value.id);
			}
		});
		self.search_params.destination.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_Destination', value || '');
		});
		self.search_params.category.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Category', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.category() && !self.search_params.tag() && !jQuery('.select-category').hover())
						jQuery('#search-filters-categories .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.tag.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Tag', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.category() && !self.search_params.tag() && !jQuery('.select-tag').hover())
						jQuery('#search-filters-categories .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.date_start.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_StartDate', value || '');
			//checks to see if the mouse is over the section
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.date_start() && !self.search_params.date_end() && !jQuery('#ui-datepicker-div').is(':visible')) {
						// if the mouse has not been in the section, for 1 sec and nothing is checked
						jQuery('#search-filters-date .collapse-me').slideUp();
					}
				}, 1000);
			});
		});
		self.search_params.date_end.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_EndDate', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.date_start() && !self.search_params.date_end() && !jQuery('#ui-datepicker-div').is(':visible'))
						jQuery('#search-filters-date .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.price_min.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_MinPrice', value || '');
		});
		self.search_params.price_max.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_MaxPrice', value || '');
		});
		self.search_params.keywords.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Keywords', value || '');
		});
		self.search_params.moods.subscribe(function(value){
			var saver = [],
				moods = self.search_params.moods(),
				ni;
			for(ni = 0; ni < moods.length; ni += 1) {
				saver.push(moods[ni].name());
			}
			WebBooker.Settings.set('SearchParams_Moods', saver);
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(self.search_params.moods().length < 1)
						jQuery('#search-filters-moods .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.pageIndex.subscribe(function(value){
			// prevent API call twice
			if( self.pageIndex() !== false ) {
				self.load();
			}
		});
	};

	return self;
})();
