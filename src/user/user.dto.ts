import { UserRole } from "@prisma/client";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  role: UserRole;
}

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
