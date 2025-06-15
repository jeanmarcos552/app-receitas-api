import { Button } from "../../../components/Button";
import { Input } from "../../../components/Inputs";
import { useCreateRecipes } from "../hooks/useCreateRecipes";

export const ScreenCreateRecipes = () => {
  const { form } = useCreateRecipes();

  const { register, handleSubmit } = form;

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
          {...register("name")}
        />

        <Input.Text
          label="Descrição"
          placeholder="Descrição da receita"
          {...register("description")}
        />

        {/* INGREDIENTES */}

        <Input.TextArea
          label="Modo de Preparo"
          placeholder="Como preparar a receita"
          rows={4}
          {...register("instructions")}
        />

        <Button type="submit" variant="success">
          Criar nova delícia
        </Button>
      </form>
    </div>
  );
};
