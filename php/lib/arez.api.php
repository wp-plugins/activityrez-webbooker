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
	//singleton stuff
	protected static $instance = null;
	protected function __construct(){}
	protected function __clone(){}

	public static function instance(){
		if(!isset(self::$instance)){
			$inst = new self;

			$inst->init();

			self::$instance = $inst;
		}
		return self::$instance;
	}

	private $base_url = "/wp-content/plugins/flash-api/wsrv.php";
	private $server;
	private $nonce;
	private $api_key;

	// sets up some stuff since we dont have a constructor
	public function init(){
		$options = get_option('arez_plugin');
		if( !isset($options['server']) ){
			$options['server'] = 'secure';
			if(function_exists('update_options')) update_options($options);
		}
		
		if( 'secure' == $options['server']){
			$this->server = AREZ_SERVER;
			$this->base_url = AREZ_SERVER.$this->base_url;	
		}else{
			$this->server = AREZ_SERVER_TRAINING;
			$this->base_url = AREZ_SERVER_TRAINING.$this->base_url;
		}
	}
	public function init_view(){
		$options = get_option('arez_plugin');
		if(WB_REMOTE && !isset( $options['api_key'] ) ){
			die("Missing API Key, Please Contact Support");
		}
		$this->api_key = $options['api_key'];
	}

	//the next three functions are for data transport
	public function fetch_file($url) {
		$c = curl_init();
		curl_setopt($c, CURLOPT_URL, $url);
		curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($c, CURLOPT_TIMEOUT, 20);

		if ($cookiejar != '')  {
			curl_setopt($c, CURLOPT_COOKIEJAR, $cookiejar);
			curl_setopt($c, CURLOPT_COOKIEFILE, $cookiejar);
		}

		curl_setopt($c, CURLOPT_HEADER , false);
		curl_setopt($c, CURLOPT_SSL_VERIFYHOST , false);
		curl_setopt($c, CURLOPT_SSL_VERIFYPEER , false);
		curl_setopt($c, CURLOPT_FOLLOWLOCATION , true);
		curl_setopt($c, CURLOPT_AUTOREFERER , true);
		curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12');
		$con = curl_exec($c);
		curl_close($c);
		return $con;
	}
	
	public function raw($url,$params,$type=HTTP_POST){
		try{
			$ch = curl_init();
			if($type == HTTP_GET){
				if(!empty($params) && $params){
					$url = trim($url) . '?' . http_build_query($params);
				}
				curl_setopt($ch, CURLOPT_HTTPGET, 1);
			}
			// Populate the data for POST
			if($type == HTTP_POST){
				curl_setopt($ch, CURLOPT_POST, 1);
				if($params) curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
			}
	
			curl_setopt($ch, CURLOPT_URL,$url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch, CURLOPT_FORBID_REUSE, false);
			curl_setopt($ch, CURLOPT_NETRC, false);
			curl_setopt($ch, CURLOPT_FRESH_CONNECT, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST , false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER , false);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION , true);
			curl_setopt($ch, CURLOPT_AUTOREFERER , true);
			curl_setopt($ch, CURLOPT_TIMEOUT, 30);
			curl_setopt($ch, CURLOPT_HEADER , true);
			curl_setopt($ch, CURLOPT_VERBOSE, false);
			curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false);
			if(isset($_SERVER['HTTP_USER_AGENT'])){
				curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] );
			} else {
				// Handle the useragent like we are Google Chrome
				curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.');
			}
	
			$result=curl_exec($ch);
	
			$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
			$header = substr($result, 0, $header_size);
			$body = substr($result, $header_size);

			curl_close($ch);
			return $body;
		}catch (Exception $e) {
			error_log($e->getMessage(),1);
		    die('Caught exception: '.print_r($e->getMessage(),1) );
		}

	}
	
	public function request($service,$action,$params = null){
		$params = array('data'=>$params);
		$nonce = $this->nonce;

		if(!$nonce){
			if( isset($_COOKIE['ACTIVITYREZ']) && !empty($_COOKIE['ACTIVITYREZ']) ){
				$nonce = $_COOKIE['ACTIVITYREZ'];
			}else{
				$nonce = 'NEW';				
			}
			$params['api_key'] = $this->api_key;
		}

		$params['service'] = $service;
		$params['action'] = $action;
		$params['nonce'] = $nonce;
		return json_decode($this->raw($this->base_url,$params),1);
	}

	//actual api wrappers follow
	public function bootstrap($args){
	 	if(is_null($args['webBookerID'])) return false;

	 	$args['remote'] = 'true';
		$result = $this->request('webBooker','bootStrap',$args);
		$result['data']['langPath'] = WP_CONTENT_DIR.'/client-content/'.$result['data']['agencyID'].'/languages/'.$result['data']['webBookerID'];
		return $result;
	}

	public function r_authArez($username,$password){
		// Build the URL
		$resp = json_decode($this->raw($this->server.'/auth/',array(
			"user"=>$username,
			"pass"=>$password
		)),1);

		if( isset($resp['nonce']) && !empty($resp['nonce'])){
			$this->nonce = $resp['nonce'];
		}
		return $resp;
	}
	
	public function fetchApiKey(){
		return $this->request('webBooker','fetchApiKey');
	}
	
	public function fetchTranslations($webbookerID){
		if(is_null($webbookerID)) return false;
		$nonce = $this->nonce;
		if(!$nonce){
			$nonce = 'NEW';
			$params['api_key'] = $this->api_key;
		}

		$params['service'] = 'webBooker';
		$params['action'] = 'getTranslationFiles';
		$params['nonce'] = $nonce;
		$params['data']['webBookerID'] = $webbookerID;

		return $this->raw($this->base_url,$params,HTTP_GET);
	}
	
	public function importWebbookers(){
		return $this->request('webBooker','getWebBookers');
	}
	
	public function getWebBooker($webbookerID=null){
	 	if(is_null($webbookerID)) return false;

		return $this->request('webBooker','bootStrap',array('webBookerID'=>$webbookerID));
	}
	
	public function searchCatalog($params) {
		if(!isset($params['webBookerID'])) return false;
		$params['showInWB'] = $params['webBookerID'];
		return $this->request('lookup', 'activities', $params);
	}
	
}
