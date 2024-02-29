import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];
}
