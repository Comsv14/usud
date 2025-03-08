import React from 'react';

function MasPopular({ canciones }) {
  if (canciones.length === 0) return null;

  // Se asume que cada canción tiene una propiedad "track_popularity"
  const cancionPopular = canciones.reduce((prev, curr) =>
    curr.track_popularity > prev.track_popularity ? curr : prev
  );

  return (
    <div>
      <h2>Canción Más Popular</h2>
      <p>
        {cancionPopular.track_name} - {cancionPopular.track_artist} <br />
        Popularidad: {cancionPopular.track_popularity}
      </p>
    </div>
  );
}

export default MasPopular;
