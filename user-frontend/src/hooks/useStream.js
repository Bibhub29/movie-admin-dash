import { useEffect, useState } from 'react';
import api from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export async function getMovieStream(movieId) {
  try {
    const watchResponse = await api.get(API_ENDPOINTS.user.watch(movieId));
    if (watchResponse?.data?.data?.watchLink) {
      return { streamUrl: watchResponse.data.data.watchLink };
    }
  } catch (error) {
    if (error?.response?.status !== 404) {
      throw error;
    }
  }

  const streamResponse = await api.get(API_ENDPOINTS.movies.stream(movieId));
  return { streamUrl: streamResponse?.data?.data?.hlsPlaylistUrl };
}

export default function useStream(movieId) {
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) return;

    let isActive = true;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getMovieStream(movieId);
        if (isActive) setStreamUrl(data.streamUrl || '');
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Unable to load stream');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, [movieId]);

  return { streamUrl, loading, error };
}
