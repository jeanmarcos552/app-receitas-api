import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // or 'zod/v4'
import { Input } from "../../../components/Inputs";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/Button";
import { Icons } from "../../../icons";
import { Link } from "react-router";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

export type LoginFormData = z.infer<typeof schema>;

export const Login = () => {
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex-2 flex items-center justify-center">
      <div className="bg-secondary rounded-2xl shadow-lg w-full max-w-md p-10 gap-8 flex flex-col">
        <h1 className="text-2xl font-title text-primary mb-4 text-center">
          Bem-vindo à sua coleção de delícias!
        </h1>

        <form
          onSubmit={handleSubmit((body) => login(body))}
          className="space-y-6"
        >
          <Input.Text
            label="Email"
            type="email"
            placeholder="Digite seu email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input.Text
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            loading={loading}
            type="submit"
            iconRight={<Icons.ArrowRight size={18} />}
          >
            Entrar
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline font-semibold"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};
