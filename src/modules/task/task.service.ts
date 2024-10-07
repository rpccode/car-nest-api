import { Injectable, Logger } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
 // Importa el servicio que maneja los tokens de notificaciones
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';


@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private readonly reservationService: ReservationService,
    private readonly pushTokenService: NotificationService, // Usar el servicio PushTokenService
  ) {}

  // Tarea en paralelo que se ejecuta cada hora
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleReservationReminders() {
    try {
      // Obtén todas las reservas
      this.logger.debug('Ejecutando handleReservationReminders');
      const reservations = await this.reservationService.getAllReservations();
      const now = new Date();

      // Filtrar reservas próximas a vencer (dentro de 24 horas)
      const upcomingReservations = reservations.filter((reservation) => {
        const reservationTime = new Date(reservation.startTime);
        const timeDifference = reservationTime.getTime() - now.getTime();
        const hoursUntilReservation = timeDifference / (1000 * 60 * 60);

        return hoursUntilReservation <= 24 && hoursUntilReservation > 0;
      });

      // Filtrar reservas que ya han vencido (pasado el tiempo de reserva)
      const expiredReservations = reservations.filter((reservation) => {
        const reservationTime = new Date(reservation.startTime);
        return reservationTime.getTime() < now.getTime();
      });


      // Enviar notificaciones para reservas próximas a vencer
      if (upcomingReservations.length > 0) {
        await this.pushTokenService.sendNotificationsToAll(
          'Recordatorio de reserva',
          `Tiene una o más reservas próximas a iniciar.`
        );
      }

      // Enviar notificaciones para reservas vencidas
      if (expiredReservations.length > 0) {
        await this.pushTokenService.sendNotificationsToAll(
          'Reserva vencida',
          `Una o más reservas han expirado.`
        );
      }
      
      if(expiredReservations.length ===  0) {
        await this.pushTokenService.sendNotificationsToAll(
          'No hay Reserva Disponibles',
          `No hay más reservas disponibles.`
          ); 
       this.logger.warn(' expiredReservations  ')   
      }
      this.logger.debug('Finalizó handleReservationReminders');

    } catch (error) {
      this.logger.error('Error en el manejo de recordatorios de reserva:', error);
    }
  }
}
