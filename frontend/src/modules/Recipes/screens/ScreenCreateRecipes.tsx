import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Inputs";
import { SearchIngredients } from "../../Ingredients/screens/SearchIngredients";
import { useCreateRecipes } from "../hooks/useCreateRecipes";
import { SearchCategories } from "../../Category/screens/SearchCategory";
import { useMutation } from "@tanstack/react-query";
import { createRecipes } from "../services/CreateRecipes";
import { useNavigate } from "react-router";

export const ScreenCreateRecipes = () => {
  const { form } = useCreateRecipes();

  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = form;

  const handleCreateRecipe = useMutation({
    mutationFn: createRecipes,
    onSuccess: () => {
      reset();
      navigate("/");
    },
  });

  return (
    <div className="container m-auto">
      <form
        onSubmit={handleSubmit((body) => {
          console.log(JSON.stringify(body, null, 2));

          handleCreateRecipe.mutate(body);
        })}
        className=" p-4 bg-secondary shadow-md rounded flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4">Create Recipe</h2>
        <Input.Text
          label="Receita"
          placeholder="Nome da receita"
          error={form.errors.name?.message}
          {...register("name")}
        />

        <Input.Text
          label="Descrição"
          placeholder="Descrição da receita"
          error={form.errors.description?.message}
          {...register("description")}
        />

        <Controller
          defaultValue={[1]}
          name="ingredients"
          control={control}
          render={({ field }) => (
            <SearchIngredients
              field={field}
              error={form.errors.ingredients?.message}
            />
          )}
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <SearchCategories
              field={field}
              error={form.errors.category_id?.message}
            />
          )}
        />

        <Input.TextArea
          label="Modo de Preparo"
          placeholder="Como preparar a receita"
          rows={4}
          error={form.errors.preparation_method?.message}
          {...register("preparation_method")}
        />

        <Button
          loading={handleCreateRecipe.isPending}
          type="submit"
          variant="success"
        >
          Criar nova delícia
        </Button>
      </form>
    </div>
  );
};
