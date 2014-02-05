<div id="webbooker-activity-book" data-bind="with: WebBooker.MiniCart">
	<div class="bigPrice" data-bind="css: { unavail: !canBook(), avail: canBook }">
		<p><?php _e('Prices start at','arez');?></p>
		<h2 data-bind="money: WebBooker.ActivityView.displayPrice"></h2>
		<div data-bind="text: availabilityStatus"><?php _e('Select a date','arez'); ?></div>
	</div>
	<div class="point" data-bind="css: { unavail: !canBook(), avail: canBook }"></div>
	<div class="content">
		<div class="datepicker" data-bind="value: date"></div>
		<div id="activity-time" class="section">
			<div class="clearfix">
				<select data-bind="options: times, optionsCaption: '<?php _e('Select time','arez'); ?>', value: time, enable: date"></select>
			</div>
		</div>
		<div id="activity-cutoff" class="section" data-bind="visible: !notPastCutoff() && !inventory()">
			<p><?php _e('This activity cannot be booked under', 'arez'); ?> <!-- ko if: activity() && activity().cutoff_hours > 48 --><span data-bind="text: activity().cutoff_hours"></span><!-- /ko --><!-- ko if: activity() && activity().cutoff_hours <= 48 -->48<!-- /ko --> <?php _e('hours in advance.', 'arez'); ?></p>
			<p><?php _e('Please select a later date or contact an agent at: ', 'arez'); ?><br><!-- ko if: activity --><span data-bind="text: activity().reseller_csPhone"></span><!-- /ko --></p>
		</div>
		<!-- ko if: cartItem() && time() -->
		<div id="activity-noprices" class="section" data-bind="visible: !guests().length">
			<p><?php _e('No pricing information was found for this activity.','arez');?></p>
		</div><!-- /activity-noprices -->
		<div id="activity-prices" class="section" data-bind="foreach: guests">
			<div class="price-type">
				<div class="clearfix">
					<strong data-bind="text: name"></strong> &nbsp; <span data-bind="money: price"></span>
					<div class="price-action">
						<input type="text" class="input-mini qty" disabled="disabled" data-bind="value: qty" />
						<div class="btn-group shift-qty">
							<a href="#" class="btn btn-mini" data-bind="click: $parent.remove" title="<?php _e('Decrement','arez'); ?>"><i class="icon-minus"></i></a>
							<a href="#" class="btn btn-mini" data-bind="click: $parent.add" title="<?php _e('Increment','arez'); ?>"><i class="icon-plus"></i></a>
						</div>
					</div>
				</div>
				<div class="commissions clearfix" data-bind="visible: r2">
					<ul class="commission clearfix" data-bind="visible: r2, attr:{title: r2 + '%' }">
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
					<span class="no-commission" data-bind="visible: !r2"><?php _e('No commission found.','arez'); ?></span>
				</div>
			</div>
		</div><!-- /activity-prices -->
		<!-- /ko -->
		<!-- ko if: cartItem() -->
		<div id="activity-subtotal" class="section">
			<div class="clearfix">
				<strong><?php _e('Subtotal:','arez'); ?></strong>
				<span><span data-bind="money: cartItem().subtotal"></span></span>
			</div>
		</div><!-- /activity-subtotal -->
		<!-- /ko -->
		<p class="itemsInCart"><?php _e('Activities in Cart:','arez'); ?> <span data-bind="text: WebBooker.Cart.items().length"></span></p>
		<div class="actions section">
			<a title="<?php _e('Return to Search Results','arez'); ?>" data-bind="attr: { href: WebBooker.searchUrl }, click: WebBooker.ActivityView.analyticsContinueShopping" class="buttonGray buttonBig"><i class="icon-white icon-plus"></i> <?php _e('Add another Activity','arez'); ?></a>
			<button data-bind="enable: canAdd, click: checkout" class="buttonBlue buttonBig checkButton"><i class="icon-shopping-cart icon-white"></i> <?php _e('Check Out','arez'); ?></button>
		</div><!-- /actions -->
	</div><!-- /content -->
</div><!-- /webbooker-activity-book -->
