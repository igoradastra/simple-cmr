import { Link } from 'react-router-dom';
import { UserDetail } from './UserDetail';

export const UserDetailPage = () => {
  return (
    <main
      style={{
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.8em', color: '#333', marginBottom: '15px' }}>User Detail Page</h1>
      <UserDetail />
      <Link to="/users" style={{ display: 'block', marginTop: '20px' }}>
        {'<- Show all users'}
      </Link>
    </main>
  );
};
