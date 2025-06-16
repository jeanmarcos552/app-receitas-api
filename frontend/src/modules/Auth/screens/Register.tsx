import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../components/Inputs";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/Button";
import { Icons } from "../../../icons";
import { Link } from "react-router";

const schema = z
  .object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
    password_confirmation: z
      .string()
      .min(3, "Confirmação de senha deve ter pelo menos 3 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof schema>;

export const Register = () => {
  const { registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex-2 flex items-center justify-center">
      <div className="bg-secondary rounded-2xl shadow-lg w-full max-w-md p-10 gap-8 flex flex-col">
        <h1 className="text-2xl font-title text-primary mb-4 text-center">
          Crie sua conta
        </h1>

        <form
          onSubmit={handleSubmit((body) => registerUser(body))}
          className="space-y-6"
        >
          <Input.Text
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            error={errors.name?.message}
            {...register("name")}
          />

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

          <Input.Text
            label="Confirme a senha"
            type="password"
            placeholder="Confirme sua senha"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />

          <Button
            loading={loading}
            type="submit"
            iconRight={<Icons.ArrowRight size={18} />}
          >
            Registrar
          </Button>

          <p className="text-sm text-center text-gray-500">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
