import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { deleteUser, getUsers, updateUser } from '../../api/users';
import { useState, useEffect } from 'react';
import { TextField } from '../../components/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../api/types/Users';
import { TextLinkButton } from '../../components/TextLinkButton';

interface FormData {
  name: string;
}

export const UsersList = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: !!Cookies.get('user'),
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (user: User) => updateUser(`${user.id}`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const { control, setValue, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    if (editingUserId !== null) {
      const user = users?.find((user) => user.id === editingUserId);
      if (user) {
        setValue('name', user.name);
      }
    }
  }, [editingUserId, users, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (editingUserId !== null) {
      const userToUpdate = users?.find((user) => user.id === editingUserId);
      if (userToUpdate) {
        const updatedUser: User = {
          ...userToUpdate,
          name: data.name,
        };
        updateUserMutation(updatedUser);
        setEditingUserId(null);
      }
    }
  };

  switch (true) {
    case isLoading:
      return <p style={{ textAlign: 'center' }}>Loading...</p>;
    case !!error:
      return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</p>;
    default:
      break;
  }

  if (!Cookies.get('user')) {
    return <p>Please log in to view users</p>;
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Users</h2>
      </header>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          padding: '0 2rem',
        }}
      >
        {users?.map((user) => (
          <li
            key={user.id}
            style={{
              listStyle: 'none',
              textAlign: 'center',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              minWidth: '15rem',
              flex: '1 1 calc(20% - 1rem)',
              maxWidth: '20%',
            }}
          >
            {editingUserId === user.id ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField control={control} name="name" label={''} type={'text'} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <TextLinkButton label="Save" type="submit" />
                  <TextLinkButton
                    label="Cancel"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditingUserId(null);
                    }}
                  />
                </div>
              </form>
            ) : (
              <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <strong>{user.name}</strong>
              </Link>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {editingUserId === user.id ? (
                <></>
              ) : (
                <>
                  <TextLinkButton label="Edit" onClick={() => setEditingUserId(user.id)} />
                  <TextLinkButton label="Remove" onClick={() => deleteUserMutation(`${user.id}`)} />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
