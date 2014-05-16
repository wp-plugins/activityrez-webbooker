<?php
/**
 * Bootstrapper for custom Web Bookers.
 *
 * @package ActivityRez
 * @subpackage Web Booking Engine
 * @author Ryan Freeman <ryan@stoked-industries.com>
 */
global $wb;
?>
<div id="webbooker" class="container-fluid">
	<div id="home-link">
		<a href="<?php echo (isset($wb['wb_url'])) ? $wb['wb_url'] : ''; ?>/#/Home"><i class="icon-home"></i> <?php _e('Home','arez'); ?></a>
	</div>
	<div id="multi-everything">
		<div class="currency-switcher btn-group pull-right" data-bind="if: WebBooker.selectedCurrency(), visible: WebBooker.available_currencies().length > 1 && !WebBooker.CheckoutNav.showConfirmation() && !WebBooker.Itinerary.show()" style="display:none">
			<button class="btn dropdown-toggle" data-toggle="dropdown" data-bind="html: WebBooker.selectedCurrency().symbol"></button>
			<ul class="dropdown-menu" data-bind="foreach: WebBooker.available_currencies()">
				<!-- ko if: $data && $data.symbol && $data.title -->
				<li data-bind="click: $parent.setCurrency"><a href="#"><strong data-bind="html: $data.symbol"></strong><span data-bind="text: title"></span></a></li>
				<!-- /ko -->
			</ul>
		</div>
		<div id="lang-picker" data-bind="if: WebBooker.available_langs().length > 1">
			<select data-bind="options:WebBooker.available_langs,optionsCaption:'<?php _e('Language','arez'); ?>',value:WebBooker.selectedLanguage,optionsText: 'title'"></select>
		</div>
		<div class="title">
			<span data-bind="if: WebBooker.available_langs().length > 1 || WebBooker.available_currencies().length > 1"><?php _e('Change','arez'); ?></span>
			<span data-bind="if: WebBooker.available_langs().length > 1"><?php _e('Language','arez'); ?></span>
			<span data-bind="if: WebBooker.available_langs().length > 1 && WebBooker.available_currencies().length > 1 && !WebBooker.CheckoutNav.showConfirmation() && !WebBooker.Itinerary.show()">/</span>
			<span data-bind="if: WebBooker.available_currencies().length > 1 && !WebBooker.CheckoutNav.showConfirmation() && !WebBooker.Itinerary.show()"><?php _e('Currency','arez'); ?></span>
		</div>
	</div>
	<div class="cb"></div>
	<div id="webbooker-main">
		<?php
			$extend = true;
			if( isset( $_REQUEST['activityID'] ) ) {
				arez_include('activity.php');
				$extend = false;
			} else if ( isset( $_REQUEST['displayItinerary'] ) ) {
				arez_include('itinerary.php');
			}
			
			if( $extend == true ) {
				if ( bot_detected() ) {
					arez_include( 'search-static.php' );
				} else {
					arez_include( 'home.php' );
					arez_include( 'password-reset.php' );
					arez_include( 'search.php' );
					arez_include( 'dashboard.php' );
					arez_include( 'checkout.php' );
					arez_include( 'confirmation.php' );
					arez_include( 'itinerary.php' );
					arez_include( 'contact.php' );
					arez_include( 'aboutus.php' );
					arez_include( 'activity.php' );
					arez_include( '404.php' );
				}
			}
		?>
			<div id="init-loader" data-bind="visible: WebBooker.showInitLoader">
				<img src="<?php echo PLUGIN_DIR_URL . 'images/ajax-loader.gif'; ?>" alt="<?php _e('Image Loader','arez'); ?>"><br><br>
				<?php _e('Loading...','arez'); ?>
			</div>
	</div><!-- /webbooker-main -->
	<?php arez_include('sidebar.php'); ?>
	<div style="clear:both"></div>
</div><!-- /webbooker -->