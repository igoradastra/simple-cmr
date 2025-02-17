import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { useCustomId } from '../hooks/useCustomId';

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export const Checkbox = <T extends FieldValues>({ name: fieldName, control, label }: CheckboxProps<T>) => {
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
      <label htmlFor={uid} style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem', marginTop: '1rem' }}>
        <input
          {...field}
          id={uid}
          type="checkbox"
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          style={{ marginRight: '0.5rem' }}
        />
        {label}
      </label>
      {error && <p style={{ color: 'red', margin: '0 0 0.5rem 0' }}>{error.message}</p>}
    </p>
  );
};
