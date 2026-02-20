import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const getProfile = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.user.profile);
  return data.data;
};

export const getMyMovies = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.user.myMovies);
  return data.data;
};
