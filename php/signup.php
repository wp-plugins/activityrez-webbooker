<?php
if (!defined('SITEROOT')) {
	define('SITEROOT', '../../../../../');
}

?>

<style type="text/css">
	.clear {
		clear: both;
		line-height: 0px;
		font-size: 0px;
		height: 0px;
	}
</style>


<div id="signup" class="booking-right">
	<div class="right-header">
		<h1><span class="sprite"><?php _e('New User Registration Form','arez'); ?></span></h1>
	</div>
  
	<div class="signup-form booking-content">
	  <div class="signup-nest">

		<p class="signup-success"></p>

		<div class="clear"></div>
	
		<div>
			<div class="signup-field1">
				<div class="label"><?php _e('First Name','arez'); ?></div>
				<input type="text" id="first_name" class="first_name" name="first_name" size="20" />
			</div>
			<div class="signup-field2">
				<div class="label"><?php _e('Last Name','arez'); ?></div>
				<input type="text" id="last_name" class="last_name" name="last_name" size="20" />
			</div>
		</div>

		<div class="clear"></div>

		<div>
			<div class="signup-field1">
				<div class="label"><?php _e('E-mail Address','arez'); ?></div>
				<input type="text" id="user_email" class="user_email" name="user_email" size="20" />
			</div>
		</div>

		<div class="clear"></div>

		<div>
			<div class="signup-field1">
				<div class="label"><?php _e('Password','arez'); ?></div>
				<input type="password" id="user_pass" class="user_pass" autocomplete="off" name="user_pass" size="20" />
			</div>

			<div class="signup-field2">
				<div class="label"><?php _e('Verify Password','arez'); ?></div>
				<input type="password" id="confirm_pass" class="confirm_pass" autocomplete="off" name="confirm_pass" size="20" />
			</div>
		</div>

		<div class="clear"></div>

		<div class="signup-field1">
			<div class="label"><?php _e('ARC Number','arez'); ?></div>
			<input type="text" id="arc_number" class="arc_number" name="arc_number" size="25" />
		</div>

		<div class="clear"></div>

		<div style="margin-top:10px;">
			<div class="signup-button">
				<button type="submit" id="submit" class="btn-action gradient-green small"><?php _e('Submit','arez'); ?></button>
			</div>

			<div class="signup-process">
				<div class="load-anim small bkgd-gray" style="display:none;"><span>&nbsp;</span><?php _e('Proceeding...','arez'); ?></div>
			</div>
		</div>

		<div class="clear"></div>
	  </div>
	</div>

</div>