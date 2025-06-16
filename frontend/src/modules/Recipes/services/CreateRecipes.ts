import api from "../../../services/api";

type RecipeRequest = {
  name: string;
  description?: string;
  preparation_method: string;
  image?: string;
  category_id: number;
  ingredients: number[];
};

export async function createRecipes(body: RecipeRequest) {
  const response = await api
    .post("/recipes", body)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      throw error;
    });
  return response;
}
