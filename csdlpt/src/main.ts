import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
async function bootstrap() {
  ConfigModule.forRoot({
    envFilePath: ['.env'],
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('v1/api');
  // app.useGlobalGuards(AuthGuard(''));
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(5009);
}
bootstrap();
