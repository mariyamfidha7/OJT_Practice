import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Blog } from './entities/blog.entity';
// import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogsService {
  /**
   * Here, we have used data mapper approach for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;
    // blog.createdBy = await this.blogRepository.findOne(userID);
    return this.blogRepository.save(blog);
  }

  findAllBlog(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  viewBlog(id: number): Promise<Blog> {
    return this.blogRepository.findOneBy({ id });
  }

  // updateBlog(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
  //   const blog: Blog = new Blog();
  //   blog.title = updateBlogDto.title;
  //   blog.description = updateBlogDto.description;
  //   blog.id = id;
  //   return this.blogRepository.save(blog);
  // }

  removeBlog(id: number): Promise<{ affected?: number }> {
    return this.blogRepository.delete(id);
  }

  async findOne(title: string): Promise<Blog | undefined> {
    return this.blogRepository.findOne({ where: { title: title } });
  }

  async getAllBlogs(): Promise<Blog[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return this.blogRepository.find();
  }
}
