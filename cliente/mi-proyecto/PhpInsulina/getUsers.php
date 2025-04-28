<?php
require_once 'conexion.php'; // Ajusta la ruta si está en otra carpeta

// Cabeceras CORS (solo si React está en otro puerto, p.e. 3000)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Consulta para obtener todos los usuarios
$sql = "SELECT username, nombre, apellidos, fechaNacimiento FROM usuario";
$result = $conn->query($sql);

$usuarios = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

// Devolver en formato JSON
header('Content-Type: application/json');
echo json_encode($usuarios);
?>
