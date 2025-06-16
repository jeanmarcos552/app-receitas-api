import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getCategories } from "../services/categories";

export const useCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const handleSelectCategory = useCallback(
    (id: number) => {
      if (id === selectedCategory) {
        return;
      }

      setSelectedCategory(id);
    },
    [selectedCategory]
  );

  const handleRemove = () => {
    setSelectedCategory(undefined);
  };

  return {
    data,
    selectedCategory,
    handleSelectCategory,
    remove: handleRemove,
  };
};
