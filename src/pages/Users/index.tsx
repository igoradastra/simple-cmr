import { Link, useNavigate } from 'react-router-dom';
import { UsersList } from './UsersList';
import { useAuth } from '../../context/useAuth';
import { useEffect, useState } from 'react';
import { AuthContextType } from '../../context/AuthContext';

export const Users = () => {
  const getAuth = useAuth();
  const [auth, setAuth] = useState<AuthContextType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().then(setAuth);
  }, [getAuth]);

  useEffect(() => {
    if (auth && !auth.user) {
      navigate('/login');
    }
  }, [auth, navigate]);

  if (!auth) return <p>Loading...</p>;

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
        <span style={{ fontWeight: 'bold', color: 'black' }}>{auth.user}</span>
        <Link to="/login" onClick={auth.logout} style={{ textDecoration: 'underline' }}>
          Logout
        </Link>
      </header>
      <UsersList />
      {auth && (
        <>
          <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
            Add new user
          </Link>
          <Link to="/users-table" style={{ display: 'block', marginLeft: '40px' }}>
            Display table
          </Link>
        </>

      )}
    </>
  );
};
