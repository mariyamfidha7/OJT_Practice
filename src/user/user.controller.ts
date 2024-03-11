import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // API URL - POST : /user
  // Create user details
  // Request body shall contain
  //   1. name : string mandatory max length - 30
  //   2. username : string mandatory max length - 15
  //   3. email : string mandatory unique max length - 40
  //   4. age : number
  //   5. password : string mandatory
  //   5. gender : string
  // The system shall check following:
  //   a. If the mandatory field does not have any values, then
  //      the system shall return an error message '<Field Name> is required'
  //   b. If the email address provided is not in valid format, then
  //      the system shall return an error message 'Please provide valid Email'
  //   c .If the email address already exists, then
  //      the system shall return an error message 'Email Address already exists'
  //   d. If the username has characters other than alphanumeric, then
  //      the system shall return an error message 'Username does not allow other than alpha numeric chars'
  //   e. If the password does not contain minimum 8 characters including number, special character, upper and lowercase,
  //      then the system shall return an error message 'Use stronger password'
  //   f. If the above validation is passed, then
  //        1. The system shall save the details to the DB
  //        2. System shall return the newly created user.
  /**
   * Function create the user details
   * @param CreateUserDto
   * @returns {Promise<User>}
   */
  @Post()
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * API URL- GET :/user
   * Retrieve users details
   a. The system shall retrieve all the users details from the DB
   b. If there are no users in the DB, the system will display an empty array  */
  /**
   * Function retrieve user details
   * @returns {Promise<User[]>}
   */
  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  /**
   * API URL- GET :/user/:id
   * Retrieve user details of a particular user
   * Request query shall contain
  //   1. id : number 
  // The system shall check following:
  //   a. If no parameter is passed, then
  //      the system shall return an error 'Enter userID'
  //   b. If the above validation is passed, then
  //        1. The system shall retrieve the user details of the user with that userID.
  //        2. If a user does not exist with that userID, then
  //           the system will return an error 'User does not exist' */
  /**
   * Function retrieve user details
   * @param {number} id
   * @returns {Promise<User[]>}
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.viewUser(+id);
  }

  /**
   * API URL- PATCH :/user/:id
   * Update user details of a particular user
   * Request query shall contain
  //   1. id : number 
   * Request body shall contain
  //   1. name : string 
  //   2. username : string
  //   3. email : string 
  //   4. age : number
  //   5. password : string
  //   5. gender : string
  // The system shall check following:
  //   a. If no parameter is passed, then
  //      the system shall return an error 'Enter userID'
  //   b. If the above validation is passed, then
  //        1. The system shall update the user details of the user with that userID.
  //        2. If a user does not exist with that userID, then
  //           the system will return an error 'User does not exist' */
  /**
   * Function retrieve user details
   * @param UpdateUserDto
   * @returns {Promise<User[]>}
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  /**
   * API URL- DELETE :/user/:id
   * Delete a particular user
   * Request query shall contain
  //   1. id : number 
  // The system shall check following:
  //   a. If no parameter is passed, then
  //      the system shall return an error 'Enter userID'
  //   b. If the above validation is passed, then
  //        1. The system shall delete the user details of the user with that userID.
  //        2. If a user does not exist with that userID, then
  //           the system will return an error 'User does not exist' */
  /**
   * Function delete user details
   * @param {number} id
   * @returns {Promise<{ affected?: number }>}
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  /**
   * API URL- GET :/user/blogs
   * Retrieve blogs of a particular user
   * Request query shall contain
  //   1. userID : number 
  // The system shall check following:
  //   a. If no parameter is passed, then
  //      the system shall return an error 'Enter userID'
  //   b. If the above validation is passed, then
  //        1. The system shall retrieve the blogs of the user with that userID.
  //        2. If a user does not exist with that userID, then
  //           the system will return an error 'User does not exist'
  //        2. If the user has no blogs created, then
  //           the system will return an error 'User has no blogs' */
  /**
   * Function retrieve user details
   * @param {number} userID
   * @returns {Promise<Blog[]>}
   */
}
