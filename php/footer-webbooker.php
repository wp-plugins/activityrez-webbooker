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
do_action('webbooker_footer_event', $wb);
echo "<!-- include site wide footer -->";
wp_footer();
?>
</body>
</html>