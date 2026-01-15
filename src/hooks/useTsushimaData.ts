import { useState, useEffect } from 'react';
import { fetchTsushimaData } from '../utils/apiService';
import type { TsushimaData } from '../types/tsushima.types';

interface UseTsushimaDataReturn {
  data: TsushimaData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useTsushimaData = (): UseTsushimaDataReturn => {
  const [data, setData] = useState<TsushimaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const tsushimaData = await fetchTsushimaData();
      setData(tsushimaData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error loading Tsushima data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: loadData,
  };
};
