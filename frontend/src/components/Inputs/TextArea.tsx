import React from "react";

export type TextInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  type?: string;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextInputProps>(
  ({ className, id, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label && label}
        </label>
        <textarea
          ref={ref}
          className={`w-full rounded-lg bg-white px-3 py-4 border-gray-300 focus:border-primary focus:ring-primary transition ${className}`}
          {...props}
        />
        <small className="text-red-400">{error && error}</small>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
