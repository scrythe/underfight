<?php

header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'dbh.inc.php';
require_once 'functions.inc.php';

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);

$usernameOrEmail = $data->usernameOrEmail;
$pwd = $data->pwd;

function exitWithError($error) {
    echo json_encode($error);
    exit;
}


if (emptyInput($usernameOrEmail, $pwd)) exitWithError('empty-input');
if (!userExists($db, $usernameOrEmail, $usernameOrEmail)) exitWithError('user-not-exists');
if (passwordWrong($db, $usernameOrEmail, $pwd)) exitWithError('password-wrong');
$token = loginUser($db, $usernameOrEmail);

echo json_encode($token);
exit;
