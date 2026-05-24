import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type AuthUser = {
  id: string;
  email: string;
  handle: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const SESSION_KEY = '_session';

function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function writeSession(user: AuthUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(readSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Persists a local session; real backend call can be wired here later.
    const newUser: AuthUser = {
      id: btoa(email),
      email,
      handle: email.split('@')[0],
    };
    writeSession(newUser);
    setUser(newUser);
  }, []);

  const signup = useCallback(async (email: string, _password: string) => {
    const newUser: AuthUser = {
      id: btoa(email),
      email,
      handle: email.split('@')[0],
    };
    writeSession(newUser);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
