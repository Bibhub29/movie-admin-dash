import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function getOverview() {
  const response = await api.get(API_ENDPOINTS.admin.overview);
  return response?.data?.data;
}

export async function getAdminMovies() {
  const response = await api.get(API_ENDPOINTS.admin.movies);
  return response?.data?.data || [];
}

export async function createAdminMovie(formData) {
  const response = await api.post(API_ENDPOINTS.admin.movies, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response?.data?.data;
}

export async function updateAdminMovie(movieId, formData) {
  const response = await api.put(API_ENDPOINTS.admin.movieDetail(movieId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response?.data?.data;
}

export async function deleteAdminMovie(movieId) {
  const response = await api.delete(API_ENDPOINTS.admin.movieDetail(movieId));
  return response?.data;
}

export async function getAdminUsers() {
  const response = await api.get(API_ENDPOINTS.admin.users);
  return response?.data?.data || [];
}

export async function getAdminPurchases() {
  const response = await api.get(API_ENDPOINTS.admin.purchases);
  return response?.data?.data || [];
}
