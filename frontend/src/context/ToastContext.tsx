// src/context/ToastContext.tsx
import React, { createContext, useReducer, useContext } from "react";

type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
};

type ToastState = Toast[];

type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: { id: string } };

const ToastContext = createContext<{
  state: ToastState;
  dispatch: React.Dispatch<ToastAction>;
} | null>(null);

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.payload.id);
    default:
      return state;
  }
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, []);
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToastContext must be used inside ToastProvider");
  return ctx;
};
