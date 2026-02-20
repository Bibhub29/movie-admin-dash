import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const login = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.auth.login, payload);
  return data.data;
};

export const register = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.auth.register, payload);
  return data.data;
};
