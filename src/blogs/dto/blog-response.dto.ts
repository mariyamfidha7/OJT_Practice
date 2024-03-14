import { Expose } from 'class-transformer';
import Users from 'src/entities/user.entity';

export class BlogResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  tags: string[];

  @Expose()
  author: Users;
}
