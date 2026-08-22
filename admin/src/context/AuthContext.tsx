import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, tokenStore, ApiError } from "@/lib/api";
import type { User } from "@/lib/types";

type AuthState = {
  user: User | null;
  /** True until the stored token has been checked against the API. */
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  // Restore the session from the stored token on first paint.
  useEffect(() => {
    let cancelled = false;

    if (!tokenStore.get()) {
      setLoading(false);
      return;
    }

    api
      .get<User>("/api/auth/me")
      .then(({ data }) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) clearSession();
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  // Any 401 from anywhere in the app ends the session immediately.
  useEffect(() => {
    window.addEventListener("admin:unauthorized", clearSession);
    return () => window.removeEventListener("admin:unauthorized", clearSession);
  }, [clearSession]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<{ token: string; user: User }>("/api/auth/login", {
      email,
      password,
    });
    tokenStore.set(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    // The cookie is best-effort — the local token is what actually matters.
    await api.post("/api/auth/logout").catch((error) => {
      if (!(error instanceof ApiError)) throw error;
    });
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, loading, login, logout, setUser }),
    [user, loading, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
