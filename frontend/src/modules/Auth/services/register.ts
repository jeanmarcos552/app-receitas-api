import api from "../../../services/api";

interface RegisterUserProps {
  email: string;
  password: string;
}

export type RegisterUserResponse = {
  token: string;
};

export async function register(
  body: RegisterUserProps
): Promise<RegisterUserResponse> {
  return await api
    .post("/register", body)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message ?? "Erro ao registrar usuário"
      );
    });
}
