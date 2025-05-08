import React, { createContext, useState, ReactNode } from 'react';
import { adminCredentials } from '../utils/mockData';

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = (username: string, password: string): boolean => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};