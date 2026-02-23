import api from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

export async function createOrder(movieId, amount) {
  const response = await api.post(API_ENDPOINTS.payment.createOrder, { movieId, amount });
  return response?.data?.data;
}

export async function verifyOrder(payload) {
  const response = await api.post(API_ENDPOINTS.payment.verify, payload);
  return response?.data?.data;
}

export async function getOrderStatus(orderId) {
  const response = await api.get(API_ENDPOINTS.payment.order(orderId));
  return response?.data?.data;
}
