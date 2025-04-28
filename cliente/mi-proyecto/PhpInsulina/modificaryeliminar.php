<?php
include 'conexion.php'; // Conecta a la base de datos diabetesdb

$response = "";

// -----------------------------------------------------------
// 1) Si llega delete_id, ELIMINAMOS solo ese registro de COMIDA.
//    Luego, verificamos si ya no quedan más comidas para ese día
//    y, de ser así, eliminamos el registro de CONTROL_GLUCOSA.
if (isset($_POST['delete_id']) && !empty($_POST['delete_id'])) {
    $delete_id = $_POST['delete_id'];
    $fecha     = $_POST['fecha'];

    // Primero, obtenemos la fila de COMIDA para saber (fecha, id_usu)
    $sqlFind = "SELECT fecha, tipo_comida, id_usu FROM COMIDA WHERE id_comida = ?";
    $stmtFind = $conn->prepare($sqlFind);
    $stmtFind->bind_param("i", $delete_id);
    $stmtFind->execute();
    $resFind = $stmtFind->get_result();

    if ($resFind->num_rows > 0) {
        $rowFind = $resFind->fetch_assoc();
        $fechaDB = $rowFind['fecha'];       // Fecha del registro
        $tipoDB  = $rowFind['tipo_comida']; // Tipo de comida
        $usuDB   = $rowFind['id_usu'];      // Usuario

        // Eliminamos la fila de COMIDA usando su id_comida
        $sqlDelete = "DELETE FROM COMIDA WHERE id_comida = ?";
        $stmtDelete = $conn->prepare($sqlDelete);
        $stmtDelete->bind_param("i", $delete_id);

        if ($stmtDelete->execute()) {
            $response .= "<h2 class='mensaje-exito'>Eliminación Exitosa</h2>";
            $response .= "<p class='mensaje-exito'>Se han eliminado los datos de <b>$tipoDB</b> para el día <b>$fechaDB</b>.</p>";

            // Verificamos si quedan más comidas para ese día y usuario
            $sqlCount = "SELECT COUNT(*) as cnt FROM COMIDA WHERE fecha = ? AND id_usu = ?";
            $stmtCount = $conn->prepare($sqlCount);
            $stmtCount->bind_param("si", $fechaDB, $usuDB);
            $stmtCount->execute();
            $resultCount = $stmtCount->get_result();
            $rowCount = $resultCount->fetch_assoc();
            $stmtCount->close();

            // Si no quedan más comidas, eliminamos el registro de CONTROL_GLUCOSA
            if ($rowCount['cnt'] == 0) {
                $sqlDeleteControl = "DELETE FROM CONTROL_GLUCOSA WHERE fecha = ? AND id_usu = ?";
                $stmtDeleteControl = $conn->prepare($sqlDeleteControl);
                $stmtDeleteControl->bind_param("si", $fechaDB, $usuDB);
                if ($stmtDeleteControl->execute()) {
                    $response .= "<p class='mensaje-exito'>Además, se ha eliminado el Control de Glucosa para ese día.</p>";
                } else {
                    $response .= "<p class='mensaje-error'>Error al eliminar el Control de Glucosa.</p>";
                }
                $stmtDeleteControl->close();
            }
        } else {
            $response .= "<p class='mensaje-error'>Error al eliminar el registro con ID $delete_id.</p>";
        }
        $stmtDelete->close();
    } else {
        $response .= "<p class='mensaje-error'>No se encontró el registro a eliminar (ID $delete_id).</p>";
    }
    $stmtFind->close();
}

// -----------------------------------------------------------
// 2) Si no se solicita eliminación pero action=update, GUARDAMOS cambios
// -----------------------------------------------------------
elseif (isset($_POST['action']) && $_POST['action'] == 'update') {
    $fecha = $_POST['fecha'];
    $updates = [];

    foreach ($_POST as $key => $value) {
        if (preg_match('/^(tipo_|gl1_|gl2_|raciones_|insulina_)(\d+)$/', $key, $matches)) {
            $id = $matches[2];
            $field_prefix = $matches[1];
            if (!isset($updates[$id])) {
                $updates[$id] = [];
            }
            switch ($field_prefix) {
                case 'tipo_':
                    $updates[$id]['tipo_comida'] = $value;
                    break;
                case 'gl1_':
                    $updates[$id]['gl_1h'] = $value;
                    break;
                case 'gl2_':
                    $updates[$id]['gl_2h'] = $value;
                    break;
                case 'raciones_':
                    $updates[$id]['raciones'] = $value;
                    break;
                case 'insulina_':
                    $updates[$id]['insulina'] = $value;
                    break;
            }
        }
    }

    if (!empty($updates)) {
        foreach ($updates as $id => $fields) {
            $sqlUpdate = "UPDATE COMIDA
                          SET tipo_comida = ?, gl_1h = ?, gl_2h = ?, raciones = ?, insulina = ?
                          WHERE id_comida = ?";
            $stmtUpdate = $conn->prepare($sqlUpdate);
            $stmtUpdate->bind_param("siiiii",
                $fields['tipo_comida'],
                $fields['gl_1h'],
                $fields['gl_2h'],
                $fields['raciones'],
                $fields['insulina'],
                $id
            );
            $stmtUpdate->execute();
            $stmtUpdate->close();
        }
        $response .= "<h2 class='mensaje-exito'>Registros actualizados correctamente</h2>";
    }
}

// -----------------------------------------------------------
// 3) Verificamos si hay una fecha en POST (o se mantiene la previa)
// -----------------------------------------------------------
$fechaParaMostrar = "";
if (isset($_POST['fecha'])) {
    $fechaParaMostrar = $_POST['fecha'];
}

// -----------------------------------------------------------
// 4) Si tenemos fecha, mostramos el formulario con los recuadros
// -----------------------------------------------------------
if (!empty($fechaParaMostrar)) {
    $sql = "SELECT * FROM COMIDA WHERE fecha = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $fechaParaMostrar);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $desayuno = [];
        $almuerzo = [];
        $cena     = [];

        while ($row = $result->fetch_assoc()) {
            switch (strtolower($row['tipo_comida'])) {
                case 'desayuno':
                    $desayuno[] = $row;
                    break;
                case 'comida':
                    $almuerzo[] = $row;
                    break;
                case 'cena':
                    $cena[] = $row;
                    break;
            }
        }
        $stmt->close();

        $response .= "<h2 class='mensaje'>Modificar registros de Comida</h2>";
        $response .= "<span class='subtitulo'>Fecha: $fechaParaMostrar</span><br><br>";

        $response .= "<form method='post' action='modificaryeliminar.php'>";
        $response .= "<input type='hidden' name='fecha' value='$fechaParaMostrar'>";
        $response .= "<div class='contenedor-principal'>";
        $response .= "<div class='tres-recuadros'>";

        // ================= DESAYUNO =================
        $response .= "<div class='recuadro'>";
        if (!empty($desayuno)) {
            foreach ($desayuno as $row) {
                $id       = $row['id_comida'];
                $tipo     = $row['tipo_comida'];
                $gl1      = $row['gl_1h'];
                $gl2      = $row['gl_2h'];
                $raciones = $row['raciones'];
                $insulina = $row['insulina'];

                $color = '#f1c40f'; // Amarillo para Desayuno
                $response .= "<h3 style='font-size: 24px; color: $color; margin-bottom: 15px;'>"
                          . strtoupper($tipo) . "</h3>";

                $response .= "<input type='hidden' name='tipo_$id' value='" . htmlspecialchars($tipo, ENT_QUOTES) . "'>";
                $response .= "<label>Glucosa 1h:</label>";
                $response .= "<input type='number' name='gl1_$id' value='$gl1' min='0' required>";
                $response .= "<label>Glucosa 2h:</label>";
                $response .= "<input type='number' name='gl2_$id' value='$gl2' min='0' required>";
                $response .= "<label>Raciones:</label>";
                $response .= "<input type='number' name='raciones_$id' value='$raciones' min='0' required>";
                $response .= "<label>Insulina:</label>";
                $response .= "<input type='number' name='insulina_$id' value='$insulina' min='0' required>";

                // Botón para eliminar solo este registro de Desayuno
                $response .= "<button class='delete-btn' type='submit' name='delete_id' value='$id' style='margin-top:10px;'>Eliminar</button>";
            }
        } else {
            $response .= "<h3 style='font-size: 24px; color: #f1c40f; margin-bottom: 15px;'>DESAYUNO</h3>";
            $response .= "<p>No hay datos de Desayuno en esta fecha.</p>";
        }
        $response .= "</div>"; // Fin recuadro Desayuno

        // ================= ALMUERZO (COMIDA) =================
        $response .= "<div class='recuadro'>";
        if (!empty($almuerzo)) {
            foreach ($almuerzo as $row) {
                $id       = $row['id_comida'];
                $tipo     = $row['tipo_comida'];
                $gl1      = $row['gl_1h'];
                $gl2      = $row['gl_2h'];
                $raciones = $row['raciones'];
                $insulina = $row['insulina'];

                $color = '#f39c12'; // Naranja para Comida
                $response .= "<h3 style='font-size: 24px; color: $color; margin-bottom: 15px;'>"
                          . strtoupper($tipo) . "</h3>";

                $response .= "<input type='hidden' name='tipo_$id' value='" . htmlspecialchars($tipo, ENT_QUOTES) . "'>";
                $response .= "<label>Glucosa 1h:</label>";
                $response .= "<input type='number' name='gl1_$id' value='$gl1' min='0' required>";
                $response .= "<label>Glucosa 2h:</label>";
                $response .= "<input type='number' name='gl2_$id' value='$gl2' min='0' required>";
                $response .= "<label>Raciones:</label>";
                $response .= "<input type='number' name='raciones_$id' value='$raciones' min='0' required>";
                $response .= "<label>Insulina:</label>";
                $response .= "<input type='number' name='insulina_$id' value='$insulina' min='0' required>";

                // Botón para eliminar solo este registro de Comida
                $response .= "<button class='delete-btn' type='submit' name='delete_id' value='$id' style='margin-top:10px;'>Eliminar</button>";
            }
        } else {
            $response .= "<h3 style='font-size: 24px; color: #f39c12; margin-bottom: 15px;'>COMIDA</h3>";
            $response .= "<p>No hay datos de Comida en esta fecha.</p>";
        }
        $response .= "</div>"; // Fin recuadro Comida

        // ================= CENA =================
        $response .= "<div class='recuadro'>";
        if (!empty($cena)) {
            foreach ($cena as $row) {
                $id       = $row['id_comida'];
                $tipo     = $row['tipo_comida'];
                $gl1      = $row['gl_1h'];
                $gl2      = $row['gl_2h'];
                $raciones = $row['raciones'];
                $insulina = $row['insulina'];

                $color = '#e91e63'; // Rosa para Cena
                $response .= "<h3 style='font-size: 24px; color: $color; margin-bottom: 15px;'>"
                          . strtoupper($tipo) . "</h3>";

                $response .= "<input type='hidden' name='tipo_$id' value='" . htmlspecialchars($tipo, ENT_QUOTES) . "'>";
                $response .= "<label>Glucosa 1h:</label>";
                $response .= "<input type='number' name='gl1_$id' value='$gl1' min='0' required>";
                $response .= "<label>Glucosa 2h:</label>";
                $response .= "<input type='number' name='gl2_$id' value='$gl2' min='0' required>";
                $response .= "<label>Raciones:</label>";
                $response .= "<input type='number' name='raciones_$id' value='$raciones' min='0' required>";
                $response .= "<label>Insulina:</label>";
                $response .= "<input type='number' name='insulina_$id' value='$insulina' min='0' required>";

                // Botón para eliminar solo este registro de Cena
                $response .= "<button class='delete-btn' type='submit' name='delete_id' value='$id' style='margin-top:10px;'>Eliminar</button>";
            }
        } else {
            $response .= "<h3 style='font-size: 24px; color: #e91e63; margin-bottom: 15px;'>CENA</h3>";
            $response .= "<p>No hay datos de Cena en esta fecha.</p>";
        }
        $response .= "</div>"; // Fin recuadro Cena

        $response .= "</div>"; // Fin tres-recuadros

        // Botón “Guardar Cambios”
        $response .= "<div class='button-container'>";
        $response .= "<input type='hidden' name='action' value='update'>";
        $response .= "<button class='submit-btn' type='submit'>💾 Guardar Cambios</button>";
        $response .= "</div>";

        $response .= "</div>"; // Fin contenedor-principal
        $response .= "</form>";
        
    } else {
        $response .= "<p class='mensaje'>No se encontraron registros para la fecha: $fechaParaMostrar</p>";
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Modificar Registros de Comida</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Reset de estilos */
        * {
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            font-family: 'Poppins', sans-serif;
        }
        /* Fondo degradado */
        body {
            display: flex; 
            justify-content: center; 
            align-items: flex-start;
            min-height: 100vh; 
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            padding: 20px;
        }
        /* Contenedor principal */
        .form-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px); 
            padding: 2rem;
            border-radius: 10px; 
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 100%; 
            max-width: 800px; 
            color: white;
        }
        .mensaje {
            text-align: center; 
            font-size: 24px; 
            margin-bottom: 10px; 
            font-weight: bold;
        }
        .mensaje-exito {
            text-align: center; 
            font-size: 20px; 
            color: #2ecc71; 
            margin-bottom: 20px; 
            font-weight: bold;
        }
        .mensaje-error {
            text-align: center; 
            font-size: 20px; 
            color: #e74c3c; 
            margin-bottom: 20px; 
            font-weight: bold;
        }
        .subtitulo {
            display: block; 
            text-align: center; 
            font-size: 16px; 
            color: #ddd; 
            margin-bottom: 20px;
        }
        .fecha-form {
            margin-bottom: 40px; 
            margin-top: 80px;
        }
        .fecha-form label {
            display: block; 
            margin-bottom: 5px; 
            font-size: 16px;
        }
        .fecha-form input[type="date"] {
            width: 100%; 
            padding: 12px; 
            border: none; 
            border-radius: 5px; 
            font-size: 16px;
            background: rgba(255, 255, 255, 0.2); 
            color: white; 
            outline: none; 
            margin-bottom: 10px;
        }
        .buscar-btn {
            margin-bottom: 20px; 
            width: 100%; 
            padding: 12px; 
            background: #f39c12;
            border: none; 
            border-radius: 5px; 
            font-size: 18px; 
            font-weight: bold; 
            color: white; 
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }
        .buscar-btn:hover {
            background: #e67e22; 
            transform: scale(1.05);
        }
        .contenedor-principal {
            margin-top: 20px;
        }
        .tres-recuadros {
            display: flex; 
            justify-content: space-between; 
            gap: 10px; 
            margin-bottom: 20px;
        }
        .recuadro {
            flex: 1; 
            border: none; 
            padding: 15px; 
            background: rgba(255,255,255,0.2);
            color: #fff; 
            min-height: 260px; 
            border-radius: 8px; 
        }
        .recuadro h3 {
            margin-bottom: 10px;
        }
        .recuadro label {
            display: block; 
            margin-top: 8px; 
            font-size: 16px;
        }
        .recuadro input {
            width: 100%; 
            margin-bottom: 5px; 
            padding: 8px; 
            border: none; 
            border-radius: 4px;
            background: rgba(255,255,255,0.2); 
            color: #fff; 
            font-size: 16px;
        }
        .button-container {
            border: none; 
            padding: 20px; 
            text-align: center;
            background: rgba(255,255,255,0.2); 
            border-radius: 8px;
        }
        .submit-btn {
            width: 100%; 
            padding: 14px; 
            background: #3498db; 
            border: none; 
            border-radius: 5px;
            font-size: 20px; 
            font-weight: bold; 
            color: white; 
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }
        .submit-btn:hover {
            background: #2980b9; 
            transform: scale(1.05);
        }
        .delete-btn {
            width: 100%; 
            padding: 10px; 
            background: #e74c3c; 
            border: none; 
            border-radius: 5px;
            font-size: 16px; 
            font-weight: bold; 
            color: white; 
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }
        .delete-btn:hover {
            background: #c0392b; 
            transform: scale(1.05);
        }
        .menu-btn {
            width: 100%; 
            padding: 14px; 
            margin-top: 15px; 
            background: #2ecc71; 
            border: none;
            border-radius: 5px; 
            font-size: 20px; 
            font-weight: bold; 
            color: white;
            cursor: pointer; 
            transition: background 0.3s, transform 0.2s;
        }
        .menu-btn:hover {
            background: #27ae60; 
            transform: scale(1.05);
        }
        .choose-btn {
            align-self: center; 
            width: 100%; 
            padding: 10px; 
            border: none;
            border-radius: 5px; 
            font-size: 16px; 
            font-weight: bold; 
            color: white;
            cursor: pointer; 
            transition: background 0.3s, transform 0.2s;
        }
        .choose-btn {
            background: #3498db;
        }
        .choose-btn:hover {
            background: #2980b9; 
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <?php echo $response; ?>

        <!-- Formulario para introducir la fecha si el usuario no ha introducido aún -->
        <form method="post" action="modificaryeliminar.php" class="fecha-form">
            <label for="fecha">Selecciona la fecha para Modificar:</label>
            <input type="date" id="fecha" name="fecha" value="<?php echo htmlspecialchars($fechaParaMostrar, ENT_QUOTES); ?>" required>
            <button class="buscar-btn" type="submit">🔍 Buscar</button>
        </form>
        
        <!-- Botones adicionales para ir al calendario o al menú principal -->
        <div class="button-container">
            <button type="button" class="buscar-btn" onclick="window.location.href='calendario.php'">📅 Ir al calendario</button>
            <button type="button" class="choose-btn" onclick="window.location.href='escoger.php'">📋 Menú Principal</button>
        </div>
    </div>
</body>
</html>
