<?php

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData);

$test = $data->a;

// $ah = $_POST['a'];


echo json_encode($test);
