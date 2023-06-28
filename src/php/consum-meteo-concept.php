<?php 
header('Content-Type: application/json; charset=utf-8');

if(!isset($_GET['location'])) {
    $location = "dijon";
} else {
    $location = $_GET['location'];
}


$data = file_get_contents('http://api.meteo-concept.com/api/location/cities?token=66c9531e068cf34224362c376d250bba937cdbd07f3a5f029a1fb44f7cd1b1b9&search='.$location);

print_r($data);