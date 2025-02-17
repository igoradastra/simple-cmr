import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getUsers } from '../../api/users';
import { useState, useEffect } from 'react';
import { TextField } from '../../components/TextField';
import { useForm } from 'react-hook-form';

export const UsersList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: !!Cookies.get('user'),
  });

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const { control, setValue } = useForm();

  useEffect(() => {
    if (editingUserId !== null) {
      const user = users?.find((user) => user.id === editingUserId);
      if (user) {
        setValue('name', user.name);
      }
    }
  }, [editingUserId, users, setValue]);

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
              <TextField control={control} name="name" label={''} type={'text'} />
            ) : (
              <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <strong>{user.name}</strong>
              </Link>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {editingUserId === user.id ? (
                <>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textDecoration: 'underline',
                      color: '#646cff',
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.outline = 'none';
                      setEditingUserId(null);
                    }}
                    onFocus={(e) => (e.currentTarget.style.outline = 'none')}
                  >
                    OK
                  </button>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textDecoration: 'underline',
                      color: '#646cff',
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.outline = 'none';
                      setEditingUserId(null);
                    }}
                    onFocus={(e) => (e.currentTarget.style.outline = 'none')}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textDecoration: 'underline',
                      color: '#646cff',
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.outline = 'none';
                      setEditingUserId(user.id);
                    }}
                    onFocus={(e) => (e.currentTarget.style.outline = 'none')}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textDecoration: 'underline',
                      color: '#646cff',
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.outline = 'none';
                      setEditingUserId(null);
                    }}
                    onFocus={(e) => (e.currentTarget.style.outline = 'none')}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
