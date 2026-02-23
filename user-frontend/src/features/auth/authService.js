import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function login(payload) {
  const response = await api.post(API_ENDPOINTS.auth.login, payload);
  return response?.data?.data;
}

export async function register(payload) {
  const response = await api.post(API_ENDPOINTS.auth.register, payload);
  return response?.data?.data;
}

export async function adminLogin(payload) {
  const response = await api.post(API_ENDPOINTS.auth.adminLogin, payload);
  return response?.data?.data;
}
