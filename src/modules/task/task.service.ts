import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReservationService } from '../reservation/reservation.service';
import { NotificationService } from '../notification/notification.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly notificationService: NotificationService,
  ) {}

  // Tarea en paralelo para verificar reservas y enviar recordatorios
  @Cron(CronExpression.EVERY_HOUR)
  async handleReservationReminders() {
    const reservations = await this.reservationService.getAllReservations();
    
    // Filtrar reservas que necesitan recordatorio
    const upcomingReservations = reservations.filter(
      (reservation) => console.log('')
    );

    // Enviar recordatorios
    for (const reservation of upcomingReservations) {
      await this.notificationService.sendPushNotification(
        reservation.userToken,
        'Recordatorio de reserva',
        'Su reserva de vehículo está próxima a iniciar.',
      );
    }
  }
}
