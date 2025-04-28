import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PetForm from '../components/PetForm';

export default function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then(res => setPets(res.data));
  }, []);

  const addPet = petData =>
    api.post('/pets', petData).then(res => setPets([...pets, res.data]));

  const updatePet = (id, petData) =>
    api.put(`/pets/${id}`, petData).then(res =>
      setPets(pets.map(p => (p.id === id ? res.data : p)))
    );

  return (
    <div>
      <h2>Mis Mascotas</h2>
      <PetForm onSubmit={addPet} />
      <hr />
      {pets.map(p => (
        <div className="card mb-2" key={p.id}>
          <div className="card-body">
            <h5>{p.name}</h5>
            <p>Raza: {p.breed} | Edad: {p.age}</p>
            <button className="btn btn-sm btn-primary" onClick={() => updatePet(p.id, p)}>
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
