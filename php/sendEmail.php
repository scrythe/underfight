<?php


use PHPMailer\PHPMailer\PHPMailer;

function sendEmail($privateInfo, $name, $email, $subject, $body) {
    $emailSender = $privateInfo['emailSender'];
    $nameSender = $privateInfo['name'];
    $password = $privateInfo['password'];

    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';
    require 'PHPMailer/Exception.php';

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = $emailSender;
    $mail->Password = $password;
    $mail->Port = 587;
    $mail->SMTPSecure = "tls";

    $mail->isHTML(true);
    $mail->setFrom($emailSender, $nameSender);
    $mail->addAddress($email, $name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    if ($mail->send()) {
        $result = true;
    } else {
        $result = false;
    }
    $mail->smtpClose();
    return $result;
}
