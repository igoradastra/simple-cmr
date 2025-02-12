import { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));

  useEffect(() => {
    localStorage.setItem('user', user ?? '');
  }, [user]);

  const login = (username: string) => setUser(username);
  const logout = () => {
    setUser(null);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
