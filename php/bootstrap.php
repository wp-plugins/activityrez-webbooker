<?php
/**
 * Bootstrapper for custom Web Bookers.
 *
 * @package ActivityRez
 * @subpackage Web Booking Engine
 * @author Ryan Freeman <ryan@stoked-industries.com>
 */

define( 'PLUGIN_DIR_URL', plugin_dir_url( dirname( __FILE__ ) ) );

include_once( 'header-webbooker.php' );
include_once( 'main-webbooker.php' );
include_once( 'footer-webbooker.php' );