import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
  style = {},
  loading = false,
  iconLeft,
  iconRight,
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center transition-colors duration-200";
  const variantClasses = {
    primary: "w-full bg-primary hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-amber-400 text-white hover:bg-amber-600 focus:ring-amber-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    >
      {!loading && iconLeft && <span className="mr-2">{iconLeft}</span>}
      {loading ? <span>Aguarde...</span> : children}
      {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};
