import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../api/types/Users';
import { TextField } from '../../components/TextField';
import { TextLinkButton } from '../../components/TextLinkButton';

type FormData = {
  name: string;
};

type EditUserFormProps = {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
};

export const EditUserForm = ({ user, onSave, onCancel }: EditUserFormProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { name: user.name },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSave({ ...user, name: data.name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField control={control} name="name" label="" type="text" />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <TextLinkButton label="Save" type="submit" />
        <TextLinkButton label="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};
