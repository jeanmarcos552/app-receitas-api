import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

export const RecipesMenu = () => {
  const { logout } = useAuth();
  return (
    <nav className="p-4 bg-primary text-white align-center flex justify-center">
      <ul className="flex gap-8 justify-center align-center">
        <li className="flex items-center">
          <Link to="/">Listar</Link>
        </li>
        <li className="flex items-center">
          <Link to="/create">Criar</Link>
        </li>
        <li className="flex items-center">
          <button type="button" className="cursor-pointer underline font-bold"  onClick={logout}>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};
