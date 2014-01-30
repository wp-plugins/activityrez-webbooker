<?php
/**
 * ActivityRezAPI - Version 1
 * A PHP-based ActivityRez client library
 * 
 * @package ActivityRezAPI-PHP 
 * @author Rob Bertholf <rob@bertholf.com>, @rob
 * @version 0.1
 */

// Define
DEFINE("HTTP_GET","GET");
DEFINE("HTTP_POST","POST");

// Get Started
class ActivityRezAPI {
	
	/** @var String $BaseUrl The base url for the ActivityRez API */
	private $BaseUrl = "/wp-content/plugins/flash-api/wsrv.php";
	
	/** @var String $Version YYYYMMDD */
	private $Version = '201201018'; 
        
	/** @var String $ActivityRezKey */
	private $ActivityRezKey;
	
	/**
	 * Constructor for the API
	 * Prepares the request URL and client api params
	 * @param string $client_id
	 * @param string $client_secret
	 * @param string $version Defaults to v2, appends into the API url
	 */
	public function  __construct($nonce_key = false, $subdomain = false, $version="v1"){
		$this->BaseUrl = "https://{$subdomain}.{$this->BaseUrl}";
		$this->ActivityRezKey = $nonce_key;
	}

	
/******************************************************/
//  Generic Handler
/******************************************************/
	
	/** 
	 * GetData
	 * 
	 * Generic handler can be easily configured to return any service/action.
	 *
	 * @param string $service The service to envoke
	 * @param string $action The action to envoke
	 * @param string $data Request specific arguments to filter
	 *
	 * @return array Data object is returned.
	 */
	public function GetData($service, $action, $args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = $service;
		$params['action'] = $action;
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
		$ResultString = json_decode($CurlResult);

		return $ResultString; 
	}


	
/******************************************************/
//  Get Objects
/******************************************************/

	/**
	 * BootStrap WebBooker
	 * 
	 * This is the inital call to bootstrap your webbooker. It gets all the inital details of your webboker
	 */
	public function bootStrap($args=array()){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "webBooker";
		$params['action'] = "bootStrap";
		$params['data'] = $args;
		// Return the result;
		$CurlResult = $this->GET($url,$params);
		$ResultString = json_decode($CurlResult, 1);

		// Assume it only returns "terms" string if successful
		if ($ResultString->status == 1) {
			return $ResultString->terms;
		} else {
			return $ResultString->msg;
		}		
	}
	 
	/** 
	 * GetTerms
	 *
	 * The lookup service can be used to fetch the agencies specified terms of use. 
	 *
	 * Example: 
	 *   $result = $actrez->GetTerms();
	 *
	 * @return string If successful returns terms of service string otherwise error message.
	 */
	public function GetTerms(){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "terms";
		// Return the result;
		$CurlResult = $this->GET($url,$params);
		$ResultString = json_decode($CurlResult, 1);

		// Assume it only returns "terms" string if successful
		if ($ResultString->status == 1) {
			return $ResultString->terms;
		} else {
			return $ResultString->msg;
		}
	}


	/** 
	 * GetPrivacyPolicy
	 *
	 * The lookup service can be used to fetch the agencies specified terms of use. 
	 *
	 * Example: 
	 *   $result = $actrez->GetPrivacyPolicy();
	 *
	 * @return string If successful returns privacy policy string otherwise error message.
	 */
	public function GetPrivacyPolicy(){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "privacyPolicy";
		// Return the result;
		$CurlResult = $this->GET($url,$params);
		$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}


	/** 
	 * GetPOSLocations
	 *
	 * Use the lookup service to fetch available POS Locations.
	 *
	 * Some things of interest here are the ID, currency and Tax. 
	 * These are used then booking a Sale to know which locationID 
	 * to assign to the sale, what the tax rate will be that will 
	 * be calculated by the backend and the currency this POS works in.
	 *
	 * Example: 
	 *   $result = $actrez->GetPOSLocations();
	 *
	 * @return array Location object is returned.
	 */
	public function GetPOSLocations(){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "posLocations";
		// Return the result;
		$CurlResult = $this->GET($url,$params);
		$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}
	

	/** 
	 * GetDestinations
	 *
	 * Lookup locations/destinations assigned. 
	 *
	 * Example: 
	 *   $args = array(
	 *    'data[showInWB]' => 0000, // (int) Required, when making a call to this argument you must specify the WebBooker ID you want the catalog of.
	 *   );
	 *   $result = $actrez->GetDestinations($args);
	 *
	 * @param array $args Array of arguments to be passed
	 * @return array Inventory object is returned.
	 */
	public function GetDestinations($args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "destinations";
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
 			$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}


	/** 
	 * GetDailyView
	 *
	 * Used by the pos to render the 5 day calendar view it calls this one day at a 
	 * time and gets all the activities for that day, orders them from morning till night. 
	 * Accepts filters such as min/max price, search string, destination filter, vendor filter 
	 *
	 * NOTE: This function does not do pagination. Use filters to avoid a large data return.	
	 *
	 * Example: 
	 *   $args = array(
	 *    'data[showInPOS]' => 12411, // (int) Required, when making a call to this argument you must specify the POS ID you want the catalog of.
	 *    'data[showInWB]' => 1512, // (int) Required, when making a call to this argument you must specify the WebBooker ID you want the catalog of.
	 *    'data[s]' => "", // (string) Optional, If you want to do a keyword search you can use this argument to pass a keyword or phrase to filter against.
	 *    'data[date]' => "2013-12-31", //  (date) Required, The date you want to get the list of activities for.  This is the whole purpose for using the daily view action.
	 *    'data[des]' => "", // (string) | (int) Optional, Either the destination ID or the name of the destination you want to filter activities for.
	 *    'data[onlyFrom]' => 0, // (int) Optional, This is a quick way to do a vendor filter. This way you can see all the activities from a specific vendor.
	 *    'data[minPrice]' => 0, // (float), Optional, If you are looking to filter activities by price, you can use this argument to specify the minimum price of an activity. Defaults to '0′
	 *    'data[maxPrice]' => 9999999 // (float), Optional, If you are looking to filter activities by price, you can use this argument to specify the maximum defaults to '999999′
	 *   );
	 *   $result = $actrez->GetDailyView($args);
	 *
	 * @param array $args Array of arguments to be passed
	 * @return array Catalog object is returned.
	 */
	public function GetDailyView($args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "dailyView";
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
 			$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}
	

	/** 
	 * GetInventory
	 *
	 * Lookup availability of an activity and pricing currently assigned. 
	 *
	 * Example: 
	 *   $args = array(
	 *    'activityID' => 12411, // (int) Required, The activityID you want to check inventory for.
	 *    'timestamp' => "YYYY-MM-DD HH:MM:SS" // (int) | (string) This must be a valid time format, either epoch, or 'YYYY-MM-DD HH:MM:SS' OR 'YYYY/MM/DD HH:MM:SS'
	 *   );
	 *   $result = $actrez->GetInventory($args);
	 *
	 * @param array $args Array of arguments to be passed
	 * @return array Inventory object is returned.
	 */
	public function GetInventory($args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "inventory";
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
 			$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}
	

	/** 
	 * GetActivities
	 * Returns a series of activities based on Activity ID and WebBooker ID
	 *
	 * Example: 
	 *   $args = array(
	 *    'data[des]' => "", // (int) or (string) optional, If an integer is passed it will use that as the location ID, if a string is passed it assumes that is the destination. When using destination searching it will also return all child destinations.
	 *    'data[s]' => "", // (string) Optional, keyword search string, used to filter activites that contain this exact string.
	 *    'data[tag]' => "", // (string) Optional, Default: none, a specific tag to look for that is stored on activities.
	 *    'data[moods]' => "", // (string) Optional, Default: none, a specific mood to filter for.
	 *    'data[catgeory]' => "", // (string) Optional, Default: none, a specific category to filter for.
	 *    'data[count]' => 20, // (int) optional, Default 20: This is used to control pagination features, it tells the bakend how many results at a time to return. 0 to return all results
	 *    'data[minPrice]' => 0, // (float) optional, Default: 0, Minimum price of an activity to filter activites by.
	 *    'data[maxPrice]' => 9999999, // (float) optional, Default: 9999999, Maximum price of an activity to filter activites by.
	 *    'data[page]' => 1, // (int) optional, Default:1 Which page of the pagination to return
	 *    'data[i18n]' => "", // (string) optional, defaults to 'en', This used to specify which language you want activities back in.
	 *    'data[moods]' => "", // Default: none, a specific mood to filter for.
	 *    'data[sort]' => "title", // (string) optional, Default: title, This is the field to sort results by, curently suports title, price
	 *    'data[sortDir]' => "asc", // (string) optional, Default: asc, This is the direction to sort the results by, it can be either asc or desc
	 *    'data[showInWB]' => 200019, // (int) required (if coming from a web booker), The id number of the web booker you configured the activities to appear in. This is how activityrez supports it's agents having multiple POS or webbooker systems
	 *    'data[reseller2ID]' => 0 // (int) optional, The sub reseller you want to have rates returned for when making this search query. This doesn't affect which activities are returned, it says to show what the commission rates are for the specified agency.
	 *   );
	 *   $result = $actrez->GetActivities($args);
	 *
	 * @param array $args Array of arguments to be passed
	 * @return array Activity list object is returned.
	 */
	public function GetActivities($args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "activities";
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
		$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}

	/** 
	 * GetActivity
	 * Looks up a single activity based on the Activity ID and WebBooker ID
	 *
	 * Example: 
	 *   $args = array(
	 *    'data[ID]' => 71826, // (int) Activity ID
	 *    'data[reseller2ID]' => 0, // (int) optional, The sub reseller you want to have rates returned for when making this search query. This doesn't affect which activities are returned, it says to show what the commission rates are for the specified agency.
	 *    'data[reseller2_userID]' => 0, // (int)
	 *    'data[showInWB]' => 58353 // (int) required (if coming from a web booker), The id number of the web booker you configured the activities to appear in. This is how activityrez supports it's agents having multiple POS or webbooker systems
	 *   );
	 *   $result = $actrez->GetActivity($args);
	 *
	 * @param Array $args Array of arguments to be passed
	 * @return array Activity detail object is returned.
	 */
	public function GetActivity($args = NULL){
		// Build the URL
		$url = $this->BaseUrl;
		// Append the lookup details
		$params['nonce'] = $this->ActivityRezKey;
		$params['service'] = "lookup";
		$params['action'] = "getActivity";
		// Return the result;
		$CurlResult = $this->GET($url,array_merge($args, $params));
		$ResultString = json_decode($CurlResult, 1);

		return $ResultString; 
	}


/******************************************************/
//       Utility
/******************************************************/

	/**
	 * Merge user defined arguments into defaults array.
	 *
	 * This function is used to allow for both string or array to be merged into another array.
	 *
	 * @param string|array $args Value to merge with $defaults
	 * @param array $defaults Array that serves as the defaults.
	 * @return array Merged user defined values with defaults.
	 */
	 private function ParseArgs( $args, $defaults = '' ){
		if ( is_object( $args ) )
				$r = get_object_vars( $args );
		elseif ( is_array( $args ) )
				$r =& $args;
		else
				parse_str( $args, $r );

		if ( is_array( $defaults ) )
				return array_merge( $defaults, $r );
		return $r;
	}

	/**
	 * Request
	 * Performs a cUrl request with a url generated by MakeUrl. 
	 * @param String $url The base url to query
	 * @param Array $params The parameters to pass to the request
	 */
	private function Request($url,$params=false,$type=HTTP_GET){
		
		// Populate data for the GET request
		if($type == HTTP_GET) $url = $this->MakeUrl($url,$params);

		// Mad love to Andy Langton: http://andylangton.co.uk/
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		if ( isset($_SERVER['HTTP_USER_AGENT']) ) {
			curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] );
		}else {
			// Handle the useragent like we are Google Chrome
			curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.');
		}
		curl_setopt($ch , CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		// Populate the data for POST
		if($type == HTTP_POST){
			curl_setopt($ch, CURLOPT_POST, 1); 
			if($params) curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		}

		$result=curl_exec($ch);
		$info=curl_getinfo($ch);
		curl_close($ch);
		
		return $result;
	}

	/**
	 * GET
	 * Abstraction of the GET request
	 */
	private function GET($url,$params=false){
		return $this->Request($url,$params,HTTP_GET);
	}

	/**
	 * POST
	 * Abstraction of a POST request
	 */
	private function POST($url,$params=false){
		return $this->Request($url,$params,HTTP_POST);
	}

	/**
	 * MakeUrl
	 * Takes a base url and an array of parameters and sanitizes the data, then creates a complete
	 * url with each parameter as a GET parameter in the URL
	 * @param String $url The base URL to append the query string to (without any query data)
	 * @param Array $params The parameters to pass to the URL
	 */	
	private function MakeUrl($url,$params){
		// Love to  Stephen Young
		if(!empty($params) && $params){
			foreach($params as $k=>$v) $kv[] = "$k=$v";
			$url_params = str_replace(" ","+",implode('&',$kv));
			$url = trim($url) . '?' . $url_params;
		}
		return $url;
	}

}
?>