<?php
/**
 * This file handles all the wp-admin logic when webbookers is running standalone
 */
// Meta to include the webbooker ID
add_action("admin_init", "wbid_init");
function wbid_init() {
	add_meta_box("wb_id_meta", "Webbooker ID", "wb_id_meta", "webBooker", "normal", "high");


    //note this should only be called if you are in our admin page
    if( 'arez_plugin' == $_REQUEST['page'] && !defined('FAPI_PLUGIN_DIR')) remoteAuth();
}
function wb_id_meta() {
	global $post;
	$webbookerID = get_post_meta( $post->ID, 'webBookerID', true );
	$include_header = get_post_meta( $post->ID, 'include_header', true );
	$include_footer = get_post_meta( $post->ID, 'include_footer', true );

	?>
    <table cellpadding="2" cellspacing="3" border="0" width="100%">
        <tr>
            <td width="160"><?php echo __('Web Booker ID#','arez') . "<br />" . sprintf(__('(Get It %s Here %s)','arez'), '<a href="https://secure.activityrez.com/admin/myweb/">', '</a>'); ?></td>
            <td><input type="text" name="webbooker_id" id="webbooker_id" class="widefat" value="<?php echo $webbookerID; ?>" /></td>
        </tr>
        <tr>
        	<td><?php echo __("Include Site wide Header",'arez');?></td>
        	<td><input type="checkbox" name="include_header" id="include_header" class="widefat" value="1" <?php if( 1 == $include_header){ echo "checked='checked'"; } ?> /></td>
        </tr>
        <tr>
        	<td><?php echo __("Include Site wide Footer",'arez');?></td>
        	<td><input type="checkbox" name="include_footer" id="include_footer" class="widefat" value="1" <?php if( 1 == $include_footer){ echo "checked='checked'"; } ?> /></td>
        </tr>
    </table>
    <?php
}

function arez_wb_save_postdata( $post_id ){
	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
	  return $post_id;
	
	// Check the user's permissions.
	if ( 'webBooker' == $_POST['post_type'] ) {
	
		if ( ! current_user_can( 'edit_page', $post_id ) )
		    return $post_id;
	
	} else {
	
		if ( ! current_user_can( 'edit_post', $post_id ) )
		    return $post_id;
	}
	
	/* OK, its safe for us to save the data now. */
	
	// Sanitize user input.
	$webbookerID = sanitize_text_field( $_POST['webbooker_id'] );
	$include_header = sanitize_text_field( $_POST['include_header'] );
	$include_footer = sanitize_text_field( $_POST['include_footer'] );
	
	// Update the meta field in the database.
	update_post_meta( $post_id, 'webBookerID', $webbookerID );
	
	if(1 == $include_header) update_post_meta( $post_id, 'include_header', 1 );
	else update_post_meta( $post_id, 'include_header', 'off' );
	
	if(1 == $include_footer) update_post_meta( $post_id, 'include_footer', 1 );
	else update_post_meta( $post_id, 'include_footer', 'off' );
}

add_action( 'save_post', 'arez_wb_save_postdata' );
if( !function_exists ('activityrezAdminMenu') ){
	function activityrezAdminMenu(){
		global $activityrez;
		$options = get_option( 'arez_plugin' );
		if( isset($options['server']) && 'secure' == $options['server']){
			$admin_url = AREZ_SERVER;
		}else{
			$admin_url = AREZ_SERVER_TRAINING;
		}
		$activityrez['adminMenu'] = add_menu_page(__('ActivityRez','arez'),__('ActivityRez','arez'),'administrator','arez','',ACTIVITYREZWB_PLUGIN_PATH.'/assets/AR_LogoFinal.png');

		//add_submenu_page( 'arez', 'Admin', 'Admin','administrator',$admin_url);
		global $submenu;
		$submenu['arez'][500] = array( 'Admin', 'manage_options' , $admin_url );
	}
	add_action('admin_menu', 'activityrezAdminMenu');
}

function arez_plugin_help($contextual_help, $screen_id, $screen) {
	if ($screen_id == 'edit-webbooker' || $screen_id == 'settings_page_arez_plugin') {
		$contextual_help = <<< heredoc
		<div>
			<a href='http://activityrez.com' target='_blank'><img src='https://www.activityrez.com/wp-content/themes/empyrean/images/arezLogoColor.png'></a>
		</div>
		<ul>
			<li> <a href='https://secure.activityrez.com' target='_blank'>ActivityRez Admin</a></li>
			<li>Having Trouble?  Visit <a href='https://support.activityrez.com' target='_blank'>https://support.activityrez.com</a> for knowledgebase and live support</li>
			<li><a href='https://blog.activityrez.com' target='_blank'>ActivityRez Blog</a></li>
		</ul>
		
		<!-- begin olark code -->
		<script data-cfasync="false" type='text/javascript'>/*<![CDATA[*/window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){
		f[z]=function(){
		(a.s=a.s||[]).push(arguments)};var a=f[z]._={
		},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){
		f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={
		0:+new Date};a.P=function(u){
		a.p[u]=new Date-a.p[0]};function s(){
		a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){
		hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){
		return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){
		b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{
		b.contentWindow[g].open()}catch(w){
		c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{
		var t=b.contentWindow[g];t.write(p());t.close()}catch(x){
		b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({
		loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
		/* custom configuration goes here (www.olark.com/documentation) */
		olark.identify('5319-287-10-8779');/*]]>*/</script><noscript><a href="https://www.olark.com/site/5319-287-10-8779/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript>
		<!-- end olark code -->		
heredoc;
	}
	return $contextual_help;
}

add_filter('contextual_help', 'arez_plugin_help', 10, 3);


// Add a menu for our option page
add_action('admin_menu', 'arez_plugin_add_page');
function arez_plugin_add_page() {
	add_options_page( 'ActivityRez', 'ActivityRez', 'manage_options', 'arez_plugin', 'arez_plugin_option_page');
}

function remoteAuth(){
	global $flashError;
	$options = get_option( 'arez_plugin' );

	include_once(ACTIVITYREZWB_PLUGIN_DIR . '/php/lib/arez.api.php');
	$arezApi = ActivityRezAPI::instance();
	$resp = $arezApi->r_authArez( $options['username'], $options['password'] );
	if($resp['status']==0){
		$flashError = __("Invalid Username or Password, Try again",'arez');
	}
}


// Draw the option page
function arez_plugin_option_page() {
	//error_log('page loaded');
	$options = get_option( 'arez_plugin' );
	global $nonce,$flashError;
	$_webbookers = array();

	remoteAuth();
 
	if( isset( $_REQUEST['arez_logout'] ) ){
		unset($nonce);
		if(!headers_sent()) setcookie ("ACTIVITYREZ", "", time() - 3600);
	}

	if( !isset( $options['api_key'] ) ){
		//need the api key, go get it

		$arezApi = ActivityRezAPI::instance();
		$apiKey = $arezApi->fetchApiKey();
		
		if( isset($apiKey['status']) && $apiKey['status'] == 1 ){
			$options['api_key'] = $apiKey['api_key'];
			update_option( 'arez_plugin', $options);
		}else{
			$flashError = __("Can't lookup agency API Key, Please contact Support",'arez');
		}
	}

	if( isset( $_REQUEST['translate'] ) && is_array( $_REQUEST['translate'] ) && !empty( $_REQUEST['translate'] ) ){
		if( !isset($flashError) || !$flashError){
			arez_get_translationFiles( $_REQUEST['translate'] );
		}
	}
	if( isset( $_REQUEST['a'] ) && $_REQUEST['a'] === 'import' ){
		//TODO import your webbookers
		if( !isset($flashError) || !$flashError){
			$arezApi = ActivityRezAPI::instance();
			$ResultString = $arezApi->importWebbookers();
			
			if( isset($ResultString['status']) && $ResultString['status'] == '1' ){
				//Store the wb list and prompt the user wich ones they want to import
				$_webbookers = $ResultString['webBookers'];
				update_option('arez_webbooker_import',json_encode($_webbookers) );
			}else{
				$flashError = __("Failed to import webbookers:",'arez'). print_r($ResultString,1) . AREZ_SERVER . "nonce: {$nonce}".print_r($nonceData,1);
			}
		}
	}else if(isset( $_REQUEST['a'] ) && $_REQUEST['a'] === 'import_finish' && isset($_REQUEST['wbID']) && is_array($_REQUEST['wbID']) && !empty($_REQUEST['wbID']) ){
	//finish import job based off user selection
		$_webbookers = json_decode(get_option( 'arez_webbooker_import' ),1);
		$wbImportCount = 0;
		foreach( $_webbookers as $wb ){
			if($wb['post_status'] != 'publish') continue;
			if( !in_array($wb['ID'],$_REQUEST['wbID']) ) continue;
			$webbookers = get_posts( array( 'post_type'=>'webBooker', 'numberposts'=>-1, 'meta_key'=>'webBookerID','meta_value'=>$wb['ID'] ) );
			if( !$webbookers || empty($webbookers)){
				$post = array('post_status'=>'publish','post_title'=>$wb['post_title'],'post_type'=>'webBooker');
				$post_id = wp_insert_post($post);
				update_post_meta($post_id,'webBookerID',$wb['ID']);
				update_post_meta($post_id,'include_header',1);
				update_post_meta($post_id,'include_footer',1);
				$wbImportCount++;
			}else{
				//already been imported, skip this
				continue;
			}
		}
		delete_option('arez_webbooker_import');
		$flashError = arez_update_webbookers();
		$flashError .= sprintf(__("Successfully imported %s new Web Bookers",'arez'),$wbImportCount);

	}else if( isset( $_REQUEST['a'] ) && $_REQUEST['a'] === 'update' ){
		global $nonce,$flashError;
		if( !isset($flashError) || !$flashError){
			$flashError = arez_update_webbookers();
			$flashError .= __("Successfully update all Web Bookers",'arez');
		}
	}




	?>
	<div class="wrap">
		<?php screen_icon(); ?>
		<div>
			<img src="https://www.activityrez.com/wp-content/themes/empyrean/images/arezLogoColor.png">
		</div>
		<?php
			if( isset( $flashError ) && !empty( $flashError ) ){
		?>
				<div class="updated settings-error">
					<p><strong><?php echo $flashError;?></strong></p>
				</div>
		<?php
			}
		?>
			<div id="poststuff" class="postbox-container meta-box-sortables">
				<form action="options.php" method="post">
				<?php settings_fields('arez_plugin_options'); ?>
				<?php do_settings_sections('arez_plugin'); ?>
				<input name="Submit" type="submit" value="Save Changes" class="button button-primary" />
				<a class="button button-primary" href="options-general.php?page=arez_plugin&a=import">
					<?php _e("Import WebBookers",'arez');?>
	     		</a>
		 		</form>
				<br/>
				<br/>
				<form action="options-general.php?page=arez_plugin" method="post">
				<?php

					//TODO verify auth before we show this
					if( isset( $options['username'] ) && isset( $options['password'] )  ){
					
						if(isset( $_REQUEST['a'] ) && $_REQUEST['a'] === 'import'){
						?>
							<div id="webbookers" class="postbox"  style="width: 50%">
								<h3>
									<span><?php _e("Select Which WebBooker's To Import",'arez');?></span>
								</h3>
								<div class="inside">
									<table class="wp-list-table widefat fixed">
										<thead>
										    <tr>
										        <th width="10%"><?php _e("Select",'arez');?></th>
										        <th width="10%"><?php _e("ID",'arez');?></th>
										        <th width="80%"><?php _e("Name",'arez');?></th>
										    </tr>
										</thead>
										<tfoot>
										    <tr>
										        <th width="10%"><?php _e("Select",'arez');?></th>
										        <th width="10%"><?php _e("ID",'arez');?></th>
										        <th width="80%"><?php _e("Name",'arez');?></th>
										    </tr>
										</tfoot>
										<tbody>
											<?php
												$webbookers = get_posts( array( 'post_type'=>'webBooker', 'numberposts'=>-1, 'post_status'=>'publish' ) );
												$i = 0;
												foreach($_webbookers as $wb){
													if( 'publish' != $wb['post_status']) continue;
											?>
												   <tr>
												     <td><input type="checkbox" name="wbID[<?php echo $i;?>]" value="<?php echo $wb['ID'];?>"></td>
												     <td><?php echo $wb['ID']; ?></td>
												     <td><?php echo $wb['post_title']; ?> </td>
												   </tr>
										   <?php
										   			$i++;
												}
											?>
										</tbody>
									</table>
									<br/>
									<button class="button button-primary" name="a" value="import_finish">
										<?php _e("Import WebBookers",'arez');?>
						     		</a>
									<br/>
								</div>
							</div>
						<?php	
						}else{
							$webbookers = get_posts( array( 'post_type'=>'webBooker', 'numberposts'=>-1, 'post_status'=>'publish' ) );
							if( !empty($webbookers) ){
							?>
								<div id="webbookers" class="postbox">
									<h3>
										<span><?php _e("WebBookers",'arez');?></span>
									</h3>
									<div class="inside">
										<table class="widefat">
											<thead>
											    <tr>
											        <th><?php _e("ID",'arez');?></th>
											        <th><?php _e("Name",'arez');?></th>
											        <th><?php _e("Status",'arez');?></th>
											        <th><?php _e("Actions",'arez');?></th>
											    </tr>
											</thead>
											<tfoot>
											    <tr>
											        <th><?php _e("ID",'arez');?></th>
											        <th><?php _e("Name",'arez');?></th>
											        <th><?php _e("Status",'arez');?></th>
											        <th><?php _e("Actions",'arez');?></th>
											    </tr>
											</tfoot>
											<tbody>
												<?php
													
													foreach($webbookers as $wb){
														$meta = get_post_meta( $wb->ID );
														$webbooker_id = 0;
														if(isset($meta['webBookerID'])){
															$webbooker_id = $meta['webBookerID'][0];
														}
												?>
													   <tr>
													     <td><?php echo $webbooker_id; ?></td>
													     <td>
													     	<a href="post.php?post=<?php echo $wb->ID;?>&action=edit"><?php echo $wb->post_title; ?></a>
												     	</td>
													     <td><?php echo $wb->post_status; ?></td>
													     <td>
													     	<a class="button secondary-button" href="options-general.php?page=arez_plugin&translate[]=<?php echo $webbooker_id;?>">
													     		<?php _e("Fetch Translations",'arez');?>
												     		</a>
													     </td>
													   </tr>
											   <?php
													}
												?>
											</tbody>
										</table>
										<br/>
							     		<a class="button button-primary" href="options-general.php?page=arez_plugin&a=update">
											<?php _e("Update WebBookers",'arez');?>
							     		</a>
										<br/>
										<br/>
									</div>
								</div>
					<?php
							}
						}
					}
					?>
					</form>
			</div>
	</div>
	<?php
}


// Register and define the settings
add_action('admin_init', 'arez_plugin_admin_init');
function arez_plugin_admin_init(){
	register_setting( 'arez_plugin_options', 'arez_plugin', 'arez_plugin_validate_options' );
	add_settings_section( 'arez_plugin_main', __("Settings",'arez'), 'arez_plugin_section_text', 'arez_plugin' );
	add_settings_field( 'arez_plugin[username]', __("Username",'arez'), 'arez_plugin_setting_username', 'arez_plugin', 'arez_plugin_main' );
	add_settings_field( 'arez_plugin[password]', __("Password",'arez'), 'arez_plugin_setting_password', 'arez_plugin', 'arez_plugin_main' );
	add_settings_field( 'arez_plugin[server]', __("Environment",'arez'), 'arez_plugin_setting_server', 'arez_plugin', 'arez_plugin_main' );
}

// Draw the section header
function arez_plugin_section_text() {
	echo '<p>Enter your settings here.</p>';
}

// Display and fill the form field
function arez_plugin_setting_username() {
	// get option 'text_string' value from the database
	$options = get_option( 'arez_plugin' );
	$text_string = $options['username'];
	// echo the field
	echo "<input id='text_string' name='arez_plugin[username]' type='text' value='$text_string' />";
}
function arez_plugin_setting_password() {
	// get option 'text_string' value from the database
	$options = get_option( 'arez_plugin' );
	$text_string = $options['password'];
	// echo the field
	echo "<input id='text_string' name='arez_plugin[password]' type='password' value='$text_string' />";
}

function arez_plugin_setting_server() {
	// get option 'text_string' value from the database
	$options = get_option( 'arez_plugin' );
	$text_string = $options['server'];
	// echo the field
	echo "<label>Production: <input id='radio' name='arez_plugin[server]' type='radio' value='secure' " . (( $text_string == 'secure' ) ? "checked='checked'" : '') . " /></label>";
	echo "<label>Training: <input id='radio' name='arez_plugin[server]' type='radio' value='training' " . (( $text_string == 'training' ) ? "checked='checked'" : '') . " /></label>";
}

// Validate user input (we want text only)
function arez_plugin_validate_options( $input ) {
	$valid = array();
	//arezLog('wbStandalone',print_r($input,1));

	if( isset( $input['username'] ) && !empty( $input['username'] ) ){
		$valid['username'] = $input['username'];
	}

	if( isset( $input['password'] ) && !empty( $input['password'] ) ){
		$valid['password'] = $input['password'];
	}

	if( isset( $input['api_key'] ) && !empty( $input['api_key'] ) ){
		$valid['api_key'] = $input['api_key'];
	}
	
	if( isset( $input['server'] ) && !empty( $input['server'] ) ){
		$valid['server'] = $input['server'];
	}
	return $valid;
}
