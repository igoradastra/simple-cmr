import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../errors/apiErrors';

export const NewUser = () => {
  const { register, handleSubmit, reset } = useForm();

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
    onSuccess: (data) => {
      console.log('User created:', data);
      reset();
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ name, email }) => mutation.mutate({ name, email }))}
      style={{
        maxWidth: '30rem',
        marginLeft: '80px',
        marginTop: '20px',
        border: '1px solid #ccc',
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>
          Name:
          <input type="text" {...register('name')} required style={{ width: '100%', height: '20px' }} />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>
          Email:
          <input type="email" {...register('email')} required style={{ width: '100%', height: '20px' }} />
        </label>
      </div>
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
        }}
      >
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};
