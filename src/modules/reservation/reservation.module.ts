import { forwardRef, Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { HttpModule } from '@nestjs/axios';
import { TaskModule } from '../task/task.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    HttpModule,
    NotificationModule
  ],
  exports: [ReservationService],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
