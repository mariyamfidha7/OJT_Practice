import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { jwtConstants } from './constants';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, UserService], // Ensure UserService is included here
//   exports: [AuthService], // if AuthService needs to be exported
// })
// export class AuthModule {}
