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
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.createBlog(createBlogDto, token);
  }

  @Get(':offset/offset')
  findAll(@Param('offset') offset: number) {
    return this.blogService.findAllBlog(+offset);
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
