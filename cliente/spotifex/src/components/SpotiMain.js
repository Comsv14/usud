import React, { useState, useEffect } from 'react';
import ListadoCanciones from './ListadoCanciones';
import FiltradoCanciones from './FiltradoCanciones';
import MasPopular from './MasPopular';

function SpotiMain() {
  const [canciones, setCanciones] = useState([]);

  // Función asíncrona para obtener las canciones del JSON
  useEffect(() => {
                        async function fetchCanciones() {
                          try {
                              const response = await fetch('/json/Spotify.json');
                              const data = await response.json();
                              setCanciones(data);
                          } catch (error) {
                              console.error('Error al obtener las canciones:', error);
                          }
                        }

                        fetchCanciones();
                }, []
            );

  return (
    <div>
      <h1>SpotifEx</h1>
      <ListadoCanciones canciones={canciones} />
      <FiltradoCanciones canciones={canciones} />
      <MasPopular canciones={canciones} />
    </div>
  );
}

export default SpotiMain;
