import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const getCategories = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.categories);
  return data.data || [];
};
