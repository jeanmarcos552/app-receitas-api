import React from "react";
import BG from "@/assets/bg_login.png";
import "./layout.css";

export type LayoutProps = {
  children: React.ReactNode;
};

export const LayoutLogin = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-row justify-content-between align-items-center flex-grow-1">
      <div
        className="flex flex-1 image-back-ground"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      />
      {children}
    </div>
  );
};
