import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let authHeader = request.headers['Authorization'];

    if (!authHeader) {
      // Si no viene el token, solicita uno al endpoint de Go
      try {
        const response: AxiosResponse<{ token: string }> = await lastValueFrom(
          this.httpService.post('https://car-go-api-production.up.railway.app/token', {
            username: 'rpccode', // Ajustar según tus necesidades
          }),
        );

        if (response.data.token) {
          authHeader = `Bearer ${response.data.token}`;
          request.headers['Authorization'] = authHeader; // Añade el token generado al header
          // console.log(request.headers.Authorization)
        } else {
          throw new UnauthorizedException('No se pudo obtener el token');
        }
      } catch (error) {
        throw new UnauthorizedException('Error al solicitar el token');
      }
    }

    const token = authHeader.split(' ')[1]; // Suponiendo que es un token de tipo Bearer
    request.token = token; // Almacenar el token en la solicitud
    return true;
  }
}
