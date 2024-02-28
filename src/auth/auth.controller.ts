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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
//   Request,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { Public } from './constants'; // Import the Public decorator

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.authService.signIn(signInDto.username, signInDto.password);
//   }

//   @UseGuards(AuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }

//   @Public() // Apply the @Public() decorator here
//   @Get()
//   findAll() {
//     return [];
//   }
// }
