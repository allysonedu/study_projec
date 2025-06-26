import { api } from "../shared/services";

interface IUsersRegisterProps {
  name: string;
  email: string;
  password: string;
  
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

export { _login };
