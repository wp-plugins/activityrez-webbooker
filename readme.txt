=== ActivityRez Wordpress Web Booker Plugin ===
Contributors: Analogrithems
Tags: Activity, Reservations, WebBooker
Requires at least: 3.0.1
Tested up to: 4.09
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

ActivityRez Webbooker plugin for hosting your own booking engine.


== Description ==

The ActivityRez Webbooker is created to allow ActivityRez customers host their own booking enging. The plugin uses the ArezAPI
to fetch activity information from the ActivityRez service and display it on your own site.  In order to use the ActivityRez Webbooker
plugin you are REQUIRED to run your site with SSL (See below for examples on how to force SSL).  The plugin allows complete checkout
on your own website.  Using this plugin you have more controll over the look and feel of your own website.

For more help see http://support.activityrez.com

== Installation ==

ActivityRez Webbooker is very simple to install and uses the default installation processes. After installing you need to import your
webbookers and any needed translation files.

e.g.

1. Upload `activityrez-webbooker` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Got to Settings -> ActivityRez put in your ActivityRez username and password to import your web bookers.

== Frequently Asked Questions ==

= The plugin isn't working what do I do? =

ActivityRez has amazing customer support that is available to all ActivityRez customers.  Go to https://support.activityrez.com to see the knowledge base, 
chat with live support or open a support ticket.

= Where will my webbooker show up after installing? =

Each webbooker has it's own unique web path that is prefixed by **/wb/** by default.  To see and/or set your path (Page Slug) login to
https://secure.activityrez.com/admin and select **My Web** click edit on the webbooker you are interested in and look for the '''Page Slug''' 
setting. You can also use this place to change the Page Slug or any other webbooker settings.  Please note after updating your webbooker 
settings you must reimport the web booker in your wordpress site before it takes affect.

You can also access this in your Wordpress install by going into the admin and Selecting '''ActivityRez -> Web Bookers''' on the left side 
after importing your webbookers.  When you select a web booker you will see a view link that will take you to the public facing webbooker.


= I made changes to my Web Booker and I'm not seeing them on my site, what do I do? =

While the webbooker does it's best to update in the background if this isn't happening or it's taking too long you can always go into your
Wordpress Admin and reimport the web bookers again.  This will update your local settings.

== Screenshots ==

1. ActivityRez Web Bookers in action ![](https://raw.github.com/ActivityRez/arez-web-booker/feature-wprepo/assets/screenshot-1.png)
2. Web Booker Import ![](https://raw.github.com/ActivityRez/arez-web-booker/feature-wprepo/assets/screenshot-2.png)
3. Web Booker Post Types ![](https://raw.github.com/ActivityRez/arez-web-booker/feature-wprepo/assets/screenshot-3.png)
4. Web Booker Configuration Manager on ActivityRez ![](https://raw.github.com/ActivityRez/arez-web-booker/feature-wprepo/assets/screenshot-4.png)

== Changelog ==
= 2.5.2 =
* Bumped CC expiration years to 20+ in future

= 2.5.1 =
* Bug fixes

= 2.5.0 =
* Add JCB card validation

= 2.4.9 =
* Bug fixes

= 2.4.8 =
* Bug fixes
* Changes to activity cutoff handling

= 2.4.5 =
* Bug fixes
* Resellers can now set display prices

= 2.4.0 =
* Fixed IE8 issues
* Enhancements to Travel Agent Dashboard
* Fixed transportation pickup distance estimates to be more accurate

= 2.3.9 =
* Light optimization of CSS and JS for loading times
* Fixed a bug with sprited images
* Fixed a bug with displaying transportation pickup distances

= 2.3.5 =
* Default guest "copy to all" to OFF, with admin control to set it otherwise
* Fixed confirmation email API call not firing in IE
* Add pop-up blocker warning for print tickets/itinerary
* Fix for percentages in a tax rate scenario

= 2.3.4 =
* Fixed several ui bugs
* updated the whitelabel feed channel

= 2.2.0 =
* Plugin moved to wordpress repo
* Added ability to override individual template files

== Upgrade Notice ==
Upgrades will function as normal and should only require you to use the normal Wordpress update system.
