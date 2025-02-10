import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiError } from '../../errors/apiErrors';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(4, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const NewUser = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
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
      <label style={{ display: 'block' }}>Name:</label>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input {...field} type="text" style={{ width: '100%', height: '20px' }} />
            {fieldState.error && <p style={{ color: 'red', margin: '0 0 4px 0' }}>{fieldState.error.message}</p>}
          </>
        )}
      />
      <label style={{ display: 'block', marginTop: '1rem' }}>Email:</label>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input {...field} type="email" style={{ width: '100%', height: '20px' }} />
            {fieldState.error && <p style={{ color: 'red', margin: '0 0 4px 0' }}>{fieldState.error.message}</p>}
          </>
        )}
      />
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
