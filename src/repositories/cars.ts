import { QueryResult } from 'pg';
import { CarRequest } from '../models/dto/car';
import { Car, CarEntity } from '../models/entity/car';
import { raw } from 'objection';

class CarsRepository {

    constructor() { }

    async getCars(queryName: string, querySize: string): Promise<Car[]> {
        let listCar: Car[] = [];

        if (queryName && querySize) {
            listCar = await CarEntity.query().where(
                raw('lower("name")'),
                'like',
                `%${queryName}%`
            ).where('size',
                'like',
                `%${querySize}%`
            );
        }
        else if (queryName) {
            listCar = await CarEntity.query().where(
                raw('lower("name")'),
                'like',
                `%${queryName}%`
            );
        }
        else if (querySize) {
            listCar = await CarEntity.query().where('lower("size")',
                'like',
                `%${querySize}%`
            );
        }
        else {
            listCar = await CarEntity.query();
        }

        return listCar;
    }
    async deleteCar(queryId: string, user_id: number) {
        if (queryId) {
            await CarEntity.query().findById(queryId)
                .patch({
                    deleted: true,
                    user_id: user_id,
                    updated_at: Date.now()
                });
        }
    }
    async editCar(id: string, car: Car) {
        await CarEntity.query()
            .findById(id)
            .patch({
                name: car.name,
                picture: car.picture,
                price: car.price,
                user_id: car.user_id,
                size: car.size,
                deleted: car.deleted,
                updated_at: Date.now()
            });
    }

    async createCar(car: Car): Promise<Car> {

        const createdCar = await CarEntity.query().insert({
            name: car.name,
            picture: car.picture,
            price: car.price,
            user_id: car.user_id,
            size: car.size,
            deleted: car.deleted,
            updated_at: car.updated_at
        });

        return createdCar;
    }
}

export default CarsRepository;
