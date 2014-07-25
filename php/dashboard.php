<?php
/**
 *	ActivityRez Web Booking Engine
 *	Reseller Dashboard File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */
global $wb;
?>

<div id="webbooker-dashboard" data-bind="if: Dashboard.show">
	<div data-bind=" visible: Dashboard.show, with: Dashboard" style="display:none">
		<div id="dash-login" data-bind="visible: !WebBooker.Agent.user_id() && showMain()">
			<div class="header"><h3><?php _e('Log In','arez'); ?></h3></div>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			<p class="login-error"></p>
			<form class="login-form" data-bind="with: WebBooker.Agent">
				<input type="text" title="<?php _e('Username','arez'); ?>" autocorrect="off" autocapitalize="off" placeholder="<?php _e('Username','arez'); ?>" data-bind="value: email" />
				<input type="password" title="<?php _e('Password','arez'); ?>" placeholder="<?php _e('Password','arez'); ?>" data-bind="value: password" /><br><br>
				<button type="submit" class="buttonBlue buttonBig" data-bind="click: login"><i class="icon-lock icon-white" data-bind="css: {'icon-processing': WebBooker.Agent.isLoggingIn}"></i> <?php _e('Log In','arez'); ?></button>
				<button class="buttonGray buttonBig" data-bind="click: doShowSignup, scrollTopOnClick: true"><i class="icon-pencil icon-white"></i> <?php _e('Sign Up','arez'); ?></button>
				<a href="<?php echo $wb['wb_url']; ?>#/PasswordResetRequest"><?php _e("Forgot Password?",'arez');?></a>
				<div class="alert alert-error" data-bind="text: loginError, visible: loginError"></div>
			</form>
			<div class="loginBottom">
				<p><strong><?php _e('Sign Up','arez'); ?></strong></p>
				<p><?php _e('Take advantage of our proprietary online booking technology and earn commissions.','arez'); ?> <!-- <a href="/booking/travel-agents/"><?php _e('Learn more.','arez'); ?></a> --></p>
			</div>
		</div>
		<div id="dash-pwreset" class="dash-forms" data-bind="visible: showPasswordReset">
			<div class="header"><h3><?php _e('Reset Password','arez'); ?></h3></div>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			<p class="login-error"></p>
			<p><?php _e('Your password has expired. Please reset it.', 'arez'); ?></p>
			<form class="login-form" data-bind="with: WebBooker.Agent.pw_reset">
				<input type="text" title="<?php _e('Username', 'arez'); ?>" placeholder="<?php _e('Username', 'arez'); ?>" data-bind="value: username"><br><br>
				<input type="password" title="<?php _e('Old Password','arez'); ?>" placeholder="<?php _e('Old Password','arez'); ?>" data-bind="value: old_pw" /><br><br>
				<input type="password" title="<?php _e('New Password','arez'); ?>" placeholder="<?php _e('New Password','arez'); ?>" data-bind="value: new_pw" /><br><br>
				<input type="password" title="<?php _e('Confirm Password','arez'); ?>" placeholder="<?php _e('Confirm Password','arez'); ?>" data-bind="value: new_pw_confirm" /><br><br>
				<button type="submit" class="buttonBlue buttonBig" data-bind="click: WebBooker.Agent.resetPassword, css: {'icon-processing': WebBooker.Agent.isLoggingIn}"><i class="icon-lock icon-white" data-bind="css: {'icon-processing': WebBooker.Agent.isLoggingIn}"></i> <?php _e('Submit','arez'); ?></button>
			</form>
			<div class="alert alert-error" data-bind="text: WebBooker.Agent.loginError, visible: WebBooker.Agent.loginError"></div>
		</div>
		<div id="dash-pwreset-confirm" class="dash-forms" data-bind="visible: showPasswordResetConfirmation">
			<div class="header"><h3><?php _e('Password Reset Successfully','arez'); ?></h3></div>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			<br><br>
			<div class="alert alert-success"><?php _e('Your password has been successfully reset. Please login to the left.', 'arez'); ?></div>
			<br><br>
		</div>
		<div id="dash-main" data-bind="visible: WebBooker.Agent.user_id() > 0 && showMain()">
			<div class="header gradient-light">
				<h3><?php _e('Travel Agent Dashboard','arez'); ?></h3>
			</div>
			<button class="dashLog buttonGray" data-bind="click: WebBooker.Agent.logout"><?php _e('Log Out','arez'); ?></button>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			<?php include("mini-sidebar.php"); ?>
			<div class="content">
				<!--<div id="dash-intro">
					<p><?php _e('Welcome to the Travel Agent Dashboard.','arez'); ?></p>
				</div>-->
				<div id="dash-commissions">
					<h4><?php _e('Recent Sales and Commissions','arez'); ?></h4>
					<form autocomplete="off" class="form-inline options">
						<label><?php _e('From','arez'); ?>:</label>
						<input type="text" class="input-small datepicker-dash" name="topgross-startdate" id="topgross-startdate" data-bind="value: agentCommissionsStartDate" />
						&nbsp;
						<br class="mobileBreak" />
						<label><?php _e('To','arez'); ?>:</label>
						<input type="text" class="input-small datepicker-dash" name="topgross-enddate" id="topgross-enddate" data-bind="value: agentCommissionsEndDate" />
						&nbsp;
						<button class="buttonBlue" title="Refresh My Commissions" data-bind="click: reloadAgentCommissionsChart"><i class="icon-refresh icon-white"></i> <?php _e('Refresh', 'arez')?></button>
						<button class="buttonGray" title="Download CSV" data-bind="click: downLoadCSV"><i class="icon-download icon-white"></i> <?php _e('CSV', 'arez')?></button>
					</form>
					<div id="dash-commissions-chart" data-bind="visible: agentCommissionsData"></div>
					<div id="dash-commissions-nodata" data-bind="visible: !agentCommissionsData()">
						<p><?php _e('No data found for this chart.','arez'); ?></p>
					</div>
				</div>
				<div class="pull-left twoCol">
					<h4><?php _e('Commissions Legend','arez'); ?></h4>
					<!--<div class="coinContainer">
						<ul class="commission" title="16% Commission">
							<li class="one">&nbsp;</li>
							<li class="two">&nbsp;</li>
							<li class="three">&nbsp;</li>
							<li class="four">&nbsp;</li>
							<li class="five">&nbsp;</li>
						</ul>
						<span><?php _e('>15%','arez'); ?></span>
						<div style="clear: both"></div>
					</div>
					<div class="coinContainer">
						<ul class="commission" title="11-15% Commission">
							<li class="one">&nbsp;</li>
							<li class="two">&nbsp;</li>
							<li class="three">&nbsp;</li>
							<li class="four">&nbsp;</li>
						</ul>
						<span><?php _e('11-15%','arez'); ?></span>
						<div style="clear: both"></div>
					</div>-->
					<div class="coinContainer">
						<ul class="commission" title="6-10% Commission">
							<li class="one">&nbsp;</li>
							<li class="two">&nbsp;</li>
							<li class="three">&nbsp;</li>
						</ul>
						<span><?php _e('6-10%','arez'); ?></span>
						<div style="clear: both"></div>
					</div>
					<div class="coinContainer">
						<ul class="commission" title="3-5% Commission">
							<li class="one">&nbsp;</li>
							<li class="two">&nbsp;</li>
						</ul>
						<span><?php _e('3-5%','arez'); ?></span>
						<div style="clear: both"></div>
					</div>
					<div class="coinContainer">
						<ul class="commission" title="1-2% Commission">
							<li class="one">&nbsp;</li>
						</ul>
						<span><?php _e('1-2%','arez'); ?></span>
						<div style="clear: both"></div>
					</div>
				</div>
				<div class="pull-right twoCol">
					<h4><?php _e('Commissions by sale','arez'); ?></h4>
					<div class="commissionsHead">
						<div><span class="dateHead"><?php _e('Date','arez'); ?></span><span class="sidHead"><?php _e('Sale ID','arez'); ?></span><span class="commHead"><?php _e('Commission','arez'); ?></span></div>
					</div>
					<div class="commissionsContainer" data-bind="foreach: agentCommissionsReport, visible: agentCommissionsReport">
						<div><span class="commDate" data-bind="text: date"></span><span class="commSID" data-bind="text: saleID"></span><span class="commMoney" data-bind="money: amount"></span> </div>
					</div>
					<div data-bind="visible: !agentCommissionsReport()">
						<p><?php _e('No data to display.','arez'); ?></p>
					</div>
					<p class="commTot"><?php _e('Total:','arez'); ?> <span data-bind="money: agentCommissionsTotal"></span></p>
				</div>
				<div style="clear: both"></div>
			</div><!-- /content -->
		</div><!-- /dash-main -->
	
		<div id="dash-reports" data-bind="visible: WebBooker.Agent.user_id() > 0 && showReports">
			<div class="header gradient-light">
				<h3><i class="icon-list-alt"></i> <?php _e('Travel Agent Dashboard - Reports','arez'); ?></h3>
			</div>
			
			<div class="content">
				<p><?php _e('Welcome to the travel agent dashboard reports.','arez'); ?></p>
			</div><!-- /content -->
		</div><!-- /dash-reports -->
		
		<div id="dash-signup" data-bind="visible: showSignup">
			<div class="header gradient-light">
				<h3><?php _e('Travel Agent Signup','arez'); ?></h3>
			</div>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			
			<div class="content">
				<p><?php _e('Welcome to the travel agent signup page.','arez'); ?></p>
				<form class="form-vertical" data-bind="with: WebBooker.Agent">
					<div class="inputMarg pull-left">
						<label><?php _e('First Name','arez'); ?></label>
						<input type="text" data-bind="value: signup_fields.first_name" placeholder="<?php _e('Ex. &quot;John&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.first_name()}"></div>
					</div>
					<div class="inputMarg pull-left">
						<label><?php _e('Last Name','arez'); ?></label>
						<input type="text" data-bind="value: signup_fields.last_name" placeholder="<?php _e('Ex. &quot;Doe&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.last_name()}"></div>
					</div>
					<div class="inputMarg pull-left">
						<label><?php _e('E-mail Address','arez'); ?></label>
						<input type="text" data-bind="value: signup_fields.email" placeholder="<?php _e('Ex. &quot;jdoe@gmail.com&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.email()}"></div>
					</div>
					<div class="inputMarg pull-left">
						<label><?php _e('ARC Number','arez'); ?></label>
						<input type="text" data-bind="value: signup_fields.arc" placeholder="<?php _e('Ex. &quot;12345678&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.arc()}"></div>
					</div>
					<div class="inputMarg pull-left">
						<label><?php _e('Username (no spaces or special characters)','arez'); ?></label>
						<input type="text" data-bind="value: signup_fields.user_name" placeholder="<?php _e('Ex. &quot;jdoe&quot;','arez'); ?>" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.user_name()}"></div>
					</div>
					<div class="cb"></div>
					<div class="inputMarg pull-left">
						<label><?php _e('Password','arez'); ?></label>
						<input type="password" data-bind="value: signup_fields.password" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.password()}"></div>
					</div>
					<div class="inputMarg pull-left">
						<label><?php _e('Verify Password','arez'); ?></label>
						<input type="password" data-bind="value: signup_fields.verify_password" />
						<div class="reqSideGreen" data-bind="css: {reqSideRed: !signup_fields.verify_password()}"></div>
					</div>
					<div class="cb"></div>
					<!-- ko if: signup_error -->
					<div class="alert alert-error" data-bind="text: signup_error"></div>
					<br>
					<!-- /ko -->
					
					<button class="buttonBlue buttonBig" type="submit" data-bind="click: doSignup, scrollTopOnClick: true"><i class="icon-ok icon-white"></i> <?php _e('Submit','arez'); ?></button>
					<button class="buttonGray buttonBig" type="reset" data-bind="click: resetSignupFields, scrollTopOnClick: true"><i class="icon-refresh icon-white"></i> <?php _e('Reset','arez'); ?></button>
				</form>
			</div><!-- /content -->
		</div><!-- /dash-signup -->
		
		<div id="dash-signup-confirm" class="dash-forms" data-bind="visible: signupSuccessMsg">
			<div class="header"><h3><?php _e('Sign-up Successful','arez'); ?></h3></div>
			<div class="cb"></div>
			<div class="ribbonFold"></div>
			<br><br>
			<div class="alert alert-success"><strong><?php _e('Congratulations!','arez');?></strong> <?php _e('Your travel agent sign up is complete. Log in to view and earn commissions.', 'arez'); ?></div>
			<br><br>
		</div>
	</div>
</div><!-- /webbooker-dashboard -->