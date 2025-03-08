import React from 'react';

function ListadoCanciones({ canciones }) {
  return (
    <div>
      <h2>Listado de Canciones</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id de la pista</th>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Duración (s)</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map(({ track_id, track_name, track_artist, track_album_name, duration_ms }) => (
            <tr key={track_id}>
              <td>{track_id}</td>
              <td>{track_name}</td>
              <td>{track_artist}</td>
              <td>{track_album_name}</td>
              {/* Convertimos milisegundos a segundos, redondeando si es necesario */}
              <td>{Math.round(duration_ms / 1000)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoCanciones;
