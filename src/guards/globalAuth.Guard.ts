import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No se encontró el token de autorización');
    }

    const token = authHeader.split(' ')[1]; // Suponiendo que es un token de tipo Bearer
    request.token = token; // Almacenar el token en el objeto de la solicitud para usarlo en otros lugares
    return true;
  }
}
