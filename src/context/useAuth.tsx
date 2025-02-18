import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');

  const asyncFunction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    return context;
  };

  return asyncFunction;
};
