import { Controller, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // ------ Register User
  @Post()
  registerUser(@Req() req: Request) {
    const {} = req.body;
    const data = this.userService.registerUser(req.body);

    return {
      success: true,
      message: "User Registered Successfully",
      data,
    };
  }
  // ------ Login User
}
