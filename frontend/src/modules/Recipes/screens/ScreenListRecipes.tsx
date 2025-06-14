import { useListRecipes } from "../hooks/useListRecipes";

export const ScreenListRecipes = () => {
  const { data, isFetching } = useListRecipes();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto p-4">
      <header>
        <h1 className="text-2xl text-primary font-bold">
          Não é apenas receitas, são momentos
        </h1>
        <p className="text-text">
          Todos os tesouros que você pode criar com as receitas do
          <span className="text-primary font-bold"> nonna</span>.<br/>
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
              src="https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_2480-Frango-assado-com-salsa-e-cebolinha-1.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
