<?php

/**
 *	ActivityRez Web Booking Engine
 *	Checkout PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */
global $wb;
?>
<div id="webbooker-checkout" data-bind="visible: WebBooker.CheckoutNav.show, with: WebBooker.Checkout" style="display:none">
	<div class="header gradient-light">
		<h3><?php _e('Check Out','arez'); ?></h3>
	</div>
	<a href="<?php echo $wb['wb_url']; ?>#/Itinerary" title="<?php _e("Retrieve an itinerary from a previous sale.",'arez');?>" class="buttonGray retrieve"><i class="icon-briefcase icon-white"></i> <?php _e("Retrieve An Itinerary",'arez');?></a>
	<div class="cb"></div>
	<div class="ribbonFold"></div>

	<?php include("mini-sidebar.php"); ?>
	<div class="webbooker-actions checkout-actions" data-bind="with: WebBooker.CheckoutNav">
		<div class="checkout-progress" style="display:none;" data-bind="style: { width: progressWidth }, visible: showNav">
			<div class="chevron"></div>
		</div>
		<ul data-bind="visible: showNav">
			<li><a href="#" data-target="Customize" data-bind="click: goToStep, css: { current: showCustomize }"><?php _e('Customize Itinerary','arez'); ?></a></li>
			<li><a href="#" data-target="Payment" data-bind="click: goToStep, css: { current: showPayment }"><?php _e('Payment Information','arez'); ?></a></li>
			<li><a href="#" data-target="Confirmation" data-bind="click: goToStep, css: { current: showConfirmation }"><?php _e('Confirmation','arez'); ?></a></li>
		</ul>
	</div>

	<div id="checkout-empty" class="content" data-bind="visible: !sale.items().length">
		<p><?php _e("You don't have any activities added yet.","arez"); ?></p>
	</div><!-- /checkout-empty -->

	<div id="checkout-customize" class="content" data-bind="visible: WebBooker.CheckoutNav.showNav() && WebBooker.CheckoutNav.showCustomize() && sale.items().length">
		<div data-bind="if: WebBooker.CheckoutNav.show">
			<p>
				<?php printf( __( 'All activities are managed by %s.', 'arez'), $wb['operator_name'] ); ?>
				<?php printf( __( 'The information you provide here is covered by the %s Privacy Policy.','arez'), $wb['operator_name'] ); ?> 
			</p>
			<p><a href="#reseller-privacy-policy" class="buttonGray" data-toggle="modal"><i class="icon-eye-open icon-white"></i> <?php _e('View Privacy Policy','arez'); ?></a></p>
			<br />
			<div class="box-rounded leadGuestBox" data-bind="with: WebBooker.Checkout.sale.leadGuest">
				<h3><?php _e('Lead Guest Information','arez'); ?></h3>
				<form class="form-vertical">
					<p><?php _e('The lead guest is the point of contact for the people in your group.','arez'); ?></p>
					<?php if( $wb['i18n'] != 'ja' ) { ?>
					<div class="pull-left inputMarg">
						<label><?php _e('First Name','arez'); ?></label>
						<input placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" type="text" data-bind="value: first_name" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !first_name()}"></div>
					</div>
					<?php } ?>
					<div class="pull-left inputMarg">
						<label><?php _e('Last Name','arez'); ?></label>
						<input placeholder="<?php _e('Ex. &quot;Doe&quot;','arez'); ?>" type="text" data-bind="value: last_name" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !last_name()}"></div>
					</div>
					<?php if( $wb['i18n'] == 'ja' ) { ?>
					<div class="pull-left inputMarg">
						<label><?php _e('First Name','arez'); ?></label>
						<input placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" type="text" data-bind="value: first_name" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !first_name()}"></div>
					</div>
					<?php } ?>
					<div class="pull-left inputMarg">
						<label><?php _e('Telephone Number','arez'); ?></label>
						<input type="text" class="imeOff" data-bind="value: phone, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;(298) 555-2941&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !phone()}"></div>
					</div>
					<div class="pull-left inputMarg">
						<label><?php _e('E-mail Address','arez'); ?></label>
						<input type="text" class="imeOff" data-bind="value: email, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;jdoe@gmail.com&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !email()}"></div>
					</div>
					<div class="pull-left inputMarg">
						<input type="checkbox" data-bind="checked: WebBooker.Checkout.copyNames"> <label style="display:inline"><?php _e("Copy name to all guests",'arez');?></label>
					</div>
					<div class="cb"></div>
				</form>
			</div><!-- /box-rounded/well -->
	
			<div id="checkout-activities" data-bind="foreach: WebBooker.Checkout.sale.items">
				<div class="activity box-rounded">
					<div class="actions">
						<a href="#" class="buttonGray" title="<?php _e('Remove Activity','arez'); ?>" data-bind="click: remove"><i class="icon-remove icon-white"></i></a>
					</div>
	
					<h3><a data-bind="html: title, attr: { 'href': url }"></a></h3>
					<div class="cb"></div>
					<div class="ribbonFold" style="left:-23px;top:-3px;"></div>
	
					<div class="info">
						<strong><?php _e('Date:','arez'); ?></strong> <span data-bind="text: i18n_date()"></span> &nbsp;
						<strong><?php _e('Time:','arez'); ?></strong> <span data-bind="text: time.startTime"></span> &nbsp;
						<strong><?php _e('Location:','arez'); ?></strong> <span data-bind="text: __(destination())()"></span>
						<!-- ko if: fees().length -->
						<br /><br />
						<strong><?php _e('This activity has mandatory fees per guest:','arez'); ?></strong><br />
						<ul data-bind="foreach: fees">
							<li><span data-bind="html: decodeURIComponent(label)"></span>: <span data-bind="html: displayText"></span></li>
						</ul>
						<!-- /ko -->
					</div>
					
					<!-- ko if: transportation().length -->
					<div class="transportation" data-bind="attr: { id: row_id }, with: transportView">
						<div class="heading-bar">
							<div class="clearfix">
								<span class="heading-icon transp-icon"></span>
								<h4 class="heading-text"><?php _e('Transportation','arez'); ?></h4>
							</div>
						</div>
						<div class="padding clearfix transport-option">
							<div class="pull-left selectMarg">
								<label><?php _e('Will your guests need transportation?','arez'); ?></label>
								<div class="reqSideGreen" data-bind="css: { reqSideRed: selectTransport() == 'empty' }"></div>
								<select class="input-large" data-bind="value: selectTransport">
									<option value="empty" selected="selected"><?php _e('Choose...', 'arez'); ?></option>
									<option value="true"><?php _e('Yes, we need transportation.', 'arez'); ?></option>
									<option value="false"><?php _e('No, we do not need transportation.', 'arez'); ?></option>
								</select>
							</div>
							<div class="pull-left" style="clear:both" data-bind="visible: wantsTransport">
								<p><?php _e('Please select which type of vehicle you would prefer.', 'arez'); ?></p>
								<select data-bind="options: transportationTypes, value: selectedTransType, optionsCaption: '<?php _e('Choose...','arez'); ?>'">
								</select>
							</div>
							<div class="pull-left" data-bind="visible: wantsTransport() && selectedTransType()">
								<div class="location-select">
									<p><?php _e("We need to know where you're staying at so we can suggest the nearest transportation option.","arez"); ?></p>
									<input type="radio" value="hotel" data-bind="checked: locationSelect" /> <label><?php _e('Hotel','arez'); ?></label> &nbsp;
									<input type="radio" value="address" data-bind="checked: locationSelect" /> <label><?php _e('Local Address','arez'); ?></label>
								</div>
								<div class="location-entry">
									<!-- ko if: locationSelect() == 'hotel' -->
									<div class="pull-left inputMarg">
										<label><?php _e('Hotel','arez'); ?></label>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !hotel()}"></div>
										<input type="text" data-bind="hotelTypeahead: { value: hotel }, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e("Type to search...",'arez');?>" data-provide="typeahead" />
									</div>
									
									<div class="pull-left inputMarg">
										<label><?php _e('Hotel Room/Confirmation Number','arez'); ?></label>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !room()}"></div>
										<input type="text" data-bind="value: room, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;1227&quot;','arez'); ?>" />
									</div>
									
									<div class="cb"></div>
									<!-- /ko -->
									<!-- ko if: locationSelect() == 'address' -->
									<?php if( $wb['i18n'] != 'ja' ) { ?>
									<div class="pull-left inputMarg">
										<label><?php _e('Address','arez'); ?></label>
										<input type="text" data-bind="value: home.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.address()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('City','arez'); ?></label>
										<input type="text" data-bind="value: home.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.city()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('State/Province','arez'); ?></label>
										<input type="text" data-bind="value: home.state, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;West Virginia&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.state()}"></div>
									</div>
									<?php } ?>
									<div class="pull-left inputMarg">
										<label><?php _e('Zip/Postal Code','arez'); ?></label>
										<input type="text" class="imeOff" data-bind="value: home.postal, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.postal()}"></div>
									</div>
									<div class="cb"></div>
									<div class="pull-left selectMarg">
										<label><?php _e('Country','arez'); ?></label>
										<select class="input-large" data-bind="options: WebBooker.bootstrap.wb_countries, value: home.country, optionsText: 'name', optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.country()}"></div>
									</div>
									<?php if( $wb['i18n'] == 'ja' ) { ?>
									<div class="cb"></div>
									<div class="pull-left inputMarg">
										<label><?php _e('State/Province','arez'); ?></label>
										<input type="text" data-bind="value: home.state, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;West Virginia&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.state()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('City','arez'); ?></label>
										<input type="text" data-bind="value: home.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.city()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('Address','arez'); ?></label>
										<input type="text" data-bind="value: home.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.address()}"></div>
									</div>
									<?php } ?>
									<div class="cb"></div>
									<div class="pull-left addressMarg buttonPadding">
										<button class="buttonGray" data-bind="click: doGeocode"><?php _e('Apply','arez'); ?></button>
										<!-- ko if: stored_lat -->
										<button class="buttonBlue" data-bind="click: acceptGeocode"><?php _e('Accept','arez'); ?></button>
										<!-- /ko -->
									</div>
									<!-- /ko -->
								</div>
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'hotel' && !hotel() -->
								<p class="cb"><br><strong><?php _e('Please select a hotel.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' && !lat() && !stored_lat() -->
								<p class="cb"><br><strong><?php _e('Please enter a valid address.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' && stored_lat() -->
								<p class="cb"><br><strong><?php _e('Click accept if this looks good.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' -->
								<div class="map-canvas"></div>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && ((locationSelect() == 'hotel' && hotel()) || (locationSelect() == 'address' && lat() && lng())) -->
								<div class="transTop">
									<p data-bind="css: {required: !$parent.transport() && wantsTransport}"><strong><?php _e('Transportation Pickup Location','arez'); ?></strong></p>
									<span><?php _e('Showing the nearest pickup locations.','arez'); ?></span>
									<button class="buttonGray" data-bind="visible: transportation().length > 3, click: toggleTransportMore">
										<!--ko if: !showMoreTransports() --><?php _e('Show More','arez'); ?><!--/ko-->
										<!--ko if: showMoreTransports --><?php _e('Show Less','arez'); ?><!--/ko-->
									</button>
								</div>
								<ul class="transport" data-bind="foreach: transportsToShow">
									<li class="clearfix">
										<div class="selection">
											<input type="checkbox" data-bind="checked: selected" />
										</div>
										<div>
											<p>
												<strong data-bind="money: amount"></strong>
												<!-- ko if: distance -->
												- <span data-bind="text: distance"></span> <?php _e('miles from your location.','arez'); ?>
												<!-- /ko -->
											</p>
											<p data-bind="html: name"></p>
											<!-- ko if: address -->
											<p data-bind="html: address"></p>
											<!-- /ko -->
											<!-- ko if: instructions -->
											<p>
												<strong><?php _e('Instructions:','arez'); ?></strong>
												<span class="instructions" data-bind="html: instructions"></span>
											</p>
											<!-- /ko -->
										</div>
									</li>
								</ul>
								<!-- /ko -->
							</div>
						</div><!-- .padding -->
					</div><!-- .transportation -->
					<!-- /ko -->
	
					<!-- ko foreach: tickets -->
					<div class="guest clearfix" data-bind="attr: { id: row_id }">
						<div class="heading-bar heading-ticket">
							<div class="clearfix">
								<span class="heading-icon ticket-icon"></span>
								<h4 class="heading-text">
									<strong data-bind="html: name"></strong><br>
									<span data-bind="clean_money: price"></span>
								</h4>
								<div class="actions">
									<div class="options-apply" data-bind="visible: $index() == 0 && (options().length > 0 || transportView.transportation().length > 0 || !WebBooker.Checkout.copyNames())">
										<input type="checkbox" data-bind="checked: $parent.copyToAll" value="true" />
										<?php _e('Apply to all guests on this activity.','arez'); ?>
									</div>
									<a href="#" class="buttonGray" title="<?php _e('Remove Guest','arez'); ?>" data-bind="click: $parent.removeGuest"><i class="icon-remove icon-white"></i></a>
								</div>
							</div>
						</div>
						<div class="padding" data-bind="visible: !$parent.copyToAll() || ($index() == 0 && $parent.copyToAll())">
							<!-- ko ifnot: WebBooker.Checkout.copyNames -->
							<div class="name">
								<?php if( $wb['i18n'] != 'ja' ) { ?>
								<div class="pull-left nameMarg">
									<label><?php _e('First Name', 'arez'); ?><br>
									<input type="text" class="input-medium" data-bind="value: first_name" placeholder="<?php _e("First name",'arez');?>" />
									</label>
								</div>
								<?php } ?>
								<div class="pull-left nameMarg">
									<label><?php _e('Last Name', 'arez'); ?><br>
									<input type="text" class="input-medium" data-bind="value: last_name" placeholder="<?php _e("Last name",'arez');?>" />
									</label>
								</div>
								<?php if( $wb['i18n'] == 'ja' ) { ?>
								<div class="pull-left nameMarg">
									<label><?php _e('First Name', 'arez'); ?><br>
									<input type="text" class="input-medium" data-bind="value: first_name" placeholder="<?php _e("First name",'arez');?>" />
									</label>
								</div>
								<?php } ?>
							</div>
							<div style="clear:both"></div>
							<!-- /ko -->
							<div class="options" data-bind="visible: options().length > 0">
								<div class="heading-bar heading-options">
									<div class="clearfix">
										<span class="heading-icon icon-options"></span>
										<h4 class="heading-text"><?php _e('Options','arez'); ?></h4>
										<!-- <div class="actions clearfix">
											<a href="#" class="buttonBlue" title="<?php _e('Edit Guest Options','arez'); ?>" data-bind="visible: $index() == 0 || ($index() != 0 && !$parent.copyToAll()), click: toggleOptions"><?php _e('Edit Options', 'arez'); ?></a>
										</div> -->
									</div>
								</div>
								<ul data-bind="foreach: options">
									<li class="clearfix inputMarg">
										<label><span data-bind="text: name"></span></label>
										<!-- ko if: type.toLowerCase() == 'dropdown' || type.toLowerCase() == 'combo' || type.toLowerCase() == 'radio' -->
										<select class="input-medium" data-bind="options: items, value: selectedItem, optionsText: function(item) {
											if(item.fee && item.fee != '' && item.fee != '0') {
												return item.name + ' +' + parseFloat(item.fee).toFixed(2);
											} else {
												return item.name;
											}
										}, optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
										<div class="reqSideGreen" data-bind="if: required, css: {reqSideRed: required && !selectedItem()}"></div>
										<!-- /ko -->
										<!-- ko if: type.toLowerCase() == 'text' -->
										<input type="text" class="input-small" data-bind="value: text, valueUpdate: ['afterkeydown','propertychange','input']" />
										<div class="reqSideGreen" data-bind="if: required, css: {reqSideRed: required && !text()}"></div>
										<!-- /ko -->
									</li>
								</ul>
								<!-- <p data-bind="visible: showOptions() && options().length == 0"><?php _e('No options available for this activity.','arez'); ?></p> -->
							</div>
							<div class="heading-bar heading-transpmini" data-bind="visible: transport">
								<div class="clearfix">
									<span class="heading-icon transp-icon-gray"></span>
									<!-- ko if: transportView.selectTransport() == 'true' && transport() -->
									<h4 class="heading-text" data-bind="text: transport().name"></h4>
									<!-- /ko -->
									<!-- ko if: transportView.selectTransport() == 'false' -->
									<h4 class="heading-text">Transportation Declined</h4>
									<!-- /ko -->
									<div class="actions">
										<a href="#" class="buttonGray" title="<?php _e('Change transportation selection','arez'); ?>" data-bind="click: toggleEditTransport"><?php _e('Change', 'arez'); ?></a>
									</div>
								</div>
							</div>
							<div style="clear:both"></div>
							<!-- ko if: editTransport() -->
							<!-- ko with: transportView -->
							<div class="transport clearfix" data-bind="visible: transportation().length">
								<div class="pull-left selectMarg">
									<label><?php _e('Will this guest need transportation?','arez'); ?></label>
									<div class="reqSideGreen" data-bind="css: { reqSideRed: selectTransport() == 'empty' }"></div>
									<select class="input-medium" data-bind="value: selectTransport">
										<option value="empty" selected="selected"><?php _e('Choose...', 'arez'); ?></option>
										<option value="true"><?php _e('Yes, I need transportation.', 'arez'); ?></option>
										<option value="false"><?php _e('No, I do not need transportation.', 'arez'); ?></option>
									</select>
								</div>
								<div class="pull-left" style="clear:both" data-bind="visible: wantsTransport">
									<p><?php _e('Please select which type of vehicle you would prefer.', 'arez'); ?></p>
									<select data-bind="options: transportationTypes, value: selectedTransType, optionsCaption: 'Choose...'">
									</select>
								</div>
							</div>
							<div class="transport-option" data-bind="visible: transportation().length && wantsTransport()">
								<div class="location-select">
									<p><?php _e("We need to know where you're staying at so we can suggest the nearest transportation option.","arez"); ?></p>
									<input type="radio" value="hotel" data-bind="checked: locationSelect" /> <label><?php _e('Hotel','arez'); ?></label> &nbsp;
									<input type="radio" value="address" data-bind="checked: locationSelect" /> <label><?php _e('Local Address','arez'); ?></label>
								</div>
								<div class="location-entry">
									<!-- ko if: locationSelect() == 'hotel' -->
									<div class="pull-left inputMarg">
										<label><?php _e('Hotel','arez'); ?></label>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !hotel()}"></div>
										<input type="text" data-bind="hotelTypeahead: { value: hotel }, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e("Type to search...",'arez');?>" data-provide="typeahead" />
									</div>
									
									<div class="pull-left inputMarg">
										<label><?php _e('Hotel Room/Confirmation Number','arez'); ?></label>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !room()}"></div>
										<input type="text" data-bind="value: room, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;1227&quot;','arez'); ?>" />
									</div>
									
									<div class="cb"></div>
									<!-- /ko -->
									<!-- ko if: locationSelect() == 'address' -->
									<?php if( $wb['i18n'] != 'ja' ) { ?>
									<div class="pull-left inputMarg">
										<label><?php _e('Address','arez'); ?></label>
										<input type="text" data-bind="value: home.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.address()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('City','arez'); ?></label>
										<input type="text" data-bind="value: home.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.city()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('State/Province','arez'); ?></label>
										<input type="text" data-bind="value: home.state, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;West Virginia&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.state()}"></div>
									</div>
									<?php } ?>
									<div class="pull-left inputMarg">
										<label><?php _e('Zip/Postal Code','arez'); ?></label>
										<input type="text" class="imeOff" data-bind="value: home.postal, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.postal()}"></div>
									</div>
									<div class="cb"></div>
									<div class="pull-left selectMarg">
										<label><?php _e('Country','arez'); ?></label>
										<select class="input-medium" data-bind="options: WebBooker.bootstrap.wb_countries, value: home.country, optionsText: 'name', optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.country()}"></div>
									</div>
									<?php if( $wb['i18n'] == 'ja' ) { ?>
									<div class="cb"></div>
									<div class="pull-left inputMarg">
										<label><?php _e('State/Province','arez'); ?></label>
										<input type="text" data-bind="value: home.state, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;West Virginia&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.state()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('City','arez'); ?></label>
										<input type="text" data-bind="value: home.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.city()}"></div>
									</div>
									<div class="pull-left inputMarg">
										<label><?php _e('Address','arez'); ?></label>
										<input type="text" data-bind="value: home.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
										<div class="reqSideGreen" data-bind="css: {reqSideRed: !home.address()}"></div>
									</div>
									<?php } ?>
									<div class="cb"></div>
									<div class="pull-left addressMarg buttonPadding">
										<button class="buttonGray" data-bind="click: doGeocode"><?php _e('Apply','arez'); ?></button>
										<!-- ko if: stored_lat -->
										<button class="buttonBlue" data-bind="click: acceptGeocode"><?php _e('Accept','arez'); ?></button>
										<!-- /ko -->
									</div>
									<!-- /ko -->
								</div>
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'hotel' && !hotel() -->
								<p class="cb"><br><strong><?php _e('Please select a hotel.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' && !lat() && !stored_lat() -->
								<p class="cb"><br><strong><?php _e('Please enter a valid address.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' && stored_lat() -->
								<p class="cb"><br><strong><?php _e('Click accept if this looks good.','arez'); ?></strong></p>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && locationSelect() == 'address' -->
								<div class="map-canvas"></div>
								<!-- /ko -->
								<!-- ko if: wantsTransport() && locationSelect() && ((locationSelect() == 'hotel' && hotel()) || (locationSelect() == 'address' && lat() && lng())) -->
								<div class="transTop">
									<p data-bind="css: {required: !$parent.transport() && wantsTransport}"><strong><?php _e('Transportation Pickup Location','arez'); ?></strong></p>
									<span><?php _e('Showing the nearest pickup locations.','arez'); ?></span>
									<button class="buttonGray" data-bind="visible: transportation().length > 3, click: toggleTransportMore">
										<!--ko if: !showMoreTransports() --><?php _e('Show More','arez'); ?><!--/ko-->
										<!--ko if: showMoreTransports --><?php _e('Show Less','arez'); ?><!--/ko-->
										</button>
								</div>
								<ul class="transport" data-bind="foreach: transportsToShow">
									<li class="clearfix">
										<div class="selection">
											<input type="checkbox" data-bind="checked: selected" />
										</div>
										<div class="info">
											<p>
												<strong data-bind="money: amount"></strong>
												<!-- ko if: distance -->
												- <span data-bind="text: distance"></span> <?php _e('miles from your location.','arez'); ?>
												<!-- /ko -->
											</p>
											<p data-bind="html: name"></p>
											<!-- ko if: address -->
											<p data-bind="html: address"></p>
											<!-- /ko -->
											<!-- ko if: instructions -->
											<p>
												<strong><?php _e('Instructions:','arez'); ?></strong>
												<span class="instructions" data-bind="html: instructions"></span>
											</p>
											<!-- /ko -->
										</div>
									</li>
								</ul>
								<!-- /ko -->
							</div>
							<!-- /ko -->
							<!-- /ko -->
						</div>
					</div>
					<!-- /ko -->
	
					<div class="summary">
						<strong><?php _e('Activity Subtotal:','arez'); ?></strong> <span data-bind="clean_money: subtotal"></span>
					</div><!-- /summary -->
				</div><!-- /activity -->
			</div>
		</div><!-- /checkout-activities -->

		<div id="promotion-code" class="box-rounded">
			<h3><?php _e('Discount or Promotion Code','arez'); ?></h3>
			<p><?php _e('If you\'ve got a discount or promotion code, enter it here.','arez'); ?></p>
			<form class="form-vertical">
				<input type="text" class="input-medium" placeholder="<?php _e("Enter code...",'arez');?>" data-bind="value: discountCode" />
				<button type="submit" class="buttonBlue" data-bind="click: getDiscount">
					<i class="icon-ok icon-white"></i> 
					<!-- ko if: verifying --><?php echo __('Verifying','arez') . '...'; ?><!-- /ko -->
					<!-- ko ifnot: verifying --><?php _e('Apply','arez'); ?><!-- /ko -->
				</button>
				<!-- ko if: sale.discount() -->
					<button class="buttonGray" data-bind="click: clearDiscount">
						<i class="icon-remove icon-white"></i> <?php _e('Clear','arez'); ?>
					</button>
				<!-- /ko -->
				<!-- ko if: sale.discount() && !verifying() -->
				<p>
					<strong><?php _e('Name:','arez'); ?></strong> <span data-bind="text: sale.discount().name"></span><br />
					<strong><?php _e('Amount:','arez'); ?></strong>
						<!-- ko if: sale.discount().amount --><span data-bind="money: sale.discount().amount"></span><!-- /ko -->
						<!-- ko if: sale.discount().rate --><span data-bind="text: sale.discount().rate"></span><!-- /ko -->
				</p>
				<!-- /ko -->
				<p data-bind="visible: !codeGood()"><?php _e('Sorry, that discount or promotion code isn\'t valid.','arez'); ?></p>
			</form>
		</div><!-- /promo codes -->

		<div class="box-rounded" data-bind="with: WebBooker.Checkout.sale">
			<h3><?php _e('Summary','arez'); ?></h3>
			<table class="table checkout-review">
				<thead>
					<tr>
						<th class="id"><?php _e('Activity','arez'); ?></th>
						<th class="total"><?php _e('Subtotal','arez'); ?></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td class="tfoot-label"><?php _e('Subtotal:','arez'); ?></td>
						<td><span data-bind="clean_money: subtotal"></span></td>
					</tr>
					<tr>
						<td class="tfoot-label" style="border-top: 0"><?php _e('Discount:','arez'); ?></td>
						<td>(<span data-bind="clean_money: discountTotal"></span>)</td>
					</tr>
					<tr>
						<td class="tfoot-label" style="border-top: 0"><?php _e('Taxes:','arez'); ?></td>
						<td><span data-bind="clean_money: taxes"></span></td>
					</tr>
					<tr>
						<td class="tfoot-label" style="border-top: 0"><?php _e('Total:','arez'); ?></td>
						<td><span data-bind="clean_money: total"></span></td>
					</tr>
				</tfoot>
				<tbody data-bind="foreach: items">
					<tr>
						<td>
							<span data-bind="html: title"></span>
							<ul class="guests" data-bind="foreach: guests">
								<li><strong><span data-bind="text: qty"></span> <span data-bind="text: name"></span>:</strong> <span data-bind="clean_money: total"></span></li>
							</ul>
							<ul class="fees">
								<li><strong><?php _e('Fees','arez'); ?>: </strong><span data-bind="clean_money:optionTotal"></span></li>
								<li><strong><?php _e('Transportation','arez'); ?>: </strong><span data-bind="clean_money:transportTotal"></span></li>
							</ul>
						</td>
						<td><span data-bind="clean_money: subtotal"></span></td>
					</tr>
				</tbody>
			</table>
		</div><!-- /box-rounded -->

		<div class="actions clearfix">
			<button data-target="Payment" class="buttonBlue buttonBig float-right" data-bind="click: WebBooker.CheckoutNav.goToStep, scrollTopOnClick: true"><?php _e('Continue','arez'); ?> <i class="icon-chevron-right icon-white"></i></button>
		</div>

	</div><!-- /checkout-customize -->

	<div id="checkout-contact" class="content" data-bind="visible: WebBooker.CheckoutNav.showContact() && sale.items().length">
		<p>
			<?php printf( __( 'All activities are managed by %s.', 'arez'), $wb['operator_name'] ); ?>
			<?php printf( __( 'The information you provide here is covered by the %s Privacy Policy.','arez'), $wb['operator_name'] ); ?> 
		</p>
		<p><a href="#reseller-privacy-policy" title="<?php _e("View the privacy policy",'arez');?>" class="buttonGray" data-toggle="modal"><i class="icon-eye-open icon-white"></i> <?php _e('View Privacy Policy','arez'); ?></a></p>
		<p>&nbsp;</p>

		<form id="checkout-guest-info" class="box-rounded" data-bind="with: WebBooker.Checkout.sale.leadGuest">
			<p><?php _e('Please enter the contact information for the person making the reservations. Fields with an asterisk are required.','arez'); ?></p>
			<br />
			<?php if( $wb['i18n'] != 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('First Name','arez'); ?></label>
				<input type="text" data-bind="value: first_name" placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" />
				<div class="reqSideGreen" data-bind="css: {reqSideRed: !first_name()}"></div>
			</div>
			<?php } ?>
			<div class="inputMarg">
				<label><?php _e('Last Name','arez'); ?></label>
				<input type="text" data-bind="value: last_name" placeholder="<?php _e('Ex. &quot;Doe&quot;','arez'); ?>" />
				<div class="reqSideGreen" data-bind="css: {reqSideRed: !last_name()}"></div>
			</div>
			<?php if( $wb['i18n'] == 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('First Name','arez'); ?></label>
				<input type="text" data-bind="value: first_name" placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" />
				<div class="reqSideGreen" data-bind="css: {reqSideRed: !first_name()}"></div>
			</div>
			<?php } ?>
			<div class="inputMarg">
				<label><?php _e('Telephone Number','arez'); ?></label>
				<input type="text" class="imeOff" data-bind="value: phone, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;(298) 555-2941&quot;','arez'); ?>" />
				<div class="reqSideGreen" data-bind="css: {reqSideRed: !phone()}"></div>
			</div>
			<div class="inputMarg">
				<label><?php _e('E-mail Address','arez'); ?></label>
				<input type="text" class="imeOff" data-bind="value: email, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;jdoe@gmail.com&quot;','arez'); ?>" />
				<div class="reqSideGreen" data-bind="css: {reqSideRed: !email()}"></div>
			</div>
			<?php if( $wb['i18n'] != 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('Address','arez'); ?></label>
				<input type="text" data-bind="value: address" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
			</div>
			<div class="inputMarg">
				<label><?php _e('City','arez'); ?></label>
				<input type="text" data-bind="value: city" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
			</div>
			<?php } ?>
			<?php if( $wb['i18n'] == 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('Zip/Postal Code','arez'); ?></label>
				<input type="text" class="imeOff" data-bind="value: postal" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
			</div>
			<?php } ?>
			<div class="inputMarg">
				<label><?php _e('Country','arez'); ?></label>
				<select data-bind="options: WebBooker.bootstrap.wb_countries, value: country, optionsText: 'name'"></select>
			</div>
			<!-- ko if: country -->
			<div class="inputMarg">
				<label><?php _e('State/Province','arez'); ?></label>
				<!-- ko if: country().name == 'United States' -->
				<select name="state" data-bind="value: state, options: WebBooker.us_states, optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
				<!-- /ko -->
				<!-- ko if: country().name != 'United States' -->
				<input type="text" data-bind="value: state" placeholder="<?php _e('Ex. &quot;Alberta&quot;','arez'); ?>" />
				<!-- /ko -->
			</div>
			<!-- /ko -->
			<?php if( $wb['i18n'] != 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('Zip/Postal Code','arez'); ?></label>
				<input type="text" class="imeOff" data-bind="value: postal" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
			</div>
			<?php } ?>
			<?php if( $wb['i18n'] == 'ja' ) { ?>
			<div class="inputMarg">
				<label><?php _e('City','arez'); ?></label>
				<input type="text" data-bind="value: city" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
			</div>
			<div class="inputMarg">
				<label><?php _e('Address','arez'); ?></label>
				<input type="text" data-bind="value: address" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
			</div>
			<?php } ?>
		</form>

		<div class="actions clearfix">
			<button data-target="Customize" class="buttonGray buttonBig float-left" data-bind="click: WebBooker.CheckoutNav.goToStep, scrollTopOnClick: true"><i class="icon-chevron-left icon-white"></i> <?php _e('Go Back','arez'); ?></button>
			<button data-target="Payment" class="buttonBlue buttonBig float-right" data-bind="click: WebBooker.CheckoutNav.goToStep, scrollTopOnClick: true"><?php _e('Continue','arez'); ?> <i class="icon-chevron-right icon-white"></i></button>
		</div>
	</div><!-- /checkout-contact -->

	<div id="checkout-payment" class="content" data-bind="if: WebBooker.CheckoutNav.showPayment() && sale.items().length">
		<!-- ko if: WebBooker.bootstrap.payment_types -->
		<div data-bind="visible: WebBooker.bootstrap.payment_types.length > 1">
			<p><?php _e('Please select which payment type you prefer.','arez'); ?></p>
			<p>
				<select data-bind="options: WebBooker.bootstrap.payment_types, optionsText: function(item){ return item.label; }, value: WebBooker.Checkout.paymentType, optionsCaption: '<?php _e("Choose one...",'arez');?>'"></select>
			</p>
		</div>
		<div data-bind="visible: WebBooker.bootstrap.payment_types.length == 1">
			<p><?php _e('Pay with:','arez'); ?> <span data-bind="text: WebBooker.bootstrap.payment_types[0].label"></span></p>
		</div>
		<!-- /ko -->
		<div data-bind="foreach: WebBooker.Checkout.sale.payments">
			<!-- ko if: type == 'credit' -->
				<div class="box-rounded">
					<h3><?php _e('Payment Information','arez'); ?></h3>
					<fieldset>
						<?php if( $wb['i18n'] != 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('First Name','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.first_name()}"></div>
							<input type="text" data-bind="value: payee.first_name, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<div class="inputMarg">
							<label><?php _e('Last Name','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.last_name()}"></div>
							<input type="text" data-bind="value: payee.last_name, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Doe&quot;','arez'); ?>" />
						</div>
						<?php if( $wb['i18n'] == 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('First Name','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.first_name()}"></div>
							<input type="text" data-bind="value: payee.first_name, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<?php if( $wb['i18n'] == 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('Zip/Postal Code','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.postal()}"></div>
							<input type="text" class="imeOff" data-bind="value: payee.postal, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<?php if( $wb['i18n'] != 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('Address','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.address()}"></div>
							<input type="text" data-bind="value: payee.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
						</div>
						<div class="inputMarg">
							<label><?php _e('City','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.city()}"></div>
							<input type="text" data-bind="value: payee.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<div class="selectMarg">
							<label><?php _e('Country','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.country()}"></div>
							<select data-bind="value: payee.country, options: WebBooker.bootstrap.wb_countries, optionsText: 'name'"></select>
						</div>						
						<!-- ko if: payee.country -->
						<div class="selectMarg">
							<label><?php _e('State','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.state()}"></div>
							<!-- ko if: payee.country().name == 'United States' -->
							<select name="state" data-bind="value: payee.state, options: WebBooker.us_states, optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
							<!-- /ko -->
							<!-- ko if: payee.country().name != 'United States' -->
							<input type="text" data-bind="value: payee.state, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Alberta&quot;','arez'); ?>" />
							<!-- /ko -->
						</div>
						<!-- /ko -->
						<?php if( $wb['i18n'] == 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('City','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.city()}"></div>
							<input type="text" data-bind="value: payee.city, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;Springfield&quot;','arez'); ?>" />
						</div>
						<div class="inputMarg">
							<label><?php _e('Address','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.address()}"></div>
							<input type="text" data-bind="value: payee.address, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;742 Evergreen Terr.&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<?php if( $wb['i18n'] != 'ja' ) { ?>
						<div class="inputMarg">
							<label><?php _e('Zip/Postal Code','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.postal()}"></div>
							<input type="text" class="imeOff" data-bind="value: payee.postal, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;31608&quot;','arez'); ?>" />
						</div>
						<?php } ?>
						<div class="inputMarg">
							<label><?php _e('Phone Number','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !payee.phone()}"></div>
							<input type="text" class="imeOff" data-bind="value: payee.phone, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;(298) 555-2941&quot;','arez'); ?>" />
						</div>
					</fieldset>

					<!-- ko if: useHostedPage -->
					<br /><p><?php _e('Your card information will be collected on the next page.','arez'); ?></p>
					<!-- /ko -->
				</div><!-- /box-rounded -->

				<!-- ko if: !useHostedPage -->
				<div class="box-rounded">
					<h3><?php _e('Card Information','arez'); ?></h3>

					<fieldset>
						<div class="input-append">
							<div class="inputMarg">
								<label><?php _e('Card Number','arez'); ?></label>
								<div class="reqSideGreen" data-bind="css: {reqSideRed: !card.number()}"></div>
								<input class="span3 imeOff" type="text" name="cardnumber" data-bind="value: card.number" placeholder="<?php _e("Ex. &quot;1234567890123456&quot;",'arez');?>" style="margin: 0 0 0 20px;">
								<button tabindex="-1" class="buttonGray buttonInput card-validation" title="Validate card" data-bind="click: validate,css: { 'buttonRed': card.errors().length, 'buttonGreen': !card.errors().length && card.number()}">
									<i class="icon-ok icon-white"></i>
								</button>
							</div>
						</div>

						<div class="alert alert-error" data-bind="visible: card.errors().length" style='display:none;'>
							<?php _e('The card number you entered might be incorrect or not one of our supported cards.','arez'); ?>
						</div>

						<div class="help-block">
							<span class="cc-type amex" data-bind="fadeOpacity: card.type()=='amex'" alt="Amex Card"></span>
							<span class="cc-type mc" data-bind="fadeOpacity: card.type()=='mastercard'" alt="Master Card"></span>
							<span class="cc-type visa" data-bind="fadeOpacity: card.type()=='visa'" alt="Visa"></span>
							<span class="cc-type disc" data-bind="fadeOpacity: card.type()=='discover'" alt="Discover"></span>
						</div>
						<br />
						<div class="selectMarg">
							<label><?php _e('Expiration Month','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !card.month()}"></div>
							<select name="expmonth" data-bind="value: card.month, options: months, optionsCaption: '<?php _e('Choose...','arez'); ?>', optionsValue: 'index', optionsText: 'label'"></select>
						</div>
						<div class="selectMarg">
							<label><?php _e('Expiration Year','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !card.year()}"></div>
							<select name="expyear" data-bind="value: card.year, options: years, optionsCaption: '<?php _e('Choose...','arez'); ?>'"></select>
						</div>
						<div class="inputMarg specialReq">
							<label><?php _e('Security Code','arez'); ?></label>
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !card.code()}"></div>
							<input type="text" class="imeOff" name="securitycode" class="input-mini" data-bind="value: card.code, valueUpdate: ['afterkeydown','propertychange','input']" placeholder="<?php _e('Ex. &quot;182&quot;','arez'); ?>" />
						</div>
					</fieldset>
				</div><!-- /box-rounded -->
				<!-- /ko -->
			<!-- /ko -->

			<!-- ko template:{'if': type == 'voucher'} -->
				<form autocomplete="off" class="form-vertical">
					<div class="box-rounded">
						<h3 data-bind="text: label"></h3>
						<p><strong><?php _e('Voucher value:','arez'); ?></strong> <span data-bind="money: default_amount"></span></p>
						<p><strong><?php _e('Amount applied:','arez'); ?></strong> <span data-bind="money: amount"></span></p>
						<div id="authorization_id" class="inputMarg" data-bind="if: require_authorization_id">
							<label><?php _e('Authorization Code:'); ?></label>
							<input data-bind="value: authorization_ID" type="text" />
							<div class="reqSideGreen" data-bind="css: {reqSideRed: !authorization_ID() }"></div>
						</div>
					</div>
				</form>
			<!-- /ko -->
		</div><!-- /payments-->

		<div class="box-rounded" data-bind="visible: WebBooker.Checkout.paymentType">
			<h3><?php _e('Payment Summary','arez'); ?></h3>
			<table class="table checkout-review">
				<thead>
					<tr>
						<th class="id"><?php _e('Payment Type','arez'); ?></th>
						<th class="total"><?php _e('Total','arez'); ?></th>
					</tr>
				</thead>
				<tbody data-bind="foreach: WebBooker.Checkout.sale.payments">
					<tr>
						<td data-bind="text: label"></td>
						<td data-bind="clean_money: amount"></td>
					</tr>
				</tbody>
			</table>
		</div><!-- /checkout-summary -->

		<div id="checkout-cancellationterms">
			<?php echo $wb['cancellation']; ?>
		</div><!-- /checkout-cancellationterms -->

		<div id="checkout-agreement">
			<p>
				<input type="checkbox" data-bind="checked: WebBooker.Checkout.termsAccepted" value="true" /> <?php _e('I accept the','arez'); ?> <a href="#reseller-agreement" data-toggle="modal" title="<?php _e('View the terms and conditions','arez'); ?>"><?php _e('terms and conditions','arez'); ?></a><?php _e('.','arez'); ?>
			</p>
		</div><!-- checkout-agreement -->

		<div id="checkout-payment-error" class="alert alert-error" data-bind="fadeVisible: WebBooker.Checkout.errorMsg">
			<span data-bind="text: WebBooker.Checkout.errorMsg"></span>
		</div><!-- /checkout-payment-error -->

		<div class="actions clearfix">
			<button data-target="Customize" class="buttonGray buttonBig float-left" data-bind="click: WebBooker.CheckoutNav.goToStep, scrollTopOnClick: true"><i class="icon-arrow-left icon-white"></i> <?php _e('Go back','arez'); ?></button>
			<button class="buttonBlue buttonBig float-right" data-bind="enable: WebBooker.Checkout.enableSubmit, click: WebBooker.Checkout.process"><i class="icon-white icon-ok"></i> <?php _e('Submit','arez'); ?></button>
		</div>
	</div><!-- /checkout-payment -->
</div><!-- /webbooker-checkout -->