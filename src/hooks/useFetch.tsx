import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFetch = <T,>(url: string, options?: { enabled?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!options?.enabled);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (options?.enabled) {
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
      abortController.abort();
    };
  }, [navigate, options?.enabled, url]);

  const reject = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { data, loading, error, isFetched, reject };
};
