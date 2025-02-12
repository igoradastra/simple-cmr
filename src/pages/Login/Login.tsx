import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '../../components/TextField';

const loginSchema = z.object({
  name: z.string().min(1, 'Username is required'),
  password: z.string().min(4, 'Password is required'),
});

export type LoginPayload = {
  name: string;
  password: string;
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { name: '', password: '' },
  });

  const onSubmit = (data: LoginPayload) => {
    login(data.name);
    navigate('/users');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      <span>ahoj</span>
      <TextField name="password" control={control} label="Password" type="password" />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '1rem',
          border: 'none',
          borderRadius: '4px',
          background: '#007bff',
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
