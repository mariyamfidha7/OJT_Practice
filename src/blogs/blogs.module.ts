import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import Blog from 'src/entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
