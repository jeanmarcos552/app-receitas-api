import api from "../../../services/api";

export type IngredientRequest = {
  name?: string;
};

export type Ingredient = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};



export async function getIngredients(
  params?: IngredientRequest
): Promise<Ingredient[]> {
  return await api
    .get("/ingredients", { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching ingredients:", error);
      throw error;
    });
}
