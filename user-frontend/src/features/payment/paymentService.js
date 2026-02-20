import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const createOrder = async (movieId, amount) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.payment.createOrder, { movieId, amount });
  return data.data;
};

export const verifyOrder = async (payload) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.payment.verify, payload);
  return data.data;
};

export const getOrderStatus = async (orderId) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.payment.order(orderId));
  return data.data;
};
