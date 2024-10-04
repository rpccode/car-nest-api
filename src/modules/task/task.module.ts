import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReservationModule } from '../reservation/reservation.module';
import { NotificationModule } from '../notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NotificationModule,
    ScheduleModule.forRoot(),
    ReservationModule
  ],
  exports: [TaskService],  // Importante para que este módulo sea exportable desde otros módulos
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
