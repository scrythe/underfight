<?php

header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


require_once 'dbh.inc.php';
require_once 'functions.inc.php';

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);


$pwd = $data->pwd;
$pwdRepeat = $data->pwdRepeat;
$selector = $data->selector;
$token = $data->token;

function exitWithError($error) {
    echo json_encode($error);
    exit;
}


if (emptyInput($pwd, $pwdRepeat, $selector, $token)) exitWithError('empty-token');
if (!passwordMatch($pwd, $pwdRepeat)) exitWithError('pwd-not-match');
if (!areHexTokens($selector, $token)) exitWithError('not-hex-tokens');
$responseToToken = getToken($db, $selector);
if ($responseToToken == "no-token-found") exitWithError("invalid-token");
$hashedToken = $responseToToken;
if (!checkToken($token, $hashedToken)) exitWithError("invalid-token");
$user = getUserOfToken($db, $selector);
$userID = $user['userID'];
updatePwd($db, $pwd, $userID);

echo json_encode($userID);
exit;
