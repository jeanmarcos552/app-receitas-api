import api from "../../../services/api";
import type { RecipeRequest } from "./CreateRecipes";

export type EditRecipesRequest = RecipeRequest & { id: number };

export async function editRecipes({ id, ...body }: EditRecipesRequest) {
  const response = await api
    .put(`/recipes/${id}`, body)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      throw error;
    });
  return response;
}
