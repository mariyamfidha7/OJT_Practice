import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Title should be a string.' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  @IsNotEmpty({ message: 'Description cannot be empty.' })
  description: string;

  @IsString({ message: 'Tag should be a string.' })
  @IsNotEmpty({ message: 'Tag cannot be empty.' })
  tags: string;
}
