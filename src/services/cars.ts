import { CarRequest } from '../models/dto/car';
import { UserRequest } from '../models/dto/user';
import { Car } from '../models/entity/car';
import CarsRepository from '../repositories/cars';
import cloudinary from '../../config/cloudinary';

class CarsService {

    _carsRepository: CarsRepository;

    constructor(carsRepository: CarsRepository) {
        this._carsRepository = carsRepository;
    }


    async getCars(queryName: string, querySize: string): Promise<Car[]> {
        const listCar = await this._carsRepository.getCars(queryName, querySize);

        return listCar;
    }
    async createCar(car: CarRequest): Promise<Car> {
        var uploadedFile;
        if (car.picture) {
            const fileBase64 = car.picture?.buffer.toString('base64');
            const file = `data:${car.picture?.mimetype};base64,${fileBase64}`;
            uploadedFile = await cloudinary.uploader.upload(file);
            console.log(uploadedFile.secure_url);
        }


        const carToCreate: Car = {
            user_id: car.user_id,
            price: car.price,
            name: car.name,
            size: car.size,
            picture: uploadedFile?.secure_url ?? "",
            updated_at: Date.now(),
            deleted: false
        };
        const createdCar = await this._carsRepository.createCar(carToCreate);
        console.log(createdCar);

        return createdCar;
    }

    async editCar(id: string, car: CarRequest) {

        const fileBase64 = car.picture?.buffer.toString('base64');
        const file = `data:${car.picture?.mimetype};base64,${fileBase64}`;

        const uploadedFile = await cloudinary.uploader.upload(file);

        const carToEdit: Car = {
            user_id: car.user_id,
            price: car.price,
            name: car.name,
            size: car.size,
            picture: uploadedFile.secure_url,
            updated_at: Date.now(),
            deleted: false
        };

        await this._carsRepository.editCar(id, carToEdit);

    }

    async deleteCar(id: string, user_id: number) {

        await this._carsRepository.deleteCar(id, user_id);
    }

}

export default CarsService;
