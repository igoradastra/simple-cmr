import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersList } from './UsersList';
import { useAuth } from '../../context/useAuth';
import { AuthContextType } from '../../context/AuthContext';
import { FeaturesSwitch } from '../../components/FeaturesSwitch';

export const Users = () => {
  const getAuth = useAuth();
  const [auth, setAuth] = useState<AuthContextType | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAuth().then(setAuth);
  }, [getAuth]);

  useEffect(() => {
    if (auth && !auth.user) navigate('/login');
  }, [auth, navigate]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const renderUserFeatures = () => {
    const features = t('UserFeatures', { returnObjects: true }) as Record<string, string>;

    return Array.isArray(features)
      ? features.map((item, idx) => <li key={idx}>{item}</li>)
      : Object.entries(features).map(([key, value]) => <li key={key}>{value}</li>);
  };

  if (!auth) return <p>{t('Loading')}</p>;

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'column',
          gap: '20px',
          margin: '20px 50px 0 0',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'black' }}>
          {auth.user} &nbsp;
          <Link to="/login" onClick={auth.logout} style={{ textDecoration: 'underline' }}>
            {t('Logout')}
          </Link>
        </span>

        <select onChange={handleLanguageChange} value={i18n.language} style={{ padding: '4px' }}>
          <option value="en">English</option>
          <option value="cz">Čeština</option>
        </select>
      </header>

      <UsersList />

      <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
        {t('Add new user')}
      </Link>
      <Link to="/users-table" style={{ display: 'block', marginLeft: '40px' }}>
        {t('Display table')}
      </Link>

      <ul style={{ margin: '40px' }}>{renderUserFeatures()}</ul>
      <FeaturesSwitch />
    </>
  );
};
