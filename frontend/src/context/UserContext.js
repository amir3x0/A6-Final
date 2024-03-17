import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (updates) => {
      setUser((currentUser) => ({
        ...currentUser,
        ...updates,
      }));
    };

  console.log(user); // Log the current user data
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


