import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api, { setUnauthorizedHandler } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';
import { getToken, setToken, removeToken } from '../services/tokenService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const restoreSession = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(API_ENDPOINTS.auth.me);
      console.log('✔ /api/auth/me returns', response.status);
      const profile = response?.data?.data;
      setUser(profile || null);
    } catch (err) {
      console.warn('session restore failed', err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  useEffect(() => {
    setUnauthorizedHandler(clearAuth);
    restoreSession();

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearAuth, restoreSession]);

  const login = useCallback(async (payload) => {
    const response = await api.post(API_ENDPOINTS.auth.login, payload);
    console.log('✔ Login API', response.status);
    const authData = response?.data?.data;

    if (!authData?.token) {
      throw new Error('Login failed: token missing');
    }

    setToken(authData.token);
    setUser(authData.user || null);
    return authData;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await api.post(API_ENDPOINTS.auth.register, payload);
    const authData = response?.data?.data;

    if (!authData?.token) {
      throw new Error('Register failed: token missing');
    }

    setToken(authData.token);
    setUser(authData.user || null);
    return authData;
  }, []);

  const loginAdmin = useCallback(async (payload) => {
    const response = await api.post(API_ENDPOINTS.auth.adminLogin, payload);
    const authData = response?.data?.data;

    if (!authData?.token) {
      throw new Error('Admin login failed: token missing');
    }

    setToken(authData.token);
    setUser(authData.user || null);
    return authData;
  }, []);

  const updateProfile = useCallback(async ({ name, email, password }) => {
    const payload = { name, email };
    if (password) payload.password = password;

    try {
      const response = await api.put(API_ENDPOINTS.auth.me, payload);
      const updated = response?.data?.data || payload;
      setUser((prev) => ({ ...(prev || {}), ...updated }));
      return updated;
    } catch (error) {
      if (error?.response?.status === 404 || error?.response?.status === 405) {
        setUser((prev) => ({ ...(prev || {}), ...payload }));
        return payload;
      }
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    console.log('✔ logout');
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(
    () => ({
      user,
      token: getToken(),
      loading,
      isAuthenticated: Boolean(user && getToken()),
      login,
      register,
      loginAdmin,
      restoreSession,
      updateProfile,
      logout
    }),
    [user, loading, login, register, loginAdmin, restoreSession, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
