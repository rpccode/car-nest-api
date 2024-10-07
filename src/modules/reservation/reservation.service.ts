import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiUrl = `${this.configService.get<string>('BACK_END')}/api/reservations`;
    console.log(this.apiUrl);
  }

  // Método para obtener todas las reservas
  async getAllReservations() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/all`,{
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('API_KEY')}`,
          },
        })
      );
      return response.data;
    } catch (error) {
      const errorResponse = {
        message: error.response?.data || 'Error desconocido',
        status: error.status || 'Unknown',
        statusText: error.response?.statusText || 'Unknown',
        endpoint: error.config?.url || 'Unknown',
      };
      return    this.handleError(errorResponse);
    }
  }

  // Método para crear una nueva reserva
  async createReservation(createReservationDto: CreateReservationDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.apiUrl, createReservationDto)
    );
    return response.data;
  }

  // Método para verificar la disponibilidad de un vehículo
  async checkCarAvailability(carId: string, startDate: string, endDate: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.apiUrl}/check-availability`, {
          vehicle_id: carId,
          start_time: startDate,
          end_time: endDate,
        },{
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('API_KEY')}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      return this.handleError(error)
      // throw new Error(`Error al verificar la disponibilidad del vehículo: ${error.message}`);
    }
  }

  async handleError(error): Promise<void> {
    const errorResponse = {
      message: error.response?.data || 'Error desconocido',
      status: error.status || 'Unknown',
      statusText: error.response?.statusText || 'Unknown',
      endpoint: error.config?.url || 'Unknown',
    };
    if (error.status === 401) {
      throw new UnauthorizedException(errorResponse);
    } else {
      throw new BadRequestException(errorResponse);
    }
  }
}
