<?php
include_once 'conexion.php';
session_start();

if (!isset($_SESSION['id_usu'])) {
    die("No estás logueado.");
}

$id_usu = $_SESSION['id_usu'];

$fecha = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d'); 

$sql = "SELECT 
            c.fecha, 
            c.deporte, 
            c.lenta, 
            cm.tipo_comida, 
            cm.gl_1h, 
            cm.gl_2h, 
            cm.raciones, 
            cm.insulina AS insulina_comida,
            h.glucosa AS glucosa_hipo, 
            h.hora AS hora_hipo, 
            h.tipo_comida AS tipo_comida_hipo, 
            g.glucosa AS glucosa_hiper, 
            g.hora AS hora_hiper, 
            g.correccion AS correccion_hiper 
        FROM CONTROL_GLUCOSA c
        LEFT JOIN COMIDA cm ON c.fecha = cm.fecha AND c.id_usu = cm.id_usu
        LEFT JOIN HIPOGLUCEMIA h ON cm.tipo_comida = h.tipo_comida AND cm.fecha = h.fecha AND cm.id_usu = h.id_usu
        LEFT JOIN HIPERGLUCEMIA g ON cm.tipo_comida = g.tipo_comida AND cm.fecha = g.fecha AND cm.id_usu = g.id_usu
        WHERE c.fecha = '$fecha' AND c.id_usu = $id_usu";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    echo "<div class='contenedor'>";
    echo "<h2>Datos del $fecha</h2>";
    echo "<div class='tabla-div'>";
    
    echo "<table>";
    echo "<tr><th>Fecha</th><th>Deporte</th><th>Insulina Lenta</th></tr>";
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr>
                <td>{$fila['fecha']}</td>
                <td>{$fila['deporte']} min</td>
                <td>{$fila['lenta']} U</td>
            </tr>";
    }
    echo "</table>";

    echo "<table>";
    echo "<tr>
            <th>Tipo de Comida</th>
            <th>Glucosa 1h</th>
            <th>Glucosa 2h</th>
            <th>Raciones</th>
            <th>Insulina Comida</th>
            <th>Glucosa Hipo</th>
            <th>Hora Hipo</th>
            <th>Glucosa Hiper</th>
            <th>Hora Hiper</th>
            <th>Corrección Hiper</th>
          </tr>";
    $resultado->data_seek(0); 

    while ($fila = $resultado->fetch_assoc()) {
        $colorTipoComida = match (strtolower($fila['tipo_comida'])) {
            'desayuno' => 'gold',        
            'comida'   => 'orange',        
            'cena'     => 'lightcoral',      
            default    => 'white',          
        };
    
        echo "<tr>
                <td style='color: {$colorTipoComida}; font-weight: bold;'>{$fila['tipo_comida']}</td>
                <td>{$fila['gl_1h']} mg/dL</td>
                <td>{$fila['gl_2h']} mg/dL</td>
                <td>{$fila['raciones']}</td>
                <td>{$fila['insulina_comida']} U</td>
                <td>{$fila['glucosa_hipo']} mg/dL</td>
                <td>{$fila['hora_hipo']}</td>
                <td>{$fila['glucosa_hiper']} mg/dL</td>
                <td>{$fila['hora_hiper']}</td>
                <td>{$fila['correccion_hiper']} U</td>
            </tr>";
    }
    echo "</table>";

    echo "</div>";
    echo "</div>";
    echo '<a class="calendar-btn" href="calendario.php">📅 Calendario</a>';
} else {
    echo "<p>No se encontraron registros.</p>";
    echo '<a class="calendar-btn" href="calendario.php">📅 Calendario</a>';
}

$conn->close();
?>

<style>
    body {
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
    }

    .contenedor {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 40px;
        border-radius: 15px;
        width: 95%;
        max-width: 1500px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        text-align: center;
        overflow: hidden;
        height: auto;
        max-height: 1200px;
        overflow-y: auto;
    }

    h2 {
        font-size: 2.5rem;
        margin-bottom: 30px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
        word-wrap: break-word;
    }

    th, td {
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        text-align: center;
        font-size: 1.1rem;
        word-wrap: break-word;
        overflow: hidden;
    }

    th {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
    }

    td {
        color: #ddd;
    }

    .nav {
        margin-bottom: 30px;
    }

    .nav a {
        text-decoration: none;
        color: white;
        background: #e67e22;
        padding: 15px 20px;
        border-radius: 7px;
        font-size: 1.2rem;
        transition: 0.3s;
    }

    .nav a:hover {
        background: #d35400;
    }

    .nav a:active {
        transform: scale(0.98);
    }

    .tabla-div {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 30px;
    }

    .tabla-div table {
        width: 48%;
    }

    .calendar-btn {
        margin-top: 20px;
        top: 20px;
        left: 20px;
        background: #3498db;
        color: white;
        font-weight: bold;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none; 
    }

    .calendar-btn:hover {
        background: #2980b9;
        transform: scale(1.05);
    }

    .calendar-btn:active {
        transform: scale(0.95);
    }
</style>
