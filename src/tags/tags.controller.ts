import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto'; // Assuming you have a DTO for creating tags

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    // Extracting the JWT token from the request headers
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.getAllTags();
  }
}
