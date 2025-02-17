import { ButtonHTMLAttributes } from 'react';

type TextLinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const TextLinkButton = ({ label, ...props }: TextLinkButtonProps) => {
  return (
    <button
      {...props}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        textDecoration: 'underline',
        color: '#646cff',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {label}
    </button>
  );
};
