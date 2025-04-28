<?php
include_once 'conexion.php';


// Recoger datos del formulario
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$usuario = $_POST['usuario'];
$contra = $_POST['contra'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

$fecha = $_POST['fecha'];
$deporte = $_POST['deporte'];
$lenta = $_POST['lenta'];

$tipo_comida = $_POST['tipo_comida'];
$gl_1h = $_POST['gl_1h'];
$gl_2h = $_POST['gl_2h'];
$raciones = $_POST['raciones'];
$insulina = $_POST['insulina'];

$glucosa_hiper = $_POST['glucosa_hiper'];
$hora_hiper = $_POST['hora_hiper'];
$correccion = $_POST['correccion'];

$glucosa_hipo = $_POST['glucosa_hipo'];
$hora_hipo = $_POST['hora_hipo'];

// Insertar datos en la tabla USUARIO
$sql_usuario = "INSERT INTO USUARIO (fecha_nacimiento, nombre, apellidos, usuario, contra)
                VALUES ('$fecha_nacimiento', '$nombre', '$apellidos', '$usuario', '$contra')";

if ($conn->query($sql_usuario) === TRUE) {
    $id_usu = $conn->insert_id; // Obtener el ID del usuario insertado

    // Insertar datos en la tabla CONTROL_GLUCOSA
    $sql_control = "INSERT INTO CONTROL_GLUCOSA (fecha, deporte, lenta, id_usu)
                    VALUES ('$fecha', $deporte, $lenta, $id_usu)";

    if ($conn->query($sql_control) === TRUE) {
        // Insertar datos en la tabla COMIDA
        $sql_comida = "INSERT INTO COMIDA (tipo_comida, gl_1h, gl_2h, raciones, insulina, fecha, id_usu)
                       VALUES ('$tipo_comida', $gl_1h, $gl_2h, $raciones, $insulina, '$fecha', $id_usu)";

        if ($conn->query($sql_comida) === TRUE) {
            // Insertar datos en la tabla HIPERGLUCEMIA
            $sql_hiper = "INSERT INTO HIPERGLUCEMIA (glucosa, hora, correccion, tipo_comida, fecha, id_usu)
                          VALUES ($glucosa_hiper, '$hora_hiper', $correccion, '$tipo_comida', '$fecha', $id_usu)";

            if ($conn->query($sql_hiper) === TRUE) {
                // Insertar datos en la tabla HIPOGLUCEMIA
                $sql_hipo = "INSERT INTO HIPOGLUCEMIA (glucosa, hora, tipo_comida, fecha, id_usu)
                              VALUES ($glucosa_hipo, '$hora_hipo', '$tipo_comida', '$fecha', $id_usu)";

                if ($conn->query($sql_hipo) === TRUE) {
                    echo "Datos insertados correctamente.";
                } else {
                    echo "Error al insertar en HIPOGLUCEMIA: " . $conn->error;
                }
            } else {
                echo "Error al insertar en HIPERGLUCEMIA: " . $conn->error;
            }
        } else {
            echo "Error al insertar en COMIDA: " . $conn->error;
        }
    } else {
        echo "Error al insertar en CONTROL_GLUCOSA: " . $conn->error;
    }
} else {
    echo "Error al insertar en USUARIO: " . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro y Control</title>
    <style>
        /* Estilo global */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .form-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 350px;
            color: white;
            text-align: center;
        }

        .form-container h2 {
            margin-bottom: 20px;
            font-size: 24px;
        }

        .form-container input, .form-container button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 5px;
            background: #f39c12;
            color: white;
            font-size: 16px;
        }

        .form-container input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .form-container input:focus, .form-container button:focus {
            outline: none;
            box-shadow: 0 0 5px #f39c12;
        }

        .form-container button {
            background-color: #f39c12;
            font-weight: bold;
        }

        .form-container button:hover {
            background-color: #e67e22;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Registro y Control de Usuario</h2>
        <form method="POST" action="">
            <input type="text" name="nombre" placeholder="Nombre" required><br>
            <input type="text" name="apellidos" placeholder="Apellidos" required><br>
            <input type="text" name="usuario" placeholder="Usuario" required><br>
            <input type="password" name="contra" placeholder="Contraseña" required><br>
            <input type="date" name="fecha_nacimiento" required><br>
            <button type="submit">Registrar</button>
        </form>
    </div>
</body>
</html>
