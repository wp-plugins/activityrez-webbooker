/**
 *	ActivityRez Web Booking Engine
 *	Analytics Hooks File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker Plugin
 */

WebBooker.Analytics = {
	trigger: function( data, action ) {
		if( WebBooker.Analytics.hasOwnProperty( action ) ) {
			WebBooker.Analytics[ action ]( data );
		}
	},

	stored_data: {}
};