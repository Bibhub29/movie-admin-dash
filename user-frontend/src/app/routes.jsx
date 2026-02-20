import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import MoviesPage from '../features/movies/MoviesPage';
import MovieDetails from '../features/movies/MovieDetails';
import Profile from '../features/user/Profile';
import MyMovies from '../features/user/MyMovies';
import Transactions from '../features/user/Transactions';
import StreamPlayer from '../pages/StreamPlayer';
import OrderStatus from '../pages/OrderStatus';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/movies', element: <MoviesPage /> },
  { path: '/movies/:movieId', element: <MovieDetails /> },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/my-movies',
    element: (
      <ProtectedRoute>
        <MyMovies />
      </ProtectedRoute>
    )
  },
  {
    path: '/transactions',
    element: (
      <ProtectedRoute>
        <Transactions />
      </ProtectedRoute>
    )
  },
  {
    path: '/watch/:movieId',
    element: (
      <ProtectedRoute>
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
  { path: '*', element: <NotFound /> }
];

export default routes;
