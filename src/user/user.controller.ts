import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LoginUserDTO, RegisterUserDTO } from "./user.dto";
import { UserService } from "./user.service";
import { AdminGuard } from "src/middleware/admin.guard";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // ------ Register User
  @Post("register")
  async registerUser(@Body() inputData: RegisterUserDTO) {
    try {
      const data = await this.userService.registerUser(inputData);

      return {
        success: true,
        message: "User Registered Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message || "Internal Server Error",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error }
      );
    }
  }
  // ------ Login User
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() inputData: LoginUserDTO) {
    try {
      const data = await this.userService.loginUser(inputData);
      return {
        success: true,
        message: "User Logged In Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message || "Internal Server Error",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }

  // ------ Get All User
  @Get()
  @UseGuards(AdminGuard)
  async getAllUser() {
    try {
      const data = await this.userService.getAllUser();
      return {
        success: true,
        message: "Users retrieved Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message || "Internal Server Error",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error }
      );
    }
  }
  // ------ Get One User
}
