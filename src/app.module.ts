import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from './blogs/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Blog],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
