<?php

function emptyInput(...$inputList) {
    foreach ($inputList as $input) {
        if (empty($input)) return true;
    }
    return false;
}

function passwordMatch($pwd, $pwdVerify) {
    return $pwd == $pwdVerify;
}

function getUser($db, $username, $email) {
    $sql = 'SELECT * FROM user
            WHERE username = ? OR email = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute([$username, $email]);
    $user = $stmt->fetch();
    return $user;
}

function userExists($db, $username, $email) {
    $user = getUser($db, $username, $email);
    return !!$user;
}

function createUser($db, $username, $email, $pwd) {
    $sql = 'INSERT INTO user (username, email, password)
            VALUES (?, ?, ?)';
    $pwdHashed = password_hash($pwd, PASSWORD_DEFAULT);
    $stmt = $db->prepare($sql);
    $result = $stmt->execute([$username, $email, $pwdHashed]);
    return $result;
}

function passwordWrong($db, $usernameOrEmail, $pwd) {
    $user = getUser($db, $usernameOrEmail, $usernameOrEmail);
    $pwdHashed = $user['password'];
    $passwordCorrect = password_verify($pwd, $pwdHashed);
    return !$passwordCorrect;
}

function loginUser($db, $username, $email, $pwd) {
    $user = getUser($db, $username, $email);
    $pwdHashed = $user['password'];
}
