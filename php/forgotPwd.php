<?php

header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'dbh.inc.php';
require_once 'functions.inc.php';

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);

$email = $data->email;

require_once 'accountInfos.php';
require_once 'sendEmail.php';



function exitWithError($error) {
    echo json_encode($error);
    exit;
}


if (emptyInput($email)) exitWithError('empty-input');
if (!userExists($db, $email, $email)) exitWithError('email-not-exists');
$token = loginUser($db, $email);


[$selector, $token] = explode(":", $token);
$url = "$websitePath?reset-pwd=1&selector=$selector&token=$token";

$sendEmail = function (
    $privateInfo,
    $name,
    $email,
    $subject,
    $body
) {
    sendEmail(
        $privateInfo,
        $name,
        $email,
        $subject,
        $body
    );
};

if (!sendPasswordReset($privateInfo, $url, $email, $sendEmail)) exitWithError('email-not-sent');

echo json_encode('email-sent');
exit;
