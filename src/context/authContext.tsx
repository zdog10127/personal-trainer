import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types/interface';
import { mockUsers } from '../data/mockdata';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = useCallback((username: string, password: string): boolean => {
    const found = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (found) { setUser(found); return true; }
    return false;
  }, [users]);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : prev);
    setUsers(prev => prev.map(u => u.id === user?.id ? { ...u, ...data } : u));
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};