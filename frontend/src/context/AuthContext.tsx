import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  authenticateUser,
  type AuthenticateUserProps,
} from "../modules/Auth/services/login";
import api from "../services/api";
import { register } from "../modules/Auth/services/register";

type AuthContextType = {
  token: string | null;
  login: (newToken: AuthenticateUserProps) => void;
  registerUser: (newToken: AuthenticateUserProps) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const [, payloadBase64] = storedToken.split(".");
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp;
        if (exp && Date.now() < exp * 1000) {
          setToken(storedToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch {
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    } else {
      setToken(null);
      setLoading(false);
    }
  }, []);

  const login = async (newToken: AuthenticateUserProps) => {
    setLoading(true);
    const resp = await authenticateUser(newToken).finally(() =>
      setLoading(false)
    );

    setToken(resp.token);
    localStorage.setItem("token", resp.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${resp.token}`;
  };

  const registerUser = async (userData: AuthenticateUserProps) => {
    setLoading(true);
    try {
      const resp = await register(userData);

      setToken(resp.token);
      localStorage.setItem("token", resp.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${resp.token}`;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = useMemo(
    () => ({ token, login, logout, loading, registerUser }),
    [token, login, logout, loading, registerUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
