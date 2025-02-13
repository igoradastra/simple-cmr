import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiError } from '../../errors/apiErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '../../components/TextField';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export type LoginPayload = {
  name: string;
  email: string;
  password: string;
};

export const NewUser = () => {
  const { control, handleSubmit, reset } = useForm<LoginPayload>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new ApiError('Failed to create user', response.status);
      }
      return response.json();
    },
    onSuccess: () => reset(),
    onError: (error) => console.error('Error creating user:', error),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      style={{
        maxWidth: '30rem',
        marginLeft: '80px',
        marginTop: '20px',
        border: '1px solid #ccc',
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add new user</h2>
      <TextField name="name" control={control} label="Name" type="text" />
      <TextField name="email" control={control} label="Email" type="email" />
      <button
        type="submit"
        disabled={mutation.isPending}
        style={{
          display: 'block',
          width: '100%',
          padding: '0.5rem',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
          marginTop: '1rem',
        }}
      >
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};
