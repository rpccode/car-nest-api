import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  private expo: Expo;
  private tokens: string[] = [];

  constructor() {
    this.expo = new Expo();
  }

  // Método para guardar el token
  saveToken(token: string): { message: string } {
    if (!Expo.isExpoPushToken(token)) {
      return { message: 'Invalid Expo push token' };
    }

    if (this.tokens.includes(token)) {
      return { message: 'Token already exists' };
    }

    this.tokens.push(token);
    return { message: 'Token saved successfully' };
  }

  // Método para enviar notificaciones a todos los tokens almacenados
  async sendNotificationsToAll(title: string, message: string): Promise<{ success: boolean; result: string[] }> {
    const messages = [];
    const results = [];

    for (const token of this.tokens) {
      if (!Expo.isExpoPushToken(token)) {
        results.push(`Invalid token: ${token}`);
        continue;
      }

      messages.push({
        to: token,
        sound: 'default',
        title,
        body: message,
        data: { title, message },
      });
    }

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets = [];

    try {
      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
    }

    tickets.forEach((ticket, index) => {
      if (ticket.status === 'ok') {
        results.push(`Notification sent to ${this.tokens[index]}`);
      } else {
        results.push(`Failed to send notification to ${this.tokens[index]}: ${ticket.message}`);
      }
    });

    return { success: true, result: results };
  }
}
