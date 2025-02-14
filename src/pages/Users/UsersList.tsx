import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getUsers } from '../../api/users';
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
        <h2>Users List</h2>
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
            <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{user.name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
