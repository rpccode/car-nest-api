import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint para enviar una notificación push
  @Post('send')
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    const { token, title, message } = sendNotificationDto;
    return this.notificationService.sendPushNotification(token, title, message);
  }
}
