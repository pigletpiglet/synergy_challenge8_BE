import { Car } from '../../models/entity/car';
import CarsRepository from '../cars';



describe('getCarsByName', () => {
  it('should return a Car data', async () => {
    let carsRepository = new CarsRepository();
    const getCars = await carsRepository.getCars(
      "avanza",
      ""
    );

    // Assertion
    expect(getCars[0].id).toEqual("10");
    expect(getCars[0].name).toEqual("Avanza");
  });
});

// TODO: Create unit test for createTweet repository
describe('createCars', () => {
  it('should return a Car data', async () => {
    let carsRepository = new CarsRepository();

    const carToCreate: Car = {
      user_id: 5,
      name: "Mobil Test",
      deleted: false,
      price: 1000,
      size: "2",
      updated_at: Date.now(),
      picture: "",

    };
    const createdCars = await carsRepository.createCar(carToCreate);
    const getCars = await carsRepository.getCars(
      createdCars.name.toLowerCase(),
      ""
    );

    await carsRepository.deleteCar(createdCars.id!.toString(), 5);
    // Assertion
    expect(getCars[0].id).toEqual(createdCars.id);
    expect(getCars[0].name).toEqual(carToCreate.name);
  });
});