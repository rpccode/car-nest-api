import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/create-notification.dto';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint para enviar una notificación push
  @Post('send')
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    const { token, title, message } = sendNotificationDto;
    return this.notificationService.sendPushNotification(token, title, message);
  }
  @Post('save-token')
  async savePushToken(@Body() createPushTokenDto: CreatePushTokenDto) {
    return this.notificationService.saveToken(createPushTokenDto.token);
  }

  // Obtener todos los tokens guardados
  @Get('get-tokens')
  async getTokens() {
    return this.notificationService.getTokens();
  }

  // Enviar notificación a todos los tokens almacenados
  @Post('send-notifications')
  async sendNotifications(@Body() sendNotificationDto: SendNotificationDto) {
    const { title, message } = sendNotificationDto;
    return this.notificationService.sendNotificationsToAll(title, message);
  }
}
