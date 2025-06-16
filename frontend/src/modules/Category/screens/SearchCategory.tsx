import { useEffect } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { useCategories } from "../hooks/useCategory";

interface SearchCategoriesProps {
  field: ControllerRenderProps<any, any>;
  error?: string;
}

export const SearchCategories = ({ field, error }: SearchCategoriesProps) => {
  const { data, selectedCategory, handleSelectCategory } = useCategories();

  useEffect(() => {
    field.onChange(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="block text-sm font-medium text-gray-700">
        Buscar categorias
      </label>

      <small className="text-red-400">{error && error}</small>

      {data && data.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {data.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`cursor-pointer text-gray-800 px-2 py-1 rounded-full flex items-center gap-1 ${
                cat.id == selectedCategory
                  ? "bg-emerald-200 hover:bg-emerald-300"
                  : "bg-gray-200 hover:bg-gray-200"
              }  `}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <span className="">{cat?.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
