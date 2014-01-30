<?php

/**
 *	ActivityRez Web Booking Engine
 *	Utility Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

/**
 *	Abbreviate and sort days from array. Returns an array.
function abbrDays($days) {
	$days_abbr = array();
        					
    foreach($days as $day) {
    	$day = substr($day, 0, 3);
    	if(!in_array($day, $days_abbr)) {
     		array_push($days_abbr, __($day,'arez'));
     	}
	}
	
	return $days_abbr;
}
 */

/**
 *	Parse the data object of activity times and extract the days for inclusion in the page.
function getDaysForActivity($times) {
	$days = array();
        					
 	foreach($times as $time) {
		if(!in_array($time['start']['day'], $days)) {
			array_push($days, $time['start']['day']);
		}
  	}
  		
    $days = abbrDays($days);
    $days = array_sort_by_day($days);
    
    if(count($days) == 7) {
    	return __('Everyday','arez');
    }
    
    $days = implode(', ', $days);
   	
   	return $days;
}
 */

/**
 *	A comparison function that sorts timestamps in ascending order.
 */
function dateSortAsc($date1, $date2) {
  if ($date1 > $date2) return 1;
  if ($date1 < $date2) return -1;
  return 0;
}


/**
 *	Function written by Marcus L. Griswold (vujsa)
 *	Can be found at http://www.handyphp.com
function array_sort_by_day($values) {
    $search_strings = array("Sunday","Sun","Su","Monday","Mon","Mo","Tuesday","Tues","Tue","Tu","Wednesday","Wed","We","Thursday","Thurs","Thur","Thu","Th","Friday","Fri","Fr","Saturday","Sat","Sa");
    $replace_string = array('0','0','0','1','1','1','2','2','2','2','3','3','3','4','4','4','4','4','5','5','5','6','6','6');
    $sort_key = array_map('ucfirst', $values);
    $sort_key = str_replace($search_strings, $replace_string, $sort_key);
    array_multisort($sort_key, SORT_ASC, SORT_STRING, $values);
    return $values;
}
 */
