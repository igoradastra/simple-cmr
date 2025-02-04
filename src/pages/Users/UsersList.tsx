import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { User } from './types/Users';
import { Link } from 'react-router-dom';

export const UsersList = () => {
  const { data, loading, error, reject, isFetched } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  useEffect(() => {
    return () => reject();
  }, [reject]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Users List</h2>
      </header>
      {isFetched && (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(15rem, 1fr))', gap: '1rem' }}>
          {data?.map((user) => (
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
              <Link to={`/user/${user.id}`} state={{ user, data }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <strong>{user.name}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
