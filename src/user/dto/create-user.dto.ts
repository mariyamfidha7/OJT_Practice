import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name should be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsInt()
  age: number;

  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;

  readonly blogs: number[];
}
