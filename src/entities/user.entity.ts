import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Blog from './blog.entity';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
