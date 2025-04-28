import React, { createContext } from 'react';

export const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  
  const regex = {
    username: /^[a-z][a-z0-9]{5,}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
  };

  return (
    <ValidationContext.Provider value={regex}>
      {children}
    </ValidationContext.Provider>
  );
};
