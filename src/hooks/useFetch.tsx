import { useState, useEffect, useRef } from 'react';

export const useFetch = <T,>(url: string, options?: { enabled?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!options?.enabled);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (options?.enabled) {
      setLoading(false);
      return;
    }

    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController();
    }
    const { signal } = abortControllerRef.current;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (response.status === 404) {
          throw new Error('404 - Page not found');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: T = await response.json();
        setData(result);
        setIsFetched(true);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, [options?.enabled, url]);

  const reject = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  };

  return { data, loading, error, isFetched, reject };
};
