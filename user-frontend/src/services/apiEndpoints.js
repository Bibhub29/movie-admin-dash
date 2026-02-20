export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    me: '/api/auth/me'
  },
  movies: {
    list: '/api/movies',
    detail: (id) => `/api/movies/${id}`,
    stream: (id) => `/api/movies/${id}/stream`
  },
  categories: '/api/categories',
  payment: {
    createOrder: '/api/payment/create-order',
    verify: '/api/payment/verify',
    order: (id) => `/api/payment/order/${id}`
  },
  user: {
    profile: '/api/auth/me',
    myMovies: '/api/user/my-movies',
    transactions: '/api/admin/purchases'
  }
};
