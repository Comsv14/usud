import React, { useState, useContext, useEffect } from 'react';
import { ValidationContext } from '../context/ValidationContext';
import { createUser, updateUser } from '../api/api';

const UserForm = ({ userToEdit, onFormSubmit }) => {
  const regex = useContext(ValidationContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: ''
  });

  useEffect(() => {
    if (userToEdit) {
      
      setUser({
        username: userToEdit.username || '',
        password: '',
        nombre: userToEdit.nombre || '',
        apellidos: userToEdit.apellidos || '',
        fechaNacimiento: userToEdit.fechaNacimiento || ''
      });
    }
  }, [userToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    
    if (!userToEdit) {
      if (!regex.username.test(user.username)) {
        alert("El nombre de usuario debe tener al menos 6 caracteres, comenzar con letra y solo contener letras minúsculas y números.");
        return false;
      }
    }

    
    if (!userToEdit || (userToEdit && user.password)) {
      if (!regex.password.test(user.password)) {
        alert("La contraseña debe tener al menos 8 caracteres, contener al menos una mayúscula y un número.");
        return false;
      }
    }

    
    const today = new Date();
    const birthDate = new Date(user.fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      alert("El usuario debe ser mayor de 18 años.");
      return false;
    }

  
    if (!user.nombre || !user.apellidos) {
      alert("Debe introducir el nombre y los apellidos.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      if (userToEdit) {
        await updateUser(user.username, user);
        alert("Usuario actualizado correctamente.");
      } else {
        await createUser(user);
        alert("Usuario creado correctamente.");
      }
      onFormSubmit();
      
      setUser({
        username: '',
        password: '',
        nombre: '',
        apellidos: '',
        fechaNacimiento: ''
      });
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    }
  };

  return (
    <div>
      <h2>{userToEdit ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        {!userToEdit && (
          <>
            <label>Nombre de Usuario:</label>
            <input 
              type="text" 
              name="username" 
              value={user.username || ''} 
              onChange={handleChange} 
              required 
            />
          </>
        )}
        <label>Contraseña:</label>
        <input 
          type="password" 
          name="password" 
          value={user.password || ''} 
          onChange={handleChange} 
          required={!userToEdit}
          placeholder={userToEdit ? "Dejar en blanco para no cambiar" : ""}
        />
        <label>Nombre:</label>
        <input 
          type="text" 
          name="nombre" 
          value={user.nombre || ''} 
          onChange={handleChange} 
          required 
        />
        <label>Apellidos:</label>
        <input 
          type="text" 
          name="apellidos" 
          value={user.apellidos || ''} 
          onChange={handleChange} 
          required 
        />
        <label>Fecha de Nacimiento:</label>
        <input 
          type="date" 
          name="fechaNacimiento" 
          value={user.fechaNacimiento || ''} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">{userToEdit ? "Actualizar" : "Registrar"}</button>
      </form>
    </div>
  );
};

export default UserForm;
