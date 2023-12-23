import { CarRequest } from '../../models/dto/car';
import CarsRepository from '../../repositories/cars';
import CarsService from '../cars';

describe('getCarByName', () => {
  it('should return correct car data', async () => {
    const expectedCarResponse = {
      id: 12,
      pricee: 20000,
      size: "2",
      picture: "https://res.cloudinary.com/dzbowbs1d/image/upload/v1700828334/ief4wqzf9piozt3ixujg.png",
      deleted: true,
      updated_at: 1700828335560,
      user_id: 5,
      name: 'bola',
    };

    /** creating dependency of use case */
    const mockCarsRepository = new CarsRepository();

    /** mocking needed function */
    mockCarsRepository.getCars = jest
      .fn()
      .mockImplementation(() => Promise.resolve([expectedCarResponse]));

    const carsService = new CarsService(mockCarsRepository);

    const generatedCar = await carsService.getCars("bola", "");
    expect(generatedCar[0].id).toEqual(expectedCarResponse.id);
    expect(generatedCar[0].name).toEqual(expectedCarResponse.name);
  });
});

describe('createCar', () => {

  it('should return correct car data', async () => {
    const expectedCarResponse: CarRequest = {
      name: 'Mobil_Testing_2',
      price: 2000,
      size: "2",
      user_id: 5,
      updatedAt: Date.now()
    };

    /** creating dependency of use case */
    const mockCarsRepository = new CarsRepository();

    /** mocking needed function */
    mockCarsRepository.createCar = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCarResponse));

    const carsService = new CarsService(mockCarsRepository);

    const car = await carsService.createCar(expectedCarResponse);

    expect(car.name).toEqual(expectedCarResponse.name);
  });
});

