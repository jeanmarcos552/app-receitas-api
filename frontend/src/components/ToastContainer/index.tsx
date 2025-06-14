import { useToastContext } from "../../context/ToastContext";

export default function ToastContainer() {
  const { state } = useToastContext();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {state.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg px-4 py-2 text-white shadow-md transition-all duration-300 ${
            {
              success: "bg-green-600",
              error: "bg-red-600",
              info: "bg-blue-600",
              warning: "bg-yellow-500 text-black",
            }[toast.type || "info"]
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
