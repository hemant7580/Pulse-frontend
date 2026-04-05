import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'mini_social_token';
const USER_KEY = 'mini_social_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t && u) {
      try {
        setToken(t);
        setUser(JSON.parse(u));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setReady(true);
  }, []);

  const persistSession = useCallback((t, u) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(t);
    setUser(u);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await api.login({ email, password });
      persistSession(data.token, data.user);
      return data;
    },
    [persistSession]
  );

  const signup = useCallback(
    async (email, username, password) => {
      const data = await api.signup({ email, username, password });
      persistSession(data.token, data.user);
      return data;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      isAuthenticated: Boolean(token && user),
      login,
      signup,
      logout,
    }),
    [user, token, ready, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
