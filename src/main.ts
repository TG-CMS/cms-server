import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import cookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(cookie);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(3000);
  Logger.log('App run is ' + (await app.getUrl()), 'bootstrap');
}

bootstrap();
