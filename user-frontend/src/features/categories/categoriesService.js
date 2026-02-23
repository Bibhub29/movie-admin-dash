import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function getCategories() {
  const response = await api.get(API_ENDPOINTS.categories);
  return response?.data?.data || [];
}
