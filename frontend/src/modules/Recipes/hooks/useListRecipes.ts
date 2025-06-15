import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/recipes";

export const useListRecipes = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return { data, isFetching };
};
