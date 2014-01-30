/**
 *	ActivityRez Web Booking Engine
 *	Reseller Dashboard
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 2576 B

WebBooker.Dashboard = {
	show: ko.observable(false),
	showMain: ko.observable(true),
	showReports: ko.observable(false),
	showSignup: ko.observable(false),
	showPasswordReset: ko.observable(false),
	showPasswordResetConfirmation: ko.observable(false),
	signupSuccessMsg: ko.observable(false),
	agentCommissionsChart: ko.observable(),
	agentCommissionsData: ko.observable(),
	agentCommissionsStartDate: ko.observable(),
	agentCommissionsEndDate: ko.observable(),
	agentCommissionsTotal: ko.observable(),
	agentCommissionsReport: ko.observable(),

	populateAgentCommissionsData: function() {
		var date = new Date();
		if(!WebBooker.Dashboard.agentCommissionsStartDate()) {
			WebBooker.Dashboard.agentCommissionsStartDate(getDateString(new Date(date.getFullYear(), date.getMonth(), 1)));
		}
		if(!WebBooker.Dashboard.agentCommissionsEndDate()) {
			WebBooker.Dashboard.agentCommissionsEndDate(getDateString(new Date(date.getFullYear(), date.getMonth()+1, 0)));
		}

		var d = new Date(),
			startDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate()),
			endDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
			
		startDate.setHours(0 - d.getTimezoneOffset() / 60);
		endDate.setHours(23 - d.getTimezoneOffset() / 60);

		startDate.setMinutes(0);
		endDate.setMinutes(59);

		startDate.setSeconds(0);
		endDate.setSeconds(59);

		WebBooker.Dashboard.agentCommissionsData(null);
		WebBooker.Dashboard.agentCommissionsReport(null);
		WebBooker.Dashboard.agentCommissionsTotal(0);

		WebBooker.API.getAgentCommissions({
			startDate: startDate,
			endDate: endDate
		}, function(results) {
			var dataset = [],
				obj = {},
				_date, ni;

			for ( ni = 0; ni < results.data.length; ni += 1 ) { //sum all the commissions on the same date for the chart
				tmpDate = new Date( (parseInt(results.data[ni].date,10) + ( (new Date()).getTimezoneOffset() * 60 ) )  * 1000);

				results.data[ni].date = ((tmpDate.getMonth()+1)<10?'0'+(tmpDate.getMonth()+1):(tmpDate.getMonth()+1)) + '/' + (tmpDate.getDate()<10?'0'+tmpDate.getDate():tmpDate.getDate()) + '/' + tmpDate.getFullYear();


				if(!obj.hasOwnProperty(results.data[ni].date))
					obj[results.data[ni].date] = 0;

				obj[results.data[ni].date] += betterRounding( results.data[ni].amount );
			}
			
			var someDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate());
            someDate.setHours(0);
            
			var anotherDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
            anotherDate.setHours(23);
            
			//push evey date in the range for the charts and its associated commission or 0.
			//someDate needs to be in Date format for comparison with endDate, UTC format for the chart, and yyyy/mm/dd format for indexing the obj, hence all the conversions
			while ( someDate <= anotherDate ) {

				dataset.push(
					[
						someDate.getTime(), 
						obj[(((someDate.getMonth()+1)<10?'0'+(someDate.getMonth()+1):(someDate.getMonth()+1)) + '/' + (someDate.getDate()<10?'0'+someDate.getDate():someDate.getDate()) + '/' + someDate.getFullYear())] || 0
					]
				);
				
				someDate.setDate(someDate.getDate() + 1);
			}
			someDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate());
            someDate.setHours(0);
            
			anotherDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
            anotherDate.setHours(23);

			WebBooker.Dashboard.agentCommissionsData({
				name: 'Commissions',
				pointStart: (new Date(startDate)).getTime(),
				pointEnd: (new Date(endDate)).getTime(), //not used by the series, but used for the max range of the x axis
				data: dataset
			});

			var tot = 0;
			ko.utils.arrayForEach(results.data, function(comm){ //stupid ie8 doesnt do .reduce, so for loop to sum all commissions
				tot += comm.amount;
			});

			WebBooker.Dashboard.agentCommissionsTotal(parseFloat(tot));
			WebBooker.Dashboard.agentCommissionsReport(results.data);
			WebBooker.Dashboard.initAgentCommissionsChart();
		});
	},

	initAgentCommissionsChart: function() {
		var data = WebBooker.Dashboard.agentCommissionsData();
		if(!data) return false;

		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'dash-commissions-chart',
				type: 'area',
				zoomType: 'x',
				marginBottom: 100
			},
			title: {
				text: null
			},
			xAxis: {
				type: 'datetime',
				maxZoom: 30 * 24 * 360000,
				min: data.pointStart,
				max: data.pointEnd,
				title: {
					text: null
				}
			},
			yAxis: {
				title: {
					text: 'Commissions' + ' ($)'
				},
				min: 0
			},
			legend: {
				align: 'left',
				floating: true
			}
		});
		chart.addSeries(data);
		WebBooker.Dashboard.agentCommissionsChart(chart);
	},

	reloadAgentCommissionsChart: function() {
		var chart = WebBooker.Dashboard.agentCommissionsChart();
		if(chart) {
			chart.destroy();
			WebBooker.Dashboard.agentCommissionsChart(null);
		}
		WebBooker.Dashboard.populateAgentCommissionsData();
	}

};

WebBooker.Dashboard.agentCommissionsEndDate.subscribe(function(value) {
	var start = WebBooker.Dashboard.agentCommissionsStartDate(), end;
	if(start) {
		start = new Date(start);
		end = new Date(value);
		if(start.getTime() > end.getTime()) {
			WebBooker.errorMsg('You can\'t select an end date that is before the start date.');
			WebBooker.Dashboard.agentCommissionsEndDate('');
		}
	}
});


WebBooker.Dashboard.show.subscribe(function(value) {
	if(value) {
		$ar.load(wb_global_vars['plugin_url'] + '/js/lib/highcharts.js', function () {
			setTimeout(function() {
				$('.datepicker-dash').each(function() {
					$(this).datepicker({
						numberOfMonths: 2,
						dateFormat: 'mm/dd/yy',
						beforeShow: function(a) {
							if ( a.id == 'topgross-enddate' && $('#topgross-startdate').datepicker('getDate') ) {
								return {
									minDate: $('#topgross-startdate').datepicker('getDate')
								};
							}
						}
					});
				});
			}, 500);
			if(!WebBooker.Dashboard.agentCommissionsData()) {
				WebBooker.Dashboard.populateAgentCommissionsData();
			}
		});
	}
	if(!WebBooker.Dashboard.agentCommissionsData()) { // need this again for stupid ie
		WebBooker.Dashboard.populateAgentCommissionsData();
	}
});