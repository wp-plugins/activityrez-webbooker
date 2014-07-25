<?php
/**
 * Template Name: Web Booking Engine
 *
 * Optimized version of the Web Booking Engine.
 *
 * @package ActivityRez
 * @subpackage Web Booking Engine
 * @author Ryan Freeman <ryan@stoked-industries.com>
 */

global $wp_query, $wb, $query, $currency, $currencySymbol, $testMode, $availableLangs, $post, $langPath, $wbArgs;
define('IMAGE_SERVER','https://media1.activityrez.com/images/timthumb.php');
if ( WB_REMOTE == true ) {
	$arezApi = ActivityRezAPI::instance();
	$arezApi->init_view();
	$wbMeta = get_post_custom( $post->ID );
	$webBookerID = $post->ID;
	$webBookerID =$wbMeta['webBookerID'][0];
	if( !$webBookerID || empty( $webBookerID ) ) {
		die( "Missing Webbooker ID: {$webBookerID}" );
		exit;
	}
	
	//stop this! Aaron Collins
	//$arezApi->set_wb_id($webBookerID);
	
	$wbArgs = array( 'webBookerID' => $webBookerID );
	
	if ( array_key_exists( 'activitySlug', $wp_query->query_vars ) ) {
		//we need google maps on activity pages
		wp_enqueue_script('google-maps','https://maps.google.com/maps/api/js?sensor=true',array('jquery'));
		$wbArgs['slug'] = $wp_query->query_vars['activitySlug'];
	}
	if ( isset( $_REQUEST['i18N'] ) ) {
		$wbArgs['i18n'] = $_REQUEST['i18N'];
	}
	global $wbCacheFields;
	$wb = $arezApi->bootstrap($wbArgs);//update translation files
	//die("wb:".print_r($wb,1));
	$wb = $wb['data'];
	
	$options = get_option( 'arez_plugin' );
	$wb['webbooker_settings'] = admin_url( 'options-general.php?page=arez_plugin', 'https' );
	if( isset($options['server']) && 'training' == $options['server'] ){
		$wb['server']='training';
	}else{
		$wb['server']='secure';
	}
	
	if( isset($wbMeta['include_header']) && 'off' != $wbMeta['include_header'][0]) $wb['include_header'] = true;
	else $wb['include_header'] = false;
	
	if( isset($wbMeta['include_footer']) && 'off' != $wbMeta['include_footer'][0]) $wb['include_footer'] = true;
	else $wb['include_footer'] = false;
	
	foreach($wbCacheFields as $field){
		if(isset($wbMeta[$field])){
			$d = @unserialize($wbMeta[$field][0]);
			if( false === $d ) $wb[$field] = $wbMeta[$field][0];
			else $wb[$field] = $d;
		}
	}
	
} else {
	//local call internally
	// CHANGE LOCAL LANGUAGE
	if ( isset( $_REQUEST['i18N'] ) && isset( $availableLangs[ $_REQUEST['i18N'] ] ) ) {
		UserAuth::instance()->language = $_REQUEST['i18N'];
	}

	api_include( array( 'web_booker' ) );
	$wbAPI = new webBookerAPI();

	// Here we're going to prepare the bootstrap
	// and extend it with query variables
	$wbArgs = array( 'webBookerID' => $post->ID );

	if ( array_key_exists( 'activitySlug', $wp_query->query_vars ) ) {
		//we need google maps on activity pages
		wp_enqueue_script('google-maps','https://maps.google.com/maps/api/js?sensor=true',array('jquery'));
		$wbArgs['slug'] = $wp_query->query_vars['activitySlug'];
	}	
	$wb = $wbAPI->action_bootStrap( $wbArgs );
	$wb = $wb['data'];
    if( $testMode ){
            $wb['server']='training';
    }else{ 
            $wb['server']='secure';
    }
	$wb['include_header'] = true;
	$wb['include_footer'] = true;

	$wb['plugin_url'] = ACTIVITYREZWB_PLUGIN_PATH;
}

$wb['plugin_url'] = ACTIVITYREZWB_PLUGIN_PATH;
$wb['templ_url'] = get_bloginfo('template_url');
$wb['base_url'] = get_site_url();

$wb['wb_url'] = get_site_url().'/'.get_post_type_object('webbooker')->rewrite['slug'].'/'.$post->post_name;


if ( isset($wb['status']) && $wb['status'] == -100 ) {
	include('not-ready.php');
	exit;
}


$langPath = $wb['langPath'];

function wb_localize( $locale ) {
	global $wb;
	if ( isset( $wb['i18n'] ) ) {
		return $wb['i18n'];
	} else {
		return $locale;
	}
}

function bot_detected() {
	if (isset($_SERVER['HTTP_USER_AGENT']) && preg_match('/bot|crawl|slurp|spider/i', $_SERVER['HTTP_USER_AGENT'])) {
		return true;
	}
	return false;
}

add_filter( 'locale', 'wb_localize', 1 );

$moPath = $wb['langPath'] . '/' . $wb['i18n'] . '.mo';
if ( !empty( $langPath ) ) {
	unload_textdomain( 'arez' );
	load_textdomain( 'arez', $moPath );
}

remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

header( 'P3P:CP="OTI DSP COR LAW CUR ADM DEVi TAIi PSAi PSDi IVD HIS OTP OUR OTR UNR IND PUR"' );

//get the Vars from the permalink
$searches = array( 'search_destination', 'search_category', 'search_mood', 'search_tag' );
foreach ( $searches as $search ) {
	if ( isset( $wp_query->query_vars[ $search ] ) ) {
		$wb[ $search ] = urldecode( $wp_query->query_vars[ $search ] );
	}
}

$apiURL = site_url() . '/wp-content/plugins/flash-api/wsrv.php';

$reseller_passed = false;
if ( isset( $_REQUEST['resellerID'] ) ) {
	$reseller_passed = true;
	$wb['reseller1_id'] = $query['reseller1_id'] = $_REQUEST['resellerID'];
}
$resellerID = isset( $_REQUEST['resellerID'] ) ? $_REQUEST['resellerID'] : $wb['agencyID'];
$reseller = get_post($resellerID);
$wb['operator_name'] = $wb['operator_name'] ? $wb['operator_name'] : ( ( $reseller->post_title ) ? $reseller->post_title : 'None' );
$userName = ( isset($user) && isset($user->display_name) ) ? $user->display_name : 'None';
$resellerLocID = $post->ID;
$resellerPhone = get_post_meta( $wb['agencyID'], 'cfaPhone', true );
$wb['reseller_cs_phone'] = get_post_meta( $wb['agencyID'], 'csPhone', true );
$wb['cancellation'] = ( !empty( $wb['cancellation'] ) ) ? $wb['cancellation'] : get_post_meta( $wb['agencyID'], 'cancellation', true );
$wb['terms'] = ( !empty( $wb['terms'] ) ) ? $wb['terms'] : get_post_meta( $wb['agencyID'], 'terms', true );
$wb['privacy'] = html_entity_decode( ( !empty( $wb['privacy'] ) ) ? $wb['privacy'] : get_post_meta( $wb['agencyID'], 'privacy', true ) );

if ( !$resellerLocID ) {
	$resellerLocID = 0;
}

// seems like we're not using this at the moment?
// 31/10/2013 Ryan F.
//$customHomeCode = $wb['custom_home'];

for( $i = 0; $i < count( $wb['wb_countries'] ); $i++ ) {
	$wb['wb_countries'][$i]['name'] = __( $wb['wb_countries'][$i]['name'], 'arez' );
	if( !empty( $wb['languages'][$i] )) $wb['languages'][$i]['title'] = __( $wb['languages'][$i]['title'], 'arez' );
}
$wb['wb_countries'] = countrySort( $wb['wb_countries'], $wb['i18n'] );
$wb['languages'] = countrySort( $wb['languages'], $wb['i18n'], true );

$wbSlim = $wb;
unset( $wbSlim['style'] );
unset( $wbSlim['header'] );
unset( $wbSlim['footer'] );
unset( $wbSlim['custom_home'] );
unset( $wbSlim['hero_heading_text'] );
unset( $wbSlim['hero_summary_text'] );
unset( $wbSlim['hero_url'] );

function arez_webbooker_loadScripts(){
	global $testMode, $wp_scripts, $wp_styles, $wb;

	
	if(!$wb['include_header']){
		add_filter('show_admin_bar', '__return_false');
		foreach( $wp_scripts->queue as $q){
			if( isset($wp_scripts->registered[$q]) ){
				if( property_exists($wp_scripts->registered[$q], 'extra')){
					if( !isset($wp_scripts->registered[$q]->extra['group']) || 1 != $wp_scripts->registered[$q]->extra['group']){
						wp_dequeue_script($q);
					}
				}
			}
		}
		
		foreach( $wp_styles->queue as $q){
			wp_dequeue_style($q);
		}
	}
	if(!$wb['include_footer']){
		foreach( $wp_scripts->queue as $q){
			if( isset($wp_scripts->registered[$q]) ){
				if( property_exists($wp_scripts->registered[$q], 'extra')){
					if( isset($wp_scripts->registered[$q]->extra['group']) && 1 == $wp_scripts->registered[$q]->extra['group']){
						wp_dequeue_script($q);
					}
				}
			}
		}
	}
	
	if($testMode){
		//styles
		wp_enqueue_script('knockout',ACTIVITYREZWB_PLUGIN_PATH.'js/lib/knockout.min.js',array('jquery'));
		wp_enqueue_script('bootstrap',ACTIVITYREZWB_PLUGIN_PATH.'js/lib/bootstrap.min.js',array('jquery'));
		wp_enqueue_script('store',ACTIVITYREZWB_PLUGIN_PATH.'js/lib/store.js',array('jquery'));
		wp_enqueue_script('path',ACTIVITYREZWB_PLUGIN_PATH.'js/lib/path.js',array('jquery'));
		wp_enqueue_script('lazyload',ACTIVITYREZWB_PLUGIN_PATH.'js/lib/lazyload-min.js',array('jquery'));
		wp_enqueue_script('nouislider', ACTIVITYREZWB_PLUGIN_PATH . 'js/lib/jquery.nouislider.min.js', array('jquery'));
		wp_enqueue_script('google-maps','https://maps.google.com/maps/api/js?sensor=true',array('jquery'));
		
		//ActivityRez Required Scripts
		wp_enqueue_script('ar-app',ACTIVITYREZWB_PLUGIN_PATH.'js/app/app.js',array('jquery','jquery-ui-datepicker','knockout','bootstrap','store','path','lazyload','nouislider'));
		wp_enqueue_script('ar-api',ACTIVITYREZWB_PLUGIN_PATH.'js/app/api.js',array('ar-app'));
		wp_enqueue_script('ar-catalog',ACTIVITYREZWB_PLUGIN_PATH.'js/app/catalog.js',array('ar-app','ar-api'));
		wp_enqueue_script('ar-cart',ACTIVITYREZWB_PLUGIN_PATH.'js/app/cart.js',array('ar-app','ar-api','ar-catalog'));
		wp_enqueue_script('ar-home',ACTIVITYREZWB_PLUGIN_PATH.'js/app/home.js',array('ar-app','ar-api','ar-catalog','ar-cart'));
		wp_enqueue_script('ar-activity',ACTIVITYREZWB_PLUGIN_PATH.'js/app/activity.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home'));
		wp_enqueue_script('ar-checkout',ACTIVITYREZWB_PLUGIN_PATH.'js/app/checkout.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home','ar-activity'));
		wp_enqueue_script('ar-dashboard',ACTIVITYREZWB_PLUGIN_PATH.'js/app/dashboard.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home','ar-activity','ar-checkout'));
		wp_enqueue_script('ar-itinerary',ACTIVITYREZWB_PLUGIN_PATH.'js/app/itinerary.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home','ar-activity','ar-checkout','ar-dashboard'));
		wp_enqueue_script('ar-analytics',ACTIVITYREZWB_PLUGIN_PATH.'js/app/analytics.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home','ar-activity','ar-checkout','ar-dashboard','ar-itinerary'));
		wp_enqueue_script('ar-init',ACTIVITYREZWB_PLUGIN_PATH.'js/app/init.js',array('ar-app','ar-api','ar-catalog','ar-cart','ar-home','ar-activity','ar-checkout','ar-dashboard','ar-itinerary','ar-analytics'));
	}else{
		wp_enqueue_script('google-maps','https://maps.google.com/maps/api/js?sensor=true',array('jquery'));
		wp_enqueue_script('ar-webbooker',ACTIVITYREZWB_PLUGIN_PATH.'js/app/webbooker.min.js',array('jquery','jquery-ui-datepicker'));
	}
	
	wp_enqueue_style('ar-vendor',ACTIVITYREZWB_PLUGIN_PATH.'css/vendor.css');
	wp_enqueue_style('ar',ACTIVITYREZWB_PLUGIN_PATH.'css/ar.css');
}
if ( !bot_detected() ) {
	add_action( 'wp_enqueue_scripts', 'arez_webbooker_loadScripts',99 );//load it last
}

// Let's figure out which WB template to load.
$wb_include = false;
$wb_include = apply_filters('wbTemplate',$wb_include,$wb);
if($wb_include) {
	include_once($wb_include);
}
