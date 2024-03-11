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
  ValidationPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  /**
   * API URL: POST /blog
   *
   * Create blog post.
   *
   * Request body shall contain:
   *  1. title: string (mandatory)
   *  2. description: string (mandatory)
   *  3. tags: string (mandatory)
   *
   * The system shall perform the following checks:
   *   a. If title is not provided, return error message: 'Title is required'.
   *   b. If description is not provided, return error message: 'Description is required'.
   *   c. If tags is not provided, return error message: 'Tags is required'.
   *
   * If the above validations are passed:
   *   1. The system shall create a new blog post with the provided data.
   *   2. System shall associate the blog post with the authenticated user.
   *   3. System shall return the newly created blog post.
   *
   * @param {CreateBlogDto} createBlogDto - Object containing blog post details.
   * @param {string} token - Authentication token.
   * @returns {Promise<Blog>} - Newly created blog post.
   */
  @UseGuards(AuthGuard)
  @Post()
  create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.createBlog(createBlogDto, token);
  }

  /**
   * API URL: GET /blog/:offset/offset
   *
   * Retrieve a list of blog posts starting from the specified offset.
   *
   * Request query shall contain:
   *   1. offset: number
   *
   * The system shall perform the following checks:
   *   a. If no offset parameter is provided, return error message: 'Enter offset value'.
   *
   * If the above validation is passed:
   *   1. The system shall retrieve a list of blog posts starting from the specified offset.
   *
   * @param {number} offset - Offset value indicating the starting point of blog posts to retrieve.
   * @returns {Promise<Blog[]>} - Array of blog posts.
   */

  @Get(':offset/offset')
  findAll(@Param('offset') offset: number) {
    return this.blogService.findAllBlog(+offset);
  }

  /**
   * API URL: GET /blog/:id
   *
   * Retrieve details of a blog post by ID.
   *
   * Request query shall contain:
   *   1. id: number
   *
   * The system shall perform the following checks:
   *   a. If no parameter is passed, return error message: 'Enter blog ID'.
   *
   * If the above validation is passed:
   *   1. The system shall retrieve the details of the blog post with that ID.
   *   2. If a blog post does not exist with that ID, return error message: 'Blog post does not exist'.
   *
   * @param {number} id - ID of the blog post to retrieve.
   * @returns {Promise<Blog>} - Blog post object.
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.viewBlog(+id);
  }

  /**
   * API URL: PATCH /blog/:id
   *
   * Update a blog post by ID.
   *
   * Request parameters shall contain:
   *   1. id: string
   *
   * Request body shall contain:
   *   - updateBlogDto: UpdateBlogDto object
   *
   * System shall perform the following checks:
   *   a. If no id parameter is provided, return error message: 'Enter blog ID'.
   *   b. If no update data is provided, return error message: 'Provide update data'.
   *
   * If the above validations are passed:
   *   1. The system shall update the blog post with the provided ID using the provided update data.
   *   2. System shall associate the update with the authenticated user.
   *
   * @param {number} id - ID of the blog post to update.
   * @param {UpdateBlogDto} updateBlogDto - Object containing updated blog post data.
   * @param {Request} req - Request object containing headers for authentication.
   * @returns {Promise<Blog>} - Updated blog post object.
   */
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBlogDto: UpdateBlogDto,
    @Req() req,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.updateBlog(+id, updateBlogDto, token);
  }

  /**
   * API URL: DELETE /blog/:id
   *
   * Remove a blog post by ID.
   *
   * Request parameters shall contain:
   *   1. id: string
   *
   * System shall perform the following checks:
   *   a. If no id parameter is provided, return error message: 'Enter blog ID'.
   *
   * If the above validations are passed:
   *   1. The system shall remove the blog post with the provided ID.
   *   2. System shall associate the removal with the authenticated user.
   *
   * @param {number} id - ID of the blog post to remove.
   * @param {Request} req - Request object containing headers for authentication.
   * @returns {Promise<void>} - Promise indicating success of removal operation.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.blogService.removeBlog(+id, token);
  }
}
