import { Link } from 'react-router-dom';
import { NewUser } from './NewUser';

export const NewUserPage = () => {
  return (
    <>
      <NewUser />{' '}
      <Link to="/users" style={{ display: 'block', marginTop: '20px', marginLeft: '150px' }}>
        Show all users
      </Link>
    </>
  );
};
