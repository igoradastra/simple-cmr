import { Link, useNavigate } from 'react-router-dom';
import { UsersList } from './UsersList';
import { useAuth } from '../../context/useAuth';
import { useEffect, useState } from 'react';
import { AuthContextType } from '../../context/AuthContext';
import { useTranslation } from "react-i18next";

export const Users = () => {
  const getAuth = useAuth();
  const [auth, setAuth] = useState<AuthContextType | null>(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAuth().then(setAuth);
  }, [getAuth]);

  useEffect(() => {
    if (auth && !auth.user) {
      navigate('/login');
    }
  }, [auth, navigate]);

  if (!auth) return <p>Loading...</p>;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '20px',
          margin: '20px 50px 0 0',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'black' }}>
          {auth.user} &nbsp;<Link to="/login" onClick={auth.logout} style={{ textDecoration: 'underline' }}>{t('Logout')}</Link>
        </span>
        <select
          onChange={handleLanguageChange}
          value={i18n.language}
          style={{ padding: '4px' }}
        >
          <option value="en">English</option>
          <option value="cz">Čeština</option>
        </select>


      </header>

      <UsersList />
      {auth && (
        <>
          <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
            {t('Add new user')}
          </Link>
          <Link to="/users-table" style={{ display: 'block', marginLeft: '40px' }}>
            {t('Display table')}
          </Link>
        </>
      )}
    </>
  );
};