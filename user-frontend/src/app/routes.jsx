import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import MoviesPage from '../features/movies/MoviesPage';
import MovieDetails from '../features/movies/MovieDetails';
import Profile from '../features/user/Profile';
import MyMovies from '../features/user/MyMovies';
import StreamPlayer from '../pages/StreamPlayer';
import OrderStatus from '../pages/OrderStatus';
import ProtectedRoute from './ProtectedRoute';
import AdminLogin from '../features/admin/AdminLogin';
import AdminLayout from '../features/admin/AdminLayout';
import AdminOverview from '../features/admin/AdminOverview';
import AdminMovies from '../features/admin/AdminMovies';
import AdminUsers from '../features/admin/AdminUsers';
import AdminPurchases from '../features/admin/AdminPurchases';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/movies', element: <MoviesPage /> },
  { path: '/movies/:movieId', element: <MovieDetails /> },
  {
    path: '/profile',
    element: (
      <ProtectedRoute role="user">
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/my-movies',
    element: (
      <ProtectedRoute role="user">
        <MyMovies />
      </ProtectedRoute>
    )
  },
  {
    path: '/watch/:movieId',
    element: (
      <ProtectedRoute role="user">
        <StreamPlayer />
      </ProtectedRoute>
    )
  },
  {
    path: '/order-status/:orderId',
    element: (
      <ProtectedRoute>
        <OrderStatus />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'movies', element: <AdminMovies /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'purchases', element: <AdminPurchases /> }
    ]
  },
  { path: '*', element: <NotFound /> }
];

export default routes;
