import { useEffect, useRef, useState, useCallback } from 'react';
import { Movie } from '~/types/movie';


export default function useFetchMovies(inputValue: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const abortControllerRef = useRef<AbortController | null>(null);
  
    const fetchMovies = useCallback(async () => {
      
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      
      if (!inputValue.trim()) {
        setMovies([]);
        return;
      }
  
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch(
          `${apiUrl}/movies/search?title=${encodeURIComponent(inputValue)}`,
          { signal: abortControllerRef.current.signal }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
  
        const movies: Movie[] = await response.json();
        setMovies(movies);
      } catch (e: any) {
        if (e.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }, [inputValue]);
  
    useEffect(() => {
      fetchMovies();
  
      return () => {
        abortControllerRef.current?.abort();
      };
    }, [fetchMovies]);
  
    return { movies, isLoading, error };
  }
  