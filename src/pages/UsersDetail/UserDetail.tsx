import { useLocation, useParams } from 'react-router-dom';
import { User } from '../Users/types/Users';
import { useFetch } from '../../hooks/useFetch';

export const UserDetail = () => {
  const location = useLocation();
  const { user: initialUser } = location.state || {};
  const { id } = useParams();

  const {
    data: fetchedUser,
    loading,
    error,
  } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`, { skip: !!initialUser });

  const user = initialUser ?? fetchedUser;

  if (!initialUser) {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <section className="user-not-found">User not found</section>;
  }

  return (
    <section
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <header style={{ textAlign: 'center', fontSize: '1.5em', color: '#333', marginBottom: '15px' }}>
        Details for {user.name}
      </header>
      <article style={{ paddingLeft: '10px' }}>
        <p style={{ margin: '8px 0', color: '#555' }}>
          Email: <span>{user.email}</span>
        </p>
        <p style={{ margin: '8px 0', color: '#555' }}>
          City: <span>{user.address.city}</span>
        </p>
      </article>
    </section>
  );
};
