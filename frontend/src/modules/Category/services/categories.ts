import api from "../../../services/api";

export type CategoryRequest = {
  name?: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export async function getCategories(
  params?: CategoryRequest
): Promise<Category[]> {
  return await api
    .get("/category", { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw error;
    });
}
