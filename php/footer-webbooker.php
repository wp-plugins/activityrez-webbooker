<div id="webbooker-modals">
	<div id="imageModal" class="modal hide fade modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="activityImageModalLabel" aria-hidden="true" data-bind="if: ActivityView.fullScreenShow() == true, visible: ActivityView.fullScreenShow() == true">
		<div class="modal-header">
			<button type="button" class="btn btn-danger" data-dismiss="modal" aria-hidden="true">
				<i class="icon-remove icon-white"></i>
				<span>Close</span>
			</button>
		</div>
		<div class="modal-body">
			<div id="activityCarouselFullScreen" class="carousel slide carousel-fit carousel-caption-active" data-bind="visible: ActivityView.slideshow().length">
				<ol class="carousel-indicators" data-bind="foreach: ActivityView.slideshow">
					<!-- ko if: $index() == 0 -->
					<li data-target="#activityCarousel" class="active" data-bind="attr: {'data-slide-to': $index}"></li>
					<!-- /ko -->
				
					<!-- ko ifnot: $index() == 0 -->
					<li data-target="#activityCarousel" data-bind="attr: {'data-slide-to': $index}"></li>
					<!-- /ko -->
				</ol>
				<!-- Carousel items -->
				<div class="carousel-inner"  data-bind="foreach: ActivityView.slideshow">
					<!-- ko if: $index() == 0 -->
					<div class="item active"><img data-bind="attr: { src: full }" alt="Slideshow Image" /></div>
					<!-- /ko -->
				
					<!-- ko ifnot: $index() == 0 -->
					<div class="item"><img data-bind="attr: { src: full }" alt="Slideshow Image" /></div>
					<!-- /ko -->
				</div>
				<!-- Carousel nav -->
				<a class="carousel-control left" href="#imageModal" data-slide="prev">&lsaquo;</a>
				<a class="carousel-control right" href="#imageModal" data-slide="next">&rsaquo;</a>
			</div><!-- /webbooker-activity-slideshow -->
		</div>
	</div>

	<div id="reseller-privacy-policy" class="modal hide">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">x</button>
			<h3><?php _e('Privacy Policy','arez'); ?></h3>
		</div>
		<div class="modal-body"><?php echo $wb['privacy']; ?></div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal"><?php _e('Close','arez'); ?></a>
		</div>
	</div>

	<div id="reseller-agreement" class="modal hide">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">x</button>
			<h3><?php _e('Terms and Conditions','arez'); ?></h3>
		</div>
		<div class="modal-body">
			<?php echo $wb['terms']; ?>
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-bind="click: WebBooker.Checkout.unsetAgreement"><?php _e('Cancel','arez'); ?></a>
			<a href="#" class="btn btn-success-primary" data-bind="click: WebBooker.Checkout.setAgreement"><?php _e('I Accept','arez'); ?></a>
		</div>
	</div>

	<div id="checkout-processing" class="modal hide">
		<div class="modal-header">
			<h3><?php _e('Processing Payment','arez'); ?></h3>
		</div>
		<div class="modal-body">
			<p><?php _e('We are processing your payment information. Please wait a minute.', 'arez'); ?></p>
			<p><?php _e('You might be redirected to a different website to finish your payment.', 'arez'); ?></p>
			<div class="progress progress-striped active">
				<div class="bar" style="width: 55%"></div>
			</div>
		</div>
	</div>
</div>

<?php 

global $wb;
if(isset($wb['footer'])) echo $wb['footer'];

?>

	<!--<script type="text/javascript">
	var $buoop = {}
	$buoop.ol = window.onload;
	window.onload=function(){
	 try {if ($buoop.ol) $buoop.ol();}catch (e) {}
	 var e = document.createElement("script");
	 e.setAttribute("type", "text/javascript");
	 e.setAttribute("src", "<?php bloginfo('template_directory'); ?>/js/update.js");
	 document.body.appendChild(e);
	}
	</script>-->
<?php
wp_footer();
do_action('webbooker_footer_event', $wb);
?>
</body>
</html>