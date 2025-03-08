import React, { useState } from 'react';

function FiltradoCanciones({ canciones }) {
  const [artista, setArtista] = useState('');

  // Filtrar las canciones por el nombre del artista (sin distinguir mayúsculas)
  const cancionesFiltradas = canciones.filter((cancion) =>
    cancion.track_artist.toLowerCase().includes(artista.toLowerCase())
  );

  return (
    <div>
      <h2>Filtrar Canciones por Artista</h2>
      <input
        type="text"
        placeholder="Nombre del artista"
        value={artista}
        onChange={(e) => setArtista(e.target.value)}
      />
      <ul>
        {cancionesFiltradas.map((cancion) => (
          <li key={cancion.track_id}>{cancion.track_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FiltradoCanciones;
