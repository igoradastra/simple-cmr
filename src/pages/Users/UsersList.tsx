import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { deleteUser, getUsers, updateUser } from '../../api/users';
import { User } from '../../api/types/Users';
import { TextLinkButton } from '../../components/TextLinkButton';
import { EditUserForm } from './UserFormEdit';

export const UsersList = () => {
  const queryClient = useQueryClient();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: !!Cookies.get('user'),
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (user: User) => updateUser(`${user.id}`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUserId(null);
    },
  });

  const onEdit = (id: number) => {
    setEditingUserId(id);
  };

  if (!Cookies.get('user')) return <p>Please log in to view users</p>;
  if (isLoading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</p>;

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
        {users.map((user) => (
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
              <EditUserForm
                user={user}
                onSave={(updatedUser) => updateUserMutation(updatedUser)}
                onCancel={() => setEditingUserId(null)}
              />
            ) : (
              <>
                <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <strong>{user.name}</strong>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <TextLinkButton label="Edit" onClick={() => onEdit(user.id)} />
                  <TextLinkButton label="Remove" onClick={() => deleteUserMutation(`${user.id}`)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
