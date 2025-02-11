import { Link } from 'react-router-dom';
import { NewUser } from './NewUser';

export const NewUserPage = () => {
  return (
    <>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <section style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <NewUser />{' '}
          <Link to="/users" style={{ display: 'block', marginTop: '20px', marginLeft: '150px' }}>
            Show all users
          </Link>
        </section>
      </main>
    </>
  );
};
