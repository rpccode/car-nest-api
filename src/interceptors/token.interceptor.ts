import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.token; // Obtenemos el token desde el Guard

    if (!token) {
      throw new Error('Token de autorización no encontrado');
    }

    // Adjuntar el token a la petición externa (Go API)
    request.headers['Authorization'] = `Bearer ${token}`;

    return next.handle().pipe(
      tap(() => {
        // Aquí podrías interceptar las respuestas si fuera necesario
      }),
    );
  }
}
