import api from "../../../services/api";

export interface RecipeCategory {
  id: number;
  name: string;
  description: string;
  image: string | null;
  preparation_method: string;
  user_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  category: {
    name: string;
    id: number;
  };
  ingredients: {
    name: string;
  }[];
}
export async function getRecipesDetails(id: number): Promise<RecipeCategory> {
  const response = await api
    .get(`/recipes/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      throw error;
    });
  return response;
}
