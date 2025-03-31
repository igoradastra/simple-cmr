import { createContext, ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextLinkButton } from '../../components/TextLinkButton';
import { EditUserForm } from './UserFormEdit';
import { User } from '../../api/types/Users';

interface UsersItemContextType {
  user: User;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onDelete: (id: string) => void;
  onSave: (updatedUser: User) => void;
}

const UsersItemContext = createContext<UsersItemContextType | undefined>(undefined);

const useUsersItemContext = () => {
  const context = useContext(UsersItemContext);
  if (!context) {
    throw new Error('UsersItem compound components must be used within a UsersItem');
  }
  return context;
};

type UsersItemRootProps = {
  user: User;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onDelete: (id: string) => void;
  onSave: (updatedUser: User) => void;
  children: ReactNode;
}

const UsersItemRoot = ({
  user,
  isEditing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
  children,
}: UsersItemRootProps) => {
  return (
    <UsersItemContext.Provider
      value={{ user, isEditing, onEdit, onCancel, onDelete, onSave }}
    >
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
        {children}
      </li>
    </UsersItemContext.Provider>
  );
};

const Edit = () => {
  const { user, onSave, onCancel } = useUsersItemContext();
  return <EditUserForm user={user} onSave={onSave} onCancel={() => onCancel(user.id)} />;
};

const View = () => {
  const { user } = useUsersItemContext();
  return (
    <Link to={`/user/${user.id}`} state={{ user }} style={{ textDecoration: 'none', color: 'inherit' }}>
      <strong>{user.name}</strong>
    </Link>
  );
};

const Actions = () => {
  const { user, onEdit, onDelete } = useUsersItemContext();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      <TextLinkButton label="Edit" onClick={() => onEdit(user.id)} />
      <TextLinkButton label="Remove" onClick={() => onDelete(`${user.id}`)} />
    </div>
  );
};

export const UsersItem = Object.assign(
  ({ user, isEditing, onEdit, onCancel, onDelete, onSave }: Omit<UsersItemRootProps, 'children'>) => {
    return (
      <UsersItemRoot
        user={user}
        isEditing={isEditing}
        onEdit={onEdit}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
      >
        {isEditing ? <UsersItem.Edit /> : (
          <>
            <UsersItem.View />
            <UsersItem.Actions />
          </>
        )}
      </UsersItemRoot>
    );
  },
  {
    Root: UsersItemRoot,
    Edit,
    View,
    Actions,
  }
);