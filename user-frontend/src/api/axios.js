import axios from 'axios';
import { getToken, removeToken } from '../services/tokenService';

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

// Base API URL for user frontend
const BASE_URL = 'https://ott-tube-server.onrender.com';

console.log('axios baseURL', BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || getToken();
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.debug('axios request with token');
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn('axios 401 unauthorized, clearing token');
      removeToken();
      if (typeof onUnauthorized === 'function') {
        onUnauthorized();
      }
    }

    return Promise.reject(error);
  }
);

export default api;

