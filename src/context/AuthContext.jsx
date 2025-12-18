import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for an active session
    const savedUser = localStorage.getItem('banking_user');
    if (savedUser) {
      setUser({ username: savedUser });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);
      if (result.success) {
        // Save username to persist login on refresh
        localStorage.setItem('banking_user', result.username);
        setUser({ username: result.username });
        return { success: true };
      }
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('banking_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);