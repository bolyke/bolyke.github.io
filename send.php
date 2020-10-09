<?php

$to='olza99998@gmail.com';
$message=$_POST['message'];

$subject = $_POST['subject'];

// From - указать свою почту/название сайта
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: olza99998@gmail.com' . "\r\n" .
mail($to, $subject, $message, $headers);

?>