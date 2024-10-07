import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from './guards/globalAuth.Guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpService } from '@nestjs/axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permitir solicitudes desde cualquier origen. Ajusta según tu necesidad.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  // Usa el Guard globalmente para capturar el token
  const httpService = app.get(HttpService);

  // Usar el Guard globalmente
  app.useGlobalGuards(new GlobalAuthGuard(httpService));

  // Usa el Interceptor globalmente para agregar el token a las peticiones
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(4000);
}
bootstrap();
