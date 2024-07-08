import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    const inputtedPassword = data?.password;
    // ------ hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(inputtedPassword, salt);
    data.password = hashedPassword;

    return this.prisma.user.create({
      data,
    });
  }

  async getAllUser(): Promise<Omit<User, "password">[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        password: false,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
