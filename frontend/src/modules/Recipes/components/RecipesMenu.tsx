import { Link } from "react-router";

export const RecipesMenu = () => {
  return (
    <nav className="p-4 border-b bg-gray-100">
      <ul className="flex gap-4">
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
