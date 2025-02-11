import { Link, useNavigate } from 'react-router-dom';
import { UsersList } from './UsersList';
import { useAuth } from '../../context/useAuth';

export const Users = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '20px',
          margin: '20px 50px 0 0',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'black' }}>{user}</span>
        <Link to="/login" onClick={logout} style={{ textDecoration: 'underline' }}>
          Logout
        </Link>
      </div>
      <UsersList />{' '}
      <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
        Add new user
      </Link>
    </>
  );
};
