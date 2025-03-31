import { useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import { googleLogout } from '@react-oauth/google';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(Cookies.get('user') || null);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(
    Cookies.get('isGoogleUser') === 'true' || false
  );

  useEffect(() => {
    if (user) {
      Cookies.set('user', user, { expires: 7, path: '/' });
      Cookies.set('isGoogleUser', isGoogleUser.toString(), { expires: 7, path: '/' });
    } else {
      Cookies.remove('user');
      Cookies.remove('isGoogleUser');
    }
  }, [user, isGoogleUser]);

  const login = (username: string, isGoogle = false) => {
    setUser(username);
    setIsGoogleUser(isGoogle);
  };

  const logout = () => {
    if (isGoogleUser) {
      googleLogout();
    }
    setUser(null);
    setIsGoogleUser(false);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ user, login, logout, isGoogleUser }}>{children}</AuthContext.Provider>;
};