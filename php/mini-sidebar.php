<?php global $wb; ?>
<div class="webbooker-actions">
	<ul>
		<li><a href="<?php echo $wb['wb_url']; ?>/#/Home"><?php _e("Home","arez"); ?></a></li>
		<li><a href="<?php echo $wb['wb_url']; ?>/#/Dashboard" class="disabled"><?php _e("Agency","arez"); ?></a></li>
		<li><a href="#" data-bind="click: WebBooker.Cart.viewCart, css: { disabled: WebBooker.Cart.items().length == 0 }"><?php _e("Itinerary","arez"); ?></a></li>
		<li><a href="#" data-bind="click: WebBooker.Catalog.toggle_mini_search, css: { active: WebBooker.Catalog.show_mini_search }"><?php _e("Search","arez"); ?></a></li>
		<li class="search" data-bind="visible: WebBooker.Catalog.show_mini_search">
			<div class="input-row">
				<div class="descr"><?php _e("Location","arez")?></div>
				<div class="input-wrap">
					<select data-bind="options: WebBooker.Catalog.search_filter_data.destinations, value: WebBooker.Catalog.search_params.destination, optionsCaption: 'Choose...', optionsText: 'name'"></select>
				</div>
			</div>
			<div class="input-row">
				<div class="descr"><?php _e("Keywords","arez")?></div>
				<a class="btn" href="<?php echo $wb['wb_url']; ?>/#/Search" data-bind="click: WebBooker.Catalog.loadWithFilters"><?php _e("Search","arez"); ?></a>
				<div class="input-wrap">
					<input type="text" data-bind="value: WebBooker.Catalog.search_params.keywords">
				</div>
			</div>
		</li>
	</ul>
</div><!-- /webbooker-activity-actions -->
