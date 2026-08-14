<?php

$DEBUG = false;
$ROOMID_LENGTH = 8;
$ROOMID_LETTERS = "123456789ABCDEFGHIJKLMNOPQRSTUVXYZW";
$ROOMS_DIRECTORY = "rooms";
$DATA_MAXSIZE = 2000;
$DATA_MAXAGE = 120;
$WAIT_LIMIT = 10;
$WAIT_STEP = 2;
$REFERER = false; // Set to force a Referer prefix check.

if ($REFERER && (!isset($_SERVER["HTTP_REFERER"]) || (substr($_SERVER["HTTP_REFERER"], 0, strlen($REFERER)) != $REFERER))) {
	error("Bad referer (".$_SERVER["HTTP_REFERER"].")");
}

function clean() {
	global
		$ROOMS_DIRECTORY,
		$DATA_MAXAGE;

	$files = glob($ROOMS_DIRECTORY . DIRECTORY_SEPARATOR . "*");
	$time = time();
  
	foreach ($files as $file) {
	    if (is_file($file) && (substr($file, -5) == ".room")) {
	    	if (filemtime($file) + $DATA_MAXAGE < $time) {
	            unlink($file);
	        }
	    }
	}
}

function getRoomFile($room) {
	global
		$ROOMS_DIRECTORY,
		$ROOMID_LENGTH,
		$ROOMID_LETTERS;

	if (!$room)
		return false;

	if (strlen($room) != $ROOMID_LENGTH)
		return false;

	for ($i=0; $i<strlen($room); $i++)
		if (strpos($ROOMID_LETTERS, $room[$i]) === false)
			return false;

	$file = $ROOMS_DIRECTORY . DIRECTORY_SEPARATOR . $room . ".room";

	return $file;
}

function respond($text) {
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	echo $text;
	die();
}

function save($id) {
	global $DATA_MAXSIZE;

	if (isset($_POST["r"]) && isset($_POST["d"])) {
		$data = $_POST["d"];
		$roomFile = getRoomFile($_POST["r"]);
		if ($roomFile && (strlen($data) < $DATA_MAXSIZE)) {
			file_put_contents($roomFile, $id . $data . "*");
			echo "Saved ".$roomFile;
		} else {
			error("Invalid room file or data");
		}
	} else {
		error("Missing POST r, d");
	}
}

function waitFor($id) {
	global
		$WAIT_LIMIT,
		$WAIT_STEP;

	if (isset($_POST["r"])) {
		$roomFile = getRoomFile($_POST["r"]);
		if ($roomFile) {
			session_write_close(); 
			set_time_limit(120);
			for ($i = 0; $i < $WAIT_LIMIT; $i++) {
				if (is_file($roomFile)) {
					$content = file_get_contents($roomFile);
					if (($content[0] == $id) && (substr($content,-1) == "*")) {
						unlink($roomFile);
						respond(substr($content, 1, -1));
						break;
					}
				}
				sleep($WAIT_STEP);
			}
		} else {
			error("Invalid room file");
		}
	} else {
		error("Missing POST r");
	}
}

function error($v) {
	global
		$DEBUG;

	if ($DEBUG) {
		echo $v;
	}
	http_response_code(404);
	die();
}

if (isset($_POST["s"])) {
	switch ($_POST["s"]) {
		case "r":{
			// --- Reserve room
			$attempts = 1000;
			do {
				$roomId = "";
				for ($i=0; $i<$ROOMID_LENGTH; $i++)
					$roomId .= $ROOMID_LETTERS[mt_rand(0, strlen($ROOMID_LETTERS)-1)];
				$roomFile = getRoomFile($roomId);
				$attempts--;
			} while ($attempts && $roomFile && is_file($roomFile));
			if ($roomFile) {
				respond($roomId);
				return true;
			} else {
				error("Can't generate Room ID");
			}
			break;
		}
		case "h1":{
			clean();
			save("1");
			break;
		}
		case "g1":{
			waitFor("1");
			break;
		}
		case "g2":{
			save("2");
			break;
		}
		case "h2":{
			waitFor("2");
			break;
		}
	}
} else {
	error("Invalid s");
}