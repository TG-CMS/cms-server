import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@hqsports/redis';
import { MinioModule } from '@hqsports/minio';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  PrismaModule,
  AuthJwtModule,
  CookieMiddleware,
  LoggingInterceptor,
  VersionInterceptor,
} from '@app/common';

import { AuthModule } from './auth';
import { UserModule } from './user/user.module';
import { WidgetModule } from './widget/widget.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorieModule } from './categorie/categorie.module';
import { TemplateModule } from './template/template.module';
import { TranslateModule } from './translate/translate.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 10,
    }),
    RedisModule.forRoot({
      isGlobal: true,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD,
      host: process.env.REDIS_HOST,
    }),
    MinioModule.forRoot({
      isGlobal: true,
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      region: 'us-east-1',
    }),
    AuthJwtModule,
    PrismaModule,
    AuthModule,
    UserModule,
    WidgetModule,
    CategorieModule,
    TemplateModule,
    TranslateModule,
    DatasourceModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: VersionInterceptor,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes('*');
  }
}
