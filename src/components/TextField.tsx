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
    rules: { required: 'This field is required' },
  });

  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
      <label htmlFor={name} style={{ display: 'block', marginLeft: '0.5rem', marginTop: '1rem' }}>
        {label}:
      </label>
      <input
        {...field}
        id={name}
        type={type}
        style={{ border: '1px solid #858585', borderRadius: '4px', marginLeft: '0.5rem', height: '1.5rem' }}
      />
      {error && <p style={{ color: 'red', margin: '0 0 0.5rem 0' }}>{error.message}</p>}
    </fieldset>
  );
};
