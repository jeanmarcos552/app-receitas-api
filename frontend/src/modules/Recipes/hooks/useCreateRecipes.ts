import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useListRecipesDetail } from "./useListRecipesDetail";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  preparation_method: z.string().min(1, "Instruções são obrigatórias"),
  category_id: z.number().min(1, "Categoria é obrigatória"),
  ingredients: z
    .array(z.number())
    .min(1, "Pelo menos um ingrediente é obrigatório"),
});

export type RecipeFormData = z.infer<typeof schema>;

export const useCreateRecipes = () => {
  const { data, isFetching } = useListRecipesDetail();

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      preparation_method: data?.preparation_method || "",
      category_id: data?.category_id || 0,
      ingredients: data?.ingredients.map((item) => item.pivot.ingredients_id) || [],
    },
  });

  const {
    formState: { errors },
  } = form;

  return {
    form: {
      ...form,
      errors,
    },
  };
};
