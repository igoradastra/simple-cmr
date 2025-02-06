import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main
      style={{
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.8em', color: '#333', marginBottom: '15px' }}>404 - Page Not Found</h1>
      <Link to="/users" style={{ display: 'block', marginTop: '20px' }}>
        {'<- Show all users'}
      </Link>
    </main>
  );
};
