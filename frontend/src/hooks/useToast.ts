import { v4 as uuid } from "uuid";
import { useToastContext } from "../context/ToastContext";

export const useToast = () => {
  const { dispatch } = useToastContext();

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    const id = uuid();
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", payload: { id } });
    }, 3000);
  };

  return { showToast };
};
