import { useMemo } from 'react';
import { getToken } from '../services/tokenService';

export default function useAuth() {
  const token = getToken();
  return useMemo(() => ({ isAuthenticated: Boolean(token), token }), [token]);
}
