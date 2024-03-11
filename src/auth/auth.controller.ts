import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * API URL : /auth/login
   *
   * @param {Record<string, any>} signInDto - Object containing user credentials (username, password).
   * @returns {Promise<string>} - JWT token for authenticated user.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  /**
   * API URL : /auth/profile
   *
   * @param {Request} req - Request object containing JWT token for authentication.
   * @returns {Promise<User>} - User profile details.
   */
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
