import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Pets from './pages/Pets';
import Activities from './pages/Activities';
import LostPets from './pages/LostPets';

function App() {
  const isAuth = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuth ? (
            <>
              <Route path="/pets" element={<Pets />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/lost-pets" element={<LostPets />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
