import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container } from "./styles";
import { type RootState, type AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "../../shared/hook/authSlice";
import { useForm } from "react-hook-form";
import { InputForm } from "../../shared/components";

const SignInFormValidationSchema = zod.object({
  email: zod.string().email("Digite um email válido"),
  password: zod.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type SignInFormType = zod.infer<typeof SignInFormValidationSchema>;

export const Login: React.FC = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const methods = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = methods;

  const handleSubmitLogin = async (data: SignInFormType) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/home");
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
          <Button type="submit">Entrar</Button>
        </form>
      </Box>
    </Container>
  );
};
