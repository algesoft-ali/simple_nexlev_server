import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { LoginUserDTO, RegisterUserDTO } from "./user.dto";
import { UserService } from "./user.service";

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
