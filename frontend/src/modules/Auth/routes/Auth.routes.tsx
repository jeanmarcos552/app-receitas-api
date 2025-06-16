import { Route } from "react-router";
import { Register } from "../screens/Register";
import { Login } from "../screens/Login";

export const AuthRoutes = () => (
  <>
    <Route index path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>
);
