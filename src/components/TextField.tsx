// import { useId } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { useCustomId } from '../hooks/useCustomId';

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: 'password' | 'email' | 'text';
};

export const TextField = <T extends FieldValues>({ name: fieldName, control, label, type }: TextFieldProps<T>) => {
  // const uid = useId()
  const uid = useCustomId();
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name: fieldName,
    control,
    rules: { required: `${label} is required` },
  });

  return (
    <p style={{ border: 'none', margin: 0, padding: 0 }}>
      <label htmlFor={uid} style={{ display: 'block', marginLeft: '0.5rem', marginTop: '1rem' }}>
        {label}
      </label>
      <input
        {...field}
        id={uid}
        type={type}
        style={{
          border: '1px solid #858585',
          borderRadius: '4px',
          marginLeft: '0.5rem',
          height: '1.5rem',
        }}
        autoFocus
      />
      {error && <p style={{ color: 'red', margin: '0 0 0.5rem 0' }}>{error.message}</p>}
    </p>
  );
};
