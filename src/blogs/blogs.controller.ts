import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAllBlog();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.viewBlog(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogService.updateUser(+id, updateBlogDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.removeBlog(+id);
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
