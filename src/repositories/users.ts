import { raw } from 'objection';
import { User, UserEntity } from '../models/entity/user';

class UsersRepository {

    constructor() { }

    async getUsers(queryName: string): Promise<User[]> {
        let listUser: User[] = [];

        if (queryName) {
            listUser = await UserEntity.query().where(
                raw('lower("name")'),
                'like',
                `%${queryName}%`
            );
        } else {
            listUser = await UserEntity.query();
        }

        return listUser;
    }

    async createUser(user: User): Promise<User> {
        const createdUser = await UserEntity.query().insert({
            email: user.email,
            name: user.name,
            profile_picture_url: user.profile_picture_url,
            level: user.level,
            password: user.password,
        });

        return createdUser;
    }

    async updateUser(user: User): Promise<User> {
        const createdUser = await UserEntity.query().patchAndFetchById(user.id!, {
            id: user.id,
            email: user.email,
            name: user.name,
            profile_picture_url: user.profile_picture_url,
            level: user.level,
            password: user.password,
        });

        return createdUser;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserEntity.query()
            .where(raw('lower("email")'), '=', email)
            .first();

        if (user === undefined) {
            return null;
        }

        return user;
    }
}

export default UsersRepository;
