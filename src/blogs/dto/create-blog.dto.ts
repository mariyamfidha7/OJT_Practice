import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  description: string;

  readonly userID: number;
}
