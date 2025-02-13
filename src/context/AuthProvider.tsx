import { useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(Cookies.get('user') || null);

  useEffect(() => {
    if (user) {
      Cookies.set('user', user, { expires: 7, path: '/' });
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  const login = (username: string) => setUser(username);
  const logout = () => {
    setUser(null);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
