import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor() {
    // Inicializar Firebase admin con las credenciales de servicio
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  // Método para enviar una notificación push a un usuario
  async sendPushNotification(token: string, title: string, message: string) {
    const payload = {
      notification: {
        title,
        body: message,
      },
    };

    try {
      await admin.messaging().sendToDevice(token, payload);
      return { success: true, message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, message: 'Failed to send notification', error };
    }
  }
}
