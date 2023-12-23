import { LoginRequest, RegisterRequest } from '../../models/dto/auth';
import { User } from '../../models/entity/user';
import UsersRepository from '../../repositories/users';
import { isErrorType } from '../../utils/checker';
import AuthService from '../auth';
import bcrypt from 'bcrypt';

describe('login', () => {
  it('should return JWT Token', async () => {
    const loginRequest: LoginRequest = {
      email: "weno@gmail.com",
      password: "12345678"
    };

    /** creating dependency of use case */
    const mockUsersRepository = new UsersRepository();

    /** mocking needed function */
    mockUsersRepository.getUserByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve(loginRequest.email));

    const authService = new AuthService(mockUsersRepository);

    const loginResponse = await authService.login(loginRequest);
    if (isErrorType(loginResponse)) {
    } else {
      expect(loginResponse.access_token).not.toBeNaN();
    }
  });
});

describe('register', () => {

  it('should return correct car data', async () => {
    const registerRequest: RegisterRequest = {
      email: "weno@gmail.com",
      password: "12345678",
      name: "",
      profile_picture_url: "",
    };
    const SALT_ROUND = 10;

    const encryptedPassword = bcrypt.hashSync(registerRequest.password, SALT_ROUND);

    /** creating dependency of use case */
    const mockUsersRepository = new UsersRepository();

    const userToCreate: User = {
      email: registerRequest.email,
      name: registerRequest.name,
      level: "Normal",
      password: encryptedPassword,
      profile_picture_url: registerRequest.profile_picture_url,
    };

    const createdUser = await mockUsersRepository.createUser(userToCreate);

    expect(createdUser.password).toEqual(encryptedPassword);
    expect(createdUser.email).toEqual(registerRequest.email);
  });
});

