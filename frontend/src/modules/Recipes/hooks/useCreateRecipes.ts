import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
});

export type RecipeFormData = z.infer<typeof schema>;

export const useCreateRecipes = () => {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
  });

  return { form };
};
