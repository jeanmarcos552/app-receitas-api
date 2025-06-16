import { useQuery } from "@tanstack/react-query";
import { getRecipesDetails } from "../services/recipesDetails";
import { useParams } from "react-router";

export const useListRecipesDetail = () => {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["recipesDetail", id],
    queryFn: () => getRecipesDetails(+id!),
    enabled: !!id,
  });

  return { data, isFetching };
};
