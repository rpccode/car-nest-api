import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from './guards/globalAuth.Guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Usa el Guard globalmente para capturar el token
  app.useGlobalGuards(new GlobalAuthGuard());

  // Usa el Interceptor globalmente para agregar el token a las peticiones
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(4000);
}
bootstrap();
