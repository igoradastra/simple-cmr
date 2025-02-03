import { useState, useEffect } from 'react';

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const abortController = new AbortController();

  useEffect(() => {
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
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
      abortController.abort();
    };
  }, [url]);

  const reject = () => {
    abortController.abort();
  };

  return { data, loading, error, isFetched, reject };
};
