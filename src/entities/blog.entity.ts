import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Blogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
