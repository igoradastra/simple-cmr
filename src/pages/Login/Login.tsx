import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../../components/InputField';

const loginSchema = z.object({
  name: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email'),
});

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (data: { name: string; email: string }) => {
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
      <InputField name="name" control={control} label="Username" type="text" />
      <InputField name="password" control={control} label="Password" type="password" />
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
