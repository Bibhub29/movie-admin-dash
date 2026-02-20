import axiosInstance from '../services/axiosInstance';
import { API_ENDPOINTS } from '../services/apiEndpoints';

export async function getMovieStream(movieId) {
  const { data } = await axiosInstance.get(API_ENDPOINTS.movies.stream(movieId));
  return data.data;
}
