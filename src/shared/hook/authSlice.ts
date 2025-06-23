// store/slices/authSlice.ts
import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { _login } from "../../api/api";
import { environment } from "../environment";

import { type IUser } from "../dtos";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = (() => {
  const payload = localStorage.getItem(environment.APP_NAME);

  if (payload) {
    const parsed = JSON.parse(payload);
    return {
      user: parsed.user,
      token: parsed.token,
      isAuthenticated: true,
      loading: false,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  };
})();

interface IUserResponseProps {
  user: IUser;
  token: string;
}
// thunk async login
export const login = createAsyncThunk<
  IUserResponseProps,
  SignInCredentials,
  { rejectValue: string }
>("/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await _login(email, password);
    const data = response.data;

    localStorage.setItem(
      environment.APP_NAME,
      JSON.stringify({ user: data.user, token: data.token })
    );

    return { user: data.user, token: data.token };
  } catch (err) {
    return rejectWithValue("Erro ao fazer login");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(environment.APP_NAME);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;

      localStorage.setItem(
        environment.APP_NAME,
        JSON.stringify({ token: state.token, user: action.payload })
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
