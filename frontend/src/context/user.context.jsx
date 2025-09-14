import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/axios.js';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      // Optionally fetch user profile if needed
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
