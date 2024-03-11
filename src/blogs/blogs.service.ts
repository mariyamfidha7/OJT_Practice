import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { JwtService } from '@nestjs/jwt';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new blog post.
   *
   * @param {CreateBlogDto} createBlogDto - Object containing blog post details.
   * @param {string} token - Authentication token.
   * @returns {Promise<Blog>} - Newly created blog post.
   */
  async createBlog(createBlogDto: CreateBlogDto, token: string): Promise<Blog> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;
    blog.createdBy = decodedToken.sub;
    blog.tags = createBlogDto.tags;
    return this.blogRepository.save(blog);
  }

  /**
   * Retrieve a list of blog posts with pagination.
   *
   * @param {number} offset - Offset value for pagination.
   * @returns {Promise<Pagination<Blog>>} - Paginated list of blog posts.
   */
  async findAllBlog(offset: number): Promise<Pagination<Blog>> {
    if (offset === undefined || isNaN(offset)) {
      throw new BadRequestException('Missing or invalid offset value');
    }
    let skip: number = 0;
    if (offset) {
      skip = offset;
    }

    const paginationOptions = {
      limit: 3,
      page: Math.floor(skip / 3) + 1,
    };

    return await paginate<Blog>(this.blogRepository, paginationOptions);
  }

  /**
   * Retrieve details of a blog post by ID.
   *
   * @param {number} id - ID of the blog post to retrieve.
   * @returns {Promise<Blog>} - Blog post object.
   */
  viewBlog(id: number): Promise<Blog> {
    return this.blogRepository.findOne({ where: { id } });
  }

  /**
   * Update a blog post by ID.
   *
   * @param {number} id - ID of the blog post to update.
   * @param {UpdateBlogDto} updateBlogDto - Object containing updated blog post data.
   * @param {string} token - Authentication token.
   * @returns {Promise<Blog>} - Updated blog post object.
   */
  async updateBlog(
    id: number,
    updateBlogDto: UpdateBlogDto,
    token: string,
  ): Promise<Blog> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.createdBy.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'You are not authorized to update this blog',
      );
    }

    if (updateBlogDto.title !== undefined) {
      blog.title = updateBlogDto.title;
    }
    if (updateBlogDto.description !== undefined) {
      blog.description = updateBlogDto.description;
    }

    return this.blogRepository.save(blog);
  }

  /**
   * Remove a blog post by ID.
   *
   * @param {number} id - ID of the blog post to remove.
   * @param {string} token - Authentication token.
   * @returns {Promise<{ affected?: number }>} - Object indicating the number of affected rows in the database.
   */
  async removeBlog(id: number, token: string): Promise<{ affected?: number }> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.createdBy.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'You are not authorized to delete this blog',
      );
    }

    return this.blogRepository.delete(id);
  }

  /**
   * Retrieve a blog post by title.
   *
   * @param {string} title - Title of the blog post to retrieve.
   * @returns {Promise<Blog | undefined>} - Blog post object.
   */
  async findOne(title: string): Promise<Blog | undefined> {
    return this.blogRepository.findOne({ where: { title: title } });
  }

  /**
   * Retrieve all blog posts.
   *
   * @returns {Promise<Blog[]>} - Array of blog posts.
   */
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  /**
   * Decode authentication token.
   *
   * @param {string} token - Authentication token.
   * @returns {Promise<any>} - Decoded token data.
   */
  private async decodeToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
