import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { Blog } from 'src/entities/blog.entity';

it('can create an instance of user service', async () => {
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (
      name: string,
      age: number,
      email: string,
      username: string,
      password: string,
      gender: string,
      blogs: Blog,
    ) =>
      Promise.resolve({
        id: 1,
        name,
        age,
        email,
        username,
        password,
        gender,
        blogs,
      }),
  };
  const module = await Test.createTestingModule({
    providers: [
      // UserService,
      {
        provide: UserService,
        useValue: {
          createUser: fakeUsersService,
          // findUserById: jest.fn(),
        },
      },
    ],
  }).compile();

  const service = module.get(UserService);

  expect(service).toBeDefined();
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// // import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';

// describe('UserController', () => {
//   let controller: UserController;
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         {
//           provide: UserService,
//           useValue: {
//             createUser: jest.fn(),
//             findUserById: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create a user', async () => {
//     const createUserDto: CreateUserDto = {
//       name: 'John Doe',
//       age: 30,
//       email: 'john@example.com',
//       username: 'johndoe',
//       password: 'Password123!',
//       gender: 'm',
//       blogs: [],
//     };

//     jest
//       .spyOn(userService, 'createUser')
//       .mockResolvedValueOnce(createUserDto as unknown as User);

//     const result = await controller.create(createUserDto);

//     expect(result).toEqual(createUserDto);
//   });

//   it('should find all users', async () => {
//     const users: User[] = [
//       {
//         id: 1,
//         name: 'John Doe',
//         age: 30,
//         email: 'john@example.com',
//         username: 'johndoe',
//         password: 'Password123!',
//         gender: 'm',
//         blogs: [],
//       },
//       {
//         id: 2,
//         name: 'Jane Smith',
//         age: 25,
//         email: 'jane@example.com',
//         username: 'janesmith',
//         password: 'Password456!',
//         gender: 'f',
//         blogs: [],
//       },
//     ];

//     jest.spyOn(userService, 'findAllUser').mockResolvedValueOnce(users);

//     const result = await controller.findAll();

//     expect(result).toEqual(users);
//   });

//   // Similarly, write test cases for findOne, update, remove, and getBooks methods
// });
