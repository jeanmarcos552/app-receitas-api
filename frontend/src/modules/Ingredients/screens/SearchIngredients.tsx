import { useIngredients } from "../hooks/useIngredients";
import type { ControllerRenderProps } from "react-hook-form";
import Select from "react-select";

interface SearchIngredientsProps {
  field: ControllerRenderProps<any, any>;
  error?: string;
}

export const SearchIngredients = ({ field, error }: SearchIngredientsProps) => {
  const { data } = useIngredients();

  const options =
    data?.map((ingredient) => ({
      value: ingredient.id,
      label: ingredient.name,
    })) || [];

  const value = options.filter(option =>
    Array.isArray(field.value)
      ? field.value.includes(option.value)
      : field.value === option.value
  );

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="block text-sm font-medium text-gray-700">
        Buscar ingredientes
      </label>

      <Select
        isMulti
        options={options}
        placeholder="Buscar ingredientes..."
        classNamePrefix="react-select"
        noOptionsMessage={() => "No ingredients found"}
        value={value}
        onChange={selected => {
          field.onChange(
            Array.isArray(selected)
              ? selected.map(option => option.value)
              : []
          );
        }}
        onBlur={field.onBlur}
        name={field.name}
      />

      <small className="text-red-400">{error && error}</small>
    </div>
  );
};
