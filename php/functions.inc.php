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

function autorizeToken($db) {
}

function areHexTokens($selector, $token) {
    $isHexSelector = ctype_xdigit($selector);
    $isHexToken = ctype_xdigit($token);
    return ($isHexSelector && $isHexToken);
}

function getToken($db, $selector) {
    $sql = "SELECT token FROM tokens
            WHERE selector = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$selector]);
    $token = $stmt->fetch();
    if (!$token) return 'no-token-found';
    return $token[0];
}

function checkToken($token, $hashedToken) {
    $tokenBin = hex2bin($token);
    return password_verify($tokenBin, $hashedToken);
}

function getTokenID($db, $selector) {
    $sql = "SELECT tokenID from tokens WHERE selector = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$selector]);
    $token = $stmt->fetch();
    return $token[0];
}

function getUserOfToken($db, $selector) {
    $sql = "SELECT * FROM users WHERE tokenID = ?";
    $stmt = $db->prepare($sql);
    $tokenID = getTokenID($db, $selector);
    $stmt->execute([$tokenID]);
    $user = $stmt->fetch();
    return $user;
}

function updatePwd($db, $pwd, $userID) {
    $sql = "UPDATE users SET password = ? WHERE userID = ?";
    $stmt = $db->prepare($sql);
    $pwdHashed = password_hash($pwd, PASSWORD_DEFAULT);
    $result = $stmt->execute([$pwdHashed, $userID]);
    return $result;
}

function sendPasswordReset($privateInfo, $url, $email, $sendEmail) {
    $subject = "Reset your password for Underfight";
    $body = <<<MESSAGE
    <p>We recieved a password request. The link to reset your password is below. If you did not make this request, you can ignore this email</p>
    <p>Here is your password reset link: <br>
    <a href="{$url}">{$url}</a></p> 
    MESSAGE;
    return $sendEmail($privateInfo, '', $email, $subject, $body) === true;
}
