import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../services/tokenService';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
