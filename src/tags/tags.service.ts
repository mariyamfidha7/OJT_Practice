import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
//   import { UpdateBlogDto } from './dto/update-blog.dto';
//   import { Blog } from './entities/blog.entity';

@Injectable()
export class TagsService {
  /**
   * Here, we have used data mapper approach for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const tag: Tag = new Tag();
    tag.name = createTagDto.name;
    return this.tagRepository.save(tag);
  }

  viewTag(id: number): Promise<Tag> {
    return this.tagRepository.findOne({ where: { id } });
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }
}
