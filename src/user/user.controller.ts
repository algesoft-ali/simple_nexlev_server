import { Controller, Get, HttpException, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // ------ Register User
  @Post("register")
  async registerUser(@Req() req: Request) {
    try {
      const data = await this.userService.registerUser(req.body);

      return {
        success: true,
        message: "User Registered Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  // ------ Login User

  // ------ Get All User
  @Get()
  async getAllUser() {
    try {
      const data = await this.userService.getAllUser();
      return {
        success: true,
        message: "Users retrieved Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  // ------ Get One User
}
