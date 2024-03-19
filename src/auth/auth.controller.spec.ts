import { Test } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

it('can create an instance of user service', async () => {
  const fakeUsersService: Partial<UserService> = {
    findOne: (username: string) => Promise.resolve({ username } as User),
    // create: (
    //   email: string,
    //   pass: string,
    // ) =>
    //   Promise.resolve({
    //     id: 1,
    //     email,
    //     pass,
    //   }),
  };
  const module = await Test.createTestingModule({
    providers: [
      UserService,
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

//OG
// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';

// describe('AuthController', () => {
//   let controller: AuthController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
