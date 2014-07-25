<?php
/**
 *	ActivityRez Web Booking Engine
 *	Activity PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

global $wb;
function getChildDisplayPrice( $child ){
	if(isset($child['display_price']) && !empty($child['display_price']) ){
		return __("Prices starting at ",'arez').currencyFormat($child['display_price']);
	}
	
	if(isset($child['prices']) && is_array( $child['prices']) && count($child['prices'])){
		$low = null;
		foreach( $child['prices'] as $price ){
			//empty price continue 
			if(!isset($price['amount']) || $price['amount'] < 1 ) continue;
			if(isset($price['guest_type']) && preg_match('/adult/i',$price['guest_type']) > 0 )
				return currencyFormat($price['amount']);
			if(!$low || $price['amount'] < $low)
				$low = $price['amount'];
		}
		return currencyFormat($low);
	}
	
	return __("Click for prices",'arez');
}

function currencyFormat( $amount ){
	global $wb;
	
	//for now just hard code this
	return 'US$'.number_format($amount);
}

function getChildURL( $child ){
	global $wb;
	return $wb['wb_url'] .'/'. $child['slug'];
}
$activityDefault = array(
	'title'=>'',
	'activityID'=>'',
	'duration'=>'',
	'description'=>'',
	'destination'=>'',
	'children'=>'',
	'instructions'=>'',
	'address'=>''
);
if(!isset($wb['activity'])){
	$wb['activity'] = array();
}
$wb['activity'] = array_merge($activityDefault,$wb['activity']);
/*
<!--
<div id="broken-webbooker-activity" data-bind="with: ActivityView.activity, visible: ActivityView.show() && ActivityView.invalidLanguage()" style="display:none">
	<div class="error">
		<h1><?php _e('Activity not available in this language','arez'); ?></h1>
		<h2><?php _e('try booking in one of these languages','arez'); ?></h2>
		<div class="langs" data-bind="foreach: invalidLanguage"><a href="#" data-bind="click: $parent.i18n, text: text"></a></div>
	</div>
</div>
-->
*/ ?>
<!--[if IE]><script type="text/javascript">window['isIE'] = true;</script><![endif]-->

<div id="webbooker-activity" data-bind="if: ActivityView.activity(), visible: ActivityView.show()" style="display:none">
	<div class="header">
		<h3 data-bind="html: ActivityView.activity().title"><?php echo $wb['activity']['title'];?></h3>
	</div>
	<div class="cb"></div>
	<div class="ribbonFold"></div>
	<div id="webbooker-activity-actions" class="clearfix">
		<div class="return">
			<a title="<?php _e('Return to Search Results','arez'); ?>" href="<?php echo (isset($wb['wb_url'])) ? $wb['wb_url'] : ''; ?>/#/Search" data-bind="attr: { href: WebBooker.searchUrl }, click: ActivityView.analyticsContinueShopping" class="buttonGray">
				<i class="icon-chevron-left icon-white"></i>	<?php _e('Return to Search Results','arez'); ?>
			</a>
		</div>
		<div class="print">
			<a id="printButton" title="<?php _e('Print This Page','arez'); ?>" class="buttonGray" onclick="window.print()">
				<i class="icon-print icon-white"></i>
				<?php _e('Print','arez'); ?>
			</a>
		</div>
	</div><!-- /webbooker-activity-actions -->
	<div id="webbooker-activity-media">
		<div id="slideshow-noimages" data-bind="visible: !ActivityView.slideshow().length">
			<div class="inner">
				<?php _e('No slideshow images to display.','arez'); ?>
			</div>
		</div>
		
		<div id="activityCarousel" class="carousel slide carousel-fit" data-bind="visible: ActivityView.slideshow().length">
		  <ol class="carousel-indicators" data-bind="foreach: ActivityView.slideshow">
		  
		  	<!-- ko if: $index() == 0 -->
		    <li data-target="#activityCarousel" class="active" data-bind="attr: {'data-slide-to': $index}"></li>
		    <!-- /ko -->
		    
		  	<!-- ko ifnot: $index() == 0 -->
		    <li data-target="#activityCarousel" data-bind="attr: {'data-slide-to': $index}"></li>
		    <!-- /ko -->
		    
		  </ol>
		  <!-- Carousel items -->
		  <div class="carousel-inner"  data-bind="foreach: ActivityView.slideshow">
			  	<!-- ko if: $index() == 0 -->
			    <div class="item active"><img data-bind="attr: { src: standard }" alt="Slideshow Image" /></div>
			    <!-- /ko -->
			    
			  	<!-- ko ifnot: $index() == 0 -->
			    <div class="item"><img data-bind="attr: { src: standard }" alt="Slideshow Image" /></div>
			    <!-- /ko -->
		  </div>
		  <!-- Carousel nav -->
			<a id="activityFullScreen" class="btn btn-success" data-toggle="modal" data-target="#imageModal" data-local="#activityCarouselFullScreen" data-bind="click: ActivityView.viewFullSize">
				<i class="icon-fullscreen icon-white"></i>
			</a>		  
		  <a class="carousel-control left" href="#activityCarousel" data-slide="prev">&lsaquo;</a>
		  <a class="carousel-control right" href="#activityCarousel" data-slide="next">&rsaquo;</a>
		</div><!-- /webbooker-activity-slideshow -->
		
	</div><!-- /webbooker-activity-media -->
	<div id="webbooker-activity-summary" class="gradient-blue clearfix">
		<div class="more-info">
			<div class="right">
				<!-- ko if:ActivityView.activity().duration && ActivityView.activity().duration != '0' -->
				<strong><?php _e('Duration','arez'); ?>: </strong><span data-bind="text: ActivityView.activity().duration === 'false' ? '' : ActivityView.activity().duration"><?php echo $wb['activity']['duration']; ?></span><br />
				<!-- /ko -->
				<strong><?php _e('Days','arez'); ?>: </strong><span data-bind="text: ActivityView.days"></span><br />
				<span data-bind="visible: WebBooker.Agent.user_id() > 0"><strong><?php _e('Root Activity ID','arez'); ?>: </strong>#<span data-bind="text: ActivityView.activity().activityID"><?php echo $wb['activity']['activityID'];?></span></span>
			</div>

			<div class="middle">
				<strong><?php _e('Location','arez'); ?>: </strong><span id="activity-location" data-bind="text: __(ActivityView.activity().destination)()"><?php echo $wb['activity']['destination'];?></span>
				<!-- ko if:ActivityView.activity().address_lat -->
					<div style="clear:both"></div>
					<a class="buttonGray" style="margin-top: 5px;" href="#webbooker-activity-map" data-bind="scrollTo: '#webbooker-activity-map'"><i class="icon-map-marker icon-white"></i> <?php _e('Click here for map','arez'); ?></a>
				<!-- /ko -->
			</div>
		</div>
	</div><!-- /webbooker-activity-summary -->
	<?php 
	include("mini-sidebar.php");
	if( !isset($wb['activity']['children']) || empty($wb['activity']['children']) ){
		include("mini-cart.php");
	}
	?>
	<div class="row-fluid">
		<div id="webbooker-activity-little">
			<div class="content">
				<span data-bind="html: ActivityView.activity().shortDesc"><?php echo $wb['shortDesc'];?></span>
				<?php
				if( isset($wb['activity']['children']) && is_array($wb['activity']['children']) ){
					foreach($wb['activity']['children'] as $child){
						$display_price = getChildDisplayPrice($child);
						$url = getChildURL($child);
						?>
						<div class="child-activity">
							<div class="clearfix">
								<div class="price">Prices starting at: <span ><?php echo $display_price;?></span></div>
								<div class="action"><a href="<?php echo $url; ?>" class="buttonBlue"><i class="icon-search icon-white"></i> <?php _e('View Details','arez'); ?></a></div>
								<h4 ><?php echo $child['title'];?></h4>
							</div>
						</div>
						<?php
					}
				}
				?>
			</div>
		</div>
		<div id="webbooker-activity-main">
			<div class="content">
				<div class="description" data-bind="html: ActivityView.activity().description"><?php echo $wb['activity']['description'];?></div>
				<!-- ko if: ActivityView.activity().instructions -->
					<p><strong><?php _e('Special Instructions','arez'); ?>:</strong></p>
					<div class="specIns" data-bind="html: ActivityView.activity().instructions"><?php echo $wb['activity']['instructions'];?></div>
				<!-- /ko -->

				<?php
				if( isset($wb['activity']['children']) && is_array($wb['activity']['children']) ){
					foreach($wb['activity']['children'] as $child){
						$display_price = getChildDisplayPrice($child);
						$url = getChildURL($child);
						?>
						<div class="child-activity">
							<div class="clearfix">
								<div class="price">Prices Starting at: <span ><?php echo $display_price;?></span></div>
								<div class="action"><a href="<?php echo $url; ?>" class="buttonBlue"><i class="icon-search icon-white"></i> <?php _e('View Details','arez'); ?></a></div>
								<h4 ><?php echo $child['title'];?></h4>
								<div class="description" ><?php if ( isset($child['shortDesc']) ) { echo $child['shortDesc']; } ?></div>
							</div>
						</div>
						<?php
					}
				}
				?>
			</div><!-- /content -->
		</div><!-- /webbooker-activity-main -->
	</div><!-- /row-fluid -->
	<div id="webbooker-activity-map" class="row-fluid" data-bind="visible: ActivityView.activity().address_lat">
		<p><strong><?php _e('Address','arez'); ?>:</strong> <span id="activity-map-addr" data-bind="html: ActivityView.activity().address"><?php echo $wb['activity']['address'];?></span></p>
		<div id="map_canvas" style="width: 631px; height: 295px"></div>
	</div><!-- /webbooker-activity-map -->
</div><!-- /webbooker-activity -->
<div id="qrcode-wrapper" style="display:none;">
	<div id="qrcode"></div>
	<p><?php _e("Use your smartphone's QR reader to visit this activity page.",'arez');?></p>
</div>
