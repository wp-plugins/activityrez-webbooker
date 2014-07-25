<?php global $wbSlim; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta name = "viewport" content = "width=device-width,initial-scale=1.0" >
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<?php if (is_search()) { echo '<meta name="robots" content="noindex, nofollow" />'; } ?>

    <title><?php wp_title(); ?></title>

	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico" type="image/x-icon" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<script id="wb_bootstrapper" type="text/javascript">
	var wb_global_vars = <?php echo json_encode($wbSlim);?>;
	if(typeof console == 'undefined'){
		window.console = { log: function(){} };
	}
	</script>
	<?php
		// Queue your styles.
		global $wb;
		global $wp_styles;
		wp_head();
		include_once('datepicker.php');
		global $jqueryLang;
		if(isset($jqueryLang[$wb['i18n']])){
			echo "<script type='text/javascript' src='".ACTIVITYREZWB_PLUGIN_PATH.'js/jquery-ui/jquery.ui.datepicker-'.$jqueryLang[$wb['i18n']].".js'></script>\n";
		}
?>

	<style>
		<?php
			//if(!array_key_exists($wb,'customColor'))
			//	$wb['customColor'] = '#1c9be3';
			function clamp($hex,$high = 255){
				$hex = dechex($hex>$high?$high:($hex<0?0:$hex));
				return strlen($hex)<2?strlen($hex)<1?'00':'0'.$hex:$hex;
			}
			
			function shadeColor($color, $percent) {
				$amt = round(2.55*$percent);
				$color_a = str_split(trim($color,'#'),2);
				return '#' . clamp(hexdec($color_a[0]) + $amt) . clamp(hexdec($color_a[1]) + $amt) . clamp(hexdec($color_a[2]) + $amt);
			}
			
			function fadeColor($color, $percent) {
				$amt = round(2.55*$percent);
				$highVal = 0;
				$highKey = 0;
				$color_a = str_split(trim($color,'#'),2);
				foreach($color_a as $k => $color){
					if(hexdec($color) > $highVal){
						$highVal = hexdec($color);
						$highKey = $k;
					}
				}
				return '#' . clamp(hexdec($color_a[0]) + ($highKey == 0?0:$amt),$highVal) . clamp(hexdec($color_a[1]) + ($highKey == 1?0:$amt),$highVal) . clamp(hexdec($color_a[2]) + ($highKey == 2?0:$amt),$highVal);
			}
			
			function hexToHSV($color){
				
				function RGB_TO_HSV ($R, $G, $B){
					$HSL = array();
				
					$var_R = ($R / 255);
					$var_G = ($G / 255);
					$var_B = ($B / 255);
				
					$var_Min = min($var_R, $var_G, $var_B);
					$var_Max = max($var_R, $var_G, $var_B);
					$del_Max = $var_Max - $var_Min;
				
					$V = $var_Max;
				
					if ($del_Max == 0){
						$H = 0;
						$S = 0;
					}
					else{
						$S = $del_Max / $var_Max;
				
						$del_R = ( ( ( $var_Max - $var_R ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;
						$del_G = ( ( ( $var_Max - $var_G ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;
						$del_B = ( ( ( $var_Max - $var_B ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;
				
						if      ($var_R == $var_Max) $H = $del_B - $del_G;
						else if ($var_G == $var_Max) $H = ( 1 / 3 ) + $del_R - $del_B;
						else if ($var_B == $var_Max) $H = ( 2 / 3 ) + $del_G - $del_R;
				
						if ($H<0) $H++;
						if ($H>1) $H--;
					}
				
					$HSL['H'] = $H;
					$HSL['S'] = $S;
					$HSL['V'] = $V;
				
					return $HSL;
				}
				
				$color_a = str_split(trim($color,'#'),2);
				$R = hexdec($color_a[0]);
				$B = hexdec($color_a[1]);
				$G = hexdec($color_a[2]);
				$poo = RGB_TO_HSV($R, $G, $B);
				
				//print_r(RGB_TO_HSV ($R, $G, $B));
				
				if( ( $poo['V'] > .75 && $poo['S'] < .25 ) || ( $poo['H'] < .85 && $poo['H'] > .45 && $poo['V'] > .8) ){
					return '#484848';
				}else return '#ffffff';
			}
			$lightcustomColor = fadeColor($wb['customColor'], 65);
			$darkcustomColor = shadeColor($wb['customColor'], -10);
			$textcustomColor = hexToHSV($wb['customColor']);
			if ($textcustomColor == '#484848'){
				echo '.buttonBlue .icon-white{
					      background-image: url("' . $wb['plugin_url'] . '/images/glyphicons-halflings.png");
					  }';
			}
		?>
		
		.sidebar-container .header h3,#webbooker-main .header h3,#webbooker-activity-book #activity-availability.avail strong,#webbooker-activity-book #activity-availability.avail span,.activity.box-rounded h3 a,#webbooker-search-results .activity .price .amount span, .bigPrice h2, .bigPrice p{color:<?php echo $textcustomColor;?>}a.buttonBlue,button.buttonBlue{background:<?php echo $wb['customColor'];?>;color:<?php echo $textcustomColor;?>}a.buttonBlue:hover,button.buttonBlue:hover{background:<?php echo $lightcustomColor;?>;border-color:<?php echo $wb['customColor'];?>;color:<?php echo $textcustomColor;?>}.buttonBlue[disabled]{background:<?php echo $lightcustomColor;?>}.sidebar-container .header,#webbooker-main .header, .activity.box-rounded h3,#webbooker-search-results .activity .price .amount, .bigPrice{background:<?php echo $wb['customColor'];?>;border-color:<?php echo $darkcustomColor;?>;color:<?php echo $textcustomColor;?>}.ui-state-highlight,.ui-widget-content .ui-state-highlight{color:<?php echo $textcustomColor;?>}.ui-state-active,.ui-widget-content .ui-state-active{background:<?php echo $lightcustomColor;?>!important;border-color:<?php echo $darkcustomColor;?>}.point{border-top-color:<?php echo $wb['customColor'];?>;-webkit-filter: drop-shadow(0 1px 0 <?php echo $darkcustomColor;?>);-moz-filter: drop-shadow(0 1px 0 <?php echo $darkcustomColor;?>);filter: drop-shadow(0 1px 0 <?php echo $darkcustomColor;?>);}@media all and (max-width:980px){#webbooker-search-results .activity .price .amount{background:0;color:#888;border:0}#webbooker-search-results .activity .price .amount span{color:#888}}
	</style>
	
	<style>
		<?php if(isset($wb['style'])) echo $wb['style']; ?>
	</style>
</head>

<body <?php  body_class(); ?>>
<?php if(isset($wb['header'])) echo $wb['header']; ?>
