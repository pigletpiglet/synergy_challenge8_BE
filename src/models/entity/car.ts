// Entity will define the object from database
import { Model, ModelObject } from 'objection';
import knexInstance from '../../../config/postgresql';
import { UserEntity } from './user';

export class CarEntity extends Model {
    id?: number;
    user_id?: number;
    name!: string;
    price!: number;
    size!: string;
    picture?: string;
    updated_at!: number;
    deleted!: boolean;


    static get tableName() {
        return 'cars';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserEntity,
                join: {
                    from: 'cars.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}



Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;

