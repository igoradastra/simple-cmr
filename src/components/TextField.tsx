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
    <fieldset style={{ border: 'none', margin: '0', padding: '0' }}>
      <label htmlFor={field.name} style={{ display: 'block', marginLeft: '5px', marginTop: '1rem' }}>
        {label}:
      </label>
      <input {...field} id={field.name} type={type} style={{ marginLeft: '5px', height: '20px' }} />
      {error && <p style={{ color: 'red', margin: '0 0 4px 0' }}>{error.message}</p>}
    </fieldset>
  );
};
