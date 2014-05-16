<?php global $wb; ?>
<div id="webbooker-home" data-bind="if: Homepage.show">
	<div data-bind="visible: Homepage.show"   style="display:none">
		<div class="heroWrap">
			<img src="<?php echo (!empty($wb['hero_url'])) ? $wb['hero_url'] : PLUGIN_DIR_URL . 'images/defaultHero.jpg'; ?>" id="home-feature" alt="featured-image" />
			<?php echo (!empty($wb['hero_heading_text'])) ? '<div class="siteTitle"><h2 class="hero-heading">' . $wb['hero_heading_text'] . '</h2></div>' : ''; ?>
		</div>
		<?php include("mini-sidebar.php"); ?>
	
		<?php echo (!empty($wb['hero_summary_text'])) ? '<div class="hero-summary">' . $wb['hero_summary_text'] . '</div>' : ''; ?>
	
		<!-- ko foreach: WebBooker.Homepage.featured_destinations -->
		<div class="featured-destination" data-bind="visible: activities().length > 0">
			<h3><a href="#" data-bind="text: __(destination)(), attr: { 'href': document.location.href.split('#')[0] + 'destination/' + destination }"></a></h3>
	
			<ul class="activities clearfix" data-bind="foreach: activities">
				<li>
					<a class="featLink" data-bind="attr: { 'href': url }">
						<div class="min-img-height">
							<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-bind="attr: { 'src': thumbnail_url }, visible: thumbnail_url" alt="<?php _e("Activity Thumbnail Image URL",'arez');?>" />
						</div>
						<div class="feat-item-desc" data-bind="html: title"></div>
					</a>
				</li>
			</ul>
	    </div><!-- /featured-destination -->
		<!-- /ko -->
	</div>
</div><!-- /webbooker-home -->
