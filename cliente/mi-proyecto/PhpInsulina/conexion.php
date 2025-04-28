<?php
$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "diabetesdb";
/*
$servername = "fdb1028.awardspace.net";
$username = "4597267_diabetesdb";
$password = "4)QBCzWL5@6ms9fF";
$dbname = "4597267_diabetesdb";
$conn = new mysqli($servername, $username, $password, $dbname);
*/
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>