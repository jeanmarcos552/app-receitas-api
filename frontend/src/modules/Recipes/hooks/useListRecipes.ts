import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/recipes";

export const queryKeyRecipes = ["recipes"] as const;

export const useListRecipes = () => {
  const { data, isFetching } = useQuery({
    queryKey: queryKeyRecipes,
    queryFn: getRecipes,
  });

  return { data, isFetching };
};
