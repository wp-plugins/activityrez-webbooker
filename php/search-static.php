<?php

/**
 *	ActivityRez Web Booking Engine
 *	Search PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

global $query, $meta, $wbArgs, $wp_query, $wb;

// default query
$query['page'] = 1;
$query['count'] = 50;

if ( isset( $_REQUEST['page'] ) && is_numeric( $_REQUEST['page'] ) ) {
	$query['page'] = $_REQUEST['page'];
}
if ( isset( $_REQUEST['count'] ) && is_numeric( $_REQUEST['count'] ) ) {
	$query['count'] = $_REQUEST['count'];
}
if ( isset( $_REQUEST['i18n'] ) && !empty( $_REQUEST['i18n'] ) ) {
	$query['i18n'] = $_REQUEST['i18n'];
}
/*if ( isset( $_REQUEST['sortDir'] ) && !empty( $_REQUEST['sortDir'] ) ) {
	$query['sortDir'] = $_REQUEST['sortDir'];
}
if ( isset( $_REQUEST['sort'] ) && !empty( $_REQUEST['sort'] ) ) {
	$query['sort'] = $_REQUEST['sort'];
}
if ( isset( $_REQUEST['featured'] ) && is_numeric( $_REQUEST['featured'] ) ) {
	$query['featured'] = $_REQUEST['featured'];
}*/

//get the search terms from the permalink
if ( isset( $wp_query->query_vars['search_destination'] ) ) {
	$query['des'] = $wp_query->query_vars['search_destination'];
}
if ( isset( $wp_query->query_vars['search_category'] ) ) {
	$query['category'] = $wp_query->query_vars['search_category'];
}
if ( isset( $wp_query->query_vars['search_mood'] ) ) {
	$query['moods'] = array($wp_query->query_vars['search_mood']);
}
if ( isset( $wp_query->query_vars['search_tag'] ) ) {
	$query['tag'] = $wp_query->query_vars['search_tag'];
}

if ( WB_REMOTE == true ) {
	$arezApi = ActivityRezAPI::instance();
	$arezApi->set_wb_id($wbArgs['webBookerID']);
	$results = $arezApi->searchCatalog($query);
}else{
	api_include( array( 'web_booker' ) );
	$wbAPI = new arezCatalog();
	$query['showInWB'] = $wbArgs['webBookerID'];
	$results = $wbAPI->action_activities($query);
}

$activities = array();
if ( $results['status'] == 1 ) {//we're good parse the results
	$activities = $results['data'];
}
 
$paginateLinks = '<p class="prev-next">';
if ( isset( $query['page'] ) && $query['page'] > 1 ) {
	$site = get_bloginfo( 'wpurl' );
	$url = $_SERVER['PHP_SELF'];
	$prev = $query['page'] -1;
	$next = $query['page'] +1;
	$paginateLinks .= '<a href="' . $site . $url . '?page=' . $prev .'">&lsaquo; ' . __("Prev","arez") . '</a>';
	$totalPages = ceil( $results['count'] / $results['total'] );
	if( $totalPages > $query['page'] ) {
		$paginateLinks .= '<a href="' . $site . $url . '?page=' . $next .'">&rsaquo; ' . __("Next","arez") . '</a>';
	}
}
$paginateLinks .= "</p>";
$mediaServer =  ( isset($wb['server']) &&  $wb['server'] == 'training') ? '//devmedia.activityrez.com' : '//media.activityrez.com';

function make_image_url($hash, $height){
	return $mediaServer+'/media/'+$hash+'/thumbnail/height/'+$height;
}

?>
<div id="webbooker-search">
	<div class="header gradient-light">
		<h3><?php _e( 'Search Results', 'arez' ); ?></h3>
	</div>	
	<div class="cb"></div>
	<div class="ribbonFold"></div>
	<div id="webbooker-search-summary">
		<?php include( 'mini-sidebar.php' ); ?>
		<div id="search-shown">
			<span><?php echo count( $results['data'] ) . ' '; _e( 'Results', 'arez' ); ?></span>
		</div>
		<div id="search-sort">
			&nbsp;
		</div>
	</div><!-- /webbooker-search-summary -->
	
	<div id="webbooker-search-results">
		<p class="no-results"<?php if ( !empty( $activities ) ) { echo ' style="display:none"'; } ?>><?php _e( 'Your activity search returned no results.', 'arez' ); ?></p>
		<div class="results">
			<?php
				foreach ( $activities as $activity ) {
					//print_r(var_dump($activity['json_input']));
					//Activity SEO URL
					$activityURL = '';
					$activityURL = $wb['wb_url'] . '/' . $activity['slug'] . '/';

					//Handle Images
					$images = array();
					if ( isset( $activity['json_input']['media'] ) && !empty( $activity['json_input']['media'] ) ) {
						if ( is_array( $activity['json_input']['media'] ) ) {
							foreach ( $activity['json_input']['media'] as $media ) {
								if(isset($media['url'])){
									$images[] = str_replace( 'httpss', 'https', str_replace( 'http', 'https', $media['url'] ) );									
								}else if($media['hash']){
									if( isset($media['featured']) && true == $media['featured']){
										if(count($images) > 0){
											array_unshift($images,make_image_url($media['hash'],400));
										}else{
											$images[] = make_image_url($media['hash'],400);
										}
									}else{
										$images[] = make_image_url($media['hash'],400);
									}				
								}

							}
						}
					}
					
					// Calculate Prices
					$price = '';
					if ( isset( $activity['json_input']['prices'] ) && is_array( $activity['json_input']['prices'] ) ) {
						foreach ( $activity['json_input']['prices'] as $price ) {
							if ( $price['display_price'] == 1 ) {
								$price = $price['amount'];
								break;
							} else {
								$amount = (float)$price['amount'];
								if ( $price == '' ) {
									$price = $amount;
								} else {
									if ( $amount < $price ) $price = $amount;
								}
							}
						}
					}

					//What Days is this running?
					$days = null;
					if ( isset( $activity['json_input']['times'] ) && is_array( $activity['json_input']['times'] ) ) {
						$days = array();
						foreach ( $activity['json_input']['times'] as $time ) {
							if ( isset( $time['start']['day'] ) && !in_array( $time['start']['day'] , $days) ) {
								$days[] = $time['start']['day'];
							}
						}
						$d2 = array();
						foreach ( $days as $day ) {
							$d2[] = __( substr( $day, 0, 3 ), 'arez' );
						}
						$days = implode( ',', $d2 );
					}
			?>
			<div class="activity">
				<div class="clearfix">
				<div class="price">
					<p class="descr"><?php _e( 'Prices start at', 'arez' ); ?></p>
					<p class="amount"><span><?php echo 'US$' . number_format($price,2); ?></span></p>
					<div class="cb"></div>
					<div class="ribbonFoldRight"></div>
					<a href="<?php echo $activityURL; ?>" class="buttonGray buttonBig" title="<?php _e( 'View Activity Details', 'arez' ); ?>"><?php _e('Details','arez'); ?> <i class="icon-arrow-right icon-white"></i></a>
				</div><!-- /price -->
				<div class="info">
					<h4><a href="<?php echo $activityURL; ?>" class="booking-popup-activate" title="<?php _e( 'Click to View Event Details', 'arez' ); ?>"><?php echo $activity['title']; ?></a></h4>
					<?php if ( !empty( $images ) ) { ?>
					<div class="thumb">
						<img src="<?php echo $images[0]; ?>" alt="<?php _e( 'Activity Thumbnail', 'arez' ); ?>" />
					</div>
					<?php } ?>
					<div class="summary">
						<?php echo $activity['shortDesc']; ?>
					</div>
					<div class="meta">
						<?php if ( isset($activity['destination']) ) { ?><div class="meta-wrap"><strong><?php _e('Location','arez'); ?>:</strong> <span><?php echo $activity['destination']; ?></span></div><?php } ?>
						<?php if ( isset($activity['json_input']['duration']) ) { ?><div class="meta-wrap"><strong><?php _e('Duration','arez'); ?>:</strong> <span><?php echo $activity['json_input']['duration']; ?></span></div><?php } ?>
						<?php if ( isset($days) ) { ?><div class="meta-wrap"><strong><?php _e('Days','arez'); ?>:</strong> <span><?php echo $days; ?></span></div><?php } ?>
					</div>
				</div><!-- /info -->
				</div><!-- /clearfix -->
			</div><!-- /activity -->
			<?php
				} //end foreach
			?>
		</div><!-- /results -->
	</div><!-- /webbooker-search-results -->
	
	<div id="webbooker-search-footer">
		<?php echo $paginateLinks; ?>
	</div><!-- /webbooker-search-footer -->
</div><!-- /webbooker-search -->