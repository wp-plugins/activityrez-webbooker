<?php

/**
 *	ActivityRez Web Booking Engine
 *	Search PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */
global $wb;
?>

<div id="webbooker-search" data-bind="visible: WebBooker.Catalog.show, with: WebBooker.Catalog" style="display:none">
	<div data-bind="if: show">	
		<div class="header gradient-light">
			<h3><?php _e('Search Results','arez'); ?></h3>
		</div>	
		<div class="cb"></div>
		<div class="ribbonFold"></div>
		<div id="webbooker-search-summary">
			<?php include("mini-sidebar.php"); ?>
			<div id="search-shown">
				<span data-bind="text: totalResultsText"></span>
			</div>
			<div id="search-sort">
				<?php _e('Sort by','arez'); ?>
				<select class="marginZero reorder" data-bind="options: search_filter_data.sorts, value: search_params.sort, optionsText: function(item){ return item.label; }"></select>
			</div>         
		</div><!-- /webbooker-search-summary -->
	
		<div id="webbooker-search-results">
			<p class="no-results" data-bind="visible: WebBooker.Catalog.searchResults().length == 0 && !isSearching() && WebBooker.Catalog.pageIndex() >= 1"><?php _e('Your activity search returned no results.','arez'); ?></p>
			<div class="loading" data-bind="visible: WebBooker.Catalog.isSearching && !WebBooker.Catalog.hasSearched()" style="display: none;">
				<div class="inner">
					<img src="<?php echo $wb['plugin_url']; ?>images/6ajyk4p.gif" alt="loading image" width="185" height="125"><br><br>
					<?php _e('Loading activities...','arez'); ?>
				</div>
			</div>
			<div class="results clearfix" data-bind="foreach: searchResults, visible: WebBooker.Catalog.searchResults().length > 0">
				<div class="activity" data-bind="click: link">
					<div class="clearfix">
					<div class="price">
						<!-- ko if: display_price -->
						<p class="descr"><?php _e('Prices start at','arez'); ?></p>
						<p class="amount"><span data-bind="money: display_price"></span></p>
						<!-- /ko -->
						
						<!-- ko ifnot: display_price -->
						<p class="descr"><?php _e('Click to see Prices','arez'); ?></p>
						<!-- /ko -->
						<div class="cb"></div>
						<div class="ribbonFoldRight"></div>
						<a class="buttonGray buttonBig" data-bind="attr: { 'href': url }" title="<?php _e('View Activity Details','arez'); ?>"><?php _e('Details','arez'); ?>&nbsp;<i class="icon-arrow-right icon-white"></i></a>
						<div class="searchCommissions"  data-bind="visible: WebBooker.hasReseller">
							<!--ko if: !WebBooker.isOldIE -->
							<ul class="commission" data-bind="visible: r2 > 0, attr: { title: r2 + '%' }">
								<!-- ko if: r2 > 0 -->
								<li class="one"></li>
								<!-- /ko -->
								<!-- ko if: r2 > 2 -->
								<li class="two"></li>
								<!-- /ko -->
								<!-- ko if: r2 > 5 -->
								<li class="three"></li>
								<!-- /ko -->
								<!-- ko if: r2 > 10 -->
								<li class="four"></li>
								<!-- /ko -->
								<!-- ko if: r2 >= 16 -->
								<li class="five"></li>
								<!-- /ko -->
							</ul>
							<!-- /ko -->
							<!--ko if: WebBooker.isOldIE -->
								<div class="commValue" data-bind="visible: r2 > 0, attr: { title: r2 + '%' }">
									<span data-bind="html: ((r2/100) * display_price).toFixed(2)"></span>
								</div>
							<!-- /ko -->
						</div>
					</div><!-- /price -->
					<div class="info">
						<h4><a class="booking-popup-activate" title="<?php _e('Click to View Event Details','arez'); ?>" data-bind="html: title, attr: { 'href': url }"></a></h4>
						<h6 class="aid" data-bind="visible: WebBooker.Agent.user_id() > 0"><?php _e('Root Activity ID','arez'); ?>: #<span data-bind="text: activityID"></span></h6>
						<div class="thumb" data-bind="visible: thumbnail_url">
							<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-bind="attr: { 'src': thumbnail_url }" alt="<?php _e('Activity Thumbnail','arez'); ?>" />
						</div>
						<div class="summary" data-bind="html: shortDesc">
						</div>
						<div class="meta">
							<!-- ko if: destination --><div class="meta-wrap"><strong><?php _e('Location','arez'); ?>:</strong> <span data-bind="text: __(destination)"></span></div><!-- /ko -->
							<!-- ko if: duration --><div class="meta-wrap"><strong><?php _e('Duration','arez'); ?>:</strong> <span data-bind="text: __(duration)"></span></div><!-- /ko -->
							<!-- ko if: active_days --><div class="meta-wrap"><strong><?php _e('Days','arez'); ?>:</strong> <span data-bind="text: active_days"></span></div><!-- /ko -->
						</div>
					</div><!-- /info -->
					</div><!-- /clearfix -->
				</div><!-- /activity -->
			</div><!-- /results -->
		</div><!-- /webbooker-search-results -->
		
		<div id="webbooker-search-footer" data-bind="visible: parseInt(WebBooker.Catalog.totalResults(),10) > WebBooker.Catalog.searchResults().length">
			<div data-bind="visible: isSearching()"><?php _e('Loading',"arez"); ?>...</div>
			<div data-bind="visible: !isSearching(), click: function(){ WebBooker.Catalog.pageIndex(WebBooker.Catalog.pageIndex() + 1); }"><button class="buttonGray buttonBig"><?php _e('Load More','arez'); ?> (<span data-bind="text:parseInt(WebBooker.Catalog.totalResults(),10) - WebBooker.Catalog.searchResults().length"></span>)</button></div>
		</div><!-- /webbooker-search-footer -->
	</div>
</div><!-- /webbooker-search -->
