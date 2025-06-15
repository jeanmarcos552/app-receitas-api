import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Inputs";
import { SearchIngredients } from "../../Ingredients/screens/SearchIngredients";
import { useCreateRecipes } from "../hooks/useCreateRecipes";

export const ScreenCreateRecipes = () => {
  const { form } = useCreateRecipes();

  const { register, handleSubmit, control } = form;

  return (
    <div className="container m-auto">
      <form
        onSubmit={handleSubmit((body) => console.log(body))}
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
          name="ingredients"
          control={control}
          render={({ field }) => (
            <SearchIngredients
              field={field}
              error={form.errors.ingredients?.message}
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

        <Button type="submit" variant="success">
          Criar nova delícia
        </Button>
      </form>
    </div>
  );
};
