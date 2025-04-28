<?php
session_start();

// Incluir archivo de conexión
include 'conexion.php';

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$response_message = ""; // Variable para almacenar el mensaje de respuesta

// Capturar los valores del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $apellidos = htmlspecialchars(trim($_POST['apellidos'] ?? ''));
    $usuario = htmlspecialchars(trim($_POST['usuario'] ?? ''));
    $contra = trim($_POST['contra'] ?? '');
    $fecha_nacimiento = $_POST['fecha_nacimiento'] ?? null;

    // Validar que los valores no sean null
    if ($nombre && $apellidos && $usuario && $contra && $fecha_nacimiento) {

        // Verificar si el usuario ya existe
        $sql_check = "SELECT id_usu FROM USUARIO WHERE usuario = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bind_param("s", $usuario);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            $response_message = "El usuario ya está registrado. <a href='register.php'>Intenta con otro nombre de usuario</a>";
        } else {
            // Hashear la contraseña antes de guardarla
            $hashed_password = password_hash($contra, PASSWORD_DEFAULT);

            // Insertar datos en la tabla USUARIO
            $sql_insert = "INSERT INTO USUARIO (fecha_nacimiento, nombre, apellidos, usuario, contra)
                           VALUES (?, ?, ?, ?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bind_param("sssss", $fecha_nacimiento, $nombre, $apellidos, $usuario, $hashed_password);

            if ($stmt_insert->execute()) {
                $response_message = "Registro exitoso. <a href='index.php'>Inicia sesión aquí</a>";
            } else {
                $response_message = "Error: " . $stmt_insert->error;
            }

            $stmt_insert->close();
        }

        $stmt_check->close();
    } else {
        $response_message = "Todos los campos son obligatorios.";
    }
} else {
    $response_message = "Método de solicitud no válido.";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuario</title>
    <style>
        /* Reset de estilos */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        /* Fondo con degradado elegante */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        /* Contenedor de respuesta */
        .response-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 350px;
            text-align: center;
            color: white;
        }

        /* Título */
        .response-container h2 {
            margin-bottom: 20px;
            font-size: 24px;
        }

        /* Enlaces */
        .response-container a {
            color: #f39c12;
            font-weight: bold;
            text-decoration: none;
        }

        .response-container a:hover {
            color: #e67e22;
        }

        /* Inputs y botón */
        input, button {
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            border: none;
            outline: none;
        }

        button {
            background-color: #f39c12;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            background-color: #e67e22;
        }
    </style>
</head>
<body>
    <div class="response-container">
        <?php if (!empty($response_message)): ?>
            <?php echo $response_message; ?>
        <?php else: ?>
            <h2>Registro de Usuario</h2>
            <form method="POST" action="">
                <input type="text" name="nombre" placeholder="Nombre" required><br>
                <input type="text" name="apellidos" placeholder="Apellidos" required><br>
                <input type="text" name="usuario" placeholder="Usuario" required><br>
                <input type="password" name="contra" placeholder="Contraseña" required><br>
                <input type="date" name="fecha_nacimiento" required><br>
                <button type="submit">Registrarse</button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
