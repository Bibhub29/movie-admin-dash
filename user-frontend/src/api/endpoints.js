export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    adminLogin: '/api/auth/admin/login',
    me: '/api/auth/me'
  },
  movies: {
    list: '/api/movies',
    detail: (movieId) => `/api/movies/${movieId}`,
    stream: (movieId) => `/api/movies/${movieId}/stream`
  },
  categories: '/api/categories',
  tags: '/api/tags',
  payment: {
    createOrder: '/api/payment/create-order',
    verify: '/api/payment/verify',
    order: (orderId) => `/api/payment/order/${orderId}`
  },
  user: {
    myMovies: '/api/user/my-movies',
    watch: (movieId) => `/api/user/watch/${movieId}`,
    watchStream: (movieId) => `/api/user/watch/${movieId}/stream`
  },
  admin: {
    overview: '/api/admin/dashboard/overview',
    movies: '/api/admin/movies',
    movieDetail: (movieId) => `/api/admin/movies/${movieId}`,
    users: '/api/admin/users',
    purchases: '/api/admin/purchases'
  }
};
