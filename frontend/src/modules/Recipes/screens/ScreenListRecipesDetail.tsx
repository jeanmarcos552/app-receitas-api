import Banner from "@/assets/banner.png";
import { useListRecipesDetail } from "../hooks/useListRecipesDetail";
import { Link } from "react-router";

export const ScreenListRecipesDetails = () => {
  const { data, isFetching } = useListRecipesDetail();

  if (isFetching) {
    return <div>Carregando...</div>;
  }
  
  if (!data) {
    return <div>Nenhuma receita encontrada.</div>;
  }

  return (
    <main>
      <div
        className="bg-cover bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${data?.image ?? Banner})`,
          height: "200px",
        }}
      />
      <div className="flex flex-col gap-5 container mx-auto p-4">
        <header>
          <h1 className="text-2xl text-primary font-bold">{data.name}</h1>
          <p className="text-text">
            {data.description || "Nenhuma descrição disponível."}
          </p>
        </header>

        <section className="bg-secondary p-4 rounded-lg shadow-md">
          {data.ingredients && data.ingredients.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Ingredientes:</h2>
              <ul className="list-disc pl-5">
                {data.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-text">
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Ingredientes:</h2>
              <p className="text-text">Nenhum ingrediente disponível.</p>
            </div>
          )}
          {data.preparation_method && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Modo de Preparo:</h2>
              <p className="text-text">{data.preparation_method}</p>
            </div>
          )}
        </section>

        <div>
          <Link to={`/`}>
            <span className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Voltar
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};
