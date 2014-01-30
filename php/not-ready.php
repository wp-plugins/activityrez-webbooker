<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <title><?php wp_title(); ?></title>

	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico" type="image/x-icon" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/bootstrap.css" type="text/css" />
	<style>
		.hero-unit { margin-top: 3em; }
	</style>
</head>

<body <?php  body_class(); ?>>
	<div id="wrapper" class="container-fluid">
		<div class="row-fluid">
			<div class="span1">
				&nbsp;
			</div>
			<div class="span10 hero-unit">
				<h2><?php _e('Oh Noes!', 'arez'); ?></h2>
				<p><?php _e("It looks like you haven't set up your payment options for this web booker! You won't be able to view it until you do.",'arez'); ?></p>
			</div>
			<div class="span1">
				&nbsp;
			</div>
		</div>
	</div>
</body>
</html>