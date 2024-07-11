import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { IUserLoginRequest, IUserResponse } from "./user.interface";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async registerUser(data: Prisma.UserCreateInput): Promise<IUserResponse> {
    const inputtedPassword = data?.password;
    // ------ hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(inputtedPassword, salt);
    data.password = hashedPassword;

    const user = await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        password: false,
        googleId: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ------ generate access token
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return { user, accessToken };
  }

  async loginUser(input: IUserLoginRequest): Promise<IUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return { user, accessToken };
  }

  async getAllUser(): Promise<Omit<User, "password">[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        password: false,
        googleId: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getSingleUser(id: number): Promise<Omit<User, "password">> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        password: false,
        googleId: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async googleLogin(req): Promise<IUserResponse> {
    let user = null;
    if (!req.user) {
      return null;
    }

    user = await this.prisma.user.findUnique({
      where: {
        email: req?.user?.email,
      },
    });

    if (!user) {
      // ------ create new user
      const data = {
        name: req?.user?.name,
        email: req?.user?.email,
        googleId: req?.user?.googleId,
        role: "user",
      } as Prisma.UserCreateInput;
      user = await this.prisma.user.create({
        data,
      });
    }

    // ------ generate access token
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return {
      accessToken,
      user,
    };
  }
}
