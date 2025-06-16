import api from "../../../services/api";

type Ingredient = {
  name: string;
  pivot: {
    recipe_id: number;
    ingredients_id: number;
  };
};

type Category = {
  name: string;
  id: number;
};

type Recipe = {
  id: number;
  name: string;
  description: string;
  preparation_method: string;
  category_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
  category: Category;
  image?: string;
  ingredients: Ingredient[];
};
export async function getRecipes(): Promise<Recipe[]> {
  const response = await api
    .get("/recipes")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      throw error;
    });
  return response;
}
