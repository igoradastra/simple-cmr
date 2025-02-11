import { Control, Controller } from 'react-hook-form';

type InputFieldProps = {
  name: 'name' | 'email' | 'password';
  control: Control<{ name: string; email: string; password: string }>;
  label: string;
  type: string;
};
export const InputField = ({ name, control, label, type }: InputFieldProps) => (
  <>
    <label style={{ display: 'block', marginTop: '1rem' }}>{label}:</label>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <input {...field} type={type} style={{ width: '100%', height: '20px' }} />
          {fieldState.error && <p style={{ color: 'red', margin: '0 0 4px 0' }}>{fieldState.error.message}</p>}
        </>
      )}
    />
  </>
);
