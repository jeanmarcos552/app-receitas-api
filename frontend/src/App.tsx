import { Route, Routes } from "react-router";
import { ProtectRoutes } from "./Utils/ProtectRotues";
import { Login } from "./modules/Auth/screens/Login";
import { useToast } from "./hooks/useToast";
import api from "./services/api";
import { useEffect } from "react";
import { PublicRoute } from "./Utils/PublicRoute";
import { RecipesRoutes } from "./modules/Recipes/routes/Recipes.route";

function App() {
  const { showToast } = useToast();

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
      />

      <Route element={<ProtectRoutes />}>{RecipesRoutes}</Route>
    </Routes>
  );
}

export default App;
