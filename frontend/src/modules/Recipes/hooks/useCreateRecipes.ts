import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useListRecipesDetail } from "./useListRecipesDetail";
import { useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipes, type RecipeRequest } from "../services/CreateRecipes";
import { editRecipes, type EditRecipesRequest } from "../services/EditRecipes";
import { queryKeyRecipes } from "./useListRecipes";

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
  const { data, id } = useListRecipesDetail();
  const queryClient = useQueryClient();

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      preparation_method: "",
      category_id: 0,
      ingredients: [],
    },
  });

  function onSuccess() {
    form.reset();
    queryClient?.invalidateQueries({ queryKey: queryKeyRecipes });
  }

  const handleCreateRecipe = useMutation({
    mutationFn: createRecipes,
    onSuccess,
  });

  const handleEditRecipe = useMutation({
    mutationFn: (body: EditRecipesRequest) => editRecipes(body),
    onSuccess,
  });

  const handleSendRecipe = useCallback(
    (body: RecipeFormData) => {
      if (id) {
        handleEditRecipe.mutate({
          id: +id,
          ...body,
        });
      } else {
        handleCreateRecipe.mutate(body as RecipeRequest);
      }
    },
    [handleCreateRecipe, handleEditRecipe, id]
  );

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        preparation_method: data.preparation_method || "",
        category_id: data.category_id || 0,
        ingredients:
          data.ingredients?.map((item) => item.pivot.ingredients_id) || [],
      });
    }
  }, [data, form]);

  const {
    formState: { errors },
  } = form;

  return {
    form: {
      ...form,
      errors,
    },
    handleSendRecipe,
    loading: handleCreateRecipe.isPending || handleEditRecipe.isPending,
  };
};
