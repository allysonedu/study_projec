import type React from "react";
import { Box, Button, Container } from "./styles";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { users} from '../../api/api'

import { useForm } from "react-hook-form";
import { InputForm } from "../../shared/components";

const SignUpFormValidationSchema = zod.object({
  email: zod.string().email("Digite um email válido"),
  whatsapp: zod.string().min(10, "Whatsapp deve ter no mínimo 10 caracteres"),
  id_profile: zod.string().min(1, "Id profile deve ter no mínimo 1 caracteres"),
  password: zod.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  name: zod.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
});

type SignUpFormType = zod.infer<typeof SignUpFormValidationSchema>;

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormValidationSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      id_profile: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = methods;

  const handleSubmitLogin = async (data: SignUpFormType) => {
    try {
      await users(data);
      navigate("/");
    } catch {
      alert("Erro ao fazer login");
    }
  };
  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          
          <InputForm
            margin="normal"
            required
            fullWidth
            name="name"
            label="Nome"
            control={control}
            type="name"
            id="name"
            autoComplete="current-password"
          />

           <InputForm
            margin="normal"
            required
            fullWidth
            name="whatsapp"
            label="whatsapp"
            control={control}
            type="text"
            id="whatsapp"
            autoComplete="current-whatsapp"
          />

          <InputForm 
           margin="normal"
            required
            fullWidth
            name="id_profile"
            label="Perfil"
            control={control}
            type="text"
            id="id_profile"
            autoComplete="current-id_profile"
          />

          <InputForm
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            control={control}
            type="email"
            id="email"
            autoComplete="current-email"
          />
          <InputForm
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            control={control}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button type="submit">Cadastrar</Button>
        </form>
      </Box>
    </Container>
  );
};
