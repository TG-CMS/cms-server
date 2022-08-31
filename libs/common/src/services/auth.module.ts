import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt-auth.guard';
import { JwtAuthService } from './jwtAuth.service';
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('USER_SECRET'),
          signOptions: { expiresIn: `${60 * 60 * 24 * 7}s` },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtService, JwtAuthService],
  exports: [JwtService, JwtAuthService],
})
export class AuthJwtModule {}
