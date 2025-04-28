import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function LostPets() {
  const [lost, setLost] = useState([]);
  const [form, setForm] = useState({ pet_name: '', description: '', last_seen_location: '' });

  useEffect(() => {
    api.get('/lost-pets').then(r => setLost(r.data));
  }, []);

  const reportLost = e => {
    e.preventDefault();
    api.post('/lost-pets', form).then(r => setLost([r.data, ...lost]));
  };

  return (
    <div>
      <h2>Reportar Mascota Perdida</h2>
      <form onSubmit={reportLost} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Nombre de la mascota"
          value={form.pet_name}
          onChange={e => setForm({ ...form, pet_name: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Última ubicación vista"
          value={form.last_seen_location}
          onChange={e => setForm({ ...form, last_seen_location: e.target.value })}
        />
        <button className="btn btn-danger">Publicar</button>
      </form>

      <h3>Listado de Perdidas</h3>
      {lost.map(lp => (
        <div className="card mb-2" key={lp.id}>
          <div className="card-body">
            <h5>{lp.pet_name}</h5>
            <p>{lp.description}</p>
            <p><small>{lp.last_seen_location}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
}
