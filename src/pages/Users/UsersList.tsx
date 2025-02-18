import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { deleteUser, getUsers, updateUser } from '../../api/users';
import { User } from '../../api/types/Users';
import { UsersItem } from './UsersItem';

export const UsersList = () => {
  const queryClient = useQueryClient();
  const [editingUserIds, setEditingUserIds] = useState<number[]>([]);

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
    mutationFn: (updatedUser: User) => updateUser(`${updatedUser.id}`, updatedUser),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['users'], (oldUsers: User[] | undefined) => {
        if (!oldUsers) return [];
        return oldUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      });
      setEditingUserIds((prev) => prev.filter((id) => id !== updatedUser.id));
    },
  });

  const onEdit = (id: number) => {
    setEditingUserIds((prev) => {
      if (prev.includes(id)) return prev.filter((userId) => userId !== id);
      if (prev.length < 2) return [...prev, id];
      return prev;
    });
  };

  const onCancel = (id: number) => {
    setEditingUserIds((prev) => prev.filter((userId) => userId !== id));
  };

  if (!Cookies.get('user')) return <p>Please log in to view users</p>;
  if (isLoading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</p>;

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Users</h2>
      </header>
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', padding: '0 2rem' }}>
        {users.map((user) => (
          <UsersItem
            key={user.id}
            user={user}
            isEditing={editingUserIds.includes(user.id)}
            onEdit={onEdit}
            onCancel={onCancel}
            onDelete={deleteUserMutation}
            onSave={updateUserMutation}
          />
        ))}
      </ul>
    </>
  );
};
