import { Route, Routes } from "react-router";
import { ProtectRoutes } from "./Utils/ProtectRotues";
import { Login } from "./modules/Auth/screens/Login";
import { useToast } from "./hooks/useToast";
import api from "./services/api";
import { useEffect } from "react";
import { Button } from "./components/Button";
import { useAuth } from "./hooks/useAuth";
import { PublicRoute } from "./Utils/PublicRoute";

function App() {
  const { showToast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          const message =
            error.response?.data?.message || "Ocorreu um erro inesperado.";

          if (status >= 300) {
            showToast(message, "error");
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />{" "}
      <Route element={<ProtectRoutes />}>
        <Route path="/" element={<Button onClick={logout}>sair</Button>} />
        <Route path="/dashboard" element={<h1>Protected Dashboard</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
