import { useEffect } from "react";
import { useIngredients } from "../hooks/useIngredients";
import type { ControllerRenderProps } from "react-hook-form";

interface SearchIngredientsProps {
  field: ControllerRenderProps<any, any>;
  error?: string;
}

export const SearchIngredients = ({ field, error }: SearchIngredientsProps) => {
  const {
    setName,
    name,
    data,
    selectedIngredient,
    handleSelectIngredient,
    remove,
  } = useIngredients();

  useEffect(() => {
    field.onChange(selectedIngredient);
  }, [selectedIngredient]);

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="block text-sm font-medium text-gray-700">
        Buscar ingredientes
      </label>

      <input
        className={`w-full rounded-lg bg-white px-3 py-4 border-gray-300 focus:border-primary focus:ring-primary transition `}
        type="search"
        placeholder="Buscar ingredientes..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <small className="text-red-400">{error && error}</small>

      {selectedIngredient.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedIngredient.map((id) => {
            const ingredient = data?.find((item) => item?.id === id);
            return (
              <span
                key={id}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1"
              >
                {ingredient?.name}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => remove(id)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* lista */}
      {name && data && (
        <ul className="h-24 overflow-y-auto list-disc pl-5 bg-white absolute left-0 w-full mt-22 shadow z-10 list-unstyled">
          {data?.map?.((ingredient) => (
            <li
              key={ingredient?.id}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectIngredient(ingredient?.id)}
            >
              {ingredient?.name}
            </li>
          ))}
          {data?.length === 0 && (
            <li className="py-2 px-3 text-gray-500">No ingredients found</li>
          )}
        </ul>
      )}
    </div>
  );
};
