<?php

require_once 'dbh.inc.php';
require_once 'functions.inc.php';

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);

$username = $data->username;
$email = $data->email;
$pwd = $data->pwd;
$pwdRepeat = $data->pwdRepeat;

function exitWithError($error) {
    echo json_encode($error);
    exit;
}


if (emptyInput($username, $email, $pwd, $pwdRepeat)) exitWithError('empty-input');
if (!passwordMatch($pwd, $pwdRepeat)) exitWithError('pwd-not-match');
if (userExists($db, $username, $email)) exitWithError('name-or-email-exists');
if (!createUser($db, $username, $email, $pwd)) exitWithError('stmt-error');


echo json_encode("create-success");
exit;
