import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
   // Definir apiUrl como propiedad privada de la clase
   private readonly apiUrl: string;

   constructor(
     private readonly httpService: HttpService,
     private readonly configService: ConfigService
   ) {
     // Inicializar apiUrl en el constructor usando la variable de entorno
     this.apiUrl = `${this.configService.get<string>('BACK_END')}/reservations`;
   }
 
  
  // Método para obtener todas las reservas
  async getAllReservations() {
    const response = await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/all`)
    );
    return response.data;
  }

  // Método para crear una nueva reserva
  async createReservation(createReservationDto: CreateReservationDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.apiUrl, createReservationDto)
    );
    return response.data;
  }

  // Método para verificar la disponibilidad de un vehículo
  async checkCarAvailability(carId: string) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/availability/${carId}`)
    );
    return response.data;
  }
}
