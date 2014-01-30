<?php

/**
 *	ActivityRez Web Booking Engine
 *	Confirmation PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */
?>

<div id="webbooker-confirmation" data-bind="visible: WebBooker.CheckoutNav.showConfirmation, with: WebBooker.Checkout" style="display:none">
	<div class="header gradient-light">
		<h3><!-- ko ifnot: errorMsg --><?php _e('Confirmation','arez'); ?><!-- /ko --><!-- ko if: errorMsg --><?php _e('Payment Error'); ?><!-- /ko --></h3>
	</div>
	<div class="cb"></div>
	<div class="ribbonFold"></div>
	<?php include("mini-sidebar.php"); ?>
	<div class="webbooker-actions checkout-actions">
		<div class="checkout-progress" style="display: none;" data-bind="style: {width: WebBooker.CheckoutNav.progressWidth}, visible: WebBooker.CheckoutNav.showConfirmation">
			<div class="chevron"></div>
		</div>
		<ul>
			<li><a href="javascript:void(0)"><?php _e('Customize Itinerary','arez'); ?></a></li>
			<li><a href="javascript:void(0)"><?php _e('Payment Information','arez'); ?></a></li>
			<li><a href="javascript:void(0)" class="current"><?php _e('Confirmation','arez'); ?></a></li>
		</ul>
	</div>
	
	<div class="content" data-bind="visible: !errorMsg() && !moreErrorMsg()">
		<p><?php _e('Thank you for booking your activities with us! Your payment has been successfully received and processed. The details are below.','arez'); ?></p>
		<p>&nbsp;</p>
		<div class="alert" data-bind="visible: sale.cfa_activities().length > 0">
			<p><strong><?php _e('Notice:','arez'); ?></strong> <?php _e('The following activities are pending confirmation from the vendor. An agent will get back to you within 72 hours regarding this reservation.','arez'); ?></p>
			<ul data-bind="foreach: sale.cfa_activities">
				<li><strong><span data-bind="html: title"></span>:</strong> <span data-bind="text: date"></span> <?php _e('at','arez'); ?> <span data-bind="text: time"></span></li>
			</ul>
			<p><?php printf( __('You may call %s to inquire about them.','arez'), $wb['reseller_cs_phone'] ); ?></p>
		</div>
		<p><strong><?php _e('Reservation Number:','arez'); ?></strong> <span data-bind="text: sale.id"></span></p>
		<p><strong><?php _e('Amount:','arez'); ?></strong> <span data-bind="clean_money: sale.total"></span></p>
		<div>
			<strong><?php _e('Payments:','arez'); ?></strong>
			<ul data-bind="foreach: sale.payments">
				<li><strong data-bind="text: label"></strong>: <span data-bind="clean_money: amount"></span></li>
			</ul>
		</div>
		<hr>
		<button class="buttonBlue buttonBig" data-bind="click: printTickets"><i class="icon-print icon-white"></i> <?php _e('Print Tickets and Itinerary','arez'); ?></button> &nbsp; <button class="buttonBlue buttonBig" data-bind="click: WebBooker.CheckoutNav.viewItinerary"><i class="icon-eye-open icon-white"></i> <?php _e('View Itinerary','arez'); ?></button> &nbsp; <button class="buttonGray buttonBig" data-bind="click: WebBooker.CheckoutNav.goToSearch"><i class="icon-white icon-share-alt"></i> <?php _e('Continue Browsing Activities','arez'); ?></button>
	</div><!-- /content -->
	
	<div class="content" data-bind="visible: errorMsg">
		<div class="alert alert-error">
			<strong data-bind="text: errorMsg"></strong><br>
			<?php _e('There was a problem processing your payment. Please call us at our Customer Support number to complete the sale. Have the following information ready when you call.','arez'); ?>
		</div>
		<p><strong><?php _e('Reservation Number:','arez'); ?></strong> <span data-bind="text: sale.id"></span></p>
		<p><strong><?php _e('Amount:','arez'); ?></strong> <span data-bind="clean_money: sale.total"></span></p>
	</div>
	<div class="content" data-bind="visible: moreErrorMsg">
		<div class="alert alert-error">
			<strong data-bind="text: moreErrorMsg()"></strong><br>
		</div>
	</div><!-- /content -->
</div><!-- /webbooker-confirmation -->
