import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import CommentList from '../components/CommentList';

export default function Activities() {
  const [acts, setActs] = useState([]);
  useEffect(() => {
    api.get('/activities').then(r => setActs(r.data));
  }, []);

  const joinActivity = id =>
    api.post(`/activities/${id}/register`).then(() =>
      setActs(acts.map(a => (a.id === id ? { ...a, joined: true } : a)))
    );

  return (
    <div>
      <h2>Actividades Cercanas</h2>
      {acts.map(a => (
        <div className="card mb-3" key={a.id}>
          <div className="card-body">
            <h5>{a.title}</h5>
            <p>{a.description}</p>
            <p><small>{new Date(a.starts_at).toLocaleString()}</small></p>
            <button
              className="btn btn-sm btn-success me-2"
              disabled={a.joined}
              onClick={() => joinActivity(a.id)}
            >
              {a.joined ? 'Apuntado' : 'Apuntarse'}
            </button>
            <CommentList activityId={a.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
