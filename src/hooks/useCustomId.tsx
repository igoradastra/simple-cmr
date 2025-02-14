import { useRef } from 'react';

let clientId = 0;

export const useCustomId = (): string => {
  const idRef = useRef<string | null>(null);

  if (idRef.current === null) {
    idRef.current = `id-${++clientId}`;
  }

  return idRef.current;
};
