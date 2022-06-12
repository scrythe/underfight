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
    $sql = 'SELECT * FROM users
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
    $sql = 'INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)';
    $stmt = $db->prepare($sql);
    $pwdHashed = password_hash($pwd, PASSWORD_DEFAULT);
    $result = $stmt->execute([$username, $email, $pwdHashed]);
    return $result;
}

function updateUserToken($db, $userID, $tokenID) {
    $sql = "UPDATE users SET tokenID = ? WHERE userID = ?";
    $stmt = $db->prepare($sql);
    $result = $stmt->execute([$tokenID, $userID]);
    return $result;
}

function createToken($db, $userID) {
    $selector = bin2hex(random_bytes(8));
    $token = random_bytes(32);
    $hexToken = bin2hex($token);
    $userToken = "$selector:$hexToken";

    $sql = 'INSERT INTO tokens (selector, token)
            VALUES (?, ?)';
    $stmt = $db->prepare($sql);
    $hashedToken = password_hash($token, PASSWORD_DEFAULT);
    $result = $stmt->execute([$selector, $hashedToken]);
    $tokenID = $db->lastInsertId();

    updateUserToken($db, $userID, $tokenID);
    return $userToken;
}

function passwordWrong($db, $usernameOrEmail, $pwd) {
    $user = getUser($db, $usernameOrEmail, $usernameOrEmail);
    $pwdHashed = $user['password'];
    $passwordCorrect = password_verify($pwd, $pwdHashed);
    return !$passwordCorrect;
}

function loginUser($db, $usernameOrEmail) {
    $user = getUser($db, $usernameOrEmail, $usernameOrEmail);
    $userID = $user['userID'];
    $userToken = createToken($db, $userID);
    return $userToken;
}
