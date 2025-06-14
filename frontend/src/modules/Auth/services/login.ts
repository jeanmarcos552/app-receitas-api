import api from "../../../services/api";

export type AuthenticateUserProps = {
  email: string;
  password: string;
};

export type AuthenticateUserPayload = {
  token: string;
};

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserProps): Promise<AuthenticateUserPayload> {
  return await api
    .post("login", { email, password })
    .then((response) => response.data);
}
