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
				<select data-bind="options: times, optionsCaption: '<?php _e('Select time','arez'); ?>', value: time, enable: date, optionsText: 'startTime'"></select>
			</div>
		</div>
		<div id="activity-cutoff" class="section" data-bind="visible: !notPastDeadline() && !inventory()">
			<p><?php _e('This activity is currently not available for booking at the selected date and time.', 'arez'); ?></p>
			<!-- ko if: activity --><p data-bind="visible: activity().reseller_csPhone.length > 0"><?php _e('Please choose another date and time or contact an agent at: ', 'arez'); ?><span data-bind="text: activity().reseller_csPhone"></span></p><!-- /ko -->
		</div>
		<!-- ko if: cartItem() && time() -->
		<div id="activity-noprices" class="section" data-bind="visible: !guests().length">
			<p><?php _e('No pricing information was found for this activity.','arez');?></p>
		</div><!-- /activity-noprices -->
		<div id="activity-prices" class="section" data-bind="foreach: guests">
			<div class="price-type">
				<div class="clearfix">
					<strong data-bind="html: name"></strong> &nbsp; <span data-bind="money: price"></span>
					<div class="price-action">
						<input type="text" class="input-mini qty" disabled="disabled" data-bind="value: qty" />
						<div class="btn-group shift-qty">
							<a href="#" class="btn btn-mini" data-bind="click: $parent.remove" title="<?php _e('Decrement','arez'); ?>"><i class="icon-minus"></i></a>
							<a href="#" class="btn btn-mini" data-bind="click: $parent.add" title="<?php _e('Increment','arez'); ?>"><i class="icon-plus"></i></a>
						</div>
					</div>
				</div>
				<!--ko if: r2-->
				<div class="commissions clearfix">
					<!--ko if: !WebBooker.isOldIE -->
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
					<!-- /ko -->
					<!--ko if: WebBooker.isOldIE -->
						<div class="commValue" data-bind="visible: r2 > 0, attr: { title: r2 + '%' }">
							<span data-bind="html: ((r2/100) * price()).toFixed(2)"></span>
						</div>
					<!-- /ko -->
					<span class="no-commission" data-bind="visible: !r2"><?php _e('No commission found.','arez'); ?></span>
				</div>
				<!--/ko-->
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
