import { createContext } from 'react';

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
