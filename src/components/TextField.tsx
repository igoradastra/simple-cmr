import { useController, Control, FieldValues, Path } from 'react-hook-form';

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: 'password' | 'email' | 'text';
};

export const TextField = <T extends FieldValues>({ name, control, label, type }: TextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules: {
      required: 'This field is required',
    },
  });

  return (
    <>
      <label style={{ display: 'block', marginTop: '1rem' }}>{label}:</label>
      <input {...field} type={type} style={{ width: '100%', height: '20px' }} />
      {error && <p style={{ color: 'red', margin: '0 0 4px 0' }}>{error.message}</p>}
    </>
  );
};
