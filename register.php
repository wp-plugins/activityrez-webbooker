<?php
/*
Plugin Name: ActivityRez Wordpress Web Booker Plugin
Plugin URI: http://www.activityrez.com/features/booking-engine/
Description: ActivityRez plugin to show your ActivityRez booking engine on your site
Version: 2.5.2
Author: ActivityRez LLC
Author URI: http://ActivityRez.com/

Copyright 2014 ActivityRez LLC
*/

define( 'ACTIVITYREZWB_PLUGIN_PATH', plugin_dir_url(__FILE__) );
define( 'ACTIVITYREZWB_PLUGIN_DIR', plugin_dir_path(__FILE__) );
define( 'AREZ_SERVER', 'https://secure.activityrez.com' );
define( 'AREZ_SERVER_TRAINING', 'https://training.activityrez.com' );


add_action('init', 'setWBEnv');
function setWBEnv() {
	//If it is remote plugin, load the api
	if( !defined( 'FAPI_PLUGIN_DIR' ) ) {
		if(!defined('WB_REMOTE') ) define( 'WB_REMOTE', true );
	} else {
		if(!defined('WB_REMOTE') ) define( 'WB_REMOTE', false );
	}
	include_once( ACTIVITYREZWB_PLUGIN_DIR . 'php/lib/arez.api.php' );
}

register_activation_hook(__FILE__, 'arez_webboker_activation');
add_action('arez_webbooker_update_check', 'arez_update_webbookers');

function arez_webboker_activation() {
	if(!defined('WB_REMOTE')){
		setWBEnv();
	}
	if( WB_REMOTE ){
		$options = get_option( 'arez_plugin' );
		if( !isset($options['server']) ){
			$options['server'] = 'secure';
			update_option('arez_plugin',$options);
			$webbookers = get_posts( array( 'post_type'=>'webBooker', 'numberposts'=>-1 ) );
			foreach( $webbookers as $wb ){
				$wbMeta = get_post_meta($wb->ID);
				if( !isset($wbMeta['include_header']) ){
					update_post_meta($wb->ID,'include_header',1);
				}
				if( !isset($wbMeta['include_footer']) ){
					update_post_meta($wb->ID,'include_footer',1);
				}
			}
		}
		wp_schedule_event( time(), 'hourly', 'arez_webbooker_update_check');
	}
}

register_deactivation_hook(__FILE__, 'arez_webboker_deactivation');
function arez_webboker_deactivation() {
	wp_clear_scheduled_hook('arez_webbooker_update_check');
}


/**
* This is a functions file for use in the webBooker
*/
add_action( 'init', 'web_booker_post_type' );
function web_booker_post_type() {
	// register taxonomies
	$labels = array(
		'add_new' => _('Add Web Booker'),
		'add_new_item' => __('Add New Web Booker'),
		'edit' => _('Edit'),
		'edit_item' => __('Edit Web Booker'),
		'name' => __('Web Bookers'),
		'new_item' => __('New Web Booker'),
		'not_found' => __('No Web Bookers found'),
		'not_found_in_trash' => __('No Web Bookers found in trash'),
		'search_items' => __('Search Web Booker'),
		'singular_name' => __('Web Booker'),
		'view' => __('View Web Bookers'),
		'view_item' => __('View Web Booker')
	);

	$args = array(
		'public' => true,
		'show_ui' => true,
		'show_in_menu'=>'arez',
		'exclude_from_search'=>true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug'=>'wb', 'with_front'=>true),
		'labels' => $labels,
		'supports' => array('title')
	);

	register_post_type( 'webBooker', $args );
	add_rewrite_tag( '%activity_destination%', '([^&]+)' );
	add_rewrite_tag( '%search_destination%', '([^&]+)' );
	add_rewrite_tag( '%search_category%', '([^&]+)' );
	add_rewrite_tag( '%search_mood%', '([^&]+)' );
	add_rewrite_tag( '%search_tag%', '([^&]+)' );
	add_rewrite_tag( '%activitySlug%', '([^&]+)' );

	//arezLog('debug',"register_web_booker_urls: trying to save permalinks.".print_r($post,1));
	/**
	 * This will create the url rewrite rules to get things
	 * like category and product information from the web booker.  This is used mostly for
	 * seo & permalinks
	*/
	$wbSlug = get_post_type_object('webbooker')->rewrite['slug'];
	
	//now do a rewrite rule for all searches with destination
	add_rewrite_rule( $wbSlug.'/([^/]+)/destination/([^/]+)/?$',
	'index.php?post_type=webbooker&webbooker=$matches[1]&search_destination=$matches[2]', 'top' );
	
	//now do a rewrite rule for searches with category
	add_rewrite_rule( $wbSlug.'/([^/]+)/category/([^/]+)/?$',
	'index.php?post_type=webbooker&webbooker=$matches[1]&search_category=$matches[2]', 'top' );

	//now do a rewrite rule for searches with mood
	add_rewrite_rule( $wbSlug.'/([^/]+)/mood/([^/]+)/?$',
	'index.php?post_type=webbooker&webbooker=$matches[1]&search_mood=$matches[2]', 'top' );

	//now do a rewrite rule for searches with tag
	add_rewrite_rule( $wbSlug.'/([^/]+)/tag/([^/]+)/?$',
	'index.php?post_type=webbooker&webbooker=$matches[1]&search_tag=$matches[2]', 'top' );

	//this is saying to add url rewrite rules that include 3 arguments destination, activity
	add_rewrite_rule( $wbSlug.'/([^/]+)/([^/]+)/([^/]+)/?$',
	'index.php?post_type=webbooker&webbooker=$matches[1]&activity_destination=$matches[2]&activitySlug=$matches[3]', 'top' );

	$rules = get_option( 'rewrite_rules' );
	if ( 
		!isset( $rules[$wbSlug.'/([^/]+)/([^/]+)/([^/]+)/?$'] ) ||
		!isset( $rules[$wbSlug.'/([^/]+)/tag/([^/]+)/?$'] ) ||
		!isset( $rules[$wbSlug.'/([^/]+)/mood/([^/]+)/?$'] ) ||
		!isset( $rules[$wbSlug.'/([^/]+)/category/([^/]+)/?$'] ) ||
		!isset( $rules[$wbSlug.'/([^/]+)/destination/([^/]+)/?$'] )
	) {
		global $wp_rewrite;
		$wp_rewrite->flush_rules();
	}
}

function add_webBooker_to_dropdown( $pages, $r )
{
	
	if('page_on_front' == $r['name'])
	{
		//die("Get_Pages:".print_r($r,1));
		$args = array(
			'post_type' => 'webBooker',
			'post_parent'=>0,
			'posts_per_page'=>-1,
			'post_status'=>'publish',
			'meta_query' => array(
				array(
					'key' => 'webBookerID'
				)
			)
		);
		$items = get_posts($args);
		$pages = array_merge($pages, $items);
	}

	return $pages;
}
add_filter( 'get_pages', 'add_webBooker_to_dropdown',10,2 );

function enable_front_page_webBooker( $query )
{
	if(( !isset($query->query_vars['post_type']) || '' == $query->query_vars['post_type'] ) && 0 != $query->query_vars['page_id']){
		$query->query_vars['post_type'] = array( 'page', 'webBooker' );
	}
}
add_action( 'pre_get_posts', 'enable_front_page_webBooker' );

//Steal the call to single-webbooker here!
add_filter( 'template_include', 'arezWBTemplate', 1, 1 );
function arezWBTemplate( $template ) {
	global $post,$l10n,$wp_query, $query;
	if ( $post->post_type == 'webbooker' ) {
		$single_webbooker = ACTIVITYREZWB_PLUGIN_DIR . '/php/single-webbooker.php';
		return $single_webbooker;
	}
	return $template;
}

add_filter( 'wbTemplate', 'includeDefaultWBTemplate', 10, 2 );

function includeDefaultWBTemplate( $wb_include=false, $wb=false ) {
	if ( !$wb ) {
		return;
	} else if ( $wb_include ) {
		return $wb_include;
	} else {
		return ACTIVITYREZWB_PLUGIN_DIR . '/php/bootstrap.php';
	}
}

add_filter( 'plugins_loaded', 'wbAdmin' );

function wbAdmin() {
	if( is_admin() ){
		if(!defined('WB_REMOTE')){
			setWBEnv();
		}
		if( WB_REMOTE == true ) {
			include_once( ACTIVITYREZWB_PLUGIN_DIR . '/php/wp-admin/wp_admin.views.php' );
		}
	}
}

//Define Short Code and options
add_shortcode( 'arezWebBooker', 'arezWebBookerShortCode' );

/**
* Short Code for the web booker to allow it to be embeded into different pages and have the resellerID's locked
*/
function arezWebBookerShortCode( $atts=null, $content = null ) {
	$options = shortcode_atts(array(
		'reseller1ID'=>'',
		'reseller2ID'=>false,
		'i18N'=>'',
		'activityID'=>false,
	), $atts);

	$r1 = $r2 = '';
	$i18N = '';
	if ( isset( $options['reseller1ID'] ) ) {
		$r1 = (int)$options['reseller1ID'];
	}
	if ( isset( $options['reseller2ID'] ) ) {
		$r2 = (int)$options['reseller2ID'];
	}
	if ( isset( $options['i18N'] ) ) {
		$i18N = $options['i18N'];
	}
	if ( isset( $options['activityID'] ) ) {
		$activityID = $options['activityID'];
	}
}

global $wbCacheFields;
$wbCacheFields = array(
	'header',
	'style',
	'footer',
	'tags',
	'moods',
	'wb_destinations',
	'cats',
	'terms',
	'privacy',
	'hero_url',
	'cancellation',
	'hero_heading_text',
	'hero_summary_text',
	'activity_category',
	'activity_mood',
	'activity_tag',
	'receipt_description',
	'receipt_css',
	'receipt_title',
	'operator_email',
	'operator_name',
	'aboutus',
	'contact',
	'thumbnailHeight',
	'wb_countries',
	'galleryImageHeight'
);


// fetch and cache all weboker data
function arez_update_webbookers( $webbookerID = null){
	$webbookers = get_posts( array( 'post_type'=>'webBooker', 'numberposts'=>-1 ) );
	//get into main server
	$options = get_option( 'arez_plugin' );
	$arezApi = ActivityRezAPI::instance();
	$resp = $arezApi->r_authArez( $options['username'], $options['password'] );
	
	//cache values
	global $wbCacheFields;
	$msg = '';
	if( !empty($webbookers) && is_array($webbookers)){
		$wbs = array();
		foreach( $webbookers as $wb ){
			$wbID = get_post_meta($wb->ID,'webBookerID',true);
			if( !is_null($webbookerID)){//update a specific webbooker
				if( $wbID != $webbookerID) continue;
			}
			
			$wbs[] = $wbID;
			$CurlResult = $arezApi->getWebBooker($wbID);//cache wb data
			$msg .= sprintf(__("Refreshing Server Settings for %s \n<br>",'arez'),$wb->post_title);
			foreach( $wbCacheFields as $field ){
				if(isset($CurlResult['data'][$field])){
					update_post_meta($wb->ID,$field,$CurlResult['data'][$field]);
				}
			}
		}
		arez_get_translationFiles($wbs);//update po files
	}
	return $msg;
}


function arez_get_translationFiles($wbids=array()){
	foreach( $wbids as $wbID){
		$arezApi = ActivityRezAPI::instance();
		$CurlResult = $arezApi->fetchTranslations($wbID);//update translation files
		$tmp_zip = tempnam ("/tmp", 'translations_');
		if($tmp_zip){
			file_put_contents( $tmp_zip,  $CurlResult);
			$base = WP_CONTENT_DIR;
			chdir($base);
			$cmd = 'cd '.$base.' && /usr/bin/unzip '.$tmp_zip;
			exec($cmd);
			unlink($tmp_zip);
		}
	}	
}

 
/**
 *	function that sorts countries/languages by i18n(RFC 3066) in ascending order.
 */
function countrySort( $co, $i18n, $lang = false ) {
	$k = $lang ? 'title' : 'name';	// set array key name
	
	// avoid no enhanced functions - depends on PHP server
	if( function_exists('collator_create') && function_exists('collator_sort_with_sort_keys') ) {
		$old = array();
		foreach( $co as $c ) {
			$old[] = $c[$k];
		}
		$coll = collator_create( $i18n );
		$ns = collator_sort_with_sort_keys( $coll, $old );

		if( $ns ) {
			$new = array();
			foreach( $old as $o ) {
				foreach( $co as $c ) {
					if( $c[$k] == $o ) {
						$new[] = $c;
					}
				}
			}
			if( !$lang && $i18n == 'ja' )	$new = countrySortByJP( $new );
			$co = $new;
		}
	}
	
	if( !$lang ) $co = setTopCountry( $co, $i18n );
	return $co;
}

 
/**
 *	function that sorts countries mixed Chinese and Kana characters for Japanese.
 */
function countrySortByJP( $co ) {
	// insert position
	$pos = array( 'PT', 'QA', 'NE', 'SC', 'TH', 'TC', 'TD', 'CF', 'TN', 'BD', 'FM', 'ZA', 'NA', 'RU', 'KH');
	
	// find 'HK' as the first row of the kanji group
	for( $i = count( $co )- 1; $i >= 0; $i-- ) {
		if( $co[$i]['alpha-2'] == 'HK' ) break;
	}
	$co_kana  = array_slice( $co, 0,  $i); 
	$co_kanji = array_slice( $co, (count( $co ) - $i)*-1 );

	for( $i = 0; $i < count( $co_kanji ); $i++ ) {
		$add[0] = $co_kanji[$i];
		for( $j = 0; $j < count( $co_kana ); $j++ ) {
			if( $co_kana[$j]['alpha-2'] == $pos[$i] ) {
				$a = array_slice( $co_kana, 0, $j+1 );
				$b = array_slice( $co_kana, $j+1 );
				$co_kana = array_merge( $a, array( $co_kanji[$i] ), $b );
				break;
			}
		}
	}
	return $co_kana;
}

 
/**
 *	function that sets top country as a preference.
 */
function setTopCountry( $co, $i18n ) {
	//set the preference
	switch( $i18n ) {
		case 'ja'		: $pr = 'JP'; break;
		case 'in_IN'	: $pr = 'ID'; break;
		case 'vi'		: $pr = 'VN'; break;
		default			: $pr = strtoupper( substr( $i18n, -2 ));
	}

	// pick up the preference position
	for( $i = count( $co )- 1; $i >= 0; $i-- ) {
		if( $co[$i]['alpha-2'] == $pr ) break;
	}
	
	// change order
	$a  = array_slice( $co, 0,  $i); 
	if( count( $co ) - $i -1 > 0 ) {
		$b  = array_slice( $co, (count( $co ) - $i -1)*-1 );
	} else {
		$b  = array();
	}
	$co = array_merge( array( $co[$i] ), $a, $b);
	
	return $co;
}


function arez_include( $template ){
	global $wb;
	$path = get_template_directory().'/wb/'.$template;
	if( file_exists($path) ){
		include( $path );
	}else{
		include( ACTIVITYREZWB_PLUGIN_DIR . '/php/' . $template );
	}
}



/*   Widget Parts */

/*
 * This will turn the travel agent signin into a wordpress style widget that will allow them to place it anywhere in the site they want
 */

 
 function arez_webbooker_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Webbooker Sidebar', 'arez' ),
		'id'            => 'webbooker-sidebar',
		'description'   => __( 'If you prefer to have your sidebar dynamic ', 'arez' ),
		'before_widget' => '',
		'after_widget'  => '',
		'before_title'  => '',
		'after_title'   => '',
	) );
}
add_action( 'widgets_init', 'arez_webbooker_widgets_init' );
 
function arez_travel_agent_login($args) {
	global $wb;
	if(!$wb) return;
	extract($args);
?>
        <?php echo $before_widget; ?>
	<div id="agents-sidebar" class="sidebar-container" data-bind="with: WebBooker.Agent">
		<div class="header gradient-light">
			<h3><?php _e('Travel Agents','arez'); ?></h3>
		</div>
		<div class="cb"></div>
		<div class="ribbonFold"></div>
	
		<div class="content">
			<div data-bind="visible: user_id() > 0">
				<p><strong><?php _e('Welcome back,','arez'); ?> <span class="agent-name" data-bind="html: name"></span>!</strong></p>
				<div class="actions">
					<a href="<?php echo $wb['wb_url']; ?>/#/Dashboard" class="buttonBlue" data-bind="scrollTopOnClick: true"><i class="icon-list-alt icon-white"></i> <?php _e('Dashboard','arez'); ?></a>
					<button class="buttonGray" data-bind="click: logout"><i class="icon-ban-circle icon-white"></i> <?php _e('Log Out','arez'); ?></button>
				</div>
				<div style="clear:both"></div>
			</div>
			<div data-bind="visible: !user_id() || user_id() == 0">
				<p><strong><?php _e('Travel Agent Log In','arez'); ?></strong></p>
				<p class="login-error"></p>
				<div class="login-form">
				<form>
					<div class="alert alert-success" data-bind="text: loginSuccess, visible: loginSuccess"></div>
					<input type="text" title="<?php _e('Username','arez'); ?>" placeholder="<?php _e('Username','arez'); ?>" autocorrect="off" autocapitalize="off" data-bind="value: email" />
					<input type="password" autocomplete="off" title="<?php _e('Password','arez'); ?>" placeholder="<?php _e('Password','arez'); ?>" data-bind="value: password" />
					<a class="lostPass" href="#/PasswordResetRequest"><?php _e("Forgot Password?",'arez');?></a>
					<div style="clear:both"></div>
					<button type="submit" class="buttonBlue" data-bind="click: login"><i class="icon-lock icon-white" data-bind="css: {'icon-processing': WebBooker.Agent.isLoggingIn}"></i> <?php _e('Log In','arez'); ?></button>
					<button class="buttonGray" data-bind="click: doShowSignup, scrollTopOnClick: true"><i class="icon-pencil icon-white"></i> <?php _e('Sign Up','arez'); ?></button>
					<div class="alert alert-error" data-bind="text: loginError, visible: loginError"></div>
				</form>
				</div><br>
				<p><strong><?php _e('Sign Up','arez'); ?></strong></p><p><?php _e('Take advantage of our proprietary online booking technology and earn commissions.','arez'); ?> <!-- <a href="/booking/travel-agents/"><?php _e('Learn more.','arez'); ?></a> --></p>
			</div>
		</div><!-- /content -->
	</div><!-- agents-sidebar -->
        <?php echo $after_widget; ?>
<?php
}
register_sidebar_widget('Travel Agent Login', 'arez_travel_agent_login');


function arez_cart_widget($args) {
	global $wb;
	if(!$wb) return;	
	extract($args);
?>
        <?php echo $before_widget; ?>
	<div id="cart-sidebar" class="sidebar-container" data-bind="with: WebBooker.Cart">
		<div class="header gradient-light">
			<h3><?php _e('My Itinerary','arez'); ?></h3>
		</div>
		<a href="<?php echo (isset($wb['wb_url'])) ? $wb['wb_url'] : ''; ?>/#/Itinerary" title="<?php _e('Retrieve an itinerary from a previous sale.','arez'); ?>" class="buttonBlue retrieve"><i class="icon-briefcase icon-white"></i> <?php _e('Retrieve An Itinerary','arez'); ?></a>
		<div class="cb"></div>
		<div class="ribbonFold"></div>
		<div class="content" style="display: none" data-bind="visible: WebBooker.wbLoaded">
			<div class="empty" data-bind="visible: WebBooker.Cart.items().length < 1">
				<?php _e('You haven\'t added any activities yet.','arez'); ?>
			</div>

			<div data-bind="visible: items().length > 0, foreach: items" style="display:none">
			<div class="activity">
				<button class="buttonGray" title="Remove Activity" data-bind="click: remove"><i class="icon-remove icon-white"></i> <?php _e('Remove','arez'); ?></button>
				<h4><a data-bind="attr: { 'href': url }, html: title"></a></h4>
				<div class="info">
					<strong><?php _e('Location','arez'); ?>:</strong> <span data-bind="text: __(destination)()"></span><br>
					<strong><?php _e('Date','arez'); ?>:</strong> <span data-bind="text: i18n_date()"></span><br>
					<strong><?php _e('Time','arez'); ?>:</strong> <span data-bind="text: time"></span>
				</div>
				<ul class="guests" data-bind="foreach: guests">
					<!-- ko if: qty() > 0 -->
					<li>
						<strong><span data-bind="text: qty"></span> <span data-bind="text: name"></span>:</strong>
						<span data-bind="money: subtotal"></span>
					</li>
					<!-- /ko -->
				</ul>
			</div><!-- /activity -->
			</div><!-- /foreach items -->

			<div class="cart-total clearfix" data-bind="visible: items().length > 1">
				<span><strong><?php _e('Ticket Total','arez'); ?>:</strong></span>
				<span class="price" data-bind="money: subtotal"></span>
			</div>

			<div class="actions">
				<a href="<?php echo (isset($wb['wb_url'])) ? $wb['wb_url'] : ''; ?>/#/Search" title="Search for more activities" class="buttonBlue" data-bind="visible: WebBooker.CheckoutNav.show"><i class="icon-share-alt icon-white"></i> <?php _e('Return to Activities','arez'); ?></a>
				<button title="<?php _e('Customize itinerary and check out','arez'); ?>" class="buttonBlue" data-bind="enable: items().length > 0, click: viewCart, visible: !WebBooker.CheckoutNav.show(), scrollTopOnClick: true"><i class="icon-shopping-cart icon-white"></i> <?php _e('Customize and Check Out','arez'); ?></button>
			</div>
			<div style="clear:both"></div>
		</div><!-- /content -->
	</div><!-- /cart-sidebar -->
        <?php echo $after_widget; ?>
<?php
}
register_sidebar_widget('Webbooker Cart Widget', 'arez_cart_widget');



function arez_catalog_search_widget($args) {
	global $wb;
	if(!$wb) return;	
	extract($args);
?>
        <?php echo $before_widget; ?>
	<div id="search-filters" class="sidebar-container" data-bind="with: WebBooker.Catalog">
		<div class="header gradient-light">
			<h3><?php _e('Search Activities','arez'); ?></h3>
		</div>
		<div class="cb"></div>
		<div class="ribbonFold"></div>

		<div class="content">
			<form id="search-activities-form">
				<div id="search-filters-locations" class="box-content collapsible">
					<h4 title="<?php _e('Hide','arez');?>" data-bind="collapseSidebarBox: true"><i class="icon-chevron-up"></i> <?php _e('Location','arez'); ?></h4>
					<div class="collapse-me">
						<select data-bind="options: search_filter_data.destinations, value: search_params.destination, optionsCaption: __('<?php echo __('Choose a Destination','arez') . '...'; ?>'), optionsText: '__name'"></select>
					</div>
				</div><!-- /search-filters-locations -->

				<div id="search-filters-categories" class="box-content collapsible" data-bind="visible: search_filter_data.categories().length || search_filter_data.tags().length">
					<h4 title="<?php _e('Show','arez');?>" data-bind="collapseSidebarBox: true"><i class="icon-chevron-down"></i> <?php _e('Categories and Tags','arez'); ?></h4>
					<div class="collapse-me" style="display: none;">
						<select class="select-category" data-bind="visible: search_filter_data.categories().length, options: search_filter_data.categories, value: search_params.category, optionsCaption: '<?php echo __('Choose a category','arez').'...'; ?>', optionsText: '__name', optionsValue: 'name'"></select>
						<select class="select-tag" data-bind="visible: search_filter_data.tags().length, options: search_filter_data.tags, value: search_params.tag, optionsCaption: '<?php echo __('Choose a tag','arez') . '...'; ?>', optionsText: '__name', optionsValue: 'name'"></select>
					</div>
				</div><!-- /search-filters-categories -->

				<div id="search-filters-moods" class="box-content collapsible" data-bind="visible: search_filter_data.moods().length">
					<h4 title="<?php _e('Show','arez');?>" data-bind="collapseSidebarBox: true"><i class="icon-chevron-down"></i> <?php _e('Moods','arez'); ?></h4>
					<div class="collapse-me" style="display: none;">
						<ul class="moods clearfix" data-bind="foreach: search_filter_data.moods">
							<li><input type="checkbox" name="search-mood" data-bind="checked: selected" /> <span data-bind="text: __name"></span></li>
						</ul>
					</div>
				</div><!-- /search-filters-moods -->

				<div id="search-filters-date" class="box-content collapsible">
					<h4 title="<?php _e('Show','arez');?>" data-bind="collapseSidebarBox: true"><i class="icon-chevron-down"></i> <?php _e('Date','arez'); ?></h4>
					<div class="collapse-me" style="display: none;">
						<div class="pull-left firstDate">
							<label for="datepicker-second"><?php _e('From','arez'); ?></label>
							<input type="text" readonly="true" class="datepicker input-small" name="datepicker-first" id="datepicker-first" data-bind="value: search_params.date_start" />
						</div>
						<div class="pull-left">
							<label for="datepicker-second"><?php _e('To','arez'); ?></label>
							<input type="text" readonly="true" class="datepicker input-small" name="datepicker-second" id="datepicker-second" data-bind="value: search_params.date_end" />
						</div>
						<div style="clear:both"></div>
					</div>
				</div><!-- /search-filters-date -->

				<div id="search-filters-keywords" class="box-content collapsible">
					<h4 title="<?php _e('Hide','arez');?>" data-bind="collapseSidebarBox: true"><i class="icon-chevron-up"></i> <?php _e('Keywords','arez'); ?></h4>
					<div class="collapse-me">
						<input type="text" name="keywords" id="search-keywords" data-bind="value: search_params.keywords, valueUpdate: 'afterkeydown'" />
					</div>
				</div><!-- /search-filters-keywords -->
			</form>
			<div class="actions">
				<button data-bind="click: clearFilters" class="buttonGray buttonBig"><i class="icon-refresh icon-white"></i> <?php _e('Reset Filters','arez'); ?></button>
				<button data-bind="click: loadWithFilters" title="<?php _e('Search Activities','arez'); ?>" id="searchActivitiesButton" class="buttonBlue buttonBig"><i class="icon-search icon-white"></i> <?php _e('Search','arez'); ?></button>
			</div>
			<div style="clear:both"></div>
			<p style="display:block !important;visibility:visible !important;" class="powered">Powered by <a style="display:inline-block !important;visibility:visible !important;" class="arezLogo" href="https://www.activityrez.com/?utm_source=booking+engine&utm_medium=referral&utm_campaign=powered+by" target="_blank">ActivityRez.com</a></p>
		</div><!-- /content -->
	</div><!-- /search-filters -->
        <?php echo $after_widget; ?>
<?php
}
register_sidebar_widget('Webboker Catalog Search', 'arez_catalog_search_widget');
