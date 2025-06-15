import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
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
