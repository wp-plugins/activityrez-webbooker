<div id="booking-reservations" class="booking-right">
<div class="pay-info-header">
	<h1><span class="small-caps"><?php _e('View Excursion Reservations','arez'); ?></span></h1>
</div><br>

<div id="retrieve-res" class="clearfix">
	<p><?php _e('Please enter the following information to view your excursion reservation for your Aulani vacation.','arez'); ?></p>
	<div class="guest-info-last-name">
  	<label><strong><?php _e('Last Name','arez'); ?></strong></label><br>
    <input class="input payname" type="text" name="payname">
  </div>
  
  <br class="cb" /><br />
  <div class="guest-info-last-name">
   	<label><strong><?php _e('Excursion Order Number','arez'); ?></strong></label><br>
    <input class="input saleid" type="text" name="saleid">
  </div>
  <br class="cb"/>
  
  <div class="search">
		<a href="#search" class="sprite reservations" title="<?php _e("Find Reservation",'arez');?>"><?php _e('Find Reservation','arez'); ?></a>
	</div>
	
	<p style="clear:both;"><?php _e('For questions or to modify or update your Disney Aulani Vacation, contact us, or call','arez'); ?> + 1 714-520-7001.</p>
</div>
<br class="cb" />
<div id="booking-info-print" class="hide-me"><p><strong><a href="#" title="<?php _e('Print Page','arez'); ?>" class="print-this"><span class="sprite"><?php _e('Print Icon','arez'); ?></span> <?php _e('Print','arez'); ?></a></strong></p></div>
<div id="reservation-display" class="hide-me">

</div>
<div class="srch-loading" style="display:none;"><span><?php echo __('Searching for your reservation','arez') . '...'; ?></span></div>
<div id="retrieve-res-error" class="hide-me">
	<!-- Hide this paragraph only if meessage doesn't need to be seen, not the div -->
  <p><?php _e('There are no reservations that match your search. Please call','arez'); ?> 1 (888) 432-1234.</p>
</div>
</div><!-- #booking-reservations -->