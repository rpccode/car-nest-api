import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [CarService],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
