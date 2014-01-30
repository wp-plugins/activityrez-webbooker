<?php

/**
 *	ActivityRez Web Booking Engine
 *	Activity PHP File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

$resources = array('wb_queryActivities'); 
api_include($resources);

$reseller1ID = ($_REQUEST['reseller1ID']) ? $_REQUEST['reseller1ID'] : 0;
$locName = ($_REQUEST['locName']) ? $_REQUEST['locName'] : $locName;
$limit = 12;

$activities = wb_queryActivities($reseller1ID, 1, $limit, null, null, null, null, null, $locName);
$activities = json_decode($activities, true);

?>

<!-- Start Destination Landing Page -->
<div id="booking-destination" class="booking-right">
<div class="border gray">
<div class="right-header">
	<h1><span><?php echo __('Activities in','arez').$locName; ?></span></h1>
</div>
<div class="cb"></div>
<div class="page-content">

	<p>---- <?php _e('BEGIN CONTENT THAT NEEDS TO BE DYNAMIC','arez'); ?> ----</p>
   	<img id="dest-feature" src="<?php bloginfo('template_url'); ?>/images/TEST-dest-header.jpg" alt="<?php echo __('Explore the activities ','arez').$locName.__(' has to offer.','arez'); ?>" />
  	<p class="highlight"><?php _e('Introduction text.','arez'); ?></p>
    <p>---- <?php _e('END CONTENT THAT NEEDS TO BE DYNAMIC','arez'); ?> ----</p>	
    	
 	<div id="feature-activities">
        <h3><?php echo __('Featured Activities in ','arez').$locName; ?></h3><br>
		<ul class="featured-activities clearfix">
		<?php
		
		foreach($activities as $activity) {
			//print_r($activity);
			$image = '';
			if($activity['data']['media']) {
				foreach($activity['data']['media'] as $media) {
					if($media['type'] == 'image') {
						$image = '<img src="' . $media['url'] . '" width="210" height="130" alt="' . $activity['data']['title'] . __(' Activity Thumbnail Image','arez').'" /><br>';
					}
				}
			}
			echo '<li><a href="#activity-' . $activity['ID'] . '">' . $image . $activity['data']['title'] . '</a></li>';
		}
		
		?>
	  	</ul>
	</div><!-- #feature-activities -->
</div><!-- .page-content -->
</div><!-- .border -->
</div>
<!-- End Destination Landing Page -->