import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from '../src/modules/car/car.controller';
import { CarService } from '../src/modules/car/car.service';

describe('CarController', () => {
  let controller: CarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [CarService],
    }).compile();

    controller = module.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
