<?php

$theme = $_POST['theme'];
$dataJSON = $_POST['d'];
$to='olza99998@gmail.com';
$data = array_combine(array_column($_POST['d'], 'name'), array_column($_POST['d'], 'value'));


// foreach($dataJSON as $row){
//     foreach($row as $key=>$value) {
//         $data[$key] = $value;

//     }
// }


$message = '<b>Тема: </b>' . $theme . "\r\n";
$message .= '<b>Имя пользователя: </b>' . $data["Name"] . "\r\n";
$message .= '<b>E-mail пользователя: </b>' . $data["Email"] . "\r\n";
$message .= '<b>Телефон пользователя: </b>' . $data["Phone"] . "\r\n";
$message .= '<b>Instagram пользователя: </b>' . $data["instagram"] . "\r\n";


// From - указать свою почту/название сайта
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: olza99998@gmail.com' . "\r\n";
mail($to, $theme, $message, $headers);


?>