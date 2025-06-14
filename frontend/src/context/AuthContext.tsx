import { createContext, useEffect, useState, type ReactNode } from "react";

import {
  authenticateUser,
  type AuthenticateUserProps,
} from "../modules/Auth/services/login";

type AuthContextType = {
  token: string | null;
  login: (newToken: AuthenticateUserProps) => void;
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
          console.log("tem token:");

          setToken(storedToken);
        } else {
          setToken(null);
          localStorage.removeItem("token");
          console.log("nao tem token:");
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
    
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
