import { type IUser } from "./IUser";

export interface ILogin {
  token: string;
  user: IUser;
}
