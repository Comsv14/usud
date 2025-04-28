import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleDelete = async (username) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario ${username}?`)) {
      await deleteUser(username);
      loadUsers();
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Nombre y Apellidos</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.nombre} {user.apellidos}</td>
                <td>{user.fechaNacimiento}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.username)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
