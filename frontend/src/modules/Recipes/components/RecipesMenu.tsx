import { Link } from "react-router";

export const RecipesMenu = () => {
  return (
    <nav className="p-4 bg-primary text-white">
      <ul className="flex gap-4 justify-center">
        <li>
          <Link to="/">Listar</Link>
        </li>
        <li>
          <Link to="/create">Criar</Link>
        </li>
      </ul>
    </nav>
  );
};
