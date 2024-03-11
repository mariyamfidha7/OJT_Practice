import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Function to create user details.
   *
   * Request body shall contain:
   *  1. name: string (mandatory, max length: 30)
   *  2. username: string (mandatory, max length: 15)
   *  3. email: string (mandatory, unique, max length: 40)
   *  4. age: number
   *  5. password: string (mandatory)
   *  6. gender: string
   *
   * System shall perform the following checks:
   *   a. If mandatory fields are not provided, return error message: '<Field Name> is required'.
   *   b. If the email address provided is not in a valid format, return error message: 'Please provide valid Email'.
   *   c. If the email address already exists, return error message: 'Email Address already exists'.
   *   d. If the username has characters other than alphanumeric, return error message: 'Username does not allow other than alphanumeric chars'.
   *   e. If the password does not meet the complexity requirements (minimum 8 characters including number, special character, upper and lowercase), return error message: 'Use stronger password'.
   *
   * If the above validations are passed:
   *   1. Save the details to the database.
   *   2. Return the newly created user.
   *
   * @param {CreateUserDto} createUserDto - Object containing user details.
   * @returns {Promise<User>} - Newly created user.
   */
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  /**
   * Function to retrieve all users.
   *
   * System shall return a list of all users.
   *
   * @returns {Promise<User[]>} - Array of user objects.
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Function to view user details by ID.
   *
   * System shall retrieve user details by ID.
   *
   * @param {number} id - The ID of the user to be viewed.
   * @returns {Promise<User>} - User object corresponding to the provided ID.
   */
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Function to update user details by ID.
   *
   * Request body shall contain:
   *  1. name: string (optional, max length: 30)
   *  2. username: string (optional, max length: 15)
   *  3. email: string (optional, unique, max length: 40)
   *  4. age: number (optional)
   *  5. password: string (optional)
   *
   * System shall update the specified user with provided details.
   *
   * @param {number} id - The ID of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - Object containing updated user details.
   * @returns {Promise<User>} - Updated user object.
   */
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  /**
   * Function to remove a user by ID.
   *
   * System shall remove the user with the provided ID.
   *
   * @param {number} id - The ID of the user to be removed.
   * @returns {Promise<{ affected?: number }>} - Object indicating the number of affected rows in the database.
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  /**
   * Function to find a user by username.
   *
   * System shall retrieve the user with the provided username.
   *
   * @param {string} username - The username of the user to be found.
   * @returns {Promise<User | undefined>} - User object corresponding to the provided username, or undefined if not found.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
