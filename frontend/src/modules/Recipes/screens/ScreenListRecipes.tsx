import { Link } from "react-router";
import { useListRecipes } from "../hooks/useListRecipes";
import Banner from "@/assets/banner.png";

export const ScreenListRecipes = () => {
  const { data, isFetching } = useListRecipes();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <main>
      <div
        className=" bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${Banner})`,
          height: "600px",
        }}
      />
      <div className="flex flex-col gap-5 container mx-auto p-4">
        <header>
          <h1 className="text-2xl text-primary font-bold">
            Não é apenas receitas, são momentos
          </h1>
          <p className="text-text">
            Todos os tesouros que você pode criar com as receitas do
            <span className="text-primary font-bold"> nonna</span>.<br />
            Descubra, compartilhe e celebre a arte da culinária com nossa
            comunidade apaixonada. Junte-se a nós e transforme cada refeição em
            uma experiência inesquecível!
          </p>
        </header>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {data.map((recipe) => (
            <div
              key={recipe.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full"
                src={recipe.image || "https://placehold.co/400x200"}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{recipe.name}</div>
                <p className="text-gray-700 text-base">{recipe.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{recipe.category.name}
                </span>
                {recipe.ingredients.map((ingredient, index) => {
                  if (index < 3) {
                    return (
                      <span
                        key={ingredient.pivot.ingredients_id}
                        className="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                      >
                        {ingredient.name}
                      </span>
                    );
                  }
                })}

                <Link to={`details/${recipe.id}`}>
                  <span className="inline-block bg-teal-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    Detalhes
                  </span>
                </Link>

                <Link to={`edit/${recipe.id}`}>
                  <span className="inline-block bg-blue-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    Editar
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
