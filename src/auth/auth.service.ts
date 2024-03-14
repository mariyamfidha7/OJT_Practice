import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Authenticate user based on provided credentials.
   *
   * @param {string} username - User's username.
   * @param {string} pass - User's password.
   * @returns {Promise<{ access_token: string }>} - JWT token for authenticated user.
   */
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Decode authentication token.
   *
   * @param {string} token - Authentication token.
   * @returns {Promise<any>} - Decoded token.
   */
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
