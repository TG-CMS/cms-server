import { Injectable } from '@nestjs/common';
import {
  ApiException,
  createQrcode,
  HashCompare,
  HashCrypto,
  PrismaService,
  JwtAuthService,
} from '@app/common';
import { join } from 'path';
import * as fse from 'node:fs/promises';
import { RegisterSchema, LoginSchema } from '@/schemas';
import type { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { Redis, InjectRedis } from '@hqsports/redis';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  async register(data: RegisterSchema) {
    const items = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (items) {
      throw new ApiException('该用户已存在');
    }
    data.password = await this.jwtAuthService.HashPassword(data.password);
    const userinfo = await this.prismaService.user.create({
      data: data,
      select: this.prismaService.exclude<Prisma.UserSelect>('user', [
        'password',
      ]),
    });
    const access_token = this.jwtAuthService.accessToken(userinfo);
    return {
      access_token,
      userinfo,
    };
  }

  async login(data: LoginSchema) {
    const userinfo = await this.prismaService.user.findFirst({
      where: {
        username: data.username,
      },
    });
    if (!userinfo) {
      throw new ApiException('该用户未注册');
    }

    if (
      !(await this.jwtAuthService.checkPass(data.password, userinfo.password))
    ) {
      throw new ApiException('用户名或密码不正确');
    }
    delete userinfo.password;
    const access_token = this.jwtAuthService.accessToken(userinfo);
    return {
      access_token,
      userinfo,
    };
  }

  async getQrcodeImage() {
    return createQrcode(
      'http://localhost:3000/api/test',
      await fse.readFile(join(process.cwd(), './public/icon.png')),
    );
  }

  async getQrcode() {
    const token = nanoid();
    const s = 3 * 60;
    const expires = Date.now() / 1000 + 3 * 60;
    await this.redis.set(token, 0, 'EX', s);
    return {
      token,
      expires,
    };
  }
  // 获取码状态
  async qrcodeScanInfo(token: string) {
    const status = await this.redis.get(token);
    return {
      status,
    };
  }

  // 更新扫描状态
  async verifyScan(token: string) {
    const s = await this.redis.ttl(token);
    if (s < 0) return { status: -1 };
    await this.redis.set(token, 1, 'EX', s);
  }
  // 生成用户 token 存入Redis;
  async scanSignature(token: string) {
    const s = await this.redis.ttl(token);
    if (s < 0) return { status: -1 };
    await this.redis.set(token, 1, 'EX', s);
  }
}
