import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.token; // Obtenemos el token del Guard global

    if (!token) {
      throw new Error('Token de autorización no encontrado');
    }

    // Adjuntar el token a la petición de la API externa
    request.headers['authorization'] = `Bearer ${token}`;

    return next.handle().pipe(
      tap((response) => {
        // Puedes interceptar las respuestas aquí si lo necesitas
      }),
    );
  }
}
