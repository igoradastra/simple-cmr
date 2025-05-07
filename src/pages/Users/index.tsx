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

  if (!auth) return <p>{t('Loading')}</p>;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const renderUserFeatures = () => {
    const features = t('UserFeatures', { returnObjects: true });
    console.log('Features from i18n:', features);
  
    const fallbackFeatures = {
      addUser: i18n.language === 'cz' ? "Možnost přidání nového uživatele" : "Option to add a new user",
      userList: i18n.language === 'cz' ? "Zobrazení seznamu uživatelů" : "View user list",
      changeLanguage: i18n.language === 'cz' ? "Změna jazyka aplikace" : "Change application language",
      logout: i18n.language === 'cz' ? "Odhlášení ze systému" : "Logout from the system"
    };
  
    if (typeof features === 'string') {
      console.warn('Using fallback features due to i18n configuration issue');
      return Object.entries(fallbackFeatures).map(([key, value]) => (
        <li key={key}>{value}</li>
      ));
    }
  
    if (features && typeof features === 'object' && !Array.isArray(features)) {
      return Object.entries(features).map(([key, value]) => (
        <li key={key}>{String(value)}</li>
      ));
    }
  
    return <li>{t('Loading')}</li>;
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
          <ul style={{ margin: '40px' }}>
            {renderUserFeatures()}
          </ul>
        </>
      )}
    </>
  );
};