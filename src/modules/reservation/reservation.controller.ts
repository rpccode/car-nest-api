import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
  ) {}

  // Endpoint para obtener todas las reservas
  @Get()
  async getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  // Endpoint para crear una nueva reserva
  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  // Endpoint para verificar disponibilidad
  @Get('check-availability')
  async checkAvailability(
    @Query('vehicle_id') carId: string,
    @Query('start_time') startDate: string,
    @Query('end_time') endDate: string,
  ) {
    return await this.reservationService.checkCarAvailability(carId, startDate, endDate);
  }
}
