import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1]; // Extracting the JWT token from the request headers
    return this.blogService.createBlog(createBlogDto, token);
  }

  @Get()
  findAll() {
    return this.blogService.findAllBlog();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.viewBlog(+id);
  }

  // @Get(':userId/user')
  // findAllBlogsByUser(@Param('userId') userId: number) {
  //   return this.blogService.findAllBlogsByUser(userId);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.updateBlog(+id, updateBlogDto, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.removeBlog(+id, token);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Body,
//   Param,
// } from '@nestjs/common';
// import { BlogsService } from './Blogs.service';
// import { Blog } from './entities/blog.entity';

// @Controller('blogs')
// export class BlogsController {
//   constructor(private blogsService: BlogsService) {}

//   @Get()
//   getAll(): Promise<Blog[]> {
//     return this.blogsService.findAll();
//   }

//   @Get(':id')
//   getOne(@Param('id') id: number): Promise<Blog> {
//     return this.blogsService.findOne(id);
//   }

//   @Post()
//   create(@Body() Blog: Blog): Promise<Blog> {
//     return this.blogsService.create(Blog);
//   }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() Blog: Blog): Promise<Blog> {
//     return this.blogsService.update(id, Blog);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.blogsService.remove(id);
//   }
// }
