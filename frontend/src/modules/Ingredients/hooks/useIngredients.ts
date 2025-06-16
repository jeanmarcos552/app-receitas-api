import { useQuery } from "@tanstack/react-query";
import { getIngredients } from "../services/ingredients";
import { useCallback, useState } from "react";


export const useIngredients = () => {
  const [name, setName] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: ["ingredients", name],
    queryFn: () => getIngredients({ name }),
  });

  const handleNameChange = useCallback((newName: string) => {
    setName(newName);
  }, []);

  const handleClearName = useCallback(() => {
    setName("");
  }, []);


  const handleRemove = (id: number) => {
    setSelectedIngredient((prev) => prev.filter((item) => item !== id));
  };

  return {
    setName: handleNameChange,
    name,
    data,
    clean: handleClearName,
    selectedIngredient,
    remove: handleRemove,
  };
};
