/**
 *	ActivityRez Web Booking Engine
 *	Homepage Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

WebBooker.Homepage = {
	show: ko.observable(false),
	featured_destinations: ko.observableArray([]),
	init: function() {}
};

WebBooker.Homepage.show.subscribe(function(newValue){
	if( newValue === true && WebBooker.Homepage.featured_destinations().length === 0 ) {
		if ( WebBooker.bootstrap.use_custom_home ) return;
		
		var des = [], no;
		
		for ( no = 0; no < WebBooker.bootstrap.wb_destinations.length; no += 1 ) {
			des.push( WebBooker.bootstrap.wb_destinations[no].name() );
		}
		
		WebBooker.API.getFeaturedActivities( des, function(results) {
			if ( results.status == 1 ) {
				var dests = [],
					ni, no;
					
				for ( ni = 0; ni < results.data.length; ni += 1 ) {
					if ( jQuery.inArray( results.data[ni].destination, dests ) < 0 ) {
						dests.push( results.data[ni].destination );
					}
				}
				dests.sort(function(a, b) {
					if ( a > b ) {
						return 1;
					}
					if ( a < b ) {
						return -1;
					}
					return 0;
				});
				for ( ni = 0; ni < dests.length; ni += 1 ) {
					var d = dests[ni];
					dests[ni] = {
						destination: d,
						activities: ko.observableArray([])
					};
					for ( no = 0; no < results.data.length; no += 1 ) {
						if ( dests[ni].destination == results.data[no].destination ) {
							dests[ni].activities.push( new $ar.MiniActivityModel( results.data[no] ) );
						}
					}
				}
				
				WebBooker.Homepage.featured_destinations( dests );
			}
		});
	}
});