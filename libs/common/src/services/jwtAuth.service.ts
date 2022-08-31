import { Injectable } from '@nestjs/common';
import {
  ApiException,
  createQrcode,
  HashCompare,
  HashCrypto,
} from '@app/common';
import { join } from 'path';
import * as fse from 'fs/promises';
import { RegisterSchema, LoginSchema } from '@/schemas';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public accessToken(userinfo) {
    const payload = { username: userinfo.username, sub: userinfo.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('USER_SECRET'),
    });
  }

  public async checkPass(password: string, comparePass: string) {
    return await HashCompare(
      `${password}.${this.configService.get('USER_SECRET')}`,
      comparePass,
    );
  }

  async HashPassword(password: string) {
    return await HashCrypto(
      `${password}.${this.configService.get('USER_SECRET')}`,
    );
  }
}
