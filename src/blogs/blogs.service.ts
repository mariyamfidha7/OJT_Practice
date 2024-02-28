import {
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
// import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogsService {
  /**
   * Here, we have used data mapper approach for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly jwtService: JwtService,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto, token: string): Promise<Blog> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;
    blog.createdBy = decodedToken.sub;
    return this.blogRepository.save(blog);
  }

  findAllBlog(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  viewBlog(id: number): Promise<Blog> {
    return this.blogRepository.findOne({ where: { id } });
  }

  async updateBlog(
    id: number,
    updateBlogDto: UpdateBlogDto,
    token: string,
  ): Promise<Blog> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    // const blog = await this.blogRepository.findOne({ where: { id } });
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['createdBy'], // Specify the relation to include
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.createdBy.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'You are not authorized to update this blog',
      );
    }

    // Perform partial update based on fields provided in the DTO
    if (updateBlogDto.title !== undefined) {
      blog.title = updateBlogDto.title;
    }
    if (updateBlogDto.description !== undefined) {
      blog.description = updateBlogDto.description;
    }

    return this.blogRepository.save(blog);
  }

  async removeBlog(id: number, token: string): Promise<{ affected?: number }> {
    const decodedToken = await this.decodeToken(token);
    if (!decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['createdBy'], // Specify the relation to include
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

  // async findAllBlogsByUser(userId: number): Promise<Blog[]> {
  //   const allBlogs = await this.blogRepository.find();
  //   return allBlogs.filter((blog) => blog.createdBy.id === userId);
  // }

  async findOne(title: string): Promise<Blog | undefined> {
    return this.blogRepository.findOne({ where: { title: title } });
  }

  async getAllBlogs(): Promise<Blog[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return this.blogRepository.find();
  }

  private async decodeToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
