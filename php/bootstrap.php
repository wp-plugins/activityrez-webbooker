<?php
/**
 * Bootstrapper for custom Web Bookers.
 *
 * @package ActivityRez
 * @subpackage Web Booking Engine
 * @author Ryan Freeman <ryan@stoked-industries.com>
 */

define( 'PLUGIN_DIR_URL', plugin_dir_url( dirname( __FILE__ ) ) );

arez_include( 'header-webbooker.php' );
arez_include( 'main-webbooker.php' );
arez_include( 'footer-webbooker.php' );