import { Link, useNavigate } from 'react-router-dom';
import { UsersList } from './UsersList';
import { useAuth } from '../../context/useAuth';
import { useEffect } from 'react';

export const Users = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <header
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
      </header>
      <UsersList />
      <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
        Add new user
      </Link>
    </>
  );
};
