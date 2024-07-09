import { User } from "@prisma/client";

export interface IUserResponse {
  user: Omit<User, "password">;
  accessToken: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

