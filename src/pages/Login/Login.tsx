import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '../../components/TextField';
import { useEffect, useState } from 'react';
import { AuthContextType } from '../../context/AuthContext';
import { Checkbox } from '../../components/Checkbox';

const loginSchema = z.object({
  name: z.string().min(1, 'Username is required'),
  password: z.string().min(4, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginPayload = {
  name: string;
  password: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const getAuth = useAuth();
  const [auth, setAuth] = useState<AuthContextType | null>(null);

  useEffect(() => {
    getAuth().then(setAuth);
  }, [getAuth]);

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { name: '', password: '', rememberMe: false },
  });

  const handleLogin = (data: LoginPayload) => {
    auth?.login(data.name);
    navigate('/users');
  };

  if (!auth) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      style={{
        maxWidth: '350px',
        margin: '5rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
      <TextField name="name" control={control} label="Username" type="text" />
      <TextField name="password" control={control} label="Password" type="password" />
      <TextField name="name" control={control} label="Username another" type="text" />
      <Checkbox name="rememberMe" control={control} label="Remember me" />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '1rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </form>
  );
};
