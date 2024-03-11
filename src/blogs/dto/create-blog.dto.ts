import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Title should be a string.' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  @IsNotEmpty({ message: 'Description cannot be empty.' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'UserID cannot be empty.' })
  userID: number;

  @IsString({ message: 'Tag should be a string.' })
  @IsNotEmpty({ message: 'Tag cannot be empty.' })
  tags: string;
}
