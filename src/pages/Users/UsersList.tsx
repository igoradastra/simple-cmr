import { User } from './types/Users';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const UsersList = () => {
  const {
    data: users,
    isLoading,
    error,
    isFetched,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Users List</h2>
      </header>
      {isFetched && (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(15rem, 1fr))', gap: '1rem' }}>
          {users?.map((user) => (
            <li
              key={user.id}
              style={{
                listStyle: 'none',
                textAlign: 'center',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <strong>{user.name}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
