import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './authContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
	setLoading(true);
    if (storedToken) {
      	setToken(storedToken);
	}
	setLoading(false);
  }, [navigate]);

  const login = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
