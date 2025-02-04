import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const abortController = new AbortController();

  const navigate = useNavigate();

  useEffect(() => {
    const { signal } = abortController;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (response.status === 404) {
          navigate('/404');
          return;
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
      abortController.abort();
    };
  }, [url]);

  const reject = () => {
    abortController.abort();
  };

  return { data, loading, error, isFetched, reject };
};
