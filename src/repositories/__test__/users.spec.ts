import { User } from '../../models/entity/user';
import UsersRepository from '../users';

describe('getUsersByName', () => {
  it('should return a User data', async () => {
    let usersRepository = new UsersRepository();

    const getUser = await usersRepository.getUsers(
      "weno",
    );

    console.log(getUser);
    // Assertion
    expect(getUser[0].id).toEqual("5");
    expect(getUser[0].name).toEqual("Weno");
  });
});
describe('getUsersByEmail', () => {
  it('should return a User data', async () => {
    let usersRepository = new UsersRepository();

    const getUser = await usersRepository.getUserByEmail(
      "weno@gmail.com",
    );

    console.log(getUser);
    // Assertion
    expect(getUser!.id).toEqual("5");
    expect(getUser!.name).toEqual("Weno");
  });
});