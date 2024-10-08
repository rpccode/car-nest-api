import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  private tokens: string[] = [];

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
    const messagePayload = {
      token, // Registro del dispositivo
      notification: {
        title,
        body: message,
      },
    };

    try {
      await admin.messaging().send(messagePayload); // Usar el nuevo método 'send'
      return { success: true, message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, message: 'Failed to send notification', error };
    }
  }

  // Método para guardar el token
  saveToken(token: string): { message: string } {
    if (this.tokens.includes(token)) {
      return { message: 'Token already exists' };
    }
    this.tokens.push(token);
    return { message: 'Token saved successfully' };
  }

  // Método para obtener los tokens almacenados
  getTokens(): { tokens: string[] } {
    return { tokens: this.tokens };
  }

  // Método para enviar notificaciones a todos los tokens almacenados
  async sendNotificationsToAll(title: string, message: string): Promise<{ success: boolean; result: string[] }> {
    console.log('Executing sendNotificationsToAll');
    
    const results = [];
    
    if (this.tokens.length === 0) {
      console.log('No tokens stored, skipping notification sending');
    }

    for (const token of this.tokens) {
      const messagePayload = {
        token,
        notification: {
          title,
          body: message,
        },
      };

      try {
        await admin.messaging().send(messagePayload); // Usar 'send' en lugar de 'sendToDevice'
        results.push(`Notification sent to ${token}`);
      } catch (error) {
        console.error(`Failed to send notification to ${token}:`, error.message);
        results.push(`Failed to send notification to ${token}: ${error.message}`);
      }
    }

    console.log('Results:', results);
    return { success: true, result: results };
  }
}
