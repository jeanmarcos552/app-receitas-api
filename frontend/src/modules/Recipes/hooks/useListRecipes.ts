import { useQuery } from "@tanstack/react-query";

export const useListRecipes = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      // Simulate an API call to fetch recipes
      return [
        { id: 1, title: "Recipe 1", description: "Description of Recipe 1" },
        { id: 2, title: "Recipe 2", description: "Description of Recipe 2" },
        { id: 3, title: "Recipe 3", description: "Description of Recipe 3" },
      ];
    },
  });

  return { data, isFetching };
};
