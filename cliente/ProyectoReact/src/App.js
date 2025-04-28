import React, { useState } from 'react';
import { ValidationProvider } from './context/ValidationContext';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Statistics from './components/Statistics';

function App() {
  const [userToEdit, setUserToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleFormSubmit = () => {
    setUserToEdit(null);
    setRefresh(!refresh); 
  };

  return (
    <ValidationProvider>
      <div className="App">
        <h1>Control de Insulina - Gestión de Usuarios</h1>
        <UserForm userToEdit={userToEdit} onFormSubmit={handleFormSubmit} />
        <UserList key={refresh} onEdit={handleEdit} />
        <Statistics />
      </div>
    </ValidationProvider>
  );
}

export default App;
