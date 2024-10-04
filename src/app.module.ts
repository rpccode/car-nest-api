import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
      envFilePath: '.env', // Ruta del archivo .env
    }),
    CarModule,
     NotificationModule,
      TaskModule,
       UserModule, 
       ReservationModule,
       ScheduleModule.forRoot(),  // Para tareas en segundo plano
       HttpModule,
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
