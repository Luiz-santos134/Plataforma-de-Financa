<?php
$host = "localhost";
$user = "root";
$password ="";
$db = "login";

$conection = new mysql($host, $user, $password, $db)

if($conection->connect_error){
    die("Erro na conexão: " . $conection->connect_error);
}
session_start();
?>