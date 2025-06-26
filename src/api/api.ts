import { api } from "../shared/services";

interface IUsersRegisterProps {
  name: string;
  whatsapp: string;
  id_profile: string;
  email: string;
  password: string;
}

const users = async (data: IUsersRegisterProps) => {
 try {
  const result = await api.post("/users", data);
  return result;
 } catch (error: any) {
  throw new Error(error.message);
 }
}

const _login = async (email: string, password: string) => {
  try {
    const result = await api.post("/login", {
      email,
      password,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { _login, users };
