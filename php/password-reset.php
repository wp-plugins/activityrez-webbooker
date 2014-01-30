<?php
/**
 * Password Reset Interface
 */
?>
<div id="passwordResetRequest" data-bind="if: WebBooker.Agent.passwordResetRequest">
	<div  data-bind="visible: WebBooker.Agent.passwordResetRequest" style="display:none">
		<div class="header">
			<h3><?php _e("Request New Password",'arez');?></h3>
		</div>
		<div class="cb"></div>
		<div class="ribbonFold"></div>
		<div class="content">
			<p><?php _e("Please provide your email or login name to reset your password.",'arez');?></p>
			<div class="newPassword">
				<label><?php _e("Login/Email: ",'arez');?></label>
				<input type="text" data-bind="value: WebBooker.Agent.user">
				<button class="buttonBlue buttonBig" data-bind="click: WebBooker.Agent.PasswordResetRequest"><i class="icon-white icon-ok"></i> <?php _e("Request Reset",'arez');?></button>
			</div>	
		</div>
	</div>
</div>

<div id="passwordReset" data-bind="if: WebBooker.Agent.passwordReset">
	<div  data-bind="visible: WebBooker.Agent.passwordReset" style="display:none">
		<div class="header">
			<h3><?php _e("Reset Password",'arez');?></h3>
		</div>
		<div class="cb"></div>
		<div class="ribbonFold"></div>
		<div class="content">
			<label><?php _e("Password: ",'arez');?></label>
			<input type="password" data-bind="value: WebBooker.Agent.password">
			<label><?php _e("Re-Type Password: ",'arez');?></label>
			<input type="password" data-bind="value: WebBooker.Agent.password2">
			<div title="fake clear"></div>
			<button class="buttonBlue buttonBig" data-bind="click: WebBooker.Agent.PasswordReset"><i class="icon-white icon-ok"></i> <?php _e("Change Password",'arez');?></button>
		</div>
	</div>
</div>

