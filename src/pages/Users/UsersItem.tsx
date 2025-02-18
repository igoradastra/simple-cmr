import { Link } from 'react-router-dom';
import { TextLinkButton } from '../../components/TextLinkButton';
import { EditUserForm } from './UserFormEdit';
import { User } from '../../api/types/Users';

interface UsersItemProps {
  user: User;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onDelete: (id: string) => void;
  onSave: (updatedUser: User) => void;
}

export const UsersItem = ({ user, isEditing, onEdit, onCancel, onDelete, onSave }: UsersItemProps) => {
  return (
    <li
      style={{
        listStyle: 'none',
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        minWidth: '15rem',
        flex: '1 1 calc(20% - 1rem)',
        maxWidth: '20%',
      }}
    >
      {isEditing ? (
        <EditUserForm user={user} onSave={onSave} onCancel={() => onCancel(user.id)} />
      ) : (
        <>
          <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{user.name}</strong>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <TextLinkButton label="Edit" onClick={() => onEdit(user.id)} />
            <TextLinkButton label="Remove" onClick={() => onDelete(`${user.id}`)} />
          </div>
        </>
      )}
    </li>
  );
};
