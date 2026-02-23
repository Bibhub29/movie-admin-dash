import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function fetchMovies(params = {}) {
  const response = await api.get(API_ENDPOINTS.movies.list, { params });
  return response?.data?.data;
}

export async function fetchMovieDetails(movieId) {
  const response = await api.get(API_ENDPOINTS.movies.detail(movieId));
  return response?.data?.data;
}
