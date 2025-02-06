import { Link } from 'react-router-dom';
import { UsersList } from './UsersList';

export const Users = () => {
  return (
    <>
      <UsersList />{' '}
      <Link to="/new-user" style={{ display: 'block', marginLeft: '40px' }}>
        Add new user
      </Link>
    </>
  );
};
