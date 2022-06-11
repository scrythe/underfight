<?php

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


echo json_encode("login-success");
exit;
