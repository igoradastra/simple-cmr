import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFetch = <T,>(url: string, options?: { skip?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!options?.skip);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (options?.skip) {
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
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
  }, [navigate, options?.skip, url]);

  const reject = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { data, loading, error, isFetched, reject };
};
