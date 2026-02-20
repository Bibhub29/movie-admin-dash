import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const fetchMovies = async (params = {}) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.movies.list, { params });
  return data.data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.movies.detail(movieId));
  return data.data;
};
