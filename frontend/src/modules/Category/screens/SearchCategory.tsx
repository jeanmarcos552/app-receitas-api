import type { ControllerRenderProps } from "react-hook-form";
import Select from "react-select";
import { useCategories } from "../hooks/useCategory";

interface SearchCategoriesProps {
  field: ControllerRenderProps<any, any>;
  error?: string;
}

export const SearchCategories = ({ field, error }: SearchCategoriesProps) => {
  const { data } = useCategories();

  const options =
    data?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const selectedOption =
    options.find((opt) => opt.value === field.value) || null;

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="block text-sm font-medium text-gray-700">
        Buscar categorias
      </label>

      <small className="text-red-400">{error}</small>

      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => field.onChange(option ? option.value : null)}
        placeholder="Selecione uma categoria"
        isClearable
      />
    </div>
  );
};
