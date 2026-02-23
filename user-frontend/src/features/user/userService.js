import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function getMyMovies() {
  const response = await api.get(API_ENDPOINTS.user.myMovies);
  return response?.data?.data || [];
}

export async function getWatchData(movieId) {
  const response = await api.get(API_ENDPOINTS.user.watch(movieId));
  return response?.data?.data;
}
