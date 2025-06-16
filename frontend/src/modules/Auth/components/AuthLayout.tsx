import BG from "@/assets/bg_login.png";
import "./layout.css";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-row justify-content-between align-items-center flex-grow-1">
      <div
        className="flex flex-1 image-back-ground"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      />
      <Outlet />
    </div>
  );
};
